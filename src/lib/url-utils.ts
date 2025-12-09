
/**
 * Creates a URL-friendly slug from a string
 * @param str The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a hotel URL from its name
 * @param name Hotel name
 * @returns URL-friendly string of the name
 */
export function generateHotelUrl(name: string): string {
  // Special case handling for specific hotels
  if (name === "Meropi Rooms and Apartments" || name.toLowerCase().includes("meropi")) {
    return "meropi-rooms-and-apartments";
  }
  
  // Special case for Morpheas Pension
  if (name === "Morpheas Pension & Apartments" || name.toLowerCase().includes("morpheas")) {
    return "morpheas-pension-apartments";
  }
  
  // Special case for Villa Olivia Clara
  if (name === "Villa Olivia Clara") {
    return "villa-olivia-clara";
  }
  
  // Special case for Filadaki Villas
  if (name === "Filadaki Villas" || name.toLowerCase().includes("filadaki")) {
    return "filadaki-villas";
  }
  
  // Special case for ALK HOTEL
  if (name === "ALK HOTEL™" || name.toLowerCase().includes("alk hotel")) {
    return "alk-hotel";
  }
  
  return slugify(name);
}

/**
 * Known hotel IDs for direct lookup - helps with consistent URL handling
 */
const KNOWN_HOTEL_IDS = {
  "meropi-rooms-and-apartments": "0c9632b6-db5c-4179-8122-0003896e465e",
  "morpheas-pension-apartments": null, // Will be populated once we have the real ID
  "villa-olivia-clara": null, // Will be populated once we have the real ID
  "filadaki-villas": null, // Will be populated once we have the real ID
  "alk-hotel": null // Will be populated once we have the real ID
};

/**
 * Finds a hotel by its slug in the database
 * This function will be used to look up hotels by their slugified name
 * @param slug The hotel slug from the URL
 * @returns The hotel data or null if not found
 */
export async function getHotelBySlug(slug: string) {
  try {
    console.log(`Looking for hotel with slug: ${slug}`);
    
    // Special case handling with predefined hotel IDs
    if ((slug === "meropi-rooms-and-apartments" && KNOWN_HOTEL_IDS[slug]) || 
        (slug === "morpheas-pension-apartments") ||
        (slug === "villa-olivia-clara") ||
        (slug === "filadaki-villas") ||
        (slug === "alk-hotel")) {
      
      if (KNOWN_HOTEL_IDS[slug]) {
        console.log(`Using direct ID lookup for ${slug} with ID: ${KNOWN_HOTEL_IDS[slug]}`);
        
        // Import the supabase client directly to avoid the undefined error
        const { supabase } = await import('@/integrations/supabase/client');
        
        const { data, error } = await supabase
          .from('hotels')
          .select(`
            *,
            hotel_amenities(amenity),
            hotel_photos(id, photo_url, is_main_photo, description),
            hotel_rooms(id, name, description, price, capacity, size_sqm, amenities, photo_url)
          `)
          .eq('id', KNOWN_HOTEL_IDS[slug]);
        
        if (error) {
          console.error(`Error fetching hotel by ID (${KNOWN_HOTEL_IDS[slug]}):`, error);
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log(`Successfully found hotel by ID: ${data[0].name}`);
          return data[0];
        } else {
          console.log(`No hotel found with ID: ${KNOWN_HOTEL_IDS[slug]}`);
        }
      }
    }
    
    // Fuzzy search for hotel name if direct ID lookup fails or isn't applicable
    console.log(`Performing fuzzy search for slug: ${slug}`);
    
    // Import the supabase client directly
    const { supabase } = await import('@/integrations/supabase/client');
    
    // For special hotels, add specific search terms
    let searchQuery = `name.ilike.%${slug.replace(/-/g, ' ')}%`;
    
    if (slug === "morpheas-pension-apartments") {
      searchQuery = "name.ilike.%morpheas%";
    } else if (slug === "villa-olivia-clara") {
      searchQuery = "name.ilike.%villa olivia%";
    } else if (slug === "filadaki-villas") {
      searchQuery = "name.ilike.%filadaki%";
    } else if (slug === "alk-hotel") {
      searchQuery = "name.ilike.%alk hotel%";
    }
    
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        hotel_amenities(amenity),
        hotel_photos(id, photo_url, is_main_photo, description),
        hotel_rooms(id, name, description, price, capacity, size_sqm, amenities, photo_url)
      `)
      .or(searchQuery);
    
    if (error) {
      console.error('Error in fuzzy search:', error);
      throw error;
    }
    
    // Find the closest matching hotel
    if (data && data.length > 0) {
      console.log(`Found ${data.length} potential hotel matches for slug: ${slug}`);
      
      // Special overrides for specific hotels
      const meropiHotel = data.find(hotel => 
        hotel.name.toLowerCase().includes("meropi") || 
        (hotel.id === KNOWN_HOTEL_IDS["meropi-rooms-and-apartments"])
      );
      
      const morpheasHotel = data.find(hotel => 
        hotel.name.toLowerCase().includes("morpheas")
      );
      
      const villaOliviaHotel = data.find(hotel => 
        hotel.name.toLowerCase().includes("villa olivia") ||
        hotel.name.toLowerCase().includes("olivia clara")
      );
      
      const filadakiHotel = data.find(hotel =>
        hotel.name.toLowerCase().includes("filadaki")
      );
      
      const alkHotel = data.find(hotel =>
        hotel.name.toLowerCase().includes("alk hotel")
      );
      
      if (meropiHotel && slug.includes("meropi")) {
        console.log(`Found Meropi hotel in search results: ${meropiHotel.id}`);
        return meropiHotel;
      }
      
      if (morpheasHotel && slug.includes("morpheas")) {
        console.log(`Found Morpheas hotel in search results: ${morpheasHotel.id}`);
        return morpheasHotel;
      }
      
      if (villaOliviaHotel && slug.includes("villa-olivia")) {
        console.log(`Found Villa Olivia Clara in search results: ${villaOliviaHotel.id}`);
        return villaOliviaHotel;
      }
      
      if (filadakiHotel && slug.includes("filadaki")) {
        console.log(`Found Filadaki Villas in search results: ${filadakiHotel.id}`);
        return filadakiHotel;
      }
      
      if (alkHotel && slug.includes("alk-hotel")) {
        console.log(`Found ALK HOTEL in search results: ${alkHotel.id}`);
        return alkHotel;
      }
      
      // Sort by name similarity to find the best match
      const sortedData = data.sort((a, b) => {
        const aSlug = slugify(a.name);
        const bSlug = slugify(b.name);
        
        // Exact match gets highest priority
        if (aSlug === slug) return -1;
        if (bSlug === slug) return 1;
        
        // Otherwise compare by similarity
        return aSlug.localeCompare(bSlug);
      });
      
      console.log(`Best match: ${sortedData[0].name} (${sortedData[0].id})`);
      return sortedData[0];
    }
    
    console.log(`No hotels found for slug: ${slug}`);
    return null;
  } catch (error) {
    console.error('Error fetching hotel by slug:', error);
    return null;
  }
}
