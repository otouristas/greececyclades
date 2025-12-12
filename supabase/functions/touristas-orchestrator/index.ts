import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface DeconstructedQuery {
    destination: string;
    duration: string;
    intents: string[];
    dates?: { checkin?: string; checkout?: string };
    travelers?: number;
    budget?: 'budget' | 'mid-range' | 'luxury';
    contextKeywords: string[];
}

interface WorkerResults {
    hotels?: any[];
    weather?: any;
    marine?: any;
    ferries?: any;
}

// Cyclades island coordinates for weather lookup
const ISLAND_COORDS: Record<string, { lat: number; lon: number }> = {
    'santorini': { lat: 36.3932, lon: 25.4615 },
    'mykonos': { lat: 37.4467, lon: 25.3289 },
    'paros': { lat: 37.0853, lon: 25.1522 },
    'naxos': { lat: 37.1036, lon: 25.3768 },
    'ios': { lat: 36.7233, lon: 25.2817 },
    'milos': { lat: 36.7489, lon: 24.4267 },
    'sifnos': { lat: 36.9667, lon: 24.7167 },
    'serifos': { lat: 37.1500, lon: 24.5000 },
    'folegandros': { lat: 36.6333, lon: 24.9167 },
    'amorgos': { lat: 36.8333, lon: 25.9000 },
    'syros': { lat: 37.4500, lon: 24.9167 },
    'tinos': { lat: 37.5333, lon: 25.1667 },
    'andros': { lat: 37.8333, lon: 24.9333 },
    'kea': { lat: 37.6167, lon: 24.3167 },
    'koufonisia': { lat: 36.9333, lon: 25.6000 },
};

// LiteAPI city codes for Cyclades
const ISLAND_CITY_CODES: Record<string, string> = {
    'santorini': 'thira',
    'mykonos': 'mykonos',
    'paros': 'paros',
    'naxos': 'naxos',
    'ios': 'ios',
    'milos': 'milos',
    'sifnos': 'sifnos',
};

// Phase 1: Deconstruct user query into structured intents using Perplexity
async function deconstructQuery(userMessage: string, perplexityKey: string): Promise<DeconstructedQuery> {
    const prompt = `Analyze this travel query and extract structured data. Return ONLY valid JSON.

Query: "${userMessage}"

Return JSON:
{
  "destination": "island or location name (lowercase)",
  "duration": "X days",
  "intents": ["logistics_hotels", "points_of_interest", "local_cuisine", "activities", "weather", "ferries"],
  "dates": { "checkin": "YYYY-MM-DD or null", "checkout": "YYYY-MM-DD or null" },
  "travelers": 2,
  "budget": "mid-range",
  "contextKeywords": ["sunset", "beaches", "romantic"]
}

If no destination, use "santorini". Always include relevant intents.`;

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${perplexityKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'sonar',
                messages: [
                    { role: 'system', content: 'You are a JSON parser. Return only valid JSON, no markdown.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 500,
                temperature: 0.1,
            })
        });

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '{}';

        // Clean up the response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanedText);

        // Ensure we always have required fields with defaults
        return {
            destination: parsed.destination || 'santorini',
            duration: parsed.duration || '5 days',
            intents: parsed.intents || ['logistics_hotels', 'points_of_interest', 'weather'],
            dates: parsed.dates,
            travelers: parsed.travelers || 2,
            budget: parsed.budget || 'mid-range',
            contextKeywords: parsed.contextKeywords || ['beaches', 'sunset']
        };
    } catch (error) {
        console.error('Deconstruction error:', error);
        // Return full fallback with all required fields
        return {
            destination: 'santorini',
            duration: '5 days',
            intents: ['logistics_hotels', 'points_of_interest', 'weather'],
            travelers: 2,
            budget: 'mid-range',
            contextKeywords: ['beaches', 'sunset']
        };
    }
}

