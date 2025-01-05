export interface FerryRoute {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  operator: string;
  company: string;
  vessel: string;
  duration: number;
  departurePort: string;
  arrivalPort: string;
  departureCoordinates: [number, number];
  arrivalCoordinates: [number, number];
  intermediateStops: Array<{
    port: string;
    coordinates: [number, number];
    arrival: string;
    departure: string;
  }>;
  amenities: string[];
  weatherScore?: number;
}

interface WeatherData {
  location: string;
  condition: string;
  temperature: number;
  wind: number;
}

export const getFerryRoutes = async (from: string, to: string, _date: Date): Promise<FerryRoute[]> => {
  // Mock ferry route data for now
  return [{
    id: '1',
    from,
    to,
    departure: '09:00',
    arrival: '11:30',
    price: 45,
    operator: 'Blue Star Ferries',
    company: 'Blue Star Ferries',
    vessel: 'Blue Star Paros',
    duration: 150, // minutes
    departurePort: from,
    arrivalPort: to,
    departureCoordinates: [25.3444, 37.0476],
    arrivalCoordinates: [25.5272, 36.9911],
    intermediateStops: [],
    amenities: ['Cafe', 'WiFi', 'Deck']
  }];
};

export const getWeatherData = async (ports: string[]): Promise<Record<string, WeatherData>> => {
  // Mock weather data for now
  return ports.reduce((acc, port) => ({
    ...acc,
    [port]: {
      location: port,
      temperature: 25,
      condition: 'sunny',
      wind: 12
    }
  }), {});
};
