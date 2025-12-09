-- =====================================================
-- SEED SAMPLE BUSINESSES FOR CYCLADES ISLANDS
-- This provides example data for testing the directory
-- =====================================================

-- Santorini Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('Ambrosia Restaurant', 'ambrosia-restaurant-oia', 'restaurant', 'santorini', 'Oia', 'Fine dining with breathtaking caldera views', 'Award-winning Mediterranean cuisine in a stunning caldera-view setting. Perfect for romantic dinners and special occasions.', 'luxury', 4.8, 342, true, true, true, 'https://ambrosia-santorini.com', '+30 22860 71413', '/images/businesses/santorini-restaurant.jpg'),
  ('Palia Kameni Cocktails', 'palia-kameni-cocktails', 'bar', 'santorini', 'Fira', 'Sunset cocktails with volcano views', 'Famous for creative cocktails and the best sunset views in Fira. Live music on weekends.', 'mid-range', 4.6, 218, true, true, true, NULL, '+30 22860 23456', '/images/businesses/santorini-bar.jpg'),
  ('Santos Winery', 'santos-winery', 'winery', 'santorini', 'Pyrgos', 'Volcanic wines and tastings', 'Experience Santorini''s unique volcanic wines. Guided tours and tastings with caldera views.', 'mid-range', 4.7, 567, true, true, true, 'https://santoswines.gr', '+30 22860 22596', '/images/businesses/santorini-winery.jpg'),
  ('Theros Wave Bar', 'theros-wave-bar', 'beach_club', 'santorini', 'Perivolos', 'Beach club vibes all day', 'Trendy beach club with sunbeds, great music, and Mediterranean cuisine right on Perivolos beach.', 'luxury', 4.5, 189, false, true, true, NULL, '+30 22860 82002', '/images/businesses/santorini-beach-club.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Mykonos Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('Scorpios', 'scorpios-mykonos', 'beach_club', 'mykonos', 'Paraga', 'Legendary bohemian beach club', 'World-famous for sunset rituals, live music, and holistic beach vibes. Reservations essential.', 'ultra-luxury', 4.9, 892, true, true, true, 'https://scorpiosmykonos.com', '+30 22890 29205', '/images/businesses/mykonos-scorpios.jpg'),
  ('Nikos Taverna', 'nikos-taverna-mykonos', 'restaurant', 'mykonos', 'Mykonos Town', 'Traditional Greek taverna since 1967', 'Family-run taverna serving authentic Greek dishes in the heart of Mykonos Town. Fresh seafood daily.', 'mid-range', 4.7, 654, true, true, true, NULL, '+30 22890 24320', '/images/businesses/mykonos-taverna.jpg'),
  ('Cavo Paradiso', 'cavo-paradiso-mykonos', 'nightclub', 'mykonos', 'Paradise Beach', 'Legendary open-air nightclub', 'One of the world''s most famous nightclubs. International DJs all summer long.', 'luxury', 4.6, 1203, true, true, true, 'https://cavoparadiso.gr', '+30 22890 26124', '/images/businesses/mykonos-cavo.jpg'),
  ('Nammos', 'nammos-mykonos', 'beach_club', 'mykonos', 'Psarou', 'VIP beach club experience', 'The ultimate luxury beach experience. Gourmet dining, champagne service, and celebrity sightings.', 'ultra-luxury', 4.8, 567, true, true, true, 'https://nammosmykonos.com', '+30 22890 22440', '/images/businesses/mykonos-nammos.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Naxos Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('To Elliniko', 'to-elliniko-naxos', 'restaurant', 'naxos', 'Naxos Town', 'Authentic Naxian cuisine', 'Farm-to-table restaurant featuring local Naxian products. Famous for their potatoes and cheeses.', 'mid-range', 4.8, 423, true, true, true, NULL, '+30 22850 25153', '/images/businesses/naxos-restaurant.jpg'),
  ('Kitron Distillery', 'kitron-distillery-naxos', 'winery', 'naxos', 'Halki', 'Famous Naxos citron liqueur', 'Visit the historic distillery producing Kitron since 1896. Tastings and tours available.', 'budget', 4.6, 312, true, true, true, 'https://vallindraskitron.gr', '+30 22850 31220', '/images/businesses/naxos-kitron.jpg'),
  ('Flisvos Sport Club', 'flisvos-naxos', 'tour', 'naxos', 'Agios Georgios', 'Water sports and lessons', 'Kitesurfing, windsurfing, SUP lessons and rentals. Family-friendly with kids programs.', 'mid-range', 4.7, 287, false, true, true, 'https://flisvos-sportclub.com', '+30 22850 24308', '/images/businesses/naxos-watersports.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Paros Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('Levantis', 'levantis-paros', 'restaurant', 'paros', 'Naoussa', 'Creative Mediterranean cuisine', 'Elegant restaurant in a renovated traditional building. Innovative dishes with local ingredients.', 'luxury', 4.9, 234, true, true, true, 'https://levantisparos.com', '+30 22840 23613', '/images/businesses/paros-levantis.jpg'),
  ('Sigi Ihthyos', 'sigi-ihthyos-paros', 'bar', 'paros', 'Naoussa', 'Harbor-side cocktails', 'Stylish bar overlooking the picturesque fishing harbor. Creative cocktails and Greek wines.', 'mid-range', 4.5, 156, false, true, true, NULL, '+30 22840 51699', '/images/businesses/paros-bar.jpg'),
  ('Golden Beach Watersports', 'golden-beach-watersports', 'tour', 'paros', 'Chrissi Akti', 'Windsurfing paradise', 'World-class windsurfing and kitesurfing. Equipment rental and lessons for all levels.', 'mid-range', 4.8, 345, true, true, true, 'https://goldenbeach-paros.com', '+30 22840 41878', '/images/businesses/paros-windsurfing.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Milos Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('O! Hamos!', 'o-hamos-milos', 'restaurant', 'milos', 'Adamas', 'Legendary seafood taverna', 'Famous for fresh grilled fish and legendary portions. Locals'' favorite for over 30 years.', 'mid-range', 4.8, 678, true, true, true, NULL, '+30 22870 21672', '/images/businesses/milos-ohamos.jpg'),
  ('Milos Adventures', 'milos-adventures', 'tour', 'milos', 'Adamas', 'Boat tours to hidden beaches', 'Explore Kleftiko, Tsigrado, and 70+ beaches. Private and group tours available.', 'mid-range', 4.9, 423, true, true, true, 'https://milosadventures.gr', '+30 6945 234567', '/images/businesses/milos-boat-tour.jpg'),
  ('Medusa Beach Bar', 'medusa-beach-milos', 'beach_club', 'milos', 'Paleochori', 'Volcanic beach vibes', 'Unique beach bar on geothermal sands. Try food cooked in volcanic sand!', 'mid-range', 4.6, 234, false, true, true, NULL, '+30 22870 31287', '/images/businesses/milos-medusa.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Sifnos Businesses  
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('To Tsikali', 'to-tsikali-sifnos', 'restaurant', 'sifnos', 'Artemonas', 'Traditional Sifnian cuisine', 'Authentic recipes passed down generations. Famous for revithada (chickpea stew) and mastelo.', 'mid-range', 4.9, 312, true, true, true, NULL, '+30 22840 31152', '/images/businesses/sifnos-tsikali.jpg'),
  ('Apostolidis Pottery', 'apostolidis-pottery-sifnos', 'shop', 'sifnos', 'Vathi', 'Traditional pottery workshops', 'Family pottery workshop since 1870. Watch artisans at work and buy authentic Sifnian ceramics.', 'mid-range', 4.8, 178, true, true, true, NULL, '+30 22840 71368', '/images/businesses/sifnos-pottery.jpg'),
  ('Omega 3', 'omega-3-sifnos', 'restaurant', 'sifnos', 'Platis Gialos', 'Fresh seafood on the beach', 'Beachfront taverna with daily fresh catch. Perfect sunset views over Platis Gialos.', 'mid-range', 4.7, 234, false, true, true, NULL, '+30 22840 71274', '/images/businesses/sifnos-seafood.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Ios Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('Pathos Sunset Lounge', 'pathos-ios', 'bar', 'ios', 'Chora', 'Famous sunset cocktails', 'The original Ios sunset bar. Incredible views and signature cocktails since 1994.', 'mid-range', 4.7, 567, true, true, true, NULL, '+30 22860 91777', '/images/businesses/ios-pathos.jpg'),
  ('Far Out Beach Club', 'far-out-ios', 'beach_club', 'ios', 'Mylopotas', 'Ultimate beach party destination', 'Legendary beach resort with camping, rooms, pool parties, and non-stop entertainment.', 'budget', 4.5, 1234, true, true, true, 'https://faroutclub.com', '+30 22860 92446', '/images/businesses/ios-farout.jpg'),
  ('Grandma''s Restaurant', 'grandmas-ios', 'restaurant', 'ios', 'Chora', 'Home-style Greek cooking', 'Authentic Greek recipes in a cozy traditional setting. Just like yiayia used to make.', 'budget', 4.8, 456, false, true, true, NULL, '+30 22860 91265', '/images/businesses/ios-grandmas.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Folegandros Businesses
INSERT INTO business_accounts (business_name, slug, business_type, island, location, short_description, description, price_range, rating, reviews_count, is_featured, is_verified, is_active, website, phone, cover_image_url)
VALUES
  ('Pounda', 'pounda-folegandros', 'restaurant', 'folegandros', 'Chora', 'Romantic cliffside dining', 'Exceptional cuisine with dramatic cliff views. Perfect for sunset dinners.', 'luxury', 4.9, 189, true, true, true, NULL, '+30 22860 41274', '/images/businesses/folegandros-pounda.jpg'),
  ('Eva''s Garden', 'evas-garden-folegandros', 'restaurant', 'folegandros', 'Chora', 'Hidden garden taverna', 'Charming courtyard restaurant with home-cooked Greek dishes and local wines.', 'mid-range', 4.8, 234, true, true, true, NULL, '+30 22860 41215', '/images/businesses/folegandros-evas.jpg')
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE business_accounts IS 'Seeded with sample businesses across major Cyclades islands for directory testing.';
