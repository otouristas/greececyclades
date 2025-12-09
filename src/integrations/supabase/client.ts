/**
 * Re-export supabase client from main lib location
 * This file exists for backwards compatibility with imports from @/integrations/supabase/client
 */

export { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';
