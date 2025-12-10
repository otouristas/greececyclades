/**
 * Touristas AI - Gamification & Loyalty System
 * Implements Tier 4 from thenextbigthing.md
 * 
 * Achievements, rewards, leaderboards, and referral incentives
 */

// ============================================
// TYPES
// ============================================

export type AchievementCategory = 
  | 'explorer'      // Island visits
  | 'ferry_master'  // Ferry usage
  | 'foodie'        // Restaurant/food experiences
  | 'adventurer'    // Activities
  | 'photographer'  // Scenic spots
  | 'social'        // Community engagement
  | 'loyalty';      // Repeat usage

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  tier: AchievementTier;
  requirement: number;
  currentProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  reward: Reward;
}

export interface Reward {
  type: 'discount' | 'upgrade' | 'access' | 'points' | 'badge';
  value: number | string;
  description: string;
  expiresAt?: string;
  isRedeemed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  achievements: number;
  isCurrentUser: boolean;
}

export interface LoyaltyTier {
  name: 'Explorer' | 'Navigator' | 'Captain' | 'Admiral';
  minPoints: number;
  benefits: string[];
  color: string;
  icon: string;
}

export interface UserGamificationProfile {
  userId: string;
  username: string;
  points: number;
  loyaltyTier: LoyaltyTier['name'];
  achievements: Achievement[];
  rewards: Reward[];
  stats: UserStats;
  referralCode: string;
  referralCount: number;
  joinedAt: string;
}

export interface UserStats {
  islandsVisited: string[];
  ferriesTaken: number;
  hotelNights: number;
  activitiesBooked: number;
  reviewsWritten: number;
  photosShared: number;
  helpfulVotes: number;
  consecutiveDaysActive: number;
  totalSpent: number;
}

// ============================================
// ACHIEVEMENT DEFINITIONS
// ============================================

