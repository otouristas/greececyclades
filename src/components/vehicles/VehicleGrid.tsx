import { Link } from 'react-router-dom';
import { Vehicle } from '../../types/vehicle';
import VehicleCard from './VehicleCard';
import { getVehicleSlug } from '../../utils/slugify';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} to={`/rent-a-car/${getVehicleSlug(vehicle.make, vehicle.model)}`}>
          <VehicleCard vehicle={vehicle} />
        </Link>
      ))}
    </div>
  );
}