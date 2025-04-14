import supabase from '../lib/hotelsSupabase';
import { Hotel } from '../types/hotel';

export const supabaseHotelService = {
  // Get all hotels
  async getAllHotels(): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('accommodation')
      .select('*');
    
    if (error) {
      console.error('Error fetching hotels:', error);
      return [];
    }
    
    return data as Hotel[];
  },

  // Get hotels by island
  async getHotelsByIsland(islandId: string): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('accommodation')
      .select('*')
      .eq('island_id', islandId)
      .order('rating', { ascending: false });
    
    if (error) {
      console.error(`Error fetching hotels for island ${islandId}:`, error);
      return [];
    }
    
    return data as Hotel[];
  },

  // Get featured hotels
  async getFeaturedHotels(limitCount: number = 6): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('accommodation')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(limitCount);
    
    if (error) {
      console.error('Error fetching featured hotels:', error);
      return [];
    }
    
    return data as Hotel[];
  },

  // Get a single hotel by ID
  async getHotelById(id: string): Promise<Hotel | null> {
    const { data, error } = await supabase
      .from('accommodation')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching hotel with ID ${id}:`, error);
      return null;
    }
    
    return data as Hotel;
  },

  // Get a hotel by slug
  async getHotelBySlug(slug: string): Promise<Hotel | null> {
    const { data, error } = await supabase
      .from('accommodation')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error(`Error fetching hotel with slug ${slug}:`, error);
      return null;
    }
    
    return data as Hotel;
  },

  // Add a new hotel
  async addHotel(hotel: Omit<Hotel, 'id' | 'created_at'>): Promise<string | null> {
    const { data, error } = await supabase
      .from('accommodation')
      .insert([hotel])
      .select();
    
    if (error) {
      console.error('Error adding hotel:', error);
      return null;
    }
    
    return data[0].id;
  },

  // Update an existing hotel
  async updateHotel(id: string, hotel: Partial<Hotel>): Promise<boolean> {
    const { error } = await supabase
      .from('accommodation')
      .update(hotel)
      .eq('id', id);
    
    if (error) {
      console.error(`Error updating hotel with ID ${id}:`, error);
      return false;
    }
    
    return true;
  },

  // Delete a hotel
  async deleteHotel(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('accommodation')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting hotel with ID ${id}:`, error);
      return false;
    }
    
    return true;
  },

  // Search hotels by various criteria
  async searchHotels(criteria: {
    islandId?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    amenities?: string[];
  }): Promise<Hotel[]> {
    let query = supabase
      .from('accommodation')
      .select('*');
    
    if (criteria.islandId) {
      query = query.eq('island_id', criteria.islandId);
    }
    
    if (criteria.category) {
      query = query.eq('category', criteria.category);
    }
    
    if (criteria.minRating) {
      query = query.gte('rating', criteria.minRating);
    }
    
    // Note: For price and amenities filtering, we'll need to handle that client-side
    // since they might involve complex JSON operations
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error searching hotels:', error);
      return [];
    }
    
    let filteredHotels = data as Hotel[];
    
    // Client-side filtering for price range
    if (criteria.minPrice !== undefined || criteria.maxPrice !== undefined) {
      filteredHotels = filteredHotels.filter(hotel => {
        const minPrice = hotel.priceRange?.min || 0;
        return (
          (criteria.minPrice === undefined || minPrice >= criteria.minPrice) &&
          (criteria.maxPrice === undefined || minPrice <= criteria.maxPrice)
        );
      });
    }
    
    // Client-side filtering for amenities
    if (criteria.amenities && criteria.amenities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel => {
        return criteria.amenities!.some(amenity => 
          hotel.amenities && hotel.amenities.includes(amenity)
        );
      });
    }
    
    return filteredHotels;
  }
};

export default supabaseHotelService;
