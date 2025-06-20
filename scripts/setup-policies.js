import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://akhxdbptoazefgxygnls.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required for policy setup');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupPolicies() {
  console.log('🔒 Setting up Row Level Security policies...\n');

  try {
    // 1. Enable RLS on all tables
    console.log('🛡️ Enabling Row Level Security...');
    const tables = ['profiles', 'posts', 'favorites', 'trip_plans', 'diary_entries'];
    
    for (const table of tables) {
      const { error } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`
      });
      if (error) throw error;
    }
    console.log('✅ RLS enabled on all tables');

    // 2. Create profiles policies
    console.log('👤 Creating profiles policies...');
    const profilePolicies = [
      'CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);',
      'CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);',
      'CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);'
    ];

    for (const policy of profilePolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Profiles policies created');

    // 3. Create posts policies
    console.log('📸 Creating posts policies...');
    const postPolicies = [
      'CREATE POLICY "Users can view all posts" ON posts FOR SELECT USING (true);',
      'CREATE POLICY "Users can insert their own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);',
      'CREATE POLICY "Users can update their own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can delete their own posts" ON posts FOR DELETE USING (auth.uid() = user_id);'
    ];

    for (const policy of postPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Posts policies created');

    // 4. Create favorites policies
    console.log('⭐ Creating favorites policies...');
    const favoritePolicies = [
      'CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);',
      'CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);'
    ];

    for (const policy of favoritePolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Favorites policies created');

    // 5. Create trip plans policies
    console.log('🗺️ Creating trip plans policies...');
    const tripPlanPolicies = [
      'CREATE POLICY "Users can view their own trip plans" ON trip_plans FOR SELECT USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can insert their own trip plans" ON trip_plans FOR INSERT WITH CHECK (auth.uid() = user_id);',
      'CREATE POLICY "Users can update their own trip plans" ON trip_plans FOR UPDATE USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can delete their own trip plans" ON trip_plans FOR DELETE USING (auth.uid() = user_id);'
    ];

    for (const policy of tripPlanPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Trip plans policies created');

    // 6. Create diary entries policies
    console.log('📔 Creating diary entries policies...');
    const diaryPolicies = [
      'CREATE POLICY "Users can view their own diary entries" ON diary_entries FOR SELECT USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can insert their own diary entries" ON diary_entries FOR INSERT WITH CHECK (auth.uid() = user_id);',
      'CREATE POLICY "Users can update their own diary entries" ON diary_entries FOR UPDATE USING (auth.uid() = user_id);',
      'CREATE POLICY "Users can delete their own diary entries" ON diary_entries FOR DELETE USING (auth.uid() = user_id);'
    ];

    for (const policy of diaryPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Diary entries policies created');

    // 7. Create auto-profile creation function and trigger
    console.log('🔄 Creating auto-profile creation...');
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
            INSERT INTO public.profiles (user_id, full_name)
            VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });
    if (functionError) throw functionError;

    const { error: triggerError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `
    });
    if (triggerError && !triggerError.message.includes('already exists')) throw triggerError;
    
    console.log('✅ Auto-profile creation setup');

    console.log('\n🎉 Security policies setup completed successfully!');
    console.log('\nNext step: Run npm run setup:storage');

  } catch (error) {
    console.error('❌ Policies setup failed:', error);
    process.exit(1);
  }
}

setupPolicies(); 