// Phase 2: Fan out to workers (parallel API calls)
async function fanOutWorkers(query: DeconstructedQuery): Promise<WorkerResults> {
    const results: WorkerResults = {};
    const workers: Promise<void>[] = [];

    const weatherApiKey = Deno.env.get('WEATHER_API_KEY');
    const liteApiKey = Deno.env.get('LITEAPI_KEY');

    // Safe access to intents array
    const intents = query.intents || [];

    // Worker A: Real Weather from WeatherAPI.com
    if (intents.includes('weather') || intents.includes('logistics_hotels') || intents.length === 0) {
        workers.push(
            fetchRealWeather(query, weatherApiKey).then(weather => {
                results.weather = weather;
            }).catch(err => {
                console.error('Weather API error:', err);
                results.weather = { error: 'Weather data unavailable' };
            })
        );
    }

    // Worker B: Marine conditions for ferry safety
    if (intents.includes('ferries') || intents.includes('weather')) {
        workers.push(
            fetchMarineConditions(query, weatherApiKey).then(marine => {
                results.marine = marine;
            }).catch(err => {
                console.error('Marine API error:', err);
            })
        );
    }

    // Worker C: Hotels from LiteAPI
    if (intents.includes('logistics_hotels') && liteApiKey) {
        workers.push(
            fetchRealHotels(query, liteApiKey).then(hotels => {
                results.hotels = hotels;
            }).catch(err => {
                console.error('Hotel API error:', err);
                results.hotels = [];
            })
        );
    }

    // Wait for all parallel workers
    await Promise.allSettled(workers);

    return results;
}

// REAL Weather API call
async function fetchRealWeather(query: DeconstructedQuery, apiKey?: string): Promise<any> {
    if (!apiKey) {
        console.warn('No WEATHER_API_KEY, using fallback');
        return getFallbackWeather(query.destination);
    }

    const destination = query.destination.toLowerCase();
    const coords = ISLAND_COORDS[destination] || ISLAND_COORDS['santorini'];

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${coords.lat},${coords.lon}&days=7&aqi=no`
        );

        if (!response.ok) {
            throw new Error(`Weather API returned ${response.status}`);
        }

        const data = await response.json();

        return {
            destination: query.destination,
            current: {
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                humidity: data.current.humidity,
                windKph: data.current.wind_kph,
                feelsLike: data.current.feelslike_c,
            },
            forecast: data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                condition: day.day.condition.text,
                chanceOfRain: day.day.daily_chance_of_rain,
            })),
            beachConditions: data.current.wind_kph < 20 ? 'Excellent' : data.current.wind_kph < 35 ? 'Good' : 'Windy',
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return getFallbackWeather(query.destination);
    }
}

// REAL Marine conditions for ferry safety
async function fetchMarineConditions(query: DeconstructedQuery, apiKey?: string): Promise<any> {
    if (!apiKey) {
        return { available: false };
    }

    const destination = query.destination.toLowerCase();
    const coords = ISLAND_COORDS[destination] || ISLAND_COORDS['santorini'];

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${coords.lat},${coords.lon}&days=3`
        );

        if (!response.ok) {
            return { available: false };
        }

        const data = await response.json();
        const today = data.forecast?.forecastday?.[0]?.hour?.[12]; // Noon conditions

        if (!today) {
            return { available: false };
        }

        const waveHeight = today.sig_ht_mt || 0;
        let ferryRisk = 'low';
        let ferryAdvice = 'All ferries should operate normally.';

        if (waveHeight > 3) {
            ferryRisk = 'high';
            ferryAdvice = 'Ferry cancellations likely. Check with operators before traveling.';
        } else if (waveHeight > 2) {
            ferryRisk = 'medium';
            ferryAdvice = 'Some delays possible. High-speed catamarans may be cancelled.';
        }

        return {
            available: true,
            waveHeight,
            swellHeight: today.swell_ht_mt,
            windKph: today.wind_kph,
            ferryRisk,
            ferryAdvice,
        };
    } catch (error) {
        console.error('Marine fetch error:', error);
        return { available: false };
    }
}

