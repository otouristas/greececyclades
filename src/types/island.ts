// Stay duration (in days) for different island types
export const STAY_DURATION = {
  MAJOR: 4, // Major islands with lots of attractions
  MEDIUM: 3, // Medium-sized islands with good variety
  MINOR: 2  // Smaller islands or day-trip destinations
} as const;

export type StayDuration = typeof STAY_DURATION[keyof typeof STAY_DURATION];
export type IslandSize = keyof typeof STAY_DURATION;

// Available months for visiting
export const AVAILABLE_MONTHS = [
  'May', 'June', 'July', 'August', 'September', 'October'
] as const;
export type AvailableMonth = typeof AVAILABLE_MONTHS[number];

// Island characteristics
export const ISLAND_VIBES = [
  'romantic',
  'peaceful',
  'lively',
  'adventurous',
  'traditional',
  'luxurious',
  'cultural',
  'scenic'
] as const;
export type IslandVibe = typeof ISLAND_VIBES[number];

// Available activities
export const ISLAND_ACTIVITIES = [
  'swimming',
  'snorkeling',
  'hiking',
  'wine-tasting',
  'archaeological-sites',
  'boat-tours',
  'water-sports',
  'sunset-watching',
  'beach-hopping',
  'local-cuisine',
  'shopping',
  'photography',
  'village-exploring',
  'nightlife',
  'spa-wellness'
] as const;
export type IslandActivity = typeof ISLAND_ACTIVITIES[number];

// Base interface for island data
export interface BaseIsland {
  id: number;
  name: string;
  description: string;
  activities: readonly IslandActivity[];
  bestMonths: readonly AvailableMonth[];
  size: IslandSize;
  mustSee: readonly string[];
  image: string;
  vibes: readonly IslandVibe[];
}

// Extended interface with computed properties
export interface Island extends BaseIsland {
  readonly averageStay: StayDuration;
}

// Type for ensuring correct structure with getters
export type IslandData = Omit<Island, 'averageStay'> & {
  readonly size: IslandSize;
  get averageStay(): StayDuration;
};
