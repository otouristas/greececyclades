-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample accommodation data
INSERT INTO accommodation (
  name, 
  description, 
  slug, 
  island_id, 
  location, 
  category, 
  star_rating, 
  price_range, 
  featured, 
  images, 
  address, 
  amenities, 
  room_types, 
  rating, 
  reviews_count, 
  latitude, 
  longitude
)
VALUES 
(
  'Santorini Palace', 
  'Experience the ultimate luxury at Santorini Palace, perched on the cliff of the caldera with breathtaking views of the Aegean Sea. This 5-star hotel offers elegant accommodations, world-class dining, and exceptional service.',
  'santorini-palace',
  'santorini',
  '{"island": "Santorini", "area": "Fira", "coordinates": {"latitude": 36.416862, "longitude": 25.432261}}',
  'Resort',
  5,
  '{"min": 350, "max": 800, "currency": "EUR"}',
  true,
  '{"main": "/images/hotels/santorini-palace-main.jpg", "gallery": ["/images/hotels/santorini-palace-1.jpg", "/images/hotels/santorini-palace-2.jpg", "/images/hotels/santorini-palace-3.jpg"]}',
  'Fira, Santorini 84700, Greece',
  ARRAY['Pool', 'Spa', 'Free WiFi', 'Restaurant', 'Bar', 'Room Service', 'Fitness Center', 'Airport Shuttle', 'Sea View', 'Air Conditioning'],
  ARRAY[
    '{"name": "Deluxe Room", "description": "Elegant room with modern amenities and partial sea view", "price": 350, "capacity": 2, "amenities": ["King Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe", "Balcony"]}',
    '{"name": "Junior Suite", "description": "Spacious suite with living area and full sea view", "price": 550, "capacity": 3, "amenities": ["King Bed", "Sofa Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe", "Private Balcony", "Jacuzzi"]}',
    '{"name": "Caldera Suite", "description": "Luxury suite with private terrace and panoramic caldera view", "price": 800, "capacity": 2, "amenities": ["King Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe", "Private Terrace", "Private Pool", "Jacuzzi"]}'
  ],
  4.8,
  243,
  36.416862,
  25.432261
),
(
  'Mykonos Breeze Resort', 
  'Nestled on the golden sands of Ornos Beach, Mykonos Breeze Resort offers a perfect blend of traditional Cycladic architecture and modern luxury. Enjoy spacious rooms, a stunning infinity pool, and easy access to Mykonos Town.',
  'mykonos-breeze-resort',
  'mykonos',
  '{"island": "Mykonos", "area": "Ornos", "coordinates": {"latitude": 37.424558, "longitude": 25.325508}}',
  'Resort',
  4,
  '{"min": 280, "max": 650, "currency": "EUR"}',
  true,
  '{"main": "/images/hotels/mykonos-breeze-main.jpg", "gallery": ["/images/hotels/mykonos-breeze-1.jpg", "/images/hotels/mykonos-breeze-2.jpg", "/images/hotels/mykonos-breeze-3.jpg"]}',
  'Ornos Beach, Mykonos 84600, Greece',
  ARRAY['Beach Access', 'Pool', 'Free WiFi', 'Restaurant', 'Bar', 'Room Service', 'Fitness Center', 'Spa', 'Air Conditioning'],
  ARRAY[
    '{"name": "Standard Room", "description": "Comfortable room with garden view", "price": 280, "capacity": 2, "amenities": ["Queen Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe"]}',
    '{"name": "Sea View Room", "description": "Elegant room with sea view balcony", "price": 380, "capacity": 2, "amenities": ["King Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe", "Balcony"]}',
    '{"name": "Beachfront Suite", "description": "Luxurious suite with direct beach access", "price": 650, "capacity": 4, "amenities": ["King Bed", "Sofa Bed", "Air Conditioning", "Free WiFi", "Minibar", "Safe", "Private Terrace", "Jacuzzi"]}'
  ],
  4.6,
  187,
  37.424558,
  25.325508
),
(
  'Naxos Seaside Hotel', 
  'Located on the pristine Agios Prokopios beach, Naxos Seaside Hotel offers comfortable accommodations with stunning sea views. The hotel features a swimming pool, restaurant serving local cuisine, and is just a short drive from Naxos Town.',
  'naxos-seaside-hotel',
  'naxos',
  '{"island": "Naxos", "area": "Agios Prokopios", "coordinates": {"latitude": 37.076389, "longitude": 25.357222}}',
  'Hotel',
  3,
  '{"min": 120, "max": 280, "currency": "EUR"}',
  true,
  '{"main": "/images/hotels/naxos-seaside-main.jpg", "gallery": ["/images/hotels/naxos-seaside-1.jpg", "/images/hotels/naxos-seaside-2.jpg", "/images/hotels/naxos-seaside-3.jpg"]}',
  'Agios Prokopios, Naxos 84300, Greece',
  ARRAY['Beach Access', 'Pool', 'Free WiFi', 'Restaurant', 'Bar', 'Air Conditioning', 'Garden'],
  ARRAY[
    '{"name": "Standard Room", "description": "Cozy room with garden view", "price": 120, "capacity": 2, "amenities": ["Double Bed", "Air Conditioning", "Free WiFi", "Refrigerator"]}',
    '{"name": "Sea View Room", "description": "Comfortable room with sea view", "price": 180, "capacity": 2, "amenities": ["Queen Bed", "Air Conditioning", "Free WiFi", "Refrigerator", "Balcony"]}',
    '{"name": "Family Room", "description": "Spacious room ideal for families", "price": 280, "capacity": 4, "amenities": ["Queen Bed", "Bunk Beds", "Air Conditioning", "Free WiFi", "Refrigerator", "Balcony"]}'
  ],
  4.3,
  156,
  37.076389,
  25.357222
),
(
  'Paros Bay Villas', 
  'Set in a peaceful location overlooking Naoussa Bay, Paros Bay Villas offers luxurious private villas with stunning sea views. Each villa features a private pool, fully equipped kitchen, and spacious living areas.',
  'paros-bay-villas',
  'paros',
  '{"island": "Paros", "area": "Naoussa", "coordinates": {"latitude": 37.123889, "longitude": 25.241667}}',
  'Villa',
  5,
  '{"min": 420, "max": 950, "currency": "EUR"}',
  true,
  '{"main": "/images/hotels/paros-bay-main.jpg", "gallery": ["/images/hotels/paros-bay-1.jpg", "/images/hotels/paros-bay-2.jpg", "/images/hotels/paros-bay-3.jpg"]}',
  'Naoussa Bay, Paros 84401, Greece',
  ARRAY['Private Pool', 'Sea View', 'Free WiFi', 'Kitchen', 'Air Conditioning', 'Parking', 'BBQ', 'Garden'],
  ARRAY[
    '{"name": "One Bedroom Villa", "description": "Elegant villa with one bedroom and private pool", "price": 420, "capacity": 2, "amenities": ["King Bed", "Air Conditioning", "Free WiFi", "Full Kitchen", "Private Pool", "Terrace", "Sea View"]}',
    '{"name": "Two Bedroom Villa", "description": "Spacious villa with two bedrooms and private pool", "price": 650, "capacity": 4, "amenities": ["King Bed", "Twin Beds", "Air Conditioning", "Free WiFi", "Full Kitchen", "Private Pool", "Terrace", "Sea View"]}',
    '{"name": "Luxury Three Bedroom Villa", "description": "Exclusive villa with three bedrooms and infinity pool", "price": 950, "capacity": 6, "amenities": ["King Bed", "Queen Bed", "Twin Beds", "Air Conditioning", "Free WiFi", "Full Kitchen", "Infinity Pool", "Terrace", "Sea View", "BBQ"]}'
  ],
  4.9,
  98,
  37.123889,
  25.241667
)
ON CONFLICT (slug) 
DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  island_id = EXCLUDED.island_id,
  location = EXCLUDED.location,
  category = EXCLUDED.category,
  star_rating = EXCLUDED.star_rating,
  price_range = EXCLUDED.price_range,
  featured = EXCLUDED.featured,
  images = EXCLUDED.images,
  address = EXCLUDED.address,
  amenities = EXCLUDED.amenities,
  room_types = EXCLUDED.room_types,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;
