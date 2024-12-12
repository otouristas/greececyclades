import { IslandSize, STAY_DURATION, AvailableMonth } from '../types/island';

// Format island size for display (e.g., "MAJOR" -> "major")
export const formatSize = (size: IslandSize): string => {
  return size.toLowerCase();
};

// Format stay duration for display
export const formatStayDuration = (stay: keyof typeof STAY_DURATION): string => {
  switch (stay) {
    case 'MAJOR':
      return '4-5 days';
    case 'MEDIUM':
      return '2-3 days';
    case 'MINOR':
      return '1-2 days';
    default:
      return '2-3 days';
  }
};

// Format month enums into readable strings
export const formatMonth = (month: AvailableMonth): string => {
  return month; // The enum values are already in proper case (e.g., "April", "May", etc.)
};

export const formatMonthsList = (months: AvailableMonth[]): string => {
  if (!Array.isArray(months)) return '';
  return months.map(formatMonth).join(', ');
};
