import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wifi, Waves, UtensilsCrossed, Sparkles, Mountain, Car, LucideIcon, Users, Brush, Flower2, Umbrella, Baby, ParkingCircle, Home } from 'lucide-react';
import { Hotel, HotelFeature } from '../../types/hotel';
import { getHotelSlug } from '../../utils/slugs';

const featureIcons: Record<HotelFeature, LucideIcon> = {
  'WiFi': Wifi,
  'Pool': Waves,
  'Restaurant': UtensilsCrossed,
  'Spa': Sparkles,
  'Private Pool': Waves,
  'Fine Dining': UtensilsCrossed,
  'Sea View': Mountain,
  'Room Service': UtensilsCrossed,
  'Airport Transfer': Car,
  'Infinity Pool': Waves,
  'Beach Access': Umbrella,
  'Fitness Center': Users,
  'Bar': UtensilsCrossed,
  'Concierge': Users,
  'Free Parking': ParkingCircle,
  'Adults Only': Users,
  'Cycladic Design': Brush,
  'Garden View': Flower2,
  'Beachfront': Umbrella,
  'Family Friendly': Baby,
  'Wellness Center': Sparkles,
  'Private Beach': Umbrella,
  'Gourmet Restaurant': UtensilsCrossed,
  'Sea View Rooms': Mountain,
  'Private Villas': Home,
  'Minimalist Design': Brush,
  'Private Terraces': Mountain,
  'Eco-Friendly': Flower2,
  'Beachfront Location': Umbrella,
  'Water Sports': Waves,
  'Sunset Views': Mountain,
  'Beach Club': Umbrella,
  'Designer Interiors': Brush
};

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const hotelSlug = getHotelSlug(hotel.name, hotel.location.island);
  return (
    <Link to={`/hotels/${hotelSlug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={hotel.images.main}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-white text-sm">{hotel.starRating}</span>
              </div>
              <span className="text-white text-sm">•</span>
              <span className="text-white text-sm">{hotel.category}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hotel.location.area}, {hotel.location.island}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-lg font-semibold text-blue-600">
                €{hotel.priceRange.min}
              </p>
            </div>
            <div className="flex gap-2">
              {hotel.keyFeatures.slice(0, 2).map((feature, index) => {
                const Icon = featureIcons[feature] || null;
                return (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1">
                    {Icon && <Icon className="h-3 w-3" />}
                    {feature}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
