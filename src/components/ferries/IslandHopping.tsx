import React from 'react';
import { ChevronRight } from 'lucide-react';

interface IslandHoppingRoute {
  name: string;
  stops: string[];
  description?: string;
}

interface IslandHoppingProps {
  className?: string;
}

const IslandHopping: React.FC<IslandHoppingProps> = ({ className }) => {
  // Island hopping routes data
  const islandHoppingRoutes: IslandHoppingRoute[] = [
    {
      name: 'Classic Cyclades Circuit',
      stops: ['Athens', 'Mykonos', 'Santorini', 'Naxos', 'Paros', 'Athens'],
      description: 'The most popular island-hopping route covering the iconic islands'
    },
    {
      name: 'Lesser Cyclades Explorer',
      stops: ['Athens', 'Naxos', 'Koufonissi', 'Schinoussa', 'Iraklia', 'Naxos', 'Athens'],
      description: 'Discover the authentic small Cyclades with pristine beaches'
    },
    {
      name: 'Western Cyclades Adventure',
      stops: ['Athens', 'Kythnos', 'Serifos', 'Sifnos', 'Milos', 'Athens'],
      description: 'Explore the less touristy western islands with amazing landscapes'
    },
    {
      name: 'Northern Cyclades Route',
      stops: ['Athens (Rafina)', 'Andros', 'Tinos', 'Mykonos', 'Syros', 'Athens (Piraeus)'],
      description: 'Combine cosmopolitan islands with traditional villages'
    }
  ];

  const openUrl = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Island Hopping Routes</h2>
      <p className="text-gray-600 mb-6">
        Explore these flexible Cyclades circuits for your island-hopping adventure:
      </p>
      <div className="space-y-4">
        {islandHoppingRoutes.map((route, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 p-4 cursor-pointer"
            onClick={() => openUrl('https://www.ferryscanner.com/en/ferry/results?ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN')}
          >
            <h3 className="font-bold text-lg text-blue-600 mb-2">{route.name}</h3>
            {route.description && (
              <p className="text-gray-600 mb-3">{route.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {route.stops.map((stop, idx) => (
                <React.Fragment key={idx}>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">{stop}</span>
                  {idx < route.stops.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center mt-2">
              Search This Route <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> For the best island-hopping experience, consider booking each leg separately with 2-3 days on each island. All routes are bookable on Ferryscanner.
        </p>
      </div>
    </div>
  );
};

export default IslandHopping;
