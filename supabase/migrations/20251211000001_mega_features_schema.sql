-- ============================================
-- MEGA FEATURES DATABASE SCHEMA
-- Version: 1.0.0
-- For: Discover Cyclades Platform
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PRICE ALERTS
-- User can set alerts for price drops on flights, hotels, ferries
-- ============================================
CREATE TABLE IF NOT EXISTS price_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    alert_type TEXT CHECK (alert_type IN ('flight', 'hotel', 'ferry')) NOT NULL,
    route_from TEXT NOT NULL,
    route_to TEXT NOT NULL,
    travel_date DATE,
    return_date DATE,
    threshold_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2),
    last_checked_at TIMESTAMP WITH TIME ZONE,
    notification_sent BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    email_notify BOOLEAN DEFAULT true,
    push_notify BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(active) WHERE active = true;
CREATE INDEX idx_price_alerts_type ON price_alerts(alert_type);

-- ============================================
-- 2. USER PREFERENCES (Enhanced for AI Memory)
-- Stores travel style, preferences, past trip summaries for AI context
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    travel_style TEXT CHECK (travel_style IN ('budget', 'mid-range', 'luxury', 'adventure', 'relaxation', 'cultural')) DEFAULT 'mid-range',
    budget_preference TEXT CHECK (budget_preference IN ('economy', 'moderate', 'premium', 'no-limit')) DEFAULT 'moderate',
    dietary_restrictions TEXT[],
    accessibility_needs TEXT[],
    favorite_activities TEXT[],
    preferred_islands TEXT[],
    avoid_crowds BOOLEAN DEFAULT false,
    prefer_direct_ferries BOOLEAN DEFAULT false,
    preferred_accommodation_type TEXT CHECK (preferred_accommodation_type IN ('hotel', 'villa', 'hostel', 'airbnb', 'any')) DEFAULT 'any',
    past_trip_summaries JSONB DEFAULT '[]'::jsonb,
    ai_conversation_context JSONB DEFAULT '{}'::jsonb,
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- ============================================
-- 3. GROUP TRIPS
-- Coordinate trips with multiple travelers
-- ============================================
CREATE TABLE IF NOT EXISTS group_trips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    invite_code TEXT UNIQUE NOT NULL,
    start_date DATE,
    end_date DATE,
    islands TEXT[] DEFAULT '{}',
    shared_itinerary_id UUID REFERENCES trip_plans(id) ON DELETE SET NULL,
    voting_enabled BOOLEAN DEFAULT true,
    chat_enabled BOOLEAN DEFAULT true,
    max_participants INTEGER DEFAULT 20,
    status TEXT CHECK (status IN ('planning', 'confirmed', 'completed', 'cancelled')) DEFAULT 'planning',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_group_trips_creator_id ON group_trips(creator_id);
CREATE INDEX idx_group_trips_invite_code ON group_trips(invite_code);

-- ============================================
-- 4. GROUP TRIP PARTICIPANTS
-- ============================================
CREATE TABLE IF NOT EXISTS group_trip_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_trip_id UUID REFERENCES group_trips(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT CHECK (role IN ('organizer', 'member')) DEFAULT 'member',
    status TEXT CHECK (status IN ('invited', 'joined', 'declined')) DEFAULT 'invited',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_trip_id, user_id)
);

CREATE INDEX idx_group_participants_group_id ON group_trip_participants(group_trip_id);
CREATE INDEX idx_group_participants_user_id ON group_trip_participants(user_id);

-- ============================================
-- 5. GROUP VOTES
-- Voting on activities, restaurants, islands
-- ============================================
CREATE TABLE IF NOT EXISTS group_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_trip_id UUID REFERENCES group_trips(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    item_type TEXT CHECK (item_type IN ('island', 'activity', 'restaurant', 'hotel', 'date')) NOT NULL,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    vote INTEGER CHECK (vote IN (-1, 0, 1)) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_trip_id, user_id, item_type, item_id)
);

CREATE INDEX idx_group_votes_group_id ON group_votes(group_trip_id);

