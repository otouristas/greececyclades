import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Sparkles, Search, Clock, Calendar, MapPin,
    ArrowRight, TrendingUp, Eye
} from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { cyclades } from '../data/islandsData';
import { useTheme } from '../contexts/ThemeContext';
import { useTouristas } from '../contexts/TouristasContext';

// Guide categories
const guideCategories = [
    { id: 'all', label: 'All Guides' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'comprehensive', label: 'Comprehensive' },
    { id: 'quick', label: 'Quick Reads' },
    { id: 'itinerary', label: 'Itineraries' },
];

// Guide metadata - reading time, popularity, etc.
const guideMeta: Record<string, {
    readTime: number;
    views?: number;
    type: 'comprehensive' | 'quick' | 'itinerary';
    updated?: string;
    popular?: boolean;
}> = {
    'santorini': { readTime: 25, views: 45000, type: 'comprehensive', updated: '2024-12', popular: true },
    'mykonos': { readTime: 22, views: 38000, type: 'comprehensive', updated: '2024-12', popular: true },
    'naxos': { readTime: 20, views: 28000, type: 'comprehensive', updated: '2024-11', popular: true },
    'paros': { readTime: 18, views: 25000, type: 'comprehensive', updated: '2024-11', popular: true },
    'milos': { readTime: 16, views: 22000, type: 'comprehensive', updated: '2024-11', popular: true },
    'ios': { readTime: 14, views: 18000, type: 'comprehensive', updated: '2024-10' },
    'sifnos': { readTime: 15, views: 12000, type: 'comprehensive', updated: '2024-10', popular: true },
    'folegandros': { readTime: 12, views: 9000, type: 'comprehensive', updated: '2024-10' },
    'amorgos': { readTime: 14, views: 8000, type: 'comprehensive', updated: '2024-09' },
    'tinos': { readTime: 12, views: 7000, type: 'comprehensive', updated: '2024-09' },
    'serifos': { readTime: 10, views: 5000, type: 'quick', updated: '2024-09' },
    'syros': { readTime: 12, views: 6000, type: 'comprehensive', updated: '2024-08' },
    'andros': { readTime: 14, views: 5500, type: 'comprehensive', updated: '2024-08' },
    'kea': { readTime: 8, views: 3000, type: 'quick', updated: '2024-08' },
    'kythnos': { readTime: 8, views: 2500, type: 'quick', updated: '2024-07' },
    'sikinos': { readTime: 8, views: 2000, type: 'quick', updated: '2024-07' },
    'koufonisia': { readTime: 10, views: 6000, type: 'quick', updated: '2024-10' },
    'schinoussa': { readTime: 6, views: 1500, type: 'quick', updated: '2024-07' },
    'iraklia': { readTime: 6, views: 1200, type: 'quick', updated: '2024-07' },
    'donousa': { readTime: 6, views: 1000, type: 'quick', updated: '2024-07' },
    'anafi': { readTime: 8, views: 1500, type: 'quick', updated: '2024-06' },
    'thirasia': { readTime: 6, views: 900, type: 'quick', updated: '2024-06' },
    'antiparos': { readTime: 10, views: 4000, type: 'quick', updated: '2024-08' },
    'kimolos': { readTime: 8, views: 2500, type: 'quick', updated: '2024-07' },
};

// Featured guides (top 3)
const featuredSlugs = ['santorini', 'mykonos', 'milos'];

