import { useState, useMemo } from 'react';
import { Star, MapPin, ArrowUpDown, SlidersHorizontal, Building2, Coffee, Bed, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/contexts/ThemeContext';
import type { Hotel } from '@/lib/liteapi';

interface HotelResultsProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
  isLoading?: boolean;
  currency?: string;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return 'Exceptional';
  if (rating >= 4.0) return 'Excellent';
  if (rating >= 3.5) return 'Very Good';
  if (rating >= 3.0) return 'Good';
  return 'Pleasant';
}

export function HotelResults({ hotels, onSelectHotel, isLoading, currency = 'EUR' }: HotelResultsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);

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
    return { minPrice: Math.floor(Math.min(...prices)), maxPrice: Math.ceil(Math.max(...prices)) };
  }, [hotels]);

  useMemo(() => { setPriceRange([minPrice, maxPrice]); }, [minPrice, maxPrice]);

  const getHotelMinPrice = (hotel: Hotel): number | null => {
    if (!hotel.rates || hotel.rates.length === 0) return null;
    const rateAmounts = hotel.rates
      .filter((r) => r.retailRate?.total && r.retailRate.total.length > 0)
      .map((r) => r.retailRate.total[0].amount)
      .filter((a) => a > 0);
    return rateAmounts.length > 0 ? Math.min(...rateAmounts) : null;
  };

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      default: return curr;
    }
  };

  const filteredAndSortedHotels = useMemo(() => {
    let result = [...hotels];
    result = result.filter((hotel) => {
      const hotelMinPrice = getHotelMinPrice(hotel);
      if (hotelMinPrice === null) return true;
      return hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];
    });
    if (minRating > 0) {
      result = result.filter((hotel) => (hotel.rating || 0) >= minRating);
    }
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (getHotelMinPrice(a) || Infinity) - (getHotelMinPrice(b) || Infinity));
        break;
      case 'price-desc':
        result.sort((a, b) => (getHotelMinPrice(b) || 0) - (getHotelMinPrice(a) || 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    return result;
  }, [hotels, sortBy, priceRange, minRating]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className={`animate-spin rounded-full h-10 w-10 border-b-2 mb-3 ${isDark ? 'border-cyclades-turquoise' : 'border-cyan-600'}`} />
        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Searching hotels...</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-dark-card border border-white/10' : 'bg-white shadow-sm'}`}>
        <Building2 className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/30' : 'text-gray-300'}`} />
        <p className={`text-base mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>No hotels found</p>
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className={`flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3 rounded-lg ${isDark ? 'bg-dark-card border border-white/10' : 'bg-white shadow-sm'}`}>
        <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-semibold">{filteredAndSortedHotels.length}</span> hotels found
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className={`flex-1 sm:flex-none ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}>
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className={`w-full sm:w-44 h-9 text-sm ${isDark ? 'border-white/20 bg-dark-card text-white' : ''}`}>
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={isDark ? 'bg-dark-card border-white/20 text-white' : ''}>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`p-4 space-y-4 rounded-lg ${isDark ? 'bg-dark-card border border-white/10' : 'bg-white shadow-sm'}`}>
          <div>
            <Label className={`mb-3 block text-sm ${isDark ? 'text-white' : ''}`}>
              Price Range: {priceRange[0]} - {priceRange[1]} {currency}
            </Label>
            <Slider value={priceRange} onValueChange={(v) => setPriceRange(v as [number, number])} min={minPrice} max={maxPrice} step={10} />
          </div>
          <div>
            <Label htmlFor="min-rating" className={`mb-2 block text-sm ${isDark ? 'text-white' : ''}`}>Minimum Rating</Label>
            <Select value={minRating.toString()} onValueChange={(v) => setMinRating(parseFloat(v))}>
              <SelectTrigger id="min-rating" className={`h-9 ${isDark ? 'border-white/20 bg-dark-card text-white' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={isDark ? 'bg-dark-card border-white/20 text-white' : ''}>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAndSortedHotels.map((hotel) => {
          const validRates = hotel.rates?.filter((r) => r.retailRate?.total && r.retailRate.total.length > 0) || [];
          const hasRates = validRates.length > 0;
          const startingPrice = hasRates ? validRates.reduce((min, rate) => rate.retailRate.total[0].amount < min.retailRate.total[0].amount ? rate : min).retailRate.total[0].amount : null;
          const nights = hotel.checkin && hotel.checkout ? Math.ceil((new Date(hotel.checkout).getTime() - new Date(hotel.checkin).getTime()) / (1000 * 60 * 60 * 24)) : 1;
          const boardName = validRates[0]?.boardName || null;
          const isRefundable = validRates[0]?.cancellationPolicies?.refundableTag === 'RFN';

          return (
            <div key={hotel.id} className={`overflow-hidden rounded-xl transition-all duration-200 hover:shadow-lg ${isDark ? 'bg-dark-card border border-white/10 hover:border-cyclades-turquoise/30' : 'bg-white shadow-sm hover:shadow-md border border-gray-100'}`}>
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-64 lg:w-72 h-48 md:h-52 relative overflow-hidden flex-shrink-0">
                  {hotel.images && hotel.images.length > 0 && hotel.images[0]?.url ? (
                    <img
                      src={hotel.images[0].url}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full items-center justify-center ${hotel.images && hotel.images.length > 0 ? 'hidden' : 'flex'} ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Building2 className={`w-10 h-10 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                  </div>
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                    {isRefundable && <span className="px-2 py-0.5 bg-green-500/90 text-white text-xs font-medium rounded-full">Free Cancellation</span>}
                    {hotel.rating && hotel.rating >= 4.5 && <span className="px-2 py-0.5 bg-amber-500/90 text-white text-xs font-medium rounded-full">Top Rated</span>}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold leading-tight truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{hotel.name}</h3>
                      {(hotel.address || hotel.city) && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                          <span className={`text-xs truncate ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{hotel.city}{hotel.zip ? `, ${hotel.zip}` : ''}</span>
                        </div>
                      )}
                    </div>
                    {hotel.rating && hotel.rating > 0 && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className={`text-xs font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-700'}`}>{hotel.rating.toFixed(1)}</span>
                        </div>
                        <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>{getRatingLabel(hotel.rating)}</span>
                      </div>
                    )}
                  </div>

                  {hotel.rating && hotel.rating > 0 && (
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: Math.min(5, Math.floor(hotel.rating)) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  )}

                  {hotel.hotelDescription && (
                    <p className={`text-xs leading-relaxed line-clamp-2 mb-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {hotel.hotelDescription.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').substring(0, 150)}
                      {hotel.hotelDescription.replace(/<[^>]*>/g, '').length > 150 && '...'}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {boardName && (
                      <Badge variant="outline" className={`text-xs px-1.5 py-0 h-5 ${isDark ? 'bg-white/5 border-white/20 text-white/70' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                        <Coffee className="w-2.5 h-2.5 mr-0.5" />{boardName}
                      </Badge>
                    )}
                    {hasRates && (
                      <Badge variant="outline" className={`text-xs px-1.5 py-0 h-5 ${isDark ? 'bg-cyclades-turquoise/10 border-cyclades-turquoise/30 text-cyclades-turquoise' : 'bg-cyan-50 border-cyan-200 text-cyan-600'}`}>
                        <Bed className="w-2.5 h-2.5 mr-0.5" />{validRates.length} room{validRates.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                    <Badge variant="outline" className={`text-xs px-1.5 py-0 h-5 ${isDark ? 'bg-white/5 border-white/20 text-white/70' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                      <Users className="w-2.5 h-2.5 mr-0.5" />2 guests
                    </Badge>
                    <Badge variant="outline" className={`text-xs px-1.5 py-0 h-5 ${isDark ? 'bg-white/5 border-white/20 text-white/70' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                      <Clock className="w-2.5 h-2.5 mr-0.5" />{nights} night{nights !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="flex items-end justify-between gap-3 mt-auto">
                    <div>
                      {hasRates && startingPrice !== null ? (
                        <div>
                          <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>From</span>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`}>{getCurrencySymbol(currency)}{startingPrice.toFixed(0)}</span>
                            <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>/night</span>
                          </div>
                          {nights > 1 && <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>Total: {getCurrencySymbol(currency)}{(startingPrice * nights).toFixed(0)}</div>}
                        </div>
                      ) : (
                        <div className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Rates unavailable</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => onSelectHotel(hotel)} variant="outline" size="sm" className={`text-xs h-8 px-3 ${isDark ? 'border-cyclades-turquoise/50 text-cyclades-turquoise hover:bg-cyclades-turquoise hover:text-white' : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'}`}>
                        Details
                      </Button>
                      {hasRates && (
                        <Button onClick={() => onSelectHotel(hotel)} size="sm" className={`text-xs h-8 px-3 ${isDark ? 'bg-cyclades-turquoise hover:bg-cyan-500 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}>
                          Book Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
