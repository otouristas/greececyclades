import { Activity } from '../types/activity';
import { SEOProps, ArticleSEO } from '../types/seo';
import { getIslandSlug } from './slugs';

export const DEFAULT_KEYWORDS = [
  'Greece',
  'Cyclades',
  'Greek Islands',
  'Travel',
  'Vacation',
  'Activities',
  'Experiences'
].join(', ');

export function generateActivitySEO(activity: Activity): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    activity.location,
    activity.island,
    activity.category,
    ...(activity.tags || []),
    activity.difficulty
  ].join(', ');

  // Use custom SEO meta if provided, otherwise generate default
  const title = activity.seoMeta?.title || `${activity.title} in ${activity.location} | Greece Cyclades`;
  const description = activity.seoMeta?.description || activity.shortDescription;
  const seoKeywords = activity.seoMeta?.keywords || keywords;

  return {
    title,
    description: description.substring(0, 160),
    keywords: seoKeywords,
    ogImage: activity.images.main,
    ogType: 'website',
    canonicalUrl: `/activities/${activity.slug}`
  };
}

export function generateActivitiesSEO(): SEOProps {
  return {
    title: 'Activities & Experiences in Cyclades Islands | Greece Cyclades',
    description: 'Discover amazing activities and experiences across the Cyclades islands. From water sports to cultural tours, find your perfect Greek island adventure.',
    keywords: DEFAULT_KEYWORDS,
    ogType: 'website',
    canonicalUrl: '/activities'
  };
}

export function generateHomeSEO(): SEOProps {
  return {
    title: 'Discover the Cyclades Islands | Greececyclades.com',
    description: 'Plan your perfect Greek island vacation with our comprehensive guide to the Cyclades. Discover hotels, activities, restaurants, and local experiences.',
    keywords: DEFAULT_KEYWORDS,
    ogType: 'website',
    canonicalUrl: '/'
  };
}

export function generateIslandSEO(island: string): SEOProps {
  const formattedIsland = island.charAt(0).toUpperCase() + island.slice(1).toLowerCase();
  const slug = getIslandSlug(island);
  
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    formattedIsland,
    'island guide',
    'travel guide'
  ].join(', ');

  return {
    title: `${formattedIsland} Travel Guide | Greece Cyclades`,
    description: `Discover the best of ${formattedIsland}. Find hotels, activities, restaurants, and local experiences on this beautiful Cycladic island.`,
    keywords,
    ogType: 'website',
    canonicalUrl: `/islands/${slug}`
  };
}

export function generateBlogSEO(post: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
}): SEOProps {
  const article: ArticleSEO = {
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
    tags: post.tags
  };

  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    ...post.tags
  ].join(', ');

  return {
    title: `${post.title} | Greece Cyclades Blog`,
    description: post.description.substring(0, 160),
    keywords,
    ogType: 'article',
    canonicalUrl: `/blog/${post.slug}`,
    article
  };
}

export function generateBlogPostSEO(post: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  image?: string;
}): SEOProps {
  const article: ArticleSEO = {
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
    tags: post.tags
  };

  return {
    title: `${post.title} | Greececyclades.com`,
    description: post.description,
    keywords: [...DEFAULT_KEYWORDS.split(', '), ...post.tags].join(', '),
    ogType: 'article',
    canonicalUrl: `/blog/${post.slug}`,
    ogImage: post.image,
    article
  };
}

export function generateBlogsSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'blog',
    'travel tips',
    'island life',
    'local guides'
  ].join(', ');

  return {
    title: 'Greece Cyclades Blog - Travel Tips & Island Life',
    description: 'Read our latest blog posts about traveling in the Cyclades islands. Get insider tips, local recommendations, and travel inspiration.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/blog'
  };
}

export function generateAuthSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'sign in',
    'login',
    'create account',
    'register',
    'user account'
  ].join(', ');

  return {
    title: 'Sign In or Create Account | Greece Cyclades',
    description: 'Sign in to your Greece Cyclades account or create a new one. Plan your perfect Greek island vacation with personalized recommendations and saved itineraries.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/auth'
  };
}

export function generateSignInSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'sign in',
    'login',
    'user account',
    'access account'
  ].join(', ');

  return {
    title: 'Sign In | Greece Cyclades',
    description: 'Sign in to your Greece Cyclades account. Access your saved trips, bookings, and personalized travel recommendations.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/signin'
  };
}

export function generateSignUpSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'create account',
    'register',
    'sign up',
    'new user',
    'join'
  ].join(', ');

  return {
    title: 'Create Account | Greece Cyclades',
    description: 'Create your Greece Cyclades account. Start planning your dream vacation in the Greek islands with personalized recommendations and trip planning tools.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/signup'
  };
}

export function generatePrivacySEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'privacy policy',
    'data protection',
    'personal information',
    'privacy',
    'security'
  ].join(', ');

  return {
    title: 'Privacy Policy | Greece Cyclades',
    description: 'Learn about how we collect, use, and protect your personal information when you use Greece Cyclades. Our commitment to your privacy and data security.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/privacy'
  };
}

export function generateTermsSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'terms of service',
    'user agreement',
    'legal',
    'conditions',
    'terms of use'
  ].join(', ');

  return {
    title: 'Terms of Service | Greece Cyclades',
    description: 'Read our terms of service and user agreement for Greece Cyclades. Understand your rights and responsibilities when using our travel planning services.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/terms'
  };
}

