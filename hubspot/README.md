---
layout: default
title: HubSpot Integration for Welldonewood
---

# HubSpot Integration for Welldonewood

This document outlines the HubSpot integration for the Welldonewood marketing automation and CRM.

## Integration Overview

HubSpot serves as the marketing automation and customer relationship management (CRM) platform for Welldonewood, integrated with our Shopify e-commerce store.

```
flowchart TD
    A[Shopify Store] --> B[Customer Data]
    A --> C[Order Data]
    A --> D[Product Data]
    
    B --> E[HubSpot CRM]
    C --> E
    D --> E
    
    E --> F[Marketing Automation]
    E --> G[Email Campaigns]
    E --> H[Lead Scoring]
    E --> I[Customer Segmentation]
```

## Automation Workflows

HubSpot workflows enable automated marketing, sales, and service processes based on triggers and actions. Welldonewood implements the following core workflow types:

```
flowchart TD
    A[Triggers] --> B[Actions]
    B --> C[Goals]
    
    A --> A1[Form Submissions]
    A --> A2[Property Changes]
    A --> A3[List Membership]
    A --> A4[Page Views]
    A --> A5[Shopify Events]
    
    B --> B1[Send Emails]
    B --> B2[Update Properties]
    B --> B3[Create Tasks]
    B --> B4[Send Notifications]
    B --> B5[Conditional Logic]
    
    C --> C1[Purchase Made]
    C --> C2[Form Submitted]
    C --> C3[Meeting Booked]
    C --> C4[Review Given]
```

### Core Marketing Workflows

1. **Welcome Series**
   - Trigger: New contact creation or newsletter subscription
   - Sequence: 4 emails over 14 days introducing thermal treatment technology
   - Goal: First purchase or consultation booking

2. **Abandoned Cart Recovery**
   - Trigger: Cart abandoned in Shopify
   - Sequence: Cart reminder (4h) → Product benefits (24h) → Special offer (72h)
   - Goal: Cart recovery and purchase completion

3. **Post-Purchase Sequence**
   - Trigger: Order completed in Shopify
   - Sequence: Order confirmation → Shipping confirmation → Installation guide → Review request → Maintenance reminder
   - Goal: Customer review submission or repeat purchase

### Core Sales Workflows

1. **Lead Qualification**
   - Automated lead scoring based on website engagement and email interaction
   - Sample request follow-up process
   - Quote and proposal follow-up sequences

2. **Deal Management**
   - Deal stage progression monitoring
   - Automated follow-ups for stalled deals
   - Win/loss analysis processes

### Customer Segmentation

Behavioral and demographic segmentation workflows maintain dynamic lists based on:

- Purchase history (first-time, repeat, VIP, dormant)
- Product interest (exterior, interior, specific categories)
- Customer type (DIY, contractor, architect)
- Geographic location (climate zone, region)

## Data Syncing Architecture

The following data is synchronized between Shopify and HubSpot:

| Shopify Data | HubSpot Object | Direction | Frequency |
|--------------|----------------|-----------|-----------|
| Customers | Contacts | Shopify → HubSpot | Real-time |
| Orders | Deals | Shopify → HubSpot | Real-time |
| Products | Products | Shopify → HubSpot | Daily |
| Abandoned Carts | Custom Object | Shopify → HubSpot | Hourly |
| Email Campaigns | Email Data | HubSpot → Shopify | As needed |

## Email Marketing Campaigns

### Campaign Types

1. **Welcome Series**
   - Trigger: New account creation
   - Sequence: 4 emails over 14 days
   - Content: Introduction to thermally modified wood technology and products

2. **Abandoned Cart**
   - Trigger: Cart abandoned for 4+ hours
   - Sequence: 3 emails over 72 hours
   - Content: Cart reminder, product benefits, incentive

3. **Post-Purchase**
   - Trigger: Order completion
   - Sequence: 5 emails over 90 days
   - Content: Order confirmation, shipping, installation guide, review request, maintenance reminder

4. **Re-engagement**
   - Trigger: No purchase in 180+ days
   - Sequence: 3 emails over 14 days
   - Content: New products, project inspiration, special offer

### Email Template Structure

Each email follows this structure:

