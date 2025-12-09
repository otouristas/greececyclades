import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
    HelpCircle,
    Search,
    Hotel,
    Plane,
    MapPin,
    CreditCard,
    Calendar,
    MessageSquare,
    Lightbulb,
    ChevronRight,
    ChevronDown,
    ExternalLink,
    BookOpen,
    Ship,
    Sun,
    Sparkles
} from 'lucide-react';

// Help categories with their content for Cyclades Islands
const helpCategories = [
    {
        id: 'booking',
        title: 'Booking Accommodations',
        icon: Hotel,
        description: 'How to find and book the perfect stay in the Cyclades',
        articles: [
            {
                id: 'how-to-book',
                title: 'How to Book a Hotel',
                content: 'Use our search feature to find hotels by island, price, or amenities. Click on any hotel to see details, photos, and real-time prices. You can book directly through our partner Booking.com.',
                tip: 'Book 3-6 months ahead for peak season (June-September) to get the best selection and prices.'
            },
            {
                id: 'compare-hotels',
                title: 'Comparing Hotels Across Islands',
                content: 'Each Cycladic island offers different accommodation styles. Santorini is known for cave hotels, Mykonos for boutique resorts, and smaller islands for traditional guesthouses.',
                tip: 'Consider staying on multiple islands - ferry connections are excellent in summer!'
            },
            {
                id: 'cancellation',
                title: 'Cancellation Policies',
                content: 'Cancellation policies vary by hotel and booking platform. Always check the specific terms before booking. Many hotels offer free cancellation up to 24-48 hours before arrival.',
                tip: 'For flexibility, look for "Free Cancellation" badges when booking.'
            }
        ]
    },
    {
        id: 'planning',
        title: 'Trip Planning',
        icon: Calendar,
        description: 'Plan your perfect Cyclades vacation',
        articles: [
            {
                id: 'how-many-days',
                title: 'How Many Days Per Island',
                content: 'Santorini: 3-4 days. Mykonos: 2-3 days. Naxos: 3-4 days. Paros: 2-3 days. Milos: 2-3 days. For island hopping, plan 10-14 days to visit 3-4 islands comfortably.',
                tip: 'Dont try to visit too many islands - 3-4 in two weeks is ideal.'
            },
            {
                id: 'best-time',
                title: 'Best Time to Visit',
                content: 'May-June and September-October offer the best balance of good weather, manageable crowds, and reasonable prices. July-August is peak season with highest prices and most tourists.',
                tip: 'Shoulder season (May, September-October) saves 20-40% on hotels.'
            },
            {
                id: 'ai-planner',
                title: 'Using Touristas AI',
                content: 'Our AI assistant can help you plan your trip, answer questions about islands, suggest itineraries, and provide real-time recommendations based on your preferences.',
                tip: 'Ask Touristas AI anything - it knows all 24 Cycladic islands!',
                link: '/touristas-ai'
            }
        ]
    },
    {
        id: 'islands',
        title: 'Choosing Islands',
        icon: MapPin,
        description: 'Find the perfect island for your trip style',
        articles: [
            {
                id: 'popular-vs-hidden',
                title: 'Popular vs Hidden Gems',
                content: 'Santorini and Mykonos are iconic but crowded. For quieter experiences, try Folegandros, Sifnos, or Serifos. Families love Naxos and Paros for their beach access and family-friendly atmosphere.',
                tip: 'Visit popular islands in shoulder season, hidden gems anytime!',
                link: '/islands'
            },
            {
                id: 'island-hopping',
                title: 'Island Hopping Guide',
                content: 'The Cyclades are perfect for island hopping. Major hubs include Santorini, Mykonos, Naxos, and Paros. Plan your route to minimize backtracking. Fast ferries connect most islands in summer.',
                tip: 'Book ferries 1-2 weeks ahead in peak season. Same-day booking is risky in July-August.',
                link: '/ferry-guide'
            },
            {
                id: 'by-interest',
                title: 'Islands by Interest',
                content: 'Romance: Santorini, Folegandros. Beaches: Milos, Naxos. Nightlife: Mykonos, Ios. Food: Sifnos, Tinos. Culture: Delos, Andros. Hiking: Amorgos, Andros.',
                tip: 'Our AI can suggest the perfect islands based on your travel style!'
            }
        ]
    },
    {
        id: 'transport',
        title: 'Getting Around',
        icon: Ship,
        description: 'Ferries, flights, and local transport',
        articles: [
            {
                id: 'ferries',
                title: 'Ferry Travel Guide',
                content: 'Ferries are the main way to travel between islands. High-speed ferries take 2-5 hours between islands, while regular ferries are slower but cheaper. Book through our ferry search or Ferryhopper.',
                tip: 'Always confirm departure times the day before - weather can cause changes.',
                link: '/ferry-tickets'
            },
            {
                id: 'flights',
                title: 'Flying to the Cyclades',
                content: 'Santorini and Mykonos have international airports with direct flights from many European cities. Naxos, Paros, Milos, and Syros have domestic flights from Athens.',
                tip: 'Compare ferry + Athens hotel combo vs direct flight - sometimes its cheaper!',
                link: '/flights'
            },
            {
                id: 'local-transport',
                title: 'Getting Around Islands',
                content: 'Most islands have bus services and taxis. Renting a car or ATV gives more flexibility. Santorini roads can be busy; Mykonos has good bus service; smaller islands may need a vehicle.',
                tip: 'Book car rentals in advance for peak season - they sell out!',
                link: '/rent-a-car'
            }
        ]
    },
    {
        id: 'activities',
        title: 'Things to Do',
        icon: Sun,
        description: 'Activities, tours, and experiences',
        articles: [
            {
                id: 'must-do',
                title: 'Must-Do Experiences',
                content: 'Watch sunset in Oia (Santorini), take a catamaran cruise, visit ancient Delos, explore volcanic hot springs (Milos), hike the Fira-Oia trail, and swim in Sarakiniko beach.',
                tip: 'Book popular tours 3-5 days ahead in summer!',
                link: '/activities'
            },
            {
                id: 'beaches',
                title: 'Beach Guide',
                content: 'Santorini: Black and red volcanic sand. Mykonos: Beach clubs and clear water. Naxos: Long sandy beaches. Milos: 80+ beaches, each unique. Koufonisia: Caribbean-like turquoise water.',
                tip: 'Water shoes are essential for volcanic beaches - they get HOT!'
            },
            {
                id: 'food-wine',
                title: 'Food & Wine',
                content: 'Sifnos is the culinary capital. Santorini is famous for Assyrtiko wine and cave restaurants. Each island has local specialties - try fava, tomato keftedes, and fresh seafood everywhere.',
                tip: 'Eat where locals eat - look for tavernas away from the main tourist spots.'
            }
        ]
    },
    {
        id: 'budget',
        title: 'Budget & Costs',
        icon: CreditCard,
        description: 'Prices, budgeting, and saving money',
        articles: [
            {
                id: 'daily-costs',
                title: 'Daily Budget Guide',
                content: 'Budget: €100-150/day. Mid-range: €200-350/day. Luxury: €500+/day. Santorini and Mykonos are 30-50% more expensive than other islands.',
                tip: 'Mix expensive and budget islands in your trip to balance costs!'
            },
            {
                id: 'saving-money',
                title: 'Money-Saving Tips',
                content: 'Stay in beach areas instead of caldera views. Travel in shoulder season. Use ferries instead of flights. Book direct with hotels. Eat at local tavernas.',
                tip: 'The cheapest caldera sunset views? Walk to Imerovigli - free and less crowded than Oia!'
            },
            {
                id: 'payment',
                title: 'Payment & Currency',
                content: 'Greece uses the Euro (€). Credit cards are widely accepted but carry some cash for smaller shops and remote areas. ATMs are available on all major islands.',
                tip: 'Use a card with no foreign transaction fees to save 3-5% on purchases.'
            }
        ]
    }
];

