import { Link } from 'react-router-dom';
import { Navigation, Map, Compass, Anchor, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { cyclades } from '../data/islandsData';
import IslandCard from '../components/cards/IslandCard';
import cycladesHero from '../assets/images/cyclades-hero.jpg';

export default function Islands() {
  console.log('Islands page - Available islands:', cyclades);
  console.log('Islands page - First island slug:', cyclades[0] ? cyclades[0].slug : 'no islands');
  console.log('Islands page - All slugs:', cyclades.map(i => ({ name: i.name, slug: i.slug })));

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter out islands that don't have required fields
  const validIslands = cyclades.filter(
    island => island.name && island.slug && island.image
  );

  return (
    <>
      <SEO
        title="25 Best Cyclades Islands 2026 | Find YOUR Perfect Greek Island"
        description="Compare all 25 Cyclades islands by vibe: party 🎉, romantic 💕, family 👨‍👩‍👧, budget 💰. Interactive finder, ferry connections, insider tips. Plan your Greek island adventure!"
        ogImage="/assets/images/cyclades-islands.jpg"
        pageType="islands"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Islands', url: '/islands' }
        ]}
        faqs={[
          { question: 'What is the best time to visit the Cyclades islands?', answer: 'The best time to visit is late April to early October. September-October offers perfect weather with fewer crowds. July-August is peak season with higher prices.' },
          { question: 'How many Cyclades islands should I visit?', answer: 'For a week, visit 2-3 islands. For two weeks, 4-5 islands is ideal. Allow 3 nights minimum per island to properly explore.' },
          { question: 'Which Cyclades islands are best for first-time visitors?', answer: 'Santorini and Mykonos are iconic but crowded. Paros and Naxos offer excellent balance of beaches, villages, and fewer tourists.' },
          { question: 'How do I get to the Cyclades islands?', answer: 'Ferries from Athens ports (Piraeus, Rafina) take 2-8 hours. Major islands have airports with domestic flights from Athens.' }
        ]}
      />

      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative min-h-[80vh] flex items-center py-16 lg:py-20">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src={cycladesHero}
                alt="Cyclades Islands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-display">
                Discover the Magic of Cyclades
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">
                A stunning archipelago of Greek islands in the heart of the Aegean Sea
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/trip-planner"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Navigation className="h-5 w-5" />
                  Plan Your Trip
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Map className="h-5 w-5" />
                  View Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Islands Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Explore Islands</h2>
              <p className="text-gray-600 mt-2">Discover your perfect Greek island getaway</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Compass className="h-5 w-5" />
                View Map
              </Link>
              <Link
                to="/trip-planner"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Anchor className="h-5 w-5" />
                Plan Trip
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {validIslands.map((island) => (
              <IslandCard key={island.id} island={island} />
            ))}
          </div>
        </div>

        {/* SEO Text Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Enchanting Cyclades Islands</h2>

              <div className="prose prose-lg prose-blue mx-auto">
                <p>
                  The <strong>Cyclades Islands</strong> form one of Greece's most iconic and beloved island groups, situated in the heart of the Aegean Sea. Named for the circle ("kyklos" in Greek) they form around the sacred island of Delos, these islands are characterized by their stunning white-washed buildings with blue domes, crystal-clear turquoise waters, and sun-drenched landscapes.
                </p>

                <p>
                  Each of the Cyclades islands offers its own unique charm and character. <strong>Santorini</strong>, with its dramatic caldera views and spectacular sunsets, is world-renowned for its romantic atmosphere and luxury accommodations. <strong>Mykonos</strong> captivates visitors with its cosmopolitan vibe, vibrant nightlife, and beautiful beaches. <strong>Naxos</strong>, the largest of the Cyclades, boasts fertile valleys, mountain villages, and some of the finest beaches in Greece.
                </p>

                <p>
                  For those seeking a more authentic experience, islands like <strong>Paros</strong>, <strong>Milos</strong>, <strong>Sifnos</strong>, and <strong>Folegandros</strong> offer traditional villages, exceptional cuisine, and a slower pace of life. Meanwhile, lesser-known gems such as <strong>Amorgos</strong>, <strong>Tinos</strong>, <strong>Syros</strong>, and <strong>Serifos</strong> provide opportunities to experience Greek island life away from the crowds.
                </p>

                <p>
                  The Cyclades are easily accessible from Athens, with regular ferry connections and flights to the major islands. Island hopping is a popular way to experience multiple destinations, with an extensive network of ferry routes connecting the islands during the summer months. The best time to visit is from late April to early October, with peak season falling in July and August.
                </p>

                <p>
                  Whether you're drawn to the Cyclades for their stunning beaches, ancient history, traditional architecture, delicious cuisine, or vibrant culture, these islands offer an unforgettable Greek experience that keeps visitors returning year after year.
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Everything you need to know about planning your Cyclades island adventure</p>
              </div>

              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(0)}
                  >
                    <span className="text-lg font-medium text-gray-900">What is the best time to visit the Cyclades islands?</span>
                    {openFaq === 0 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 0 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        The best time to visit the Cyclades is from late April to early October when the weather is warm and sunny. June and September offer the perfect balance of pleasant temperatures and fewer crowds. July and August are the hottest months and the peak tourist season, with higher prices and more crowded attractions. Winter months (November to March) see many businesses closed, though islands like Syros and Naxos maintain year-round activity.
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
                    <span className="text-lg font-medium text-gray-900">How do I get to the Cyclades islands?</span>
                    {openFaq === 1 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 1 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        The main ways to reach the Cyclades are by ferry or airplane. Ferries depart from Athens' ports (Piraeus, Rafina, and Lavrio) with varying journey times depending on the island and ferry type. High-speed ferries are faster but more expensive, while conventional ferries are slower but more economical. Some major islands like Santorini, Mykonos, and Paros have airports with direct flights from Athens and some international destinations during the summer season.
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
                    <span className="text-lg font-medium text-gray-900">Which Cyclades islands are best for first-time visitors?</span>
                    {openFaq === 2 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 2 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        For first-time visitors, Santorini and Mykonos are popular choices due to their iconic landscapes, excellent tourist infrastructure, and numerous attractions. Paros and Naxos are also great options, offering a balance of beautiful beaches, charming villages, and cultural sites with slightly fewer crowds. These islands have good ferry connections and a range of accommodation options for all budgets, making them ideal starting points for exploring the Cyclades.
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
                    <span className="text-lg font-medium text-gray-900">Is island hopping in the Cyclades easy to do?</span>
                    {openFaq === 3 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 3 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        Yes, island hopping in the Cyclades is relatively easy, especially during the summer months when ferry services are frequent. The islands are grouped closely together, with many direct connections between popular destinations. It's advisable to book ferry tickets in advance during high season (July-August). Consider creating an itinerary that minimizes backtracking and groups nearby islands together. Allow for some flexibility in your schedule, as ferry services can occasionally be affected by strong winds.
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
                    <span className="text-lg font-medium text-gray-900">What are the must-see attractions in the Cyclades?</span>
                    {openFaq === 4 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 4 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        The Cyclades are filled with incredible attractions. Don't miss Santorini's caldera views, sunset at Oia, and ancient Akrotiri; Mykonos' windmills, Little Venice, and Delos archaeological site; Naxos' Portara (Temple of Apollo) and mountain villages; Milos' unique Sarakiniko Beach and colorful fishing village of Klima; Paros' Byzantine Hundred Doors Church and traditional Lefkes village; and Amorgos' cliffside monastery of Hozoviotissa. Each island also boasts stunning beaches, from the famous Paradise Beach in Mykonos to the more secluded Kolymbithres in Paros.
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
                    <span className="text-lg font-medium text-gray-900">How many days should I spend in the Cyclades?</span>
                    {openFaq === 5 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 5 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        For a satisfying Cyclades experience, plan to spend at least 7-10 days. This allows you to visit 2-3 islands without feeling rushed. Ideally, spend at least 3 nights on each island to properly explore its attractions, beaches, and villages. If you have two weeks or more, you can include 4-5 islands in your itinerary. Remember that travel between islands takes time, so factor in these travel days when planning. For a single island vacation, consider spending 4-7 days to fully experience all it has to offer.
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
                    <span className="text-lg font-medium text-gray-900">What is the best way to get around the Cyclades islands?</span>
                    {openFaq === 6 ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === 6 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600">
                        On most islands, local buses connect major towns and beaches, offering an affordable transportation option. Renting a car, scooter, or ATV gives you more flexibility to explore at your own pace, especially for reaching remote beaches and villages. Taxis are available but can be limited during peak season. Some islands have water taxis connecting beaches. For larger islands like Naxos, having your own vehicle is recommended. Smaller islands like Folegandros or Koufonisia can be explored on foot or by local bus.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/ferry-guide"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <HelpCircle className="h-5 w-5" />
                  View Ferry Travel Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}