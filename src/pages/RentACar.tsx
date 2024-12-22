import { useState } from 'react';
import SEO from '../components/SEO';
import FilterSidebar from '../components/vehicles/FilterSidebar';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import { useVehicleStore } from '../store/vehicleStore';
import { Car, Calendar, MapPin, Search, Settings } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { islands } from '../data/islandsData';

export default function RentACar() {
  const { vehicles } = useVehicleStore();
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState('');
  const [transmission, setTransmission] = useState('');

  const setDateRange = (update: [Date | null, Date | null]) => {
    const [start, end] = update;
    setStartDate(start || undefined);
    setEndDate(end || undefined);
  };

  const handleSearch = () => {
    if (!location || !startDate || !endDate || !vehicleType || !transmission) {
      alert('Please fill in all required fields');
      return;
    }
    // Add search logic here
  };

  return (
    <>
      <SEO 
        title="Rent a Car in Cyclades | Greece Cyclades"
        description="Rent a car in the Cyclades islands. Find the perfect vehicle for your island adventures with our trusted car rental partners."
        keywords="car rental cyclades, rent a car greek islands, island car hire, greece car rental"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/rentacar/hero.jpg"
              alt="Rent a Car in Cyclades"
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-800/70" />
          </div>

          {/* Content Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
              <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
                {/* Left Column - Text (30%) */}
                <div className="w-full lg:w-[30%] text-center lg:text-left space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                    Rent a Car
                  </h1>
                  <p className="text-base md:text-lg text-blue-100/90 leading-relaxed">
                    Explore the Cyclades islands at your own pace. Find the perfect vehicle for your island adventures.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm">
                    <div className="flex items-center gap-2 text-blue-100/80">
                      <Car className="w-5 h-5 text-blue-400" />
                      <span>Best Rates</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100/80">
                      <Settings className="w-5 h-5 text-blue-400" />
                      <span>Full Insurance</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Search Form (70%) */}
                <div className="w-full lg:w-[70%] mt-8 lg:mt-0">
                  <div className="bg-white/[0.08] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    <div className="space-y-6">
                      {/* Location and Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location */}
                        <div className="relative">
                          <label className="block text-blue-200 text-sm font-medium mb-2">Location</label>
                          <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="" className="text-gray-900">Select Island</option>
                            {islands.map((island) => (
                              <option key={island.id} value={island.name} className="text-gray-900">
                                {island.name}
                              </option>
                            ))}
                          </select>
                          <MapPin className="absolute left-4 top-[42px] text-blue-200/50 w-5 h-5" />
                        </div>

                        {/* Dates */}
                        <div className="relative">
                          <label className="block text-blue-200 text-sm font-medium mb-2">Pick-up / Drop-off</label>
                          <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update: [Date | null, Date | null]) => {
                              setDateRange(update);
                            }}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow"
                            placeholderText="Select dates"
                          />
                          <Calendar className="absolute left-4 top-[42px] text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>

                      {/* Vehicle Type and Transmission */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vehicle Type */}
                        <div className="relative">
                          <label className="block text-blue-200 text-sm font-medium mb-2">Vehicle Type</label>
                          <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="" className="text-gray-900">Select Vehicle Type</option>
                            <option value="economy" className="text-gray-900">Economy</option>
                            <option value="compact" className="text-gray-900">Compact</option>
                            <option value="suv" className="text-gray-900">SUV</option>
                            <option value="luxury" className="text-gray-900">Luxury</option>
                          </select>
                          <Car className="absolute left-4 top-[42px] text-blue-200/50 w-5 h-5" />
                        </div>

                        {/* Transmission */}
                        <div className="relative">
                          <label className="block text-blue-200 text-sm font-medium mb-2">Transmission</label>
                          <select
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="" className="text-gray-900">Select Transmission</option>
                            <option value="automatic" className="text-gray-900">Automatic</option>
                            <option value="manual" className="text-gray-900">Manual</option>
                          </select>
                          <Settings className="absolute left-4 top-[42px] text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>

                      {/* Search Button */}
                      <button
                        onClick={handleSearch}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Search className="w-5 h-5" />
                        Search Cars
                      </button>
                    </div>
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