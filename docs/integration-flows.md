---
id: integration-flows
title: Integration Flows
sidebar_position: 4
---

# Integration Flows

The website integrates with several third-party services to handle user interactions and marketing.

## Newsletter Signup Flow

```mermaid
sequenceDiagram
    participant User
    participant Website
    participant NetlifyForms
    participant MailerLite
    
    User->>Website: Submits newsletter form
    Website->>NetlifyForms: Form submission
    NetlifyForms->>MailerLite: Contact added to list
    MailerLite->>User: Welcome email
```

### Process Steps

1. User fills out the newsletter form on the homepage
2. Netlify Forms captures the submission
3. Data is exported to MailerLite via API
4. User receives a welcome email (automated)

## Contact Form Flow

```mermaid
sequenceDiagram
    participant User
    participant Website
    participant NetlifyForms
    participant Admin
    
    User->>Website: Fills contact form
    Website->>NetlifyForms: Submits form data
    NetlifyForms-->>User: Shows success message
    NetlifyForms->>Admin: Email notification
    Admin->>User: Personal response
```

### Form Implementation

The forms are implemented using Netlify Forms, which provides:

- Built-in spam filtering
- Email notifications
- Data export options
- No server-side code required

## Third-Party Integrations

The website integrates with the following services:

- **Netlify**: Hosting, forms, and continuous deployment
- **MailerLite**: Email marketing and newsletter management
- **Google Analytics**: User behavior tracking and analytics

## API Authentication

All API integrations use secure authentication methods:

- Environment variables for API keys
- Netlify Functions for server-side API calls
- No client-side exposure of sensitive credentials 