export const ACHIEVEMENTS: Omit<Achievement, 'currentProgress' | 'isUnlocked' | 'unlockedAt'>[] = [
  // EXPLORER ACHIEVEMENTS
  {
    id: 'island_explorer_1',
    name: 'Island Explorer',
    description: 'Visit 3 Cycladic islands',
    icon: '🏝️',
    category: 'explorer',
    tier: 'bronze',
    requirement: 3,
    reward: {
      type: 'discount',
      value: 5,
      description: '5% off your next ferry booking',
      isRedeemed: false,
    },
  },
  {
    id: 'island_explorer_2',
    name: 'Island Hopper',
    description: 'Visit 5 Cycladic islands',
    icon: '🗺️',
    category: 'explorer',
    tier: 'silver',
    requirement: 5,
    reward: {
      type: 'discount',
      value: 10,
      description: '10% off any activity booking',
      isRedeemed: false,
    },
  },
  {
    id: 'island_explorer_3',
    name: 'Cyclades Master',
    description: 'Visit 10 Cycladic islands',
    icon: '👑',
    category: 'explorer',
    tier: 'gold',
    requirement: 10,
    reward: {
      type: 'upgrade',
      value: 'cabin',
      description: 'Free cabin upgrade on next ferry',
      isRedeemed: false,
    },
  },
  {
    id: 'island_explorer_4',
    name: 'Complete the Cyclades',
    description: 'Visit all 24 Cycladic islands',
    icon: '🏆',
    category: 'explorer',
    tier: 'platinum',
    requirement: 24,
    reward: {
      type: 'access',
      value: 'vip',
      description: 'Lifetime VIP status + exclusive perks',
      isRedeemed: false,
    },
  },

  // FERRY MASTER ACHIEVEMENTS
  {
    id: 'ferry_master_1',
    name: 'First Voyage',
    description: 'Take your first ferry',
    icon: '🚢',
    category: 'ferry_master',
    tier: 'bronze',
    requirement: 1,
    reward: {
      type: 'points',
      value: 50,
      description: '50 bonus points',
      isRedeemed: false,
    },
  },
  {
    id: 'ferry_master_2',
    name: 'Seasoned Sailor',
    description: 'Take 5 ferries',
    icon: '⛴️',
    category: 'ferry_master',
    tier: 'silver',
    requirement: 5,
    reward: {
      type: 'discount',
      value: 10,
      description: '10% off ferry bookings',
      isRedeemed: false,
    },
  },
  {
    id: 'ferry_master_3',
    name: 'Ferry Expert',
    description: 'Take 10 ferries',
    icon: '🎖️',
    category: 'ferry_master',
    tier: 'gold',
    requirement: 10,
    reward: {
      type: 'upgrade',
      value: 'business',
      description: 'Free business class upgrade',
      isRedeemed: false,
    },
  },

  // FOODIE ACHIEVEMENTS
  {
    id: 'foodie_1',
    name: 'Local Taste',
    description: 'Dine at 3 local tavernas',
    icon: '🍽️',
    category: 'foodie',
    tier: 'bronze',
    requirement: 3,
    reward: {
      type: 'discount',
      value: 10,
      description: '10% off cooking class',
      isRedeemed: false,
    },
  },
  {
    id: 'foodie_2',
    name: 'Greek Gourmet',
    description: 'Try 5 different island cuisines',
    icon: '👨‍🍳',
    category: 'foodie',
    tier: 'silver',
    requirement: 5,
    reward: {
      type: 'access',
      value: 'wine_tasting',
      description: 'Exclusive wine tasting invitation',
      isRedeemed: false,
    },
  },
  {
    id: 'foodie_3',
    name: 'Culinary Connoisseur',
    description: 'Complete a cooking class',
    icon: '🏅',
    category: 'foodie',
    tier: 'gold',
    requirement: 1,
    reward: {
      type: 'discount',
      value: 20,
      description: '20% off next food experience',
      isRedeemed: false,
    },
  },

  // ADVENTURER ACHIEVEMENTS
  {
    id: 'adventurer_1',
    name: 'Sunset Chaser',
    description: 'Watch 3 sunsets in the Cyclades',
    icon: '🌅',
    category: 'adventurer',
    tier: 'bronze',
    requirement: 3,
    reward: {
      type: 'access',
      value: 'secret_spots',
      description: 'Unlock secret sunset spot guide',
      isRedeemed: false,
    },
  },
  {
    id: 'adventurer_2',
    name: 'Water Warrior',
    description: 'Book 3 water activities',
    icon: '🤿',
    category: 'adventurer',
    tier: 'silver',
    requirement: 3,
    reward: {
      type: 'discount',
      value: 15,
      description: '15% off boat tours',
      isRedeemed: false,
    },
  },
  {
    id: 'adventurer_3',
    name: 'Trail Blazer',
    description: 'Complete 5 hiking trails',
    icon: '🥾',
    category: 'adventurer',
    tier: 'gold',
    requirement: 5,
    reward: {
      type: 'badge',
      value: 'hiker',
      description: 'Exclusive Hiker badge on profile',
      isRedeemed: false,
    },
  },

  // SOCIAL ACHIEVEMENTS
  {
    id: 'social_1',
    name: 'First Review',
    description: 'Write your first review',
    icon: '✍️',
    category: 'social',
    tier: 'bronze',
    requirement: 1,
    reward: {
      type: 'points',
      value: 100,
      description: '100 bonus points',
      isRedeemed: false,
    },
  },
  {
    id: 'social_2',
    name: 'Trusted Reviewer',
    description: 'Write 10 helpful reviews',
    icon: '⭐',
    category: 'social',
    tier: 'silver',
    requirement: 10,
    reward: {
      type: 'badge',
      value: 'trusted',
      description: 'Trusted Reviewer badge',
      isRedeemed: false,
    },
  },
  {
    id: 'social_3',
    name: 'Hidden Gem Scout',
    description: 'Discover 5 spots not in guidebooks',
    icon: '💎',
    category: 'social',
    tier: 'gold',
    requirement: 5,
    reward: {
      type: 'access',
      value: 'scout_network',
      description: 'Join exclusive Scout network',
      isRedeemed: false,
    },
  },
  {
    id: 'social_4',
    name: 'Ambassador',
    description: 'Refer 10 friends who book trips',
    icon: '🌟',
    category: 'social',
    tier: 'platinum',
    requirement: 10,
    reward: {
      type: 'discount',
      value: 50,
      description: '€50 travel credit',
      isRedeemed: false,
    },
  },

  // LOYALTY ACHIEVEMENTS
  {
    id: 'loyalty_1',
    name: 'Regular Traveler',
    description: 'Use Touristas for 7 consecutive days',
    icon: '📅',
    category: 'loyalty',
    tier: 'bronze',
    requirement: 7,
    reward: {
      type: 'points',
      value: 200,
      description: '200 bonus points',
      isRedeemed: false,
    },
  },
  {
    id: 'loyalty_2',
    name: 'Loyal Explorer',
    description: 'Book 3 trips through Touristas',
    icon: '💙',
    category: 'loyalty',
    tier: 'silver',
    requirement: 3,
    reward: {
      type: 'discount',
      value: 15,
      description: '15% off next booking',
      isRedeemed: false,
    },
  },
];

