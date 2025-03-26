#!/usr/bin/env python3
"""
Mail App Contacts Extractor

This script extracts email addresses and names from emails in Apple Mail app using AppleScript.
It can also filter emails from a specific sender.
"""

import os
import re
import csv
import subprocess
import argparse
from datetime import datetime
from collections import defaultdict

# Regex patterns for email and name extraction
EMAIL_PATTERN = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
NAME_PATTERN = r'([A-Z][a-z]+ [A-Z][a-z]+)'  # Simple pattern for "First Last" names

def run_applescript(script):
    """Run an AppleScript and return its output."""
    process = subprocess.Popen(['osascript', '-e', script], 
                               stdout=subprocess.PIPE, 
                               stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if stderr:
        print(f"AppleScript Error: {stderr.decode('utf-8')}")
    return stdout.decode('utf-8').strip()

def get_mailbox_list():
    """Get a list of all mailboxes in Mail app."""
    script = '''
    tell application "Mail"
        set mailboxList to {}
        set accountList to every account
        repeat with currentAccount in accountList
            set mbList to every mailbox of currentAccount
            repeat with currentMailbox in mbList
                set end of mailboxList to name of currentAccount & ":" & name of currentMailbox
            end repeat
        end repeat
        return mailboxList
    end tell
    '''
    result = run_applescript(script)
    return result.split(', ')

def select_mailbox():
    """Let the user select a mailbox to process."""
    mailboxes = get_mailbox_list()
    print("Available mailboxes:")
    for i, mailbox in enumerate(mailboxes):
        print(f"{i+1}. {mailbox}")
    
    choice = input("\nEnter the number of the mailbox to process (or press Enter for Inbox): ")
    if not choice.strip():
        return "Inbox"
    
    try:
        index = int(choice) - 1
        if 0 <= index < len(mailboxes):
            return mailboxes[index]
        else:
            print("Invalid selection. Using Inbox.")
            return "Inbox"
    except ValueError:
        print("Invalid input. Using Inbox.")
        return "Inbox"

def get_message_count(mailbox, sender_filter=None):
    """Get the number of messages in the selected mailbox."""
    account, mbox = mailbox.split(':') if ':' in mailbox else ('', mailbox)
    
    script = f'''
    tell application "Mail"
        if "{account}" is not "" then
            set theAccount to account "{account}"
            set theMailbox to mailbox "{mbox}" of theAccount
        else
            set theMailbox to mailbox "{mbox}"
        end if
        
        set messageCount to count of messages in theMailbox
        return messageCount
    end tell
    '''
    result = run_applescript(script)
    try:
        return int(result)
    except ValueError:
        print(f"Error getting message count: {result}")
        return 0

def extract_messages(mailbox, max_messages=500, sender_filter=None):
    """Extract messages from the selected mailbox."""
    account, mbox = mailbox.split(':') if ':' in mailbox else ('', mailbox)
    total_messages = get_message_count(mailbox)
    
    if sender_filter:
        print(f"Filtering messages from sender: {sender_filter}")
    
    print(f"Found {total_messages} total messages in {mailbox}")
    print(f"Processing up to {max_messages} messages...")
    
    filter_script = ""
    if sender_filter:
        # Add a condition to check for the specific sender
        filter_script = f'if sender of currentMessage contains "{sender_filter}" then'
    
    script = f'''
    tell application "Mail"
        if "{account}" is not "" then
            set theAccount to account "{account}"
            set theMailbox to mailbox "{mbox}" of theAccount
        else
            set theMailbox to mailbox "{mbox}"
        end if
        
        set messageList to {{}}
        set messageCounter to 0
        set filteredCounter to 0
        
        repeat with i from 1 to (count messages of theMailbox)
            if messageCounter >= {max_messages} then
                exit repeat
            end if
            
            try
                set currentMessage to message i of theMailbox
                
                {filter_script if sender_filter else ""}
                    set messageFrom to sender of currentMessage
                    set messageTo to to recipient of currentMessage
                    set messageSubject to subject of currentMessage
                    set messageContent to content of currentMessage
                    
                    set messageInfo to messageFrom & "|" & messageTo & "|" & messageSubject & "|" & messageContent
                    set end of messageList to messageInfo
                    
                    set filteredCounter to filteredCounter + 1
                {" end if" if sender_filter else ""}
                
                set messageCounter to messageCounter + 1
                
                if messageCounter mod 10 = 0 then
                    log "Processed " & messageCounter & " messages, found " & filteredCounter & " matching messages..."
                end if
            on error errMsg
                log "Error processing message " & i & ": " & errMsg
            end try
        end repeat
        
        return messageList
    end tell
    '''
    
    result = run_applescript(script)
    messages = result.split(', ')
    
    if sender_filter:
        print(f"Found {len(messages)} messages from {sender_filter}")
    
    return messages

def extract_contacts_from_message(message_data):
    """Extract emails and names from a message."""
    parts = message_data.split('|')
    if len(parts) < 4:
        return []
    
    from_field, to_field, subject, content = parts
    
    # Extract email addresses and names from content
    emails = re.findall(EMAIL_PATTERN, content)
    potential_names = re.findall(NAME_PATTERN, content)
    
    # Also extract from headers
    header_emails = []
    header_emails.extend(re.findall(EMAIL_PATTERN, from_field))
    header_emails.extend(re.findall(EMAIL_PATTERN, to_field))
    
    # Create contacts list
    contacts = []
    
    # Process header emails first (more reliable for matching names)
    for email in header_emails:
        email = email.lower()
        name = ''
        
        # Try to extract name from the same field
        for field in [from_field, to_field]:
            if email in field.lower():
                # Find part before email that might contain a name
                prefix = field.split(email)[0].strip()
                # Try to extract a name (remove common email formatting)
                prefix = prefix.replace('"', '').replace('<', '').strip()
                if prefix and not re.match(EMAIL_PATTERN, prefix):
                    name = prefix
                    break
        
        contacts.append((email, name))
    
    # Add remaining emails from content
    for email in emails:
        email = email.lower()
        if email not in [e for e, _ in contacts]:
            # Try to find a name near this email in the content
            name = ''
            
            # Check if any potential name is near this email in content
            email_pos = content.lower().find(email)
            if email_pos > 0:
                for potential_name in potential_names:
                    name_pos = content.find(potential_name)
                    if name_pos > 0 and abs(email_pos - name_pos) < 100:  # Within 100 chars
                        name = potential_name
                        break
            
            contacts.append((email, name))
    
    return contacts

def process_messages(messages):
    """Process messages and extract contacts."""
    # Dictionary of email -> {name, frequency}
    contacts = {}
    processed = 0
    total = len(messages)
    
    for message_data in messages:
        try:
            message_contacts = extract_contacts_from_message(message_data)
            
            # Update contacts dictionary
            for email, name in message_contacts:
                if email not in contacts:
                    contacts[email] = {
                        'name': name,
                        'frequency': 1
                    }
                else:
                    contacts[email]['frequency'] += 1
                    # Update name if current one is empty but we found a name
                    if not contacts[email]['name'] and name:
                        contacts[email]['name'] = name
            
            processed += 1
            if processed % 10 == 0:
                print(f"Processed {processed}/{total} messages...")
                
        except Exception as error:
            print(f"Error processing message: {error}")
    
    return contacts

def save_contacts_to_csv(contacts, sender_filter=None):
    """Save extracted contacts to a CSV file."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"mail_app_contacts_{timestamp}.csv"
    if sender_filter:
        # Create a filename with the sender filter
        sender_name = sender_filter.replace('@', '_at_').replace('.', '_')
        filename = f"mail_app_contacts_{sender_name}_{timestamp}.csv"
    
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Email', 'Name', 'Frequency'])
        
        # Sort by frequency (most frequent first)
        sorted_contacts = sorted(contacts.items(), key=lambda x: x[1]['frequency'], reverse=True)
        
        for email, data in sorted_contacts:
            writer.writerow([email, data['name'], data['frequency']])
    
    print(f"Saved {len(contacts)} contacts to {filename}")
    return filename

def save_messages_to_file(messages, sender_filter=None):
    """Save the full message content to a file for further analysis."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"mail_messages_{timestamp}.txt"
    if sender_filter:
        # Create a filename with the sender filter
        sender_name = sender_filter.replace('@', '_at_').replace('.', '_')
        filename = f"mail_messages_{sender_name}_{timestamp}.txt"
    
    with open(filename, 'w', encoding='utf-8') as file:
        for i, message_data in enumerate(messages):
            parts = message_data.split('|')
            if len(parts) >= 4:
                from_field, to_field, subject, content = parts
                file.write(f"======== MESSAGE {i+1} ========\n")
                file.write(f"From: {from_field}\n")
                file.write(f"To: {to_field}\n")
                file.write(f"Subject: {subject}\n")
                file.write(f"Content:\n{content}\n\n")
    
    print(f"Saved {len(messages)} full messages to {filename}")
    return filename

def main():
    """Main function to extract contacts from Mail app."""
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Extract contacts from the Mac Mail app.')
    parser.add_argument('--sender', type=str, help='Filter messages by sender email address')
    parser.add_argument('--max', type=int, default=500, help='Maximum number of messages to process')
    parser.add_argument('--save-messages', action='store_true', help='Save full messages to a text file')
    parser.add_argument('--mailbox', type=str, help='Specify mailbox to use instead of prompting')
    
    args = parser.parse_args()
    
    print("Starting Mail App Contacts Extractor...")
    
    # Use the specific sender if provided, otherwise ask the user
    if args.sender:
        sender_filter = args.sender
        print(f"Filtering messages from: {sender_filter}")
    else:
        sender_filter = None
    
    # Let user select mailbox or use the one specified
    if args.mailbox:
        selected_mailbox = args.mailbox
        print(f"Using mailbox: {selected_mailbox}")
    else:
        selected_mailbox = select_mailbox()
        print(f"Selected mailbox: {selected_mailbox}")
    
    # Extract messages from the selected mailbox
    messages = extract_messages(selected_mailbox, max_messages=args.max, sender_filter=sender_filter)
    
    if not messages:
        print("No messages found.")
        return
    
    # Save full messages if requested
    if args.save_messages:
        save_messages_to_file(messages, sender_filter)
    
    # Process messages and extract contacts
    contacts = process_messages(messages)
    
    # Save contacts to CSV
    if contacts:
        filename = save_contacts_to_csv(contacts, sender_filter)
        print(f"Process completed successfully. Found {len(contacts)} unique contacts.")
        print(f"Results saved to {filename}")
    else:
        print("No contacts found.")

if __name__ == '__main__':
    main() 