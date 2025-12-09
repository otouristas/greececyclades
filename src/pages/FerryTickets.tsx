import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ship, MapPin, Clock, Calendar, Shield, CheckCircle, Star, ChevronRight, ArrowRight, Anchor, Users, Zap, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';

export default function FerryTickets() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    if (widgetRef.current && !document.getElementById('fs-widget-script')) {
      const script = document.createElement('script');
      script.id = 'fs-widget-script';
      script.src = 'https://www.ferryscanner.com/widget.js';
      script.async = true;
      widgetRef.current.innerHTML = '<div class="fs-widget" data-partner="greececyclades" data-theme="light"></div>';
      widgetRef.current.appendChild(script);
    }
  }, []);

  const popularRoutes = [
    { from: 'Piraeus', to: 'Santorini', duration: '5-8h', price: '€40-90', frequency: '3-5/day' },
    { from: 'Piraeus', to: 'Mykonos', duration: '3-5h', price: '€35-70', frequency: '4-6/day' },
    { from: 'Santorini', to: 'Mykonos', duration: '2-3h', price: '€50-80', frequency: '2-3/day' },
    { from: 'Rafina', to: 'Naxos', duration: '4-5h', price: '€35-55', frequency: '2-4/day' },
    { from: 'Naxos', to: 'Paros', duration: '30min', price: '€10-15', frequency: '5-8/day' },
    { from: 'Mykonos', to: 'Paros', duration: '45min', price: '€25-40', frequency: '2-4/day' },
  ];

  const ferryCompanies = [
    { name: 'Blue Star Ferries', type: 'Conventional', speed: 'Comfortable' },
    { name: 'SeaJets', type: 'High-Speed', speed: 'Fast' },
    { name: 'Golden Star', type: 'High-Speed', speed: 'Fast' },
    { name: 'Hellenic Seaways', type: 'Both', speed: 'Various' },
  ];

  const faqs = [
    { q: 'How early should I book?', a: 'For summer (July-August), book 2-4 weeks ahead. Shoulder seasons are more flexible.' },
    { q: 'Can I take a car on the ferry?', a: 'Yes, most conventional ferries accept vehicles. Book early as car spots fill quickly.' },
    { q: 'What if my ferry is cancelled?', a: 'Weather cancellations get full refunds or free rebooking on the next departure.' },
    { q: 'High-speed vs conventional?', a: 'High-speed is faster but pricier. Conventional offers more deck space and is cheaper.' },
  ];

  const features = [
    { icon: Shield, title: 'Free Cancellation', desc: '24h before departure' },
    { icon: Zap, title: 'Instant Confirmation', desc: 'E-tickets to your email' },
    { icon: Star, title: 'Best Prices', desc: 'Compare all operators' },
  ];

  return (
    <>
      <SEO
        title="Book Cyclades Ferry Tickets: Compare Prices & Schedules [2025]"
        description="Search all Cyclades ferry routes. Compare prices across Blue Star, SeaJets, Golden Star. Check real-time schedules, book online. Best prices guaranteed."
        pageType="ferry-tickets"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Ferry Tickets', url: '/ferry-tickets' }
        ]}
        faqs={[
          { question: 'How much does a ferry to Cyclades cost?', answer: 'Prices vary by route and ferry type: Athens-Santorini €40-80, Athens-Mykonos €35-65, inter-island ferries €15-45. Fast ferries cost more.' },
          { question: 'How do I book Cyclades ferry tickets?', answer: 'Book online through our platform or ferry company websites. During peak season (July-August), book 2-4 weeks in advance.' },
          { question: 'Can I get refunds on ferry tickets?', answer: 'Most operators offer free changes up to 24-48 hours before departure. Refund policies vary by company and ticket type.' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-32 pb-24">
          <div className="absolute inset-0 bg-[url('/images/ferry-tickets.webp')] bg-cover bg-center opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Ferry Tickets</span>
            </nav>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Ferry Tickets to the <span className="text-yellow-300">Cyclades</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Compare prices and book ferry tickets to Santorini, Mykonos, Naxos, Paros and all Greek islands
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <f.icon className="h-5 w-5 text-yellow-300" />
                    <span className="text-white text-sm font-medium">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ferry Widget */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden p-6">
              <div ref={widgetRef} className="min-h-[300px] flex justify-center items-center">
                <div className="text-center text-gray-700 dark:text-white/60">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600 mb-2"></div>
                  <p>Loading ferry search...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Popular Routes</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">Most popular ferry connections in the Cyclades</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRoutes.map((route, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center">
                      <Ship className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">{route.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-900 dark:text-white">{route.to}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-white/50 block">Duration</span>
                      <span className="font-medium text-gray-900 dark:text-white">{route.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-white/50 block">Price</span>
                      <span className="font-medium text-cyan-600 dark:text-cyclades-turquoise">{route.price}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-white/50 block">Frequency</span>
                      <span className="font-medium text-gray-900 dark:text-white">{route.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ferry Companies */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Ferry Companies</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ferryCompanies.map((company, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Anchor className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{company.name}</h3>
                  <div className="flex justify-center gap-2">
                    <span className="text-xs bg-cyan-600/10 dark:bg-cyclades-turquoise/20 text-cyan-600 dark:text-cyclades-turquoise px-3 py-1 rounded-full">{company.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Island Hopping Tips</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Book high-speed ferries for longer routes',
                  'Conventional ferries are cheaper and have outdoor decks',
                  'Arrive at port 30-60 min before departure',
                  'Check weather forecasts - rough seas may cause delays',
                  'Download e-tickets to your phone offline',
                  'Consider overnight ferries to save on accommodation',
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                    <span className="text-white/90">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-5 pb-5 text-gray-600 dark:text-white/60 border-t border-gray-100 dark:border-white/10 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Explore the Islands?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book your ferry tickets and start your island hopping adventure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                <Ship className="mr-2 h-5 w-5" />
                Search Ferries
              </button>
              <Link to="/hotels" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Book Hotels
              </Link>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="py-12 bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { to: '/hotels', icon: MapPin, title: 'Hotels', desc: 'Best stays' },
                { to: '/rent-a-car', icon: Star, title: 'Car Rental', desc: 'Explore freely' },
                { to: '/activities', icon: Zap, title: 'Activities', desc: 'Tours & fun' },
                { to: '/trip-planner', icon: Calendar, title: 'Trip Planner', desc: 'Plan your trip' },
              ].map((item, idx) => (
                <Link key={idx} to={item.to} className="group flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-600 dark:text-cyclades-turquoise" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">{item.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-white/60">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
