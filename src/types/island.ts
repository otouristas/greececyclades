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
  LUXURY = 'luxury',
  ADVENTURE = 'adventure',
  PARTY = 'party',
  NATURAL = 'natural',
  LAID_BACK = 'laid-back',
  TRADITIONAL = 'traditional',
  SCENIC = 'scenic',
  AUTHENTIC = 'authentic',
  LUXURIOUS = 'luxurious',
  COSMOPOLITAN = 'cosmopolitan',
  ACTIVE = 'active',
  FAMILY_FRIENDLY = 'family-friendly',
  VIBRANT = 'vibrant',
  YOUTHFUL = 'youthful',
  LIVELY = 'lively',
  CULTURAL = 'cultural',
  CULINARY = 'culinary',
  PEACEFUL = 'peaceful',
  ELEGANT = 'elegant',
  SPIRITUAL = 'spiritual',
  ADVENTUROUS = 'adventurous',
  HISTORIC = 'historic',
  OFF_THE_BEATEN_PATH = 'off-the-beaten-path',
  RELAXED = 'relaxed'
}

// Available activities
export type IslandActivity = 
  | 'swimming'
  | 'snorkeling'
  | 'hiking'
  | 'wine-tasting'
  | 'archaeological-sites'
  | 'boat-tours'
  | 'water-sports'
  | 'sunset-watching'
  | 'beach-hopping'
  | 'local-cuisine'
  | 'shopping'
  | 'photography'
  | 'village-exploring'
  | 'nightlife'
  | 'spa-wellness'
  | 'rock-climbing'
  | 'monastery-visits'
  | 'traditional-villages';

export interface IslandContacts {
  portAuthority?: string;
  medicalCenter?: string;
  municipality?: string;
  policeStation?: string;
  localBus?: string;
  citizenService?: string;
}

export interface IslandTransportation {
  localBus?: {
    available: boolean;
    frequency: string;
    routes: string[];
  };
  facilities?: {
    atm?: string;
    medicalCenter?: string;
    miniMarket?: string;
    postOffice?: string;
  };
}

export interface Weather {
  condition?: string;
  temperature?: number;
  temp?: number;
  windSpeed?: number;
  humidity?: number;
  summer: string;
  winter: string;
  spring: string;
  autumn: string;
}

export interface Island {
  id: string;
  name: string;
  slug?: string;
  description: string;
  shortDescription: string;
  quote?: string;
  metaDescription?: string;
  image: string;
  heroImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  size?: IslandSize;
  averageStay?: number;
  beaches?: string[];
  weather?: Weather;
  bestTime?: {
    months: AvailableMonth[] | string[];
    description?: string;
  };
  idealFor?: string[];
  activities: IslandActivity[];
  highlights: string[];
  ports?: string[];
  transportation?: IslandTransportation;
  contacts?: IslandContacts;
  vibes?: IslandVibe[];
  connectedIslands?: {
    direct?: string[];
    nearby?: string[];
    other?: string[];
  };
  mustSee?: string[];
}

export interface IslandGuide {
  id: string;
  name: string;
  description: string;
  image: string;
  heroImage?: string;
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

export interface TripPlanBase {
  islands: Island[];
  duration: number;
  month: AvailableMonth;
  vibes: IslandVibe[];
  pace: 'relaxed' | 'moderate' | 'active';
  name: string;
  aiSuggestions: string;
}

export interface TripPlan extends TripPlanBase {
  id: string;
  userId: string;
  createdAt: Date;
}

export type NewTripPlan = Omit<TripPlan, 'id'>;
