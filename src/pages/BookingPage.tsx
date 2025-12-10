import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, Shield, Clock } from 'lucide-react';
import { BookingSearch, type SearchFormData } from '@/components/booking/BookingSearch';
import SEO from '@/components/SEO';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

const POPULAR_DESTINATIONS = [
  {
    name: 'Santorini',
    countryCode: 'GR',
    image: '/images/islands/santorini.jpg',
    hotels: '245+',
    desc: 'Caldera views & cave hotels'
  },
  {
    name: 'Mykonos',
    countryCode: 'GR',
    image: '/images/islands/mykonos.jpg',
    hotels: '187+',
    desc: 'Luxury resorts & nightlife'
  },
  {
    name: 'Paros',
    countryCode: 'GR',
    image: '/images/islands/paros.jpg',
    hotels: '132+',
    desc: 'Family-friendly beaches'
  },
  {
    name: 'Naxos',
    countryCode: 'GR',
    image: '/images/islands/naxos.jpg',
    hotels: '98+',
    desc: 'Authentic Greek culture'
  },
  {
    name: 'Milos',
    countryCode: 'GR',
    image: '/images/islands/milos.jpg',
    hotels: '76+',
    desc: 'Volcanic landscapes'
  },
  {
    name: 'Ios',
    countryCode: 'GR',
    image: '/images/islands/ios.jpg',
    hotels: '64+',
    desc: 'Beach clubs & vibes'
  },
];

const VIBE_SUGGESTIONS = [
  { vibe: 'Romantic sunset views with infinity pool in Santorini', icon: '💕', color: 'from-pink-500 to-rose-500' },
  { vibe: 'Family-friendly beach resort with kids activities', icon: '👨‍👩‍👧‍👦', color: 'from-blue-500 to-cyan-500' },
  { vibe: 'Luxury cave hotel carved into Santorini cliffs', icon: '✨', color: 'from-amber-500 to-orange-500' },
  { vibe: 'Budget-friendly hotel near beautiful beach', icon: '💰', color: 'from-green-500 to-emerald-500' },
  { vibe: 'Boutique hotel in traditional Cycladic village', icon: '🏛️', color: 'from-indigo-500 to-purple-500' },
  { vibe: 'Beachfront hotel with water sports activities', icon: '🏄', color: 'from-cyan-500 to-teal-500' },
];

export default function BookingPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  function handleSearch(formData: SearchFormData) {
    // Build query parameters
    const params = new URLSearchParams();
    params.set('checkin', formData.checkin);
    params.set('checkout', formData.checkout);
    params.set('occupancies', JSON.stringify(formData.occupancies));
    params.set('currency', formData.currency);
    params.set('guestNationality', formData.guestNationality);
    params.set('searchMode', formData.searchMode);

    if (formData.searchMode === 'destination' && formData.cityName && formData.countryCode) {
      params.set('cityName', formData.cityName);
      params.set('countryCode', formData.countryCode);
    } else if (formData.searchMode === 'vibe' && formData.aiSearch) {
      params.set('aiSearch', formData.aiSearch);
    }

    // Add advanced filter parameters
    if (formData.starRating && formData.starRating.length > 0) {
      params.set('starRating', JSON.stringify(formData.starRating));
    }
    if (formData.boardType) {
      params.set('boardType', formData.boardType);
    }
    if (formData.refundableRatesOnly) {
      params.set('refundableRatesOnly', 'true');
    }
    if (formData.minRating !== undefined) {
      params.set('minRating', formData.minRating.toString());
    }
    if (formData.sort && formData.sort.length > 0) {
      params.set('sort', JSON.stringify(formData.sort));
    }

    navigate(`/book/search?${params.toString()}`);
  }

  function quickSearch(cityName: string, countryCode: string) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const params = new URLSearchParams();
    params.set('checkin', tomorrow.toISOString().split('T')[0]);
    params.set('checkout', dayAfter.toISOString().split('T')[0]);
    params.set('occupancies', JSON.stringify([{ adults: 2 }]));
    params.set('currency', 'EUR');
    params.set('guestNationality', 'GR');
    params.set('searchMode', 'destination');
    params.set('cityName', cityName);
    params.set('countryCode', countryCode);

    navigate(`/book/search?${params.toString()}`);
  }

  function vibeSearch(vibe: string) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const params = new URLSearchParams();
    params.set('checkin', tomorrow.toISOString().split('T')[0]);
    params.set('checkout', dayAfter.toISOString().split('T')[0]);
    params.set('occupancies', JSON.stringify([{ adults: 2 }]));
    params.set('currency', 'EUR');
    params.set('guestNationality', 'GR');
    params.set('searchMode', 'vibe');
    params.set('aiSearch', vibe);

    navigate(`/book/search?${params.toString()}`);
  }

  return (
    <>
      <SEO
        title="Book Hotels in the Cyclades | Best Rates Guaranteed"
        description="Book your perfect Cyclades hotel with instant confirmation. Search by island or vibe. Best rates, no booking fees. Santorini, Mykonos, Paros & more."
        canonicalUrl="https://greececyclades.com/book"
      />

      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyclades-turquoise via-cyan-600 to-blue-700" />
          <div className="absolute inset-0 bg-[url('/images/islands/santorini.jpg')] bg-cover bg-center opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-4 md:mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Powered by LiteAPI</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                Find Your Perfect <span className="text-yellow-300">Cyclades</span> Hotel
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
                Search by destination or describe your ideal stay. Compare prices across all major booking sites.
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 rounded-lg">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <span>800+ Hotels</span>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 rounded-lg">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 rounded-lg">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-20">
          <div className={`rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white'}`}>
            <BookingSearch onSearch={handleSearch} />
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Popular Cyclades Islands
            </h2>
            <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Click to search hotels on your favorite island
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_DESTINATIONS.map((dest) => (
              <div
                key={`${dest.countryCode}-${dest.name}`}
                className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-dark-card border border-dark-border hover:border-cyclades-turquoise/50' : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                onClick={() => quickSearch(dest.name, dest.countryCode)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Hotels in ${dest.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                    <p className="text-white/80 text-xs">{dest.hotels} hotels</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe Search */}
        <div className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyclades-turquoise/10 rounded-full text-cyclades-turquoise text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Search by Vibe
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Describe your ideal hotel and let AI find the perfect match
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIBE_SUGGESTIONS.map((item) => (
                <button
                  key={item.vibe}
                  onClick={() => vibeSearch(item.vibe)}
                  className={`group p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border ${isDark
                    ? 'bg-white/5 border-white/10 hover:border-cyclades-turquoise/50 hover:bg-cyclades-turquoise/10'
                    : 'bg-gray-50 border-gray-200 hover:border-cyclades-turquoise hover:bg-cyclades-turquoise/5'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20`}>
                      {item.icon}
                    </span>
                    <span className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {item.vibe}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Best Price Guarantee', desc: 'Find it lower? We match +10%', color: 'text-green-500' },
              { icon: Clock, title: 'Instant Confirmation', desc: 'Book now, receive confirmation immediately', color: 'text-blue-500' },
              { icon: Sparkles, title: 'AI-Powered Search', desc: 'Find hotels that match your style', color: 'text-purple-500' },
            ].map((feature, idx) => (
              <div key={idx} className={`text-center p-8 rounded-2xl transition-colors ${isDark ? 'bg-dark-card' : 'bg-white shadow-lg'}`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={isDark ? 'text-white/60' : 'text-gray-600'}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