export function generateMyTripsSEO(): SEOProps {
  const keywords = [
    ...DEFAULT_KEYWORDS.split(', '),
    'my trips',
    'itinerary',
    'travel plans',
    'bookings',
    'saved trips'
  ].join(', ');

  return {
    title: 'My Trips | Greece Cyclades',
    description: 'View and manage your planned trips to the Cyclades islands. Access your personalized itineraries, bookings, and travel plans in one place.',
    keywords,
    ogType: 'website',
    canonicalUrl: '/my-trips'
  };
}

export function generateSitemapSEO(): SEOProps {
  return {
    title: 'Sitemap | Greece Cyclades',
    description: 'Navigate through our complete site structure. Find all pages, hotels, activities, and island guides in one place.',
    keywords: [
      ...DEFAULT_KEYWORDS.split(', '),
      'sitemap',
      'site structure',
      'navigation'
    ],
    ogType: 'website',
    canonicalUrl: '/sitemap'
  };
}

export function generateTripPlannerSEO(): SEOProps {
  return {
    title: "Plan Your 2025 Cyclades Island Hopping Trip | Interactive Trip Planner",
    description: "Create your perfect 2025 Greek island hopping itinerary with our interactive trip planner. Get personalized recommendations for islands, hotels, and activities.",
    keywords: [
      ...DEFAULT_KEYWORDS.split(', '),
      'trip planner',
      'island hopping itinerary',
      'travel planning',
      'greek islands vacation'
    ].join(', '),
    ogType: 'website',
    canonicalUrl: '/trip-planner'
  };
}

export function generateProfileSEO(): SEOProps {
  return {
    title: 'My Profile | Greece Cyclades',
    description: 'Manage your Greece Cyclades profile, view saved trips, and customize your travel preferences.',
    keywords: [...DEFAULT_KEYWORDS.split(', '), 'user profile', 'account', 'saved trips'].join(', '),
    ogType: 'profile',
    canonicalUrl: '/profile'
  };
}

export function generateIslandsSEO(): SEOProps {
  return {
    title: 'Discover Cyclades Islands - Your Complete Travel Guide',
    description: 'Explore the stunning Cyclades archipelago. Find detailed guides for Santorini, Mykonos, and more. Plan your perfect Greek island getaway today.',
    keywords: [...DEFAULT_KEYWORDS.split(', '), 'island guide', 'santorini', 'mykonos', 'naxos', 'paros', 'island hopping'].join(', '),
    ogType: 'website',
    canonicalUrl: '/islands'
  };
}

export function generateIslandDetailSEO(islandName: string, image: string): SEOProps {
  return {
    title: `Visit ${islandName} in Cyclades | Greececyclades.com`,
    description: `Discover the best of ${islandName}. Find hotels, activities, restaurants, and local experiences on this beautiful Cycladic island.`,
    keywords: `${DEFAULT_KEYWORDS}, ${islandName}, Greek Island, Island Guide`,
    ogImage: image,
    ogType: 'website',
    canonicalUrl: `/islands/${getIslandSlug(islandName)}`
  };
}

export function generateRentACarSEO(): SEOProps {
  const currentYear = new Date().getFullYear();
  
  return {
    title: `Rent a Car in Cyclades Islands ${currentYear} | Best Car Rental Deals`,
    description: `Find the perfect vehicle for your Greek island adventure. Compare cars, ATVs, scooters & more. Best prices, trusted providers, and instant booking for Cyclades islands.`,
    keywords: ['car rental cyclades', 'rent a car greek islands', 'vehicle rental greece', 'scooter rental cyclades', 'ATV rental greece'].join(', '),
    canonicalUrl: '/rent-a-car',
    ogImage: 'https://antiparosrentacar.com/datafiles/Antiparos%20n%20Paros%20Rent%20A%20Car.webp'
  };
}

export function generateVehicleDetailSEO(vehicle: { make: string; model: string; category: string; description: string; image: string }): SEOProps {
  const currentYear = new Date().getFullYear();
  const vehicleName = `${vehicle.make} ${vehicle.model}`;
  
  return {
    title: `Rent ${vehicleName} in Cyclades ${currentYear} | ${vehicle.category} Rental`,
    description: vehicle.description.slice(0, 160),
    keywords: [
      `${vehicleName.toLowerCase()} rental`,
      `rent ${vehicle.make.toLowerCase()}`,
      `${vehicle.category.toLowerCase()} rental cyclades`,
      'car hire greek islands'
    ].join(', '),
    canonicalUrl: `/rent-a-car/${getIslandSlug(vehicle.make, vehicle.model)}`,
    ogImage: vehicle.image
  };
}

export function generateIslandGuideSEO(islandName: string, image: string): SEOProps {
  return {
    title: `${islandName} Travel Guide 2025 | Greececyclades.com`,
    description: `Complete travel guide to ${islandName} for 2025. Discover the best beaches, hotels, restaurants, activities, and local tips for your perfect vacation.`,
    keywords: `${DEFAULT_KEYWORDS}, ${islandName}, travel guide, beaches, hotels, restaurants, activities`,
    ogImage: image,
    ogType: 'article',
    canonicalUrl: `/guides/${getIslandSlug(islandName)}`
  };
}

export function generateTripPlannerJsonLD(): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Greece Cyclades Trip Planner',
    description: 'AI-powered trip planning service for the Cyclades islands of Greece',
    url: 'https://greececyclades.com/trip-planner',
    areaServed: {
      '@type': 'Place',
      name: 'Cyclades Islands',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Cyclades',
        addressCountry: 'Greece'
      }
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Personalized Trip Planning',
        description: 'AI-powered personalized trip planning for the Cyclades islands, including itinerary creation, island recommendations, and activity suggestions'
      }
    }
  };

  return JSON.stringify(structuredData);
}
