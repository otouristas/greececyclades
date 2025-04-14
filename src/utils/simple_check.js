import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Create a Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL; // Using the main Supabase URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using the main Supabase key

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Key:', supabaseKey.substring(0, 10) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
  try {
    console.log('Listing tables in Supabase...');
    
    // List all tables in the public schema
    const { data, error } = await supabase
      .from('accommodation')
      .select('count(*)', { count: 'exact' });
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log('Result:', data);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

listTables();
