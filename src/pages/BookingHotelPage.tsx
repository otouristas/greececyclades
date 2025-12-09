import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Calendar, Users, CreditCard, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HotelRatesView } from '@/components/booking/HotelRatesView';
import { HotelDetailsFull } from '@/components/booking/HotelDetailsFull';
import { searchHotelRates, prebookHotelRate, getHotelDetailsFull, type Hotel, type HotelRate, type HotelDetailsFull as HotelDetailsFullType } from '@/lib/liteapi';
import SEO from '@/components/SEO';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';

export default function BookingHotelPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [hotelDetails, setHotelDetails] = useState<HotelDetailsFullType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPrebooking, setIsPrebooking] = useState(false);

  // Parse search params
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  const occupancies = JSON.parse(searchParams.get('occupancies') || '[{"adults":2}]');
  const currency = searchParams.get('currency') || 'EUR';
  const guestNationality = searchParams.get('guestNationality') || 'GR';

  // Load hotel rates and details in parallel
  useEffect(() => {
    if (!hotelId || !checkin || !checkout) {
      setError('Missing required parameters');
      setIsLoading(false);
      setIsLoadingDetails(false);
      return;
    }

    loadHotelData();
  }, [hotelId, checkin, checkout]);

  async function loadHotelData() {
    setIsLoading(true);
    setIsLoadingDetails(true);
    setError(null);

    // Load rates and details in parallel
    const [ratesResult, detailsResult] = await Promise.allSettled([
      searchHotelRates({
        checkin,
        checkout,
        occupancies,
        currency,
        guestNationality,
        hotelIds: [hotelId!],
        maxRatesPerHotel: 10,
      }),
      getHotelDetailsFull(hotelId!),
    ]);

    // Handle rates result
    if (ratesResult.status === 'fulfilled') {
      const results = ratesResult.value;
      if (results.length > 0) {
        setHotel(results[0]);
      } else {
        if (detailsResult.status === 'fulfilled') {
          const details = detailsResult.value;
          setHotel({
            id: details.id,
            name: details.name,
            hotelDescription: details.hotelDescription || '',
            checkin,
            checkout,
            currency,
            lat: details.location?.latitude,
            lon: details.location?.longitude,
            address: details.address || '',
            zip: details.zip || '',
            city: details.city || '',
            countryCode: details.country || '',
            images: details.hotelImages?.map(img => ({ url: img.url })) || [],
            rating: details.rating || details.starRating || 0,
            rates: [],
          });
        }
      }
    } else {
      console.warn('Failed to load hotel rates (non-critical):', ratesResult.reason);
    }

    // Handle details result
    if (detailsResult.status === 'fulfilled') {
      setHotelDetails(detailsResult.value);
    } else {
      console.warn('Failed to load hotel details (non-critical):', detailsResult.reason);
    }

    setIsLoading(false);
    setIsLoadingDetails(false);
  }

  async function handleBookRate(rate: HotelRate) {
    setIsPrebooking(true);
    setError(null);

    try {
      const prebookData = await prebookHotelRate(rate.offerId);

      navigate('/book/checkout', {
        state: {
          prebookData,
          hotel,
          rate,
          searchParams: {
            checkin,
            checkout,
            occupancies,
            currency,
            guestNationality,
          },
        },
      });
    } catch (err) {
      console.error('Prebook failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to prebook. Please try again.');
      setIsPrebooking(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <SimpleBreadcrumbs
          items={[
            { label: 'Book Hotels', href: '/book' },
            { label: 'Search', href: '/book/search' },
            { label: 'Hotel Details', href: '' },
          ]}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sifnos-turquoise mb-4" />
            <p className="text-lg text-gray-600">Loading hotel information...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !hotel && !hotelDetails) {
    return (
      <>
        <SimpleBreadcrumbs
          items={[
            { label: 'Book Hotels', href: '/book' },
            { label: 'Search', href: '/book/search' },
            { label: 'Hotel Details', href: '' },
          ]}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error Loading Hotel</h3>
              <p className="text-red-700">{error || 'Hotel not found'}</p>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="mt-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const displayHotel = hotel || (hotelDetails ? {
    id: hotelDetails.id,
    name: hotelDetails.name,
    hotelDescription: hotelDetails.hotelDescription || '',
    checkin,
    checkout,
    currency,
    lat: hotelDetails.location?.latitude,
    lon: hotelDetails.location?.longitude,
    address: hotelDetails.address || '',
    zip: hotelDetails.zip || '',
    city: hotelDetails.city || '',
    countryCode: hotelDetails.country || '',
    images: hotelDetails.hotelImages?.map(img => ({ url: img.url })) || [],
    rating: hotelDetails.rating || hotelDetails.starRating || 0,
    rates: [],
  } : null);

  if (!displayHotel && !hotelDetails) {
    return (
      <>
        <SimpleBreadcrumbs
          items={[
            { label: 'Book Hotels', href: '/book' },
            { label: 'Search', href: '/book/search' },
            { label: 'Hotel Details', href: '' },
          ]}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sifnos-turquoise mb-4" />
            <p className="text-lg text-gray-600">Loading hotel information...</p>
          </div>
        </div>
      </>
    );
  }

  const hasRates = displayHotel?.rates && displayHotel.rates.length > 0;
  const lowestPrice = hasRates && displayHotel.rates.length > 0
    ? Math.min(...displayHotel.rates
        .filter(r => r.retailRate?.total?.[0]?.amount)
        .map(r => r.retailRate.total[0].amount))
    : null;

  // Calculate nights
  const nights = checkin && checkout
    ? Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalGuests = occupancies.reduce((sum: number, occ: any) => sum + (occ.adults || 0) + (occ.children || 0), 0);

  return (
    <>
      <SEO
        title={`${hotelDetails?.name || displayHotel?.name || 'Hotel Details'} - Book Now | Hotels Santorini`}
        description={hotelDetails?.hotelDescription || displayHotel?.hotelDescription || `View hotel details and book with best rates.`}
        canonical={`https://hotelssantorini.gr/book/hotel/${hotelId}`}
        imageUrl={hotelDetails?.main_photo || displayHotel?.images?.[0]?.url}
      />

      <SimpleBreadcrumbs
        items={[
          { label: 'Book Hotels', href: '/book' },
          { label: 'Search', href: '/book/search' },
          { label: hotelDetails?.name || displayHotel?.name || 'Hotel Details', href: '' },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search Results
          </Button>

          {/* Error Messages */}
          {isPrebooking && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                <p className="text-blue-900 font-medium">
                  Confirming availability... This may take a few seconds.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-medium">Booking Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column (2/3 width on desktop) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Loading State for Details */}
              {isLoadingDetails ? (
                <Card className="p-12">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sifnos-turquoise mr-3" />
                    <p className="text-gray-600">Loading hotel details...</p>
                  </div>
                </Card>
              ) : hotelDetails ? (
                <HotelDetailsFull hotelDetails={hotelDetails} />
              ) : null}

              {/* Available Rooms & Rates */}
              {displayHotel && (
                <div id="rates-section" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-sifnos-turquoise to-sifnos-deep-blue rounded-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Available Rooms & Rates</h2>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    {hasRates
                      ? 'Select your preferred room and rate below. All prices shown are per room for your selected dates.'
                      : 'No rates are currently available for your selected dates. Please try different dates or contact the hotel directly for availability.'}
                  </p>
                  <HotelRatesView
                    hotel={displayHotel}
                    onBookRate={handleBookRate}
                    isLoading={isPrebooking}
                    showHeader={false}
                  />
                </div>
              )}
            </div>

            {/* Sticky Booking Widget - Right Column (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card className="p-6 shadow-2xl border-0 bg-white">
                  {/* Booking Summary Header */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Your Stay</h3>
                    
                    {/* Dates */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-sifnos-turquoise flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 mb-1">Check-in</div>
                          <div className="font-semibold text-gray-900">
                            {checkin ? new Date(checkin).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : 'Select date'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-sifnos-turquoise flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 mb-1">Check-out</div>
                          <div className="font-semibold text-gray-900">
                            {checkout ? new Date(checkout).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : 'Select date'}
                          </div>
                        </div>
                      </div>

                      {nights > 0 && (
                        <div className="text-center py-2 bg-sifnos-turquoise/10 rounded-lg">
                          <span className="text-sm font-semibold text-sifnos-deep-blue">
                            {nights} {nights === 1 ? 'night' : 'nights'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Guests */}
                    <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-sifnos-turquoise flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">Guests</div>
                        <div className="font-semibold text-gray-900">
                          {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {hasRates && lowestPrice && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm text-gray-600">Starting from</span>
                        <span className="text-3xl font-bold text-sifnos-turquoise">
                          {currency === 'EUR' && '€'}
                          {currency === 'USD' && '$'}
                          {currency === 'GBP' && '£'}
                          {lowestPrice.toFixed(0)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        per {nights} {nights === 1 ? 'night' : 'nights'}
                      </div>
                    </div>
                  )}

                  {/* Trust Badges */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure Booking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <span>Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span>Instant Confirmation</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {hasRates ? (
                    <Button
                      onClick={() => {
                        const ratesSection = document.getElementById('rates-section');
                        ratesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      View Available Rates
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={() => navigate('/book')}
                        className="w-full bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                      >
                        Search Different Dates
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        No rates available for these dates
                      </p>
                    </div>
                  )}

                  {/* Help Text */}
                  <p className="mt-4 text-xs text-center text-gray-500">
                    Need help? Contact our support team 24/7
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
