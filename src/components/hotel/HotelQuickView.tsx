import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateHotelUrl } from '@/lib/url-utils';
import { ReviewScore } from './ReviewScore';
import { SocialProofIndicator } from './SocialProofIndicator';
import { HotelImageCarousel } from './HotelImageCarousel';

interface HotelQuickViewProps {
  hotel: any;
  isOpen: boolean;
  onClose: () => void;
  onCompare?: (hotel: any) => void;
  isInCompare?: boolean;
}

export function HotelQuickView({ 
  hotel, 
  isOpen, 
  onClose,
  onCompare,
  isInCompare = false
}: HotelQuickViewProps) {
  const hotelSlug = generateHotelUrl(hotel.name);
  const images = hotel.hotel_photos || [];
  const rating = hotel.rating || hotel.review_score || 0;
  const reviewCount = hotel.review_count || 0;

  // Get key features (max 4)
  const keyFeatures = hotel.hotel_amenities?.slice(0, 4) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sifnos-deep-blue">
            {hotel.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Carousel */}
          {images.length > 0 && (
            <HotelImageCarousel
              images={images.map((img: any) => ({
                id: img.id,
                photo_url: img.photo_url,
                description: img.description
              }))}
              hotelName={hotel.name}
            />
          )}

          {/* Location */}
          {hotel.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{hotel.location}</span>
            </div>
          )}

          {/* Review Score */}
          {rating > 0 && (
            <ReviewScore 
              rating={rating} 
              reviewCount={reviewCount}
            />
          )}

          {/* Key Features */}
          {keyFeatures.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {keyFeatures.map((amenity: any, index: number) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {amenity.amenity || amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {hotel.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {hotel.description}
            </p>
          )}

          {/* Social Proof */}
          <SocialProofIndicator
            viewersCount={Math.floor(Math.random() * 50) + 10} // Mock data for now
            lastBooked={`${Math.floor(Math.random() * 12) + 1} hours ago`}
          />

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              asChild
              className="flex-1 bg-sifnos-deep-blue hover:bg-sifnos-deep-blue/90 text-white"
            >
              <Link to={`/hotels/${hotelSlug}`} onClick={onClose}>
                View Full Details
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                if (onCompare) {
                  onCompare(hotel);
                }
                onClose();
              }}
            >
              {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
            >
              <a
                href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ', Santorini')}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Check Availability
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

