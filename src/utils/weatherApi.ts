const WEATHER_API_KEY = '31692b69774e49909f8162729250501';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherForecast {
  date: string;
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
}

export interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
  };
  forecast?: {
    forecastday: WeatherForecast[];
  };
}

export async function getCurrentWeather(location: string): Promise<WeatherResponse> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getForecast(location: string, days: number = 7): Promise<WeatherResponse> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getHistoricalWeather(location: string, date: string): Promise<WeatherResponse> {
  const response = await fetch(
    `${BASE_URL}/history.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&dt=${date}`
  );
  
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }
  
  return response.json();
}

// Helper function to get weather for multiple locations
export async function getMultiLocationForecast(locations: string[], days: number = 7): Promise<Record<string, WeatherResponse>> {
  const forecasts: Record<string, WeatherResponse> = {};
  
  await Promise.all(
    locations.map(async (location) => {
      try {
        forecasts[location] = await getForecast(location, days);
      } catch (error) {
        console.error(`Error fetching forecast for ${location}:`, error);
      }
    })
  );
  
  return forecasts;
}

// Helper function to determine best time to visit based on historical data
export async function getBestTimeToVisit(location: string, monthsToCheck: string[]): Promise<{ month: string; avgTemp: number; precipitation: number }[]> {
  const weatherData = await Promise.all(
    monthsToCheck.map(async (date) => {
      const data = await getHistoricalWeather(location, date);
      return {
        month: date,
        avgTemp: data.current.temp_c,
        precipitation: data.current.precip_mm
      };
    })
  );
  
  return weatherData.sort((a, b) => {
    // Prioritize moderate temperatures and low precipitation
    const aScore = Math.abs(25 - a.avgTemp) + a.precipitation;
    const bScore = Math.abs(25 - b.avgTemp) + b.precipitation;
    return aScore - bScore;
  });
}
