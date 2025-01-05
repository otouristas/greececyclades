import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Island } from '../types/island';
import { FerryRoute } from '../utils/api';

interface IslandHoppingMapProps {
  selectedIslands: Island[];
  ferryRoutes: FerryRoute[];
  onRouteSelect: (route: FerryRoute) => void;
}

const CYCLADES_CENTER: [number, number] = [25.3444, 37.0476];
const ZOOM_LEVEL = 8;

export default function IslandHoppingMap({ selectedIslands, ferryRoutes, onRouteSelect }: IslandHoppingMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: CYCLADES_CENTER,
      zoom: ZOOM_LEVEL
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Add markers for selected islands
    selectedIslands.forEach(island => {
      if (!island.coordinates) return;
      
      new mapboxgl.Marker()
        .setLngLat([island.coordinates.lng, island.coordinates.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${island.name}</h3>`))
        .addTo(map.current!);
    });

    // Draw ferry routes
    ferryRoutes.forEach(route => {
      const coordinates = [
        route.departureCoordinates,
        ...(route.intermediateStops || []).map(stop => stop.coordinates),
        route.arrivalCoordinates
      ];

      if (map.current?.getSource(`route-${route.id}`)) {
        (map.current.getSource(`route-${route.id}`) as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        });
      } else {
        map.current?.addSource(`route-${route.id}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        });

        map.current?.addLayer({
          id: `route-${route.id}`,
          type: 'line',
          source: `route-${route.id}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#2563eb',
            'line-width': 2,
            'line-dasharray': [2, 1]
          }
        });

        // Add click event to select route
        map.current?.on('click', `route-${route.id}`, () => {
          onRouteSelect(route);
        });
      }
    });
  }, [selectedIslands, ferryRoutes, onRouteSelect]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
