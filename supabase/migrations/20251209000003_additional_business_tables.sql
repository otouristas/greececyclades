-- =====================================================
-- ADDITIONAL BUSINESS TABLES
-- Restaurant menus, booking links, analytics
-- =====================================================

-- Restaurant/Cafe menus
CREATE TABLE IF NOT EXISTS restaurant_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'EUR',
  category TEXT, -- appetizer, main, dessert, drinks, etc.
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT FALSE,
  is_gluten_free BOOLEAN DEFAULT FALSE,
  allergens TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business booking links (multiple platforms)
CREATE TABLE IF NOT EXISTS business_booking_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- booking.com, airbnb, tripadvisor, opentable, thefork, direct, etc.
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  commission_rate DECIMAL(5, 2), -- For tracking
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business analytics events
CREATE TABLE IF NOT EXISTS business_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- view, click, call, direction, website, booking, share
  event_data JSONB DEFAULT '{}'::jsonb,
  visitor_id TEXT, -- Anonymous visitor tracking
  referrer TEXT,
  user_agent TEXT,
  ip_country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business promotions/offers
CREATE TABLE IF NOT EXISTS business_promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_accounts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed', 'free_item', 'special')),
  discount_value DECIMAL(10, 2),
  promo_code TEXT,
  valid_from DATE,
  valid_until DATE,
  terms_conditions TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  max_redemptions INTEGER,
  current_redemptions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_restaurant_menus_business ON restaurant_menus(business_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_menus_category ON restaurant_menus(category);
CREATE INDEX IF NOT EXISTS idx_restaurant_menus_featured ON restaurant_menus(is_featured) WHERE is_featured = true;

CREATE INDEX IF NOT EXISTS idx_business_booking_links_business ON business_booking_links(business_id);
CREATE INDEX IF NOT EXISTS idx_business_booking_links_platform ON business_booking_links(platform);

CREATE INDEX IF NOT EXISTS idx_business_analytics_business ON business_analytics(business_id);
CREATE INDEX IF NOT EXISTS idx_business_analytics_type ON business_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_business_analytics_created ON business_analytics(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_business_promotions_business ON business_promotions(business_id);
CREATE INDEX IF NOT EXISTS idx_business_promotions_active ON business_promotions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_business_promotions_dates ON business_promotions(valid_from, valid_until);

-- =====================================================
-- RLS POLICIES
-- =====================================================

ALTER TABLE restaurant_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_booking_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_promotions ENABLE ROW LEVEL SECURITY;

-- Restaurant menus policies
CREATE POLICY "Anyone can view menus of active businesses" ON restaurant_menus FOR SELECT 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND is_active = true));
CREATE POLICY "Business owners can manage menus" ON restaurant_menus FOR ALL 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));

-- Business booking links policies
CREATE POLICY "Anyone can view booking links of active businesses" ON business_booking_links FOR SELECT 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND is_active = true));
CREATE POLICY "Business owners can manage booking links" ON business_booking_links FOR ALL 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));

-- Business analytics policies
CREATE POLICY "Business owners can view own analytics" ON business_analytics FOR SELECT 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));
CREATE POLICY "Anyone can create analytics events" ON business_analytics FOR INSERT WITH CHECK (true);

-- Business promotions policies
CREATE POLICY "Anyone can view active promotions" ON business_promotions FOR SELECT 
  USING (is_active = true AND EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND is_active = true));
CREATE POLICY "Business owners can manage promotions" ON business_promotions FOR ALL 
  USING (EXISTS (SELECT 1 FROM business_accounts WHERE id = business_id AND user_id = auth.uid()));

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to track business view
CREATE OR REPLACE FUNCTION track_business_view(
  p_business_id UUID,
  p_visitor_id TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO business_analytics (business_id, event_type, visitor_id, referrer)
  VALUES (p_business_id, 'view', p_visitor_id, p_referrer);
  
  UPDATE business_accounts 
  SET views_count = views_count + 1 
  WHERE id = p_business_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to track business click
CREATE OR REPLACE FUNCTION track_business_click(
  p_business_id UUID,
  p_click_type TEXT, -- website, phone, directions, booking
  p_visitor_id TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO business_analytics (business_id, event_type, event_data, visitor_id)
  VALUES (p_business_id, 'click', jsonb_build_object('click_type', p_click_type), p_visitor_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at on business_accounts
DROP TRIGGER IF EXISTS trigger_business_accounts_updated ON business_accounts;
CREATE TRIGGER trigger_business_accounts_updated
BEFORE UPDATE ON business_accounts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
