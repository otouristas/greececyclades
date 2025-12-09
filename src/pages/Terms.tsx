import SEO from '../components/SEO';
import { generateTermsSEO } from '../utils/seo';
import { useTheme } from '../contexts/ThemeContext';
import { FileText } from 'lucide-react';

export default function Terms() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <SEO {...generateTermsSEO()} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className={`mx-auto h-14 w-14 flex items-center justify-center rounded-2xl mb-6 ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyclades-turquoise/10'}`}>
              <FileText className="h-7 w-7 text-cyclades-turquoise" />
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h1>
          </div>
          
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
            <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>Last updated: March 15, 2024</p>
            
            <section className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Acceptance of Terms</h2>
              <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                By accessing and using Discover Cyclades, you agree to be bound by these Terms of Service
                and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Booking and Reservations</h2>
              <ul className={`list-disc pl-6 mb-4 space-y-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                <li>All bookings are subject to availability and confirmation</li>
                <li>Prices are subject to change without notice</li>
                <li>Cancellation policies vary by service provider</li>
                <li>You must be at least 18 years old to make a booking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>3. User Responsibilities</h2>
              <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>You agree to:</p>
              <ul className={`list-disc pl-6 mb-4 space-y-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all local laws and regulations</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Intellectual Property</h2>
              <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                All content on Discover Cyclades, including text, images, logos, and software,
                is protected by copyright and other intellectual property rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>5. Limitation of Liability</h2>
              <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                Discover Cyclades is not liable for any direct, indirect, incidental, or
                consequential damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>6. Changes to Terms</h2>
              <p className={isDark ? 'text-white/70' : 'text-gray-700'}>
                We reserve the right to modify these terms at any time. Continued use of our
                services constitutes acceptance of any changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}