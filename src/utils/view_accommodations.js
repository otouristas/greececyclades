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

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Key:', supabaseKey.substring(0, 10) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function viewAccommodations() {
  try {
    console.log('Fetching accommodations from Supabase...');
    
    // Get all accommodations
    const { data: accommodations, error } = await supabase
      .from('accommodation')
      .select('*');
    
    if (error) {
      console.error('Error fetching accommodations:', error);
      return;
    }
    
    if (!accommodations || accommodations.length === 0) {
      console.log('No accommodations found in the database.');
      return;
    }
    
    console.log(`\nFound ${accommodations.length} accommodations.`);
    
    // Log the first record to see its structure
    console.log('\nFirst record raw data:');
    console.log(JSON.stringify(accommodations[0], null, 2));
    
    // Get the keys from the first record
    const keys = Object.keys(accommodations[0]);
    console.log('\nAvailable fields:', keys.join(', '));
    
    console.log('\n===================================');
    
    // Display each accommodation with key information based on actual structure
    accommodations.forEach((accommodation, index) => {
      console.log(`\n[${index + 1}] ${accommodation.name || accommodation.title || 'No name'}`);
      
      // Display all properties
      Object.entries(accommodation).forEach(([key, value]) => {
        // Skip displaying large objects/arrays in full
        if (typeof value === 'object' && value !== null) {
          console.log(`${key}: [Object/Array]`);
        } else {
          console.log(`${key}: ${value}`);
        }
      });
      
      console.log('-----------------------------------');
    });
    
    console.log('\nAccommodation data retrieved successfully!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

viewAccommodations();
