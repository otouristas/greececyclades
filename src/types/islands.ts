import { AvailableMonth, IslandVibe } from './island';

export interface Weather {
  temp: string;
  condition: string;
}

export interface Island {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  quote: string;
  metaTitle: string;
  metaDescription: string;
  activities: string[];
  bestMonths: string[];
  averageStay: number;
  mustSee: string[];
  image: string;
  vibes: string[];
  size: keyof typeof STAY_DURATION;
  slug: string;
  heroImage: string;
  highlights: string[];
  weather: {
    summer: string;
    winter: string;
    spring: string;
    autumn: string;
  };
  bestTime: {
    months: string[];
    reason: string;
  };
  idealFor: string[];
}

export interface TripPlan {
  islands: Island[];
  duration: number;
  month: string;
  vibes: string[];
  pace: 'relaxed' | 'moderate' | 'active';
  aiSuggestions?: string;
  userId?: string;
  createdAt?: Date;
}

export interface TripPreferences {
  duration: number;
  month: AvailableMonth;
  vibes: IslandVibe[];
  pace: 'relaxed' | 'moderate' | 'active';
}

export const STAY_DURATION = {
  MAJOR: 4,
  MEDIUM: 3,
  MINOR: 2
} as const;

export type IslandSize = keyof typeof STAY_DURATION;
