import { Restaurant, CuisineType, PriceRange } from '../types/restaurant';

export const restaurantsData: Restaurant[] = [
  {
    id: 'santorini-caldera',
    name: 'Caldera Restaurant',
    slug: 'santorini-caldera',
    location: {
      island: 'Santorini',
      area: 'Oia',
      address: 'Oia Main Street',
      coordinates: {
        latitude: 36.4618,
        longitude: 25.3753
      }
    },
    description: `Experience fine dining with breathtaking caldera views in Santorini. Our restaurant offers a perfect blend of Mediterranean cuisine and romantic atmosphere, making every meal memorable. Watch the famous Santorini sunset while enjoying carefully crafted dishes made with local ingredients.`,
    cuisineType: [CuisineType.Mediterranean, CuisineType.Greek, CuisineType.Seafood],
    priceRange: PriceRange.Luxury,
    averagePrice: 120,
    openingHours: {
      monday: '18:00-23:00',
      tuesday: '18:00-23:00',
      wednesday: '18:00-23:00',
      thursday: '18:00-23:00',
      friday: '18:00-23:00',
      saturday: '18:00-23:00',
      sunday: '18:00-23:00'
    },
    features: [
      'Caldera View',
      'Sunset View',
      'Fine Dining',
      'Wine Cellar',
      'Romantic Atmosphere',
      'Outdoor Seating'
    ],
    reservationRequired: true,
    seoMeta: {
      title: 'Caldera Restaurant Santorini - Fine Dining with Sunset Views',
      description: 'Experience exquisite Mediterranean cuisine at Caldera Restaurant in Oia, Santorini. Enjoy breathtaking sunset views and fine dining in a romantic atmosphere.',
      keywords: ['Santorini restaurants', 'caldera view dining', 'Oia fine dining', 'romantic restaurant Santorini']
    }
  },
  {
    id: 'kikis-tavern',
    name: 'Kiki\'s Tavern',
    slug: 'kikis-tavern',
    location: {
      island: 'Mykonos',
      area: 'Agios Sostis',
      address: 'Agios Sostis Beach',
      coordinates: {
        latitude: 37.4847,
        longitude: 25.3889
      }
    },
    description: `Iconic no-electricity taverna serving traditional Greek cuisine. Famous for its grilled meats and fresh salads, Kiki's offers an authentic dining experience with a stunning beach view. No reservations, first-come-first-served basis.`,
    cuisineType: [CuisineType.Greek, CuisineType.BBQ],
    priceRange: PriceRange.Moderate,
    averagePrice: 40,
    openingHours: {
      monday: '12:30-18:00',
      tuesday: '12:30-18:00',
      wednesday: '12:30-18:00',
      thursday: '12:30-18:00',
      friday: '12:30-18:00',
      saturday: '12:30-18:00',
      sunday: 'Closed'
    },
    features: [
      'No Electricity',
      'Charcoal Grill',
      'Beach Location',
      'Traditional Cooking',
      'Fresh Ingredients'
    ],
    reservationRequired: false,
    seoMeta: {
      title: 'Kiki\'s Tavern Mykonos - Traditional Greek Restaurant',
      description: 'Experience authentic Greek cuisine at Kiki\'s Tavern. Famous no-electricity restaurant with charcoal-grilled specialties.',
      keywords: ['Kikis Tavern', 'Mykonos restaurants', 'traditional Greek food', 'Agios Sostis dining']
    }
  },
  {
    id: 'nammos-restaurant',
    name: 'Nammos Restaurant',
    slug: 'nammos',
    location: {
      island: 'Mykonos',
      area: 'Psarou',
      address: 'Psarou Beach',
      coordinates: {
        latitude: 37.4147,
        longitude: 25.3389
      }
    },
    description: `World-renowned beach restaurant offering luxury dining experience. Features fresh Mediterranean cuisine, extensive wine list, and vibrant atmosphere. Known for celebrity visits and exclusive beach club setting.`,
    cuisineType: [CuisineType.Mediterranean, CuisineType.Seafood, CuisineType.International],
    priceRange: PriceRange.Luxury,
    averagePrice: 200,
    openingHours: {
      monday: '12:00-00:00',
      tuesday: '12:00-00:00',
      wednesday: '12:00-00:00',
      thursday: '12:00-00:00',
      friday: '12:00-02:00',
      saturday: '12:00-02:00',
      sunday: '12:00-00:00'
    },
    features: [
      'Beach Club',
      'Fine Dining',
      'Wine Cellar',
      'Sushi Bar',
      'VIP Service',
      'DJ Sets'
    ],
    reservationRequired: true,
    seoMeta: {
      title: 'Nammos Mykonos - Luxury Beach Restaurant',
      description: 'Experience world-class dining at Nammos Mykonos. Exclusive beach restaurant offering Mediterranean cuisine and premium service.',
      keywords: ['Nammos restaurant', 'Mykonos fine dining', 'Psarou Beach restaurant', 'luxury dining Greece']
    }
  },
  {
    id: 'naxos-restaurants',
    name: 'To Elliniko',
    slug: 'naxos-restaurants',
    location: {
      island: 'Naxos',
      area: 'Naxos Town',
      address: 'Old Market Street',
      coordinates: {
        latitude: 37.1036,
        longitude: 25.3755
      }
    },
    description: `Traditional Greek taverna in the heart of Naxos Town, featuring local specialties and fresh seafood. Known for its authentic Naxian dishes, locally-sourced ingredients, and warm family atmosphere.`,
    cuisineType: [CuisineType.Greek, CuisineType.Seafood],
    priceRange: PriceRange.Moderate,
    averagePrice: 35,
    openingHours: {
      monday: '12:00-23:00',
      tuesday: '12:00-23:00',
      wednesday: '12:00-23:00',
      thursday: '12:00-23:00',
      friday: '12:00-23:00',
      saturday: '12:00-23:00',
      sunday: '12:00-23:00'
    },
    features: [
      'Traditional Greek Cuisine',
      'Local Ingredients',
      'Family-Run',
      'Outdoor Seating',
      'Live Music Nights'
    ],
    reservationRequired: false,
    seoMeta: {
      title: 'To Elliniko Restaurant Naxos - Traditional Greek Taverna',
      description: 'Experience authentic Greek cuisine at To Elliniko in Naxos Town. Local specialties and fresh seafood in a traditional taverna setting.',
      keywords: ['Naxos restaurants', 'Greek taverna', 'traditional Greek food', 'Naxos Town dining']
    }
  },
  {
    id: 'naoussa-restaurants',
    name: 'Sigi Ikthios',
    slug: 'naoussa-restaurants',
    location: {
      island: 'Paros',
      area: 'Naoussa',
      address: 'Old Port',
      coordinates: {
        latitude: 37.1234,
        longitude: 25.2345
      }
    },
    description: `Seafood restaurant in the picturesque port of Naoussa, offering fresh catch of the day and traditional Greek dishes. Known for its waterfront location and exceptional fish dishes prepared with local recipes.`,
    cuisineType: [CuisineType.Seafood, CuisineType.Greek],
    priceRange: PriceRange.Upscale,
    averagePrice: 60,
    openingHours: {
      monday: '12:00-23:00',
      tuesday: '12:00-23:00',
      wednesday: '12:00-23:00',
      thursday: '12:00-23:00',
      friday: '12:00-23:00',
      saturday: '12:00-23:00',
      sunday: '12:00-23:00'
    },
    features: [
      'Fresh Seafood',
      'Harbor View',
      'Outdoor Seating',
      'Wine Selection',
      'Catch of the Day'
    ],
    reservationRequired: true,
    seoMeta: {
      title: 'Sigi Ikthios - Premium Seafood Restaurant in Naoussa, Paros',
      description: 'Enjoy fresh seafood and harbor views at Sigi Ikthios in Naoussa, Paros. Traditional Greek fish taverna in the old port.',
      keywords: ['Naoussa restaurants', 'Paros seafood', 'Greek fish taverna', 'Naoussa dining']
    }
  }
];
