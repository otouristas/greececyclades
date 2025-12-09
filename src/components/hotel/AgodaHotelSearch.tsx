import { useState } from 'react';
import { Calendar, Users, Search, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { CitySearchHotel, parsePrice } from '@/services/makcorpsApi';

interface MakcorpsHotel {
  hotelId: number;
  name: string;
  reviews: {
    rating: number;
    count: number;
  };
  vendor1?: string;
  price1?: string;
  vendor2?: string;
  price2?: string;
  vendor3?: string;
  price3?: string;
  vendor4?: string;
  price4?: string;
  geocode?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
}

interface MakcorpsSearchResponse {
  makcorps_data?: {
    results?: MakcorpsHotel[];
  };
  error?: string;
}

export default function MakcorpsHotelSearch() {
  const [checkInDate, setCheckInDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [checkOutDate, setCheckOutDate] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<MakcorpsHotel[]>([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('makcorps-search', {
        body: {
          checkInDate,
          checkOutDate,
          numberOfAdults,
          numberOfChildren,
          numberOfRooms: 1,
          currency: 'EUR',
          pagination: 0,
        },
      });

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          title: 'Error',
          description: 'Failed to connect to hotel search service. Please try again.',
          variant: 'destructive',
        });
        setHotels([]);
        return;
      }

      const response = data as MakcorpsSearchResponse;

      if (response.error) {
        toast({
          title: 'Search Error',
          description: response.error || 'Failed to search hotels',
          variant: 'destructive',
        });
        setHotels([]);
        return;
      }

      // Filter out metadata objects
      const hotelResults = (response.makcorps_data?.results || []).filter(
        (item: any) => item.hotelId && !item.totalHotelCount
      ) as MakcorpsHotel[];

      if (hotelResults.length > 0) {
        setHotels(hotelResults);
        toast({
          title: 'Success',
          description: `Found ${hotelResults.length} hotels in Santorini`,
        });
      } else {
        setHotels([]);
        toast({
          title: 'No Results',
          description: 'No hotels found for the selected dates',
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Error',
        description: 'Failed to search hotels. Please try again.',
        variant: 'destructive',
      });
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Live Hotel Availability
          </CardTitle>
          <CardDescription>
            Find the best deals in Santorini with real-time pricing from multiple vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Check-in
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Check-out
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adults" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Adults
              </Label>
              <Input
                id="adults"
                type="number"
                min="1"
                max="10"
                value={numberOfAdults}
                onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="children" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Children
              </Label>
              <Input
                id="children"
                type="number"
                min="0"
                max="10"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2 flex items-end">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Hotels
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {hotels.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            {hotels.length} Hotels Available in Santorini
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => {
              const cheapestPrice = hotel.price1 ? parsePrice(hotel.price1) : 0;
              const vendorPrices = [
                hotel.vendor1 && hotel.price1 ? { vendor: hotel.vendor1, price: hotel.price1 } : null,
                hotel.vendor2 && hotel.price2 ? { vendor: hotel.vendor2, price: hotel.price2 } : null,
                hotel.vendor3 && hotel.price3 ? { vendor: hotel.vendor3, price: hotel.price3 } : null,
                hotel.vendor4 && hotel.price4 ? { vendor: hotel.vendor4, price: hotel.price4 } : null,
              ].filter(Boolean);

              return (
                <Card key={hotel.hotelId} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>No image available</span>
                    </div>
                    {vendorPrices.length > 1 && (
                      <Badge className="absolute top-2 right-2 bg-blue-600">
                        {vendorPrices.length} vendors
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        {hotel.reviews.rating > 0 && (
                          <>
                            <div className="flex">
                              {[...Array(Math.floor(hotel.reviews.rating))].map((_, i) => (
                                <span key={i} className="text-yellow-500">★</span>
                              ))}
                            </div>
                            <Badge variant="secondary">
                              {hotel.reviews.rating.toFixed(1)} / 5
                            </Badge>
                            {hotel.reviews.count > 0 && (
                              <span className="text-xs text-gray-500">
                                ({hotel.reviews.count} reviews)
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {vendorPrices.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {vendorPrices.slice(0, 2).map((vp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {vp.vendor}
                          </Badge>
                        ))}
                        {vendorPrices.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{vendorPrices.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      {cheapestPrice > 0 ? (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">
                              €{cheapestPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground">/ night</span>
                          </div>
                          {hotel.vendor1 && (
                            <div className="text-xs text-gray-500">
                              via {hotel.vendor1}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">Price on request</div>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      variant="default"
                      onClick={() => {
                        // Navigate to hotel detail page or show price comparison
                        window.location.href = `/hotels/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`;
                      }}
                    >
                      Compare Prices
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>
              Prices shown are provided by Makcorps and may vary. We may earn a commission when you book 
              through our affiliate links at no extra cost to you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
