import { create } from 'zustand';
import { Island } from '../types';

// Import island images
import santoriniImage from '../assets/images/islands/santorini-island.webp';
import mykonosImage from '../assets/images/islands/mykonos-island.jpg';
import parosImage from '../assets/images/islands/paros-island.jpg';
import sifnosImage from '../assets/images/islands/sifnos-island.jpg';
import naxosImage from '../assets/images/islands/naxos-island.jpg';

interface IslandState {
  islands: Island[];
  selectedIsland: Island | null;
  setSelectedIsland: (island: Island | null) => void;
}

const mockIslands: Island[] = [
  {
    id: 1,
    name: 'Naxos',
    description: 'Naxos is the largest of the Cyclades islands and, undoubtedly, one of the most beautiful Greek islands! Known for its impressive monuments, fertile valleys, and long sandy beaches.',
    shortDescription: 'The largest and most diverse Cycladic island',
    quote: 'Where ancient history meets natural beauty',
    metaTitle: 'Naxos Travel Guide - Beaches, History & Adventure',
    metaDescription: 'Explore Naxos, the largest of the Cyclades islands. Discover pristine beaches, ancient ruins, mountain villages, and authentic Greek culture.',
    image: parosImage, // Temporarily using Paros image
    highlights: ['Portara Ancient Gate', 'Plaka Beach', 'Mount Zeus', 'Traditional Villages'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 50,
    bestTime: 'May to October',
    idealFor: ['Families', 'History Buffs', 'Beach Lovers', 'Hikers']
  },
  {
    id: 2,
    name: 'Santorini',
    description: 'Santorini is one of the most iconic Greek islands, known for its dramatic caldera views, stunning sunsets, and unique volcanic beaches.',
    shortDescription: 'Iconic sunsets and romantic caldera views',
    quote: 'The island where every sunset tells a different story',
    metaTitle: 'Santorini Travel Guide - Stunning Sunsets & Romantic Escapes',
    metaDescription: 'Discover Santorini, the jewel of the Cyclades. Famous for its sunsets, white-washed houses, and volcanic beaches. Plan your dream getaway now!',
    image: santoriniImage,
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
    id: 3,
    name: 'Mykonos',
    description: 'Mykonos is a vibrant cosmopolitan island renowned for its lively atmosphere and beautiful beaches.',
    shortDescription: 'Vibrant nightlife and pristine beaches',
    quote: 'Where tradition meets luxury in the heart of the Aegean',
    metaTitle: 'Mykonos Travel Guide - Luxury, Beaches & Nightlife',
    metaDescription: 'Plan your perfect Mykonos getaway. Discover pristine beaches, vibrant nightlife, and iconic windmills in this cosmopolitan Greek paradise.',
    image: mykonosImage,
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
    id: 4,
    name: 'Paros',
    description: 'Paros offers a perfect blend of traditional Cycladic charm and modern amenities, with beautiful beaches and picturesque villages.',
    shortDescription: 'Traditional charm meets modern comfort',
    quote: 'Experience authentic Cycladic life in every corner',
    metaTitle: 'Paros Travel Guide - Authentic Greek Island Experience',
    metaDescription: 'Visit Paros for its beautiful beaches, traditional villages, and water sports. Perfect for families and couples seeking authentic Greek island life.',
    image: parosImage,
    highlights: ['Naoussa Village', 'Golden Beach', 'Parikia Old Town', 'Water Sports'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 32,
    bestTime: 'May to October',
    idealFor: ['Families', 'Beach Lovers', 'Water Sports']
  },
  {
    id: 5,
    name: 'Sifnos',
    description: 'Sifnos is a charming island known for its traditional pottery, excellent cuisine, and beautiful hiking trails.',
    shortDescription: 'Culinary paradise with scenic trails',
    quote: 'Where gastronomy meets tradition',
    metaTitle: 'Sifnos Travel Guide - Culinary Delights & Traditional Charm',
    metaDescription: 'Explore Sifnos, a hidden gem of the Cyclades known for its gastronomy, pottery, and hiking trails. Perfect for food lovers and outdoor enthusiasts.',
    image: sifnosImage,
    highlights: ['Traditional Pottery', 'Gastronomy', 'Hiking Trails', 'Kastro Village'],
    weather: {
      temp: '22°C',
      condition: 'sunny'
    },
    activities: 25,
    bestTime: 'May to September',
    idealFor: ['Food Lovers', 'Hikers', 'Culture Enthusiasts']
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));