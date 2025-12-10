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
  'cyclades islands',
  'cyclades greece',
  'greek islands cyclades',
  'cyclades travel',
  'cyclades island hopping',
  'cyclades vacation',
  'cyclades tourism',
  'cyclades guide',
  'cyclades hotels',
  'cyclades ferries',
  'cyclades beaches',
  'cyclades activities',
  'best time to visit cyclades',
  'cyclades weather',
  'greek islands vacation'
];

export const HOME_SEO: SEOMetadata = {
  title: 'Discover Cyclades: AI-Powered Greek Islands Travel Guide 2025',
  description: 'Plan your perfect Cyclades adventure with AI. 25 island guides, ferry booking, trip planning & local insights. Santorini, Mykonos, Naxos & more. Your Greek islands journey starts here.',
  keywords: [...DEFAULT_KEYWORDS, 'Greek Holiday', 'Island Life', 'Mediterranean Vacation', 'Greece Tourism', 'Best Greek Islands'],
  ogTitle: 'Discover the Magic of the Cyclades Islands | Greece Travel Guide 2026',
  ogDescription: 'Your ultimate guide to exploring the stunning Cyclades islands. Find the perfect mix of beaches, culture, and adventure for your Greek island vacation.',
  ogImage: '/images/cyclades-overview.jpg'
};

export const ISLANDS_SEO: SEOMetadata = {
  title: '25 Best Cyclades Islands Ranked: Hidden Gems to Famous Hotspots [2025]',
  description: 'Discover which Cyclades island is perfect for YOU. Compare party islands, romantic escapes, family beaches & budget gems. Interactive island finder + ferry routes.',
  keywords: [...DEFAULT_KEYWORDS, 'Santorini', 'Mykonos', 'Naxos', 'Antiparos', 'Koufonisia', 'Kimolos', 'Syros', 'Andros', 'Tinos', 'Kea', 'Best Greek Islands', 'Island Guide'],
  ogTitle: 'Explore the Best Cyclades Islands | Greece Island Guide 2026',
  ogDescription: 'Discover which Cyclades island is perfect for you. Compare beaches, activities, and vibes of each unique Greek island.',
  ogImage: '/images/islands-comparison.jpg'
};

export const HOTELS_SEO: SEOMetadata = {
  title: 'Best Cyclades Hotels 2025: €50 Budget to €500 Luxury [Tested & Reviewed]',
  description: 'We stayed at 200+ hotels across 25 islands. See our honest picks by budget, style & island. Real reviews, real prices. Book direct for best rates.',
  keywords: [...DEFAULT_KEYWORDS, 'Luxury Hotels', 'Boutique Hotels', 'Beach Resorts', 'Villa Rentals', 'Hotel Booking', 'Best Places to Stay'],
  ogTitle: 'Luxury Hotels & Resorts in the Cyclades | Where to Stay 2026',
  ogDescription: 'Discover the most stunning hotels and resorts across the Cyclades islands. From luxury villas to boutique hotels.',
  ogImage: '/images/luxury-hotels.jpg'
};

export const ACTIVITIES_SEO: SEOMetadata = {
  title: 'Best Cyclades Activities 2025: Water Sports, Hiking, Tours & More',
  description: 'Top things to do in Cyclades: sailing, diving, hiking, cooking classes, wine tours. Book activities on any island with local experts. Unforgettable experiences await.',
  keywords: [...DEFAULT_KEYWORDS, 'Activities', 'Tours', 'Water Sports', 'Wine Tasting', 'Island Tours', 'Local Experiences', 'Things to Do'],
  ogTitle: 'Best Activities & Tours in the Cyclades | Local Experiences 2026',
  ogDescription: 'Experience the best of Greek island life with our curated selection of activities and tours.',
  ogImage: '/images/activities-cyclades.jpg'
};

