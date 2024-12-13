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
        <section className="relative h-screen pt-[72px]">
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
          <div className="relative h-[calc(100vh-72px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-center">
              <div className="w-full grid lg:grid-cols-2 gap-8 items-center">
                {/* Search Form */}
                <div className="order-2 lg:order-1 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <SearchForm />
                </div>

                {/* Hero Content */}
                <div className="order-1 lg:order-2 text-white space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Explore the Cyclades<br />
                    <span className="text-blue-400">Your Way</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
                    Discover the freedom of exploring the Greek islands with our premium fleet. 
                    From compact cars to luxury SUVs, find your perfect ride.
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <Car className="h-6 w-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold">Latest Models</h3>
                      <p className="text-sm text-white/80">Premium vehicles updated yearly</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <Shield className="h-6 w-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold">Full Insurance</h3>
                      <p className="text-sm text-white/80">Comprehensive coverage included</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <Fuel className="h-6 w-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold">Flexible Fuel</h3>
                      <p className="text-sm text-white/80">Multiple fuel options available</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <Settings2 className="h-6 w-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold">24/7 Support</h3>
                      <p className="text-sm text-white/80">Round-the-clock assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Grid Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <FilterSidebar />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <VehicleGrid vehicles={vehicles} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}