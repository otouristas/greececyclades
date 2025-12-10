import React, { useState, useEffect } from 'react';
import {
    Car,
    MapPin,
    Clock,
    Users,
    Star,
    Euro,
    ChevronRight,
    Search,
    ArrowRight,
    Check,
    Briefcase,
    Baby,
    Shield
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { cyclades } from '../data/cyclades';

interface TransferOption {
    id: string;
    provider: string;
    vehicleType: string;
    vehicleModel: string;
    maxPassengers: number;
    maxLuggage: number;
    price: number;
    duration: string;
    rating: number;
    reviewCount: number;
    features: string[];
    image: string;
}

// Mock transfer options
const generateTransferOptions = (from: string, to: string): TransferOption[] => [
    {
        id: 't1',
        provider: 'Santorini Transfers',
        vehicleType: 'Private Car',
        vehicleModel: 'Mercedes E-Class',
        maxPassengers: 3,
        maxLuggage: 3,
        price: 45,
        duration: '20 min',
        rating: 4.9,
        reviewCount: 234,
        features: ['Meet & Greet', 'Free Waiting', 'AC', 'Water Included'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300',
    },
    {
        id: 't2',
        provider: 'Island Rides',
        vehicleType: 'Minivan',
        vehicleModel: 'VW Transporter',
        maxPassengers: 6,
        maxLuggage: 6,
        price: 60,
        duration: '20 min',
        rating: 4.7,
        reviewCount: 156,
        features: ['Child Seat Available', 'AC', 'Flight Tracking'],
        image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=300',
    },
    {
        id: 't3',
        provider: 'Budget Transfer',
        vehicleType: 'Shared Shuttle',
        vehicleModel: 'Mercedes Sprinter',
        maxPassengers: 8,
        maxLuggage: 8,
        price: 15,
        duration: '45 min',
        rating: 4.4,
        reviewCount: 89,
        features: ['Budget Friendly', 'AC', 'Multiple Stops'],
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300',
    },
    {
        id: 't4',
        provider: 'Luxury Transfers',
        vehicleType: 'Luxury SUV',
        vehicleModel: 'BMW X5',
        maxPassengers: 4,
        maxLuggage: 4,
        price: 85,
        duration: '18 min',
        rating: 5.0,
        reviewCount: 67,
        features: ['Premium Service', 'Champagne', 'WiFi', 'Professional Driver'],
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300',
    },
];

const TransferComparisonPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [island, setIsland] = useState('santorini');
    const [passengers, setPassengers] = useState(2);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('12:00');
    const [searchResults, setSearchResults] = useState<TransferOption[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [sortBy, setSortBy] = useState<'price' | 'rating' | 'duration'>('price');

    // Popular pickup/dropoff locations per island
    const locations: Record<string, string[]> = {
        santorini: ['Airport (JTR)', 'Athinios Port', 'Fira Town', 'Oia', 'Imerovigli', 'Kamari Beach', 'Perissa'],
        mykonos: ['Airport (JMK)', 'New Port', 'Old Port', 'Mykonos Town', 'Paradise Beach', 'Ornos'],
        paros: ['Airport (PAS)', 'Parikia Port', 'Naoussa', 'Lefkes', 'Golden Beach'],
        naxos: ['Airport (JNX)', 'Naxos Port', 'Naxos Town', 'Agios Prokopios', 'Plaka Beach'],
    };

    const handleSearch = () => {
        if (!pickup || !dropoff || !date) return;

        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            const results = generateTransferOptions(pickup, dropoff);
            setSearchResults(results);
            setIsSearching(false);
        }, 1000);
    };

    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return parseInt(a.duration) - parseInt(b.duration);
    });

    return (
        <>
            <SEO
                title="Transfer & Taxi Comparison | Discover Cyclades"
                description="Compare and book airport transfers, port pickups, and taxi services across the Cyclades islands."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-sky-900 to-blue-900' : 'bg-gradient-to-r from-sky-600 to-blue-600'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Car className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Transfer & Taxi Comparison</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Compare prices from multiple providers. Airport transfers, port pickups, and more.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Search Form */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
                        {/* Island Selector */}
                        <div className="mb-4">
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Island
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(locations).map(islandKey => (
                                    <button
                                        key={islandKey}
                                        onClick={() => {
                                            setIsland(islandKey);
                                            setPickup('');
                                            setDropoff('');
                                        }}
                                        className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${island === islandKey
                                                ? 'bg-blue-500 text-white'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {islandKey}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            {/* Pickup */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Pickup Location
                                </label>
                                <select
                                    value={pickup}
                                    onChange={e => setPickup(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                >
                                    <option value="">Select pickup point</option>
                                    {locations[island]?.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Dropoff */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Drop-off Location
                                </label>
                                <select
                                    value={dropoff}
                                    onChange={e => setDropoff(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                >
                                    <option value="">Select drop-off point</option>
                                    {locations[island]?.filter(l => l !== pickup).map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {/* Date */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Time
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                />
                            </div>

                            {/* Passengers */}
                            <div className="col-span-2">
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Passengers
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        -
                                    </button>
                                    <span className={`text-xl font-semibold w-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {passengers}
                                    </span>
                                    <button
                                        onClick={() => setPassengers(Math.min(10, passengers + 1))}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSearch}
                            disabled={!pickup || !dropoff || !date}
                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${pickup && dropoff && date
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {isSearching ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Compare Prices
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results */}
                    {searchResults.length > 0 && (
                        <>
                            {/* Sort Options */}
                            <div className="flex items-center justify-between mb-4">
                                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                    {searchResults.length} options found
                                </p>
                                <div className="flex gap-2">
                                    {(['price', 'rating', 'duration'] as const).map(option => (
                                        <button
                                            key={option}
                                            onClick={() => setSortBy(option)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${sortBy === option
                                                    ? 'bg-blue-500 text-white'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-300'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Results List */}
                            <div className="space-y-4">
                                {sortedResults.map((option, index) => (
                                    <motion.div
                                        key={option.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <img
                                                src={option.image}
                                                alt={option.vehicleModel}
                                                className="w-full md:w-48 h-40 object-cover"
                                            />
                                            <div className="flex-1 p-5">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            {option.vehicleType}
                                                        </h3>
                                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {option.vehicleModel} • {option.provider}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                        <span className="font-medium">{option.rating}</span>
                                                        <span className="text-xs">({option.reviewCount})</span>
                                                    </div>
                                                </div>

                                                <div className={`flex gap-4 text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        Max {option.maxPassengers}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4" />
                                                        {option.maxLuggage} bags
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {option.duration}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {option.features.map(feature => (
                                                        <span
                                                            key={feature}
                                                            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDarkMode
                                                                    ? 'bg-gray-700 text-gray-300'
                                                                    : 'bg-gray-100 text-gray-700'
                                                                }`}
                                                        >
                                                            <Check className="w-3 h-3" />
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            €{option.price}
                                                        </span>
                                                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            {' '}/ one way
                                                        </span>
                                                    </div>
                                                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                                                        Book Now
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* No Results */}
                    {!isSearching && searchResults.length === 0 && pickup && dropoff && date && (
                        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No transfer options found for this route</p>
                        </div>
                    )}

                    {/* Info Box */}
                    {searchResults.length === 0 && (
                        <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                            <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Why book with us?
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                                        <Euro className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Best Prices</p>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Compare multiple providers instantly
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}>
                                        <Shield className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Safe & Reliable</p>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            All drivers are licensed & insured
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                                        <Baby className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Family Friendly</p>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Child seats available on request
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TransferComparisonPage;
