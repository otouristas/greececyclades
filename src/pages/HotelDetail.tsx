import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useHotelStore } from '../store/hotelStore';
import { 
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
  Bell,
  Users,
  BedDouble,
  SquareStack
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
        onSectionChange={(sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const yOffset = -100; // Adjust this value to account for the navbar height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          setActiveSection(sectionId);
        }}
        hotelName={selectedHotel.name}
        location={selectedHotel.location}
        category={selectedHotel.category}
      />

      {/* Price Alert */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <PriceAlert onSubscribe={handlePriceAlert} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="mb-12">
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

            <section ref={roomsRef} id="rooms" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
              <div className="space-y-6">
                {selectedHotel.rooms.map((room) => (
                  <div key={room.id} className="mb-8">
                    <div className="flex items-start gap-6">
                      <div className="w-1/3">
                        <img
                          src={room.image}
                          alt={room.type}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                            <p className="text-gray-600 mb-4">{room.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">€{room.price}</p>
                            <p className="text-gray-500">per night</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span>Up to {room.maxOccupancy} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BedDouble className="w-5 h-5 text-gray-400" />
                            <span>{room.bedType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SquareStack className="w-5 h-5 text-gray-400" />
                            <span>{room.size} m²</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedRoom({
                            ...room,
                            name: room.type // Use type as name for now
                          })}
                          className={`
                            px-6 py-2 rounded-lg font-semibold transition-colors
                            ${selectedRoom?.id === room.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                            }
                          `}
                        >
                          {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section ref={amenitiesRef} id="amenities" className="mb-12">
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

            <section ref={locationRef} id="location" className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <LocationMap hotel={selectedHotel} />
            </section>

            <section ref={reviewsRef} id="reviews" className="mb-12">
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
          <div className="lg:col-span-4">
            <BookingWidget 
              hotel={{
                priceRange: selectedHotel.priceRange,
                name: selectedHotel.name,
                location: selectedHotel.location,
                logo: selectedHotel.logo || undefined
              }}
              selectedDates={selectedDates}
              selectedRoom={selectedRoom}
              onDateChange={setSelectedDates}
            />
          </div>
        </div>
      </div>
    </>
  );
}
