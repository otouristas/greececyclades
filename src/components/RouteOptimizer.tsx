import { useMemo } from 'react';
import { Ship, Sun } from 'lucide-react';
import { Island } from '../types/island';
import { FerryRoute } from '../utils/api';
import clsx from 'clsx';

interface RouteOptimizerProps {
  selectedIslands: Island[];
  availableRoutes: FerryRoute[];
  selectedRoute: FerryRoute | null;
  onRouteSelect: (route: FerryRoute) => void;
  weatherData: Record<string, {
    condition: string;
    temperature: number;
    wind: number;
  }>;
}

export default function RouteOptimizer({
  availableRoutes,
  selectedRoute,
  onRouteSelect,
  weatherData
}: RouteOptimizerProps) {
  const routeOptions = useMemo(() => {
    return availableRoutes.map(route => ({
      ...route,
      weatherScore: calculateWeatherScore(route, weatherData),
      totalCost: calculateTotalCost(route),
      convenience: calculateConvenienceScore(route)
    }));
  }, [availableRoutes, weatherData]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Available Routes</h3>
      <div className="space-y-4">
        {routeOptions.map(route => (
          <div
            key={route.id}
            className={clsx(
              "border rounded-lg p-4 cursor-pointer transition-colors",
              selectedRoute?.id === route.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            )}
            onClick={() => onRouteSelect(route)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{route.company}</h4>
                <p className="text-sm text-gray-600">{route.vessel}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{route.price}€</p>
                <p className="text-sm text-gray-600">
                  {Math.floor(route.duration / 60)}h {route.duration % 60}m
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <Ship className="w-4 h-4 text-gray-500 mr-2" />
                <div className="text-sm">
                  <p className="font-medium">{route.from}</p>
                  <p className="text-gray-600">{route.departure}</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                {route.intermediateStops && route.intermediateStops.length > 0 ? (
                  <div className="text-sm text-center">
                    <p className="font-medium">
                      {route.intermediateStops.length} {route.intermediateStops.length === 1 ? 'Stop' : 'Stops'}
                    </p>
                    <p className="text-gray-600">
                      {route.intermediateStops.map(stop => stop.port).join(', ')}
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">Direct</div>
                )}
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm text-right">
                  <p className="font-medium">{route.to}</p>
                  <p className="text-gray-600">{route.arrival}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <div className="flex space-x-2">
                {route.amenities.map(amenity => (
                  <span
                    key={amenity}
                    className="px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <Sun className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-gray-600">
                  {Math.round(route.weatherScore * 100)}% Favorable
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWeatherScore(
  route: FerryRoute,
  weatherData: Record<string, {
    condition: string;
    temperature: number;
    wind: number;
  }>
): number {
  // Calculate average weather conditions along the route
  const relevantPorts = [
    route.departurePort,
    ...route.intermediateStops.map(stop => stop.port),
    route.arrivalPort
  ];

  const weatherScores = relevantPorts.map(port => {
    const weather = weatherData[port];
    if (!weather) return 0.7; // Default score if no weather data

    // Score based on condition
    const conditionScore =
      weather.condition === 'sunny' ? 1 :
      weather.condition === 'partly cloudy' ? 0.8 :
      weather.condition === 'cloudy' ? 0.6 :
      0.4;

    // Score based on temperature
    const tempScore =
      weather.temperature >= 20 && weather.temperature <= 28 ? 1 :
      weather.temperature > 28 ? 0.7 :
      0.5;

    // Score based on wind
    const windScore = 
      weather.wind <= 10 ? 1 :
      weather.wind <= 20 ? 0.8 :
      0.5;

    return (conditionScore + tempScore + windScore) / 3;
  });

  return weatherScores.reduce((sum, score) => sum + score, 0) / weatherScores.length;
}

function calculateTotalCost(route: FerryRoute): number {
  return route.price;
}

function calculateConvenienceScore(route: FerryRoute): number {
  let score = 1;

  // Penalize for intermediate stops
  if (route.intermediateStops.length > 0) {
    score -= route.intermediateStops.length * 0.1;
  }

  // Bonus for duration
  if (route.duration < 120) {
    score += 0.2;
  }

  // Bonus for amenities
  if (route.amenities.length >= 3) {
    score += 0.1;
  }

  return Math.max(0, Math.min(1, score));
}
