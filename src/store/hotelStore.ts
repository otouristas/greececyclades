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
    checkIn?: string;
    checkOut?: string;
  }) => Promise<void>;
}

const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,

  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),

  fetchHotelBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const hotel = await hotelService.getHotelBySlug(slug);
      set({ selectedHotel: hotel, loading: false });
      return hotel;
    } catch (error) {
      set({ error: 'Failed to fetch hotel', loading: false });
      return null;
    }
  },

  fetchHotelsByIsland: async (island: string) => {
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.getHotelsByIsland(island);
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch hotels', loading: false });
    }
  },

  fetchFeaturedHotels: async () => {
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.getFeaturedHotels();
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch featured hotels', loading: false });
    }
  },

  searchHotels: async (criteria) => {
    set({ loading: true, error: null });
    try {
      const hotels = await hotelService.searchHotels(criteria);
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to search hotels', loading: false });
    }
  }
}));

export { useHotelStore };