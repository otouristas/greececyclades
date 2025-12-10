import { supabase } from '../lib/supabase';

/**
 * LiteAPI Place result from the Places Search API
 */
export interface LiteApiPlace {
    placeId: string;
    displayName: string;
    formattedAddress: string;
    types: string[];
    language: string;
}

/**
 * Response from the LiteAPI Places endpoint
 */
export interface PlacesSearchResponse {
    data: LiteApiPlace[];
}

/**
 * Search parameters for places lookup
 */
export interface PlacesSearchParams {
    textQuery: string;
    type?: string;  // e.g., 'locality', 'hotel', 'airport', 'locality,airport,hotel'
    language?: string;
    clientIP?: string;
}

/**
 * Cyclades island destinations with coordinates for map display
 */
export const CYCLADES_DESTINATIONS = [
    { id: 'santorini', name: 'Santorini', lat: 36.3932, lng: 25.4615, description: 'Iconic caldera views & sunsets' },
    { id: 'mykonos', name: 'Mykonos', lat: 37.4467, lng: 25.3289, description: 'Vibrant nightlife & beaches' },
    { id: 'naxos', name: 'Naxos', lat: 37.1036, lng: 25.3761, description: 'Largest Cycladic island' },
    { id: 'paros', name: 'Paros', lat: 37.0856, lng: 25.1520, description: 'Traditional villages & beaches' },
    { id: 'milos', name: 'Milos', lat: 36.7450, lng: 24.4250, description: 'Volcanic beaches & caves' },
    { id: 'ios', name: 'Ios', lat: 36.7231, lng: 25.2821, description: 'Beaches & vibrant nightlife' },
    { id: 'folegandros', name: 'Folegandros', lat: 36.6254, lng: 24.9133, description: 'Cliffside charm & tranquility' },
    { id: 'amorgos', name: 'Amorgos', lat: 36.8333, lng: 25.8833, description: 'Dramatic cliffs & monasteries' },
    { id: 'sifnos', name: 'Sifnos', lat: 36.9667, lng: 24.7167, description: 'Gastronomy & pottery' },
    { id: 'serifos', name: 'Serifos', lat: 37.1500, lng: 24.4833, description: 'Unspoiled beauty & mining heritage' },
    { id: 'andros', name: 'Andros', lat: 37.8500, lng: 24.8833, description: 'Neo-classical mansions & art' },
    { id: 'tinos', name: 'Tinos', lat: 37.5500, lng: 25.1667, description: 'Religious significance & dovecotes' },
    { id: 'syros', name: 'Syros', lat: 37.4333, lng: 24.9333, description: 'Capital of Cyclades & architecture' },
    { id: 'kea', name: 'Kea', lat: 37.6333, lng: 24.3333, description: 'Closest to Athens & hiking' },
    { id: 'kimolos', name: 'Kimolos', lat: 36.7833, lng: 24.5667, description: 'Quiet escape & white beaches' },
    { id: 'antiparos', name: 'Antiparos', lat: 37.0333, lng: 25.0833, description: 'Cave exploration & relaxation' },
    { id: 'koufonisia', name: 'Koufonisia', lat: 36.9333, lng: 25.6000, description: 'Small Cyclades paradise' },
    { id: 'donousa', name: 'Donousa', lat: 37.1000, lng: 25.8000, description: 'Remote & untouched beauty' },
    { id: 'iraklia', name: 'Iraklia', lat: 36.8500, lng: 25.4500, description: 'Peaceful & authentic' },
    { id: 'schinoussa', name: 'Schinoussa', lat: 36.8667, lng: 25.5167, description: 'Small island escape' },
] as const;

export type CycladesDestination = typeof CYCLADES_DESTINATIONS[number];

/**
 * Search for places using LiteAPI via Supabase Edge Function
 */
export async function searchPlaces(params: PlacesSearchParams): Promise<LiteApiPlace[]> {
    try {
        const { data, error } = await supabase.functions.invoke('liteapi-places', {
            body: params,
        });

        if (error) {
            console.error('Places search error:', error);
            throw new Error(error.message || 'Failed to search places');
        }

        return data?.data || [];
    } catch (err) {
        console.error('Places search failed:', err);
        throw err;
    }
}

/**
 * Search specifically for Cyclades destinations
 * Uses type filter for localities to get cities/islands
 */
export async function searchCycladesDestinations(query: string): Promise<LiteApiPlace[]> {
    // If the query is too short, return matching static destinations
    if (query.length < 2) {
        const lowerQuery = query.toLowerCase();
        return CYCLADES_DESTINATIONS
            .filter(d => d.name.toLowerCase().startsWith(lowerQuery))
            .slice(0, 5)
            .map(d => ({
                placeId: d.id,
                displayName: d.name,
                formattedAddress: `${d.name}, Cyclades, Greece`,
                types: ['locality', 'island'],
                language: 'en',
            }));
    }

    try {
        // Search for localities (cities/islands) with the query
        const places = await searchPlaces({
            textQuery: `${query} Cyclades Greece`,
            type: 'locality',
            language: 'en',
        });

        return places;
    } catch (err) {
        // Fallback to static destinations on error
        console.warn('API search failed, using static destinations');
        const lowerQuery = query.toLowerCase();
        return CYCLADES_DESTINATIONS
            .filter(d => d.name.toLowerCase().includes(lowerQuery))
            .slice(0, 5)
            .map(d => ({
                placeId: d.id,
                displayName: d.name,
                formattedAddress: `${d.name}, Cyclades, Greece`,
                types: ['locality', 'island'],
                language: 'en',
            }));
    }
}

/**
 * Get a destination by ID from static data
 */
export function getDestinationById(id: string): CycladesDestination | undefined {
    return CYCLADES_DESTINATIONS.find(d => d.id === id);
}

/**
 * Get all Cyclades destinations for map display
 */
export function getAllDestinations(): readonly CycladesDestination[] {
    return CYCLADES_DESTINATIONS;
}