export const TRIP_PLANNER_SEO: SEOMetadata = {
  title: 'AI Cyclades Trip Planner: Custom Itinerary in 60 Seconds',
  description: 'Tell us your style, we\'ll plan your perfect Greek island trip. AI-powered itineraries with ferry routes, hotels & activities. Free to use.',
  keywords: [...DEFAULT_KEYWORDS, 'Trip Planning', 'Itinerary', 'Island Hopping', 'Travel Tools', 'Vacation Planner'],
  ogTitle: 'Plan Your Perfect Cyclades Adventure | Interactive Trip Planner',
  ogDescription: 'Build your dream Greek island itinerary with our smart trip planner. Personalized recommendations for your perfect vacation.',
  ogImage: '/images/trip-planner.jpg'
};

export const CAR_RENTAL_SEO: SEOMetadata = {
  title: 'Car Rental in Cyclades 2026 | Best Deals & Local Companies | Driving Tips',
  description: 'Find the best car rental deals in the Cyclades islands. Compare trusted local companies, get essential driving tips, and book your perfect island exploration vehicle.',
  keywords: [...DEFAULT_KEYWORDS, 'Car Rental', 'Vehicle Hire', 'Driving in Greece', 'Transportation', 'Island Transport'],
  ogTitle: 'Rent a Car in the Cyclades | Best Deals & Local Tips 2026',
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
  title: 'Cyclades Island Guides 2025: Expert Tips & Local Secrets',
  description: 'In-depth guides for all 25 Cyclades islands. Santorini, Mykonos, Naxos, Paros & hidden gems. Insider tips, best beaches, hotels, and activities. Updated weekly.',
  keywords: [...DEFAULT_KEYWORDS, 'Island Guides', 'Travel Tips', 'Local Insights', 'Best Places', 'Island Hopping Guide'],
  ogTitle: 'Cyclades Island Travel Guides 2026 | Expert Local Tips',
  ogDescription: 'Plan your perfect Greek island vacation with our detailed Cyclades guides. Local insights, hidden gems, and expert travel tips for each unique island.',
  ogImage: '/images/guides-overview.jpg'
};

