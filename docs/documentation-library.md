# Welldonewood Documentation Library

## Table of Contents
1. [Site Structure](#site-structure)
2. [Technical Architecture](#technical-architecture)
3. [Integration Flows](#integration-flows)
4. [User Journeys](#user-journeys)
5. [Development Guidelines](#development-guidelines)
6. [Content Management](#content-management)

## Site Structure

The Welldonewood website follows a structured approach to present woodworking products and services effectively.

```mermaid
graph TD
    Home[Home Page] --> Products[Product Pages]
    Home --> About[About Us]
    Home --> Contact[Contact Page]
    Home --> Blog[Blog]
    Products --> ProductDetail[Product Detail Pages]
    Blog --> BlogPost[Blog Posts]
    
    classDef current fill:#f9f,stroke:#333,stroke-width:2px;
    class Home current;
```

### Current Pages
- **Home Page**: Main landing page with hero section, featured products, and newsletter signup
- **Products**: (To be implemented) Overview of product categories
- **About Us**: (To be implemented) Company history and values
- **Contact**: (To be implemented) Contact form and information
- **Blog**: (To be implemented) Woodworking tips and company updates

## Technical Architecture

The website is built using a modern web stack designed for performance and SEO optimization.

```mermaid
graph LR
    HTML[HTML] --> CSS[CSS]
    HTML --> JS[JavaScript]
    JS --> FormHandling[Form Handling]
    FormHandling --> Netlify[Netlify Forms]
    Netlify --> MailerLite[MailerLite]
    
    classDef implemented fill:#bfb,stroke:#333,stroke-width:1px;
    classDef planned fill:#fbf,stroke:#333,stroke-width:1px;
    
    class HTML,CSS,JS,FormHandling,Netlify implemented;
    class MailerLite planned;
```

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Netlify
- **Form Processing**: Netlify Forms
- **Email Marketing**: MailerLite (planned integration)
- **Analytics**: Google Analytics (planned)

## Integration Flows

The website integrates with several third-party services to handle user interactions and marketing.

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

### Form Handling
1. User fills out the newsletter form on the homepage
2. Netlify Forms captures the submission
3. Data is exported to MailerLite via API
4. User receives a welcome email (automated)

## User Journeys

Understanding how users navigate through the site helps optimize the user experience.

```mermaid
journey
    title Welldonewood Customer Journey
    section Discovery
      Find website: 5: User
      Browse homepage: 3: User
      View products: 4: User
    section Engagement
      Sign up for newsletter: 3: User
      Contact for inquiry: 4: User
    section Conversion
      Make purchase: 5: User
```

### Primary User Flows
- **Product Discovery**: Homepage → Product Category → Product Detail → Contact
- **Newsletter Signup**: Homepage → Newsletter Form → Confirmation
- **Blog Engagement**: Homepage → Blog → Article → Related Products

## Development Guidelines

Best practices for maintaining and extending the website.

```mermaid
graph TD
    DevProcess[Development Process] --> GitFlow[Git Workflow]
    DevProcess --> CodeStandards[Coding Standards]
    DevProcess --> Testing[Testing]
    
    GitFlow --> Feature[Feature Branches]
    GitFlow --> PR[Pull Requests]
    
    CodeStandards --> HTML[HTML Best Practices]
    CodeStandards --> CSS[CSS Organization]
    CodeStandards --> JS[JavaScript Patterns]
    
    Testing --> Cross[Cross-browser Testing]
    Testing --> Mobile[Mobile Responsiveness]
    Testing --> Performance[Performance Testing]
```

### Development Workflow
1. Create feature branch from main
2. Implement changes following coding standards
3. Test across browsers and devices
4. Create pull request with detailed description
5. Deploy to staging environment
6. Review and merge to main branch
7. Deploy to production

## Content Management

Guidelines for maintaining and updating website content.

```mermaid
graph LR
    Content[Content Management] --> Products[Product Updates]
    Content --> Blog[Blog Articles]
    Content --> SEO[SEO Optimization]
    
    Products --> Images[Product Images]
    Products --> Descriptions[Product Descriptions]
    Products --> Pricing[Pricing Updates]
    
    Blog --> Topics[Topic Selection]
    Blog --> Writing[Content Creation]
    Blog --> Publishing[Publishing Schedule]
    
    SEO --> Keywords[Keyword Research]
    SEO --> Meta[Meta Information]
    SEO --> Analytics[Performance Analysis]
```

### Content Update Process
1. Prepare content assets (text, images, videos)
2. Optimize media for web performance
3. Update relevant HTML pages
4. Add appropriate metadata and schema markup
5. Commit changes to GitHub
6. Deploy to production

---

*Note: This documentation is a living document and will be updated as the website evolves.*