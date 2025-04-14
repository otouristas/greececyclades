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

async function displayAccommodations() {
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
    
    console.log(`Found ${accommodations.length} accommodations:`);
    console.log('----------------------------');
    
    // Display each accommodation with key information
    accommodations.forEach((accommodation, index) => {
      console.log(`Accommodation #${index + 1}: ${accommodation.name || 'No name'}`);
      
      // Print all properties of the accommodation
      console.log('Properties:');
      Object.entries(accommodation).forEach(([key, value]) => {
        // Format the output based on the type of value
        if (typeof value === 'object' && value !== null) {
          console.log(`  ${key}: ${JSON.stringify(value)}`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      });
      
      console.log('----------------------------');
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

displayAccommodations();
