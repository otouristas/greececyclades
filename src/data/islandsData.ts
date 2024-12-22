import { IslandActivity, AvailableMonth, IslandVibe, Island, IslandGuide } from '../types/island';

export const mainPorts = [
  'Piraeus (Athens)',
  'Rafina',
  'Lavrio',
  'Heraklion'
];

export const cyclades: Partial<Island>[] = [
  { id: '1', name: 'Santorini', ports: ['Thira Port', 'Athinios Port'] },
  { id: '2', name: 'Mykonos', ports: ['New Port', 'Old Port'] },
  { id: '3', name: 'Naxos', ports: ['Naxos Port'] },
  { id: '4', name: 'Milos', ports: ['Adamas Port'] },
  { id: '5', name: 'Paros', ports: ['Parikia Port', 'Naoussa Port'] },
  { id: '6', name: 'Ios', ports: ['Ios Port'] },
  { id: '7', name: 'Sifnos', ports: ['Kamares Port'] },
  { id: '8', name: 'Serifos', ports: ['Livadi Port'] },
  { id: '9', name: 'Syros', ports: ['Ermoupolis Port'] },
  { id: '10', name: 'Tinos', ports: ['Tinos Port'] },
  { id: '11', name: 'Amorgos', ports: ['Katapola Port', 'Aegiali Port'] },
  { id: '12', name: 'Andros', ports: ['Gavrio Port'] },
  { id: '13', name: 'Kea', ports: ['Korissia Port'] },
  { id: '14', name: 'Kimolos', ports: ['Psathi Port'] },
  { id: '15', name: 'Kythnos', ports: ['Merichas Port'] },
  { id: '16', name: 'Sikinos', ports: ['Alopronia Port'] },
  { id: '17', name: 'Folegandros', ports: ['Karavostasis Port'] },
  { id: '18', name: 'Anafi', ports: ['Anafi Port'] },
  { id: '19', name: 'Thirasia', ports: ['Riva Port'] },
  { id: '20', name: 'Antiparos', ports: ['Antiparos Port'] }
];

