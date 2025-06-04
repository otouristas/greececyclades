import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Sparkles, Clock, Users, Ship, MapPin, Search, ExternalLink, Plus, Minus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Define interfaces for our data types
interface PopularRoute {
  id: number;
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
  frequency: string;
}

interface FerryCompany {
  name: string;
  logo: string;
  website?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface PortCode {
  name: string;
  code: string;
}

export default function FerryTickets() {
  // Form state
  const [from, setFrom] = useState('Piraeus');
  const [to, setTo] = useState('Santorini');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [vehicles, setVehicles] = useState(0);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'popular'
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  
  // FAQs data
  const faqs: FAQ[] = [
    {
      question: 'How early should I book my ferry tickets?',
      answer: 'For summer travel (June-September), book 2-3 months in advance. For holidays like Easter or August 15th, book 3-4 months ahead. Off-season, 2-4 weeks is usually sufficient.'
    },
    {
      question: 'Can I change or cancel my ferry ticket?',
      answer: 'Yes, most tickets can be changed or canceled. Changes are usually free if made at least 24 hours before departure. Cancellations typically incur a fee of 10-50% depending on how far in advance you cancel.'
    },
    {
      question: 'How early should I arrive at the port?',
      answer: 'Arrive at least 45 minutes before departure for foot passengers, and at least 90 minutes before if traveling with a vehicle. For Piraeus port during high season, add an extra 30 minutes.'
    },
    {
      question: 'Are ferries reliable in Greece?',
      answer: 'Greek ferries are generally reliable, but can be affected by weather conditions, especially in winter. High winds may cause delays or cancellations. Always check your ferry status before heading to the port.'
    }
  ];
  
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

  // Handle popular route click
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

  // Popular routes
  const popularRoutes: PopularRoute[] = [
    {
      id: 1,
      from: 'Piraeus',
      to: 'Santorini',
      duration: '5h - 8h',
      price: '40',
      image: '/images/islands/santorini.webp',
      frequency: 'Daily'
    },
    {
      id: 2,
      from: 'Piraeus',
      to: 'Mykonos',
      duration: '3h - 5h',
      price: '35',
      image: '/images/islands/mykonos.webp',
      frequency: 'Daily'
    },
    {
      id: 3,
      from: 'Rafina',
      to: 'Mykonos',
      duration: '2h - 5h',
      price: '30',
      image: '/images/islands/mykonos.webp',
      frequency: '2-3 times/day'
    },
    {
      id: 4,
      from: 'Piraeus',
      to: 'Paros',
      duration: '3h - 5h',
      price: '35',
      image: '/images/islands/paros.webp',
      frequency: 'Daily'
    },
    {
      id: 5,
      from: 'Piraeus',
      to: 'Naxos',
      duration: '3.5h - 6h',
      price: '38',
      image: '/images/islands/naxos.webp',
      frequency: 'Daily'
    },
    {
      id: 6,
      from: 'Piraeus',
      to: 'Sifnos',
      duration: '2.5h - 5h',
      price: '38',
      image: '/images/islands/sifnos.webp',
      frequency: 'Daily in summer'
    }
  ];

  // Ferry companies
  const ferryCompanies: FerryCompany[] = [
    { name: 'Blue Star Ferries', logo: '/images/companies/blue-star.webp', website: 'https://www.bluestarferries.com/en/' },
    { name: 'SeaJets', logo: '/images/companies/seajets.webp', website: 'https://www.seajets.com/en/' },
    { name: 'Hellenic Seaways', logo: '/images/companies/hellenic.webp', website: 'https://www.hellenicseaways.gr/en/' },
    { name: 'Golden Star Ferries', logo: '/images/companies/golden-star.webp', website: 'https://goldenstarferries.gr/en/' },
    { name: 'Fast Ferries', logo: '/images/companies/fast-ferries.webp', website: 'https://www.fastferries.com.gr/en/' },
    { name: 'Aegean Speed Lines', logo: '/images/companies/aegean-speed.webp', website: 'https://www.aegeanspeedlines.gr/en/' }
  ];

  // Generate FAQ schema for SEO
  const faqSchema = {
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
  };

  return (
    <>
      <Helmet>
        <title>Ferry Tickets to the Cyclades Islands | Discover Cyclades</title>
        <meta name="description" content="Book ferry tickets to the Cyclades islands. Find the best deals on ferries to Santorini, Mykonos, Paros, Naxos, and more." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ferry-hero.webp" 
            alt="Ferry to Cyclades islands" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Ferry Tickets to the Cyclades Islands
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            Find and book ferry tickets to all Cyclades islands. Compare prices, schedules, and book online.
          </p>
          
          {/* Search Box */}
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
              >
                <Search className="inline-block mr-2 h-4 w-4" />
                Search Tickets
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'popular' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
              >
                <Sparkles className="inline-block mr-2 h-4 w-4" />
                Popular Routes
              </button>
            </div>
            
            <div className="p-6">
              {/* Search Form */}
              <AnimatePresence mode="wait">
                {activeTab === 'search' && (
                  <motion.form
                    key="search-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSearch}
                    className="space-y-6"
                  >
                    {/* From/To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin className="inline-block mr-1 h-4 w-4" />
                          From
                        </label>
                        <select
                          id="from"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          {portCodes.map((port) => (
                            <option key={`from-${port.code}`} value={port.name}>
                              {port.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin className="inline-block mr-1 h-4 w-4" />
                          To
                        </label>
                        <select
                          id="to"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          {portCodes.map((port) => (
                            <option key={`to-${port.code}`} value={port.name}>
                              {port.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="depart-date" className="block text-sm font-medium text-gray-700 mb-1">
                          <Calendar className="inline-block mr-1 h-4 w-4" />
                          Departure Date
                        </label>
                        <input
                          type="date"
                          id="depart-date"
                          value={departDate}
                          onChange={(e) => setDepartDate(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {isRoundTrip && (
                        <div>
                          <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="inline-block mr-1 h-4 w-4" />
                            Return Date
                          </label>
                          <input
                            type="date"
                            id="return-date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Round Trip Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="round-trip"
                        checked={isRoundTrip}
                        onChange={(e) => setIsRoundTrip(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="round-trip" className="ml-2 block text-sm text-gray-700">
                        Round Trip
                      </label>
                    </div>
                    
                    {/* Passengers/Vehicles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                          <Users className="inline-block mr-1 h-4 w-4" />
                          Passengers
                        </label>
                        <input
                          type="number"
                          id="passengers"
                          min="1"
                          max="20"
                          value={passengers}
                          onChange={(e) => setPassengers(parseInt(e.target.value))}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="vehicles" className="block text-sm font-medium text-gray-700 mb-1">
                          <Ship className="inline-block mr-1 h-4 w-4" />
                          Vehicles
                        </label>
                        <input
                          type="number"
                          id="vehicles"
                          min="0"
                          max="5"
                          value={vehicles}
                          onChange={(e) => setVehicles(parseInt(e.target.value))}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Search Ferry Tickets
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Popular Routes */}
                {activeTab === 'popular' && (
                  <motion.div
                    key="popular-routes"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {popularRoutes.map((route) => (
                        <div
                          key={route.id}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="h-40 overflow-hidden">
                            <img
                              src={route.image}
                              alt={`${route.from} to ${route.to} ferry route`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">
                              {route.from} - {route.to}
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <Clock className="inline-block mr-1 h-4 w-4" />
                                Duration: {route.duration}
                              </p>
                              <p>
                                <Ship className="inline-block mr-1 h-4 w-4" />
                                Frequency: {route.frequency}
                              </p>
                              <p className="font-medium text-blue-600">
                                From €{route.price}
                              </p>
                            </div>
                            <button
                              onClick={() => handlePopularRouteClick(route.from, route.to)}
                              className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              View Tickets
                              <ChevronRight className="ml-1 h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ferry Companies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ferry Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ferryCompanies.map((company, index) => (
              <a
                key={index}
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-12 object-contain mb-2"
                />
                <span className="text-sm text-center font-medium text-gray-700">{company.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="flex justify-between items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left font-medium text-gray-900"
                >
                  {faq.question}
                  {activeFAQ === index ? (
                    <Minus className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-3 bg-gray-50 rounded-b-lg text-gray-700"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore the Cyclades?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your ferry tickets now and start your Greek island adventure.
          </p>
          <button
            onClick={() => {
              setActiveTab('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Search Tickets Now
          </button>
        </div>
      </section>
    </>
  );
}
