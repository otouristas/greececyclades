import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ExternalLink, TrendingDown, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { parsePrice, formatPrice } from '@/services/makcorpsApi';

interface HotelPriceComparisonProps {
  hotelId: number;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfAdults?: number;
  numberOfRooms?: number;
  currency?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface VendorPrice {
  vendor: string;
  price: string;
  tax?: string;
}

export function HotelPriceComparison({
  hotelId,
  hotelName,
  checkInDate,
  checkOutDate,
  numberOfAdults = 2,
  numberOfRooms = 1,
  currency = 'EUR',
  isOpen,
  onClose,
}: HotelPriceComparisonProps) {
  const [vendorPrices, setVendorPrices] = useState<VendorPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && hotelId) {
      fetchHotelPrices();
    }
  }, [isOpen, hotelId, checkInDate, checkOutDate]);

  const fetchHotelPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase.functions.invoke('makcorps-hotel-prices', {
        body: {
          hotelId: String(hotelId),
          checkInDate,
          checkOutDate,
          numberOfAdults,
          numberOfRooms,
          currency,
        },
      });

      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch prices');
      }

      if (!data || !data.makcorps_data?.comparison) {
        setError('No price data available');
        return;
      }

      // Extract vendor prices from comparison array
      const prices: VendorPrice[] = [];
      const comparison = data.makcorps_data.comparison[0]?.[0];

      if (comparison) {
        // Extract vendor1-price1 through vendor19-price19
        for (let i = 1; i <= 19; i++) {
          const vendor = (comparison as any)[`vendor${i}`];
          const price = (comparison as any)[`price${i}`];
          const tax = (comparison as any)[`tax${i}`];

          if (vendor && price) {
            prices.push({
              vendor,
              price,
              tax: tax || undefined,
            });
          }
        }
      }

      // Sort by price (cheapest first)
      prices.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceA - priceB;
      });

      setVendorPrices(prices);
    } catch (err) {
      console.error('Error fetching hotel prices:', err);
      setError(err instanceof Error ? err.message : 'Failed to load prices');
    } finally {
      setLoading(false);
    }
  };

  const getVendorLogo = (vendorName: string): string => {
    const vendorLower = vendorName.toLowerCase();
    if (vendorLower.includes('booking')) return '🏨';
    if (vendorLower.includes('expedia')) return '✈️';
    if (vendorLower.includes('hotels.com')) return '🏖️';
    if (vendorLower.includes('priceline')) return '💰';
    if (vendorLower.includes('agoda')) return '🌏';
    if (vendorLower.includes('tripadvisor')) return '⭐';
    return '🔗';
  };

  const cheapestPrice = vendorPrices.length > 0 ? parsePrice(vendorPrices[0].price) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Compare Prices for {hotelName}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Check-in: {new Date(checkInDate).toLocaleDateString()} • Check-out:{' '}
            {new Date(checkOutDate).toLocaleDateString()} • {numberOfAdults} Adult{numberOfAdults !== 1 ? 's' : ''} • {numberOfRooms} Room{numberOfRooms !== 1 ? 's' : ''}
          </p>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading prices...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={fetchHotelPrices}
            >
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && vendorPrices.length > 0 && (
          <div className="space-y-3 mt-4">
            {/* Cheapest price highlight */}
            {cheapestPrice > 0 && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900">Best Price</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">
                      {formatPrice(cheapestPrice, currency)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      via {vendorPrices[0].vendor}
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">Cheapest</Badge>
                </div>
              </div>
            )}

            {/* All vendor prices */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 mb-3">
                All Available Prices ({vendorPrices.length} vendors)
              </h3>
              {vendorPrices.map((vp, index) => {
                const priceNum = parsePrice(vp.price);
                const isCheapest = index === 0 && priceNum === cheapestPrice;

                return (
                  <Card
                    key={index}
                    className={`transition-all hover:shadow-md ${
                      isCheapest ? 'border-green-500 border-2' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getVendorLogo(vp.vendor)}</span>
                          <div>
                            <div className="font-semibold text-lg">{vp.vendor}</div>
                            {vp.tax && (
                              <div className="text-xs text-gray-500">
                                Tax: {vp.tax}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {vp.price}
                          </div>
                          {isCheapest && (
                            <Badge className="mt-1 bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Best Deal
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Prices are provided by Makcorps and may vary. Click on a vendor
                to be redirected to their booking page. We may earn a commission when you book through
                our affiliate links at no extra cost to you.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && vendorPrices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No prices available for this hotel and date range.</p>
            <p className="text-sm text-gray-500 mt-2">
              Try selecting different dates or check back later.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

