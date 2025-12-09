import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, Wine, Music, Coffee, Car, Anchor, 
  ShoppingBag, Sparkles, Star, MapPin, Phone, 
  Globe, ExternalLink, ChevronRight, Clock,
  Waves, Camera, Ship, Palmtree, GlassWater
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

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
  { id: 'spa', label: 'Spa & Wellness', icon: Palmtree },
];

interface BusinessDirectoryProps {
  island: string;
  limit?: number;
  showCategories?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BusinessDirectory({ 
  island, 
  limit = 12, 
  showCategories = true,
  title = "Local Businesses & Services",
  subtitle,
  className = ''
}: BusinessDirectoryProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, [island, selectedCategory]);

  const fetchBusinesses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('business_accounts')
        .select(`
          id, business_name, slug, business_type, island, location,
          short_description, description, cover_image_url, logo_url, price_range,
          rating, reviews_count, is_featured, is_verified, website, phone, 
          booking_url, instagram_url, google_maps_url
        `)
        .eq('island', island.toLowerCase())
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false, nullsFirst: false })
        .limit(limit);

      if (selectedCategory !== 'all') {
        query = query.eq('business_type', selectedCategory);
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError('Unable to load businesses');
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
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

  // Loading skeleton
  if (loading) {
    return (
      <section className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-white'} ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className={`h-8 w-64 rounded mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-4 w-48 rounded mb-8 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-80 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't show section if no businesses and not in error state
  if (businesses.length === 0 && !loading && !error) {
    return null;
  }

  return (
    <section className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-white'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
            <p className={`mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {subtitle || `Discover the best local spots on ${island}`}
            </p>
          </div>
          <Link 
            to={`/islands/${island.toLowerCase()}/directory`}
            className="inline-flex items-center gap-1 text-cyclades-turquoise hover:underline font-medium"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter */}
        {showCategories && (
          <div className="flex flex-wrap gap-2 mb-8 pb-4 overflow-x-auto scrollbar-hide">
            {BUSINESS_CATEGORIES.slice(0, 8).map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyclades-turquoise text-white shadow-lg shadow-cyclades-turquoise/25'
                      : isDark
                        ? 'bg-white/10 text-white/70 hover:bg-white/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
            <p>{error}</p>
          </div>
        )}

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {businesses.map((business, index) => {
              const CategoryIcon = getCategoryIcon(business.business_type);
              return (
                <motion.div
                  key={business.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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

                    {/* Category Badge */}
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
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-900">{business.rating.toFixed(1)}</span>
                        {business.reviews_count > 0 && (
                          <span className="text-xs text-gray-500">({business.reviews_count})</span>
                        )}
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
                        <span className="line-clamp-1">{business.location}</span>
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
                            isDark 
                              ? 'bg-white/10 text-white hover:bg-white/20' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          title="View on Google Maps"
                        >
                          <MapPin className="w-4 h-4" />
                        </a>
                      )}
                      {business.phone && (
                        <a
                          href={`tel:${business.phone}`}
                          className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-white/10 text-white hover:bg-white/20' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                            isDark 
                              ? 'bg-white/10 text-white hover:bg-white/20' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {businesses.length >= limit && (
          <div className="text-center mt-10">
            <Link
              to={`/islands/${island.toLowerCase()}/directory`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              View All Businesses in {island}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
