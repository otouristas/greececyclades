export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface HotelRoom {
  id: string;
  type: string;
  description: string;
  price: number;
  image: string;
  maxOccupancy: number;
  bedType: string;
  size: number;
  amenities: string[];
}

export enum HotelCategory {
  UltraLuxury = 'Ultra Luxury',
  Luxury = 'Luxury',
  Boutique = 'Boutique',
  Resort = 'Resort',
  Villa = 'Villa'
}

export type HotelFeature = 
  | 'WiFi'
  | 'Pool'
  | 'Restaurant'
  | 'Spa'
  | 'Private Pool'
  | 'Fine Dining'
  | 'Sea View'
  | 'Room Service'
  | 'Airport Transfer'
  | 'Infinity Pool'
  | 'Beach Access'
  | 'Fitness Center'
  | 'Bar'
  | 'Concierge'
  | 'Free Parking'
  | 'Adults Only'
  | 'Cycladic Design'
  | 'Garden View'
  | 'Beachfront'
  | 'Family Friendly'
  | 'Wellness Center'
  | 'Private Beach'
  | 'Gourmet Restaurant'
  | 'Sea View Rooms'
  | 'Private Villas'
  | 'Minimalist Design'
  | 'Private Terraces'
  | 'Eco-Friendly'
  | 'Beachfront Location'
  | 'Water Sports'
  | 'Sunset Views'
  | 'Beach Club'
  | 'Designer Interiors';

export interface HotelLocation {
  island: string;
  area: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface HotelPriceRange {
  min: number;
  max: number;
  currency?: string;
}

export interface HotelImages {
  main: string;
  gallery: string[];
}

export interface HotelReview {
  rating: number;
  count: number;
  highlights: string[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  description: string;
  location: {
    island: string;
    area: string;
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  images: string[];
  amenities: string[];
  rooms: HotelRoom[];
  rating: number;
  reviews: number;
  category: HotelCategory;
  features: HotelFeature[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  seoMeta?: {
    title: string;
    description: string;
    keywords: string[];
  };
}
