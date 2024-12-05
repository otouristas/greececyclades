import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Hotel } from '../../types';
import { generateSlug } from '../../utils/seo';
import { formatPrice } from '../../utils/price';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const slug = generateSlug(hotel.name, hotel.island);

  return (
    <Link to={`/hotels/${slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 text-white text-sm">{hotel.rating}</span>
              </div>
              <span className="text-white text-sm">•</span>
              <span className="text-white text-sm">{hotel.reviews} reviews</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hotel.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-lg font-semibold text-blue-600">
                {formatPrice(hotel.price)}
              </p>
            </div>
            <span className="text-sm text-gray-500">per night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
