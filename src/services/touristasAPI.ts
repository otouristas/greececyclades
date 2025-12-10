/**
 * Touristas AI - Unified API Service
 * Wraps all travel APIs (Ferry, Hotel, Weather, Activities, Car Rental)
 * Uses normalization database for consistent input handling
 */

import { 
  findIslandByInput, 
  getPortCode, 
  getAirportCode, 
  getCoordinates,
  getRouteInfo,
  type IslandData 
} from '@/data/cycladesNormalization';

import {
  searchHotelRates,
  getWeather,
  type Hotel as LiteAPIHotel,
  type SearchParams as LiteAPISearchParams,
} from '@/lib/liteapi';

// ============================================
// TYPES
// ============================================

export interface FerrySearchParams {
  fromPort: string;
  toPort: string;
  departureDate: string; // YYYY-MM-DD
  adults: number;
  children?: number;
  infants?: number;
  directOnly?: boolean;
  currency?: string;
}

export interface FerryResult {
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  vesselName?: string;
  seatType?: string;
  bookingUrl?: string;
}

export interface HotelSearchParams {
  location: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  adults: number;
  children?: number;
  rooms?: number;
  budgetMax?: number;
  starRatingMin?: number;
  nearPort?: boolean;
  currency?: string;
}

export interface HotelResult {
  name: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  location: string;
  distanceToPort?: string;
  amenities: string[];
  imageUrl?: string;
  bookingUrl?: string;
  freeCancellation?: boolean;
}

export interface WeatherParams {
  location: string; // Island name or coordinates
  date: string; // YYYY-MM-DD
  hours?: number; // Forecast horizon (default 72)
}

export interface WeatherResult {
  date: string;
  temperature: { min: number; max: number };
  windSpeed: number;
  windGust: number;
  windDirection: string;
  waveHeight?: number;
  seaState?: string;
  uvIndex: number;
  precipitation: number;
  condition: string;
  ferryDisruptionRisk: 'low' | 'medium' | 'high';
  safeForSmallBoats: boolean;
}

export interface ActivitySearchParams {
  location: string;
  date?: string;
  participants?: number;
  category?: 'boat' | 'cruise' | 'walking' | 'food' | 'adventure' | 'museum' | 'all';
  priceMax?: number;
}

export interface ActivityResult {
  title: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  category: string;
  meetingPoint?: string;
  bookingUrl?: string;
  imageUrl?: string;
}

export interface CarRentalParams {
  pickupLocation: string;
  pickupDate: string;
  dropoffDate: string;
  driverAge: number;
  transmission?: 'automatic' | 'manual' | 'any';
  carClass?: 'economy' | 'compact' | 'suv' | 'van' | 'luxury' | 'any';
}

export interface CarRentalResult {
  vehicleName: string;
  carClass: string;
  transmission: string;
  pricePerDay: number;
  totalPrice: number;
  currency: string;
  pickupLocation: string;
  insuranceIncluded: boolean;
  unlimitedKm: boolean;
  deposit?: number;
  bookingUrl?: string;
}

// ============================================
// NORMALIZATION HELPERS
// ============================================

export function normalizeLocation(input: string): IslandData | null {
  const island = findIslandByInput(input);
  return island || null;
}

export function getPortCodeFromInput(input: string): string | null {
  const code = getPortCode(input);
  return code || null;
}

export function getFlightCodeFromInput(input: string): string | null {
  const code = getAirportCode(input);
  return code || null;
}

export function getWeatherCoordinates(input: string): { lat: number; lon: number } | null {
  const coords = getCoordinates(input);
  return coords || null;
}

// ============================================
// FERRY API WRAPPER
// ============================================

