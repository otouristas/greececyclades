export * from './vehicle';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  description: string;
  type: 'attraction' | 'restaurant' | 'event';
  image: string;
  distance: number;
  travelTime: {
    walking?: number;
    driving?: number;
  };
  rating: number;
  priceRange?: string;
  eventDate?: string;
  bookingUrl?: string;
}

export interface Hotel {
  id: string;
  name: string;
  type: 'hotel' | 'villa' | 'resort' | 'boutique';
  island: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  price: {
    from: number;
    currency: string;
  };
  priceRange: string;
  rating: number;
  reviews: number;
  amenities: string[];
  features: string[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  localAttractions?: LocalAttraction[];
  featured?: boolean;
}

export interface Island {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  quote: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  highlights: string[];
  weather: {
    temp: string;
    condition: string;
  };
  activities: number;
}

export interface TravelGuide {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  readTime: number;
  category: string;
  content?: string;
}