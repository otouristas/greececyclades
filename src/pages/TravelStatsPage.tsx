import React, { useState } from 'react';
import {
    BarChart3,
    MapPin,
    Plane,
    Ship,
    Euro,
    Leaf,
    Share2,
    Award,
    Trophy,
    Calendar,
    TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface TravelStat {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const TravelStatsPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Mock user stats
    const stats: TravelStat[] = [
        { label: 'Islands Visited', value: 7, icon: <MapPin className="w-6 h-6" />, color: 'bg-blue-500' },
        { label: 'Total Trips', value: 3, icon: <Calendar className="w-6 h-6" />, color: 'bg-green-500' },
        { label: 'Days Traveled', value: 28, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-purple-500' },
        { label: 'Total Spent', value: '€2,450', icon: <Euro className="w-6 h-6" />, color: 'bg-amber-500' },
        { label: 'Ferry Distance', value: '340 km', icon: <Ship className="w-6 h-6" />, color: 'bg-cyan-500' },
        { label: 'Flight Distance', value: '1,200 km', icon: <Plane className="w-6 h-6" />, color: 'bg-indigo-500' },
        { label: 'Carbon Footprint', value: '180 kg', icon: <Leaf className="w-6 h-6" />, color: 'bg-emerald-500' },
    ];

    const visitedIslands = ['Santorini', 'Mykonos', 'Paros', 'Naxos', 'Milos', 'Sifnos', 'Folegandros'];

    const badges = [
        { id: 'explorer', name: 'Explorer', description: 'Visited 5+ islands', icon: '🏝️', earned: true },
        { id: 'adventurer', name: 'Adventurer', description: 'Completed 3+ trips', icon: '🎒', earned: true },
        { id: 'voyager', name: 'Voyager', description: 'Traveled 500+ km by ferry', icon: '⛴️', earned: false },
        { id: 'sunset_chaser', name: 'Sunset Chaser', description: 'Visited Santorini', icon: '🌅', earned: true },
        { id: 'foodie', name: 'Cyclades Foodie', description: 'Visited culinary island Sifnos', icon: '🍽️', earned: true },
        { id: 'legend', name: 'Cyclades Legend', description: 'Visit all 24 islands', icon: '👑', earned: false },
    ];

    const spendingBreakdown = [
        { category: 'Hotels', amount: 1200, percentage: 49, color: 'bg-purple-500' },
        { category: 'Ferries', amount: 350, percentage: 14, color: 'bg-cyan-500' },
        { category: 'Flights', amount: 400, percentage: 16, color: 'bg-indigo-500' },
        { category: 'Activities', amount: 300, percentage: 12, color: 'bg-green-500' },
        { category: 'Food', amount: 200, percentage: 8, color: 'bg-amber-500' },
    ];

    const generateShareCard = () => {
        alert('Share card feature coming soon! This will generate a beautiful summary image for social media.');
    };

    return (
        <>
            <SEO
                title="My Travel Stats | Discover Cyclades"
                description="View your Cyclades travel statistics, badges, and achievements."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-teal-900 to-cyan-900' : 'bg-gradient-to-r from-teal-600 to-cyan-600'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">My Travel Stats</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Your Cyclades journey at a glance
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {stats.slice(0, 4).map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg`}
                            >
                                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3`}>
                                    {stat.icon}
                                </div>
                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {stat.value}
                                </p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Islands Map */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
                        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Islands Visited ({visitedIslands.length}/24)
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {visitedIslands.map(island => (
                                <span
                                    key={island}
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode
                                            ? 'bg-teal-900/50 text-teal-300'
                                            : 'bg-teal-100 text-teal-700'
                                        }`}
                                >
                                    ✓ {island}
                                </span>
                            ))}
                        </div>
                        <div className={`mt-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-4 overflow-hidden`}>
                            <div
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                                style={{ width: `${(visitedIslands.length / 24) * 100}%` }}
                            />
                        </div>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {24 - visitedIslands.length} more islands to explore!
                        </p>
                    </div>

                    {/* Badges */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className={`w-6 h-6 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Badges & Achievements
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {badges.map(badge => (
                                <div
                                    key={badge.id}
                                    className={`p-4 rounded-xl text-center ${badge.earned
                                            ? isDarkMode
                                                ? 'bg-amber-900/30 border border-amber-500/50'
                                                : 'bg-amber-50 border border-amber-200'
                                            : isDarkMode
                                                ? 'bg-gray-700/50 opacity-50'
                                                : 'bg-gray-100 opacity-50'
                                        }`}
                                >
                                    <span className="text-3xl block mb-2">{badge.icon}</span>
                                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {badge.name}
                                    </p>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {badge.description}
                                    </p>
                                    {!badge.earned && (
                                        <span className="text-xs text-gray-500 mt-1 block">🔒 Locked</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Spending Breakdown */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
                        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Spending Breakdown
                        </h2>
                        <div className="space-y-4">
                            {spendingBreakdown.map(item => (
                                <div key={item.category}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            {item.category}
                                        </span>
                                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            €{item.amount}
                                        </span>
                                    </div>
                                    <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <div
                                            className={`h-full ${item.color} transition-all`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Share Button */}
                    <button
                        onClick={generateShareCard}
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${isDarkMode
                                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700'
                                : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600'
                            }`}
                    >
                        <Share2 className="w-5 h-5" />
                        Share My Travel Summary
                    </button>
                </div>
            </div>
        </>
    );
};

export default TravelStatsPage;
