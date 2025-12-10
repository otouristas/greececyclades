import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hotel marker icon
const hotelIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface HotelLocationMapProps {
    latitude: number;
    longitude: number;
    hotelName: string;
    address?: string;
    city?: string;
    country?: string;
}

// Component to recenter map when coordinates change
function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 15);
    }, [lat, lng, map]);
    return null;
}

export function HotelLocationMap({
    latitude,
    longitude,
    hotelName,
    address,
    city,
    country
}: HotelLocationMapProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Tile layer URL - using CartoDB for dark mode support
    const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tileAttribution = isDark
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const fullAddress = [address, city, country].filter(Boolean).join(', ');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    if (!latitude || !longitude || latitude === 0 || longitude === 0) {
        return (
            <div className={`h-80 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-card border border-white/10' : 'bg-gray-100 border border-gray-200'}`}>
                <div className="text-center">
                    <MapPin className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Location not available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Map Container */}
            <div className={`h-80 rounded-xl overflow-hidden shadow-lg ${isDark ? 'border border-white/10' : 'border border-gray-200'}`}>
                <MapContainer
                    center={[latitude, longitude]}
                    zoom={15}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                >
                    <TileLayer url={tileUrl} attribution={tileAttribution} />
                    <Marker position={[latitude, longitude]} icon={hotelIcon}>
                        <Popup>
                            <div className="p-1">
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{hotelName}</h4>
                                {fullAddress && <p className="text-xs text-gray-600">{fullAddress}</p>}
                            </div>
                        </Popup>
                    </Marker>
                    <MapRecenter lat={latitude} lng={longitude} />
                </MapContainer>
            </div>

            {/* Coordinates Display */}
            <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl ${isDark ? 'bg-dark-card border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyclades-turquoise/10'}`}>
                        <MapPin className="w-5 h-5 text-cyclades-turquoise" />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {fullAddress || hotelName}
                        </p>
                        <p className={`text-xs font-mono ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            {latitude.toFixed(6)}, {longitude.toFixed(6)}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className={`text-xs ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
                    >
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                            View Map
                        </a>
                    </Button>
                    <Button
                        size="sm"
                        asChild
                        className={`text-xs ${isDark ? 'bg-cyclades-turquoise hover:bg-cyan-500' : 'bg-cyclades-turquoise hover:bg-cyan-600'} text-white`}
                    >
                        <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                            <Navigation className="w-3.5 h-3.5 mr-1.5" />
                            Directions
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
