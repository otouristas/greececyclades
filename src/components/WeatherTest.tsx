import { useEffect, useState } from 'react';
import { getCurrentWeather, WeatherResponse } from '../utils/weatherApi';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

export default function WeatherTest() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await getCurrentWeather('Santorini,Greece');
        console.log('Weather data:', data);
        setWeather(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse text-gray-400">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-lg">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-lg">
        <div className="text-gray-500">No weather data available</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold">{weather.location.name}</h2>
            <p className="text-blue-100">{weather.location.country}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
            <p className="text-blue-100">Feels like {Math.round(weather.current.feelslike_c)}°C</p>
          </div>
        </div>

        {/* Current Weather */}
        <div className="flex items-center mb-8">
          <img 
            src={`https:${weather.current.condition.icon}`} 
            alt={weather.current.condition.text}
            className="w-20 h-20 mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{weather.current.condition.text}</h3>
            <p className="text-blue-100">{new Date(weather.location.localtime).toLocaleString()}</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center text-blue-100 mb-2">
              <Thermometer className="w-4 h-4 mr-2" />
              <span>Temperature</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center text-blue-100 mb-2">
              <Wind className="w-4 h-4 mr-2" />
              <span>Wind</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(weather.current.wind_kph)} km/h</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center text-blue-100 mb-2">
              <Droplets className="w-4 h-4 mr-2" />
              <span>Humidity</span>
            </div>
            <div className="text-2xl font-bold">{weather.current.humidity}%</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center text-blue-100 mb-2">
              <Cloud className="w-4 h-4 mr-2" />
              <span>Precipitation</span>
            </div>
            <div className="text-2xl font-bold">{weather.current.precip_mm} mm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
