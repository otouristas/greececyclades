import { BeachClub, BeachClubCategory, PriceRange } from '../types/beachClub';

export const beachClubsData: BeachClub[] = [
  {
    id: 'jackie-o-beach',
    name: 'Jackie O\' Beach Club',
    slug: 'jackie-o-beach',
    location: {
      island: 'Mykonos',
      area: 'Super Paradise',
      coordinates: {
        latitude: 37.4082,
        longitude: 25.3841
      }
    },
    description: `Luxurious beach club featuring a stunning infinity pool, Mediterranean restaurant, and vibrant atmosphere. Known for its legendary parties, drag shows, and sophisticated beach experience. The venue offers premium sunbeds, top-tier service, and spectacular sunset views.`,
    shortDescription: 'Iconic Mykonos beach club known for luxury and entertainment',
    category: BeachClubCategory.Luxury,
    priceRange: PriceRange.High,
    images: {
      main: '/images/beach-clubs/jackie-o/main.jpg',
      gallery: [
        '/images/beach-clubs/jackie-o/pool.jpg',
        '/images/beach-clubs/jackie-o/restaurant.jpg',
        '/images/beach-clubs/jackie-o/beach.jpg',
        '/images/beach-clubs/jackie-o/sunset.jpg'
      ]
    },
    pricing: {
      sunbeds: {
        price: 100,
        unit: 'per set'
      },
      minimumSpend: 200,
      currency: 'EUR'
    },
    amenities: {
      restaurant: true,
      bar: true,
      parking: true,
      wifi: true,
      showers: true,
      waterSports: false,
      musicEvents: true,
      spaServices: false
    },
    operatingHours: {
      opening: '10:00',
      closing: '00:00',
      seasonStart: 'May',
      seasonEnd: 'October'
    },
    capacity: 500,
    style: ['luxury', 'party', 'lgbtq-friendly'],
    reservationRequired: true,
    reservationUrl: 'https://jackieobeach.com/reservations',
    phoneNumber: '+30 2289 027072',
    website: 'https://jackieobeach.com',
    features: [
      'Infinity Pool',
      'Mediterranean Restaurant',
      'Sunset Views',
      'DJ Sets',
      'VIP Services'
    ],
    tags: [
      'luxury',
      'party',
      'pool',
      'restaurant',
      'sunset-view',
      'mykonos'
    ]
  },
  {
    id: 'soros-beach-club',
    name: 'Soros Beach Club',
    slug: 'soros-beach-club',
    location: {
      island: 'Antiparos',
      area: 'Soros Beach',
      coordinates: {
        latitude: 37.0297,
        longitude: 25.0584
      }
    },
    description: `Sophisticated beach club on the pristine Soros Beach, offering a perfect blend of relaxation and entertainment. Features comfortable sunbeds, excellent Mediterranean cuisine, and a laid-back atmosphere with occasional DJ sets.`,
    shortDescription: 'Upscale beach club in Antiparos offering relaxation and entertainment',
    category: BeachClubCategory.Boutique,
    priceRange: PriceRange.Medium,
    images: {
      main: '/images/beach-clubs/soros/main.jpg',
      gallery: [
        '/images/beach-clubs/soros/beach.jpg',
        '/images/beach-clubs/soros/restaurant.jpg',
        '/images/beach-clubs/soros/sunbeds.jpg',
        '/images/beach-clubs/soros/dj-set.jpg'
      ]
    },
    pricing: {
      sunbeds: {
        price: 50,
        unit: 'per set'
      },
      minimumSpend: 100,
      currency: 'EUR'
    },
    amenities: {
      restaurant: true,
      bar: true,
      parking: true,
      wifi: true,
      showers: true,
      waterSports: true,
      musicEvents: true,
      spaServices: false
    },
    operatingHours: {
      opening: '10:00',
      closing: '20:00',
      seasonStart: 'June',
      seasonEnd: 'September'
    },
    capacity: 200,
    style: ['boutique', 'relaxing', 'family-friendly'],
    reservationRequired: true,
    reservationUrl: 'https://sorosbeachclub.com/reservations',
    phoneNumber: '+30 2289 027073',
    website: 'https://sorosbeachclub.com',
    features: [
      'Beach Restaurant',
      'Sunbeds',
      'Beach Bar',
      'Water Sports',
      'DJ Sets',
      'Parking'
    ],
    tags: [
      'boutique',
      'relaxing',
      'beach-restaurant',
      'sunbeds',
      'water-sports',
      'antiparos'
    ]
  }
];
