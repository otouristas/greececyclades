import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Sparkles, Grid, List, Search,
    Heart, Users, Wine, Waves, Mountain, Camera,
    ChevronDown, ChevronUp, ArrowRight, Star
} from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import { cyclades } from '../data/islandsData';
import { useTheme } from '../contexts/ThemeContext';
import { useTouristas } from '../contexts/TouristasContext';

// Island categories for filtering
const categories = [
    { id: 'all', label: 'All Islands', icon: Grid, count: 24 },
    { id: 'popular', label: 'Popular', icon: Star, count: 6 },
    { id: 'romance', label: 'Romance', icon: Heart, count: 5 },
    { id: 'family', label: 'Family', icon: Users, count: 6 },
    { id: 'foodie', label: 'Food & Wine', icon: Wine, count: 4 },
    { id: 'beaches', label: 'Beaches', icon: Waves, count: 7 },
    { id: 'adventure', label: 'Adventure', icon: Mountain, count: 5 },
    { id: 'hidden', label: 'Hidden Gems', icon: Camera, count: 8 },
];

// Island metadata with categories
const islandMeta: Record<string, { categories: string[]; highlight?: string; rating?: number }> = {
    'santorini': { categories: ['popular', 'romance'], highlight: 'Iconic Sunsets', rating: 4.9 },
    'mykonos': { categories: ['popular', 'beaches'], highlight: 'Vibrant Nightlife', rating: 4.8 },
    'naxos': { categories: ['popular', 'family', 'beaches'], highlight: 'Best Beaches', rating: 4.7 },
    'paros': { categories: ['popular', 'family', 'beaches'], highlight: 'Watersports Hub', rating: 4.7 },
    'milos': { categories: ['popular', 'beaches', 'adventure'], highlight: '70+ Beaches', rating: 4.8 },
    'ios': { categories: ['popular', 'beaches'], highlight: 'Party Island', rating: 4.5 },
    'sifnos': { categories: ['foodie', 'hidden'], highlight: 'Culinary Paradise', rating: 4.6 },
    'folegandros': { categories: ['romance', 'hidden'], highlight: 'Unspoiled Beauty', rating: 4.7 },
    'amorgos': { categories: ['adventure', 'hidden'], highlight: 'Dramatic Cliffs', rating: 4.6 },
    'tinos': { categories: ['family', 'foodie', 'hidden'], highlight: 'Marble Villages', rating: 4.5 },
    'serifos': { categories: ['beaches', 'hidden'], highlight: 'Wild Landscapes', rating: 4.5 },
    'syros': { categories: ['family', 'foodie'], highlight: 'Year-Round Life', rating: 4.5 },
    'andros': { categories: ['adventure', 'family'], highlight: 'Hiking Paradise', rating: 4.4 },
    'kea': { categories: ['hidden', 'adventure'], highlight: 'Athens Escape', rating: 4.4 },
    'kythnos': { categories: ['hidden', 'beaches'], highlight: 'Hot Springs', rating: 4.3 },
    'sikinos': { categories: ['hidden', 'romance'], highlight: 'Most Authentic', rating: 4.4 },
    'koufonisia': { categories: ['beaches', 'hidden'], highlight: 'Caribbean Vibes', rating: 4.7 },
    'schinoussa': { categories: ['hidden'], highlight: 'Off the Grid', rating: 4.3 },
    'iraklia': { categories: ['hidden', 'adventure'], highlight: 'First Cave', rating: 4.2 },
    'donousa': { categories: ['hidden', 'beaches'], highlight: 'Remote Paradise', rating: 4.3 },
    'anafi': { categories: ['hidden', 'adventure'], highlight: 'Santorini Neighbor', rating: 4.2 },
    'thirasia': { categories: ['hidden', 'romance'], highlight: 'Caldera Views', rating: 4.3 },
    'antiparos': { categories: ['family', 'beaches'], highlight: 'Cave Wonders', rating: 4.5 },
    'kimolos': { categories: ['hidden', 'beaches'], highlight: 'White Beaches', rating: 4.4 },
};

// FAQ data
const faqData = [
    {
        q: "What is the best time to visit the Cyclades?",
        a: "Late April to early October offers the best weather. June and September provide pleasant temperatures with fewer crowds. July-August is peak season with higher prices."
    },
    {
        q: "How do I get to the Cyclades islands?",
        a: "Ferries depart from Athens (Piraeus, Rafina, Lavrio). Major islands like Santorini and Mykonos have airports with direct flights from Athens and international cities."
    },
    {
        q: "Which islands are best for first-time visitors?",
        a: "Santorini and Mykonos are most popular. Paros and Naxos offer great beaches with fewer crowds. All have excellent tourist infrastructure."
    },
    {
        q: "Is island hopping easy in the Cyclades?",
        a: "Yes! Frequent ferries connect most islands, especially in summer. Book tickets in advance during July-August. Allow flexibility for weather delays."
    },
    {
        q: "How many days should I spend?",
        a: "7-10 days to visit 2-3 islands comfortably. Spend at least 3 nights per island to truly experience it. Two weeks allows for 4-5 islands."
    }
];

