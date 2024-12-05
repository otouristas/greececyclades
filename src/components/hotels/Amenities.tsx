import React from 'react';
import { Hotel } from '../../types';
import { 
  Wifi, 
  Dumbbell, 
  Utensils, 
  Coffee, 
  Shield,
  Car,
  Waves as Pool,
  Sparkles as Spa
} from 'lucide-react';

interface AmenitiesProps {
  hotel: Hotel;
}

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'Pool': Pool,
  'Gym': Dumbbell,
  'Restaurant': Utensils,
  'Spa': Spa,
  'Room Service': Coffee,
  'Parking': Car,
  'Security': Shield,
};

export default function Amenities({ hotel }: AmenitiesProps) {
  return (
    <section id="amenities" className="py-16 border-t">
      <h2 className="text-3xl font-bold mb-8">Amenities & Services</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {hotel.amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || Wifi;
          return (
            <div key={amenity} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">{amenity}</h3>
              <p className="mt-2 text-sm text-gray-600">
                Available 24/7
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}