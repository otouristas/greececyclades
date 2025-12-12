/**
 * Touristas AI - Unified Chat Service
 * Connects prompt library, dialog state machine, APIs, and booking orchestration
 * 
 * This is the main entry point for the Touristas AI chat interface
 */

import TouristasDialogMachine, { DialogTransition } from './touristasDialogStateMachine';
import {
    matchPromptPatterns,
    getBestMatch,
    APITrigger,
    allPromptPatterns
} from '@/data/touristasPromptLibrary';
import {
    getTouristasWeather,
    getTouristasMarineConditions,
    checkFerrySafety,
    getWeatherBriefing
} from './weatherApiService';
import {
    buildItinerary,
    buildIslandHoppingTrip,
    formatItineraryForChat,
    CompleteItinerary
} from './touristasBookingOrchestrator';
import { searchHotels, searchActivities, HotelResult } from './touristasAPI';
import { supabase } from '@/lib/supabase';

// ============================================
// TYPES
// ============================================

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    metadata?: {
        intent?: string;
        apiCalled?: string;
        resultsCount?: number;
        itinerary?: CompleteItinerary;
    };
}

export interface ChatResponse {
    message: string;
    cards?: ResultCard[];
    itinerary?: CompleteItinerary;
    weather?: any;
    marine?: any;
    suggestedFollowups?: string[];
}

export interface ResultCard {
    type: 'flight' | 'ferry' | 'hotel' | 'activity' | 'car' | 'weather';
    title: string;
    subtitle?: string;
    price?: number;
    currency?: string;
    rating?: number;
    imageUrl?: string;
    bookingUrl?: string;
    details: Record<string, string>;
}

// ============================================
// CHAT SERVICE
// ============================================

export class TouristasAIChatService {
    private dialogMachine: TouristasDialogMachine;
    private conversationHistory: ChatMessage[] = [];
    private sessionId: string;

    constructor() {
        this.sessionId = this.generateSessionId();
        this.dialogMachine = new TouristasDialogMachine(this.sessionId);
    }

    /**
     * Process a user message and return AI response
     */
    async processMessage(userMessage: string): Promise<ChatResponse> {
        // Add user message to history
        this.conversationHistory.push({
            id: this.generateId(),
            role: 'user',
            content: userMessage,
            timestamp: new Date().toISOString(),
        });

        // Process through dialog machine
        const transition = this.dialogMachine.processMessage(userMessage);

        // If we need to call an API
        if (transition.shouldCallAPI && transition.apiTrigger) {
            return await this.handleAPICall(transition);
        }

        // Otherwise return the clarification question
        return {
            message: transition.response,
            suggestedFollowups: this.getSuggestedFollowups(transition),
        };
    }

    /**
     * Handle API calls based on transition
     */
    private async handleAPICall(transition: DialogTransition): Promise<ChatResponse> {
        const { apiTrigger, apiParams } = transition;

        switch (apiTrigger) {
            case 'flight_search':
                return await this.handleFlightSearch(apiParams!);

            case 'ferry_search':
                return await this.handleFerrySearch(apiParams!);

            case 'hotel_search':
                return await this.handleHotelSearch(apiParams!);

            case 'activity_search':
                return await this.handleActivitySearch(apiParams!);

            case 'weather_forecast':
                return await this.handleWeatherForecast(apiParams!);

            case 'marine_conditions':
                return await this.handleMarineConditions(apiParams!);

            case 'car_rental_search':
                return await this.handleCarRentalSearch(apiParams!);

            case 'info_query':
                return await this.handleInfoQuery(apiParams!);

            case 'itinerary_build':
                return await this.handleItineraryBuild(apiParams!);

            default:
                return {
                    message: 'I\'m processing your request...',
                    suggestedFollowups: ['Tell me more about what you\'re looking for'],
                };
        }
    }

    // ============================================
    // API HANDLERS
    // ============================================

