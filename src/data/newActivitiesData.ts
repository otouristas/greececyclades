import { Activity, ActivityCategory, ActivityDifficulty } from '../types/activity';

const activities: Activity[] = [
  // Santorini Activities
  {
    id: 'santorini-wine-tour',
    title: 'Santorini Wine Tasting & Vineyard Tour',
    slug: 'santorini-wine-tour',
    shortDescription: 'Discover Santorini\'s unique wine heritage with visits to traditional wineries and volcanic vineyards.',
    description: 'Experience the unique wine culture of Santorini on this comprehensive wine tour. Visit three of the island\'s most prestigious wineries and learn about the unique viticulture methods that have been practiced here for centuries. Discover how Santorini\'s volcanic soil and special "kouloura" vine-training system create distinctive wines, especially the famous Assyrtiko variety.',
    location: 'Various locations in Santorini',
    island: 'Santorini',
    duration: '4.5 hours',
    price: {
      amount: 135,
      currency: 'EUR',
      display: '€135'
    },
    included: [
      'Hotel pickup and drop-off',
      'Expert sommelier guide',
      'Wine tasting at three wineries',
      'Local cheese and snack platters',
      'All transportation between wineries',
      'Detailed wine guide booklet',
      'Bottled water'
    ],
    notIncluded: [
      'Additional food and beverages',
      'Wine bottle purchases',
      'Gratuities',
      'Personal expenses'
    ],
    highlights: [
      'Visit three prestigious Santorini wineries',
      'Professional tasting of 12-15 different wines',
      'Learn about unique volcanic viticulture',
      'Explore traditional "kouloura" vineyards',
      'Pair wines with local delicacies',
      'Small group experience (max 8 participants)',
      'Stunning caldera views from vineyards'
    ],
    images: {
      main: '/images/activities/santorini-wine-main.jpg',
      gallery: [
        '/images/activities/santorini-wine-1.jpg',
        '/images/activities/santorini-wine-2.jpg',
        '/images/activities/santorini-wine-3.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'March to November',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start time',
    meetingPoint: 'Your Santorini hotel or agreed meeting point',
    requirements: [
      'Must be 18 or older to participate',
      'Comfortable walking shoes recommended',
      'Bring sunscreen and hat for vineyard visits',
      'Bring valid ID'
    ],
    tags: ['wine', 'food', 'culture', 'tasting', 'vineyard'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Wine tasting glasses',
      'Tasting guide booklet',
      'Bottled water'
    ],
    startTimes: ['10:00', '15:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely fantastic wine tour! Our sommelier was incredibly knowledgeable and the selection of wineries was perfect.'
      },
      {
        author: 'James P.',
        rating: 5,
        date: '2024-01-10',
        comment: 'Great experience learning about Santorini\'s unique wine-making methods. The tastings were generous and the local food pairings were excellent.'
      }
    ]
  },
  {
    id: 'oia-sunset',
    title: 'Oia Sunset & Photography Tour',
    slug: 'oia-sunset',
    shortDescription: 'Capture the world-famous Oia sunset and learn photography techniques from a professional.',
    description: 'Join us for an unforgettable evening photographing one of the world\'s most famous sunsets in Oia, Santorini. Led by a professional photographer, you\'ll learn composition techniques while exploring the most photogenic spots in this picturesque village.',
    location: 'Oia Village',
    island: 'Santorini',
    duration: '3 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'Professional photography guide',
      'Photography tips and techniques',
      'Best viewpoint access',
      'Digital photo guide',
      'Bottled water'
    ],
    notIncluded: [
      'Camera equipment',
      'Hotel transfers',
      'Food and additional beverages',
      'Gratuities'
    ],
    highlights: [
      'Photograph the famous Oia sunset',
      'Learn from a professional photographer',
      'Visit the best photography locations',
      'Small group size for personal attention',
      'Take home stunning sunset photos'
    ],
    images: {
      main: '/images/activities/oia-sunset-main.jpg',
      gallery: [
        '/images/activities/oia-sunset-1.jpg',
        '/images/activities/oia-sunset-2.jpg',
        '/images/activities/oia-sunset-3.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 6,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Oia Bus Terminal',
    requirements: [
      'Bring your own camera',
      'Comfortable walking shoes',
      'Light jacket for evening',
      'Basic photography knowledge helpful but not required'
    ],
    tags: ['photography', 'sunset', 'cultural', 'sightseeing'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Photography guide booklet',
      'Bottled water'
    ],
    startTimes: ['17:00', '17:30'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Michael R.',
        rating: 5,
        date: '2024-01-12',
        comment: 'Amazing experience! Got the best sunset photos I\'ve ever taken.'
      }
    ]
  },
  {
    id: 'red-beach-snorkeling',
    title: 'Red Beach Snorkeling Adventure',
    slug: 'red-beach-snorkeling',
    shortDescription: 'Explore the underwater world of Santorini\'s famous Red Beach.',
    description: 'Discover the vibrant marine life and unique volcanic formations at Santorini\'s iconic Red Beach. This guided snorkeling tour takes you through crystal-clear waters to observe colorful fish, sea caves, and volcanic formations.',
    location: 'Red Beach, Akrotiri',
    island: 'Santorini',
    duration: '3 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Professional snorkeling guide',
      'Quality snorkeling equipment',
      'Wetsuit if needed',
      'Safety briefing',
      'Underwater photos',
      'Light refreshments'
    ],
    notIncluded: [
      'Hotel transfers',
      'Personal items',
      'Gratuities'
    ],
    highlights: [
      'Snorkel at the famous Red Beach',
      'See unique volcanic formations',
      'Spot Mediterranean marine life',
      'Professional underwater photos',
      'Small group experience'
    ],
    images: {
      main: '/images/activities/red-beach-main.jpg',
      gallery: [
        '/images/activities/red-beach-1.jpg',
        '/images/activities/red-beach-2.jpg',
        '/images/activities/red-beach-3.jpg'
      ]
    },
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'May to October',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Red Beach parking area',
    requirements: [
      'Basic swimming ability required',
      'Suitable for ages 8 and up',
      'Bring swimwear and towel',
      'Sunscreen recommended'
    ],
    tags: ['snorkeling', 'beach', 'swimming', 'marine-life'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Snorkeling gear',
      'Wetsuit',
      'Underwater camera',
      'Safety equipment'
    ],
    startTimes: ['09:30', '14:30'],
    rating: {
      overall: 4.7,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Lisa K.',
        rating: 5,
        date: '2024-01-08',
        comment: 'Great snorkeling experience! The water was crystal clear and we saw lots of fish.'
      }
    ]
  },
  {
    id: 'santorini-cooking',
    title: 'Traditional Santorini Cooking Class',
    slug: 'santorini-cooking',
    shortDescription: 'Learn to cook authentic Santorinian dishes in a traditional setting with local ingredients.',
    description: 'Immerse yourself in the culinary traditions of Santorini with our hands-on cooking class. Learn traditional recipes in a local home, using fresh ingredients from the island\'s volcanic soil. Our experienced local chef will guide you through traditional recipes passed down through generations.',
    location: 'Megalochori Village',
    island: 'Santorini',
    duration: '4 hours',
    price: {
      amount: 89,
      currency: 'EUR',
      display: '€89'
    },
    included: [
      'Cooking class with professional chef',
      'All ingredients and equipment',
      'Wine tasting',
      'Recipe booklet',
      'Full meal of prepared dishes',
      'Certificate of completion'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional beverages',
      'Gratuities'
    ],
    highlights: [
      'Cook traditional Santorinian dishes',
      'Learn about local ingredients',
      'Wine pairing session',
      'Enjoy your creations for lunch',
      'Take home recipe booklet',
      'Small group experience'
    ],
    images: {
      main: '/images/activities/santorini-cooking-main.jpg',
      gallery: [
        '/images/activities/santorini-cooking-1.jpg',
        '/images/activities/santorini-cooking-2.jpg',
        '/images/activities/santorini-cooking-3.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Megalochori Village Square',
    requirements: [
      'No cooking experience required',
      'Comfortable shoes',
      'Bring your appetite',
      'Notify of any dietary restrictions'
    ],
    tags: ['cooking', 'food', 'wine', 'cultural'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Cooking utensils',
      'Apron',
      'Recipe booklet',
      'Certificate'
    ],
    startTimes: ['10:00', '16:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Rachel H.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing experience! Learned so much about local cuisine and the chef was wonderful.'
      }
    ]
  },
  {
    id: 'fira-cable-car',
    title: 'Fira Cable Car & Old Port Experience',
    slug: 'fira-cable-car',
    shortDescription: 'Enjoy breathtaking views of the caldera while descending to the Old Port via cable car.',
    description: 'Take a scenic ride on the Fira Cable Car for stunning views of the caldera and volcano. Descend to the Old Port where you can explore traditional boats, seaside tavernas, and enjoy optional activities like swimming or boat tours.',
    location: 'Fira',
    island: 'Santorini',
    duration: '2 hours',
    price: {
      amount: 35,
      currency: 'EUR',
      display: '€35'
    },
    included: [
      'Round-trip cable car tickets',
      'Guide at the Old Port',
      'Historical information',
      'Photo opportunities',
      'Map of the port area'
    ],
    notIncluded: [
      'Food and drinks',
      'Additional activities at the port',
      'Gratuities',
      'Hotel transfers'
    ],
    highlights: [
      'Panoramic caldera views',
      'Historic Old Port exploration',
      'Photo opportunities',
      'Optional swimming',
      'Local guide insights'
    ],
    images: {
      main: '/images/activities/fira-cable-car-main.jpg',
      gallery: [
        '/images/activities/fira-cable-car-1.jpg',
        '/images/activities/fira-cable-car-2.jpg',
        '/images/activities/fira-cable-car-3.jpg'
      ]
    },
    category: ActivityCategory.Sightseeing,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 1,
    maxParticipants: 15,
    bookingNotice: 'No advance booking required',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Fira Cable Car Station',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Camera recommended',
      'Swimwear (if planning to swim)'
    ],
    tags: ['cable-car', 'views', 'old-port', 'photography'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Informational brochure',
      'Port area map'
    ],
    startTimes: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    rating: {
      overall: 4.6,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'David L.',
        rating: 5,
        date: '2024-01-10',
        comment: 'The views from the cable car were incredible! Great way to see the caldera.'
      }
    ]
  },
  {
    id: 'delos-day-trip',
    title: 'Delos Ancient Island Day Trip',
    slug: 'delos-day-trip',
    shortDescription: 'Explore the sacred island of Delos, birthplace of Apollo and Artemis.',
    description: 'Journey to the UNESCO World Heritage site of Delos, one of the most important archaeological sites in Greece. Discover ancient temples, houses, and theaters while learning about Greek mythology and history from our expert guide.',
    location: 'Delos Island (from Mykonos)',
    island: 'Mykonos',
    duration: '6 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Return boat transfer to Delos',
      'Professional archaeologist guide',
      'Entrance fees',
      'Guided tour',
      'Information booklet',
      'Audio guide system'
    ],
    notIncluded: [
      'Hotel transfers',
      'Food and drinks',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Visit UNESCO World Heritage site',
      'Expert archaeologist guide',
      'See ancient temples and theaters',
      'Learn about Greek mythology',
      'Photo opportunities',
      'Museum visit included'
    ],
    images: {
      main: '/images/activities/delos-main.jpg',
      gallery: [
        '/images/activities/delos-1.jpg',
        '/images/activities/delos-2.jpg',
        '/images/activities/delos-3.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'April to October',
    minParticipants: 4,
    maxParticipants: 20,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Mykonos Old Port',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Water bottle',
      'Hat recommended'
    ],
    tags: ['archaeology', 'history', 'culture', 'unesco'],
    languages: ['English', 'Greek', 'French', 'German'],
    providedEquipment: [
      'Audio guide system',
      'Information booklet',
      'Site map'
    ],
    startTimes: ['09:00', '10:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Catherine P.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Fascinating tour with an incredibly knowledgeable guide. The ruins are spectacular!'
      }
    ]
  },
  {
    id: 'paros-sailing',
    title: 'Paros Sailing Adventure',
    slug: 'paros-sailing',
    shortDescription: 'Set sail around Paros and discover hidden coves, pristine beaches, and crystal-clear waters.',
    description: 'Embark on an unforgettable sailing adventure around the beautiful island of Paros. Cruise along the coastline, discover secluded beaches, and swim in crystal-clear waters. Perfect for both experienced sailors and first-timers, this tour offers a unique perspective of the island\'s stunning coastline and neighboring islets.',
    location: 'Parikia Port, Paros',
    island: 'Paros',
    duration: '8 hours',
    price: {
      amount: 140,
      currency: 'EUR',
      display: '€140'
    },
    included: [
      'Experienced skipper and crew',
      'Safety equipment',
      'Snorkeling gear',
      'Mediterranean lunch',
      'Water, wine, and soft drinks',
      'Towels',
      'Swimming stops'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional alcoholic beverages',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Sail around Paros\'s coastline',
      'Swim in secluded bays',
      'Snorkel in crystal-clear waters',
      'Visit hidden beaches',
      'Enjoy fresh Mediterranean lunch',
      'Small group experience',
      'Sunset views (afternoon tours)'
    ],
    images: {
      main: '/images/activities/paros-sailing-main.jpg',
      gallery: [
        '/images/activities/paros-sailing-1.jpg',
        '/images/activities/paros-sailing-2.jpg',
        '/images/activities/paros-sailing-3.jpg',
        '/images/activities/paros-sailing-4.jpg'
      ]
    },
    category: ActivityCategory.Water,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'May to October',
    minParticipants: 4,
    maxParticipants: 10,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Parikia Port Main Dock',
    requirements: [
      'Swimming ability required',
      'Suitable for all fitness levels',
      'Not recommended for pregnant women',
      'Bring swimwear and sunscreen'
    ],
    tags: ['sailing', 'swimming', 'snorkeling', 'beach', 'water sports'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Life jackets',
      'Snorkeling gear',
      'Towels',
      'Safety equipment'
    ],
    startTimes: ['09:30', '14:30'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Thomas L.',
        rating: 5,
        date: '2024-11-20',
        comment: 'Incredible day out! The crew was fantastic and the swimming spots were perfect.'
      },
      {
        author: 'Maria K.',
        rating: 5,
        date: '2024-11-15',
        comment: 'Best day of our holiday! The lunch was delicious and the sailing was so peaceful.'
      },
      {
        author: 'David R.',
        rating: 4,
        date: '2024-11-10',
        comment: 'Great experience with knowledgeable crew. Would highly recommend!'
      }
    ]
  },
  {
    id: 'mykonos-beach-hopping',
    title: 'Mykonos Beach Hopping Tour',
    slug: 'mykonos-beach-hopping',
    shortDescription: 'Visit the most beautiful beaches of Mykonos in one day.',
    description: 'Experience the best beaches of Mykonos on this comprehensive beach-hopping tour. Visit famous beaches like Paradise, Super Paradise, and Elia, each with its own unique character and charm. Enjoy swimming, sunbathing, and water sports at each location.',
    location: 'Various Mykonos Beaches',
    island: 'Mykonos',
    duration: '6 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Transportation between beaches',
      'Professional guide',
      'Beach equipment (umbrellas, chairs)',
      'Light refreshments',
      'Water sports equipment',
      'Snacks and drinks'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Additional water sports activities',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Visit 4-5 famous Mykonos beaches',
      'Swimming and sunbathing time',
      'Water sports opportunities',
      'Local guide insights',
      'Beautiful photo opportunities'
    ],
    images: {
      main: '/images/activities/mykonos-beaches-main.jpg',
      gallery: [
        '/images/activities/mykonos-beaches-1.jpg',
        '/images/activities/mykonos-beaches-2.jpg',
        '/images/activities/mykonos-beaches-3.jpg'
      ]
    },
    category: ActivityCategory.BeachLife,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'June to September',
    minParticipants: 4,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Mykonos Town Bus Station',
    requirements: [
      'Swimwear and towel',
      'Sunscreen',
      'Hat and sunglasses',
      'Comfortable footwear'
    ],
    tags: ['beach', 'swimming', 'water-sports', 'sunbathing'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Beach umbrellas',
      'Beach chairs',
      'Snorkeling equipment',
      'Cooler with refreshments'
    ],
    startTimes: ['09:30', '10:30'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Tom B.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Perfect way to see all the best beaches in one day!'
      }
    ]
  },
  {
    id: 'mykonos-windmills-tour',
    title: 'Mykonos Windmills Cultural Tour',
    slug: 'mykonos-windmills-tour',
    shortDescription: 'Discover the iconic windmills of Mykonos and their historical significance.',
    description: 'Explore the famous windmills of Mykonos and learn about their crucial role in the island\'s history. This cultural tour takes you through the history of these iconic landmarks, their function in grain production, and their significance to the island\'s economy through the centuries.',
    location: 'Mykonos Town',
    island: 'Mykonos',
    duration: '2.5 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Expert local guide',
      'Windmill interior visit',
      'Historical presentation',
      'Photo opportunities',
      'Traditional Greek coffee or refreshment'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional food and drinks',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Visit the iconic Kato Mili windmills',
      'Learn about traditional milling methods',
      'Spectacular photo opportunities',
      'Historical insights from expert guide',
      'Traditional Greek refreshments'
    ],
    images: {
      main: '/images/activities/mykonos-windmills-main.jpg',
      gallery: [
        '/images/activities/mykonos-windmills-1.jpg',
        '/images/activities/mykonos-windmills-2.jpg',
        '/images/activities/mykonos-windmills-3.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Little Venice Square',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Camera recommended',
      'Light jacket (for evening tours)'
    ],
    tags: ['cultural', 'history', 'photography', 'walking-tour'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Audio guide system',
      'Information booklet',
      'Bottled water'
    ],
    startTimes: ['10:00', '16:00'],
    rating: {
      overall: 4.7,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Emma S.',
        rating: 5,
        date: '2024-01-11',
        comment: 'Fascinating tour with an incredibly knowledgeable guide. The windmills are even more impressive up close!'
      }
    ]
  },
  {
    id: 'antiparos-cave',
    title: 'Antiparos Cave Exploration',
    slug: 'antiparos-cave',
    shortDescription: 'Explore one of the oldest caves in Greece with stunning stalactites and stalagmites.',
    description: 'Venture into the spectacular Antiparos Cave, one of the oldest and most beautiful caves in Greece. Descend 411 steps into this natural wonder to discover impressive stalactites and stalagmites, some over 45 million years old. Learn about the cave\'s fascinating history and the famous visitors who left their marks here.',
    location: 'Antiparos Island',
    island: 'Antiparos',
    duration: '3 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Professional cave guide',
      'Entrance fees',
      'Safety equipment',
      'Historical information',
      'Guided tour',
      'Photo opportunities'
    ],
    notIncluded: [
      'Transportation to Antiparos',
      'Food and drinks',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Explore ancient cave formations',
      'See million-year-old stalactites',
      'Learn about cave history',
      'Professional guide insights',
      'Amazing photo opportunities',
      'Historical inscriptions viewing'
    ],
    images: {
      main: '/images/activities/antiparos-cave-main.jpg',
      gallery: [
        '/images/activities/antiparos-cave-1.jpg',
        '/images/activities/antiparos-cave-2.jpg',
        '/images/activities/antiparos-cave-3.jpg'
      ]
    },
    category: ActivityCategory.Adventure,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 15,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Antiparos Cave Entrance',
    requirements: [
      'Good physical condition',
      'Comfortable walking shoes',
      'Light jacket (cave is cool)',
      'Not suitable for those with mobility issues'
    ],
    tags: ['cave', 'nature', 'history', 'geology'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Safety helmet',
      'Flashlight',
      'Information booklet'
    ],
    startTimes: ['10:00', '12:00', '14:00'],
    rating: {
      overall: 4.7,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Peter K.',
        rating: 5,
        date: '2024-01-13',
        comment: 'Incredible cave system! The formations are breathtaking and our guide was very knowledgeable.'
      }
    ]
  },
  {
    id: 'antiparos-hiking',
    title: 'Antiparos Coastal Hiking Trail',
    slug: 'antiparos-hiking',
    shortDescription: 'Hike along the beautiful coastline of Antiparos with stunning sea views.',
    description: 'Experience the natural beauty of Antiparos on this scenic coastal hiking trail. Walk along well-marked paths offering spectacular views of the Aegean Sea, hidden coves, and neighboring islands. Visit secluded beaches and discover local flora and fauna with our experienced guide.',
    location: 'Antiparos Island',
    island: 'Antiparos',
    duration: '4 hours',
    price: {
      amount: 40,
      currency: 'EUR',
      display: '€40'
    },
    included: [
      'Professional hiking guide',
      'Trail map',
      'Bottled water',
      'Snacks',
      'Walking poles',
      'First aid kit'
    ],
    notIncluded: [
      'Transportation to Antiparos',
      'Additional food and drinks',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Stunning coastal views',
      'Hidden beaches discovery',
      'Local flora and fauna',
      'Photography opportunities',
      'Swimming breaks possible',
      'Small group experience'
    ],
    images: {
      main: '/images/activities/antiparos-hiking-main.jpg',
      gallery: [
        '/images/activities/antiparos-hiking-1.jpg',
        '/images/activities/antiparos-hiking-2.jpg',
        '/images/activities/antiparos-hiking-3.jpg'
      ]
    },
    category: ActivityCategory.Adventure,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'March to November',
    minParticipants: 2,
    maxParticipants: 10,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Antiparos Port',
    requirements: [
      'Good physical condition',
      'Hiking shoes required',
      'Sun protection',
      'Water bottle'
    ],
    tags: ['hiking', 'nature', 'coastal', 'outdoors'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Walking poles',
      'Trail map',
      'First aid kit',
      'Water and snacks'
    ],
    startTimes: ['09:00', '16:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Sophie M.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Beautiful coastal walk with amazing views. Our guide was very knowledgeable about local plants and history.'
      }
    ]
  },
  {
    id: 'zeus-cave-hike',
    title: 'Mount Zeus Cave Hiking Adventure',
    slug: 'zeus-cave-hike',
    shortDescription: 'Hike to the mythical Cave of Zeus on Mount Zas, the highest peak in the Cyclades.',
    description: 'Embark on a fascinating hiking adventure to the legendary Cave of Zeus on Mount Zas (Zeus), the highest point in the Cyclades. According to mythology, this cave is where Zeus spent his youth. The trail offers breathtaking views of Naxos and surrounding islands, while your expert guide shares stories of ancient mythology and local history. The hike combines natural beauty with rich cultural heritage.',
    location: 'Mount Zas (Zeus), Naxos',
    island: 'Naxos',
    duration: '5 hours',
    price: {
      amount: 55,
      currency: 'EUR',
      display: '€55'
    },
    included: [
      'Professional hiking guide',
      'Safety equipment',
      'Walking poles',
      'Bottled water',
      'Energy snacks',
      'First aid kit',
      'Cave entrance fee'
    ],
    notIncluded: [
      'Hotel transfers',
      'Hiking boots',
      'Personal equipment',
      'Additional food',
      'Gratuities'
    ],
    highlights: [
      'Visit the mythical Zeus Cave',
      'Reach the highest point in Cyclades',
      'Panoramic island views',
      'Learn about local mythology',
      'Professional guide expertise',
      'Unique geological formations',
      'Photography opportunities'
    ],
    images: {
      main: '/images/activities/zeus-cave-main.jpg',
      gallery: [
        '/images/activities/zeus-cave-1.jpg',
        '/images/activities/zeus-cave-2.jpg',
        '/images/activities/zeus-cave-3.jpg',
        '/images/activities/zeus-cave-4.jpg'
      ]
    },
    category: ActivityCategory.Adventure,
    difficulty: ActivityDifficulty.Challenging,
    bestTime: 'April to October',
    minParticipants: 2,
    maxParticipants: 10,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Filoti Village Square',
    requirements: [
      'Good physical condition required',
      'Proper hiking boots mandatory',
      'Minimum age: 12 years',
      'Not suitable for pregnant women',
      'Bring water and sun protection',
      'Weather appropriate clothing'
    ],
    tags: ['hiking', 'cave', 'mythology', 'nature', 'adventure'],
    languages: ['English', 'Greek', 'German'],
    providedEquipment: [
      'Walking poles',
      'Safety equipment',
      'First aid kit',
      'Maps',
      'Emergency beacon'
    ],
    startTimes: ['08:00', '09:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Andreas M.',
        rating: 5,
        date: '2024-11-19',
        comment: 'Incredible hike with amazing views! Our guide was very knowledgeable about the mythology and local history.'
      },
      {
        author: 'Laura S.',
        rating: 5,
        date: '2024-11-14',
        comment: 'Challenging but totally worth it. The cave was fascinating and the views from the top were spectacular.'
      },
      {
        author: 'Richard K.',
        rating: 4,
        date: '2024-11-09',
        comment: 'Great experience with a well-informed guide. Make sure to bring good hiking boots - you\'ll need them!'
      }
    ]
  },
  {
    id: 'sifnos-cooking-class',
    title: 'Traditional Sifnos Cooking Class',
    slug: 'sifnos-cooking-class',
    shortDescription: 'Learn authentic Sifnian recipes in a traditional setting.',
    description: 'Join us for an authentic cooking experience in Sifnos, an island renowned for its culinary heritage. Learn traditional recipes in a local home, using clay pots and traditional methods. Discover the secrets of Sifnian cuisine, known for its unique flavors and cooking techniques.',
    location: 'Artemonas Village',
    island: 'Sifnos',
    duration: '5 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Cooking class with local chef',
      'All ingredients',
      'Traditional clay pot demonstration',
      'Recipe booklet',
      'Full meal with wine',
      'Local cheese tasting'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional beverages',
      'Gratuities'
    ],
    highlights: [
      'Cook in traditional clay pots',
      'Learn authentic recipes',
      'Local ingredient knowledge',
      'Wine pairing',
      'Small group experience',
      'Take home recipes'
    ],
    images: {
      main: '/images/activities/sifnos-cooking-main.jpg',
      gallery: [
        '/images/activities/sifnos-cooking-1.jpg',
        '/images/activities/sifnos-cooking-2.jpg',
        '/images/activities/sifnos-cooking-3.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Artemonas Village Square',
    requirements: [
      'No cooking experience needed',
      'Comfortable clothing',
      'Appetite for learning',
      'Interest in local cuisine'
    ],
    tags: ['cooking', 'food', 'cultural', 'traditional'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Apron',
      'Cooking utensils',
      'Recipe booklet',
      'All ingredients'
    ],
    startTimes: ['10:00', '16:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Maria L.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Amazing experience! The clay pot cooking was fascinating and the recipes were delicious.'
      }
    ]
  },
  {
    id: 'sifnos-churches',
    title: 'Sifnos Churches & Monasteries Tour',
    slug: 'sifnos-churches',
    shortDescription: 'Discover the spiritual heritage of Sifnos through its historic churches and monasteries.',
    description: 'Embark on a spiritual journey through Sifnos\'s most significant religious sites. Visit the iconic Chrysopigi Monastery, perched dramatically on a rocky outcrop, explore the historic Panagia Poulati, and discover numerous traditional chapels dotting the landscape. Learn about the island\'s rich religious history, architectural styles, and local traditions.',
    location: 'Various locations in Sifnos',
    island: 'Sifnos',
    duration: '6 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Expert local guide',
      'Transportation between sites',
      'Entrance fees',
      'Traditional Greek coffee break',
      'Information booklet',
      'Photo opportunities',
      'Bottled water'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Lunch',
      'Personal expenses',
      'Gratuities',
      'Professional photography permits'
    ],
    highlights: [
      'Visit Chrysopigi Monastery',
      'Explore Panagia Poulati',
      'See traditional Cycladic chapels',
      'Learn about Byzantine architecture',
      'Discover local religious traditions',
      'Panoramic island views'
    ],
    images: {
      main: '/images/activities/sifnos-churches-main.jpg',
      gallery: [
        '/images/activities/sifnos-churches-1.jpg',
        '/images/activities/sifnos-churches-2.jpg',
        '/images/activities/sifnos-churches-3.jpg',
        '/images/activities/sifnos-churches-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Apollonia Central Square',
    requirements: [
      'Modest dress required (shoulders and knees covered)',
      'Comfortable walking shoes',
      'Sun protection',
      'Respect for religious sites',
      'Some uphill walking required'
    ],
    tags: ['churches', 'cultural', 'religious', 'history', 'architecture'],
    languages: ['English', 'Greek', 'French'],
    providedEquipment: [
      'Information booklet',
      'Head coverings if needed',
      'Bottled water',
      'Maps'
    ],
    startTimes: ['09:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Patricia L.',
        rating: 5,
        date: '2024-11-16',
        comment: 'Fascinating tour! The churches are beautiful and our guide was incredibly knowledgeable about their history.'
      },
      {
        author: 'George K.',
        rating: 5,
        date: '2024-11-12',
        comment: 'The Chrysopigi Monastery was breathtaking. A must-do tour for anyone interested in architecture or history.'
      },
      {
        author: 'Marie C.',
        rating: 4,
        date: '2024-11-07',
        comment: 'Very informative tour with stunning views. The traditional coffee break was a nice touch.'
      }
    ]
  },
  {
    id: 'naxos-hiking',
    title: 'Naxos Mountain Villages Hiking Tour',
    slug: 'naxos-hiking',
    shortDescription: 'Hike through traditional mountain villages of Naxos.',
    description: 'Discover the authentic heart of Naxos on this scenic hiking tour through traditional mountain villages. Walk ancient marble paths connecting historic settlements, visit Byzantine churches, and experience local life in the villages of Halki, Filoti, and Apiranthos.',
    location: 'Central Naxos',
    island: 'Naxos',
    duration: '7 hours',
    price: {
      amount: 70,
      currency: 'EUR',
      display: '€70'
    },
    included: [
      'Professional hiking guide',
      'Transportation from Naxos town',
      'Traditional lunch',
      'Water and snacks',
      'Village tours',
      'Local product tastings'
    ],
    notIncluded: [
      'Additional food and drinks',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Visit three mountain villages',
      'Ancient marble paths',
      'Byzantine churches',
      'Local food tasting',
      'Cultural insights',
      'Beautiful landscapes'
    ],
    images: {
      main: '/images/activities/naxos-hiking-main.jpg',
      gallery: [
        '/images/activities/naxos-hiking-1.jpg',
        '/images/activities/naxos-hiking-2.jpg',
        '/images/activities/naxos-hiking-3.jpg'
      ]
    },
    category: ActivityCategory.Adventure,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'March to November',
    minParticipants: 2,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Naxos Town or hotel pickup',
    requirements: [
      'Good physical condition',
      'Hiking shoes required',
      'Sun protection',
      'Water bottle'
    ],
    tags: ['hiking', 'villages', 'culture', 'nature'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Walking poles',
      'First aid kit',
      'Maps',
      'Water and snacks'
    ],
    startTimes: ['08:30'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Anna P.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Wonderful way to experience authentic Naxos. The villages were charming and the views spectacular.'
      }
    ]
  },
  {
    id: 'mykonos-town-tour',
    title: 'Mykonos Town Walking Tour',
    slug: 'mykonos-town-tour',
    shortDescription: 'Discover the charm and history of Mykonos Town with a knowledgeable local guide.',
    description: 'Uncover the secrets of Mykonos Town on this fascinating walking tour. Wander through the iconic narrow streets, discover hidden churches, and learn about the island\'s rich history and culture. Visit Little Venice, see the famous windmills, explore the old harbor, and hear captivating stories about the island\'s past and present from your expert local guide.',
    location: 'Mykonos Town',
    island: 'Mykonos',
    duration: '3 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Professional licensed guide',
      'Historical commentary',
      'Map of Mykonos Town',
      'Bottled water',
      'Small traditional treat',
      'Photo opportunities',
      'Local tips and recommendations'
    ],
    notIncluded: [
      'Hotel transfers',
      'Food and additional beverages',
      'Museum entrance fees',
      'Personal expenses',
      'Gratuities'
    ],
    highlights: [
      'Explore Little Venice',
      'Visit famous windmills',
      'Discover hidden churches',
      'Walk through narrow streets',
      'Learn local history',
      'See the old harbor',
      'Photo opportunities'
    ],
    images: {
      main: '/images/activities/mykonos-town-main.jpg',
      gallery: [
        '/images/activities/mykonos-town-1.jpg',
        '/images/activities/mykonos-town-2.jpg',
        '/images/activities/mykonos-town-3.jpg',
        '/images/activities/mykonos-town-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'April to October',
    minParticipants: 2,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Mykonos Town Hall Square',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Water bottle',
      'Camera recommended',
      'Suitable for all ages'
    ],
    tags: ['walking tour', 'culture', 'history', 'photography', 'sightseeing'],
    languages: ['English', 'Greek', 'French', 'Italian'],
    providedEquipment: [
      'Town map',
      'Information booklet',
      'Bottled water',
      'Audio system for large groups'
    ],
    startTimes: ['09:30', '17:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Emma L.',
        rating: 5,
        date: '2024-11-20',
        comment: 'Fantastic tour! Our guide was so knowledgeable and showed us places we would never have found on our own.'
      },
      {
        author: 'Marco B.',
        rating: 5,
        date: '2024-11-15',
        comment: 'Perfect introduction to Mykonos Town. The stories about the island\'s history were fascinating.'
      },
      {
        author: 'Sarah K.',
        rating: 4,
        date: '2024-11-10',
        comment: 'Great way to explore the town. The guide gave excellent recommendations for restaurants and shops.'
      }
    ]
  },
  {
    id: 'jackie-o-beach',
    title: 'Jackie O Beach Club Experience',
    slug: 'jackie-o-beach',
    shortDescription: 'Enjoy a luxurious day at the famous Jackie O Beach Club.',
    description: 'Experience the ultimate in beach luxury at the renowned Jackie O Beach Club. Enjoy premium sunbeds, world-class service, gourmet dining, and spectacular sunset views. Perfect for those seeking a sophisticated beach experience.',
    location: 'Super Paradise Beach',
    island: 'Mykonos',
    duration: 'Full day',
    price: {
      amount: 150,
      currency: 'EUR',
      display: '€150'
    },
    included: [
      'VIP sunbed reservation',
      'Welcome drink',
      'Beach towels',
      'Umbrella',
      'Concierge service',
      'Access to beach facilities'
    ],
    notIncluded: [
      'Food and additional drinks',
      'Transportation',
      'Spa services',
      'Water sports'
    ],
    highlights: [
      'Premium beachfront location',
      'Luxury sunbeds',
      'Gourmet restaurant access',
      'Swimming pool',
      'Sunset views',
      'World-class service'
    ],
    images: {
      main: '/images/activities/jackie-o-main.jpg',
      gallery: [
        '/images/activities/jackie-o-1.jpg',
        '/images/activities/jackie-o-2.jpg',
        '/images/activities/jackie-o-3.jpg'
      ]
    },
    category: ActivityCategory.BeachLife,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'May to September',
    minParticipants: 1,
    maxParticipants: 6,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Jackie O Beach Club entrance',
    requirements: [
      'Beach attire',
      'Sunscreen',
      'Credit card for extras',
      'Reservation confirmation'
    ],
    tags: ['beach-club', 'luxury', 'dining', 'swimming'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Beach towels',
      'Sunbeds',
      'Umbrellas'
    ],
    startTimes: ['10:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Michael S.',
        rating: 5,
        date: '2024-01-14',
        comment: 'Absolutely fabulous beach club experience. The service was impeccable and the setting is stunning.'
      }
    ]
  },
  {
    id: 'ekatontapiliani',
    title: 'Ekatontapiliani Church Tour',
    slug: 'ekatontapiliani',
    shortDescription: 'Explore the magnificent Byzantine Church of 100 Doors, one of Greece\'s most important religious monuments.',
    description: 'Discover the architectural and spiritual wonder of Ekatontapiliani, also known as the Church of 100 Doors. This remarkable Byzantine church complex, dating back to the 4th century, is one of the best-preserved Christian monuments in Greece. Learn about its fascinating history, admire the unique architecture, and explore its religious artifacts and icons.',
    location: 'Parikia, Paros',
    island: 'Paros',
    duration: '1.5 hours',
    price: {
      amount: 25,
      currency: 'EUR',
      display: '€25'
    },
    included: [
      'Professional licensed guide',
      'Entrance fees',
      'Guided tour in English',
      'Information booklet',
      'Access to all church areas',
      'Museum entrance'
    ],
    notIncluded: [
      'Hotel transfers',
      'Food and beverages',
      'Personal expenses',
      'Gratuities',
      'Photo permits (if required)'
    ],
    highlights: [
      'Visit one of Greece\'s oldest churches',
      'Learn about Byzantine architecture',
      'See ancient religious artifacts',
      'Explore the church museum',
      'Discover the legend of the 100 doors',
      'View rare Byzantine icons'
    ],
    images: {
      main: '/images/activities/ekatontapiliani-main.jpg',
      gallery: [
        '/images/activities/ekatontapiliani-1.jpg',
        '/images/activities/ekatontapiliani-2.jpg',
        '/images/activities/ekatontapiliani-3.jpg',
        '/images/activities/ekatontapiliani-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 15,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Ekatontapiliani Church Main Entrance',
    requirements: [
      'Modest dress required (shoulders and knees covered)',
      'Comfortable walking shoes',
      'Respect religious site rules',
      'No flash photography inside'
    ],
    tags: ['church', 'cultural', 'history', 'religious', 'architecture'],
    languages: ['English', 'Greek', 'French', 'German'],
    providedEquipment: [
      'Information booklet',
      'Audio guide (if requested)',
      'Head coverings (if needed)'
    ],
    startTimes: ['10:00', '12:00', '14:00', '16:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Christina P.',
        rating: 5,
        date: '2024-11-19',
        comment: 'Fascinating tour! The guide was incredibly knowledgeable about the church\'s history and architecture.'
      },
      {
        author: 'Robert M.',
        rating: 5,
        date: '2024-11-14',
        comment: 'A must-visit in Paros. The Byzantine architecture and history are remarkable.'
      },
      {
        author: 'Anna K.',
        rating: 4,
        date: '2024-11-08',
        comment: 'Very informative tour. The church is beautiful and the guide explained everything clearly.'
      }
    ]
  },
  {
    id: 'santorini-photo-tour',
    title: 'Santorini Photography Adventure Tour',
    slug: 'santorini-photo-tour',
    shortDescription: 'Capture the essence of Santorini through your lens with a professional photographer guide.',
    description: 'Embark on a photography journey through Santorini\'s most picturesque locations. From the blue-domed churches of Oia to the volcanic landscapes and traditional villages, you\'ll learn to capture the island\'s unique beauty through expert guidance. Perfect for both beginners and experienced photographers.',
    location: 'Multiple locations across Santorini',
    island: 'Santorini',
    duration: '5 hours',
    price: {
      amount: 120,
      currency: 'EUR',
      display: '€120'
    },
    included: [
      'Professional photography instructor',
      'Transportation between locations',
      'Photography workshop materials',
      'Location guide with best photo spots',
      'Bottled water',
      'Light snacks'
    ],
    notIncluded: [
      'Camera equipment',
      'Hotel pickup and drop-off',
      'Additional food and beverages',
      'Gratuities'
    ],
    highlights: [
      'Visit the most Instagram-worthy spots',
      'Learn professional photography techniques',
      'Capture stunning architecture and landscapes',
      'Small group size for personalized attention',
      'Access to hidden photo locations',
      'Expert tips on lighting and composition'
    ],
    images: {
      main: '/images/activities/santorini-photo-main.jpg',
      gallery: [
        '/images/activities/santorini-photo-1.jpg',
        '/images/activities/santorini-photo-2.jpg',
        '/images/activities/santorini-photo-3.jpg',
        '/images/activities/santorini-photo-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Early morning or late afternoon',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Fira Central Square',
    requirements: [
      'Any camera (DSLR, mirrorless, or smartphone)',
      'Comfortable walking shoes',
      'Sun protection',
      'Memory cards with sufficient storage'
    ],
    tags: ['photography', 'cultural', 'sightseeing', 'educational'],
    languages: ['English', 'Greek', 'French'],
    providedEquipment: [
      'Photography guide booklet',
      'Location map',
      'Bottled water',
      'Light snacks'
    ],
    startTimes: ['08:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-11-15',
        comment: 'Amazing experience! The guide knew all the best spots and helped me improve my photography skills significantly.'
      },
      {
        author: 'Michael P.',
        rating: 5,
        date: '2024-11-10',
        comment: 'Worth every penny! Got some incredible shots and learned so much about composition and lighting.'
      },
      {
        author: 'Elena K.',
        rating: 4,
        date: '2024-11-05',
        comment: 'Great tour with lots of useful tips. The guide was very knowledgeable and patient.'
      }
    ]
  },
  {
    id: 'mikri-vigla-kitesurfing',
    title: 'Mikri Vigla Kitesurfing Experience',
    slug: 'mikri-vigla-kitesurfing',
    shortDescription: 'Learn kitesurfing or improve your skills at one of the best spots in the Cyclades.',
    description: 'Experience the thrill of kitesurfing at Mikri Vigla, one of the most renowned kitesurfing destinations in the Cyclades. Whether you\'re a complete beginner or an experienced rider, our certified instructors will help you make the most of Naxos\'s perfect wind conditions. The unique location offers ideal conditions for both beginners and advanced kiters.',
    location: 'Mikri Vigla Beach, Naxos',
    island: 'Naxos',
    duration: '3 hours',
    price: {
      amount: 110,
      currency: 'EUR',
      display: '€110'
    },
    included: [
      'Professional IKO certified instructor',
      'All kitesurfing equipment',
      'Safety gear',
      'Insurance',
      'Theory lesson',
      'Beach assistance',
      'Storage for personal items'
    ],
    notIncluded: [
      'Hotel transfers',
      'Photos/videos (available for purchase)',
      'Personal insurance',
      'Food and drinks'
    ],
    highlights: [
      'Learn from certified instructors',
      'Perfect wind conditions',
      'Latest kitesurfing equipment',
      'Safe learning environment',
      'Beautiful beach location',
      'Suitable for all skill levels'
    ],
    images: {
      main: '/images/activities/mikri-vigla-main.jpg',
      gallery: [
        '/images/activities/mikri-vigla-1.jpg',
        '/images/activities/mikri-vigla-2.jpg',
        '/images/activities/mikri-vigla-3.jpg',
        '/images/activities/mikri-vigla-4.jpg'
      ]
    },
    category: ActivityCategory.Water,
    difficulty: ActivityDifficulty.Challenging,
    bestTime: 'June to September',
    minParticipants: 1,
    maxParticipants: 4,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Mikri Vigla Watersports Center',
    requirements: [
      'Swimming ability required',
      'Good physical condition',
      'Minimum age: 12 years',
      'Signed waiver required',
      'Bring swimwear and sunscreen',
      'Bring water shoes (recommended)'
    ],
    tags: ['kitesurfing', 'water sports', 'adventure', 'active', 'beach'],
    languages: ['English', 'Greek', 'German'],
    providedEquipment: [
      'Kite and board',
      'Harness',
      'Wetsuit if needed',
      'Safety equipment',
      'Storage locker'
    ],
    startTimes: ['09:00', '12:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Alex M.',
        rating: 5,
        date: '2024-11-18',
        comment: 'Amazing experience! The instructor was patient and professional. Got up on the board by the end of the lesson!'
      },
      {
        author: 'Sophie K.',
        rating: 5,
        date: '2024-11-12',
        comment: 'Perfect spot for learning kitesurfing. The wind conditions were ideal and the instruction was top-notch.'
      },
      {
        author: 'Marco R.',
        rating: 4,
        date: '2024-11-05',
        comment: 'Great equipment and very knowledgeable instructors. Will definitely come back for more lessons.'
      }
    ]
  },
  {
    id: 'pottery-workshop',
    title: 'Traditional Cycladic Pottery Workshop',
    slug: 'pottery-workshop',
    shortDescription: 'Learn the ancient art of Cycladic pottery in a hands-on workshop with a master potter.',
    description: 'Immerse yourself in the ancient art of Cycladic pottery in this hands-on workshop. Under the guidance of a master potter, learn traditional techniques that have been passed down through generations. Create your own pottery pieces using local clay while discovering the rich history of Cycladic ceramics. Perfect for both beginners and those with some pottery experience.',
    location: 'Sifnos Ceramics Studio',
    island: 'Sifnos',
    duration: '3 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Professional potter instruction',
      'All materials and tools',
      'Clay and glazes',
      'Apron and safety equipment',
      'Firing of your creations',
      'Shipping of finished pieces',
      'Light refreshments'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional materials',
      'Extra pieces beyond the first two',
      'Personal items',
      'Gratuities'
    ],
    highlights: [
      'Learn from a master potter',
      'Create your own pottery pieces',
      'Traditional techniques instruction',
      'Small group size for personal attention',
      'Take home your creations',
      'History of Cycladic pottery'
    ],
    images: {
      main: '/images/activities/pottery-workshop-main.jpg',
      gallery: [
        '/images/activities/pottery-workshop-1.jpg',
        '/images/activities/pottery-workshop-2.jpg',
        '/images/activities/pottery-workshop-3.jpg',
        '/images/activities/pottery-workshop-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Sifnos Traditional Pottery Studio',
    requirements: [
      'No experience necessary',
      'Wear comfortable clothes',
      'Bring closed-toe shoes',
      'Long hair must be tied back',
      'Children must be 8 or older'
    ],
    tags: ['pottery', 'art', 'cultural', 'crafts', 'traditional'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Clay and materials',
      'Pottery tools',
      'Aprons',
      'Safety equipment',
      'Firing service'
    ],
    startTimes: ['10:00', '14:00', '17:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Lisa M.',
        rating: 5,
        date: '2024-11-17',
        comment: 'Amazing experience! The instructor was patient and helpful. Love my finished pieces!'
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-11-13',
        comment: 'Great introduction to pottery. The historical context added so much to the experience.'
      },
      {
        author: 'Maria P.',
        rating: 4,
        date: '2024-11-08',
        comment: 'Wonderful workshop! Very hands-on and the instructor really knows their craft.'
      }
    ]
  },
  {
    id: 'antiparos-boat-tours',
    title: 'Antiparos Island Boat Tour',
    slug: 'antiparos-boat-tours',
    shortDescription: 'Explore the stunning coastline of Antiparos and its surrounding islands by boat.',
    description: 'Discover the hidden gems of Antiparos on this comprehensive boat tour. Cruise around the island\'s pristine coastline, explore secret caves and coves, and visit the uninhabited island of Despotiko with its ancient ruins. Enjoy swimming and snorkeling in crystal-clear waters, and marvel at the dramatic cliffs and rock formations that make this area unique.',
    location: 'Antiparos Port',
    island: 'Antiparos',
    duration: '7 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'Experienced captain and crew',
      'Safety equipment',
      'Snorkeling gear',
      'Mediterranean lunch',
      'Beverages (water, wine, soft drinks)',
      'Beach towels',
      'Historical commentary'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional activities',
      'Personal expenses',
      'Gratuities',
      'Professional photos'
    ],
    highlights: [
      'Visit Despotiko ancient site',
      'Swim in secluded bays',
      'Explore sea caves',
      'Snorkel in clear waters',
      'Traditional Greek lunch',
      'Small group experience',
      'Sunset views (afternoon tours)'
    ],
    images: {
      main: '/images/activities/antiparos-boat-main.jpg',
      gallery: [
        '/images/activities/antiparos-boat-1.jpg',
        '/images/activities/antiparos-boat-2.jpg',
        '/images/activities/antiparos-boat-3.jpg',
        '/images/activities/antiparos-boat-4.jpg'
      ]
    },
    category: ActivityCategory.Water,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'May to October',
    minParticipants: 4,
    maxParticipants: 12,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Antiparos Port Main Dock',
    requirements: [
      'Swimming ability recommended',
      'Suitable for all ages',
      'Not recommended for pregnant women',
      'Bring swimwear and sunscreen',
      'Comfortable shoes for walking'
    ],
    tags: ['boat tour', 'swimming', 'snorkeling', 'history', 'nature'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Life jackets',
      'Snorkeling gear',
      'Beach towels',
      'Safety equipment',
      'First aid kit'
    ],
    startTimes: ['09:30', '14:30'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'James H.',
        rating: 5,
        date: '2024-11-19',
        comment: 'Amazing day out! The caves were spectacular and the swimming spots were perfect.'
      },
      {
        author: 'Sofia P.',
        rating: 5,
        date: '2024-11-14',
        comment: 'Wonderful tour with a knowledgeable crew. The lunch was delicious and the sites were beautiful.'
      },
      {
        author: 'Michael R.',
        rating: 4,
        date: '2024-11-09',
        comment: 'Great experience exploring the coastline. The Despotiko ruins were fascinating.'
      }
    ]
  },
  {
    id: 'golden-beach-windsurfing',
    title: 'Golden Beach Windsurfing Experience',
    slug: 'golden-beach-windsurfing',
    shortDescription: 'Learn windsurfing or improve your skills at Paros\'s famous Golden Beach.',
    description: 'Experience the thrill of windsurfing at Golden Beach, one of the most renowned windsurfing spots in Greece. Whether you\'re a complete beginner or an experienced windsurfer, our certified instructors will help you make the most of Paros\'s perfect wind conditions. The long, shallow beach and consistent winds make it an ideal location for all skill levels.',
    location: 'Golden Beach (Chryssi Akti), Paros',
    island: 'Paros',
    duration: '3 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Professional windsurfing instructor',
      'Complete equipment rental',
      'Wetsuit if needed',
      'Insurance coverage',
      'Safety briefing',
      'Theory lesson',
      'Beach facilities access'
    ],
    notIncluded: [
      'Hotel transfers',
      'Photos/videos',
      'Personal insurance',
      'Food and drinks',
      'Additional equipment rental'
    ],
    highlights: [
      'Learn from certified instructors',
      'World-class windsurfing location',
      'Latest equipment provided',
      'Perfect wind conditions',
      'Beautiful beach setting',
      'All skill levels welcome',
      'Small group instruction'
    ],
    images: {
      main: '/images/activities/golden-beach-main.jpg',
      gallery: [
        '/images/activities/golden-beach-1.jpg',
        '/images/activities/golden-beach-2.jpg',
        '/images/activities/golden-beach-3.jpg',
        '/images/activities/golden-beach-4.jpg'
      ]
    },
    category: ActivityCategory.Water,
    difficulty: ActivityDifficulty.Moderate,
    bestTime: 'June to September',
    minParticipants: 1,
    maxParticipants: 6,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Golden Beach Watersports Center',
    requirements: [
      'Swimming ability required',
      'Basic fitness level',
      'Minimum age: 10 years',
      'Signed waiver required',
      'Bring swimwear and sunscreen',
      'Bring water shoes (recommended)'
    ],
    tags: ['windsurfing', 'water sports', 'beach', 'active', 'lessons'],
    languages: ['English', 'Greek', 'German'],
    providedEquipment: [
      'Windsurf board and sail',
      'Wetsuit',
      'Harness',
      'Life jacket',
      'Storage facilities'
    ],
    startTimes: ['09:00', '12:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Tom B.',
        rating: 5,
        date: '2024-11-18',
        comment: 'Excellent instruction! Started as a complete beginner and was up and riding by the end of the lesson.'
      },
      {
        author: 'Nina K.',
        rating: 5,
        date: '2024-11-13',
        comment: 'Perfect conditions and great equipment. The instructor was very patient and professional.'
      },
      {
        author: 'Peter M.',
        rating: 4,
        date: '2024-11-08',
        comment: 'Really enjoyed the lesson. Golden Beach is an amazing spot for windsurfing!'
      }
    ]
  },
  {
    id: 'naxos-temple-tour',
    title: 'Ancient Temples of Naxos Tour',
    slug: 'naxos-temple-tour',
    shortDescription: 'Explore the ancient temples and archaeological wonders of Naxos.',
    description: 'Discover the rich archaeological heritage of Naxos on this comprehensive temple tour. Visit the iconic Temple of Apollo (Portara), the ancient Temple of Demeter, and other significant archaeological sites. Learn about the island\'s important role in ancient Greek history and mythology from your expert guide while exploring these well-preserved ruins and monuments.',
    location: 'Various locations in Naxos',
    island: 'Naxos',
    duration: '6 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Licensed archaeological guide',
      'Transportation between sites',
      'All entrance fees',
      'Information booklet',
      'Bottled water',
      'Light refreshments',
      'Audio guide system'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Lunch',
      'Personal expenses',
      'Gratuities',
      'Photo permits (where required)'
    ],
    highlights: [
      'Visit the Temple of Apollo',
      'Explore Temple of Demeter',
      'See ancient marble quarries',
      'Visit archaeological museum',
      'Learn about Greek mythology',
      'Expert guide commentary',
      'Small group experience'
    ],
    images: {
      main: '/images/activities/naxos-temple-main.jpg',
      gallery: [
        '/images/activities/naxos-temple-1.jpg',
        '/images/activities/naxos-temple-2.jpg',
        '/images/activities/naxos-temple-3.jpg',
        '/images/activities/naxos-temple-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'March to November',
    minParticipants: 2,
    maxParticipants: 12,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Naxos Town Port, near Apollo Temple',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Water bottle',
      'Camera (optional)',
      'Suitable for all ages'
    ],
    tags: ['archaeology', 'history', 'culture', 'temples', 'mythology'],
    languages: ['English', 'Greek', 'French', 'German'],
    providedEquipment: [
      'Audio guide system',
      'Information booklet',
      'Site maps',
      'Bottled water'
    ],
    startTimes: ['09:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Helen P.',
        rating: 5,
        date: '2024-11-19',
        comment: 'Fascinating tour! The guide\'s knowledge of ancient Greek history and mythology was impressive.'
      },
      {
        author: 'Michel F.',
        rating: 5,
        date: '2024-11-15',
        comment: 'The Temple of Apollo at sunset was breathtaking. Very informative and well-organized tour.'
      },
      {
        author: 'Julia R.',
        rating: 4,
        date: '2024-11-10',
        comment: 'Great historical insights and beautiful sites. The ancient marble quarries were particularly interesting.'
      }
    ]
  },
  {
    id: 'mountain-village-exploration',
    title: 'Naxos Mountain Villages Discovery Tour',
    slug: 'mountain-village-exploration',
    shortDescription: 'Explore the authentic mountain villages of Naxos and experience traditional Cycladic life.',
    description: 'Journey through the heart of Naxos to discover its picturesque mountain villages, each with its own unique character and charm. Visit Halki, the former capital, with its neoclassical mansions, Apiranthos with its marble streets, and other hidden gems. Experience local culture, taste traditional products, and learn about village life from residents. This tour offers an authentic glimpse into the island\'s rich cultural heritage.',
    location: 'Mountain Villages, Naxos',
    island: 'Naxos',
    duration: '8 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Expert local guide',
      'Transportation between villages',
      'Traditional lunch',
      'Local product tastings',
      'Village maps',
      'Bottled water',
      'Cultural demonstrations'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Additional food and drinks',
      'Personal purchases',
      'Gratuities',
      'Museum entrance fees'
    ],
    highlights: [
      'Visit historic Halki village',
      'Explore marble-built Apiranthos',
      'Traditional product tastings',
      'Meet local artisans',
      'Visit Byzantine churches',
      'Mountain landscapes',
      'Authentic village lunch'
    ],
    images: {
      main: '/images/activities/naxos-villages-main.jpg',
      gallery: [
        '/images/activities/naxos-villages-1.jpg',
        '/images/activities/naxos-villages-2.jpg',
        '/images/activities/naxos-villages-3.jpg',
        '/images/activities/naxos-villages-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Naxos Town Main Square',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Light jacket (in spring/autumn)',
      'Camera recommended',
      'Suitable for all ages'
    ],
    tags: ['villages', 'culture', 'food', 'history', 'traditional'],
    languages: ['English', 'Greek', 'French'],
    providedEquipment: [
      'Village maps',
      'Information booklet',
      'Bottled water',
      'Audio guide system'
    ],
    startTimes: ['09:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Catherine D.',
        rating: 5,
        date: '2024-11-18',
        comment: 'A wonderful way to experience authentic Greek village life. The local interactions and food were highlights!'
      },
      {
        author: 'Stefan M.',
        rating: 5,
        date: '2024-11-13',
        comment: 'Fascinating tour of traditional villages. Apiranthos was particularly beautiful with its marble streets.'
      },
      {
        author: 'Anna P.',
        rating: 4,
        date: '2024-11-08',
        comment: 'Great cultural experience. The guide was very knowledgeable and the village lunch was delicious.'
      }
    ]
  },
  {
    id: 'santorini-cooking-class',
    title: 'Traditional Greek Cooking Class in Santorini',
    slug: 'santorini-cooking-class',
    shortDescription: 'Master the art of Greek cuisine in a traditional Santorini setting with spectacular caldera views.',
    description: 'Join our expert local chef for an immersive cooking experience in a traditional Santorini setting. Learn to prepare authentic Greek dishes using fresh, local ingredients while enjoying breathtaking caldera views. You\'ll master classic recipes like moussaka, dolmades, and baklava, discovering the secrets of Mediterranean cooking. The class concludes with a feast of your creations paired with local wines.',
    location: 'Imerovigli, Santorini',
    island: 'Santorini',
    duration: '4 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'All cooking ingredients',
      'Recipe booklet',
      'Wine tasting',
      'Full meal of prepared dishes',
      'Cooking apron to take home',
      'Local wine and beverages',
      'Photos of the experience'
    ],
    notIncluded: [
      'Hotel transfer',
      'Additional wine bottles',
      'Gratuities'
    ],
    highlights: [
      'Hands-on cooking experience',
      'Traditional Greek recipes',
      'Caldera view setting',
      'Wine pairing session',
      'Small group size',
      'Take-home recipe booklet',
      'Fresh, local ingredients'
    ],
    images: {
      main: '/images/activities/santorini-cooking-main.jpg',
      gallery: [
        '/images/activities/santorini-cooking-1.jpg',
        '/images/activities/santorini-cooking-2.jpg',
        '/images/activities/santorini-cooking-3.jpg',
        '/images/activities/santorini-cooking-4.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Imerovigli Traditional Kitchen (exact address provided after booking)',
    requirements: [
      'No cooking experience needed',
      'Notify of any dietary restrictions',
      'Comfortable shoes',
      'Bring your camera',
      'Must be 18+ for wine tasting'
    ],
    tags: ['cooking', 'food', 'wine', 'cultural', 'local-cuisine'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Cooking apron',
      'All utensils',
      'Ingredients',
      'Recipe booklet',
      'Safety equipment'
    ],
    startTimes: ['10:00', '16:00'],
    rating: {
      overall: 4.9,
      totalReviews: 320
    },
    reviews: [
      {
        author: 'Maria L.',
        rating: 5,
        date: '2024-12-08',
        comment: 'Amazing experience! The chef was so knowledgeable and the food we made was incredible. The view made it even more special.'
      },
      {
        author: 'James K.',
        rating: 5,
        date: '2024-12-05',
        comment: 'Best activity in Santorini! Learned so much about Greek cooking and the wine pairing was perfect.'
      },
      {
        author: 'Sophie R.',
        rating: 4,
        date: '2024-12-01',
        comment: 'Great class with stunning views. The recipes were easy to follow and I can\'t wait to make them at home.'
      }
    ]
  },
  // Add more activities here...
];

export default activities;
