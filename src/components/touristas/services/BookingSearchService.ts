/**
 * Booking Search Service for Touristas AI Chat
 * Searches hotels using LiteAPI with vibe/semantic search support
 */

import { searchHotelRates, type Hotel, type SearchParams } from '@/lib/liteapi';

export interface ChatSearchParams {
    // Vibe search - natural language description
    vibeQuery?: string;
    // Destination search
    cityName?: string;
    countryCode?: string;
    // Dates (defaults to tomorrow + day after)
    checkin?: string;
    checkout?: string;
    // Guests
    adults?: number;
    children?: number;
    // Other
    currency?: string;
}

/**
 * Extract dates from user message
 * Looks for patterns like "July 20-25", "next weekend", "tomorrow"
 */
export function extractDatesFromMessage(message: string): { checkin?: string; checkout?: string } {
    const lower = message.toLowerCase();
    const today = new Date();

    // Helper to format date
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    // "next weekend"
    if (lower.includes('next weekend') || lower.includes('this weekend')) {
        const nextSat = new Date(today);
        const dayOfWeek = today.getDay();
        const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
        nextSat.setDate(today.getDate() + daysUntilSat);
        const nextSun = new Date(nextSat);
        nextSun.setDate(nextSat.getDate() + 1);
        return { checkin: formatDate(nextSat), checkout: formatDate(nextSun) };
    }

    // "tomorrow"
    if (lower.includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(tomorrow.getDate() + 1);
        return { checkin: formatDate(tomorrow), checkout: formatDate(dayAfter) };
    }

    // Month + day range: "July 20-25"
    const monthRangeMatch = message.match(/(\w+)\s+(\d{1,2})\s*[-–]\s*(\d{1,2})/i);
    if (monthRangeMatch) {
        const months: Record<string, number> = {
            january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
            july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
            jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };
        const monthName = monthRangeMatch[1].toLowerCase();
        const monthNum = months[monthName];
        if (monthNum !== undefined) {
            const year = today.getFullYear();
            const startDay = parseInt(monthRangeMatch[2]);
            const endDay = parseInt(monthRangeMatch[3]);
            const checkinDate = new Date(year, monthNum, startDay);
            const checkoutDate = new Date(year, monthNum, endDay);
            // If date is in past, assume next year
            if (checkinDate < today) {
                checkinDate.setFullYear(year + 1);
                checkoutDate.setFullYear(year + 1);
            }
            return { checkin: formatDate(checkinDate), checkout: formatDate(checkoutDate) };
        }
    }

    // No dates found - use defaults (tomorrow + 2 days)
    return {};
}

/**
 * Extract guest count from message
 */
export function extractGuestsFromMessage(message: string): { adults?: number; children?: number } {
    const lower = message.toLowerCase();

    // "for 2 adults" or "2 guests"
    const adultsMatch = lower.match(/(\d+)\s*(adults?|guests?|people|persons?)/);
    if (adultsMatch) {
        return { adults: parseInt(adultsMatch[1]) };
    }

    // "for a couple" or "romantic"
    if (lower.includes('couple') || lower.includes('romantic') || lower.includes('honeymoon')) {
        return { adults: 2 };
    }

    // "family"
    if (lower.includes('family')) {
        return { adults: 2, children: 2 };
    }

    return {};
}

/**
 * Detect if query should trigger vibe search vs destination search
 */
export function shouldUseVibeSearch(message: string): boolean {
    const lower = message.toLowerCase();

    // Vibe indicators - descriptive/emotional language
    const vibeIndicators = [
        'romantic', 'luxury', 'budget', 'cheap', 'quiet', 'peaceful',
        'party', 'nightlife', 'family', 'kid', 'children', 'pool',
        'view', 'sunset', 'caldera', 'beach', 'beachfront', 'infinity',
        'cave', 'boutique', 'traditional', 'modern', 'stylish',
        'spa', 'wellness', 'honeymoon', 'anniversary', 'vibe'
    ];

    return vibeIndicators.some(v => lower.includes(v));
}

/**
 * Search hotels for chat using LiteAPI
 * Limits results to 5 hotels for chat display
 */
export async function searchHotelsForChat(params: ChatSearchParams): Promise<Hotel[]> {
    try {
        console.log('🔍 [Chat] Searching hotels with params:', params);

        // Set default dates if not provided
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(tomorrow.getDate() + 1);

        const checkin = params.checkin || tomorrow.toISOString().split('T')[0];
        const checkout = params.checkout || dayAfter.toISOString().split('T')[0];

        // Build LiteAPI search params
        const searchParams: SearchParams = {
            checkin,
            checkout,
            occupancies: [{
                adults: params.adults || 2,
                children: params.children ? Array(params.children).fill(10) : undefined
            }],
            currency: params.currency || 'EUR',
            guestNationality: 'GR',
            limit: 5, // Limit for chat display
        };

        // Use vibe search or destination search
        if (params.vibeQuery) {
            searchParams.aiSearch = params.vibeQuery;
            console.log('🎯 [Chat] Using AI/vibe search:', params.vibeQuery);
        } else if (params.cityName && params.countryCode) {
            searchParams.cityName = params.cityName;
            searchParams.countryCode = params.countryCode;
        } else {
            // Default to Santorini
            searchParams.cityName = 'Santorini';
            searchParams.countryCode = 'GR';
        }

        // Call LiteAPI search
        const hotels = await searchHotelRates(searchParams);

        console.log(`✅ [Chat] Found ${hotels.length} hotels`);
        return hotels.slice(0, 5); // Ensure max 5 hotels

    } catch (error) {
        console.error('❌ [Chat] Hotel search error:', error);
        return []; // Return empty on error - don't break chat flow
    }
}

/**
 * Build booking search URL for "View All" link
 */
export function buildBookingSearchUrl(params: ChatSearchParams): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(tomorrow.getDate() + 1);

    const searchParams = new URLSearchParams();
    searchParams.set('checkin', params.checkin || tomorrow.toISOString().split('T')[0]);
    searchParams.set('checkout', params.checkout || dayAfter.toISOString().split('T')[0]);
    searchParams.set('occupancies', JSON.stringify([{ adults: params.adults || 2 }]));
    searchParams.set('currency', params.currency || 'EUR');
    searchParams.set('guestNationality', 'GR');

    if (params.vibeQuery) {
        searchParams.set('searchMode', 'vibe');
        searchParams.set('aiSearch', params.vibeQuery);
    } else {
        searchParams.set('searchMode', 'destination');
        searchParams.set('cityName', params.cityName || 'Santorini');
        searchParams.set('countryCode', params.countryCode || 'GR');
    }

    return `/book/search?${searchParams.toString()}`;
}
