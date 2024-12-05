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

export interface ActivityFilters {
  category: string | null;
  location: string | null;
  rating: number | null;
  priceRange: { min: number; max: number } | null;
  duration: string | null;
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
  bestTime: string;
  idealFor: string[];
}
