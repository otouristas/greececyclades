import { create } from 'zustand';
import { Hotel } from '../types/hotel';
import { hotelService } from '../services/hotelService';

interface HotelStore {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
  fetchHotels: () => void;
  fetchHotelBySlug: (slug: string) => void;
  searchHotels: (query: string) => void;
}

export const useHotelStore = create<HotelStore>((set) => ({
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,

  fetchHotels: () => {
    set({ loading: true });
    try {
      const hotels = hotelService.getAllHotels();
      set({ hotels, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch hotels', loading: false });
    }
  },

  fetchHotelBySlug: (slug: string) => {
    set({ loading: true });
    try {
      const hotel = hotelService.getHotelBySlug(slug);
      set({ selectedHotel: hotel || null, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch hotel details', loading: false });
    }
  },

  searchHotels: (query: string) => {
    set({ loading: true });
    try {
      const hotels = hotelService.searchHotels(query);
      set({ hotels, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to search hotels', loading: false });
    }
  },
}));
