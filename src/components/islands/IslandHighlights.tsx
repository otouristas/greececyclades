import React from 'react';
import { Palmtree, Mountain, UtensilsCrossed, Sun, Wine, Landmark } from 'lucide-react';
import { Island } from '../../types';

interface IslandHighlightsProps {
  island: Island;
}

export default function IslandHighlights({ island }: IslandHighlightsProps) {
  const highlights = [
    {
      icon: Palmtree,
      title: 'Beaches',
      description: 'Crystal clear waters and stunning beaches ranging from golden sand to unique volcanic formations.'
    },
    {
      icon: Mountain,
      title: 'Landscapes',
      description: 'Dramatic cliffs, traditional villages, and breathtaking viewpoints across the island.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Cuisine',
      description: 'Fresh seafood, local specialties, and traditional Greek tavernas with authentic flavors.'
    },
    {
      icon: Sun,
      title: 'Experiences',
      description: 'Unforgettable sunsets, boat tours, and unique cultural experiences.'
    },
    {
      icon: Wine,
      title: 'Local Products',
      description: 'Famous wines, artisanal products, and local delicacies unique to the island.'
    },
    {
      icon: Landmark,
      title: 'Culture',
      description: 'Rich history, archaeological sites, and traditional Cycladic architecture.'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlights.map((highlight) => (
        <div key={highlight.title} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <highlight.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">{highlight.title}</h3>
          </div>
          <p className="text-gray-600">{highlight.description}</p>
        </div>
      ))}
    </div>
  );
}