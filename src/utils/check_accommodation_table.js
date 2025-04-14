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

async function checkAccommodationTable() {
  try {
    console.log('Checking Supabase connection and accommodation table...');
    console.log(`Using URL: ${supabaseUrl}`);
    
    // Check if the table exists by trying to get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('accommodation')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('Error accessing accommodation table:', tableError);
      
      // List all tables to see what's available
      console.log('\nListing all available tables:');
      const { data: tables, error: tablesError } = await supabase
        .rpc('list_tables');
      
      if (tablesError) {
        console.error('Error listing tables:', tablesError);
      } else {
        console.log('Available tables:', tables);
      }
      
      return;
    }
    
    console.log('Accommodation table exists and is accessible.');
    
    // Insert a test accommodation
    const testAccommodation = {
      name: 'Test Accommodation',
      description: 'This is a test accommodation entry',
      slug: 'test-accommodation',
      island_id: 'test-island',
      location: {
        island: 'Test Island',
        area: 'Test Area',
        coordinates: {
          latitude: 37.0,
          longitude: 25.0
        }
      },
      category: 'Hotel',
      star_rating: 4,
      price_range: {
        min: 100,
        max: 200,
        currency: 'EUR'
      },
      featured: false,
      images: {
        main: '/images/hotels/test-main.jpg',
        gallery: ['/images/hotels/test-1.jpg', '/images/hotels/test-2.jpg']
      },
      address: 'Test Address, Test Island',
      amenities: ['Pool', 'WiFi', 'Breakfast'],
      room_types: [
        {
          name: 'Standard Room',
          description: 'A standard test room',
          price: 100,
          capacity: 2,
          amenities: ['Queen Bed', 'Air Conditioning', 'Free WiFi']
        }
      ],
      rating: 4.5,
      reviews_count: 10,
      latitude: 37.0,
      longitude: 25.0
    };
    
    console.log('\nInserting test accommodation...');
    const { data: insertResult, error: insertError } = await supabase
      .from('accommodation')
      .upsert(testAccommodation, { onConflict: 'slug' })
      .select();
    
    if (insertError) {
      console.error('Error inserting test accommodation:', insertError);
      return;
    }
    
    console.log('Test accommodation inserted successfully:', insertResult);
    
    // Retrieve all accommodations
    console.log('\nRetrieving all accommodations:');
    const { data: accommodations, error: fetchError } = await supabase
      .from('accommodation')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching accommodations:', fetchError);
      return;
    }
    
    if (!accommodations || accommodations.length === 0) {
      console.log('No accommodations found in the database.');
      return;
    }
    
    console.log(`Found ${accommodations.length} accommodations:`);
    accommodations.forEach((accommodation, index) => {
      console.log(`${index + 1}. ${accommodation.name} (${accommodation.slug})`);
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkAccommodationTable();
