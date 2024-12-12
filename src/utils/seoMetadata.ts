interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export const DEFAULT_KEYWORDS = [
  'Greece',
  'Cyclades',
  'Greek Islands',
  'Travel',
  'Vacation',
  'Mediterranean',
  'Island Hopping',
  'Greek Culture',
  'Greece Tourism',
  'Island Life',
  'Greek Beaches',
  'Greek Food',
  'Greek History',
  'Greek Architecture',
  'Greek Traditions'
];

export const HOME_SEO: SEOMetadata = {
  title: 'Greece Cyclades Islands | Ultimate Travel Guide 2025 | Plan Your Dream Vacation',
  description: 'Plan your perfect Cyclades vacation with our comprehensive 2025 guide. Discover luxury hotels, authentic experiences, and hidden gems across Santorini, Mykonos, and more. Expert tips for the perfect Greek island getaway.',
  keywords: [...DEFAULT_KEYWORDS, 'Greek Holiday', 'Island Life', 'Mediterranean Vacation', 'Greece Tourism', 'Best Greek Islands'],
  ogTitle: 'Discover the Magic of the Cyclades Islands | Greece Travel Guide 2025',
  ogDescription: 'Your ultimate guide to exploring the stunning Cyclades islands. Find the perfect mix of beaches, culture, and adventure for your Greek island vacation.',
  ogImage: '/images/cyclades-overview.jpg'
};

export const ISLANDS_SEO: SEOMetadata = {
  title: 'Cyclades Islands Greece 2025 | Complete Island Guide | Best Places to Visit',
  description: 'Compare and explore the best Cyclades islands - from iconic Santorini sunsets to Mykonos nightlife, Naxos beaches to Antiparos caves. Find your perfect Greek island with local insights and travel tips.',
  keywords: [...DEFAULT_KEYWORDS, 'Santorini', 'Mykonos', 'Naxos', 'Antiparos', 'Koufonisia', 'Kimolos', 'Syros', 'Andros', 'Tinos', 'Kea', 'Best Greek Islands', 'Island Guide'],
  ogTitle: 'Explore the Best Cyclades Islands | Greece Island Guide 2025',
  ogDescription: 'Discover which Cyclades island is perfect for you. Compare beaches, activities, and vibes of each unique Greek island.',
  ogImage: '/images/islands-comparison.jpg'
};

export const HOTELS_SEO: SEOMetadata = {
  title: 'Best Hotels in Cyclades Islands 2025 | Luxury Stays & Boutique Resorts | Top Rated',
  description: 'Find your perfect Cyclades accommodation - from clifftop luxury in Santorini to beachfront resorts in Mykonos. Compare prices, amenities, and authentic reviews for hotels across the Greek islands.',
  keywords: [...DEFAULT_KEYWORDS, 'Luxury Hotels', 'Boutique Hotels', 'Beach Resorts', 'Villa Rentals', 'Hotel Booking', 'Best Places to Stay'],
  ogTitle: 'Luxury Hotels & Resorts in the Cyclades | Where to Stay 2025',
  ogDescription: 'Discover the most stunning hotels and resorts across the Cyclades islands. From luxury villas to boutique hotels.',
  ogImage: '/images/luxury-hotels.jpg'
};

export const ACTIVITIES_SEO: SEOMetadata = {
  title: 'Top Things to Do in Cyclades 2025 | Activities, Tours & Authentic Experiences',
  description: 'Discover unforgettable Cyclades experiences - from wine tasting and cooking classes to sailing adventures and hidden beaches. Book authentic activities led by local guides across the Greek islands.',
  keywords: [...DEFAULT_KEYWORDS, 'Activities', 'Tours', 'Water Sports', 'Wine Tasting', 'Island Tours', 'Local Experiences', 'Things to Do'],
  ogTitle: 'Best Activities & Tours in the Cyclades | Local Experiences 2025',
  ogDescription: 'Experience the best of Greek island life with our curated selection of activities and tours.',
  ogImage: '/images/activities-cyclades.jpg'
};

