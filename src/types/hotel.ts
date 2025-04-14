export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface RoomFeature {
  name: string;
  description?: string;
}

export interface RoomAmenity {
  name: string;
  included: boolean;
}

export interface HotelRoom {
  name: string;
  description: string;
  price: number;
  capacity: number;
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

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface HotelReview {
  rating: number;
  count: number;
  highlights: string[];
  breakdown: RatingBreakdown;
  reviews: Review[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface Hotel {
  id: string;
  created_at?: string;
  name: string;
  description: string;
  slug: string;
  island_id: string;
  location: {
    island: string;
    area: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  category: string;
  star_rating: number;
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  featured?: boolean;
  images: {
    main: string;
    gallery: string[];
  };
  address: string;
  amenities: string[];
  room_types: HotelRoom[];
  rating: number;
  reviews_count: number;
  latitude?: number;
  longitude?: number;
  
  // Legacy fields for compatibility with existing components
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  features?: HotelFeature[];
  reviews?: {
    count: number;
    rating: number;
    highlights?: string[];
    breakdown?: RatingBreakdown;
    reviews?: Review[];
  };
}
