import { useState } from 'react';
import { Ship, Info, Clock, Calendar, MapPin, Anchor, HelpCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Ferry companies operating in the Cyclades
const ferryCompanies = [
  { 
    name: 'Blue Star Ferries', 
    logo: '/images/ferry-companies/blue-star.png',
    website: 'https://www.bluestarferries.com/en/'
  },
  { 
    name: 'Seajets', 
    logo: '/images/ferry-companies/seajets.png',
    website: 'https://www.seajets.com/en/'
  },
  { 
    name: 'Golden Star Ferries', 
    logo: '/images/ferry-companies/golden-star.png',
    website: 'https://goldenstarferries.gr/en/'
  },
  { 
    name: 'Fast Ferries', 
    logo: '/images/ferry-companies/fast-ferries.png',
    website: 'https://www.fastferries.com.gr/en/'
  },
  { 
    name: 'Hellenic Seaways', 
    logo: '/images/ferry-companies/hellenic.png',
    website: 'https://www.hellenicseaways.gr/en/'
  }
];

// Main ports in the Cyclades
const mainPorts = [
  { name: 'Piraeus (Athens)', islands: ['All Cyclades islands'] },
  { name: 'Rafina (Athens)', islands: ['Andros', 'Tinos', 'Mykonos', 'Paros', 'Naxos'] },
  { name: 'Lavrio (Athens)', islands: ['Kea', 'Kythnos', 'Syros'] },
  { name: 'Mykonos', islands: ['Paros', 'Naxos', 'Santorini', 'Tinos', 'Andros', 'Syros'] },
  { name: 'Santorini', islands: ['Mykonos', 'Paros', 'Naxos', 'Ios', 'Milos', 'Folegandros'] },
  { name: 'Paros', islands: ['Mykonos', 'Naxos', 'Santorini', 'Ios', 'Milos', 'Syros'] },
  { name: 'Naxos', islands: ['Mykonos', 'Paros', 'Santorini', 'Ios', 'Koufonisia', 'Amorgos'] }
];

export default function FerryGuide() {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <>
      <SEO 
        title="Cyclades Ferry Guide - Routes, Tips & Information"
        description="Complete guide to ferry travel in the Cyclades islands. Find information about routes, companies, booking tips, and seasonal schedules."
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-800 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cyclades Ferry Guide
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to know about traveling by ferry between the Greek islands
          </p>
          <div className="mt-8">
            <Link 
              to="/ferry-tickets" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              <Ship className="h-5 w-5" />
              Search Ferry Tickets
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General Information
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'companies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ferry Companies
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'routes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Popular Routes
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tips'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Travel Tips
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mb-12">
          {/* General Information */}
          {activeTab === 'general' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Ferry Travel in the Cyclades</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Ferries are the primary mode of transportation between the Cyclades islands. With a well-developed network of routes, ferries connect all inhabited islands to each other and to the mainland ports of Athens.
                  </p>
                  <p className="text-gray-600 mb-4">
                    There are two main types of ferries operating in the Cyclades:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                    <li><strong>Conventional Ferries:</strong> Larger, slower vessels that can transport vehicles and more passengers. They're more stable in rough seas but take longer to reach destinations.</li>
                    <li><strong>High-speed Ferries/Catamarans:</strong> Faster vessels that significantly reduce travel time but are more expensive and may be canceled in bad weather.</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Key Information
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Operating Seasons</p>
                        <p className="text-sm text-gray-600">Peak season (June-September) offers the most frequent connections. Limited service in winter months.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Advance Booking</p>
                        <p className="text-sm text-gray-600">Recommended to book 1-3 months in advance for summer travel, especially for popular routes.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Main Departure Ports</p>
                        <p className="text-sm text-gray-600">Piraeus, Rafina, and Lavrio (all serving Athens area).</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Weather Disruptions</p>
                        <p className="text-sm text-gray-600">Services may be canceled due to strong winds, especially in winter and for high-speed vessels.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Seasonal Considerations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Summer (Jun-Aug)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Most frequent connections</li>
                      <li>• All routes operating</li>
                      <li>• Highest ticket prices</li>
                      <li>• Advance booking essential</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Spring/Fall (Apr-May, Sep-Oct)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Good frequency</li>
                      <li>• Most routes operating</li>
                      <li>• Moderate prices</li>
                      <li>• Some advance booking advised</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Winter (Nov-Mar)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Reduced frequency</li>
                      <li>• Limited routes</li>
                      <li>• Lower prices</li>
                      <li>• More weather cancellations</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Holiday Periods</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Easter week</li>
                      <li>• August 15 (Assumption)</li>
                      <li>• Christmas/New Year</li>
                      <li>• Book well in advance</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/ferry-tickets" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  <Ship className="h-5 w-5" />
                  Search and Book Ferry Tickets
                </Link>
              </div>
            </div>
          )}
          
          {/* Ferry Companies */}
          {activeTab === 'companies' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Ferry Companies</h2>
              <p className="text-gray-600 mb-8">
                Several ferry companies operate in the Cyclades, each with different types of vessels, routes, and schedules. Here are the main operators:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {ferryCompanies.map((company) => (
                  <div key={company.name} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center">
                    <div className="h-16 w-full flex items-center justify-center mb-4">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Visit Official Website
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Booking Options
                </h3>
                <p className="text-gray-600 mb-4">
                  You can book ferry tickets through:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                    <span><strong>Ferry company websites</strong> - Direct booking with the operator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                    <span><strong>Ticket agencies</strong> - Located at ports and in major towns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                    <span><strong>Online booking platforms</strong> - Compare schedules and prices across companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
                    <span><strong>Hotels and travel agencies</strong> - Can arrange tickets for guests</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link 
                    to="/ferry-tickets" 
                    className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    Book Tickets Now
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Popular Routes */}
          {activeTab === 'routes' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Popular Ferry Routes</h2>
              <p className="text-gray-600 mb-8">
                The Cyclades islands are well-connected by ferry routes. Here are the main ports and their connections:
              </p>
              
              <div className="space-y-6 mb-8">
                {mainPorts.map((port) => (
                  <div key={port.name} className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Anchor className="h-5 w-5 text-blue-600" />
                      {port.name}
                    </h3>
                    <p className="text-gray-700 mb-2">Direct connections to:</p>
                    <div className="flex flex-wrap gap-2">
                      {port.islands.map((island) => (
                        <span 
                          key={island} 
                          className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded"
                        >
                          {island}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Important Notes
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                    <span>Not all routes operate year-round. Winter schedules are significantly reduced.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                    <span>Travel times vary greatly between conventional and high-speed ferries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                    <span>Some connections may require a transfer at a hub island (like Paros or Naxos).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                    <span>Always check the latest schedules as they can change seasonally.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/ferry-tickets" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Search Routes and Schedules
                </Link>
              </div>
            </div>
          )}
          
          {/* Travel Tips */}
          {activeTab === 'tips' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Ferry Travel Tips</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    Before Your Trip
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <span><strong>Book in advance</strong> during high season (June-September) and for popular routes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <span><strong>Consider the ferry type</strong> - high-speed is faster but more expensive and more susceptible to cancellations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <span><strong>Check the weather forecast</strong> before traveling, especially in winter or if prone to seasickness.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <span><strong>Allow buffer days</strong> in your itinerary in case of cancellations or delays.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">5</div>
                      <span><strong>Verify departure ports</strong> in Athens (Piraeus, Rafina, or Lavrio) as they're quite far from each other.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Ship className="h-5 w-5 text-blue-600" />
                    During Your Journey
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <span><strong>Arrive early</strong> - at least 30 minutes before departure for foot passengers, 1 hour for vehicles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <span><strong>Keep valuables with you</strong> if you've stored luggage in designated areas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <span><strong>For seasickness</strong>, book a seat in the middle of the ferry where movement is minimized.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <span><strong>Listen for announcements</strong> about approaching ports - they're often in Greek first.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">5</div>
                      <span><strong>Be ready to disembark</strong> 15-20 minutes before arrival at your destination.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Ticket Types & Seating Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Deck/Economy</h4>
                    <p className="text-sm text-gray-600">Basic ticket with no assigned seat. Access to indoor and outdoor common areas.</p>
                    <p className="text-sm font-medium text-blue-600 mt-2">Most affordable option</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Numbered Seat</h4>
                    <p className="text-sm text-gray-600">Assigned airplane-style seat in air-conditioned lounges.</p>
                    <p className="text-sm font-medium text-blue-600 mt-2">Good value option</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Business Class</h4>
                    <p className="text-sm text-gray-600">More comfortable seating in a separate, less crowded lounge.</p>
                    <p className="text-sm font-medium text-blue-600 mt-2">Added comfort</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Cabin</h4>
                    <p className="text-sm text-gray-600">Private cabin with beds. Available on longer routes and overnight journeys.</p>
                    <p className="text-sm font-medium text-blue-600 mt-2">Premium option</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  to="/ferry-tickets" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Book Your Ferry Tickets
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How far in advance should I book ferry tickets?</h3>
              <p className="text-gray-600">For summer travel (June-September), book 1-3 months in advance, especially for popular routes like Athens to Santorini/Mykonos. For off-season, a few days to a week in advance is usually sufficient.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I take my car on the ferry?</h3>
              <p className="text-gray-600">Yes, most conventional ferries accommodate vehicles. High-speed catamarans typically don't. Vehicle tickets should be booked well in advance, especially in summer.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if my ferry is canceled?</h3>
              <p className="text-gray-600">You'll be offered a refund or rebooking on the next available ferry. This is why it's advisable to have flexible plans, especially in winter or during periods of strong winds.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Are ferries reliable in the Cyclades?</h3>
              <p className="text-gray-600">Generally yes, but they are subject to weather conditions. The meltemi winds in summer and winter storms can cause cancellations, particularly for high-speed vessels.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Is there food available on the ferries?</h3>
              <p className="text-gray-600">Larger ferries have cafes and restaurants onboard. Smaller or high-speed vessels may have limited food options. It's always a good idea to bring some snacks and water.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
