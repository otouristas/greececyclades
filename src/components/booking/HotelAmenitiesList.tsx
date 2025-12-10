import { Check, Wifi, Car, Waves, Utensils, Coffee, Dumbbell, Baby, Dog, Sparkles, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { HotelFacility } from '@/lib/liteapi';

interface HotelAmenitiesListProps {
  facilities: string[] | HotelFacility[];
  title?: string;
}

// Map amenity names to icons
function getAmenityIcon(name: string) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('wifi') || lowerName.includes('internet')) return Wifi;
  if (lowerName.includes('parking') || lowerName.includes('car')) return Car;
  if (lowerName.includes('pool') || lowerName.includes('swim')) return Waves;
  if (lowerName.includes('restaurant') || lowerName.includes('dining')) return Utensils;
  if (lowerName.includes('breakfast') || lowerName.includes('coffee')) return Coffee;
  if (lowerName.includes('gym') || lowerName.includes('fitness')) return Dumbbell;
  if (lowerName.includes('child') || lowerName.includes('kid') || lowerName.includes('family')) return Baby;
  if (lowerName.includes('pet') || lowerName.includes('dog')) return Dog;
  if (lowerName.includes('spa') || lowerName.includes('wellness')) return Sparkles;
  if (lowerName.includes('safe') || lowerName.includes('security')) return Shield;
  return Check;
}

export function HotelAmenitiesList({ facilities, title = 'Amenities' }: HotelAmenitiesListProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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
      {title && (
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {normalizedFacilities.map((facility, index) => {
          const IconComponent = getAmenityIcon(facility.name);
          return (
            <div
              key={facility.id || index}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDark
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                }`}
            >
              <IconComponent className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
              <span className={`text-sm truncate ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                {facility.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
