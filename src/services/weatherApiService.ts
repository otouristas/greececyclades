/**
 * Touristas AI - WeatherAPI.com Service
 * Real-time weather, marine conditions, and ferry disruption risk
 * 
 * API Key: 85eada03a7b94acab0e132331251212
 * Docs: https://www.weatherapi.com/docs/
 */

// ============================================
// TYPES
// ============================================

export interface WeatherLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
}

export interface CurrentWeather {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

export interface ForecastDay {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        uv: number;
        daily_chance_of_rain: number;
    };
    astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
    };
    hour: ForecastHour[];
}

export interface ForecastHour {
    time: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
    chance_of_rain: number;
    uv: number;
    gust_kph: number;
}

export interface MarineHour {
    time: string;
    temp_c: number;
    wind_kph: number;
    wind_dir: string;
    gust_kph: number;
    sig_ht_mt: number;       // Significant wave height in meters
    swell_ht_mt: number;     // Swell wave height in meters
    swell_dir: number;       // Swell direction in degrees
    swell_dir_16_point: string;
    swell_period_secs: number;
    water_temp_c?: number;
    condition: {
        text: string;
        icon: string;
    };
}

export interface MarineDay {
    date: string;
    tides?: {
        tide: Array<{
            tide_time: string;
            tide_height_mt: number;
            tide_type: 'High' | 'Low';
        }>;
    };
    hour: MarineHour[];
}

export interface WeatherAlert {
    headline: string;
    msgType: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    event: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
}

// ============================================
// PROCESSED RESULTS (Touristas-specific)
// ============================================

export interface TouristasWeatherResult {
    location: string;
    date: string;
    temperature: {
        current: number;
        min: number;
        max: number;
        feelsLike: number;
    };
    conditions: string;
    icon: string;
    wind: {
        speed_kph: number;
        gust_kph: number;
        direction: string;
    };
    precipitation: {
        mm: number;
        chance_percent: number;
    };
    humidity: number;
    uv: number;
    sunrise: string;
    sunset: string;
    isGoodForBeach: boolean;
    recommendation: string;
}

export interface TouristasMarineResult {
    location: string;
    date: string;
    seaCondition: 'calm' | 'moderate' | 'rough' | 'very_rough' | 'dangerous';
    waveHeight: number;
    swellHeight: number;
    swellDirection: string;
    windSpeed: number;
    windGust: number;
    windDirection: string;
    waterTemp?: number;
    ferryDisruptionRisk: 'low' | 'medium' | 'high' | 'cancelled';
    safeForSmallBoats: boolean;
    safeForDayTrips: boolean;
    recommendation: string;
    tides?: Array<{
        time: string;
        height: number;
        type: 'high' | 'low';
    }>;
}

// ============================================
// API CLIENT
// ============================================

const WEATHER_API_KEY = '85eada03a7b94acab0e132331251212';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

/**
 * Cyclades island coordinates for weather queries
 */
const CYCLADES_COORDS: Record<string, { lat: number; lon: number }> = {
    'santorini': { lat: 36.3932, lon: 25.4615 },
    'thira': { lat: 36.3932, lon: 25.4615 },
    'oia': { lat: 36.4618, lon: 25.3753 },
    'fira': { lat: 36.4165, lon: 25.4322 },
    'mykonos': { lat: 37.4467, lon: 25.3289 },
    'paros': { lat: 37.0853, lon: 25.1522 },
    'parikia': { lat: 37.0853, lon: 25.1522 },
    'naxos': { lat: 37.1036, lon: 25.3756 },
    'ios': { lat: 36.7231, lon: 25.2823 },
    'milos': { lat: 36.7219, lon: 24.4258 },
    'syros': { lat: 37.4433, lon: 24.9211 },
    'tinos': { lat: 37.5361, lon: 25.1631 },
    'andros': { lat: 37.8336, lon: 24.9361 },
    'sifnos': { lat: 36.9833, lon: 24.7000 },
    'folegandros': { lat: 36.6258, lon: 24.9119 },
    'amorgos': { lat: 36.8333, lon: 25.9000 },
    'koufonisia': { lat: 36.9375, lon: 25.6025 },
    'serifos': { lat: 37.1500, lon: 24.4833 },
    'kea': { lat: 37.6167, lon: 24.3333 },
    'kythnos': { lat: 37.4000, lon: 24.4167 },
    'piraeus': { lat: 37.9475, lon: 23.6436 },
    'athens': { lat: 37.9838, lon: 23.7275 },
    'rafina': { lat: 38.0228, lon: 24.0097 },
    'heraklion': { lat: 35.3387, lon: 25.1442 },
    'crete': { lat: 35.2401, lon: 24.8093 },
};

