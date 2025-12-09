import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { 
  HelpCircle, Search, Hotel, Ship, MapPin, Calendar, 
  MessageSquare, ChevronRight, Sun, Sparkles, Lightbulb
} from 'lucide-react';

// Help categories with their content
const helpCategories = [
  {
    id: 'islands',
    title: 'Cyclades Islands',
    icon: MapPin,
    description: 'Discover all 24 islands',
    articles: [
      {
        id: 'which-islands',
        title: 'Which Island is Right for You?',
        content: 'Popular choices: Santorini for sunsets, Mykonos for nightlife, Naxos for beaches, Paros for families, Milos for unique landscapes. Hidden gems: Folegandros, Sifnos, Amorgos.',
        tip: 'First-timers: Start with Santorini or Paros. Experienced travelers: Try Folegandros or Sifnos.'
      },
      {
        id: 'island-hopping',
        title: 'Island Hopping Guide',
        content: 'Plan 3-4 days per island minimum. Popular routes: Santorini → Ios → Naxos → Paros, or Milos → Sifnos → Folegandros → Santorini.',
        tip: 'Book ferries 1-2 weeks ahead in summer. Use Ferryhopper for schedules.'
      },
      {
        id: 'hidden-gems',
        title: 'Hidden Gem Islands',
        content: 'Folegandros: Romantic and uncrowded. Sifnos: Best food in Cyclades. Koufonisia: Caribbean-like beaches. Tinos: Authentic Greek life.',
        tip: 'Visit hidden gems mid-week for the best experience.'
      }
    ]
  },
  {
    id: 'hotels',
    title: 'Hotels & Booking',
    icon: Hotel,
    description: 'Find your perfect stay',
    articles: [
      {
        id: 'how-to-book',
        title: 'How to Book a Hotel',
        content: 'Use our search to find hotels by island, price, or amenities. Click any hotel to see details and real-time prices. Book directly through Booking.com.',
        tip: 'Book 3-6 months ahead for peak season (June-September).'
      },
      {
        id: 'hotel-types',
        title: 'Types of Accommodation',
        content: 'Cave hotels in Santorini, boutique hotels in Mykonos, family apartments in Naxos, traditional guesthouses in Sifnos. Budget to luxury options available.',
        tip: 'Cave hotels are unique to Santorini - try at least one night!'
      },
      {
        id: 'where-to-stay',
        title: 'Where to Stay',
        content: 'Santorini: Oia (sunset), Fira (nightlife), Imerovigli (views). Mykonos: Mykonos Town (nightlife), Ornos (beaches). Naxos: Naxos Town or Agios Prokopios beach.',
        tip: 'Stay near a village center if you don\'t plan to rent a car.'
      }
    ]
  },
  {
    id: 'transport',
    title: 'Getting Around',
    icon: Ship,
    description: 'Ferries, flights & transport',
    articles: [
      {
        id: 'ferries',
        title: 'Ferry Travel',
        content: 'Ferries connect all Cyclades islands. High-speed ferries: 2-4 hours from Athens. Conventional ferries: 5-8 hours but cheaper. Book at Ferryhopper or Blue Star Ferries.',
        tip: 'High-speed ferries fill up fast - book early in summer!'
      },
      {
        id: 'flights',
        title: 'Flying to the Cyclades',
        content: 'Direct flights to Santorini and Mykonos from Athens (45 min) and many European cities. Other islands: fly to Athens, then ferry.',
        tip: 'Morning flights give you more daylight for exploring.'
      },
      {
        id: 'local-transport',
        title: 'Getting Around Islands',
        content: 'Options: Rent a car/ATV, use local buses, or taxis. Buses are cheap but limited schedules. Rent a car for flexibility on larger islands.',
        tip: 'ATVs are fun but rent a car if not experienced - roads can be narrow.'
      }
    ]
  },
  {
    id: 'planning',
    title: 'Trip Planning',
    icon: Calendar,
    description: 'Plan your perfect trip',
    articles: [
      {
        id: 'best-time',
        title: 'Best Time to Visit',
        content: 'Peak: July-August (crowded, expensive). Best: May-June, September-October (great weather, fewer crowds). Shoulder: April, November (cool but quiet).',
        tip: 'Late September offers great weather and 20-40% lower prices.'
      },
      {
        id: 'how-long',
        title: 'How Many Days?',
        content: '7 days: 2 islands comfortably. 10 days: 3 islands. 14 days: 4-5 islands. Allow 3-4 days per island minimum.',
        tip: 'Don\'t rush - island hopping is about relaxing!'
      },
      {
        id: 'budget',
        title: 'Budget Guide',
        content: 'Budget: €80-100/day. Mid-range: €150-250/day. Luxury: €400+/day. Includes accommodation, food, activities. Ferries extra.',
        tip: 'Eat at local tavernas away from tourist areas to save 30%.'
      }
    ]
  },
  {
    id: 'activities',
    title: 'Things to Do',
    icon: Sun,
    description: 'Activities & experiences',
    articles: [
      {
        id: 'must-do',
        title: 'Must-Do Experiences',
        content: 'Santorini sunset, catamaran cruise, wine tasting, volcano hike. Mykonos: beach clubs, Delos day trip. Naxos: hiking, local villages.',
        tip: 'Book sunset experiences 1-2 weeks ahead in summer.'
      },
      {
        id: 'beaches',
        title: 'Beach Guide',
        content: 'Best beaches: Milos (Sarakiniko, Firiplaka), Naxos (Agios Prokopios, Plaka), Koufonisia (Pori), Ios (Mylopotas).',
        tip: 'Black sand beaches (Santorini) get very hot - bring water shoes!'
      },
      {
        id: 'food-wine',
        title: 'Food & Wine',
        content: 'Try: Fava (split pea puree), tomato keftedes, fresh fish, local wines. Sifnos is famous for food. Santorini for Assyrtiko wine.',
        tip: 'Ask locals for taverna recommendations - best food is off the beaten path.'
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: MessageSquare,
    description: 'Get help & contact us',
    articles: [
      {
        id: 'contact',
        title: 'Contact Us',
        content: 'Email: hello@greececyclades.com. Use our AI chat for instant answers. We typically respond to emails within 24 hours.',
        tip: 'Try our Touristas AI for instant answers to common questions!'
      },
      {
        id: 'ai-assistant',
        title: 'Touristas AI',
        content: 'Our AI assistant can help with trip planning, hotel recommendations, ferry schedules, and local tips. Available 24/7, completely free.',
        tip: 'Ask Touristas AI to create a custom itinerary for you!'
      }
    ]
  }
];

// Quick links for sidebar
const quickLinks = [
  { title: 'Explore Islands', url: '/islands', icon: MapPin },
  { title: 'All Hotels', url: '/hotels', icon: Hotel },
  { title: 'Ferry Tickets', url: '/ferry-tickets', icon: Ship },
  { title: 'Trip Planner', url: '/trip-planner', icon: Calendar },
  { title: 'Touristas AI', url: '/touristas-ai', icon: Sparkles },
];

export default function HelpDeskNew() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [activeCategory, setActiveCategory] = useState('islands');
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = helpCategories.find(c => c.id === activeCategory);
  const currentArticle = currentCategory?.articles.find(a => a.id === activeArticle);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter articles based on search
  const filteredCategories = searchQuery
    ? helpCategories.map(cat => ({
        ...cat,
        articles: cat.articles.filter(
          a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               a.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.articles.length > 0)
    : helpCategories;

  return (
    <>
      <SEO
        title="Help Center | Cyclades Travel Support"
        description="Get answers about Cyclades islands, hotels, ferries, and activities. Trip planning help, booking tips, and budget guides."
      />

      {/* Hero */}
      <section className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 text-cyclades-turquoise text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How can we help you?
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            Everything you need to know about planning your Cyclades adventure
          </p>
        </div>
      </section>

      <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/30 ${
                  isDark 
                    ? 'bg-dark-card border-dark-border text-white placeholder:text-white/40' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
                }`}
              />
            </div>
          </div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Categories */}
            <aside className="lg:col-span-3">
              <div className={`rounded-xl border p-4 sticky top-24 ${
                isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-semibold text-sm uppercase tracking-wide mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Categories
                </h3>
                <nav className="space-y-1">
                  {filteredCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setActiveArticle(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          activeCategory === category.id
                            ? 'bg-cyclades-turquoise text-dark-bg'
                            : isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{category.title}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Links */}
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold text-sm uppercase tracking-wide mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    Quick Links
                  </h3>
                  <nav className="space-y-1">
                    {quickLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.url}
                          to={link.url}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {link.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content - Articles */}
            <main className="lg:col-span-6">
              {currentArticle ? (
                // Single Article View
                <div className={`rounded-xl border p-6 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`}>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className={`flex items-center gap-2 text-sm mb-4 ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    ← Back to {currentCategory?.title}
                  </button>
                  <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {currentArticle.title}
                  </h2>
                  <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                    {currentArticle.content}
                  </p>
                  {currentArticle.tip && (
                    <div className={`flex items-start gap-3 p-4 rounded-lg ${isDark ? 'bg-cyclades-turquoise/10' : 'bg-cyclades-turquoise/5'}`}>
                      <Lightbulb className="w-5 h-5 text-cyclades-turquoise flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-cyclades-turquoise mb-1">Pro Tip</p>
                        <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{currentArticle.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Article List View
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {currentCategory?.title}
                    </h2>
                    <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                      {currentCategory?.articles.length} articles
                    </span>
                  </div>
                  
                  {currentCategory?.articles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setActiveArticle(article.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isDark 
                          ? 'bg-dark-card border-dark-border hover:border-cyclades-turquoise' 
                          : 'bg-white border-gray-200 hover:border-cyclades-turquoise'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {article.title}
                        </h3>
                        <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                      </div>
                      <p className={`mt-2 text-sm line-clamp-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {article.content}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </main>

            {/* Right Sidebar - Contact */}
            <aside className="lg:col-span-3">
              <div className={`rounded-xl border p-6 sticky top-24 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Need More Help?
                </h3>
                <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Can't find what you're looking for? Our AI assistant or team can help.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/touristas-ai/chat"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-cyclades-turquoise text-dark-bg rounded-lg font-medium hover:bg-cyclades-turquoise/90 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    Chat with Touristas AI
                  </Link>
                  <Link
                    to="/contact"
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium border transition-colors ${
                      isDark 
                        ? 'border-dark-border text-white hover:bg-white/10' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
