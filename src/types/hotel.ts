export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}

export type HotelCategory = 'Luxury' | 'Boutique' | 'Resort' | 'Villa';

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
  | 'Family Friendly';

export interface HotelLocation {
  island: string;
  area: string;
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

export interface Hotel {
  id: string;
  name: string;
  location: HotelLocation;
  category: HotelCategory;
  priceRange: HotelPriceRange;
  starRating: number;
  keyFeatures: HotelFeature[];
  shortDescription: string;
  description: string;
  rooms: HotelRoom[];
  amenities: string[];
  images: HotelImages;
  bookingUrl?: string;
  checkIn?: string;
  checkOut?: string;
  policies?: {
    cancellation?: string;
    children?: string;
    pets?: string;
  };
  roomTypes?: string[];
}
