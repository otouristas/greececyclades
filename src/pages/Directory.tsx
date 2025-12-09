import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, Wine, Music, Coffee, Car, Anchor, 
  ShoppingBag, Sparkles, Star, MapPin, Phone, 
  Globe, ExternalLink, ChevronRight, Search,
  Waves, Camera, Filter, X, GlassWater
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import { cyclades } from '../data/islandsData';

interface Business {
  id: string;
  business_name: string;
  slug: string;
  business_type: string;
  island: string;
  location: string;
  short_description: string;
  description: string;
  cover_image_url: string;
  logo_url: string;
  price_range: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  is_verified: boolean;
  website: string;
  phone: string;
  booking_url: string;
  instagram_url: string;
  google_maps_url: string;
}

const BUSINESS_CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils },
  { id: 'bar', label: 'Bars', icon: Wine },
  { id: 'cafe', label: 'Cafés', icon: Coffee },
  { id: 'nightclub', label: 'Nightlife', icon: Music },
  { id: 'beach_club', label: 'Beach Clubs', icon: Waves },
  { id: 'winery', label: 'Wineries', icon: GlassWater },
  { id: 'rental', label: 'Car Rental', icon: Car },
  { id: 'yacht', label: 'Yacht & Boats', icon: Anchor },
  { id: 'tour', label: 'Tours', icon: Camera },
  { id: 'shop', label: 'Shopping', icon: ShoppingBag },
];

const ISLANDS = [
  { id: 'all', name: 'All Islands' },
  ...cyclades.map(island => ({ id: island.slug || island.name?.toLowerCase() || '', name: island.name || '' }))
];

export default function Directory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get filters from URL
  const selectedCategory = searchParams.get('type') || 'all';
  const selectedIsland = searchParams.get('island') || 'all';

  useEffect(() => {
    fetchBusinesses();
  }, [selectedCategory, selectedIsland]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('business_accounts')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false, nullsFirst: false })
        .limit(50);

      if (selectedCategory !== 'all') {
        query = query.eq('business_type', selectedCategory);
      }
      
      if (selectedIsland !== 'all') {
        query = query.eq('island', selectedIsland.toLowerCase());
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const getPriceLabel = (range: string) => {
    switch (range) {
      case 'budget': return '€';
      case 'mid-range': return '€€';
      case 'luxury': return '€€€';
      case 'ultra-luxury': return '€€€€';
      default: return '€€';
    }
  };

  const getCategoryIcon = (type: string) => {
    const cat = BUSINESS_CATEGORIES.find(c => c.id === type);
    return cat?.icon || Sparkles;
  };

  const getCategoryLabel = (type: string) => {
    const cat = BUSINESS_CATEGORIES.find(c => c.id === type);
    return cat?.label || 'Business';
  };

  const filteredBusinesses = businesses.filter(b => 
    searchQuery === '' || 
    b.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO
        title="Business Directory | Restaurants, Bars & Services in Cyclades"
        description="Find the best restaurants, bars, cafés, tours, and services across the Cyclades islands. Local business directory for Santorini, Mykonos, Paros, Naxos & more."
      />

      <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <section className={`pt-24 pb-12 ${isDark ? 'bg-gradient-to-b from-dark-card to-dark-bg' : 'bg-gradient-to-b from-cyclades-turquoise/10 to-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cyclades Business Directory
              </h1>
              <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Discover the best restaurants, bars, tours, and local services across the Greek islands
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className={`relative rounded-2xl overflow-hidden shadow-lg ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 text-lg outline-none ${
                    isDark ? 'bg-transparent text-white placeholder:text-white/50' : 'bg-white text-gray-900'
                  }`}
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {BUSINESS_CATEGORIES.slice(0, 7).map(cat => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter('type', cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyclades-turquoise text-white shadow-lg'
                        : isDark
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isDark ? 'bg-white/10 text-white/70 hover:bg-white/20' : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Island Filter */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-white/5' : 'bg-white shadow'}`}>
                    <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                      Filter by Island
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {ISLANDS.slice(0, 12).map(island => {
                        const isActive = selectedIsland === island.id;
                        return (
                          <button
                            key={island.id}
                            onClick={() => updateFilter('island', island.id)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                              isActive
                                ? 'bg-cyclades-turquoise text-white'
                                : isDark
                                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {island.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                {loading ? 'Loading...' : `${filteredBusinesses.length} businesses found`}
              </p>
              {(selectedCategory !== 'all' || selectedIsland !== 'all') && (
                <button
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className={`flex items-center gap-1 text-sm ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'} hover:underline`}
                >
                  <X className="w-4 h-4" /> Clear filters
                </button>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className={`h-80 rounded-2xl animate-pulse ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                ))}
              </div>
            )}

            {/* Results Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business, index) => {
                  const CategoryIcon = getCategoryIcon(business.business_type);
                  return (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-xl ${
                        isDark 
                          ? 'bg-white/5 border-white/10 hover:border-cyclades-turquoise/50' 
                          : 'bg-white border-gray-100 hover:border-cyclades-turquoise'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={business.cover_image_url || '/images/placeholder-business.jpg'}
                          alt={business.business_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {business.is_featured && (
                            <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" /> Featured
                            </span>
                          )}
                          {business.is_verified && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <div className="absolute top-3 right-3">
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            isDark ? 'bg-white/20 text-white' : 'bg-white/90 text-gray-700'
                          }`}>
                            <CategoryIcon className="w-3 h-3" />
                            {getCategoryLabel(business.business_type)}
                          </span>
                        </div>

                        {/* Rating */}
                        {business.rating && (
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/95 rounded-full shadow">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-gray-900">{business.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-bold text-lg line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {business.business_name}
                          </h3>
                          {business.price_range && (
                            <span className={`text-sm font-bold flex-shrink-0 ml-2 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`}>
                              {getPriceLabel(business.price_range)}
                            </span>
                          )}
                        </div>

                        {business.location && (
                          <p className={`flex items-center gap-1 text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="line-clamp-1">{business.location}, {business.island}</span>
                          </p>
                        )}

                        <p className={`text-sm line-clamp-2 mb-4 min-h-[2.5rem] ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                          {business.short_description || business.description}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {business.google_maps_url && (
                            <a
                              href={business.google_maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              title="Directions"
                            >
                              <MapPin className="w-4 h-4" />
                            </a>
                          )}
                          {business.phone && (
                            <a
                              href={`tel:${business.phone}`}
                              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                          {business.website && (
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Globe className="w-4 h-4" />
                              Website
                            </a>
                          )}
                          {business.booking_url && (
                            <a
                              href={business.booking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1 py-2 bg-cyclades-turquoise text-white rounded-lg text-sm font-medium hover:bg-cyclades-turquoise/90 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Book
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredBusinesses.length === 0 && (
              <div className="text-center py-16">
                <Sparkles className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/30' : 'text-gray-300'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No businesses found
                </h3>
                <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-cyclades-turquoise text-white rounded-xl font-medium hover:bg-cyclades-turquoise/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* CTA Section */}
            <div className={`mt-16 p-8 rounded-3xl text-center ${isDark ? 'bg-gradient-to-r from-cyclades-turquoise/20 to-cyclades-sea-blue/20 border border-cyclades-turquoise/30' : 'bg-gradient-to-r from-cyclades-turquoise/10 to-cyclades-sea-blue/10'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Own a Business in the Cyclades?
              </h2>
              <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Get your restaurant, hotel, tour, or service listed in our directory and reach thousands of travelers every month.
              </p>
              <Link
                to="/list-property"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                List Your Business
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
