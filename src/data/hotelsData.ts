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
      'Spa',
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
      'Spa',
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
        latitude: 37.0833,
        longitude: 25.1333
      }
    },
    category: 'Resort',
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Pool',
      'Beach Access',
      'Spa',
      'Fine Dining',
      'Family Friendly'
    ],
    shortDescription: 'A luxury resort offering stunning views of the Aegean Sea.',
    description: 'Summer Senses is a luxury resort in Paros, offering elegant accommodation with private terraces, two impressive pools with uninterrupted sea views, and a world-class spa.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'ssr-001',
        name: 'Deluxe Room',
        description: 'Modern room with private balcony and garden views.',
        maxOccupancy: 2,
        pricePerNight: 300,
        images: [
          '/images/rooms/summer-senses/deluxe-1.jpg',
          '/images/rooms/summer-senses/deluxe-2.jpg'
        ],
        amenities: [
          'WiFi',
          'Room Service',
          'Garden View',
          'Bar'
        ]
      },
      {
        id: 'ssr-002',
        name: 'Premium Suite',
        description: 'Spacious suite with sea view and luxury amenities.',
        maxOccupancy: 3,
        pricePerNight: 500,
        images: [
          '/images/rooms/summer-senses/premium-1.jpg',
          '/images/rooms/summer-senses/premium-2.jpg'
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
      'Spa',
      'Beach Access',
      'Room Service',
      'WiFi',
      'Concierge'
    ],
    images: {
      main: '/images/hotels/summer-senses/main.jpg',
      gallery: [
        '/images/hotels/summer-senses/gallery-1.jpg',
        '/images/hotels/summer-senses/gallery-2.jpg',
        '/images/hotels/summer-senses/gallery-3.jpg'
      ]
    },
    bookingUrl: 'https://summersenses.com',
    policies: {
      cancellation: 'Free cancellation up to 7 days before check-in',
      children: 'Children of all ages are welcome',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
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
      'Family Friendly'
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
      'Beach Access'
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
      'Cycladic Design'
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
    id: 'paros-luxury-resort',
    name: 'Paros Luxury Resort',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      coordinates: {
        latitude: 37.1234,
        longitude: 25.2144
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
      'Beach Access',
      'Infinity Pool',
      'Spa',
      'Fine Dining',
      'Beach Access'
    ],
    shortDescription: 'Modern luxury resort with private beach access in Naoussa.',
    description: 'Set along the pristine coastline of Naoussa, Paros Luxury Resort combines contemporary design with traditional Greek hospitality. The resort features a private beach, world-class spa facilities, and gourmet dining options, making it the perfect choice for discerning travelers.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'plr-001',
        name: 'Beachfront Suite',
        description: 'Elegant suite with direct beach access and sea views.',
        maxOccupancy: 4,
        pricePerNight: 700,
        images: [
          '/images/rooms/paros-luxury/beachfront-1.jpg',
          '/images/rooms/paros-luxury/beachfront-2.jpg'
        ],
        amenities: [
          'Beach Access',
          'Sea View',
          'WiFi',
          'Room Service',
          'Spa Access'
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
      'Pool',
      'Spa',
      'Restaurant',
      'Beach Access',
      'WiFi',
      'Room Service'
    ],
    policies: {
      cancellation: 'Free cancellation up to 14 days before check-in',
      children: 'Family friendly with kids club',
      pets: 'Small pets allowed with additional fee'
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
      'Garden View'
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
  },
  {
    id: 'mykonos-breeze',
    name: 'Mykonos Breeze',
    location: {
      island: 'Mykonos',
      area: 'Ornos',
      coordinates: {
        latitude: 37.4246,
        longitude: 25.3217
      }
    },
    category: 'Luxury',
    priceRange: {
      min: 400,
      max: 1000,
      currency: 'EUR'
    },
    starRating: 5,
    keyFeatures: [
      'Beach Access',
      'Infinity Pool',
      'Spa',
      'Fine Dining',
      'Adults Only'
    ],
    shortDescription: 'Modern beachfront resort offering sophisticated luxury in Ornos.',
    description: 'Mykonos Breeze is a sophisticated adults-only resort that combines contemporary luxury with the vibrant energy of Mykonos. Located on Ornos Beach, the resort features stunning sea views, world-class dining, and an award-winning spa.',
    checkIn: '15:00',
    checkOut: '11:00',
    rooms: [
      {
        id: 'mb-001',
        name: 'Deluxe Sea View Room',
        description: 'Modern room with panoramic views of Ornos Bay.',
        maxOccupancy: 2,
        pricePerNight: 500,
        images: [
          '/images/rooms/mykonos-breeze/deluxe-1.jpg',
          '/images/rooms/mykonos-breeze/deluxe-2.jpg'
        ],
        amenities: [
          'Sea View',
          'WiFi',
          'Room Service',
          'Spa Access'
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
      'Pool',
      'Spa',
      'Restaurant',
      'Beach Access',
      'WiFi',
      'Room Service'
    ],
    policies: {
      cancellation: 'Free cancellation up to 14 days before check-in',
      children: 'Adults only (18+)',
      pets: 'No pets allowed'
    },
    roomTypes: undefined
  }
];

export type { Hotel };
