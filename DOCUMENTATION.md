# Welldonewood Social Media Hub

This project creates a comprehensive Google Sheets based Social Media Hub for managing content across multiple platforms at no cost.

## Overview

The Social Media Hub consists of 6 interconnected tabs that help track, plan, and analyze your social media content:

1. **Dashboard** - Overview with metrics and upcoming deadlines
2. **Content Calendar** - Schedule of posts across all platforms
3. **Content Ideas** - Repository for future content concepts
4. **Analytics Tracker** - Performance tracking for posts
5. **Asset Inventory** - Organization system for media files
6. **UTM Builder** - Tool to create tracking links for campaigns

## Setup Instructions

### Prerequisites

- Node.js installed
- Google Cloud Platform account
- OAuth 2.0 Client ID credentials

### Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Place your OAuth credentials JSON file in the project root as `credentials.json`
4. Run `node oauth-createHub.js` to create the spreadsheet
5. Follow the authorization flow in your browser
6. The script will create a fully formatted spreadsheet in your Google Drive

## Using the Social Media Hub

### Content Planning Workflow

1. Add content ideas in the "Content Ideas" tab
2. Schedule approved ideas in the "Content Calendar" tab
3. Track content assets in the "Asset Inventory" tab
4. Create tracking links with the "UTM Builder" tab
5. Record performance metrics in the "Analytics Tracker" tab
6. Monitor overall performance on the "Dashboard" tab

### Integration with Free Tools

The hub is designed to work with:

- **Google Sheets** - As the central database
- **Buffer Free Plan** - For scheduling posts (up to 10 per platform)
- **Facebook Business Suite** - For Facebook/Instagram management
- **IFTTT** - For cross-platform automation

## Security Notes

- The OAuth token is stored locally in `token.json`
- Never commit credentials or tokens to version control
- The application will request permission only for Google Sheets and Drive access

## File Structure

- `oauth-createHub.js` - Main script that creates the hub
- `setup.js` - Helper script for setting up credentials
- `test-credentials.js` - Script to validate credentials

## License

This project is licensed under the MIT License - see the LICENSE file for details. 