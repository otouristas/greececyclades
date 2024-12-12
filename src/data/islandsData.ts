import { Island, IslandActivity, AvailableMonth, IslandVibe } from '../types/island';

const defaultWeather = {
  summer: 'Hot and dry with temperatures around 25-30°C',
  winter: 'Mild with occasional rain, 10-15°C',
  spring: 'Pleasant and warm, 15-20°C',
  autumn: 'Warm with occasional rain, 20-25°C'
};

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
    ] as AvailableMonth[],
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
    ] as IslandVibe[],
    size: 'MAJOR',
    slug: 'santorini',
    highlights: [
      'World-famous sunsets in Oia',
      'Unique volcanic beaches',
      'Exceptional wine tasting',
      'Luxury cave hotels'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather and fewer crowds than peak summer'
    },
    idealFor: [
      'Couples',
      'Honeymooners',
      'Photography enthusiasts',
      'Wine lovers',
      'Luxury travelers'
    ]
  },
  {
    id: '2',
    name: 'Mykonos',
    description: 'Known for its vibrant nightlife, beautiful beaches, and iconic windmills',
    shortDescription: 'Cosmopolitan island famous for beaches and nightlife',
    quote: 'Where luxury meets legendary nightlife',
    metaTitle: 'Mykonos Travel Guide - Beaches, Nightlife & Activities',
    metaDescription: 'Experience the best of Mykonos. Find top beaches, nightlife spots, restaurants, and activities in this comprehensive travel guide.',
    activities: [
      'swimming',
      'water-sports',
      'nightlife',
      'beach-hopping',
      'photography',
      'boat-tours',
      'local-cuisine',
      'shopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ] as AvailableMonth[],
    averageStay: 4,
    mustSee: [
      'Little Venice',
      'Paradise Beach',
      'Windmills',
      'Delos Island',
      'Nammos Beach Club',
      'Scorpios',
      'Ano Mera Village',
      'Armenistis Lighthouse'
    ],
    image: '/assets/images/islands/mykonos.jpg',
    heroImage: '/assets/images/hero/islands/mykonos-hero.jpg',
    vibes: [
      'lively',
      'luxurious',
      'scenic',
      'adventurous'
    ] as IslandVibe[],
    size: 'MAJOR',
    slug: 'mykonos',
    highlights: [
      'World-famous beach clubs',
      'Iconic windmills',
      'Designer shopping',
      'Celebrity hotspot'
    ],
    weather: {
      summer: 'Hot with strong meltemi winds, 25-30°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Warm and pleasant, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect beach weather and peak party season'
    },
    idealFor: [
      'Party lovers',
      'Beach club enthusiasts',
      'Luxury shoppers',
      'Young travelers',
      'LGBTQ+ travelers'
    ]
  },
  {
    id: '3',
    name: 'Naxos',
    description: 'The largest Cycladic island with beautiful beaches, ancient ruins, and mountain villages',
    shortDescription: 'Perfect blend of beaches, history, and authentic Greek life',
    quote: 'Where ancient myths meet modern adventures',
    metaTitle: 'Naxos Travel Guide - Beaches, History & Local Life',
    metaDescription: 'Discover Naxos, the largest Cycladic island. Find the best beaches, historical sites, mountain villages, and authentic Greek experiences.',
    activities: [
      'swimming',
      'hiking',
      'water-sports',
      'archaeological-sites',
      'village-exploring',
      'local-cuisine',
      'beach-hopping',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ] as AvailableMonth[],
    averageStay: 3,
    mustSee: [
      'Portara',
      'Temple of Demeter',
      'Mount Zeus',
      'Plaka Beach',
      'Halki Village',
      'Apiranthos',
      'Mikri Vigla Beach',
      'Castle of Naxos'
    ],
    image: '/assets/images/islands/naxos.jpg',
    heroImage: '/assets/images/hero/islands/naxos-hero.jpg',
    vibes: [
      'traditional',
      'peaceful',
      'adventurous',
      'scenic'
    ] as IslandVibe[],
    size: 'MAJOR',
    slug: 'naxos',
    highlights: [
      'Ancient ruins and historical sites',
      'Beautiful beaches and crystal-clear waters',
      'Traditional mountain villages',
      'Local cuisine and wine'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather and fewer crowds than peak summer'
    },
    idealFor: [
      'Families',
      'Adventure seekers',
      'History buffs',
      'Foodies',
      'Relaxed travelers'
    ]
  },
  {
    id: '4',
    name: 'Milos',
    description: 'Famous for its unique lunar landscape, colorful beaches, and crystal-clear waters',
    shortDescription: 'Volcanic island with otherworldly beaches',
    quote: 'Where colors paint the shores',
    metaTitle: 'Milos Travel Guide - Unique Beaches & Landscapes',
    metaDescription: 'Explore Milos, home to stunning volcanic beaches and unique landscapes. Find the best spots for swimming, photography, and authentic experiences.',
    activities: [
      'swimming',
      'snorkeling',
      'boat-tours',
      'beach-hopping',
      'photography',
      'sunset-watching',
      'hiking',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ] as AvailableMonth[],
    averageStay: 3,
    mustSee: [
      'Sarakiniko Beach',
      'Kleftiko',
      'Catacombs',
      'Plaka Village',
      'Firiplaka Beach',
      'Tsigrado Beach',
      'Ancient Theater',
      'Pollonia Village'
    ],
    image: '/assets/images/islands/milos.jpg',
    heroImage: '/assets/images/hero/islands/milos-hero.jpg',
    vibes: [
      'scenic',
      'peaceful',
      'romantic',
      'adventurous'
    ] as IslandVibe[],
    size: 'MEDIUM',
    slug: 'milos',
    highlights: [
      'Unique lunar landscapes',
      'Colorful beaches and crystal-clear waters',
      'Authentic villages and local cuisine',
      'Mining history and museums'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather and fewer crowds than peak summer'
    },
    idealFor: [
      'Couples',
      'Photography enthusiasts',
      'Adventure seekers',
      'Relaxed travelers',
      'Nature lovers'
    ]
  },
  {
    id: '5',
    name: 'Paros',
    description: 'Perfect blend of traditional Cycladic charm and modern amenities',
    shortDescription: 'Traditional charm meets modern comfort',
    quote: 'Where tradition meets contemporary life',
    metaTitle: 'Paros Travel Guide - Best Beaches & Activities',
    metaDescription: 'Plan your trip to Paros. Discover beautiful beaches, traditional villages, water sports, and the perfect balance of activities and relaxation.',
    activities: [
      'swimming',
      'water-sports',
      'beach-hopping',
      'nightlife',
      'village-exploring',
      'local-cuisine',
      'boat-tours',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.SEPTEMBER
    ] as AvailableMonth[],
    averageStay: 4,
    mustSee: [
      'Naoussa Old Port',
      'Golden Beach',
      'Parikia Old Town',
      'Lefkes Village',
      'Butterfly Valley',
      'Church of 100 Doors',
      'Santa Maria Beach',
      'Antiparos Cave'
    ],
    image: '/assets/images/islands/paros.jpg',
    heroImage: '/assets/images/hero/islands/paros-hero.jpg',
    vibes: [
      'lively',
      'adventurous',
      'cultural',
      'scenic'
    ] as IslandVibe[],
    size: 'MAJOR',
    slug: 'paros',
    highlights: [
      'Traditional villages and architecture',
      'Beautiful beaches and crystal-clear waters',
      'Water sports and activities',
      'Modern amenities and nightlife'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather and a wide range of activities'
    },
    idealFor: [
      'Families',
      'Water sports enthusiasts',
      'Nightlife lovers',
      'Couples',
      'Relaxed travelers'
    ]
  },
  {
    id: '6',
    name: 'Sifnos',
    description: 'Known for its exceptional food scene, pottery tradition, and hiking trails',
    shortDescription: 'Culinary haven with a rich history and stunning landscapes',
    quote: 'Where flavors meet art and nature',
    metaTitle: 'Sifnos Travel Guide - Food, Pottery & Hiking',
    metaDescription: 'Experience the authentic charm of Sifnos. Discover the best food, pottery, hiking trails, and cultural experiences on this hidden gem.',
    activities: [
      'hiking',
      'swimming',
      'local-cuisine',
      'village-exploring',
      'photography',
      'beach-hopping',
      'archaeological-sites',
      'spa-wellness'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ] as AvailableMonth[],
    averageStay: 3,
    mustSee: [
      'Kastro Village',
      'Chrysopigi Monastery',
      'Artemonas',
      'Apollonia',
      'Vathi Beach',
      'Cheronisos',
      'Hiking Trails',
      'Traditional Pottery Shops'
    ],
    image: '/assets/images/islands/sifnos.jpg',
    heroImage: '/assets/images/hero/islands/sifnos-hero.jpg',
    vibes: [
      'traditional',
      'cultural',
      'peaceful',
      'scenic'
    ] as IslandVibe[],
    size: 'MINOR',
    slug: 'sifnos',
    highlights: [
      'Exceptional food scene and local cuisine',
      'Traditional pottery and ceramics',
      'Hiking trails and scenic landscapes',
      'Authentic villages and local culture'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather and a wide range of activities'
    },
    idealFor: [
      'Foodies',
      'Hikers',
      'Art lovers',
      'Couples',
      'Relaxed travelers'
    ]
  },
  {
    id: '7',
    name: 'Antiparos',
    description: 'Small, charming island known for its laid-back atmosphere and beautiful caves',
    shortDescription: 'Secluded island with a relaxed vibe and stunning natural beauty',
    quote: 'Where simplicity meets serenity',
    metaTitle: 'Antiparos Travel Guide - Beaches, Caves & Relaxation',
    metaDescription: 'Escape to Antiparos, a tranquil island paradise. Discover secluded beaches, stunning caves, and a relaxed atmosphere perfect for unwinding.',
    activities: [
      'swimming',
      'snorkeling',
      'hiking',
      'beach-hopping',
      'village-exploring',
      'sunset-watching',
      'boat-tours',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ] as AvailableMonth[],
    averageStay: 2,
    mustSee: [
      'Antiparos Cave',
      'Antiparos Castle',
      'Soros Beach',
      'Despotiko Island',
      'Sunset at Sifneikos',
      'Main Street',
      'Camping Beach',
      'Livadia Beach'
    ],
    image: '/assets/images/islands/antiparos.jpg',
    heroImage: '/assets/images/hero/islands/antiparos-hero.jpg',
    vibes: [
      'peaceful',
      'romantic',
      'traditional',
      'scenic'
    ] as IslandVibe[],
    size: 'MINOR',
    slug: 'antiparos',
    highlights: [
      'Secluded beaches and crystal-clear waters',
      'Stunning caves and natural beauty',
      'Relaxed atmosphere and laid-back vibe',
      'Authentic villages and local culture'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather and a relaxed atmosphere'
    },
    idealFor: [
      'Couples',
      'Families',
      'Relaxed travelers',
      'Nature lovers',
      'Beach enthusiasts'
    ]
  },
  {
    id: '8',
    name: 'Tinos',
    description: 'Religious significance meets authentic village life and artistic tradition',
    shortDescription: 'Pilgrimage site with a rich history and stunning landscapes',
    quote: 'Where faith meets art and nature',
    metaTitle: 'Tinos Travel Guide - Pilgrimage Sites & Local Life',
    metaDescription: 'Experience the unique charm of Tinos. Discover pilgrimage sites, authentic villages, artistic traditions, and stunning natural beauty.',
    activities: [
      'hiking',
      'village-exploring',
      'local-cuisine',
      'archaeological-sites',
      'photography',
      'swimming',
      'beach-hopping',
      'wine-tasting'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ] as AvailableMonth[],
    averageStay: 3,
    mustSee: [
      'Church of Panagia',
      'Volax Village',
      'Pyrgos',
      'Dove Cotes',
      'Kolymbithra Beach',
      'Marble Museum',
      'Tinos Town',
      'Traditional Villages'
    ],
    image: '/assets/images/islands/tinos.jpg',
    heroImage: '/assets/images/hero/islands/tinos-hero.jpg',
    vibes: [
      'traditional',
      'cultural',
      'peaceful',
      'scenic'
    ] as IslandVibe[],
    size: 'MINOR',
    slug: 'tinos',
    highlights: [
      'Pilgrimage sites and religious significance',
      'Authentic villages and local culture',
      'Artistic traditions and marble crafts',
      'Stunning landscapes and natural beauty'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.APRIL,
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather and a wide range of activities'
    },
    idealFor: [
      'Pilgrims',
      'Couples',
      'Families',
      'Art lovers',
      'Relaxed travelers'
    ]
  },
  {
    id: '9',
    name: 'Syros',
    description: 'Capital of Cyclades with neoclassical architecture and vibrant cultural scene',
    shortDescription: 'Cultural hub with a rich history and stunning architecture',
    quote: 'Where heritage meets innovation',
    metaTitle: 'Syros Travel Guide - Culture, History & Architecture',
    metaDescription: 'Discover Syros, the capital of Cyclades. Explore neoclassical architecture, vibrant cultural scene, and a rich history that will leave you inspired.',
    activities: [
      'swimming',
      'village-exploring',
      'local-cuisine',
      'archaeological-sites',
      'photography',
      'shopping',
      'nightlife',
      'beach-hopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.APRIL,
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ] as AvailableMonth[],
    averageStay: 3,
    mustSee: [
      'Ermoupolis',
      'Apollo Theater',
      'Ano Syros',
      'Town Hall',
      'Catholic Cathedral',
      'Vaporia District',
      'Galissas Beach',
      'Miaouli Square'
    ],
    image: '/assets/images/islands/syros.jpg',
    heroImage: '/assets/images/hero/islands/syros-hero.jpg',
    vibes: [
      'cultural',
      'lively',
      'luxurious',
      'scenic'
    ] as IslandVibe[],
    size: 'MAJOR',
    slug: 'syros',
    highlights: [
      'Neoclassical architecture and cultural heritage',
      'Vibrant cultural scene and events',
      'Rich history and historical sites',
      'Stunning beaches and crystal-clear waters'
    ],
    weather: defaultWeather,
    bestTime: {
      months: [
        AvailableMonth.APRIL,
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather and a wide range of activities'
    },
    idealFor: [
      'Culture lovers',
      'History buffs',
      'Couples',
      'Families',
      'Urban travelers'
    ]
  }
];

export interface IslandGuide {
  id: string;
  name: string;
  description: string;
  image: string;
  weather: {
    summer: string;
    winter: string;
    spring: string;
    autumn: string;
  };
  bestTime: string;
  idealFor: string[];
}

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
