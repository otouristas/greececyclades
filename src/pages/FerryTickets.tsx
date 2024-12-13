import { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
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

  // Hero background image
  const heroImage = {
    url: "https://images.unsplash.com/photo-1564594139675-7d8ec5ac2821?q=80&w=2574&auto=format&fit=crop",
    alt: "Ferry in Greek Islands"
  };

  // All available ports
  const ports = [
    "Piraeus",
    "Rafina",
    "Lavrio",
    "Amorgos (Katapola)",
    "Anafi",
    "Andros",
    "Donoussa",
    "Folegandros",
    "Ios",
    "Iraklia",
    "Kea",
    "Kimolos",
    "Koufonisia",
    "Kythnos",
    "Milos",
    "Mykonos",
    "Naxos",
    "Paros",
    "Santorini",
    "Serifos",
    "Sifnos",
    "Sikinos",
    "Syros",
    "Tinos"
  ].sort();

  // Filter available destinations (exclude current selection)
  const getAvailableDestinations = (currentPort: string) => {
    return ports.filter(port => port !== currentPort);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      from,
      to,
      date: date?.toISOString() || '',
      passengers: passengers.toString(),
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


  return (
    <>
      <SEO 
        title="Ferry Tickets | Greece Cyclades"
        description={`Book ferry tickets to the Greek Islands. ${SITE_TAGLINE}`}
      />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
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
                Ferry Tickets to<br />
                <span className="text-blue-400">Greek Islands</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl mx-auto">
                Book your ferry tickets to the most beautiful Greek islands. Fast, easy, and secure booking with instant confirmation.
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          From
                        </label>
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
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          >
                            <option value="" className="text-gray-900">Select Port</option>
                            {ports.map(port => (
                              <option key={port} value={port} className="text-gray-900">
                                {port}
                              </option>
                            ))}
                          </select>
                          <FaMapMarkerAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          To
                        </label>
                        <div className="relative">
                          <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          >
                            <option value="" className="text-gray-900">Select Port</option>
                            {getAvailableDestinations(from).map(port => (
                              <option key={port} value={port} className="text-gray-900">
                                {port}
                              </option>
                            ))}
                          </select>
                          <FaMapMarkerAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Date
                        </label>
                        <div className="relative">
                          <DatePicker
                            selected={date}
                            onChange={(date: Date | null) => setDate(date || null)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none [color-scheme:dark]"
                            placeholderText="Select Date"
                            popperClassName="datepicker-popper"
                            portalId="datepicker-portal"
                            popperPlacement="bottom-start"
                            popperProps={{
                              strategy: "fixed",
                              modifiers: [
                                {
                                  name: "preventOverflow",
                                  options: {
                                    boundary: "viewport"
                                  }
                                },
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, 8]
                                  }
                                }
                              ]
                            }}
                          />
                          <FaCalendarAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Passengers
                        </label>
                        <div className="relative">
                          <select
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                            style={{
                              backgroundImage: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                          >
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <option key={num} value={num} className="text-gray-900">
                                {num} {num === 1 ? 'Passenger' : 'Passengers'}
                              </option>
                            ))}
                          </select>
                          <FaUsers className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
                  >
                    Search Tickets
                  </button>
                </form>
              </div>
            </div>

            {/* Features */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-white">Fast Booking</h3>
                  <p className="text-xs text-white/80">Book in minutes</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-white">Secure Payment</h3>
                  <p className="text-xs text-white/80">Safe transactions</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-center">
                  <div className="bg-blue-400/20 rounded-full p-2 w-10 h-10 mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-white">Instant Confirmation</h3>
                  <p className="text-xs text-white/80">Get tickets by email</p>
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
    </>
  );
};

export default FerryTickets;
