import { useNavigate } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Sparkles } from 'lucide-react';
import { BookingSearch, type SearchFormData } from '@/components/booking/BookingSearch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SEO from '@/components/SEO';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';

const POPULAR_DESTINATIONS = [
  { 
    name: 'Santorini', 
    countryCode: 'GR',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e' 
  },
  { 
    name: 'Paris', 
    countryCode: 'FR',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' 
  },
  { 
    name: 'Rome', 
    countryCode: 'IT',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' 
  },
  { 
    name: 'Barcelona', 
    countryCode: 'ES',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' 
  },
];

const VIBE_SUGGESTIONS = [
  { vibe: 'Romantic sunset views with infinity pool in Santorini', icon: '💕' },
  { vibe: 'Family-friendly beach resort in Greece', icon: '👨‍👩‍👧‍👦' },
  { vibe: 'Luxury boutique hotel in historic Paris', icon: '✨' },
  { vibe: 'Budget-friendly hotel near beach', icon: '💰' },
  { vibe: 'Spa and wellness retreat in mountains', icon: '🧘' },
  { vibe: 'Pet-friendly hotel with garden', icon: '🐕' },
];

export default function BookingPage() {
  const navigate = useNavigate();

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
        title="Book Hotels Worldwide | Best Rates Guaranteed"
        description="Book your perfect hotel anywhere in the world with instant confirmation. Search by location or vibe. Best rates, no booking fees. Thousands of hotels available."
        canonical="https://hotelssantorini.gr/book"
      />

      <SimpleBreadcrumbs items={[{ label: 'Book Hotels', href: '' }]} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sifnos-deep-blue to-sifnos-turquoise text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find & Book Your Perfect Hotel
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Search by destination or describe your ideal stay. Best rates guaranteed.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span>10,000+ Hotels Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>AI-Powered Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <BookingSearch onSearch={handleSearch} />
        </div>

        {/* Popular Destinations */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Card
                key={`${dest.countryCode}-${dest.name}`}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                onClick={() => quickSearch(dest.name, dest.countryCode)}
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Hotels in ${dest.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{dest.name}</h3>
                  <p className="text-sm text-gray-600">View hotels</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Vibe Search */}
        <div className="container mx-auto px-4 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-sifnos-turquoise" />
            <h2 className="text-3xl font-bold text-gray-900">Search by Vibe</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Describe what you're looking for and let AI find your perfect hotel match
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VIBE_SUGGESTIONS.map((item) => (
              <Button
                key={item.vibe}
                variant="outline"
                className="h-auto p-6 text-left justify-start hover:bg-sifnos-turquoise hover:text-white hover:border-sifnos-turquoise transition-colors flex items-start gap-4 !whitespace-normal"
                onClick={() => vibeSearch(item.vibe)}
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <span className="text-base break-words flex-1">{item.vibe}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Why Book With Us */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Book With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sifnos-turquoise/10 rounded-full mb-4">
                  <Star className="w-8 h-8 text-sifnos-turquoise" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">
                  Find a lower price? We'll match it. No hidden fees, no surprises.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sifnos-turquoise/10 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-sifnos-turquoise" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Confirmation</h3>
                <p className="text-gray-600">
                  Book now and receive immediate confirmation. Your dream hotel is just clicks away.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sifnos-turquoise/10 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-sifnos-turquoise" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Search</h3>
                <p className="text-gray-600">
                  Find hotels that match your style and preferences using advanced AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
