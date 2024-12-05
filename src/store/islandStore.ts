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
    activities: 45,
    bestTime: 'April to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers']
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
    activities: 38,
    bestTime: 'June to September',
    idealFor: ['Party Lovers', 'Beach Goers', 'Luxury Seekers']
  },
  {
    id: 3,
    name: 'Paros',
    description: 'Paros offers a perfect blend of traditional Cycladic charm and modern amenities, with beautiful beaches and picturesque villages.',
    shortDescription: 'Traditional charm meets modern comfort',
    quote: 'A perfect blend of authenticity and sophistication',
    metaTitle: 'Paros Travel Guide - Authentic Greek Island Experience',
    metaDescription: 'Experience the authentic charm of Paros. Discover beautiful beaches, traditional villages, and vibrant local culture in this Cycladic gem.',
    image: 'https://images.unsplash.com/photo-1586615844867-599e3388bba3?auto=format&fit=crop&q=80',
    highlights: ['Naoussa Village', 'Golden Beach', 'Parikia Old Town', 'Water Sports'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 32,
    bestTime: 'May to October',
    idealFor: ['Families', 'Water Sports Enthusiasts', 'Culture Lovers']
  },
  {
    id: 4,
    name: 'Sifnos',
    description: 'Sifnos is renowned for its exceptional cuisine, pottery tradition, and well-preserved walking trails connecting charming hilltop villages.',
    shortDescription: 'Culinary paradise with traditional charm',
    quote: 'Where gastronomy meets tradition',
    metaTitle: 'Sifnos Travel Guide - Culinary Heritage & Traditional Arts',
    metaDescription: 'Discover Sifnos, the gastronomic heart of the Cyclades. Experience world-class cuisine, pottery traditions, and authentic village life.',
    image: 'https://images.unsplash.com/photo-1586615844867-599e3388bba3?auto=format&fit=crop&q=80',
    highlights: ['Kastro Village', 'Local Cuisine', 'Pottery Workshops', 'Hiking Trails'],
    weather: {
      temp: '23°C',
      condition: 'sunny'
    },
    activities: 28,
    bestTime: 'April to October',
    idealFor: ['Food Lovers', 'Hikers', 'Culture Enthusiasts']
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));