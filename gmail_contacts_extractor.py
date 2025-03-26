#!/usr/bin/env python3
"""
Gmail Contacts Extractor

This script extracts contacts (email addresses, names, and phone numbers) from emails in your Gmail inbox.
"""

import os
import re
import pickle
import base64
import email
from email.utils import parseaddr
from collections import defaultdict
import csv
from datetime import datetime
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the token.pickle file
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Phone number regex patterns
PHONE_PATTERNS = [
    r'\b(?:\+?1[-.\s]?)?(?:\(?([0-9]{3})\)?[-.\s]?)?([0-9]{3})[-.\s]?([0-9]{4})\b',  # US/Canada: (123) 456-7890, 123-456-7890, 123.456.7890
    r'\b\+[0-9]{1,3}[-.\s]?[0-9]{1,14}\b'  # International: +XX XXXXXXXXXXXXX
]

def get_gmail_service():
    """
    Authenticate and create a Gmail API service instance.
    Returns the Gmail API service.
    """
    creds = None
    
    # The file token.pickle stores the user's access and refresh tokens
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    # If no valid credentials available, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    # Create and return the Gmail service
    return build('gmail', 'v1', credentials=creds)

def extract_contacts_from_headers(message_part):
    """
    Extract contacts (name, email) from message headers.
    """
    contacts = []
    
    if 'payload' not in message_part or 'headers' not in message_part['payload']:
        return contacts
    
    # Extract from common headers
    headers = message_part['payload']['headers']
    header_fields = ['From', 'To', 'Cc', 'Bcc', 'Reply-To']
    
    for header in headers:
        if header['name'] in header_fields:
            # Parse addresses from header
            value = header['value']
            
            # Handle comma-separated lists
            if ',' in value:
                parts = value.split(',')
                for part in parts:
                    name, email_addr = parseaddr(part.strip())
                    if email_addr and '@' in email_addr:
                        contacts.append((name, email_addr.lower()))
            else:
                name, email_addr = parseaddr(value)
                if email_addr and '@' in email_addr:
                    contacts.append((name, email_addr.lower()))
    
    return contacts

def extract_message_body(message_part):
    """
    Extract the text from the message body.
    """
    if 'payload' not in message_part:
        return ""
    
    if 'parts' in message_part['payload']:
        # Multipart message
        text_body = ""
        for part in message_part['payload']['parts']:
            if part.get('mimeType') == 'text/plain':
                if 'data' in part.get('body', {}):
                    data = part['body']['data']
                    text = base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
                    text_body += text
            elif 'parts' in part:
                # Recursively check nested parts
                for nested_part in part['parts']:
                    if nested_part.get('mimeType') == 'text/plain':
                        if 'data' in nested_part.get('body', {}):
                            data = nested_part['body']['data']
                            text = base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
                            text_body += text
        return text_body
    elif message_part['payload'].get('mimeType') == 'text/plain':
        # Simple plain text message
        if 'data' in message_part['payload'].get('body', {}):
            data = message_part['payload']['body']['data']
            return base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
    
    return ""

def extract_phone_numbers(text):
    """
    Extract phone numbers from text using regex patterns.
    """
    phone_numbers = set()
    
    for pattern in PHONE_PATTERNS:
        matches = re.findall(pattern, text)
        if matches:
            if isinstance(matches[0], tuple):
                # Pattern with groups (like US numbers)
                for match in matches:
                    if len(match) == 3:  # Area code, prefix, line number
                        area_code, prefix, line = match
                        if area_code and prefix and line:
                            phone = f"({area_code}) {prefix}-{line}"
                            phone_numbers.add(phone)
            else:
                # Simple pattern (international)
                for match in matches:
                    phone_numbers.add(match)
    
    return phone_numbers

def fetch_messages(service, user_id='me', max_results=500):
    """
    Fetch messages from Gmail inbox.
    """
    try:
        # List messages in the inbox
        response = service.users().messages().list(
            userId=user_id, 
            labelIds=['INBOX'], 
            maxResults=max_results
        ).execute()
        
        messages = response.get('messages', [])
        
        if not messages:
            print("No messages found in inbox.")
            return []
        
        print(f"Found {len(messages)} messages. Processing...")
        return messages
    except Exception as error:
        print(f"An error occurred: {error}")
        return []

def process_messages(service, messages, user_id='me'):
    """
    Process messages to extract contacts with names and phone numbers.
    """
    # Dictionary of email -> {name, frequency, phone_numbers}
    contacts = {}
    processed = 0
    total = len(messages)
    
    for message in messages:
        msg_id = message['id']
        
        try:
            # Get the message
            msg = service.users().messages().get(userId=user_id, id=msg_id).execute()
            
            # Extract contacts from headers
            header_contacts = extract_contacts_from_headers(msg)
            
            # Extract message body for phone numbers
            body_text = extract_message_body(msg)
            phone_numbers = extract_phone_numbers(body_text)
            
            # Update contacts dictionary
            for name, email_addr in header_contacts:
                if email_addr not in contacts:
                    contacts[email_addr] = {
                        'name': name if name else '',
                        'frequency': 1,
                        'phone_numbers': set()
                    }
                else:
                    contacts[email_addr]['frequency'] += 1
                    # Update name if current one is empty but we found a name
                    if not contacts[email_addr]['name'] and name:
                        contacts[email_addr]['name'] = name
                
                # Add phone numbers to this contact if found in the same email
                contacts[email_addr]['phone_numbers'].update(phone_numbers)
            
            processed += 1
            if processed % 10 == 0:
                print(f"Processed {processed}/{total} messages...")
                
        except Exception as error:
            print(f"Error processing message {msg_id}: {error}")
    
    return contacts

def save_contacts_to_csv(contacts):
    """
    Save extracted contacts to a CSV file.
    """
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"gmail_contacts_{timestamp}.csv"
    
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Email', 'Name', 'Phone Numbers', 'Frequency'])
        
        # Sort by frequency (most frequent first)
        sorted_contacts = sorted(contacts.items(), key=lambda x: x[1]['frequency'], reverse=True)
        
        for email, data in sorted_contacts:
            # Join phone numbers with semicolons
            phone_str = "; ".join(data['phone_numbers'])
            writer.writerow([email, data['name'], phone_str, data['frequency']])
    
    print(f"Saved {len(contacts)} contacts to {filename}")
    return filename

def main():
    """
    Main function to extract contacts from Gmail inbox.
    """
    print("Starting Gmail Contacts Extractor...")
    
    # Get Gmail service
    service = get_gmail_service()
    
    # Fetch messages
    messages = fetch_messages(service)
    
    if not messages:
        return
    
    # Process messages and extract contacts
    contacts = process_messages(service, messages)
    
    # Save contacts to CSV
    if contacts:
        filename = save_contacts_to_csv(contacts)
        print(f"Process completed successfully. Found {len(contacts)} unique contacts.")
        print(f"Results saved to {filename}")
    else:
        print("No contacts found.")

if __name__ == '__main__':
    main() 