# Product Import Process

This document outlines the process for importing and managing product data in the Welldonewood Shopify store.

## Product Data Preparation

Before importing products into Shopify, data must be properly structured and validated according to the following workflow:

```
PRODUCT IMPORT WORKFLOW
├── Data Preparation
│   ├── Source Data Collection
│   ├── Data Standardization
│   ├── Image Preparation
│   └── Validation
│
├── Import Method Selection
│   ├── Shopify Admin UI
│   ├── CSV Import
│   └── API Integration
│
├── Import Execution
│   ├── Test Import
│   ├── Review & Validation
│   └── Production Import
│
└── Post-Import Tasks
    ├── Collection Assignment
    ├── Metafield Updates
    ├── SEO Optimization
    └── Testing & Verification
```

## Data Structure Requirements

### Required CSV Format

For bulk imports via CSV, the following column structure is required:

| Field | Description | Format | Example |
|-------|-------------|--------|---------|
| Handle | Unique product identifier | Lowercase, hyphenated | `thermo-pine-decking-1x6` |
| Title | Product display name | Title case | `Thermo-Treated Pine Decking 1×6` |
| Body (HTML) | Product description | HTML formatted | `<p>Our premium thermo-treated pine...</p>` |
| Vendor | Product manufacturer | Title case | `Welldonewood` |
| Product Category | Primary product category | Shopify category | `Home & Garden > Decking` |
| Type | Product type | Title case | `Decking` |
| Tags | Search and filter tags | Comma-separated | `exterior, pine, decking, thermo-treated` |
| Published | Product visibility | TRUE/FALSE | `TRUE` |
| Option1 Name | First variant option | Title case | `Length` |
| Option1 Value | First variant value | Standard unit | `8ft` |
| Option2 Name | Second variant option | Title case | `Finish` |
| Option2 Value | Second variant value | Title case | `Unfinished` |
| Variant SKU | Stock keeping unit | [CATEGORY]-[TYPE]-[VARIANT] | `DECK-PINE-8FT-UNF` |
| Variant Price | Retail price | Decimal, no symbol | `89.99` |
| Variant Compare At Price | Original/MSRP | Decimal, no symbol | `99.99` |
| Variant Requires Shipping | Shipping required | TRUE/FALSE | `TRUE` |
| Variant Taxable | Tax applicability | TRUE/FALSE | `TRUE` |
| Variant Inventory Tracker | Inventory tracking method | shopify | `shopify` |
| Variant Inventory Qty | Stock quantity | Integer | `25` |
| Variant Inventory Policy | Out of stock behavior | deny/continue | `deny` |
| Variant Fulfillment Service | Fulfillment method | manual | `manual` |
| Variant Weight | Product weight | Decimal | `16.5` |
| Variant Weight Unit | Weight unit | lb/kg/oz | `lb` |
| Image Src | Primary image URL | Full URL | `https://cdn.welldonewood.com/products/pine-decking-main.jpg` |
| Image Position | Image display order | Integer | `1` |
| Image Alt Text | Image alt attribute | Descriptive text | `Thermo-Treated Pine Decking Board Corner Detail` |

### Image Requirements

All product images should meet these specifications:

