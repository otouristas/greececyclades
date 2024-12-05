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
