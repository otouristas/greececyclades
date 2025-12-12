/**
 * Touristas AI - Rome2Rio-Style Booking Orchestration
 * Multi-service itinerary builder with total cost aggregation
 * 
 * Combines: Flights + Ferries + Hotels + Activities + Car Rentals
 * Into a complete trip package with booking links
 */

import { checkFerrySafety, getTouristasWeather, TouristasMarineResult, TouristasWeatherResult } from './weatherApiService';
import { searchHotels, HotelSearchParams, HotelResult } from './touristasAPI';
import { findIslandByInput, cycladesDB } from '@/data/cycladesNormalization';

// ============================================
// TYPES
// ============================================

export interface TravelLeg {
    type: 'flight' | 'ferry' | 'transfer';
    from: string;
    to: string;
    date: string;
    departureTime?: string;
    arrivalTime?: string;
    duration?: string;
    operator?: string;
    price: number;
    currency: string;
    bookingUrl?: string;
    details?: string;
    weatherSafe?: boolean;
}

export interface AccommodationLeg {
    type: 'hotel';
    location: string;
    name: string;
    stars: number;
    checkin: string;
    checkout: string;
    nights: number;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    bookingUrl?: string;
    imageUrl?: string;
}

export interface ActivityLeg {
    type: 'activity';
    location: string;
    name: string;
    date: string;
    duration: string;
    price: number;
    currency: string;
    bookingUrl?: string;
}

export interface CarRentalLeg {
    type: 'car_rental';
    location: string;
    vehicleName: string;
    pickupDate: string;
    dropoffDate: string;
    days: number;
    pricePerDay: number;
    totalPrice: number;
    currency: string;
    bookingUrl?: string;
}

export type ItineraryLeg = TravelLeg | AccommodationLeg | ActivityLeg | CarRentalLeg;

export interface ItineraryDay {
    date: string;
    dayNumber: number;
    location: string;
    weather?: TouristasWeatherResult;
    legs: ItineraryLeg[];
    notes: string[];
}

export interface CompleteItinerary {
    id: string;
    title: string;
    origin: string;
    destinations: string[];
    startDate: string;
    endDate: string;
    totalDays: number;
    travelers: {
        adults: number;
        children: number;
    };
    days: ItineraryDay[];
    summary: {
        totalFlightCost: number;
        totalFerryCost: number;
        totalHotelCost: number;
        totalActivityCost: number;
        totalCarRentalCost: number;
        grandTotal: number;
        currency: string;
    };
    weatherAlerts: string[];
    generatedAt: string;
}

export interface ItineraryRequest {
    origin: string;
    destinations: string[];
    startDate: string;
    nights: number[];  // nights per destination
    travelers: {
        adults: number;
        children?: number;
    };
    preferences?: {
        budget?: 'budget' | 'mid-range' | 'luxury';
        transportPreference?: 'fastest' | 'cheapest';
        includeActivities?: boolean;
        includeCarRental?: boolean;
    };
}

// ============================================
// MOCK DATA (Replace with real API calls)
// ============================================

// Sample ferry routes with typical prices and durations
const FERRY_ROUTES: Record<string, { duration: string; price: number; operator: string }> = {
    'piraeus_mykonos': { duration: '4h 45m', price: 62, operator: 'SeaJets' },
    'piraeus_santorini': { duration: '5h 15m', price: 68, operator: 'Blue Star Ferries' },
    'piraeus_paros': { duration: '3h 45m', price: 48, operator: 'SeaJets' },
    'piraeus_naxos': { duration: '4h 00m', price: 52, operator: 'Blue Star Ferries' },
    'piraeus_ios': { duration: '4h 30m', price: 56, operator: 'SeaJets' },
    'mykonos_santorini': { duration: '2h 30m', price: 65, operator: 'SeaJets' },
    'mykonos_paros': { duration: '45m', price: 28, operator: 'SeaJets' },
    'mykonos_naxos': { duration: '1h 00m', price: 32, operator: 'Blue Star Ferries' },
    'paros_naxos': { duration: '30m', price: 12, operator: 'Local Ferry' },
    'paros_santorini': { duration: '2h 00m', price: 45, operator: 'SeaJets' },
    'naxos_santorini': { duration: '1h 45m', price: 42, operator: 'SeaJets' },
    'santorini_ios': { duration: '45m', price: 22, operator: 'SeaJets' },
    'ios_naxos': { duration: '1h 00m', price: 25, operator: 'Blue Star Ferries' },
    'santorini_mykonos': { duration: '2h 30m', price: 65, operator: 'SeaJets' },
};

