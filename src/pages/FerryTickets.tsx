import { useState, useEffect } from 'react';
import { Calendar, Users, Ship, ChevronRight, Star, MapPin, Clock, Euro, Info, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// Define interfaces for our data types
interface PopularRoute {
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
}

interface FerryCompany {
  name: string;
  logo: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function FerryTickets() {
  const [from, setFrom] = useState('Piraeus');
  const [to, setTo] = useState('Santorini');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [vehicles, setVehicles] = useState(0);

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
    window.open('https://fas.st/t/RJapqw5V', '_blank');
  };

  // Popular routes
  const popularRoutes: PopularRoute[] = [
    {
      from: 'Piraeus',
      to: 'Santorini',
      duration: '5h - 8h',
      price: 'From €40',
      image: '/images/islands/santorini-island.webp'
    },
    {
      from: 'Piraeus',
      to: 'Mykonos',
      duration: '3h - 5h',
      price: 'From €35',
      image: '/images/islands/mykonos-island.jpg'
    },
    {
      from: 'Rafina',
      to: 'Mykonos',
      duration: '2h - 5h',
      price: 'From €30',
      image: '/images/islands/mykonos-island.jpg'
    },
    {
      from: 'Piraeus',
      to: 'Naxos',
      duration: '4h - 6h',
      price: 'From €38',
      image: '/images/islands/naxos-island.jpg'
    },
    {
      from: 'Piraeus',
      to: 'Paros',
      duration: '3h - 5h',
      price: 'From €32',
      image: '/images/islands/paros-island.jpg'
    },
    {
      from: 'Mykonos',
      to: 'Santorini',
      duration: '2h - 3h',
      price: 'From €25',
      image: '/images/islands/santorini-island.webp'
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
        <title>Ferry Tickets to Greek Islands | Greece Cyclades</title>
        <meta name="description" content="Book ferry tickets to the Cyclades islands. Compare prices and schedules from all major ferry companies for your island hopping adventure in Greece." />
        <link rel="canonical" href="https://greececyclades.com/ferry-tickets" />
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ferry/hero.jpg" 
            alt="Ferry sailing in the Aegean Sea" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 opacity-80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ferry Tickets to the Greek Islands
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Book your island-hopping adventure with the best prices and schedules
            </p>
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
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Piraeus">Piraeus (Athens)</option>
                      <option value="Rafina">Rafina</option>
                      <option value="Lavrio">Lavrio</option>
                      <option value="Mykonos">Mykonos</option>
                      <option value="Santorini">Santorini</option>
                      <option value="Paros">Paros</option>
                      <option value="Naxos">Naxos</option>
                      <option value="Milos">Milos</option>
                      <option value="Ios">Ios</option>
                      <option value="Syros">Syros</option>
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
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Santorini">Santorini</option>
                      <option value="Mykonos">Mykonos</option>
                      <option value="Paros">Paros</option>
                      <option value="Naxos">Naxos</option>
                      <option value="Milos">Milos</option>
                      <option value="Ios">Ios</option>
                      <option value="Amorgos">Amorgos</option>
                      <option value="Folegandros">Folegandros</option>
                      <option value="Syros">Syros</option>
                      <option value="Tinos">Tinos</option>
                      <option value="Piraeus">Piraeus (Athens)</option>
                      <option value="Rafina">Rafina</option>
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
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Return Date */}
                <div>
                  <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Return Date (Optional)
                  </label>
                  <div className="relative">
                    <input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departDate}
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Search Ferry Tickets
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Popular Routes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Ferry Routes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the most popular ferry connections between the Greek islands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route, index) => (
              <a 
                key={index}
                href="https://fas.st/t/RJapqw5V"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to} ferry route`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">
                      {route.from} to {route.to}
                    </h3>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-800 font-medium">
                      <Euro className="w-4 h-4 mr-1" />
                      <span>{route.price}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Multiple daily departures</span>
                    <span className="text-blue-600 font-medium flex items-center group-hover:underline">
                      View Schedule
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="https://fas.st/t/RJapqw5V"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Routes
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
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
                href="https://fas.st/t/RJapqw5V"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
      
      {/* SEO Content Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Island Hopping in the Cyclades</h2>
            
            <div className="prose prose-lg prose-blue max-w-none">
              <p>
                The Cyclades islands, with their iconic white-washed buildings and blue-domed churches, are one of Greece's most beloved destinations. Island hopping by ferry is the perfect way to experience multiple islands during your vacation, allowing you to discover each island's unique character and charm.
              </p>
              
              <p>
                The Greek ferry system is extensive and well-developed, connecting all major islands with regular services. During the summer months (June to September), ferries operate at their highest frequency, with multiple daily connections between popular islands like Santorini, Mykonos, Paros, and Naxos.
              </p>
              
              <h3>Types of Ferries</h3>
              
              <p>
                When traveling between the Cyclades islands, you'll encounter two main types of ferries:
              </p>
              
              <ul>
                <li>
                  <strong>Conventional Ferries:</strong> These larger vessels are more stable in rough seas and can accommodate vehicles. They're typically slower but more affordable and less likely to be canceled due to weather conditions.
                </li>
                <li>
                  <strong>High-Speed Ferries:</strong> These modern catamarans and hydrofoils offer significantly faster travel times but at a higher price. They're ideal for travelers looking to maximize their time on the islands.
                </li>
              </ul>
              
              <h3>Planning Your Island Hopping Route</h3>
              
              <p>
                When planning your Cyclades island hopping adventure, consider these popular routes:
              </p>
              
              <ul>
                <li>
                  <strong>Classic Route:</strong> Athens (Piraeus) → Mykonos → Paros → Naxos → Santorini
                </li>
                <li>
                  <strong>Western Cyclades:</strong> Athens (Piraeus) → Kythnos → Serifos → Sifnos → Milos
                </li>
                <li>
                  <strong>Off-the-Beaten-Path:</strong> Athens (Piraeus) → Syros → Tinos → Andros → Rafina (Athens)
                </li>
              </ul>
              
              <p>
                We recommend spending at least 2-3 nights on each island to fully appreciate what each has to offer. During peak season (July-August), it's essential to book your ferry tickets and accommodation well in advance, as both can sell out quickly.
              </p>
              
              <p>
                Through our ferry ticket booking service, you can easily compare schedules and prices from all major ferry companies operating in the Cyclades, ensuring you find the best options for your island hopping adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about ferry travel in the Greek islands
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-medium text-gray-900 flex items-start">
                  <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mr-2" />
                  <span>{faq.question}</span>
                </h3>
                <div className="mt-3 text-gray-600 ml-8">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Island Adventure?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Book your ferry tickets now and experience the magic of the Greek islands
          </p>
          <a 
            href="https://fas.st/t/RJapqw5V"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Book Ferry Tickets
            <Ship className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
