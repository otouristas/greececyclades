export * from './vehicle';
export * from './hotel';
export * from './island';
export * from './blog';

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