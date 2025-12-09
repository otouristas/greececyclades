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
      summer: 'Hot and sunny with temperatures around 30°C',
      winter: 'Mild with occasional rain, around 15°C',
      spring: 'Pleasant and mild, perfect for outdoor activities',
      autumn: 'Warm and sunny with occasional showers',
      temp: 0,
      condition: ''
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
    vibes: [IslandVibe.TRADITIONAL, IslandVibe.SCENIC, IslandVibe.CULTURAL],
    size: 'MAJOR',
    slug: 'naxos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for beaches and sightseeing with fewer crowds in shoulder seasons'
    },
    idealFor: ['Families', 'History Buffs', 'Beach Lovers', 'Hikers'],
    ports: []
  },
  {
    id: '2',
    name: 'Santorini',
    description: 'Santorini is one of the most iconic Greek islands, known for its dramatic caldera views, stunning sunsets, and unique volcanic beaches.',
    shortDescription: 'Iconic sunsets and romantic caldera views',
    quote: 'The island where every sunset tells a different story',
    metaTitle: 'Santorini Travel Guide - Stunning Sunsets & Romantic Escapes',
    metaDescription: 'Experience the magic of Santorini. From caldera views and wine tasting to black sand beaches and ancient ruins.',
    image: '/images/islands/santorini.jpg',
    heroImage: '/images/islands/santorini-hero.jpg',
    highlights: ['Oia Sunset', 'Caldera Views', 'Wine Tasting', 'Volcanic Beaches'],
    weather: {
      summer: 'Hot and dry with temperatures around 28°C',
      winter: 'Mild Mediterranean climate around 15°C',
      spring: 'Pleasant temperatures perfect for sightseeing',
      autumn: 'Warm with occasional winds',
      temp: 0,
      condition: ''
    },
    activities: [
      'sunset-watching',
      'wine-tasting',
      'boat-tours',
      'photography',
      'beach-hopping',
      'spa-wellness'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Oia Sunset', 'Caldera', 'Red Beach', 'Akrotiri'],
    vibes: [IslandVibe.ROMANTIC, IslandVibe.LUXURIOUS, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'santorini',
    bestTime: {
      months: [AvailableMonth.APRIL, AvailableMonth.MAY, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'April to October - Ideal weather with fewer crowds in spring and fall'
    },
    idealFor: ['Couples', 'Photographers', 'Wine Lovers', 'Luxury Travelers'],
    ports: []
  },
  {
    id: '3',
    name: 'Mykonos',
    description: 'The cosmopolitan gem of the Cyclades, known for its vibrant nightlife, iconic windmills, and pristine beaches.',
    shortDescription: 'Vibrant nightlife and cosmopolitan atmosphere',
    quote: 'Where luxury meets tradition in perfect harmony',
    metaTitle: 'Mykonos Travel Guide - Beaches, Nightlife & Luxury',
    metaDescription: 'Discover the vibrant island of Mykonos. From world-class beaches and nightlife to traditional villages and windmills.',
    image: '/images/islands/mykonos.jpg',
    heroImage: '/images/islands/mykonos-hero.jpg',
    highlights: ['Little Venice', 'Windmills', 'Paradise Beach', 'Chora'],
    weather: {
      summer: 'Hot and sunny with strong meltemi winds',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'nightlife',
      'water-sports',
      'shopping',
      'beach-hopping',
      'spa-wellness'
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
    vibes: [IslandVibe.LIVELY, IslandVibe.LUXURIOUS, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'mykonos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      description: 'May to September - Perfect beach weather with vibrant nightlife'
    },
    idealFor: ['Party Lovers', 'Beach Enthusiasts', 'Luxury Travelers', 'Socialites']
  },
  {
    id: '4',
    name: 'Paros',
    description: 'A perfect blend of traditional Cycladic architecture, golden beaches, and vibrant nightlife. Known for its excellent water sports conditions.',
    shortDescription: 'Perfect blend of tradition and modern life',
    quote: 'The heart of the Cyclades',
    metaTitle: 'Paros Travel Guide - Beaches, Villages & Water Sports',
    metaDescription: 'Explore the charming island of Paros. From traditional villages and water sports to golden beaches and local cuisine.',
    image: '/images/islands/paros.jpg',
    heroImage: '/images/islands/paros-hero.jpg',
    highlights: ['Naoussa Village', 'Golden Beach', 'Parikia Old Town', 'Water Sports'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'water-sports',
      'beach-hopping',
      'village-exploring',
      'nightlife',
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
    mustSee: ['Naoussa Village', 'Golden Beach', 'Parikia Old Town', 'Panagia Ekatontapyliani'],
    vibes: [IslandVibe.LIVELY, IslandVibe.ADVENTUROUS, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'paros',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for beaches and water sports with fewer crowds in shoulder seasons'
    },
    idealFor: ['Water Sports Enthusiasts', 'Couples', 'Families', 'Culture Lovers']
  },
  {
    id: '5',
    name: 'Sifnos',
    description: 'A gastronomic paradise known for its pottery, traditional Cycladic architecture, and beautiful hiking trails.',
    shortDescription: 'Gastronomic delights and pottery traditions',
    quote: 'Where tradition meets culinary excellence',
    metaTitle: 'Sifnos Travel Guide - Food, Pottery & Hiking',
    metaDescription: 'Discover the authentic island of Sifnos. Experience traditional pottery, exquisite local cuisine, and scenic hiking trails.',
    image: '/images/islands/sifnos.jpg',
    heroImage: '/images/islands/sifnos-hero.jpg',
    highlights: ['Traditional Pottery', 'Kastro Village', 'Hiking Trails', 'Local Cuisine'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'hiking',
      'local-cuisine',
      'village-exploring',
      'beach-hopping',
      'archaeological-sites'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Kastro Village', 'Hiking Trails', 'Pottery Workshops', 'Chrissopigi Monastery'],
    vibes: [IslandVibe.PEACEFUL, IslandVibe.TRADITIONAL, IslandVibe.CULTURAL],
    size: 'MINOR',
    slug: 'sifnos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for hiking and sightseeing with fewer crowds in shoulder seasons'
    },
    idealFor: ['Food Lovers', 'Hikers', 'Culture Enthusiasts', 'Pottery Fans']
  },
  {
    id: '6',
    name: 'Milos',
    description: 'Known for its stunning lunar landscapes, colorful fishing villages, and unique volcanic beaches.',
    shortDescription: 'Volcanic landscapes and colorful beaches',
    quote: 'Where the colors of the earth meet the sea',
    metaTitle: 'Milos Travel Guide - Beaches, Landscapes & Culture',
    metaDescription: 'Experience the unique beauty of Milos. From lunar landscapes and colorful beaches to traditional fishing villages.',
    image: '/images/islands/milos.jpg',
    heroImage: '/images/islands/milos-hero.jpg',
    highlights: ['Sarakiniko Beach', 'Kleftiko Caves', 'Plaka Village', 'Volcanic Landscapes'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'snorkeling',
      'boat-tours',
      'hiking',
      'village-exploring',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Sarakiniko Beach', 'Kleftiko Caves', 'Plaka Village', 'Ancient Theater'],
    vibes: [IslandVibe.ADVENTUROUS, IslandVibe.SCENIC, IslandVibe.PEACEFUL],
    size: 'MINOR',
    slug: 'milos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for beaches and sightseeing with fewer crowds in shoulder seasons'
    },
    idealFor: ['Nature Lovers', 'Photographers', 'Beach Enthusiasts', 'Adventure Seekers']
  },
  {
    id: '7',
    name: 'Ios',
    description: 'Famous for its beautiful beaches, vibrant nightlife, and charming Cycladic architecture.',
    shortDescription: 'Beautiful beaches and vibrant nightlife',
    quote: 'Where youth meets timeless beauty',
    metaTitle: 'Ios Travel Guide - Beaches, Nightlife & Adventure',
    metaDescription: 'Discover the energetic island of Ios. From stunning beaches and nightlife to traditional villages.',
    image: '/images/islands/ios.jpg',
    heroImage: '/images/islands/ios-hero.jpg',
    highlights: ['Mylopotas Beach', 'Chora Village', 'Homer\'s Tomb', 'Nightlife'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'nightlife',
      'beach-hopping',
      'village-exploring',
      'water-sports',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Mylopotas Beach', 'Chora Village', 'Homer\'s Tomb', 'Skarkos'],
    vibes: [IslandVibe.LIVELY, IslandVibe.ROMANTIC, IslandVibe.SCENIC],
    size: 'MINOR',
    slug: 'ios',
    bestTime: {
      months: [AvailableMonth.JUNE, AvailableMonth.JULY, AvailableMonth.AUGUST, AvailableMonth.SEPTEMBER],
      description: 'June to September - Perfect beach weather and vibrant nightlife'
    },
    idealFor: ['Young Travelers', 'Beach Lovers', 'Party Enthusiasts', 'Adventure Seekers']
  },
  {
    id: '8',
    name: 'Tinos',
    description: 'A spiritual center known for its religious significance, traditional marble craftsmanship, and authentic village life.',
    shortDescription: 'Religious heritage and marble artistry',
    quote: 'Island of faith and artistry',
    metaTitle: 'Tinos Travel Guide - Pilgrimage, Art & Tradition',
    metaDescription: 'Explore the spiritual island of Tinos. From religious sites and marble villages to authentic Greek culture.',
    image: '/images/islands/tinos.jpg',
    heroImage: '/images/islands/tinos-hero.jpg',
    highlights: ['Church of Panagia', 'Marble Villages', 'Dovecotes', 'Traditional Crafts'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'pilgrimage',
      'village-exploring',
      'hiking',
      'beach-hopping',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Church of Panagia', 'Marble Villages', 'Dovecotes', 'Agapi'],
    vibes: [IslandVibe.TRADITIONAL, IslandVibe.CULTURAL, IslandVibe.PEACEFUL],
    size: 'MINOR',
    slug: 'tinos',
    bestTime: {
      months: [AvailableMonth.APRIL, AvailableMonth.MAY, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'April to October - Ideal weather for sightseeing and pilgrimage with fewer crowds in shoulder seasons'
    },
    idealFor: ['Pilgrims', 'Art Lovers', 'Culture Enthusiasts', 'Peace Seekers']
  },
  {
    id: '9',
    name: 'Antiparos',
    description: 'A charming small island known for its peaceful atmosphere, beautiful caves, and pristine beaches. Perfect for those seeking tranquility and natural beauty.',
    shortDescription: 'Peaceful caves and pristine beaches',
    quote: 'Where serenity meets natural wonder',
    metaTitle: 'Antiparos Travel Guide - Caves, Beaches & Tranquility',
    metaDescription: 'Discover the peaceful island of Antiparos. From stunning caves and pristine beaches to traditional village life.',
    image: '/images/islands/antiparos.jpg',
    heroImage: '/images/islands/antiparos-hero.jpg',
    highlights: ['Antiparos Cave', 'Pristine Beaches', 'Kastro Village', 'Sunset Views'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'beach-hopping',
      'cave-exploring',
      'village-exploring',
      'relaxation'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Antiparos Cave', 'Pristine Beaches', 'Kastro Village', 'Despotiko Island'],
    vibes: [IslandVibe.PEACEFUL, IslandVibe.ROMANTIC, IslandVibe.SCENIC],
    size: 'MINOR',
    slug: 'antiparos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      description: 'May to September - Perfect weather for beaches and relaxation'
    },
    idealFor: ['Peace Seekers', 'Beach Lovers', 'Cave Explorers', 'Couples']
  },
  {
    id: '10',
    name: 'Koufonisia',
    description: 'A hidden gem with exotic beaches, crystal-clear waters, and traditional Cycladic charm. Known for its stunning swimming spots and laid-back atmosphere.',
    shortDescription: 'Crystal waters and Cycladic charm',
    quote: 'Paradise found in the Lesser Cyclades',
    metaTitle: 'Koufonisia Travel Guide - Beaches & Island Life',
    metaDescription: 'Experience the hidden gem of Koufonisia. From exotic beaches and swimming spots to authentic island life.',
    image: '/images/islands/koufonisia.jpg',
    heroImage: '/images/islands/koufonisia-hero.jpg',
    highlights: ['Pori Beach', 'Swimming Caves', 'Chora Village', 'Local Life'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'swimming',
      'beach-hopping',
      'snorkeling',
      'village-exploring',
      'relaxation'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Pori Beach', 'Swimming Caves', 'Chora Village', 'Kato Koufonisi'],
    vibes: [IslandVibe.PEACEFUL, IslandVibe.SCENIC, IslandVibe.ADVENTUROUS],
    size: 'MINOR',
    slug: 'koufonisia',
    bestTime: {
      months: [AvailableMonth.JUNE, AvailableMonth.JULY, AvailableMonth.AUGUST, AvailableMonth.SEPTEMBER],
      description: 'June to September - Perfect weather for beaches and swimming'
    },
    idealFor: ['Beach Enthusiasts', 'Swimmers', 'Off-the-beaten-path Travelers', 'Nature Lovers']
  },
  {
    id: '11',
    name: 'Kimolos',
    description: 'An unspoiled island with volcanic landscapes, thermal springs, and authentic Greek island life. Perfect for those seeking an authentic Cycladic experience.',
    shortDescription: 'Volcanic beauty and thermal springs',
    quote: 'Where authenticity meets volcanic beauty',
    metaTitle: 'Kimolos Travel Guide - Nature & Authenticity',
    metaDescription: 'Explore unspoiled Kimolos. From volcanic landscapes and thermal springs to authentic Greek island life.',
    image: '/images/islands/kimolos.jpg',
    heroImage: '/images/islands/kimolos-hero.jpg',
    highlights: ['Thermal Springs', 'Volcanic Beaches', 'Traditional Villages', 'Local Cuisine'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'hiking',
      'thermal-springs',
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
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Thermal Springs', 'Volcanic Beaches', 'Traditional Villages', 'Kimolos Castle'],
    vibes: [IslandVibe.TRADITIONAL, IslandVibe.PEACEFUL, IslandVibe.SCENIC],
    size: 'MINOR',
    slug: 'kimolos',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for sightseeing and relaxation with fewer crowds in shoulder seasons'
    },
    idealFor: ['Nature Lovers', 'Hikers', 'Authenticity Seekers', 'Geology Enthusiasts']
  },
  {
    id: '12',
    name: 'Syros',
    description: 'The capital of Cyclades, featuring neoclassical architecture, vibrant culture, and beautiful beaches. A perfect blend of history and modern life.',
    shortDescription: 'Cultural capital with neoclassical charm',
    quote: 'Where history meets modern elegance',
    metaTitle: 'Syros Travel Guide - Culture, Architecture & Beaches',
    metaDescription: 'Visit the capital of Cyclades. From neoclassical architecture and culture to beautiful beaches.',
    image: '/images/islands/syros.jpg',
    heroImage: '/images/islands/syros-hero.jpg',
    highlights: ['Ermoupoli Town', 'Apollo Theater', 'Ano Syros', 'Beaches'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'cultural-exploration',
      'beach-hopping',
      'village-exploring',
      'shopping',
      'nightlife',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Ermoupoli Town', 'Apollo Theater', 'Ano Syros', 'Galissas Beach'],
    vibes: [IslandVibe.CULTURAL, IslandVibe.LUXURIOUS, IslandVibe.LIVELY],
    size: 'MAJOR',
    slug: 'syros',
    bestTime: {
      months: [AvailableMonth.APRIL, AvailableMonth.MAY, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'April to October - Ideal weather for sightseeing and cultural exploration with fewer crowds in shoulder seasons'
    },
    idealFor: ['Culture Enthusiasts', 'Architecture Lovers', 'Foodies', 'History Buffs']
  },
  {
    id: '13',
    name: 'Andros',
    description: "A hiker's paradise with lush valleys, waterfalls, and traditional villages. Known for its diverse landscapes and rich maritime history.",
    shortDescription: 'Hiking trails and waterfalls',
    quote: 'Where nature paints the perfect trail',
    metaTitle: 'Andros Travel Guide - Hiking, Nature & Culture',
    metaDescription: 'Discover the green island of Andros. From hiking trails and waterfalls to traditional villages.',
    image: '/images/islands/andros.jpg',
    heroImage: '/images/islands/andros-hero.jpg',
    highlights: ['Hiking Trails', 'Waterfalls', 'Maritime Museum', 'Traditional Villages'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'hiking',
      'village-exploring',
      'archaeological-sites',
      'beach-hopping',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER,
      AvailableMonth.NOVEMBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: ['Hiking Trails', 'Waterfalls', 'Maritime Museum', 'Chora Village'],
    vibes: [IslandVibe.ADVENTUROUS, IslandVibe.SCENIC, IslandVibe.CULTURAL],
    size: 'MAJOR',
    slug: 'andros',
    bestTime: {
      months: [AvailableMonth.APRIL, AvailableMonth.MAY, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'April to November - Ideal weather for hiking and sightseeing with fewer crowds in shoulder seasons'
    },
    idealFor: ['Hikers', 'Nature Photographers', 'Cultural Tourists', 'Adventure Seekers']
  },
  {
    id: '14',
    name: 'Kea',
    description: 'The closest Cycladic island to Athens, offering hiking trails, ancient ruins, and secluded beaches. Perfect for quick escapes and weekend trips.',
    shortDescription: 'Ancient ruins and hiking trails',
    quote: 'Gateway to the Cyclades',
    metaTitle: 'Kea Travel Guide - History, Hiking & Beaches',
    metaDescription: 'Experience Kea, the closest Cycladic island to Athens. From ancient ruins and hiking to secluded beaches.',
    image: '/images/islands/kea.jpg',
    heroImage: '/images/islands/kea-hero.jpg',
    highlights: ['Ancient Carthaea', 'Hiking Network', 'Lion of Kea', 'Secluded Beaches'],
    weather: {
      summer: 'Hot and sunny with temperatures around 28°C',
      winter: 'Mild with some rainfall',
      spring: 'Pleasant with moderate temperatures',
      autumn: 'Warm and perfect for swimming'
    },
    activities: [
      'hiking',
      'village-exploring',
      'archaeological-sites',
      'beach-hopping',
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
    averageStay: STAY_DURATION.MINOR,
    mustSee: ['Ancient Carthaea', 'Hiking Network', 'Lion of Kea', 'Ioulida Village'],
    vibes: [IslandVibe.PEACEFUL, IslandVibe.TRADITIONAL, IslandVibe.SCENIC],
    size: 'MINOR',
    slug: 'kea',
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER, AvailableMonth.OCTOBER],
      description: 'May to October - Perfect weather for hiking and sightseeing with fewer crowds in shoulder seasons'
    },
    idealFor: ['Weekend Travelers', 'Hikers', 'History Buffs', 'Nature Lovers']
  }
];

const useIslandStore = create<IslandState>((set) => ({
  islands: mockIslands,
  selectedIsland: null,
  setSelectedIsland: (island) => set({ selectedIsland: island })
}));

export { useIslandStore };
