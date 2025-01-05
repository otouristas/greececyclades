import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PlaceDetails, Place } from '../services/openTripMapService';

// Fix for default marker icons in production
const defaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

type MapPlace = Place & {
  rate?: string | number;
};

interface PlacesMapProps {
  center: [number, number];
  zoom?: number;
  places: MapPlace[];
  selectedPlace?: PlaceDetails | null;
  onPlaceClick?: (place: MapPlace) => void;
}

// Component to handle map center updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

// Custom marker icons
function createCustomIcon(rating?: string | number) {
  const ratingValue = rating ? parseFloat(rating.toString()) : 0;
  const color = ratingValue >= 4 ? '#22c55e' : 
                ratingValue >= 3 ? '#eab308' : 
                ratingValue >= 2 ? '#f97316' : '#ef4444';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        <div style="color: white; font-size: 12px; font-weight: bold;">
          ${ratingValue ? ratingValue.toFixed(1) : '?'}
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

export default function PlacesMap({ 
  center, 
  zoom = 14, 
  places, 
  selectedPlace,
  onPlaceClick 
}: PlacesMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Update markers when places change
  useEffect(() => {
    if (mapRef.current && places.length > 0) {
      const bounds = L.latLngBounds(
        places.map(place => [place.point.lat, place.point.lon])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} />
      
      {places.map((place) => (
        <Marker
          key={place.xid}
          position={[place.point.lat, place.point.lon]}
          icon={createCustomIcon(place.rate)}
          eventHandlers={{
            click: () => onPlaceClick?.(place)
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold mb-1">{place.name}</h3>
              {place.kinds && (
                <p className="text-sm text-gray-600 mb-2">
                  {place.kinds.split(',')[0]}
                </p>
              )}
              {place.dist && (
                <p className="text-sm text-gray-500">
                  {(place.dist / 1000).toFixed(1)} km away
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedPlace && (
        <Marker
          position={[selectedPlace.point.lat, selectedPlace.point.lon]}
          icon={createCustomIcon(selectedPlace.rate)}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold mb-1">{selectedPlace.name}</h3>
              {selectedPlace.kinds && (
                <p className="text-sm text-gray-600 mb-2">
                  {selectedPlace.kinds.split(',')[0]}
                </p>
              )}
              {selectedPlace.dist && (
                <p className="text-sm text-gray-500">
                  {(selectedPlace.dist / 1000).toFixed(1)} km away
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
