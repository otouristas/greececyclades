/**
 * Touristas AI - Dynamic User Profiling Engine
 * Implements Tier 1 from thenextbigthing.md
 * 
 * Creates multi-dimensional traveler profiles that evolve with each conversation
 */

// ============================================
// TYPES
// ============================================

export type TravelerArchetype = 
  | 'budget_explorer'
  | 'luxury_comfort_seeker'
  | 'adventure_thrill_seeker'
  | 'cultural_immersion'
  | 'romantic_getaway'
  | 'family_vacation'
  | 'digital_nomad'
  | 'party_goer'
  | 'unknown';

export type TravelPace = 'slow' | 'moderate' | 'fast';
export type RiskTolerance = 'low' | 'medium' | 'high';

export interface BehavioralPatterns {
  bookingWindow: string; // e.g., "3-6 weeks advance"
  preferredIslands: string[];
  avoidedIslands: string[];
  budgetPerDay: number;
  groupComposition: 'solo' | 'couple' | 'friends' | 'family';
  groupSize: number;
  travelPace: TravelPace;
  riskTolerance: RiskTolerance;
  weatherSensitivity: number; // 0-1 scale
  preferredFerryCompanies: string[];
  preferredFerryTime: 'morning' | 'afternoon' | 'evening' | 'any';
  prefersMornings: boolean;
}

export interface PreferenceVector {
  beaches: number;      // 0-1
  nightlife: number;
  foodExperiences: number;
  history: number;
  adventureActivities: number;
  relaxation: number;
  photography: number;
  localCulture: number;
  waterSports: number;
  hiking: number;
}

export interface PastInteractions {
  totalQueries: number;
  ferriesBooked: number;
  ferriesViewed: number;
  hotelsBooked: number;
  hotelsViewed: number;
  activitiesBooked: number;
  activitiesInterested: string[];
  lastVisitedIslands: string[];
  averageSpendPerBooking: number;
  preferredPriceRange: { min: number; max: number };
  lastActiveAt: string;
  conversationCount: number;
}

export interface UserProfile {
  userId: string;
  createdAt: string;
  updatedAt: string;
  travelerArchetype: TravelerArchetype;
  behavioralPatterns: BehavioralPatterns;
  preferenceVector: PreferenceVector;
  pastInteractions: PastInteractions;
  savedTrips: SavedTrip[];
  alerts: ProactiveAlert[];
}

export interface SavedTrip {
  tripId: string;
  name: string;
  startDate: string;
  endDate: string;
  islands: string[];
  ferryBookings: string[];
  hotelBookings: string[];
  activityBookings: string[];
  totalBudget: number;
  status: 'planning' | 'booked' | 'in_progress' | 'completed';
}

export interface ProactiveAlert {
  alertId: string;
  type: 'weather' | 'price_drop' | 'connection_risk' | 'ferry_delay' | 'availability';
  severity: 'low' | 'medium' | 'high';
  message: string;
  relatedBookingId?: string;
  createdAt: string;
  expiresAt: string;
  dismissed: boolean;
  actionTaken?: string;
}

// ============================================
// DEFAULT PROFILE
// ============================================

export function createDefaultProfile(userId?: string): UserProfile {
  return {
    userId: userId || crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    travelerArchetype: 'unknown',
    behavioralPatterns: {
      bookingWindow: 'unknown',
      preferredIslands: [],
      avoidedIslands: [],
      budgetPerDay: 100, // Default mid-range
      groupComposition: 'couple',
      groupSize: 2,
      travelPace: 'moderate',
      riskTolerance: 'medium',
      weatherSensitivity: 0.5,
      preferredFerryCompanies: [],
      preferredFerryTime: 'any',
      prefersMornings: true,
    },
    preferenceVector: {
      beaches: 0.5,
      nightlife: 0.3,
      foodExperiences: 0.5,
      history: 0.3,
      adventureActivities: 0.4,
      relaxation: 0.5,
      photography: 0.4,
      localCulture: 0.5,
      waterSports: 0.3,
      hiking: 0.3,
    },
    pastInteractions: {
      totalQueries: 0,
      ferriesBooked: 0,
      ferriesViewed: 0,
      hotelsBooked: 0,
      hotelsViewed: 0,
      activitiesBooked: 0,
      activitiesInterested: [],
      lastVisitedIslands: [],
      averageSpendPerBooking: 0,
      preferredPriceRange: { min: 50, max: 200 },
      lastActiveAt: new Date().toISOString(),
      conversationCount: 0,
    },
    savedTrips: [],
    alerts: [],
  };
}

// ============================================
// PROFILE LEARNING
// ============================================

