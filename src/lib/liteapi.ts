/**
 * LiteAPI Client Library
 * Handles all communication with LiteAPI through Supabase Edge Functions
 */

import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';

// Get Supabase URL from the client
const getSupabaseFunctionsUrl = () => {
  return `${SUPABASE_URL}/functions/v1`;
};

// Types
export interface Occupancy {
  adults: number;
  children?: number[];
}

export interface SearchParams {
  // Required
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  occupancies: Occupancy[];
  
  // Optional base settings
  currency?: string;
  guestNationality?: string;
  
  // Location search methods (at least one required)
  countryCode?: string; // e.g., 'GR' for Greece
  cityName?: string; // e.g., 'Santorini'
  placeId?: string;
  hotelIds?: string[];
  aiSearch?: string; // AI-powered natural language search
  iataCode?: string; // Airport IATA code (e.g., 'JFK', 'LAX')
  latitude?: number; // Geo-search latitude
  longitude?: number; // Geo-search longitude
  radius?: number; // Search radius in meters (for geo-search)
  
  // Rate/room options
  maxRatesPerHotel?: number;
  limit?: number; // Limit number of hotels returned (for pagination/cost control)
  offset?: number; // Pagination offset
  timeout?: number; // Request timeout in seconds (recommended 6-12)
  
  // Filtering options
  boardType?: 'RO' | 'BB' | 'HB' | 'FB' | 'AI'; // Room Only, Bed & Breakfast, Half Board, Full Board, All Inclusive
  refundableRatesOnly?: boolean; // Only show refundable rates
  starRating?: number[]; // Array of star ratings e.g. [4, 5]
  minRating?: number; // Minimum guest rating (0-5 scale)
  minReviewsCount?: number; // Minimum number of reviews
  hotelName?: string; // Search by hotel name
  hotelTypeIds?: number[]; // Filter by hotel type IDs
  chainIds?: number[]; // Filter by hotel chain IDs
  facilities?: number[]; // Filter by facility IDs
  strictFacilityFiltering?: boolean; // Require ALL facilities
  advancedAccessibilityOnly?: boolean; // Only accessible hotels
  zip?: string; // Filter by zip code
  
  // Sorting
  sort?: Array<{
    field: 'price' | 'top_picks';
    direction: 'ascending' | 'descending';
  }>;
}

export interface Place {
  placeId: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  types: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface HotelRate {
  hotelId: string;
  offerId: string;
  mappedRoomId: number;
  name: string;
  boardName: string;
  boardCode: string;
  retailRate: {
    total: Array<{ amount: number; currency: string }>;
    taxesAndFees: Array<{ included: boolean; amount: number; currency: string }>;
  };
  cancellationPolicies: {
    refundableTag: 'RFN' | 'NRFN';
    cancelPolicyInfos?: Array<{
      cancelTime: string;
      amount: number;
      currency: string;
      type: string;
    }>;
  };
}

export interface Hotel {
  id: string;
  name: string;
  hotelDescription: string;
  checkin: string;
  checkout: string;
  currency: string;
  lat: number;
  lon: number;
  address: string;
  zip: string;
  city: string;
  countryCode: string;
  images: Array<{ url: string }>;
  rating: number;
  rates: HotelRate[];
}

export interface PrebookResponse {
  data: {
    prebookId: string;
    hotelId: string;
    offerId: string;
    transactionId: string;
    secretKey: string;
    cancellationPolicies: any;
    price: {
      total: { amount: number; currency: string };
    };
    room: {
      name: string;
      boardName: string;
    };
  };
}

export interface BookingGuest {
  occupancyNumber: number;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface BookingHolder {
  firstName: string;
  lastName: string;
  email: string;
}

export interface BookingResponse {
  data: {
    bookingId: string;
    clientReference: string;
    status: string;
    hotelConfirmationCode: string;
    checkin: string;
    checkout: string;
    hotel: {
      name: string;
      address: string;
      city: string;
      countryCode: string;
    };
    bookedRooms: Array<{
      roomType: string;
      adults: number;
      children: number;
      price: { amount: number; currency: string };
    }>;
  };
}

/**
 * Search for places using Google Places API
 */
export async function searchPlaces(textQuery: string): Promise<Place[]> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({ textQuery }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to search places');
  }

