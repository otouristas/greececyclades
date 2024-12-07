export type ActivityCategory = 'water-sports' | 'tours' | 'cultural' | 'food-wine' | 'adventure';
export type ActivityDifficulty = 'easy' | 'moderate' | 'challenging';

export interface Activity {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  location: string;
  island: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    display: string;
  };
  included: string[];
  notIncluded: string[];
  highlights: string[];
  images: {
    main: string;
    gallery: string[];
  };
  category: ActivityCategory;
  difficulty: ActivityDifficulty;
  bestTime: string;
  minParticipants: number;
  maxParticipants: number;
  bookingNotice: string;
  cancellationPolicy: string;
  meetingPoint: string;
  requirements?: string[];
  tags?: string[];
  languages?: string[];
  providedEquipment?: string[];
  startTimes?: string[];
}