- **Format**: JPG or WebP (with JPG fallback)
- **Resolution**: Minimum 2000 x 2000 pixels
- **Aspect Ratio**: 1:1 (square) for primary images
- **File Size**: Under 5MB
- **Color Space**: sRGB
- **Background**: White (#FFFFFF) or transparent
- **Naming Convention**: `[product-handle]-[position]-[descriptor].[extension]`

### Product Variants Structure

Products with multiple variants should follow this structure:

1. **Primary Product Record**: Contains shared information
   - Title, description, product type, vendor, etc.
   - Options definitions (Names: Length, Finish, etc.)

2. **Variant Records**: One row per variant combination
   - Specific option values (8ft, Unfinished)
   - Variant-specific details (price, SKU, inventory, weight)

## Import Methods

### 1. Shopify Admin UI

**Best for**: Small product additions (1-10 products)

1. Navigate to Products > Add Product
2. Enter product details manually
3. Add variants if necessary
4. Upload images
5. Set inventory, shipping, and organization options
6. Click Save

### 2. CSV Import

**Best for**: Bulk product additions (10+ products)

1. Prepare CSV file according to Shopify's template
2. Navigate to Products > Import
3. Upload CSV file
4. Review validation results
5. Confirm import
6. Verify imported products

### 3. API Integration

**Best for**: Automated or recurring imports

```javascript
// Example Shopify API product creation
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'welldonewood',
  apiKey: 'API_KEY',
  password: 'API_PASSWORD'
});

const productData = {
  title: 'Thermo-Treated Pine Decking 1×6',
  body_html: '<p>Our premium thermo-treated pine decking...</p>',
  vendor: 'Welldonewood',
  product_type: 'Decking',
  tags: ['exterior', 'pine', 'decking', 'thermo-treated'],
  variants: [
    {
      option1: '8ft',
      option2: 'Unfinished',
      price: '89.99',
      sku: 'DECK-PINE-8FT-UNF',
      inventory_quantity: 25,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      requires_shipping: true,
      taxable: true,
      weight: 16.5,
      weight_unit: 'lb'
    }
    // Additional variants...
  ],
  options: [
    {
      name: 'Length'
    },
    {
      name: 'Finish'
    }
  ],
  images: [
    {
      src: 'https://cdn.welldonewood.com/products/pine-decking-main.jpg',
      position: 1,
      alt: 'Thermo-Treated Pine Decking Board Corner Detail'
    }
    // Additional images...
  ]
};

shopify.product.create(productData)
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

## Product Metafields Implementation

After importing base product data, add these metafields for enhanced functionality:

### Product Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| product | installation_guide | file_reference | PDF installation guide |
| product | specification_sheet | file_reference | PDF technical specs |
| product | warranty_info | rich_text | Warranty details |
| product | features | list.single_line_text | Key product features |
| product | applications | list.single_line_text | Recommended applications |
| product | durability_rating | number_integer | 1-10 durability score |
| product | thermal_treatment_temp | number_integer | Treatment temperature (°C) |
| product | material_source | single_line_text | Wood sourcing information |
| product | sustainability_certification | single_line_text | FSC, PEFC, etc. |
| product | dimensions_chart | metaobject_reference | Reference to dimensions chart |
| product | related_products | list.product_reference | Manual related products |
| product | video_tutorial | video_reference | Product installation video |

### Variant Metafields

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| variant | coverage_area | number_decimal | Coverage in square feet |
| variant | unit_of_measure | single_line_text | Measurement unit type |
| variant | board_thickness | number_decimal | Thickness in inches |
| variant | board_width | number_decimal | Width in inches |
| variant | board_length | number_decimal | Length in feet |
| variant | treatment_grade | single_line_text | Level of thermal treatment |
| variant | minimum_order | number_integer | Minimum order quantity |
| variant | estimated_shipping | single_line_text | Estimated shipping time |
| variant | special_order | boolean | Whether variant is special order |

## Post-Import Tasks

After importing products, complete these essential tasks:

### 1. Collection Assignment

Assign products to appropriate collections:
- Primary collections (Exterior Products, Interior Products, etc.)
- Secondary collections (Decking, Siding, Flooring, etc.)
- Smart collections (New Arrivals, Featured Products, etc.)

### 2. SEO Optimization

Enhance product SEO by:
- Reviewing and optimizing product titles
- Adding keyword-rich descriptions
- Setting canonical URLs for variant pages
- Creating custom meta descriptions
- Optimizing image alt text

### 3. Product Organization

Improve product organization by:
- Standardizing product tags
- Setting up product categories
- Creating product types
- Establishing vendor information

### 4. Testing & Verification

Thoroughly test imported products by:
- Verifying all variants appear correctly
- Checking inventory tracking
- Testing the add-to-cart process
- Reviewing product on mobile devices
- Verifying search functionality
- Testing collection filters

## Common Issues and Solutions

| Issue | Potential Cause | Solution |
|-------|-----------------|----------|
| Missing Images | Incorrect URLs or permissions | Verify image URLs are accessible and correctly formatted |
| Duplicate Variants | Identical option combinations | Check for duplicate option values in CSV |
| Price Formatting Issues | Currency symbols or wrong format | Ensure prices use decimal format without symbols |
| Inventory Not Tracking | Incorrect inventory settings | Verify inventory tracker is set to 'shopify' |
| Variants Not Appearing | Missing option values | Check that all variants have complete option values |
| Product Not in Collections | Missing collection assignment | Manually assign products to collections |
| SEO Issues | Missing meta information | Add SEO title, description, and URL handle |

## Regular Maintenance

Establish these regular processes for product data management:

- **Daily**: Monitor inventory levels and adjust as needed
- **Weekly**: Update product promotions and featured collections
- **Monthly**: Review product performance and adjust pricing
- **Quarterly**: Audit product data completeness and accuracy
- **Annually**: Complete catalog review and cleanup

## See Also

- [Product Data Structure](./product-data.md)
- [Collections Structure](./collections.md)
- [Shopify Implementation](./README.md) 