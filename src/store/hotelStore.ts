import { create } from 'zustand';
import { Hotel } from '../types';
import { hotels as mockHotels } from '../data/hotels';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  fetchHotelById: (id: string) => Promise<Hotel | null>;
}

const useHotelStore = create<HotelState>((set) => ({
  hotels: mockHotels,
  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  fetchHotelById: async (id) => {
    const hotel = mockHotels.find(h => h.id === id) || null;
    set({ selectedHotel: hotel });
    return hotel;
  }
}));

export { useHotelStore };