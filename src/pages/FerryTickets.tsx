import { useState } from 'react';
import { Calendar, Users, Ship, ChevronRight, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import "../styles/datepicker.css";

interface PopularRoute {
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
}

const heroImage = {
  url: '/images/ferry/hero.jpg',
  alt: 'Ferry in the Aegean Sea'
};

export default function FerryTickets() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert('Please fill in all required fields');
      return;
    }
    const searchParams = new URLSearchParams({
      from,
      to,
      date: date.toISOString(),
      passengers: passengers.toString()
    });
    navigate(`/ferry-tickets-search?${searchParams.toString()}`);
  };

  const handleQuickSearch = (route: PopularRoute) => {
    const searchParams = new URLSearchParams({
      from: route.from,
      to: route.to,
      date: new Date().toISOString(),
      passengers: '1'
    });
    navigate(`/ferry-tickets-search?${searchParams.toString()}`);
  };

  // Popular routes data
  const popularRoutes: PopularRoute[] = [
    {
      from: 'Piraeus',
      to: 'Santorini',
      duration: '5h 15m',
      price: '82.00',
      image: '/images/islands/santorini-island.webp'
    },
    {
      from: 'Piraeus',
      to: 'Mykonos',
      duration: '4h 30m',
      price: '78.50',
      image: '/images/islands/mykonos-island.jpg'
    },
    {
      from: 'Piraeus',
      to: 'Naxos',
      duration: '4h 45m',
      price: '69.90',
      image: '/images/islands/naxos-island.jpg'
    },
    {
      from: 'Piraeus',
      to: 'Paros',
      duration: '4h 15m',
      price: '73.50',
      image: '/images/islands/paros-island.jpg'
    }
  ];

  return (
    <div>
      <SEO 
        title="Ferry Tickets | Greece Cyclades"
        description="Book ferry tickets to the Cyclades islands. Fast and reliable connections between Greek islands."
        keywords="ferry tickets, greek islands, cyclades ferry, island hopping, greece travel"
      />
      
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
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
                  Ferry Tickets to Paradise
                </h1>
                <p className="text-base md:text-lg text-blue-100/90 leading-relaxed">
                  Book your journey through the stunning Cyclades islands. Fast, reliable ferry connections to all major destinations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Ship className="w-5 h-5 text-blue-400" />
                    <span>Multiple Daily Routes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span>Best Price Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Form (70%) */}
              <div className="w-full lg:w-[70%] mt-8 lg:mt-0">
                <div className="bg-white/[0.08] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <div className="space-y-6">
                    {/* From/To Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-blue-200 text-sm font-medium mb-2">From</label>
                        <div className="relative">
                          <select
                            value={from}
                            onChange={(e) => {
                              setFrom(e.target.value);
                              // Reset destination if same as new departure
                              if (e.target.value === to) {
                                setTo('');
                              }
                            }}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="" className="text-gray-900">Select Port</option>
                            <optgroup label="Main Ports" className="text-gray-900">
                              <option value="Piraeus">Piraeus (Athens)</option>
                              <option value="Rafina">Rafina</option>
                              <option value="Lavrio">Lavrio</option>
                              <option value="Chania">Chania</option>
                              <option value="Rethymno">Rethymno</option>
                              <option value="Herakleio">Herakleio</option>
                            </optgroup>
                            <optgroup label="Cyclades Islands" className="text-gray-900">
                              <option value="Amorgos">Amorgos</option>
                              <option value="Anafi">Anafi</option>
                              <option value="Andros">Andros</option>
                              <option value="Antiparos">Antiparos</option>
                              <option value="Folegandros">Folegandros</option>
                              <option value="Ios">Ios</option>
                              <option value="Kimolos">Kimolos</option>
                              <option value="Koufonisia">Koufonisia</option>
                              <option value="Kythnos">Kythnos</option>
                              <option value="Milos">Milos</option>
                              <option value="Mykonos">Mykonos</option>
                              <option value="Naxos">Naxos</option>
                              <option value="Paros">Paros</option>
                              <option value="Santorini">Santorini</option>
                              <option value="Serifos">Serifos</option>
                              <option value="Sifnos">Sifnos</option>
                              <option value="Sikinos">Sikinos</option>
                              <option value="Syros">Syros</option>
                              <option value="Tinos">Tinos</option>
                            </optgroup>
                          </select>
                          <Ship className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-blue-200 text-sm font-medium mb-2">To</label>
                        <div className="relative">
                          <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            <option value="" className="text-gray-900">Select Port</option>
                            <optgroup label="Main Ports" className="text-gray-900">
                              <option value="Piraeus">Piraeus (Athens)</option>
                              <option value="Rafina">Rafina</option>
                              <option value="Lavrio">Lavrio</option>
                              <option value="Chania">Chania</option>
                              <option value="Rethymno">Rethymno</option>
                              <option value="Herakleio">Herakleio</option>
                            </optgroup>
                            <optgroup label="Cyclades Islands" className="text-gray-900">
                              <option value="Amorgos">Amorgos</option>
                              <option value="Anafi">Anafi</option>
                              <option value="Andros">Andros</option>
                              <option value="Antiparos">Antiparos</option>
                              <option value="Folegandros">Folegandros</option>
                              <option value="Ios">Ios</option>
                              <option value="Kimolos">Kimolos</option>
                              <option value="Koufonisia">Koufonisia</option>
                              <option value="Kythnos">Kythnos</option>
                              <option value="Milos">Milos</option>
                              <option value="Mykonos">Mykonos</option>
                              <option value="Naxos">Naxos</option>
                              <option value="Paros">Paros</option>
                              <option value="Santorini">Santorini</option>
                              <option value="Serifos">Serifos</option>
                              <option value="Sifnos">Sifnos</option>
                              <option value="Sikinos">Sikinos</option>
                              <option value="Syros">Syros</option>
                              <option value="Tinos">Tinos</option>
                            </optgroup>
                          </select>
                          <Ship className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">Date</label>
                        <div className="relative">
                          <DatePicker
                            selected={date}
                            onChange={(date: Date | null) => setDate(date || null)}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow"
                            placeholderText="Select Date"
                            minDate={new Date()}
                          />
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-blue-200 text-sm font-medium mb-2">Passengers</label>
                        <div className="relative">
                          <select
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            className="w-full px-6 py-4 pl-12 bg-white/[0.06] rounded-xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow appearance-none"
                          >
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <option key={num} value={num} className="text-gray-900">
                                {num} {num === 1 ? 'Passenger' : 'Passengers'}
                              </option>
                            ))}
                          </select>
                          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/50 w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                      <Ship className="w-5 h-5" />
                      Search Tickets
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Popular Routes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularRoutes.map((route, index) => (
            <div 
              key={index} 
              onClick={() => handleQuickSearch(route)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img 
                  src={route.image} 
                  alt={`${route.from} to ${route.to}`} 
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{route.from} → {route.to}</h3>
                <p className="text-gray-600 mb-4">{route.duration}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">€{route.price}</span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-6 h-6" />
                  </span>
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
