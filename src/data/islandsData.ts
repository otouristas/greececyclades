import { IslandActivity, AvailableMonth, IslandVibe, Island, IslandGuide, STAY_DURATION } from '../types/island';

export const mainPorts = [
  'Piraeus (Athens)',
  'Rafina',
  'Lavrio'
];

// This array is used for the port selection dropdown
export const cyclades: Partial<Island>[] = [
  {
    id: '1',
    name: 'Santorini',
    description: 'Famous for its dramatic caldera views, stunning sunsets, and volcanic beaches',
    shortDescription: 'Iconic sunsets and caldera views',
    quote: 'Where romance meets volcanic beauty',
    metaTitle: 'Santorini Travel Guide - Best Things to Do & See',
    metaDescription: 'Plan your perfect Santorini vacation with our comprehensive guide to the best sunset spots, beaches, and activities.',
    image: '/images/islands/santorini.jpg',
    heroImage: '/images/islands/santorini.jpg',
    highlights: [
      'Caldera views',
      'Sunset in Oia',
      'Volcanic beaches',
      'Wine tasting',
      'Ancient Akrotiri'
    ],
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 27-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'sunset-watching',
      'wine-tasting',
      'swimming',
      'photography',
      'hiking',
      'boat-tours'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Oia Sunset',
      'Caldera View',
      'Red Beach',
      'Ancient Akrotiri',
      'Fira to Oia Hike'
    ],
    vibes: [
      IslandVibe.ROMANTIC,
      IslandVibe.SCENIC,
      IslandVibe.LUXURIOUS
    ],
    size: 'MAJOR',
    slug: 'santorini',
    ports: ['Athinios Port', 'Old Port'],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather with fewer crowds'
    },
    idealFor: [
      'Couples',
      'Photographers',
      'Wine lovers',
      'Luxury travelers'
    ]
  } as Island,
  { 
    id: '2',
    name: 'Mykonos',
    description: 'The most cosmopolitan island in Greece, known for its vibrant nightlife, beautiful beaches, and iconic windmills',
    shortDescription: 'Cosmopolitan paradise with vibrant nightlife',
    quote: 'The island that never sleeps',
    metaTitle: 'Mykonos Travel Guide - Beaches, Nightlife & Culture',
    metaDescription: 'Experience the magic of Mykonos. From pristine beaches and vibrant nightlife to traditional charm.',
    image: '/images/islands/mykonos.jpg',
    heroImage: '/images/islands/mykonos.jpg',
    highlights: [
      'Little Venice',
      'Windmills',
      'Paradise Beach',
      'Chora nightlife',
      'Beach clubs'
    ],
    weather: {
      temp: 28,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 28-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'nightlife',
      'beach-clubs',
      'water-sports',
      'shopping',
      'sightseeing'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Little Venice',
      'Windmills',
      'Paradise Beach',
      'Super Paradise Beach',
      'Delos Island'
    ],
    vibes: [
      IslandVibe.COSMOPOLITAN,
      IslandVibe.PARTY,
      IslandVibe.LUXURIOUS
    ],
    size: 'MAJOR',
    slug: 'mykonos',
    ports: ['New Port', 'Old Port'],
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Peak season for beach clubs and nightlife'
    },
    idealFor: [
      'Party lovers',
      'Luxury travelers',
      'Beach club enthusiasts',
      'Shopping fans'
    ]
  } as Island,
  { 
    id: '3',
    name: 'Naxos',
    description: 'The largest and most fertile of the Cyclades islands, known for its excellent beaches, ancient ruins, and traditional mountain villages',
    shortDescription: 'Largest Cycladic island with diverse attractions',
    quote: 'Where mountains meet beaches',
    metaTitle: 'Naxos Travel Guide - Best Beaches & Villages',
    metaDescription: 'Discover the largest Cycladic island. From pristine beaches to mountain villages, experience the authentic Greek island life.',
    image: '/images/islands/naxos.jpg',
    heroImage: '/images/islands/naxos.jpg',
    highlights: [
      'Portara',
      'St. George Beach',
      'Mountain villages',
      'Ancient temples',
      'Local products'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and pleasant around 26-30°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'hiking',
      'windsurfing',
      'village-exploring',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Portara',
      'Plaka Beach',
      'Halki Village',
      'Temple of Demeter',
      'Mount Zeus'
    ],
    vibes: [
      IslandVibe.TRADITIONAL,
      IslandVibe.ACTIVE,
      IslandVibe.FAMILY_FRIENDLY
    ],
    size: 'MAJOR',
    slug: 'naxos',
    ports: ['Naxos Port'],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect weather for both beaches and hiking'
    },
    idealFor: [
      'Families',
      'Active travelers',
      'Food lovers',
      'Beach enthusiasts'
    ]
  } as Island,
  { 
    id: '4',
    name: 'Paros',
    description: 'A perfect blend of traditional Cycladic charm and modern amenities, known for its beautiful beaches, water sports, and vibrant nightlife',
    shortDescription: 'Perfect blend of tradition and modernity',
    quote: 'The heart of the Cyclades',
    metaTitle: 'Paros Travel Guide - Best Things to Do & See',
    metaDescription: 'Explore Paros island, offering the perfect mix of traditional charm and modern amenities.',
    image: '/images/islands/paros.jpg',
    heroImage: '/images/islands/paros.jpg',
    highlights: [
      'Naoussa town',
      'Golden Beach',
      'Parikia old town',
      'Water sports',
      'Byzantine route'
    ],
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Warm and sunny around 27-31°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'windsurfing',
      'kitesurfing',
      'hiking',
      'nightlife'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Naoussa',
      'Golden Beach',
      'Panagia Ekatontapiliani',
      'Lefkes',
      'Santa Maria'
    ],
    vibes: [
      IslandVibe.ACTIVE,
      IslandVibe.TRADITIONAL,
      IslandVibe.VIBRANT
    ],
    size: 'MAJOR',
    slug: 'paros',
    ports: ['Parikia Port'],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect conditions for water sports and sightseeing'
    },
    idealFor: [
      'Water sports enthusiasts',
      'Young couples',
      'Families',
      'Active travelers'
    ]
  } as Island,
  { 
    id: '5',
    name: 'Milos',
    description: 'Known for its stunning lunar landscapes, colorful fishing villages, and over 70 unique beaches',
    shortDescription: 'Volcanic island with colorful beaches',
    quote: 'Where colors meet the sea',
    metaTitle: 'Milos Travel Guide - Best Things to Do & See',
    metaDescription: 'Explore the volcanic island of Milos. Discover its colorful beaches, ancient catacombs, and traditional fishing villages.',
    activities: [
      'swimming',
      'boat-tours',
      'kayaking',
      'photography',
      'geological-tours',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Sarakiniko Beach',
      'Kleftiko',
      'Plaka',
      'Catacombs',
      'Firiplaka Beach'
    ],
    image: '/images/islands/milos.jpg',
    heroImage: '/images/islands/milos.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MAJOR',
    slug: 'milos',
    ports: ['Adamas Port'],
    highlights: [
      'Lunar landscapes',
      'Colorful fishing villages',
      'Unique volcanic beaches',
      'Ancient history'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Hot and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for beach exploration and boat tours'
    },
    idealFor: [
      'Couples',
      'Photographers',
      'Beach lovers',
      'Adventure seekers'
    ]
  } as Island,
  { 
    id: '6',
    name: 'Ios',
    description: 'Famous for its vibrant nightlife and beautiful beaches, Ios offers a perfect balance of party atmosphere and natural beauty',
    shortDescription: 'Party paradise with stunning beaches',
    quote: 'Where the young at heart come to play',
    metaTitle: 'Ios Travel Guide - Best Things to Do & See',
    metaDescription: 'Experience the best of Ios. From vibrant nightlife to pristine beaches, discover what makes this island a favorite among young travelers.',
    activities: [
      'swimming',
      'nightlife',
      'beach-clubs',
      'water-sports',
      'hiking',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Mylopotas Beach',
      'Chora',
      'Homer\'s Tomb',
      'Manganari Beach',
      'Paleokastro'
    ],
    image: '/images/islands/ios.jpg',
    heroImage: '/images/islands/ios.jpg',
    vibes: [
      IslandVibe.PARTY,
      IslandVibe.SCENIC,
      IslandVibe.ADVENTUROUS,
      IslandVibe.YOUTHFUL
    ],
    size: 'MEDIUM',
    slug: 'ios',
    ports: ['Ios Port'],
    highlights: [
      'Vibrant nightlife',
      'Beautiful beaches',
      'Traditional Chora',
      'Water sports'
    ],
    weather: {
      temp: 27,
      condition: 'Sunny and warm',
      summer: 'Hot and dry with temperatures around 27-32°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Peak season for nightlife and beach activities'
    },
    idealFor: [
      'Young travelers',
      'Party lovers',
      'Beach enthusiasts',
      'Adventure seekers'
    ]
  } as Island,
  { 
    id: '7',
    name: 'Sifnos',
    description: 'Known as the culinary capital of the Cyclades, Sifnos combines excellent gastronomy with traditional architecture and beautiful hiking trails',
    shortDescription: 'Culinary paradise with traditional charm',
    quote: 'Where flavors meet tradition',
    metaTitle: 'Sifnos Travel Guide - Best Things to Do & See',
    metaDescription: 'Discover the culinary capital of the Cyclades. From traditional pottery to exquisite local cuisine, experience the authentic Greek island life.',
    activities: [
      'cooking-classes',
      'hiking',
      'swimming',
      'pottery-workshops',
      'cultural-tours',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Kastro',
      'Apollonia',
      'Chrysopigi Monastery',
      'Vathi Beach',
      'Traditional Pottery Workshops'
    ],
    image: '/images/islands/sifnos.jpg',
    heroImage: '/images/islands/sifnos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.CULTURAL,
      IslandVibe.ROMANTIC,
      IslandVibe.CULINARY
    ],
    size: 'MEDIUM',
    slug: 'sifnos',
    ports: ['Kamares Port'],
    highlights: [
      'Exceptional local cuisine',
      'Traditional pottery',
      'Medieval villages',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'Sunny with mild winds',
      summer: 'Warm and pleasant with temperatures around 25-29°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for culinary experiences and hiking'
    },
    idealFor: [
      'Food lovers',
      'Culture enthusiasts',
      'Hikers',
      'Couples'
    ]
  } as Island,
  { 
    id: '8',
    name: 'Amorgos',
    description: 'A dramatic island of steep cliffs and traditional villages, offering a perfect blend of natural beauty and authentic Greek charm',
    shortDescription: 'Dramatic cliffs and traditional charm',
    quote: 'Where cliffs meet clouds',
    metaTitle: 'Amorgos Travel Guide - Best Things to Do & See',
    metaDescription: 'Experience the dramatic beauty of Amorgos. From clifftop villages to pristine beaches, discover this hidden Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'photography',
      'cliff-walking'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Church of Panagia',
      'Katergo Beach',
      'Chrysospilia Cave',
      'Ano Meria Village'
    ],
    image: '/images/islands/amorgos.jpg',
    heroImage: '/images/islands/amorgos.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MEDIUM',
    slug: 'amorgos',
    ports: ['Katapola Port'],
    highlights: [
      'Clifftop Chora',
      'Dramatic landscapes',
      'Pristine beaches',
      'Traditional villages'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for hiking and beach activities'
    },
    idealFor: [
      'Couples',
      'Nature lovers',
      'Photographers',
      'Peace seekers'
    ]
  } as Island,
  { 
    id: '9',
    name: 'Syros',
    description: 'The administrative capital of the Cyclades, combining neoclassical grandeur with traditional Cycladic charm',
    shortDescription: 'Neoclassical elegance meets island charm',
    quote: 'Where elegance meets tradition',
    metaTitle: 'Syros Travel Guide - Best Things to Do & See',
    metaDescription: 'Experience the unique blend of neoclassical and Cycladic architecture in Syros. Discover its rich culture, beautiful beaches, and vibrant arts scene.',
    activities: [
      'cultural-tours',
      'swimming',
      'theater',
      'local-cuisine',
      'architecture-tours',
      'shopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Ermoupolis',
      'Ano Syros',
      'Apollo Theater',
      'Vaporia District',
      'Galissas Beach'
    ],
    image: '/images/islands/syros.jpg',
    heroImage: '/images/islands/syros.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.ELEGANT,
      IslandVibe.AUTHENTIC,
      IslandVibe.COSMOPOLITAN
    ],
    size: 'MEDIUM',
    slug: 'syros',
    ports: ['Ermoupolis Port'],
    highlights: [
      'Neoclassical architecture',
      'Rich cultural life',
      'Historic theaters',
      'Beautiful beaches'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny and pleasant',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for cultural activities and sightseeing'
    },
    idealFor: [
      'Culture enthusiasts',
      'Architecture lovers',
      'Theater fans',
      'History buffs'
    ]
  } as Island,
  { 
    id: '10',
    name: 'Tinos',
    description: 'A spiritual island known for its religious significance, traditional marble craftsmanship, and picturesque villages.',
    shortDescription: 'Religious heritage and marble artistry',
    quote: 'Where faith meets artistry',
    metaTitle: 'Tinos Island Guide - Pilgrimage, Art & Tradition',
    metaDescription: 'Explore the spiritual heart of the Cyclades. Discover religious sites, marble villages, and authentic Greek culture on Tinos.',
    activities: [
      'pilgrimage',
      'village-exploring',
      'art-viewing',
      'local-cuisine',
      'hiking'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Church of Panagia Evangelistria',
      'Volax Village',
      'Pyrgos Village',
      'Museum of Marble Crafts'
    ],
    image: '/images/islands/tinos.jpg',
    heroImage: '/images/islands/tinos.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.TRADITIONAL,
      IslandVibe.SPIRITUAL
    ],
    size: 'MAJOR',
    slug: 'tinos',
    highlights: [
      'Religious pilgrimage site',
      'Marble villages',
      'Traditional crafts',
      'Dovecotes',
      'Local gastronomy'
    ],
    ports: ['Tinos Port'],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather for exploring with fewer pilgrims'
    },
    idealFor: [
      'Religious travelers',
      'Art lovers',
      'Culture enthusiasts',
      'Food lovers'
    ]
  } as Island,
  { 
    id: '11',
    name: 'Serifos',
    description: 'A rugged island with wild beauty, pristine beaches, and traditional Cycladic architecture, perfect for those seeking authenticity',
    shortDescription: 'Rugged beauty and authentic charm',
    quote: 'Where wild meets tradition',
    metaTitle: 'Serifos Travel Guide - Best Things to Do & See',
    metaDescription: 'Discover the authentic charm of Serifos. From pristine beaches to traditional villages, experience the untouched beauty of this Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'beach-hopping',
      'photography'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Livadi Beach',
      'Mining Museum',
      'Psili Ammos Beach',
      'Cyclops Cave'
    ],
    image: '/images/islands/serifos.jpg',
    heroImage: '/images/islands/serifos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.PEACEFUL,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MEDIUM',
    slug: 'serifos',
    ports: ['Livadi Port'],
    highlights: [
      'Stunning Chora',
      'Mining heritage',
      'Pristine beaches',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'Sunny with occasional winds',
      summer: 'Warm and dry with temperatures around 25-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for hiking and beach activities'
    },
    idealFor: [
      'Nature lovers',
      'Hikers',
      'Peace seekers',
      'Photography enthusiasts'
    ]
  } as Island,
  { 
    id: '12',
    name: 'Andros',
    description: 'The greenest of the Cyclades, known for its neoclassical mansions, pristine beaches, and extensive network of hiking trails,',
    shortDescription: 'Green paradise with hiking trails',
    quote: 'Where nature meets nobility',
    metaTitle: 'Andros Travel Guide - Best Things to Do & See',
    metaDescription: 'Discover the green island of Andros. From hiking trails to neoclassical architecture, experience the unique charm of this Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'museum-visits',
      'water-sports',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Chora',
      'Museum of Contemporary Art',
      'Tis Grias Castle',
      'Achla Beach',
      'Menites Springs'
    ],
    image: '/images/islands/andros.jpg',
    heroImage: '/images/islands/andros.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.ACTIVE,
      IslandVibe.ELEGANT,
      IslandVibe.SCENIC
    ],
    size: 'MAJOR',
    slug: 'andros',
    highlights: [
      'Extensive hiking network',
      'Neoclassical architecture',
      'Contemporary art scene',
      'Natural springs'
    ],
    ports: ['Gavrio Port'],
    weather: {
      temp: 25,
      condition: 'Sunny with greenery',
      summer: 'Warm and pleasant with temperatures around 25-29°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for hiking and cultural activities'
    },
    idealFor: [
      'Hikers',
      'Art lovers',
      'Nature enthusiasts',
      'Culture seekers'
    ]
  } as Island,
  { 
    id: '13',
    name: 'Kea',
    description: 'The closest Cycladic island to Athens, Kea offers a perfect blend of hiking trails, pristine beaches, and authentic Greek charm.',
    shortDescription: 'Hiking paradise close to Athens',
    quote: 'Where ancient paths lead to secret beaches',
    metaTitle: 'Kea Island Guide - Hiking, Beaches & Local Life',
    metaDescription: 'Discover Kea, the hikers paradise of the Cyclades. Find the best trails, beaches, and local experiences on this authentic Greek island.',
    activities: [
      'hiking',
      'swimming',
      'diving',
      'local-cuisine',
      'beach-hopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Ancient Karthaia',
      'Vourkari Village',
      'Lion of Kea',
      'Otzias Beach'
    ],
    image: '/images/islands/kea.webp',
    heroImage: '/images/islands/kea.webp',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.ACTIVE
    ],
    size: 'MEDIUM',
    slug: 'kea',
    highlights: [
      'Ancient ruins',
      'Hiking trails',
      'Traditional villages',
      'Pristine beaches',
      'Local gastronomy'
    ],
    ports: ['Korissia Port'],
    weather: {
      temp: 24,
      condition: 'Sunny with mild winds',
      summer: 'Warm and dry with temperatures around 24-28°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather for hiking and exploring'
    },
    idealFor: [
      'Hikers',
      'History buffs',
      'Nature lovers',
      'Peace seekers'
    ]
  } as Island,
  { 
    id: '14',
    name: 'Sikinos',
    description: 'A hidden gem in the Cyclades, Sikinos offers unspoiled beauty, traditional architecture, and a peaceful escape from modern life.',
    shortDescription: 'Untouched traditional island life',
    quote: 'Where time stands still',
    metaTitle: 'Sikinos Island Guide - Authentic Greek Island Life',
    metaDescription: 'Discover the untouched beauty of Sikinos. Experience authentic Greek island life away from mass tourism.',
    activities: [
      'hiking',
      'swimming',
      'wine-tasting',
      'local-cuisine',
      'cultural-visits'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Episkopi Monastery',
      'Chora Village',
      'Malta Beach',
      'Ancient Winery'
    ],
    image: '/images/islands/sikinos.jpg',
    heroImage: '/images/islands/sikinos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL
    ],
    size: 'MINOR',
    slug: 'sikinos',
    ports: ['Alopronia Port'],
    highlights: [
      'Ancient monastery',
      'Traditional villages',
      'Secluded beaches',
      'Local winery',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather for exploring with fewer tourists'
    },
    idealFor: [
      'Peace seekers',
      'Culture enthusiasts',
      'Hikers',
      'Wine lovers'
    ]
  } as Island,
  { 
    id: '15',
    name: 'Kimolos',
    description: 'A volcanic island known for its stunning white cliffs, crystal-clear waters, and peaceful atmosphere.',
    shortDescription: 'Volcanic beauty with pristine beaches',
    quote: 'Where white cliffs meet turquoise waters',
    metaTitle: 'Kimolos Island Guide - Beaches, Nature & Serenity',
    metaDescription: 'Experience the untouched beauty of Kimolos. Discover volcanic landscapes, secluded beaches, and authentic Greek island life.',
    activities: [
      'swimming',
      'hiking',
      'snorkeling',
      'beach-hopping',
      'local-cuisine'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Skiadi Rock',
      'Prassa Beach',
      'Chorio Village',
      'Dekas Beach'
    ],
    image: '/images/islands/kimolos.jpg',
    heroImage: '/images/islands/kimolos.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.SCENIC,
      IslandVibe.AUTHENTIC
    ],
    size: 'MINOR',
    slug: 'kimolos',
    ports: ['Psathi Port'],
    highlights: [
      'Volcanic landscapes',
      'White rock formations',
      'Pristine beaches',
      'Traditional village life',
      'Crystal-clear waters'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect beach weather with fewer tourists'
    },
    idealFor: [
      'Peace seekers',
      'Nature lovers',
      'Beach enthusiasts',
      'Couples'
    ]
  } as Island,
  { 
    id: '16',
    name: 'Kythnos',
    description: 'Known for its thermal springs, beautiful beaches, and traditional villages, Kythnos offers an authentic Greek island experience.',
    shortDescription: 'Thermal springs and traditional charm',
    quote: 'Where healing waters meet golden beaches',
    metaTitle: 'Kythnos Island Guide - Hot Springs & Traditional Life',
    metaDescription: 'Experience the healing thermal springs and authentic charm of Kythnos. Discover traditional villages, pristine beaches, and local culture.',
    activities: [
      'swimming',
      'thermal-springs',
      'hiking',
      'local-cuisine',
      'beach-hopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Loutra Hot Springs',
      'Kolona Beach',
      'Chora Village',
      'Dryopida Cave'
    ],
    image: '/images/islands/kythnos.jpg',
    heroImage: '/images/islands/kythnos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL
    ],
    size: 'MEDIUM',
    slug: 'kythnos',
    ports: ['Merichas Port'],
    highlights: [
      'Thermal springs',
      'Double-sided beach',
      'Traditional villages',
      'Cave exploration',
      'Local festivals'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather for thermal springs and beaches'
    },
    idealFor: [
      'Wellness seekers',
      'Beach lovers',
      'Culture enthusiasts',
      'Couples'
    ]
  } as Island,
  { 
    id: '17',
    name: 'Folegandros',
    description: 'A dramatic island of steep cliffs and traditional villages, offering a perfect blend of natural beauty and authentic Greek charm',
    shortDescription: 'Dramatic cliffs and traditional charm',
    quote: 'Where cliffs meet clouds',
    metaTitle: 'Folegandros Travel Guide - Best Things to Do & See',
    metaDescription: 'Experience the dramatic beauty of Folegandros. From clifftop villages to pristine beaches, discover this hidden Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'photography',
      'cliff-walking'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER,
      AvailableMonth.OCTOBER
    ],
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Church of Panagia',
      'Katergo Beach',
      'Chrysospilia Cave',
      'Ano Meria Village'
    ],
    image: '/images/islands/folegandros.jpg',
    heroImage: '/images/islands/folegandros.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MEDIUM',
    slug: 'folegandros',
    ports: ['Karavostasis Port'],
    highlights: [
      'Clifftop Chora',
      'Dramatic landscapes',
      'Pristine beaches',
      'Traditional villages'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      reason: 'Perfect for hiking and beach activities'
    },
    idealFor: [
      'Couples',
      'Nature lovers',
      'Photographers',
      'Peace seekers'
    ]
  } as Island,
  { 
    id: '18',
    name: 'Anafi',
    description: 'A remote paradise with golden beaches, dramatic landscapes, and a peaceful atmosphere that feels worlds away from modern life.',
    shortDescription: 'Remote paradise with golden beaches',
    quote: 'Where solitude meets natural beauty',
    metaTitle: 'Anafi Island Guide - Remote Beauty & Tranquility',
    metaDescription: 'Discover the untouched beauty of Anafi. Experience pristine beaches, dramatic landscapes, and authentic Greek island life.',
    activities: [
      'hiking',
      'swimming',
      'beach-hopping',
      'local-cuisine',
      'monastery-visits'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Kalamiotissa Monastery',
      'Roukounas Beach',
      'Chora Village',
      'Mount Kalamos'
    ],
    image: '/images/islands/anafi.jpg',
    heroImage: '/images/islands/anafi.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.SCENIC,
      IslandVibe.AUTHENTIC
    ],
    size: 'MINOR',
    slug: 'anafi',
    ports: ['Anafi Port'],
    highlights: [
      'Remote beaches',
      'Ancient monastery',
      'Dramatic cliffs',
      'Traditional village',
      'Hiking trails'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather for hiking and beaches'
    },
    idealFor: [
      'Peace seekers',
      'Hikers',
      'Nature lovers',
      'Adventure travelers'
    ]
  } as Island,
  { 
    id: '19',
    name: 'Thirasia',
    description: 'The quiet sister island of Santorini, offering authentic village life and stunning caldera views without the crowds.',
    shortDescription: 'Authentic caldera views without crowds',
    quote: 'Santorini\'s hidden sister',
    metaTitle: 'Thirasia Island Guide - Authentic Caldera Experience',
    metaDescription: 'Experience the authentic side of the Santorini caldera on Thirasia. Discover traditional villages, quiet beaches, and stunning views.',
    activities: [
      'hiking',
      'swimming',
      'photography',
      'local-cuisine',
      'village-exploring'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Manolas Village',
      'Korfos Port',
      'Agia Irini Church',
      'Potamos Settlement'
    ],
    image: '/images/islands/thirasia.jpg',
    heroImage: '/images/islands/thirasia.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MINOR',
    slug: 'thirasia',
    ports: ['Riva Port'],
    highlights: [
      'Caldera views',
      'Traditional villages',
      'Volcanic beaches',
      'Cave houses',
      'Sunset spots'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect weather with fewer tourists'
    },
    idealFor: [
      'Peace seekers',
      'Photographers',
      'Culture enthusiasts',
      'Off-the-beaten-path travelers'
    ]
  } as Island,
  { 
    id: '20',
    name: 'Antiparos',
    description: 'A charming island known for its beautiful beaches, impressive cave, and laid-back atmosphere, perfect for a relaxing Greek island experience.',
    shortDescription: 'Laid-back charm and natural wonders',
    quote: 'Where simplicity meets natural beauty',
    metaTitle: 'Antiparos Island Guide - Beaches, Caves & Relaxation',
    metaDescription: 'Discover the laid-back charm of Antiparos. Experience stunning beaches, explore the famous cave, and enjoy authentic island life.',
    activities: [
      'swimming',
      'cave-exploring',
      'beach-hopping',
      'local-cuisine',
      'water-sports'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Antiparos Cave',
      'Sifneikos Beach',
      'Chora Village',
      'Despotiko Island'
    ],
    image: '/images/islands/antiparos.jpg',
    heroImage: '/images/islands/antiparos.jpg',
    vibes: [
      IslandVibe.RELAXED,
      IslandVibe.SCENIC,
      IslandVibe.AUTHENTIC
    ],
    size: 'MINOR',
    slug: 'antiparos',
    ports: ['Antiparos Port'],
    highlights: [
      'Famous cave',
      'Golden beaches',
      'Traditional village',
      'Water sports',
      'Sunset views'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      reason: 'Perfect beach weather with fewer tourists'
    },
    idealFor: [
      'Beach lovers',
      'Families',
      'Nature enthusiasts',
      'Water sports fans'
    ]
  } as Island,
  { 
    id: '21',
    name: 'Donousa',
    description: 'A tranquil paradise in the Small Cyclades, known for its pristine beaches and crystal-clear waters.',
    shortDescription: 'Pristine beaches and tranquility',
    quote: 'Where time stands still',
    metaTitle: 'Donousa Travel Guide - Authentic Island Experience',
    metaDescription: 'Discover the untouched beauty of Donousa, a hidden gem in the Small Cyclades.',
    image: '/images/islands/donousa.jpg',
    heroImage: '/images/islands/donousa.jpg',
    highlights: [
      'Kedros Beach',
      'Donousa Village',
      'Cave of the Wall',
      'Hiking Trails',
      'Local Festivals'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    activities: [
      'swimming',
      'hiking',
      'snorkeling',
      'beach-hopping',
      'local-culture'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Kedros Beach',
      'Donousa Village',
      'Cave of the Wall'
    ],
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.AUTHENTIC,
      IslandVibe.TRADITIONAL
    ],
    size: 'MINOR',
    slug: 'donousa'
  },
  { 
    id: '22',
    name: 'Iraklia',
    description: 'The smallest of the Small Cyclades, Iraklia is a tranquil haven perfect for those seeking an authentic, off-the-beaten-path Greek island experience.',
    shortDescription: 'Peaceful island with untouched nature',
    quote: 'A hidden treasure of serenity',
    metaTitle: 'Iraklia Travel Guide - Experience Authentic Greek Island Life',
    metaDescription: 'Discover the untouched beauty of Iraklia. Experience pristine beaches, hiking trails, and authentic Greek hospitality in this peaceful Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'snorkeling',
      'local-cuisine',
      'village-exploring',
      'beach-hopping'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Cave of Saint John',
      'Livadi Beach',
      'Agios Georgios Beach',
      'Tourkopigado Spring',
      'Panagia Church',
      'Agios Athanasios Summit',
      'Traditional Settlements'
    ],
    image: '/images/islands/iraklia.jpg',
    heroImage: '/images/islands/iraklia.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MINOR',
    slug: 'iraklia',
    ports: ['Iraklia Port'],
    highlights: [
      'Cave of Saint John',
      'Hiking trails',
      'Secluded beaches',
      'Traditional settlements',
      'Natural springs'
    ],
    weather: {
      temp: 25,
      condition: 'clear',
      summer: 'Warm and dry with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 17-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      reason: 'Perfect weather for hiking and swimming with very few tourists'
    },
    idealFor: [
      'Nature lovers',
      'Hikers',
      'Peace seekers',
      'Adventure travelers'
    ]
  } as Island,
  { 
    id: '23',
    name: 'Schinoussa',
    description: 'A tiny paradise in the Small Cyclades, Schinoussa charms visitors with its golden beaches, crystal-clear waters, and authentic island atmosphere.',
    shortDescription: 'Small island with beautiful beaches',
    quote: 'Where time slows down to island pace',
    metaTitle: 'Schinoussa Island Guide - Discover a Hidden Cycladic Gem',
    metaDescription: 'Experience the authentic charm of Schinoussa. Find pristine beaches, traditional villages, and peaceful corners in this small but beautiful Cycladic island.',
    activities: [
      'swimming',
      'beach-hopping',
      'hiking',
      'local-cuisine',
      'village-exploring',
      'boat-tours'
    ] as IslandActivity[],
    bestMonths: [
      AvailableMonth.MAY,
      AvailableMonth.JUNE,
      AvailableMonth.SEPTEMBER
    ],
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Tsigouri Beach',
      'Chora Village',
      'Lioliou Beach',
      'Psili Ammos Beach',
      'Mersini Port',
      'Panagia Church',
      'Sunset Point'
    ],
    image: '/images/islands/schinoussa.jpg',
    heroImage: '/images/islands/schinoussa.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL,
      IslandVibe.SCENIC
    ],
    size: 'MINOR',
    slug: 'schinoussa',
    ports: ['Schinoussa Port'],
    highlights: [
      'Golden beaches',
      'Traditional villages',
      'Scenic hiking paths',
      'Fresh seafood tavernas',
      'Peaceful coves'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [AvailableMonth.MAY, AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      reason: 'Perfect beach weather with fewer tourists'
    },
    idealFor: [
      'Beach lovers',
      'Peace seekers',
      'Couples',
      'Nature enthusiasts'
    ]
  } as Island
];

