import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Island } from '../types/island';
import WeatherCard from './WeatherCard';
import PointsOfInterest from './PointsOfInterest';
import { PlaceDetails, getPlacesNearby } from '../services/openTripMapService';

interface IslandCardProps {
  island: Island;
  onRemove?: (island: Island) => void;
  showRemoveButton?: boolean;
  showDuration?: boolean;
  duration?: number;
}

export default function IslandCard({ island, onRemove, showRemoveButton, showDuration = false, duration }: IslandCardProps) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!showDetails || !island.coordinates) return;

      setLoading(true);
      try {
        const nearbyPlaces = await getPlacesNearby({
          lat: island.coordinates.lat,
          lon: island.coordinates.lng,
          radius: 5000,
          kinds: ['cultural', 'historic', 'architecture', 'beaches', 'natural'],
          limit: 10
        });

        // Convert Place[] to PlaceDetails[]
        setPlaces(nearbyPlaces.map(place => ({
          ...place,
          point: {
            lat: place.point.lat,
            lon: place.point.lon
          }
        })));
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [showDetails, island.coordinates]);

  const handleViewNearby = () => {
    if (island.coordinates) {
      navigate('/nearby', {
        state: {
          lat: island.coordinates.lat,
          lon: island.coordinates.lng,
          name: island.name
        }
      });
    }
  };

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={island.image}
          alt={island.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 w-full p-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{island.name}</h3>
                <p className="text-sm text-gray-300">{island.shortDescription}</p>
                {showDuration && (
                  <p className="text-sm text-blue-300 mt-1">
                    Suggested stay: {duration} days
                  </p>
                )}
              </div>
              {showRemoveButton && (
                <button
                  onClick={() => onRemove?.(island)}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Weather information */}
            <div className="mt-3">
              {island.weather && (
                <div className="absolute top-4 right-4">
                  <WeatherCard
                    weather={island.weather}
                    activities={island.activities || []}
                    compact
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4">
              {/* View Nearby button */}
              {island.coordinates && (
                <button
                  onClick={handleViewNearby}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  View Nearby
                </button>
              )}

              {/* Details button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
            </div>

            {showDetails && island.coordinates && (
              <div className="mt-4">
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Must-See Highlights</h4>
                  <ul className="space-y-2">
                    {island.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                {loading ? (
                  <div className="text-center text-gray-400 py-4">
                    Loading places...
                  </div>
                ) : (
                  <PointsOfInterest
                    places={places}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