// Island-specific meta data for high CTR
const ISLAND_META: Record<string, { title: string; description: string }> = {
  santorini: {
    title: 'Santorini 2025: Beyond Oia – Local Secrets, Budget Tips & Hidden Spots',
    description: 'Skip the tourist traps. Insider guide to Santorini\'s best sunset spots (not Oia), affordable tavernas, secret beaches. By travelers who\'ve lived there.'
  },
  mykonos: {
    title: 'Mykonos 2025: Parties, Hidden Beaches & Where Smart Travelers Stay',
    description: 'Beyond the clubs: quiet beaches, authentic tavernas & boutique hotels the influencers don\'t show you. Complete Mykonos insider guide with maps.'
  },
  naxos: {
    title: 'Naxos 2025: Greece\'s Best-Kept Secret Island (Families Love It)',
    description: 'Why locals call Naxos the "complete island": amazing beaches, ancient ruins, cheese villages & half the price of Santorini. Family-friendly paradise.'
  },
  paros: {
    title: 'Paros 2025: Naoussa Nightlife, Golden Beaches & Authentic Greece',
    description: 'The island that has it all: Naoussa\'s charm, world-class windsurfing, traditional villages. Why Paros is the perfect first Greek island experience.'
  },
  milos: {
    title: 'Milos 2025: Lunar Beaches, Hidden Caves & Photographer\'s Paradise',
    description: 'Sarakiniko\'s moonscape, Kleftiko caves, 70+ unique beaches. The most photogenic Greek island you\'ve never heard of. Complete guide with secret spots.'
  },
  sifnos: {
    title: 'Sifnos 2025: Greece\'s Culinary Capital (Food Lover\'s Dream Island)',
    description: 'Where Greeks go to eat: legendary tavernas, pottery villages, hiking trails with sea views. Why Sifnos is the most authentic Cycladic experience.'
  },
  ios: {
    title: 'Ios 2025: Party Scene + Secret Side (Beyond the Nightlife)',
    description: 'Yes, the parties are legendary. But Ios also has deserted beaches, Homer\'s tomb & authentic villages. The complete guide for party AND peace.'
  },
  antiparos: {
    title: 'Antiparos 2025: Caves, Quiet Beaches & The Anti-Paros Experience',
    description: 'Tom Hanks\' secret Greek island: spectacular cave, empty beaches, peaceful vibes. Day trip or stay? Complete guide to Paros\' quieter neighbor.'
  },
  kimolos: {
    title: 'Kimolos 2025: The Greek Island That Time Forgot (Hidden Gem)',
    description: 'No nightlife, no luxury resorts, just pure Greece: white villages, empty beaches, friendly locals. The ultimate off-the-beaten-path Cyclades experience.'
  },
  folegandros: {
    title: 'Folegandros 2025: Dramatic Cliffs & Untouched Greek Beauty',
    description: 'The anti-Santorini: similar clifftop villages, zero crowds. Hiking paradise, authentic tavernas, romantic sunsets. For travelers who want peace.'
  },
  amorgos: {
    title: 'Amorgos 2025: Spiritual Retreats & The Big Blue Island',
    description: 'Where Luc Besson filmed The Big Blue. Dramatic landscapes, ancient monastery, yoga retreats. The most spiritual island in the Cyclades.'
  },
  syros: {
    title: 'Syros 2025: The Cyclades Capital Nobody Visits (Their Loss)',
    description: 'Year-round Greek island life: grand architecture, opera house, authentic culture. Skip the tourists, live like a local.'
  },
  tinos: {
    title: 'Tinos 2025: Art, Faith & 40 Traditional Villages',
    description: 'Greece\'s pilgrimage island with artist studios, marble villages & authentic tavernas. The most culturally rich Cycladic experience.'
  },
  andros: {
    title: 'Andros 2025: Hiking Paradise & Hidden Waterfalls',
    description: 'The greenest Cycladic island: 100+ km of trails, waterfalls, art museums, neoclassical mansions. For hikers and nature lovers.'
  },
  koufonisia: {
    title: 'Koufonisia 2025: Caribbean Beaches in the Aegean',
    description: 'Tiny islands with impossibly turquoise water. No cars, no stress, just pristine beaches. The Maldives of Greece.'
  },
  serifos: {
    title: 'Serifos 2025: Mining Heritage & Wild Beauty',
    description: 'Rugged landscapes, abandoned mines, quiet beaches. For adventurous travelers who want authentic Greece without tourists.'
  },
  kythnos: {
    title: 'Kythnos 2025: Thermal Springs & Weekend Athenian Escape',
    description: 'Hot springs, quiet beaches, authentic villages. Where Athenians go to escape on weekends. Zero tourists, 100% Greek.'
  },
  kea: {
    title: 'Kea 2025: Athens\' Secret Weekend Island (Just 1 Hour Away)',
    description: 'Ancient ruins, hiking trails, oak forests. The closest Cycladic island to Athens that tourists haven\'t discovered yet.'
  },
  sikinos: {
    title: 'Sikinos 2025: The Quietest Island in the Cyclades',
    description: 'One village, a handful of tavernas, empty beaches. For travelers seeking absolute peace and authentic Greece.'
  },
  anafi: {
    title: 'Anafi 2025: Greece\'s Most Remote Cycladic Island',
    description: 'End of the ferry line, beginning of adventure. Dramatic rock formations, pristine beaches, zero infrastructure. True escape.'
  },
  thirasia: {
    title: 'Thirasia 2025: Santorini\'s Secret Twin (Zero Crowds)',
    description: 'See Santorini\'s caldera without the crowds. Same volcanic landscape, traditional village, authentic tavernas. Day trip or overnight escape.'
  },
  schinoussa: {
    title: 'Schinoussa 2025: Tiny Paradise in the Small Cyclades',
    description: 'Just 200 residents, pristine beaches, no cars. The ultimate Greek island escape for those seeking complete peace.'
  },
  iraklia: {
    title: 'Iraklia 2025: Cave of Zeus & Untouched Beauty',
    description: 'The first Small Cyclades island from Naxos. Ancient cave, hiking trails, empty beaches. Perfect for adventurous souls.'
  },
  donousa: {
    title: 'Donousa 2025: The Easternmost Cyclades Escape',
    description: 'Crystal-clear waters, sandy beaches, one village. Greece\'s best-kept secret for beach lovers seeking solitude.'
  }
};

