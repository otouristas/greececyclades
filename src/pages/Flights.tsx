import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, Ticket, Briefcase, Search, MapPin, Clock, DollarSign, ArrowLeftRight, ChevronRight, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';

const BOOKING_ENGINE_URL = 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2026-05-28&flighttype=D&quantity=1&rdate=2026-06-01&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305';

export default function Flights() {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchContainerRef.current && !document.getElementById('tp-widget-script')) {
      searchContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'tp-widget-script';
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&curr=EUR&default_origin=Athens&default_destination=Mikonos&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121';
      script.async = true;
      script.charset = 'utf-8';
      searchContainerRef.current.appendChild(script);
    }

    return () => {
      const script = document.getElementById('tp-widget-script');
      if (script?.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const cheapestFlights = [
    { departure: 'Athens (ATH)', destination: 'Mykonos (JMK)', airline: 'Aegean/Sky Express', duration: '45m', price: '€50', bookingUrl: BOOKING_ENGINE_URL },
    { departure: 'London (LHR)', destination: 'Mykonos (JMK)', airline: 'British Airways', duration: '4h 5m', price: '€180', bookingUrl: BOOKING_ENGINE_URL },
    { departure: 'Paris (CDG)', destination: 'Mykonos (JMK)', airline: 'Air France', duration: '3h 40m', price: '€160', bookingUrl: BOOKING_ENGINE_URL },
    { departure: 'Frankfurt (FRA)', destination: 'Santorini (JTR)', airline: 'Lufthansa', duration: '3h 30m', price: '€195', bookingUrl: BOOKING_ENGINE_URL },
    { departure: 'New York (JFK)', destination: 'Santorini (JTR)', airline: 'American Airlines', duration: '11h+', price: '$507', bookingUrl: BOOKING_ENGINE_URL },
  ];

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
        title="Flights to Cyclades 2025: Athens to Santorini & Mykonos Deals"
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
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-32 pb-24">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="/images/flights_hero.webp" alt="Aerial view of Greek islands" className="w-full h-full object-cover" loading="eager" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Flights</span>
            </nav>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Fly to the <span className="text-yellow-300">Cyclades</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Find cheap flights to Santorini, Mykonos, Paros, Naxos and more. Compare airlines and book with confidence.
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
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden p-6">
              <div ref={searchContainerRef} id="flights-search-container" className="min-h-[350px] flex justify-center items-center">
                <div className="text-center text-gray-700 dark:text-white/60">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600 mb-2"></div>
                  <p>Loading flight search...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Book With Us */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Book Flights With Us</h2>
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

        {/* Cheapest Flights Table */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Popular Flight Routes</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">Compare prices on the most popular routes to the Cyclades islands</p>

            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">From</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">To</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Airline</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">From</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {cheapestFlights.map((flight, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{flight.departure}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{flight.destination}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-white/70">{flight.airline}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-white/70">{flight.duration}</td>
                        <td className="px-6 py-4 text-lg font-bold text-cyan-600 dark:text-cyclades-turquoise">{flight.price}</td>
                        <td className="px-6 py-4">
                          <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyclades-turquoise hover:underline font-medium">
                            Book <ArrowRight className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-white/60 mt-4 text-center italic">Prices are estimates and may vary. Book early for best deals!</p>
          </div>
        </div>

        {/* Cyclades Airports */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Cyclades Island Airports</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">Most islands have their own airports with connections from Athens</p>

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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Flight Booking Tips</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for Your Cyclades Adventure?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              The magic of the Greek Islands awaits. Book your flight and start your dream vacation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={BOOKING_ENGINE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                <Plane className="mr-2 h-5 w-5" />
                Search Flights
              </a>
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
