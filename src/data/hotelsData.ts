import { Hotel } from '../types/hotel';

export const hotels: Hotel[] = [
  {
    id: 'andronis-luxury-suites',
    name: 'Andronis Luxury Suites',
    location: {
      island: 'Santorini',
      area: 'Oia',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.3753
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 600,
      max: 1500,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Private Pool',
      'Sea View',
      'Fine Dining',
      'Wellness Center',
      'Room Service',
      'Cycladic Design'
    ],
    shortDescription: 'Luxurious suites on Oia\'s cliffs with world-class dining.',
    description: 'Perched on the cliffs of Oia, Andronis Luxury Suites offers an unparalleled experience of Santorini luxury. Each suite is a masterpiece of Cycladic design, featuring private infinity pools that seem to merge with the azure waters of the caldera. The hotel\'s world-class restaurant serves innovative Greek cuisine, while the spa offers treatments inspired by ancient Greek wellness traditions.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'als-001',
        name: 'Classic Suite with Infinity Pool',
        description: 'Elegant suite with private infinity pool and stunning caldera views. Features traditional Cycladic architecture with modern amenities.',
        maxOccupancy: 2,
        pricePerNight: 800,
        images: [
          '/images/rooms/andronis/classic-suite-1.jpg',
          '/images/rooms/andronis/classic-suite-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service',
          'Spa',
          'Bar'
        ]
      },
      {
        id: 'als-002',
        name: 'Luxury Suite with Plunge Pool',
        description: 'Spacious suite with indoor and outdoor living areas, private plunge pool, and panoramic sea views.',
        maxOccupancy: 3,
        pricePerNight: 1200,
        images: [
          '/images/rooms/andronis/luxury-suite-1.jpg',
          '/images/rooms/andronis/luxury-suite-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Concierge'
        ]
      },
      {
        id: 'als-003',
        name: 'Honeymoon Villa',
        description: 'Ultimate romantic retreat with spacious terrace, private infinity pool, and luxury amenities designed for couples.',
        maxOccupancy: 2,
        pricePerNight: 1500,
        images: [
          '/images/rooms/andronis/honeymoon-villa-1.jpg',
          '/images/rooms/andronis/honeymoon-villa-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Fine Dining'
        ]
      }
    ],
    amenities: [
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Concierge',
      'Room Service',
      'Airport Transfer',
      'WiFi'
    ],
    images: {
      main: '/images/hotels/andronis/main.jpg',
      gallery: [
        '/images/hotels/andronis/gallery-1.jpg',
        '/images/hotels/andronis/gallery-2.jpg',
        '/images/hotels/andronis/gallery-3.jpg',
        '/images/hotels/andronis/gallery-4.jpg'
      ]
    },
    bookingUrl: 'https://booking.com/andronis-luxury-suites',
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in. After that, first night charge applies.',
      children: 'Adults only resort, guests must be 13 years or older.',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  },
  {
    id: 'mystique-hotel',
    name: 'Mystique Hotel',
    location: {
      island: 'Santorini',
      area: 'Oia',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.3753
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 500,
      max: 1200,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Private Pool',
      'Sea View',
      'Fine Dining',
      'Wellness Center',
      'Adults Only',
      'Cycladic Design'
    ],
    shortDescription: 'Luxury carved into Santorini\'s rugged cliffs with Aegean Sea views.',
    description: 'A sanctuary of luxury and tranquility carved into Santorini\'s caldera cliffs. Mystique Hotel combines elegant Cycladic architecture with contemporary comfort, offering breathtaking views of the Aegean Sea.',
    checkIn: '14:00',
    checkOut: '12:00',
    rooms: [
      {
        id: 'mh-001',
        name: 'Vibrant Suite',
        description: 'Elegant suite with private terrace and stunning sea views.',
        maxOccupancy: 2,
        pricePerNight: 600,
        images: [
          '/images/rooms/mystique/vibrant-suite-1.jpg',
          '/images/rooms/mystique/vibrant-suite-2.jpg'
        ],
        amenities: [
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Spa'
        ]
      },
      {
        id: 'mh-002',
        name: 'Allure Suite',
        description: 'Spacious suite with private infinity pool and caldera views.',
        maxOccupancy: 2,
        pricePerNight: 900,
        images: [
          '/images/rooms/mystique/allure-suite-1.jpg',
          '/images/rooms/mystique/allure-suite-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Spa'
        ]
      }
    ],
    amenities: [
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Room Service',
      'Airport Transfer',
      'WiFi',
      'Concierge'
    ],
    images: {
      main: '/images/hotels/mystique/main.jpg',
      gallery: [
        '/images/hotels/mystique/gallery-1.jpg',
        '/images/hotels/mystique/gallery-2.jpg',
        '/images/hotels/mystique/gallery-3.jpg'
      ]
    },
    bookingUrl: 'https://mystique.com',
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'Adults only resort, guests must be 13 years or older',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  },
  {
    id: 'summer-senses-resort',
    name: 'Summer Senses Resort',
    location: {
      island: 'Paros',
      area: 'Punda Beach',
      coordinates: {
        latitude: 37.0169,
        longitude: 25.2487
      }
    },
    category: 'Resort',
    priceRange: {
      min: 450,
      max: 1200,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Pool',
      'Restaurant',
      'Spa',
      'WiFi',
      'Beach Access',
      'Fitness Center',
      'Bar',
      'Room Service',
      'Concierge',
      'Free Parking',
      'Sea View',
      'Wellness Center',
      'Gourmet Restaurant',
      'Private Terraces',
      'Water Sports'
    ],
    shortDescription: 'A luxury resort offering stunning views of the Aegean Sea and exceptional amenities.',
    description: 'Summer Senses Luxury Resort offers a serene escape on the stunning island of Paros. This elegant resort combines modern luxury with traditional Cycladic design, featuring spacious rooms, world-class dining, and exceptional wellness facilities.',
    rooms: [
      {
        id: 'ssr-deluxe',
        name: 'Deluxe Room',
        description: 'Elegant room with modern amenities and private balcony',
        maxOccupancy: 2,
        pricePerNight: 450,
        images: ['/images/hotels/summer-senses/deluxe-1.jpg', '/images/hotels/summer-senses/deluxe-2.jpg'],
        amenities: ['Sea View', 'Air Conditioning', 'Mini Bar', 'Free WiFi']
      },
      {
        id: 'ssr-premium',
        name: 'Premium Suite',
        description: 'Spacious suite with separate living area and premium sea views',
        maxOccupancy: 3,
        pricePerNight: 750,
        images: ['/images/hotels/summer-senses/premium-1.jpg', '/images/hotels/summer-senses/premium-2.jpg'],
        amenities: ['Sea View', 'Private Terrace', 'Living Room', 'Premium Amenities']
      },
      {
        id: 'ssr-pool',
        name: 'Pool Suite',
        description: 'Luxury suite with private pool and panoramic views',
        maxOccupancy: 4,
        pricePerNight: 1200,
        images: ['/images/hotels/summer-senses/pool-1.jpg', '/images/hotels/summer-senses/pool-2.jpg'],
        amenities: ['Private Pool', 'Sea View', 'Living Room', 'Butler Service']
      }
    ],
    amenities: [
      'Pool',
      'Restaurant',
      'Spa',
      'WiFi',
      'Beach Access',
      'Fitness Center',
      'Bar',
      'Room Service',
      'Concierge',
      'Free Parking',
      'Sea View',
      'Wellness Center',
      'Gourmet Restaurant',
      'Private Terraces',
      'Water Sports'
    ],
    images: {
      main: '/images/hotels/summer-senses/main.jpg',
      gallery: [
        '/images/hotels/summer-senses/gallery-1.jpg',
        '/images/hotels/summer-senses/gallery-2.jpg',
        '/images/hotels/summer-senses/gallery-3.jpg',
        '/images/hotels/summer-senses/gallery-4.jpg'
      ]
    },
    bookingUrl: 'https://summersenses.com',
    checkIn: '15:00',
    checkOut: '11:00',
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'Children of all ages are welcome',
      pets: 'No pets allowed'
    },
    reviews: {
      rating: 4.7,
      count: 312,
      highlights: [
        'Exceptional service',
        'Beautiful pools',
        'Great location',
        'Excellent dining'
      ]
    }
  },
  {
    id: 'skinopi-lodge',
    name: 'Skinopi Lodge',
    location: {
      island: 'Milos',
      area: 'Skinopi',
      coordinates: {
        latitude: 36.7225,
        longitude: 24.4145
      }
    },
    category: 'Boutique',
    priceRange: {
      min: 400,
      max: 900,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Private Villas',
      'Sea View',
      'Minimalist Design',
      'Private Terraces',
      'Beach Access',
      'Eco-Friendly'
    ],
    shortDescription: 'Exclusive eco-friendly lodge with minimalist design and stunning sea views.',
    description: 'Skinopi Lodge is a collection of three luxury villas perched above the Aegean Sea in Milos. Each villa is a masterpiece of minimalist architecture, designed to blend seamlessly with the natural landscape. The lodge offers ultimate privacy, spectacular views, and a unique connection to both the sea and the island\'s rugged beauty. Perfect for those seeking an exclusive, design-focused retreat.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'sl-001',
        name: 'Sea View Villa',
        description: 'Minimalist villa with floor-to-ceiling windows, private terrace, and direct sea views. Features custom-designed furniture and local materials.',
        maxOccupancy: 3,
        pricePerNight: 600,
        images: [
          '/images/rooms/skinopi/villa-1.jpg',
          '/images/rooms/skinopi/villa-2.jpg'
        ],
        amenities: [
          'Sea View',
          'Private Terrace',
          'Kitchen',
          'WiFi',
          'Air Conditioning',
          'Custom Furniture'
        ]
      }
    ],
    images: {
      main: '/images/hotels/skinopi/main.jpg',
      gallery: [
        '/images/hotels/skinopi-1.jpg',
        '/images/hotels/skinopi-2.jpg',
        '/images/hotels/skinopi-3.jpg'
      ]
    },
    amenities: [
      'Free WiFi',
      'Private Parking',
      'Sea Access',
      'Daily Housekeeping',
      'Concierge Service',
      'Airport Transfer',
      'Breakfast Delivery'
    ],
    reviews: {
      rating: 4.9,
      count: 87,
      highlights: [
        'Stunning architecture',
        'Privacy',
        'Amazing views',
        'Attentive service'
      ]
    }
  },
  {
    id: 'paros-luxury-resort',
    name: 'Paros Luxury Resort',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      coordinates: {
        latitude: 37.1232,
        longitude: 25.2395
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 450,
      max: 1200,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Beachfront Location',
      'Infinity Pool',
      'Wellness Center',
      'Gourmet Restaurant',
      'Water Sports',
      'Private Beach'
    ],
    shortDescription: 'Exclusive beachfront resort combining luxury with authentic Cycladic charm.',
    description: 'Paros Luxury Resort offers an unparalleled experience of Greek island hospitality. Located in the vibrant town of Naoussa, the resort features elegant suites and villas, world-class dining venues, a comprehensive spa, and direct access to a pristine beach. The architecture seamlessly blends contemporary luxury with traditional Cycladic elements, creating a sophisticated yet authentic atmosphere.',
    checkIn: '14:00',
    checkOut: '12:00',
    rooms: [
      {
        id: 'plr-001',
        name: 'Deluxe Suite with Pool',
        description: 'Spacious suite featuring a private pool, sea views, and luxurious furnishings. Perfect blend of modern comfort and traditional design.',
        maxOccupancy: 3,
        pricePerNight: 700,
        images: [
          '/images/rooms/paros-luxury/deluxe-suite-1.jpg',
          '/images/rooms/paros-luxury/deluxe-suite-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'Terrace',
          'WiFi',
          'Room Service',
          'Mini Bar'
        ]
      }
    ],
    images: {
      main: '/images/hotels/paros-luxury-main.jpg',
      gallery: [
        '/images/hotels/paros-luxury-1.jpg',
        '/images/hotels/paros-luxury-2.jpg',
        '/images/hotels/paros-luxury-3.jpg'
      ]
    },
    amenities: [
      'Free WiFi',
      'Room Service',
      'Multiple Restaurants',
      'Bars',
      'Spa Center',
      'Fitness Center',
      'Private Beach',
      'Water Sports',
      'Kids Club'
    ],
    reviews: {
      rating: 4.8,
      count: 312,
      highlights: [
        'Excellent location',
        'Outstanding service',
        'Beautiful facilities',
        'Great food'
      ]
    }
  },
  {
    id: 'mykonos-breeze',
    name: 'Mykonos Breeze',
    location: {
      island: 'Mykonos',
      area: 'Agios Ioannis',
      coordinates: {
        latitude: 37.4147,
        longitude: 25.3284
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 500,
      max: 1300,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Sunset Views',
      'Infinity Pool',
      'Beach Club',
      'Gourmet Restaurant',
      'Wellness Center',
      'Designer Interiors'
    ],
    shortDescription: 'Contemporary luxury hotel with stunning views and world-class amenities.',
    description: 'Mykonos Breeze is a haven of sophisticated luxury, offering breathtaking views of the Aegean Sea and the famous Mykonian sunset. The hotel combines contemporary design with traditional Cycladic architecture, featuring spacious suites, a stunning infinity pool, and a private beach club. The property\'s world-class restaurant serves innovative Mediterranean cuisine, while the wellness center provides a serene escape.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'mb-001',
        name: 'Premium Sea View Suite',
        description: 'Elegantly appointed suite with panoramic sea views, private terrace, and designer furnishings. Features modern amenities and authentic Mykonian style.',
        maxOccupancy: 3,
        pricePerNight: 800,
        images: [
          '/images/rooms/mykonos-breeze/premium-suite-1.jpg',
          '/images/rooms/mykonos-breeze/premium-suite-2.jpg'
        ],
        amenities: [
          'Sea View',
          'Private Terrace',
          'WiFi',
          'Room Service',
          'Mini Bar',
          'Smart TV'
        ]
      }
    ],
    images: {
      main: '/images/hotels/mykonos-breeze-main.jpg',
      gallery: [
        '/images/hotels/mykonos-breeze-1.jpg',
        '/images/hotels/mykonos-breeze-2.jpg',
        '/images/hotels/mykonos-breeze-3.jpg'
      ]
    },
    amenities: [
      'Free WiFi',
      'Room Service',
      'Restaurant',
      'Beach Club',
      'Infinity Pool',
      'Spa',
      'Fitness Center',
      'Concierge',
      'Helicopter Transfer'
    ],
    reviews: {
      rating: 4.9,
      count: 276,
      highlights: [
        'Incredible views',
        'Luxurious rooms',
        'Excellent service',
        'Perfect location'
      ]
    }
  },
  {
    id: 'nissaki-beach-hotel',
    name: 'Nissaki Beach Hotel',
    location: {
      island: 'Naxos',
      area: 'Agios Georgios',
      coordinates: {
        latitude: 37.1,
        longitude: 25.3667
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 200,
      max: 500,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Beachfront',
      'Fine Dining',
      'Pool',
      'Sea View',
      'Family Friendly',
      'Room Service'
    ],
    shortDescription: 'Located right on Agios Georgios Beach, combining elegance with comfort.',
    description: 'Located directly on the pristine St. George Beach, Nissaki Beach Hotel offers a perfect blend of traditional Cycladic architecture and modern comfort. Enjoy spectacular sea views and direct beach access.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'nbh-001',
        name: 'Standard Room',
        description: 'Comfortable room with modern amenities.',
        maxOccupancy: 2,
        pricePerNight: 200,
        images: [
          '/images/rooms/nissaki/standard-1.jpg',
          '/images/rooms/nissaki/standard-2.jpg'
        ],
        amenities: [
          'WiFi',
          'Room Service',
          'Bar'
        ]
      },
      {
        id: 'nbh-002',
        name: 'Sea View Suite',
        description: 'Luxurious suite with panoramic sea views.',
        maxOccupancy: 3,
        pricePerNight: 400,
        images: [
          '/images/rooms/nissaki/seaview-1.jpg',
          '/images/rooms/nissaki/seaview-2.jpg'
        ],
        amenities: [
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Spa'
        ]
      }
    ],
    amenities: [
      'Pool',
      'Restaurant',
      'Bar',
      'Beach Access',
      'Room Service',
      'WiFi',
      'Concierge'
    ],
    images: {
      main: '/images/hotels/nissaki/main.jpg',
      gallery: [
        '/images/hotels/nissaki/gallery-1.jpg',
        '/images/hotels/nissaki/gallery-2.jpg',
        '/images/hotels/nissaki/gallery-3.jpg'
      ]
    },
    bookingUrl: 'https://nissaki.com',
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'Children of all ages are welcome',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  },
  {
    id: 'skinopi-lodge',
    name: 'Skinopi Lodge',
    location: {
      island: 'Milos',
      area: 'Skinopi',
      coordinates: {
        latitude: 36.7333,
        longitude: 24.45
      }
    },
    category: 'Boutique',
    priceRange: {
      min: 300,
      max: 600,
      currency: 'EUR'
    },
    starRating: 4,
    keyFeatures: [
      'Sea View',
      'Private Pool',
      'Cycladic Design',
      'Beach Access',
      'Eco-Friendly',
      'Room Service'
    ],
    shortDescription: 'A romantic villa retreat overlooking the Aegean Sea, perfect for couples.',
    description: 'Perched on the caldera cliffs, these traditional villas offer breathtaking views of the Aegean Sea. Each villa features private terraces and authentic Cycladic architecture combined with modern amenities.',
    checkIn: '14:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'sl-001',
        name: 'Villa Levantes',
        description: 'Modern villa with private pool and sea views.',
        maxOccupancy: 2,
        pricePerNight: 400,
        images: [
          '/images/rooms/skinopi/levantes-1.jpg',
          '/images/rooms/skinopi/levantes-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Beach Access'
        ]
      },
      {
        id: 'sl-002',
        name: 'Villa Tramountana',
        description: 'Spacious villa with outdoor kitchen and terrace.',
        maxOccupancy: 3,
        pricePerNight: 500,
        images: [
          '/images/rooms/skinopi/tramountana-1.jpg',
          '/images/rooms/skinopi/tramountana-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Beach Access',
          'Bar'
        ]
      }
    ],
    amenities: [
      'Private Pool',
      'Beach Access',
      'Room Service',
      'WiFi',
      'Bar',
      'Concierge'
    ],
    images: {
      main: '/images/hotels/skinopi/main.jpg',
      gallery: [
        '/images/hotels/skinopi/gallery-1.jpg',
        '/images/hotels/skinopi/gallery-2.jpg',
        '/images/hotels/skinopi/gallery-3.jpg'
      ]
    },
    bookingUrl: 'https://skinopi.com',
    policies: {
      cancellation: 'Free cancellation up to 14 days before check-in',
      children: 'Children over 12 are welcome',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  },
  {
    id: 'caldera-villas',
    name: 'Caldera Villas',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      coordinates: {
        latitude: 36.4343,
        longitude: 25.4216
      }
    },
    category: 'Boutique',
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    starRating: 4,
    keyFeatures: [
      'Private Pool',
      'Sea View',
      'WiFi',
      'Room Service',
      'Cycladic Design',
      'Beach Access'
    ],
    shortDescription: 'Intimate boutique villas with stunning caldera views.',
    description: 'A charming boutique hotel that seamlessly blends into Milos\'s traditional architecture. Featuring cave-style rooms and suites that offer a unique and authentic Greek island experience.',
    checkIn: '15:00',
    checkOut: '12:00',
    rooms: [
      {
        id: 'cv-001',
        name: 'Superior Villa with Pool',
        description: 'Spacious villa with private pool and panoramic caldera views.',
        maxOccupancy: 3,
        pricePerNight: 450,
        images: [
          '/images/rooms/caldera/superior-villa-1.jpg',
          '/images/rooms/caldera/superior-villa-2.jpg'
        ],
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service'
        ]
      }
    ],
    images: {
      main: '/images/hotels/caldera-villas-main.jpg',
      gallery: [
        '/images/hotels/caldera-villas-1.jpg',
        '/images/hotels/caldera-villas-2.jpg',
        '/images/hotels/caldera-villas-3.jpg'
      ]
    },
    amenities: [
      'Pool',
      'WiFi',
      'Room Service',
      'Concierge'
    ],
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'All ages welcome',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  },
  {
    id: 'milos-hideaway',
    name: 'Milos Hideaway',
    location: {
      island: 'Milos',
      area: 'Pollonia',
      coordinates: {
        latitude: 36.7512,
        longitude: 24.5211
      }
    },
    category: 'Boutique',
    priceRange: {
      min: 250,
      max: 600,
      currency: 'EUR'
    },
    starRating: 4,
    keyFeatures: [
      'Sea View',
      'Pool',
      'Restaurant',
      'Beach Access',
      'Garden View',
      'Room Service'
    ],
    shortDescription: 'Charming boutique hotel in the picturesque village of Pollonia.',
    description: 'A family-run hotel offering authentic Greek hospitality in the heart of Sifnos. Traditional Cycladic architecture meets modern comfort, surrounded by beautiful gardens and local charm.',
    checkIn: '14:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'mh-001',
        name: 'Garden View Suite',
        description: 'Peaceful suite overlooking the hotel\'s Mediterranean garden.',
        maxOccupancy: 2,
        pricePerNight: 300,
        images: [
          '/images/rooms/milos-hideaway/garden-1.jpg',
          '/images/rooms/milos-hideaway/garden-2.jpg'
        ],
        amenities: [
          'Garden View',
          'WiFi',
          'Room Service'
        ]
      }
    ],
    images: {
      main: '/images/hotels/milos-hideaway-main.jpg',
      gallery: [
        '/images/hotels/milos-hideaway-1.jpg',
        '/images/hotels/milos-hideaway-2.jpg',
        '/images/hotels/milos-hideaway-3.jpg'
      ]
    },
    amenities: [
      'Pool',
      'Restaurant',
      'WiFi',
      'Beach Access',
      'Garden'
    ],
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'Children over 12 welcome',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  }
];

export type { Hotel };
