import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../store/vehicleStore';
import VehicleLanding from '../components/vehicles/VehicleLanding';
import { parseVehicleSlug } from '../utils/slugs';
import React from 'react';

export default function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { vehicles } = useVehicleStore();

  // Find vehicle by slug
  const vehicle = React.useMemo(() => {
    if (!slug) return null;
    
    const parsedSlug = parseVehicleSlug(slug);
    if (!parsedSlug) return null;

    return vehicles.find(v => 
      v.make.toLowerCase() === parsedSlug.make.toLowerCase() && 
      v.model.toLowerCase() === parsedSlug.model.toLowerCase()
    );
  }, [slug, vehicles]);

  // Redirect to rent-a-car page if vehicle not found
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the vehicle you're looking for.</p>
          <button 
            onClick={() => navigate('/rent-a-car')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Vehicles
          </button>
        </div>
      </div>
    );
  }

  return <VehicleLanding vehicle={vehicle} />;
}
