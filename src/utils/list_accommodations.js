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

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listAccommodations() {
  try {
    console.log('Connecting to Supabase...');
    console.log(`URL: ${supabaseUrl}`);
    
    // Get all tables in the public schema to verify what's available
    console.log('\nListing available tables:');
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (tablesError) {
      console.error('Error listing tables:', tablesError);
    } else {
      console.log('Available tables:', tables.map(t => t.tablename).join(', '));
    }
    
    // Fetch accommodation data
    console.log('\nFetching data from accommodation table:');
    const { data, error } = await supabase
      .from('accommodation')
      .select('*');
    
    if (error) {
      console.error('Error fetching accommodations:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No accommodations found in the database.');
      return;
    }
    
    console.log(`\nFound ${data.length} accommodations:`);
    
    // Display each accommodation with basic information
    data.forEach((item, index) => {
      console.log(`\n[${index + 1}] Accommodation ID: ${item.id || 'N/A'}`);
      
      // Try different property names that might exist
      const name = item.name || item.title || item.property_name || 'Unnamed';
      const island = item.island_id || item.island || 'Unknown Island';
      
      console.log(`Name: ${name}`);
      console.log(`Island: ${island}`);
      
      // Print all properties to see what's available
      console.log('All properties:');
      Object.keys(item).forEach(key => {
        const value = item[key];
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            console.log(`  ${key}: [Complex data]`);
          } else {
            console.log(`  ${key}: ${value}`);
          }
        }
      });
      
      console.log('-----------------------------------');
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

listAccommodations();
