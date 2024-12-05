import { create } from 'zustand';
import { Island } from '../types';

interface IslandState {
  islands: Island[];
  selectedIsland: Island | null;
  setSelectedIsland: (island: Island | null) => void;
  fetchIslandById: (id: number) => Promise<Island | null>;
}

const mockIslands: Island[] = [
  {
    id: 1,
    name: 'Santorini',
    description: 'Santorini is one of the most iconic Greek islands, known for its dramatic caldera views, stunning sunsets, and unique volcanic beaches. The island\'s whitewashed, cubiform houses cling to cliffs above an underwater caldera (crater) and overlook the Aegean Sea. The island\'s volcanic history has helped define its rugged landscape and distinctive architecture. Visitors can explore charming villages, sample local wines from volcanic-ash-enriched soil, and enjoy world-class restaurants with panoramic views.',
    shortDescription: 'Santorini offers iconic sunsets, volcanic beaches, and romantic caldera views.',
    quote: 'The island where every sunset tells a different story',
    metaTitle: 'Santorini Travel Guide - Stunning Sunsets & Romantic Escapes',
    metaDescription: 'Discover Santorini, the jewel of the Cyclades. Famous for its sunsets, white-washed houses, and volcanic beaches. Plan your dream getaway now!',
    image: '/images/islands/santorini.jpg',
    highlights: [
      'Caldera Views',
      'Sunset in Oia',
      'Black Sand Beaches',
      'Wine Tasting',
      'Ancient Akrotiri',
      'Volcanic Hot Springs'
    ],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 45
  },
  {
    id: 2,
    name: 'Mykonos',
    description: 'Mykonos is a vibrant cosmopolitan island renowned for its lively atmosphere, beautiful beaches, and iconic windmills. The island seamlessly blends traditional Cycladic charm with modern luxury, offering visitors a perfect mix of culture, nightlife, and relaxation. From the picturesque Little Venice to the pristine beaches of Paradise and Super Paradise, Mykonos caters to all types of travelers.',
    shortDescription: 'Experience the perfect blend of traditional charm and cosmopolitan lifestyle.',
    quote: 'Where tradition meets luxury in the heart of the Aegean',
    metaTitle: 'Mykonos Travel Guide - Luxury, Beaches & Nightlife',
    metaDescription: 'Plan your perfect Mykonos getaway. Discover pristine beaches, vibrant nightlife, and iconic windmills in this cosmopolitan Greek paradise.',
    image: '/images/islands/mykonos.jpg',
    highlights: [
      'Iconic Windmills',
      'Little Venice',
      'Paradise Beach',
      'Vibrant Nightlife',
      'Traditional Villages',
      'Luxury Shopping'
    ],
    weather: {
      temp: '27°C',
      condition: 'sunny'
    },
    activities: 38
  },
  {
    id: 3,
    name: 'Naxos',
    description: 'Naxos is the largest and most fertile of the Cyclades islands, offering visitors a diverse range of experiences. From its stunning beaches and ancient ruins to its mountainous villages and local culinary delights, Naxos provides an authentic Greek island experience. The island is famous for its excellent local produce, including cheese, potatoes, and citrus fruits, making it a paradise for food lovers.',
    shortDescription: 'The largest Cyclades island with rich history and beautiful beaches.',
    quote: 'Where ancient myths meet modern adventures',
    metaTitle: 'Naxos Travel Guide - Beaches, Culture & Cuisine',
    metaDescription: 'Explore Naxos, the largest Cyclades island. Discover pristine beaches, ancient ruins, mountain villages, and authentic Greek cuisine.',
    image: '/images/islands/naxos.jpg',
    highlights: [
      'Portara Gateway',
      'St. George Beach',
      'Mountain Villages',
      'Local Cuisine',
      'Ancient Temples',
      'Water Sports'
    ],
    weather: {
      temp: '26°C',
      condition: 'sunny'
    },
    activities: 32
  }
];

export const useIslandStore = create<IslandState>((set, get) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island }),
  fetchIslandById: async (id) => {
    const island = mockIslands.find(i => i.id === id);
    set({ selectedIsland: island || null });
    return island || null;
  }
}));