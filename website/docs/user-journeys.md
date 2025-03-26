---
id: user-journeys
title: User Journeys
sidebar_position: 5
---

# User Journeys

This document outlines the primary user journeys on the Welldonewood website.

## Product Discovery Journey

```mermaid
journey
    title Product Discovery & Purchase Journey
    section Discovery
      Visit homepage: 5: User
      Browse product categories: 4: User
      View product details: 5: User
    section Consideration
      Read product specifications: 4: User
      View product gallery: 5: User
      Check pricing: 3: User
    section Conversion
      Contact for quote: 4: User
      Receive quote: 3: User, Admin
      Place order: 5: User
```

### Key Touchpoints

The product discovery journey includes several key touchpoints:

1. **Entry Points**:
   - Direct URL
   - Search engine results
   - Social media links

2. **Navigation Paths**:
   - Homepage featured products → Product detail
   - Products page → Category → Product detail
   - Blog post → Related product

3. **Conversion Points**:
   - Contact form submissions
   - Quote requests
   - Direct orders

## Newsletter Subscription Journey

```mermaid
stateDiagram-v2
    [*] --> Homepage
    Homepage --> NewsletterForm: Sees value proposition
    NewsletterForm --> FormCompletion: Enters email
    FormCompletion --> SubmissionSuccess: Submits form
    SubmissionSuccess --> WelcomeEmail: Automated
    WelcomeEmail --> [*]

    state NewsletterForm {
        [*] --> InputEmail
        InputEmail --> Validation
        Validation --> [*]
    }
```

### Journey Optimization

The newsletter subscription process has been optimized for conversion with:

- Minimal required fields (just email)
- Clear value proposition
- Prominent placement on homepage
- Mobile-friendly design
- Immediate confirmation

## Content Engagement Journey

```mermaid
flowchart TD
    A[User Arrives] --> B{Interest Point}
    B -->|Blog Content| C[Reads Blog Post]
    B -->|Product Focus| D[Browses Products]
    B -->|Company Info| E[Visits About Page]
    
    C --> F[Explores Related Posts]
    C --> G[Checks Related Products]
    
    D --> H[Views Product Details]
    D --> I[Contacts for Information]
    
    E --> J[Learns About Process]
    E --> K[Views Portfolio]
    
    F & G & H & I & J & K --> L[Newsletter Signup]
    L --> M[Continued Engagement]
```

## User Feedback Flow

```mermaid
sequenceDiagram
    participant User
    participant Website
    participant Admin
    
    User->>Website: Uses contact form
    User->>Website: Provides feedback
    Website->>Admin: Notification of feedback
    Admin->>User: Personalized response
    Admin->>Website: Implements improvements
    Website->>User: Enhanced experience
```

### Feedback Integration

User feedback is integrated into the development process through:

1. Collection via contact forms
2. Regular review of submissions
3. Prioritization of improvements
4. Implementation in development cycles
5. Follow-up with users who provided feedback 