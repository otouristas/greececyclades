import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://akhxdbptoazefgxygnls.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraHhkYnB0b2F6ZWZneHlnbmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDcyNDMsImV4cCI6MjA2MzQyMzI0M30.GxaZTjaBPKexl29mgl0JLMwexSrQWyG0LRnvf3vozYg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSetup() {
  console.log('🧪 Testing Supabase setup...\n');

  try {
    // Test connection
    console.log('🔗 Testing connection...');
    const { data: authData } = await supabase.auth.getSession();
    console.log('✅ Connection successful');
    console.log(`📊 Auth status: ${authData?.session ? 'Authenticated' : 'Anonymous'}\n`);

    // Test tables
    console.log('📋 Testing database tables...');
    const tables = [
      { name: 'profiles', icon: '👤' },
      { name: 'posts', icon: '📸' },
      { name: 'favorites', icon: '⭐' },
      { name: 'trip_plans', icon: '🗺️' },
      { name: 'diary_entries', icon: '📔' }
    ];

    let tablesWorking = 0;
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table.name)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${table.icon} ${table.name}: ${error.message}`);
        } else {
          console.log(`✅ ${table.icon} ${table.name}: Working`);
          tablesWorking++;
        }
      } catch (err) {
        console.log(`❌ ${table.icon} ${table.name}: ${err.message}`);
      }
    }

    console.log(`\n📊 Tables status: ${tablesWorking}/${tables.length} working\n`);

    // Test storage buckets
    console.log('🪣 Testing storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log(`❌ Storage error: ${bucketsError.message}`);
    } else {
      const expectedBuckets = ['avatars', 'posts', 'diary'];
      const foundBuckets = buckets.filter(b => expectedBuckets.includes(b.name));
      
      console.log(`✅ Storage buckets: ${foundBuckets.length}/${expectedBuckets.length} found`);
      foundBuckets.forEach(bucket => {
        console.log(`  📁 ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
      });
    }

    // Summary
    console.log('\n📋 Setup Summary:');
    console.log(`✅ Database connection: Working`);
    console.log(`${tablesWorking === tables.length ? '✅' : '❌'} Database tables: ${tablesWorking}/${tables.length}`);
    console.log(`${buckets && buckets.length >= 3 ? '✅' : '❌'} Storage buckets: ${buckets ? buckets.length : 0}/3`);

    if (tablesWorking === tables.length && buckets && buckets.length >= 3) {
      console.log('\n🎉 All systems ready! Your profile functionality should work perfectly.');
      console.log('\n🚀 Next steps:');
      console.log('1. Start your development server: npm run dev');
      console.log('2. Sign up or log in to test profile editing');
      console.log('3. Try uploading a profile picture');
      console.log('4. Create a post with an image');
    } else {
      console.log('\n⚠️  Some components are not ready. Please run the setup scripts:');
      if (tablesWorking < tables.length) {
        console.log('- npm run setup:database');
        console.log('- npm run setup:policies');
      }
      if (!buckets || buckets.length < 3) {
        console.log('- npm run setup:storage');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testSetup(); 