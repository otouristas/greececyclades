import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutForm, type HolderData, type GuestData } from '@/components/booking/CheckoutForm';
import { PaymentWidget } from '@/components/booking/PaymentWidget';
import { bookHotel } from '@/lib/liteapi';
import SEO from '@/components/SEO';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';
import { useTheme } from '@/contexts/ThemeContext';

export default function BookingCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { prebookData, hotel, rate } = location.state || {};

  const [showPayment, setShowPayment] = useState(false);
  const [holderData, setHolderData] = useState<HolderData | null>(null);
  const [guestsData, setGuestsData] = useState<GuestData[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug log to see what we receive
  useEffect(() => {
    console.log('Checkout page received:', { prebookData, hotel, rate });
  }, [prebookData, hotel, rate]);

  // Redirect if no prebook data
  useEffect(() => {
    if (!prebookData || !hotel) {
      navigate('/book');
    }
  }, [prebookData, hotel, navigate]);

  function handleCheckoutSubmit(holder: HolderData, guests: GuestData[]) {
    setHolderData(holder);
    setGuestsData(guests);
    setShowPayment(true);
  }

  async function handlePaymentComplete(transactionId: string) {
    if (!holderData || !prebookData) return;

    setIsBooking(true);
    setError(null);

    try {
      const bookingResult = await bookHotel(
        prebookData.prebookId,
        transactionId,
        {
          firstName: holderData.firstName,
          lastName: holderData.lastName,
          email: holderData.email,
        },
        guestsData
      );

      // Navigate to confirmation page
      navigate(`/book/confirmation?bookingId=${bookingResult.bookingId}&transactionId=${transactionId}`, {
        state: { bookingData: bookingResult },
      });
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err instanceof Error ? err.message : 'Booking failed. Please contact support.');
      setIsBooking(false);
    }
  }

  function handlePaymentError(errorMessage: string) {
    setError(errorMessage);
  }

  if (!prebookData || !hotel) {
    return null; // Will redirect in useEffect
  }

  const returnUrl = `${window.location.origin}/book/confirmation`;

  return (
    <>
      <SEO
        title="Checkout | Book Your Hotel in Santorini"
        description="Complete your hotel booking in Santorini with secure payment processing."
        canonicalUrl="https://hotelssantorini.gr/book/checkout"
        noIndex
      />

      <SimpleBreadcrumbs
        items={[
          { label: 'Book Hotels', href: '/book' },
          { label: 'Search', href: '/book/search' },
          { label: hotel.name, href: `/book/hotel/${hotel.id}` },
          { label: 'Checkout', href: '' },
        ]}
      />

      <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className={`mb-6 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Complete Your Booking
          </h1>

          {isBooking && (
            <div className={`mb-6 rounded-lg p-6 ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                <div>
                  <p className={`font-medium ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                    Finalizing your reservation...
                  </p>
                  <p className={`text-sm ${isDark ? 'text-blue-200/70' : 'text-blue-700'}`}>
                    Please do not refresh or close this page.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className={`mb-6 rounded-lg p-6 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-red-300' : 'text-red-900'}`}>
                    Booking Error
                  </h3>
                  <p className={isDark ? 'text-red-200/80' : 'text-red-700'}>{error}</p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-red-200/60' : 'text-red-600'}`}>
                    If payment was deducted, please contact support with your transaction ID.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!showPayment ? (
            <CheckoutForm
              prebookData={prebookData}
              rate={rate}
              onSubmit={handleCheckoutSubmit}
            />
          ) : (
            <PaymentWidget
              secretKey={prebookData.secretKey}
              transactionId={prebookData.transactionId}
              prebookId={prebookData.prebookId}
              returnUrl={returnUrl}
              onPaymentComplete={handlePaymentComplete}
              onPaymentError={handlePaymentError}
            />
          )}
        </div>
      </div>
    </>
  );
}
