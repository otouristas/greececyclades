-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    phone_number TEXT,
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    item_type TEXT CHECK (item_type IN ('island', 'hotel', 'activity')) NOT NULL,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_slug TEXT NOT NULL,
    item_image TEXT NOT NULL,
    item_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- Create trip_plans table
CREATE TABLE IF NOT EXISTS trip_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration INTEGER NOT NULL,
    islands TEXT[] NOT NULL,
    estimated_budget DECIMAL(10,2) NOT NULL,
    notes TEXT,
    status TEXT CHECK (status IN ('draft', 'planned', 'completed')) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    location TEXT,
    date DATE NOT NULL,
    mood TEXT,
    weather TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_item_type ON favorites(item_type);
CREATE INDEX IF NOT EXISTS idx_trip_plans_user_id ON trip_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_plans_start_date ON trip_plans(start_date);
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_date ON diary_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trip_plans_updated_at BEFORE UPDATE ON trip_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diary_entries_updated_at BEFORE UPDATE ON diary_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Posts policies
CREATE POLICY "Users can view all posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Trip plans policies
CREATE POLICY "Users can view their own trip plans" ON trip_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own trip plans" ON trip_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own trip plans" ON trip_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own trip plans" ON trip_plans FOR DELETE USING (auth.uid() = user_id);

-- Diary entries policies
CREATE POLICY "Users can view their own diary entries" ON diary_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own diary entries" ON diary_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own diary entries" ON diary_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own diary entries" ON diary_entries FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Users can view all follows" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can insert their own follows" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own follows" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for avatars and images
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('posts', 'posts', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('diary', 'diary', true);

-- Create storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Post images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'posts');
CREATE POLICY "Users can upload their own post images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own post images" ON storage.objects FOR DELETE USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Diary images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'diary');
CREATE POLICY "Users can upload their own diary images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'diary' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own diary images" ON storage.objects FOR DELETE USING (bucket_id = 'diary' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================
-- BUSINESS TABLES
-- ============================================

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    business_type TEXT CHECK (business_type IN ('hotel', 'car_rental', 'activity', 'restaurant')) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    location TEXT,
    address TEXT,
    city TEXT,
    island TEXT,
    postal_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    logo_url TEXT,
    cover_image_url TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')) DEFAULT 'pending',
    verification_status TEXT CHECK (verification_status IN ('unverified', 'pending', 'verified')) DEFAULT 'unverified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_profiles table for detailed business information
CREATE TABLE IF NOT EXISTS business_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE UNIQUE NOT NULL,
    tax_id TEXT,
    registration_number TEXT,
    owner_name TEXT,
    owner_phone TEXT,
    owner_email TEXT,
    languages TEXT[],
    amenities TEXT[],
    payment_methods TEXT[],
    opening_hours JSONB,
    social_media JSONB,
    additional_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_listings table for hotels, cars, activities, restaurants
CREATE TABLE IF NOT EXISTS business_listings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    listing_type TEXT CHECK (listing_type IN ('hotel', 'room', 'car', 'activity', 'restaurant', 'menu_item')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    currency TEXT DEFAULT 'EUR',
    images TEXT[],
    features TEXT[],
    availability JSONB,
    location TEXT,
    coordinates JSONB,
    status TEXT CHECK (status IN ('active', 'inactive', 'draft')) DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    rating DECIMAL(3, 2),
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_verification table
CREATE TABLE IF NOT EXISTS business_verification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE UNIQUE NOT NULL,
    documents JSONB,
    verification_notes TEXT,
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_subscriptions table (optional, for future use)
CREATE TABLE IF NOT EXISTS business_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE UNIQUE NOT NULL,
    plan_type TEXT CHECK (plan_type IN ('free', 'basic', 'premium', 'enterprise')) DEFAULT 'free',
    status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE,
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for business tables
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_business_type ON businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_island ON businesses(island);
CREATE INDEX IF NOT EXISTS idx_business_profiles_business_id ON business_profiles(business_id);
CREATE INDEX IF NOT EXISTS idx_business_listings_business_id ON business_listings(business_id);
CREATE INDEX IF NOT EXISTS idx_business_listings_listing_type ON business_listings(listing_type);
CREATE INDEX IF NOT EXISTS idx_business_listings_status ON business_listings(status);
CREATE INDEX IF NOT EXISTS idx_business_verification_business_id ON business_verification(business_id);
CREATE INDEX IF NOT EXISTS idx_business_subscriptions_business_id ON business_subscriptions(business_id);

-- Create triggers for updated_at on business tables
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON business_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_listings_updated_at BEFORE UPDATE ON business_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_verification_updated_at BEFORE UPDATE ON business_verification FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_subscriptions_updated_at BEFORE UPDATE ON business_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on business tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_subscriptions ENABLE ROW LEVEL SECURITY;

-- Business RLS policies
-- Businesses: Users can view approved businesses, manage their own
CREATE POLICY "Anyone can view approved businesses" ON businesses FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view their own business" ON businesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own business" ON businesses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own business" ON businesses FOR UPDATE USING (auth.uid() = user_id);

-- Business profiles: Users can view profiles of approved businesses, manage their own
CREATE POLICY "Anyone can view profiles of approved businesses" ON business_profiles FOR SELECT 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_profiles.business_id AND businesses.status = 'approved'));
CREATE POLICY "Users can view their own business profile" ON business_profiles FOR SELECT 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_profiles.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can insert their own business profile" ON business_profiles FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_profiles.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can update their own business profile" ON business_profiles FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_profiles.business_id AND businesses.user_id = auth.uid()));

