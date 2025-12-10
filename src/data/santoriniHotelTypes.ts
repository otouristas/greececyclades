export interface HotelType {
  slug: string;
  title: string;
  description?: string;
}

export const santoriniHotelTypes: HotelType[] = [
  { slug: 'hotel', title: 'Hotel' },
  { slug: 'villa', title: 'Villa' },
  { slug: 'apartment', title: 'Apartment' },
  { slug: 'resort', title: 'Resort' },
  { slug: 'boutique', title: 'Boutique Hotel' },
  { slug: 'guesthouse', title: 'Guesthouse' },
  { slug: 'cave-house', title: 'Cave House' },
];