// ============================================
// LOYALTY TIERS
// ============================================

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Explorer',
    minPoints: 0,
    benefits: [
      'Access to all Touristas features',
      'Earn 1 point per €1 spent',
      'Birthday bonus: 50 points',
    ],
    color: '#64748b',
    icon: '🧭',
  },
  {
    name: 'Navigator',
    minPoints: 500,
    benefits: [
      'All Explorer benefits',
      'Earn 1.5 points per €1 spent',
      'Priority customer support',
      '5% off all bookings',
    ],
    color: '#0ea5e9',
    icon: '⛵',
  },
  {
    name: 'Captain',
    minPoints: 2000,
    benefits: [
      'All Navigator benefits',
      'Earn 2 points per €1 spent',
      'Free ferry cabin upgrades (when available)',
      '10% off all bookings',
      'Early access to deals',
    ],
    color: '#8b5cf6',
    icon: '🚢',
  },
  {
    name: 'Admiral',
    minPoints: 5000,
    benefits: [
      'All Captain benefits',
      'Earn 3 points per €1 spent',
      'Dedicated travel concierge',
      '15% off all bookings',
      'Free airport transfers',
      'Exclusive Admiral experiences',
    ],
    color: '#eab308',
    icon: '👑',
  },
];

// ============================================
// GAMIFICATION ENGINE
// ============================================

export function createDefaultGamificationProfile(userId: string): UserGamificationProfile {
  return {
    userId,
    username: `Traveler_${userId.slice(0, 6)}`,
    points: 0,
    loyaltyTier: 'Explorer',
    achievements: ACHIEVEMENTS.map(a => ({
      ...a,
      currentProgress: 0,
      isUnlocked: false,
    })),
    rewards: [],
    stats: {
      islandsVisited: [],
      ferriesTaken: 0,
      hotelNights: 0,
      activitiesBooked: 0,
      reviewsWritten: 0,
      photosShared: 0,
      helpfulVotes: 0,
      consecutiveDaysActive: 0,
      totalSpent: 0,
    },
    referralCode: generateReferralCode(userId),
    referralCount: 0,
    joinedAt: new Date().toISOString(),
  };
}

