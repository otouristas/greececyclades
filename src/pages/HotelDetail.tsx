import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../lib/utils';
import {
  Star,
  MapPin,
  Share2,
  Heart,
  Wifi,
  Coffee,
  UtensilsCrossed,
  ShowerHead,
  Car,
  Bell,
  Users,
  BedDouble,
  Calendar,
  Clock4,
  ShieldCheck,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

// Define the Hotel interface
interface Hotel {
  id: number;
  name: string;
  description: string;
  island: string;
  area: string;
  rating: number;
  price_range: {
    min: number;
    max: number;
  };
  images: {
    main: string;
    gallery: string[];
  };
  amenities: string[];
  features?: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact?: {
    phone: string;
    email: string;
  };
  website?: string;
  reviews_count?: number;
}

// Section interface for navigation
interface Section {
  id: string;
  label: string;
}

// List of sections for navigation
const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'reviews', label: 'Reviews' }
];

// Map amenity names to icons
const amenityIcons: Record<string, JSX.Element> = {
  'wifi': <Wifi className="w-5 h-5" />,
  'parking': <Car className="w-5 h-5" />,
  'restaurant': <UtensilsCrossed className="w-5 h-5" />,
  'bar': <Coffee className="w-5 h-5" />,
  'beach access': <MapPin className="w-5 h-5" />,
  'gym': <ShowerHead className="w-5 h-5" />,
  'pool': <Coffee className="w-5 h-5" />,
  'spa': <Heart className="w-5 h-5" />,
  'room service': <Bell className="w-5 h-5" />,
  'mountain view': <MapPin className="w-5 h-5" />,
  'sea view': <MapPin className="w-5 h-5" />,
  'garden': <MapPin className="w-5 h-5" />,
  'coffee shop': <Coffee className="w-5 h-5" />,
  'airport shuttle': <Car className="w-5 h-5" />,
  '24-hour front desk': <Clock4 className="w-5 h-5" />,
};

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  // Sample data (would come from API in a real app)
  const userRating = selectedHotel?.rating || 0;
  const reviewCount = selectedHotel?.reviews_count || 0;
  const amenities = selectedHotel?.amenities || [];
  const island = selectedHotel?.island || '';
  const area = selectedHotel?.area || '';
  const coordinates = selectedHotel?.coordinates || { latitude: 37.4219, longitude: 25.3675 };
  
  // Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('accommodation')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setSelectedHotel(data as Hotel);
          
          // Check if hotel is in favorites
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(Number(id)));
        }
      } catch (error) {
        console.error('Error fetching hotel:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotelData();
  }, [id]);
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (!selectedHotel) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const hotelId = selectedHotel.id;
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== hotelId);
    } else {
      updatedFavorites = [...favorites, hotelId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedHotel?.name,
        text: `Check out ${selectedHotel?.name} on Greece Cyclades!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  // Handle price alert
  const handlePriceAlert = () => {
    // In a real app, this would open a modal or form to set up price alerts
    alert('Price alert feature would be implemented here!');
  };
  
  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
      'overview': overviewRef,
      'rooms': roomsRef,
      'amenities': amenitiesRef,
      'location': locationRef,
      'reviews': reviewsRef,
    };
    
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full rounded-xl mb-8" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            
            <Skeleton className="h-12 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!selectedHotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
        <p className="text-gray-600 mb-8">The hotel you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/hotels')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All Hotels
        </button>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section with Gallery */}
      <div className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[60vh] overflow-hidden">
            <img 
              src={selectedHotel.images.main} 
              alt={selectedHotel.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            
            {/* Hotel Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedHotel.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{area}, {island}, Greece</span>
              </div>
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2 p-2 bg-white">
            {selectedHotel.images.gallery.slice(0, 5).map((image: string, index: number) => (
              <div 
                key={index}
                onClick={() => setActiveImage(index)}
                className={cn(
                  "h-20 cursor-pointer overflow-hidden relative",
                  activeImage === index ? "ring-2 ring-blue-600" : ""
                )}
              >
                <img src={image} alt={`${selectedHotel.name} ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            
            {/* View More Photos Button */}
            {selectedHotel.images.gallery.length > 5 && (
              <div 
                className="h-20 bg-black/50 flex items-center justify-center cursor-pointer text-white"
                onClick={() => {/* Open full gallery */}}
              >
                <span>+{selectedHotel.images.gallery.length - 5} more</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Info Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold hidden sm:block">{selectedHotel.name}</h2>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.round(selectedHotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">{selectedHotel.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-6 border-b overflow-x-auto pb-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap capitalize transition-colors ${
                  activeSection === section.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Price Alert Banner */}
      <div className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-blue-800">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Want to know when prices drop for this property?</span>
            </div>
            <button
              onClick={handlePriceAlert}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Set Price Alert
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel Details */}
          <div className="w-full lg:w-2/3">
            {/* Overview Section */}
            <section ref={overviewRef} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-6">{selectedHotel.description}</p>
              
              {/* Key Features */}
              {selectedHotel.features && selectedHotel.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedHotel.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
            
            {/* Rooms Section */}
            <section ref={roomsRef} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Rooms</h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p className="text-center text-gray-600">
                  Room information is available directly on the hotel's website.
                </p>
                {selectedHotel.website && (
                  <div className="mt-4 text-center">
                    <a 
                      href={selectedHotel.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visit Hotel Website</span>
                    </a>
                  </div>
                )}
              </div>
            </section>
            
            {/* Amenities Section */}
            <section ref={amenitiesRef} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    {amenityIcons[amenity.toLowerCase()] || <ShieldCheck className="w-5 h-5 text-blue-600" />}
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Location Section */}
            <section ref={locationRef} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">{area}, {island}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Coordinates: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-80 bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-600">Interactive map would be displayed here</p>
              </div>
            </section>
            
            {/* Reviews Section */}
            <section ref={reviewsRef} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{userRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.round(userRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Based on {reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    {/* Review bars would go here in a real implementation */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">Excellent</span>
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm w-8">70%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">Good</span>
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm w-8">20%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">Average</span>
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '7%' }}></div>
                      </div>
                      <span className="text-sm w-8">7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">Poor</span>
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div className="h-2 bg-orange-500 rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <span className="text-sm w-8">2%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">Terrible</span>
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div className="h-2 bg-red-500 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="text-sm w-8">1%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Review List Placeholder */}
              <div className="space-y-6">
                <p className="text-center text-gray-600">
                  Detailed reviews would be displayed here in a real implementation.
                </p>
              </div>
            </section>
          </div>
          
          {/* Right Column - Booking Widget */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Price Range</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold">€{selectedHotel.price_range.min}</span>
                  <span className="text-gray-600">- €{selectedHotel.price_range.max}</span>
                  <span className="text-sm text-gray-500 ml-1">/ night</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Price varies based on room type and occupancy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BedDouble className="w-4 h-4" />
                    <span>Multiple room types available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Prices may vary based on dates</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedHotel.website && (
                    <a 
                      href={selectedHotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors font-medium"
                    >
                      Book Now
                    </a>
                  )}
                  
                  <button
                    onClick={handlePriceAlert}
                    className="block w-full py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 text-center rounded-lg transition-colors font-medium"
                  >
                    Set Price Alert
                  </button>
                </div>
              </div>
              
              {/* Contact Info */}
              {selectedHotel.contact && (
                <div className="border-t border-gray-200 p-6">
                  <h3 className="font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {selectedHotel.contact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <a href={`tel:${selectedHotel.contact.phone}`} className="text-blue-600 hover:underline">
                          {selectedHotel.contact.phone}
                        </a>
                      </div>
                    )}
                    {selectedHotel.contact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <a href={`mailto:${selectedHotel.contact.email}`} className="text-blue-600 hover:underline">
                          {selectedHotel.contact.email}
                        </a>
                      </div>
                    )}
                    {selectedHotel.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <a 
                          href={selectedHotel.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Ready to Experience CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience {island}?</h2>
              <p className="text-white/90 mb-6">
                Find the perfect accommodation and discover the beauty of the Greek islands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/hotels/"
                  className="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center"
                >
                  Find Accommodations
                </a>
                <a 
                  href="/ferry-tickets/"
                  className="px-6 py-3 bg-blue-700 text-white border border-white/30 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
                >
                  How to get there
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/cta-image.jpg" 
                alt={`${island} Experience`} 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
