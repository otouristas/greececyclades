export enum CulinaryCategory {
  Workshop = 'Workshop',
  FoodTour = 'Food Tour',
  Tasting = 'Tasting',
  FarmVisit = 'Farm Visit',
  CookingClass = 'Cooking Class',
  DinnerExperience = 'Dinner Experience'
}

export interface CulinaryExperience {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  location: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    display: string;
  };
  category: CulinaryCategory;
  included: string[];
  bestTime: string;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
}
