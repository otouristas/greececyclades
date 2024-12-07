import { Hotel } from '../types/hotel';
import { Activity } from '../types/activity';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    tags: string[];
  };
}

const DEFAULT_KEYWORDS = [
  'cyclades',
  'greece',
  'greek islands',
  'travel',
  'vacation',
  'mediterranean'
];

export function generateHotelSEO(hotel: Hotel): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS,
    hotel.category.toLowerCase(),
    'hotels',
    'accommodation',
    hotel.location.island.toLowerCase(),
    hotel.location.area.toLowerCase(),
    ...hotel.keyFeatures,
    ...hotel.amenities
  ];

  return {
    title: `${hotel.name} | ${hotel.category} Hotel in ${hotel.location.island}`,
    description: hotel.description || hotel.shortDescription,
    keywords,
    ogType: 'website',
    ogImage: hotel.images.main,
    canonicalUrl: `/hotels/${generateSlug(hotel.name, hotel.location.island)}`
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

export function generateIslandsSEO(): SEOProps {
  return {
    title: 'Discover Cyclades Islands - Your Complete Travel Guide',
    description: 'Explore the stunning Cyclades archipelago. Find detailed guides for Santorini, Mykonos, and more. Plan your perfect Greek island getaway today.',
    keywords: [...DEFAULT_KEYWORDS, 'island guide', 'santorini', 'mykonos', 'naxos', 'paros', 'island hopping'],
    ogType: 'website',
    canonicalUrl: '/islands'
  };
}

export function generateIslandDetailSEO(islandName: string, description: string, image: string): SEOProps {
  return {
    title: `${islandName} Travel Guide | Discover the Best of Cyclades`,
    description: description || `Plan your perfect trip to ${islandName}. Discover the best hotels, activities, restaurants, and local tips for an unforgettable Cyclades experience.`,
    keywords: [...DEFAULT_KEYWORDS, islandName.toLowerCase(), 'travel guide', 'hotels', 'activities', 'restaurants', 'local tips'],
    ogType: 'article',
    canonicalUrl: `/islands/${islandName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    ogImage: image
  };
}

export function generateActivitiesSEO(): SEOProps {
  return {
    title: 'Cyclades Activities & Tours | Unforgettable Greek Island Experiences',
    description: 'Book authentic experiences in the Cyclades islands. From sailing cruises and wine tastings to hiking adventures and photography tours. Find your perfect island activity.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'activities',
      'tours',
      'experiences',
      'water sports',
      'cultural tours',
      'food tours',
      'wine tasting',
      'sailing',
      'hiking',
      'adventure'
    ],
    ogType: 'website',
    ogImage: '/images/activities-hero.jpg',
    canonicalUrl: '/activities'
  };
}

export function generateActivityDetailSEO(activity: Activity): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS,
    activity.category,
    'activities',
    'tours',
    'experiences',
    activity.island.toLowerCase(),
    activity.location.toLowerCase(),
    ...activity.tags || []
  ];

  return {
    title: `${activity.title} | ${activity.island} Activity`,
    description: activity.shortDescription,
    keywords,
    ogType: 'website',
    ogImage: activity.images.main
  };
}

export function generateRentACarSEO(): SEOProps {
  return {
    title: 'Car Rental in Cyclades Islands | Best Rates & Premium Fleet',
    description: 'Rent a car in the Cyclades islands. From compact cars to luxury vehicles, find the perfect car for your Greek island adventure. Best rates guaranteed.',
    keywords: [...DEFAULT_KEYWORDS, 'car rental', 'vehicle hire', 'auto rental', 'transportation', 'driving in greece', 'island transportation'],
    ogType: 'website',
    canonicalUrl: '/rent-a-car'
  };
}

export function generateSlug(name: string, island?: string): string {
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!island) {
    return nameSlug;
  }
  const islandSlug = island.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${nameSlug}-${islandSlug}`;
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
  category: string;
  island: string;
  image?: string;
  bookingUrl?: string;
}

interface BlogPost {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  featuredImage: string;
  date: string;
  lastModified?: string;
  author: string;
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
        "url": `https://greececyclades.com/hotels/${hotel.id}`,
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

export function generateAuthSEO(): SEOProps {
  return {
    title: 'Sign In or Create Account | Greece Cyclades',
    description: 'Sign in to your Greece Cyclades account or create a new one. Plan your perfect Greek island vacation with personalized recommendations and saved itineraries.',
    keywords: [...DEFAULT_KEYWORDS, 'sign in', 'login', 'create account', 'register', 'user account'],
    ogType: 'website',
    canonicalUrl: '/auth'
  };
}

export function generateSignInSEO(): SEOProps {
  return {
    title: 'Sign In | Greece Cyclades',
    description: 'Sign in to your Greece Cyclades account. Access your saved trips, bookings, and personalized travel recommendations.',
    keywords: [...DEFAULT_KEYWORDS, 'sign in', 'login', 'user account', 'access account'],
    ogType: 'website',
    canonicalUrl: '/signin'
  };
}

export function generateSignUpSEO(): SEOProps {
  return {
    title: 'Create Account | Greece Cyclades',
    description: 'Create your Greece Cyclades account. Start planning your dream vacation in the Greek islands with personalized recommendations and trip planning tools.',
    keywords: [...DEFAULT_KEYWORDS, 'create account', 'register', 'sign up', 'new user', 'join'],
    ogType: 'website',
    canonicalUrl: '/signup'
  };
}

export function generatePrivacySEO(): SEOProps {
  return {
    title: 'Privacy Policy | Greece Cyclades',
    description: 'Learn about how we collect, use, and protect your personal information when you use Greece Cyclades. Our commitment to your privacy and data security.',
    keywords: [...DEFAULT_KEYWORDS, 'privacy policy', 'data protection', 'personal information', 'privacy', 'security'],
    ogType: 'website',
    canonicalUrl: '/privacy'
  };
}

export function generateTermsSEO(): SEOProps {
  return {
    title: 'Terms of Service | Greece Cyclades',
    description: 'Read our terms of service and user agreement for Greece Cyclades. Understand your rights and responsibilities when using our travel planning services.',
    keywords: [...DEFAULT_KEYWORDS, 'terms of service', 'user agreement', 'legal', 'conditions', 'terms of use'],
    ogType: 'website',
    canonicalUrl: '/terms'
  };
}

export function generateMyTripsSEO(): SEOProps {
  return {
    title: 'My Trips | Greece Cyclades',
    description: 'View and manage your planned trips to the Cyclades islands. Access your personalized itineraries, bookings, and travel plans in one place.',
    keywords: [...DEFAULT_KEYWORDS, 'my trips', 'itinerary', 'travel plans', 'bookings', 'saved trips'],
    ogType: 'website',
    canonicalUrl: '/my-trips'
  };
}

export function generateSitemapSEO(): SEOProps {
  return {
    title: 'Sitemap | Greece Cyclades',
    description: 'Complete sitemap of Greece Cyclades. Find all our pages about Greek islands, hotels, activities, travel guides, and services.',
    keywords: [...DEFAULT_KEYWORDS, 'sitemap', 'pages', 'navigation', 'site structure', 'website map'],
    ogType: 'website',
    canonicalUrl: '/sitemap'
  };
}

export function generateBlogSEO(): SEOProps {
  return {
    title: 'Travel Blog | Greece Cyclades',
    description: 'Discover the best travel guides, tips, and stories about the Cyclades islands. Expert advice on islands, activities, accommodations, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'travel blog', 'travel guides', 'greek islands blog', 'cyclades travel tips'],
    ogType: 'website',
    canonicalUrl: '/blog'
  };
}

export function generateBlogPostSEO(post: BlogPost): SEOProps {
  return {
    title: `${post.title} | Greece Cyclades Blog`,
    description: post.description,
    keywords: [...DEFAULT_KEYWORDS, ...post.tags],
    ogType: 'article',
    canonicalUrl: `/blog/${post.slug}`,
    ogImage: post.featuredImage,
    article: {
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      author: post.author,
      tags: post.tags
    }
  };
}