export async function searchFerries(params: FerrySearchParams): Promise<FerryResult[]> {
  // Normalize port codes
  const fromCode = getPortCodeFromInput(params.fromPort);
  const toCode = getPortCodeFromInput(params.toPort);
  
  if (!fromCode || !toCode) {
    console.error('Invalid port names:', params.fromPort, params.toPort);
    return [];
  }

  // Get estimated route info from normalization DB
  const routeInfo = getRouteInfo(params.fromPort, params.toPort);

  // TODO: Replace with actual Ferryhopper API call
  // For now, return mock data based on normalization DB
  const mockResults: FerryResult[] = [];
  
  if (routeInfo) {
    mockResults.push({
      operator: routeInfo.operators[0] || 'Blue Star Ferries',
      departureTime: '07:25',
      arrivalTime: '14:45',
      duration: routeInfo.estimatedDuration.split('/')[0].trim(),
      price: parseFloat(routeInfo.estimatedPrice.replace('€', '').split('-')[0]),
      currency: 'EUR',
      stops: 0,
      vesselName: 'Blue Star Delos',
      seatType: 'Economy',
      bookingUrl: 'https://www.ferryhopper.com'
    });

    if (routeInfo.operators.length > 1) {
      mockResults.push({
        operator: routeInfo.operators[1] || 'Seajets',
        departureTime: '15:00',
        arrivalTime: '17:30',
        duration: routeInfo.estimatedDuration.split('/')[1]?.trim() || '2.5h',
        price: parseFloat(routeInfo.estimatedPrice.replace('€', '').split('-')[1] || '60'),
        currency: 'EUR',
        stops: 0,
        vesselName: 'Champion Jet 1',
        seatType: 'Economy',
        bookingUrl: 'https://www.ferryhopper.com'
      });
    }
  }

  return mockResults;
}

// ============================================
// HOTEL API WRAPPER (LiteAPI - REAL)
// ============================================

export async function searchHotels(params: HotelSearchParams): Promise<HotelResult[]> {
  const island = normalizeLocation(params.location);
  
  if (!island) {
    console.error('Invalid location:', params.location);
    return [];
  }

  try {
    // Build LiteAPI search params
    const liteApiParams: LiteAPISearchParams = {
      checkin: params.checkin,
      checkout: params.checkout,
      occupancies: [{
        adults: params.adults,
        children: params.children ? Array(params.children).fill(10) : [] // Assume age 10 for children
      }],
      countryCode: 'GR',
      cityName: island.name,
      currency: params.currency || 'EUR',
      guestNationality: 'GR',
      limit: 10,
      maxRatesPerHotel: 3,
    };

    // Apply filters
    if (params.starRatingMin) {
      liteApiParams.starRating = [params.starRatingMin, params.starRatingMin + 1, 5].filter(s => s <= 5);
    }

    console.log('Searching hotels with LiteAPI:', liteApiParams);
    const hotels = await searchHotelRates(liteApiParams);
    console.log(`Found ${hotels.length} hotels from LiteAPI`);

    // Transform LiteAPI response to our format
    return hotels.map((hotel: LiteAPIHotel): HotelResult => {
      const lowestRate = hotel.rates?.[0];
      const price = lowestRate?.retailRate?.total?.[0]?.amount || 0;
      const nights = Math.max(1, Math.ceil(
        (new Date(params.checkout).getTime() - new Date(params.checkin).getTime()) / (1000 * 60 * 60 * 24)
      ));

      return {
        name: hotel.name,
        stars: hotel.rating || 0,
        rating: hotel.rating || 0,
        reviewCount: 0, // LiteAPI doesn't return this in search
        pricePerNight: Math.round(price / nights),
        currency: hotel.currency || 'EUR',
        location: hotel.city || island.name,
        distanceToPort: params.nearPort ? 'Near port' : undefined,
        amenities: [], // Would need hotel details call
        imageUrl: hotel.images?.[0]?.url,
        bookingUrl: `/book/hotel/${hotel.id}`,
        freeCancellation: lowestRate?.cancellationPolicies?.refundableTag === 'RFN',
      };
    });
  } catch (error) {
    console.error('LiteAPI hotel search error:', error);
    
    // Fallback to mock data if API fails
    return [
      {
        name: `${island.name} View Hotel`,
        stars: 4,
        rating: 4.5,
        reviewCount: 234,
        pricePerNight: params.budgetMax ? params.budgetMax * 0.8 : 120,
        currency: 'EUR',
        location: `${island.name} Town`,
        distanceToPort: '500m',
        amenities: ['Pool', 'WiFi', 'Breakfast', 'AC'],
        freeCancellation: true,
        bookingUrl: '/book'
      }
    ];
  }
}

// ============================================
// WEATHER API WRAPPER (LiteAPI - REAL)
// ============================================