export default function IslandsNew() {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const { openChat } = useTouristas();
    const isDark = resolvedTheme === 'dark';

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Filter islands based on category and search
    const filteredIslands = useMemo(() => {
        return cyclades.filter(island => {
            const slug = island.slug || '';
            const meta = islandMeta[slug] || { categories: [] };
            const matchesCategory = activeCategory === 'all' || meta.categories.includes(activeCategory);
            const matchesSearch = !searchQuery ||
                (island.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                island.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <>
            <SEO
                title="25 Best Cyclades Islands Ranked: Hidden Gems to Famous Hotspots [2025]"
                description="Discover which Cyclades island is perfect for YOU. Compare party islands, romantic escapes, family beaches & budget gems. Interactive island finder + ferry routes."
                ogImage="/photos/cyclades-overview.jpg"
                pageType="islands"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Islands', url: '/islands' }
                ]}
                faqs={[
                    { question: 'How many Cyclades islands are there?', answer: 'There are 24 inhabited Cyclades islands, each with its own unique character. From famous Santorini and Mykonos to hidden gems like Folegandros and Koufonisia.' },
                    { question: 'Which Cyclades island is best for first-time visitors?', answer: 'Naxos or Paros are ideal for first-timers. They offer a balanced experience with great beaches, authentic villages, good infrastructure, and reasonable prices.' },
                    { question: 'What is the cheapest Cyclades island to visit?', answer: 'Amorgos, Syros, Andros, and Kythnos offer the best value. Expect 30-50% lower prices compared to Santorini and Mykonos.' },
                    { question: 'Which island has the best nightlife?', answer: 'Mykonos is famous for world-class nightlife and beach clubs. Ios is popular with younger travelers for its party scene. Paros (Naoussa) offers a more relaxed but vibrant nightlife.' },
                    { question: 'Can I island hop between Cyclades islands?', answer: 'Yes! Island hopping is easy with regular ferry connections. Most islands are 1-4 hours apart. Book ferries in advance during peak season (July-August).' }
                ]}
            />

            <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0">
                        <img
                            src="/photos/cyclades-hero.jpg"
                            alt="Cyclades Islands"
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${isDark
                            ? 'bg-gradient-to-b from-dark-bg/60 via-dark-bg/40 to-dark-bg'
                            : 'bg-gradient-to-b from-black/50 via-black/30 to-white'
                            }`} />
                    </div>

                    {/* Hero Content */}
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/20 text-cyclades-turquoise text-sm font-medium mb-6">
                                <MapPin className="w-4 h-4" />
                                24 Islands to Explore
                            </span>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {t('islands.hero.title', 'Discover the')} <span className="text-cyclades-turquoise">{t('islands.hero.titleHighlight', 'Cyclades')}</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                                {t('islands.hero.subtitle', 'A stunning archipelago of Greek islands in the heart of the Aegean Sea. Find your perfect island adventure.')}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => openChat('Help me choose a Cyclades island')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyclades-turquoise text-dark-bg rounded-full font-semibold hover:shadow-lg hover:shadow-cyclades-turquoise/30 transition-all hover:scale-105"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Ask AI for Recommendations
                                </button>
                                <Link
                                    to="/trip-planner"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                                >
                                    Plan Your Trip
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Filter Bar */}
                <section className={`sticky top-16 lg:top-20 z-40 ${isDark ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border' : 'bg-white/95 backdrop-blur-xl shadow-sm'
                    }`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            {/* Search */}
                            <div className={`relative flex-1 max-w-md ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search islands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-colors ${isDark
                                        ? 'bg-dark-card border-dark-border focus:border-cyclades-turquoise'
                                        : 'bg-gray-50 border-gray-200 focus:border-cyclades-turquoise'
                                        } outline-none`}
                                />
                            </div>

                            {/* Category Pills */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isActive
                                                ? 'bg-cyclades-turquoise text-dark-bg shadow-lg shadow-cyclades-turquoise/30'
                                                : isDark
                                                    ? 'bg-dark-card text-white/70 hover:text-white hover:bg-dark-border'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* View Toggle */}
                            <div className="hidden lg:flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-cyclades-turquoise text-dark-bg'
                                        : isDark ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                                        }`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-cyclades-turquoise text-dark-bg'
                                        : isDark ? 'text-white/50 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Islands Grid */}
                <section className="py-12 lg:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Results count */}
                        <div className={`flex items-center justify-between mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <p className="text-lg">
                                <span className="font-bold">{filteredIslands.length}</span> islands found
                            </p>
                            <Link
                                to="/guides"
                                className="text-cyclades-turquoise hover:underline font-medium flex items-center gap-1"
                            >
                                View All Guides
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Grid */}
                        <motion.div
                            layout
                            className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                                }`}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredIslands.map((island, index) => {
                                    const slug = island.slug || '';
                                    const meta = islandMeta[slug] || { categories: [] };
                                    return (
                                        <motion.div
                                            key={island.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={`/islands/${island.slug}`}
                                                className={`group block rounded-2xl overflow-hidden transition-all hover:shadow-xl ${isDark
                                                    ? 'bg-dark-card hover:shadow-cyclades-turquoise/10'
                                                    : 'bg-white hover:shadow-gray-200'
                                                    } ${viewMode === 'list' ? 'flex' : ''}`}
                                            >
                                                {/* Image */}
                                                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'
                                                    }`}>
                                                    <img
                                                        src={island.image}
                                                        alt={island.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {meta.highlight && (
                                                        <span className="absolute top-3 left-3 px-3 py-1 bg-cyclades-turquoise text-dark-bg text-xs font-bold rounded-full">
                                                            {meta.highlight}
                                                        </span>
                                                    )}
                                                    {meta.rating && (
                                                        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                            {meta.rating}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                                    <h3 className={`text-lg font-bold mb-1 group-hover:text-cyclades-turquoise transition-colors ${isDark ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                        {island.name}
                                                    </h3>
                                                    <p className={`text-sm line-clamp-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                        {island.shortDescription || island.description?.slice(0, 100)}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {meta.categories.slice(0, 2).map((cat: string) => (
                                                            <span
                                                                key={cat}
                                                                className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                                                                    }`}
                                                            >
                                                                {categories.find(c => c.id === cat)?.label}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Quick Links */}
                                                    <div className="flex items-center gap-4 mt-4 text-sm">
                                                        <span className="text-cyclades-turquoise font-medium flex items-center gap-1 group-hover:underline">
                                                            Explore <ArrowRight className="w-4 h-4" />
                                                        </span>
                                                        <Link
                                                            to={`/guides/${island.slug}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className={`hover:underline ${isDark ? 'text-white/50' : 'text-gray-500'}`}
                                                        >
                                                            Full Guide
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {/* No results */}
                        {filteredIslands.length === 0 && (
                            <div className="text-center py-16">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-dark-card' : 'bg-gray-100'
                                    }`}>
                                    <Search className={`w-8 h-8 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    No islands found
                                </h3>
                                <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="mt-4 text-cyclades-turquoise hover:underline font-medium"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* AI CTA Section */}
                <section className={`py-16 ${isDark ? 'bg-dark-card' : 'bg-cyclades-turquoise/5'}`}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyclades-turquoise/10'
                            }`}>
                            <Sparkles className="w-8 h-8 text-cyclades-turquoise" />
                        </div>
                        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t('islands.cta.title', 'Not Sure Which Island to Choose?')}
                        </h2>
                        <p className={`text-lg mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                            {t('islands.cta.subtitle', 'Let Touristas AI help you find the perfect Cyclades island based on your preferences, travel style, and what you\'re looking for in a Greek island vacation.')}
                        </p>
                        <button
                            onClick={() => openChat('Help me choose the best Cyclades island for my trip')}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise text-dark-bg rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyclades-turquoise/30 transition-all hover:scale-105"
                        >
                            <Sparkles className="w-5 h-5" />
                            Get Personalized Recommendations
                        </button>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className={`py-16 ${isDark ? '' : 'bg-white'}`}>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {faqData.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl overflow-hidden transition-all ${isDark
                                        ? 'bg-dark-card border border-dark-border'
                                        : 'bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className={`w-full px-6 py-4 text-left flex justify-between items-center ${isDark ? 'text-white' : 'text-gray-900'
                                            }`}
                                    >
                                        <span className="font-semibold pr-4">{faq.q}</span>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-cyclades-turquoise flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className={`px-6 pb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Links */}
                <section className={`py-12 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { label: 'Island Guides', path: '/guides' },
                                { label: 'Ferry Tickets', path: '/ferry-tickets' },
                                { label: 'Trip Planner', path: '/trip-planner' },
                                { label: 'Hotels', path: '/hotels' },
                                { label: 'Activities', path: '/activities' },
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

                {/* FAQ Section */}
                <FAQSection
                    faqs={[
                        { question: 'How many Cyclades islands are there?', answer: 'There are 24 inhabited Cyclades islands, each with its own unique character. From famous Santorini and Mykonos to hidden gems like Folegandros and Koufonisia.' },
                        { question: 'Which Cyclades island is best for first-time visitors?', answer: 'Naxos or Paros are ideal for first-timers. They offer a balanced experience with great beaches, authentic villages, good infrastructure, and reasonable prices.' },
                        { question: 'What is the cheapest Cyclades island to visit?', answer: 'Amorgos, Syros, Andros, and Kythnos offer the best value. Expect 30-50% lower prices compared to Santorini and Mykonos.' },
                        { question: 'Which island has the best nightlife?', answer: 'Mykonos is famous for world-class nightlife and beach clubs. Ios is popular with younger travelers for its party scene. Paros (Naoussa) offers a more relaxed but vibrant nightlife.' },
                        { question: 'Can I island hop between Cyclades islands?', answer: 'Yes! Island hopping is easy with regular ferry connections. Most islands are 1-4 hours apart. Book ferries in advance during peak season (July-August).' }
                    ]}
                    title="Cyclades Islands FAQ"
                    subtitle="Everything you need to know about the Greek islands"
                />

                {/* Related Links */}
                <RelatedLinks variant="cards" pageType="island" title="Plan Your Cyclades Trip" />
            </div>
        </>
    );
}
