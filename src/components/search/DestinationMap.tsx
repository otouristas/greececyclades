import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotel, Ship, Plane, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CYCLADES_DESTINATIONS, CycladesDestination } from '../../services/placesService';

interface DestinationMapProps {
    /** Called when an island is selected */
    onSelect?: (destination: CycladesDestination) => void;
    /** Currently selected destination ID */
    selectedId?: string;
    /** Height of the map */
    height?: string;
    /** Additional className */
    className?: string;
}

// Create custom marker icons
const createIslandIcon = (isSelected: boolean, isPopular: boolean) => {
    const size = isSelected ? 40 : isPopular ? 32 : 28;
    const bgColor = isSelected ? '#0891b2' : isPopular ? '#06b6d4' : '#64748b';

    return L.divIcon({
        className: 'custom-island-marker',
        html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bgColor};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
      ">
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
};

// Map center controller
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();

    useMemo(() => {
        map.setView(center, zoom, { animate: true });
    }, [center, zoom, map]);

    return null;
}

// Popular islands (top 6)
const POPULAR_IDS = ['santorini', 'mykonos', 'naxos', 'paros', 'milos', 'ios'];

export default function DestinationMap({
    onSelect,
    selectedId,
    height = '500px',
    className = '',
}: DestinationMapProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Center of Cyclades
    const defaultCenter: [number, number] = [36.9, 25.2];
    const defaultZoom = 8;

    // Compute center based on selection
    const mapCenter = useMemo(() => {
        if (selectedId) {
            const dest = CYCLADES_DESTINATIONS.find(d => d.id === selectedId);
            if (dest) return [dest.lat, dest.lng] as [number, number];
        }
        return defaultCenter;
    }, [selectedId]);

    const mapZoom = selectedId ? 11 : defaultZoom;

    return (
        <div className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`} style={{ height }}>
            {/* Map Legend */}
            <div className="absolute top-4 left-4 z-[1000] bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100 dark:border-white/10">
                <div className="text-xs font-medium text-gray-700 dark:text-white/80 mb-2">Cyclades Islands</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span>Popular</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/60 mt-1">
                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                    <span>All Islands</span>
                </div>
            </div>

            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <MapController center={mapCenter} zoom={mapZoom} />

                {CYCLADES_DESTINATIONS.map((destination) => {
                    const isPopular = POPULAR_IDS.includes(destination.id);
                    const isSelected = destination.id === selectedId;
                    const isHovered = destination.id === hoveredId;

                    return (
                        <Marker
                            key={destination.id}
                            position={[destination.lat, destination.lng]}
                            icon={createIslandIcon(isSelected || isHovered, isPopular)}
                            eventHandlers={{
                                click: () => onSelect?.(destination),
                                mouseover: () => setHoveredId(destination.id),
                                mouseout: () => setHoveredId(null),
                            }}
                        >
                            <Popup className="island-popup">
                                <div className="min-w-[200px] p-1">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{destination.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{destination.description}</p>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/hotels?destination=${destination.name}`}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-cyan-500 text-white text-xs font-medium rounded-lg hover:bg-cyan-600 transition-colors"
                                        >
                                            <Hotel className="w-3.5 h-3.5" />
                                            Hotels
                                        </Link>
                                        <Link
                                            to={`/guides/${destination.id}`}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Guide
                                        </Link>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Quick Actions Overlay */}
            <div className="absolute bottom-4 right-4 z-[1000] flex gap-2">
                <Link
                    to="/ferry-tickets"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-dark-card transition-colors text-sm font-medium"
                >
                    <Ship className="w-4 h-4 text-cyan-500" />
                    Ferry Routes
                </Link>
                <Link
                    to="/flights"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-dark-card transition-colors text-sm font-medium"
                >
                    <Plane className="w-4 h-4 text-cyan-500" />
                    Flights
                </Link>
            </div>

            {/* Custom styles for popups */}
            <style>{`
        .island-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }
        .island-popup .leaflet-popup-tip {
          box-shadow: none;
        }
        .leaflet-popup-close-button {
          color: #64748b !important;
          font-size: 20px !important;
          padding: 8px !important;
        }
      `}</style>
        </div>
    );
}
