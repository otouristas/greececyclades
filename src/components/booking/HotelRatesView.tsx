import { useMemo } from 'react';
import { Star, MapPin, Check, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Hotel, HotelRate } from '@/lib/liteapi';
import { calculateNights } from '@/lib/liteapi';

interface HotelRatesViewProps {
  hotel: Hotel;
  onBookRate: (rate: HotelRate) => void;
  isLoading?: boolean;
  showHeader?: boolean; // Option to hide header when full details are shown above
}

export function HotelRatesView({ hotel, onBookRate, isLoading, showHeader = true }: HotelRatesViewProps) {
  // Safely calculate nights - handle undefined dates
  const nights = (hotel.checkin && hotel.checkout) 
    ? calculateNights(hotel.checkin, hotel.checkout)
    : 0;

  // Group rates by room type (mappedRoomId)
  const groupedRates = useMemo(() => {
    if (!hotel.rates || hotel.rates.length === 0) {
      return [];
    }

    const groups = new Map<number, HotelRate[]>();
    
    hotel.rates.forEach((rate) => {
      const existing = groups.get(rate.mappedRoomId) || [];
      existing.push(rate);
      groups.set(rate.mappedRoomId, existing);
    });

    return Array.from(groups.entries()).map(([mappedRoomId, rates]) => ({
      mappedRoomId,
      roomName: rates[0].name,
      rates: rates.sort((a, b) => 
        (a.retailRate?.total?.[0]?.amount || 0) - (b.retailRate?.total?.[0]?.amount || 0)
      ),
    }));
  }, [hotel.rates]);

  function getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      default: return currency;
    }
  }

  return (
    <div className="space-y-8">
      {/* Hotel Header - Optional */}
      {showHeader && (
        <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Main Image */}
          <div className="md:w-2/5 h-80 bg-gray-200">
            {hotel.images && hotel.images.length > 0 ? (
              <img
                src={hotel.images[0].url}
                alt={`${hotel.name} - Santorini hotel`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          {/* Hotel Info */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="text-gray-700 text-sm ml-1 font-medium">
                  {hotel.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-start text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div>{hotel.address}</div>
                <div>{hotel.city}, {hotel.zip} {hotel.countryCode}</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {hotel.hotelDescription}
            </p>

            {hotel.checkin && hotel.checkout && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(hotel.checkin).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  {' → '}
                  {new Date(hotel.checkout).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  {' '}
                  ({nights} {nights === 1 ? 'night' : 'nights'})
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
      )}

      {/* Available Rooms & Rates */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Available Rooms & Rates
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sifnos-turquoise" />
          </div>
        ) : groupedRates.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg mb-2">No rates available</p>
            <p className="text-gray-500 text-sm">
              Rates are not available for your selected dates. Please try different dates or contact the hotel directly.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedRates.map(({ mappedRoomId, roomName, rates }) => (
              <Card key={mappedRoomId} className="overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">{roomName}</h3>
                </div>

                <div className="divide-y divide-gray-200">
                  {rates.map((rate) => {
                    const price = rate.retailRate?.total?.[0];
                    const isRefundable = rate.cancellationPolicies?.refundableTag === 'RFN';
                    const taxInfo = rate.retailRate?.taxesAndFees?.[0];
                    
                    if (!price) {
                      return null; // Skip rates without valid pricing
                    }

                    return (
                      <div
                        key={rate.offerId}
                        className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        {/* Rate Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={isRefundable ? 'default' : 'secondary'}>
                              {isRefundable ? (
                                <><Check className="w-3 h-3 mr-1" /> Refundable</>
                              ) : (
                                <><X className="w-3 h-3 mr-1" /> Non-refundable</>
                              )}
                            </Badge>
                            <span className="text-sm font-medium text-gray-700">
                              {rate.boardName}
                            </span>
                          </div>

                          {isRefundable && rate.cancellationPolicies?.cancelPolicyInfos && rate.cancellationPolicies.cancelPolicyInfos.length > 0 && rate.cancellationPolicies.cancelPolicyInfos[0]?.cancelTime && (
                            <p className="text-sm text-gray-600">
                              Free cancellation until{' '}
                              {new Date(rate.cancellationPolicies.cancelPolicyInfos[0].cancelTime).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          )}

                          {taxInfo && (
                            <p className="text-xs text-gray-500 mt-1">
                              {taxInfo.included ? 'Taxes included' : `Plus ${getCurrencySymbol(price.currency)}${taxInfo.amount.toFixed(2)} taxes`}
                            </p>
                          )}
                        </div>

                        {/* Price & Book Button */}
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-3xl font-bold text-sifnos-turquoise">
                              {getCurrencySymbol(price.currency)}{price.amount.toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Total for {nights} {nights === 1 ? 'night' : 'nights'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getCurrencySymbol(price.currency)}{(price.amount / nights).toFixed(0)} per night
                            </div>
                          </div>

                          <Button
                            onClick={() => onBookRate(rate)}
                            className="bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white whitespace-nowrap"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

