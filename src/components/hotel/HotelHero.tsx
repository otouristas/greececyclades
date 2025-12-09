import { MapPin, ExternalLink } from 'lucide-react';
import { getHotelLogoUrl } from '@/utils/hotel-utils';
import { Link } from 'react-router-dom';

interface HotelHeroProps {
  hotel: any;
  activeImage: string | null;
  onShare?: () => void;
  onSave?: () => void;
  onPrint?: () => void;
  renderStarRating: (rating: number) => React.ReactNode;
}

export default function HotelHero({ 
  hotel, 
  activeImage,
  renderStarRating 
}: HotelHeroProps) {
  const logoUrl = getHotelLogoUrl(hotel);
  
  // Get review count - try to get from hotel data or use a default
  const reviewCount = hotel?.review_count || hotel?.hotel_reviews?.length || 0;
  const rating = hotel?.rating || 0;

  return (
    <div className="relative w-full">
      {/* Light Colored Header with Wave Pattern */}
      <div className="relative bg-gradient-to-br from-sifnos-beige/40 via-sifnos-turquoise/20 to-sifnos-beige/30 overflow-hidden">
        {/* Subtle wave pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path 
              d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" 
              fill="currentColor" 
              className="text-sifnos-deep-blue"
            />
            <path 
              d="M0,150 Q300,100 600,150 T1200,150 L1200,200 L0,200 Z" 
              fill="currentColor" 
              className="text-sifnos-turquoise"
            />
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-10 page-container py-8 md:py-12">
          {/* Top Section: Rating, Name, Location */}
          <div className="mb-6">
            {/* Small blue dot indicator */}
            <div className="w-2 h-2 bg-sifnos-turquoise rounded-full mb-4"></div>
            
            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStarRating(rating)}
                </div>
                <span className="text-lg font-semibold text-sifnos-deep-blue">
                  {rating.toFixed(1)} Review
                </span>
                {reviewCount > 0 && (
                  <span className="text-sm text-gray-600">
                    (Based on {reviewCount.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}
            
            {/* Hotel Name with Logo */}
            <div className="flex items-center gap-4 mb-4">
              {logoUrl && (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-white/50 bg-white shadow-lg flex items-center justify-center flex-shrink-0">
                  <img 
                    src={logoUrl} 
                    alt={`${hotel?.name} logo`} 
                    className="w-full h-full object-contain p-3"
                    loading="eager"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sifnos-deep-blue font-montserrat">
                {hotel?.name}
              </h1>
            </div>
            
            {/* Location with Map Link */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={20} className="text-sifnos-turquoise" />
                <span className="text-lg font-medium">
                  {hotel?.location}, Santorini Island, Greece
                </span>
              </div>
              {hotel?.latitude && hotel?.longitude && (
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sifnos-deep-blue hover:text-sifnos-turquoise font-medium flex items-center gap-1 transition-colors"
                >
                  View on Map
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
