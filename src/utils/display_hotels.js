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

async function displayHotels() {
  try {
    console.log('Fetching hotels from Supabase...');
    
    // Get all hotels
    const { data: hotels, error } = await supabase
      .from('hotels')
      .select('*');
    
    if (error) {
      console.error('Error fetching hotels:', error);
      return;
    }
    
    if (!hotels || hotels.length === 0) {
      console.log('No hotels found in the database.');
      return;
    }
    
    console.log(`Found ${hotels.length} hotels:`);
    console.log('----------------------------');
    
    // Display each hotel with key information
    hotels.forEach((hotel, index) => {
      console.log(`Hotel #${index + 1}: ${hotel.name}`);
      console.log(`Island: ${hotel.location.island}`);
      console.log(`Category: ${hotel.category} (${hotel.star_rating} stars)`);
      console.log(`Price Range: ${hotel.price_range.min} - ${hotel.price_range.max} ${hotel.price_range.currency}`);
      console.log(`Rating: ${hotel.rating} (${hotel.reviews_count} reviews)`);
      console.log(`Featured: ${hotel.featured ? 'Yes' : 'No'}`);
      console.log(`Room Types: ${hotel.room_types.length} available`);
      console.log('----------------------------');
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

displayHotels();
