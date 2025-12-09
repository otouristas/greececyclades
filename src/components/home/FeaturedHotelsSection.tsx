import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFallbackHotels } from '@/data/fallback-hotels';
import { isUnauthorizedSupabaseError } from '@/utils/supabase-error';
import type { DisplayHotel } from '@/types/hotel';
import { mapHotelWithSource } from '@/types/hotel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import UnifiedHotelCard from '@/components/UnifiedHotelCard';
import { Sparkles, Waves, Home, Users, Building2, Wallet } from 'lucide-react';

const filterOptions = [
  { id: 'all', label: 'All Hotels', icon: Home },
  { id: 'luxury', label: 'Luxury', icon: Sparkles },
  { id: 'beach', label: 'Beach', icon: Waves },
  { id: 'villas', label: 'Villas', icon: Building2 },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'budget', label: 'Budget', icon: Wallet },
];

const getProcessedFallbackHotels = (): DisplayHotel[] =>
  getFallbackHotels().map((hotel) => mapHotelWithSource(hotel, 'fallback'));

export default function FeaturedHotelsSection() {
  const [hotels, setHotels] = useState<DisplayHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        
        // Check if Supabase is properly configured
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          console.warn('Supabase not configured. Falling back to static hotel list.');
          setHotels(getProcessedFallbackHotels());
          setLoading(false);
          return;
        }
        
        const now = new Date().toISOString();
        
        // Query featured hotels first, then fallback to top-rated
        const featuredQuery = supabase
          .from('hotels')
          .select(`
            *,
            hotel_amenities(amenity),
            hotel_photos(id, photo_url, is_main_photo)
          `);
        
        // Check if query builder methods exist
        if (typeof featuredQuery.eq !== 'function') {
          console.log('Supabase query builder not available, skipping hotel fetch');
          setHotels(getProcessedFallbackHotels());
          setLoading(false);
          return;
        }
        
        const { data: featuredData, error: featuredError } = await featuredQuery
          .eq('is_featured', true)
          .order('featured_priority', { ascending: false })
          .order('rating', { ascending: false })
          .limit(20); // Get more to filter by dates
        
        // Filter by date range in JavaScript
        const nowDate = new Date(now);
        const validFeaturedHotels = ((featuredData || []) as DisplayHotel[]).filter((hotel) => {
          const startDate = hotel.featured_start_date ? new Date(hotel.featured_start_date) : null;
          const endDate = hotel.featured_end_date ? new Date(hotel.featured_end_date) : null;
          
          // Hotel is valid if:
          // - No start date OR start date <= now
          // - AND no end date OR end date >= now
          const validStart = !startDate || startDate <= nowDate;
          const validEnd = !endDate || endDate >= nowDate;
          
          return validStart && validEnd;
        }).slice(0, 12);
        
        let data = validFeaturedHotels;
        let error = featuredError;
        
        // If no featured hotels or not enough, supplement with top-rated
        if (!error && (!data || data.length < 12)) {
          const topRatedQuery = supabase
            .from('hotels')
            .select(`
              *,
              hotel_amenities(amenity),
              hotel_photos(id, photo_url, is_main_photo)
            `);
          
          if (typeof topRatedQuery.order === 'function') {
            const { data: topRatedData, error: topRatedError } = await topRatedQuery
              .order('rating', { ascending: false })
              .limit(12 - (data?.length || 0));
          
          if (!topRatedError && topRatedData) {
            // Combine featured and top-rated, avoiding duplicates
            const featuredIds = new Set((data || []).map((h) => h.id));
            const additionalHotels = (topRatedData as DisplayHotel[]).filter(
              (h) => !featuredIds.has(h.id)
            );
            data = [...(data || []), ...additionalHotels].slice(0, 12);
          }
          }
        }
        
        if (error) {
          if (isUnauthorizedSupabaseError(error)) {
            console.warn(
              'Supabase denied access to hotels. Verify anon key and RLS select policy for hotels, hotel_photos, and hotel_amenities.'
            );
            toast({
              title: 'Hotel data restricted',
              description: 'Grant anon read access in Supabase or update VITE_SUPABASE_* env vars.',
              variant: 'destructive',
            });
            setHotels(getProcessedFallbackHotels());
            return;
          }
          throw error;
        }
        
        // Process hotels - mark featured ones
        const processedHotels = (data || []).map((hotel) => mapHotelWithSource(hotel, 'local'));
        
        setHotels(processedHotels);
      } catch (error) {
        if (isUnauthorizedSupabaseError(error)) {
          console.warn(
            'Supabase denied access to hotels. Using fallback dataset until policies allow anon select.'
          );
          setHotels(getProcessedFallbackHotels());
          return;
        }
        console.error('Error fetching hotels:', error);
        // Only show toast if it's not a Supabase configuration issue
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        if (SUPABASE_URL) {
          toast({
            title: "Error loading hotels",
            description: "Please try refreshing the page",
            variant: "destructive",
          });
        }
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [toast]);

  const filteredHotels = hotels.filter(hotel => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'luxury') return hotel.hotel_types?.includes('Luxury Hotels');
    if (activeFilter === 'beach') return hotel.hotel_types?.includes('Beach Hotels');
    if (activeFilter === 'villas') return hotel.hotel_types?.includes('Villas');
    if (activeFilter === 'family') return hotel.hotel_types?.includes('Family Friendly');
    if (activeFilter === 'budget') return hotel.price < 100;
    return true;
  });

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading featured hotels...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-sifnos-beige/30">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-sifnos-beige" />
            Curated Selection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-sifnos-deep-blue mb-4">
            Discover Our Handpicked Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully selected hotels, villas, and apartments for your perfect Santorini escape
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                variant="outline"
                size="lg"
                onClick={() => setActiveFilter(filter.id)}
                className={`gap-2 transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-sifnos-beige text-sifnos-deep-blue border-sifnos-beige hover:bg-sifnos-beige/90 shadow-lg' 
                    : 'border-gray-300 text-gray-700 hover:border-sifnos-beige hover:text-sifnos-deep-blue hover:scale-105'
                }`}
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Hotels Carousel */}
        {filteredHotels.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredHotels.map((hotel) => (
                 <CarouselItem key={hotel.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full animate-fade-in">
                    <UnifiedHotelCard 
                      hotel={hotel as any}
                      className="h-full shadow-lg hover:shadow-elegant-lg transition-all duration-500"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 shadow-lg" />
            <CarouselNext className="hidden md:flex -right-4 shadow-lg" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hotels found for this category. Try another filter.
            </p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/hotels">
            <Button 
              size="lg" 
              className="gap-2 bg-sifnos-deep-blue text-white hover:bg-sifnos-deep-blue/90 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              View All {filteredHotels.length}+ Hotels
              <span className="text-xl">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
