import { useState } from 'react';
import { MapPin, Globe, Info } from 'lucide-react';
import { PlaceDetails } from '../services/openTripMapService';

interface PointsOfInterestProps {
  places: PlaceDetails[];
  onPlaceSelect?: (place: PlaceDetails) => void;
  compact?: boolean;
}

export default function PointsOfInterest({ places, onPlaceSelect, compact = false }: PointsOfInterestProps) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);

  const handlePlaceClick = (place: PlaceDetails) => {
    setSelectedPlace(place);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  const getPlaceIcon = (kinds: string = '') => {
    const kindsList = kinds.split(',');
    
    if (kindsList.includes('historic')) {
      return '🏺';
    } else if (kindsList.includes('cultural')) {
      return '🏛️';
    } else if (kindsList.includes('religion')) {
      return '⛪';
    } else if (kindsList.includes('natural')) {
      return '🌲';
    } else if (kindsList.includes('architecture')) {
      return '🏰';
    } else if (kindsList.includes('museums')) {
      return '🏛️';
    } else if (kindsList.includes('amusements')) {
      return '🎡';
    } else if (kindsList.includes('foods')) {
      return '🍽️';
    }
    
    return '📍';
  };

  if (!places || places.length === 0) {
    return <div className="text-sm text-gray-500">No nearby places found</div>;
  }

  if (compact) {
    return (
      <div className="space-y-1">
        {places.slice(0, 3).map((place) => (
          <div
            key={place.xid}
            className="flex items-center text-sm text-gray-600"
          >
            <MapPin className="mr-1.5 h-3 w-3 text-gray-400" />
            <span className="truncate">{place.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {places.map((place) => (
        <div
          key={place.xid}
          className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedPlace?.xid === place.xid ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handlePlaceClick(place)}
        >
          <div className="flex items-start space-x-4">
            <div className="text-2xl flex-shrink-0">
              {getPlaceIcon(place.kinds)}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-900">{place.name}</h3>
              
              {place.kinds && (
                <p className="text-sm text-gray-500 mt-1">
                  {place.kinds.split(',')[0]}
                </p>
              )}

              {place.wikipedia_extracts?.text && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {place.wikipedia_extracts.text}
                </p>
              )}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {place.url && (
                  <a
                    href={place.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                )}

                {place.info?.descr && (
                  <div className="flex items-center text-gray-600">
                    <Info className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">{place.info.descr}</span>
                  </div>
                )}

                {place.address?.road && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="line-clamp-1">
                      {[
                        place.address.road,
                        place.address.house_number,
                        place.address.city,
                        place.address.state,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
