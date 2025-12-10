/**
 * Hotel Marketplace Service
 * Client-side service for interacting with hotel marketplace APIs
 * Uses MakCorps API via Supabase Edge Functions for OTA price comparisons
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================
// TYPES
// ============================================

export interface MarketplaceVendor {
    name: string;
    price: string;
    priceNumeric: number;
}

export interface MarketplaceHotel {
    hotelId: number;
    name: string;
    geocode: {
        latitude: number;
        longitude: number;
    };
    telephone?: string;
    reviews: {
        rating: number;
        count: number;
    };
    vendors: MarketplaceVendor[];
    lowestPrice: number;
    lowestPriceVendor: string;
}

export interface MarketplaceSearchParams {
    destination: string;
    checkInDate: string;
    checkOutDate: string;
    adults?: number;
    children?: number;
    rooms?: number;
    currency?: string;
    pagination?: number;
}

export interface MarketplaceSearchResult {
    hotels: MarketplaceHotel[];
    metadata: {
        totalHotelCount: number;
        totalPageCount: number;
        currentPageHotelsCount: number;
        currentPageNumber: number;
    } | null;
    destination: string;
    searchParams: {
        cityId: string;
        checkInDate: string;
        checkOutDate: string;
        adults: number;
        children: number;
        rooms: number;
        currency: string;
        pagination: number;
    };
}

export interface MappingResult {
    type: 'HOTEL' | 'GEO' | 'ATTRACTION';
    id: string;
    name: string;
    coords?: string;
    address?: string;
    city?: string;
    region?: string;
    geoName?: string;
}

// Pre-defined Cyclades Islands for dropdown
export const CYCLADES_ISLANDS = [
    { id: 'santorini', name: 'Santorini', cityId: '189433' },
    { id: 'mykonos', name: 'Mykonos', cityId: '189410' },
    { id: 'naxos', name: 'Naxos', cityId: '189418' },
    { id: 'paros', name: 'Paros', cityId: '189421' },
    { id: 'milos', name: 'Milos', cityId: '189408' },
    { id: 'ios', name: 'Ios', cityId: '189400' },
    { id: 'sifnos', name: 'Sifnos', cityId: '189430' },
    { id: 'folegandros', name: 'Folegandros', cityId: '189393' },
    { id: 'amorgos', name: 'Amorgos', cityId: '189379' },
    { id: 'andros', name: 'Andros', cityId: '189380' },
    { id: 'tinos', name: 'Tinos', cityId: '189443' },
    { id: 'syros', name: 'Syros', cityId: '189439' },
    { id: 'kea', name: 'Kea', cityId: '189403' },
    { id: 'kythnos', name: 'Kythnos', cityId: '189405' },
    { id: 'serifos', name: 'Serifos', cityId: '189428' },
    { id: 'sikinos', name: 'Sikinos', cityId: '189431' },
    { id: 'antiparos', name: 'Antiparos', cityId: '189385' },
    { id: 'koufonisia', name: 'Koufonisia', cityId: '505030' },
    { id: 'schinoussa', name: 'Schinoussa', cityId: '2633945' },
    { id: 'iraklia', name: 'Iraklia', cityId: '2633946' },
    { id: 'donousa', name: 'Donousa', cityId: '2633947' },
    { id: 'kimolos', name: 'Kimolos', cityId: '189404' },
    { id: 'thirasia', name: 'Thirasia', cityId: '189442' },
    { id: 'anafi', name: 'Anafi', cityId: '189378' },
];

// OTA vendor colors for UI
export const OTA_COLORS: Record<string, string> = {
    'Booking.com': '#003580',
    'Expedia.com': '#00355F',
    'Hotels.com': '#D32F2F',
    'Priceline': '#0068EF',
    'Agoda.com': '#5392F9',
    'Trip.com': '#287DFA',
    'Orbitz.com': '#0066CC',
    'Hilton': '#104C97',
    'Marriott': '#B31B34',
    'Hyatt': '#C4A661',
};

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Search hotels with OTA price comparisons
 */
export async function searchMarketplaceHotels(
    params: MarketplaceSearchParams
): Promise<MarketplaceSearchResult> {
    try {
        const { data, error } = await supabase.functions.invoke('hotel-marketplace', {
            body: {
                destination: params.destination,
                checkInDate: params.checkInDate,
                checkOutDate: params.checkOutDate,
                adults: params.adults || 2,
                children: params.children || 0,
                rooms: params.rooms || 1,
                currency: params.currency || 'EUR',
                pagination: params.pagination || 0,
            },
        });

        if (error) {
            console.error('Hotel marketplace search error:', error);
            throw new Error(error.message || 'Failed to search hotels');
        }

        return data as MarketplaceSearchResult;
    } catch (error) {
        console.error('Error searching marketplace hotels:', error);
        throw error;
    }
}

/**
 * Lookup city/hotel IDs by name
 */
export async function lookupLocation(
    query: string,
    type: 'all' | 'city' | 'hotel' = 'all'
): Promise<MappingResult[]> {
    try {
        const { data, error } = await supabase.functions.invoke('hotel-mapping', {
            body: { query, type },
        });

        if (error) {
            console.error('Location lookup error:', error);
            throw new Error(error.message || 'Failed to lookup location');
        }

        return data.results as MappingResult[];
    } catch (error) {
        console.error('Error looking up location:', error);
        throw error;
    }
}

/**
 * Get OTA color for vendor name
 */
export function getOTAColor(vendorName: string): string {
    // Check exact match first
    if (OTA_COLORS[vendorName]) {
        return OTA_COLORS[vendorName];
    }

    // Check partial match
    for (const [key, color] of Object.entries(OTA_COLORS)) {
        if (vendorName.toLowerCase().includes(key.toLowerCase().split('.')[0])) {
            return color;
        }
    }

    // Default color
    return '#6B7280';
}

/**
 * Calculate savings percentage between best and worst price
 */
export function calculateSavings(vendors: MarketplaceVendor[]): number {
    if (vendors.length < 2) return 0;

    const sortedPrices = vendors.map(v => v.priceNumeric).sort((a, b) => a - b);
    const lowest = sortedPrices[0];
    const highest = sortedPrices[sortedPrices.length - 1];

    if (highest <= 0) return 0;

    return Math.round(((highest - lowest) / highest) * 100);
}

/**
 * Format price with currency symbol
 */
export function formatMarketplacePrice(price: number, currency: string = 'EUR'): string {
    const symbols: Record<string, string> = {
        EUR: '€',
        USD: '$',
        GBP: '£',
    };

    const symbol = symbols[currency] || currency;
    return `${symbol}${price.toLocaleString()}`;
}

/**
 * Generate Touristas AI prompt for hotel advice
 */
export function generateHotelAdvicePrompt(hotel: MarketplaceHotel, destination: string): string {
    const priceRange = hotel.vendors.length > 1
        ? `${hotel.vendors[hotel.vendors.length - 1].price} - ${hotel.vendors[0].price}`
        : hotel.vendors[0]?.price || 'N/A';

    const vendors = hotel.vendors.map(v => v.name).join(', ');

    return `I'm looking at ${hotel.name} in ${destination}. It has a ${hotel.reviews.rating}/5 rating (${hotel.reviews.count} reviews) and prices ranging from ${priceRange} across ${vendors}. 

Can you help me with:
1. Is this a good hotel choice for ${destination}?
2. Which booking platform would you recommend?
3. Any tips for getting the best deal?
4. What should I know about the area around this hotel?`;
}
