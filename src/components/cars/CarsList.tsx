import { useEffect, useState } from 'react';
import { getAllRentalCars } from '../../lib/queries/getRentalCars';
import { Database } from '../../types/supabase';

type RentalCar = Database['public']['Tables']['rental_cars']['Row'];

export default function CarsList() {
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await getAllRentalCars();
        setCars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {error}</div>;
  if (cars.length === 0) return <div>No cars found in the database.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
          <p className="text-gray-600 mb-4">{car.description}</p>
          <div className="space-y-2">
            <p><span className="font-medium">Category:</span> {car.category}</p>
            <p><span className="font-medium">Price per day:</span> €{car.price_per_day}</p>
            <p><span className="font-medium">Transmission:</span> {car.transmission}</p>
            <p><span className="font-medium">Fuel type:</span> {car.fuel_type}</p>
            <p><span className="font-medium">Seats:</span> {car.seats}</p>
            <p><span className="font-medium">Provider:</span> {car.provider}</p>
          </div>
          {car.features.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {car.images.length > 0 && (
            <div className="mt-4">
              <img 
                src={car.images[0]} 
                alt={car.name} 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
