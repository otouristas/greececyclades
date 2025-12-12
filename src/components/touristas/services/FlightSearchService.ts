/**
 * Flight Search Service for Touristas AI Chat
 * Searches flights using the flight-search Supabase function
 */

import { searchOnewayFlights, formatDuration } from '@/services/flightApiService';


export interface ChatFlightResult {
    id: string;
    airline: string;
    airlineCode?: string;
    departure: string;  // time
    arrival: string;    // time
    origin: string;     // airport code
    destination: string; // airport code
    duration: string;
    stops: number;
    price: number;
    currency?: string;
    bookingUrl?: string;
}

export interface FlightChatSearchParams {
    origin?: string;  // city name or airport code
    destination?: string;  // city name or airport code
    departureDate?: string;
    adults?: number;
}

/**
 * Map city/island names to IATA codes
 */
const cityToIata: Record<string, string> = {
    'santorini': 'JTR',
    'thira': 'JTR',
    'mykonos': 'JMK',
    'paros': 'PAS',
    'naxos': 'JNX',
    'milos': 'MLO',
    'athens': 'ATH',
    'thessaloniki': 'SKG',
    'london': 'LHR',
    'paris': 'CDG',
    'rome': 'FCO',
    'milan': 'MXP',
    'frankfurt': 'FRA',
    'amsterdam': 'AMS',
};

/**
 * Extract origin/destination from message
 */
export function extractFlightRouteFromMessage(message: string): { origin?: string; destination?: string } {
    const lower = message.toLowerCase();
    let origin: string | undefined;
    let destination: string | undefined;

    // Pattern: "from X to Y"
    const fromToMatch = lower.match(/from\s+(\w+)\s+to\s+(\w+)/);
    if (fromToMatch) {
        origin = cityToIata[fromToMatch[1]] || fromToMatch[1].toUpperCase();
        destination = cityToIata[fromToMatch[2]] || fromToMatch[2].toUpperCase();
        return { origin, destination };
    }

    // Pattern: "X to Y flight"
    const toMatch = lower.match(/(\w+)\s+to\s+(\w+)/);
    if (toMatch) {
        origin = cityToIata[toMatch[1]] || toMatch[1].toUpperCase();
        destination = cityToIata[toMatch[2]] || toMatch[2].toUpperCase();
        return { origin, destination };
    }

    // Check for Cyclades islands as destination (assume Athens as origin)
    for (const [city, code] of Object.entries(cityToIata)) {
        if (lower.includes(city) && ['JTR', 'JMK', 'PAS', 'JNX', 'MLO'].includes(code)) {
            destination = code;
            origin = 'ATH'; // Default from Athens
            break;
        }
    }

    return { origin, destination };
}

/**
 * Detect if message is flight-related
 */
export function isFlightRelatedQuery(message: string): boolean {
    const lower = message.toLowerCase();
    const flightKeywords = [
        'flight', 'flights', 'fly', 'plane', 'airplane', 'airline',
        'airport', 'flying', 'book a flight', 'direct flight',
        'cheap flight', 'flight to', 'flight from'
    ];

    return flightKeywords.some(kw => lower.includes(kw));
}

/**
 * Search flights for chat - simplified version
 */
export async function searchFlightsForChat(params: FlightChatSearchParams): Promise<ChatFlightResult[]> {
    try {
        console.log('🛫 [Chat] Searching flights with params:', params);

        if (!params.origin || !params.destination || !params.departureDate) {
            console.log('⚠️ Missing required flight params');
            return [];
        }

        const response = await searchOnewayFlights({
            departureAirport: params.origin,
            arrivalAirport: params.destination,
            departureDate: params.departureDate,
            adults: params.adults || 1,
            children: 0,
            infants: 0,
            cabinClass: 'Economy',
            currency: 'EUR'
        });

        if (!response.success || !response.flights) {
            console.log('⚠️ Flight search failed:', response.error);
            return [];
        }

        // Convert to chat-friendly format
        const chatFlights: ChatFlightResult[] = response.flights.slice(0, 5).map(f => ({
            id: f.id,
            airline: f.airline,
            airlineCode: f.airlineLogo?.split('/').pop()?.replace('.png', ''),
            departure: f.departure.time,
            arrival: f.arrival.time,
            origin: f.departure.airport,
            destination: f.arrival.airport,
            duration: formatDuration(f.duration),
            stops: f.stops,
            price: f.price,
            currency: f.currency,
            bookingUrl: f.bookingUrl
        }));

        console.log(`✅ [Chat] Found ${chatFlights.length} flights`);
        return chatFlights;

    } catch (error) {
        console.error('❌ [Chat] Flight search error:', error);
        return [];
    }
}

/**
 * Build flight search URL for "View All" link
 */
export function buildFlightSearchUrl(params: FlightChatSearchParams): string {
    const searchParams = new URLSearchParams();
    if (params.origin) searchParams.set('from', params.origin);
    if (params.destination) searchParams.set('to', params.destination);
    if (params.departureDate) searchParams.set('date', params.departureDate);
    if (params.adults) searchParams.set('adults', params.adults.toString());

    return `/flights?${searchParams.toString()}`;
}
