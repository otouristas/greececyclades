import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Phone, Mail, GlobeIcon, Facebook, Instagram, Twitter, CheckCircle, PlusCircle, MinusCircle, ExternalLink, Map, ChevronLeft, ChevronRight, Waves, BookOpenCheck, Ship, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SEO from '../components/SEO';
import SchemaGenerator from '../components/SchemaGenerator';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getHotelBySlug, generateHotelUrl } from '@/lib/url-utils';
import BookingReviews from '@/components/BookingReviews';
import HotelAmenities from '@/components/HotelAmenities';
import HotelFAQs from '@/components/hotel/HotelFAQs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageGalleryDialog } from '@/components/hotel/ImageGalleryDialog';
import VillaOliviaAvailability from '@/components/hotel/VillaOliviaAvailability';
import { HotelCard, SidebarHotelCard } from '@/components/touristas/HotelDisplay';
import { getBookingPlatformLogo, getSimilarHotels, getHotelLogoUrl } from '@/utils/hotel-utils';
import { determineHotelImageUrl } from '@/utils/image-utils';
import HotelHero from '@/components/hotel/HotelHero';
import WhyChooseHotel from '@/components/hotel/WhyChooseHotel';
import NearbyAttractions from '@/components/hotel/NearbyAttractions';
import GettingHere from '@/components/hotel/GettingHere';
import RelatedContent from '@/components/shared/RelatedContent';
import HotelGallerySection from '@/components/hotel/HotelGallerySection';
import CategorizedAmenities from '@/components/hotel/CategorizedAmenities';
import HotelBookingSection from '@/components/hotel/HotelBookingSection';
import HotelBookingSidebar from '@/components/hotel/HotelBookingSidebar';
import { HotelPriceComparison } from '@/components/hotel/HotelPriceComparison';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';