// REAL Hotel search via LiteAPI
async function fetchRealHotels(query: DeconstructedQuery, apiKey: string): Promise<any[]> {
    const destination = query.destination.toLowerCase();
    const cityCode = ISLAND_CITY_CODES[destination] || 'santorini';

    // Default dates if not provided
    const checkin = query.dates?.checkin || getDefaultCheckin();
    const checkout = query.dates?.checkout || getDefaultCheckout();

    try {
        const response = await fetch(
            `https://api.liteapi.travel/v3.0/data/hotels?countryCode=GR&cityName=${cityCode}`,
            {
                headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            console.error('LiteAPI hotels error:', response.status);
            return getFallbackHotels(query);
        }

        const data = await response.json();
        const hotels = data.data?.slice(0, 5) || [];

        return hotels.map((hotel: any) => ({
            id: hotel.id,
            name: hotel.name,
            stars: hotel.starRating || 4,
            address: hotel.address,
            location: query.destination,
            priceRange: getPriceRangeForBudget(query.budget),
            amenities: hotel.amenities?.slice(0, 5) || ['Pool', 'WiFi', 'Restaurant'],
            source: 'LiteAPI',
        }));
    } catch (error) {
        console.error('Hotel fetch error:', error);
        return getFallbackHotels(query);
    }
}

// Fallback data when APIs unavailable
function getFallbackWeather(destination: string) {
    return {
        destination,
        current: {
            temperature: 28,
            condition: 'Sunny',
            humidity: 55,
            windKph: 15,
            feelsLike: 30,
        },
        forecast: [
            { date: 'Today', maxTemp: 30, minTemp: 24, condition: 'Sunny', chanceOfRain: 0 },
            { date: 'Tomorrow', maxTemp: 31, minTemp: 25, condition: 'Mostly Sunny', chanceOfRain: 5 },
        ],
        beachConditions: 'Excellent',
        note: 'Fallback data - real weather service temporarily unavailable',
    };
}

function getFallbackHotels(query: DeconstructedQuery) {
    const priceBase = query.budget === 'luxury' ? 300 : query.budget === 'budget' ? 80 : 150;
    return [
        {
            name: `${query.destination} Boutique Hotel`,
            stars: 4,
            priceRange: `€${priceBase}-${priceBase + 100}/night`,
            location: query.destination,
            amenities: ['Pool', 'Sea View', 'Breakfast'],
            source: 'Fallback',
        }
    ];
}

function getPriceRangeForBudget(budget?: string) {
    switch (budget) {
        case 'luxury': return '€250-500/night';
        case 'budget': return '€50-100/night';
        default: return '€100-200/night';
    }
}

function getDefaultCheckin() {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
}

function getDefaultCheckout() {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split('T')[0];
}

// Phase 3 & 4: Synthesize response with Perplexity
async function synthesizeResponse(
    userMessage: string,
    deconstructed: DeconstructedQuery,
    workerData: WorkerResults,
    conversationHistory: ChatMessage[],
    perplexityKey: string
): Promise<string> {

    const systemPrompt = `You are Touristas AI, an expert Greek Cyclades travel assistant.

CRITICAL RULES (YOU MUST FOLLOW THESE):
1. ALWAYS respond in English only. Never use Greek text or characters.
2. HOTEL REQUESTS WITHOUT DATES: If a user asks about hotels but has NOT specified travel dates AND number of guests, you MUST:
   - DO NOT mention ANY specific hotel names
   - DO NOT recommend any properties
   - ONLY respond with something like:
     "I'd love to help you find the perfect hotel in [location]! To search for real-time availability and prices, I need a bit more info:
     - **When** are you planning to visit? (dates)
     - **How many guests** will be traveling?"
   - Wait for their response before providing hotel recommendations
3. FLIGHT REQUESTS WITHOUT DATES/ROUTE: If a user asks about flights but has NOT specified travel dates AND origin+destination, you MUST:
   - DO NOT mention ANY specific airlines or flight options
   - ONLY respond with something like:
     "I can help you find flights! To search for the best options, please tell me:
     - **Where** are you flying from?
     - **Which island** do you want to fly to?
     - **When** are you planning to travel?"
   - Wait for their response before providing flight options
4. Once dates and required info are provided, THEN you can search and recommend specific hotels/flights.

PERSONALITY:
- Warm, enthusiastic, genuinely passionate about Greek islands
- Give specific, actionable recommendations (only AFTER you have dates)


REAL-TIME DATA AVAILABLE:
${workerData.weather?.current ? `
🌡️ CURRENT WEATHER (${workerData.weather.destination}):
- Temperature: ${workerData.weather.current.temperature}°C (feels like ${workerData.weather.current.feelsLike}°C)
- Conditions: ${workerData.weather.current.condition}
- Wind: ${workerData.weather.current.windKph} km/h
- Beach conditions: ${workerData.weather.beachConditions}
${workerData.weather.forecast ? `
📅 FORECAST:
${workerData.weather.forecast.slice(0, 3).map((f: any) => `  - ${f.date}: ${f.condition}, ${f.maxTemp}°C`).join('\n')}
` : ''}
` : ''}
${workerData.marine?.available ? `
⛴️ FERRY CONDITIONS:
- Wave height: ${workerData.marine.waveHeight}m
- Ferry risk: ${workerData.marine.ferryRisk.toUpperCase()}
- Advice: ${workerData.marine.ferryAdvice}
` : ''}
${(workerData.hotels?.length || 0) > 0 ? `
🏨 HOTELS AVAILABLE:
${workerData.hotels?.slice(0, 3).map((h: any) => `  - ${h.name} (${h.stars}⭐) - ${h.priceRange}`).join('\n')}
` : ''}

QUERY ANALYSIS:
- Destination: ${deconstructed.destination}
- Duration: ${deconstructed.duration}
- Budget: ${deconstructed.budget || 'mid-range'}
- Travelers: ${deconstructed.travelers || 2}
- Interests: ${(deconstructed.contextKeywords || []).join(', ')}

INSTRUCTIONS:
1. RESPOND IN ENGLISH ONLY - no Greek characters or phrases
2. If hotel request is missing dates/guests, ASK for them first
3. USE THE REAL DATA above - do not make up temperatures or conditions
4. If weather data shows high winds (>25km/h), warn about potential ferry issues
5. Create engaging, markdown-formatted responses
6. Keep responses concise but helpful (max 300 words)`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-6).map(m => ({
            role: m.role,
            content: m.content
        })),
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${perplexityKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'sonar',
                messages,
                max_tokens: 1000,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'I apologize, I had trouble processing that. Could you try again?';
    } catch (error) {
        console.error('Synthesis error:', error);
        return 'I encountered an error. Please try again.';
    }
}

