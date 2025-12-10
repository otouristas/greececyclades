import React, { useState, useCallback, useEffect } from 'react';
import {
    Map,
    Plus,
    Minus,
    Calendar,
    Share2,
    Download,
    Sparkles,
    Ship,
    ChevronRight,
    Clock,
    Euro,
    AlertCircle,
    X,
    ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { cyclades, Island } from '../data/cyclades';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

// Island Hopping Step
interface ItineraryStep {
    id: string;
    island: Island;
    days: number;
    arrivalDate?: Date;
    departureDate?: Date;
    ferryInfo?: {
        operator: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        price: number;
    };
}

// Ferry Connection between islands
interface FerryConnection {
    fromIsland: string;
    toIsland: string;
    options: {
        operator: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        price: number;
        vesselName?: string;
    }[];
}

const IslandHoppingPlannerPage: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [itinerary, setItinerary] = useState<ItineraryStep[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [selectedIslandToAdd, setSelectedIslandToAdd] = useState<string>('');
    const [isLoadingFerries, setIsLoadingFerries] = useState(false);
    const [ferryConnections, setFerryConnections] = useState<FerryConnection[]>([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [totalDays, setTotalDays] = useState(0);

    // Available islands (not already in itinerary)
    const availableIslands = cyclades.filter(
        island => !itinerary.some(step => step.island.id === island.id)
    );

    // Add island to itinerary
    const addIsland = useCallback((islandId: string) => {
        const island = cyclades.find(i => i.id === islandId);
        if (!island) return;

        const newStep: ItineraryStep = {
            id: `step-${Date.now()}`,
            island,
            days: 2, // Default 2 days per island
        };

        setItinerary(prev => [...prev, newStep]);
        setSelectedIslandToAdd('');
    }, []);

    // Remove island from itinerary
    const removeIsland = useCallback((stepId: string) => {
        setItinerary(prev => prev.filter(step => step.id !== stepId));
    }, []);

    // Update days for an island
    const updateDays = useCallback((stepId: string, days: number) => {
        if (days < 1) return;
        setItinerary(prev =>
            prev.map(step =>
                step.id === stepId ? { ...step, days } : step
            )
        );
    }, []);

    // Calculate dates based on start date and days
    useEffect(() => {
        if (!startDate || itinerary.length === 0) return;

        let currentDate = new Date(startDate);
        const updatedItinerary = itinerary.map((step, index) => {
            const arrivalDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + step.days);
            const departureDate = new Date(currentDate);

            return { ...step, arrivalDate, departureDate };
        });

        // Only update if dates changed
        const datesChanged = updatedItinerary.some((step, i) =>
            step.arrivalDate?.getTime() !== itinerary[i].arrivalDate?.getTime()
        );

        if (datesChanged) {
            setItinerary(updatedItinerary);
        }
    }, [startDate, itinerary.map(s => s.days).join(',')]);

    // Calculate totals
    useEffect(() => {
        const days = itinerary.reduce((sum, step) => sum + step.days, 0);
        setTotalDays(days);

        const ferryCost = ferryConnections.reduce((sum, conn) => {
            const cheapest = conn.options[0]?.price || 0;
            return sum + cheapest;
        }, 0);
        setTotalCost(ferryCost);
    }, [itinerary, ferryConnections]);

    // Fetch ferry connections when itinerary changes
    useEffect(() => {
        const fetchConnections = async () => {
            if (itinerary.length < 2) {
                setFerryConnections([]);
                return;
            }

            setIsLoadingFerries(true);

            // Mock ferry data for demo - replace with real API
            const connections: FerryConnection[] = [];
            for (let i = 0; i < itinerary.length - 1; i++) {
                const from = itinerary[i].island.name;
                const to = itinerary[i + 1].island.name;

                connections.push({
                    fromIsland: from,
                    toIsland: to,
                    options: [
                        {
                            operator: 'Blue Star Ferries',
                            departureTime: '08:00',
                            arrivalTime: '10:30',
                            duration: '2h 30m',
                            price: 35,
                            vesselName: 'Blue Star Delos'
                        },
                        {
                            operator: 'SeaJets',
                            departureTime: '14:00',
                            arrivalTime: '15:15',
                            duration: '1h 15m',
                            price: 55,
                            vesselName: 'WorldChampion Jet'
                        }
                    ]
                });
            }

            setFerryConnections(connections);
            setIsLoadingFerries(false);
        };

        fetchConnections();
    }, [itinerary.map(s => s.island.id).join('-')]);

    // Export to calendar
    const exportToCalendar = () => {
        let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Discover Cyclades//Island Hopping//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH\n`;

        itinerary.forEach((step, index) => {
            if (!step.arrivalDate || !step.departureDate) return;

            const startStr = step.arrivalDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const endStr = step.departureDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

            icsContent += `BEGIN:VEVENT
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:${step.island.name} - Island Hopping
DESCRIPTION:${step.days} days exploring ${step.island.name}. ${step.island.shortDescription}
LOCATION:${step.island.name}, Cyclades, Greece
END:VEVENT\n`;
        });

        icsContent += 'END:VCALENDAR';

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cyclades-island-hopping.ics';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Generate AI optimized route
    const optimizeRoute = async () => {
        // TODO: Call AI endpoint for optimization
        alert('AI route optimization coming soon! This will reorder islands based on ferry schedules, weather, and travel time.');
    };

    return (
        <>
            <SEO
                title="Island Hopping Planner | Discover Cyclades"
                description="Plan your perfect Greek island hopping adventure with our interactive planner. Drag, drop, and discover the best routes through the Cyclades."
                url="https://discovercyclades.gr/planner"
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} text-white py-12 px-4`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Map className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Island Hopping Planner</h1>
                        </div>
                        <p className="text-lg opacity-90 max-w-2xl">
                            Drag and drop islands to create your perfect Cyclades itinerary.
                            We'll show you ferry connections, prices, and optimize your route.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Panel - Island Selector */}
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg h-fit`}>
                            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Add Islands
                            </h2>

                            {/* Start Date */}
                            <div className="mb-6">
                                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Trip Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                            </div>

                            {/* Island Selector */}
                            <div className="mb-4">
                                <select
                                    value={selectedIslandToAdd}
                                    onChange={(e) => setSelectedIslandToAdd(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                >
                                    <option value="">Select an island to add...</option>
                                    {availableIslands.map(island => (
                                        <option key={island.id} value={island.id}>
                                            {island.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => selectedIslandToAdd && addIsland(selectedIslandToAdd)}
                                disabled={!selectedIslandToAdd}
                                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${selectedIslandToAdd
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Plus className="w-5 h-5" />
                                Add to Itinerary
                            </button>

                            {/* AI Optimizer */}
                            <button
                                onClick={optimizeRoute}
                                disabled={itinerary.length < 2}
                                className={`w-full mt-4 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${itinerary.length >= 2
                                        ? isDarkMode
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Sparkles className="w-5 h-5" />
                                AI Optimize Route
                            </button>

                            {/* Trip Summary */}
                            {itinerary.length > 0 && (
                                <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Trip Summary
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Islands</span>
                                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {itinerary.length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Days</span>
                                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {totalDays}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Ferry Cost</span>
                                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                €{totalCost}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Center Panel - Itinerary Timeline */}
                        <div className="lg:col-span-2">
                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Your Itinerary
                                    </h2>
                                    {itinerary.length > 0 && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setShowShareModal(true)}
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${isDarkMode
                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </button>
                                            <button
                                                onClick={exportToCalendar}
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${isDarkMode
                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                <Download className="w-4 h-4" />
                                                Export
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {itinerary.length === 0 ? (
                                    <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg mb-2">Start planning your adventure!</p>
                                        <p className="text-sm">Add islands from the left panel to begin</p>
                                    </div>
                                ) : (
                                    <Reorder.Group
                                        axis="y"
                                        values={itinerary}
                                        onReorder={setItinerary}
                                        className="space-y-4"
                                    >
                                        <AnimatePresence>
                                            {itinerary.map((step, index) => (
                                                <React.Fragment key={step.id}>
                                                    <Reorder.Item
                                                        value={step}
                                                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 cursor-grab active:cursor-grabbing`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            {/* Day Number */}
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDarkMode
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-blue-500 text-white'
                                                                }`}>
                                                                {index + 1}
                                                            </div>

                                                            {/* Island Info */}
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                            {step.island.name}
                                                                        </h3>
                                                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                            {step.island.shortDescription}
                                                                        </p>
                                                                        {step.arrivalDate && (
                                                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                                                {step.arrivalDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                                                {' - '}
                                                                                {step.departureDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => removeIsland(step.id)}
                                                                        className={`p-2 rounded-lg hover:bg-red-100 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                                                                    >
                                                                        <X className="w-5 h-5" />
                                                                    </button>
                                                                </div>

                                                                {/* Days Control */}
                                                                <div className="flex items-center gap-3 mt-3">
                                                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Days:</span>
                                                                    <button
                                                                        onClick={() => updateDays(step.id, step.days - 1)}
                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode
                                                                                ? 'bg-gray-600 text-white hover:bg-gray-500'
                                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                                            }`}
                                                                    >
                                                                        <Minus className="w-4 h-4" />
                                                                    </button>
                                                                    <span className={`font-semibold w-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                        {step.days}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => updateDays(step.id, step.days + 1)}
                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode
                                                                                ? 'bg-gray-600 text-white hover:bg-gray-500'
                                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                                            }`}
                                                                    >
                                                                        <Plus className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Island Image */}
                                                            <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden">
                                                                <img
                                                                    src={step.island.image}
                                                                    alt={step.island.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Reorder.Item>

                                                    {/* Ferry Connection */}
                                                    {index < itinerary.length - 1 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className={`ml-6 pl-6 border-l-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} py-2`}
                                                        >
                                                            {isLoadingFerries ? (
                                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                                                                    Loading ferry options...
                                                                </div>
                                                            ) : ferryConnections[index] ? (
                                                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Ship className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                            Ferry to {itinerary[index + 1].island.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                                        <div className="flex items-center gap-1">
                                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                                                                {ferryConnections[index].options[0]?.duration}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <Euro className="w-4 h-4 text-gray-400" />
                                                                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                                                                from €{ferryConnections[index].options[0]?.price}
                                                                            </span>
                                                                        </div>
                                                                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                                            {ferryConnections[index].options.length} options available
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 text-sm text-yellow-600">
                                                                    <AlertCircle className="w-4 h-4" />
                                                                    No direct ferry found
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </AnimatePresence>
                                    </Reorder.Group>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share Modal */}
                <AnimatePresence>
                    {showShareModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                            onClick={() => setShowShareModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full`}
                                onClick={e => e.stopPropagation()}
                            >
                                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Share Your Itinerary
                                </h3>
                                <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Share your island hopping plan with friends and family!
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={`${window.location.origin}/planner?shared=...`}
                                        className={`flex-1 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
                                    />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${window.location.origin}/planner?shared=...`);
                                            alert('Link copied!');
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className={`w-full mt-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default IslandHoppingPlannerPage;
