import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ship, MapPin, Clock, Calendar, Shield, CheckCircle, Star, ArrowRight, Anchor, Zap, ChevronDown, Search, Wind, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import {
  generateFerrySearchLink,
  POPULAR_CYCLADES_ROUTES,
  getCycladesPorts,
  getMainlandPorts,
  getPortByCode,
  FERRY_COMPANIES,
} from '../data/ferryhopperPorts';

export default function FerryTickets() {
  const { t } = useTranslation();
  const [fromPort, setFromPort] = useState<string>('PIR');
  const [toPort, setToPort] = useState<string>('JTR');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(2);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const cycladesIslands = getCycladesPorts();
  const mainlandPorts = getMainlandPorts();
  const allPorts = [...mainlandPorts, ...cycladesIslands];

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartureDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleSearch = () => {
    const formattedDate = departureDate.replace(/-/g, '');
    const url = generateFerrySearchLink({
      fromPort,
      toPort,
      date: formattedDate,
      passengers,
    });
    window.open(url, '_blank');
  };

  const handleRouteClick = (from: string, to: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0].replace(/-/g, '');
    const url = generateFerrySearchLink({
      fromPort: from,
      toPort: to,
      date: formattedDate,
      passengers: 2,
    });
    window.open(url, '_blank');
  };

  const getPortName = (code: string): string => {
    const port = getPortByCode(code);
    return port?.displayName || code;
  };

  const popularRoutes = POPULAR_CYCLADES_ROUTES.slice(0, 6);

  const faqs = [
    { q: 'How early should I book?', a: 'For summer (July-August), book 2-4 weeks ahead. Shoulder seasons are more flexible.' },
    { q: 'Can I take a car on the ferry?', a: 'Yes, most conventional ferries accept vehicles. Book early as car spots fill quickly.' },
    { q: 'What if my ferry is cancelled?', a: 'Weather cancellations get full refunds or free rebooking on the next departure.' },
    { q: 'High-speed vs conventional?', a: 'High-speed is faster but pricier. Conventional offers more deck space and is cheaper.' },
    { q: 'How do I check in for my ferry?', a: 'Most ferries accept e-tickets on your phone. Arrive 30-60 minutes before departure.' },
  ];

  const features = [
    { icon: Shield, title: 'Free Cancellation', desc: '24h before departure' },
    { icon: Zap, title: 'Instant Confirmation', desc: 'E-tickets to your email' },
    { icon: Star, title: 'Best Prices', desc: 'Compare all operators' },
    { icon: Wind, title: 'Weather Alerts', desc: 'Real-time disruption info' },
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
        {/* Hero Section with Search Form */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800 text-white pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="absolute inset-0 bg-[url('/images/ferry-tickets.webp')] bg-cover bg-center opacity-15" />

          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="fill-gray-50 dark:fill-dark-bg">
              <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"></path>
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Ship className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">Powered by Ferryhopper</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                {t('ferryTickets.hero.titlePart1', 'Ferry Tickets to the ')}
                <span className="text-yellow-300">{t('ferryTickets.hero.titleHighlight', 'Cyclades')}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                {t('ferryTickets.hero.subtitle', 'Compare prices and book ferry tickets to Santorini, Mykonos, Naxos, Paros and all Greek islands')}
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <f.icon className="h-4 w-4 md:h-5 md:w-5 text-yellow-300" />
                    <span className="text-white text-xs md:text-sm font-medium">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="grid md:grid-cols-5 gap-4">
                  {/* From Port */}
                  <div className="md:col-span-1 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">From</label>
                    <button
                      onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                    >
                      <span>{getPortName(fromPort)}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showFromDropdown && (
                      <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-white/10 max-h-60 overflow-y-auto">
                        <div className="p-2 border-b border-gray-100 dark:border-white/10">
                          <span className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase">Mainland</span>
                        </div>
                        {mainlandPorts.map(port => (
                          <button
                            key={port.code}
                            onClick={() => { setFromPort(port.code); setShowFromDropdown(false); }}
                            className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-white/10"
                          >
                            {port.displayName}
                          </button>
                        ))}
                        <div className="p-2 border-t border-b border-gray-100 dark:border-white/10">
                          <span className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase">Cyclades</span>
                        </div>
                        {cycladesIslands.filter(p => p.popular).map(port => (
                          <button
                            key={port.code}
                            onClick={() => { setFromPort(port.code); setShowFromDropdown(false); }}
                            className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-white/10"
                          >
                            {port.displayName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* To Port */}
                  <div className="md:col-span-1 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">To</label>
                    <button
                      onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                    >
                      <span>{getPortName(toPort)}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showToDropdown && (
                      <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-white/10 max-h-60 overflow-y-auto">
                        {cycladesIslands.filter(p => p.popular).map(port => (
                          <button
                            key={port.code}
                            onClick={() => { setToPort(port.code); setShowToDropdown(false); }}
                            className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-cyan-50 dark:hover:bg-white/10"
                          >
                            {port.displayName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">Date</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>

                  {/* Passengers */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">Passengers</label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n} className="text-gray-900">{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-1 flex items-end">
                    <button
                      onClick={handleSearch}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      <Search className="w-5 h-5" />
                      <span>Search</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No booking fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant e-tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>All ferry operators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">{t('ferryTickets.routes.title', 'Popular Routes')}</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">{t('ferryTickets.routes.subtitle', 'Most popular ferry connections in the Cyclades. Click to search!')}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRoutes.map((route, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRouteClick(route.from, route.to)}
                  className="group bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-500 transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Ship className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">{getPortName(route.from)}</span>
                        <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="font-bold text-gray-900 dark:text-white">{getPortName(route.to)}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-white/50 mt-1">{route.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
                      <Clock className="w-4 h-4" />
                      <span>{route.duration}</span>
                    </div>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      Search tickets <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ferry Companies */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">{t('ferryTickets.companies.title', 'Ferry Companies')}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FERRY_COMPANIES.slice(0, 8).map((company, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-50 dark:bg-white/10 rounded-xl p-2">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{company.name}</h3>
                  <div className="flex justify-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${company.type === 'high-speed'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      : company.type === 'conventional'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      }`}>
                      {company.type === 'high-speed' ? 'High-Speed' : company.type === 'conventional' ? 'Conventional' : 'Both Types'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <Anchor className="w-8 h-8 text-yellow-300" />
                  Island Hopping Tips
                </h2>
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
        <div className="py-20 bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('ferryTickets.cta.title', 'Ready to Explore the Islands?')}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t('ferryTickets.cta.subtitle', 'Book your ferry tickets and start your island hopping adventure')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg">
                <Ship className="mr-2 h-5 w-5" />
                Search Ferries
              </button>
              <Link to="/touristas-ai/chat" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Ask Touristas AI
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
                  <div className="w-10 h-10 bg-cyan-600/10 dark:bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{item.title}</h3>
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