    private async handleFlightSearch(params: Record<string, any>): Promise<ChatResponse> {
        try {
            // Call FlightAPI edge function
            const { data, error } = await supabase.functions.invoke('flight-search', {
                body: {
                    from: params.departure_airport || params.from,
                    to: params.arrival_airport || params.to,
                    date: params.departure_date || params.date,
                    adults: params.adults || params.passengers || 1,
                    children: params.children || 0,
                    infants: params.infants || 0,
                }
            });

            if (error) {
                return {
                    message: `I couldn't find flights right now. Please try again or check [Skyscanner](https://www.skyscanner.com) directly.`,
                    suggestedFollowups: ['Try a different date', 'Search for ferries instead'],
                };
            }

            // Format results as cards
            const cards: ResultCard[] = (data?.flights || []).slice(0, 5).map((f: any) => ({
                type: 'flight' as const,
                title: `${f.airline} - ${f.from} → ${f.to}`,
                subtitle: `${f.departureTime} - ${f.arrivalTime}`,
                price: f.price,
                currency: 'EUR',
                bookingUrl: f.bookingUrl,
                details: {
                    'Duration': f.duration,
                    'Stops': f.stops === 0 ? 'Direct' : `${f.stops} stop(s)`,
                    'Airline': f.airline,
                },
            }));

            return {
                message: `✈️ Found ${cards.length} flights from ${params.from} to ${params.to}:`,
                cards,
                suggestedFollowups: [
                    'Book the cheapest option',
                    'Show me ferries instead',
                    'Find hotels at my destination',
                ],
            };
        } catch (error) {
            console.error('Flight search error:', error);
            return {
                message: 'I encountered an issue searching for flights. Would you like to try again?',
            };
        }
    }

    private async handleFerrySearch(params: Record<string, any>): Promise<ChatResponse> {
        const fromPort = params.from_port || params.from;
        const toPort = params.to_port || params.to;
        const date = params.departure_date || params.date;

        // Check weather safety first
        const safety = await checkFerrySafety(fromPort, toPort, date);

        let message = `⛴️ Ferry options from ${fromPort} to ${toPort} on ${date}:\n\n`;

        if (safety.disruption_risk === 'high' || safety.disruption_risk === 'cancelled') {
            message = `⚠️ **Weather Alert**: ${safety.recommendation}\n\n` + message;
        }

        // Mock ferry results (replace with real API when CSV/MCP available)
        const cards: ResultCard[] = [
            {
                type: 'ferry',
                title: `SeaJets - ${fromPort} → ${toPort}`,
                subtitle: 'High-speed ferry',
                price: 65,
                currency: 'EUR',
                bookingUrl: `https://www.ferryhopper.com`,
                details: {
                    'Departure': '07:30',
                    'Arrival': '10:00',
                    'Duration': '2h 30m',
                    'Vessel': 'WorldChampion Jet',
                },
            },
            {
                type: 'ferry',
                title: `Blue Star Ferries - ${fromPort} → ${toPort}`,
                subtitle: 'Conventional ferry',
                price: 45,
                currency: 'EUR',
                bookingUrl: `https://www.ferryhopper.com`,
                details: {
                    'Departure': '15:30',
                    'Arrival': '20:15',
                    'Duration': '4h 45m',
                    'Vessel': 'Blue Star Delos',
                },
            },
        ];

        return {
            message,
            cards,
            marine: safety.details.departure_conditions,
            suggestedFollowups: [
                'Check weather conditions',
                'Find hotels at my destination',
                'Book the fastest option',
            ],
        };
    }

    private async handleHotelSearch(params: Record<string, any>): Promise<ChatResponse> {
        try {
            const results = await searchHotels({
                location: params.location,
                checkin: params.checkin,
                checkout: params.checkout,
                adults: params.adults || params.guests || 2,
                children: params.children || 0,
                rooms: params.rooms || 1,
                budgetMax: params.budget_max,
                starRatingMin: params.star_rating,
                currency: 'EUR',
            });

            const cards: ResultCard[] = results.slice(0, 5).map(hotel => ({
                type: 'hotel' as const,
                title: hotel.name,
                subtitle: `${hotel.stars}⭐ | ${hotel.location}`,
                price: hotel.pricePerNight,
                currency: hotel.currency,
                rating: hotel.rating,
                imageUrl: hotel.imageUrl,
                bookingUrl: hotel.bookingUrl,
                details: {
                    'Per night': `€${hotel.pricePerNight}`,
                    'Rating': `${hotel.rating}/10 (${hotel.reviewCount} reviews)`,
                    'Amenities': hotel.amenities.slice(0, 3).join(', '),
                },
            }));

            return {
                message: `🏨 Found ${results.length} hotels in ${params.location}:`,
                cards,
                suggestedFollowups: [
                    'Show luxury options only',
                    'Find hotels near the port',
                    'What activities are available?',
                ],
            };
        } catch (error) {
            console.error('Hotel search error:', error);
            return {
                message: `I couldn't find hotels right now. Try searching on [Booking.com](https://www.booking.com/searchresults.html?ss=${params.location})`,
            };
        }
    }

