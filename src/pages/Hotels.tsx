import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, MapPin, Building2, Bed, Wifi, Coffee, Utensils, Calendar, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hotels() {
  // State for the custom search form
  const [destination, setDestination] = useState('Santorini');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Set default dates (check-in: tomorrow, check-out: 3 days from tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 4);
    
    setCheckIn(formatDate(tomorrow));
    setCheckOut(formatDate(checkOutDate));
  }, []);

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the provided URL
    window.open('https://trip.tp.st/F29Ncvt6', '_blank');
  };

  // Popular destinations
  const popularDestinations = [
    { name: 'Santorini', hotels: 245, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
    { name: 'Mykonos', hotels: 187, image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
    { name: 'Paros', hotels: 132, image: 'https://images.unsplash.com/photo-1602513685828-0d1f0c9a7ecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
    { name: 'Naxos', hotels: 98, image: 'https://images.unsplash.com/photo-1586645068267-81365bd3fac3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
    { name: 'Milos', hotels: 76, image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
    { name: 'Ios', hotels: 64, image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80' },
  ];

  // Featured hotels
  const featuredHotels = [
    {
      name: 'Canaves Oia Suites',
      location: 'Santorini',
      rating: 5,
      price: '€450',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      name: 'Cavo Tagoo',
      location: 'Mykonos',
      rating: 5,
      price: '€520',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      name: 'Paros Agnanti Hotel',
      location: 'Paros',
      rating: 4,
      price: '€280',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      name: 'Naxian Collection',
      location: 'Naxos',
      rating: 4,
      price: '€320',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    }
  ];

  // Hotel amenities
  const amenities = [
    { name: 'Free WiFi', icon: <Wifi className="h-5 w-5" /> },
    { name: 'Breakfast Included', icon: <Coffee className="h-5 w-5" /> },
    { name: 'Restaurant', icon: <Utensils className="h-5 w-5" /> },
    { name: 'Pool Access', icon: <Wifi className="h-5 w-5" /> },
    { name: 'Spa Services', icon: <Wifi className="h-5 w-5" /> },
    { name: 'Beach Access', icon: <Wifi className="h-5 w-5" /> },
  ];

  // FAQs
  const faqs = [
    {
      question: 'When is the best time to visit the Cyclades islands?',
      answer: 'The best time to visit the Cyclades is from May to October when the weather is warm and sunny. July and August are the busiest months with higher prices. For fewer crowds but still pleasant weather, consider May, June, September, or early October.'
    },
    {
      question: 'How far in advance should I book my hotel in the Cyclades?',
      answer: 'For peak season (July-August), book at least 3-6 months in advance, especially for popular islands like Santorini and Mykonos. For shoulder seasons (May-June, September-October), 1-3 months ahead is usually sufficient. Last-minute bookings are possible in the off-season but selection will be limited during peak times.'
    },
    {
      question: 'Are hotels in the Cyclades family-friendly?',
      answer: 'Many hotels in the Cyclades are family-friendly, but it varies by property and island. Naxos and Paros are particularly good for families with children, offering many family-oriented accommodations. Always check if a hotel has family rooms, child-friendly amenities, and activities before booking.'
    },
    {
      question: "What's the difference between hotels in different Cyclades islands?",
      answer: 'Each island offers a unique hotel experience. Santorini is known for luxury cave hotels with caldera views. Mykonos features upscale beach resorts and boutique properties. Paros and Naxos offer more family-friendly and affordable options. Smaller islands like Folegandros and Milos have charming, traditional accommodations with local character.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Hotels in Cyclades | Find Your Perfect Stay</title>
        <meta name="description" content="Book your perfect stay in the Cyclades islands. Browse our curated selection of hotels, from luxury resorts to boutique accommodations." />
        <link rel="canonical" href="https://greececyclades.com/hotels" />
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Hotel in the Cyclades</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Discover luxury resorts, boutique hotels, and cozy accommodations across Santorini, Mykonos, and other beautiful Greek islands</p>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Destination */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <select
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Santorini">Santorini</option>
                      <option value="Mykonos">Mykonos</option>
                      <option value="Paros">Paros</option>
                      <option value="Naxos">Naxos</option>
                      <option value="Milos">Milos</option>
                      <option value="Ios">Ios</option>
                      <option value="Folegandros">Folegandros</option>
                      <option value="Sifnos">Sifnos</option>
                      <option value="Amorgos">Amorgos</option>
                      <option value="Syros">Syros</option>
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Check-in Date */}
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={formatDate(new Date())}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Check-out Date */}
                <div>
                  <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Guests & Rooms */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <div className="relative">
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Rooms */}
                  <div>
                    <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Rooms
                    </label>
                    <div className="relative">
                      <select
                        id="rooms"
                        value={rooms}
                        onChange={(e) => setRooms(parseInt(e.target.value))}
                        className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                        ))}
                      </select>
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Search Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Search Hotels
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Why Book With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Building2 className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Curated Selection</h3>
              <p className="text-gray-600">We handpick the best hotels across the Cyclades islands to ensure quality accommodations for every budget.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Star className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price elsewhere? We'll match it and give you an additional 10% discount on your booking.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Bed className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Cancellation</h3>
              <p className="text-gray-600">Plans change? No problem. Most of our hotel bookings offer free cancellation up to 24-48 hours before check-in.</p>
            </div>
          </div>
        </div>
        
        {/* Popular Destinations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Explore the most sought-after islands in the Cyclades for your perfect getaway</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="group relative h-64 overflow-hidden rounded-lg shadow-md">
                <img 
                  src={destination.image} 
                  alt={`${destination.name}, Cyclades`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-white/80 text-sm">{destination.hotels} hotels</p>
                </div>
                <a href="#hotel-search-container" className="absolute inset-0 z-10">
                  <span className="sr-only">View hotels in {destination.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Hotels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Featured Hotels</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Handpicked luxury and boutique accommodations across the Cyclades islands</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">From {hotel.price}/night</span>
                    <a 
                      href="#hotel-search-container" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hotel Amenities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Common Hotel Amenities</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Most hotels in the Cyclades offer these popular amenities to enhance your stay</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="inline-block p-2 bg-blue-50 rounded-full mb-3 text-blue-600">
                  {amenity.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-800">{amenity.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Dream Hotel?</h2>
              <p className="text-white text-lg mb-6">Find the perfect accommodation for your Cyclades island getaway today.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#hotel-search-container" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">Search Hotels</a>
                <Link to="/flights" className="inline-block bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300">Check Flights</Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}