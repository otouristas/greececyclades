import {
  IslandSize,
  StayDuration,
  STAY_DURATION,
  IslandActivity,
  IslandVibe,
  AvailableMonth,
  BaseIsland,
  Island,
  ISLAND_ACTIVITIES,
  ISLAND_VIBES,
  AVAILABLE_MONTHS
} from '../types/island';

// Validation functions
const validateIslandSize = (size: IslandSize): boolean => {
  return Object.keys(STAY_DURATION).includes(size);
};
