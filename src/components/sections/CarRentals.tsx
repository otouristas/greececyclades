import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import VehicleCard from '../vehicles/VehicleCard';
import { getVehicleSlug } from '../../utils/slugs';
import { Vehicle } from '../../types/vehicle';

export default function CarRentals() {
  const { vehicles } = useVehicleStore();
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      {/* Featured Vehicles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
            <p className="mt-2 text-gray-600">Explore our most popular rental options</p>
          </div>
          <Link 
            to="/rent-a-car"
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View all vehicles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <Link 
              key={vehicle.id} 
              to={`/rent-a-car/${getVehicleSlug(vehicle.make, vehicle.model)}`}
              className="group"
            >
              <VehicleCard vehicle={vehicle} compact />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}