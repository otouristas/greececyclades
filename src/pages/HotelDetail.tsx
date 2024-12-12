import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHotelStore } from '../store/hotelStore';
import { generateHotelSEO } from '../utils/seo';
import SEO from '../components/SEO';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { HotelRoom } from '../types/hotel';
import { MapPin, Star, Users, Wifi, Waves, UtensilsCrossed, Coffee, Car } from 'lucide-react';

type DateRange = [Date | null, Date | null];

export default function HotelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { selectedHotel, fetchHotelBySlug, loading, error } = useHotelStore();
  const [selectedDates, setSelectedDates] = useState<DateRange>([null, null]);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      console.log('Component: Fetching hotel with slug:', slug);
      fetchHotelBySlug(slug);
    }
  }, [slug]);

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

  const handleDateChange = (value: any) => {
    if (Array.isArray(value) && value.length === 2 && value[0] && value[1]) {
      setSelectedDates([value[0], value[1]]);
    }
  };

  const formatDate = (date: Date | null) => {
    return date ? format(date, 'MMM dd, yyyy') : '';
  };

  const amenityIcons: { [key: string]: any } = {
    'Wi-Fi': <Wifi className="w-6 h-6" />,
    'Swimming Pool': <Waves className="w-6 h-6" />,
    'Restaurant': <UtensilsCrossed className="w-6 h-6" />,
    'Breakfast': <Coffee className="w-6 h-6" />,
    'Parking': <Car className="w-6 h-6" />
  };

  const calculateNights = () => {
    if (selectedDates[0] && selectedDates[1]) {
      return Math.ceil((selectedDates[1].getTime() - selectedDates[0].getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <>
      <SEO {...generateHotelSEO(selectedHotel)} />
      
      {/* Image Gallery */}
      <div className="relative h-[70vh] bg-gray-900">
        <div className="absolute inset-0">
          {selectedHotel.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={selectedHotel.name}
              className={`w-full h-full object-cover opacity-90 ${activeImageIndex === index ? 'block' : 'hidden'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        {/* Image Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {selectedHotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeImageIndex ? 'bg-white scale-110' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Hotel Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-5xl font-bold mb-2">{selectedHotel.name}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {selectedHotel.location.area}, {selectedHotel.location.island}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-400" />
                    {selectedHotel.category} Star Hotel
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">From €{selectedHotel.priceRange.min}</div>
                <div className="text-sm">per night</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-bold mb-6">About the Hotel</h2>
              <p className="text-gray-600 leading-relaxed">{selectedHotel.description}</p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {selectedHotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    {amenityIcons[amenity] || null}
                    <span className="ml-3 text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rooms */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Available Rooms</h2>
              <div className="space-y-6">
                {selectedHotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                      selectedRoom?.id === room.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="relative h-48 md:h-full">
                        <img
                          src={room.image}
                          alt={room.type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:col-span-2">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
                            <p className="text-gray-600 mt-2">{room.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">€{room.price}</div>
                            <div className="text-sm text-gray-500">per night</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <Users className="w-5 h-5 mr-2" />
                          <span>Up to {room.maxOccupancy} guests</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Bed Type</div>
                            <div className="text-gray-900">{room.bedType}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Room Size</div>
                            <div className="text-gray-900">{room.size} m²</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {room.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedRoom(room)}
                          className={`w-full py-2 px-4 rounded ${
                            selectedRoom?.id === room.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          } transition-colors`}
                        >
                          {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Book Your Stay</h3>
                
                {/* Calendar */}
                <div className="mb-6">
                  <Calendar
                    selectRange
                    onChange={handleDateChange}
                    value={selectedDates}
                    minDate={new Date()}
                    className="w-full rounded-lg border"
                  />
                </div>

                {/* Booking Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Check-in</span>
                    <span className="font-semibold">{formatDate(selectedDates[0])}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Check-out</span>
                    <span className="font-semibold">{formatDate(selectedDates[1])}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Room Type</span>
                    <span className="font-semibold">{selectedRoom?.type || 'Not selected'}</span>
                  </div>
                  {selectedRoom && selectedDates[0] && selectedDates[1] && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Number of nights</span>
                        <span className="font-semibold">{calculateNights()} nights</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Price per night</span>
                        <span className="font-semibold">€{selectedRoom.price}</span>
                      </div>
                      <div className="flex justify-between items-center py-4">
                        <span className="text-lg font-bold">Total Price</span>
                        <span className="text-2xl font-bold text-blue-600">
                          €{selectedRoom.price * calculateNights()}
                        </span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        Book Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
