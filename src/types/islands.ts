import { AvailableMonth, IslandVibe, IslandActivity } from './island';

export interface Weather {
  temp: number;
  condition: string;
  summer: string;
  winter: string;
  spring: string;
  autumn: string;
}

export interface Island {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  quote: string;
  metaTitle: string;
  metaDescription: string;
  activities: IslandActivity[];
  bestMonths: AvailableMonth[];
  averageStay: number;
  mustSee: string[];
  image: string;
  vibes: IslandVibe[];
  size: keyof typeof STAY_DURATION;
  slug: string;
  heroImage: string;
  highlights: string[];
  weather: Weather;
  bestTime: {
    months: AvailableMonth[];
    reason: string;
  };
  idealFor: string[];
}

export interface TripPlan {
  islands: Island[];
  duration: number;
  month: AvailableMonth;
  vibes: IslandVibe[];
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
