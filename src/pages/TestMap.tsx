import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Island } from '../types/islands';
import { IslandVibe, AvailableMonth } from '../types/island';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2FzaW1jZSIsImEiOiJjbHFtYnZ5aWIwYmFqMmtvNjZwbHd4ZHl6In0.PuBfNODwH_UKnkKnCGXJYw';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapIsland extends Omit<Island, 'id'> {
  id: number;
  location: [number, number];
  ferries: {
    destination: string;
    duration: string;
    price: string;
    departureTime: string;
  }[];
}

const islands: MapIsland[] = [
  {
    id: 1,
    name: 'Santorini',
    location: [25.3963, 36.3932],
    description: 'Famous for its stunning sunsets and white-washed buildings',
    shortDescription: 'Iconic island with caldera views',
    quote: 'The most beautiful sunset in the world',
    metaTitle: 'Santorini - Cyclades Island Guide',
    metaDescription: 'Discover the magic of Santorini',
    activities: [],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    weather: {
      temp: 25,
      condition: 'Sunny',
      summer: 'Hot and dry',
      winter: 'Mild',
      spring: 'Pleasant',
      autumn: 'Warm'
    },
    ferries: [
      {
        destination: 'Mykonos',
        duration: '2h 30m',
        price: '€40-60',
        departureTime: '10:00'
      }
    ],
    averageStay: 4,
    mustSee: ['Oia Sunset', 'Caldera View', 'Red Beach'],
    image: '/images/santorini.jpg',
    vibes: [IslandVibe.ROMANTIC, IslandVibe.SCENIC],
    size: 'MAJOR',
    slug: 'santorini',
    heroImage: '/images/santorini-hero.jpg',
    highlights: ['Stunning sunsets', 'Volcanic beaches', 'White architecture'],
    bestTime: {
      months: [AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      reason: 'Perfect weather and fewer crowds'
    },
    idealFor: ['Couples', 'Photographers', 'Luxury travelers']
  },
  {
    id: 2,
    name: 'Mykonos',
    location: [25.3289, 37.4415],
    description: 'Known for its vibrant nightlife and beautiful beaches',
    shortDescription: 'Cosmopolitan island paradise',
    quote: 'The island that never sleeps',
    metaTitle: 'Mykonos - Cyclades Island Guide',
    metaDescription: 'Experience the vibrant life of Mykonos',
    activities: [],
    bestMonths: [
      AvailableMonth.JUNE,
      AvailableMonth.JULY,
      AvailableMonth.AUGUST,
      AvailableMonth.SEPTEMBER
    ],
    weather: {
      temp: 24,
      condition: 'Clear',
      summer: 'Hot and windy',
      winter: 'Mild',
      spring: 'Pleasant',
      autumn: 'Warm'
    },
    ferries: [
      {
        destination: 'Santorini',
        duration: '2h 30m',
        price: '€40-60',
        departureTime: '15:00'
      }
    ],
    averageStay: 4,
    mustSee: ['Little Venice', 'Windmills', 'Paradise Beach'],
    image: '/images/mykonos.jpg',
    vibes: [IslandVibe.LIVELY, IslandVibe.LUXURIOUS],
    size: 'MAJOR',
    slug: 'mykonos',
    heroImage: '/images/mykonos-hero.jpg',
    highlights: ['Famous windmills', 'Vibrant nightlife', 'Pristine beaches'],
    bestTime: {
      months: [AvailableMonth.JUNE, AvailableMonth.SEPTEMBER],
      reason: 'Perfect weather and great party atmosphere'
    },
    idealFor: ['Party lovers', 'Beach enthusiasts', 'Luxury travelers']
  }
];

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [fromLocation, setFromLocation] = useState<MapIsland | null>(null);
  const [toLocation, setToLocation] = useState<MapIsland | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [25.3963, 36.9932],
      zoom: 8
    });

    // Add markers for each island
    islands.forEach(island => {
      const marker = new mapboxgl.Marker({ color: '#4A90E2' })
        .setLngLat(island.location)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${island.name}</h3>
            <p class="text-sm text-gray-600">${island.description}</p>
          </div>
        `))
        .addTo(map.current!);

      markersRef.current[island.id] = marker;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleLocationSelect = (location: MapIsland, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocation(location);
    } else {
      setToLocation(location);
    }

    if (map.current) {
      map.current.flyTo({
        center: location.location,
        zoom: 10,
        duration: 1500
      });
    }
  };

  const handleShowRoute = () => {
    if (!fromLocation || !toLocation || !map.current) return;

    // Clear existing routes
    const existingRouteLayer = map.current.getLayer('route');
    if (existingRouteLayer) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    if (!showRoutes) return;

    // Add new route
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [fromLocation.location, toLocation.location]
        }
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#4A90E2',
        'line-width': 3,
        'line-dasharray': [2, 2]
      }
    });

    // Fit bounds to show both locations
    const bounds = new mapboxgl.LngLatBounds()
      .extend(fromLocation.location)
      .extend(toLocation.location);

    map.current.fitBounds(bounds, {
      padding: 100,
      duration: 1500
    });
  };

  useEffect(() => {
    handleShowRoute();
  }, [fromLocation, toLocation, showRoutes]);

  return (
    <div className="flex flex-col h-screen">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Santorini, Greece"
              value={fromLocation ? `${fromLocation.name}, Greece` : ''}
              onChange={() => {}}
              onClick={() => {
                const island = islands.find(i => i.name === 'Santorini');
                if (island) handleLocationSelect(island, 'from');
              }}
            />
          </div>
          <button 
            onClick={handleSwapLocations}
            className="p-2.5 hover:bg-gray-50 rounded-lg border border-gray-300"
          >
            <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Mykonos, Greece"
              value={toLocation ? `${toLocation.name}, Greece` : ''}
              onChange={() => {}}
              onClick={() => {
                const island = islands.find(i => i.name === 'Mykonos');
                if (island) handleLocationSelect(island, 'to');
              }}
            />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>

      {/* Ferry Routes Toggle */}
      <div className="absolute top-20 right-4 z-10 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="flex items-center gap-2 px-3 py-2">
          <input
            type="checkbox"
            checked={showRoutes}
            onChange={(e) => setShowRoutes(e.target.checked)}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Show Ferry Routes</span>
        </label>
      </div>
    </div>
  );
}