-- ============================================
-- 6. USER GENERATED CONTENT (Photos & Stories)
-- ============================================
CREATE TABLE IF NOT EXISTS user_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    island_id TEXT NOT NULL,
    content_type TEXT CHECK (content_type IN ('photo', 'story', 'tip')) NOT NULL,
    title TEXT,
    body TEXT,
    images TEXT[] DEFAULT '{}',
    location TEXT,
    coordinates JSONB,
    tags TEXT[] DEFAULT '{}',
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_content_user_id ON user_content(user_id);
CREATE INDEX idx_user_content_island_id ON user_content(island_id);
CREATE INDEX idx_user_content_type ON user_content(content_type);
CREATE INDEX idx_user_content_featured ON user_content(featured) WHERE featured = true;

-- ============================================
-- 7. CONTENT LIKES
-- ============================================
CREATE TABLE IF NOT EXISTS content_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content_id UUID REFERENCES user_content(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(content_id, user_id)
);

CREATE INDEX idx_content_likes_content_id ON content_likes(content_id);

-- ============================================
-- 8. FORUM QUESTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS forum_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    island_id TEXT,
    category TEXT CHECK (category IN ('general', 'transport', 'accommodation', 'food', 'activities', 'tips')) DEFAULT 'general',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    answers_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    is_resolved BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_forum_questions_user_id ON forum_questions(user_id);
CREATE INDEX idx_forum_questions_island_id ON forum_questions(island_id);
CREATE INDEX idx_forum_questions_category ON forum_questions(category);

-- ============================================
-- 9. FORUM ANSWERS
-- ============================================
CREATE TABLE IF NOT EXISTS forum_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question_id UUID REFERENCES forum_questions(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_accepted BOOLEAN DEFAULT false,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_forum_answers_question_id ON forum_answers(question_id);
CREATE INDEX idx_forum_answers_user_id ON forum_answers(user_id);

-- ============================================
-- 10. PACKING LISTS
-- ============================================
CREATE TABLE IF NOT EXISTS packing_lists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    trip_id UUID REFERENCES trip_plans(id) ON DELETE SET NULL,
    name TEXT NOT NULL DEFAULT 'My Packing List',
    items JSONB DEFAULT '[]'::jsonb,
    generated_by_ai BOOLEAN DEFAULT false,
    is_template BOOLEAN DEFAULT false,
    shared BOOLEAN DEFAULT false,
    share_code TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_packing_lists_user_id ON packing_lists(user_id);
CREATE INDEX idx_packing_lists_trip_id ON packing_lists(trip_id);

-- ============================================
-- 11. RESTAURANT BOOKINGS
-- ============================================
CREATE TABLE IF NOT EXISTS restaurant_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    restaurant_id TEXT NOT NULL,
    restaurant_name TEXT NOT NULL,
    island_id TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size >= 1),
    special_requests TEXT,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no-show')) DEFAULT 'pending',
    confirmation_code TEXT,
    contacted_via TEXT CHECK (contacted_via IN ('email', 'phone', 'whatsapp', 'platform')) DEFAULT 'platform',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_restaurant_bookings_user_id ON restaurant_bookings(user_id);
CREATE INDEX idx_restaurant_bookings_date ON restaurant_bookings(booking_date);
CREATE INDEX idx_restaurant_bookings_status ON restaurant_bookings(status);

-- ============================================
-- 12. FERRY TRACKING SUBSCRIPTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS ferry_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    vessel_id TEXT,
    vessel_name TEXT NOT NULL,
    route_from TEXT NOT NULL,
    route_to TEXT NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME,
    booking_reference TEXT,
    notify_delays BOOLEAN DEFAULT true,
    notify_departures BOOLEAN DEFAULT true,
    last_status TEXT,
    last_position JSONB,
    last_updated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ferry_tracking_user_id ON ferry_tracking(user_id);
CREATE INDEX idx_ferry_tracking_departure_date ON ferry_tracking(departure_date);

