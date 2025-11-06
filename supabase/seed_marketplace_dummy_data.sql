-- =====================================================
-- NMTSA Marketplace - Dummy Data Seed
-- Insert 10 sample merchandise products
-- =====================================================

-- Note: Run this SQL directly in your Supabase SQL Editor
-- or PostgreSQL client 
 
-- Clean up existing test data (optional - comment out if you want to keep existing data)
-- DELETE FROM merchandise WHERE name LIKE 'NMTSA%' OR name LIKE '%Music%' OR name LIKE '%Harmony%';

-- Insert dummy merchandise products
INSERT INTO merchandise (
  name,
  description,
  category,
  price,
  stock_quantity,
  image_url,
  images,
  is_active,
  featured,
  metadata
) VALUES
  -- Product 1: NMTSA Classic T-Shirt
  (
    'NMTSA Classic T-Shirt',
    'Comfortable 100% cotton t-shirt featuring the NMTSA logo. Perfect for everyday wear while showing your support for music therapy.',
    'apparel',
    24.99,
    50,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    true,
    '{
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "colors": ["Navy", "White", "Gray"],
      "sku": "NMTSA-TSHIRT-001",
      "material": "100% Cotton",
      "weight": 0.3
    }'::jsonb
  ),

  -- Product 2: Music Therapy Mug
  (
    'Music Therapy Mug',
    'Ceramic mug with inspiring music therapy message. Microwave and dishwasher safe. Start your day with a reminder of the power of music.',
    'accessories',
    16.99,
    75,
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    true,
    '{
      "sizes": ["11oz", "15oz"],
      "colors": ["White", "Blue"],
      "sku": "NMTSA-MUG-001",
      "material": "Ceramic",
      "weight": 0.5
    }'::jsonb
  ),

  -- Product 3: NMTSA Hoodie
  (
    'NMTSA Hoodie',
    'Cozy premium hoodie with NMTSA branding. Features a soft fleece interior and adjustable drawstring hood. Perfect for cooler weather.',
    'apparel',
    39.99,
    30,
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    true,
    '{
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "colors": ["Navy", "Gray", "Maroon"],
      "sku": "NMTSA-HOODIE-001",
      "material": "80% Cotton, 20% Polyester",
      "weight": 0.7
    }'::jsonb
  ),

  -- Product 4: Harmony Tote Bag
  (
    'Harmony Tote Bag',
    'Eco-friendly canvas tote bag with beautiful musical note design. Durable and spacious, perfect for carrying your essentials.',
    'accessories',
    18.99,
    60,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["One Size"],
      "colors": ["Natural", "Navy"],
      "sku": "NMTSA-TOTE-001",
      "material": "100% Cotton Canvas",
      "weight": 0.4
    }'::jsonb
  ),

  -- Product 5: Stainless Steel Water Bottle
  (
    'Stainless Steel Water Bottle',
    'Double-walled insulated water bottle with NMTSA branding. Keeps drinks cold for 24 hours or hot for 12 hours.',
    'accessories',
    22.99,
    40,
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop&crop=center", "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["20oz", "32oz"],
      "colors": ["Silver", "Black", "Blue"],
      "sku": "NMTSA-BOTTLE-001",
      "material": "Stainless Steel",
      "weight": 0.6
    }'::jsonb
  ),

  -- Product 6: Inspirational Music Therapy Journal
  (
    'Inspirational Music Therapy Journal',
    'Hardcover journal featuring uplifting music therapy quotes. Lined pages perfect for notes, reflections, and creativity.',
    'accessories',
    14.99,
    45,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["5x7", "8x10"],
      "colors": ["Blue", "Green", "Purple"],
      "sku": "NMTSA-JOURNAL-001",
      "pages": 200,
      "weight": 0.4
    }'::jsonb
  ),

  -- Product 7: NMTSA Baseball Cap
  (
    'NMTSA Baseball Cap',
    'Adjustable baseball cap with embroidered NMTSA logo. Made with breathable cotton twill fabric.',
    'apparel',
    19.99,
    55,
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["One Size"],
      "colors": ["Navy", "Black", "White"],
      "sku": "NMTSA-CAP-001",
      "material": "Cotton Twill",
      "weight": 0.2
    }'::jsonb
  ),

  -- Product 8: Music Notes Enamel Pin Set
  (
    'Music Notes Enamel Pin Set',
    'Set of 3 colorful enamel pins featuring musical notes and symbols. Perfect for jackets, bags, or hats.',
    'accessories',
    12.99,
    100,
    'https://images.unsplash.com/photo-1611095564998-2f47a00c2f56?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1611095564998-2f47a00c2f56?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["One Size"],
      "colors": ["Multi-Color"],
      "sku": "NMTSA-PIN-001",
      "material": "Metal Enamel",
      "weight": 0.05
    }'::jsonb
  ),

  -- Product 9: NMTSA Long Sleeve Shirt
  (
    'NMTSA Long Sleeve Shirt',
    'Premium long sleeve shirt with NMTSA logo on chest and sleeve. Soft, comfortable fabric for all-day wear.',
    'apparel',
    29.99,
    35,
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["S", "M", "L", "XL", "XXL"],
      "colors": ["Navy", "Forest Green", "Burgundy"],
      "sku": "NMTSA-LONGSLEEVE-001",
      "material": "100% Cotton",
      "weight": 0.4
    }'::jsonb
  ),

  -- Product 10: Musical Notes Sticker Pack
  (
    'Musical Notes Sticker Pack',
    'Pack of 10 vinyl stickers with various musical and therapy-themed designs. Weatherproof and perfect for laptops, water bottles, and more.',
    'accessories',
    8.99,
    120,
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&crop=center',
    '["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop&crop=center"]'::jsonb,
    true,
    false,
    '{
      "sizes": ["One Size"],
      "colors": ["Multi-Color"],
      "sku": "NMTSA-STICKERS-001",
      "material": "Vinyl",
      "weight": 0.05
    }'::jsonb
  );

-- Verify the data was inserted
SELECT 
  name,
  category,
  price,
  stock_quantity,
  featured,
  is_active
FROM merchandise
ORDER BY created_at DESC
LIMIT 10;

-- Summary statistics
SELECT 
  category,
  COUNT(*) as product_count,
  MIN(price) as min_price,
  MAX(price) as max_price,
  AVG(price)::numeric(10,2) as avg_price,
  SUM(stock_quantity) as total_stock
FROM merchandise
GROUP BY category
ORDER BY category;
