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

export interface Island {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  quote?: string;
  image: string;
  heroImage?: string;
  size?: IslandSize;
  averageStay?: number;
  weather?: {
    temp?: number;
    condition?: string;
    summer: string;
    winter: string;
    spring: string;
    autumn: string;
  };
  bestTime?: {
    months: string[];
    description?: string;
  };
  idealFor?: string[];
  activities?: IslandActivity[];
  highlights?: string[];
  ports?: string[];
  transportation?: IslandTransportation;
  contacts?: IslandContacts;
  vibes?: IslandVibe[];
  mustSee?: string[];
  connectedIslands?: {
    direct: string[];
    nearby: string[];
    other?: string[];
  };
  metaDescription?: string;
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
