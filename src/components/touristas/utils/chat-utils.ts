// Chat utilities for Cyclades Touristas AI
import type { Hotel } from '@/lib/liteapi';
import type { ChatFlightResult } from '../services/FlightSearchService';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    showHotels?: boolean;
    hotels?: any[];
    location?: string;
    preferences?: Record<string, string>;
    typing?: boolean;
    // LiteAPI hotel search results for chat display
    bookingHotels?: Hotel[];
    bookingSearchUrl?: string;
    // Flight search results for chat display
    chatFlights?: ChatFlightResult[];
    flightSearchUrl?: string;
}



// Cyclades Islands for detection
const CYCLADES_ISLANDS = [
    'santorini', 'mykonos', 'paros', 'naxos', 'milos', 'ios', 'folegandros',
    'syros', 'antiparos', 'serifos', 'sifnos', 'amorgos', 'andros', 'tinos',
    'kea', 'kythnos', 'kimolos', 'sikinos', 'anafi', 'koufonisia', 'iraklia',
    'schinoussa', 'donousa', 'thirasia'
];

// Santorini villages
const SANTORINI_LOCATIONS = [
    'oia', 'fira', 'imerovigli', 'firostefani', 'kamari', 'perissa',
    'perivolos', 'pyrgos', 'akrotiri', 'megalochori', 'emporio', 'vlychada',
    'karterados', 'messaria', 'vourvoulos', 'exo gonia'
];

// Mykonos areas
const MYKONOS_LOCATIONS = [
    'mykonos town', 'chora', 'ornos', 'psarou', 'platis gialos', 'paradise',
    'super paradise', 'agrari', 'elia', 'kalafatis', 'ano mera', 'tourlos'
];

// All locations
const ALL_LOCATIONS = [...CYCLADES_ISLANDS, ...SANTORINI_LOCATIONS, ...MYKONOS_LOCATIONS];

export const isHotelRelatedQuery = (message: string): boolean => {
    const hotelKeywords = [
        'hotel', 'hotels', 'accommodation', 'stay', 'room', 'rooms',
        'booking', 'book', 'reserve', 'availability', 'available',
        'where to stay', 'place to stay', 'lodging', 'resort', 'villa', 'villas',
        'guesthouse', 'pension', 'apartment', 'studio', 'suites'
    ];

    const lowerMessage = message.toLowerCase();

    // Check for hotel keywords
    if (hotelKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return true;
    }

    // Check if asking about a location (likely hotel intent)
    if (ALL_LOCATIONS.some(location => lowerMessage.includes(location))) {
        return true;
    }

    return false;
};

export const extractIslandFromMessage = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();

    for (const island of CYCLADES_ISLANDS) {
        if (lowerMessage.includes(island)) {
            return island.charAt(0).toUpperCase() + island.slice(1);
        }
    }

    return null;
};

export const extractLocationFromMessage = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();

    // Check Santorini locations
    for (const location of SANTORINI_LOCATIONS) {
        if (lowerMessage.includes(location)) {
            return location.charAt(0).toUpperCase() + location.slice(1);
        }
    }

    // Check Mykonos locations
    for (const location of MYKONOS_LOCATIONS) {
        if (lowerMessage.includes(location)) {
            return location.charAt(0).toUpperCase() + location.slice(1);
        }
    }

    return null;
};

export const extractAmenitiesFromMessage = (message: string): string[] => {
    const amenities = [
        'pool', 'swimming pool', 'infinity pool', 'private pool',
        'wifi', 'breakfast', 'parking', 'spa', 'gym', 'restaurant',
        'bar', 'beach', 'sea view', 'caldera view', 'sunset view',
        'balcony', 'terrace', 'jacuzzi', 'hot tub', 'air conditioning'
    ];

    const lowerMessage = message.toLowerCase();
    return amenities.filter(amenity => lowerMessage.includes(amenity));
};

export const extractUserPreferencesFromMessage = (message: string): Record<string, string> => {
    const preferences: Record<string, string> = {};
    const lowerMessage = message.toLowerCase();

    // Extract budget preferences
    if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
        preferences.budget = 'budget';
    } else if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive') || lowerMessage.includes('high-end') || lowerMessage.includes('5 star')) {
        preferences.budget = 'luxury';
    } else if (lowerMessage.includes('mid-range') || lowerMessage.includes('moderate')) {
        preferences.budget = 'mid-range';
    }

    // Extract trip type
    if (lowerMessage.includes('honeymoon') || lowerMessage.includes('romantic') || lowerMessage.includes('couple')) {
        preferences.tripType = 'romantic';
    } else if (lowerMessage.includes('family') || lowerMessage.includes('kids') || lowerMessage.includes('children')) {
        preferences.tripType = 'family';
    } else if (lowerMessage.includes('solo') || lowerMessage.includes('alone')) {
        preferences.tripType = 'solo';
    } else if (lowerMessage.includes('group') || lowerMessage.includes('friends')) {
        preferences.tripType = 'group';
    }

    // Extract group size
    const adults = lowerMessage.match(/(\d+)\s*adults?/);
    if (adults) preferences.adults = adults[1];

    const children = lowerMessage.match(/(\d+)\s*children?/);
    if (children) preferences.children = children[1];

    // Extract dates
    const datePatterns = [
        /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g,
        /(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}/gi
    ];

    for (const pattern of datePatterns) {
        const matches = message.match(pattern);
        if (matches && matches.length >= 2) {
            preferences.checkIn = matches[0];
            preferences.checkOut = matches[1];
            break;
        }
    }

    // Extract island
    const island = extractIslandFromMessage(message);
    if (island) preferences.island = island;

    // Extract location
    const location = extractLocationFromMessage(message);
    if (location) preferences.location = location;

    return preferences;
};

