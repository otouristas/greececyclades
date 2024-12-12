import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_TAGLINE } from '../constants/seo';

interface PopularRoute {
  from: string;
  to: string;
  duration: string;
  price: number;
  operator: string;
  logo: string;
  image: string;
}

const FerryTickets = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [hasCar, setHasCar] = useState(false);
  const [carLength, setCarLength] = useState('small');
  const [discountCode, setDiscountCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      from,
      to,
      date: date?.toISOString() || '',
      passengers: passengers.toString(),
      hasCar: hasCar.toString(),
      carLength: hasCar ? carLength : '',
      discountCode
    });
    navigate(`/ferry-search-results?${searchParams.toString()}`);
  };

  const handleQuickSearch = (route: PopularRoute) => {
    setFrom(route.from);
    setTo(route.to);
    const searchParams = new URLSearchParams({
      from: route.from,
      to: route.to,
      date: date?.toISOString() || new Date().toISOString(),
      passengers: passengers.toString(),
      hasCar: hasCar.toString(),
      carLength,
      discountCode
    });
    navigate(`/ferry-search-results?${searchParams.toString()}`);
  };

  const popularRoutes = [
    {
      from: 'Piraeus',
      to: 'Santorini',
      duration: '4h 50m',
      price: 59.90,
      operator: 'Blue Star Ferries',
      logo: 'https://images.ferryhopper.com/companies/optimized/ATC-min.png',
      image: 'https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop'
    },
    {
      from: 'Rafina',
      to: 'Mykonos',
      duration: '2h 40m',
      price: 84.90,
      operator: 'Golden Star Ferries',
      logo: 'https://images.ferryhopper.com/companies/optimized/GST-min.png',
      image: 'https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop'
    },
    {
      from: 'Piraeus',
      to: 'Milos',
      duration: '3h 30m',
      price: 74.90,
      operator: 'SeaJets',
      logo: 'https://images.ferryhopper.com/companies/optimized/SJT-min.png',
      image: 'https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop'
    },
    {
      from: 'Piraeus',
      to: 'Naxos',
      duration: '4h',
      price: 64.90,
      operator: 'Blue Star Ferries',
      logo: 'https://images.ferryhopper.com/companies/optimized/ATC-min.png',
      image: 'https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop'
    }
  ];

  const locations = {
    ports: [
      { value: 'Piraeus', label: 'Piraeus' },
      { value: 'Rafina', label: 'Rafina' },
      { value: 'Lavrio', label: 'Lavrio' },
    ],
    islands: [
      { value: 'Amorgos', label: 'Amorgos' },
      { value: 'Anafi', label: 'Anafi' },
      { value: 'Andros', label: 'Andros' },
      { value: 'Folegandros', label: 'Folegandros' },
      { value: 'Ios', label: 'Ios' },
      { value: 'Kea', label: 'Kea' },
      { value: 'Kimolos', label: 'Kimolos' },
      { value: 'Kythnos', label: 'Kythnos' },
      { value: 'Milos', label: 'Milos' },
      { value: 'Mykonos', label: 'Mykonos' },
      { value: 'Naxos', label: 'Naxos' },
      { value: 'Paros', label: 'Paros' },
      { value: 'Santorini', label: 'Santorini' },
      { value: 'Serifos', label: 'Serifos' },
      { value: 'Sifnos', label: 'Sifnos' },
      { value: 'Sikinos', label: 'Sikinos' },
      { value: 'Syros', label: 'Syros' },
      { value: 'Tinos', label: 'Tinos' }
    ]
  };

  const renderLocationOptions = () => (
    <>
      <option value="" className="text-gray-700">Select location</option>
      <optgroup label="Main Ports" className="text-gray-700">
        {locations.ports.map(port => (
          <option key={port.value} value={port.value} className="text-gray-700">
            {port.label}
          </option>
        ))}
      </optgroup>
      <optgroup label="Islands" className="text-gray-700">
        {locations.islands.map(island => (
          <option key={island.value} value={island.value} className="text-gray-700">
            {island.label}
          </option>
        ))}
      </optgroup>
    </>
  );

  const carOptions = [
    { value: 'small', label: 'Small Car (up to 4m)', price: 45 },
    { value: 'medium', label: 'Medium Car (4-4.5m)', price: 55 },
    { value: 'large', label: 'Large Car (4.5-5m)', price: 65 },
    { value: 'suv', label: 'SUV/Van (over 5m)', price: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO 
        title={`Ferry Tickets to Cyclades ${SITE_TAGLINE}`}
        description="Book ferry tickets to and between the Cyclades islands. Find schedules, compare prices, and plan your island-hopping adventure."
        structuredData={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Ferry Tickets to Cyclades",
          "description": "Book ferry tickets to and between the Cyclades islands. Find schedules, compare prices, and plan your island-hopping adventure.",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        })}
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Transportation', path: '/transportation' },
              { label: 'Ferry Tickets', path: '/ferry-tickets' }
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop"
            alt="Ferry sailing in Cyclades"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Explore the Cyclades <br />
                <span className="text-blue-300">Island by Island</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-200 max-w-2xl"
              >
                Experience the magic of Greek island hopping with our convenient ferry services. Connect with the ancient beauty of the Cyclades, one journey at a time.
              </motion.p>
              
              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid sm:grid-cols-2 gap-6 pt-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaMapMarkerAlt className="w-6 h-6 text-blue-300" />
                  </div>
                  <span>Multiple Routes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaCalendarAlt className="w-6 h-6 text-blue-300" />
                  </div>
                  <span>Daily Departures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaUsers className="w-6 h-6 text-blue-300" />
                  </div>
                  <span>Group Bookings</span>
                </div>
              </motion.div>
            </div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-full max-w-xl mx-auto lg:mx-0"
            >
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">From</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                      <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all text-sm"
                        required
                      >
                        {renderLocationOptions()}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">To</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                      <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all text-sm"
                        required
                      >
                        {renderLocationOptions()}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 z-10" />
                      <DatePicker
                        selected={date}
                        onChange={(date: Date | null) => setDate(date)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all text-sm"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        placeholderText="Select date"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Passengers</label>
                    <div className="relative">
                      <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all text-sm"
                        placeholder="Number of passengers"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Vehicle (Optional)</label>
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="checkbox"
                          id="hasCar"
                          checked={hasCar}
                          onChange={(e) => setHasCar(e.target.checked)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
                        />
                        <label htmlFor="hasCar" className="text-sm text-white/90">
                          Add Vehicle
                        </label>
                      </div>
                      
                      {hasCar && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <select
                            value={carLength}
                            onChange={(e) => setCarLength(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all"
                          >
                            {carOptions.map(option => (
                              <option 
                                key={option.value} 
                                value={option.value}
                                className="text-gray-700"
                              >
                                {option.label} (+€{option.price})
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/90">Discount Code</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder="Optional"
                        className="w-full px-4 py-3 bg-white/20 border-0 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all uppercase"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg mt-2"
                >
                  Search Ferry Routes
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Routes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularRoutes.map((route, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={route.image} alt={`${route.from} to ${route.to}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{route.from} → {route.to}</h3>
                <p className="text-gray-600 mb-4">{route.duration}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">€{route.price}</span>
                  <button 
                    onClick={() => handleQuickSearch(route)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Our Ferry Service</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Regular departures and punctual service to keep your island-hopping plans on schedule.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Competitive prices and regular promotions to ensure the best value for your journey.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is always ready to assist you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">What's included in the ticket price?</h3>
              <p className="text-gray-600">Your ticket includes standard seating, access to open decks, and storage for regular luggage. Vehicle transport and premium seating require additional fees.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">How early should I arrive?</h3>
              <p className="text-gray-600">We recommend arriving at least 30 minutes before departure for foot passengers, and 1 hour for vehicles to ensure smooth boarding.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">What's the luggage allowance?</h3>
              <p className="text-gray-600">Each passenger can bring up to 2 pieces of luggage (max 23kg each) and 1 carry-on bag. Additional luggage may incur extra charges.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Can I modify my booking?</h3>
              <p className="text-gray-600">Yes, bookings can be modified up to 24 hours before departure. Changes may be subject to availability and fare differences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Special Offers</h2>
            <p className="text-blue-100 mb-8">Subscribe to our newsletter and get exclusive deals on ferry tickets.</p>
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 border-0"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FerryTickets;
