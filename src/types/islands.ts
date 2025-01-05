import { AvailableMonth, IslandVibe } from './island';

export * from './island';

export interface Weather {
  condition: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
}

export type IslandActivity = 
  | 'swimming'
  | 'hiking'
  | 'sightseeing'
  | 'beach'
  | 'museum'
  | 'cultural'
  | 'indoor'
  | 'watersports'
  | 'dining'
  | 'shopping';

export interface Island {
  id: string;
  name: string;
  description: string;
  activities: IslandActivity[];
  highlights: string[];
  vibes: IslandVibe[];
  weather?: Weather;
  bestTime?: {
    months: AvailableMonth[];
  };
  size?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type TripPace = 'relaxed' | 'moderate' | 'active';

export interface TripPlan {
  id: string;
  name: string;
  islands: Island[];
  duration: number;
  month: AvailableMonth;
  vibes: string[];
  pace: TripPace;
  aiSuggestions: string;
  userId: string;
  createdAt: Date;
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
