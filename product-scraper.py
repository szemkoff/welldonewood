#!/usr/bin/env python3
"""
Product Scraper for Shopify Import
----------------------------------
This script extracts product data from a website and converts it to Shopify CSV format.
"""

import os
import csv
import time
import requests
import argparse
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Set up command line arguments
parser = argparse.ArgumentParser(description='Scrape product data from a website for Shopify import')
parser.add_argument('url', help='Base URL of the store to scrape (e.g., https://example.com/products/)')
parser.add_argument('--output', default='shopify_import.csv', help='Output CSV file name')
parser.add_argument('--image-dir', default='product_images', help='Directory to save product images')
parser.add_argument('--delay', type=float, default=1.0, help='Delay between requests in seconds')
parser.add_argument('--max', type=int, default=0, help='Maximum number of products to scrape (0 for unlimited)')
args = parser.parse_args()

# Create image directory if it doesn't exist
os.makedirs(args.image_dir, exist_ok=True)

# Set up Shopify CSV headers based on required format
shopify_headers = [
    'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 
    'Tags', 'Published', 'Option1 Name', 'Option1 Value', 'Option2 Name', 
    'Option2 Value', 'Variant SKU', 'Variant Price', 'Variant Compare At Price', 
    'Variant Requires Shipping', 'Variant Taxable', 'Variant Inventory Tracker', 
    'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service', 
    'Variant Weight', 'Variant Weight Unit', 'Image Src', 'Image Position', 'Image Alt Text'
]

# Initialize CSV file and writer
with open(args.output, 'w', newline='', encoding='utf-8') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=shopify_headers)
    writer.writeheader()
    
    # Initialize session for consistent cookies
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })
    
    # Get product listing page
    response = session.get(args.url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # This part needs to be customized for the specific site structure
    # Example: Find all product links on the page
    product_links = []
    
    # This is a generic example - you'll need to adjust selectors based on the target site
    for product_element in soup.select('.product-item'):  # Adjust selector as needed
        link = product_element.find('a')
        if link and 'href' in link.attrs:
            product_links.append(urljoin(args.url, link['href']))
    
    print(f"Found {len(product_links)} product links")
    
    # Process each product page
    products_scraped = 0
    for product_url in product_links:
        if args.max > 0 and products_scraped >= args.max:
            break
            
        print(f"Scraping: {product_url}")
        try:
            # Delay to be respectful to the server
            time.sleep(args.delay)
            
            # Get product page
            product_response = session.get(product_url)
            product_soup = BeautifulSoup(product_response.content, 'html.parser')
            
            # Extract product details - these selectors need to be adjusted for the target site
            try:
                title = product_soup.select_one('.product-title').text.strip()
                price = product_soup.select_one('.product-price').text.strip().replace('$', '')
                description = str(product_soup.select_one('.product-description'))
                
                # Create product handle from title
                handle = title.lower().replace(' ', '-').replace('/', '-')
                
                # Extract variant information if available
                variants = []
                variant_elements = product_soup.select('.product-variant')
                
                if variant_elements:
                    for variant in variant_elements:
                        # Customize based on the site structure
                        variant_title = variant.select_one('.variant-title').text.strip()
                        variant_price = variant.select_one('.variant-price').text.strip().replace('$', '')
                        variants.append({
                            'option1_value': variant_title,
                            'price': variant_price
                        })
                else:
                    # Single variant product
                    variants.append({
                        'option1_value': 'Default Title',
                        'price': price
                    })
                
                # Extract images
                image_urls = []
                for idx, img in enumerate(product_soup.select('.product-image')):
                    if 'src' in img.attrs:
                        image_url = urljoin(product_url, img['src'])
                        image_urls.append({
                            'url': image_url,
                            'position': idx + 1,
                            'alt': img.get('alt', title)
                        })
                
                # Download images
                local_image_paths = []
                for img_data in image_urls:
                    img_filename = os.path.join(args.image_dir, f"{handle}-{img_data['position']}.jpg")
                    with open(img_filename, 'wb') as img_file:
                        img_response = session.get(img_data['url'])
                        img_file.write(img_response.content)
                    local_image_paths.append({
                        'path': img_filename,
                        'position': img_data['position'],
                        'alt': img_data['alt']
                    })
                
                # Write product data to CSV
                for variant_idx, variant in enumerate(variants):
                    row = {
                        'Handle': handle,
                        'Title': title,
                        'Body (HTML)': description,
                        'Vendor': 'Welldonewood',  # Default vendor, adjust as needed
                        'Type': 'Wood Products',   # Default type, adjust as needed
                        'Tags': 'imported',
                        'Published': 'TRUE',
                        'Option1 Name': 'Title' if variant['option1_value'] == 'Default Title' else 'Size',
                        'Option1 Value': variant['option1_value'],
                        'Variant Price': variant['price'],
                        'Variant Requires Shipping': 'TRUE',
                        'Variant Taxable': 'TRUE',
                        'Variant Inventory Tracker': 'shopify',
                        'Variant Inventory Qty': '10',  # Default inventory, adjust as needed
                        'Variant Inventory Policy': 'deny',
                        'Variant Fulfillment Service': 'manual',
                        'Variant Weight': '1',  # Default weight, adjust as needed
                        'Variant Weight Unit': 'kg'
                    }
                    
                    # Add images to the first variant only
                    if variant_idx == 0 and local_image_paths:
                        for img in local_image_paths:
                            img_row = row.copy()
                            img_row['Image Src'] = img['path']
                            img_row['Image Position'] = str(img['position'])
                            img_row['Image Alt Text'] = img['alt']
                            writer.writerow(img_row)
                    else:
                        writer.writerow(row)
                
                products_scraped += 1
                print(f"Successfully scraped product: {title}")
                
            except Exception as e:
                print(f"Error extracting product details: {e}")
                continue
                
        except Exception as e:
            print(f"Error accessing product page: {e}")
            continue

print(f"Scraping complete. {products_scraped} products exported to {args.output}")
print("NOTE: You will need to update the Image Src paths in the CSV to valid URLs before importing to Shopify.") 