# Automation Workflows

This document outlines the standard automation workflows implemented in HubSpot for Welldonewood's marketing and sales processes.

## Workflow Overview

HubSpot automation workflows enable Welldonewood to create personalized customer experiences, streamline marketing processes, and ensure consistent follow-up. Each workflow follows the trigger → action → goal structure.

```
WORKFLOW STRUCTURE
├── Trigger (Enrollment Criteria)
│   ├── Form Submission
│   ├── Property Change
│   ├── List Membership
│   ├── Page View
│   ├── Event
│   └── Date-based
│
├── Actions (Sequential Steps)
│   ├── Email Sends
│   ├── Property Updates
│   ├── Notifications
│   ├── Task Creation
│   ├── Delays
│   └── Conditional Branches
│
└── Goals (Success Criteria)
    ├── Purchase
    ├── Form Submission
    ├── Property Change
    ├── Page View
    └── Custom Goal
```

## Marketing Automation Workflows

### 1. Lead Nurturing Workflows

#### Welcome Series Workflow
- **Trigger**: New contact created OR newsletter subscription
- **Actions**:
  1. Delay: Wait until working hours (9 AM - 5 PM)
  2. Send Email: Welcome email
  3. Delay: 3 days
  4. Send Email: Technology deep dive
  5. Delay: 7 days
  6. Send Email: Product showcase
  7. Delay: 5 days
  8. Send Email: Installation resources
- **Goal**: Contact makes a purchase OR books a consultation
- **Suppression List**: Current customers

#### Content Download Follow-up
- **Trigger**: Downloads resource (installation guide, technical specs, etc.)
- **Actions**:
  1. Property Update: Add download topic to contact record
  2. Delay: 1 day
  3. Send Email: Follow-up with related content
  4. Delay: 3 days
  5. Send Email: Product recommendations based on download topic
  6. Delay: 7 days
  7. IF Contact Score > 50, THEN:
     - Send Email: Consultation offer
     - Create Task: Sales rep follow-up
     ELSE:
     - Send Email: Additional educational content
- **Goal**: Contact requests consultation OR makes purchase
- **Suppression List**: Contacts who purchased related products

### 2. E-commerce Workflows

#### Abandoned Cart Recovery
- **Trigger**: Cart abandoned (Shopify integration data)
- **Actions**:
  1. Delay: 4 hours
  2. Send Email: Cart reminder
  3. Delay: 24 hours
  4. IF Cart Value > $500, THEN:
     - Create Task: Sales rep follow-up call
     ELSE:
     - Send Email: Product benefits
  5. Delay: 48 hours
  6. Send Email: Special offer (10% discount)
- **Goal**: Cart recovery (purchase completed)
- **Suppression List**: Repeat cart abandoners (>3 in 30 days)

#### Post-Purchase Sequence
- **Trigger**: Purchase completed (Shopify order)
- **Actions**:
  1. Send Email: Order confirmation
  2. Property Update: Customer status = Active
  3. Delay: Wait until shipping confirmation from Shopify
  4. Send Email: Shipping confirmation
  5. Delay: 5 days after delivery date
  6. Send Email: Installation guide
  7. Delay: 14 days after delivery date
  8. Send Email: Review request
  9. Delay: 90 days after delivery date
  10. Send Email: Maintenance reminder
- **Goal**: Customer submits review OR makes repeat purchase
- **Suppression List**: Customers who have submitted support tickets

#### Re-engagement Campaign
- **Trigger**: No purchase in 180+ days
- **Actions**:
  1. Send Email: New products update
  2. Delay: 7 days
  3. IF Opened Previous Email, THEN:
     - Send Email: Project inspiration
     ELSE:
     - Send Email: "We miss you" + discount
  4. Delay: 7 days
  5. IF No Engagement, THEN:
     - Send Email: Final special offer
     - Delay: 7 days
     - IF No Engagement, THEN:
       - Property Update: Lifecycle stage = Dormant
- **Goal**: Contact makes a purchase
- **Suppression List**: Unsubscribed contacts

## Sales Automation Workflows

### 1. Lead Qualification Workflows

#### Lead Scoring
- **Trigger**: New contact created
- **Actions**:
  1. Property Update: Initialize lead score = 0
  2. Increment Score Based On:
     - Page views: Technology page (+5), Product pages (+3)
     - Form submissions: Contact form (+10), Sample request (+20)
     - Email engagement: Opens (+1), Clicks (+3)
     - Shopify data: Cart creation (+15)
  3. IF Lead Score > 50, THEN:
     - Property Update: Lifecycle stage = Sales Qualified Lead
     - Create Task: Sales rep follow-up
     - Send Internal Notification: New SQL
- **Goal**: Contact becomes SQL
- **Suppression List**: Current customers

#### Sample Request Follow-up
- **Trigger**: Sample request form submission
- **Actions**:
  1. Property Update: Requested sample type(s)
  2. Create Task: Process sample request
  3. Send Email: Sample request confirmation
  4. Delay: 1 day
  5. Send Internal Notification: Sample request pending
  6. Delay: 3 days (or until sample ships)
  7. Send Email: Sample shipment notification
  8. Delay: 7 days after delivery
  9. Send Email: Sample follow-up + consultation offer
  10. Delay: 3 days
  11. IF No Response, THEN:
      - Create Task: Sales call follow-up