// Sample flight prices (Athens to islands)
const FLIGHT_PRICES: Record<string, number> = {
    'athens_santorini': 85,
    'athens_mykonos': 95,
    'athens_paros': 78,
    'athens_milos': 82,
    'athens_naxos': 75,
    'santorini_athens': 85,
    'mykonos_athens': 95,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function normalizeLocation(location: string): string {
    const lower = location.toLowerCase();
    const mapping: Record<string, string> = {
        'athens': 'Athens',
        'piraeus': 'Piraeus',
        'ath': 'Athens',
        'santorini': 'Santorini',
        'thira': 'Santorini',
        'jtr': 'Santorini',
        'mykonos': 'Mykonos',
        'jmk': 'Mykonos',
        'paros': 'Paros',
        'naxos': 'Naxos',
        'ios': 'Ios',
        'milos': 'Milos',
        'sifnos': 'Sifnos',
        'folegandros': 'Folegandros',
        'amorgos': 'Amorgos',
    };
    return mapping[lower] || location;
}

function getRouteKey(from: string, to: string): string {
    return `${from.toLowerCase()}_${to.toLowerCase()}`;
}

function addDays(date: string, days: number): string {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function daysBetween(start: string, end: string): number {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

function generateId(): string {
    return `itin_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

// ============================================
// ORCHESTRATION FUNCTIONS
// ============================================

/**
 * Get transport options between two locations
 */
async function getTransportOptions(
    from: string,
    to: string,
    date: string,
    passengers: number
): Promise<TravelLeg[]> {
    const options: TravelLeg[] = [];
    const fromNorm = normalizeLocation(from);
    const toNorm = normalizeLocation(to);

    // Check for ferry route
    const ferryKey = getRouteKey(fromNorm === 'Athens' ? 'piraeus' : fromNorm, toNorm);
    const reverseKey = getRouteKey(toNorm, fromNorm === 'Athens' ? 'piraeus' : fromNorm);
    const ferryRoute = FERRY_ROUTES[ferryKey] || FERRY_ROUTES[reverseKey];

    if (ferryRoute) {
        // Check weather safety
        const safety = await checkFerrySafety(fromNorm, toNorm, date);

        options.push({
            type: 'ferry',
            from: fromNorm === 'Athens' ? 'Piraeus' : fromNorm,
            to: toNorm,
            date,
            duration: ferryRoute.duration,
            operator: ferryRoute.operator,
            price: ferryRoute.price * passengers,
            currency: 'EUR',
            bookingUrl: `https://www.ferryhopper.com/en/search?from=${fromNorm}&to=${toNorm}&date=${date}`,
            weatherSafe: safety.safe,
            details: safety.recommendation,
        });
    }

    // Check for flight route
    const flightKey = getRouteKey(fromNorm, toNorm);
    const flightPrice = FLIGHT_PRICES[flightKey];

    if (flightPrice) {
        options.push({
            type: 'flight',
            from: fromNorm,
            to: toNorm,
            date,
            duration: '45m',
            operator: 'Sky Express / Aegean',
            price: flightPrice * passengers,
            currency: 'EUR',
            bookingUrl: `https://www.skyscanner.com/transport/flights/${fromNorm}/${toNorm}/${date}/`,
        });
    }

    return options;
}

/**
 * Get hotel options for a location
 */
async function getHotelOptions(
    location: string,
    checkin: string,
    checkout: string,
    guests: number,
    budget?: 'budget' | 'mid-range' | 'luxury'
): Promise<AccommodationLeg[]> {
    const nights = daysBetween(checkin, checkout);

    // Mock hotel data (replace with real LiteAPI call)
    const mockHotels: AccommodationLeg[] = [
        {
            type: 'hotel',
            location,
            name: budget === 'luxury' ? `Luxury Resort ${location}` :
                budget === 'budget' ? `Budget Stay ${location}` :
                    `Island Hotel ${location}`,
            stars: budget === 'luxury' ? 5 : budget === 'budget' ? 3 : 4,
            checkin,
            checkout,
            nights,
            pricePerNight: budget === 'luxury' ? 280 : budget === 'budget' ? 85 : 150,
            totalPrice: (budget === 'luxury' ? 280 : budget === 'budget' ? 85 : 150) * nights,
            currency: 'EUR',
            bookingUrl: `https://www.booking.com/searchresults.html?ss=${location}&checkin=${checkin}&checkout=${checkout}&group_adults=${guests}`,
        },
    ];

    return mockHotels;
}

/**
 * Build a complete multi-destination itinerary
 */
