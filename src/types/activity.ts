export enum ActivityCategory {
  WaterSports = 'water-sports',
  Tours = 'tours',
  Cultural = 'cultural',
  FoodWine = 'food-wine',
  Adventure = 'adventure',
  Nature = 'nature',
  Beach = 'beach',
  Sightseeing = 'sightseeing',
  Culture = 'culture',
  Entertainment = 'entertainment',
  Culinary = 'culinary',
  Food = "Food",
  Water = "Water",
  BeachLife = "BeachLife"
}

export enum ActivityDifficulty {
  Easy = 'easy',
  Intermediate = 'intermediate',
  Challenging = 'challenging',
  Moderate = "Moderate"
}

interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface Rating {
  overall: number;
  totalReviews: number;
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  location: string;
  island: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    display: string;
  };
  included: string[];
  notIncluded?: string[];
  difficulty: ActivityDifficulty;
  category: ActivityCategory;
  maxGroupSize?: number;
  startTimes?: string[];
  availableSeasons?: string[];
  requirements?: string[];
  meetingPoint: string;
  images: {
    main: string;
    gallery: string[];
  };
  tags?: string[];
  languages?: string[];
  providedEquipment?: string[];
  rating?: Rating;
  reviews?: Review[];
  seoMeta?: {
    title: string;
    description: string;
    keywords: string[];
  };
  bestTime?: string;
  minParticipants?: number;
  bookingNotice?: string;
  cancellationPolicy?: string;
  highlights?: string[];
}