export async function getWeatherForecast(params: WeatherParams): Promise<WeatherResult | null> {
  const coords = getWeatherCoordinates(params.location);
  
  if (!coords) {
    console.error('Cannot get coordinates for:', params.location);
    return null;
  }

  try {
    // Calculate end date (same day or next day)
    const startDate = params.date;
    const endDate = params.date; // Single day forecast
    
    console.log('Fetching weather for:', coords, startDate);
    const weatherResponse = await getWeather(coords.lat, coords.lon, startDate, endDate, 'metric');
    
    const dailyData = weatherResponse.detailedWeatherData?.daily?.[0] || weatherResponse.weatherData?.[0];
    
    if (!dailyData) {
      console.warn('No weather data returned');
      return null;
    }

    const windSpeed = dailyData.wind?.max?.speed || 0;
    const windGust = windSpeed * 1.3; // Estimate gust
    
    // Determine ferry risk based on wind speed (km/h)
    // Beaufort scale: 6 = 39-49 km/h (moderate risk), 7+ = 50+ km/h (high risk)
    const ferryRisk: 'low' | 'medium' | 'high' = 
      windSpeed > 50 ? 'high' : 
      windSpeed > 35 ? 'medium' : 'low';
    
    return {
      date: params.date,
      temperature: { 
        min: dailyData.temperature?.min || 20, 
        max: dailyData.temperature?.max || 28 
      },
      windSpeed: Math.round(windSpeed),
      windGust: Math.round(windGust),
      windDirection: dailyData.wind?.max?.direction ? getWindDirection(dailyData.wind.max.direction) : 'N',
      waveHeight: windSpeed > 40 ? 2.5 : windSpeed > 25 ? 1.5 : 0.5,
      seaState: windSpeed > 40 ? 'Rough' : windSpeed > 25 ? 'Moderate' : 'Calm',
      uvIndex: 8, // Default for Greek summer
      precipitation: dailyData.precipitation?.total || 0,
      condition: dailyData.cloud_cover?.afternoon && dailyData.cloud_cover.afternoon > 50 ? 'Cloudy' : 'Sunny',
      ferryDisruptionRisk: ferryRisk,
      safeForSmallBoats: windSpeed < 25
    };
  } catch (error) {
    console.error('Weather API error:', error);
    
    // Return fallback data
    return {
      date: params.date,
      temperature: { min: 22, max: 28 },
      windSpeed: 15,
      windGust: 20,
      windDirection: 'N',
      waveHeight: 0.5,
      seaState: 'Calm',
      uvIndex: 8,
      precipitation: 0,
      condition: 'Sunny',
      ferryDisruptionRisk: 'low',
      safeForSmallBoats: true
    };
  }
}

// Helper to convert wind direction degrees to compass
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// ============================================
// ACTIVITIES API WRAPPER (GetYourGuide style)
// ============================================

export async function searchActivities(params: ActivitySearchParams): Promise<ActivityResult[]> {
  const island = normalizeLocation(params.location);
  
  if (!island) {
    console.error('Invalid location:', params.location);
    return [];
  }

  // TODO: Replace with actual GetYourGuide/Viator API call
  // For now, return mock data based on island
  const activities: ActivityResult[] = [];

  if (island.name === 'Santorini') {
    activities.push(
      {
        title: 'Sunset Catamaran Cruise with BBQ & Drinks',
        duration: '5 hours',
        price: 150,
        currency: 'EUR',
        rating: 4.9,
        reviewCount: 1234,
        category: 'boat',
        meetingPoint: 'Vlychada Marina',
        bookingUrl: '/activities'
      },
      {
        title: 'Wine Tasting Tour - 3 Wineries',
        duration: '4 hours',
        price: 85,
        currency: 'EUR',
        rating: 4.7,
        reviewCount: 567,
        category: 'food',
        meetingPoint: 'Hotel pickup',
        bookingUrl: '/activities'
      }
    );
  } else if (island.name === 'Mykonos') {
    activities.push(
      {
        title: 'Delos Island Archaeological Tour',
        duration: '4 hours',
        price: 65,
        currency: 'EUR',
        rating: 4.8,
        reviewCount: 890,
        category: 'museum',
        meetingPoint: 'Old Port',
        bookingUrl: '/activities'
      }
    );
  } else {
    activities.push(
      {
        title: `${island.name} Island Boat Tour`,
        duration: '6 hours',
        price: 80,
        currency: 'EUR',
        rating: 4.6,
        reviewCount: 234,
        category: 'boat',
        meetingPoint: `${island.name} Port`,
        bookingUrl: '/activities'
      }
    );
  }

  return activities;
}

// ============================================
// CAR RENTAL API WRAPPER
// ============================================

