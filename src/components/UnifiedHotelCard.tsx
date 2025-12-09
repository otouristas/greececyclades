

import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Coffee, ExternalLink, Calendar, Award, Users } from 'lucide-react';
import { generateHotelUrl } from '@/lib/url-utils';
import { determineHotelImageUrl } from '@/utils/image-utils';
import { getOptimizedImagePath } from '@/utils/image-optimization';
import FavoriteButton from '@/components/auth/FavoriteButton';
import { CompareButton } from '@/components/comparison/CompareButton';
import { Hotel } from '@/services/hotelSearch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UnifiedHotelCardProps {
  hotel: Hotel;
  onSelect?: (hotel: Hotel) => void;
  className?: string;
}

const UnifiedHotelCard = ({ hotel, onSelect, className }: UnifiedHotelCardProps) => {
  const isMakcorpsHotel = hotel.source === 'makcorps';
  const isLocalHotel = hotel.source === 'local';
  const isFeatured = (hotel as any).is_featured || (hotel as any).isSponsored;
  const featuredTier = (hotel as any).featured_tier;
  
  // Tier badge colors
  const getTierBadgeClass = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-purple-600 text-white border-purple-700';
      case 'gold':
        return 'bg-yellow-600 text-white border-yellow-700';
      case 'silver':
        return 'bg-gray-400 text-white border-gray-500';
      case 'bronze':
        return 'bg-orange-600 text-white border-orange-700';
      default:
        return 'bg-green-600 text-white border-green-700';
    }
  };
  
  // Generate appropriate URL and image
  const hotelUrl = isMakcorpsHotel
    ? `#` // Makcorps doesn't provide direct booking URLs in city search
    : `/hotels/${generateHotelUrl(hotel.name)}`;

  const baseImageUrl = isMakcorpsHotel
    ? hotel.image_url || '/newphotos/santorini-aerial-hotels-pools.jpg'
    : hotel.image_url || determineHotelImageUrl(hotel);
  const imageUrl = getOptimizedImagePath(baseImageUrl);

  // Get rating display
  const rating = isMakcorpsHotel
    ? (hotel.makcorps_data?.reviews?.rating || hotel.review_score || hotel.rating || 0)
    : hotel.rating || 0;

  const displayRating = rating; // Makcorps already uses 5-point scale

  // Price handling - show for Makcorps hotels
  const showPrice = isMakcorpsHotel && (hotel.daily_rate || hotel.price_per_night);
  const price = isMakcorpsHotel
    ? (hotel.daily_rate || hotel.price_per_night || 0)
    : 0;
  const currency = isMakcorpsHotel ? (hotel.currency || 'EUR') : 'EUR';

  // Get star rating
  const starRating = isMakcorpsHotel
    ? (hotel.makcorps_data?.reviews?.rating ? Math.round(hotel.makcorps_data.reviews.rating) : hotel.star_rating || 0)
    : hotel.star_rating || Math.round(rating);

  // Get review data
  const reviewScore = isMakcorpsHotel
    ? (hotel.makcorps_data?.reviews?.rating || hotel.review_score || rating || 0)
    : hotel.review_score || rating || 0;
  const reviewCount = isMakcorpsHotel
    ? (hotel.makcorps_data?.reviews?.count || hotel.review_count || 0)
    : hotel.review_count || 0;

  // Get vendor prices for Makcorps
  const vendorPrices = isMakcorpsHotel ? hotel.vendor_prices || [] : [];
  const primaryVendor = vendorPrices.length > 0 ? vendorPrices[0] : null;

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleBooking = () => {
    if (hotel.source === 'makcorps' && hotel.makcorps_hotel_id) {
      // For Makcorps, we'll need to show price comparison modal or redirect
      // For now, just trigger onSelect to show hotel details
      if (onSelect) {
        onSelect(hotel);
      }
    } else if (onSelect) {
      onSelect(hotel);
    }
  };

  const getBookingUrl = () => {
    if (hotel.source === 'makcorps') {
      // Makcorps doesn't provide direct booking URLs in city search
      // Would need to use Hotel ID API to get vendor URLs
      return '#';
    }
    // Fallback to Booking.com search
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ', Santorini')}&aid=YOUR_AFFILIATE_ID`;
  };

  const CardContent = () => (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${className || ''}`}>
      <div className="relative">
        <img
          src={imageUrl}
          alt={`${hotel.name} in ${hotel.location}, Santorini${displayRating > 4 ? ', highly-rated property' : ''}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          width="400"
          height="300"
          onError={(e) => {
            e.currentTarget.src = '/newphotos/santorini-aerial-hotels-pools.jpg';
          }}
        />
        
        {/* Featured tier badge - highest priority */}
        {isFeatured && featuredTier && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className={`${getTierBadgeClass(featuredTier)} border-2 font-bold shadow-lg`}>
              <Award className="w-3 h-3 mr-1" />
              {featuredTier.charAt(0).toUpperCase() + featuredTier.slice(1)} Featured
            </Badge>
          </div>
        )}
        
        {/* Source badge - show if not featured or if featured but no tier */}
        {(!isFeatured || !featuredTier) && (
          <div className="absolute top-3 left-3">
            {isMakcorpsHotel ? (
              <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                <ExternalLink className="w-3 h-3 mr-1" />
                {primaryVendor?.vendor || 'Price Comparison'}
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
                <Award className="w-3 h-3 mr-1" />
                {isFeatured ? 'Featured' : 'Local Partner'}
              </Badge>
            )}
          </div>
        )}

        {/* Local hotel quality indicator - only if not featured */}
        {isLocalHotel && !isFeatured && starRating >= 4 && (
          <div className="absolute top-12 right-3">
            <Badge variant="secondary" className="bg-amber-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
              {hotel.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <MapPin className="w-3 h-3" />
              {hotel.location}
            </CardDescription>
          </div>
          
          {/* Price section - for Makcorps hotels */}
          {showPrice && (
            <div className="text-right ml-3">
              <div className="text-2xl font-bold text-green-600">
                {formatPrice(price, currency)}
              </div>
              <div className="text-sm text-gray-500">per night</div>
              {primaryVendor && (
                <div className="text-xs text-gray-400 mt-1">
                  via {primaryVendor.vendor}
                </div>
              )}
              {vendorPrices.length > 1 && (
                <div className="text-xs text-blue-600 mt-1">
                  {vendorPrices.length} vendors available
                </div>
              )}
            </div>
          )}

          {/* Local hotel - show "Contact for rates" */}
          {isLocalHotel && (
            <div className="text-right ml-3">
              <div className="text-sm font-medium text-blue-600">
                Contact for Rates
              </div>
              <div className="text-xs text-gray-500">Direct booking</div>
            </div>
          )}
        </div>
      </CardHeader>

      <div className="space-y-3 p-6 pt-0">
        {/* Star rating and reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {starRating > 0 && renderStarRating(displayRating)}
            <span className="text-sm text-gray-600">
              {starRating || 'N/A'} stars
            </span>
          </div>
          
          {reviewScore > 0 && (
            <div className="flex items-center gap-1">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                {reviewScore.toFixed(1)}
              </div>
              <span className="text-sm text-gray-600">
                ({reviewCount || 0} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Enhanced amenities display */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity, index) => {
              const getAmenityIcon = (amenity: string) => {
                const amenityLower = amenity.toLowerCase();
                if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi className="w-3 h-3" />;
                if (amenityLower.includes('breakfast') || amenityLower.includes('coffee')) return <Coffee className="w-3 h-3" />;
                if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return <Users className="w-3 h-3" />;
                return null;
              };

              return (
                <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </Badge>
              );
            })}
            {hotel.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {/* Vendor prices for Makcorps */}
        {isMakcorpsHotel && vendorPrices.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {vendorPrices.slice(0, 3).map((vp, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {vp.vendor}: {vp.price}
              </Badge>
            ))}
            {vendorPrices.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{vendorPrices.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Description - enhanced for local hotels */}
        {hotel.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {hotel.description}
          </p>
        )}

        {/* Local hotel special features */}
        {isLocalHotel && hotel.hotel_rooms && hotel.hotel_rooms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
              <Users className="w-3 h-3 mr-1" />
              {hotel.hotel_rooms.length} room types
            </Badge>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <CompareButton
            hotel={{
              id: String(hotel.id),
              name: hotel.name,
              location: hotel.location || '',
              price: price,
              rating: displayRating,
              image: imageUrl,
              amenities: hotel.amenities || []
            }}
            size="sm"
          />
          <Button 
            onClick={handleBooking}
            className="flex-1"
            variant={isMakcorpsHotel ? 'default' : 'outline'}
          >
            {isMakcorpsHotel ? (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Compare Prices
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                View Details & Contact
              </>
            )}
          </Button>
        </div>

        {/* Hotel source indicator */}
        <div className="text-xs text-gray-400 mt-2 flex items-center justify-between">
          <span>
            {isMakcorpsHotel
              ? `Live pricing from ${vendorPrices.length > 0 ? vendorPrices.length : 'multiple'} vendor${vendorPrices.length !== 1 ? 's' : ''}`
              : 'Local Santorini hotel'}
          </span>
          {process.env.NODE_ENV === 'development' && (
            <span>ID: {hotel.id}</span>
          )}
        </div>
      </div>
    </Card>
  );

  // For Makcorps hotels, use internal routing (price comparison will be shown on detail page)
  // For local hotels, use internal routing
  if (isMakcorpsHotel && !hotelUrl.startsWith('/')) {
    // Makcorps with no URL - just render card without link
    return <CardContent />;
  }
  
  return (
    <Link to={hotelUrl} className="block hover:no-underline">
      <CardContent />
    </Link>
  );
};

export { UnifiedHotelCard };
export default UnifiedHotelCard;
