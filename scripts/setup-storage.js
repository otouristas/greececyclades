import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://akhxdbptoazefgxygnls.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required for storage setup');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupStorage() {
  console.log('📁 Setting up Supabase storage buckets...\n');

  try {
    // 1. Create storage buckets
    console.log('🪣 Creating storage buckets...');
    
    const buckets = [
      { id: 'avatars', name: 'avatars', public: true },
      { id: 'posts', name: 'posts', public: true },
      { id: 'diary', name: 'diary', public: true }
    ];

    for (const bucket of buckets) {
      const { error } = await supabase.storage.createBucket(bucket.id, {
        public: bucket.public,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (error && !error.message.includes('already exists')) {
        throw error;
      }
      console.log(`✅ ${bucket.name} bucket created`);
    }

    // 2. Create storage policies for avatars
    console.log('👤 Creating avatar storage policies...');
    const avatarPolicies = [
      'CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = \'avatars\');',
      'CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = \'avatars\' AND auth.uid()::text = (storage.foldername(name))[1]);',
      'CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = \'avatars\' AND auth.uid()::text = (storage.foldername(name))[1]);',
      'CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE USING (bucket_id = \'avatars\' AND auth.uid()::text = (storage.foldername(name))[1]);'
    ];

    for (const policy of avatarPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Avatar storage policies created');

    // 3. Create storage policies for posts
    console.log('📸 Creating post storage policies...');
    const postPolicies = [
      'CREATE POLICY "Post images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = \'posts\');',
      'CREATE POLICY "Users can upload their own post images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = \'posts\' AND auth.uid()::text = (storage.foldername(name))[1]);',
      'CREATE POLICY "Users can delete their own post images" ON storage.objects FOR DELETE USING (bucket_id = \'posts\' AND auth.uid()::text = (storage.foldername(name))[1]);'
    ];

    for (const policy of postPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Post storage policies created');

    // 4. Create storage policies for diary
    console.log('📔 Creating diary storage policies...');
    const diaryPolicies = [
      'CREATE POLICY "Diary images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = \'diary\');',
      'CREATE POLICY "Users can upload their own diary images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = \'diary\' AND auth.uid()::text = (storage.foldername(name))[1]);',
      'CREATE POLICY "Users can delete their own diary images" ON storage.objects FOR DELETE USING (bucket_id = \'diary\' AND auth.uid()::text = (storage.foldername(name))[1]);'
    ];

    for (const policy of diaryPolicies) {
      const { error } = await supabase.rpc('exec_sql', { sql: policy });
      if (error && !error.message.includes('already exists')) throw error;
    }
    console.log('✅ Diary storage policies created');

    // 5. Test bucket access
    console.log('🧪 Testing bucket access...');
    const { data: bucketList, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;
    
    const createdBuckets = bucketList.filter(b => ['avatars', 'posts', 'diary'].includes(b.name));
    console.log(`✅ Found ${createdBuckets.length}/3 buckets:`, createdBuckets.map(b => b.name).join(', '));

    console.log('\n🎉 Storage setup completed successfully!');
    console.log('\nYour Supabase database is now fully configured!');
    console.log('\n📋 Summary:');
    console.log('✅ Database tables created');
    console.log('✅ Security policies configured');
    console.log('✅ Storage buckets ready');
    console.log('✅ File upload functionality enabled');
    console.log('\n🚀 You can now test your profile functionality!');

  } catch (error) {
    console.error('❌ Storage setup failed:', error);
    process.exit(1);
  }
}

setupStorage(); 