export enum CuisineType {
  GREEK = 'Greek',
  MEDITERRANEAN = 'Mediterranean',
  SEAFOOD = 'Seafood',
  INTERNATIONAL = 'International',
  FUSION = 'Fusion',
  BBQ = 'BBQ'
}

export enum PriceRange {
  BUDGET = '€',
  MODERATE = '€€',
  EXPENSIVE = '€€€',
  LUXURY = '€€€€',
  UPSCALE = 'Upscale'
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  location: {
    island: string;
    area: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  description: string;
  cuisine: CuisineType[];
  priceRange: PriceRange;
  averagePrice: number;
  rating?: number;
  openingHours?: {
    [key: string]: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images?: string[];
  features?: string[];
  reservationRequired?: boolean;
  seoMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
