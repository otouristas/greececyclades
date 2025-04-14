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
const supabaseUrl = process.env.VITE_HOTELS_SUPABASE_URL;
const supabaseKey = process.env.VITE_HOTELS_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testHotelsConnection() {
  try {
    console.log('Testing connection to Hotels Supabase database...');
    console.log('Using URL:', supabaseUrl);
    
    // Try to get the current timestamp from the database
    const { data, error } = await supabase
      .from('hotels')
      .select('count(*)')
      .single();
    
    if (error) {
      console.error('Error connecting to Hotels Supabase:', error);
      
      // Check if the hotels table exists
      console.log('Checking if hotels table exists...');
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
        
      if (tablesError) {
        console.error('Error checking tables:', tablesError);
      } else {
        console.log('Available tables:', tables);
      }
      
      return;
    }
    
    console.log('Successfully connected to Hotels Supabase!');
    console.log('Hotels count:', data);
    
    // Try to list all hotels
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select('id, name, slug')
      .limit(5);
    
    if (hotelsError) {
      console.error('Error fetching hotels:', hotelsError);
      return;
    }
    
    console.log('First 5 hotels:', hotels);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testHotelsConnection();
