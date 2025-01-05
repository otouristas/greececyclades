import { FerryRoute, Stop } from '../types/ferry';
import { ferryCompanies } from '../data/ferryCompanies';

// Port coordinates for the Cyclades islands
const PORT_COORDINATES = {
  'Piraeus': { lat: 37.9475, lng: 23.6247 },
  'Santorini': { lat: 36.3932, lng: 25.4615 },
  'Paros': { lat: 37.0875, lng: 25.1542 },
  'Naxos': { lat: 37.1082, lng: 25.3736 },
  'Mykonos': { lat: 37.4467, lng: 25.3289 },
  'Milos': { lat: 36.7225, lng: 24.4459 },
  'Syros': { lat: 37.4438, lng: 24.9419 },
  'Tinos': { lat: 37.5396, lng: 25.1634 },
  'Ios': { lat: 36.7225, lng: 25.2797 },
  'Andros': { lat: 37.8369, lng: 24.9431 },
} as const;

// Mock data for demonstration - replace with actual API calls
const mockFerryRoutes: FerryRoute[] = [
  {
    id: 'route1',
    company: 'Blue Star Ferries',
    vessel: 'Blue Star Delos',
    departureTime: '07:30',
    arrivalTime: '11:45',
    duration: '4h 15m',
    price: 39.50,
    amenities: ['WiFi', 'Cafe', 'Premium Seating', 'Vehicle Transport'],
    availableSeats: 120,
    departurePort: 'Piraeus',
    arrivalPort: 'Santorini',
    departureCoordinates: PORT_COORDINATES['Piraeus'],
    arrivalCoordinates: PORT_COORDINATES['Santorini'],
    intermediateStops: [
      {
        port: 'Paros',
        arrivalTime: '09:45',
        departureTime: '10:00',
        coordinates: PORT_COORDINATES['Paros']
      },
      {
        port: 'Naxos',
        arrivalTime: '10:45',
        departureTime: '11:00',
        coordinates: PORT_COORDINATES['Naxos']
      }
    ]
  },
  {
    id: 'route2',
    company: 'SeaJets',
    vessel: 'WorldChampion Jet',
    departureTime: '08:00',
    arrivalTime: '11:00',
    duration: '3h',
    price: 59.50,
    amenities: ['Premium Seating', 'Onboard Restaurant', 'Business Class'],
    availableSeats: 85,
    departurePort: 'Piraeus',
    arrivalPort: 'Santorini',
    departureCoordinates: PORT_COORDINATES['Piraeus'],
    arrivalCoordinates: PORT_COORDINATES['Santorini']
  }
];

export async function getFerryRoutes(
  departurePort: string,
  arrivalPort: string,
  date: Date
): Promise<FerryRoute[]> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const routes = mockFerryRoutes.filter(route => 
        (route.departurePort === departurePort || !departurePort) &&
        (route.arrivalPort === arrivalPort || !arrivalPort)
      );
      resolve(routes);
    }, 1000);
  });
}

export async function getWeatherData(
  ports: string[]
): Promise<Record<string, { condition: string; temperature: number }>> {
  // TODO: Replace with actual weather API call
  return new Promise((resolve) => {
    const mockWeather: Record<string, { condition: string; temperature: number }> = {};
    ports.forEach(port => {
      mockWeather[port] = {
        condition: Math.random() > 0.8 ? 'Cloudy' : 'Clear',
        temperature: 20 + Math.floor(Math.random() * 10)
      };
    });
    setTimeout(() => {
      resolve(mockWeather);
    }, 1000);
  });
}

export function optimizeRoute(
  islands: string[],
  weatherData: Record<string, { condition: string; temperature: number }>
): string[] {
  // Simple route optimization - in reality, this would be more complex
  // considering weather conditions, ferry schedules, and distances
  return [...islands].sort((a, b) => {
    const weatherA = weatherData[a]?.temperature || 0;
    const weatherB = weatherData[b]?.temperature || 0;
    return weatherB - weatherA;
  });
}

export function calculateTotalCost(routes: FerryRoute[]): number {
  return routes.reduce((total, route) => total + route.price, 0);
}

export function estimateTotalDuration(routes: FerryRoute[]): string {
  const totalMinutes = routes.reduce((total, route) => {
    const duration = route.duration.split('h');
    const hours = parseInt(duration[0]);
    const minutes = duration[1] ? parseInt(duration[1].replace('m', '')) : 0;
    return total + hours * 60 + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
