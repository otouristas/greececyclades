import { Calendar, Phone, Star, MapPin, Users } from 'lucide-react';
import { Hotel } from '../../types/hotel';
import { IMAGE_PATHS } from '../../constants/imagePaths';

interface HeroSectionProps {
  hotel: Hotel;
  onBookNow: () => void;
}

export default function HeroSection({ hotel, onBookNow }: HeroSectionProps) {
  return (
    <div className="relative min-h-[85vh]">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={hotel.images?.main || IMAGE_PATHS.placeholders.hero}
            alt={hotel.name}
            className="w-full h-full object-cover transform scale-105 motion-safe:animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="h-full flex flex-col justify-end">
          {/* Hotel Details */}
          <div className="max-w-3xl space-y-6">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-white/90 text-sm font-medium">
                {hotel.location.area}, {hotel.location.island}
              </span>
            </div>

            {/* Hotel Name and Rating */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(hotel.starRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/90">
                  {hotel.starRating} {hotel.reviews && `(${Object.keys(hotel.reviews).length} reviews)`}
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{hotel.rooms[0]?.maxOccupancy || 2} guests per room</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{hotel.policies?.cancellation || 'Flexible cancellation'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button
                onClick={onBookNow}
                className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                Book Now
                <span className="text-sm opacity-90">from {hotel.priceRange.min}€/night</span>
              </button>
              <button 
                className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Check Availability
              </button>
              <button 
                className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Contact Hotel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}