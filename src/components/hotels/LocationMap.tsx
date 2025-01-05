import { MapPin, Navigation } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationMapProps {
  hotel: {
    name: string;
    location: {
      coordinates?: {
        latitude: number;
        longitude: number;
      };
      address?: string;
      area: string;
      island: string;
    };
  };
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function LocationMap({ hotel }: LocationMapProps) {
  const center = hotel.location.coordinates ? {
    lat: hotel.location.coordinates.latitude,
    lng: hotel.location.coordinates.longitude
  } : {
    lat: 37.4219999,  // Default to Santorini coordinates if none provided
    lng: 25.4319999
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
        
        {/* Address Information */}
        <div className="flex items-start space-x-4 mb-6">
          <MapPin className="w-5 h-5 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
            <p className="text-gray-600 mt-1">
              {hotel.location.address || `${hotel.location.area}, ${hotel.location.island}, Greece`}
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
              <Marker
                position={center}
                title={hotel.name}
              />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Navigation Link */}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Navigation className="w-5 h-5 mr-2" />
          Get Directions
        </a>
      </div>
    </section>
  );
}
