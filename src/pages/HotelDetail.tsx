import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useHotelStore } from '../store/hotelStore';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Waves, 
  Heart, 
  UtensilsCrossed, 
  Wine, 
  Wifi, 
  Car, 
  Clock4, 
  Dumbbell, 
  Mountain, 
  Coffee, 
  Palmtree, 
  HeartPulse, 
  Flower2, 
  ParkingCircle,
  ShieldCheck,
  Bell
} from 'lucide-react';
import SEO from '../components/SEO';
import ImageGallery from '../components/hotels/ImageGallery';
import QuickInfo from '../components/hotels/QuickInfo';
import StickyNav from '../components/hotels/StickyNav';
import PriceAlert from '../components/hotels/PriceAlert';
import LocationMap from '../components/hotels/LocationMap';
import Reviews from '../components/hotels/Reviews';
import RoomDetails from '../components/hotels/RoomDetails';
import BookingWidget from '../components/hotels/BookingWidget';
import { HotelRoom } from '../types/hotel';

type DateRange = [Date | null, Date | null];

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'reviews', label: 'Reviews' }
];

export default function HotelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { selectedHotel, fetchHotelBySlug, loading, error } = useHotelStore();
  const [selectedDates, setSelectedDates] = useState<DateRange>([null, null]);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  // Refs for scroll handling
  const overviewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      console.log('Component: Fetching hotel with slug:', slug);
      fetchHotelBySlug(slug);
    }
  }, [slug, fetchHotelBySlug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for the sticky header

      const refs = {
        overview: overviewRef,
        rooms: roomsRef,
        amenities: amenitiesRef,
        location: locationRef,
        reviews: reviewsRef
      };

      for (const [section, ref] of Object.entries(refs)) {
        if (ref.current) {
          const element = ref.current;
          const position = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= position && scrollPosition < position + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const refs = {
      overview: overviewRef,
      rooms: roomsRef,
      amenities: amenitiesRef,
      location: locationRef,
      reviews: reviewsRef
    };

    const ref = refs[sectionId as keyof typeof refs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the hotel you're looking for.</p>
        <button
          onClick={() => navigate('/hotels')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          View All Hotels
        </button>
      </div>
    );
  }

  if (loading || !selectedHotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { reviews, rating } = selectedHotel;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedHotel.name,
          text: `Check out ${selectedHotel.name} in ${selectedHotel.location.area}, ${selectedHotel.location.island}`,
          url: window.location.href
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSave = () => {
    // Implement save to favorites functionality
    console.log('Save to favorites:', selectedHotel.id);
  };

  const handleViewMap = () => {
    scrollToSection('location');
  };

  const handlePriceAlert = () => {
    // Implement price alert functionality
    console.log('Set price alert for:', selectedHotel.id);
  };

  return (
    <>
      <SEO 
        title={`${selectedHotel.name} | ${selectedHotel.location.area} Hotels`}
        description={`Book your stay at ${selectedHotel.name} in ${selectedHotel.location.area}. ${selectedHotel.description.slice(0, 100)}...`}
      />
      
      {/* Hero Section */}
      <div className="relative">
        <ImageGallery 
          images={selectedHotel.images} 
          hotelName={selectedHotel.name}
        />
        <QuickInfo
          name={selectedHotel.name}
          location={selectedHotel.location}
          category={selectedHotel.category}
          rating={rating}
          reviewCount={reviews.count}
          onShare={handleShare}
          onSave={handleSave}
          onViewMap={handleViewMap}
        />
      </div>

      {/* Navigation */}
      <StickyNav
        sections={sections}
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />

      {/* Price Alert */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <PriceAlert onSubscribe={handlePriceAlert} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section ref={overviewRef} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">About {selectedHotel.name}</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedHotel.description}
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedHotel.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rooms Section */}
            <section ref={roomsRef} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
              <div className="space-y-6">
                {selectedHotel.rooms.map((room) => {
                  const roomWithAmenities = {
                    ...room,
                    amenities: room.amenities.map(name => ({ name, included: true }))
                  };
                  return (
                    <RoomDetails
                      key={room.id}
                      room={roomWithAmenities}
                      onSelect={(r) => {
                        const hotelRoom: HotelRoom = {
                          ...r,
                          amenities: r.amenities.map(a => a.name)
                        };
                        setSelectedRoom(hotelRoom);
                      }}
                      isSelected={selectedRoom?.id === room.id}
                    />
                  );
                })}
              </div>
            </section>

            {/* Amenities Section */}
            <section ref={amenitiesRef} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {selectedHotel.amenities.map((amenity) => {
                  const getAmenityIcon = (name: string) => {
                    const icons: Record<string, typeof Waves> = {
                      'Pool': Waves,
                      'Swimming Pool': Waves,
                      'Spa': Heart,
                      'Restaurant': UtensilsCrossed,
                      'Bar': Wine,
                      'WiFi': Wifi,
                      'Airport Transfer': Car,
                      '24/7 Reception': Clock4,
                      'Fitness Center': Dumbbell,
                      'Beach Access': Waves,
                      'Sea View': Mountain,
                      'Breakfast Service': Coffee,
                      'Private Beach': Palmtree,
                      'Wellness Center': HeartPulse,
                      'Yoga': Flower2,
                      'Valet Parking': ParkingCircle,
                      'Security': ShieldCheck,
                      'Concierge': Bell,
                    };
                    const Icon = icons[name] || UtensilsCrossed;
                    return <Icon className="w-5 h-5 text-blue-600" />;
                  };

                  return (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location Section */}
            <section ref={locationRef} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <LocationMap hotel={selectedHotel} />
            </section>

            {/* Reviews Section */}
            <section ref={reviewsRef} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
              <Reviews
                reviews={reviews.reviews}
                averageRating={rating}
                totalReviews={reviews.count}
                ratingBreakdown={reviews.breakdown}
              />
            </section>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="space-y-6">
            {/* Contact Information */}
            {selectedHotel.logo && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <div className="flex justify-center mb-6">
                  <img 
                    src={selectedHotel.logo} 
                    alt={`${selectedHotel.name} logo`}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>+30 2286 072041</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a href="mailto:info@andronissuites.com" className="hover:text-blue-600">
                      info@andronissuites.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 text-blue-600" />
                    <span>Oia 847 02, Santorini, Greece</span>
                  </div>
                </div>
              </div>
            )}
            
            <BookingWidget
              hotel={selectedHotel}
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
            />
            
            {/* Need Help Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our travel experts are here to help you plan your perfect stay
              </p>
              <button className="w-full bg-white text-blue-500 border border-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
