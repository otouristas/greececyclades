-- Sample rental cars data
INSERT INTO rental_cars (
  id,
  created_at,
  name,
  description,
  island_id,
  category,
  images,
  price_per_day,
  features,
  transmission,
  fuel_type,
  seats,
  luggage_capacity,
  provider,
  pickup_locations,
  insurance_options,
  available_dates,
  rating,
  reviews_count
) VALUES
-- Mercedes GLB 2022
(
  gen_random_uuid(),
  NOW(),
  'Mercedes GLB 2022',
  'Experience luxury and comfort with the Mercedes GLB 2022. This spacious 7-seater SUV combines elegant design with practical functionality, perfect for families or groups exploring the islands.',
  'santorini',
  'SUV',
  ARRAY['https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80'],
  120,
  ARRAY['7 Seats', 'GPS Navigation', 'Bluetooth', 'Cruise Control', 'Parking Sensors', 'Climate Control'],
  'Automatic',
  'Diesel',
  7,
  3,
  'Cyclades Premium Rentals',
  ARRAY['Santorini Airport', 'Fira Port', 'Oia Center'],
  ARRAY[
    '{"name": "Basic", "description": "Third party insurance", "price": 15}',
    '{"name": "Premium", "description": "Full coverage with zero excess", "price": 30}'
  ]::jsonb[],
  ARRAY['2024-01-01', '2024-12-31'],
  4.9,
  156
),

-- Jeep Renegade 4xe
(
  gen_random_uuid(),
  NOW(),
  'Jeep Renegade 4xe UPLAND',
  'The Jeep Renegade UPLAND 4xe combines eco-friendly hybrid technology with rugged off-road capability. Perfect for adventurous spirits who want to explore both coastal roads and mountain trails.',
  'mykonos',
  'SUV',
  ARRAY['https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80'],
  110,
  ARRAY['Hybrid Engine', 'Off-road Capability', 'GPS Navigation', 'Bluetooth', 'Parking Sensors'],
  'Automatic',
  'Hybrid',
  5,
  2,
  'Mykonos Auto Rental',
  ARRAY['Mykonos Airport', 'New Port', 'Mykonos Town'],
  ARRAY[
    '{"name": "Basic", "description": "Third party insurance", "price": 12}',
    '{"name": "Premium", "description": "Full coverage with zero excess", "price": 25}'
  ]::jsonb[],
  ARRAY['2024-01-01', '2024-12-31'],
  4.8,
  142
),

-- Fiat 500
(
  gen_random_uuid(),
  NOW(),
  'Fiat 500 Cabrio',
  'The iconic Fiat 500 Cabrio is the perfect choice for navigating narrow island streets. Its compact size and excellent fuel efficiency make it ideal for couples or solo travelers.',
  'paros',
  'Compact',
  ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80'],
  45,
  ARRAY['Convertible Roof', 'Fuel Efficient', 'Air Conditioning', 'Bluetooth', 'USB Port'],
  'Manual',
  'Gasoline',
  4,
  1,
  'Paros Car Rentals',
  ARRAY['Paros Airport', 'Parikia Port', 'Naoussa'],
  ARRAY[
    '{"name": "Basic", "description": "Third party insurance", "price": 8}',
    '{"name": "Premium", "description": "Full coverage with zero excess", "price": 15}'
  ]::jsonb[],
  ARRAY['2024-01-01', '2024-12-31'],
  4.7,
  198
),

-- Citroen C3
(
  gen_random_uuid(),
  NOW(),
  'Citroen C3 Automatic',
  'The Citroen C3 Automatic is a fuel-efficient and easy-to-drive car perfect for city exploration and short trips. Its compact size and smooth automatic transmission make it ideal for navigating narrow island streets.',
  'naxos',
  'Economy',
  ARRAY['https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80'],
  60,
  ARRAY['Air Conditioning', 'Bluetooth', 'Fuel Efficient', 'Easy Parking'],
  'Automatic',
  'Petrol',
  5,
  2,
  'Naxos Auto Rental',
  ARRAY['Naxos Airport', 'Naxos Port', 'Chora'],
  ARRAY[
    '{"name": "Basic", "description": "Third party insurance", "price": 10}',
    '{"name": "Premium", "description": "Full coverage with zero excess", "price": 20}'
  ]::jsonb[],
  ARRAY['2024-01-01', '2024-12-31'],
  4.6,
  92
),

-- Peugeot 3008
(
  gen_random_uuid(),
  NOW(),
  'Peugeot 3008 SUV',
  'The Peugeot 3008 combines French elegance with practical functionality. Its comfortable interior and advanced features make it perfect for families wanting to explore the islands in style.',
  'milos',
  'SUV',
  ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80'],
  95,
  ARRAY['Panoramic Roof', 'GPS Navigation', 'Parking Camera', 'Climate Control', 'Apple CarPlay'],
  'Automatic',
  'Diesel',
  5,
  3,
  'Milos Car Rental',
  ARRAY['Milos Airport', 'Adamas Port'],
  ARRAY[
    '{"name": "Basic", "description": "Third party insurance", "price": 12}',
    '{"name": "Premium", "description": "Full coverage with zero excess", "price": 25}'
  ]::jsonb[],
  ARRAY['2024-01-01', '2024-12-31'],
  4.7,
  145
);
