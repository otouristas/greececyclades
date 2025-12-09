-- =====================================================
-- SAMPLE DATA FOR CYCLADES HOTELS & ACTIVITIES
-- Run after the main migration
-- =====================================================

-- Sample Hotels for Santorini
INSERT INTO hotels (name, slug, island, location, description, short_description, star_rating, price_range, min_price, max_price, amenities, property_type, featured, is_active, rating, review_count)
VALUES
  ('Canaves Oia Suites', 'canaves-oia-suites', 'Santorini', 'Oia', 'Iconic luxury suites carved into the caldera cliffs with infinity pools and spectacular sunset views.', 'Iconic clifftop luxury in Oia', 5, 'ultra-luxury', 800, 2500, ARRAY['Infinity Pool', 'Spa', 'Fine Dining', 'Butler Service', 'Private Terrace'], 'boutique', true, true, 4.9, 1247),
  ('Mystique Santorini', 'mystique-santorini', 'Santorini', 'Oia', 'A luxury collection resort offering cave-style suites with caldera views and world-class dining.', 'Cave-style luxury resort', 5, 'ultra-luxury', 700, 2000, ARRAY['Cave Pool', 'Spa', 'Restaurant', 'Wine Cellar', 'Helicopter Service'], 'hotel', true, true, 4.8, 892),
  ('Astra Suites', 'astra-suites', 'Santorini', 'Imerovigli', 'Elegant suites at the highest point of the caldera with breathtaking panoramic views.', 'Panoramic caldera views', 5, 'luxury', 350, 900, ARRAY['Infinity Pool', 'Spa', 'Breakfast', 'Cave Suite'], 'boutique', true, true, 4.9, 1563),
  ('Fira Backpackers Place', 'fira-backpackers', 'Santorini', 'Fira', 'Budget-friendly hostel in the heart of Fira with shared dorms and private rooms.', 'Budget stay in Fira center', 2, 'budget', 25, 80, ARRAY['WiFi', 'Common Area', 'Kitchen', 'Lockers'], 'hostel', false, true, 4.2, 456);

-- Sample Hotels for Mykonos
INSERT INTO hotels (name, slug, island, location, description, short_description, star_rating, price_range, min_price, max_price, amenities, property_type, featured, is_active, rating, review_count)
VALUES
  ('Cavo Tagoo Mykonos', 'cavo-tagoo-mykonos', 'Mykonos', 'Mykonos Town', 'Ultra-luxury hotel with cave pool and stunning views over Mykonos Town harbor.', 'Iconic cave pool luxury', 5, 'ultra-luxury', 600, 2000, ARRAY['Cave Pool', 'Spa', 'Fine Dining', 'Private Beach', 'Helipad'], 'hotel', true, true, 4.8, 923),
  ('Mykonos Blu', 'mykonos-blu', 'Mykonos', 'Psarou Beach', 'Beachfront luxury resort on the famous Psarou Beach with Cycladic architecture.', 'Psarou Beach luxury', 5, 'luxury', 400, 1200, ARRAY['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Restaurant'], 'resort', true, true, 4.7, 1102);

-- Sample Hotels for Naxos
INSERT INTO hotels (name, slug, island, location, description, short_description, star_rating, price_range, min_price, max_price, amenities, property_type, featured, is_active, rating, review_count)
VALUES
  ('Naxian Collection', 'naxian-collection', 'Naxos', 'Stelida', 'Luxury villas with private pools overlooking the Aegean Sea.', 'Private pool villas', 5, 'luxury', 350, 800, ARRAY['Private Pool', 'Sea View', 'Breakfast', 'Shuttle Service'], 'villa', true, true, 4.9, 342),
  ('Hotel Grotta', 'hotel-grotta', 'Naxos', 'Naxos Town', 'Charming family-run hotel near the Portara with authentic Greek hospitality.', 'Family charm near Portara', 3, 'mid-range', 80, 180, ARRAY['Pool', 'Breakfast', 'WiFi', 'Garden'], 'hotel', false, true, 4.5, 728);

