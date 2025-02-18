import { Hotel } from '../types/hotel';
import { hotels } from '../data/hotels';

export const hotelService = {
  getAllHotels: (): Hotel[] => {
    return hotels;
  },

  getHotelBySlug: (slug: string): Hotel | undefined => {
    return hotels.find(hotel => hotel.slug === slug);
  },

  getHotelsByIsland: (island: string): Hotel[] => {
    return hotels.filter(hotel => 
      hotel.location.island.toLowerCase() === island.toLowerCase()
    );
  },

  searchHotels: (query: string): Hotel[] => {
    const searchTerm = query.toLowerCase();
    return hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.description.toLowerCase().includes(searchTerm) ||
      hotel.location.island.toLowerCase().includes(searchTerm)
    );
  }
};