-- ============================================
-- 13. LOCAL EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS local_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    island_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('festival', 'concert', 'market', 'religious', 'sports', 'cultural', 'food', 'other')) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME,
    location TEXT,
    coordinates JSONB,
    venue TEXT,
    price_info TEXT,
    website TEXT,
    image_url TEXT,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern TEXT,
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_local_events_island_id ON local_events(island_id);
CREATE INDEX idx_local_events_start_date ON local_events(start_date);
CREATE INDEX idx_local_events_category ON local_events(category);

-- ============================================
-- 14. USER TRAVEL ANALYTICS
-- ============================================
CREATE TABLE IF NOT EXISTS user_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    islands_visited TEXT[] DEFAULT '{}',
    total_trips INTEGER DEFAULT 0,
    total_days_traveled INTEGER DEFAULT 0,
    total_km_by_ferry DECIMAL(10, 2) DEFAULT 0,
    total_km_by_flight DECIMAL(10, 2) DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    spending_breakdown JSONB DEFAULT '{"hotels": 0, "ferries": 0, "flights": 0, "activities": 0, "food": 0}'::jsonb,
    carbon_footprint_kg DECIMAL(10, 2) DEFAULT 0,
    favorite_island TEXT,
    travel_badges TEXT[] DEFAULT '{}',
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);