export const TRIP_PLANNER_SEO: SEOMetadata = {
  title: 'Cyclades Trip Planner 2025 | Custom Island Hopping Itineraries | Expert Tips',
  description: 'Create your perfect Cyclades itinerary with our interactive trip planner. Get personalized recommendations based on your interests, time, and budget. Plan the ultimate Greek island-hopping adventure.',
  keywords: [...DEFAULT_KEYWORDS, 'Trip Planning', 'Itinerary', 'Island Hopping', 'Travel Tools', 'Vacation Planner'],
  ogTitle: 'Plan Your Perfect Cyclades Adventure | Interactive Trip Planner',
  ogDescription: 'Build your dream Greek island itinerary with our smart trip planner. Personalized recommendations for your perfect vacation.',
  ogImage: '/images/trip-planner.jpg'
};

export const CAR_RENTAL_SEO: SEOMetadata = {
  title: 'Car Rental in Cyclades 2025 | Best Deals & Local Companies | Driving Tips',
  description: 'Find the best car rental deals in the Cyclades islands. Compare trusted local companies, get essential driving tips, and book your perfect island exploration vehicle.',
  keywords: [...DEFAULT_KEYWORDS, 'Car Rental', 'Vehicle Hire', 'Driving in Greece', 'Transportation', 'Island Transport'],
  ogTitle: 'Rent a Car in the Cyclades | Best Deals & Local Tips 2025',
  ogDescription: 'Everything you need to know about renting and driving a car in the Cyclades islands.',
  ogImage: '/images/car-rental.jpg'
};

export const PRIVACY_SEO: SEOMetadata = {
  title: 'Privacy Policy | Greece Cyclades Travel Guide | Data Protection',
  description: 'Our commitment to protecting your privacy while planning your Cyclades vacation. Learn about our data collection, usage, and protection policies.',
  keywords: [...DEFAULT_KEYWORDS, 'Privacy Policy', 'Data Protection', 'Terms of Use', 'Legal'],
  ogTitle: 'Privacy Policy | Greece Cyclades Travel Guide',
  ogDescription: 'How we protect your privacy while helping you plan your perfect Greek island vacation.',
  ogImage: '/images/privacy-policy.jpg'
};

export const TERMS_SEO: SEOMetadata = {
  title: 'Terms of Service | Greece Cyclades Travel Guide | User Agreement',
  description: 'Read our terms of service to understand your rights and responsibilities when using our Cyclades travel planning platform.',
  keywords: [...DEFAULT_KEYWORDS, 'Terms of Service', 'User Agreement', 'Legal', 'Conditions'],
  ogTitle: 'Terms of Service | Greece Cyclades Travel Guide',
  ogDescription: 'Important information about using our Cyclades travel planning services.',
  ogImage: '/images/terms-service.jpg'
};

export const GUIDES_SEO: SEOMetadata = {
  title: 'Cyclades Island Guides 2025 | Expert Travel Tips & Local Insights',
  description: 'Comprehensive guides to the Cyclades islands. From Santorini to Mykonos, Paros to Naxos - discover insider tips, best beaches, hotels, and activities for your perfect Greek vacation.',
  keywords: [...DEFAULT_KEYWORDS, 'Island Guides', 'Travel Tips', 'Local Insights', 'Best Places', 'Island Hopping Guide'],
  ogTitle: 'Cyclades Island Travel Guides 2025 | Expert Local Tips',
  ogDescription: 'Plan your perfect Greek island vacation with our detailed Cyclades guides. Local insights, hidden gems, and expert travel tips for each unique island.',
  ogImage: '/images/guides-overview.jpg'
};

export function generateGuideSEO(islandName: string): SEOMetadata {
  const currentYear = 2025;
  return {
    title: `${islandName} Travel Guide ${currentYear} | Complete Island Guide & Tips`,
    description: `Plan your perfect ${islandName} vacation with our comprehensive ${currentYear} guide. Discover the best hotels, beaches, restaurants, and activities. Local insights and expert travel tips.`,
    keywords: [...DEFAULT_KEYWORDS, islandName, `${islandName} Guide`, `${islandName} Travel`, `${islandName} Vacation`, `${islandName} Tips`],
    ogTitle: `${islandName} Island Guide ${currentYear} | Expert Travel Tips & Local Insights`,
    ogDescription: `Everything you need to know about visiting ${islandName}. From best beaches to hidden gems, restaurants to activities - plan your perfect ${islandName} vacation.`,
    ogImage: `/images/guides/${islandName.toLowerCase()}-guide.jpg`
  };
}

