export interface BeachClubLocation {
  island: string;
  area: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface BeachClubImages {
  main: string;
  gallery: string[];
}

export interface BeachClubPricing {
  sunbeds: {
    price: number;
    unit: string;  // 'per day', 'per set', etc.
  };
  minimumSpend?: number;
  currency: string;
}

export interface BeachClubAmenities {
  restaurant: boolean;
  bar: boolean;
  parking: boolean;
  wifi: boolean;
  showers: boolean;
  waterSports: boolean;
  musicEvents: boolean;
  spaServices?: boolean;
}

export interface BeachClubOperatingHours {
  opening: string;
  closing: string;
  seasonStart: string;  // e.g., "May"
  seasonEnd: string;    // e.g., "October"
}

export enum BeachClubCategory {
  Luxury = 'luxury',
  Party = 'party',
  Family = 'family',
  Casual = 'casual',
  Exclusive = 'exclusive',
  Boutique = "Boutique"
}

export enum PriceRange {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface BeachClub {
  id: string;
  name: string;
  slug: string;
  location: BeachClubLocation;
  description: string;
  shortDescription: string;
  category: BeachClubCategory;
  priceRange: PriceRange;
  images: BeachClubImages;
  pricing: BeachClubPricing;
  amenities: BeachClubAmenities;
  operatingHours: BeachClubOperatingHours;
  capacity?: number;
  style: string[];  // e.g., ['luxury', 'party', 'family-friendly']
  reservationRequired: boolean;
  reservationUrl?: string;
  phoneNumber?: string;
  website?: string;
  features: string[];  // Special features or highlights
  tags: string[];      // For search and filtering
}
