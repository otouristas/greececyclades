import { Sun, ArrowRight, CalendarDays, Users, Map, Compass, PlaneLanding, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SEO from '../components/SEO';
import SearchBar from '../components/search/SearchBar';
import Breadcrumbs from '../components/Breadcrumbs';
import { islandGuides } from '../data/islandsData';
import { SITE_TAGLINE } from '../constants/seo';

export default function IslandGuides() {
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO 
        title={`Cyclades Islands Travel Guides ${SITE_TAGLINE}`}
        description="Comprehensive travel guides for all Cyclades islands. Find insider tips, local recommendations, and detailed information for your perfect Greek island vacation."
        ogImage="/images/guides-hero.jpg"
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Guides', path: '/guides' }
            ]}
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[85vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src="/images/guides-hero.jpg"
                alt="Cyclades Islands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Your Guide to the <span className="text-blue-400">Cyclades</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover the magic of Greek island life. From hidden beaches to charming villages, 
                find your perfect island escape with our comprehensive guides.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Map className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">23 Islands</div>
                  <div className="text-sm text-gray-300">To Explore</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Compass className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Local Tips</div>
                  <div className="text-sm text-gray-300">From Experts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <PlaneLanding className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Travel Info</div>
                  <div className="text-sm text-gray-300">Made Easy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <Sun className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <div className="text-white font-medium">Best Times</div>
                  <div className="text-sm text-gray-300">To Visit</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-2xl mb-8">
                <SearchBar />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/trip-planner"
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Start Planning Your Trip
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/islands"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  View All Islands
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Island Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {islandGuides.map((guide) => (
              <Link 
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48">
                    <img
                      src={guide.image}
                      alt={`${guide.name} Island`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>Best Time: {guide.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>Ideal For: {guide.idealFor.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Text Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cyclades Island Guides: Your Ultimate Travel Companion</h2>
              
              <div className="prose prose-lg prose-blue mx-auto">
                <p>
                  Our <strong>Cyclades Island Guides</strong> are meticulously crafted to help you navigate the stunning archipelago with confidence and insider knowledge. Each guide is written by travel experts and locals who know these islands intimately, ensuring you receive authentic, up-to-date information for your Greek island adventure.
                </p>
                
                <p>
                  From the iconic <strong>Santorini</strong> with its breathtaking caldera views and world-famous sunsets to the cosmopolitan <strong>Mykonos</strong> with its vibrant nightlife and picturesque windmills, our guides cover all the must-see destinations in the Cyclades. We also delve into lesser-known gems like <strong>Sifnos</strong> with its exceptional culinary scene, <strong>Folegandros</strong> with its untouched beauty, and <strong>Amorgos</strong> with its dramatic landscapes featured in "The Big Blue" film.
                </p>
                
                <p>
                  Each island guide provides comprehensive information on:
                </p>
                
                <ul>
                  <li><strong>Getting There</strong>: Detailed transportation options including ferry routes, flight connections, and local transfers.</li>
                  <li><strong>Where to Stay</strong>: Accommodation recommendations for all budgets, from luxury resorts to family-run guesthouses.</li>
                  <li><strong>Best Beaches</strong>: Insider tips on the most beautiful beaches, including secluded coves only locals know about.</li>
                  <li><strong>Local Cuisine</strong>: Where to find authentic Greek food, signature island dishes, and the best tavernas and restaurants.</li>
                  <li><strong>Activities & Attractions</strong>: From ancient ruins and museums to hiking trails and water sports.</li>
                  <li><strong>Practical Information</strong>: Opening hours, local customs, tipping etiquette, and essential Greek phrases.</li>
                </ul>
                
                <p>
                  Our guides are designed to help you experience the true essence of the Cyclades, beyond the typical tourist attractions. We highlight the authentic cultural experiences, from traditional festivals and local crafts to hidden viewpoints and charming villages perched on hillsides.
                </p>
                
                <p>
                  Whether you're planning your first trip to the Greek islands or you're a seasoned traveler looking to explore new destinations in the Cyclades, our comprehensive guides will help you create unforgettable memories in this magical part of the Mediterranean.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About Our Island Guides</h2>
                <p className="text-gray-600">Everything you need to know about using our Cyclades island guides</p>
              </div>
              
              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(0)}
                  >
                    <span className="text-lg font-medium text-gray-900">How detailed are your island guides?</span>
                    {openFaq === 0 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 0 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Our island guides are comprehensive resources designed to cover all aspects of your visit. Each guide includes detailed information about transportation options, accommodation choices for all budgets, dining recommendations, beaches, attractions, activities, local customs, and practical tips. We regularly update our guides to ensure the information remains current and accurate, with insights from both travel experts and locals who know the islands intimately.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 2 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(1)}
                  >
                    <span className="text-lg font-medium text-gray-900">Which islands have complete guides available?</span>
                    {openFaq === 1 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 1 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        We currently offer comprehensive guides for 23 Cyclades islands, including the popular destinations of Santorini, Mykonos, Naxos, Paros, Milos, and Ios, as well as lesser-known gems like Amorgos, Folegandros, Sifnos, Serifos, Tinos, Andros, Syros, Kea, Kythnos, Kimolos, Sikinos, Anafi, Antiparos, Koufonisia, Donousa, Iraklia, and Schinoussa. We're continuously expanding our collection to include even more islands and updating existing guides with fresh information.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 3 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(2)}
                  >
                    <span className="text-lg font-medium text-gray-900">How often are the guides updated?</span>
                    {openFaq === 2 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 2 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        We update our island guides at least once a year before the start of the summer season to ensure all information is current. For major islands like Santorini and Mykonos, we perform more frequent updates throughout the year. Our team regularly checks for changes in ferry schedules, new accommodation options, restaurant openings and closures, and other relevant information. We also incorporate feedback from travelers and local contacts to keep our guides accurate and helpful.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 4 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(3)}
                  >
                    <span className="text-lg font-medium text-gray-900">Do your guides include off-the-beaten-path recommendations?</span>
                    {openFaq === 3 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 3 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Absolutely! While we cover all the must-see attractions, we take pride in offering insider tips and hidden gems that aren't in typical guidebooks. Our guides include secluded beaches, authentic local tavernas away from tourist areas, lesser-known hiking trails with spectacular views, and unique cultural experiences. We work with locals and frequent visitors to uncover these special places that provide a more authentic experience of each island's character and charm.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 5 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(4)}
                  >
                    <span className="text-lg font-medium text-gray-900">Can I use these guides offline while traveling?</span>
                    {openFaq === 4 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 4 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Yes, our guides are designed to be accessible offline. You can save the guide pages to your device before traveling, allowing you to access all the information even without an internet connection. This is particularly useful when exploring more remote islands or areas with limited connectivity. We also offer printable PDF versions of our guides that you can download and take with you. For the best experience, we recommend saving the guides before your trip.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 6 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(5)}
                  >
                    <span className="text-lg font-medium text-gray-900">How do I choose which island guide is right for me?</span>
                    {openFaq === 5 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 5 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Each of our island guides includes information about what makes that particular island special and who it's ideal for (families, couples, solo travelers, etc.). We provide details about the island's atmosphere, main attractions, and unique characteristics to help you determine if it matches your travel preferences. You can also use our Island Matcher tool, which asks about your interests, budget, and travel style to recommend the perfect Cyclades islands for your trip. If you're still unsure, our "Which Island Is Right For You?" comparison guide can help you make the best choice.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ Item 7 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(6)}
                  >
                    <span className="text-lg font-medium text-gray-900">Do you offer itineraries for island hopping?</span>
                    {openFaq === 6 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 6 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Yes, we provide suggested island-hopping itineraries for different trip durations (1 week, 10 days, 2 weeks, etc.) and travel interests (beaches, culture, food, etc.). These itineraries take into account practical considerations like ferry connections between islands and logical geographical groupings. Each itinerary includes recommendations for how many days to spend on each island and what to prioritize during shorter visits. You can also use our Trip Planner tool to create a custom island-hopping itinerary based on your specific preferences and travel dates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  to="/trip-planner"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <HelpCircle className="h-5 w-5" />
                  Start Planning Your Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}