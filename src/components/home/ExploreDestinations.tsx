import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DestinationSearch from '../search/DestinationSearch';
import { CYCLADES_DESTINATIONS, LiteApiPlace, CycladesDestination } from '../../services/placesService';

// Lazy load the map component for better performance
const DestinationMap = lazy(() => import('../search/DestinationMap'));

interface ExploreDestinationsProps {
    /** Show the search input */
    showSearch?: boolean;
    /** Show the interactive map */
    showMap?: boolean;
    /** Show destination cards */
    showCards?: boolean;
    /** Maximum cards to show */
    maxCards?: number;
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
    /** Additional className */
    className?: string;
}

/**
 * ExploreDestinations - A beautiful section combining destination search,
 * interactive map, and destination cards for the homepage or Hotels page.
 */
export default function ExploreDestinations({
    showSearch = true,
    showMap = true,
    showCards = true,
    maxCards = 6,
    title = 'Explore the Cyclades',
    subtitle = 'Discover stunning Greek islands with crystal-clear waters, whitewashed villages, and unforgettable sunsets',
    className = '',
}: ExploreDestinationsProps) {
    const navigate = useNavigate();
    const [selectedDestination, setSelectedDestination] = useState<string | undefined>();
    const [activeTab, setActiveTab] = useState<'map' | 'cards'>('cards');

    // Popular destinations for cards
    const popularDestinations = CYCLADES_DESTINATIONS.slice(0, maxCards);

    // Handle destination selection from search
    const handleSearchSelect = (place: LiteApiPlace) => {
        navigate(`/hotels?destination=${encodeURIComponent(place.displayName)}`);
    };

    // Handle map selection
    const handleMapSelect = (destination: CycladesDestination) => {
        setSelectedDestination(destination.id);
    };

    return (
        <section className={`py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-card ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyclades-turquoise/20 rounded-full text-cyan-700 dark:text-cyclades-turquoise text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Discover Your Next Adventure
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Search Bar */}
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <DestinationSearch
                            onSelect={handleSearchSelect}
                            placeholder="Where would you like to stay?"
                            showPopularOnFocus={true}
                        />
                    </motion.div>
                )}

                {/* Tab Switcher (for map/cards toggle) */}
                {showMap && showCards && (
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-gray-100 dark:bg-white/10 rounded-xl p-1">
                            <button
                                onClick={() => setActiveTab('cards')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'cards'
                                    ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <Compass className="w-4 h-4" />
                                    Destinations
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('map')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'map'
                                    ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Interactive Map
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Map View */}
                {showMap && activeTab === 'map' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-12"
                    >
                        <Suspense fallback={
                            <div className="h-[500px] bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse flex items-center justify-center">
                                <div className="text-gray-400 dark:text-white/40">Loading map...</div>
                            </div>
                        }>
                            <DestinationMap
                                onSelect={handleMapSelect}
                                selectedId={selectedDestination}
                                height="500px"
                            />
                        </Suspense>
                    </motion.div>
                )}

                {/* Destination Cards */}
                {showCards && activeTab === 'cards' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={`/guides/${destination.id}`}
                                        className="group block bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={`/images/islands/${destination.id}-island.jpg`}
                                                alt={destination.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `/images/islands/${destination.id}.jpg`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <p className="text-gray-600 dark:text-white/60 text-sm mb-4">
                                                {destination.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-white/40">
                                                    Cyclades, Greece
                                                </span>
                                                <span className="flex items-center gap-1 text-cyan-600 dark:text-cyclades-turquoise text-sm font-medium group-hover:gap-2 transition-all">
                                                    Explore <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-10"
                        >
                            <Link
                                to="/islands"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyclades-turquoise dark:to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                            >
                                <Compass className="w-5 h-5" />
                                Explore All Islands
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
