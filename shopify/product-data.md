---
layout: default
title: Product Data Structure
---

# Product Data Structure

This document defines the standard data structure for products in the Welldonewood Shopify store.

## Complete Product Data Model

Each product in the Welldonewood catalog follows this comprehensive data structure:

```
PRODUCT DATA MODEL
├── Basic Information
│   ├── Title (Required): "Thermo Ash Decking"
│   ├── Product Type (Required): "Decking"
│   ├── Vendor (Required): "Welldonewood"
│   ├── Collections: ["Exterior", "Decking", "Featured Products"]
│   └── Tags: ["exterior", "thermally-modified", "ash", "decking"]
│
├── Descriptive Content
│   ├── Short Description (150 chars): "Premium thermally-modified ash decking with 25+ year durability."
│   ├── Full Description (HTML): [Comprehensive formatted description]
│   ├── Features List (HTML): [Bulleted features list]
│   └── Technical Specifications: [Table format]
│
├── Media Assets
│   ├── Primary Image (Required): [High-resolution product photo]
│   ├── Gallery Images (3-8 recommended): [Multiple angles, installation examples]
│   ├── Installation Video: [Embedded video link]
│   └── Product PDF: [Downloadable specification sheet]
│
├── Pricing Structure
│   ├── Base Price (Required): $X.XX per unit
│   ├── Price Unit: "per square foot" / "per board"
│   ├── Compare-at Price: [For sale items]
│   └── Volume Discount Tiers: [Quantity breakpoints]
│
├── Variants
│   ├── Length Options: [4ft, 6ft, 8ft, 10ft, 12ft, Custom]
│   ├── Width Options: [If applicable]
│   ├── Finish Options: [Sealed, Unsealed]
│   └── Grade Options: [Select, Standard, Rustic]
│
├── Inventory Management
│   ├── SKU Format: "WDW-[CATEGORY]-[WOOD]-[LENGTH]-[FINISH]"
│   ├── Barcode: [If applicable]
│   ├── Weight: X.X lbs
│   ├── Dimensions: L x W x H (in)
│   └── Inventory Policy: [Track/Don't track]
│
├── SEO Elements
│   ├── URL Handle: "thermo-ash-decking"
│   ├── Page Title: "Premium Thermo Ash Decking | Welldonewood"
│   ├── Meta Description: [150-160 character description]
│   └── Alt Text for Images: [Descriptive text for each image]
│
└── Metafields
    ├── technical_specs: [JSON structured data for specifications]
    ├── installation_guide: [Link to related guide]
    ├── maintenance_instructions: [Link to care guide]
    └── related_products: [Array of related product IDs]
```

## CSV Import Format

When importing products using CSV, use these column headers:

| CSV Header | Description | Example |
|------------|-------------|---------|
| Handle | Unique identifier | thermo-ash-decking |
| Title | Product name | Thermo Ash Decking |
| Body (HTML) | Description | `<p>Our premium thermo ash decking...</p>` |
| Vendor | Brand | Welldonewood |
| Product Category | Primary category | Home & Garden > Outdoor > Decking |
| Type | Product type | Decking |
| Tags | Comma-separated tags | exterior, thermo-treated, ash, decking |
| Published | Visibility | TRUE |
| Option1 Name | First option set | Length |
| Option1 Value | First option value | 8ft |
| Option2 Name | Second option set | Finish |
| Option2 Value | Second option value | Sealed |
| Variant SKU | Stock keeping unit | WDW-DECK-ASH-8FT-SEALED |
| Variant Price | Price | 89.99 |
| Variant Compare At Price | Original price | 99.99 |
| Variant Requires Shipping | Shipping flag | TRUE |
| Variant Taxable | Tax flag | TRUE |
| Variant Weight | Weight in pounds | 24 |
| Image Src | URL to image | https://cdn.shopify.com/... |
| Image Alt Text | Descriptive text | Close-up view of thermo ash decking |
| Metafield: custom.specs | Technical specs | `{"wood_type":"Ash", "treatment":"Thermal modification"}` |

## Product Content Guidelines

### Product Title Format

- Format: `[Treatment Type] [Wood Species] [Product Category]`
- Example: `Thermo Ash Decking` or `Thermo-Treated Pine Siding`

### Description Structure

Each product description should include:

1. **Opening Paragraph**: Overview of product with key benefits
2. **Features & Benefits**: Bulleted list of main selling points
3. **Technical Details**: Specifications relevant to the product
4. **Application Information**: Where and how to use the product
5. **Maintenance Requirements**: Care instructions
6. **Warranty Information**: Summary of warranty coverage

### Product Image Requirements

- **Primary Image**: Product on white background, 2000x2000px minimum
- **Gallery Images**:
  - In-use/installed product (minimum 2)
  - Close-up of texture/grain
  - Different angles
  - Available finishes
- **Format**: All images in JPG/PNG with WebP version
- **Quality**: High resolution, properly lit, color-corrected

## Shopify Metafields Configuration

Configure these metafields in Shopify admin:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| custom | specs | JSON string | Technical specifications |
| custom | features | List of text | Product features |
| custom | installation | Text | Installation guide link |
| custom | maintenance | Text | Maintenance info link |
| custom | warranty | Text | Warranty details |
| custom | related_products | List of references | Related product handles |

## Examples by Product Category

### Example: Decking Product

```json
{
  "title": "Thermo Ash Decking",
  "product_type": "Decking",
  "body_html": "<p>Our premium thermo-treated ash decking combines exceptional durability with natural beauty.</p><h3>Features:</h3><ul><li>25+ year durability without chemicals</li><li>Reduced expansion/contraction</li><li>Consistent coloration throughout</li><li>Resistant to rot, decay, and insects</li></ul>",
  "vendor": "Welldonewood",
  "tags": ["exterior", "decking", "thermo-treated", "ash", "chemical-free"],
  "variants": [
    {
      "title": "8ft - Sealed",
      "price": "89.99",
      "sku": "WDW-DECK-ASH-8FT-SEALED",
      "option1": "8ft",
      "option2": "Sealed"
    },
    {
      "title": "8ft - Unsealed",
      "price": "79.99",
      "sku": "WDW-DECK-ASH-8FT-UNSEALED",
      "option1": "8ft",
      "option2": "Unsealed"
    }
  ],
  "options": [
    {
      "name": "Length",
      "values": ["4ft", "6ft", "8ft", "10ft", "12ft", "Custom"]
    },
    {
      "name": "Finish",
      "values": ["Sealed", "Unsealed"]
    }
  ],
  "metafields": [
    {
      "namespace": "custom",
      "key": "specs",
      "value": "{\"wood_type\":\"Ash\",\"treatment\":\"Thermal modification\",\"durability\":\"25+ years\",\"dimensions\":\"5.5in x 0.75in\",\"coverage\":\"Actual coverage varies by board length\"}",
      "type": "json_string"
    }
  ]
}
```

## See Also

- [Collection Structure](./collections.md)
- [Import Process](./import-process.md) 