- **Goal**: Contact books consultation OR makes purchase
- **Suppression List**: Contacts with open support tickets

### 2. Deal Management Workflows

#### Deal Stage Progression
- **Trigger**: Deal created
- **Actions**:
  1. Send Internal Notification: New deal created
  2. IF Deal Amount > $5,000, THEN:
     - Create Task: Sales manager review
  3. Delay: 3 days
  4. IF Deal Stage Unchanged, THEN:
     - Create Task: Deal follow-up
     - Send Internal Notification: Stalled deal
  5. Monitor Deal Stage Changes:
     - Stage = Proposal Sent: Create Task for follow-up in 3 days
     - Stage = Closed Won: Trigger customer onboarding workflow
     - Stage = Closed Lost: Create Task for loss analysis
- **Goal**: Deal stage = Closed Won
- **Suppression List**: Deals tagged as "On Hold"

#### Quote Follow-up
- **Trigger**: Quote sent (deal stage = Proposal Sent)
- **Actions**:
  1. Delay: 2 days
  2. Send Email: Quote follow-up
  3. Delay: 3 days
  4. IF Quote Unopened, THEN:
     - Create Task: Sales call follow-up
  5. Delay: 7 days
  6. IF Deal Stage Unchanged, THEN:
     - Send Email: Quote reminder + testimonials
     - Create Task: Final quote follow-up
- **Goal**: Deal stage = Presentation Scheduled OR Deal stage = Closed Won
- **Suppression List**: Deals tagged as "Do Not Follow Up"

## Customer Service Workflows

### Support Ticket Management
- **Trigger**: New support ticket created
- **Actions**:
  1. Send Email: Support ticket confirmation
  2. Create Task: Initial response (due in 4 hours)
  3. Send Internal Notification: New support ticket
  4. IF Priority = High, THEN:
     - Send Internal Notification to Support Manager
  5. Monitor Ticket Status:
     - IF Status = Waiting on Customer (24+ hours), THEN:
       - Send Email: Ticket follow-up
     - IF Status = Resolved, THEN:
       - Send Email: Support satisfaction survey
- **Goal**: Ticket status = Closed
- **Suppression List**: Contacts with multiple open tickets

### Feedback Collection
- **Trigger**: Support ticket closed
- **Actions**:
  1. Delay: 1 day
  2. Send Email: Support satisfaction survey
  3. Delay: 3 days
  4. IF Survey Completed, THEN:
     - IF Rating < 8, THEN:
       - Create Task: Follow up on negative feedback
       - Send Internal Notification: Low satisfaction score
     - IF Rating >= 8, THEN:
       - Send Email: Thank you + review request
  5. Update Contact Properties: Last Survey Date, Satisfaction Score
- **Goal**: Survey completion
- **Suppression List**: Contacts surveyed in last 30 days

## Segmentation Workflows

### Customer Lifecycle Workflows
- **Trigger**: Contact property changes
- **Actions**: 
  1. Update Lifecycle Stage Based On:
     - First purchase: Lifecycle stage = Customer
     - Purchase > $1,000: Lifecycle stage = VIP Customer
     - Inactive 12+ months: Lifecycle stage = Dormant Customer
  2. Apply Corresponding List Memberships
  3. Set Next Actions Based On Segment:
     - New Customers: Trigger onboarding workflow
     - VIP Customers: Create task for account manager assignment
     - Dormant Customers: Enroll in re-engagement workflow
- **Goal**: Proper segmentation of all contacts
- **Run**: Daily at midnight

### Interest-Based Segmentation
- **Trigger**: Page views, form submissions, email clicks
- **Actions**:
  1. Track Product Interest:
     - Decking page views: Add "Decking" to interests
     - Siding page views: Add "Siding" to interests
     - Flooring page views: Add "Flooring" to interests
  2. Track Project Type:
     - DIY content engagement: Add "DIY" to persona
     - Professional resources: Add "Contractor" to persona
  3. Apply List Memberships Based On:
     - Primary Interest
     - Project Type
     - Geographic Region
  4. Update Contact Owner Based On Segmentation
- **Goal**: All contacts have defined interests
- **Run**: Continuously

## Implementation Guidelines

### Workflow Naming Convention

All workflows should follow this naming convention:
`[Category] - [Purpose] - [Version]`

Examples:
- `Marketing - Welcome Series - v2`
- `Sales - Sample Request Follow-up - v1`
- `Service - Support Ticket Management - v3`

### Testing Protocol

Before activating any workflow:

1. Create test contacts/companies
2. Enroll test records manually
3. Verify all actions execute correctly
4. Check for conflicts with other workflows
5. Activate for a small segment before full deployment

### Maintenance Schedule

- Monthly: Review workflow performance metrics
- Quarterly: Audit all active workflows
- Bi-annually: Comprehensive optimization review

## Performance Metrics

Track these key metrics for each workflow:

| Metric | Target | Monitoring Frequency |
|--------|--------|----------------------|
| Enrollment Rate | Varies by workflow | Weekly |
| Goal Completion Rate | >25% | Monthly |
| Email Open Rate | >30% | Weekly |
| Email Click Rate | >5% | Weekly |
| Revenue Attribution | Varies by workflow | Monthly |
| Workflow Errors | 0 | Daily |

## See Also

- [Email Campaign Templates](./email-templates.md)
- [HubSpot Integration](./README.md)
- [Shopify Integration](../shopify/README.md) 