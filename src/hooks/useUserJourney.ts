import { useState, useEffect, useCallback } from 'react';

// User journey tracking data structure
export interface UserJourneyData {
  // Referrer information
  referrer: string | null;
  referrerDomain: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  
  // User behavior signals
  searchIntent: string | null;
  priceRange: string | null;
  travelDates: { checkIn: string | null; checkOut: string | null };
  travelers: number | null;
  
  // Session data
  sessionId: string;
  firstVisit: string;
  lastVisit: string;
  pageViews: number;
  pagesVisited: string[];
  
  // Engagement signals
  searchQueries: string[];
  
  // Conversion funnel
  funnelStage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'conversion';
  viewedHotels: string[];
  savedHotels: string[];
  
  // External signals
  externalSearchTerms: string[];
  previousSites: string[];
}

// Cookie name
const JOURNEY_COOKIE = 'hs_user_journey';

// Generate unique session ID
const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Parse URL parameters
const parseUrlParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  if (typeof window === 'undefined') return params;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

// Extract domain from URL
const extractDomain = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
};

// Detect search intent from referrer and URL
const detectSearchIntent = (referrer: string | null, params: Record<string, string>): string | null => {
  const searchTerms: string[] = [];
  
  // Check URL parameters for search terms
  const searchParams = ['q', 'query', 'search', 'keyword', 'term'];
  searchParams.forEach(param => {
    if (params[param]) {
      searchTerms.push(params[param].toLowerCase());
    }
  });
  
  // Analyze referrer for common patterns
  if (referrer) {
    const lowerRef = referrer.toLowerCase();
    
    if (lowerRef.includes('booking.com') || lowerRef.includes('hotels.com') || lowerRef.includes('expedia')) {
      return 'hotel_booking';
    }
    if (lowerRef.includes('tripadvisor')) {
      return 'research';
    }
    if (lowerRef.includes('honeymoon') || lowerRef.includes('romantic')) {
      return 'honeymoon';
    }
    if (lowerRef.includes('family') || lowerRef.includes('kids')) {
      return 'family';
    }
    if (lowerRef.includes('budget') || lowerRef.includes('cheap')) {
      return 'budget';
    }
    if (lowerRef.includes('luxury') || lowerRef.includes('premium')) {
      return 'luxury';
    }
  }
  
  const combinedTerms = searchTerms.join(' ');
  if (combinedTerms.includes('honeymoon') || combinedTerms.includes('romantic')) return 'honeymoon';
  if (combinedTerms.includes('family') || combinedTerms.includes('kids')) return 'family';
  if (combinedTerms.includes('budget') || combinedTerms.includes('cheap')) return 'budget';
  if (combinedTerms.includes('luxury')) return 'luxury';
  if (combinedTerms.includes('beach')) return 'beach';
  if (combinedTerms.includes('cave')) return 'cave_hotel';
  
  return searchTerms.length > 0 ? searchTerms[0] : null;
};

// Detect price range from signals
const detectPriceRange = (referrer: string | null, params: Record<string, string>): string | null => {
  const signals = [referrer, ...Object.values(params)].filter(Boolean).join(' ').toLowerCase();
  
  if (signals.includes('budget') || signals.includes('cheap') || signals.includes('affordable')) {
    return 'budget';
  }
  if (signals.includes('luxury') || signals.includes('premium') || signals.includes('5-star')) {
    return 'luxury';
  }
  if (signals.includes('mid-range') || signals.includes('moderate')) {
    return 'mid-range';
  }
  
  return null;
};

