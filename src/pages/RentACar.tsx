import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import SearchForm from '../components/vehicles/SearchForm';
import FilterSidebar from '../components/vehicles/FilterSidebar';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import { useVehicleStore } from '../store/vehicleStore';
import { Car, Fuel, Settings2, Shield } from 'lucide-react';
import { Sliders } from 'lucide-react';

export default function RentACar() {
  const { vehicles } = useVehicleStore();

  return (
    <>
      <SEO 
        title={`Car Rental in Cyclades ${SITE_TAGLINE}`}
        description="Find and book the perfect vehicle for your Cyclades island adventure. Compare cars, scooters, and ATVs with our trusted rental partners."
        ogImage="/images/rentals-hero.jpg"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative min-h-[85vh] lg:h-[85vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://antiparosrentacar.com/datafiles/Antiparos%20n%20Paros%20Rent%20A%20Car.webp"
              alt="Scenic view of cars in Cyclades"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
            <div className="h-full grid lg:grid-cols-2 gap-8 items-center">
              {/* Search Form */}
              <div className="order-2 lg:order-1 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20">
                <SearchForm />
              </div>

              {/* Hero Content */}
              <div className="order-1 lg:order-2 text-white space-y-4 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Explore the Cyclades<br />
                  <span className="text-blue-400">Your Way</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                  Discover the freedom of exploring the Greek islands with our premium fleet. 
                  From compact cars to luxury SUVs, find your perfect ride.
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-8">
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                    <Car className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-sm sm:text-base">Latest Models</h3>
                    <p className="text-xs sm:text-sm text-white/80">Premium vehicles updated yearly</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-sm sm:text-base">Full Insurance</h3>
                    <p className="text-xs sm:text-sm text-white/80">Comprehensive coverage included</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                    <Fuel className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-sm sm:text-base">Flexible Fuel</h3>
                    <p className="text-xs sm:text-sm text-white/80">Multiple fuel options available</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20">
                    <Settings2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-sm sm:text-base">24/7 Support</h3>
                    <p className="text-xs sm:text-sm text-white/80">Round-the-clock assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Button for Mobile */}
            <button
              onClick={() => document.getElementById('filterSidebar')?.classList.toggle('hidden')}
              className="lg:hidden flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 rounded-xl mb-4"
            >
              <Sliders className="h-5 w-5" />
              Show Filters
            </button>

            {/* Filter Sidebar */}
            <div id="filterSidebar" className="hidden lg:block">
              <FilterSidebar />
            </div>
            
            {/* Vehicle Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Available Vehicles</h2>
                  <p className="text-gray-600 mt-1">
                    {vehicles.length} vehicles ready for your journey
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="https://rentacarantiparos.gr/wp-content/uploads/2024/03/Aggelos-Rentals-Logo-Small.png"
                    alt="AGGELOS Rentals"
                    className="h-10"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Provided by</span>
                    <span className="font-medium">AGGELOS Rentals</span>
                  </div>
                </div>
              </div>

              <VehicleGrid vehicles={vehicles} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}