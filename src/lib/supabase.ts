import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://akhxdbptoazefgxygnls.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraHhkYnB0b2F6ZWZneHlnbmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDcyNDMsImV4cCI6MjA2MzQyMzI0M30.GxaZTjaBPKexl29mgl0JLMwexSrQWyG0LRnvf3vozYg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
