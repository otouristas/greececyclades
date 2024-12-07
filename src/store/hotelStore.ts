import { create } from 'zustand';
import { Hotel } from '../types/hotel';
import { hotelService } from '../services/localHotelService';
import { generateSlug } from '../utils/seoMetadata';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  fetchHotelBySlug: (slug: string) => Promise<Hotel | null>;
  fetchHotelsByIsland: (island: string) => Promise<void>;
  fetchFeaturedHotels: () => Promise<void>;
  searchHotels: (criteria: {
    island?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    amenities?: string[];
  }) => Promise<void>;
}

const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,

  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),

  fetchHotelBySlug: async (slug: string) => {
    console.log('Store: Fetching hotel with slug:', slug);
    set({ loading: true, error: null });
    try {
      const hotel = await hotelService.getHotelBySlug(slug);
      console.log('Store: Fetched hotel:', hotel?.name || 'null');
      set({ selectedHotel: hotel, loading: false });
      return hotel;
    } catch (error) {
      console.error('Store: Error fetching hotel:', error);
      set({ error: 'Failed to fetch hotel', loading: false });
      return null;
    }
  },

  fetchHotelsByIsland: async (island: string) => {
    console.log('Store: Fetching hotels by island:', island);
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.getHotelsByIsland(island);
      console.log('Store: Fetched hotels:', hotels.length);
      set({ hotels, loading: false });
    } catch (error) {
      console.error('Store: Error fetching hotels:', error);
      set({ error: 'Failed to fetch hotels', loading: false });
    }
  },

  fetchFeaturedHotels: async () => {
    console.log('Store: Fetching featured hotels');
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.getFeaturedHotels();
      console.log('Store: Fetched featured hotels:', hotels.length);
      set({ hotels, loading: false });
    } catch (error) {
      console.error('Store: Error fetching featured hotels:', error);
      set({ error: 'Failed to fetch featured hotels', loading: false });
    }
  },

  searchHotels: async (criteria) => {
    console.log('Store: Searching hotels with criteria:', criteria);
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.searchHotels(criteria);
      console.log('Store: Fetched hotels:', hotels.length);
      set({ hotels, loading: false });
    } catch (error) {
      console.error('Store: Error searching hotels:', error);
      set({ error: 'Failed to search hotels', loading: false });
    }
  }
}));

export { useHotelStore };