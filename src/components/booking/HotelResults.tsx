import { useState, useMemo } from 'react';
import { Star, MapPin, ArrowUpDown, SlidersHorizontal, Building, Wifi, Car, UtensilsCrossed, Waves, Dumbbell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { Hotel } from '@/lib/liteapi';

interface HotelResultsProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
  isLoading?: boolean;
  currency?: string;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export function HotelResults({ hotels, onSelectHotel, isLoading, currency = 'EUR' }: HotelResultsProps) {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  // Calculate price range from hotels
  const { minPrice, maxPrice } = useMemo(() => {
    if (hotels.length === 0) return { minPrice: 0, maxPrice: 1000 };
    
    const prices = hotels
      .filter((h) => h.rates && h.rates.length > 0)
      .map((h) => {
        const rateAmounts = h.rates
          .filter((r) => r.retailRate?.total && r.retailRate.total.length > 0)
          .map((r) => r.retailRate.total[0].amount)
          .filter((a) => a > 0);
        return rateAmounts.length > 0 ? Math.min(...rateAmounts) : null;
      })
      .filter((p) => p !== null && p > 0) as number[];
    
    if (prices.length === 0) return { minPrice: 0, maxPrice: 1000 };
    
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [hotels]);

  // Update price range when hotels change
  useMemo(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Helper function to get hotel minimum price safely
  const getHotelMinPrice = (hotel: Hotel): number | null => {
    if (!hotel.rates || hotel.rates.length === 0) return null;
    const rateAmounts = hotel.rates
      .filter((r) => r.retailRate?.total && r.retailRate.total.length > 0)
      .map((r) => r.retailRate.total[0].amount)
      .filter((a) => a > 0);
    return rateAmounts.length > 0 ? Math.min(...rateAmounts) : null;
  };

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    // Show all hotels, even if they don't have rates yet
    let result = [...hotels];

    // Filter by price (only if hotel has rates)
    result = result.filter((hotel) => {
      const hotelMinPrice = getHotelMinPrice(hotel);
      // If no price available, show the hotel anyway (might have rates later)
      if (hotelMinPrice === null) return true;
      return hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];
    });

    // Filter by rating
    if (minRating > 0) {
      result = result.filter((hotel) => (hotel.rating || 0) >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const aPrice = getHotelMinPrice(a) || Infinity;
          const bPrice = getHotelMinPrice(b) || Infinity;
          return aPrice - bPrice;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const aPrice = getHotelMinPrice(a) || 0;
          const bPrice = getHotelMinPrice(b) || 0;
          return bPrice - aPrice;
        });
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'relevance':
      default:
        // Keep original order (relevance from AI search or distance from place)
        break;
    }

    return result;
  }, [hotels, sortBy, priceRange, minRating]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sifnos-turquoise mb-4" />
        <p className="text-lg text-gray-600">Searching 1000+ hotels in Santorini...</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 mb-2">No hotels found</p>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="text-gray-700">
          <span className="font-semibold">{filteredAndSortedHotels.length}</span> hotels found
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 sm:flex-none"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-48">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort: Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 space-y-6">
          <div>
            <Label className="mb-4 block">
              Price Range: {priceRange[0]} - {priceRange[1]} {currency}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={(v) => setPriceRange(v as [number, number])}
              min={minPrice}
              max={maxPrice}
              step={10}
              className="mb-2"
            />
          </div>

          <div>
            <Label htmlFor="min-rating" className="mb-2 block">
              Minimum Rating
            </Label>
            <Select value={minRating.toString()} onValueChange={(v) => setMinRating(parseFloat(v))}>
              <SelectTrigger id="min-rating">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAndSortedHotels.map((hotel) => {
            const validRates = hotel.rates?.filter(
              (r) => r.retailRate?.total && r.retailRate.total.length > 0
            ) || [];
            
            const hasRates = validRates.length > 0;
            const startingPrice = hasRates 
              ? validRates.reduce((min, rate) => 
                  rate.retailRate.total[0].amount < min.retailRate.total[0].amount ? rate : min
                ).retailRate.total[0].amount
              : null;

            // Calculate nights from checkin/checkout if available
            const nights = hotel.checkin && hotel.checkout
              ? Math.ceil((new Date(hotel.checkout).getTime() - new Date(hotel.checkin).getTime()) / (1000 * 60 * 60 * 24))
              : 0;

            return (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  {hotel.images && hotel.images.length > 0 && hotel.images[0]?.url ? (
                    <>
                      <img
                        src={hotel.images[0].url}
                        alt={`${hotel.name} - Hotel`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-gray-400 bg-gradient-to-br from-gray-200 to-gray-300">
                        <span className="text-sm">Image unavailable</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-200 to-gray-300">
                      <div className="w-16 h-16 mb-2 rounded-lg bg-gray-300 flex items-center justify-center">
                        <span className="text-2xl">🏨</span>
                      </div>
                      <span className="text-sm">No image available</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      {/* Hotel Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{hotel.name}</h3>
                      
                      {/* Rating & Reviews */}
                      {hotel.rating && hotel.rating > 0 && (
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, Math.floor(hotel.rating)) }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            ))}
                            <span className="text-gray-900 font-semibold ml-2 text-base">
                              {hotel.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">Excellent</span>
                        </div>
                      )}

                      {/* Location - Enhanced */}
                      <div className="mb-3">
                        {(hotel.address || hotel.city || hotel.countryCode) && (
                          <div className="flex items-start gap-2 text-gray-700">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-sifnos-turquoise" />
                            <div className="text-sm">
                              {hotel.address && (
                                <div className="font-medium text-gray-900 mb-0.5">{hotel.address}</div>
                              )}
                              <div className="text-gray-600">
                                {[hotel.city, hotel.zip, hotel.countryCode].filter(Boolean).join(', ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description - Enhanced */}
                      {hotel.hotelDescription && (
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                            {hotel.hotelDescription
                              .replace(/<[^>]*>/g, '') // Strip HTML tags
                              .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
                              .replace(/&amp;/g, '&') // Replace &amp; with &
                              .replace(/&lt;/g, '<') // Replace &lt; with <
                              .replace(/&gt;/g, '>') // Replace &gt; with >
                              .substring(0, 200)}
                            {hotel.hotelDescription.replace(/<[^>]*>/g, '').length > 200 && '...'}
                          </p>
                        </div>
                      )}

                      {/* Quick Features - If we have rates, show room count */}
                      {hasRates && validRates.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-xs bg-sifnos-beige/10 border-sifnos-turquoise/30">
                            <Sparkles className="w-3 h-3 mr-1 text-sifnos-turquoise" />
                            {validRates.length} {validRates.length === 1 ? 'room type' : 'room types'} available
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Price - Enhanced */}
                    <div className="text-right flex-shrink-0">
                      {hasRates && startingPrice !== null ? (
                        <div className="bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 rounded-xl p-4 border border-sifnos-turquoise/20">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Starting from</div>
                          <div className="text-3xl font-bold text-sifnos-turquoise mb-1">
                            {currency === 'EUR' && '€'}
                            {currency === 'USD' && '$'}
                            {currency === 'GBP' && '£'}
                            {startingPrice.toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500">per night</div>
                          {nights > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="text-xs text-gray-600">Total for {nights} {nights === 1 ? 'night' : 'nights'}</div>
                              <div className="text-sm font-semibold text-gray-900">
                                {currency === 'EUR' && '€'}
                                {currency === 'USD' && '$'}
                                {currency === 'GBP' && '£'}
                                {(startingPrice * nights).toFixed(0)}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Rates</div>
                          <div className="text-lg font-semibold text-gray-500 mb-1">
                            Not available
                          </div>
                          <div className="text-xs text-gray-400">for these dates</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => onSelectHotel(hotel)}
                      variant="outline"
                      className="flex-1 border-2 border-sifnos-deep-blue text-sifnos-deep-blue hover:bg-sifnos-deep-blue hover:text-white font-semibold"
                    >
                      View Details
                    </Button>
                    {hasRates && (
                      <Button
                        onClick={() => onSelectHotel(hotel)}
                        className="bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white flex-1 font-semibold shadow-md hover:shadow-lg transition-all"
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                  {!hasRates && (
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Rates not available for these dates. Click "View Details" to see hotel information and amenities.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

