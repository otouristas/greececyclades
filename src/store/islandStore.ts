import { create } from 'zustand';
import { AvailableMonth, STAY_DURATION, IslandVibe, Island, IslandActivity } from '../types/island';

interface IslandState {
  islands: Island[];
  selectedIsland: Island | null;
  setSelectedIsland: (island: Island | null) => void;
}

const mockIslands: Island[] = [
  {
    id: '1',
    name: 'Naxos',
    description: 'Naxos is the largest of the Cyclades islands and, undoubtedly, one of the most beautiful Greek islands! Known for its impressive monuments, fertile valleys, and long sandy beaches.',
    shortDescription: 'The largest and most diverse Cycladic island',
    quote: 'Where ancient history meets natural beauty',
    metaTitle: 'Naxos Travel Guide - Beaches, History & Adventure',
    metaDescription: 'Explore Naxos, the largest of the Cyclades islands. Discover pristine beaches, ancient ruins, mountain villages, and authentic Greek culture.',
    image: '/images/islands/naxos.jpg',
    heroImage: '/images/islands/naxos-hero.jpg',
    highlights: ['Portara Ancient Gate', 'Plaka Beach', 'Mount Zeus', 'Traditional Villages'],
    weather: {
      temp: 25,
      condition: 'Sunny',
      summer: 'Hot and sunny with temperatures around 30°C',
      winter: 'Mild with occasional rain, around 15°C',
      spring: 'Pleasant and mild, perfect for outdoor activities',
      autumn: 'Warm and sunny with occasional showers'
    },
    activities: [
      'swimming',
      'hiking',
      'archaeological-sites',
      'beach-hopping',
      'village-exploring',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Portara', 'Plaka Beach', 'Mount Zeus', 'Halki Village'],
    vibes: [IslandVibe.TRADITIONAL, IslandVibe.SCENIC, IslandVibe.AUTHENTIC],
    size: 'MAJOR',
    slug: 'naxos',
    bestTime: {
      months: ['May', 'June', 'September'],
      reason: 'Perfect weather and fewer crowds'
    },
    idealFor: ['Families', 'History Buffs', 'Beach Lovers', 'Hikers']
  },
  {
    id: '2',
    name: 'Santorini',
    description: 'Santorini is one of the most iconic Greek islands, famous for its dramatic caldera views, stunning sunsets, and white-washed buildings with blue domes.',
    shortDescription: 'The most romantic island in Greece',
    quote: 'Where romance meets volcanic beauty',
    metaTitle: 'Santorini Travel Guide - Romance, Views & Luxury',
    metaDescription: 'Experience the magic of Santorini. Discover iconic sunsets, volcanic beaches, luxury hotels, and world-class wineries.',
    image: '/images/islands/santorini.jpg',
    heroImage: '/images/islands/santorini-hero.jpg',
    highlights: ['Oia Sunset', 'Caldera Views', 'Red Beach', 'Ancient Akrotiri'],
    weather: {
      temp: 24,
      condition: 'Sunny',
      summer: 'Hot and dry with temperatures around 28°C',
      winter: 'Mild with some rain, around 14°C',
      spring: 'Pleasant and mild, perfect for sightseeing',
      autumn: 'Warm with occasional showers'
    },
    activities: [
      'sunset-watching',
      'wine-tasting',
      'archaeological-sites',
      'boat-tours',
      'photography',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Oia Village', 'Caldera', 'Red Beach', 'Ancient Akrotiri'],
    vibes: [IslandVibe.ROMANTIC, IslandVibe.LUXURY, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'santorini',
    bestTime: {
      months: ['April', 'May', 'September'],
      reason: 'Perfect weather and fewer crowds'
    },
    idealFor: ['Couples', 'Photographers', 'Wine Lovers', 'Luxury Travelers']
  },
  {
    id: '3',
    name: 'Mykonos',
    description: 'Mykonos is the most famous cosmopolitan island in Greece, known for its vibrant nightlife, beautiful beaches, and iconic windmills.',
    shortDescription: 'The party capital of the Cyclades',
    quote: 'Where luxury meets nightlife',
    metaTitle: 'Mykonos Travel Guide - Beaches, Parties & Luxury',
    metaDescription: 'Experience the glamour of Mykonos. Discover pristine beaches, vibrant nightlife, luxury shopping, and iconic windmills.',
    image: '/images/islands/mykonos.jpg',
    heroImage: '/images/islands/mykonos-hero.jpg',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Chora Town'],
    weather: {
      temp: 25,
      condition: 'Sunny',
      summer: 'Hot and dry with temperatures around 30°C',
      winter: 'Mild with some rain, around 15°C',
      spring: 'Pleasant and mild, perfect for sightseeing',
      autumn: 'Warm with occasional showers'
    },
    activities: [
      'swimming',
      'beach-hopping',
      'nightlife',
      'shopping',
      'water-sports',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Little Venice', 'Windmills', 'Paradise Beach', 'Delos Island'],
    vibes: [IslandVibe.PARTY, IslandVibe.LUXURY, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'mykonos',
    bestTime: {
      months: ['May', 'June', 'September'],
      reason: 'Perfect weather and fewer crowds'
    },
    idealFor: ['Party Lovers', 'Beach Enthusiasts', 'Luxury Travelers', 'Socialites']
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));