// Main handler
serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { messages, userContext } = await req.json();
        const userMessage = messages[messages.length - 1]?.content || '';

        const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');

        if (!perplexityKey) {
            return new Response(
                JSON.stringify({
                    error: 'PERPLEXITY_API_KEY not configured',
                    success: false
                }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log('🧠 Phase 1: Deconstructing query...');
        const deconstructed = await deconstructQuery(userMessage, perplexityKey);
        console.log('📊 Deconstructed:', JSON.stringify(deconstructed));

        console.log('⚡ Phase 2: Fan-out to REAL API workers...');
        const workerData = await fanOutWorkers(deconstructed);
        console.log('📦 Worker data:', JSON.stringify({
            hasWeather: !!workerData.weather,
            hasMarine: !!workerData.marine,
            hotelCount: workerData.hotels?.length || 0
        }));

        console.log('✨ Phase 3-4: Synthesizing response...');
        const responseText = await synthesizeResponse(
            userMessage,
            deconstructed,
            workerData,
            messages.slice(0, -1),
            perplexityKey
        );

        return new Response(
            JSON.stringify({
                response: responseText,
                metadata: {
                    deconstructed,
                    workerData,
                    sources: {
                        weather: workerData.weather?.note ? 'fallback' : 'WeatherAPI.com',
                        hotels: workerData.hotels?.[0]?.source || 'none',
                        marine: workerData.marine?.available ? 'WeatherAPI Marine' : 'none',
                    }
                },
                success: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Orchestrator error:', error);
        return new Response(
            JSON.stringify({
                error: error.message,
                success: false
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
