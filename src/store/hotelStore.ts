import { create } from 'zustand';
import { Hotel } from '../data/hotels';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  fetchHotelById: (id: string) => Promise<Hotel | null>;
}

const mockHotels: Hotel[] = [
  {
    id: 'mystique-santorini',
    name: 'Mystique Santorini',
    type: 'hotel',
    island: 'Santorini',
    description: 'Carved into the rugged Caldera cliffs of Oia, Mystique overlooks the midnight blue waters of the Aegean Sea. Experience unparalleled luxury and breathtaking views.',
    price: {
      from: 450,
      currency: 'EUR'
    },
    rating: 4.9,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: '',
    priceRange: '',
    address: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    reviews: 0
  },
  {
    id: 'cavo-tagoo-mykonos',
    name: 'Cavo Tagoo',
    type: 'resort',
    island: 'Mykonos',
    description: 'Iconic luxury hotel featuring minimalist design and stunning infinity pools overlooking the Aegean. A perfect blend of traditional architecture and modern comfort.',
    price: {
      from: 680,
      currency: 'EUR'
    },
    rating: 4.8,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: '',
    priceRange: '',
    address: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    reviews: 0
  }
];

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