export const analyzeQueryIntent = (message: string): {
    type: 'hotel' | 'activity' | 'ferry' | 'restaurant' | 'itinerary' | 'general';
    confidence: number;
    entities: Record<string, string>;
} => {
    const lowerMessage = message.toLowerCase();
    let type: 'hotel' | 'activity' | 'ferry' | 'restaurant' | 'itinerary' | 'general' = 'general';
    let confidence = 0.5;
    const entities: Record<string, string> = {};

    // Hotel intent
    if (isHotelRelatedQuery(message)) {
        type = 'hotel';
        confidence = 0.9;
    }

    // Ferry intent
    if (lowerMessage.includes('ferry') || lowerMessage.includes('boat') ||
        lowerMessage.includes('schedule') || lowerMessage.includes('piraeus') ||
        lowerMessage.includes('travel between') || lowerMessage.includes('get to')) {
        type = 'ferry';
        confidence = 0.85;
    }

    // Restaurant intent
    if (lowerMessage.includes('restaurant') || lowerMessage.includes('food') ||
        lowerMessage.includes('eat') || lowerMessage.includes('dining') ||
        lowerMessage.includes('cuisine') || lowerMessage.includes('taverna')) {
        type = 'restaurant';
        confidence = 0.85;
    }

    // Activity intent
    if (lowerMessage.includes('activity') || lowerMessage.includes('activities') ||
        lowerMessage.includes('things to do') || lowerMessage.includes('tour') ||
        lowerMessage.includes('experience') || lowerMessage.includes('excursion') ||
        lowerMessage.includes('beach') || lowerMessage.includes('sunset') ||
        lowerMessage.includes('cruise') || lowerMessage.includes('sailing')) {
        type = 'activity';
        confidence = 0.8;
    }

    // Itinerary intent
    if (lowerMessage.includes('itinerary') || lowerMessage.includes('plan') ||
        lowerMessage.includes('day trip') || lowerMessage.includes('schedule') ||
        lowerMessage.match(/\d+\s*day/i) || lowerMessage.includes('week')) {
        type = 'itinerary';
        confidence = 0.85;
    }

    // Extract entities
    const island = extractIslandFromMessage(message);
    if (island) entities.island = island;

    const location = extractLocationFromMessage(message);
    if (location) entities.location = location;

    const amenities = extractAmenitiesFromMessage(message);
    if (amenities.length > 0) entities.amenities = amenities.join(', ');

    return { type, confidence, entities };
};

// Quick action categories for the chat UI
export const quickCategories = [
    { icon: 'Hotel', label: 'Hotels', color: 'from-blue-500 to-blue-600', prompt: 'Find me the best hotels in Santorini' },
    { icon: 'MapPin', label: 'Islands', color: 'from-emerald-500 to-emerald-600', prompt: 'Compare Santorini vs Mykonos vs Paros' },
    { icon: 'Ship', label: 'Ferries', color: 'from-cyan-500 to-cyan-600', prompt: 'Show me ferry schedules from Athens to Santorini' },
    { icon: 'UtensilsCrossed', label: 'Dining', color: 'from-orange-500 to-orange-600', prompt: 'Best restaurants in Mykonos' },
    { icon: 'Camera', label: 'Activities', color: 'from-purple-500 to-purple-600', prompt: 'Top things to do in the Cyclades' },
    { icon: 'Heart', label: 'Romance', color: 'from-pink-500 to-pink-600', prompt: 'Plan a romantic honeymoon in the Greek islands' },
];

// Welcome suggestions
export const welcomeSuggestions = [
    { text: 'Luxury cave hotel in Oia with infinity pool', category: 'hotels', icon: 'Hotel' },
    { text: 'Best sunset spots and photo locations', category: 'experience', icon: 'Sun' },
    { text: 'Plan my 7-day Cyclades island hopping', category: 'itinerary', icon: 'Heart' },
    { text: 'Compare Santorini villages for families', category: 'areas', icon: 'MapPin' },
    { text: 'Wine tours and vineyard experiences', category: 'activities', icon: 'UtensilsCrossed' },
    { text: 'Ferry from Athens - times and prices', category: 'transport', icon: 'Ship' },
];
