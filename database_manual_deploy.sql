-- MANUAL DATABASE DEPLOYMENT SCRIPT
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/casbwosylkfdrnkarshm/sql

-- ============================================
-- PRE-REQUISITE: Ensure update_updated_at_column function exists
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 1. PRICE ALERTS
-- ============================================
CREATE TABLE IF NOT EXISTS price_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- ============================================
-- 2. USER PREFERENCES (for AI Memory)
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    travel_style TEXT DEFAULT 'mid-range',
    budget_preference TEXT DEFAULT 'moderate',
    dietary_restrictions TEXT[] DEFAULT '{}',
    accessibility_needs TEXT[] DEFAULT '{}',
    favorite_activities TEXT[] DEFAULT '{}',
    preferred_islands TEXT[] DEFAULT '{}',
    avoid_crowds BOOLEAN DEFAULT false,
    prefer_direct_ferries BOOLEAN DEFAULT false,
    preferred_accommodation_type TEXT DEFAULT 'any',
    past_trip_summaries JSONB DEFAULT '[]'::jsonb,
    ai_conversation_context JSONB DEFAULT '{}'::jsonb,
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. USER ANALYTICS
-- ============================================
CREATE TABLE IF NOT EXISTS user_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- ============================================
-- 4. PACKING LISTS
-- ============================================
CREATE TABLE IF NOT EXISTS packing_lists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- ============================================
-- 5. RESTAURANT BOOKINGS
-- ============================================
CREATE TABLE IF NOT EXISTS restaurant_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    restaurant_id TEXT NOT NULL,
    restaurant_name TEXT NOT NULL,
    island_id TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size >= 1),
    special_requests TEXT,
    status TEXT DEFAULT 'pending',
    confirmation_code TEXT,
    contacted_via TEXT DEFAULT 'platform',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. LOYALTY POINTS
-- ============================================
CREATE TABLE IF NOT EXISTS loyalty_points (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    points INTEGER DEFAULT 0,
    lifetime_points INTEGER DEFAULT 0,
    tier TEXT DEFAULT 'explorer',
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. LOYALTY TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    points INTEGER NOT NULL,
    transaction_type TEXT NOT NULL,
    source TEXT NOT NULL,
    reference_id TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Price Alerts
CREATE POLICY "Users can manage own price alerts" ON price_alerts FOR ALL USING (auth.uid() = user_id);

-- User Preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- User Analytics
CREATE POLICY "Users can manage own analytics" ON user_analytics FOR ALL USING (auth.uid() = user_id);

-- Packing Lists
CREATE POLICY "Users can manage own packing lists" ON packing_lists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view shared packing lists" ON packing_lists FOR SELECT USING (shared = true);

-- Restaurant Bookings
CREATE POLICY "Users can manage own bookings" ON restaurant_bookings FOR ALL USING (auth.uid() = user_id);

-- Loyalty
CREATE POLICY "Users can view own loyalty" ON loyalty_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON loyalty_transactions FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_price_alerts_updated_at BEFORE UPDATE ON price_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_analytics_updated_at BEFORE UPDATE ON user_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_packing_lists_updated_at BEFORE UPDATE ON packing_lists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurant_bookings_updated_at BEFORE UPDATE ON restaurant_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_points_updated_at BEFORE UPDATE ON loyalty_points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Done!
SELECT 'All tables created successfully!' as status;