export async function buildItinerary(request: ItineraryRequest): Promise<CompleteItinerary> {
    const { origin, destinations, startDate, nights, travelers, preferences } = request;
    const totalPassengers = travelers.adults + (travelers.children || 0);

    const itinerary: CompleteItinerary = {
        id: generateId(),
        title: `${origin} → ${destinations.join(' → ')} → ${origin}`,
        origin: normalizeLocation(origin),
        destinations: destinations.map(normalizeLocation),
        startDate,
        endDate: '',
        totalDays: 0,
        travelers,
        days: [],
        summary: {
            totalFlightCost: 0,
            totalFerryCost: 0,
            totalHotelCost: 0,
            totalActivityCost: 0,
            totalCarRentalCost: 0,
            grandTotal: 0,
            currency: 'EUR',
        },
        weatherAlerts: [],
        generatedAt: new Date().toISOString(),
    };

    let currentDate = startDate;
    let currentLocation = normalizeLocation(origin);
    let dayNumber = 1;

    // Process each destination
    for (let i = 0; i < destinations.length; i++) {
        const destination = normalizeLocation(destinations[i]);
        const nightsHere = nights[i] || 2;

        // DAY: Travel to destination
        const travelDay: ItineraryDay = {
            date: currentDate,
            dayNumber,
            location: `${currentLocation} → ${destination}`,
            legs: [],
            notes: [],
        };

        // Get transport options
        const transportOptions = await getTransportOptions(
            currentLocation,
            destination,
            currentDate,
            totalPassengers
        );

        // Pick best option based on preference
        let chosenTransport: TravelLeg | null = null;
        if (transportOptions.length > 0) {
            if (preferences?.transportPreference === 'cheapest') {
                chosenTransport = transportOptions.reduce((a, b) => a.price < b.price ? a : b);
            } else {
                // Prefer flights for "fastest" or default
                chosenTransport = transportOptions.find(t => t.type === 'flight') || transportOptions[0];
            }

            travelDay.legs.push(chosenTransport);

            // Update costs
            if (chosenTransport.type === 'flight') {
                itinerary.summary.totalFlightCost += chosenTransport.price;
            } else {
                itinerary.summary.totalFerryCost += chosenTransport.price;
            }

            // Check weather safety
            if (chosenTransport.type === 'ferry' && !chosenTransport.weatherSafe) {
                itinerary.weatherAlerts.push(
                    `⚠️ Day ${dayNumber}: ${chosenTransport.details}`
                );
                travelDay.notes.push('⚠️ Check ferry status due to weather conditions');
            }
        }

        // Get weather for travel day
        const weather = await getTouristasWeather(destination, currentDate);
        travelDay.weather = weather || undefined;

        itinerary.days.push(travelDay);
        dayNumber++;
        currentDate = addDays(currentDate, 1);

        // DAYS: Stay at destination
        const checkinDate = addDays(startDate, itinerary.days.length - 1);
        const checkoutDate = addDays(checkinDate, nightsHere);

        // Get hotel
        const hotels = await getHotelOptions(
            destination,
            checkinDate,
            checkoutDate,
            totalPassengers,
            preferences?.budget
        );

        if (hotels.length > 0) {
            const hotel = hotels[0];
            itinerary.summary.totalHotelCost += hotel.totalPrice;

            // Add hotel to first day at destination
            travelDay.legs.push(hotel);
        }

        // Add exploration days
        for (let n = 1; n < nightsHere; n++) {
            const stayDay: ItineraryDay = {
                date: currentDate,
                dayNumber,
                location: destination,
                legs: [],
                notes: [`Explore ${destination}`],
            };

            // Get weather for this day
            const dayWeather = await getTouristasWeather(destination, currentDate);
            stayDay.weather = dayWeather || undefined;

            if (dayWeather) {
                if (dayWeather.isGoodForBeach) {
                    stayDay.notes.push('🏖️ Great day for the beach!');
                }
                if (dayWeather.wind.speed_kph > 30) {
                    stayDay.notes.push('💨 Windy - consider indoor activities');
                }
            }

            itinerary.days.push(stayDay);
            dayNumber++;
            currentDate = addDays(currentDate, 1);
        }

        currentLocation = destination;
    }

    // Final Day: Return to origin
    const returnDay: ItineraryDay = {
        date: currentDate,
        dayNumber,
        location: `${currentLocation} → ${normalizeLocation(origin)}`,
        legs: [],
        notes: ['Safe travels home! 👋'],
    };

    const returnTransport = await getTransportOptions(
        currentLocation,
        origin,
        currentDate,
        totalPassengers
    );

    if (returnTransport.length > 0) {
        const chosen = returnTransport.find(t => t.type === 'flight') || returnTransport[0];
        returnDay.legs.push(chosen);

        if (chosen.type === 'flight') {
            itinerary.summary.totalFlightCost += chosen.price;
        } else {
            itinerary.summary.totalFerryCost += chosen.price;
        }
    }

    itinerary.days.push(returnDay);

    // Calculate totals
    itinerary.endDate = currentDate;
    itinerary.totalDays = dayNumber;
    itinerary.summary.grandTotal =
        itinerary.summary.totalFlightCost +
        itinerary.summary.totalFerryCost +
        itinerary.summary.totalHotelCost +
        itinerary.summary.totalActivityCost +
        itinerary.summary.totalCarRentalCost;

    return itinerary;
}