-- Sample Hotels for Milos
INSERT INTO hotels (name, slug, island, location, description, short_description, star_rating, price_range, min_price, max_price, amenities, property_type, featured, is_active, rating, review_count)
VALUES
  ('Milos Breeze Boutique Hotel', 'milos-breeze', 'Milos', 'Pollonia', 'Contemporary boutique hotel in charming Pollonia fishing village.', 'Boutique stay in Pollonia', 4, 'mid-range', 150, 350, ARRAY['Pool', 'Breakfast', 'Sea View', 'Near Beach'], 'boutique', true, true, 4.7, 432);

-- Sample Activities
INSERT INTO activities (name, slug, island, location, description, short_description, activity_type, duration_hours, price_from, image_url, highlights, featured, is_active, rating, review_count)
VALUES
  ('Santorini Sunset Catamaran Cruise', 'santorini-sunset-cruise', 'Santorini', 'Vlychada', 'Sail around the caldera on a luxury catamaran with BBQ dinner and unlimited drinks.', 'Luxury sunset sailing', 'cruise', 5.0, 120, '/images/activities/catamaran.jpg', ARRAY['Caldera Views', 'Hot Springs', 'BBQ Dinner', 'Open Bar'], true, true, 4.9, 2341),
  ('Mykonos Delos Day Trip', 'mykonos-delos-tour', 'Mykonos', 'Old Port', 'Explore the sacred island of Delos, UNESCO World Heritage Site and birthplace of Apollo.', 'UNESCO archaeological tour', 'tour', 4.0, 55, '/images/activities/delos.jpg', ARRAY['Guided Tour', 'Ancient Ruins', 'Museum Visit'], true, true, 4.7, 1823),
  ('Naxos Wine Tasting Tour', 'naxos-wine-tour', 'Naxos', 'Naxos Town', 'Discover Naxos wines with visits to local wineries and traditional mezze pairings.', 'Local wine discovery', 'wine-tasting', 4.0, 75, '/images/activities/wine.jpg', ARRAY['3 Wineries', 'Wine Tasting', 'Local Snacks', 'Olive Grove'], false, true, 4.6, 234),
  ('Milos Boat Tour to Kleftiko', 'milos-kleftiko-tour', 'Milos', 'Adamas', 'Full-day boat tour to the famous sea caves of Kleftiko with swimming and snorkeling stops.', 'Famous caves exploration', 'cruise', 8.0, 85, '/images/activities/kleftiko.jpg', ARRAY['Kleftiko Caves', 'Snorkeling', 'BBQ Lunch', 'Multiple Swim Stops'], true, true, 4.8, 1567);

-- Sample Ferry Routes
INSERT INTO ferry_routes (from_island, to_island, ferry_company, duration_minutes, frequency, price_from, season, notes)
VALUES
  ('Athens', 'Santorini', 'Seajets', 150, 'Multiple daily', 68.00, 'year-round', 'Fastest option, leaves from Piraeus'),
  ('Athens', 'Santorini', 'Blue Star Ferries', 300, 'Daily', 40.00, 'year-round', 'Overnight ferry available, comfortable'),
  ('Athens', 'Mykonos', 'Seajets', 120, 'Multiple daily', 62.00, 'year-round', 'Fast ferry from Piraeus'),
  ('Athens', 'Naxos', 'Blue Star Ferries', 240, 'Daily', 38.00, 'year-round', 'Comfortable day crossing'),
  ('Santorini', 'Mykonos', 'Seajets', 165, 'Daily', 65.00, 'April-October', 'Via Naxos and Paros usually'),
  ('Paros', 'Naxos', 'Blue Star Ferries', 45, 'Multiple daily', 12.00, 'year-round', 'Very frequent, short crossing'),
  ('Mykonos', 'Naxos', 'Seajets', 75, 'Daily', 35.00, 'April-October', 'Direct fast ferry'),
  ('Athens', 'Milos', 'Seajets', 210, 'Daily', 55.00, 'April-October', 'From Piraeus port'),
  ('Santorini', 'Folegandros', 'Seajets', 50, '4x weekly', 28.00, 'April-October', 'Short hop to hidden gem');
