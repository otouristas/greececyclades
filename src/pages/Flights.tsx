import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPlane, FaCalendarAlt, FaInfoCircle, FaQuestion, FaTicketAlt, FaSuitcase } from 'react-icons/fa';

const Flights = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (searchContainerRef.current && !document.getElementById('tp-widget-script')) {
      // Clear any existing content in the container
      searchContainerRef.current.innerHTML = '';
      
      // Create a new script element
      const script = document.createElement('script');
      script.id = 'tp-widget-script';
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&curr=EUR&default_origin=Athens&default_destination=Mikonos&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121';
      script.async = true;
      script.charset = 'utf-8';
      
      // Append the script to the container
      searchContainerRef.current.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      const script = document.getElementById('tp-widget-script');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Popular routes data
  const popularRoutes = [
    { from: 'London (LHR)', to: 'Santorini (JTR)', price: '€180', airline: 'British Airways', duration: '4h 5m' },
    { from: 'Paris (CDG)', to: 'Mykonos (JMK)', price: '€160', airline: 'Air France', duration: '3h 40m' },
    { from: 'Amsterdam (AMS)', to: 'Santorini (JTR)', price: '€210', airline: 'KLM', duration: '3h 55m' },
    { from: 'Rome (FCO)', to: 'Mykonos (JMK)', price: '€140', airline: 'Alitalia', duration: '2h 20m' },
    { from: 'Frankfurt (FRA)', to: 'Santorini (JTR)', price: '€195', airline: 'Lufthansa', duration: '3h 30m' },
    { from: 'New York (JFK)', to: 'Athens (ATH)', price: '€520', airline: 'Emirates', duration: '9h 30m' },
  ];

  // Airlines that fly to Cyclades
  const airlines = [
    { name: 'Aegean Airlines', logo: 'https://logos-world.net/wp-content/uploads/2023/01/Aegean-Airlines-Logo.png' },
    { name: 'Olympic Air', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Olympic_Air_logo.svg/2560px-Olympic_Air_logo.svg.png' },
    { name: 'Sky Express', logo: 'https://www.skyexpress.gr/images/logo-sky.png' },
    { name: 'Lufthansa', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Lufthansa-Logo-700x394.png' },
    { name: 'British Airways', logo: 'https://logos-world.net/wp-content/uploads/2020/03/British-Airways-Logo-700x394.png' },
    { name: 'Air France', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Air-France-Logo-700x394.png' },
    { name: 'KLM', logo: 'https://logos-world.net/wp-content/uploads/2021/08/KLM-Logo.png' },
    { name: 'Ryanair', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Ryanair-Logo-700x394.png' },
  ];

  // FAQs
  const faqs = [
    {
      question: 'What are the main airports in the Cyclades islands?',
      answer: 'The main airports in the Cyclades are Santorini (JTR), Mykonos (JMK), Paros (PAS), Naxos (JNX), Milos (MLO), and Syros (JSY). Athens International Airport (ATH) serves as the main hub for connecting flights to these islands.'
    },
    {
      question: 'When is the best time to book flights to the Cyclades?',
      answer: 'For the best prices, book your flights 3-4 months in advance, especially if you plan to visit during the high season (June-September). Shoulder seasons (April-May and October) often offer better deals with fewer crowds.'
    },
    {
      question: 'Are there direct flights to the Cyclades from outside Greece?',
      answer: 'Yes, during the summer season (May-October), there are direct international flights to Santorini and Mykonos from major European cities like London, Paris, Amsterdam, Rome, and Frankfurt. For other islands, you will typically need to connect through Athens.'
    },
    {
      question: 'How do I get from Athens Airport to the Cyclades islands?',
      answer: 'From Athens Airport, you can take a domestic flight to one of the island airports (30-45 minutes), or take a ferry from Piraeus or Rafina ports (2-5 hours depending on the island and ferry type).'
    },
    {
      question: 'Which airlines fly to the Cyclades islands?',
      answer: 'Aegean Airlines, Olympic Air, and Sky Express operate most domestic flights within Greece. International carriers like British Airways, Lufthansa, Air France, and Ryanair offer seasonal direct flights to Santorini and Mykonos.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Flights to Greek Islands | Greece Cyclades</title>
        <meta name="description" content="Find the best flights to the Greek Islands. Book your journey to Santorini, Mykonos, Paros, and other beautiful Cyclades islands." />
        <link rel="canonical" href="https://greececyclades.com/flights" />
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Flights to Cyclades Islands</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Discover the best deals on flights to Santorini, Mykonos, Naxos, Paros, and other beautiful Cycladic islands</p>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
            <div ref={searchContainerRef} id="flights-search-container" className="min-h-[400px] flex justify-center items-center">
              <div className="text-center text-gray-700">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                <p>Loading flight search widget...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Book Flights with Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaTicketAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We compare prices from hundreds of airlines to ensure you get the best deal on your flight to the Cyclades.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaCalendarAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Booking Options</h3>
              <p className="text-gray-600">Change your travel dates or cancel your booking with minimal fees. We understand plans can change.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaSuitcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Travel Package</h3>
              <p className="text-gray-600">Combine your flight with hotel bookings and ferry tickets for a seamless travel experience to the Cyclades.</p>
            </div>
          </div>
        </div>
        
        {/* Popular Routes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Popular Flight Routes</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Check out the most popular flight routes to the Cyclades islands with estimated prices based on recent bookings</p>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price From</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularRoutes.map((route, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.from}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.airline}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{route.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">* Prices are estimates and may vary based on season, availability, and booking time</p>
        </div>
        
        {/* Airlines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Airlines Flying to Cyclades</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">These major airlines offer regular flights to the Cyclades islands during the summer season</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {airlines.map((airline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-24">
                <img 
                  src={airline.logo} 
                  alt={`${airline.name} logo`} 
                  className="max-h-12 max-w-full" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Island Airports */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Airports in the Cyclades</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Santorini International Airport (JTR)</h3>
                <p className="text-gray-600 mb-4">Located near Kamari village, this airport serves international and domestic flights with increased traffic during summer.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Direct flights from Athens, major European cities</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mykonos International Airport (JMK)</h3>
                <p className="text-gray-600 mb-4">Located 4km from Mykonos Town, with regular flights from Athens and international destinations during summer.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Direct flights from Athens, major European cities</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Paros National Airport (PAS)</h3>
                <p className="text-gray-600 mb-4">Recently upgraded airport with domestic flights from Athens, located near Aliki village.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Daily flights from Athens</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1602433218643-a5b7bc5e195a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Naxos Airport (JNX)</h3>
                <p className="text-gray-600 mb-4">Small airport with daily flights from Athens, located near Naxos Town (Chora).</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Daily flights from Athens</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518219870542-8788eb969b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Milos Airport (MLO)</h3>
                <p className="text-gray-600 mb-4">Connects Milos with Athens through daily flights, located near Zefiria village.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Daily flights from Athens</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568634761634-8d7c8d9291ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Syros Airport (JSY)</h3>
                <p className="text-gray-600 mb-4">Small airport with limited flights from Athens, located near Ermoupoli.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaPlane className="mr-2" /> 
                  <span>Limited flights from Athens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Travel Tips */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <FaInfoCircle className="text-6xl mx-auto md:mx-0" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Flight Booking Tips for the Cyclades</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Book 3-4 months in advance for the best prices, especially for summer travel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Consider flying to Athens and taking a ferry if direct flights are too expensive</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Mid-week flights (Tuesday, Wednesday) are often cheaper than weekend flights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>May and September offer great weather with lower prices and fewer crowds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Check baggage allowances as some budget airlines have strict policies</span>
                  </li>
                </ul>
              </div>
            </div>
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
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <FaQuestion className="text-blue-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
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
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore the Cyclades?</h2>
              <p className="text-white text-lg mb-6">Book your flights today and start planning your dream vacation to the beautiful Greek islands.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#search-flights" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">Search Flights</a>
                <a href="/ferry-tickets" className="inline-block bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300">Check Ferry Options</a>
              </div>
            </div>
            <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