function generateReferralCode(userId: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'TOUR';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function addPoints(
  profile: UserGamificationProfile,
  points: number,
  reason: string
): { profile: UserGamificationProfile; tierUpgrade: boolean } {
  const updatedProfile = { ...profile };
  updatedProfile.points += points;
  
  // Check for tier upgrade
  let tierUpgrade = false;
  const currentTierIndex = LOYALTY_TIERS.findIndex(t => t.name === profile.loyaltyTier);
  const nextTier = LOYALTY_TIERS[currentTierIndex + 1];
  
  if (nextTier && updatedProfile.points >= nextTier.minPoints) {
    updatedProfile.loyaltyTier = nextTier.name;
    tierUpgrade = true;
  }
  
  return { profile: updatedProfile, tierUpgrade };
}

export function trackActivity(
  profile: UserGamificationProfile,
  activity: {
    type: 'island_visit' | 'ferry' | 'hotel' | 'activity' | 'review' | 'photo' | 'referral';
    value?: string | number;
    spent?: number;
  }
): { profile: UserGamificationProfile; unlockedAchievements: Achievement[] } {
  const updatedProfile = { ...profile };
  const unlockedAchievements: Achievement[] = [];
  
  // Update stats
  switch (activity.type) {
    case 'island_visit':
      if (typeof activity.value === 'string' && !updatedProfile.stats.islandsVisited.includes(activity.value)) {
        updatedProfile.stats.islandsVisited.push(activity.value);
      }
      break;
    case 'ferry':
      updatedProfile.stats.ferriesTaken++;
      break;
    case 'hotel':
      updatedProfile.stats.hotelNights += (typeof activity.value === 'number' ? activity.value : 1);
      break;
    case 'activity':
      updatedProfile.stats.activitiesBooked++;
      break;
    case 'review':
      updatedProfile.stats.reviewsWritten++;
      break;
    case 'photo':
      updatedProfile.stats.photosShared++;
      break;
    case 'referral':
      updatedProfile.referralCount++;
      break;
  }
  
  if (activity.spent) {
    updatedProfile.stats.totalSpent += activity.spent;
    // Add points based on tier multiplier
    const tier = LOYALTY_TIERS.find(t => t.name === profile.loyaltyTier);
    const multiplier = tier?.name === 'Admiral' ? 3 : tier?.name === 'Captain' ? 2 : tier?.name === 'Navigator' ? 1.5 : 1;
    updatedProfile.points += Math.round(activity.spent * multiplier);
  }
  
  // Check achievements
  updatedProfile.achievements = updatedProfile.achievements.map(achievement => {
    if (achievement.isUnlocked) return achievement;
    
    let progress = achievement.currentProgress;
    
    // Update progress based on achievement category
    switch (achievement.category) {
      case 'explorer':
        progress = updatedProfile.stats.islandsVisited.length;
        break;
      case 'ferry_master':
        progress = updatedProfile.stats.ferriesTaken;
        break;
      case 'foodie':
        // Would need more specific tracking
        break;
      case 'adventurer':
        progress = updatedProfile.stats.activitiesBooked;
        break;
      case 'social':
        if (achievement.id.includes('review')) {
          progress = updatedProfile.stats.reviewsWritten;
        } else if (achievement.id === 'social_4') {
          progress = updatedProfile.referralCount;
        }
        break;
      case 'loyalty':
        if (achievement.id === 'loyalty_1') {
          progress = updatedProfile.stats.consecutiveDaysActive;
        }
        break;
    }
    
    const isUnlocked = progress >= achievement.requirement;
    
    if (isUnlocked && !achievement.isUnlocked) {
      const unlockedAchievement = {
        ...achievement,
        currentProgress: progress,
        isUnlocked: true,
        unlockedAt: new Date().toISOString(),
      };
      unlockedAchievements.push(unlockedAchievement);
      
      // Add reward to profile
      updatedProfile.rewards.push(unlockedAchievement.reward);
      
      // Add bonus points for achievement
      const bonusPoints = achievement.tier === 'platinum' ? 500 : 
                         achievement.tier === 'gold' ? 200 : 
                         achievement.tier === 'silver' ? 100 : 50;
      updatedProfile.points += bonusPoints;
      
      return unlockedAchievement;
    }
    
    return { ...achievement, currentProgress: progress };
  });
  
  return { profile: updatedProfile, unlockedAchievements };
}

export function getLeaderboard(type: 'islands' | 'points' | 'achievements'): LeaderboardEntry[] {
  // In a real app, this would fetch from database
  // For now, return mock data
  return [
    { rank: 1, userId: '1', username: 'IslandExplorer22', score: 18, achievements: 12, isCurrentUser: false },
    { rank: 2, userId: '2', username: 'GreekWanderer', score: 15, achievements: 10, isCurrentUser: false },
    { rank: 3, userId: '3', username: 'CycladesLover', score: 12, achievements: 8, isCurrentUser: false },
    { rank: 4, userId: '4', username: 'SunsetChaser', score: 10, achievements: 7, isCurrentUser: true },
    { rank: 5, userId: '5', username: 'BeachHopper', score: 8, achievements: 5, isCurrentUser: false },
  ];
}

export function applyReferralBonus(
  referrer: UserGamificationProfile,
  referred: UserGamificationProfile
): { referrer: UserGamificationProfile; referred: UserGamificationProfile } {
  // Both get €10 hotel discount
  const referralReward: Reward = {
    type: 'discount',
    value: 10,
    description: '€10 off next hotel booking (referral bonus)',
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    isRedeemed: false,
  };
  
  return {
    referrer: {
      ...referrer,
      rewards: [...referrer.rewards, referralReward],
      referralCount: referrer.referralCount + 1,
      points: referrer.points + 100, // Bonus points for referral
    },
    referred: {
      ...referred,
      rewards: [...referred.rewards, referralReward],
    },
  };
}

// ============================================
// ACHIEVEMENT DISPLAY HELPERS
// ============================================

export function getAchievementProgress(achievement: Achievement): string {
  const percent = Math.min(100, (achievement.currentProgress / achievement.requirement) * 100);
  return `${achievement.currentProgress}/${achievement.requirement} (${Math.round(percent)}%)`;
}

export function getNextAchievement(profile: UserGamificationProfile): Achievement | null {
  const locked = profile.achievements
    .filter(a => !a.isUnlocked)
    .sort((a, b) => {
      // Sort by closest to completion
      const aProgress = a.currentProgress / a.requirement;
      const bProgress = b.currentProgress / b.requirement;
      return bProgress - aProgress;
    });
  
  return locked[0] || null;
}

export function getLoyaltyTierInfo(tierName: LoyaltyTier['name']): LoyaltyTier {
  return LOYALTY_TIERS.find(t => t.name === tierName) || LOYALTY_TIERS[0];
}

export function getPointsToNextTier(profile: UserGamificationProfile): number {
  const currentTierIndex = LOYALTY_TIERS.findIndex(t => t.name === profile.loyaltyTier);
  const nextTier = LOYALTY_TIERS[currentTierIndex + 1];
  
  if (!nextTier) return 0; // Already at max tier
  
  return nextTier.minPoints - profile.points;
}

// ============================================
// STORAGE
// ============================================

const GAMIFICATION_STORAGE_KEY = 'touristas_gamification';

export function saveGamificationProfile(profile: UserGamificationProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(profile));
  }
}

export function loadGamificationProfile(): UserGamificationProfile | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as UserGamificationProfile;
      } catch {
        return null;
      }
    }
  }
  return null;
}