  const data = await response.json();
  return data.data?.places || [];
}

/**
 * Search for hotel rates with streaming support
 */
export async function searchHotelRatesStream(
  params: SearchParams,
  onChunk: (hotels: Hotel[]) => void
): Promise<Hotel[]> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-hotel-rates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      checkin: params.checkin,
      checkout: params.checkout,
      occupancies: params.occupancies,
      currency: params.currency || 'EUR',
      guestNationality: params.guestNationality || 'GR',
      countryCode: params.countryCode,
      cityName: params.cityName,
      placeId: params.placeId,
      hotelIds: params.hotelIds,
      aiSearch: params.aiSearch,
      iataCode: params.iataCode,
      roomMapping: true,
      maxRatesPerHotel: params.maxRatesPerHotel || 10,
      includeHotelData: true,
      stream: true, // Enable streaming
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('LiteAPI stream error:', error);
    throw new Error(error.error?.message || error.error || 'Failed to stream hotel rates');
  }

  const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const allHotels: Hotel[] = [];
  const hotelMap = new Map<string, Hotel>();
  let messageBuffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    messageBuffer += value;
    const messages = messageBuffer.split('\n\n');

    for (let i = 0; i < messages.length - 1; i++) {
      const message = messages[i].trim();
      if (message.startsWith('data: ')) {
        const data = message.slice(6); // Remove "data: " prefix
        
        if (data === '[DONE]') {
          console.log('Stream complete!');
          continue;
        }

        try {
          const dataJson = JSON.parse(data);

          // Handle rates chunks
          if (dataJson.rates && Array.isArray(dataJson.rates)) {
            for (const rateChunk of dataJson.rates) {
              const hotelId = rateChunk.hotelId;
              if (!hotelMap.has(hotelId)) {
                hotelMap.set(hotelId, {
                  id: hotelId,
                  name: rateChunk.hotelName || 'Unknown Hotel',
                  hotelDescription: '',
                  checkin: params.checkin,
                  checkout: params.checkout,
                  currency: params.currency || 'EUR',
                  lat: 0,
                  lon: 0,
                  address: '',
                  zip: '',
                  city: '',
                  countryCode: '',
                  images: [],
                  rating: 0,
                  rates: [],
                });
              }
              
              const hotel = hotelMap.get(hotelId)!;
              const rates = rateChunk.roomTypes?.flatMap((rt: any) => rt.rates || []) || [];
              hotel.rates.push(...rates);
            }
          }

          // Handle hotels summary chunk
          if (dataJson.hotels && Array.isArray(dataJson.hotels)) {
            for (const hotelData of dataJson.hotels) {
              const hotelId = hotelData.id;
              if (hotelMap.has(hotelId)) {
                const hotel = hotelMap.get(hotelId)!;
                hotel.name = hotelData.name || hotel.name;
                if (hotelData.photo) {
                  hotel.images = [{ url: hotelData.photo }];
                }
              } else {
                // Create new hotel entry
                hotelMap.set(hotelId, {
                  id: hotelId,
                  name: hotelData.name || 'Unknown Hotel',
                  hotelDescription: '',
                  checkin: params.checkin,
                  checkout: params.checkout,
                  currency: params.currency || 'EUR',
                  lat: 0,
                  lon: 0,
                  address: '',
                  zip: '',
                  city: '',
                  countryCode: '',
                  images: hotelData.photo ? [{ url: hotelData.photo }] : [],
                  rating: 0,
                  rates: [],
                });
              }
            }
          }

          // Normalize and emit chunk
          const chunkHotels = Array.from(hotelMap.values()).map((hotel: any) => normalizeHotel(hotel, params));
          onChunk(chunkHotels);
        } catch (parseError) {
          console.error('Error parsing stream chunk:', parseError, 'Data:', data);
        }
      }
    }

    messageBuffer = messages[messages.length - 1];
  }

  // Final normalization
  const finalHotels = Array.from(hotelMap.values()).map((hotel: any) => normalizeHotel(hotel, params));
  return finalHotels;
}

/**
 * Normalize hotel data structure
 */
