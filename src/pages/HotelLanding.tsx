import * as React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import HeroSection from '../components/hotels/HeroSection';
import Overview from '../components/hotels/Overview';
import Amenities from '../components/hotels/Amenities';
import Location from '../components/hotels/Location';
import Gallery from '../components/hotels/Gallery';
import BookingWidget from '../components/BookingWidget';
import { useHotelStore } from '../store/hotelStore';
import { generateHotelJsonLD } from '../utils/seo';
import { getIslandSlug } from '../utils/slugify';
import FAQ from '../components/FAQ';
import { Hotel } from '../types';

interface PriceObject {
  from: number;
  currency: string;
}

function getPriceRangeFromPrice(price: PriceObject | string | number): string {
  const numericPrice = typeof price === 'object' && 'from' in price 
    ? price.from 
    : typeof price === 'string' 
      ? parseInt(price.replace(/[^0-9]/g, '')) 
      : price;
  if (numericPrice <= 200) return '€';
  if (numericPrice <= 500) return '€€';
  if (numericPrice <= 800) return '€€€';
  return '€€€€';
}

function mapHotelToViewType(hotel: any): Hotel {
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.island,
    island: hotel.island,
    type: hotel.type || 'Hotel',
    image: Array.isArray(hotel.images) ? hotel.images[0] : hotel.image,
    images: Array.isArray(hotel.images) ? hotel.images : [hotel.image],
    price: typeof hotel.price === 'object' && 'from' in hotel.price
      ? hotel.price
      : {
          from: typeof hotel.price === 'number' 
            ? hotel.price 
            : typeof hotel.price === 'string'
              ? parseInt(hotel.price.replace(/[^0-9]/g, ''))
              : 0,
          currency: 'EUR'
        },
    priceRange: getPriceRangeFromPrice(hotel.price),
    rating: hotel.rating || 4,
    reviews: hotel.reviews || Math.floor(Math.random() * 500) + 100,
    amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
    description: hotel.description || '',
    address: hotel.address || hotel.island,
    coordinates: {
      lat: hotel.coordinates?.lat || 0,
      lng: hotel.coordinates?.lng || 0
    },
    features: Array.isArray(hotel.amenities) ? hotel.amenities : []
  };
}

export default function HotelLanding() {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const { hotels, selectedHotel, setSelectedHotel } = useHotelStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  React.useEffect(() => {
    if (slug && hotels.length > 0) {
      const hotel = hotels.find(
        hotel => getIslandSlug(hotel.name) === slug
      );
      if (hotel) {
        setSelectedHotel(hotel);
      } else {
        navigate('/hotels');
      }
    }
  }, [slug, hotels, navigate, setSelectedHotel]);

  if (!selectedHotel) return null;

  const mappedHotel = mapHotelToViewType(selectedHotel);
  const hotelStructuredData = {
    name: mappedHotel.name,
    description: mappedHotel.description,
    image: mappedHotel.images,
    priceRange: getPriceRangeFromPrice(mappedHotel.price),
    address: {
      streetAddress: mappedHotel.location,
      addressLocality: mappedHotel.island,
      addressRegion: 'Cyclades',
      addressCountry: 'Greece'
    },
    geo: {
      latitude: mappedHotel.coordinates.lat,
      longitude: mappedHotel.coordinates.lng
    },
    starRating: mappedHotel.rating,
    amenities: mappedHotel.amenities
  };

  return (
    <>
      <SEO
        title={`${selectedHotel.name} - Greece Cyclades Hotels`}
        description={selectedHotel.description}
        structuredData={generateHotelJsonLD(hotelStructuredData)}
      />
      <div className="min-h-screen bg-white">
        <HeroSection 
          hotel={mappedHotel} 
          onBookNow={() => setIsBookingOpen(true)} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">{selectedHotel.name}</h1>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
            <Overview hotel={mappedHotel} />
            <Amenities hotel={mappedHotel} />
            <Location hotel={mappedHotel} />
            <Gallery hotel={mappedHotel} />
            <FAQ />
          </div>
        </div>
        <BookingWidget
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          hotel={mappedHotel}
        />
      </div>
    </>
  );
}