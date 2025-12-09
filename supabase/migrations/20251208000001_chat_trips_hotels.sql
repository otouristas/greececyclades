-- =====================================================
-- GREECE CYCLADES - ENHANCED SCHEMA MIGRATION
-- Chat, Trips, Hotels Integration
-- Run with: supabase db push
-- =====================================================

-- =====================================================
-- 1. CHAT SYSTEM TABLES (Touristas AI)
-- =====================================================

-- Chat conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_saved BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Saved places table (from AI chat)
CREATE TABLE IF NOT EXISTS saved_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  island TEXT, -- Added for Cyclades (which island)
  location TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  place_type TEXT, -- hotel, restaurant, beach, attraction
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- 2. ENHANCED USER TRIPS (Shareable Trip Plans)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  cover_image_url TEXT,
  duration_days INTEGER DEFAULT 3,
  budget_level TEXT CHECK (budget_level IN ('budget', 'mid-range', 'luxury')),
  trip_type TEXT, -- romantic, family, adventure, solo, island-hopping
  travelers_count INTEGER DEFAULT 2,
  islands TEXT[], -- Array of islands in the trip
  start_date DATE,
  end_date DATE,
  is_public BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Trip itinerary days
CREATE TABLE IF NOT EXISTS trip_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES user_trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  island TEXT, -- Which island for this day
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip activities/stops
CREATE TABLE IF NOT EXISTS trip_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_day_id UUID REFERENCES trip_days(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  island TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  activity_type TEXT, -- hotel, restaurant, attraction, beach, ferry, etc.
  start_time TIME,
  duration_minutes INTEGER,
  cost_estimate DECIMAL(10, 2),
  image_url TEXT,
  booking_url TEXT,
  external_id TEXT, -- For GetYourGuide, FerryScanner, etc.
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Trip likes (social features)
CREATE TABLE IF NOT EXISTS trip_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES user_trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

-- =====================================================
-- 3. HOTELS TABLE (Cyclades-wide)
-- =====================================================

CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  island TEXT NOT NULL, -- santorini, mykonos, naxos, etc.
  location TEXT, -- Village/area within island
  description TEXT,
  short_description TEXT,
  address TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  price_range TEXT CHECK (price_range IN ('budget', 'mid-range', 'luxury', 'ultra-luxury')),
  min_price DECIMAL(10, 2),
  max_price DECIMAL(10, 2),
  amenities TEXT[],
  property_type TEXT, -- hotel, villa, apartment, cave-hotel, boutique
  room_count INTEGER,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  booking_url TEXT,
  agoda_id TEXT,
  booking_com_id TEXT,
  tripadvisor_id TEXT,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Hotel photos
CREATE TABLE IF NOT EXISTS hotel_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  alt_text TEXT,
  is_main BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel reviews
CREATE TABLE IF NOT EXISTS hotel_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'internal', -- internal, booking, agoda, tripadvisor
  external_id TEXT,
  author_name TEXT,
  rating DECIMAL(2, 1) NOT NULL,
  title TEXT,
  content TEXT,
  stay_date DATE,
  trip_type TEXT,
  pros TEXT[],
  cons TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- 4. ACTIVITIES TABLE (GetYourGuide Integration)
-- =====================================================

CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  island TEXT NOT NULL,
  location TEXT,
  description TEXT,
  short_description TEXT,
  activity_type TEXT, -- tour, cruise, diving, hiking, wine-tasting, etc.
  duration_hours DECIMAL(4, 1),
  price_from DECIMAL(10, 2),
  currency TEXT DEFAULT 'EUR',
  image_url TEXT,
  booking_url TEXT,
  getyourguide_id TEXT,
  viator_id TEXT,
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  highlights TEXT[],
  included TEXT[],
  not_included TEXT[],
  meeting_point TEXT,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- 5. FERRY ROUTES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS ferry_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_island TEXT NOT NULL,
  to_island TEXT NOT NULL,
  ferry_company TEXT,
  duration_minutes INTEGER,
  frequency TEXT, -- daily, 3x-weekly, etc.
  price_from DECIMAL(10, 2),
  season TEXT, -- year-round, summer-only, etc.
  booking_url TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. INDEXES FOR PERFORMANCE
-- =====================================================

-- Chat indexes
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_updated ON chat_conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_saved_places_user ON saved_places(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_places_island ON saved_places(island);

-- Trip indexes
CREATE INDEX IF NOT EXISTS idx_user_trips_user ON user_trips(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trips_public ON user_trips(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_trips_likes ON user_trips(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_user_trips_slug ON user_trips(slug);
CREATE INDEX IF NOT EXISTS idx_trip_days_trip ON trip_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_activities_day ON trip_activities(trip_day_id);
CREATE INDEX IF NOT EXISTS idx_trip_likes_trip ON trip_likes(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_likes_user ON trip_likes(user_id);

-- Hotel indexes
CREATE INDEX IF NOT EXISTS idx_hotels_island ON hotels(island);
CREATE INDEX IF NOT EXISTS idx_hotels_slug ON hotels(slug);
CREATE INDEX IF NOT EXISTS idx_hotels_featured ON hotels(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_hotels_active ON hotels(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_hotels_price_range ON hotels(price_range);
CREATE INDEX IF NOT EXISTS idx_hotel_photos_hotel ON hotel_photos(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_reviews_hotel ON hotel_reviews(hotel_id);

-- Activity indexes
CREATE INDEX IF NOT EXISTS idx_activities_island ON activities(island);
CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_activities_featured ON activities(featured) WHERE featured = true;

-- Ferry indexes
CREATE INDEX IF NOT EXISTS idx_ferry_routes_from ON ferry_routes(from_island);
CREATE INDEX IF NOT EXISTS idx_ferry_routes_to ON ferry_routes(to_island);

-- =====================================================
-- 7. ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ferry_routes ENABLE ROW LEVEL SECURITY;

-- Chat policies
CREATE POLICY "Users can view own conversations" ON chat_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own conversations" ON chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON chat_conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON chat_conversations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages in own conversations" ON chat_messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM chat_conversations WHERE id = conversation_id AND user_id = auth.uid()));
CREATE POLICY "Users can create messages in own conversations" ON chat_messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM chat_conversations WHERE id = conversation_id AND user_id = auth.uid()));

-- Saved places policies
CREATE POLICY "Users can view own saved places" ON saved_places FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own saved places" ON saved_places FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own saved places" ON saved_places FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved places" ON saved_places FOR DELETE USING (auth.uid() = user_id);

-- User trips policies
CREATE POLICY "Users can view own trips" ON user_trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view public trips" ON user_trips FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create own trips" ON user_trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON user_trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON user_trips FOR DELETE USING (auth.uid() = user_id);

-- Trip days policies
CREATE POLICY "Users can view trip days of accessible trips" ON trip_days FOR SELECT 
  USING (EXISTS (SELECT 1 FROM user_trips WHERE id = trip_id AND (user_id = auth.uid() OR is_public = true)));
CREATE POLICY "Users can manage trip days of own trips" ON trip_days FOR ALL 
  USING (EXISTS (SELECT 1 FROM user_trips WHERE id = trip_id AND user_id = auth.uid()));

-- Trip activities policies
CREATE POLICY "Users can view activities of accessible trips" ON trip_activities FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM trip_days td 
    JOIN user_trips ut ON td.trip_id = ut.id 
    WHERE td.id = trip_day_id AND (ut.user_id = auth.uid() OR ut.is_public = true)
  ));
CREATE POLICY "Users can manage activities of own trips" ON trip_activities FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM trip_days td 
    JOIN user_trips ut ON td.trip_id = ut.id 
    WHERE td.id = trip_day_id AND ut.user_id = auth.uid()
  ));

-- Trip likes policies
CREATE POLICY "Anyone can view trip likes" ON trip_likes FOR SELECT USING (true);
CREATE POLICY "Users can like trips" ON trip_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike trips" ON trip_likes FOR DELETE USING (auth.uid() = user_id);

-- Hotels policies (public read)
CREATE POLICY "Anyone can view active hotels" ON hotels FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view hotel photos" ON hotel_photos FOR SELECT USING (true);
CREATE POLICY "Anyone can view hotel reviews" ON hotel_reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON hotel_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Activities policies (public read)
CREATE POLICY "Anyone can view active activities" ON activities FOR SELECT USING (is_active = true);

-- Ferry routes policies (public read)
CREATE POLICY "Anyone can view ferry routes" ON ferry_routes FOR SELECT USING (is_active = true);

-- =====================================================
-- 8. FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update trip likes count
CREATE OR REPLACE FUNCTION update_trip_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_trips SET likes_count = likes_count + 1 WHERE id = NEW.trip_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_trips SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.trip_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for trip likes
DROP TRIGGER IF EXISTS trigger_update_trip_likes ON trip_likes;
CREATE TRIGGER trigger_update_trip_likes
AFTER INSERT OR DELETE ON trip_likes
FOR EACH ROW EXECUTE FUNCTION update_trip_likes_count();

-- Function to generate slug
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        TRIM(input_text),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate trip slug
CREATE OR REPLACE FUNCTION set_trip_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title) || '-' || SUBSTR(NEW.id::TEXT, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for trip slug
DROP TRIGGER IF EXISTS trigger_set_trip_slug ON user_trips;
CREATE TRIGGER trigger_set_trip_slug
BEFORE INSERT ON user_trips
FOR EACH ROW EXECUTE FUNCTION set_trip_slug();

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_chat_conversations_updated ON chat_conversations;
CREATE TRIGGER trigger_chat_conversations_updated
BEFORE UPDATE ON chat_conversations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_user_trips_updated ON user_trips;
CREATE TRIGGER trigger_user_trips_updated
BEFORE UPDATE ON user_trips
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_hotels_updated ON hotels;
CREATE TRIGGER trigger_hotels_updated
BEFORE UPDATE ON hotels
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_activities_updated ON activities;
CREATE TRIGGER trigger_activities_updated
BEFORE UPDATE ON activities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. STORAGE BUCKETS
-- =====================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('hotel-images', 'hotel-images', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('activity-images', 'activity-images', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('trip-covers', 'trip-covers', true) 
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Hotel images are publicly accessible" ON storage.objects 
FOR SELECT USING (bucket_id = 'hotel-images');

CREATE POLICY "Activity images are publicly accessible" ON storage.objects 
FOR SELECT USING (bucket_id = 'activity-images');

CREATE POLICY "Trip covers are publicly accessible" ON storage.objects 
FOR SELECT USING (bucket_id = 'trip-covers');

CREATE POLICY "Authenticated users can upload trip covers" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'trip-covers' AND auth.role() = 'authenticated');