export const islands: Island[] = [
  {
    id: '1',
    name: 'Santorini',
    description: 'Famous for its dramatic caldera views, stunning sunsets, and volcanic beaches',
    shortDescription: 'Iconic island with white-washed buildings and stunning sunsets',
    quote: 'Where the sky meets the sea in perfect harmony',
    metaTitle: 'Santorini Travel Guide - Best Things to Do & See',
    metaDescription: 'Plan your perfect trip to Santorini. Discover the best sunset spots, beaches, restaurants, and activities on this stunning Greek island.',
    activities: [
      'swimming',
      'wine-tasting',
      'photography',
      'sunset-watching',
      'boat-tours',
      'local-cuisine',
      'archaeological-sites',
      'village-exploring'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: 4,
    mustSee: [
      'Oia Sunset',
      'Red Beach',
      'Ancient Akrotiri',
      'Amoudi Bay',
      'Santo Wines',
      'Fira to Oia Hike',
      'Caldera View Points',
      'Black Beach'
    ],
    image: '/assets/images/islands/santorini.jpg',
    heroImage: '/assets/images/hero/islands/santorini-hero.jpg',
    vibes: [
      IslandVibe.ROMANTIC,
      IslandVibe.LUXURIOUS,
      IslandVibe.SCENIC,
      IslandVibe.CULTURAL
    ],
    size: 'MAJOR',
    slug: 'santorini',
    highlights: [
      'World-famous sunsets in Oia',
      'Unique volcanic beaches',
      'Exceptional wine tasting',
      'Luxury cave hotels'
    ],
    ports: ['Thira Port', 'Athinios Port'],
    weather: {
      temp: 26,
      condition: 'Sunny with caldera views',
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather with fewer crowds and lower prices'
    },
    idealFor: [
      'Couples',
      'Photographers',
      'Wine enthusiasts',
      'Luxury travelers',
      'Honeymooners'
    ]
  },
  // Add other islands with complete data...
];

export const allPorts = [
  ...mainPorts,
  ...cyclades.flatMap(island => island.ports || [])
];

export const islandGuides: IslandGuide[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Discover the magic of Santorini with our comprehensive guide. From the best sunset spots to hidden gems.',
    image: '/images/guides/santorini-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers']
  },
  {
    id: 'mykonos',
    name: 'Mykonos',
    description: 'Everything you need to know about Mykonos - from beach clubs to traditional tavernas.',
    image: '/images/guides/mykonos-guide.jpg',
    weather: {
      summer: 'Hot with strong meltemi winds, 25-30°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Warm and pleasant, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'June to September',
    idealFor: ['Party Lovers', 'Beach Goers', 'Luxury Travelers']
  },
  {
    id: 'naxos',
    name: 'Naxos',
    description: 'Explore the largest Cycladic island with pristine beaches and mountain villages.',
    image: '/images/guides/naxos-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Families', 'Beach Lovers', 'History Buffs']
  },
  {
    id: 'paros',
    name: 'Paros',
    description: 'Your guide to Paros - traditional villages, water sports, and local culture.',
    image: '/images/guides/paros-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Water Sports', 'Culture', 'Relaxation']
  },
  {
    id: 'milos',
    name: 'Milos',
    description: 'Discover the volcanic island of Milos with its unique beaches and landscapes.',
    image: '/images/guides/milos-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Adventure', 'Photography', 'Beach Lovers']
  },
  {
    id: 'ios',
    name: 'Ios',
    description: 'Your complete guide to Ios - beaches, nightlife, and hidden coves.',
    image: '/images/guides/ios-guide.jpg',
    weather: {
      summer: 'Hot with strong meltemi winds, 25-30°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Warm and pleasant, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'June to September',
    idealFor: ['Young Travelers', 'Beach Lovers', 'Party Goers']
  },
  {
    id: 'folegandros',
    name: 'Folegandros',
    description: 'Experience authentic Greek island life in untouched Folegandros.',
    image: '/images/guides/folegandros-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Hikers', 'Authentic Experience']
  },
  {
    id: 'syros',
    name: 'Syros',
    description: 'Explore the capital of Cyclades with its unique architecture and culture.',
    image: '/images/guides/syros-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'April to October',
    idealFor: ['Culture', 'Architecture', 'Local Life']
  },
  {
    id: 'amorgos',
    name: 'Amorgos',
    description: 'Discover the dramatic landscapes and spiritual atmosphere of Amorgos.',
    image: '/images/guides/amorgos-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Peace Seekers']
  },
  {
    id: 'sifnos',
    name: 'Sifnos',
    description: 'Your guide to the culinary capital of the Cyclades.',
    image: '/images/guides/sifnos-guide.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Food Lovers', 'Culture', 'Relaxation']
  }
];

export const months: AvailableMonth[] = [
  AvailableMonth.APRIL,
  AvailableMonth.MAY,
  AvailableMonth.JUNE,
  AvailableMonth.JULY,
  AvailableMonth.AUGUST,
  AvailableMonth.SEPTEMBER,
  AvailableMonth.OCTOBER
];

export const allVibes = [
  IslandVibe.ROMANTIC,
  IslandVibe.PEACEFUL,
  IslandVibe.LIVELY,
  IslandVibe.ADVENTUROUS,
  IslandVibe.TRADITIONAL,
  IslandVibe.LUXURIOUS,
  IslandVibe.CULTURAL,
  IslandVibe.SCENIC
];

export const paces = [
  {
    value: 'relaxed',
    label: 'Relaxed',
    description: 'Take it easy, spend more time in each location',
    icon: '🌅'
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Balance between activities and relaxation',
    icon: '⚖️'
  },
  {
    value: 'active',
    label: 'Active',
    description: 'Pack in as many experiences as possible',
    icon: '🏃'
  }
];
