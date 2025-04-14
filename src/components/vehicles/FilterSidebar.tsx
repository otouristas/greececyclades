import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Sliders, Star, Car, Users, Briefcase, Fuel, Settings, Check, X } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: {
    type: string[];
    transmission: string[];
    fuelType: string[];
    minSeats: number;
    minLuggage: number;
    minRating: number;
    priceRange: [number, number];
    location: string;
    selectedFeatures: string[];
  }) => void;
  locations: string[];
}

export default function FilterSidebar({ onFilterChange, locations }: FilterSidebarProps) {
  // Mobile sidebar state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const [type, setType] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [minSeats, setMinSeats] = useState<number>(0);
  const [minLuggage, setMinLuggage] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [location, setLocation] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Available filter options from database
  const [availableVehicleTypes, setAvailableVehicleTypes] = useState<string[]>([]);
  const [availableTransmissions, setAvailableTransmissions] = useState<string[]>([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState<string[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);

  // Fetch filter options from database
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        // Fetch vehicle types (from type column)
        const { data: typeData, error: typeError } = await supabase
          .from('cars')
          .select('type')
          .order('type');

        if (typeError) {
          console.error('Error fetching vehicle types:', typeError);
        } else if (typeData) {
          const uniqueTypes = Array.from(new Set(typeData.map(item => item.type).filter(Boolean)));
          setAvailableVehicleTypes(uniqueTypes);
        }

        // Fetch transmissions
        const { data: transmissionData, error: transmissionError } = await supabase
          .from('cars')
          .select('transmission')
          .order('transmission');

        if (transmissionError) {
          console.error('Error fetching transmissions:', transmissionError);
        } else if (transmissionData) {
          const uniqueTransmissions = Array.from(new Set(transmissionData.map(item => item.transmission).filter(Boolean)));
          setAvailableTransmissions(uniqueTransmissions);
        }

        // Fetch fuel types
        const { data: fuelData, error: fuelError } = await supabase
          .from('cars')
          .select('fuel_type')
          .order('fuel_type');

        if (fuelError) {
          console.error('Error fetching fuel types:', fuelError);
        } else if (fuelData) {
          const uniqueFuelTypes = Array.from(new Set(fuelData.map(item => item.fuel_type).filter(Boolean)));
          setAvailableFuelTypes(uniqueFuelTypes);
        }

        // Fetch price range
        const { data: priceData, error: priceError } = await supabase
          .from('cars')
          .select('price_per_day')
          .order('price_per_day');

        if (priceError) {
          console.error('Error fetching price range:', priceError);
        } else if (priceData) {
          const prices = priceData.map(item => item.price_per_day).filter(price => typeof price === 'number');
          if (prices.length > 0) {
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
          }
        }

        // Fetch all unique features
        const { data: featuresData, error: featuresError } = await supabase
          .from('cars')
          .select('features');

        if (featuresError) {
          console.error('Error fetching features:', featuresError);
        } else if (featuresData) {
          const allFeatures = featuresData
            .flatMap(item => Array.isArray(item.features) ? item.features : [])
            .filter(Boolean);
          const uniqueFeatures = Array.from(new Set(allFeatures));
          setAvailableFeatures(uniqueFeatures);
        }
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    }

    fetchFilterOptions();
  }, []); // Empty dependency array, only run once on mount

  // Memoize the filter change callback to prevent unnecessary re-renders
  const handleFilterChange = useCallback(() => {
    onFilterChange({
      type,
      transmission,
      fuelType,
      minSeats,
      minLuggage,
      minRating,
      priceRange,
      location,
      selectedFeatures
    });
    
    // Close mobile filter after applying on mobile
    if (window.innerWidth < 1024) {
      setIsMobileFilterOpen(false);
    }
  }, [
    type,
    transmission,
    fuelType,
    minSeats,
    minLuggage,
    minRating,
    priceRange,
    location,
    selectedFeatures,
    onFilterChange
  ]);

  // Update filters when any filter state changes
  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  // Reset all filters
  const handleResetFilters = () => {
    setType([]);
    setTransmission([]);
    setFuelType([]);
    setMinSeats(0);
    setMinLuggage(0);
    setMinRating(0);
    setPriceRange([minPrice, maxPrice]);
    setLocation('');
    setSelectedFeatures([]);
  };

  // Toggle vehicle type selection
  const toggleVehicleType = (value: string) => {
    setType(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Toggle transmission selection
  const toggleTransmission = (value: string) => {
    setTransmission(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Toggle fuel type selection
  const toggleFuelType = (value: string) => {
    setFuelType(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Toggle feature selection
  const toggleFeature = (value: string) => {
    setSelectedFeatures(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Count active filters
  const activeFilterCount = 
    type.length + 
    transmission.length + 
    fuelType.length + 
    (minSeats > 0 ? 1 : 0) + 
    (minLuggage > 0 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (location ? 1 : 0) + 
    selectedFeatures.length;

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full flex items-center justify-center py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium"
        >
          <Sliders className="w-5 h-5 mr-2" />
          Filters
          {type.length + transmission.length + fuelType.length + (minSeats > 0 ? 1 : 0) + 
           (minLuggage > 0 ? 1 : 0) + (minRating > 0 ? 1 : 0) + 
           (location ? 1 : 0) + selectedFeatures.length > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {type.length + transmission.length + fuelType.length + (minSeats > 0 ? 1 : 0) + 
               (minLuggage > 0 ? 1 : 0) + (minRating > 0 ? 1 : 0) + 
               (location ? 1 : 0) + selectedFeatures.length}
            </span>
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-blue-600" />
            Filters
          </h3>
          <button
            onClick={handleResetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset All
          </button>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Island</h4>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Islands</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Vehicle Type Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Car className="w-4 h-4 mr-2 text-blue-600" />
            Vehicle Type
          </h4>
          <div className="space-y-2">
            {availableVehicleTypes.map((vehicleType) => (
              <label key={vehicleType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={type.includes(vehicleType)}
                  onChange={() => toggleVehicleType(vehicleType)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{vehicleType}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Transmission Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Settings className="w-4 h-4 mr-2 text-blue-600" />
            Transmission
          </h4>
          <div className="space-y-2">
            {availableTransmissions.map((trans) => (
              <label key={trans} className="flex items-center">
                <input
                  type="checkbox"
                  checked={transmission.includes(trans)}
                  onChange={() => toggleTransmission(trans)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{trans}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Fuel className="w-4 h-4 mr-2 text-blue-600" />
            Fuel Type
          </h4>
          <div className="space-y-2">
            {availableFuelTypes.map((fuel) => (
              <label key={fuel} className="flex items-center">
                <input
                  type="checkbox"
                  checked={fuelType.includes(fuel)}
                  onChange={() => toggleFuelType(fuel)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{fuel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Seats Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            Minimum Seats
          </h4>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="9"
              value={minSeats}
              onChange={(e) => setMinSeats(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">{minSeats > 0 ? minSeats : 'Any'}</span>
          </div>
        </div>

        {/* Minimum Luggage Capacity Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
            Minimum Luggage Capacity
          </h4>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="5"
              value={minLuggage}
              onChange={(e) => setMinLuggage(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">{minLuggage > 0 ? minLuggage : 'Any'}</span>
          </div>
        </div>

        {/* Minimum Rating Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2 text-blue-600" />
            Minimum Rating
          </h4>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">{minRating > 0 ? minRating : 'Any'}</span>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Price Range (€ per day)
          </h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">€{priceRange[0]}</span>
            <span className="text-sm text-gray-600">€{priceRange[1]}</span>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="h-1 w-full bg-gray-200 rounded"></div>
            </div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none"
            />
          </div>
        </div>

        {/* Features Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Check className="w-4 h-4 mr-2 text-blue-600" />
            Features & Extras
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {availableFeatures.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-6">
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Sliders className="w-5 h-5 mr-2 text-blue-600" />
                Filters
              </h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={handleResetFilters}
              className="w-full mb-6 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Reset All Filters
            </button>

            {/* Location Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Island</h4>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Islands</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Car className="w-4 h-4 mr-2 text-blue-600" />
                Vehicle Type
              </h4>
              <div className="space-y-2">
                {availableVehicleTypes.map((vehicleType) => (
                  <label key={vehicleType} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={type.includes(vehicleType)}
                      onChange={() => toggleVehicleType(vehicleType)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{vehicleType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-blue-600" />
                Transmission
              </h4>
              <div className="space-y-2">
                {availableTransmissions.map((trans) => (
                  <label key={trans} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={transmission.includes(trans)}
                      onChange={() => toggleTransmission(trans)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{trans}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Type Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Fuel className="w-4 h-4 mr-2 text-blue-600" />
                Fuel Type
              </h4>
              <div className="space-y-2">
                {availableFuelTypes.map((fuel) => (
                  <label key={fuel} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={fuelType.includes(fuel)}
                      onChange={() => toggleFuelType(fuel)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{fuel}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Seats Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                Minimum Seats
              </h4>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="9"
                  value={minSeats}
                  onChange={(e) => setMinSeats(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{minSeats > 0 ? minSeats : 'Any'}</span>
              </div>
            </div>

            {/* Minimum Luggage Capacity Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                Minimum Luggage Capacity
              </h4>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={minLuggage}
                  onChange={(e) => setMinLuggage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{minLuggage > 0 ? minLuggage : 'Any'}</span>
              </div>
            </div>

            {/* Minimum Rating Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2 text-blue-600" />
                Minimum Rating
              </h4>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{minRating > 0 ? minRating : 'Any'}</span>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Price Range (€ per day)
              </h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">€{priceRange[0]}</span>
                <span className="text-sm text-gray-600">€{priceRange[1]}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-1 w-full bg-gray-200 rounded"></div>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none"
                />
              </div>
            </div>

            {/* Features Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Check className="w-4 h-4 mr-2 text-blue-600" />
                Features & Extras
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {availableFeatures.map((feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply button */}
            <button
              onClick={() => {
                handleFilterChange();
                setIsMobileFilterOpen(false);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}