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

// Temporarily reuse existing images for new islands
const antiparosImage = parosImage;
const koufonisiaImage = naxosImage;
const kimolosImage = sifnosImage;
const syrosImage = mykonosImage;
const androsImage = naxosImage;
const tinosImage = santoriniImage;
const keaImage = parosImage;

const mockIslands: Island[] = [
  {
    id: 1,
    name: 'Naxos',
    description: 'Naxos is the largest of the Cyclades islands and, undoubtedly, one of the most beautiful Greek islands! Known for its impressive monuments, fertile valleys, and long sandy beaches.',
    shortDescription: 'The largest and most diverse Cycladic island',
    quote: 'Where ancient history meets natural beauty',
    metaTitle: 'Naxos Travel Guide - Beaches, History & Adventure',
    metaDescription: 'Explore Naxos, the largest of the Cyclades islands. Discover pristine beaches, ancient ruins, mountain villages, and authentic Greek culture.',
    image: naxosImage,
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
    idealFor: ['Couples', 'Photographers', 'Wine Lovers', 'Luxury Travelers']
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
  },
  {
    id: 6,
    name: 'Antiparos',
    description: 'A charming small island known for its peaceful atmosphere, beautiful caves, and pristine beaches. The perfect escape for those seeking tranquility.',
    shortDescription: 'Peaceful island with stunning caves',
    quote: 'Where serenity meets natural wonder',
    metaTitle: 'Antiparos Travel Guide - Caves, Beaches & Tranquility',
    metaDescription: 'Discover Antiparos, a peaceful Cycladic gem with stunning caves, pristine beaches, and authentic Greek charm. Plan your serene escape today!',
    image: antiparosImage,
    highlights: ['Antiparos Cave', 'Sifneiko Beach', 'Venetian Castle', 'Traditional Chora'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 30,
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Beach Lovers', 'Cave Explorers', 'Couples']
  },
  {
    id: 7,
    name: 'Koufonisia',
    description: 'A hidden gem with turquoise waters, white sandy beaches, and authentic island life. Experience the true essence of Cycladic simplicity.',
    shortDescription: 'Hidden paradise with turquoise waters',
    quote: 'Where simplicity meets paradise',
    metaTitle: 'Koufonisia Travel Guide - Hidden Beaches & Island Life',
    metaDescription: 'Explore Koufonisia, a hidden Cycladic paradise with crystal-clear waters and authentic Greek island life. Plan your perfect escape now!',
    image: koufonisiaImage,
    highlights: ['Pori Beach', 'Pano Koufonisi', 'Sea Caves', 'Traditional Fishing Villages'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 25,
    bestTime: 'June to September',
    idealFor: ['Beach Enthusiasts', 'Swimmers', 'Relaxation Seekers', 'Adventure Travelers']
  },
  {
    id: 8,
    name: 'Kimolos',
    description: 'An unspoiled volcanic island with unique geology, thermal springs, and traditional villages. A paradise for nature lovers and geology enthusiasts.',
    shortDescription: 'Volcanic beauty and thermal springs',
    quote: 'Where earth\'s wonders come alive',
    metaTitle: 'Kimolos Travel Guide - Volcanic Landscapes & Thermal Springs',
    metaDescription: 'Discover Kimolos, a volcanic Cycladic treasure with unique geology, thermal springs, and authentic village life. Plan your natural escape today!',
    image: kimolosImage,
    highlights: ['Prassa Beach', 'Skiadi Rock', 'Thermal Springs', 'Chorio Village'],
    weather: {
      temp: '23°C',
      condition: 'sunny'
    },
    activities: 28,
    bestTime: 'May to October',
    idealFor: ['Nature Lovers', 'Geology Enthusiasts', 'Authentic Experience Seekers']
  },
  {
    id: 9,
    name: 'Syros',
    description: 'The capital of Cyclades, featuring neoclassical architecture, vibrant culture, and year-round life. A unique blend of Orthodox and Catholic heritage.',
    shortDescription: 'Cultural capital of the Cyclades',
    quote: 'Where culture meets island life',
    metaTitle: 'Syros Travel Guide - Culture, Architecture & History',
    metaDescription: 'Experience Syros, the cultural heart of the Cyclades with its neoclassical architecture and vibrant arts scene. Plan your cultural journey now!',
    image: syrosImage,
    highlights: ['Ermoupolis', 'Apollo Theater', 'Ano Syros', 'Vaporia District'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 40,
    bestTime: 'April to October',
    idealFor: ['Culture Enthusiasts', 'Architecture Lovers', 'Urban Explorers', 'History Buffs']
  },
  {
    id: 10,
    name: 'Andros',
    description: 'A hiker\'s paradise with lush valleys, waterfalls, and rich maritime heritage. The perfect blend of nature and culture.',
    shortDescription: 'Hiking trails and maritime heritage',
    quote: 'Where nature meets maritime history',
    metaTitle: 'Andros Travel Guide - Hiking & Maritime Heritage',
    metaDescription: 'Explore Andros, a hiker\'s paradise with waterfalls, ancient trails, and rich maritime history. Plan your adventure today!',
    image: androsImage,
    highlights: ['Hiking Trails', 'Waterfalls', 'Maritime Museum', 'Chora Old Town'],
    weather: {
      temp: '23°C',
      condition: 'sunny'
    },
    activities: 35,
    bestTime: 'April to October',
    idealFor: ['Hikers', 'Nature Lovers', 'Art Enthusiasts', 'History Buffs']
  },
  {
    id: 11,
    name: 'Tinos',
    description: 'Known for its religious significance, traditional marble crafts, and picturesque villages. A unique blend of spirituality and artistry.',
    shortDescription: 'Religious heritage and marble crafts',
    quote: 'Where faith meets artistry',
    metaTitle: 'Tinos Travel Guide - Pilgrimage & Traditional Arts',
    metaDescription: 'Discover Tinos, an island of religious significance, marble craftsmanship, and authentic village life. Plan your spiritual journey now!',
    image: tinosImage,
    highlights: ['Panagia Church', 'Marble Villages', 'Dovecotes', 'Volax Village'],
    weather: {
      temp: '24°C',
      condition: 'sunny'
    },
    activities: 38,
    bestTime: 'May to September',
    idealFor: ['Pilgrims', 'Art Lovers', 'Culture Enthusiasts', 'Food Enthusiasts']
  },
  {
    id: 12,
    name: 'Kea',
    description: 'The closest Cycladic island to Athens, offering hiking trails, diving spots, and ancient ruins. Perfect for quick escapes and weekend adventures.',
    shortDescription: 'Athens\' closest island escape',
    quote: 'Where weekend dreams come true',
    metaTitle: 'Kea Travel Guide - Weekend Escapes & Ancient Ruins',
    metaDescription: 'Experience Kea, the closest Cycladic island to Athens with hiking trails, diving spots, and ancient ruins. Plan your perfect weekend getaway!',
    image: keaImage,
    highlights: ['Lion of Kea', 'Ancient Carthaea', 'Diving Sites', 'Hiking Network'],
    weather: {
      temp: '25°C',
      condition: 'sunny'
    },
    activities: 32,
    bestTime: 'April to October',
    idealFor: ['Weekend Travelers', 'Divers', 'History Enthusiasts', 'Hikers']
  }
];

export const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island }),
}));