export default function HotelDetailPage() {
  const { slug } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [similarHotels, setSimilarHotels] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [priceComparisonOpen, setPriceComparisonOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        if (!slug) return;
        
        // Get hotel by slug instead of by ID
        const hotelData = await getHotelBySlug(slug);
        
        if (!hotelData) {
          toast({
            title: "Hotel not found",
            description: "We couldn't find the hotel you're looking for.",
            variant: "destructive"
          });
          return;
        }
        
        
        setHotel(hotelData);
        
        // Set active image to main photo or first photo
        if (hotelData?.hotel_photos?.length > 0) {
          const mainPhoto = hotelData.hotel_photos.find(photo => photo.is_main_photo);
          const photoUrl = mainPhoto ? mainPhoto.photo_url : hotelData.hotel_photos[0].photo_url;
          setActiveImage(`/uploads/hotels/${photoUrl}`);
          setActiveImageIndex(mainPhoto ? hotelData.hotel_photos.indexOf(mainPhoto) : 0);
        }
        
        // Fetch similar hotels based on hotel type
        if (hotelData?.hotel_types?.length > 0) {
          const { data: allHotels, error } = await supabase
            .from('hotels')
            .select('*, hotel_photos(*), hotel_amenities(*)')
            .limit(20);
          
          if (error) {
            console.error('Error fetching hotels for similar hotels:', error);
          } else if (allHotels?.length > 0) {
            // Use the utility function to get similar hotels
            const filteredSimilarHotels = getSimilarHotels(hotelData, allHotels, 3);
            console.log('Similar hotels found:', filteredSimilarHotels.length);
            setSimilarHotels(filteredSimilarHotels);
          }
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        toast({
          title: "Error",
          description: "Failed to load hotel details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [slug, toast]);

  // Function to change the active image
  const handleImageChange = (photoUrl: string, index: number) => {
    setActiveImage(`/uploads/hotels/${photoUrl}`);
    setActiveImageIndex(index);
  };

  // Function to open the full-screen gallery
  const openGallery = (index: number) => {
    setActiveImageIndex(index);
    setGalleryOpen(true);
  };

  // Function to render star rating
  const renderStarRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        size={16}
      />
    ));
  };

  // Toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  // Get booking platform logo
  const getBookingPlatformLogo = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'booking.com':
        return '/uploads/Booking.com.svg';
      case 'airbnb':
        return '/uploads/misc/airbnb-logo.png';
      case 'expedia':
        return '/uploads/misc/expedia-logo.png';
      default:
        return null;
    }
  };

  // Hotel FAQs
  const faqs = [
    {
      question: "What are the check-in and check-out times?",
      answer: "Standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, most of our rates include a complimentary breakfast buffet featuring local products and traditional Greek breakfast items."
    },
    {
      question: "Does the hotel have parking facilities?",
      answer: "Yes, we offer free parking for our guests. However, spaces may be limited during peak season."
    },
    {
      question: "Is there Wi-Fi available at the hotel?",
      answer: "Yes, we provide complimentary high-speed Wi-Fi throughout the hotel property."
    },
    {
      question: "How far is the hotel from the beach?",
      answer: "Our hotel is located approximately 5 minutes walking distance from the nearest beach."
    },
    {
      question: "Are there restaurants nearby?",
      answer: "Yes, there are several excellent restaurants, tavernas, and cafes within walking distance from the hotel."
    },
    {
      question: "Do you have facilities for guests with disabilities?",
      answer: "We have several rooms designed for accessibility and common areas are wheelchair accessible. Please contact us directly for specific requirements."
    },
    {
      question: "How can I get to the hotel from the port?",
      answer: "We offer transfer services from the port upon request. Alternatively, taxis are available at the port, or you can rent a car or scooter."
    }
  ];

  // If loading show spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sifnos-turquoise"></div>
      </div>
    );
  }

  // If hotel not found
  if (!hotel) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Hotel Not Found</h2>
        <p className="mb-6">The hotel you are looking for does not exist or has been removed.</p>
        <Link to="/hotels" className="bg-sifnos-turquoise text-white px-6 py-3 rounded-lg hover:bg-sifnos-deep-blue transition-colors">
          Back to Hotels
        </Link>
      </div>
    );
  }

  // Update the canonical URL and metadata to use the slug
  const hotelSlug = generateHotelUrl(hotel.name);

  // Special feature list for bedroom
  const renderBedroomFeatures = () => {
    if (!hotel) return null;
    
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Bed Configuration</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              2 king beds (200 x 200)
            </li>
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              4 single beds (100 x 200)
            </li>
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              1 baby crib (70 x 130)
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Comfort Features</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              Air conditioning in all living areas
            </li>
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              Extra pillows and blankets
            </li>
            <li className="flex items-center">
              <CheckCircle size={16} className="text-sifnos-turquoise mr-2" />
              Linen changes weekly
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Add the Similar Hotels section with Carousel
  const renderSimilarHotels = () => {
    if (!similarHotels || similarHotels.length === 0) return null;
    
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-sifnos-deep-blue mb-3">
              Relevant Hotels
            </h2>
            <p className="text-gray-600 text-lg">
              A curated list of the most popular hotels based on different destinations.
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {similarHotels.map((similarHotel) => (
                <CarouselItem key={similarHotel.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="group h-full">
                    <Link 
                      to={`/hotels/${generateHotelUrl(similarHotel.name)}`}
                      className="block h-full"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100">
                        {/* Image Section */}
                        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                          <img 
                            src={determineHotelImageUrl(similarHotel, similarHotel.hotel_photos?.[0]?.photo_url)}
                            alt={similarHotel.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            style={{ imageRendering: 'auto' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          {/* Discount Badge */}
                          {similarHotel.original_price && similarHotel.price && similarHotel.original_price > similarHotel.price && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Hot Sale!
                              </span>
                            </div>
                          )}
                          {/* Location Badge */}
                          <div className="absolute bottom-3 left-3">
                            <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full text-sifnos-deep-blue shadow-md">
                              {similarHotel.location}
                            </span>
                          </div>
                          {/* Hotel Logo Overlay */}
                          {(() => {
                            const logoUrl = getHotelLogoUrl(similarHotel);
                            return logoUrl ? (
                              <div className="absolute top-3 right-3 w-12 h-12 rounded-lg bg-white/95 backdrop-blur-sm p-1.5 shadow-md flex items-center justify-center">
                                <img 
                                  src={logoUrl} 
                                  alt={`${similarHotel.name} logo`}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                  style={{ imageRendering: 'crisp-edges' }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            ) : null;
                          })()}
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.round(similarHotel.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">{similarHotel.rating ? `${similarHotel.rating} Review` : 'New'}</span>
                          </div>
                          
                          <h3 className="font-bold text-lg text-sifnos-deep-blue mb-2 line-clamp-2 group-hover:text-sifnos-turquoise transition-colors">
                            {similarHotel.name}
                          </h3>
                          
                          {/* Hotel Features */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {similarHotel.hotel_amenities?.slice(0, 4).map((amenity: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-1 text-xs text-gray-600">
                                <CheckCircle className="h-3 w-3 text-sifnos-turquoise" />
                                <span>{typeof amenity === 'string' ? amenity : amenity.amenity}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Cancellation Policy */}
                          <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-sifnos-turquoise" />
                            <span>Free Cancellation Policy</span>
                          </div>
                          
                          {/* Price & Book Button */}
                          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div>
                              {similarHotel.original_price && similarHotel.price && similarHotel.original_price > similarHotel.price && (
                                <span className="text-sm text-gray-400 line-through mr-2">
                                  €{similarHotel.original_price}
                                </span>
                              )}
                              <span className="text-lg font-bold text-sifnos-deep-blue">
                                €{similarHotel.price || 'N/A'}
                              </span>
                            </div>
                            <span className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white text-sm font-semibold rounded-md transition-all duration-300 shadow-md hover:shadow-lg">
                              Book Now
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/90 hover:bg-white border border-gray-200 shadow-lg" />
            <CarouselNext className="right-0 bg-white/90 hover:bg-white border border-gray-200 shadow-lg" />
          </Carousel>
        </div>
      </section>
    );
  };

  // SEO Plan optimized title and description generation
  const generateSeoTitle = () => {
    if (!hotel) return "Hotel Details - Santorini Island | Hotels Santorini";
    
    // Extract unique feature from amenities or type
    const uniqueFeatures: Record<string, string> = {
      'Villa': 'Private Pool & Caldera Views',
      'Luxury Hotel': 'Infinity Pool & Sunset Views',
      'Boutique Hotel': 'Cycladic Design & Authentic Charm',
      'Beach Hotel': 'Beachfront Access & Sea Views',
      'Family Hotel': 'Family-Friendly & Pool Access'
    };
    
    const feature = uniqueFeatures[hotel.type || ''] || 
                   (hotel.hotel_amenities?.some(a => a.amenity.toLowerCase().includes('pool')) ? 'Pool & Caldera Views' : 'Cycladic Charm');
    
    // Formula: [Hotel Name] Santorini - [Unique Feature] | [Location]
    return `${hotel.name} Santorini - ${feature} | ${hotel.location}`;
  };
  
  const generateSeoDescription = () => {
    if (!hotel) return "Discover carefully curated Santorini hotels and villas with caldera views, Cycladic charm, and premium amenities for the 2026 season.";
    
    // Extract USP from hotel description or type
    const usp = hotel.description?.substring(0, 100) || 
               `${hotel.name} offers exceptional ${hotel.type?.toLowerCase() || 'accommodation'} in ${hotel.location}`;
    
    // Get 3 key amenities
    const amenities = hotel.hotel_amenities?.slice(0, 3).map(a => a.amenity).join(', ') || 'Premium amenities';
    
    // Social proof
    const socialProof = hotel.rating ? `Rated ${hotel.rating}/5 by verified guests.` : 'Highly rated by travelers.';
    
    // Booking incentive
    const bookingIncentive = 'Book direct for best rates and flexible cancellation.';
    
    // Formula: [Hotel Name] offers [USP]. Features [3 amenities]. Located in [area]. [Social proof]. [Booking incentive].
    return `${hotel.name} offers ${usp}. Features ${amenities}. Located in ${hotel.location}, Santorini. ${socialProof} ${bookingIncentive}`;
  };

  return (
    <>
      <SEO 
        title={generateSeoTitle()}
        description={generateSeoDescription()}
        keywords={hotel ? [
          hotel.name.toLowerCase(),
          `${hotel.location.toLowerCase()} hotels`,
          'book direct santorini',
          `luxury ${hotel.type?.toLowerCase() || 'hotel'} santorini`,
          'santorini accommodation 2026',
          'cyclades luxury stays',
          `${hotel.location.toLowerCase()} accommodation`,
          'santorini island hotels',
          'authentic cycladic experience'
        ] : ['santorini hotels', 'luxury accommodation', 'cyclades hotels']}
        pageType="hotel-detail"
        schemaType={hotel?.type === 'Villa' ? 'Villa' : 'Hotel'}
        canonical={`https://hotelssantorini.gr/hotels/${hotel ? generateHotelUrl(hotel.name) : ''}`}
        imageUrl={activeImage ? `https://hotelssantorini.gr${activeImage}` : '/uploads/santorini/og-image.jpg'}
        hotelData={hotel ? {
          name: hotel.name,
          location: hotel.location,
          type: hotel.type || 'Hotel',
          priceRange: hotel.price_range || "€€€",
          rating: hotel.rating,
          amenities: hotel.hotel_amenities?.map(a => a.amenity) || [],
          imageUrl: activeImage ? `https://hotelssantorini.gr${activeImage}` : undefined,
          telephone: hotel.phone || "+30-2284-031370"
        } : undefined}
      />
      
      {/* Enhanced Hotel Schema */}
      {hotel && (
        <SchemaGenerator
          pageType="Hotel"
          data={{
            name: hotel.name,
            description: generateSeoDescription(),
            image: activeImage ? `https://hotelssantorini.gr${activeImage}` : undefined,
            breadcrumbs: [
              { name: "Home", item: "https://hotelssantorini.gr/" },
              { name: "Hotels", item: "https://hotelssantorini.gr/hotels" },
              { name: hotel.name, item: `https://hotelssantorini.gr/hotels/${hotelSlug}` }
            ],
            hotel: {
              name: hotel.name,
              location: hotel.location,
              type: hotel.type || 'Hotel',
              priceRange: hotel.price_range || "€€€",
              rating: hotel.rating,
              ratingCount: hotel.review_count || 0,
              telephone: hotel.phone || "+30-2284-031370",
              amenities: hotel.hotel_amenities?.map((a: any) => a.amenity) || [],
              images: hotel.hotel_photos?.map((p: any) => `https://hotelssantorini.gr/uploads/hotels/${p.photo_url}`) || [],
              checkInTime: "14:00",
              checkOutTime: "11:00"
            },
            faq: faqs.map(f => ({ question: f.question, answer: f.answer }))
          }}
        />
      )}
      
      <SimpleBreadcrumbs 
        items={[
          { label: 'Hotels', href: '/hotels' },
          { label: hotel?.name || 'Hotel' }
        ]}
      />
      
      {/* New Full-Width Hero Section */}
      <HotelHero
        hotel={hotel}
        activeImage={activeImage}
        onShare={() => {
          if (navigator.share) {
            navigator.share({
              title: `${hotel?.name} - Santorini Hotels`,
              text: `Check out ${hotel?.name} in ${hotel?.location}, Santorini`,
              url: window.location.href,
            }).catch(() => {});
          } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link copied!",
              description: "Hotel page link copied to clipboard",
            });
          }
        }}
        onSave={() => {
          // TODO: Implement save to favorites
          toast({
            title: "Saved!",
            description: "Hotel saved to your favorites",
          });
        }}
        onPrint={() => {
          window.print();
        }}
        renderStarRating={renderStarRating}
      />
      
      {/* Enhanced Photo Gallery Section */}
      {hotel && <HotelGallerySection hotel={hotel} onImageClick={(index) => setActiveImageIndex(index)} />}
      
      {/* Hotel Details */}
      <div className="py-10">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Why Choose This Hotel Section */}
              <WhyChooseHotel hotel={hotel} />
              
              {/* Enhanced Description */}
              <div className="cycladic-card p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
                  <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">About {hotel?.name}</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base md:text-lg mb-6">
                    {hotel?.description}
                  </p>
                  {/* Internal linking to location and travel guide */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Planning your stay?</strong> Discover more about {hotel?.location} and the best things to do in Sifnos.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {hotel?.location && (
                        <Link 
                          to={`/locations/${hotel.location.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium"
                        >
                          Explore {hotel.location} →
                        </Link>
                      )}
                      <Link 
                        to="/travel-guide"
                        className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium"
                      >
                        Complete Sifnos Travel Guide →
                      </Link>
                      <Link 
                        to="/best-beaches-sifnos-guide"
                        className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium"
                      >
                        Best Beaches in Sifnos →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nearby Attractions Section */}
              <NearbyAttractions hotel={hotel} />
              
              {/* Getting Here Section */}
              <GettingHere hotel={hotel} />
              
              {/* Categorized Amenities Section */}
              <div className="cycladic-card p-8 md:p-10 shadow-lg border border-gray-100">
                {hotel && <CategorizedAmenities hotel={hotel} />}
              </div>
              
              
              {/* Booking & Availability Section */}
              {hotel && <HotelBookingSection hotel={hotel} />}
              
              {/* Reviews - Booking.com Reviews or Custom Reviews */}
              <div className="cycladic-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
                  <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Reviews</h2>
                </div>
                {/* Show reviews from BookingReviews component */}
                {hotel?.id && <BookingReviews hotelId={hotel.id} />}
                
                {!hotel?.id && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No reviews available for this hotel.</p>
                  </div>
                )}
              </div>
              
              {/* FAQs */}
              <div className="cycladic-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
                  <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Frequently Asked Questions</h2>
                </div>
                {hotel && <HotelFAQs hotelName={hotel.name} />}
              </div>
            </div>
            
            {/* Right Column - Booking Sidebar & Contact Info */}
            <div className="space-y-6">
              {hotel && (
                <div className="lg:sticky lg:top-24 lg:z-10 lg:self-start">
                  <HotelBookingSidebar 
                    hotel={hotel}
                    onCheckAvailability={() => {
                      const bookingSection = document.getElementById('booking-section');
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    onEnquiry={() => {
                      // TODO: Implement enquiry modal
                      toast({
                        title: "Enquiry",
                        description: "Enquiry form coming soon",
                      });
                    }}
                  />
                  
                  {/* Price Comparison Button for Makcorps hotels */}
                  {(hotel as any).makcorps_hotel_id && (
                    <Card className="p-4 mt-6">
                      <CardContent className="p-0">
                        <h3 className="font-semibold text-lg mb-3">Compare Prices</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          See prices from multiple booking sites to find the best deal
                        </p>
                        <div className="space-y-2 mb-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Check-in</label>
                            <input
                              type="date"
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Check-out</label>
                            <input
                              type="date"
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                              min={checkInDate}
                            />
                          </div>
                        </div>
                        <Button
                          onClick={() => setPriceComparisonOpen(true)}
                          className="w-full"
                          variant="default"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Compare Prices
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              
              {/* Contact Information */}
              <div className="cycladic-card p-6 lg:relative lg:z-0">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {hotel?.address && (
                    <div className="flex items-start">
                      <MapPin size={18} className="text-sifnos-turquoise mr-2 mt-1 flex-shrink-0" />
                      <span>{hotel.address}</span>
                    </div>
                  )}
                  
                  {hotel?.phone && (
                    <div className="flex items-center">
                      <Phone size={18} className="text-sifnos-turquoise mr-2 flex-shrink-0" />
                      <a href={`tel:${hotel.phone}`} className="hover:text-sifnos-turquoise">{hotel.phone}</a>
                    </div>
                  )}
                  
                  {hotel?.email && (
                    <div className="flex items-center">
                      <Mail size={18} className="text-sifnos-turquoise mr-2 flex-shrink-0" />
                      <a href={`mailto:${hotel.email}`} className="hover:text-sifnos-turquoise">{hotel.email}</a>
                    </div>
                  )}
                  
                  {hotel?.website && (
                    <div className="flex items-center">
                      <GlobeIcon size={18} className="text-sifnos-turquoise mr-2 flex-shrink-0" />
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="hover:text-sifnos-turquoise">Website</a>
                    </div>
                  )}
                </div>
                
                {/* Social Media Links */}
                <div className="mt-4 flex space-x-3">
                  {hotel?.social_facebook && (
                    <a 
                      href={hotel.social_facebook} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-sifnos-turquoise/20 transition-colors"
                    >
                      <Facebook size={16} />
                    </a>
                  )}
                  
                  {hotel?.social_instagram && (
                    <a 
                      href={hotel.social_instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-sifnos-turquoise/20 transition-colors"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                  
                  {hotel?.social_twitter && (
                    <a 
                      href={hotel.social_twitter} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-sifnos-turquoise/20 transition-colors"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Map section - Updated with hotel-specific map URLs */}
              <div className="cycladic-card p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Map size={18} className="mr-2 text-sifnos-turquoise" />
                  Location
                </h3>
                <div className="h-64 bg-gray-100 rounded-md overflow-hidden shadow-md">
                  <iframe
                    src={hotel?.google_map_url || ''}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${hotel?.name} Location Map`}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center">
                  <MapPin size={12} className="mr-1" />
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel?.name} ${hotel?.location} Sifnos Greece`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sifnos-turquoise hover:underline"
                  >
                    View larger map
                  </a>
                </div>
              </div>
              
              {/* Greece Cyclades Banner */}
              <div className="cycladic-card p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ExternalLink size={18} className="mr-2 text-sifnos-turquoise" />
                  Explore More
                </h3>
                <a 
                  href="https://discovercyclades.gr" 
                  target="_blank" 
                  rel="dofollow"
                  className="block overflow-hidden rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  <img 
                    src="/uploads/banners/greececyclades-banner.png" 
                    alt="Discover more about Greek Cyclades islands" 
                    className="w-full h-auto transform transition-transform hover:scale-105 duration-300"
                  />
                </a>
                <p className="mt-3 text-sm text-gray-600">
                  Discover more beautiful destinations in the Cyclades islands of Greece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the similar hotels section */}
      {renderSimilarHotels()}
      
      {/* Related Content Section - Internal Linking */}
      {hotel && hotel.location && (
        <RelatedContent
          title="Continue Exploring Santorini"
          items={[
            {
              title: `Hotels in ${hotel.location}`,
              url: `/locations/${hotel.location.toLowerCase().replace(/\s+/g, '-')}`,
              description: `Discover more accommodations in ${hotel.location}`,
              type: 'location' as const
            },
            {
              title: hotel.hotel_types?.[0] || 'Similar Hotels',
              url: hotel.hotel_types?.[0] ? `/hotel-types/${hotel.hotel_types[0].toLowerCase().replace(/\s+/g, '-')}` : '/hotels',
              description: `Browse all ${hotel.hotel_types?.[0] || 'similar'} hotels in Santorini`,
              type: 'hotel-type' as const
            },
            {
              title: 'Complete Travel Guide',
              url: '/travel-guide',
              description: 'Everything you need to know about Santorini',
              type: 'guide' as const
            },
            {
              title: 'Best Beaches Guide',
              url: '/beaches',
              description: 'Discover the most beautiful beaches in Santorini',
              type: 'guide' as const
            },
            {
              title: 'Ferry Tickets',
              url: '/ferry-tickets',
              description: 'Book your ferry to Sifnos',
              type: 'ferry' as const
            }
          ].filter(item => item.url)}
          columns={3}
        />
      )}

      {/* Price Comparison Modal */}
      {hotel && (hotel as any).makcorps_hotel_id && (
        <HotelPriceComparison
          hotelId={(hotel as any).makcorps_hotel_id}
          hotelName={hotel.name}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          numberOfAdults={2}
          numberOfRooms={1}
          currency="EUR"
          isOpen={priceComparisonOpen}
          onClose={() => setPriceComparisonOpen(false)}
        />
      )}
    </>
  );
}