export async function searchCarRentals(params: CarRentalParams): Promise<CarRentalResult[]> {
  const island = normalizeLocation(params.pickupLocation);
  
  if (!island) {
    console.error('Invalid location:', params.pickupLocation);
    return [];
  }

  // TODO: Replace with actual car rental API call
  // For now, return mock data
  const days = Math.ceil(
    (new Date(params.dropoffDate).getTime() - new Date(params.pickupDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return [
    {
      vehicleName: 'Fiat Panda',
      carClass: 'economy',
      transmission: 'manual',
      pricePerDay: 35,
      totalPrice: 35 * days,
      currency: 'EUR',
      pickupLocation: `${island.name} Port`,
      insuranceIncluded: true,
      unlimitedKm: true,
      deposit: 200,
      bookingUrl: '/transfers'
    },
    {
      vehicleName: 'Toyota Yaris',
      carClass: 'compact',
      transmission: 'automatic',
      pricePerDay: 50,
      totalPrice: 50 * days,
      currency: 'EUR',
      pickupLocation: island.airport ? `${island.name} Airport` : `${island.name} Port`,
      insuranceIncluded: true,
      unlimitedKm: true,
      deposit: 300,
      bookingUrl: '/transfers'
    }
  ];
}

// ============================================
// ITINERARY BUILDER
// ============================================

export interface ItineraryDay {
  day: number;
  date: string;
  island: string;
  activities: string[];
  accommodation?: string;
  transport?: string;
  estimatedCost: number;
}

export interface FullItinerary {
  days: ItineraryDay[];
  totalCost: number;
  warnings: string[];
  bookingLinks: {
    ferries: string;
    hotels: string;
    activities: string;
  };
}

export async function buildItinerary(
  islands: string[],
  startDate: string,
  travelers: number,
  preferences?: {
    budget?: 'budget' | 'mid-range' | 'luxury';
    interests?: string[];
  }
): Promise<FullItinerary> {
  const days: ItineraryDay[] = [];
  let totalCost = 0;
  const warnings: string[] = [];

  // Normalize all islands
  const normalizedIslands = islands.map(i => normalizeLocation(i)).filter(Boolean) as IslandData[];

  if (normalizedIslands.length === 0) {
    return {
      days: [],
      totalCost: 0,
      warnings: ['Could not find any valid islands'],
      bookingLinks: { ferries: '/ferries', hotels: '/book', activities: '/activities' }
    };
  }

  // Check weather for first day
  const weather = await getWeatherForecast({ location: normalizedIslands[0].name, date: startDate });
  if (weather?.ferryDisruptionRisk === 'high') {
    warnings.push(`⚠️ High wind warning for ${startDate}. Consider flexible ferry booking.`);
  }

  // Build day-by-day itinerary
  let currentDate = new Date(startDate);
  const dailyBudget = preferences?.budget === 'luxury' ? 300 : preferences?.budget === 'budget' ? 80 : 150;

  for (let i = 0; i < normalizedIslands.length; i++) {
    const island = normalizedIslands[i];
    const daysOnIsland = i === normalizedIslands.length - 1 ? 2 : 2; // 2 days per island

    for (let d = 0; d < daysOnIsland; d++) {
      const dayNum = days.length + 1;
      const dateStr = currentDate.toISOString().split('T')[0];
      
      const activities: string[] = [];
      let transport: string | undefined;

      if (d === 0 && i > 0) {
        // Travel day
        const prevIsland = normalizedIslands[i - 1];
        transport = `⛴️ Ferry from ${prevIsland.name} to ${island.name}`;
        activities.push('Check-in to hotel');
        activities.push('Explore local area');
      } else if (d === 0 && i === 0) {
        // First day
        transport = '⛴️ Ferry from Piraeus';
        activities.push('Arrive & check-in');
        activities.push('Evening stroll');
      } else {
        // Full day on island
        activities.push('Morning: Beach or sightseeing');
        activities.push('Afternoon: Activity or relaxation');
        activities.push('Evening: Local taverna dinner');
      }

      days.push({
        day: dayNum,
        date: dateStr,
        island: island.name,
        activities,
        accommodation: `Hotel in ${island.name}`,
        transport,
        estimatedCost: dailyBudget
      });

      totalCost += dailyBudget;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return {
    days,
    totalCost: totalCost * travelers,
    warnings,
    bookingLinks: {
      ferries: '/ferries',
      hotels: '/book',
      activities: '/activities'
    }
  };
}
