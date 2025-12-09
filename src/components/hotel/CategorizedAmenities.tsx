import { 
  Wifi, Coffee, Tv, CircleParking, AirVent, Waves, Home, Bath, 
  Refrigerator, Bed, UtensilsCrossed, Power, Shirt, Cigarette, 
  Droplets, TreePine, Utensils, Dumbbell, Heart, Baby, Car,
  CheckCircle2
} from 'lucide-react';
import { useMemo } from 'react';

interface CategorizedAmenitiesProps {
  hotel: any;
}

interface AmenityCategory {
  name: string;
  icon: React.ReactNode;
  keywords: string[];
}

const CategorizedAmenities = ({ hotel }: CategorizedAmenitiesProps) => {
  // Define categories with their keywords
  const categories: AmenityCategory[] = useMemo(() => [
    {
      name: 'General Amenities',
      icon: <Home className="h-5 w-5" />,
      keywords: ['wifi', 'parking', 'air conditioning', 'elevator', 'luggage storage', 'laundry', 'dry cleaning', 'reception', 'concierge', '24-hour', 'front desk']
    },
    {
      name: 'Room Amenities',
      icon: <Bed className="h-5 w-5" />,
      keywords: ['bed', 'tv', 'flat-screen', 'coffee', 'tea', 'bathrobe', 'slipper', 'balcony', 'terrace', 'wardrobe', 'closet', 'refrigerator', 'minibar', 'safe', 'socket']
    },
    {
      name: 'Dining & Beverage',
      icon: <UtensilsCrossed className="h-5 w-5" />,
      keywords: ['restaurant', 'bar', 'lounge', 'breakfast', 'buffet', 'dining', 'rooftop', 'in-room dining', 'room service', 'bbq', 'kitchen']
    },
    {
      name: 'Wellness Amenities',
      icon: <Heart className="h-5 w-5" />,
      keywords: ['pool', 'swimming', 'spa', 'sauna', 'fitness', 'gym', 'yoga', 'meditation', 'jacuzzi', 'hot tub', 'massage', 'wellness']
    },
    {
      name: 'Family-Friendly Amenities',
      icon: <Baby className="h-5 w-5" />,
      keywords: ['kids', 'child', 'family', 'babysitting', 'playground', 'children', 'crib', 'high chair', 'family room']
    },
    {
      name: 'Transport',
      icon: <Car className="h-5 w-5" />,
      keywords: ['airport', 'transfer', 'shuttle', 'car rental', 'wheelchair', 'accessibility', 'transport']
    }
  ], []);

  // Get all amenities from hotel and rooms
  const allAmenities = useMemo(() => {
    const hotelAmenities = hotel?.hotel_amenities?.map((item: any) => item.amenity) || [];
    const roomAmenities = hotel?.hotel_rooms?.flatMap((room: any) => room.amenities || []) || [];
    
    // Combine and deduplicate
    const combined = [...hotelAmenities, ...roomAmenities];
    return Array.from(new Set(combined.map((a: string) => a.toLowerCase()))).map((a: string) => {
      // Find original case from hotel or room amenities
      return hotelAmenities.find((item: string) => item.toLowerCase() === a) ||
             roomAmenities.find((item: string) => item.toLowerCase() === a) ||
             a;
    });
  }, [hotel]);

  // Categorize amenities
  const categorizedAmenities = useMemo(() => {
    const categorized: Record<string, string[]> = {};
    
    categories.forEach(category => {
      categorized[category.name] = [];
    });
    
    // Add uncategorized category
    categorized['Other'] = [];

    allAmenities.forEach((amenity: string) => {
      const lowerAmenity = amenity.toLowerCase();
      let categorized_flag = false;

      // Try to match with each category
      for (const category of categories) {
        if (category.keywords.some(keyword => lowerAmenity.includes(keyword))) {
          categorized[category.name].push(amenity);
          categorized_flag = true;
          break;
        }
      }

      // If not categorized, add to "Other"
      if (!categorized_flag) {
        categorized['Other'].push(amenity);
      }
    });

    // Remove empty categories
    Object.keys(categorized).forEach(key => {
      if (categorized[key].length === 0) {
        delete categorized[key];
      }
    });

    return categorized;
  }, [allAmenities, categories]);

  if (!allAmenities || allAmenities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
        <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Highlights Facilities</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category) => {
          const amenities = categorizedAmenities[category.name] || [];
          if (amenities.length === 0) return null;

          return (
            <div key={category.name} className="bg-white rounded-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sifnos-beige/30 rounded-lg text-sifnos-deep-blue">
                  {category.icon}
                </div>
                <h3 className="text-lg font-montserrat font-semibold text-sifnos-deep-blue">
                  {category.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {amenities.map((amenity: string, index: number) => (
                  <li key={`${category.name}-${amenity}-${index}`} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-sifnos-turquoise flex-shrink-0" />
                    <span className="text-sm">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* Other category if exists */}
        {categorizedAmenities['Other'] && categorizedAmenities['Other'].length > 0 && (
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sifnos-beige/30 rounded-lg text-sifnos-deep-blue">
                <Home className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-montserrat font-semibold text-sifnos-deep-blue">
                Other Amenities
              </h3>
            </div>
            <ul className="space-y-2">
              {categorizedAmenities['Other'].map((amenity: string, index: number) => (
                <li key={`other-${amenity}-${index}`} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-sifnos-turquoise flex-shrink-0" />
                  <span className="text-sm">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorizedAmenities;

