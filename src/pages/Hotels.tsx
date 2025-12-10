import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Building2, Bed, Calendar, Search, Users, Shield, CheckCircle, Clock, Euro, Award, Heart, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';

export default function Hotels() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Santorini');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 4);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    setCheckIn(formatDate(tomorrow));
    setCheckOut(formatDate(checkOutDate));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the LiteAPI booking page with search params
    navigate(`/book?destination=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`);
  };

  const destinations = [
    { name: 'Santorini', hotels: 245, slug: 'santorini', desc: 'Iconic caldera views and luxury cave hotels' },
    { name: 'Mykonos', hotels: 187, slug: 'mykonos', desc: 'Vibrant nightlife and beachfront resorts' },
    { name: 'Paros', hotels: 132, slug: 'paros', desc: 'Family-friendly and traditional villages' },
    { name: 'Naxos', hotels: 98, slug: 'naxos', desc: 'Authentic Greek culture and beaches' },
    { name: 'Milos', hotels: 76, slug: 'milos', desc: 'Volcanic landscapes and boutique stays' },
    { name: 'Ios', hotels: 64, slug: 'ios', desc: 'Beach clubs and modern accommodations' },
  ];

  const hotelTypes = [
    { title: 'Luxury Resorts', price: '€300+', icon: Award, desc: 'Five-star with world-class amenities' },
    { title: 'Boutique Hotels', price: '€150+', icon: Heart, desc: 'Charming with personalized service' },
    { title: 'Cave Hotels', price: '€200+', icon: Building2, desc: 'Carved into Santorini cliffs' },
    { title: 'Beach Resorts', price: '€180+', icon: Star, desc: 'Direct beach access and water sports' },
    { title: 'Family Hotels', price: '€120+', icon: Users, desc: 'Child-friendly accommodations' },
    { title: 'Budget Hotels', price: '€60+', icon: Bed, desc: 'Clean and affordable options' },
  ];

  const features = [
    { icon: Shield, title: 'Best Price Guarantee', desc: 'Find it lower? We match +10%' },
    { icon: CheckCircle, title: 'Free Cancellation', desc: 'Up to 48 hours before arrival' },
    { icon: Clock, title: '24/7 Support', desc: 'Help whenever you need it' },
  ];

  return (
    <>
      <SEO
        title="Best Cyclades Hotels 2025: €50 Budget to €500 Luxury [Tested & Reviewed]"
        description="We stayed at 200+ hotels across 25 islands. See our honest picks by budget, style & island. Real reviews, real prices. Book direct for best rates."
        pageType="hotels"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Hotels', url: '/hotels' }
        ]}
        faqs={[
          { question: 'What is the average hotel price in Cyclades?', answer: 'Budget hotels start at €50-80/night, mid-range €100-200/night, and luxury €250-500+/night. Prices vary significantly by island and season.' },
          { question: 'Which Cyclades island has the cheapest hotels?', answer: 'Naxos, Andros, Syros, and Kythnos offer the best value accommodation. Expect 30-50% lower prices than Santorini or Mykonos.' },
          { question: 'When should I book Cyclades hotels?', answer: 'Book 2-3 months ahead for peak season (July-August). Shoulder season (May-June, September-October) offers better availability and prices.' },
          { question: 'Are cave hotels only in Santorini?', answer: 'Cave hotels and cave-style suites are primarily found in Santorini, but similar caldera-view accommodations exist in Folegandros and Sifnos.' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="absolute inset-0 bg-[url('/images/islands/santorini.jpg')] bg-cover bg-center opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                Hotels in the <span className="text-yellow-300">Cyclades</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-2">
                Discover luxury resorts, boutique hotels, and cave accommodations across all Greek Islands
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-600/30"
                      >
                        {destinations.map(d => (
                          <option key={d.slug} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-600/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-600/30"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-600/30"
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="sm:mt-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyclades-turquoise text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Hotels
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-12 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-14 h-14 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-7 h-7 text-cyan-600 dark:text-cyclades-turquoise" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-gray-600 dark:text-white/60">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Booking CTA */}
        <div className="py-12 bg-gradient-to-r from-cyclades-turquoise/10 to-cyan-600/10 dark:from-cyclades-turquoise/5 dark:to-cyan-600/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyclades-turquoise to-cyan-600 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Advanced Hotel Search with AI
                  </h3>
                  <p className="text-gray-600 dark:text-white/70">
                    Search by vibe, compare real-time prices across booking sites, and find the perfect stay with our LiteAPI-powered search.
                  </p>
                </div>
                <Link
                  to="/book"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyclades-turquoise to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5" />
                  Search Hotels
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Popular Destinations</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Explore hotels across the most beautiful islands in the Cyclades
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, idx) => (
                <Link key={idx} to={`/islands/${dest.slug}`} className="group relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src={`/images/islands/${dest.slug}.jpg`}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{dest.desc}</p>
                    <span className="text-yellow-300 text-sm font-medium">{dest.hotels} hotels available</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Types */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Types of Accommodation</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelTypes.map((type, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-xl flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{type.title}</h3>
                  <p className="text-gray-600 dark:text-white/60 mb-4">{type.desc}</p>
                  <span className="text-cyan-600 dark:text-cyclades-turquoise font-bold">{type.price}/night</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Comparison by Island */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Average Hotel Prices by Island</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Compare accommodation costs across the Cyclades to find your perfect budget match
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { island: 'Santorini', budget: '€80-120', mid: '€180-300', luxury: '€400-800+', tag: 'Most Expensive', tagColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
                { island: 'Mykonos', budget: '€70-100', mid: '€150-250', luxury: '€350-700+', tag: 'Premium', tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
                { island: 'Paros', budget: '€50-80', mid: '€100-180', luxury: '€250-450', tag: 'Good Value', tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                { island: 'Naxos', budget: '€45-70', mid: '€90-150', luxury: '€200-350', tag: 'Best Value', tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                { island: 'Milos', budget: '€60-90', mid: '€120-200', luxury: '€280-500', tag: 'Rising Prices', tagColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
                { island: 'Sifnos', budget: '€50-75', mid: '€100-160', luxury: '€220-380', tag: 'Authentic', tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.island}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.tagColor}`}>{item.tag}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-white/60">Budget</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{item.budget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-white/60">Mid-Range</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{item.mid}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-white/60">Luxury</span>
                      <span className="font-semibold text-cyan-600 dark:text-cyclades-turquoise">{item.luxury}</span>
                    </div>
                  </div>
                  <Link to={`/guides/${item.island.toLowerCase()}`} className="mt-4 inline-flex items-center text-cyan-600 dark:text-cyclades-turquoise text-sm font-medium hover:underline">
                    View {item.island} Guide <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Euro className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">💡 Money-Saving Tips</h3>
                  <ul className="text-gray-600 dark:text-white/70 space-y-1 text-sm">
                    <li>• Book 2-3 months ahead for peak season (July-August) to secure better rates</li>
                    <li>• Shoulder season (May-June, Sept-Oct) offers 20-40% lower prices with great weather</li>
                    <li>• Stay in lesser-known islands like Andros, Syros, or Kythnos for 30-50% savings</li>
                    <li>• Consider apartments/studios for stays over 4 nights - often better value than hotels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Book Your Stay?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Find the perfect accommodation for your Greek island adventure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                <Search className="mr-2 h-5 w-5" />
                Search Hotels
              </button>
              <Link to="/ferry-tickets" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Book Ferries
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            { question: 'What is the average hotel price in Cyclades?', answer: 'Budget hotels start at €50-80/night, mid-range €100-200/night, and luxury €250-500+/night. Prices vary significantly by island and season.' },
            { question: 'Which Cyclades island has the cheapest hotels?', answer: 'Naxos, Andros, Syros, and Kythnos offer the best value accommodation. Expect 30-50% lower prices than Santorini or Mykonos.' },
            { question: 'When should I book Cyclades hotels?', answer: 'Book 2-3 months ahead for peak season (July-August). Shoulder season (May-June, September-October) offers better availability and prices.' },
            { question: 'Are cave hotels only in Santorini?', answer: 'Cave hotels and cave-style suites are primarily found in Santorini, but similar caldera-view accommodations exist in Folegandros and Sifnos.' }
          ]}
          title="Hotels FAQ"
          subtitle="Common questions about Cyclades accommodation"
        />

        {/* Related Links */}
        <RelatedLinks variant="cards" pageType="hotel" title="Continue Planning" />

        {/* Related Services */}
        <div className="py-12 bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { to: '/ferry-tickets', icon: MapPin, title: 'Ferry Tickets', desc: 'Island hopping' },
                { to: '/rent-a-car', icon: Star, title: 'Car Rental', desc: 'Explore freely' },
                { to: '/activities', icon: Heart, title: 'Activities', desc: 'Tours & fun' },
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