function normalizeHotel(hotel: any, params: SearchParams): Hotel {
  // Extract images from various possible structures
  let images: Array<{ url: string }> = [];
  
  if (hotel.images && Array.isArray(hotel.images)) {
    images = hotel.images.map((img: any) => ({
      url: typeof img === 'string' ? img : (img.url || img.urlHd || img.thumbnailUrl || '')
    })).filter((img: any) => img.url);
  } else if (hotel.hotelImages && Array.isArray(hotel.hotelImages)) {
    images = hotel.hotelImages.map((img: any) => ({
      url: img.url || img.urlHd || img.thumbnailUrl
    })).filter((img: any) => img.url);
  } else if (hotel.main_photo) {
    images = [{ url: hotel.main_photo }];
  } else if (hotel.thumbnail) {
    images = [{ url: hotel.thumbnail }];
  } else if (hotel.photo) {
    images = [{ url: hotel.photo }];
  }

  return {
    id: hotel.id || hotel.hotelId,
    name: hotel.name || hotel.hotelName || 'Unknown Hotel',
    hotelDescription: hotel.hotelDescription || hotel.description || '',
    checkin: params.checkin,
    checkout: params.checkout,
    currency: params.currency || 'EUR',
    lat: hotel.latitude || hotel.location?.latitude || hotel.lat || 0,
    lon: hotel.longitude || hotel.location?.longitude || hotel.lon || 0,
    address: hotel.address || '',
    zip: hotel.zip || hotel.postalCode || '',
    city: hotel.city || '',
    countryCode: hotel.country || hotel.countryCode || '',
    images: images,
    rating: hotel.rating || hotel.starRating || 0,
    rates: hotel.rates || hotel.roomTypes?.flatMap((rt: any) => rt.rates || []) || [],
  };
}

/**
 * Search for hotel rates (non-streaming, original function)
 * 
 * Supports all LiteAPI filtering and sorting options:
 * - Location: countryCode+cityName, placeId, hotelIds, aiSearch, iataCode, lat/long
 * - Filters: boardType, refundableRatesOnly, starRating, minRating, facilities, etc.
 * - Sorting: by price or top_picks
 */
export async function searchHotelRates(params: SearchParams): Promise<Hotel[]> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  // Build request body with all supported parameters
  const requestBody: Record<string, any> = {
    checkin: params.checkin,
    checkout: params.checkout,
    occupancies: params.occupancies,
    currency: params.currency || 'EUR',
    guestNationality: params.guestNationality || 'GR',
    roomMapping: true,
    maxRatesPerHotel: params.maxRatesPerHotel || 10,
    includeHotelData: true,
    timeout: params.timeout || 10,
  };

  // Location parameters
  if (params.countryCode) requestBody.countryCode = params.countryCode;
  if (params.cityName) requestBody.cityName = params.cityName;
  if (params.placeId) requestBody.placeId = params.placeId;
  if (params.hotelIds) requestBody.hotelIds = params.hotelIds;
  if (params.aiSearch) requestBody.aiSearch = params.aiSearch;
  if (params.iataCode) requestBody.iataCode = params.iataCode;
  
  // Geo-search parameters
  if (params.latitude && params.longitude) {
    requestBody.latitude = params.latitude;
    requestBody.longitude = params.longitude;
    if (params.radius) requestBody.radius = params.radius;
  }
  
  // Pagination
  if (params.limit) requestBody.limit = params.limit;
  if (params.offset) requestBody.offset = params.offset;
  
  // Filtering options
  if (params.boardType) requestBody.boardType = params.boardType;
  if (params.refundableRatesOnly) requestBody.refundableRatesOnly = true;
  if (params.starRating) requestBody.starRating = params.starRating;
  if (params.minRating !== undefined) requestBody.minRating = params.minRating;
  if (params.minReviewsCount !== undefined) requestBody.minReviewsCount = params.minReviewsCount;
  if (params.hotelName) requestBody.hotelName = params.hotelName;
  if (params.hotelTypeIds) requestBody.hotelTypeIds = params.hotelTypeIds;
  if (params.chainIds) requestBody.chainIds = params.chainIds;
  if (params.facilities) requestBody.facilities = params.facilities;
  if (params.strictFacilityFiltering) requestBody.strictFacilityFiltering = true;
  if (params.advancedAccessibilityOnly) requestBody.advancedAccessibilityOnly = true;
  if (params.zip) requestBody.zip = params.zip;
  
  // Sorting
  if (params.sort) requestBody.sort = params.sort;

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-hotel-rates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('LiteAPI search error:', error);
    throw new Error(error.error?.message || error.error || 'Failed to search hotel rates');
  }

  const data = await response.json();
  console.log('LiteAPI response structure:', JSON.stringify(data, null, 2));
  
  // LiteAPI /v3.0/hotels/rates endpoint returns:
  // { data: { hotels: [...] } } or { hotels: [...] }
  let hotels: any[] = [];
  
  if (data.data?.hotels && Array.isArray(data.data.hotels)) {
    hotels = data.data.hotels;
  } else if (data.hotels && Array.isArray(data.hotels)) {
    hotels = data.hotels;
  } else if (Array.isArray(data.data)) {
    hotels = data.data;
  } else if (Array.isArray(data)) {
    hotels = data;
  }
  
  console.log(`Found ${hotels.length} hotels in response`);
  console.log('Sample hotel structure:', hotels[0] ? JSON.stringify(hotels[0], null, 2) : 'No hotels');
  
  // Normalize hotel structure using the shared function
  const normalizedHotels = hotels.map((hotel: any) => normalizeHotel(hotel, params));
  
  console.log(`Normalized ${normalizedHotels.length} hotels`);
  console.log('Sample normalized hotel:', normalizedHotels[0] ? {
    id: normalizedHotels[0].id,
    name: normalizedHotels[0].name,
    imagesCount: normalizedHotels[0].images?.length || 0,
    firstImage: normalizedHotels[0].images?.[0]?.url
  } : 'No hotels');
  return normalizedHotels;
}