    private async handleActivitySearch(params: Record<string, any>): Promise<ChatResponse> {
        try {
            const results = await searchActivities({
                location: params.location,
                date: params.date,
                participants: params.participants || 2,
                category: params.category,
            });

            const cards: ResultCard[] = results.slice(0, 5).map(activity => ({
                type: 'activity' as const,
                title: activity.title,
                subtitle: activity.category,
                price: activity.price,
                currency: activity.currency,
                rating: activity.rating,
                imageUrl: activity.imageUrl,
                bookingUrl: activity.bookingUrl,
                details: {
                    'Duration': activity.duration,
                    'Rating': `${activity.rating}/5 (${activity.reviewCount} reviews)`,
                    'Category': activity.category,
                },
            }));

            return {
                message: `🎯 Things to do in ${params.location}:`,
                cards,
                suggestedFollowups: [
                    'Show sunset cruises',
                    'Wine tasting tours',
                    'Beach activities',
                ],
            };
        } catch (error) {
            return {
                message: `Check out activities on [GetYourGuide](https://www.getyourguide.com/s/?q=${params.location})`,
            };
        }
    }

    private async handleWeatherForecast(params: Record<string, any>): Promise<ChatResponse> {
        const weather = await getTouristasWeather(params.location, params.date);

        if (!weather) {
            return {
                message: `I couldn't get the weather forecast for ${params.location}. Please try again.`,
            };
        }

        const message = `🌤️ **Weather in ${weather.location}** (${weather.date})\n\n` +
            `🌡️ Temperature: ${weather.temperature.min}°C - ${weather.temperature.max}°C\n` +
            `☁️ Conditions: ${weather.conditions}\n` +
            `💨 Wind: ${weather.wind.speed_kph} km/h ${weather.wind.direction}\n` +
            `☔ Rain chance: ${weather.precipitation.chance_percent}%\n` +
            `🌅 Sunrise: ${weather.sunrise} | Sunset: ${weather.sunset}\n\n` +
            weather.recommendation;

        return {
            message,
            weather,
            suggestedFollowups: [
                'Check sea conditions',
                'Is it safe for ferry travel?',
                'Best beaches to visit',
            ],
        };
    }

    private async handleMarineConditions(params: Record<string, any>): Promise<ChatResponse> {
        const marine = await getTouristasMarineConditions(params.location, params.date);

        if (!marine) {
            return {
                message: `I couldn't get sea conditions for ${params.location}. Please try again.`,
            };
        }

        const message = `🌊 **Sea Conditions at ${marine.location}** (${marine.date})\n\n` +
            `🌊 Sea state: ${marine.seaCondition.replace('_', ' ')}\n` +
            `📏 Wave height: ${marine.waveHeight}m\n` +
            `💨 Wind: ${marine.windSpeed} km/h ${marine.windDirection}\n` +
            `🌡️ Water temp: ${marine.waterTemp || 'N/A'}°C\n\n` +
            `⛴️ Ferry disruption risk: **${marine.ferryDisruptionRisk.toUpperCase()}**\n` +
            `🚤 Safe for small boats: ${marine.safeForSmallBoats ? '✅ Yes' : '❌ No'}\n\n` +
            marine.recommendation;

        return {
            message,
            marine,
            suggestedFollowups: [
                'Find ferry schedules',
                'Book a sunset cruise',
                'Check weather forecast',
            ],
        };
    }

