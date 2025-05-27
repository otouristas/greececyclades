import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPlane, FaCalendarAlt, FaInfoCircle, FaQuestion, FaTicketAlt, FaSuitcase, FaSearch, FaBell, FaCalendar, FaGift, FaMapMarkerAlt, FaClock, FaEuroSign, FaExchangeAlt } from 'react-icons/fa';

const BOOKING_ENGINE_URL = 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-05-28&flighttype=D&quantity=1&rdate=2025-06-01&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305';

const Flights = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchContainerRef.current && !document.getElementById('tp-widget-script')) {
      searchContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'tp-widget-script';
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&curr=EUR&default_origin=Athens&default_destination=Mikonos&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121';
      script.async = true;
      script.charset = 'utf-8';
      searchContainerRef.current.appendChild(script);
    }
    
    return () => {
      const script = document.getElementById('tp-widget-script');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const cheapestFlights = [
    { 
      departure: 'New York (JFK)', 
      destination: 'Santorini (JTR)', 
      airline: 'American Airlines', 
      duration: '11h 10m+', 
      price: '$507',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JTR&allianceid=1094387&class=ys&currency=EUR&dcity=JFK&ddate=2025-07-10&flighttype=D&quantity=1&rdate=2025-07-24&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    { 
      departure: 'London (LHR)', 
      destination: 'Mykonos (JMK)', 
      airline: 'British Airways', 
      duration: '4h 5m', 
      price: '€180',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=LHR&ddate=2025-06-05&flighttype=D&quantity=1&rdate=2025-06-12&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    { 
      departure: 'Paris (CDG)', 
      destination: 'Mykonos (JMK)', 
      airline: 'Air France', 
      duration: '3h 40m', 
      price: '€160',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=CDG&ddate=2025-06-10&flighttype=D&quantity=1&rdate=2025-06-17&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    { 
      departure: 'Frankfurt (FRA)', 
      destination: 'Santorini (JTR)', 
      airline: 'Lufthansa', 
      duration: '3h 30m', 
      price: '€195',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JTR&allianceid=1094387&class=ys&currency=EUR&dcity=FRA&ddate=2025-06-15&flighttype=D&quantity=1&rdate=2025-06-25&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    { 
      departure: 'Athens (ATH)', 
      destination: 'Mykonos (JMK)', 
      airline: 'Aegean/Sky Express', 
      duration: '45m', 
      price: '€50',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-05-28&flighttype=D&quantity=1&rdate=2025-06-01&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    }
  ];

  const airlines = [
    { name: 'Aegean Airlines', description: "Greece's largest airline, offering extensive domestic and international connections" },
    { name: 'Olympic Air', description: 'A subsidiary of Aegean, focusing on domestic routes within Greece' },
    { name: 'Sky Express', description: 'A growing Greek airline providing crucial links from mainland Greece to the islands' },
    { name: 'Lufthansa', description: 'Connects major German cities to Athens and some islands directly in summer' },
    { name: 'British Airways', description: 'Offers flights from London to Athens, Santorini, and Mykonos' },
    { name: 'Air France', description: 'Provides connections from Paris to Athens and seasonal flights to popular islands' },
    { name: 'KLM', description: 'Flies from Amsterdam to Athens, with onward connections to the Cyclades' },
    { name: 'American Airlines', description: 'Offers flights from the US to Athens, with connections to the islands' }
  ];

  const airports = [
    {
      name: 'Santorini National Airport (JTR) - Thira',
      description: 'The busiest airport in the Cyclades, welcoming international direct flights from many European cities during the peak season and daily domestic flights from Athens (ATH) and Thessaloniki (SKG) year-round.',
      location: 'Located near Kamari, about 6km southeast of Fira',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JTR&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-06-10&flighttype=D&quantity=1&rdate=2025-06-17&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    {
      name: 'Mykonos International Airport (JMK)',
      description: 'A bustling summer hub with numerous international charter and scheduled flights, plus frequent domestic connections from Athens and Thessaloniki.',
      location: 'Located just 4km from Mykonos Town (Chora)',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-05-28&flighttype=D&quantity=1&rdate=2025-06-01&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    {
      name: 'Paros National Airport (PAS)',
      description: 'A modern domestic airport that has seen significant upgrades, handling frequent flights from Athens and Thessaloniki.',
      location: 'Located near Aliki, about 10km from Parikia (the main port)',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=PAS&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-07-01&flighttype=D&quantity=1&rdate=2025-07-08&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    {
      name: 'Naxos Island National Airport (JNX)',
      description: 'A smaller domestic hub located close to Naxos Town (Chora), primarily served by daily flights from Athens.',
      location: 'Near Naxos Town (Chora)',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JNX&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-07-05&flighttype=D&quantity=1&rdate=2025-07-12&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    {
      name: 'Milos Island National Airport (MLO)',
      description: 'Serves daily domestic flights from Athens, making it a convenient gateway to discover the unique volcanic landscapes and stunning beaches of Milos.',
      location: 'Near Milos Town',
      bookingUrl: 'https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=MLO&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-07-15&flighttype=D&quantity=1&rdate=2025-07-22&trip_sub1=9ee3e71e2cc84d15a5d80b1e6-595305&utm_campaign=595305'
    },
    {
      name: 'Syros Island National Airport (JSY)',
      description: 'Offers limited domestic service, primarily connecting to Athens. Syros is the administrative capital of the Cyclades.',
      location: 'Near Ermoupoli',
      bookingUrl: BOOKING_ENGINE_URL
    }
  ];

  const faqs = [
    {
      question: "What's the cheapest month to fly to the Cyclades Islands?",
      answer: "Generally, October and May (shoulder seasons) tend to offer the lowest fares for flights to the Cyclades. Booking 1–3 months in advance for these periods, or even earlier for peak summer, usually yields the best rates."
    },
    {
      question: "Are there direct flights to Cyclades from the USA, UK, or other European countries?",
      answer: "From the USA: Direct flights to the Cyclades islands themselves are rare. Most US travelers fly into Athens International Airport (ATH) and then take a short connecting domestic flight (30-50 minutes) to islands like Santorini (JTR) or Mykonos (JMK). From the UK: Yes, during the peak season (roughly May to October), several airlines offer direct flights from London airports to Santorini, Mykonos, and sometimes Crete. From other European Countries: Many European cities have seasonal direct flights to popular islands like Santorini and Mykonos."
    },
    {
      question: "Can I easily combine flights with ferry tickets and hotel bookings for my Cyclades trip?",
      answer: "Absolutely! Our platform is designed to help you plan your entire Cycladic adventure. You can search for flights and then seamlessly add ferry tickets between islands and browse a wide selection of hotels, from budget-friendly studios to luxury villas. Look for our package deals to maximize savings."
    },
    {
      question: "What day of the week is generally best to book flights for the cheapest prices?",
      answer: "While there's no foolproof rule, some studies suggest that booking flights on a Sunday or Tuesday can sometimes result in slightly lower prices compared to booking on a Friday, which tends to be more expensive. Using our Fare Calendar tool is the best way to see price variations."
    },
    {
      question: "How far in advance should I book flights to the Cyclades for summer travel (June-August)?",
      answer: "For peak summer travel, especially to high-demand islands like Santorini and Mykonos, it's advisable to book your flights at least 3-6 months in advance. For shoulder seasons (May, September), 2-4 months out is often sufficient. Last-minute deals are rare for popular summer routes."
    },
    {
      question: "What are the main airports in the Cyclades for international visitors?",
      answer: "Santorini (JTR) and Mykonos (JMK) are the primary Cycladic airports receiving international flights, mainly from Europe during summer. For most intercontinental travelers (e.g., from USA, Canada, Australia), Athens (ATH) is the main entry point, followed by a domestic flight or ferry to the islands."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Cheap Flights to Cyclades Islands - Santorini, Mykonos, Naxos & More | Discover Cyclades</title>
        <meta name="description" content="Book the best deals on flights to the Cyclades Islands including Santorini, Mykonos, Naxos, and Paros for your 2025 Greek holiday. Compare airlines, find the cheapest prices, and explore direct routes. Benefit from flexible bookings, expert travel tips & unlock significant savings on your dream Cycladic adventure." />
        <link rel="canonical" href="https://greececyclades.com/flights" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('/images/flights/flights-hero.jpg')" }}>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Cheap Flights to the Cyclades Islands</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Dreaming of a sun-soaked Greek island escape? <a href={BOOKING_ENGINE_URL} className="text-white underline hover:text-blue-200">Discover unbeatable flight deals</a> to Santorini, Mykonos, Paros, Naxos, and more.</p>
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
        {/* Why Book With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Book Flights with Discover Cyclades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaTicketAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We tirelessly scan hundreds of airlines and booking partners to ensure you secure the absolute lowest price possible for your flight to any of the Cyclades islands. <a href={BOOKING_ENGINE_URL} className="text-blue-600 hover:text-blue-800">Check current deals</a>.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaCalendarAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Booking Options</h3>
              <p className="text-gray-600">Travel plans can change, and we understand that. Enjoy complete peace of mind with our selection of flights offering flexible cancellation and rebooking policies.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaSuitcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Travel Packages</h3>
              <p className="text-gray-600">Unlock incredible savings! Bundle your flights with inter-island ferry tickets, charming hotel accommodations, or convenient car rentals. Save up to 30% with our exclusive packages.</p>
            </div>
          </div>
        </div>

        {/* Cheapest Flights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Cheapest Flights to Cyclades in 2025</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price From</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Now</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cheapestFlights.map((flight, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.departure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.airline}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{flight.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href={flight.bookingUrl} className="text-blue-600 hover:text-blue-800 font-medium">Book Flight</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center italic">Prices are estimates based on historical data and may vary based on season, demand, and availability. Book early for the best deals!</p>
        </div>

        {/* Tips Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Expert Tips to Find the Cheapest Flights to Cyclades Islands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaCalendar className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Early for Peak Season</h3>
                  <p className="text-gray-600">For summer travel (June-August) to popular islands like Santorini and Mykonos, aim to book your flights 2–4 months in advance.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaExchangeAlt className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Be Flexible with Dates & Times</h3>
                  <p className="text-gray-600">Midweek flights (Tuesdays and Wednesdays) and early morning or late-night departures often come with lower price tags.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaClock className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Travel in Shoulder Season</h3>
                  <p className="text-gray-600">Experience the beauty of the Cyclades with fewer crowds and cheaper flights in May, early June, late September, and October.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaSearch className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Use Our Powerful Filters</h3>
                  <p className="text-gray-600">Customize your flight search by airline, number of stopovers, preferred departure/arrival times, and even nearby airports.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Consider Nearby Airports</h3>
                  <p className="text-gray-600">Flying into a less popular island airport and taking a short ferry ride can sometimes be cheaper.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaEuroSign className="text-blue-600 text-xl mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bundle & Save Big</h3>
                  <p className="text-gray-600">Don't forget to explore our package deals. Booking flights, ferries, and hotels together can unlock significant discounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Airlines Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Major Airlines Flying to Cyclades Islands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airlines.map((airline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{airline.name}</h3>
                <p className="text-gray-600 text-sm">{airline.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Airports Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Cyclades Island Airports Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airports.map((airport, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{airport.name}</h3>
                <p className="text-gray-600 mb-2">{airport.description}</p>
                <p className="text-sm text-gray-500 mb-4">{airport.location}</p>
                <a href={airport.bookingUrl} className="text-blue-600 hover:text-blue-800 font-medium">Find Flights to {airport.name.split(' ')[0]}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Use Discover Cyclades Tools to Maximize Your Savings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaBell className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Price Alerts</h3>
              <p className="text-gray-600">Track your preferred flight routes and get notified when prices drop. <a href={BOOKING_ENGINE_URL} className="text-blue-600 hover:text-blue-800">Set up alerts</a>.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaCalendar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fare Calendar</h3>
              <p className="text-gray-600">Easily visualize the cheapest dates to fly across a whole month.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaSuitcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">One-Click Packages</h3>
              <p className="text-gray-600">Simplify your planning. Combine flights with ferries and hotels instantly.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <FaGift className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Member Rewards</h3>
              <p className="text-gray-600">Sign up for Discover Cyclades to earn points or discounts on every booking.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Book Your Dream Cyclades Island Escape for 2025?</h2>
          <p className="text-gray-600 mb-8">The magic of the Greek Islands awaits! White-washed villages, iconic blue domes, stunning beaches, and unforgettable sunsets are just a flight away.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BOOKING_ENGINE_URL} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Search & Book Your Cheap Flight Now!
            </a>
            <a href="/ferry-tickets" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Explore Ferry Tickets
            </a>
            <a href="/hotels" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Browse Hotels in Cyclades
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