```
EMAIL TEMPLATE
├── Header
│   ├── Logo
│   └── Navigation Bar
│
├── Hero Section
│   ├── Primary Message
│   ├── Supporting Image
│   └── Primary CTA
│
├── Content Blocks (1-3)
│   ├── Section Heading
│   ├── Body Copy
│   ├── Supporting Image/Graphic
│   └── Secondary CTA
│
├── Social Proof
│   ├── Testimonial OR
│   └── Product Reviews
│
├── Related Products
│   └── 2-3 Product Recommendations
│
└── Footer
    ├── Contact Information
    ├── Social Media Links
    ├── Unsubscribe Link
    └── Legal Text
```

## Customer Segmentation Strategy

Customers are segmented in HubSpot based on:

### Behavioral Segments

- **Purchase History**
  - First-time buyers
  - Repeat customers (2+ purchases)
  - VIP customers ($1000+ lifetime value)
  - Dormant customers (no purchase in 12+ months)

- **Product Interest**
  - Exterior products
  - Interior products
  - Specific product categories (decking, siding, etc.)

### Demographic Segments

- **Customer Type**
  - DIY homeowners
  - Professional contractors
  - Architects/designers
  - Wholesale/distributor

- **Geographic Location**
  - Climate zone (relevant for wood performance)
  - Region/state
  - Urban vs. rural

## API Integration

### Authentication

HubSpot API integration uses OAuth 2.0 for authentication:

```javascript
// HubSpot Authentication Example
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ 
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
});
```

### Contact Creation

```javascript
// Contact Creation Example
async function createContact(shopifyCustomer) {
  try {
    const contactObj = {
      properties: {
        email: shopifyCustomer.email,
        firstname: shopifyCustomer.first_name,
        lastname: shopifyCustomer.last_name,
        phone: shopifyCustomer.phone,
        address: shopifyCustomer.default_address?.address1,
        city: shopifyCustomer.default_address?.city,
        state: shopifyCustomer.default_address?.province,
        zip: shopifyCustomer.default_address?.zip,
        customer_type: 'shopify_customer',
        shopify_id: shopifyCustomer.id.toString()
      }
    };
    
    const result = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    return result;
  } catch (error) {
    console.error('Error creating contact:', error.message);
    throw error;
  }
}
```

### Deal Creation (Order Sync)

```javascript
// Deal Creation Example
async function createDeal(shopifyOrder, contactId) {
  try {
    const dealObj = {
      properties: {
        dealname: `Order #${shopifyOrder.order_number}`,
        amount: shopifyOrder.total_price,
        dealstage: 'closedwon',
        pipeline: 'default',
        closedate: new Date(shopifyOrder.created_at).getTime(),
        shopify_order_id: shopifyOrder.id.toString()
      },
      associations: [
        {
          to: {
            id: contactId
          },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3
            }
          ]
        }
      ]
    };
    
    const result = await hubspotClient.crm.deals.basicApi.create(dealObj);
    return result;
  } catch (error) {
    console.error('Error creating deal:', error.message);
    throw error;
  }
}
```

## Implementation Timeline

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | HubSpot account setup | Completed |
| 2 | Basic Shopify integration | Pending |
| 3 | Contact/customer sync | Pending |
| 4 | Email template development | Pending |
| 5 | Automation workflow setup | Pending |
| 6 | Testing and optimization | Pending |

## Maintenance Guidelines

### Workflow Management

- **Naming Convention**: Use `[Category] - [Purpose] - [Version]` format
- **Testing**: Test on sample records before activation
- **Monitoring**: Review performance metrics weekly
- **Auditing**: Conduct quarterly workflow audits
- **Documentation**: Maintain documentation of all active workflows

### Performance Metrics

Monitor these key metrics for all automation workflows:

| Metric | Target | Monitoring Frequency |
|--------|--------|----------------------|
| Enrollment Rate | Varies by workflow | Weekly |
| Goal Completion Rate | >25% | Monthly |
| Email Open Rate | >30% | Weekly |
| Email Click Rate | >5% | Weekly |
| Revenue Attribution | Varies by workflow | Monthly |

## See Also

- [Email Campaign Templates](./email-templates.md)
- [Automation Workflows](./automation-workflows.md)
- [Shopify Integration](../shopify/README.md) 