export default function GuidesNew() {
    const { resolvedTheme } = useTheme();
    const { openChat } = useTouristas();
    const isDark = resolvedTheme === 'dark';

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter guides based on category and search
    const filteredGuides = useMemo(() => {
        return cyclades.filter(island => {
            if (!island.slug) return false;
            const meta = guideMeta[island.slug] || { readTime: 10, type: 'quick' as const };

            let matchesCategory = true;
            if (activeCategory === 'popular') matchesCategory = meta.popular === true;
            else if (activeCategory === 'comprehensive') matchesCategory = meta.type === 'comprehensive';
            else if (activeCategory === 'quick') matchesCategory = meta.type === 'quick';
            else if (activeCategory === 'itinerary') matchesCategory = meta.type === 'itinerary';

            const matchesSearch = !searchQuery ||
                (island.name && island.name.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    // Get featured guides
    const featuredGuides = cyclades.filter(i => i.slug && featuredSlugs.includes(i.slug));

    return (
        <>
            <SEO
                title="Cyclades Island Guides 2025: Expert Tips & Local Secrets"
                description="In-depth guides for all 25 Cyclades islands. Santorini, Mykonos, Naxos, Paros & hidden gems. Insider tips, best beaches, hotels, and activities. Updated weekly."
                ogImage="/photos/guides-hero.jpg"
                pageType="guides"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Island Guides', url: '/guides' }
                ]}
                faqs={[
                    { question: 'How many islands are in the Cyclades?', answer: 'There are 24 inhabited Cyclades islands, plus several uninhabited ones. Our guides cover all inhabited islands, from famous Santorini to tiny Schinoussa.' },
                    { question: 'Which Cyclades island should I visit first?', answer: 'For first-timers: Naxos offers the best all-around experience. Paros is perfect for island-hopping beginners. Santorini is iconic but crowded.' },
                    { question: 'How long should I spend on each island?', answer: '2-3 days minimum for small islands, 4-5 days for Santorini/Naxos/Paros. Our guides include suggested itineraries for each island.' }
                ]}
            />

            <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <section className={`py-16 lg:py-24 ${isDark ? '' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 text-cyclades-turquoise text-sm font-medium mb-6">
                                <BookOpen className="w-4 h-4" />
                                Expert-Written Guides
                            </span>

                            <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Cyclades Island <span className="text-cyclades-turquoise">Guides</span>
                            </h1>

                            <p className={`text-lg mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                Comprehensive travel guides with insider tips, detailed itineraries,
                                and everything you need to plan the perfect Greek island vacation.
                            </p>

                            {/* Search */}
                            <div className="relative max-w-md mx-auto">
                                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                <input
                                    type="text"
                                    placeholder="Search guides..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all ${isDark
                                        ? 'bg-dark-card border-dark-border text-white placeholder:text-white/40 focus:border-cyclades-turquoise'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-cyclades-turquoise'
                                        } outline-none text-lg`}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Guides */}
                <section className={`py-12 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <TrendingUp className="w-6 h-6 inline mr-2 text-cyclades-turquoise" />
                                Featured Guides
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {featuredGuides.map((island, index) => {
                                const meta = guideMeta[island.slug!] || { readTime: 15, type: 'comprehensive' as const };
                                return (
                                    <motion.div
                                        key={island.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={`/guides/${island.slug}`}
                                            className={`group block rounded-2xl overflow-hidden h-full ${isDark ? 'bg-dark-bg' : 'bg-white'
                                                } shadow-lg hover:shadow-xl transition-all`}
                                        >
                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                <img
                                                    src={island.image}
                                                    alt={island.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {island.name} Guide
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-white/80 text-sm">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {meta.readTime} min read
                                                        </span>
                                                        {meta.views && (
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="w-4 h-4" />
                                                                {(meta.views / 1000).toFixed(0)}k views
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className={`text-sm line-clamp-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                    {island.description}
                                                </p>
                                                <span className="inline-flex items-center gap-1 mt-4 text-cyclades-turquoise font-medium text-sm group-hover:underline">
                                                    Read Guide <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className={`py-8 sticky top-16 lg:top-20 z-40 ${isDark ? 'bg-dark-bg/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl shadow-sm'
                    }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {guideCategories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isActive
                                            ? 'bg-cyclades-turquoise text-dark-bg shadow-lg shadow-cyclades-turquoise/30'
                                            : isDark
                                                ? 'bg-dark-card text-white/70 hover:text-white hover:bg-dark-border'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* All Guides Grid */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex items-center justify-between mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <h2 className="text-xl font-bold">
                                {activeCategory === 'all' ? 'All Island Guides' : guideCategories.find(c => c.id === activeCategory)?.label}
                                <span className="ml-2 text-cyclades-turquoise">({filteredGuides.length})</span>
                            </h2>
                            <Link
                                to="/islands"
                                className="text-cyclades-turquoise hover:underline font-medium flex items-center gap-1"
                            >
                                View Islands
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredGuides.map((island, index) => {
                                    const meta = guideMeta[island.slug!] || { readTime: 10, type: 'quick' as const };
                                    return (
                                        <motion.div
                                            key={island.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.03 }}
                                        >
                                            <Link
                                                to={`/guides/${island.slug}`}
                                                className={`group block rounded-xl overflow-hidden transition-all hover:shadow-lg ${isDark ? 'bg-dark-card hover:shadow-cyclades-turquoise/10' : 'bg-white'
                                                    }`}
                                            >
                                                <div className="relative aspect-[3/2] overflow-hidden">
                                                    <img
                                                        src={island.image}
                                                        alt={island.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {meta.popular && (
                                                        <span className="absolute top-2 left-2 px-2 py-1 bg-cyclades-turquoise text-dark-bg text-xs font-bold rounded-full">
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h3 className={`font-bold mb-2 group-hover:text-cyclades-turquoise transition-colors ${isDark ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                        {island.name} Travel Guide
                                                    </h3>
                                                    <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {meta.readTime} min
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {meta.updated}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {filteredGuides.length === 0 && (
                            <div className="text-center py-16">
                                <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                    No guides found matching your criteria.
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="mt-2 text-cyclades-turquoise hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Guides vs Islands Explanation */}
                <section className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-cyclades-turquoise/5'}`}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
                                <div className="w-12 h-12 rounded-xl bg-cyclades-turquoise/20 flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-cyclades-turquoise" />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Island Pages
                                </h3>
                                <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                    Quick overview with key facts, photos, and at-a-glance information.
                                    Perfect for browsing and comparing destinations.
                                </p>
                                <Link to="/islands" className="text-cyclades-turquoise font-medium hover:underline flex items-center gap-1">
                                    Browse Islands <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
                                <div className="w-12 h-12 rounded-xl bg-cyclades-turquoise/20 flex items-center justify-center mb-4">
                                    <BookOpen className="w-6 h-6 text-cyclades-turquoise" />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Travel Guides
                                </h3>
                                <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                    In-depth guides with detailed itineraries, insider tips, restaurant picks,
                                    and everything you need to plan your trip.
                                </p>
                                <span className="text-cyclades-turquoise font-medium">You are here ✓</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI CTA */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyclades-turquoise/10'
                            }`}>
                            <Sparkles className="w-8 h-8 text-cyclades-turquoise" />
                        </div>
                        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Need a Custom Itinerary?
                        </h2>
                        <p className={`text-lg mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                            Tell Touristas AI about your travel dates, interests, and budget.
                            Get a personalized day-by-day itinerary in seconds.
                        </p>
                        <button
                            onClick={() => openChat('Create a custom Cyclades island itinerary for me')}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise text-dark-bg rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyclades-turquoise/30 transition-all hover:scale-105"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Custom Itinerary
                        </button>
                    </div>
                </section>

                {/* Related Links */}
                <section className={`py-12 ${isDark ? 'bg-dark-card' : 'bg-gray-100'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'All Islands', path: '/islands' },
                                { label: 'Ferry Guide', path: '/ferry-guide' },
                                { label: 'Trip Planner', path: '/trip-planner' },
                                { label: 'Weather', path: '/weather' },
                                { label: 'Budget Calculator', path: '/budget-calculator' },
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-6 py-3 rounded-full font-medium transition-all ${isDark
                                        ? 'bg-dark-border text-white hover:bg-cyclades-turquoise hover:text-dark-bg'
                                        : 'bg-white text-gray-700 hover:bg-cyclades-turquoise hover:text-dark-bg shadow-sm'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
