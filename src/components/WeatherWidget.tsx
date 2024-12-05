import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherWidgetProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />;
  }
};

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{data.location}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">{data.temperature}°C</span>
            <span className="text-gray-500">{data.condition}</span>
          </div>
        </div>
        {getWeatherIcon(data.condition)}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-gray-400" />
          <span>Wind: {data.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-gray-400" />
          <span>Humidity: {data.humidity}%</span>
        </div>
      </div>
    </div>
  );
}