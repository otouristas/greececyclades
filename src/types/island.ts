// Stay duration (in days) for different island types
export const STAY_DURATION = {
  MAJOR: 4, // Major islands with lots of attractions
  MEDIUM: 3, // Medium-sized islands with good variety
  MINOR: 2  // Smaller islands or day-trip destinations
} as const;

export type StayDuration = typeof STAY_DURATION[keyof typeof STAY_DURATION];
export type IslandSize = keyof typeof STAY_DURATION;

// Available months for visiting
export enum AvailableMonth {
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November'
}

// Island characteristics
export enum IslandVibe {
  ROMANTIC = 'romantic',
  PEACEFUL = 'peaceful',
  LIVELY = 'lively',
  ADVENTUROUS = 'adventurous',
  TRADITIONAL = 'traditional',
  LUXURIOUS = 'luxurious',
  CULTURAL = 'cultural',
  SCENIC = 'scenic',
  AUTHENTIC = 'authentic',
  ELEGANT = 'elegant',
  COSMOPOLITAN = 'cosmopolitan',
  ACTIVE = 'active',
  OFF_THE_BEATEN_PATH = 'off-the-beaten-path',
  FAMILY_FRIENDLY = 'family-friendly',
  GASTRONOMIC = 'gastronomic',
  ARTISTIC = 'artistic',
  HISTORIC = 'historic',
  NATURAL = 'natural',
  PARTY = 'party',
  TRENDY = 'trendy',
  YOUTHFUL = 'youthful',
  CULINARY = 'culinary',
  VIBRANT = 'vibrant',
  LAID_BACK = 'laid-back',
  UPSCALE = 'upscale',
  RUSTIC = 'rustic',
  SECLUDED = 'secluded',
  MODERN = 'modern',
  CHARMING = 'charming',
  SPIRITUAL = 'spiritual',
  PHOTOGENIC = 'photogenic',
  QUAINT = 'quaint',
  WILD = 'wild',
  UNTOUCHED = 'untouched',
  CHIC = 'chic',
  RELAXED = 'relaxed'
}

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

interface Weather {
  temp?: number;
  condition?: string;
  summer: string;
  winter: string;
  spring: string;
  autumn: string;
}

export interface Island {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  quote?: string;
  metaTitle?: string;
  metaDescription?: string;
  activities?: IslandActivity[];
  bestMonths?: AvailableMonth[];
  averageStay?: number;
  mustSee?: string[];
  image: string;
  vibes?: IslandVibe[];
  size?: keyof typeof STAY_DURATION;
  slug: string;
  heroImage?: string;
  highlights?: string[];
  ports?: string[];
  weather?: Weather;
  bestTime?: {
    months: AvailableMonth[];
    reason: string;
  };
  idealFor?: string[];
}

export interface IslandGuide {
  id: string;
  name: string;
  description: string;
  image: string;
  weather: {
    temp?: number;
    condition?: string;
    summer: string;
    winter: string;
    spring: string;
    autumn: string;
  };
  bestTime: string;
  idealFor: string[];
}

export interface TripPreferences {
  duration: number;
  month: AvailableMonth;
  vibes: IslandVibe[];
  pace: 'relaxed' | 'moderate' | 'active';
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
