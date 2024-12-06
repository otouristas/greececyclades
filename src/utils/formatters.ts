import { IslandSize, STAY_DURATION } from '../types/island';
import { PACE_FACTORS } from '../types';

type TripPace = keyof typeof PACE_FACTORS;

// Format island size for display (e.g., "MAJOR" -> "Major Island")
export const formatIslandSize = (size: IslandSize): string => {
  const formatted = size.toLowerCase().replace('_', ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1) + ' Island';
};

// Format stay duration for display with pace context
export const formatStayDuration = (days: number, pace?: TripPace): string => {
  const stayText = `${days} day${days !== 1 ? 's' : ''}`;
  if (!pace || pace === 'moderate') return stayText;

  const paceText = pace === 'relaxed' ? 'relaxed pace' : 'active pace';
  return `${stayText} at ${paceText}`;
};