export function updateProfileFromQuery(
  profile: UserProfile,
  query: string,
  context: {
    category?: string;
    destination?: string;
    budget?: number;
    groupSize?: number;
  }
): UserProfile {
  const updatedProfile = { ...profile };
  updatedProfile.updatedAt = new Date().toISOString();
  updatedProfile.pastInteractions.totalQueries++;
  updatedProfile.pastInteractions.lastActiveAt = new Date().toISOString();
  
  // Learn from destination preferences
  if (context.destination) {
    if (!updatedProfile.behavioralPatterns.preferredIslands.includes(context.destination)) {
      updatedProfile.behavioralPatterns.preferredIslands.push(context.destination);
      // Keep only last 5 preferred islands
      if (updatedProfile.behavioralPatterns.preferredIslands.length > 5) {
        updatedProfile.behavioralPatterns.preferredIslands.shift();
      }
    }
  }
  
  // Learn from budget mentions
  if (context.budget) {
    const currentBudget = updatedProfile.behavioralPatterns.budgetPerDay;
    // Moving average
    updatedProfile.behavioralPatterns.budgetPerDay = 
      Math.round((currentBudget + context.budget) / 2);
    
    // Update price range
    updatedProfile.pastInteractions.preferredPriceRange = {
      min: Math.min(updatedProfile.pastInteractions.preferredPriceRange.min, context.budget * 0.7),
      max: Math.max(updatedProfile.pastInteractions.preferredPriceRange.max, context.budget * 1.3),
    };
  }
  
  // Learn from group size
  if (context.groupSize) {
    updatedProfile.behavioralPatterns.groupSize = context.groupSize;
    if (context.groupSize === 1) {
      updatedProfile.behavioralPatterns.groupComposition = 'solo';
    } else if (context.groupSize === 2) {
      updatedProfile.behavioralPatterns.groupComposition = 'couple';
    } else if (context.groupSize <= 4) {
      updatedProfile.behavioralPatterns.groupComposition = 'friends';
    } else {
      updatedProfile.behavioralPatterns.groupComposition = 'family';
    }
  }
  
  // Learn preferences from query keywords
  const lowerQuery = query.toLowerCase();
  
  // Beach lover detection
  if (/beach|swim|snorkel|sand|coast/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.beaches = Math.min(1, updatedProfile.preferenceVector.beaches + 0.1);
  }
  
  // Nightlife detection
  if (/party|nightlife|club|bar|drink/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.nightlife = Math.min(1, updatedProfile.preferenceVector.nightlife + 0.1);
  }
  
  // Food detection
  if (/food|restaurant|taverna|cook|wine|dining|eat/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.foodExperiences = Math.min(1, updatedProfile.preferenceVector.foodExperiences + 0.1);
  }
  
  // Adventure detection
  if (/adventure|hiking|kayak|dive|climb|extreme/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.adventureActivities = Math.min(1, updatedProfile.preferenceVector.adventureActivities + 0.1);
  }
  
  // Relaxation detection
  if (/relax|quiet|calm|peaceful|spa|zen/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.relaxation = Math.min(1, updatedProfile.preferenceVector.relaxation + 0.1);
  }
  
  // Culture detection
  if (/history|museum|ancient|ruin|temple|archaeolog/i.test(lowerQuery)) {
    updatedProfile.preferenceVector.history = Math.min(1, updatedProfile.preferenceVector.history + 0.1);
    updatedProfile.preferenceVector.localCulture = Math.min(1, updatedProfile.preferenceVector.localCulture + 0.1);
  }
  
  // Determine archetype from preference vector
  updatedProfile.travelerArchetype = determineArchetype(updatedProfile.preferenceVector, updatedProfile.behavioralPatterns);
  
  return updatedProfile;
}

function determineArchetype(
  prefs: PreferenceVector, 
  behavior: BehavioralPatterns
): TravelerArchetype {
  // Score each archetype
  const scores: Record<TravelerArchetype, number> = {
    budget_explorer: 0,
    luxury_comfort_seeker: 0,
    adventure_thrill_seeker: 0,
    cultural_immersion: 0,
    romantic_getaway: 0,
    family_vacation: 0,
    digital_nomad: 0,
    party_goer: 0,
    unknown: 0,
  };
  
  // Budget explorer
  if (behavior.budgetPerDay < 80) scores.budget_explorer += 2;
  if (prefs.adventureActivities > 0.5) scores.budget_explorer += 1;
  
  // Luxury seeker
  if (behavior.budgetPerDay > 200) scores.luxury_comfort_seeker += 2;
  if (prefs.relaxation > 0.6) scores.luxury_comfort_seeker += 1;
  
  // Adventure thrill seeker
  if (prefs.adventureActivities > 0.7) scores.adventure_thrill_seeker += 2;
  if (prefs.waterSports > 0.6) scores.adventure_thrill_seeker += 1;
  if (prefs.hiking > 0.6) scores.adventure_thrill_seeker += 1;
  
  // Cultural immersion
  if (prefs.history > 0.6) scores.cultural_immersion += 2;
  if (prefs.localCulture > 0.6) scores.cultural_immersion += 1;
  
  // Romantic getaway
  if (behavior.groupComposition === 'couple') scores.romantic_getaway += 2;
  if (prefs.relaxation > 0.5 && prefs.foodExperiences > 0.5) scores.romantic_getaway += 1;
  
  // Family vacation
  if (behavior.groupComposition === 'family') scores.family_vacation += 3;
  if (behavior.groupSize >= 4) scores.family_vacation += 1;
  
  // Party goer
  if (prefs.nightlife > 0.7) scores.party_goer += 3;
  
  // Digital nomad
  if (behavior.travelPace === 'slow') scores.digital_nomad += 1;
  
  // Find highest score
  let maxScore = 0;
  let archetype: TravelerArchetype = 'unknown';
  
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      archetype = type as TravelerArchetype;
    }
  }
  
  return maxScore >= 2 ? archetype : 'unknown';
}

