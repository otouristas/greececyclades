import { Hotel, HotelCategory } from '../types/hotel';

export const hotels: Hotel[] = [
  {
    id: '1',
    slug: 'andronis-luxury-suites-santorini',
    name: 'Andronis Luxury Suites',
    description: 'Carved into the volcanic cliff of Santorini, Andronis Luxury Suites offers breathtaking views of the caldera, luxury accommodations, and world-class service in the picturesque village of Oia.',
    location: {
      island: 'Santorini',
      area: 'Oia',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.3753
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 450,
      max: 750,
      currency: 'EUR'
    },
    rating: 4.9,
    reviews: 458,
    features: [
      'Infinity Pool',
      'Spa',
      'Restaurant',
      'Room Service',
      'WiFi',
      'Airport Transfer'
    ],
    images: [
      '/images/hotels/andronis/main.jpg',
      '/images/hotels/andronis/room1.jpg',
      '/images/hotels/andronis/room2.jpg'
    ],
    amenities: [
      'Infinity Pool',
      'Spa',
      'Restaurant',
      'Room Service',
      'WiFi',
      'Airport Transfer'
    ],
    rooms: [
      {
        id: 'als-001',
        type: 'Classic Suite',
        description: 'Elegant suite with private balcony and caldera views',
        price: 450,
        image: '/images/hotels/andronis/classic-suite.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Balcony',
          'Air Conditioning',
          'Mini Bar'
        ]
      },
      {
        id: 'als-002',
        type: 'Deluxe Suite',
        description: 'Spacious suite with private pool and panoramic views',
        price: 750,
        image: '/images/hotels/andronis/deluxe-suite.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 65,
        amenities: [
          'Private Pool',
          'Terrace',
          'Living Area',
          'Premium Amenities'
        ]
      }
    ]
  },
  {
    id: 'mystique-hotel',
    name: 'Mystique Hotel',
    slug: 'mystique-hotel-santorini',
    location: {
      island: 'Santorini',
      area: 'Oia',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.3753
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 500,
      max: 1200,
      currency: 'EUR'
    },
    features: [
      'Private Pool',
      'Sea View',
      'Fine Dining',
      'Wellness Center',
      'Adults Only',
      'Cycladic Design'
    ],
    description: 'A sanctuary of luxury and tranquility carved into Santorini\'s caldera cliffs. Mystique Hotel combines elegant Cycladic architecture with contemporary comfort, offering breathtaking views of the Aegean Sea.',
    rating: 4.9,
    reviews: 458,
    images: [
      '/images/hotels/mystique/main.jpg',
      '/images/hotels/mystique/exterior.jpg',
      '/images/hotels/mystique/pool.jpg',
      '/images/hotels/mystique/restaurant.jpg',
      '/images/hotels/mystique/spa.jpg'
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
    rooms: [
      {
        id: 'mh-001',
        type: 'Vibrant Suite',
        description: 'Elegant suite with private terrace and stunning sea views.',
        price: 600,
        image: '/images/rooms/mystique/vibrant-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
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
        type: 'Allure Suite',
        description: 'Spacious suite with private infinity pool and caldera views.',
        price: 900,
        image: '/images/rooms/mystique/allure-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 60,
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Spa'
        ]
      }
    ]
  },
  {
    id: 'summer-senses-resort',
    name: 'Summer Senses Resort',
    slug: 'summer-senses-resort-paros',
    location: {
      island: 'Paros',
      area: 'Punda Beach',
      coordinates: {
        latitude: 37.0169,
        longitude: 25.2487
      }
    },
    category: HotelCategory.Resort,
    priceRange: {
      min: 450,
      max: 1200,
      currency: 'EUR'
    },
    features: [
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
    description: 'Summer Senses Luxury Resort offers a serene escape on the stunning island of Paros. This elegant resort combines modern luxury with traditional Cycladic design, featuring spacious rooms, world-class dining, and exceptional wellness facilities.',
    rating: 4.7,
    reviews: 312,
    images: [
      '/images/hotels/summer-senses/main.jpg',
      '/images/hotels/summer-senses/gallery-1.jpg',
      '/images/hotels/summer-senses/gallery-2.jpg',
      '/images/hotels/summer-senses/gallery-3.jpg',
      '/images/hotels/summer-senses/gallery-4.jpg'
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
    rooms: [
      {
        id: 'ssr-deluxe',
        type: 'Deluxe Room',
        description: 'Elegant room with modern amenities and private balcony',
        price: 450,
        image: '/images/hotels/summer-senses/deluxe-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 35,
        amenities: [
          'Sea View',
          'Air Conditioning',
          'Mini Bar',
          'WiFi'
        ]
      },
      {
        id: 'ssr-premium',
        type: 'Premium Suite',
        description: 'Spacious suite with separate living area and premium sea views',
        price: 750,
        image: '/images/hotels/summer-senses/premium-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Living Room',
          'Premium Amenities'
        ]
      },
      {
        id: 'ssr-pool',
        type: 'Pool Suite',
        description: 'Luxury suite with private pool and panoramic views',
        price: 1200,
        image: '/images/hotels/summer-senses/pool-1.jpg',
        maxOccupancy: 4,
        bedType: 'King',
        size: 80,
        amenities: [
          'Private Pool',
          'Sea View',
          'Living Room',
          'Butler Service'
        ]
      }
    ]
  },
  {
    id: 'skinopi-lodge',
    name: 'Skinopi Lodge',
    slug: 'skinopi-lodge-milos',
    location: {
      island: 'Milos',
      area: 'Skinopi',
      coordinates: {
        latitude: 36.7225,
        longitude: 24.4145
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 400,
      max: 900,
      currency: 'EUR'
    },
    features: [
      'Private Villas',
      'Sea View',
      'Minimalist Design',
      'Private Terraces',
      'Beach Access',
      'Eco-Friendly'
    ],
    description: 'Skinopi Lodge is a collection of three luxury villas perched above the Aegean Sea in Milos. Each villa is a masterpiece of minimalist architecture, designed to blend seamlessly with the natural landscape. The lodge offers ultimate privacy, spectacular views, and a unique connection to both the sea and the island\'s rugged beauty. Perfect for those seeking an exclusive, design-focused retreat.',
    rating: 4.9,
    reviews: 87,
    images: [
      '/images/hotels/skinopi/main.jpg',
      '/images/hotels/skinopi-1.jpg',
      '/images/hotels/skinopi-2.jpg',
      '/images/hotels/skinopi-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Private Parking',
      'Sea Access',
      'Daily Housekeeping',
      'Concierge Service',
      'Airport Transfer',
      'Breakfast Delivery'
    ],
    rooms: [
      {
        id: 'sl-001',
        type: 'Sea View Villa',
        description: 'Minimalist villa with floor-to-ceiling windows, private terrace, and direct sea views. Features custom-designed furniture and local materials.',
        price: 600,
        image: '/images/rooms/skinopi/villa-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Kitchen',
          'WiFi',
          'Air Conditioning',
          'Custom Furniture'
        ]
      }
    ]
  },
  {
    id: 'paros-luxury-resort',
    name: 'Paros Luxury Resort',
    slug: 'paros-luxury-resort-paros',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      coordinates: {
        latitude: 37.1232,
        longitude: 25.2395
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 450,
      max: 1200,
      currency: 'EUR'
    },
    features: [
      'Beachfront Location',
      'Infinity Pool',
      'Wellness Center',
      'Gourmet Restaurant',
      'Water Sports',
      'Private Beach'
    ],
    description: 'Paros Luxury Resort offers an unparalleled experience of Greek island hospitality. Located in the vibrant town of Naoussa, the resort features elegant suites and villas, world-class dining, and exceptional wellness facilities.',
    rating: 4.8,
    reviews: 312,
    images: [
      '/images/hotels/paros-luxury-main.jpg',
      '/images/hotels/paros-luxury-1.jpg',
      '/images/hotels/paros-luxury-2.jpg',
      '/images/hotels/paros-luxury-3.jpg'
    ],
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
    rooms: [
      {
        id: 'plr-001',
        type: 'Deluxe Suite with Pool',
        description: 'Spacious suite featuring a private pool, sea views, and luxurious furnishings. Perfect blend of modern comfort and traditional design.',
        price: 700,
        image: '/images/rooms/paros-luxury/deluxe-suite-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 70,
        amenities: [
          'Private Pool',
          'Sea View',
          'Terrace',
          'WiFi',
          'Room Service',
          'Mini Bar'
        ]
      }
    ]
  },
  {
    id: 'mykonos-breeze',
    name: 'Mykonos Breeze',
    slug: 'mykonos-breeze-mykonos',
    location: {
      island: 'Mykonos',
      area: 'Agios Ioannis',
      coordinates: {
        latitude: 37.4147,
        longitude: 25.3284
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 500,
      max: 1300,
      currency: 'EUR'
    },
    features: [
      'Sunset Views',
      'Infinity Pool',
      'Beach Club',
      'Gourmet Restaurant',
      'Wellness Center',
      'Designer Interiors'
    ],
    description: 'Mykonos Breeze is a haven of sophisticated luxury, offering breathtaking views of the Aegean Sea and the famous Mykonian sunset. The hotel combines contemporary design with traditional Cycladic architecture, featuring spacious suites, a stunning infinity pool, and a private beach club. The property\'s world-class restaurant serves innovative Mediterranean cuisine, while the wellness center provides a serene escape.',
    rating: 4.9,
    reviews: 276,
    images: [
      '/images/hotels/mykonos-breeze-main.jpg',
      '/images/hotels/mykonos-breeze-1.jpg',
      '/images/hotels/mykonos-breeze-2.jpg',
      '/images/hotels/mykonos-breeze-3.jpg'
    ],
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
    rooms: [
      {
        id: 'mb-001',
        type: 'Premium Sea View Suite',
        description: 'Elegantly appointed suite with panoramic sea views, private terrace, and designer furnishings. Features modern amenities and authentic Mykonian style.',
        price: 800,
        image: '/images/rooms/mykonos-breeze/premium-suite-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Sea View',
          'Private Terrace',
          'WiFi',
          'Room Service',
          'Mini Bar',
          'Smart TV'
        ]
      }
    ]
  },
  {
    id: 'nissaki-beach-hotel',
    name: 'Nissaki Beach Hotel',
    slug: 'nissaki-beach-hotel-naxos',
    location: {
      island: 'Naxos',
      area: 'Agios Georgios',
      coordinates: {
        latitude: 37.1,
        longitude: 25.3667
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 200,
      max: 500,
      currency: 'EUR'
    },
    features: [
      'Beachfront',
      'Fine Dining',
      'Pool',
      'Sea View',
      'Family Friendly',
      'Room Service'
    ],
    description: 'Located right on Agios Georgios Beach, combining elegance with comfort.',
    rating: 4.5,
    reviews: 156,
    images: [
      '/images/hotels/nissaki/main.jpg',
      '/images/hotels/nissaki/gallery-1.jpg',
      '/images/hotels/nissaki/gallery-2.jpg',
      '/images/hotels/nissaki/gallery-3.jpg'
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
    rooms: [
      {
        id: 'nbh-001',
        type: 'Standard Room',
        description: 'Comfortable room with modern amenities.',
        price: 200,
        image: '/images/rooms/nissaki/standard-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 25,
        amenities: [
          'WiFi',
          'Room Service',
          'Bar'
        ]
      },
      {
        id: 'nbh-002',
        type: 'Sea View Suite',
        description: 'Luxurious suite with panoramic sea views.',
        price: 400,
        image: '/images/rooms/nissaki/seaview-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 50,
        amenities: [
          'Sea View',
          'WiFi',
          'Room Service',
          'Bar',
          'Spa'
        ]
      }
    ]
  },
  {
    id: 'caldera-villas',
    name: 'Caldera Villas',
    slug: 'caldera-villas-santorini',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      coordinates: {
        latitude: 36.4343,
        longitude: 25.4216
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    features: [
      'Private Pool',
      'Sea View',
      'WiFi',
      'Room Service',
      'Cycladic Design',
      'Beach Access'
    ],
    description: 'A charming boutique hotel that seamlessly blends into Milos\'s traditional architecture. Featuring cave-style rooms and suites that offer a unique and authentic Greek island experience.',
    rating: 4.5,
    reviews: 156,
    images: [
      '/images/hotels/caldera-villas-main.jpg',
      '/images/hotels/caldera-villas-1.jpg',
      '/images/hotels/caldera-villas-2.jpg',
      '/images/hotels/caldera-villas-3.jpg'
    ],
    amenities: [
      'Pool',
      'WiFi',
      'Room Service',
      'Concierge'
    ],
    rooms: [
      {
        id: 'cv-001',
        type: 'Superior Villa with Pool',
        description: 'Spacious villa with private pool and panoramic caldera views.',
        price: 450,
        image: '/images/rooms/caldera/superior-villa-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Private Pool',
          'Sea View',
          'WiFi',
          'Room Service'
        ]
      }
    ]
  },
  {
    id: 'milos-hideaway',
    name: 'Milos Hideaway',
    slug: 'milos-hideaway-milos',
    location: {
      island: 'Milos',
      area: 'Pollonia',
      coordinates: {
        latitude: 36.7512,
        longitude: 24.5211
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 250,
      max: 600,
      currency: 'EUR'
    },
    features: [
      'Sea View',
      'Pool',
      'Restaurant',
      'Beach Access',
      'Garden View',
      'Room Service'
    ],
    description: 'A family-run hotel offering authentic Greek hospitality in the heart of Sifnos. Traditional Cycladic architecture meets modern comfort, surrounded by beautiful gardens and local charm.',
    rating: 4.5,
    reviews: 156,
    images: [
      '/images/hotels/milos-hideaway-main.jpg',
      '/images/hotels/milos-hideaway-1.jpg',
      '/images/hotels/milos-hideaway-2.jpg',
      '/images/hotels/milos-hideaway-3.jpg'
    ],
    amenities: [
      'Pool',
      'Restaurant',
      'WiFi',
      'Beach Access',
      'Garden'
    ],
    rooms: [
      {
        id: 'mh-001',
        type: 'Garden View Suite',
        description: 'Peaceful suite overlooking the hotel\'s Mediterranean garden.',
        price: 300,
        image: '/images/rooms/milos-hideaway/garden-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 30,
        amenities: [
          'Garden View',
          'WiFi',
          'Room Service'
        ]
      }
    ]
  },
  {
    id: 'niriedes-hotel',
    name: 'Niriedes Hotel',
    slug: 'niriedes-hotel-sifnos',
    location: {
      island: 'Sifnos',
      area: 'Platys Gialos',
      coordinates: {
        latitude: 36.9397,
        longitude: 24.7428
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 180,
      max: 450,
      currency: 'EUR'
    },
    description: `Niriedes Hotel combines traditional Cycladic architecture with modern comfort, offering a serene retreat in Platys Gialos. Each room features a private balcony with sea or garden views, decorated in soothing earth tones that reflect the island's natural beauty. The hotel's infinity pool overlooks the Aegean Sea, while the restaurant serves authentic Sifnian cuisine using local ingredients.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity pool',
      'Sea-view restaurant',
      'Spa services',
      'WiFi',
      'Beach access',
      'Room service',
      'Concierge service'
    ],
    images: [
      '/images/hotels/niriedes/exterior.jpg',
      '/images/hotels/niriedes/pool.jpg',
      '/images/hotels/niriedes/room.jpg',
      '/images/hotels/niriedes/restaurant.jpg'
    ],
    features: ['WiFi', 'Infinity Pool', 'Restaurant', 'Spa', 'Sea View', 'Room Service', 'Beachfront', 'Gourmet Restaurant'],
    rooms: [
      {
        id: 'nh-001',
        type: 'Sea View Room',
        description: 'Comfortable room with private balcony and stunning sea views.',
        price: 250,
        image: '/images/rooms/niriedes/sea-view-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 25,
        amenities: [
          'Sea View',
          'Private Balcony',
          'WiFi',
          'Room Service'
        ]
      }
    ]
  },
  {
    id: 'absolute-bliss',
    name: 'Absolute Bliss',
    slug: 'absolute-bliss-santorini',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      coordinates: {
        latitude: 36.4351,
        longitude: 25.4321
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 450,
      max: 1200,
      currency: 'EUR'
    },
    description: `Perched on Santorini's caldera in Imerovigli, Absolute Bliss offers an unparalleled luxury experience with breathtaking sunset views. Each suite features a private terrace with heated plunge pool or jacuzzi, customized furnishings, and sophisticated Cycladic design. The hotel's exclusive restaurant serves gourmet Mediterranean cuisine, while the infinity pool seems to merge with the Aegean horizon.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private plunge pools',
      'Caldera views',
      'Gourmet restaurant',
      'Spa treatments',
      'Butler service',
      'Wine cellar',
      'Helicopter transfers'
    ],
    images: [
      '/images/hotels/absolute-bliss/exterior.jpg',
      '/images/hotels/absolute-bliss/suite.jpg',
      '/images/hotels/absolute-bliss/pool.jpg',
      '/images/hotels/absolute-bliss/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ab-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning caldera views.',
        price: 600,
        image: '/images/rooms/absolute-bliss/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Caldera View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'naxos-resort',
    name: 'Naxos Resort',
    slug: 'naxos-resort-naxos',
    location: {
      island: 'Naxos',
      area: 'St. George Beach',
      coordinates: {
        latitude: 37.1024,
        longitude: 25.3725
      }
    },
    category: HotelCategory.Resort,
    priceRange: {
      min: 200,
      max: 600,
      currency: 'EUR'
    },
    description: `Naxos Resort combines beachfront luxury with authentic Cycladic hospitality. Located on the golden sands of St. George Beach, the resort offers spacious rooms and suites with modern amenities and traditional design elements. The property features multiple swimming pools, a spa center, and restaurants serving both international and Greek cuisine. Perfect for families and couples seeking a blend of relaxation and activities.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private beach area',
      'Multiple pools',
      'Spa center',
      'Kids club',
      'Water sports facilities',
      'Tennis court',
      'Beachfront restaurants'
    ],
    images: [
      '/images/hotels/naxos-resort/exterior.jpg',
      '/images/hotels/naxos-resort/beach.jpg',
      '/images/hotels/naxos-resort/pool.jpg',
      '/images/hotels/naxos-resort/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'nr-001',
        type: 'Deluxe Room',
        description: 'Elegant room with modern amenities and stunning sea views.',
        price: 300,
        image: '/images/rooms/naxos-resort/deluxe-room-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 35,
        amenities: [
          'Sea View',
          'Private Balcony',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'grace-santorini',
    name: 'Grace Santorini',
    slug: 'grace-santorini-santorini',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      coordinates: {
        latitude: 36.4283,
        longitude: 25.4317
      }
    },
    category: HotelCategory.UltraLuxury,
    priceRange: {
      min: 800,
      max: 2500,
      currency: 'EUR'
    },
    description: `Grace Santorini represents the pinnacle of luxury hospitality in the Cyclades. This architectural marvel is carved into Imerovigli's cliffs, offering uninterrupted caldera views from every suite. The infinity pool is an Instagram sensation, appearing to float over the Aegean. Each room features champagne bars, private terraces, and plunge pools, while the restaurant serves innovative Mediterranean cuisine with a modern twist.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity pool',
      'Champagne lounge',
      'Fine dining restaurant',
      'Spa sanctuary',
      'Private plunge pools',
      'Yoga and Pilates studio',
      'Helicopter transfers'
    ],
    images: [
      '/images/hotels/grace-santorini/exterior.jpg',
      '/images/hotels/grace-santorini/pool.jpg',
      '/images/hotels/grace-santorini/suite.jpg',
      '/images/hotels/grace-santorini/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'gr-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views',
        price: 800,
        image: '/images/hotels/grace-santorini/suite.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'naxian-collection',
    name: 'Naxian Collection',
    slug: 'naxian-collection-naxos',
    location: {
      island: 'Naxos',
      area: 'Stelida',
      coordinates: {
        latitude: 37.0891,
        longitude: 25.3548
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 350,
      max: 900,
      currency: 'EUR'
    },
    description: `The Naxian Collection offers an exclusive retreat combining luxury with authentic Cycladic charm. Each villa and suite features private pools and stunning views of the Aegean Sea. The property's organic farm supplies fresh ingredients to the gourmet restaurant, while the wine cellar houses rare local vintages. The architecture seamlessly blends modern luxury with traditional island aesthetics.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private pools',
      'Organic farm',
      'Wine cellar',
      'Gourmet restaurant',
      'Spa services',
      'Beach shuttle',
      'Cooking classes'
    ],
    images: [
      '/images/hotels/naxian-collection/exterior.jpg',
      '/images/hotels/naxian-collection/pool.jpg',
      '/images/hotels/naxian-collection/villa.jpg',
      '/images/hotels/naxian-collection/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'nc-001',
        type: 'Deluxe Villa',
        description: 'Luxurious villa with private pool and stunning sea views.',
        price: 500,
        image: '/images/rooms/naxian-collection/deluxe-villa-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Private Pool',
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'kavos-naxos',
    name: 'Kavos Naxos',
    slug: 'kavos-naxos-naxos',
    location: {
      island: 'Naxos',
      area: 'Agios Prokopios',
      coordinates: {
        latitude: 37.0734,
        longitude: 25.3546
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 180,
      max: 450,
      currency: 'EUR'
    },
    description: `Kavos Naxos offers a perfect blend of traditional architecture and modern comfort, overlooking the crystal waters of Agios Prokopios beach. The hotel features stylish studios and apartments with private terraces, surrounded by beautiful Mediterranean gardens. The infinity pool provides stunning sunset views, while the beach bar serves creative cocktails and light meals.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity pool',
      'Beach access',
      'Pool bar',
      'Garden terraces',
      'Breakfast service',
      'Water sports facilities',
      'Car rental service'
    ],
    images: [
      '/images/hotels/kavos-naxos/exterior.jpg',
      '/images/hotels/kavos-naxos/pool.jpg',
      '/images/hotels/kavos-naxos/studio.jpg',
      '/images/hotels/kavos-naxos/garden.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'kn-001',
        type: 'Studio Room',
        description: 'Cozy studio with private terrace and garden views.',
        price: 200,
        image: '/images/rooms/kavos-naxos/studio-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 25,
        amenities: [
          'Garden View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'parilio-hotel',
    name: 'Parilio Hotel',
    slug: 'parilio-hotel-paros',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      coordinates: {
        latitude: 37.1234,
        longitude: 25.2345
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 400,
      max: 1000,
      currency: 'EUR'
    },
    description: `Parilio Hotel is a luxurious sanctuary that celebrates the timeless beauty of Cycladic architecture. Located near Naoussa, this boutique property features minimalist suites with private terraces and stunning views. The cross-shaped pool is a architectural masterpiece, while the spa offers treatments using local ingredients. The restaurant serves contemporary Greek cuisine with a focus on local ingredients.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Signature pool',
      'Luxury spa',
      'Gourmet restaurant',
      'Fitness center',
      'Private terraces',
      'Concierge service',
      'Art collection'
    ],
    images: [
      '/images/hotels/parilio/exterior.jpg',
      '/images/hotels/parilio/pool.jpg',
      '/images/hotels/parilio/suite.jpg',
      '/images/hotels/parilio/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ph-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views.',
        price: 500,
        image: '/images/rooms/parilio/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'paros-agnanti',
    name: 'Paros Agnanti',
    slug: 'paros-agnanti-paros',
    location: {
      island: 'Paros',
      area: 'Parikia',
      coordinates: {
        latitude: 37.0876,
        longitude: 25.1543
      }
    },
    category: HotelCategory.Resort,
    priceRange: {
      min: 250,
      max: 600,
      currency: 'EUR'
    },
    description: `Paros Agnanti offers a perfect blend of traditional Cycladic architecture and modern comfort, perched on a hill overlooking Parikia Bay. The hotel features multiple levels of infinity pools, creating a cascading effect towards the sea. Each room and suite provides stunning sunset views, while the restaurant serves authentic Greek cuisine using local ingredients.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Multiple infinity pools',
      'Sea view restaurant',
      'Shuttle service',
      'Tennis court',
      'Spa services',
      'Kids pool',
      'Free parking'
    ],
    images: [
      '/images/hotels/paros-agnanti/exterior.jpg',
      '/images/hotels/paros-agnanti/pool.jpg',
      '/images/hotels/paros-agnanti/room.jpg',
      '/images/hotels/paros-agnanti/view.jpg'
    ],
    features: ['Infinity Pool', 'Sea View', 'Restaurant', 'WiFi', 'Room Service', 'Beach Access', 'Bar', 'Family Friendly'],
    rooms: [
      {
        id: 'pa-001',
        type: 'Deluxe Room',
        description: 'Elegant room with modern amenities and stunning sea views.',
        price: 300,
        image: '/images/rooms/paros-agnanti/deluxe-room-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 35,
        amenities: [
          'Sea View',
          'Private Balcony',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'yria-boutique-hotel',
    name: 'Yria Boutique Hotel',
    slug: 'yria-boutique-hotel-paros',
    location: {
      island: 'Paros',
      area: 'Parasporos',
      coordinates: {
        latitude: 37.0789,
        longitude: 25.1432
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    description: `Yria Boutique Hotel offers an intimate luxury experience in a village-style setting. The property features Cycladic architecture with contemporary touches, surrounded by beautiful gardens. Each room and suite is uniquely decorated, featuring private terraces or gardens. The hotel's gourmet restaurant serves creative Greek cuisine, while the spa offers treatments using local ingredients.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Large swimming pool',
      'Gourmet restaurant',
      'Luxury spa',
      'Private beach area',
      'Tennis court',
      'Yoga classes',
      'Garden views'
    ],
    images: [
      '/images/hotels/yria-boutique/exterior.jpg',
      '/images/hotels/yria-boutique/pool.jpg',
      '/images/hotels/yria-boutique/suite.jpg',
      '/images/hotels/yria-boutique/garden.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'yb-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning garden views.',
        price: 400,
        image: '/images/rooms/yria-boutique/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
        amenities: [
          'Garden View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'belvedere-mykonos',
    name: 'Belvedere Mykonos',
    slug: 'belvedere-mykonos-mykonos',
    location: {
      island: 'Mykonos',
      area: 'Mykonos Town',
      coordinates: {
        latitude: 37.4467,
        longitude: 25.3289
      }
    },
    category: HotelCategory.Luxury,
    priceRange: {
      min: 500,
      max: 1500,
      currency: 'EUR'
    },
    description: `Belvedere Mykonos is a luxury hotel complex in the heart of Mykonos Town, offering sophisticated elegance and world-class service. The property features a collection of rooms, suites, and private villas, each showcasing contemporary design with traditional elements. The Six Senses spa provides exceptional treatments, while the Matsuhisa restaurant offers acclaimed Japanese cuisine with Peruvian influences.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Six Senses spa',
      'Matsuhisa restaurant',
      'Infinity pool',
      'Pool club',
      'Fitness center',
      'Champagne bar',
      'Concierge service'
    ],
    images: [
      '/images/hotels/belvedere/exterior.jpg',
      '/images/hotels/belvedere/pool.jpg',
      '/images/hotels/belvedere/suite.jpg',
      '/images/hotels/belvedere/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'bm-001',
        type: 'Deluxe Room',
        description: 'Elegant room with modern amenities and stunning views.',
        price: 600,
        image: '/images/rooms/belvedere/deluxe-room-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 35,
        amenities: [
          'Sea View',
          'Private Balcony',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'kouros-village',
    name: 'Kouros Village',
    slug: 'kouros-village-mykonos',
    location: {
      island: 'Mykonos',
      area: 'Mykonos Town',
      coordinates: {
        latitude: 37.4489,
        longitude: 25.3287
      }
    },
    category: HotelCategory.Boutique,
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    description: `Kouros Village offers a perfect blend of traditional Cycladic architecture and modern comfort, overlooking the Aegean Sea and Mykonos Town. Each room features a private balcony with stunning views, while the infinity pool provides a perfect sunset watching spot. The hotel's restaurant serves creative Mediterranean cuisine using local ingredients.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity pool',
      'Sea view restaurant',
      'Pool bar',
      'Spa services',
      'Fitness room',
      'Shuttle service',
      'Concierge'
    ],
    images: [
      '/images/hotels/kouros-village/exterior.jpg',
      '/images/hotels/kouros-village/pool.jpg',
      '/images/hotels/kouros-village/room.jpg',
      '/images/hotels/kouros-village/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'kv-001',
        type: 'Deluxe Room',
        description: 'Elegant room with modern amenities and stunning sea views.',
        price: 400,
        image: '/images/rooms/kouros-village/deluxe-room-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 30,
        amenities: [
          'Sea View',
          'Private Balcony',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'cavo-tagoo',
    name: 'Cavo Tagoo',
    slug: 'cavo-tagoo-mykonos',
    location: {
      island: 'Mykonos',
      area: 'Mykonos Town',
      coordinates: {
        latitude: 37.4512,
        longitude: 25.3198
      }
    },
    category: HotelCategory.UltraLuxury,
    priceRange: {
      min: 800,
      max: 2500,
      currency: 'EUR'
    },
    description: `Cavo Tagoo is an architectural marvel combining luxury with minimalist aesthetics. This world-renowned hotel features cave pools, an infinity pool with floating sunbeds, and rooms with private plunge pools. The Buddha-Bar Beach offers sophisticated dining and cocktails, while the spa provides exclusive treatments. Each suite is a masterpiece of contemporary design with stunning sunset views.`,
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity pool',
      'Buddha-Bar Beach',
      'Luxury spa',
      'Private pools',
      'Helipad',
      'Fine dining',
      'Yacht services'
    ],
    images: [
      '/images/hotels/cavo-tagoo/exterior.jpg',
      '/images/hotels/cavo-tagoo/pool.jpg',
      '/images/hotels/cavo-tagoo/suite.jpg',
      '/images/hotels/cavo-tagoo/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ct-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views.',
        price: 1000,
        image: '/images/rooms/cavo-tagoo/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 50,
        amenities: [
          'Sea View',
          'Private Plunge Pool',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'kavos-naxos',
    name: 'Kavos Naxos',
    slug: 'kavos-naxos-naxos',
    location: {
      island: 'Naxos',
      area: 'Agios Prokopios',
      address: 'Agios Prokopios Beach',
      coordinates: {
        latitude: 37.0741,
        longitude: 25.3428
      }
    },
    description: `Boutique hotel overlooking Agios Prokopios beach, offering Cycladic-style accommodation with modern amenities. Features stunning sea views, a swimming pool, and traditional architecture blended with contemporary comfort.`,
    category: HotelCategory.Boutique,
    priceRange: {
      min: 180,
      max: 450,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Swimming Pool',
      'Sea View Rooms',
      'Beach Access',
      'Restaurant',
      'Bar',
      'WiFi',
      'Garden',
      'Terrace'
    ],
    images: [
      '/images/hotels/kavos-naxos/exterior.jpg',
      '/images/hotels/kavos-naxos/pool.jpg',
      '/images/hotels/kavos-naxos/studio.jpg',
      '/images/hotels/kavos-naxos/garden.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'kn-001',
        type: 'Studio Room',
        description: 'Cozy studio with private terrace and garden views.',
        price: 200,
        image: '/images/rooms/kavos-naxos/studio-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 25,
        amenities: [
          'Garden View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'parilio-hotel',
    name: 'Parilio Hotel',
    slug: 'parilio-hotel-paros',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      address: 'Kolympithres',
      coordinates: {
        latitude: 37.1456,
        longitude: 25.2345
      }
    },
    description: `Luxury design hotel combining minimalist aesthetics with high-end comfort. Features cross-shaped pool, spa facilities, and sophisticated dining options. Each room showcases contemporary Greek design with custom-made furniture.`,
    category: HotelCategory.Luxury,
    priceRange: {
      min: 400,
      max: 1200,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Designer Pool',
      'Spa Center',
      'Fine Dining Restaurant',
      'Cocktail Bar',
      'Fitness Center',
      'Luxury Suites',
      'Concierge Service',
      'Art Collection'
    ],
    images: [
      '/images/hotels/parilio/exterior.jpg',
      '/images/hotels/parilio/pool.jpg',
      '/images/hotels/parilio/suite.jpg',
      '/images/hotels/parilio/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ph-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views.',
        price: 500,
        image: '/images/rooms/parilio/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'verina-astra',
    name: 'Verina Astra',
    slug: 'verina-astra-sifnos',
    location: {
      island: 'Sifnos',
      area: 'Poulati',
      address: 'Poulati Cliff',
      coordinates: {
        latitude: 36.9723,
        longitude: 24.7445
      }
    },
    description: `Boutique hotel perched on Poulati cliff, offering stunning Aegean views. Features infinity pool, luxurious suites with private terraces, and gourmet dining. Known for its romantic atmosphere and spectacular sunsets.`,
    category: HotelCategory.Boutique,
    priceRange: {
      min: 350,
      max: 900,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity Pool',
      'Gourmet Restaurant',
      'Private Terraces',
      'Spa Services',
      'Yoga Classes',
      'Concierge Service',
      'Library',
      'Art Gallery'
    ],
    images: [
      '/images/hotels/verina-astra/exterior.jpg',
      '/images/hotels/verina-astra/pool.jpg',
      '/images/hotels/verina-astra/suite.jpg',
      '/images/hotels/verina-astra/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'va-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views.',
        price: 450,
        image: '/images/rooms/verina-astra/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'kamaroti-suites',
    name: 'Kamaroti Suites',
    slug: 'kamaroti-suites-sifnos',
    location: {
      island: 'Sifnos',
      area: 'Kamares',
      address: 'Kamares Bay',
      coordinates: {
        latitude: 36.9945,
        longitude: 24.6734
      }
    },
    description: `Contemporary hotel set in beautiful gardens with views of Kamares Bay. Features stylish suites, pool with sun terrace, and modern amenities while maintaining traditional Cycladic charm.`,
    category: HotelCategory.Boutique,
    priceRange: {
      min: 200,
      max: 600,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Swimming Pool',
      'Garden Views',
      'Restaurant',
      'Pool Bar',
      'WiFi',
      'Breakfast Terrace',
      'Room Service',
      'Bicycle Rental'
    ],
    images: [
      '/images/hotels/kamaroti-suites/exterior.jpg',
      '/images/hotels/kamaroti-suites/pool.jpg',
      '/images/hotels/kamaroti-suites/suite.jpg',
      '/images/hotels/kamaroti-suites/garden.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ks-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning garden views.',
        price: 300,
        image: '/images/rooms/kamaroti-suites/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
        amenities: [
          'Garden View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'myconian-villa-collection',
    name: 'Myconian Villa Collection',
    slug: 'myconian-villa-collection-mykonos',
    location: {
      island: 'Mykonos',
      area: 'Elia Beach',
      address: 'Elia Beach',
      coordinates: {
        latitude: 37.4246,
        longitude: 25.3912
      }
    },
    description: `Ultra-luxury villa resort overlooking Elia Beach. Features private pools, personalized service, and exclusive amenities. Each villa offers sophisticated design, stunning sea views, and ultimate privacy.`,
    category: HotelCategory.Luxury,
    priceRange: {
      min: 800,
      max: 3000,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private Pools',
      'Butler Service',
      'Gourmet Restaurant',
      'Thalasso Spa',
      'Private Beach Area',
      'Helipad',
      'Wine Cellar',
      'Yacht Services'
    ],
    images: [
      '/images/hotels/myconian-villa-collection/exterior.jpg',
      '/images/hotels/myconian-villa-collection/pool.jpg',
      '/images/hotels/myconian-villa-collection/villa.jpg',
      '/images/hotels/myconian-villa-collection/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'mvc-001',
        type: 'Deluxe Villa',
        description: 'Luxurious villa with private pool and stunning sea views.',
        price: 1200,
        image: '/images/rooms/myconian-villa-collection/deluxe-villa-1.jpg',
        maxOccupancy: 4,
        bedType: 'King',
        size: 80,
        amenities: [
          'Private Pool',
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'beach-house',
    name: 'Beach House Antiparos',
    slug: 'beach-house-antiparos',
    location: {
      island: 'Antiparos',
      area: 'Soros Beach',
      address: 'Soros Beach',
      coordinates: {
        latitude: 37.0297,
        longitude: 25.0584
      }
    },
    description: `Boutique beachfront hotel offering laid-back luxury and direct access to Soros Beach. Features boho-chic design, beachfront restaurant, and intimate atmosphere. Perfect for those seeking a sophisticated yet relaxed island experience.`,
    category: HotelCategory.Boutique,
    priceRange: {
      min: 300,
      max: 800,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Beachfront Location',
      'Restaurant & Bar',
      'Beach Service',
      'WiFi',
      'Garden',
      'Yoga Classes',
      'Water Sports',
      'Sunset Views'
    ],
    images: [
      '/images/hotels/beach-house/exterior.jpg',
      '/images/hotels/beach-house/pool.jpg',
      '/images/hotels/beach-house/suite.jpg',
      '/images/hotels/beach-house/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'bh-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning sea views.',
        price: 400,
        image: '/images/rooms/beach-house/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 40,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'grace-santorini',
    name: 'Grace Santorini',
    slug: 'grace-santorini-santorini',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      address: 'Imerovigli Caldera',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.4262
      }
    },
    description: `Iconic luxury hotel perched on Santorini's caldera cliff, offering breathtaking views and world-class amenities. Features award-winning restaurant, infinity pool, and champagne lounge. Each room provides stunning sunset views over the Aegean Sea.`,
    category: HotelCategory.Luxury,
    priceRange: {
      min: 1000,
      max: 3500,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Infinity Pool',
      'Fine Dining Restaurant',
      'Champagne Lounge',
      'Spa Treatments',
      'Fitness Center',
      'Private Terraces',
      'Butler Service',
      'Wine Tasting'
    ],
    images: [
      '/images/hotels/grace-santorini/exterior.jpg',
      '/images/hotels/grace-santorini/pool.jpg',
      '/images/hotels/grace-santorini/suite.jpg',
      '/images/hotels/grace-santorini/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'gr-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning views',
        price: 800,
        image: '/images/hotels/grace-santorini/suite.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'naxian-collection',
    name: 'Naxian Collection',
    slug: 'naxian-collection-naxos',
    location: {
      island: 'Naxos',
      area: 'Stelida',
      address: 'Stelida Hill',
      coordinates: {
        latitude: 37.0823,
        longitude: 25.3428
      }
    },
    description: `Luxury boutique hotel featuring private villas with pools and stunning sea views. Combines minimalist Cycladic architecture with modern luxury. Features organic restaurant using produce from own farm.`,
    category: HotelCategory.Luxury,
    priceRange: {
      min: 450,
      max: 1500,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private Pools',
      'Organic Restaurant',
      'Farm-to-Table',
      'Spa Services',
      'Wine Cellar',
      'Private Beach Area',
      'Yoga Classes',
      'Cooking Classes'
    ],
    images: [
      '/images/hotels/naxian-collection/exterior.jpg',
      '/images/hotels/naxian-collection/pool.jpg',
      '/images/hotels/naxian-collection/villa.jpg',
      '/images/hotels/naxian-collection/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'nc-001',
        type: 'Deluxe Villa',
        description: 'Luxurious villa with private pool and stunning sea views.',
        price: 500,
        image: '/images/rooms/naxian-collection/deluxe-villa-1.jpg',
        maxOccupancy: 3,
        bedType: 'King',
        size: 60,
        amenities: [
          'Private Pool',
          'Sea View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'absolute-bliss',
    name: 'Absolute Bliss',
    slug: 'absolute-bliss-santorini',
    location: {
      island: 'Santorini',
      area: 'Imerovigli',
      address: 'Imerovigli Caldera',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.4262
      }
    },
    description: `Romantic boutique hotel perched on Santorini's caldera cliff. Features cave suites with private jacuzzis, panoramic volcano views, and personalized service. Perfect for honeymoons and special occasions.`,
    category: HotelCategory.Boutique,
    priceRange: {
      min: 500,
      max: 1500,
      currency: 'EUR'
    },
    rating: 4.5,
    reviews: 156,
    amenities: [
      'Private Jacuzzis',
      'Caldera Views',
      'Gourmet Restaurant',
      'Wine Tasting',
      'Spa Services',
      'Infinity Pool',
      'Butler Service',
      'Sunset Terrace'
    ],
    images: [
      '/images/hotels/absolute-bliss/exterior.jpg',
      '/images/hotels/absolute-bliss/suite.jpg',
      '/images/hotels/absolute-bliss/pool.jpg',
      '/images/hotels/absolute-bliss/restaurant.jpg'
    ],
    features: [],
    rooms: [
      {
        id: 'ab-001',
        type: 'Deluxe Suite',
        description: 'Elegant suite with modern amenities and stunning caldera views.',
        price: 600,
        image: '/images/rooms/absolute-bliss/deluxe-suite-1.jpg',
        maxOccupancy: 2,
        bedType: 'King',
        size: 45,
        amenities: [
          'Caldera View',
          'Private Terrace',
          'Mini Bar',
          'WiFi',
          'Air Conditioning'
        ]
      }
    ]
  },
  {
    id: 'naxos-resort',
    name: 'Naxos Resort',
    slug: 'naxos-resort-naxos',
    location: {
      island: 'Naxos',
      area: 'St. George Beach',
      address: 'St. George Beach',
      coordinates: {
        latitude: 37.0741,
        longitude: 25.3428
      }
    },
    description: 'A beachfront resort offering comfortable accommodations and excellent amenities in the heart of St. George Beach, Naxos.',
    category: HotelCategory.Resort,
    rating: 4.5,
    reviews: 156,
    priceRange: {
      min: 150,
      max: 400,
      currency: 'EUR'
    },
    features: [
      'WiFi',
      'Pool',
      'Restaurant',
      'Beach Access',
      'Room Service'
    ],
    rooms: [
      {
        id: 'standard-double',
        type: 'Standard Double Room',
        description: 'Comfortable room with modern amenities and garden view',
        price: 150,
        image: '/images/hotels/naxos-resort/rooms/standard-double-1.jpg',
        maxOccupancy: 2,
        bedType: 'Double',
        size: 20,
        amenities: [
          'Air Conditioning',
          'WiFi',
          'TV',
          'Mini Fridge',
          'Private Bathroom'
        ]
      },
      {
        id: 'sea-view-suite',
        type: 'Sea View Suite',
        description: 'Luxurious suite with panoramic sea views.',
        price: 300,
        image: '/images/hotels/naxos-resort/rooms/sea-view-suite-1.jpg',
        maxOccupancy: 4,
        bedType: 'King',
        size: 50,
        amenities: [
          'Air Conditioning',
          'WiFi',
          'TV',
          'Mini Bar',
          'Private Balcony',
          'Separate Living Area'
        ]
      }
    ],
    images: [
      '/images/hotels/naxos-resort/main.jpg',
      '/images/hotels/naxos-resort/pool.jpg',
      '/images/hotels/naxos-resort/beach.jpg',
      '/images/hotels/naxos-resort/restaurant.jpg',
      '/images/hotels/naxos-resort/lobby.jpg'
    ],
    amenities: [
      'WiFi',
      'Swimming Pool',
      'Restaurant',
      'Beach Access',
      'Room Service',
      'Parking',
      'Air Conditioning'
    ]
  }
];

export type { Hotel };
