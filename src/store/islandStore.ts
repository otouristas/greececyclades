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
    name: 'Naxos',
    description: 'Naxos is the largest of the Cyclades islands and, undoubtedly, one of the most beautiful Greek islands! Known for its impressive monuments, fertile valleys, and long sandy beaches.',
    shortDescription: 'The largest and most diverse Cycladic island',
    quote: 'Where ancient history meets natural beauty',
    metaTitle: 'Naxos Travel Guide - Beaches, History & Adventure',
    metaDescription: 'Explore Naxos, the largest of the Cyclades islands. Discover pristine beaches, ancient ruins, mountain villages, and authentic Greek culture.',
    image: '/images/islands/naxos.jpg',
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
    metaDescription: 'Experience the magic of Santorini. From caldera views and wine tasting to black sand beaches and ancient ruins.',
    image: '/images/islands/santorini.jpg',
    highlights: ['Oia Sunset', 'Caldera Views', 'Wine Tasting', 'Volcanic Beaches'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 75,
    bestTime: 'April to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers', 'Luxury Travelers']
  },
  {
    id: 3,
    name: 'Mykonos',
    description: 'The cosmopolitan gem of the Cyclades, known for its vibrant nightlife, iconic windmills, and pristine beaches.',
    shortDescription: 'Vibrant nightlife and cosmopolitan atmosphere',
    quote: 'Where luxury meets tradition in perfect harmony',
    metaTitle: 'Mykonos Travel Guide - Beaches, Nightlife & Luxury',
    metaDescription: 'Discover the vibrant island of Mykonos. From world-class beaches and nightlife to traditional villages and windmills.',
    image: '/images/islands/mykonos.jpg',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Chora Town'],
    weather: {
      temp: '26°C',
      condition: 'sunny'
    },
    activities: 80,
    bestTime: 'May to September',
    idealFor: ['Party Lovers', 'Beach Enthusiasts', 'Luxury Travelers', 'Foodies']
  },
  {
    id: 4,
    name: 'Paros',
    description: 'A perfect blend of traditional Cycladic architecture, golden beaches, and vibrant nightlife. Known for its excellent water sports conditions.',
    shortDescription: 'Perfect blend of tradition and modern life',
    quote: 'The heart of the Cyclades',
    metaTitle: 'Paros Travel Guide - Beaches, Villages & Water Sports',
    metaDescription: 'Explore the charming island of Paros. From traditional villages and water sports to golden beaches and local cuisine.',
    image: '/images/islands/paros.jpg',
    highlights: ['Naoussa Village', 'Golden Beach', 'Parikia Old Town', 'Water Sports'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 60,
    bestTime: 'May to October',
    idealFor: ['Water Sports Enthusiasts', 'Couples', 'Families', 'Culture Lovers']
  },
  {
    id: 5,
    name: 'Sifnos',
    description: 'A gastronomic paradise known for its pottery, traditional Cycladic architecture, and beautiful hiking trails.',
    shortDescription: 'Gastronomic delights and pottery traditions',
    quote: 'Where tradition meets culinary excellence',
    metaTitle: 'Sifnos Travel Guide - Food, Pottery & Hiking',
    metaDescription: 'Discover the authentic island of Sifnos. Experience traditional pottery, exquisite local cuisine, and scenic hiking trails.',
    image: '/images/islands/sifnos.jpg',
    highlights: ['Traditional Pottery', 'Kastro Village', 'Hiking Trails', 'Local Cuisine'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 45,
    bestTime: 'May to October',
    idealFor: ['Food Lovers', 'Hikers', 'Culture Enthusiasts', 'Pottery Fans']
  },
  {
    id: 6,
    name: 'Milos',
    description: 'Known for its stunning lunar landscapes, colorful fishing villages, and unique volcanic beaches.',
    shortDescription: 'Volcanic landscapes and colorful beaches',
    quote: 'Where the colors of the earth meet the sea',
    metaTitle: 'Milos Travel Guide - Beaches, Landscapes & Culture',
    metaDescription: 'Experience the unique beauty of Milos. From lunar landscapes and colorful beaches to traditional fishing villages.',
    image: '/images/islands/milos.jpg',
    highlights: ['Sarakiniko Beach', 'Kleftiko Caves', 'Plaka Village', 'Volcanic Landscapes'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 55,
    bestTime: 'May to October',
    idealFor: ['Nature Lovers', 'Photographers', 'Beach Enthusiasts', 'Adventure Seekers']
  },
  {
    id: 7,
    name: 'Ios',
    description: 'Famous for its beautiful beaches, vibrant nightlife, and charming Cycladic architecture.',
    shortDescription: 'Beautiful beaches and vibrant nightlife',
    quote: 'Where youth meets timeless beauty',
    metaTitle: 'Ios Travel Guide - Beaches, Nightlife & Adventure',
    metaDescription: 'Discover the energetic island of Ios. From stunning beaches and nightlife to traditional villages.',
    image: '/images/islands/ios.jpg',
    highlights: ['Mylopotas Beach', 'Chora Village', 'Homer\'s Tomb', 'Nightlife'],
    weather: {
      temp: '26°C',
      condition: 'sunny'
    },
    activities: 40,
    bestTime: 'June to September',
    idealFor: ['Young Travelers', 'Beach Lovers', 'Party Enthusiasts', 'Adventure Seekers']
  },
  {
    id: 8,
    name: 'Tinos',
    description: 'A spiritual center known for its religious significance, traditional marble craftsmanship, and authentic village life.',
    shortDescription: 'Religious heritage and marble artistry',
    quote: 'Island of faith and artistry',
    metaTitle: 'Tinos Travel Guide - Pilgrimage, Art & Tradition',
    metaDescription: 'Explore the spiritual island of Tinos. From religious sites and marble villages to authentic Greek culture.',
    image: '/images/islands/tinos.jpg',
    highlights: ['Church of Panagia', 'Marble Villages', 'Dovecotes', 'Traditional Crafts'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 35,
    bestTime: 'April to October',
    idealFor: ['Pilgrims', 'Art Lovers', 'Culture Enthusiasts', 'Peace Seekers']
  },
  {
    id: 9,
    name: 'Antiparos',
    description: 'A charming small island known for its peaceful atmosphere, beautiful caves, and pristine beaches. Perfect for those seeking tranquility and natural beauty.',
    shortDescription: 'Peaceful caves and pristine beaches',
    quote: 'Where serenity meets natural wonder',
    metaTitle: 'Antiparos Travel Guide - Caves, Beaches & Tranquility',
    metaDescription: 'Discover the peaceful island of Antiparos. From stunning caves and pristine beaches to traditional village life.',
    image: '/images/islands/antiparos.jpg',
    highlights: ['Antiparos Cave', 'Pristine Beaches', 'Kastro Village', 'Sunset Views'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 30,
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Beach Lovers', 'Cave Explorers', 'Couples']
  },
  {
    id: 10,
    name: 'Koufonisia',
    description: 'A hidden gem with exotic beaches, crystal-clear waters, and traditional Cycladic charm. Known for its stunning swimming spots and laid-back atmosphere.',
    shortDescription: 'Crystal waters and Cycladic charm',
    quote: 'Paradise found in the Lesser Cyclades',
    metaTitle: 'Koufonisia Travel Guide - Beaches & Island Life',
    metaDescription: 'Experience the hidden gem of Koufonisia. From exotic beaches and swimming spots to authentic island life.',
    image: '/images/islands/koufonisia.jpg',
    highlights: ['Pori Beach', 'Swimming Caves', 'Chora Village', 'Local Life'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 25,
    bestTime: 'June to September',
    idealFor: ['Beach Enthusiasts', 'Swimmers', 'Off-the-beaten-path Travelers', 'Nature Lovers']
  },
  {
    id: 11,
    name: 'Kimolos',
    description: 'An unspoiled island with volcanic landscapes, thermal springs, and authentic Greek island life. Perfect for those seeking an authentic Cycladic experience.',
    shortDescription: 'Volcanic beauty and thermal springs',
    quote: 'Where authenticity meets volcanic beauty',
    metaTitle: 'Kimolos Travel Guide - Nature & Authenticity',
    metaDescription: 'Explore unspoiled Kimolos. From volcanic landscapes and thermal springs to authentic Greek island life.',
    image: '/images/islands/kimolos.jpg',
    highlights: ['Thermal Springs', 'Volcanic Beaches', 'Traditional Villages', 'Local Cuisine'],
    weather: {
      temp: '23°C',
      condition: 'sunny'
    },
    activities: 20,
    bestTime: 'May to October',
    idealFor: ['Nature Lovers', 'Hikers', 'Authenticity Seekers', 'Geology Enthusiasts']
  },
  {
    id: 12,
    name: 'Syros',
    description: 'The capital of Cyclades, featuring neoclassical architecture, vibrant culture, and beautiful beaches. A perfect blend of history and modern life.',
    shortDescription: 'Cultural capital with neoclassical charm',
    quote: 'Where history meets modern elegance',
    metaTitle: 'Syros Travel Guide - Culture, Architecture & Beaches',
    metaDescription: 'Visit the capital of Cyclades. From neoclassical architecture and culture to beautiful beaches.',
    image: '/images/islands/syros.jpg',
    highlights: ['Ermoupoli Town', 'Apollo Theater', 'Ano Syros', 'Beaches'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 45,
    bestTime: 'April to October',
    idealFor: ['Culture Enthusiasts', 'Architecture Lovers', 'Foodies', 'History Buffs']
  },
  {
    id: 13,
    name: 'Andros',
    description: "A hiker's paradise with lush valleys, waterfalls, and traditional villages. Known for its diverse landscapes and rich maritime history.",
    shortDescription: 'Hiking trails and waterfalls',
    quote: 'Where nature paints the perfect trail',
    metaTitle: 'Andros Travel Guide - Hiking, Nature & Culture',
    metaDescription: 'Discover the green island of Andros. From hiking trails and waterfalls to traditional villages.',
    image: '/images/islands/andros.jpg',
    highlights: ['Hiking Trails', 'Waterfalls', 'Maritime Museum', 'Traditional Villages'],
    weather: {
      temp: '22°C',
      condition: 'partly cloudy'
    },
    activities: 40,
    bestTime: 'April to November',
    idealFor: ['Hikers', 'Nature Photographers', 'Cultural Tourists', 'Adventure Seekers']
  },
  {
    id: 14,
    name: 'Kea',
    description: 'The closest Cycladic island to Athens, offering hiking trails, ancient ruins, and secluded beaches. Perfect for quick escapes and weekend trips.',
    shortDescription: 'Ancient ruins and hiking trails',
    quote: 'Gateway to the Cyclades',
    metaTitle: 'Kea Travel Guide - History, Hiking & Beaches',
    metaDescription: 'Experience Kea, the closest Cycladic island to Athens. From ancient ruins and hiking to secluded beaches.',
    image: '/images/islands/kea.jpg',
    highlights: ['Ancient Carthaea', 'Hiking Network', 'Lion of Kea', 'Secluded Beaches'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 35,
    bestTime: 'May to October',
    idealFor: ['Weekend Travelers', 'Hikers', 'History Buffs', 'Nature Lovers']
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));