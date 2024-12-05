import React from 'react';
import { Sun, Cloud, Umbrella, Users } from 'lucide-react';
import { Island } from '../../types';

interface BestTimeToVisitProps {
  island: Island;
}

export default function BestTimeToVisit({ island }: BestTimeToVisitProps) {
  const seasons = [
    {
      name: 'Peak Season (June-August)',
      icon: Sun,
      description: 'Perfect beach weather, bustling atmosphere, and all attractions open. Expect higher prices and crowds.',
      highlights: ['Warmest weather', 'All facilities open', 'Vibrant nightlife', 'Beach activities'],
      temp: '25-30°C'
    },
    {
      name: 'Shoulder Season (April-May, September-October)',
      icon: Cloud,
      description: 'Mild weather, fewer crowds, and lower prices. Ideal for sightseeing and outdoor activities.',
      highlights: ['Pleasant temperatures', 'Lower prices', 'Less crowded', 'Good for hiking'],
      temp: '20-25°C'
    },
    {
      name: 'Low Season (November-March)',
      icon: Umbrella,
      description: 'Quietest period with occasional rain. Many facilities closed, but perfect for authentic local experiences.',
      highlights: ['Lowest prices', 'Local atmosphere', 'Cultural experiences', 'Winter charm'],
      temp: '12-18°C'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {seasons.map((season) => (
        <div key={season.name} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <season.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">{season.name}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{season.description}</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>Average temperature: {season.temp}</span>
            </div>
            <ul className="space-y-2">
              {season.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}