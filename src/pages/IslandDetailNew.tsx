import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, MapPin, Ship, Plane, Users, ChevronRight, Building2 } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { cyclades } from '../data/islandsData';
import type { Island } from '../types/island';
import { useTheme } from '../contexts/ThemeContext';
import { useTouristas } from '../contexts/TouristasContext';
import BusinessDirectory from '../components/BusinessDirectory';

export default function IslandDetailNew() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();
    const { openChat } = useTouristas();
    const isDark = resolvedTheme === 'dark';

    const [selectedIsland, setSelectedIsland] = useState<Partial<Island> | null>(null);

    // Load island data on mount/slug change
    useEffect(() => {
        console.log('IslandDetailNew mounting, slug:', slug);
        if (slug) {
            const island = cyclades.find(i => i.slug === slug);
            console.log('Found island:', island?.name);

            if (island) {
                setSelectedIsland(island);
            } else {
                console.log('Island not found, navigating to /islands');
                navigate('/islands');
            }
        }
    }, [slug, navigate]);

    // Loading state
    if (!selectedIsland) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-bg text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-cyclades-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading {slug}...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${selectedIsland.name} | Cyclades Island Guide ${SITE_TAGLINE}`}
                description={selectedIsland.description || `Discover ${selectedIsland.name} in the Cyclades islands of Greece.`}
                ogImage={selectedIsland.image}
            />

            <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'} transition-colors duration-300`}>
                {/* Hero Section */}
                <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
                    <img
                        src={selectedIsland.image}
                        alt={selectedIsland.name}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${isDark
                        ? 'bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent'
                        : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
                        }`} />

                    {/* Back Button */}
                    <Link
                        to="/islands"
                        className="absolute top-24 left-6 lg:left-10 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>All Islands</span>
                    </Link>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                                {selectedIsland.name}
                            </h1>
                            <p className="text-xl text-white/80 max-w-2xl mb-8">
                                {selectedIsland.shortDescription || selectedIsland.description || 'Discover the beauty of this Cyclades island'}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => openChat(`Tell me about ${selectedIsland.name}`)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyclades-turquoise text-dark-bg rounded-full font-semibold hover:shadow-lg hover:shadow-cyclades-turquoise/30 transition-all hover:scale-105"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Ask Touristas AI
                                </button>
                                <Link
                                    to={`/guides/${slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                                >
                                    Full Travel Guide
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Facts Bar */}
                <section className={`sticky top-16 z-30 py-4 border-b ${isDark
                    ? 'bg-dark-bg/95 backdrop-blur-md border-dark-border'
                    : 'bg-white/95 backdrop-blur-md border-gray-200'
                    }`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-cyclades-turquoise" />
                                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                    Cyclades, Greece
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-cyclades-turquoise" />
                                    <span className={isDark ? 'text-white/70' : 'text-gray-600'}>
                                        {selectedIsland.idealFor?.[0] || 'Everyone'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Ship className="w-5 h-5 text-cyclades-turquoise" />
                                    <span className={isDark ? 'text-white/70' : 'text-gray-600'}>
                                        Ferry Available
                                    </span>
                                </div>
                                {['santorini', 'mykonos', 'naxos', 'paros', 'milos'].includes(slug?.toLowerCase() || '') && (
                                    <div className="flex items-center gap-2">
                                        <Plane className="w-5 h-5 text-cyclades-turquoise" />
                                        <span className={isDark ? 'text-white/70' : 'text-gray-600'}>
                                            Airport
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    About {selectedIsland.name}
                                </h2>
                                <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                                    {selectedIsland.description}
                                </p>

                                {/* Activities */}
                                {selectedIsland.activities && selectedIsland.activities.length > 0 && (
                                    <div className="mb-12">
                                        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Things to Do
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedIsland.activities.map((activity, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${isDark
                                                        ? 'bg-dark-card text-white border border-dark-border'
                                                        : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {activity.replace(/-/g, ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Best Time to Visit */}
                                {selectedIsland.bestTime && (
                                    <div className="mb-12">
                                        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Best Time to Visit
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedIsland.bestTime.months?.map((month, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-cyclades-turquoise/10 text-cyclades-turquoise rounded-full text-sm font-medium"
                                                >
                                                    {month}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                {/* AI Card */}
                                <div className={`rounded-2xl p-6 mb-6 ${isDark
                                    ? 'bg-gradient-to-br from-cyclades-turquoise/20 to-cyclades-sea-blue/20 border border-cyclades-turquoise/30'
                                    : 'bg-gradient-to-br from-cyclades-turquoise/10 to-cyclades-sea-blue/10 border border-cyclades-turquoise/20'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-cyclades-turquoise/20 rounded-lg">
                                            <Sparkles className="w-6 h-6 text-cyclades-turquoise" />
                                        </div>
                                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Plan with AI
                                        </h3>
                                    </div>
                                    <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                        Get personalized recommendations for {selectedIsland.name}
                                    </p>
                                    <button
                                        onClick={() => openChat(`Help me plan a trip to ${selectedIsland.name}`)}
                                        className="w-full py-3 bg-cyclades-turquoise text-dark-bg rounded-xl font-semibold hover:shadow-lg transition-all"
                                    >
                                        Start Planning
                                    </button>
                                </div>

                                {/* Quick Links */}
                                <div className={`rounded-2xl p-6 ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200 shadow-lg'}`}>
                                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Explore More
                                    </h3>
                                    <div className="space-y-3">
                                        <Link
                                            to={`/guides/${slug}`}
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark
                                                ? 'hover:bg-white/5 text-white'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <span>Full Travel Guide</span>
                                            <ChevronRight className="w-5 h-5 text-cyclades-turquoise" />
                                        </Link>
                                        <Link
                                            to="/hotels"
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark
                                                ? 'hover:bg-white/5 text-white'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <span>Where to Stay</span>
                                            <ChevronRight className="w-5 h-5 text-cyclades-turquoise" />
                                        </Link>
                                        <Link
                                            to="/ferry-tickets"
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark
                                                ? 'hover:bg-white/5 text-white'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <span>Ferry Tickets</span>
                                            <ChevronRight className="w-5 h-5 text-cyclades-turquoise" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Directory Section */}
                {selectedIsland.name && (
                    <BusinessDirectory
                        island={selectedIsland.name}
                        limit={6}
                        showCategories={true}
                        title={`Where to Eat & Drink in ${selectedIsland.name}`}
                        subtitle={`Discover restaurants, bars, cafés and local spots on ${selectedIsland.name}`}
                    />
                )}

                {/* Hotels Section */}
                {selectedIsland.name && (
                    <section className={`py-16 ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        <Building2 className="inline-block w-8 h-8 mr-2 text-cyclades-turquoise" />
                                        Where to Stay in {selectedIsland.name}
                                    </h2>
                                    <p className={`mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        Find the perfect accommodation for your stay
                                    </p>
                                </div>
                                <Link
                                    to="/hotels"
                                    className="text-cyclades-turquoise hover:underline flex items-center gap-1 font-medium"
                                >
                                    View All Hotels <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="text-center py-12">
                                <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                                    Search for the best hotels and accommodations on {selectedIsland.name}
                                </p>
                                <Link
                                    to="/hotels"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    <Building2 className="w-5 h-5" />
                                    Browse Hotels
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
