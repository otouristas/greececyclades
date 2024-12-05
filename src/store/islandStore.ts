import { create } from 'zustand';
import { Island } from '../types';

interface IslandState {
  islands: Island[];
  selectedIsland: Island | null;
  setSelectedIsland: (island: Island | null) => void;
}

const mockIslands: Island[] = [
  {
    id: 1,
    name: 'Santorini',
    description: 'Santorini is one of the most iconic Greek islands, known for its dramatic caldera views, stunning sunsets, and unique volcanic beaches.',
    shortDescription: 'Iconic sunsets and romantic caldera views',
    quote: 'The island where every sunset tells a different story',
    metaTitle: 'Santorini Travel Guide - Stunning Sunsets & Romantic Escapes',
    metaDescription: 'Discover Santorini, the jewel of the Cyclades. Famous for its sunsets, white-washed houses, and volcanic beaches. Plan your dream getaway now!',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80',
    highlights: ['Caldera Views', 'Sunset in Oia', 'Black Sand Beaches', 'Wine Tasting'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 45
  },
  {
    id: 2,
    name: 'Mykonos',
    description: 'Mykonos is a vibrant cosmopolitan island renowned for its lively atmosphere and beautiful beaches.',
    shortDescription: 'Vibrant nightlife and pristine beaches',
    quote: 'Where tradition meets luxury in the heart of the Aegean',
    metaTitle: 'Mykonos Travel Guide - Luxury, Beaches & Nightlife',
    metaDescription: 'Plan your perfect Mykonos getaway. Discover pristine beaches, vibrant nightlife, and iconic windmills in this cosmopolitan Greek paradise.',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Nightlife'],
    weather: {
      temp: '23°C',
      condition: 'sunny'
    },
    activities: 38
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));