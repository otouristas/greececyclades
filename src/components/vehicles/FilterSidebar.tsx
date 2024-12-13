import { Sliders, X } from 'lucide-react';
import { useVehicleStore } from '../../store/vehicleStore';
import { VehicleType } from '../../types/vehicle';
import { useState } from 'react';

export default function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useVehicleStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-[72px] z-20 bg-white/80 backdrop-blur-md border-b">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors w-full"
        >
          <Sliders className="h-5 w-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Filter Content */}
      <div className={`
        lg:w-72 bg-white rounded-2xl shadow-sm h-fit lg:sticky lg:top-24 
        fixed lg:relative inset-y-0 right-0 w-[280px] max-w-[80vw] z-40 lg:z-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-screen lg:max-h-[calc(100vh-6rem)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-blue-500" />
              <h2 className="font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={() => {
                resetFilters();
                setIsOpen(false);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Price Range (€/day)
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>€0</span>
                  <span>€{filters.priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({ 
                    priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                  })}
                  className="w-full accent-blue-500"
                />
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 150, 200].map((price) => (
                    <button
                      key={price}
                      onClick={() => setFilters({
                        priceRange: { ...filters.priceRange, max: price }
                      })}
                      className={`px-2 py-1 text-sm rounded-lg transition-colors ${
                        filters.priceRange.max === price
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      €{price}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Vehicle Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(VehicleType).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters({ 
                      vehicleType: filters.vehicleType === type ? null : type 
                    })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.vehicleType === type
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Transmission
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Automatic', 'Manual'].map((transmission) => (
                  <button
                    key={transmission}
                    onClick={() => setFilters({ 
                      transmission: filters.transmission === transmission ? null : transmission 
                    })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.transmission === transmission
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {transmission}
                  </button>
                ))}
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Passengers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[2, 4, 5, 7].map((passengers) => (
                  <button
                    key={passengers}
                    onClick={() => setFilters({ 
                      passengers: filters.passengers === passengers ? null : passengers 
                    })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.passengers === passengers
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {passengers}+
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Features
              </label>
              <div className="space-y-2">
                {['Air Conditioning', 'Bluetooth', 'GPS', 'USB Port'].map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.features?.includes(feature)}
                      onChange={(e) => {
                        const newFeatures = e.target.checked
                          ? [...(filters.features || []), feature]
                          : filters.features?.filter(f => f !== feature);
                        setFilters({ features: newFeatures });
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}