// Get journey data from cookie
const getJourneyFromCookie = (): UserJourneyData | null => {
  if (typeof document === 'undefined') return null;
  try {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${JOURNEY_COOKIE}=`));
    
    if (cookie) {
      const value = cookie.split('=')[1];
      return JSON.parse(decodeURIComponent(value));
    }
  } catch (error) {
    console.error('Error reading journey cookie:', error);
  }
  return null;
};

// Save journey data to cookie
const saveJourneyToCookie = (data: UserJourneyData): void => {
  if (typeof document === 'undefined') return;
  try {
    const value = encodeURIComponent(JSON.stringify(data));
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${JOURNEY_COOKIE}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Error saving journey cookie:', error);
  }
};

// Initialize default journey data
const initializeJourneyData = (): UserJourneyData => {
  const params = parseUrlParams();
  const referrer = typeof document !== 'undefined' ? document.referrer || null : null;
  const referrerDomain = referrer ? extractDomain(referrer) : null;
  
  return {
    referrer,
    referrerDomain,
    utmSource: params.utm_source || null,
    utmMedium: params.utm_medium || null,
    utmCampaign: params.utm_campaign || null,
    searchIntent: detectSearchIntent(referrer, params),
    priceRange: detectPriceRange(referrer, params),
    travelDates: { checkIn: null, checkOut: null },
    travelers: null,
    sessionId: generateSessionId(),
    firstVisit: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    pageViews: 1,
    pagesVisited: typeof window !== 'undefined' ? [window.location.pathname] : [],
    searchQueries: [],
    funnelStage: 'awareness',
    viewedHotels: [],
    savedHotels: [],
    externalSearchTerms: params.q ? [params.q] : [],
    previousSites: referrerDomain ? [referrerDomain] : [],
  };
};

// Hook for tracking user journey
export function useUserJourney() {
  const [journeyData, setJourneyData] = useState<UserJourneyData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize journey data
  useEffect(() => {
    const existingData = getJourneyFromCookie();
    
    if (existingData) {
      const updatedData: UserJourneyData = {
        ...existingData,
        lastVisit: new Date().toISOString(),
        pageViews: existingData.pageViews + 1,
        pagesVisited: [...new Set([...existingData.pagesVisited, window.location.pathname])].slice(-50),
      };
      
      const currentReferrer = document.referrer;
      if (currentReferrer && currentReferrer !== existingData.referrer) {
        const domain = extractDomain(currentReferrer);
        if (domain && !updatedData.previousSites.includes(domain)) {
          updatedData.previousSites = [...updatedData.previousSites, domain].slice(-10);
        }
      }
      
      setJourneyData(updatedData);
      saveJourneyToCookie(updatedData);
    } else {
      const newData = initializeJourneyData();
      setJourneyData(newData);
      saveJourneyToCookie(newData);
    }
    
    setIsInitialized(true);
  }, []);

  // Track page view
  const trackPageView = useCallback((path: string) => {
    if (!journeyData) return;
    
    const updatedData: UserJourneyData = {
      ...journeyData,
      pageViews: journeyData.pageViews + 1,
      pagesVisited: [...new Set([...journeyData.pagesVisited, path])].slice(-50),
      lastVisit: new Date().toISOString(),
    };
    
    if (path.includes('/booking') || path.includes('/checkout')) {
      updatedData.funnelStage = 'intent';
    } else if (path.includes('/compare') || path.includes('/hotel/')) {
      updatedData.funnelStage = 'consideration';
    } else if (path.includes('/hotels') || path.includes('/locations')) {
      updatedData.funnelStage = 'interest';
    }
    
    setJourneyData(updatedData);
    saveJourneyToCookie(updatedData);
  }, [journeyData]);

  // Track hotel view
  const trackHotelView = useCallback((hotelId: string) => {
    if (!journeyData) return;
    
    const updatedData: UserJourneyData = {
      ...journeyData,
      viewedHotels: [...new Set([...journeyData.viewedHotels, hotelId])].slice(-20),
      funnelStage: journeyData.funnelStage === 'awareness' ? 'interest' : journeyData.funnelStage,
    };
    
    setJourneyData(updatedData);
    saveJourneyToCookie(updatedData);
  }, [journeyData]);

  // Track hotel save
  const trackHotelSave = useCallback((hotelId: string) => {
    if (!journeyData) return;
    
    const updatedData: UserJourneyData = {
      ...journeyData,
      savedHotels: [...new Set([...journeyData.savedHotels, hotelId])].slice(-20),
      funnelStage: 'consideration',
    };
    
    setJourneyData(updatedData);
    saveJourneyToCookie(updatedData);
  }, [journeyData]);

  // Track search query
  const trackSearch = useCallback((query: string) => {
    if (!journeyData) return;
    
    const updatedData: UserJourneyData = {
      ...journeyData,
      searchQueries: [...new Set([...journeyData.searchQueries, query.toLowerCase()])].slice(-20),
      searchIntent: detectSearchIntent(null, { q: query }) || journeyData.searchIntent,
    };
    
    const priceRange = detectPriceRange(null, { q: query });
    if (priceRange) {
      updatedData.priceRange = priceRange;
    }
    
    setJourneyData(updatedData);
    saveJourneyToCookie(updatedData);
  }, [journeyData]);

  // Track travel dates
  const trackTravelDates = useCallback((checkIn: string, checkOut: string) => {
    if (!journeyData) return;
    
    const updatedData: UserJourneyData = {
      ...journeyData,
      travelDates: { checkIn, checkOut },
      funnelStage: 'consideration',
    };
    
    setJourneyData(updatedData);
    saveJourneyToCookie(updatedData);
  }, [journeyData]);

  // Get personalization recommendations
  const getRecommendations = useCallback(() => {
    if (!journeyData) return null;
    
    return {
      suggestedPriceRange: journeyData.priceRange || 'mid-range',
      
      suggestedHotelTypes: (() => {
        const types: string[] = [];
        if (journeyData.searchIntent === 'honeymoon') types.push('romantic', 'luxury', 'cave');
        if (journeyData.searchIntent === 'family') types.push('family', 'resort', 'beach');
        if (journeyData.searchIntent === 'budget') types.push('budget', 'hostel', 'apartment');
        if (journeyData.searchIntent === 'luxury') types.push('luxury', 'villa', 'suite');
        if (journeyData.searchIntent === 'beach') types.push('beach', 'resort');
        if (journeyData.searchIntent === 'cave_hotel') types.push('cave', 'traditional');
        return types.length > 0 ? types : ['popular', 'recommended'];
      })(),
      
      suggestedLocations: (() => {
        if (journeyData.searchIntent === 'honeymoon') return ['oia', 'imerovigli'];
        if (journeyData.searchIntent === 'family') return ['kamari', 'perissa', 'fira'];
        if (journeyData.searchIntent === 'budget') return ['perissa', 'kamari', 'karterados'];
        if (journeyData.searchIntent === 'luxury') return ['oia', 'imerovigli', 'firostefani'];
        if (journeyData.searchIntent === 'beach') return ['kamari', 'perissa', 'akrotiri'];
        return ['fira', 'oia', 'imerovigli'];
      })(),
      
      welcomeMessage: (() => {
        if (journeyData.referrerDomain?.includes('booking.com')) {
          return "Looking for the perfect Santorini hotel? We'll help you find better deals!";
        }
        if (journeyData.searchIntent === 'honeymoon') {
          return "Planning a romantic getaway? Discover our handpicked honeymoon hotels.";
        }
        if (journeyData.searchIntent === 'family') {
          return "Traveling with family? Find kid-friendly hotels with pools and beaches.";
        }
        if (journeyData.searchIntent === 'budget') {
          return "Great choice! We have amazing budget-friendly options for you.";
        }
        return "Welcome to Hotels Santorini! Let us help you find your perfect stay.";
      })(),
      
      isReturningVisitor: journeyData.pageViews > 3,
      funnelStage: journeyData.funnelStage,
    };
  }, [journeyData]);

  // Clear journey data (GDPR compliance)
  const clearJourneyData = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.cookie = `${JOURNEY_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setJourneyData(null);
  }, []);

  return {
    journeyData,
    isInitialized,
    trackPageView,
    trackHotelView,
    trackHotelSave,
    trackSearch,
    trackTravelDates,
    getRecommendations,
    clearJourneyData,
  };
}

export default useUserJourney;
