# Mac Mail App Contacts Extractor

This script extracts contact information from your Mac Mail app emails and saves it to a CSV file, including:
- Email addresses
- Names (when available)
- Frequency of occurrence

## How It Works

The script uses AppleScript to interact with the Mail app on macOS. It:
1. Shows you a list of available mailboxes
2. Lets you choose which mailbox to process
3. Extracts messages from that mailbox
4. Processes each message to extract email addresses and names
5. Saves the results to a CSV file

## Prerequisites

- macOS with Mail app configured
- Python 3.6 or higher

## Usage

1. Make the script executable:
   ```
   chmod +x mail_app_contacts_extractor.py
   ```

2. Run the script:
   ```
   python mail_app_contacts_extractor.py
   ```

3. When prompted, select the mailbox you want to process by entering its number or press Enter to use the Inbox.

4. The script will:
   - Connect to your Mail app
   - Fetch messages from the selected mailbox (maximum 500 by default)
   - Extract email addresses and names from message headers and bodies
   - Count the frequency of each email address
   - Save the results to a CSV file named `mail_app_contacts_YYYYMMDD_HHMMSS.csv`

## Output Format

The CSV file will contain the following columns:
- **Email**: The email address
- **Name**: The name associated with the email (if available)
- **Frequency**: How many times this email address appeared

## How Names Are Extracted

The script uses several methods to associate names with email addresses:

1. From email headers (From/To fields): These often contain names alongside email addresses
2. From email content: When an email address appears in the body, the script looks for nearby proper names

## Customization

You can modify the script to change the following parameters:

- `max_messages` in `extract_messages()`: Change the number of messages to process (default: 500)
- `EMAIL_PATTERN`: Modify the regex pattern used to extract email addresses
- `NAME_PATTERN`: Modify the regex pattern used to identify potential names

## Notes

- The script must be run on a Mac with the Mail app installed and configured
- The extraction process may take some time depending on the number of messages
- Email addresses found in the message body are matched with names that appear nearby in the text (within 100 characters)
- The name extraction is not perfect and may miss some names or include incorrect ones

## Troubleshooting

If you encounter any issues:

1. Make sure Mail app is not in the middle of syncing emails
2. Try restarting Mail app before running the script
3. If no mailboxes are found, check that your Mail app accounts are properly configured
4. If the script seems to hang, it might be processing a large mailbox - be patient 