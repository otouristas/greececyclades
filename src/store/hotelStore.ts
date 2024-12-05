import { create } from 'zustand';
import { Hotel } from '../types';
import { hotelService } from '../services/hotelService';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  fetchHotelById: (id: string) => Promise<Hotel | null>;
  fetchHotelsByIsland: (islandId: string) => Promise<void>;
  fetchFeaturedHotels: () => Promise<void>;
  searchHotels: (criteria: {
    islandId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    amenities?: string[];
  }) => Promise<void>;
}

const useHotelStore = create<HotelState>((set) => ({
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
  
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  
  fetchHotelById: async (id) => {
    try {
      set({ loading: true, error: null });
      const hotel = await hotelService.getHotelById(id);
      set({ selectedHotel: hotel, loading: false });
      return hotel;
    } catch (error) {
      set({ error: 'Failed to fetch hotel', loading: false });
      return null;
    }
  },

  fetchHotelsByIsland: async (islandId) => {
    try {
      set({ loading: true, error: null });
      const hotels = await hotelService.getHotelsByIsland(islandId);
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch hotels', loading: false });
    }
  },

  fetchFeaturedHotels: async () => {
    try {
      set({ loading: true, error: null });
      const hotels = await hotelService.getFeaturedHotels();
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch featured hotels', loading: false });
    }
  },

  searchHotels: async (criteria) => {
    try {
      set({ loading: true, error: null });
      const hotels = await hotelService.searchHotels(criteria);
      set({ hotels, loading: false });
    } catch (error) {
      set({ error: 'Failed to search hotels', loading: false });
    }
  }
}));

export { useHotelStore };