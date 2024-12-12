import { Hotel } from '../types/hotel';
import { hotels } from '../data/hotelsData';

export const hotelService = {
  // Get hotel by slug
  async getHotelBySlug(slug: string): Promise<Hotel | null> {
    console.log('Looking for hotel with slug:', slug);
    const hotel = hotels.find(hotel => hotel.slug === slug);
    console.log('Found hotel:', hotel?.name || 'null');
    return hotel || null;
  },

  // Get all hotels for a specific island
  async getHotelsByIsland(island: string): Promise<Hotel[]> {
    if (island === 'All Islands') {
      return hotels;
    }
    return hotels.filter(hotel => hotel.location.island === island);
  },

  // Get featured hotels
  async getFeaturedHotels(limit: number = 6): Promise<Hotel[]> {
    return hotels.slice(0, limit);
  },

  // Search hotels by various criteria
  async searchHotels(criteria: {
    island?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    amenities?: string[];
    checkIn?: string;
    checkOut?: string;
  }): Promise<Hotel[]> {
    let filteredHotels = hotels;

    if (criteria.island && criteria.island !== 'All Islands') {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.location.island === criteria.island
      );
    }

    if (criteria.minPrice !== undefined) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.priceRange.min >= criteria.minPrice!
      );
    }

    if (criteria.maxPrice !== undefined) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.priceRange.max <= criteria.maxPrice!
      );
    }

    if (criteria.category && criteria.category !== 'all') {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.category.toLowerCase() === criteria.category!.toLowerCase()
      );
    }

    if (criteria.amenities && criteria.amenities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel =>
        criteria.amenities!.every(amenity =>
          hotel.amenities.includes(amenity)
        )
      );
    }

    // Filter by availability if dates are provided
    if (criteria.checkIn && criteria.checkOut) {
      const checkInDate = new Date(criteria.checkIn);
      const checkOutDate = new Date(criteria.checkOut);
      
      // For now, we'll just return all hotels since we don't have real availability data
      // In a real application, you would check against hotel availability here
      console.log('Checking availability for dates:', { checkIn: checkInDate, checkOut: checkOutDate });
    }

    return filteredHotels;
  }
};