export function generateGuideSEO(islandName: string): SEOMetadata {
  const islandKey = islandName.toLowerCase();
  const customMeta = ISLAND_META[islandKey];
  
  if (customMeta) {
    return {
      title: customMeta.title,
      description: customMeta.description,
      keywords: [...DEFAULT_KEYWORDS, islandName, `${islandName} Guide`, `${islandName} Travel`, `${islandName} Vacation`, `${islandName} Tips`, `visit ${islandName}`],
      ogTitle: customMeta.title,
      ogDescription: customMeta.description,
      ogImage: `/images/guides/${islandKey}-guide.jpg`
    };
  }
  
  return {
    title: `${islandName} Complete Travel Guide 2025: Beaches, Hotels & Local Tips`,
    description: `Discover ${islandName} island: best beaches, where to stay, top restaurants, ferry info & practical travel tips. Expert 2025 guide with photos and insider recommendations.`,
    keywords: [...DEFAULT_KEYWORDS, islandName, `${islandName} Guide`, `${islandName} Travel`, `${islandName} Vacation`, `${islandName} Tips`],
    ogTitle: `${islandName} Island Guide 2025 | Expert Travel Tips & Local Insights`,
    ogDescription: `Everything you need to know about visiting ${islandName}. From best beaches to hidden gems, restaurants to activities - plan your perfect ${islandName} vacation.`,
    ogImage: `/images/guides/${islandKey}-guide.jpg`
  };
}

