import React from 'react';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { generateHotelImageAltText, getOptimizedImagePath } from '@/utils/image-optimization';

interface HotelImageProps {
  hotel: any;
  imageSrc: string;
  primaryType: string | null;
  getHotelTypeIcon: (type: string) => React.ReactNode;
}

const HotelImage = ({ hotel, imageSrc, primaryType, getHotelTypeIcon }: HotelImageProps) => {
  // Get key features for alt text
  const keyFeatures = hotel.hotel_amenities?.slice(0, 3).map((a: any) => a.amenity) || [];
  const altText = generateHotelImageAltText(
    hotel.name,
    hotel.location || 'Santorini',
    keyFeatures
  );

  // Get optimized image path (WebP if supported)
  const optimizedSrc = getOptimizedImagePath(imageSrc);

  return (
    <div className="relative h-48 overflow-hidden">
      <OptimizedImage
        src={optimizedSrc} 
        alt={altText}
        className="w-full h-full object-cover"
        priority={false}
        loading="lazy"
        decoding="async"
      />
      {primaryType && (
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-1 rounded-full">
          <div className="w-6 h-6 text-sifnos-turquoise">
            {getHotelTypeIcon(primaryType)}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelImage;