/**
 * Get coordinates for a location
 */
function getCoordinates(location: string): { lat: number; lon: number } {
    const lower = location.toLowerCase();
    return CYCLADES_COORDS[lower] || CYCLADES_COORDS['santorini'];
}

/**
 * Get query string for WeatherAPI
 */
function getLocationQuery(location: string): string {
    const coords = getCoordinates(location);
    return `${coords.lat},${coords.lon}`;
}

// ============================================
// WEATHER FUNCTIONS
// ============================================

/**
 * Get current weather for a location
 */
export async function getCurrentWeather(location: string): Promise<{
    location: WeatherLocation;
    current: CurrentWeather;
} | null> {
    try {
        const query = getLocationQuery(location);
        const response = await fetch(
            `${WEATHER_API_BASE}/current.json?key=${WEATHER_API_KEY}&q=${query}&aqi=no`
        );

        if (!response.ok) {
            console.error('Weather API error:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

/**
 * Get weather forecast for a location (up to 14 days)
 */
export async function getWeatherForecast(
    location: string,
    days: number = 3
): Promise<{
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: { forecastday: ForecastDay[] };
    alerts?: { alert: WeatherAlert[] };
} | null> {
    try {
        const query = getLocationQuery(location);
        const response = await fetch(
            `${WEATHER_API_BASE}/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=${days}&aqi=no&alerts=yes`
        );

        if (!response.ok) {
            console.error('Weather API error:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

/**
 * Get marine/sea conditions for a location (up to 7 days)
 */
export async function getMarineConditions(
    location: string,
    days: number = 3
): Promise<{
    location: WeatherLocation;
    forecast: { forecastday: MarineDay[] };
} | null> {
    try {
        const query = getLocationQuery(location);
        const response = await fetch(
            `${WEATHER_API_BASE}/marine.json?key=${WEATHER_API_KEY}&q=${query}&days=${days}&tides=yes`
        );

        if (!response.ok) {
            console.error('Marine API error:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Marine fetch error:', error);
        return null;
    }
}

// ============================================
// PROCESSED RESULTS FOR TOURISTAS AI
// ============================================

/**
 * Get Touristas-formatted weather result
 */
export async function getTouristasWeather(
    location: string,
    date?: string
): Promise<TouristasWeatherResult | null> {
    const forecast = await getWeatherForecast(location, 7);
    if (!forecast) return null;

    // Find the specific date or use today
    let dayData: ForecastDay | null = null;
    if (date) {
        dayData = forecast.forecast.forecastday.find(d => d.date === date) || null;
    }
    if (!dayData) {
        dayData = forecast.forecast.forecastday[0];
    }

    const day = dayData.day;
    const current = forecast.current;

    // Determine if good for beach
    const isGoodForBeach =
        day.maxtemp_c >= 25 &&
        day.daily_chance_of_rain < 30 &&
        day.maxwind_kph < 25;

    // Generate recommendation
    let recommendation = '';
    if (day.maxtemp_c >= 30) {
        recommendation = '🌞 Hot day! Perfect for beach and swimming. Stay hydrated!';
    } else if (day.maxtemp_c >= 25) {
        recommendation = '☀️ Beautiful weather for outdoor activities and sightseeing.';
    } else if (day.maxtemp_c >= 20) {
        recommendation = '🌤️ Pleasant temperatures. Ideal for exploring villages and hiking.';
    } else {
        recommendation = '🧥 Cooler day. Bring a light jacket for evenings.';
    }

    if (day.daily_chance_of_rain > 50) {
        recommendation += ' ☔ Expect some rain - bring an umbrella!';
    }

    if (day.maxwind_kph > 30) {
        recommendation += ' 💨 Windy conditions - Meltemi season!';
    }

    return {
        location: forecast.location.name,
        date: dayData.date,
        temperature: {
            current: current.temp_c,
            min: day.mintemp_c,
            max: day.maxtemp_c,
            feelsLike: current.feelslike_c,
        },
        conditions: day.condition.text,
        icon: day.condition.icon,
        wind: {
            speed_kph: day.maxwind_kph,
            gust_kph: current.gust_kph,
            direction: current.wind_dir,
        },
        precipitation: {
            mm: day.totalprecip_mm,
            chance_percent: day.daily_chance_of_rain,
        },
        humidity: day.avghumidity,
        uv: day.uv,
        sunrise: dayData.astro.sunrise,
        sunset: dayData.astro.sunset,
        isGoodForBeach,
        recommendation,
    };
}

/**
 * Get Touristas-formatted marine conditions with ferry disruption risk
 */
export async function getTouristasMarineConditions(
    location: string,
    date?: string
): Promise<TouristasMarineResult | null> {
    const marine = await getMarineConditions(location, 7);
    if (!marine) return null;

    // Find the specific date or use today
    let dayData: MarineDay | null = null;
    if (date) {
        dayData = marine.forecast.forecastday.find(d => d.date === date) || null;
    }
    if (!dayData) {
        dayData = marine.forecast.forecastday[0];
    }

    // Get midday hour for representative conditions (12:00)
    const middayHour = dayData.hour.find(h => h.time.includes('12:00')) || dayData.hour[0];

    // Determine sea condition based on wave height
    let seaCondition: 'calm' | 'moderate' | 'rough' | 'very_rough' | 'dangerous';
    const waveHeight = middayHour.sig_ht_mt;

    if (waveHeight < 0.5) {
        seaCondition = 'calm';
    } else if (waveHeight < 1.0) {
        seaCondition = 'moderate';
    } else if (waveHeight < 2.0) {
        seaCondition = 'rough';
    } else if (waveHeight < 3.0) {
        seaCondition = 'very_rough';
    } else {
        seaCondition = 'dangerous';
    }

    // Calculate ferry disruption risk
    const windSpeed = middayHour.wind_kph;
    const windGust = middayHour.gust_kph;

    let ferryDisruptionRisk: 'low' | 'medium' | 'high' | 'cancelled';
    if (waveHeight < 1.0 && windSpeed < 30 && windGust < 40) {
        ferryDisruptionRisk = 'low';
    } else if (waveHeight < 2.0 && windSpeed < 45 && windGust < 55) {
        ferryDisruptionRisk = 'medium';
    } else if (waveHeight < 3.0 && windSpeed < 60) {
        ferryDisruptionRisk = 'high';
    } else {
        ferryDisruptionRisk = 'cancelled';
    }

    // Safe for small boats?
    const safeForSmallBoats = waveHeight < 1.0 && windSpeed < 25;
    const safeForDayTrips = waveHeight < 1.5 && windSpeed < 35;

    // Generate recommendation
    let recommendation = '';
    switch (ferryDisruptionRisk) {
        case 'low':
            recommendation = '✅ Excellent sailing conditions! Ferries running normally.';
            break;
        case 'medium':
            recommendation = '⚠️ Moderate conditions. Ferries may have minor delays. Smaller boats might be affected.';
            break;
        case 'high':
            recommendation = '🔴 Challenging conditions. Some ferry services may be cancelled or delayed. Avoid small boats.';
            break;
        case 'cancelled':
            recommendation = '🚫 Dangerous sea conditions. Ferry cancellations likely. Do not travel by sea today.';
            break;
    }

    if (windSpeed > 40) {
        recommendation += ' 💨 Strong Meltemi winds expected!';
    }

    // Process tides
    const tides = dayData.tides?.tide.map(t => ({
        time: t.tide_time,
        height: t.tide_height_mt,
        type: t.tide_type.toLowerCase() as 'high' | 'low',
    }));

    return {
        location: marine.location.name,
        date: dayData.date,
        seaCondition,
        waveHeight,
        swellHeight: middayHour.swell_ht_mt,
        swellDirection: middayHour.swell_dir_16_point,
        windSpeed: middayHour.wind_kph,
        windGust: middayHour.gust_kph,
        windDirection: middayHour.wind_dir,
        waterTemp: middayHour.water_temp_c,
        ferryDisruptionRisk,
        safeForSmallBoats,
        safeForDayTrips,
        recommendation,
        tides,
    };
}

/**
 * Check if it's safe to take a ferry on a specific date
 * Returns detailed safety assessment
 */
export async function checkFerrySafety(
    fromPort: string,
    toPort: string,
    date: string
): Promise<{
    safe: boolean;
    disruption_risk: 'low' | 'medium' | 'high' | 'cancelled';
    recommendation: string;
    details: {
        departure_conditions: TouristasMarineResult | null;
        arrival_conditions: TouristasMarineResult | null;
    };
}> {
    const [departureConditions, arrivalConditions] = await Promise.all([
        getTouristasMarineConditions(fromPort, date),
        getTouristasMarineConditions(toPort, date),
    ]);

    // Take the worse of the two conditions
    const worstRisk = (() => {
        const risks = [
            departureConditions?.ferryDisruptionRisk,
            arrivalConditions?.ferryDisruptionRisk,
        ].filter(Boolean) as Array<'low' | 'medium' | 'high' | 'cancelled'>;

        if (risks.includes('cancelled')) return 'cancelled';
        if (risks.includes('high')) return 'high';
        if (risks.includes('medium')) return 'medium';
        return 'low';
    })();

    const safe = worstRisk === 'low' || worstRisk === 'medium';

    let recommendation = '';
    if (worstRisk === 'cancelled') {
        recommendation = `🚫 Ferry travel between ${fromPort} and ${toPort} is NOT recommended on ${date}. Dangerous sea conditions expected. Consider rescheduling.`;
    } else if (worstRisk === 'high') {
        recommendation = `⚠️ High disruption risk for ${fromPort} → ${toPort} on ${date}. Possible delays or cancellations. Book flexible tickets and have a backup plan.`;
    } else if (worstRisk === 'medium') {
        recommendation = `🌊 Moderate conditions for ${fromPort} → ${toPort}. Ferries should run but may have slight delays. Large ferries recommended over small boats.`;
    } else {
        recommendation = `✅ Good sailing conditions for ${fromPort} → ${toPort} on ${date}. Ferries running normally!`;
    }

    return {
        safe,
        disruption_risk: worstRisk,
        recommendation,
        details: {
            departure_conditions: departureConditions,
            arrival_conditions: arrivalConditions,
        },
    };
}

// ============================================
// CONVENIENCE FUNCTION FOR AI RESPONSES
// ============================================

/**
 * Get a complete weather briefing for Touristas AI responses
 */
export async function getWeatherBriefing(
    location: string,
    date?: string
): Promise<{
    weather: TouristasWeatherResult | null;
    marine: TouristasMarineResult | null;
    summary: string;
}> {
    const [weather, marine] = await Promise.all([
        getTouristasWeather(location, date),
        getTouristasMarineConditions(location, date),
    ]);

    let summary = '';

    if (weather) {
        summary += `📍 **${weather.location}** (${weather.date})\n`;
        summary += `🌡️ ${weather.temperature.min}°C - ${weather.temperature.max}°C | `;
        summary += `${weather.conditions}\n`;
        summary += weather.recommendation + '\n';
    }

    if (marine) {
        summary += `\n🌊 **Sea Conditions**: ${marine.seaCondition.replace('_', ' ')}\n`;
        summary += `Wave height: ${marine.waveHeight}m | Wind: ${marine.windSpeed} km/h ${marine.windDirection}\n`;
        summary += marine.recommendation;
    }

    return { weather, marine, summary };
}

export default {
    getCurrentWeather,
    getWeatherForecast,
    getMarineConditions,
    getTouristasWeather,
    getTouristasMarineConditions,
    checkFerrySafety,
    getWeatherBriefing,
};