// Quick links sidebar
const quickLinks = [
    { title: 'All Islands', url: '/islands', icon: MapPin },
    { title: 'Island Guides', url: '/guides', icon: BookOpen },
    { title: 'Ferry Tickets', url: '/ferry-tickets', icon: Ship },
    { title: 'Hotels', url: '/hotels', icon: Hotel },
    { title: 'Touristas AI', url: '/touristas-ai', icon: Sparkles },
    { title: 'Contact Us', url: '/contact', icon: MessageSquare },
];

export default function HelpCenterNew() {
    const [activeCategory, setActiveCategory] = useState('booking');
    const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const currentCategory = helpCategories.find(c => c.id === activeCategory);

    const toggleArticle = (articleId: string) => {
        setExpandedArticles(prev =>
            prev.includes(articleId)
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

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
                title="Help Center | Cyclades Islands Trip Planning Support"
                description="Get answers about Cyclades islands, hotels, ferries, and activities. Trip planning help, booking tips, island hopping guides, and budget advice."
            />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-28 pb-16">
                <div className="absolute inset-0 bg-[url('/images/islands/santorini.jpg')] bg-cover bg-center opacity-20" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-medium">Help Center</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        How Can We Help?
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                        Everything you need to know about planning your Cyclades Islands trip
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* 3-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Sidebar - Categories */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-white/10 p-4 sticky top-24">
                                <h3 className="font-semibold text-sm text-gray-500 dark:text-white/50 uppercase tracking-wide mb-4">
                                    Categories
                                </h3>
                                <nav className="space-y-1">
                                    {filteredCategories.map((category) => {
                                        const Icon = category.icon;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeCategory === category.id
                                                        ? 'bg-cyclades-turquoise text-white'
                                                        : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-white/80'
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5 flex-shrink-0" />
                                                <span className="text-sm font-medium">{category.title}</span>
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Quick Links */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                                    <h3 className="font-semibold text-sm text-gray-500 dark:text-white/50 uppercase tracking-wide mb-4">
                                        Quick Links
                                    </h3>
                                    <nav className="space-y-1">
                                        {quickLinks.map((link) => {
                                            const Icon = link.icon;
                                            return (
                                                <Link
                                                    key={link.url}
                                                    to={link.url}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-cyan-600 dark:hover:text-cyclades-turquoise transition-colors"
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-sm">{link.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="lg:col-span-6">
                            <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-white/10 p-6">
                                {currentCategory && (
                                    <>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center">
                                                <currentCategory.icon className="h-6 w-6 text-cyclades-turquoise" />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {currentCategory.title}
                                                </h1>
                                                <p className="text-gray-600 dark:text-white/60">{currentCategory.description}</p>
                                            </div>
                                        </div>

                                        {/* Accordion Style Articles */}
                                        <div className="space-y-3">
                                            {currentCategory.articles.map((article) => (
                                                <div
                                                    key={article.id}
                                                    className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => toggleArticle(article.id)}
                                                        className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                                                    >
                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            {article.title}
                                                        </span>
                                                        <ChevronDown
                                                            className={`h-5 w-5 text-gray-400 transition-transform ${expandedArticles.includes(article.id) ? 'rotate-180' : ''
                                                                }`}
                                                        />
                                                    </button>
                                                    {expandedArticles.includes(article.id) && (
                                                        <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/5">
                                                            <p className="text-gray-700 dark:text-white/70 mt-4 mb-4">{article.content}</p>
                                                            {article.tip && (
                                                                <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20">
                                                                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                                    <p className="text-sm text-amber-800 dark:text-amber-200">{article.tip}</p>
                                                                </div>
                                                            )}
                                                            {article.link && (
                                                                <Link
                                                                    to={article.link}
                                                                    className="inline-flex items-center gap-1 mt-4 text-cyan-600 dark:text-cyclades-turquoise hover:underline text-sm font-medium"
                                                                >
                                                                    Learn more
                                                                    <ChevronRight className="h-4 w-4" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Popular Questions */}
                            <div className="mt-8 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-white/10 p-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Popular Questions
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { q: 'How many days per island?', a: '2-4 days recommended', link: '/guides' },
                                        { q: 'Best island for beaches?', a: 'Milos, Naxos, Koufonisia', link: '/islands/milos' },
                                        { q: 'Need to book ferries ahead?', a: 'Yes, 1-2 weeks in summer', link: '/ferry-tickets' },
                                        { q: 'When is the best time to visit?', a: 'May-June or September', link: '/weather' },
                                    ].map((item) => (
                                        <Link
                                            key={item.q}
                                            to={item.link}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <HelpCircle className="h-5 w-5 text-cyclades-turquoise mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{item.q}</p>
                                                <p className="text-sm text-gray-500 dark:text-white/50">{item.a}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </main>

                        {/* Right Sidebar - Need Help */}
                        <aside className="lg:col-span-3">
                            <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-white/10 p-4 sticky top-24">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Need More Help?</h3>
                                <div className="space-y-3">
                                    <Link
                                        to="/touristas-ai"
                                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-600 to-cyclades-turquoise text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        <Sparkles className="h-6 w-6" />
                                        <div>
                                            <p className="font-semibold">Ask Touristas AI</p>
                                            <p className="text-sm text-white/80">Get instant answers 24/7</p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                    >
                                        <MessageSquare className="h-6 w-6 text-cyclades-turquoise" />
                                        <div>
                                            <p className="font-semibold">Contact Us</p>
                                            <p className="text-sm text-gray-500 dark:text-white/50">We respond within 24h</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Related Guides */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Related Guides</h4>
                                    <div className="space-y-2">
                                        <Link to="/guides/santorini" className="block text-sm text-cyan-600 dark:text-cyclades-turquoise hover:underline">
                                            → Santorini Travel Guide
                                        </Link>
                                        <Link to="/ferry-guide" className="block text-sm text-cyan-600 dark:text-cyclades-turquoise hover:underline">
                                            → Ferry Travel Guide
                                        </Link>
                                        <Link to="/best-cyclades-islands-to-visit" className="block text-sm text-cyan-600 dark:text-cyclades-turquoise hover:underline">
                                            → Best Cyclades Islands
                                        </Link>
                                    </div>
                                </div>

                                {/* Pro Tips */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Lightbulb className="h-5 w-5 text-amber-500" />
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Pro Tips</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {currentCategory?.articles.slice(0, 2).map((article) => (
                                            article.tip && (
                                                <div key={article.id} className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-3 border border-amber-200 dark:border-amber-500/20">
                                                    <p className="text-xs font-medium text-amber-900 dark:text-amber-200 mb-1">{article.title}</p>
                                                    <p className="text-xs text-amber-800 dark:text-amber-300">{article.tip}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}

