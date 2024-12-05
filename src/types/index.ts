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

export interface Hotel {
  id: string;
  name: string;
  location: string;
  island: string;
  type: string;
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
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
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