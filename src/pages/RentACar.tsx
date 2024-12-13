import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import SearchForm from '../components/vehicles/SearchForm';
import FilterSidebar from '../components/vehicles/FilterSidebar';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import { useVehicleStore } from '../store/vehicleStore';
import { Car, Fuel, Settings2, Shield } from 'lucide-react';

export default function RentACar() {
  const { vehicles } = useVehicleStore();

  return (
    <>
      <SEO 
        title={`Car Rental in Cyclades ${SITE_TAGLINE}`}
        description="Find and book the perfect vehicle for your Cyclades island adventure. Compare cars, scooters, and ATVs with our trusted rental partners."
        ogImage="/images/rentals-hero.jpg"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gray-900">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://antiparosrentacar.com/datafiles/Antiparos%20n%20Paros%20Rent%20A%20Car.webp"
              alt="Scenic view of cars in Cyclades"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          {/* Hero Content Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Content */}
            <div className="pt-32 lg:pt-40 pb-40 lg:pb-48">
              <div className="max-w-2xl mx-auto text-center text-white space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Explore the Cyclades<br />
                  <span className="text-blue-400">Your Way</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto">
                  Discover the freedom of exploring the Greek islands with our premium fleet. 
                  From compact cars to luxury SUVs, find your perfect ride.
                </p>
              </div>

              {/* Search Form */}
              <div className="max-w-3xl mx-auto mt-12">
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20 shadow-xl">
                  <SearchForm />
                </div>
              </div>

              {/* Features */}
              <div className="max-w-4xl mx-auto mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                    <Car className="h-5 w-5 text-blue-400 mb-1.5 mx-auto" />
                    <h3 className="font-semibold text-sm text-white">Latest Models</h3>
                    <p className="text-xs text-white/80">Premium vehicles updated yearly</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                    <Shield className="h-5 w-5 text-blue-400 mb-1.5 mx-auto" />
                    <h3 className="font-semibold text-sm text-white">Full Insurance</h3>
                    <p className="text-xs text-white/80">Comprehensive coverage included</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                    <Fuel className="h-5 w-5 text-blue-400 mb-1.5 mx-auto" />
                    <h3 className="font-semibold text-sm text-white">Flexible Fuel</h3>
                    <p className="text-xs text-white/80">Multiple fuel options available</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                    <Settings2 className="h-5 w-5 text-blue-400 mb-1.5 mx-auto" />
                    <h3 className="font-semibold text-sm text-white">24/7 Support</h3>
                    <p className="text-xs text-white/80">Round-the-clock assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Grid Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <FilterSidebar />

              {/* Main Content */}
              <div className="flex-1 px-4 sm:px-6 lg:px-8 mt-4 lg:mt-0">
                <VehicleGrid vehicles={vehicles} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}