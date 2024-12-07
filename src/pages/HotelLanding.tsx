import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import HeroSection from '../components/hotels/HeroSection';
import Overview from '../components/hotels/Overview';
import Amenities from '../components/hotels/Amenities';
import Location from '../components/hotels/Location';
import Gallery from '../components/hotels/Gallery';
import BookingWidget from '../components/BookingWidget';
import LocalExperiences from '../components/hotels/LocalExperiences';
import { useHotelStore } from '../store/hotelStore';
import { generateHotelJsonLD } from '../utils/seo';
import FAQ from '../components/FAQ';
import { Hotel } from '../types/hotel';

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
    id: hotel.id || '',
    name: hotel.name || '',
    location: {
      island: hotel.location?.island || '',
      area: hotel.location?.area || '',
      coordinates: {
        latitude: hotel.location?.coordinates?.latitude || 0,
        longitude: hotel.location?.coordinates?.longitude || 0
      }
    },
    category: 'Resort',
    priceRange: {
      min: hotel.priceRange?.min || 0,
      max: hotel.priceRange?.max || 0,
      currency: hotel.priceRange?.currency || 'EUR'
    },
    starRating: hotel.starRating || 4,
    keyFeatures: hotel.keyFeatures || [],
    shortDescription: hotel.shortDescription || hotel.description || '',
    description: hotel.description || '',
    rooms: hotel.rooms || [],
    amenities: hotel.amenities || [],
    images: {
      main: '',
      gallery: []
    }
  };
}

export default function HotelLanding() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedHotel, fetchHotelBySlug } = useHotelStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  React.useEffect(() => {
    if (slug) {
      fetchHotelBySlug(slug);
    }
  }, [slug, fetchHotelBySlug]);

  if (!selectedHotel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const mappedHotel = mapHotelToViewType(selectedHotel);
  const hotelStructuredData = {
    name: mappedHotel.name,
    description: mappedHotel.description,
    image: mappedHotel.images.gallery,
    priceRange: getPriceRangeFromPrice(mappedHotel.priceRange.min),
    address: {
      streetAddress: mappedHotel.location.area,
      addressLocality: mappedHotel.location.island,
      addressRegion: 'Cyclades',
      addressCountry: 'Greece'
    },
    geo: {
      latitude: mappedHotel.location.coordinates?.latitude || 0,
      longitude: mappedHotel.location.coordinates?.longitude || 0
    },
    starRating: mappedHotel.starRating,
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
            <div className="mb-8">
              <Location hotel={mappedHotel} />
            </div>
            <div className="mb-8">
              <LocalExperiences hotel={mappedHotel} selectedDates={{ checkIn: '', checkOut: '' }} />
            </div>
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