// Full Hotel Details Types
export interface HotelImage {
  url: string;
  urlHd: string;
  caption: string;
  order: number;
  defaultImage: boolean;
}

export interface CheckinCheckoutTimes {
  checkout: string;
  checkin: string;
  checkinStart?: string;
  checkinEnd?: string;
}

export interface HotelFacility {
  facilityId: number;
  name: string;
}

export interface HotelDetailsFull {
  id: string;
  name: string;
  hotelDescription: string;
  hotelImportantInformation?: string;
  checkinCheckoutTimes: CheckinCheckoutTimes;
  hotelImages: HotelImage[];
  main_photo: string;
  thumbnail: string;
  country: string;
  city: string;
  starRating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  zip?: string;
  hotelFacilities: string[];
  facilities: HotelFacility[];
  chain?: string;
  chainId?: number;
  phone?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  parking?: boolean;
  petsAllowed?: boolean;
  childAllowed?: boolean;
  policies?: Array<{
    policy_type: string;
    name: string;
    description: string;
    child_allowed?: string;
    pets_allowed?: string;
    parking?: string;
  }>;
  accessibilityAttributes?: any;
  rooms?: Array<{
    id: number;
    roomName: string;
    description: string;
    roomSizeSquare?: number;
    maxAdults: number;
    maxChildren: number;
    maxOccupancy: number;
    bedTypes?: Array<{
      quantity: number;
      bedType: string;
      bedSize: string;
    }>;
    images?: HotelImage[];
  }>;
}

/**
 * Get detailed hotel information (full details)
 */
