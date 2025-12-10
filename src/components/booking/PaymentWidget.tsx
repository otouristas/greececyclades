import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, CreditCard } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface PaymentWidgetProps {
  secretKey: string;
  transactionId: string;
  returnUrl: string;
  prebookId: string;
  onPaymentComplete?: (transactionId: string) => void;
  onPaymentError?: (error: string) => void;
}

declare global {
  interface Window {
    LiteAPIPayment: any;
  }
}

export function PaymentWidget({
  secretKey,
  transactionId,
  returnUrl,
  prebookId,
  onPaymentComplete,
  onPaymentError,
}: PaymentWidgetProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);

  // Determine if using sandbox or production based on API key
  const liteApiKey = import.meta.env.VITE_LITEAPI_KEY || '';
  const isSandbox = liteApiKey.startsWith('sand_');
  const publicKey = isSandbox ? 'sandbox' : 'live';

  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Load LiteAPI Payment SDK script
    const script = document.createElement('script');
    script.src = 'https://payment-wrapper.liteapi.travel/dist/liteAPIPayment.js?v=a1';
    script.async = true;

    script.onload = () => {
      try {
        // Initialize the payment SDK
        if (!window.LiteAPIPayment) {
          throw new Error('LiteAPIPayment SDK not loaded');
        }

        // Build return URL with query parameters
        const returnUrlWithParams = `${returnUrl}?prebookId=${prebookId}&transactionId=${transactionId}`;

        const liteAPIConfig = {
          publicKey: publicKey,
          secretKey: secretKey,
          returnUrl: returnUrlWithParams,
          targetElement: '#liteapi-payment-element',
          appearance: {
            theme: isDark ? 'night' : 'flat',
          },
          options: {
            business: {
              name: 'Hotels Santorini',
            },
          },
        };

        console.log('Initializing LiteAPI Payment with config:', {
          ...liteAPIConfig,
          secretKey: '[REDACTED]',
        });

        const liteAPIPayment = new window.LiteAPIPayment(liteAPIConfig);

        // Wait for DOM to be ready
        setTimeout(() => {
          liteAPIPayment.handlePayment();
          setIsLoading(false);
        }, 100);

      } catch (err) {
        console.error('Failed to initialize payment SDK:', err);
        setError('Failed to load payment form. Please refresh and try again.');
        setIsLoading(false);
        onPaymentError?.('Failed to initialize payment form');
      }
    };

    script.onerror = () => {
      console.error('Failed to load payment SDK script');
      setError('Failed to load payment SDK. Please check your connection and try again.');
      setIsLoading(false);
      onPaymentError?.('Failed to load payment SDK');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [secretKey, returnUrl, prebookId, transactionId, publicKey, onPaymentError, isDark]);

  if (error) {
    return (
      <Card className={`p-8 ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          <div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-red-300' : 'text-red-900'}`}>
              Payment Error
            </h3>
            <p className={isDark ? 'text-red-200/80' : 'text-red-700'}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={`mt-3 px-4 py-2 rounded-md transition-colors ${isDark
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  : 'bg-red-600 text-white hover:bg-red-700'
                }`}
            >
              Refresh page to try again
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className={`p-6 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-sifnos-turquoise" />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Payment Information
          </h2>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sifnos-turquoise mb-4" />
            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Loading secure payment form...
            </p>
          </div>
        )}

        {/* Payment SDK will mount here */}
        <div
          id="liteapi-payment-element"
          className={isLoading ? 'hidden' : ''}
        />
      </Card>

      {/* Test card notice for sandbox */}
      {isSandbox && (
        <Card className={`p-4 ${isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <div className={`text-sm ${isDark ? 'text-yellow-200/80' : 'text-yellow-800'}`}>
              <p className={`font-medium mb-1 ${isDark ? 'text-yellow-300' : ''}`}>Test Mode</p>
              <p>Use test card: <strong>4242 4242 4242 4242</strong></p>
              <p>CVV: Any 3 digits • Expiry: Any future date</p>
            </div>
          </div>
        </Card>
      )}

      {/* Security notice */}
      <Card className={`p-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
        <div className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <p className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Secure Payment
            </p>
            <p>Your payment information is encrypted and secure. We use Stripe for payment processing.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
