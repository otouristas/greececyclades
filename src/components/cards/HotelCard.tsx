import { MapPin, Star, Wifi, Waves, UtensilsCrossed, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hotel } from '../../types/hotel';
import { formatPrice } from '../../utils/price';

const amenityIcons = {
  WiFi: Wifi,
  Pool: Waves,
  Restaurant: UtensilsCrossed,
  Spa: Sparkles
};

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link to={`/hotels/${hotel.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.images.main}
            alt={`${hotel.name} - Hotel in ${hotel.location?.island || 'Cyclades'}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {(hotel.priceRange || hotel.price_range) && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium">
              From {formatPrice((hotel.priceRange || hotel.price_range)?.min || 0, (hotel.priceRange || hotel.price_range)?.currency || 'EUR')}/night
            </div>
          )}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{hotel.rating?.toFixed(1) || 'N/A'}</span>
            <span className="text-sm text-white/90">({hotel.reviews?.count || hotel.reviews_count || 0})</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{`${hotel.location.area}, ${hotel.location.island}`}</span>
          </div>

          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>

          <div className="mt-2 flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {hotel.category}
            </span>
            <div className="flex flex-wrap gap-3">
              {hotel.amenities.slice(0, 3).map((amenity) => {
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-1 text-sm text-gray-500"
                  >
                    {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-gray-600 text-sm line-clamp-2">
            {hotel.description}
          </p>
        </div>
      </div>
    </Link>
  );
}