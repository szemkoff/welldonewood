# Collection Structure

This document outlines the collection hierarchy and organization for the Welldonewood Shopify store.

## Collection Hierarchy

The Welldonewood store uses a three-tier collection hierarchy to organize products:

```
COLLECTIONS HIERARCHY
├── Primary Collections (Main Product Categories)
│   ├── Secondary Collections (Subcategories)
│   │   └── Tertiary Collections (Specialized Groups)
```

## Primary Collections

Primary collections represent the main product categories shown in the main navigation.

| Collection | Handle | Description |
|------------|--------|-------------|
| Exterior Products | exterior-products | All products designed for outdoor use |
| Interior Products | interior-products | All products designed for indoor use |
| Specialty Products | specialty-products | Unique applications and custom solutions |

## Secondary Collections (By Product Type)

Secondary collections divide the primary categories into specific product types.

### Exterior Products

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Decking | decking | exterior-products | Boards for deck surfaces |
| Siding | siding | exterior-products | Exterior wall cladding materials |
| Fencing | fencing | exterior-products | Privacy and decorative fencing solutions |
| Pergolas & Structures | pergolas-structures | exterior-products | Shade structures and outdoor features |
| Outdoor Furniture | outdoor-furniture | exterior-products | Tables, chairs, and other outdoor furniture |

### Interior Products

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Flooring | flooring | interior-products | Interior floor covering materials |
| Wall Paneling | wall-paneling | interior-products | Interior wall cladding and accent materials |
| Ceiling Features | ceiling-features | interior-products | Accent beams and ceiling materials |
| Millwork | millwork | interior-products | Trim, molding, and custom woodwork |
| Furniture Components | furniture-components | interior-products | Wood pieces for furniture making |

### Specialty Products

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Sauna Materials | sauna-materials | specialty-products | Wood specifically for sauna construction |
| Sound Diffusion | sound-diffusion | specialty-products | Acoustic treatment solutions |
| Custom Projects | custom-projects | specialty-products | Materials for unique applications |
| Commercial Solutions | commercial-solutions | specialty-products | Products for commercial installations |

## Tertiary Collections (By Specifications)

Tertiary collections further refine secondary collections by specific attributes.

### Decking Collections

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Decking by Wood Type | decking-by-wood-type | decking | Organized by wood species |
| Decking by Profile | decking-by-profile | decking | Organized by board profile |
| Decking by Size | decking-by-size | decking | Organized by board dimensions |
| Decking Accessories | decking-accessories | decking | Fasteners, finishes, and maintenance items |

### Siding Collections

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Siding by Wood Type | siding-by-wood-type | siding | Organized by wood species |
| Siding by Profile | siding-by-profile | siding | Different profile options (lap, channel, etc.) |
| Siding by Application | siding-by-application | siding | Categorized by intended use |

### Flooring Collections

| Collection | Handle | Parent Collection | Description |
|------------|--------|-------------------|-------------|
| Flooring by Wood Type | flooring-by-wood-type | flooring | Organized by wood species |
| Flooring by Width | flooring-by-width | flooring | Narrow, standard, and wide planks |
| Flooring by Finish | flooring-by-finish | flooring | Pre-finished vs. unfinished options |

## Smart Collections

Smart collections are automatically populated based on product tags and conditions.

| Collection | Handle | Conditions | Description |
|------------|--------|------------|-------------|
| New Arrivals | new-arrivals | Created date is within last 60 days | Recently added products |
| Best Sellers | best-sellers | Sales count is top 20% | Most popular products |
| Featured Products | featured-products | Tagged with "featured" | Manually featured products |
| On Sale | on-sale | Compare-at price exists | Products with active discounts |
| Limited Edition | limited-edition | Tagged with "limited-edition" | Products with limited availability |

## Collection Templates

Each collection type uses a specific layout template:

| Collection Type | Template | Features |
|-----------------|----------|----------|
| Primary Collections | collection.primary | Hero banner, subcategory navigation, featured products |
| Secondary Collections | collection.secondary | Filter system, product grid, education section |
| Tertiary Collections | collection.tertiary | Streamlined filter system, product grid |
| Smart Collections | collection.smart | Dynamic banner, product grid, sorting options |

## Collection Metafields

Custom metafields enhance collection pages with additional information:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| collection | hero_image | file_reference | Hero banner image |
| collection | hero_text | single_line_text | Hero banner text overlay |
| collection | short_description | multi_line_text | Brief collection description |
| collection | long_description | rich_text | Detailed collection description for SEO |
| collection | featured_video | video_reference | Collection promotional video |
| collection | installation_guide | file_reference | PDF installation guide |
| collection | related_collections | list.metaobject_reference | Related collection references |
| collection | display_order | number | Order to display products (manual, price, etc.) |

## Collection Organization Best Practices

1. **Consistent Naming**: Use consistent naming conventions across all collections.
2. **SEO Optimization**: Include relevant keywords in collection titles and descriptions.
3. **Image Standards**: Use consistent aspect ratios for collection images.
4. **Navigation Logic**: Ensure intuitive navigation paths between related collections.
5. **Collection Limits**: Limit tertiary collections to maintain manageable navigation.
6. **Seasonal Updates**: Regularly update featured and seasonal collections.
7. **Automation**: Use automation rules to maintain smart collections.
8. **Cross-Linking**: Include cross-links between related collections.

## See Also

- [Product Data](./product-data.md)
- [Page Templates](./page-templates.md)
- [Shopify Implementation](./README.md) 