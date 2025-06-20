import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://akhxdbptoazefgxygnls.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required for database setup');
  console.log('Please add your service role key to .env file:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  try {
    // 1. Enable UUID extension
    console.log('📦 Enabling UUID extension...');
    const { error: uuidError } = await supabase.rpc('exec_sql', {
      sql: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    });
    if (uuidError) throw uuidError;
    console.log('✅ UUID extension enabled\n');

    // 2. Create profiles table
    console.log('👤 Creating profiles table...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (profilesError) throw profilesError;
    console.log('✅ Profiles table created');

    // 3. Create posts table
    console.log('📸 Creating posts table...');
    const { error: postsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (postsError) throw postsError;
    console.log('✅ Posts table created');

    // 4. Create favorites table
    console.log('⭐ Creating favorites table...');
    const { error: favoritesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (favoritesError) throw favoritesError;
    console.log('✅ Favorites table created');

    // 5. Create trip_plans table
    console.log('🗺️ Creating trip_plans table...');
    const { error: tripPlansError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (tripPlansError) throw tripPlansError;
    console.log('✅ Trip plans table created');

    // 6. Create diary_entries table
    console.log('📔 Creating diary_entries table...');
    const { error: diaryError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    if (diaryError) throw diaryError;
    console.log('✅ Diary entries table created');

    // 7. Create indexes
    console.log('🔍 Creating indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);',
      'CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_trip_plans_user_id ON trip_plans(user_id);',
      'CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries(user_id);'
    ];

    for (const indexSql of indexes) {
      const { error } = await supabase.rpc('exec_sql', { sql: indexSql });
      if (error) throw error;
    }
    console.log('✅ Indexes created');

    // 8. Create updated_at trigger function
    console.log('⚡ Creating trigger function...');
    const { error: triggerFunctionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
      `
    });
    if (triggerFunctionError) throw triggerFunctionError;
    console.log('✅ Trigger function created');

    // 9. Create triggers
    console.log('🔄 Creating triggers...');
    const triggers = [
      'CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();',
      'CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();',
      'CREATE TRIGGER update_trip_plans_updated_at BEFORE UPDATE ON trip_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();',
      'CREATE TRIGGER update_diary_entries_updated_at BEFORE UPDATE ON diary_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();'
    ];

    for (const triggerSql of triggers) {
      const { error } = await supabase.rpc('exec_sql', { sql: triggerSql });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Triggers created');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run setup:policies');
    console.log('2. Run: npm run setup:storage');
    console.log('3. Test your profile functionality');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase(); 