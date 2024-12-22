import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Cookie Settings</h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          By clicking "Accept", you consent to our use of cookies.
        </p>
        
        <div className="text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{' '}
          apply.
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Accept Necessary Only
          </button>
        </div>

        <div className="text-xs text-gray-500">
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          {' • '}
          <a href="/cookie-policy" className="text-blue-600 hover:underline">
            Cookie Policy
          </a>
          {' • '}
          <a href="/gdpr" className="text-blue-600 hover:underline">
            GDPR
          </a>
        </div>
      </div>
    </div>
  );
}