export const islandGuides: IslandGuide[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Discover the magic of Santorini with our comprehensive guide. From the best sunset spots to hidden gems.',
    image: '/images/islands/santorini.jpg',
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
    image: '/images/islands/mykonos.jpg',
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
    image: '/images/islands/naxos.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and mild, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Families', 'Beach Lovers', 'History Buffs']
  },
  {
    id: 'paros',
    name: 'Paros',
    description: 'Your guide to Paros - traditional villages, water sports, and local culture.',
    image: '/images/islands/paros.jpg',
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
    image: '/images/islands/milos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-30°C',
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
    description: 'Experience the perfect blend of vibrant nightlife and stunning beaches.',
    image: '/images/islands/ios.jpg',
    weather: {
      summer: 'Hot and sunny with temperatures around 28-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'June to September',
    idealFor: ['Young Travelers', 'Beach Lovers', 'Party Enthusiasts']
  },
  {
    id: 'folegandros',
    name: 'Folegandros',
    description: 'Experience authentic Greek island life in untouched Folegandros.',
    image: '/images/islands/folegandros.jpg',
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
    image: '/images/islands/syros.jpg',
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
    image: '/images/islands/amorgos.jpg',
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
    image: '/images/islands/sifnos.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Food Lovers', 'Culture', 'Relaxation']
  },
  {
    id: 'koufonisia',
    name: 'Koufonisia',
    description: 'Experience the turquoise waters and laid-back charm of Koufonisia. Your guide to this hidden Cycladic paradise.',
    image: '/images/islands/koufonisia.jpg',
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  },
  {
    id: 'iraklia',
    name: 'Iraklia',
    description: 'Discover the untouched beauty of Iraklia, the smallest of the Small Cyclades. A perfect escape for nature lovers.',
    image: '/images/islands/iraklia.jpg',
    weather: {
      temp: 25,
      condition: 'clear',
      summer: 'Warm and dry with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 17-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Peace Seekers']
  },
  {
    id: 'schinoussa',
    name: 'Schinoussa',
    description: 'Your complete guide to Schinoussa, a tiny paradise with golden beaches and authentic island charm.',
    image: '/images/islands/schinoussa.jpg',
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  },
  {
    id: 'kea',
    name: 'Kea',
    description: 'Discover the hiking paradise of Kea, with its ancient trails and authentic charm.',
    image: '/images/islands/kea.webp',
    weather: {
      summer: 'Warm and pleasant with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Weekend Travelers']
  },
  {
    id: 'kimolos',
    name: 'Kimolos',
    description: 'Explore the volcanic beauty and pristine beaches of Kimolos.',
    image: '/images/islands/kimolos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Nature Lovers', 'Beach Enthusiasts']
  },
  {
    id: 'kythnos',
    name: 'Kythnos',
    description: 'Experience the healing thermal springs and traditional charm of Kythnos.',
    image: '/images/islands/kythnos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Wellness Seekers', 'Beach Lovers', 'Culture Enthusiasts']
  },
  {
    id: 'sikinos',
    name: 'Sikinos',
    description: 'Discover the untouched beauty and authentic charm of Sikinos.',
    image: '/images/islands/sikinos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Culture Enthusiasts', 'Hikers']
  },
  {
    id: 'anafi',
    name: 'Anafi',
    description: 'Experience the untouched beauty of Anafi, a remote paradise in the Cyclades.',
    image: '/images/islands/anafi.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Hikers', 'Nature Lovers']
  },
  {
    id: 'antiparos',
    name: 'Antiparos',
    description: 'Experience the laid-back charm and natural wonders of Antiparos.',
    image: '/images/islands/antiparos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Families', 'Nature Enthusiasts']
  },
  {
    id: 'serifos',
    name: 'Serifos',
    description: 'Discover the rugged beauty and pristine beaches of Serifos.',
    image: '/images/islands/serifos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Beach Lovers', 'Photographers']
  },
  {
    id: 'tinos',
    name: 'Tinos',
    description: 'Discover the spiritual heart of the Cyclades with its religious heritage and marble artistry.',
    image: '/images/islands/tinos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Religious Travelers', 'Art Lovers', 'Culture Enthusiasts']
  },
  {
    id: 'andros',
    name: 'Andros',
    description: 'Discover the greenest island of the Cyclades.',
    image: '/images/islands/andros.jpg',
    weather: {
      summer: 'Warm and pleasant with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Weekend Travelers']
  },
  {
    id: 'donousa',
    name: 'Donousa',
    description: 'Experience the untouched beauty of this Small Cyclades gem.',
    image: '/images/islands/donousa.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  },
  {
    id: 'thirasia',
    name: 'Thirasia',
    description: 'Discover Santorini\'s quiet sister island with authentic village life and stunning caldera views.',
    image: '/images/islands/thirasia.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Photographers', 'Culture Enthusiasts']
  }
];

export const allPorts = [
  ...mainPorts,
  ...cyclades.flatMap(island => island.ports || [])
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
