export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const DEFAULT_KEYWORDS = [
  'cyclades',
  'greece',
  'greek islands',
  'travel',
  'vacation',
  'mediterranean'
];

export function generateHotelSEO(hotelName: string, island: string, type: string): SEOProps {
  return {
    title: `${hotelName} - Luxury ${type} in ${island} | Greece Cyclades`,
    description: `Experience luxury stay at ${hotelName}, a beautiful ${type.toLowerCase()} in ${island}. Book your dream vacation in the Cyclades islands of Greece.`,
    keywords: ['luxury hotel', 'cyclades', 'greece', island.toLowerCase(), type.toLowerCase(), 'accommodation', 'vacation'],
    ogType: 'website',
    canonicalUrl: `/hotels/${generateSlug(hotelName, island)}`
  };
}

export function generateHotelsSEO(): SEOProps {
  return {
    title: 'Luxury Hotels in Cyclades Islands | Greece Cyclades',
    description: 'Discover and book luxury hotels, villas, and resorts across the Cyclades islands. Find your perfect stay in Santorini, Mykonos, Naxos, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'luxury hotels', 'villas', 'resorts', 'santorini', 'mykonos', 'naxos', 'accommodation'],
    ogType: 'website',
    canonicalUrl: '/hotels'
  };
}

export function generateHomeSEO(): SEOProps {
  return {
    title: 'Greece Cyclades | Your Guide to the Greek Islands',
    description: 'Plan your perfect trip to the Cyclades islands. Discover beautiful hotels, local experiences, and travel tips for Santorini, Mykonos, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'travel guide', 'island hopping', 'beaches', 'culture'],
    ogType: 'website',
    canonicalUrl: '/'
  };
}

export function generateTripPlannerSEO(): SEOProps {
  return {
    title: 'AI Trip Planner for Cyclades Islands | Greece Cyclades',
    description: 'Create your personalized Cyclades island-hopping itinerary with our AI-powered trip planner. Get custom recommendations for hotels, activities, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'trip planner', 'itinerary', 'island hopping', 'travel planning', 'AI travel'],
    ogType: 'website',
    canonicalUrl: '/trip-planner'
  };
}

export function generateProfileSEO(): SEOProps {
  return {
    title: 'My Profile | Greece Cyclades',
    description: 'Manage your Greece Cyclades profile, view saved trips, and customize your travel preferences.',
    keywords: [...DEFAULT_KEYWORDS, 'user profile', 'account', 'saved trips'],
    ogType: 'profile',
    canonicalUrl: '/profile'
  };
}

export function generateSlug(name: string, island: string): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${island.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function generateHotelPageTitle(name: string, type: string, island: string): string {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${name} - ${capitalizedType} in ${island}, Greece`;
}

interface HotelStructuredData {
  name: string;
  description: string;
  image: string[];
  priceRange: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  starRating: number;
  amenities: string[];
}

interface HotelListItem {
  id: string | number;
  name: string;
  description: string;
  type: string;
  island: string;
  image?: string;
}

export function generateHotelJsonLD(hotel: HotelStructuredData): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "image": hotel.image,
    "priceRange": hotel.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel.address.streetAddress,
      "addressLocality": hotel.address.addressLocality,
      "addressRegion": hotel.address.addressRegion,
      "addressCountry": hotel.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": hotel.geo.latitude,
      "longitude": hotel.geo.longitude
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.starRating
    },
    "amenityFeature": hotel.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    }))
  };

  return JSON.stringify(structuredData);
}

export function generateHotelsListingJsonLD(hotels: HotelListItem[]): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": hotels.map((hotel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Hotel",
        "name": hotel.name,
        "description": hotel.description,
        "image": hotel.image,
        "url": `https://greececyclades.com/hotels/${generateSlug(hotel.name, hotel.island)}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": hotel.island,
          "addressRegion": "Cyclades",
          "addressCountry": "Greece"
        }
      }
    })),
    "numberOfItems": hotels.length,
    "itemListOrder": "https://schema.org/ItemListUnordered"
  };

  return JSON.stringify(structuredData);
}

export function generateTripPlannerJsonLD(): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Greece Cyclades Trip Planner",
    "description": "AI-powered trip planning service for the Cyclades islands of Greece",
    "url": "https://greececyclades.com/trip-planner",
    "areaServed": {
      "@type": "Place",
      "name": "Cyclades Islands",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Cyclades",
        "addressCountry": "Greece"
      }
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Personalized Trip Planning",
        "description": "AI-powered personalized trip planning for the Cyclades islands, including itinerary creation, island recommendations, and activity suggestions"
      }
    }
  };

  return JSON.stringify(structuredData);
}
