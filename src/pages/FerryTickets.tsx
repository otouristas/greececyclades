import { useState, useEffect } from 'react';
import { Calendar, Users, Ship, ChevronRight, MapPin, Clock, Euro, Info, Search, Star, Shield, CheckCircle, Zap, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Define interfaces for our data types
interface PopularRoute {
  from: string;
  to: string;
  duration: string;
  price: string;
  priceNum: number;
  image: string;
  type: string;
  frequency: string;
  fromCode: string;
  toCode: string;
}

interface FerryCompany {
  name: string;
  logo: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface SeatClass {
  name: string;
  description: string;
  icon: string;
}

interface TravelTip {
  title: string;
  description: string;
  icon: string;
}

// Port code mapping
interface PortCode {
  name: string;
  code: string;
}

export default function FerryTickets() {
  const [from, setFrom] = useState('Piraeus');
  const [to, setTo] = useState('Santorini');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [vehicles, setVehicles] = useState(0);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // Port codes mapping
  const portCodes: PortCode[] = [
    { name: 'Aegiali, Amorgos', code: 'AIG' },
    { name: 'Katapola, Amorgos', code: 'AMO' },
    { name: 'Amorgos (All Ports)', code: 'AMR' },
    { name: 'Anafi', code: 'ANA' },
    { name: 'Andros', code: 'AND' },
    { name: 'Antiparos', code: 'ANP' },
    { name: 'Donousa', code: 'DON' },
    { name: 'Folegandros', code: 'FOL' },
    { name: 'Ios', code: 'IOS' },
    { name: 'Irakleia', code: 'IRK' },
    { name: 'Mykonos', code: 'JMK' },
    { name: 'Naxos', code: 'JNX' },
    { name: 'Syros', code: 'JSY' },
    { name: 'Santorini (Thera)', code: 'JTR' },
    { name: 'Kea (Tzia)', code: 'KEA' },
    { name: 'Kimolos', code: 'KMS' },
    { name: 'Koufonisi', code: 'KOU' },
    { name: 'Kythnos', code: 'KYT' },
    { name: 'Milos', code: 'MLO' },
    { name: 'Oia, Santorini', code: 'OIA' },
    { name: 'Paros', code: 'PAS' },
    { name: 'Serifos', code: 'SER' },
    { name: 'Sifnos', code: 'SIF' },
    { name: 'Sikinos', code: 'SIK' },
    { name: 'Schinoussa', code: 'SXI' },
    { name: 'Tinos', code: 'TIN' },
    { name: 'Thirasia', code: 'TRS' },
    { name: 'Piraeus', code: 'PIR' },
    { name: 'Rafina', code: 'RAF' },
    { name: 'Lavrio', code: 'LAV' },
    { name: 'Athens(all ports)', code: 'ATH' }
  ];

  // Helper function to get port code
  const getPortCode = (portName: string): string => {
    // Try to find exact match
    const exactMatch = portCodes.find(port => port.name === portName);
    if (exactMatch) return exactMatch.code;
    
    // Try to find partial match (e.g., "Santorini" should match "Santorini (Thera)")
    const partialMatch = portCodes.find(port => 
      port.name.toLowerCase().includes(portName.toLowerCase()) || 
      portName.toLowerCase().includes(port.name.toLowerCase())
    );
    if (partialMatch) return partialMatch.code;
    
    // Default to PIR if no match found
    return 'PIR';
  };

  // Set default dates (depart: tomorrow, return: 7 days from tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const returnDay = new Date();
    returnDay.setDate(returnDay.getDate() + 8);
    
    setDepartDate(formatDate(tomorrow));
    setReturnDate(formatDate(returnDay));
  }, []);

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    
    // Get port codes
    const fromCode = getPortCode(from);
    const toCode = getPortCode(to);
    
    // Base URL
    const baseUrl = 'https://www.ferryscanner.com/en/ferry/results';
    const affiliateParams = 'ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN';
    
    // Build search parameters
    let searchParams = '';
    
    if (isRoundTrip && returnDate) {
      // Round trip
      searchParams = `#search/dep/${fromCode},${toCode}/arr/${toCode},${fromCode}/date/${departDate},${returnDate}`;
    } else {
      // One way trip
      searchParams = `#search/dep/${fromCode}/arr/${toCode}/date/${departDate}`;
    }
    
    // Construct final URL
    const finalUrl = `${baseUrl}?${affiliateParams}${searchParams}`;
    
    // Open in new tab
    window.open(finalUrl, '_blank');
  };

  // Update popular routes links to use FerrryScanner
  const handlePopularRouteClick = (fromPort: string, toPort: string): void => {
    const fromCode = getPortCode(fromPort);
    const toCode = getPortCode(toPort);
    
    // Set tomorrow as the default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = formatDate(tomorrow);
    
    // Base URL
    const baseUrl = 'https://www.ferryscanner.com/en/ferry/results';
    const affiliateParams = 'ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN';
    
    // Build search parameters
    const searchParams = `#search/dep/${fromCode}/arr/${toCode}/date/${tomorrowFormatted}`;
    
    // Construct final URL
    const finalUrl = `${baseUrl}?${affiliateParams}${searchParams}`;
    
    // Open in new tab
    window.open(finalUrl, '_blank');
  };

  // Popular routes with enhanced data
  const popularRoutes: PopularRoute[] = [
    {
      from: 'Piraeus',
      to: 'Santorini',
      duration: '5h - 8h',
      price: 'From €40',
      priceNum: 40,
      image: '/images/islands/santorini.jpg',
      type: 'High-speed / Conventional',
      frequency: 'Daily',
      fromCode: 'PIR',
      toCode: 'JTR'
    },
    {
      from: 'Piraeus',
      to: 'Mykonos',
      duration: '3h - 5h',
      price: 'From €35',
      priceNum: 35,
      image: '/images/islands/mykonos.jpg',
      type: 'High-speed',
      frequency: 'Daily',
      fromCode: 'PIR',
      toCode: 'JMK'
    },
    {
      from: 'Rafina',
      to: 'Mykonos',
      duration: '2h - 5h',
      price: 'From €30',
      priceNum: 30,
      image: '/images/islands/mykonos.jpg',
      type: 'High-speed',
      frequency: '2-3 times/day',
      fromCode: 'RAF',
      toCode: 'JMK'
    },
    {
      from: 'Piraeus',
      to: 'Naxos',
      duration: '4h - 6h',
      price: 'From €38',
      priceNum: 38,
      image: '/images/islands/naxos.jpg',
      type: 'High-speed / Conventional',
      frequency: 'Daily',
      fromCode: 'PIR',
      toCode: 'JNX'
    },
    {
      from: 'Piraeus',
      to: 'Paros',
      duration: '3h - 5h',
      price: 'From €32',
      priceNum: 32,
      image: '/images/islands/paros.jpg',
      type: 'High-speed / Conventional',
      frequency: 'Daily',
      fromCode: 'PIR',
      toCode: 'PAS'
    },
    {
      from: 'Mykonos',
      to: 'Santorini',
      duration: '2h - 3h',
      price: 'From €25',
      priceNum: 25,
      image: '/images/islands/santorini.jpg',
      type: 'Catamaran',
      frequency: 'Daily in summer',
      fromCode: 'JMK',
      toCode: 'JTR'
    }
  ];

  // Ferry companies
  const ferryCompanies: FerryCompany[] = [
    { name: 'Blue Star Ferries', logo: '/images/ferry/companies/blue-star.webp' },
    { name: 'SeaJets', logo: '/images/ferry/companies/seajets.png' },
    { name: 'Hellenic Seaways', logo: '/images/ferry/companies/hellenic.svg' },
    { name: 'Golden Star Ferries', logo: '/images/ferry/companies/golden-star.webp' },
    { name: 'Fast Ferries', logo: '/images/ferry/companies/fast-ferries.webp' },
    { name: 'ANEK Lines', logo: '/images/ferry/companies/anek-lines.webp' }
  ];

  // Seat classes
  const seatClasses: SeatClass[] = [
    { name: 'Economy/Deck', description: 'Open seating areas', icon: 'users' },
    { name: 'Air Seat', description: 'Numbered recliner seats', icon: 'armchair' },
    { name: 'Business/Lounge', description: 'Spacious, quiet, premium experience', icon: 'crown' },
    { name: 'Cabin', description: 'Private bed + WC (ideal for overnight)', icon: 'bed' }
  ];

  // Travel tips
  const travelTips: TravelTip[] = [
    { title: 'Book Early', description: 'Reserve 2-3 months ahead for July-August routes', icon: 'calendar' },
    { title: 'Web Check-in', description: 'Avoid port kiosk delays with online check-in', icon: 'smartphone' },
    { title: 'Vehicle Booking', description: 'Cars require advanced booking and early arrival', icon: 'car' },
    { title: 'No Luggage Limits', description: 'No weight restrictions or check-in required', icon: 'luggage' }
  ];

  // FAQs
  const faqs: FAQ[] = [
    {
      question: 'How far in advance should I book ferry tickets?',
      answer: 'For peak season (July-August), we recommend booking 2-3 months in advance, especially for popular routes like Piraeus to Santorini or Mykonos. For shoulder seasons (May-June, September), 3-4 weeks ahead is usually sufficient. In the off-season, booking a few days before is often fine, but we still recommend booking ahead for peace of mind.'
    },
    {
      question: 'What\'s the difference between conventional and high-speed ferries?',
      answer: 'Conventional ferries are larger, more stable in rough seas, and usually cheaper, but slower (5-8 hours from Athens to Santorini). High-speed ferries are faster (3-5 hours for the same route) but more expensive and may be canceled in bad weather. Conventional ferries can also accommodate vehicles, while some high-speed vessels are passenger-only.'
    },
    {
      question: 'Can I take my car on the ferry?',
      answer: 'Yes, most conventional ferries accommodate vehicles, but you should book well in advance, especially in high season. Some high-speed ferries don\'t accept vehicles. Additional fees apply for cars, motorcycles, or bicycles. Make sure to arrive at least 1 hour before departure when traveling with a vehicle.'
    },
    {
      question: 'What happens if my ferry is canceled due to weather?',
      answer: 'Ferry cancellations due to weather conditions are not uncommon in the Aegean, especially during winter or when strong winds occur. If your ferry is canceled, you\'ll be offered either a full refund or rebooking on the next available departure. We recommend checking the status of your ferry the day before travel, especially during periods of potentially adverse weather.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Ferry Tickets to Cyclades Islands | Book Online | Greece Cyclades</title>
        <meta name="description" content="Book ferry tickets to Santorini, Mykonos, Naxos, Paros, and all Cyclades islands. Compare schedules, prices, and operators. Secure online booking with instant confirmation." />
        <meta name="keywords" content="ferry tickets Cyclades, Piraeus to Santorini ferry, Rafina to Mykonos ferry, island hopping Greece, book Greek ferry online, Cyclades ferry schedule, Greek islands ferry" />
        <link rel="canonical" href="https://greececyclades.com/ferry-tickets" />
        <meta name="robots" content="index,follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ferry Tickets to Cyclades Islands | Book Online | Greece Cyclades" />
        <meta property="og:description" content="Book ferry tickets to all Cyclades islands. Compare schedules, prices, and operators with secure online booking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greececyclades.com/ferry-tickets" />
        <meta property="og:image" content="https://greececyclades.com/images/ferry-tickets.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ferry Tickets to Cyclades Islands | Book Online" />
        <meta name="twitter:description" content="Book ferry tickets to all Cyclades islands. Compare schedules, prices, and operators with secure online booking." />
        <meta name="twitter:image" content="https://greececyclades.com/images/ferry-tickets.webp" />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ferry-tickets.webp" 
            alt="Ferry sailing in the Aegean Sea" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E2E48] via-[#1E2E48] to-[#1E2E48] opacity-80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ferry Tickets to Cyclades Islands
            </h1>
            <p className="text-xl text-[#E3D7C3] max-w-3xl mx-auto mb-8">
              Book ferry tickets to Santorini, Mykonos, Naxos, Paros, and all Greek islands. Compare schedules, prices, and operators with secure online booking and instant confirmation.
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="text-white text-sm font-medium">Real-Time Schedules</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Shield className="h-5 w-5 text-[#E3D7C3]" />
                <span className="text-white text-sm font-medium">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Phone className="h-5 w-5 text-[#E3D7C3]" />
                <span className="text-white text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CheckCircle className="h-5 w-5 text-[#E3D7C3]" />
                <span className="text-white text-sm font-medium">Instant Confirmation</span>
              </div>
            </div>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From */}
                <div>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Port
                  </label>
                  <div className="relative">
                    <select
                      id="from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    >
                      {portCodes.map((port) => (
                        <option key={port.code} value={port.name}>
                          {port.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* To */}
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Port
                  </label>
                  <div className="relative">
                    <select
                      id="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    >
                      {portCodes.map((port) => (
                        <option key={port.code} value={port.name}>
                          {port.name}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Depart Date */}
                <div>
                  <label htmlFor="depart-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Date
                  </label>
                  <div className="relative">
                    <input
                      id="depart-date"
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      min={formatDate(new Date())}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Return Date */}
                <div>
                  <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                    <span>Return Date {isRoundTrip ? '' : '(Optional)'}</span>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="round-trip"
                        checked={isRoundTrip}
                        onChange={() => setIsRoundTrip(!isRoundTrip)}
                        className="h-4 w-4 text-[#1E2E48] focus:ring-[#1E2E48] border-gray-300 rounded"
                      />
                      <label htmlFor="round-trip" className="ml-2 text-xs text-gray-600">
                        Round Trip
                      </label>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departDate}
                      required={isRoundTrip}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Passengers & Vehicles */}
                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <select
                      id="passengers"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="vehicles" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicles
                  </label>
                  <div className="relative">
                    <select
                      id="vehicles"
                      value={vehicles}
                      onChange={(e) => setVehicles(parseInt(e.target.value))}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1E2E48] focus:border-transparent"
                    >
                      <option value="0">No Vehicle</option>
                      <option value="1">1 Car</option>
                      <option value="2">2 Cars</option>
                      <option value="3">1 Motorcycle</option>
                      <option value="4">2 Motorcycles</option>
                    </select>
                    <Ship className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Search Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1E2E48] hover:bg-[#1E2E48]/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Search Ferry Tickets
                  </button>
                </div>
              </div>
            </form>
            
            {/* Powered by FerrryScanner */}
            <div className="mt-6 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-2">Proudly powered by</p>
              <a 
                href="https://www.ferryscanner.com/en?ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src="https://www.ferryscanner.com/_next/static/media/logo.f9964f3a.svg" 
                  alt="FerrryScanner Logo" 
                  className="h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Routes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Most Popular Cyclades Routes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compare the most popular ferry connections with live pricing and real-time availability
            </p>
          </div>
          
          {/* Routes Table for Desktop */}
          <div className="hidden lg:block overflow-x-auto mb-12">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">From (€)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {popularRoutes.map((route, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                          <img 
                            src={route.image} 
                            alt={`${route.to} island view`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{route.from} → {route.to}</div>
                          <div className="text-sm text-gray-500">{route.frequency}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{route.duration}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-semibold text-[#1E2E48]">€{route.priceNum}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{route.type}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlePopularRouteClick(route.from, route.to)}
                        className="inline-flex items-center px-4 py-2 bg-[#1E2E48] text-white text-sm font-medium rounded-lg hover:bg-[#1E2E48]/90 transition-colors"
                      >
                        Book Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Cards for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to} ferry route - Beautiful view of ${route.to} island`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-[#1E2E48] to-[#E3D7C3] flex items-center justify-center"><span class="text-white font-medium">${route.to}</span></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">
                      {route.from} → {route.to}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium text-gray-900">{route.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-semibold text-[#1E2E48] text-lg">€{route.priceNum}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium text-gray-700">{route.type}</div>
                  </div>
                  <button
                    onClick={() => handlePopularRouteClick(route.from, route.to)}
                    className="w-full bg-[#1E2E48] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E2E48]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Book Now
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Booking Workflow Section */}
      <div className="py-16 bg-[#E3D7C3]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Booking Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Book your ferry tickets in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E2E48] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Search</h3>
              <p className="text-gray-600">Enter your route and travel dates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E2E48] rounded-full flex items-center justify-center mx-auto mb-4">
                <Ship className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Select</h3>
              <p className="text-gray-600">Choose the best ferry and seat type</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E2E48] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Pay</h3>
              <p className="text-gray-600">Secure payment with instant confirmation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E2E48] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Travel</h3>
              <p className="text-gray-600">Show mobile ticket and enjoy your journey</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ferry Companies Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ferry Companies We Work With</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with all major ferry operators in Greece to offer you the best options
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {ferryCompanies.map((company, index) => (
              <a 
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Use Athens to Santorini as a default popular route
                  handlePopularRouteClick('Athens(all ports)', 'Santorini (Thera)');
                }}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="max-h-12 max-w-full"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Seat Classes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seat Classes & Travel Tips</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose your preferred seat class and follow our travel tips for the best experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Seat Classes Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Ship className="h-6 w-6 text-[#1E2E48] mr-2" />
                Available Seat Classes
              </h3>
              <div className="space-y-6">
                {seatClasses.map((seat, index) => (
                  <div key={index} className="bg-[#E3D7C3]/10 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center mb-2">
                      <Info className="h-5 w-5 text-[#1E2E48] flex-shrink-0 mr-2" />
                      {seat.name}
                    </h4>
                    <p className="text-gray-600 ml-7">{seat.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Travel Tips Column */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-[#1E2E48] mr-2" />
                Essential Travel Tips
              </h3>
              <div className="space-y-6">
                {travelTips.map((tip, index) => (
                  <div key={index} className="bg-[#E3D7C3]/10 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center mb-2">
                      <Info className="h-5 w-5 text-[#1E2E48] flex-shrink-0 mr-2" />
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 ml-7">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about booking ferry tickets in Greece
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-medium text-gray-900 flex items-start">
                  <Info className="h-6 w-6 text-[#1E2E48] flex-shrink-0 mr-2" />
                  {faq.question}
                </h3>
                <div className="mt-3 text-gray-600 ml-8">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* SEO Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Cyclades Ferry Travel</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                The <a href="/islands" className="text-[#1E2E48] hover:underline font-medium">Cyclades islands</a>, with their iconic white-washed buildings and blue-domed churches, are one of Greece's most beloved destinations. Island hopping by ferry is the perfect way to experience multiple islands during your vacation, allowing you to discover each island's unique character and charm.
              </p>
              
              <p className="text-gray-700 mb-6">
                The Greek ferry system is extensive and well-developed, connecting all major islands with regular services. During the summer months (June to September), ferries operate at their highest frequency, with multiple daily connections between popular islands like <a href="/islands/santorini" className="text-[#1E2E48] hover:underline">Santorini</a>, <a href="/islands/mykonos" className="text-[#1E2E48] hover:underline">Mykonos</a>, <a href="/islands/paros" className="text-[#1E2E48] hover:underline">Paros</a>, and <a href="/islands/naxos" className="text-[#1E2E48] hover:underline">Naxos</a>.
              </p>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Types of Ferry Services</h3>
              
              <p className="text-gray-700 mb-4">
                When traveling between the Cyclades islands, you'll encounter two main types of ferries:
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">🚢 Conventional Ferries</h4>
                <p className="text-gray-700 mb-4">
                  These larger vessels are more stable in rough seas and can accommodate vehicles. They're typically slower but more affordable and less likely to be canceled due to weather conditions. Perfect for travelers with cars or those seeking a more comfortable journey.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Duration: 5-8 hours from Athens to Santorini</li>
                  <li>Vehicle capacity available</li>
                  <li>More stable in rough weather</li>
                  <li>Budget-friendly option</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">⚡ High-Speed Ferries</h4>
                <p className="text-gray-700 mb-4">
                  These modern catamarans and hydrofoils offer significantly faster travel times but at a higher price. They're ideal for travelers looking to maximize their time on the islands.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Duration: 3-5 hours from Athens to Santorini</li>
                  <li>Limited or no vehicle capacity</li>
                  <li>Weather-dependent service</li>
                  <li>Premium pricing</li>
                </ul>
              </div>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Best Time to Book Ferry Tickets</h3>
              
              <p className="text-gray-700 mb-6">
                Timing your ferry booking is crucial for securing the best prices and availability:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🌞 Peak Season (July-August)</h4>
                  <p className="text-gray-600">Book 2-3 months in advance. Prices are highest but availability is crucial.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🌸 Shoulder Season (May-June, September)</h4>
                  <p className="text-gray-600">Book 3-4 weeks ahead. Great weather with better prices and fewer crowds.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❄️ Low Season (October-April)</h4>
                  <p className="text-gray-600">Book 1-2 weeks ahead. Limited schedules but lowest prices.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Last-Minute Deals</h4>
                  <p className="text-gray-600">Sometimes available 24-48 hours before departure during off-peak times.</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Popular Island Hopping Routes</h3>
              
              <p className="text-gray-700 mb-4">
                When planning your Cyclades island hopping adventure, consider these popular routes:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🏛️ Classic Route (7-10 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → <a href="/islands/mykonos" className="text-[#1E2E48] hover:underline">Mykonos</a> → <a href="/islands/paros" className="text-[#1E2E48] hover:underline">Paros</a> → <a href="/islands/naxos" className="text-[#1E2E48] hover:underline">Naxos</a> → <a href="/islands/santorini" className="text-[#1E2E48] hover:underline">Santorini</a></p>
                </div>
                
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🌋 Western Cyclades (5-7 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → Kythnos → <a href="/islands/serifos" className="text-[#1E2E48] hover:underline">Serifos</a> → <a href="/islands/sifnos" className="text-[#1E2E48] hover:underline">Sifnos</a> → <a href="/islands/milos" className="text-[#1E2E48] hover:underline">Milos</a></p>
                </div>
                
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🎨 Cultural Route (4-6 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → <a href="/islands/syros" className="text-[#1E2E48] hover:underline">Syros</a> → <a href="/islands/tinos" className="text-[#1E2E48] hover:underline">Tinos</a> → <a href="/islands/andros" className="text-[#1E2E48] hover:underline">Andros</a> → Rafina (Athens)</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                We recommend spending at least 2-3 nights on each island to fully appreciate what each has to offer. During peak season (July-August), it's essential to book your ferry tickets and <a href="/hotels" className="text-[#1E2E48] hover:underline">accommodation</a> well in advance, as both can sell out quickly.
              </p>
              
              <div className="bg-[#1E2E48] text-white rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold mb-3">💡 Pro Tip for Island Hopping</h4>
                <p className="text-[#E3D7C3]">
                  Book your outbound and return ferries first, then fill in the inter-island connections. This ensures you have your main travel dates secured before planning the detailed itinerary. Also, consider our <a href="/activities" className="text-[#E3D7C3] hover:underline font-medium">activities and tours</a> to make the most of each island visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Original SEO Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Cyclades Ferry Travel</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                The <a href="/islands" className="text-[#1E2E48] hover:underline font-medium">Cyclades islands</a>, with their iconic white-washed buildings and blue-domed churches, are one of Greece's most beloved destinations. Island hopping by ferry is the perfect way to experience multiple islands during your vacation, allowing you to discover each island's unique character and charm.
              </p>
              
              <p className="text-gray-700 mb-6">
                The Greek ferry system is extensive and well-developed, connecting all major islands with regular services. During the summer months (June to September), ferries operate at their highest frequency, with multiple daily connections between popular islands like <a href="/islands/santorini" className="text-[#1E2E48] hover:underline">Santorini</a>, <a href="/islands/mykonos" className="text-[#1E2E48] hover:underline">Mykonos</a>, <a href="/islands/paros" className="text-[#1E2E48] hover:underline">Paros</a>, and <a href="/islands/naxos" className="text-[#1E2E48] hover:underline">Naxos</a>.
              </p>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Types of Ferry Services</h3>
              
              <p className="text-gray-700 mb-4">
                When traveling between the Cyclades islands, you'll encounter two main types of ferries:
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">🚢 Conventional Ferries</h4>
                <p className="text-gray-700 mb-4">
                  These larger vessels are more stable in rough seas and can accommodate vehicles. They're typically slower but more affordable and less likely to be canceled due to weather conditions. Perfect for travelers with cars or those seeking a more comfortable journey.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Duration: 5-8 hours from Athens to Santorini</li>
                  <li>Vehicle capacity available</li>
                  <li>More stable in rough weather</li>
                  <li>Budget-friendly option</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">⚡ High-Speed Ferries</h4>
                <p className="text-gray-700 mb-4">
                  These modern catamarans and hydrofoils offer significantly faster travel times but at a higher price. They're ideal for travelers looking to maximize their time on the islands.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Duration: 3-5 hours from Athens to Santorini</li>
                  <li>Limited or no vehicle capacity</li>
                  <li>Weather-dependent service</li>
                  <li>Premium pricing</li>
                </ul>
              </div>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Best Time to Book Ferry Tickets</h3>
              
              <p className="text-gray-700 mb-6">
                Timing your ferry booking is crucial for securing the best prices and availability:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🌞 Peak Season (July-August)</h4>
                  <p className="text-gray-600">Book 2-3 months in advance. Prices are highest but availability is crucial.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🌸 Shoulder Season (May-June, September)</h4>
                  <p className="text-gray-600">Book 3-4 weeks ahead. Great weather with better prices and fewer crowds.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❄️ Low Season (October-April)</h4>
                  <p className="text-gray-600">Book 1-2 weeks ahead. Limited schedules but lowest prices.</p>
                </div>
                
                <div className="bg-[#E3D7C3]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Last-Minute Deals</h4>
                  <p className="text-gray-600">Sometimes available 24-48 hours before departure during off-peak times.</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-[#1E2E48] mt-8 mb-4">Popular Island Hopping Routes</h3>
              
              <p className="text-gray-700 mb-4">
                When planning your Cyclades island hopping adventure, consider these popular routes:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🏛️ Classic Route (7-10 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → <a href="/islands/mykonos" className="text-[#1E2E48] hover:underline">Mykonos</a> → <a href="/islands/paros" className="text-[#1E2E48] hover:underline">Paros</a> → <a href="/islands/naxos" className="text-[#1E2E48] hover:underline">Naxos</a> → <a href="/islands/santorini" className="text-[#1E2E48] hover:underline">Santorini</a></p>
                </div>
                
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🌋 Western Cyclades (5-7 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → Kythnos → <a href="/islands/serifos" className="text-[#1E2E48] hover:underline">Serifos</a> → <a href="/islands/sifnos" className="text-[#1E2E48] hover:underline">Sifnos</a> → <a href="/islands/milos" className="text-[#1E2E48] hover:underline">Milos</a></p>
                </div>
                
                <div className="border-l-4 border-[#1E2E48] pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">🎨 Cultural Route (4-6 days)</h4>
                  <p className="text-gray-700">Athens (Piraeus) → <a href="/islands/syros" className="text-[#1E2E48] hover:underline">Syros</a> → <a href="/islands/tinos" className="text-[#1E2E48] hover:underline">Tinos</a> → <a href="/islands/andros" className="text-[#1E2E48] hover:underline">Andros</a> → Rafina (Athens)</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                We recommend spending at least 2-3 nights on each island to fully appreciate what each has to offer. During peak season (July-August), it's essential to book your ferry tickets and <a href="/hotels" className="text-[#1E2E48] hover:underline">accommodation</a> well in advance, as both can sell out quickly.
              </p>
              
              <div className="bg-[#1E2E48] text-white rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold mb-3">💡 Pro Tip for Island Hopping</h4>
                <p className="text-[#E3D7C3]">
                  Book your outbound and return ferries first, then fill in the inter-island connections. This ensures you have your main travel dates secured before planning the detailed itinerary. Also, consider our <a href="/activities" className="text-[#E3D7C3] hover:underline font-medium">activities and tours</a> to make the most of each island visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-[#1E2E48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Cyclades Adventure?</h2>
          <p className="text-xl text-[#E3D7C3] mb-8 max-w-3xl mx-auto">
            Join thousands of travelers who book their Greek island ferry tickets online. Compare schedules, secure booking, and instant confirmation for all Cyclades destinations.
          </p>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#E3D7C3]" />
              <span className="text-white text-sm">All Major Ferry Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#E3D7C3]" />
              <span className="text-white text-sm">Secure Online Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-white text-sm">Best Available Prices</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#E3D7C3]" />
              <span className="text-white text-sm">Customer Support</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-[#1E2E48] bg-[#E3D7C3] hover:bg-[#E3D7C3]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E3D7C3] transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Book Ferry Tickets Now
            </button>
            
            <a
              href="/islands"
              className="inline-flex items-center px-8 py-4 border-2 border-[#E3D7C3] text-base font-medium rounded-md text-[#E3D7C3] hover:bg-[#E3D7C3] hover:text-[#1E2E48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E3D7C3] transition-colors"
            >
              Explore All Islands
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