export async function getHotelDetailsFull(hotelId: string): Promise<HotelDetailsFull> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(
    `${getSupabaseFunctionsUrl()}/liteapi-hotel-details?hotelId=${hotelId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('LiteAPI hotel details error:', error);
    throw new Error(error.error?.message || error.error || 'Failed to get hotel details');
  }

  const data = await response.json();
  console.log('LiteAPI hotel details response:', data);
  
  // Handle response structure: { data: {...} } or direct object
  return data.data || data;
}

/**
 * Get detailed hotel information (legacy function, kept for compatibility)
 */
export async function getHotelDetails(hotelId: string): Promise<any> {
  return getHotelDetailsFull(hotelId);
}

/**
 * Prebook a hotel rate (required before payment)
 */
export async function prebookHotelRate(offerId: string): Promise<PrebookResponse['data']> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-prebook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({ offerId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to prebook hotel');
  }

  const data = await response.json();
  return data.data;
}

/**
 * Complete hotel booking after payment
 */
export async function bookHotel(
  prebookId: string,
  transactionId: string,
  holder: BookingHolder,
  guests: BookingGuest[]
): Promise<BookingResponse['data']> {
  const { data: sessionData } = await supabase.auth.getSession();
  
  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      prebookId,
      holder,
      payment: {
        method: 'TRANSACTION_ID',
        transactionId,
      },
      guests,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to complete booking');
  }

  const data = await response.json();
  return data.data;
}

/**
 * Format date for API (YYYY-MM-DD)
 */
export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date from API (YYYY-MM-DD)
 */
export function parseDateFromAPI(dateString: string): Date {
  if (!dateString) {
    return new Date(); // Return current date as fallback
  }
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkin: string, checkout: string): number {
  if (!checkin || !checkout) {
    return 0; // Return 0 if dates are missing
  }
  const checkinDate = parseDateFromAPI(checkin);
  const checkoutDate = parseDateFromAPI(checkout);
  const diffTime = checkoutDate.getTime() - checkinDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ==========================================
// WEATHER API
// ==========================================

export interface WeatherData {
  date: string;
  units: string;
  cloud_cover?: { afternoon: number };
  humidity?: { afternoon: number };
  precipitation?: { total: number };
  temperature: {
    min: number;
    max: number;
    afternoon?: number;
    night?: number;
    evening?: number;
    morning?: number;
  };
  pressure?: { afternoon: number };
  wind?: {
    max: {
      speed: number;
      direction: number;
    };
  };
}

export interface WeatherResponse {
  weatherData?: WeatherData[];
  detailedWeatherData?: {
    lat: number;
    lon: number;
    timezone: string;
    daily: WeatherData[];
  };
}

/**
 * Get weather forecast for a location
 */
export async function getWeather(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherResponse> {
  const { data: sessionData } = await supabase.auth.getSession();

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    startDate,
    endDate,
    units,
  });

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-weather?${params}`, {
    headers: {
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get weather data');
  }

  return response.json();
}

// ==========================================
// REVIEWS API
// ==========================================

export interface HotelReview {
  reviewId?: string;
  rating: number;
  title?: string;
  text?: string;
  date?: string;
  author?: string;
  language?: string;
  positives?: string;
  negatives?: string;
}

export interface ReviewsResponse {
  data: HotelReview[];
  sentiment_analysis?: {
    pros: string[];
    cons: string[];
  };
}

/**
 * Get reviews for a hotel
 */
export async function getHotelReviews(hotelId: string, limit?: number): Promise<ReviewsResponse> {
  const { data: sessionData } = await supabase.auth.getSession();

  const params = new URLSearchParams({ hotelId });
  if (limit) params.set('limit', limit.toString());

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-reviews?${params}`, {
    headers: {
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get hotel reviews');
  }

  return response.json();
}

// ==========================================
// BOOKINGS MANAGEMENT API
// ==========================================

export interface BookingDetails {
  bookingId: string;
  clientReference?: string;
  status: 'CONFIRMED' | 'CANCELED' | 'CANCELLED_WITH_CHARGES';
  hotelConfirmationCode?: string;
  checkin: string;
  checkout: string;
  hotel: {
    hotelId: string;
    name: string;
  };
  rooms: Array<{
    roomType: { roomTypeId: string; name: string };
    boardType: string;
    boardName: string;
    adults: number;
    children: number;
    rate: {
      rateId: string;
      retailRate: { total: { amount: number; currency: string } };
      cancellationPolicies: any;
    };
    guests?: Array<{
      firstName: string;
      lastName: string;
      email?: string;
    }>;
  }>;
  holder: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  price: number;
  currency: string;
  cancellationPolicies: any;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * List bookings by guest ID or client reference
 */
export async function listBookings(
  guestId?: string,
  clientReference?: string
): Promise<BookingDetails[]> {
  const { data: sessionData } = await supabase.auth.getSession();

  const params = new URLSearchParams();
  if (guestId) params.set('guestId', guestId);
  if (clientReference) params.set('clientReference', clientReference);

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-bookings?${params}`, {
    headers: {
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to list bookings');
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Get specific booking by ID
 */
export async function getBooking(bookingId: string): Promise<BookingDetails> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(
    `${getSupabaseFunctionsUrl()}/liteapi-bookings?bookingId=${bookingId}`,
    {
      headers: {
        'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get booking');
  }

  const data = await response.json();
  return data.data;
}

/**
 * Cancel a booking
 */
export async function cancelBooking(bookingId: string): Promise<{ success: boolean; message?: string }> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(
    `${getSupabaseFunctionsUrl()}/liteapi-bookings?bookingId=${bookingId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to cancel booking');
  }

  return response.json();
}

// ==========================================
// FACILITIES API
// ==========================================

export interface Facility {
  id: number;
  name: string;
}

/**
 * Get list of hotel facilities for filtering
 */
export async function getFacilities(): Promise<Facility[]> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-facilities`, {
    headers: {
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get facilities');
  }

  const data = await response.json();
  return data.data || [];
}

// ==========================================
// CURRENCIES API
// ==========================================

export interface Currency {
  code: string;
  name: string;
  countries?: string[];
}

/**
 * Get list of available currencies
 */
export async function getCurrencies(): Promise<Currency[]> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-currencies`, {
    headers: {
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get currencies');
  }

  const data = await response.json();
  return data.data || [];
}

// ==========================================
// ENHANCED PREBOOK WITH ADD-ONS
// ==========================================

export interface UberAddon {
  addon: 'uber';
  value: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100; // $10-$100 in $10 increments
  currency: 'USD';
}

export interface ESimAddon {
  addon: 'esimply';
  value: number;
  currency: 'USD';
  addonDetails: {
    package_id: number;
    destination_code: string; // Country code e.g., 'GR'
    start_date: string; // YYYY-MM-DD
    end_date: string; // YYYY-MM-DD
  };
}

export type BookingAddon = UberAddon | ESimAddon;

export interface EnhancedPrebookParams {
  offerId: string;
  voucherCode?: string; // Discount code
  addons?: BookingAddon[]; // Uber vouchers, eSIM packages
}

/**
 * Prebook with optional voucher and add-ons support
 */
export async function prebookWithAddons(params: EnhancedPrebookParams): Promise<PrebookResponse> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-prebook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      offerId: params.offerId,
      voucherCode: params.voucherCode,
      addons: params.addons,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || error.error || 'Failed to prebook');
  }

  return response.json();
}

// ==========================================
// ENHANCED BOOK WITH CLIENT REFERENCE & LOYALTY
// ==========================================

export interface EnhancedBookParams {
  prebookId: string;
  transactionId: string;
  holder: BookingHolder & { phone?: string };
  guests: BookingGuest[];
  clientReference?: string; // Your internal booking reference
  guestId?: string; // LiteAPI guest ID for loyalty program
}

/**
 * Book with optional client reference and loyalty guest ID
 */
export async function bookWithReference(params: EnhancedBookParams): Promise<BookingResponse> {
  const { data: sessionData } = await supabase.auth.getSession();

  const response = await fetch(`${getSupabaseFunctionsUrl()}/liteapi-book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.session?.access_token || ''}`,
    },
    body: JSON.stringify({
      prebookId: params.prebookId,
      holder: params.holder,
      payment: {
        method: 'TRANSACTION_ID',
        transactionId: params.transactionId,
      },
      guests: params.guests,
      clientReference: params.clientReference,
      guestId: params.guestId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || error.error || 'Failed to book');
  }

  return response.json();
}

// ==========================================
// COMMON FACILITY IDS (for convenience)
// ==========================================

export const FACILITY_IDS = {
  SWIMMING_POOL: 1,
  SPA: 2,
  FITNESS_CENTER: 3,
  WIFI: 4,
  PARKING: 5,
  RESTAURANT: 6,
  BAR: 7,
  ROOM_SERVICE: 8,
  AIR_CONDITIONING: 9,
  BEACH_ACCESS: 10,
  PET_FRIENDLY: 11,
  BUSINESS_CENTER: 12,
  LAUNDRY: 13,
  CONCIERGE: 14,
  AIRPORT_SHUTTLE: 15,
} as const;

// ==========================================
// BOARD TYPE LABELS (for UI)
// ==========================================

export const BOARD_TYPE_LABELS: Record<string, string> = {
  RO: 'Room Only',
  BB: 'Bed & Breakfast',
  HB: 'Half Board',
  FB: 'Full Board',
  AI: 'All Inclusive',
};

// ==========================================
// STAR RATING OPTIONS (for filters)
// ==========================================

export const STAR_RATING_OPTIONS = [
  { value: [5], label: '5 Stars' },
  { value: [4, 5], label: '4+ Stars' },
  { value: [3, 4, 5], label: '3+ Stars' },
  { value: [2, 3, 4, 5], label: '2+ Stars' },
];

