import { Check } from 'lucide-react';
import type { HotelFacility } from '@/lib/liteapi';

interface HotelAmenitiesListProps {
  facilities: string[] | HotelFacility[];
  title?: string;
}

export function HotelAmenitiesList({ facilities, title = 'Amenities' }: HotelAmenitiesListProps) {
  if (!facilities || facilities.length === 0) {
    return null;
  }

  // Normalize facilities - handle both string[] and HotelFacility[]
  const normalizedFacilities = facilities.map((facility) => {
    if (typeof facility === 'string') {
      return { name: facility, id: null };
    }
    return { name: facility.name, id: facility.facilityId };
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {normalizedFacilities.map((facility, index) => (
          <div
            key={facility.id || index}
            className="flex items-center gap-2 text-gray-700"
          >
            <Check className="w-5 h-5 text-sifnos-turquoise flex-shrink-0" />
            <span className="text-sm">{facility.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

