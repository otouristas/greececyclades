import { createClient } from '@supabase/supabase-js';

// Cyclades project Supabase credentials
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://casbwosylkfdrnkarshm.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc2J3b3N5bGtmZHJua2Fyc2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTk3NjYsImV4cCI6MjA1ODQ5NTc2Nn0.GJhTPIj-dmjQ52hnqCNEA6S9LZfzIY6eL4DlW9xgHA4';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