export function generateIslandSEO(islandName: string): SEOMetadata {
  const currentYear = 2026;
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
  const currentYear = 2026;
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
  const currentYear = 2026;
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
    title: 'Best Hotels in Cyclades Islands 2026 | Luxury Stays & Boutique Resorts',
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
        '@id': `https://discovercyclades.gr/hotels/${hotel.id}`,
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

export function generateTripPlannerSEO(params?: { island?: string; duration?: string; budget?: string }): SEOMetadata {
  const currentYear = 2026;
  
  if (params?.island) {
    return {
      title: `${params.island} Trip Planner ${currentYear} | Custom Itinerary & Travel Guide`,
      description: `Plan your perfect ${params.island} vacation with our interactive trip planner. Get personalized recommendations for hotels, activities, and dining based on your preferences and budget.`,
      keywords: [...DEFAULT_KEYWORDS, `${params.island} Trip Planner`, `${params.island} Itinerary`, `${params.island} Travel Planning`, 'Custom Trip'],
      ogTitle: `Plan Your Perfect ${params.island} Trip | Interactive Planner ${currentYear}`,
      ogDescription: `Create your ideal ${params.island} itinerary with our smart trip planner. Personalized recommendations for your perfect vacation.`,
      ogImage: `/images/trip-planner/${params.island.toLowerCase()}.jpg`
    };
  }
  
  return TRIP_PLANNER_SEO;
}

export const TOURISTAS_AI_SEO: SEOMetadata = {
  title: 'Touristas AI: Your Free Greek Islands Travel Oracle',
  description: 'The world\'s first AI trained specifically for Greek islands. Instant hotel recommendations, custom itineraries, ferry routes & insider tips. Ask anything!',
  keywords: [...DEFAULT_KEYWORDS, 'AI travel assistant', 'Cyclades AI', 'trip planner AI', 'hotel recommendations AI', 'island hopping planner', 'AI itinerary generator'],
  ogTitle: 'Touristas AI - The World\'s Smartest Cyclades Travel Assistant',
  ogDescription: 'Ask anything about Cyclades islands! Get personalized recommendations for hotels, restaurants, beaches, and activities powered by AI.',
  ogImage: '/images/touristas-ai.jpg'
};

export const TOURISTAS_AI_CHAT_SEO: SEOMetadata = {
  title: 'Chat with Touristas AI | Plan Your Cyclades Trip | Free AI Assistant',
  description: 'Chat live with Touristas AI to plan your perfect Cyclades vacation. Get instant answers about hotels, ferries, beaches, restaurants, and activities across all 24 Cyclades islands.',
  keywords: [...DEFAULT_KEYWORDS, 'AI chat', 'travel chat', 'Cyclades trip planning', 'AI recommendations', 'instant travel advice'],
  ogTitle: 'Chat with Touristas AI | Your Cyclades Travel Expert',
  ogDescription: 'Get personalized travel advice in seconds. Ask Touristas AI about anything related to Cyclades islands.',
  ogImage: '/images/touristas-ai-chat.jpg'
};

export const FERRY_SEO: SEOMetadata = {
  title: 'Cyclades Ferry Guide 2025: Routes, Prices & Booking Tips',
  description: 'Everything about Cyclades ferries: Athens to islands, island hopping routes, live schedules, booking tips. Compare operators & save money.',
  keywords: [...DEFAULT_KEYWORDS, 'cyclades ferries', 'ferry tickets greece', 'ferry to santorini', 'ferry to mykonos', 'island hopping ferry', 'greek ferry booking'],
  ogTitle: 'Book Cyclades Ferry Tickets | Compare Routes & Prices 2026',
  ogDescription: 'Find the best ferry connections between Cyclades islands. Compare schedules and book your tickets online.',
  ogImage: '/images/ferry-cyclades.jpg'
};

export const WEATHER_SEO: SEOMetadata = {
  title: 'Cyclades Weather 2025: Best Time to Visit by Month',
  description: 'Month-by-month weather guide: temperatures, sea warmth, crowds, prices. When to visit for beaches, hiking, or avoiding crowds. Expert advice.',
  keywords: [...DEFAULT_KEYWORDS, 'cyclades weather', 'best time to visit cyclades', 'cyclades climate', 'santorini weather', 'mykonos weather', 'greece weather'],
  ogTitle: 'Cyclades Weather & Best Time to Visit | Complete Guide 2026',
  ogDescription: 'Everything you need to know about Cyclades weather. Plan your perfect Greek island vacation.',
  ogImage: '/images/weather-cyclades.jpg'
};

// Comparison article SEO metadata
export const COMPARISON_SEO: Record<string, SEOMetadata> = {
  'santorini-vs-mykonos': {
    title: 'Santorini vs Mykonos 2025: Which Greek Island Is Right for You?',
    description: 'Honest comparison: beaches, nightlife, romance, budget. We\'ve visited both 10+ times. Here\'s how to choose between Greece\'s most famous islands.',
    keywords: [...DEFAULT_KEYWORDS, 'santorini vs mykonos', 'mykonos or santorini', 'best greek island', 'santorini or mykonos for couples'],
    ogTitle: 'Santorini vs Mykonos: The Ultimate Comparison Guide 2025',
    ogDescription: 'Can\'t decide between Santorini and Mykonos? Our detailed comparison helps you choose the perfect island for your trip.',
    ogImage: '/images/blog/santorini-vs-mykonos.jpg'
  },
  'paros-vs-naxos': {
    title: 'Paros vs Naxos 2025: The Real Difference (From Someone Who\'s Been)',
    description: 'Both amazing, but different vibes. Paros for nightlife & watersports, Naxos for families & authenticity. Complete comparison with our honest pick.',
    keywords: [...DEFAULT_KEYWORDS, 'paros vs naxos', 'naxos or paros', 'paros or naxos for families', 'best cyclades island'],
    ogTitle: 'Paros vs Naxos: Which Island Should You Choose in 2025?',
    ogDescription: 'Detailed comparison of Paros and Naxos islands. Beaches, villages, activities, and budget breakdowns.',
    ogImage: '/images/blog/paros-vs-naxos.jpg'
  },
  'milos-vs-santorini': {
    title: 'Milos vs Santorini 2025: Lunar Beaches vs Iconic Sunsets',
    description: 'The volcanic islands compared: Milos has 70+ beaches & no crowds. Santorini has famous views & romance. Which suits your style?',
    keywords: [...DEFAULT_KEYWORDS, 'milos vs santorini', 'santorini alternative', 'best volcanic island greece'],
    ogTitle: 'Milos vs Santorini: Beach Paradise vs Romantic Icon',
    ogDescription: 'Compare Greece\'s two volcanic islands. Find out which one is perfect for your vacation.',
    ogImage: '/images/blog/milos-vs-santorini.jpg'
  }
};

export function getComparisonSEO(slug: string): SEOMetadata | null {
  return COMPARISON_SEO[slug] || null;
}
