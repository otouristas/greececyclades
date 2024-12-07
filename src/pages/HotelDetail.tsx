import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';
import SEO from '../components/SEO';
import { generateHotelSEO } from '../utils/seo';
import { Hotel, HotelRoom } from '../types/hotel';

export default function HotelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedHotel, fetchHotelBySlug } = useHotelStore();

  useEffect(() => {
    console.log('HotelDetail: Got slug from params:', slug);
    if (slug) {
      fetchHotelBySlug(slug);
    }
  }, [slug]);

  if (!selectedHotel) {
    console.log('HotelDetail: No selected hotel, showing loading');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log('HotelDetail: Rendering hotel:', selectedHotel.name);

  const seoData = generateHotelSEO(selectedHotel);

  return (
    <>
      <SEO {...seoData} />
      
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={selectedHotel.images.main}
          alt={selectedHotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white mb-2">
              <MapPin className="h-5 w-5" />
              <span>{selectedHotel.location.area}, {selectedHotel.location.island}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{selectedHotel.name}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{selectedHotel.starRating} Stars</span>
              </div>
              <span>•</span>
              <span>{selectedHotel.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About the Hotel</h2>
              <p className="text-gray-600 mb-4">{selectedHotel.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedHotel.keyFeatures.map((feature, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Types */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Room Types</h2>
              <div className="grid gap-4">
                {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
                  selectedHotel.rooms.map((room) => (
                    <div key={room.id} className="bg-white border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{room.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Max occupancy: {room.maxOccupancy}</span>
                        <span className="font-semibold text-blue-600">€{room.pricePerNight}/night</span>
                      </div>
                    </div>
                  ))
                ) : selectedHotel.roomTypes && selectedHotel.roomTypes.length > 0 ? (
                  selectedHotel.roomTypes.map((roomType, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{roomType}</h3>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No room information available</div>
                )}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedHotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedHotel.images.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedHotel.name} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
              <div className="mb-4">
                <p className="text-gray-600">Starting from</p>
                <p className="text-3xl font-bold text-blue-600">€{selectedHotel.priceRange.min}</p>
                <p className="text-sm text-gray-500">per night</p>
              </div>
              <a
                href={selectedHotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