/**
 * Format itinerary for AI response
 */
export function formatItineraryForChat(itinerary: CompleteItinerary): string {
    let output = `# 🏝️ ${itinerary.title}\n\n`;
    output += `📅 **${itinerary.startDate}** to **${itinerary.endDate}** (${itinerary.totalDays} days)\n`;
    output += `👥 ${itinerary.travelers.adults} adults`;
    if (itinerary.travelers.children) {
        output += `, ${itinerary.travelers.children} children`;
    }
    output += '\n\n---\n\n';

    // Days
    for (const day of itinerary.days) {
        output += `## Day ${day.dayNumber}: ${day.location}\n`;
        output += `📆 ${day.date}\n\n`;

        // Weather
        if (day.weather) {
            output += `🌡️ ${day.weather.temperature.min}°C - ${day.weather.temperature.max}°C | ${day.weather.conditions}\n\n`;
        }

        // Legs
        for (const leg of day.legs) {
            if (leg.type === 'flight') {
                output += `✈️ **Flight**: ${leg.from} → ${leg.to}\n`;
                output += `   ${leg.operator} | ${leg.duration} | €${leg.price}\n`;
            } else if (leg.type === 'ferry') {
                output += `⛴️ **Ferry**: ${leg.from} → ${leg.to}\n`;
                output += `   ${leg.operator} | ${leg.duration} | €${leg.price}\n`;
                if (!leg.weatherSafe) {
                    output += `   ⚠️ ${leg.details}\n`;
                }
            } else if (leg.type === 'hotel') {
                output += `🏨 **Hotel**: ${leg.name} (${leg.stars}⭐)\n`;
                output += `   ${leg.nights} nights | €${leg.pricePerNight}/night | Total: €${leg.totalPrice}\n`;
            }
            output += '\n';
        }

        // Notes
        for (const note of day.notes) {
            output += `> ${note}\n`;
        }

        output += '\n---\n\n';
    }

    // Summary
    output += '## 💰 Trip Cost Summary\n\n';
    output += `| Category | Cost |\n`;
    output += `|----------|------|\n`;
    if (itinerary.summary.totalFlightCost > 0) {
        output += `| ✈️ Flights | €${itinerary.summary.totalFlightCost} |\n`;
    }
    if (itinerary.summary.totalFerryCost > 0) {
        output += `| ⛴️ Ferries | €${itinerary.summary.totalFerryCost} |\n`;
    }
    if (itinerary.summary.totalHotelCost > 0) {
        output += `| 🏨 Hotels | €${itinerary.summary.totalHotelCost} |\n`;
    }
    output += `| **Total** | **€${itinerary.summary.grandTotal}** |\n\n`;

    // Weather alerts
    if (itinerary.weatherAlerts.length > 0) {
        output += '## ⚠️ Weather Alerts\n\n';
        for (const alert of itinerary.weatherAlerts) {
            output += `- ${alert}\n`;
        }
        output += '\n';
    }

    output += `\n_Itinerary generated on ${new Date(itinerary.generatedAt).toLocaleString()}_`;

    return output;
}

/**
 * Quick island hopping itinerary builder
 */
export async function buildIslandHoppingTrip(
    islands: string[],
    startDate: string,
    nightsPerIsland: number = 2,
    travelers: number = 2
): Promise<CompleteItinerary> {
    return buildItinerary({
        origin: 'Athens',
        destinations: islands,
        startDate,
        nights: islands.map(() => nightsPerIsland),
        travelers: { adults: travelers },
        preferences: {
            budget: 'mid-range',
            transportPreference: 'fastest',
        },
    });
}

export default {
    buildItinerary,
    formatItineraryForChat,
    buildIslandHoppingTrip,
    getTransportOptions,
    getHotelOptions,
};
