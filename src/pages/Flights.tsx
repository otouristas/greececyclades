import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane, Calendar, Ticket, Briefcase, Clock, DollarSign, ArrowLeftRight, ArrowRight, Star, Shield, Zap, MapPin, Search } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import { FlightSearchForm, FlightResultsList } from '../components/flights';
import {
  FlightSearchParams,
  OnewayFlight,
  RoundtripFlight,
  searchOnewayFlights,
  searchRoundtripFlights
} from '../services/flightApiService';

export default function Flights() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | undefined>();
  const [flights, setFlights] = useState<(OnewayFlight | RoundtripFlight)[]>([]);
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<{ from: string; to: string } | undefined>();

  const handleSearch = async (params: FlightSearchParams, tripType: 'oneway' | 'roundtrip') => {
    setIsLoading(true);
    setSearchError(undefined);
    setFlights([]);
    setHasSearched(true);
    setIsRoundtrip(tripType === 'roundtrip');
    setSearchParams({ from: params.departureAirport, to: params.arrivalAirport });

    try {
      if (tripType === 'roundtrip') {
        const response = await searchRoundtripFlights(params);
        if (response.success) {
          setFlights(response.flights);
        } else {
          setSearchError(response.error || 'Failed to search flights');
        }
      } else {
        const response = await searchOnewayFlights(params);
        if (response.success) {
          setFlights(response.flights);
        } else {
          setSearchError(response.error || 'Failed to search flights');
        }
      }
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const airports = [
    { name: 'Santorini (JTR)', description: 'International flights in summer, daily Athens connections', location: 'Near Kamari', slug: 'santorini' },
    { name: 'Mykonos (JMK)', description: 'Major summer hub with European direct flights', location: '4km from Chora', slug: 'mykonos' },
    { name: 'Paros (PAS)', description: 'Modern domestic airport, Athens & Thessaloniki flights', location: 'Near Aliki', slug: 'paros' },
    { name: 'Naxos (JNX)', description: 'Small domestic airport with daily Athens flights', location: 'Near Chora', slug: 'naxos' },
    { name: 'Milos (MLO)', description: 'Daily Athens flights to volcanic island', location: 'Near Milos Town', slug: 'milos' },
  ];

  return (
    <>
      <SEO
        title="Flights to Cyclades 2026: Athens to Santorini & Mykonos Deals"
        description="Find cheap flights to Greek islands: Santorini, Mykonos airports. Compare airlines, best booking times. Ferry vs flight comparison & tips."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Flights', url: '/flights' }
        ]}
        faqs={[
          { question: 'Which Cyclades islands have airports?', answer: 'Only Santorini (JTR) and Mykonos (JMK) have commercial airports. All other islands are reached by ferry from Athens or these airports.' },
          { question: 'Is it better to fly or ferry to Cyclades?', answer: 'Flying saves time (45 min vs 5+ hours) but costs more. Ferries offer scenic views and reach more islands. Many travelers fly to Santorini/Mykonos, then ferry to other islands.' },
          { question: 'How much do flights to Santorini cost?', answer: 'Athens-Santorini: €50-150 depending on season. Direct international flights (summer only) from major European cities: €100-300.' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="/images/flights_hero.webp" alt="Aerial view of Greek islands" className="w-full h-full object-cover" loading="eager" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                {t('flights.hero.titlePart1', 'Fly to the ')} <span className="text-yellow-300">{t('flights.hero.titleHighlight', 'Cyclades')}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
                {t('flights.hero.subtitle', 'Find cheap flights to Santorini, Mykonos, Paros, Naxos and more. Compare airlines and book with confidence.')}
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: Zap, text: 'Real-Time Prices' },
                  { icon: Shield, text: 'Secure Booking' },
                  { icon: Star, text: 'Best Price Guarantee' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <item.icon className="h-5 w-5 text-yellow-300" />
                    <span className="text-white text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Widget */}
            <div className="max-w-5xl mx-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
              <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        {hasSearched && (
          <div className="py-12 bg-gray-100 dark:bg-dark-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FlightResultsList
                flights={flights}
                isLoading={isLoading}
                error={searchError}
                isRoundtrip={isRoundtrip}
                searchParams={searchParams}
              />
            </div>
          </div>
        )}

        {/* Why Book With Us - Only show before search */}
        {!hasSearched && (
          <div className="py-20 bg-white dark:bg-dark-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">{t('flights.whyBook.title', 'Why Book Flights With Us')}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Ticket, title: 'Best Price Guarantee', desc: 'We scan hundreds of airlines to find you the lowest prices.' },
                  { icon: Calendar, title: 'Flexible Booking', desc: 'Plans change - enjoy flexible cancellation and rebooking options.' },
                  { icon: Briefcase, title: 'Complete Packages', desc: 'Bundle flights with ferries and hotels to save up to 30%.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cyclades Airports */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">{t('flights.airports.title', 'Cyclades Island Airports')}</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">{t('flights.airports.subtitle', 'Most islands have their own airports with connections from Athens')}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airports.map((airport, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100 dark:border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-xl flex items-center justify-center shrink-0">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{airport.name}</h3>
                      <p className="text-gray-600 dark:text-white/60 text-sm mb-2">{airport.description}</p>
                      <p className="text-gray-600 dark:text-white/50 text-xs mb-3">{airport.location}</p>
                      <Link to={`/islands/${airport.slug}`} className="text-cyan-600 dark:text-cyclades-turquoise text-sm font-medium hover:underline inline-flex items-center gap-1">
                        Explore {airport.slug.charAt(0).toUpperCase() + airport.slug.slice(1)} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">{t('flights.tips.title', 'Flight Booking Tips')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Calendar, title: 'Book Early for Summer', desc: 'For June-August, book 2-4 months in advance.' },
                { icon: ArrowLeftRight, title: 'Be Flexible', desc: 'Midweek flights are often cheaper.' },
                { icon: Clock, title: 'Shoulder Season', desc: 'May & September offer great weather, lower prices.' },
                { icon: Search, title: 'Compare Airlines', desc: 'Use our search to find the best deals.' },
                { icon: MapPin, title: 'Consider Nearby Airports', desc: 'Fly to a nearby island + ferry can save money.' },
                { icon: DollarSign, title: 'Bundle & Save', desc: 'Combine flights + hotels for up to 30% off.' },
              ].map((tip, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-100 dark:border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-lg flex items-center justify-center shrink-0">
                      <tip.icon className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-white/60 text-sm">{tip.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            { question: 'Which Cyclades islands have airports?', answer: 'Santorini (JTR), Mykonos (JMK), Paros (PAS), Naxos (JNX), and Milos (MLO) have airports. Only Santorini and Mykonos have international flights.' },
            { question: 'Is it better to fly or ferry to Cyclades?', answer: 'Flying saves time (45 min vs 5+ hours) but costs more. Ferries offer scenic views and reach more islands. Many travelers fly to Santorini/Mykonos, then ferry to other islands.' },
            { question: 'How much do flights to Santorini cost?', answer: 'Athens-Santorini: €50-150 depending on season. Direct international flights (summer only) from major European cities: €100-300.' },
            { question: 'When is the cheapest time to fly to Cyclades?', answer: 'April-May and October offer the best flight deals. Avoid July-August when prices peak. Book 2-3 months ahead for best rates.' }
          ]}
          title="Flights FAQ"
          subtitle="Common questions about flying to the Cyclades"
        />

        {/* Related Links */}
        <RelatedLinks variant="cards" pageType="general" title="Continue Planning" />

        {/* CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('flights.cta.title', 'Ready for Your Cyclades Adventure?')}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t('flights.cta.subtitle', 'The magic of the Greek Islands awaits. Book your flight and start your dream vacation.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                <Plane className="mr-2 h-5 w-5" />
                Search Flights
              </button>
              <Link to="/ferry-tickets" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Ferry Tickets
              </Link>
              <Link to="/hotels" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Find Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
