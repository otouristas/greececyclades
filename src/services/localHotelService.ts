import { Hotel } from '../types/hotel';
import { hotels } from '../data/hotelsData';
import { generateSlug } from '../utils/seoMetadata';

export const hotelService = {
  // Get hotel by slug
  async getHotelBySlug(slug: string): Promise<Hotel | null> {
    console.log('Looking for hotel with slug:', slug);
    const hotel = hotels.find(hotel => {
      const generatedSlug = generateSlug(hotel.name, hotel.location.island);
      console.log(`Comparing hotel: ${hotel.name}, generated slug: ${generatedSlug}, target slug: ${slug}`);
      return generatedSlug === slug;
    });
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

    if (criteria.category) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.category === criteria.category
      );
    }

    if (criteria.amenities && criteria.amenities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel =>
        criteria.amenities!.every(amenity =>
          hotel.amenities.includes(amenity)
        )
      );
    }

    return filteredHotels;
  }
};