// ============================================
// PERSONALIZED RANKING
// ============================================

export interface RankableItem {
  id: string;
  price?: number;
  rating?: number;
  company?: string;
  time?: string; // HH:MM format
  island?: string;
  category?: string;
  amenities?: string[];
}

export function personalizeRanking<T extends RankableItem>(
  items: T[],
  profile: UserProfile
): T[] {
  return items
    .map(item => ({
      item,
      score: calculatePersonalizedScore(item, profile),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

function calculatePersonalizedScore(item: RankableItem, profile: UserProfile): number {
  let score = 50; // Base score
  
  // Price preference (within budget = higher score)
  if (item.price) {
    const budget = profile.behavioralPatterns.budgetPerDay;
    const priceRange = profile.pastInteractions.preferredPriceRange;
    
    if (item.price >= priceRange.min && item.price <= priceRange.max) {
      score += 20; // In preferred range
    } else if (item.price < priceRange.min) {
      score += 10; // Under budget (good but maybe too cheap)
    } else if (item.price > budget * 1.5) {
      score -= 15; // Over budget
    }
  }
  
  // Rating preference
  if (item.rating) {
    score += item.rating * 5; // Higher ratings = higher score
  }
  
  // Ferry company preference
  if (item.company && profile.behavioralPatterns.preferredFerryCompanies.includes(item.company)) {
    score += 15; // Preferred company
  }
  
  // Time preference (morning/afternoon/evening)
  if (item.time) {
    const hour = parseInt(item.time.split(':')[0]);
    const prefersMornings = profile.behavioralPatterns.prefersMornings;
    const preferredTime = profile.behavioralPatterns.preferredFerryTime;
    
    if (preferredTime === 'morning' || (prefersMornings && preferredTime === 'any')) {
      if (hour >= 6 && hour < 12) score += 10;
    } else if (preferredTime === 'afternoon') {
      if (hour >= 12 && hour < 18) score += 10;
    } else if (preferredTime === 'evening') {
      if (hour >= 18) score += 10;
    }
  }
  
  // Island preference
  if (item.island && profile.behavioralPatterns.preferredIslands.includes(item.island)) {
    score += 10;
  }
  
  // Avoided islands penalty
  if (item.island && profile.behavioralPatterns.avoidedIslands.includes(item.island)) {
    score -= 30;
  }
  
  // Category/activity preference
  if (item.category) {
    const category = item.category.toLowerCase();
    if (category.includes('beach') && profile.preferenceVector.beaches > 0.6) score += 10;
    if (category.includes('food') && profile.preferenceVector.foodExperiences > 0.6) score += 10;
    if (category.includes('adventure') && profile.preferenceVector.adventureActivities > 0.6) score += 10;
    if (category.includes('culture') && profile.preferenceVector.localCulture > 0.6) score += 10;
  }
  
  return score;
}

// ============================================
// PROACTIVE ALERTS
// ============================================

export function createWeatherAlert(
  profile: UserProfile,
  bookingId: string,
  route: string,
  date: string,
  windSpeed: number,
  recommendation: string
): ProactiveAlert {
  const severity = windSpeed > 50 ? 'high' : windSpeed > 35 ? 'medium' : 'low';
  
  return {
    alertId: crypto.randomUUID(),
    type: 'weather',
    severity,
    message: `⚠️ Strong winds (${windSpeed} km/h) forecasted for your ${route} ferry on ${date}. ${recommendation}`,
    relatedBookingId: bookingId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours
    dismissed: false,
  };
}

export function createPriceDropAlert(
  profile: UserProfile,
  hotelName: string,
  originalPrice: number,
  newPrice: number,
  roomsLeft: number
): ProactiveAlert {
  const savings = originalPrice - newPrice;
  const percentOff = Math.round((savings / originalPrice) * 100);
  
  return {
    alertId: crypto.randomUUID(),
    type: 'price_drop',
    severity: percentOff > 20 ? 'high' : 'medium',
    message: `🎉 Great news! ${hotelName} dropped to €${newPrice}/night (was €${originalPrice}, ${percentOff}% off). ${roomsLeft} rooms left!`,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    dismissed: false,
  };
}

export function createConnectionRiskAlert(
  bookingId: string,
  ferryArrival: string,
  hotelCheckin: string,
  bufferMinutes: number,
  suggestion: string
): ProactiveAlert {
  const severity = bufferMinutes < 30 ? 'high' : bufferMinutes < 60 ? 'medium' : 'low';
  
  return {
    alertId: crypto.randomUUID(),
    type: 'connection_risk',
    severity,
    message: `⏱️ Tight connection: Your ferry arrives at ${ferryArrival}, hotel check-in is ${hotelCheckin} (only ${bufferMinutes} min buffer). ${suggestion}`,
    relatedBookingId: bookingId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 72 hours
    dismissed: false,
  };
}

export function createFerryDelayAlert(
  bookingId: string,
  route: string,
  originalTime: string,
  expectedDelay: number,
  reason: string
): ProactiveAlert {
  return {
    alertId: crypto.randomUUID(),
    type: 'ferry_delay',
    severity: expectedDelay > 60 ? 'high' : expectedDelay > 30 ? 'medium' : 'low',
    message: `🚢 Your ${route} ferry (${originalTime}) may be delayed by ~${expectedDelay} min. Reason: ${reason}`,
    relatedBookingId: bookingId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours
    dismissed: false,
  };
}

// ============================================
// PROFILE STORAGE (localStorage for now)
// ============================================

const PROFILE_STORAGE_KEY = 'touristas_user_profile';

export function saveProfile(profile: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }
}

export function loadProfile(): UserProfile | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as UserProfile;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function getOrCreateProfile(): UserProfile {
  const existing = loadProfile();
  if (existing) {
    return existing;
  }
  const newProfile = createDefaultProfile();
  saveProfile(newProfile);
  return newProfile;
}

// ============================================
// RECOMMENDATION ENGINE
// ============================================

export function getPersonalizedRecommendation(
  profile: UserProfile,
  context: 'island' | 'ferry' | 'hotel' | 'activity'
): string {
  const archetype = profile.travelerArchetype;
  const prefs = profile.preferenceVector;
  
  switch (context) {
    case 'island':
      if (archetype === 'party_goer' || prefs.nightlife > 0.7) {
        return "Based on your interests, I'd recommend **Mykonos** or **Ios** for the best nightlife! 🎉";
      }
      if (archetype === 'romantic_getaway' || prefs.relaxation > 0.7) {
        return "For a romantic escape, **Santorini** or **Folegandros** would be perfect for you! 💕";
      }
      if (archetype === 'adventure_thrill_seeker' || prefs.adventureActivities > 0.7) {
        return "You'd love **Naxos** or **Amorgos** - great for hiking and adventure! 🏔️";
      }
      if (archetype === 'cultural_immersion' || prefs.history > 0.7) {
        return "**Delos** and **Tinos** have incredible history and culture for you! 🏛️";
      }
      if (prefs.beaches > 0.7) {
        return "For the best beaches, check out **Milos** or **Paros**! 🏖️";
      }
      return "I recommend starting with **Paros** - it's the perfect hub with a bit of everything!";
      
    case 'ferry':
      if (profile.behavioralPatterns.weatherSensitivity > 0.7) {
        return "I'll prioritize larger, more stable ferries for your comfort.";
      }
      if (profile.behavioralPatterns.prefersMornings) {
        return "I've ranked morning departures higher since you prefer early starts.";
      }
      return "I've sorted these by best value based on your past preferences.";
      
    case 'hotel':
      const budget = profile.behavioralPatterns.budgetPerDay;
      if (budget > 200) {
        return "I'm showing luxury options with the amenities you love.";
      }
      if (budget < 80) {
        return "I've found great budget-friendly stays without compromising quality!";
      }
      return "These hotels match your style and budget perfectly.";
      
    case 'activity':
      const interests = [];
      if (prefs.foodExperiences > 0.6) interests.push('food experiences');
      if (prefs.waterSports > 0.6) interests.push('water activities');
      if (prefs.hiking > 0.6) interests.push('hiking');
      if (interests.length > 0) {
        return `I've highlighted ${interests.join(' and ')} since those match your interests!`;
      }
      return "Here are top-rated activities for this island.";
      
    default:
      return "";
  }
}
