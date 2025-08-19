#!/usr/bin/env python3
"""
Database initialization script for Outre Couture Backend
This script creates sample categories and products for testing purposes.
"""

import os
import uuid
from datetime import datetime, timezone
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://ankitkalra13:ankit%408996@cluster0.j2yojqe.mongodb.net/UserDB')
client = MongoClient(MONGO_URI)
db = client['outre_couture']

# Collections
categories_collection = db['categories']
products_collection = db['products']

def create_sample_categories():
    """Create sample categories"""
    categories = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Handbags',
            'description': 'Luxury designer handbags and purses',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Jewelry',
            'description': 'Elegant jewelry and accessories',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Scarves',
            'description': 'Silk scarves and fashion accessories',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Belts',
            'description': 'Leather belts and fashion accessories',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Wallets',
            'description': 'Designer wallets and card holders',
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for category in categories:
        # Check if category already exists
        existing = categories_collection.find_one({'name': category['name']})
        if not existing:
            categories_collection.insert_one(category)
            print(f"Created category: {category['name']}")
        else:
            print(f"Category already exists: {category['name']}")
    
    return categories

def create_sample_products(categories):
    """Create sample products"""
    products = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Classic Leather Tote Bag',
            'category_id': next(cat['id'] for cat in categories if cat['name'] == 'Handbags'),
            'category_name': 'Handbags',
            'price': 299.99,
            'description': 'Timeless leather tote bag perfect for everyday use. Made from premium Italian leather with brass hardware.',
            'images': ['tote_bag_1.jpg', 'tote_bag_2.jpg'],
            'specifications': {
                'material': 'Italian Leather',
                'color': 'Cognac Brown',
                'size': 'Large',
                'dimensions': '15" x 12" x 6"',
                'hardware': 'Brass'
            },
            'is_active': True,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Pearl Necklace Set',
            'category_id': next(cat['id'] for cat in categories if cat['name'] == 'Jewelry'),
            'category_name': 'Jewelry',
            'price': 199.99,
            'description': 'Elegant freshwater pearl necklace with matching earrings. Perfect for formal occasions.',
            'images': ['pearl_set_1.jpg', 'pearl_set_2.jpg'],
            'specifications': {
                'material': 'Freshwater Pearls',
                'color': 'White',
                'length': '18 inches',
                'clasp': 'Lobster Clasp',
                'includes': 'Necklace and Earrings'
            },
            'is_active': True,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Silk Scarf Collection',
            'category_id': next(cat['id'] for cat in categories if cat['name'] == 'Scarves'),
            'category_name': 'Scarves',
            'price': 89.99,
            'description': 'Luxurious silk scarf with hand-painted floral design. Available in multiple colors.',
            'images': ['silk_scarf_1.jpg', 'silk_scarf_2.jpg'],
            'specifications': {
                'material': '100% Silk',
                'size': '35" x 35"',
                'pattern': 'Hand-painted Floral',
                'care': 'Dry Clean Only',
                'colors': 'Blue, Red, Green, Purple'
            },
            'is_active': True,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Classic Leather Belt',
            'category_id': next(cat['id'] for cat in categories if cat['name'] == 'Belts'),
            'category_name': 'Belts',
            'price': 79.99,
            'description': 'Premium leather belt with classic buckle design. Available in various sizes.',
            'images': ['leather_belt_1.jpg'],
            'specifications': {
                'material': 'Genuine Leather',
                'color': 'Black, Brown',
                'width': '1.25 inches',
                'buckle': 'Classic Brass',
                'sizes': '30", 32", 34", 36", 38"'
            },
            'is_active': True,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Bifold Leather Wallet',
            'category_id': next(cat['id'] for cat in categories if cat['name'] == 'Wallets'),
            'category_name': 'Wallets',
            'price': 129.99,
            'description': 'Handcrafted bifold wallet with multiple card slots and coin pocket.',
            'images': ['wallet_1.jpg', 'wallet_2.jpg'],
            'specifications': {
                'material': 'Full-grain Leather',
                'color': 'Saddle Brown',
                'style': 'Bifold',
                'card_slots': '6',
                'coin_pocket': 'Yes',
                'bill_compartment': 'Yes'
            },
            'is_active': True,
            'created_at': datetime.now(timezone.utc).isoformat(),
            'updated_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for product in products:
        # Check if product already exists
        existing = products_collection.find_one({'name': product['name']})
        if not existing:
            products_collection.insert_one(product)
            print(f"Created product: {product['name']} - ${product['price']}")
        else:
            print(f"Product already exists: {product['name']}")

def main():
    """Main initialization function"""
    print("Initializing Outre Couture Database...")
    
    try:
        # Test database connection
        client.admin.command('ping')
        print("✓ Database connection successful")
        
        # Create sample categories
        print("\nCreating sample categories...")
        categories = create_sample_categories()
        
        # Create sample products
        print("\nCreating sample products...")
        create_sample_products(categories)
        
        print("\n✓ Database initialization completed successfully!")
        print(f"\nCreated {len(categories)} categories and 5 sample products")
        print("\nYou can now start the Flask application with: python app.py")
        
    except (ConnectionError, ValueError, TypeError) as e:
        print(f"✗ Error initializing database: {e}")
        print("Please make sure MongoDB is running and accessible")

if __name__ == '__main__':
    main()
