-- =====================================================
-- HOTEL OWNERS & BUSINESS ACCOUNTS
-- For discovercyclades.gr - Multi-island support
-- Run with: supabase db push
-- =====================================================

-- =====================================================
-- 1. USER PROFILES (Extended)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  favorite_islands TEXT[],
  travel_style TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'hotel_owner', 'business_owner', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- 2. HOTEL OWNERS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS hotel_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'manager', 'editor')),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, hotel_id)
);

-- Add owner_user_id to hotels if not exists
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- =====================================================
-- 3. BUSINESS ACCOUNTS (Restaurants, Nightclubs, etc.)
-- =====================================================

CREATE TABLE IF NOT EXISTS business_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  business_type TEXT NOT NULL CHECK (business_type IN ('hotel', 'restaurant', 'bar', 'nightclub', 'cafe', 'taxi', 'rental', 'tour', 'shop', 'yacht', 'spa', 'beach_club', 'winery', 'bakery', 'other')),
  island TEXT NOT NULL,
  location TEXT,
  description TEXT,
  short_description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  logo_url TEXT,
  cover_image_url TEXT,
  price_range TEXT CHECK (price_range IN ('budget', 'mid-range', 'luxury', 'ultra-luxury')),
  opening_hours JSONB DEFAULT '{}'::jsonb,
  amenities TEXT[],
  cuisine_type TEXT[],
  specialties TEXT[],
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'starter', 'professional', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2, 1),
  reviews_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  booking_url TEXT,
  menu_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tripadvisor_url TEXT,
  google_maps_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Business photos
CREATE TABLE IF NOT EXISTS business_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  is_main BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business reviews
CREATE TABLE IF NOT EXISTS business_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  visit_date DATE,
  trip_type TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business operating hours (detailed)
CREATE TABLE IF NOT EXISTS business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- =====================================================
-- 4. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_verified ON user_profiles(is_verified) WHERE is_verified = true;

CREATE INDEX IF NOT EXISTS idx_hotel_owners_user ON hotel_owners(user_id);
CREATE INDEX IF NOT EXISTS idx_hotel_owners_hotel ON hotel_owners(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_owners_verified ON hotel_owners(is_verified) WHERE is_verified = true;
CREATE INDEX IF NOT EXISTS idx_hotels_owner ON hotels(owner_user_id);

CREATE INDEX IF NOT EXISTS idx_business_accounts_island ON business_accounts(island);
CREATE INDEX IF NOT EXISTS idx_business_accounts_type ON business_accounts(business_type);
CREATE INDEX IF NOT EXISTS idx_business_accounts_slug ON business_accounts(slug);
CREATE INDEX IF NOT EXISTS idx_business_accounts_featured ON business_accounts(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_business_accounts_active ON business_accounts(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_business_accounts_rating ON business_accounts(rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_business_accounts_island_type ON business_accounts(island, business_type);

CREATE INDEX IF NOT EXISTS idx_business_photos_business ON business_photos(business_id);
CREATE INDEX IF NOT EXISTS idx_business_photos_main ON business_photos(business_id, is_main) WHERE is_main = true;

CREATE INDEX IF NOT EXISTS idx_business_reviews_business ON business_reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_business_reviews_rating ON business_reviews(business_id, rating);

CREATE INDEX IF NOT EXISTS idx_business_hours_business ON business_hours(business_id);

-- =====================================================
-- 5. ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Public profiles are viewable" ON user_profiles FOR SELECT USING (true);

-- Hotel owners policies
CREATE POLICY "Users can view own hotel ownerships" ON hotel_owners FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Hotel owners can create ownership" ON hotel_owners FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Business accounts policies - public can view active businesses
CREATE POLICY "Anyone can view active businesses" ON business_accounts FOR SELECT USING (is_active = true);
CREATE POLICY "Owners can view own business" ON business_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Owners can create business" ON business_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners can update own business" ON business_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Owners can delete own business" ON business_accounts FOR DELETE USING (auth.uid() = user_id);

-- Business photos policies - public read
CREATE POLICY "Anyone can view business photos" ON business_photos FOR SELECT USING (true);
CREATE POLICY "Business owners can manage photos" ON business_photos FOR ALL 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));

-- Business reviews policies
CREATE POLICY "Anyone can view business reviews" ON business_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON business_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON business_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON business_reviews FOR DELETE USING (auth.uid() = user_id);

-- Business hours policies - public read
CREATE POLICY "Anyone can view business hours" ON business_hours FOR SELECT USING (true);
CREATE POLICY "Business owners can manage hours" ON business_hours FOR ALL 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));

-- =====================================================
-- 6. HELPER FUNCTIONS
-- =====================================================

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION has_role(check_user_id UUID, required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = check_user_id AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate slug for business (uses existing generate_slug function)
CREATE OR REPLACE FUNCTION set_business_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.business_name) || '-' || SUBSTRING(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_business_slug ON business_accounts;
CREATE TRIGGER trigger_set_business_slug
BEFORE INSERT ON business_accounts
FOR EACH ROW EXECUTE FUNCTION set_business_slug();

-- Update business rating when review is added
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE business_accounts 
    SET 
      rating = (SELECT AVG(rating) FROM business_reviews WHERE business_id = NEW.business_id),
      reviews_count = (SELECT COUNT(*) FROM business_reviews WHERE business_id = NEW.business_id),
      updated_at = NOW()
    WHERE id = NEW.business_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE business_accounts 
    SET 
      rating = (SELECT AVG(rating) FROM business_reviews WHERE business_id = OLD.business_id),
      reviews_count = (SELECT COUNT(*) FROM business_reviews WHERE business_id = OLD.business_id),
      updated_at = NOW()
    WHERE id = OLD.business_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_business_rating ON business_reviews;
CREATE TRIGGER trigger_update_business_rating
AFTER INSERT OR UPDATE OR DELETE ON business_reviews
FOR EACH ROW EXECUTE FUNCTION update_business_rating();

-- Increment view count
CREATE OR REPLACE FUNCTION increment_business_views(business_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE business_accounts 
  SET views_count = views_count + 1 
  WHERE id = business_uuid;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. SEED SAMPLE BUSINESS CATEGORIES (for reference)
-- =====================================================

-- Business types available:
-- hotel, restaurant, bar, nightclub, cafe, taxi, rental, tour, shop, yacht, spa, beach_club, winery, bakery, other

-- Price ranges available:
-- budget, mid-range, luxury, ultra-luxury

COMMENT ON TABLE business_accounts IS 'Stores all business listings across Cyclades islands including restaurants, bars, tours, rentals, etc.';
COMMENT ON COLUMN business_accounts.island IS 'Island name in lowercase: santorini, mykonos, naxos, paros, milos, sifnos, etc.';
COMMENT ON COLUMN business_accounts.business_type IS 'Type of business: restaurant, bar, nightclub, cafe, taxi, rental, tour, shop, yacht, spa, beach_club, winery, bakery, other';
