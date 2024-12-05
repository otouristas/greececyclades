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
    description: 'The island of eternal romance and breathtaking sunsets',
    shortDescription: 'Santorini offers iconic sunsets, volcanic beaches, and romantic caldera views.',
    quote: 'The island of eternal romance and breathtaking sunsets',
    metaTitle: 'Santorini Travel Guide - Stunning Sunsets & Romantic Escapes',
    metaDescription: 'Discover Santorini, the jewel of the Cyclades. Famous for its sunsets, white-washed houses, and volcanic beaches. Plan your dream getaway now!',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches', 'Wine Tours'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 85
  },
  {
    id: 2,
    name: 'Mykonos',
    description: 'Where nightlife meets the Aegean breeze',
    shortDescription: 'Mykonos combines glamorous nightlife, sandy beaches, and boutique stays.',
    quote: 'Where nightlife meets the Aegean breeze',
    metaTitle: 'Mykonos Island - Luxury, Beaches & Vibrant Nightlife',
    metaDescription: 'Explore Mykonos, the cosmopolitan heart of the Cyclades. Known for its vibrant nightlife, golden beaches, and luxury experiences.',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Nightlife'],
    weather: { temp: '22°C', condition: 'Windy' },
    activities: 92
  },
  {
    id: 3,
    name: 'Paros',
    description: 'The heart of the Cyclades with endless charm',
    shortDescription: 'Paros offers golden beaches, picturesque villages, and serene vibes.',
    quote: 'The heart of the Cyclades with endless charm',
    metaTitle: 'Paros - Idyllic Beaches & Traditional Cycladic Villages',
    metaDescription: 'Discover Paros, the ultimate island for relaxation. Featuring golden beaches, authentic villages, and stunning landscapes.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80',
    highlights: ['Naoussa Village', 'Golden Beach', 'Windsurfing', 'Byzantine Trail'],
    weather: { temp: '25°C', condition: 'Sunny' },
    activities: 74
  },
  {
    id: 4,
    name: 'Naxos',
    description: 'Where tradition and nature unite',
    shortDescription: 'Naxos boasts diverse landscapes, rich history, and family-friendly activities.',
    quote: 'Where tradition and nature unite',
    metaTitle: 'Naxos Island - Family-Friendly & Adventure Paradise',
    metaDescription: 'Visit Naxos, the largest Cycladic island. Famous for its historical landmarks, lush landscapes, and family-friendly vibe.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80',
    highlights: ['Apollo Temple', 'Mountain Villages', 'Local Cuisine', 'Beaches'],
    weather: { temp: '23°C', condition: 'Clear' },
    activities: 67
  },
  {
    id: 5,
    name: 'Milos',
    description: 'A natural masterpiece of colors and caves',
    shortDescription: 'Milos captivates with its unique beaches, volcanic rocks, and vibrant scenery.',
    quote: 'A natural masterpiece of colors and caves',
    metaTitle: 'Milos - Stunning Beaches & Unique Adventures',
    metaDescription: 'Discover Milos, an island of colorful landscapes, unique sea caves, and breathtaking beaches. Perfect for adventurous souls.',
    image: 'https://images.unsplash.com/photo-1592492152545-9695d3f473f4?auto=format&fit=crop&q=80',
    highlights: ['Sarakiniko Beach', 'Kleftiko Caves', 'Volcanic Landscapes', 'Traditional Villages'],
    weather: { temp: '24°C', condition: 'Clear' },
    activities: 58
  },
  {
    id: 6,
    name: 'Syros',
    description: 'The cultural capital of the Cyclades',
    shortDescription: 'Syros offers a unique mix of history, culture, and picturesque landscapes.',
    quote: 'The cultural capital of the Cyclades',
    metaTitle: 'Syros - Authentic Charm & Neoclassical Beauty',
    metaDescription: 'Discover Syros, a Cycladic island known for its neoclassical architecture, vibrant culture, and stunning beaches.',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80',
    highlights: ['Ermoupolis', 'Neoclassical Buildings', 'Cultural Events', 'Local Gastronomy'],
    weather: { temp: '23°C', condition: 'Sunny' },
    activities: 45
  },
  {
    id: 7,
    name: 'Tinos',
    description: 'The spiritual heart of the Cyclades',
    shortDescription: 'Tinos features serene landscapes, traditional villages, and artistic heritage.',
    quote: 'The spiritual heart of the Cyclades',
    metaTitle: 'Tinos Island - Serenity, Tradition & Art',
    metaDescription: 'Discover Tinos, a tranquil island known for its religious landmarks, charming villages, and artistic legacy.',
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80',
    highlights: ['Panagia Church', 'Dovecotes', 'Marble Villages', 'Local Art'],
    weather: { temp: '22°C', condition: 'Clear' },
    activities: 38
  },
  {
    id: 8,
    name: 'Koufonisia',
    description: 'The hidden gems of endless turquoise waters',
    shortDescription: 'Koufonisia offers ultimate relaxation and pristine turquoise waters.',
    quote: 'The hidden gems of endless turquoise waters',
    metaTitle: 'Koufonisia - Secret Beaches & Island Bliss',
    metaDescription: 'Discover Koufonisia, two small islands known for their crystal-clear waters, laid-back vibe, and secluded beaches.',
    image: 'https://images.unsplash.com/photo-1597240890284-c6d109faf005?auto=format&fit=crop&q=80',
    highlights: ['Pori Beach', 'Sea Caves', 'Local Tavernas', 'Walking Trails'],
    weather: { temp: '24°C', condition: 'Sunny' },
    activities: 25
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island }),
  fetchIslandById: async (id) => {
    const island = mockIslands.find(i => i.id === id) || null;
    set({ selectedIsland: island });
    return island;
  }
}));