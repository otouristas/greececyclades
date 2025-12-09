import { useState } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { generateHotelUrl } from '@/lib/url-utils';
import { determineHotelImageUrl, determineHotelLogoUrl } from '@/utils/image-utils';
import { Star, MapPin } from 'lucide-react';

interface CompareHotelsProps {
  hotels: any[];
  onRemove: (hotelId: string) => void;
  onClear: () => void;
}

export default function CompareHotels({ hotels, onRemove, onClear }: CompareHotelsProps) {
  if (hotels.length === 0) return null;

  const maxCompare = 3;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-sifnos-turquoise shadow-2xl z-50 p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-bold text-lg text-sifnos-deep-blue">
              Compare Hotels ({hotels.length}/{maxCompare})
            </h3>
            {hotels.length < maxCompare && (
              <Badge variant="outline" className="text-xs">
                Add {maxCompare - hotels.length} more to compare
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClear}>
              <Trash2 size={16} className="mr-2" />
              Clear All
            </Button>
            <Button 
              size="sm" 
              className="bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white"
              onClick={() => {
                // Scroll to comparison section
                document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Comparison
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hotels.map((hotel) => {
            const hotelSlug = generateHotelUrl(hotel.name);
            const mainPhoto = hotel.hotel_photos?.find((p: any) => p.is_main_photo) || hotel.hotel_photos?.[0];
            const imageUrl = determineHotelImageUrl(hotel, mainPhoto?.photo_url);
            const logoUrl = determineHotelLogoUrl(hotel);

            return (
              <Card key={hotel.id} className="flex-shrink-0 w-64 border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    {logoUrl && (
                      <div className="absolute top-2 left-2 bg-white/90 p-1 rounded">
                        <img 
                          src={logoUrl} 
                          alt={`${hotel.name} logo`}
                          className="h-6 w-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <button
                      onClick={() => onRemove(hotel.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <h4 className="font-semibold text-sm text-sifnos-deep-blue mb-1 line-clamp-1">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin size={12} />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                  {hotel.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold">{hotel.rating}</span>
                    </div>
                  )}
                  {hotel.price && (
                    <div className="text-sm font-bold text-sifnos-deep-blue mb-2">
                      €{hotel.price}/night
                    </div>
                  )}
                  <Link to={`/hotels/${hotelSlug}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

