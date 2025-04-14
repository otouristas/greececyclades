import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';
import { Star, Users, Briefcase, Fuel, Settings } from 'lucide-react';

type Car = Database['public']['Tables']['cars']['Row'];

interface CarsListProps {
  filters: {
    type: string[];
    transmission: string[];
    fuelType: string[];
    minSeats: number;
    minLuggage: number;
    minRating: number;
    priceRange: [number, number];
    location: string;
    selectedFeatures: string[];
  };
}

export default function CarsList({ filters }: CarsListProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortOption, setSortOption] = useState<string>('price-asc');

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setCars(data);
          setFilteredCars(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  // Apply filters
  useEffect(() => {
    if (cars.length === 0) return;

    let result = [...cars];

    // Filter by vehicle type (using category column)
    if (filters.type.length > 0) {
      result = result.filter(car => filters.type.includes(car.category));
    }

    // Filter by transmission
    if (filters.transmission.length > 0) {
      result = result.filter(car => filters.transmission.includes(car.transmission));
    }

    // Filter by fuel type
    if (filters.fuelType.length > 0) {
      result = result.filter(car => filters.fuelType.includes(car.fuel_type));
    }

    // Filter by minimum seats
    if (filters.minSeats > 0) {
      result = result.filter(car => car.seats >= filters.minSeats);
    }

    // Filter by minimum luggage capacity
    if (filters.minLuggage > 0) {
      result = result.filter(car => car.luggage_capacity >= filters.minLuggage);
    }

    // Filter by minimum rating
    if (filters.minRating > 0) {
      result = result.filter(car => car.rating >= filters.minRating);
    }

    // Filter by price range
    result = result.filter(
      car => car.price_per_day >= filters.priceRange[0] && car.price_per_day <= filters.priceRange[1]
    );

    // Filter by location
    if (filters.location) {
      result = result.filter(car => car.location === filters.location);
    }
    
    // Filter by selected features
    if (filters.selectedFeatures.length > 0) {
      result = result.filter(car => 
        filters.selectedFeatures.every(feature => 
          car.features.includes(feature)
        )
      );
    }

    // Apply sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price_per_day - b.price_per_day);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price_per_day - a.price_per_day);
    } else if (sortOption === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredCars(result);
  }, [cars, filters, sortOption]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>Error loading cars: {error.message}</p>
      </div>
    );
  }

  if (filteredCars.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
        <p>No cars match your current filters. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'} Available
        </h2>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-2"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Car Image */}
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <img 
                  src={car.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                </div>
              </div>

              {/* Car Details */}
              <div className="md:w-2/3 p-4 md:p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">{car.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({car.reviews_count})</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{car.description}</p>
                
                {/* Car Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1 text-blue-600" />
                    {car.seats} Seats
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-1 text-blue-600" />
                    {car.luggage_capacity} Luggage
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Settings className="w-4 h-4 mr-1 text-blue-600" />
                    {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Fuel className="w-4 h-4 mr-1 text-blue-600" />
                    {car.fuel_type.charAt(0).toUpperCase() + car.fuel_type.slice(1)}
                  </div>
                </div>
                
                {/* Car Extras */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">EXTRAS & FEATURES</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.slice(0, 4).map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{car.features.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Price and Book Button */}
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">€{car.price_per_day}</span>
                    <span className="text-sm text-gray-600">/day</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