    private async handleCarRentalSearch(params: Record<string, any>): Promise<ChatResponse> {
        // Mock car rental results
        const cards: ResultCard[] = [
            {
                type: 'car',
                title: 'Fiat 500 or similar',
                subtitle: 'Economy | Manual',
                price: 35,
                currency: 'EUR',
                details: {
                    'Per day': '€35',
                    'Insurance': 'Included',
                    'Mileage': 'Unlimited',
                },
            },
            {
                type: 'car',
                title: 'Toyota Yaris or similar',
                subtitle: 'Compact | Automatic',
                price: 55,
                currency: 'EUR',
                details: {
                    'Per day': '€55',
                    'Insurance': 'Included',
                    'Mileage': 'Unlimited',
                },
            },
        ];

        return {
            message: `🚗 Car rental options in ${params.location}:`,
            cards,
            suggestedFollowups: [
                'Show automatic cars only',
                'ATV/scooter rentals',
                'Driving tips for the island',
            ],
        };
    }

    private async handleInfoQuery(params: Record<string, any>): Promise<ChatResponse> {
        try {
            // Call Perplexity API for info queries
            const { data, error } = await supabase.functions.invoke('perplexity-search', {
                body: {
                    query: params.query || params.location,
                    context: 'Cyclades Greek Islands travel guide',
                }
            });

            if (data?.answer) {
                return {
                    message: data.answer,
                    suggestedFollowups: [
                        'Tell me more',
                        'What else should I know?',
                        'Find hotels nearby',
                    ],
                };
            }
        } catch (error) {
            console.error('Info query error:', error);
        }

        return {
            message: `I can help you with information about the Cyclades! What would you like to know?`,
            suggestedFollowups: [
                'Best time to visit',
                'Local food recommendations',
                'Getting around the islands',
            ],
        };
    }

    private async handleItineraryBuild(params: Record<string, any>): Promise<ChatResponse> {
        try {
            const islands = params.destinations || params.islands || ['Mykonos', 'Santorini'];
            const nights = params.nights || islands.map(() => 2);

            const itinerary = await buildItinerary({
                origin: params.origin || 'Athens',
                destinations: islands,
                startDate: params.start_date || params.dates || new Date().toISOString().split('T')[0],
                nights,
                travelers: {
                    adults: params.adults || params.travelers || 2,
                    children: params.children || 0,
                },
                preferences: {
                    budget: params.budget || 'mid-range',
                    transportPreference: 'fastest',
                    includeActivities: true,
                },
            });

            const message = formatItineraryForChat(itinerary);

            return {
                message,
                itinerary,
                suggestedFollowups: [
                    'Book the ferries',
                    'Find different hotels',
                    'Add more activities',
                ],
            };
        } catch (error) {
            console.error('Itinerary build error:', error);
            return {
                message: 'I encountered an issue building your itinerary. Let me try a simpler approach.',
            };
        }
    }

    // ============================================
    // HELPERS
    // ============================================

    private getSuggestedFollowups(transition: DialogTransition): string[] {
        const context = this.dialogMachine.getContext();

        if (context.state === 'COLLECTING_FIELDS') {
            // Provide helpful examples based on missing fields
            const missing = context.missingFields[0];
            switch (missing) {
                case 'departure_date':
                case 'date':
                    return ['Tomorrow', 'Next weekend', 'July 15'];
                case 'passengers':
                case 'travelers':
                case 'guests':
                    return ['2 adults', '2 adults 1 child', 'Just me'];
                case 'location':
                    return ['Santorini', 'Mykonos', 'Paros'];
                default:
                    return [];
            }
        }

        return [
            'Show me ferries',
            'Find hotels',
            'What\'s the weather like?',
        ];
    }

    /**
     * Get conversation history
     */
    getHistory(): ChatMessage[] {
        return [...this.conversationHistory];
    }

    /**
     * Reset conversation
     */
    reset(): void {
        this.conversationHistory = [];
        this.dialogMachine.reset();
    }

    private generateSessionId(): string {
        return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private generateId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    }
}

// Singleton instance
let chatServiceInstance: TouristasAIChatService | null = null;

export function getTouristasChat(): TouristasAIChatService {
    if (!chatServiceInstance) {
        chatServiceInstance = new TouristasAIChatService();
    }
    return chatServiceInstance;
}

export default TouristasAIChatService;