export function generateIslandSEO(islandName: string): SEOMetadata {
  const currentYear = 2025;
  const formattedName = islandName.charAt(0).toUpperCase() + islandName.slice(1).toLowerCase();
  return {
    title: `Visit ${formattedName} Island | Greece Cyclades`,
    description: `Plan your perfect vacation to ${formattedName} island in the Cyclades. Discover beautiful beaches, traditional villages, local cuisine, and authentic experiences for ${currentYear}.`,
    keywords: [...DEFAULT_KEYWORDS, formattedName, `${formattedName} Island`, `Visit ${formattedName}`, `${formattedName} Holidays`, `${formattedName} Greece`],
    ogTitle: `Discover ${formattedName} Island | Your ${currentYear} Travel Guide`,
    ogDescription: `Experience the magic of ${formattedName} - from stunning beaches to charming villages. Find the best places to stay, eat, and explore.`,
    ogImage: `/images/islands/${islandName.toLowerCase()}-overview.jpg`
  };
}

export function generateHotelSEO(hotelName: string, location: string): SEOMetadata {
  const currentYear = 2025;
  return {
    title: `${hotelName} | Luxury Hotel in ${location} | Reviews & Best Rates ${currentYear}`,
    description: `Book your stay at ${hotelName} in ${location}. View photos, read reviews, and find the best rates for this stunning Cyclades accommodation. Experience Greek island luxury at its finest.`,
    keywords: [...DEFAULT_KEYWORDS, hotelName, `${location} Hotels`, 'Luxury Accommodation', 'Hotel Booking', `${location} Luxury Hotels`],
    ogTitle: `${hotelName} | Luxury Stay in ${location}`,
    ogDescription: `Experience luxury at ${hotelName} in ${location}. Find the best rates and book your perfect Cyclades getaway.`,
    ogImage: `/images/hotels/${hotelName.toLowerCase().replace(/\s+/g, '-')}.jpg`
  };
}

export function generateActivitySEO(activityName: string, location: string): SEOMetadata {
  const currentYear = 2025;
  return {
    title: `${activityName} in ${location} | Best Tours & Experiences ${currentYear} | Book Now`,
    description: `Experience the best ${activityName} in ${location}. Book authentic local experiences, read reviews, and get insider tips for making the most of your Cyclades adventure.`,
    keywords: [...DEFAULT_KEYWORDS, `${location} Activities`, `${location} Tours`, activityName, 'Book Activities', 'Local Experiences'],
    ogTitle: `${activityName} Experience in ${location} | Must-Do Activity`,
    ogDescription: `Don't miss this amazing ${activityName} experience in ${location}. Book now for unforgettable memories.`,
    ogImage: `/images/activities/${activityName.toLowerCase().replace(/\s+/g, '-')}.jpg`
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

export function generateHotelsSEO(): SEOMetadata {
  return {
    title: 'Best Hotels in Cyclades Islands 2025 | Luxury Stays & Boutique Resorts',
    description: 'Discover the finest hotels across the Cyclades islands. From luxury resorts to boutique stays, find your perfect accommodation in Santorini, Mykonos, Paros, and more.',
    keywords: [...DEFAULT_KEYWORDS, 'Luxury Hotels', 'Boutique Hotels', 'Beach Resorts', 'Cyclades Hotels', 'Greek Island Hotels'],
    ogTitle: 'Luxury Hotels & Resorts in Cyclades Islands | Greece',
    ogDescription: 'Find your perfect stay in the Cyclades. Browse our curated selection of luxury hotels, boutique resorts, and beachfront villas.',
    ogImage: '/images/hotels/luxury-hotel-cyclades.jpg'
  };
}

export function generateHotelsListingJsonLD(hotels: Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  island: string;
  image: string;
}>): string {
  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': hotels.map((hotel, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Hotel',
        '@id': `https://greececyclades.com/hotels/${hotel.id}`,
        'name': hotel.name,
        'description': hotel.description,
        'image': hotel.image,
        'category': hotel.category,
        'address': {
          '@type': 'PostalAddress',
          'addressRegion': hotel.island,
          'addressCountry': 'Greece'
        }
      }
    }))
  };

  return JSON.stringify(jsonLD);
}

export function generateSitemapSEO(): SEOMetadata {
  return {
    title: 'Sitemap | Greece Cyclades',
    description: 'Complete sitemap of Greece Cyclades website. Find all our pages about islands, hotels, activities, and travel guides.',
    keywords: [...DEFAULT_KEYWORDS, 'sitemap', 'website map', 'all pages', 'navigation'],
    ogType: 'website',
    ogImage: '/images/cyclades-overview.jpg',
    canonicalUrl: '/sitemap'
  };
}
