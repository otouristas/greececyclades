import { supabase } from '../lib/supabase';

// Types
export interface FlightSearchParams {
    departureAirport: string;
    arrivalAirport: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children: number;
    infants: number;
    cabinClass: 'Economy' | 'Business' | 'First' | 'Premium_Economy';
    currency: string;
}

export interface FlightSegment {
    flightNumber: string;
    departure: { airport: string; time: string };
    arrival: { airport: string; time: string };
    duration: number;
    airline: string;
}

export interface FlightLeg {
    airline: string;
    airlineLogo: string;
    departure: {
        airport: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        time: string;
        date: string;
    };
    duration: number;
    stops: number;
    segments: FlightSegment[];
}

export interface OnewayFlight {
    id: string;
    price: number;
    currency: string;
    airline: string;
    airlineLogo: string;
    departure: {
        airport: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        time: string;
        date: string;
    };
    duration: number;
    stops: number;
    segments: FlightSegment[];
    bookingUrl: string;
}

export interface RoundtripFlight {
    id: string;
    price: number;
    currency: string;
    outbound: FlightLeg;
    inbound: FlightLeg;
    bookingUrl: string;
}

export interface IataResult {
    code: string;
    name: string;
}

export interface FlightSearchResponse<T> {
    success: boolean;
    flights: T[];
    count: number;
    searchParams: Record<string, any>;
    error?: string;
}

export interface IataLookupResponse {
    success: boolean;
    results: IataResult[];
    count: number;
    error?: string;
}

// API Functions
export async function searchOnewayFlights(
    params: Omit<FlightSearchParams, 'returnDate'>
): Promise<FlightSearchResponse<OnewayFlight>> {
    try {
        const { data, error } = await supabase.functions.invoke('flight-search-oneway', {
            body: params,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data as FlightSearchResponse<OnewayFlight>;
    } catch (error) {
        console.error('Oneway flight search error:', error);
        return {
            success: false,
            flights: [],
            count: 0,
            searchParams: {},
            error: error instanceof Error ? error.message : 'Failed to search flights',
        };
    }
}

export async function searchRoundtripFlights(
    params: FlightSearchParams
): Promise<FlightSearchResponse<RoundtripFlight>> {
    try {
        if (!params.returnDate) {
            throw new Error('Return date is required for roundtrip search');
        }

        const { data, error } = await supabase.functions.invoke('flight-search-roundtrip', {
            body: params,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data as FlightSearchResponse<RoundtripFlight>;
    } catch (error) {
        console.error('Roundtrip flight search error:', error);
        return {
            success: false,
            flights: [],
            count: 0,
            searchParams: {},
            error: error instanceof Error ? error.message : 'Failed to search flights',
        };
    }
}

export async function lookupIataCode(
    name: string,
    type: 'airport' | 'airline' = 'airport'
): Promise<IataLookupResponse> {
    try {
        if (name.length < 2) {
            return { success: true, results: [], count: 0 };
        }

        const { data, error } = await supabase.functions.invoke('flight-iata-lookup', {
            body: { name, type },
        });

        if (error) {
            throw new Error(error.message);
        }

        return data as IataLookupResponse;
    } catch (error) {
        console.error('IATA lookup error:', error);
        return {
            success: false,
            results: [],
            count: 0,
            error: error instanceof Error ? error.message : 'Failed to lookup IATA codes',
        };
    }
}

// Utility functions
export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

export function formatPrice(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function getStopsLabel(stops: number): string {
    if (stops === 0) return 'Direct';
    if (stops === 1) return '1 stop';
    return `${stops} stops`;
}

// Common Greek Cyclades airports for quick selection
export const CYCLADES_AIRPORTS = [
    { code: 'JTR', name: 'Santorini (Thira) Airport' },
    { code: 'JMK', name: 'Mykonos Airport' },
    { code: 'PAS', name: 'Paros Airport' },
    { code: 'JNX', name: 'Naxos Airport' },
    { code: 'MLO', name: 'Milos Airport' },
    { code: 'ATH', name: 'Athens International Airport' },
    { code: 'SKG', name: 'Thessaloniki Airport' },
];

// Cabin class options
export const CABIN_CLASSES = [
    { value: 'Economy', label: 'Economy' },
    { value: 'Premium_Economy', label: 'Premium Economy' },
    { value: 'Business', label: 'Business' },
    { value: 'First', label: 'First Class' },
] as const;

// Currency options
export const CURRENCIES = [
    { value: 'EUR', label: '€ EUR', symbol: '€' },
    { value: 'USD', label: '$ USD', symbol: '$' },
    { value: 'GBP', label: '£ GBP', symbol: '£' },
] as const;
