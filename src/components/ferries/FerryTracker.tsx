import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { aisStreamService, FERRY_ROUTES, AISMessage } from '../../services/aisStreamService';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
  iconUrl: '/images/leaflet/marker-icon.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});

interface FerryPosition {
  mmsi: string;
  name: string;
  position: [number, number];
  heading: number;
  speed: number;
  destination?: string;
  lastUpdate: string;
}

const ferryIcon = new L.Icon({
  iconUrl: '/images/ferry-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function FerryTracker() {
  const [selectedIsland, setSelectedIsland] = useState<string>('');
  const [arrivals, setArrivals] = useState<Array<{
    name: string;
    eta: string;
    destination: string;
    currentPosition: [number, number];
  }>>([]);
  const [ferryPositions, setFerryPositions] = useState<Record<string, FerryPosition>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('FerryTracker mounted, setting up AIS Stream...');
    
    const handleAISMessage = (message: AISMessage) => {
      console.log('Handling AIS message:', message);
      
      if (message.MessageType === 'PositionReport' && message.Message.PositionReport) {
        const { Latitude, Longitude, TrueHeading, Sog } = message.Message.PositionReport;
        const { MMSI, ShipName, time_utc } = message.MetaData;

        if (!Latitude || !Longitude) {
          console.warn('Invalid position data received:', message);
          return;
        }

        console.log('Updating ferry position:', {
          MMSI,
          ShipName,
          Latitude,
          Longitude,
          TrueHeading,
          Sog
        });

        setFerryPositions(prev => {
          const newPositions = {
            ...prev,
            [MMSI]: {
              ...prev[MMSI],
              mmsi: MMSI,
              name: ShipName || prev[MMSI]?.name || 'Unknown Vessel',
              position: [Latitude, Longitude] as [number, number],
              heading: TrueHeading,
              speed: Sog,
              lastUpdate: time_utc
            }
          };
          console.log('Updated ferry positions:', newPositions);
          return newPositions;
        });
      } else if (message.MessageType === 'ShipStaticData' && message.Message.ShipStaticData) {
        const { Name, Destination } = message.Message.ShipStaticData;
        const { MMSI } = message.MetaData;

        if (!MMSI) {
          console.warn('Invalid static data received:', message);
          return;
        }

        console.log('Updating ferry static data:', {
          MMSI,
          Name,
          Destination
        });

        setFerryPositions(prev => {
          if (!prev[MMSI]) {
            console.log('No existing position data for MMSI:', MMSI);
            return prev;
          }

          const newPositions = {
            ...prev,
            [MMSI]: {
              ...prev[MMSI],
              name: Name || prev[MMSI]?.name,
              destination: Destination
            }
          };
          console.log('Updated ferry positions:', newPositions);
          return newPositions;
        });
      }
    };

    // Connect to AIS Stream and subscribe to messages
    console.log('Connecting to AIS Stream...');
    aisStreamService.connect();
    aisStreamService.subscribe(handleAISMessage);

    // Cleanup subscription and disconnect when component unmounts
    return () => {
      console.log('FerryTracker unmounting, cleaning up...');
      aisStreamService.unsubscribe(handleAISMessage);
      aisStreamService.disconnect();
    };
  }, []);

  // Add mock data for testing if no real data is available
  useEffect(() => {
    if (Object.keys(ferryPositions).length === 0) {
      console.log('No ferry positions received, adding mock data for testing...');
      setFerryPositions({
        '237583000': {
          mmsi: '237583000',
          name: 'Blue Star Paros',
          position: [37.4446, 25.3254],
          heading: 180,
          speed: 15,
          destination: 'Paros',
          lastUpdate: new Date().toISOString()
        },
        '237884000': {
          mmsi: '237884000',
          name: 'Hellenic Highspeed',
          position: [36.9915, 25.1254],
          heading: 90,
          speed: 20,
          destination: 'Santorini',
          lastUpdate: new Date().toISOString()
        }
      });
    }
  }, [ferryPositions]);

  // Calculate ETA based on current position and speed
  const calculateETA = (position: [number, number], destination: string, speed: number) => {
    // Simple ETA calculation for demo purposes
    // In a real app, we'd use actual route data and more complex calculations
    const destinationCoords = FERRY_ROUTES.find(route => 
      route.destinations.includes(destination)
    )?.destinations.find(d => d.name === destination)?.coordinates;

    if (!destinationCoords) return 'Unknown';

    const distance = L.latLng(position[0], position[1])
      .distanceTo(L.latLng(destinationCoords[0], destinationCoords[1])) / 1000; // km
    
    if (speed < 1) return 'Docked';
    
    const timeHours = distance / (speed * 1.852); // Convert knots to km/h
    const now = new Date();
    const eta = new Date(now.getTime() + timeHours * 60 * 60 * 1000);
    
    return eta.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Update arrivals when selected island or ferry positions change
  useEffect(() => {
    if (!selectedIsland) {
      setArrivals([]);
      return;
    }

    const relevantFerries = Object.values(ferryPositions).filter(ferry => {
      return ferry.destination === selectedIsland || 
             FERRY_ROUTES.some(route => 
               route.destinations.some(d => d.name === selectedIsland) &&
               route.mmsi.includes(ferry.mmsi)
             );
    });

    const newArrivals = relevantFerries.map(ferry => ({
      name: ferry.name,
      eta: calculateETA(ferry.position, selectedIsland, ferry.speed),
      destination: ferry.destination || 'Unknown',
      currentPosition: ferry.position
    })).sort((a, b) => a.eta.localeCompare(b.eta));

    setArrivals(newArrivals);
  }, [selectedIsland, ferryPositions]);

  // Get unique list of islands from ferry routes
  const islands = useMemo(() => {
    const allIslands = FERRY_ROUTES.flatMap(route => 
      route.destinations.map(d => ({ name: d.name, coordinates: d.coordinates }))
    );
    return [...new Set(allIslands)];
  }, []);

  return (
    <div className="max-w-[2000px] mx-auto p-6 bg-gray-50 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Ferry Tracking</h1>
        <p className="text-gray-600 max-w-3xl">
          Track ferries in real-time across the Cyclades islands. Our live tracking system shows you the current position,
          speed, and estimated arrival times of vessels operating in the region. Select an island to see upcoming arrivals.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Map Section - 9 columns */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
            <div className="h-[800px] relative [&_.leaflet-control]:!z-[500] [&_.leaflet-pane]:!z-[400] [&_.leaflet-top]:!z-[500] [&_.leaflet-bottom]:!z-[500]">
              <MapContainer
                center={[37.0902, 25.1542]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                className="!z-[1]"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.values(ferryPositions).map((ferry) => (
                  <Marker
                    key={ferry.mmsi}
                    position={ferry.position}
                    icon={ferryIcon}
                    rotationOrigin="center"
                    rotationAngle={ferry.heading}
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-bold text-blue-600">{ferry.name}</p>
                        <div className="mt-2 space-y-1">
                          <p className="flex items-center">
                            <span className="w-20 text-gray-500">Speed:</span>
                            <span className="font-medium">{Math.round(ferry.speed)} knots</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-20 text-gray-500">Heading to:</span>
                            <span className="font-medium">{ferry.destination || 'Unknown'}</span>
                          </p>
                          <p className="flex items-center">
                            <span className="w-20 text-gray-500">Updated:</span>
                            <span className="font-medium">{new Date(ferry.lastUpdate).toLocaleTimeString()}</span>
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <div className="bg-white px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{Object.keys(ferryPositions).length}</span> vessels currently being tracked
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrivals Section - 3 columns */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Island Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <label htmlFor="island-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Destination
            </label>
            <select
              id="island-select"
              value={selectedIsland}
              onChange={(e) => setSelectedIsland(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            >
              <option value="">Choose an island...</option>
              {islands.map((island) => (
                <option key={island.name} value={island.name}>
                  {island.name}
                </option>
              ))}
            </select>
          </div>

          {/* Arrivals Panel */}
          {selectedIsland && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Arrivals to {selectedIsland}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Estimated arrival times based on current positions
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {arrivals.length > 0 ? (
                  arrivals.map((arrival, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-blue-600">{arrival.name}</p>
                            <p className="text-sm text-gray-500">
                              From: {arrival.destination}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {arrival.eta}
                            </p>
                            <p className="text-xs text-gray-500">ETA</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No upcoming arrivals found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try selecting a different island
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500">
                * ETAs are estimates based on current vessel positions and speeds
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Ferry Operators</h4>
            <div className="space-y-2 text-sm">
              {FERRY_ROUTES.map(route => (
                <div key={route.id} className="flex items-center text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  {route.operator}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
