
import React from 'react';
import HotelLogo from './HotelLogo';
import { Badge } from '../ui/badge';

interface HotelDetailsProps {
  hotel: any;
  hotelLogoUrl: string | null;
  showLogo: boolean;
}

const HotelDetails = ({ hotel, hotelLogoUrl, showLogo }: HotelDetailsProps) => {
  // Determine if the property is a villa or hotel
  const isVilla = hotel.hotel_types?.includes('villas');
  const propertyType = isVilla ? 'Villa' : 'Hotel';

  return (
    <div className="p-4">
      <div className="flex items-center justify-start gap-2 mb-2">
        {/* Display logo to the LEFT of hotel name using the HotelLogo component */}
        {showLogo && hotelLogoUrl && (
          <HotelLogo
            hotel={hotel}
            hotelLogoUrl={hotelLogoUrl}
            position="inline"
          />
        )}
        <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
      
      {/* Property Types (Hotel/Villa types) */}
      {hotel.hotel_types && hotel.hotel_types.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {hotel.hotel_types.map((type: string, index: number) => {
            // Format the type display name
            let displayType = type.replace(/-/g, ' ');
            
            // Special handling for property types
            if (displayType.includes('hotels')) {
              displayType = displayType.replace(/hotels/g, 'hotel');
            } else if (displayType === 'villas') {
              displayType = 'luxury villa';
            }
            
            return (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-sifnos-turquoise/10 text-sifnos-deep-blue"
              >
                {displayType}
              </Badge>
            );
          })}
        </div>
      )}
      
      {/* Amenities */}
      {hotel.hotel_amenities && hotel.hotel_amenities.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {hotel.hotel_amenities.slice(0, 3).map((amenity: any, i: number) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {amenity.amenity}
            </span>
          ))}
          {hotel.hotel_amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{hotel.hotel_amenities.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
