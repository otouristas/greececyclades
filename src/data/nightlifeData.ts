import { NightlifeVenue, VenueType } from '../types/nightlife';

export const nightlifeData: NightlifeVenue[] = [
  {
    id: 'caprice',
    name: 'Caprice',
    slug: 'caprice',
    location: {
      island: 'Mykonos',
      area: 'Little Venice',
      address: 'Little Venice Waterfront',
      coordinates: {
        latitude: 37.4467,
        longitude: 25.3255
      }
    },
    description: `Iconic waterfront bar in Mykonos' Little Venice, Caprice is famous for its stunning sunset views and vibrant atmosphere. Known for creative cocktails, international DJs, and being one of the most photographed spots in Mykonos.`,
    venueType: VenueType.Bar,
    priceRange: 'High',
    openingHours: {
      monday: '19:00-03:00',
      tuesday: '19:00-03:00',
      wednesday: '19:00-03:00',
      thursday: '19:00-03:00',
      friday: '19:00-04:00',
      saturday: '19:00-04:00',
      sunday: '19:00-03:00'
    },
    features: [
      'Sunset Views',
      'Cocktail Bar',
      'DJ Sets',
      'Waterfront Location',
      'Celebrity Hotspot'
    ],
    seoMeta: {
      title: 'Caprice Bar Mykonos - Iconic Little Venice Sunset Bar',
      description: 'Experience the legendary Caprice Bar in Mykonos Little Venice. Famous for sunset views, cocktails, and vibrant nightlife.',
      keywords: ['Caprice Mykonos', 'Little Venice bars', 'Mykonos sunset bar', 'Mykonos nightlife']
    }
  },
  {
    id: 'galleraki',
    name: 'Galleraki',
    slug: 'galleraki',
    location: {
      island: 'Mykonos',
      area: 'Little Venice',
      address: 'Little Venice Waterfront',
      coordinates: {
        latitude: 37.4465,
        longitude: 25.3257
      }
    },
    description: `Sophisticated cocktail bar in Little Venice offering panoramic sea views and an intimate atmosphere. Famous for its signature cocktails and champagne selection, Galleraki provides a more refined nightlife experience with unmatched sunset views.`,
    venueType: VenueType.CocktailBar,
    priceRange: 'High',
    openingHours: {
      monday: '19:00-03:00',
      tuesday: '19:00-03:00',
      wednesday: '19:00-03:00',
      thursday: '19:00-03:00',
      friday: '19:00-03:00',
      saturday: '19:00-03:00',
      sunday: '19:00-03:00'
    },
    features: [
      'Signature Cocktails',
      'Champagne Bar',
      'Sunset Views',
      'Intimate Atmosphere',
      'Waterfront Location'
    ],
    seoMeta: {
      title: 'Galleraki Cocktail Bar - Little Venice Mykonos',
      description: 'Enjoy sophisticated cocktails and stunning sunset views at Galleraki in Mykonos Little Venice. Premium champagne and signature drinks.',
      keywords: ['Galleraki Mykonos', 'cocktail bar Little Venice', 'Mykonos champagne bar', 'sunset cocktails Mykonos']
    }
  }
];
