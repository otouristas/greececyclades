import { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';
import { useTheme } from '@/contexts/ThemeContext';
import type { BookingResponse } from '@/lib/liteapi';

export default function BookingConfirmationPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [bookingData, setBookingData] = useState<BookingResponse['data'] | null>(
    location.state?.bookingData || null
  );
  const [error, setError] = useState<string | null>(null);

  const bookingId = searchParams.get('bookingId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    // If we have bookingData from state, we're done
    if (bookingData) return;

    // If we have bookingId but no data, we might need to fetch it
    // For now, we'll show an error and ask user to check email
    if (!bookingId) {
      setError('No booking information found');
    } else {
      // Note: In a real app, you might want to fetch booking details
      // from your backend using the bookingId
      setError(
        'Booking confirmation details are being emailed to you. Please check your inbox.'
      );
    }
  }, [bookingId, bookingData]);

  if (error && !bookingData) {
    return (
      <>
        <SEO
          title="Booking Confirmation | Hotels Santorini"
          description="Your hotel booking confirmation"
          canonicalUrl="https://hotelssantorini.gr/book/confirmation"
          noIndex
        />

        <SimpleBreadcrumbs items={[{ label: 'Booking Confirmation' }]} />

        <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              <div className={`rounded-lg p-6 flex items-start gap-3 mb-6 ${isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <div>
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-yellow-300' : 'text-yellow-900'}`}>
                    Booking Information
                  </h3>
                  <p className={isDark ? 'text-yellow-200/80' : 'text-yellow-800'}>{error}</p>
                  {bookingId && (
                    <p className={`text-sm mt-2 ${isDark ? 'text-yellow-200/60' : 'text-yellow-700'}`}>
                      Booking Reference: <strong>{bookingId}</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => navigate('/book')}
                  className="flex-1 bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white"
                >
                  Book Another Hotel
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className={`flex-1 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
                >
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!bookingData) {
    return (
      <>
        <SimpleBreadcrumbs items={[{ label: 'Booking Confirmation' }]} />
        <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sifnos-turquoise mb-4" />
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Loading your booking details...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Booking Confirmed - ${bookingData.bookingId} | Hotels Santorini`}
        description={`Your booking at ${bookingData.hotel.name} has been confirmed. Booking reference: ${bookingData.bookingId}`}
        canonicalUrl="https://hotelssantorini.gr/book/confirmation"
        noIndex
      />

      <SimpleBreadcrumbs
        items={[
          { label: 'Book Hotels', href: '/book' },
          { label: 'Booking Confirmation', href: '' },
        ]}
      />

      <BookingConfirmation bookingData={bookingData} />
    </>
  );
}
