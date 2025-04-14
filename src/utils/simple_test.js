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
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Key is set' : 'Key is missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Try to get the server timestamp
    const { data, error } = await supabase.rpc('get_timestamp');
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      
      // Try to list tables instead
      console.log('Trying to list tables...');
      const { data: tablesData, error: tablesError } = await supabase
        .from('pg_tables')
        .select('*')
        .eq('schemaname', 'public');
        
      if (tablesError) {
        console.error('Error listing tables:', tablesError);
      } else {
        console.log('Tables:', tablesData);
      }
      
      return;
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('Server timestamp:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();