-- ============================================
-- 15. INSPIRATION CONTENT FEED
-- ============================================
CREATE TABLE IF NOT EXISTS inspiration_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content_type TEXT CHECK (content_type IN ('video', 'image', 'article', 'tip')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    island_id TEXT,
    category TEXT CHECK (category IN ('beaches', 'food', 'nightlife', 'culture', 'adventure', 'sunset', 'hidden-gems', 'seasonal')) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    trending_score DECIMAL(5, 2) DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    source TEXT,
    source_url TEXT,
    is_ai_curated BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter', 'all')) DEFAULT 'all',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inspiration_content_island_id ON inspiration_content(island_id);
CREATE INDEX idx_inspiration_content_category ON inspiration_content(category);
CREATE INDEX idx_inspiration_content_trending ON inspiration_content(trending_score DESC);
CREATE INDEX idx_inspiration_content_featured ON inspiration_content(featured) WHERE featured = true;

-- ============================================
-- 16. LOYALTY POINTS
-- ============================================
CREATE TABLE IF NOT EXISTS loyalty_points (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    points INTEGER DEFAULT 0,
    lifetime_points INTEGER DEFAULT 0,
    tier TEXT CHECK (tier IN ('explorer', 'adventurer', 'voyager', 'legend')) DEFAULT 'explorer',
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE INDEX idx_loyalty_points_user_id ON loyalty_points(user_id);

-- ============================================
-- 17. LOYALTY TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    points INTEGER NOT NULL,
    transaction_type TEXT CHECK (transaction_type IN ('earn', 'redeem', 'expire', 'bonus')) NOT NULL,
    source TEXT CHECK (source IN ('booking_hotel', 'booking_ferry', 'booking_flight', 'booking_activity', 'referral', 'review', 'content', 'signup', 'promotion')) NOT NULL,
    reference_id TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_type ON loyalty_transactions(transaction_type);

-- ============================================
-- TRIGGERS
-- ============================================

-- Update updated_at triggers
CREATE TRIGGER update_price_alerts_updated_at BEFORE UPDATE ON price_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_group_trips_updated_at BEFORE UPDATE ON group_trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_content_updated_at BEFORE UPDATE ON user_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_questions_updated_at BEFORE UPDATE ON forum_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_answers_updated_at BEFORE UPDATE ON forum_answers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_packing_lists_updated_at BEFORE UPDATE ON packing_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurant_bookings_updated_at BEFORE UPDATE ON restaurant_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_local_events_updated_at BEFORE UPDATE ON local_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_analytics_updated_at BEFORE UPDATE ON user_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspiration_content_updated_at BEFORE UPDATE ON inspiration_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_points_updated_at BEFORE UPDATE ON loyalty_points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_trip_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ferry_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Price Alerts: Users can only see/modify their own
CREATE POLICY "Users can view own price alerts" ON price_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own price alerts" ON price_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own price alerts" ON price_alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own price alerts" ON price_alerts FOR DELETE USING (auth.uid() = user_id);

-- User Preferences: Users can only see/modify their own
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- Group Trips: Visible to creator and participants
CREATE POLICY "Users can view own or joined group trips" ON group_trips FOR SELECT 
    USING (auth.uid() = creator_id OR EXISTS (SELECT 1 FROM group_trip_participants WHERE group_trip_id = id AND user_id = auth.uid()));
CREATE POLICY "Users can create group trips" ON group_trips FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update group trips" ON group_trips FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete group trips" ON group_trips FOR DELETE USING (auth.uid() = creator_id);

-- User Content: Public read, owner write
CREATE POLICY "Anyone can view approved content" ON user_content FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view own content" ON user_content FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create content" ON user_content FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own content" ON user_content FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own content" ON user_content FOR DELETE USING (auth.uid() = user_id);

-- Forum: Public read, authenticated write
CREATE POLICY "Anyone can view questions" ON forum_questions FOR SELECT USING (true);
CREATE POLICY "Authenticated can create questions" ON forum_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own questions" ON forum_questions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view answers" ON forum_answers FOR SELECT USING (true);
CREATE POLICY "Authenticated can create answers" ON forum_answers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own answers" ON forum_answers FOR UPDATE USING (auth.uid() = user_id);

-- Packing Lists: Owner only, or shared
CREATE POLICY "Users can view own or shared packing lists" ON packing_lists FOR SELECT 
    USING (auth.uid() = user_id OR shared = true);
CREATE POLICY "Users can create packing lists" ON packing_lists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own packing lists" ON packing_lists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own packing lists" ON packing_lists FOR DELETE USING (auth.uid() = user_id);

-- Restaurant Bookings: Owner only
CREATE POLICY "Users can view own bookings" ON restaurant_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON restaurant_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON restaurant_bookings FOR UPDATE USING (auth.uid() = user_id);

-- Ferry Tracking: Owner only
CREATE POLICY "Users can view own ferry tracking" ON ferry_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create ferry tracking" ON ferry_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ferry tracking" ON ferry_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ferry tracking" ON ferry_tracking FOR DELETE USING (auth.uid() = user_id);

-- Local Events: Public read
CREATE POLICY "Anyone can view events" ON local_events FOR SELECT USING (true);

-- User Analytics: Owner only
CREATE POLICY "Users can view own analytics" ON user_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own analytics" ON user_analytics FOR UPDATE USING (auth.uid() = user_id);

-- Inspiration Content: Public read
CREATE POLICY "Anyone can view inspiration content" ON inspiration_content FOR SELECT USING (active = true);

-- Loyalty: Owner only
CREATE POLICY "Users can view own loyalty" ON loyalty_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON loyalty_transactions FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to generate unique invite codes
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate loyalty tier based on points
CREATE OR REPLACE FUNCTION calculate_loyalty_tier(points INTEGER)
RETURNS TEXT AS $$
BEGIN
    IF points >= 10000 THEN
        RETURN 'legend';
    ELSIF points >= 5000 THEN
        RETURN 'voyager';
    ELSIF points >= 1000 THEN
        RETURN 'adventurer';
    ELSE
        RETURN 'explorer';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update loyalty tier when points change
CREATE OR REPLACE FUNCTION update_loyalty_tier()
RETURNS TRIGGER AS $$
BEGIN
    NEW.tier := calculate_loyalty_tier(NEW.lifetime_points);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_loyalty_tier_trigger
    BEFORE INSERT OR UPDATE OF lifetime_points ON loyalty_points
    FOR EACH ROW EXECUTE FUNCTION update_loyalty_tier();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public) VALUES ('user-content', 'user-content', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('inspiration', 'inspiration', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "User content images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'user-content');
CREATE POLICY "Users can upload their own content images" ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own content images" ON storage.objects FOR DELETE 
    USING (bucket_id = 'user-content' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Inspiration images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'inspiration');