-- Business listings: Users can view active listings, manage their own
CREATE POLICY "Anyone can view active listings" ON business_listings FOR SELECT 
    USING (status = 'active' AND EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_listings.business_id AND businesses.status = 'approved'));
CREATE POLICY "Users can view their own listings" ON business_listings FOR SELECT 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_listings.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can insert their own listings" ON business_listings FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_listings.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can update their own listings" ON business_listings FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_listings.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can delete their own listings" ON business_listings FOR DELETE 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_listings.business_id AND businesses.user_id = auth.uid()));

-- Business verification: Only business owners and admins can view
CREATE POLICY "Users can view their own verification" ON business_verification FOR SELECT 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_verification.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can insert their own verification" ON business_verification FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_verification.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can update their own verification" ON business_verification FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_verification.business_id AND businesses.user_id = auth.uid()));

-- Business subscriptions: Users can view and manage their own
CREATE POLICY "Users can view their own subscription" ON business_subscriptions FOR SELECT 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_subscriptions.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can insert their own subscription" ON business_subscriptions FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_subscriptions.business_id AND businesses.user_id = auth.uid()));
CREATE POLICY "Users can update their own subscription" ON business_subscriptions FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM businesses WHERE businesses.id = business_subscriptions.business_id AND businesses.user_id = auth.uid()));

-- Create function to automatically create business profile on business creation
CREATE OR REPLACE FUNCTION public.handle_new_business()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.business_profiles (business_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create business profile
CREATE TRIGGER on_business_created
    AFTER INSERT ON businesses
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_business();

-- Create storage bucket for business images
INSERT INTO storage.buckets (id, name, public) VALUES ('business-images', 'business-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('business-logos', 'business-logos', true) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for business images
CREATE POLICY "Business images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'business-images');
CREATE POLICY "Users can upload their own business images" ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'business-images' AND EXISTS (SELECT 1 FROM businesses WHERE businesses.user_id = auth.uid() AND businesses.id::text = (storage.foldername(name))[1]));
CREATE POLICY "Users can delete their own business images" ON storage.objects FOR DELETE 
    USING (bucket_id = 'business-images' AND EXISTS (SELECT 1 FROM businesses WHERE businesses.user_id = auth.uid() AND businesses.id::text = (storage.foldername(name))[1]));

CREATE POLICY "Business logos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'business-logos');
CREATE POLICY "Users can upload their own business logos" ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'business-logos' AND EXISTS (SELECT 1 FROM businesses WHERE businesses.user_id = auth.uid() AND businesses.id::text = (storage.foldername(name))[1]));
CREATE POLICY "Users can delete their own business logos" ON storage.objects FOR DELETE 
    USING (bucket_id = 'business-logos' AND EXISTS (SELECT 1 FROM businesses WHERE businesses.user_id = auth.uid() AND businesses.id::text = (storage.foldername(name))[1])); 