import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Ship, Plane, Hotel, Calendar, Users, ChevronDown,
    Plus, X, MapPin, ArrowRight, Clock, Euro, CheckCircle, Anchor,
    Sun, Cloud, Waves, ArrowLeft, Download, Share2, Loader2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import {
    getCycladesPorts,
    getPopularPorts,
    generateFerrySearchLink,
    POPULAR_CYCLADES_ROUTES
} from '../data/ferryhopperPorts';
import { buildItinerary, formatItineraryForChat, CompleteItinerary } from '../services/touristasBookingOrchestrator';

// Island data with images
const POPULAR_ISLANDS = [
    { name: 'Santorini', code: 'JTR', nights: 3, description: 'Iconic sunsets & caldera views' },
    { name: 'Mykonos', code: 'JMK', nights: 2, description: 'Vibrant nightlife & beaches' },
    { name: 'Paros', code: 'PAS', nights: 2, description: 'Authentic village charm' },
    { name: 'Naxos', code: 'JNX', nights: 2, description: 'Largest Cycladic island' },
    { name: 'Milos', code: 'MLO', nights: 2, description: '70+ unique beaches' },
    { name: 'Ios', code: 'IOS', nights: 2, description: 'Beach party paradise' },
    { name: 'Folegandros', code: 'FOL', nights: 2, description: 'Unspoiled tranquility' },
    { name: 'Sifnos', code: 'SIF', nights: 2, description: 'Gastronomy & traditions' },
];

// Pre-built itinerary templates
const ITINERARY_TEMPLATES = [
    {
        name: 'Classic Triangle',
        islands: ['Mykonos', 'Santorini', 'Paros'],
        nights: [2, 3, 2],
        duration: '7 days',
        description: 'The most popular Cyclades route for first-time visitors',
    },
    {
        name: 'Romantic Escape',
        islands: ['Santorini', 'Folegandros'],
        nights: [3, 3],
        duration: '6 days',
        description: 'Intimate sunsets and secluded beaches for couples',
    },
    {
        name: 'Beach Explorer',
        islands: ['Milos', 'Naxos', 'Ios'],
        nights: [3, 2, 2],
        duration: '7 days',
        description: 'The best beaches and crystal-clear waters',
    },
    {
        name: 'Authentic Greece',
        islands: ['Sifnos', 'Paros', 'Naxos'],
        nights: [2, 2, 2],
        duration: '6 days',
        description: 'Local food, villages, and genuine island life',
    },
];

export default function IslandHopBuilder() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Form state
    const [selectedIslands, setSelectedIslands] = useState<Array<{ name: string; code: string; nights: number }>>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [travelers, setTravelers] = useState({ adults: 2, children: 0 });
    const [budget, setBudget] = useState<'budget' | 'mid-range' | 'luxury'>('mid-range');

    // UI state
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedItinerary, setGeneratedItinerary] = useState<CompleteItinerary | null>(null);
    const [showAddIsland, setShowAddIsland] = useState(false);

    // Set default date to 2 weeks from now
    useEffect(() => {
        const twoWeeks = new Date();
        twoWeeks.setDate(twoWeeks.getDate() + 14);
        setStartDate(twoWeeks.toISOString().split('T')[0]);
    }, []);

    // Add island to trip
    const addIsland = (island: typeof POPULAR_ISLANDS[0]) => {
        if (!selectedIslands.find(i => i.code === island.code)) {
            setSelectedIslands([...selectedIslands, { name: island.name, code: island.code, nights: island.nights }]);
        }
        setShowAddIsland(false);
    };

    // Remove island from trip
    const removeIsland = (code: string) => {
        setSelectedIslands(selectedIslands.filter(i => i.code !== code));
    };

    // Update nights for an island
    const updateNights = (code: string, nights: number) => {
        setSelectedIslands(selectedIslands.map(i =>
            i.code === code ? { ...i, nights } : i
        ));
    };

    // Apply template
    const applyTemplate = (template: typeof ITINERARY_TEMPLATES[0]) => {
        const islands = template.islands.map((name, idx) => {
            const island = POPULAR_ISLANDS.find(i => i.name === name);
            return { name, code: island?.code || '', nights: template.nights[idx] };
        });
        setSelectedIslands(islands);
        setStep(2);
    };

    // Generate itinerary
    const generateItinerary = async () => {
        if (selectedIslands.length === 0 || !startDate) return;

        setIsGenerating(true);
        try {
            const itinerary = await buildItinerary({
                origin: 'Athens',
                destinations: selectedIslands.map(i => i.name),
                startDate,
                nights: selectedIslands.map(i => i.nights),
                travelers: { adults: travelers.adults, children: travelers.children },
                preferences: { budget, transportPreference: 'fastest', includeActivities: true },
            });

            setGeneratedItinerary(itinerary);
            setStep(4);
        } catch (error) {
            console.error('Error generating itinerary:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Calculate total nights
    const totalNights = selectedIslands.reduce((acc, i) => acc + i.nights, 0);

    return (
        <>
            <SEO
                title="Island Hop Builder - Create Your Cyclades Itinerary"
                description="Build your perfect Greek island hopping itinerary. Choose islands, dates, and let our AI plan ferries, hotels, and activities across the Cyclades."
            />

            <div className={`min-h-screen pt-20 ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {/* Hero */}
                <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800 text-white py-12 md:py-16">
                    <div className="absolute inset-0 bg-[url('/images/cyclades-aerial.webp')] bg-cover bg-center opacity-10" />
                    <div className="relative max-w-5xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium">AI-Powered Trip Planning</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Island Hop Builder</h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Build your perfect island hopping itinerary. We'll handle ferries, hotels, and everything in between.
                        </p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className={`border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
                    <div className="max-w-5xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {[
                                { num: 1, label: 'Choose Islands' },
                                { num: 2, label: 'Set Dates' },
                                { num: 3, label: 'Preferences' },
                                { num: 4, label: 'Your Itinerary' },
                            ].map((s, idx) => (
                                <div key={s.num} className="flex items-center">
                                    <button
                                        onClick={() => s.num < step && setStep(s.num as 1 | 2 | 3 | 4)}
                                        className={`flex items-center gap-2 ${s.num <= step ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${s.num < step ? 'bg-green-500 text-white' :
                                                s.num === step ? 'bg-cyan-600 text-white' :
                                                    isDark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {s.num < step ? <CheckCircle className="w-5 h-5" /> : s.num}
                                        </div>
                                        <span className={`hidden md:block text-sm font-medium ${s.num <= step ? isDark ? 'text-white' : 'text-gray-900' : isDark ? 'text-white/50' : 'text-gray-400'
                                            }`}>{s.label}</span>
                                    </button>
                                    {idx < 3 && (
                                        <div className={`w-12 md:w-24 h-0.5 mx-2 ${s.num < step ? 'bg-green-500' : isDark ? 'bg-white/10' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Choose Islands */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {/* Templates */}
                                <div>
                                    <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Popular Itineraries
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {ITINERARY_TEMPLATES.map((template, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => applyTemplate(template)}
                                                className={`p-4 rounded-xl border text-left transition-all hover:shadow-lg ${isDark
                                                        ? 'bg-dark-card border-dark-border hover:border-cyan-500'
                                                        : 'bg-white border-gray-200 hover:border-cyan-500'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{template.name}</h3>
                                                    <span className="text-xs text-cyan-600 font-medium">{template.duration}</span>
                                                </div>
                                                <p className={`text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{template.description}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {template.islands.map((island, i) => (
                                                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/80' : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {island}
                                                        </span>
                                                    ))}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Selection */}
                                <div>
                                    <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Or Build Your Own
                                    </h2>

                                    {/* Selected Islands */}
                                    {selectedIslands.length > 0 && (
                                        <div className="mb-4 space-y-2">
                                            {selectedIslands.map((island, idx) => (
                                                <div
                                                    key={island.code}
                                                    className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                                                            }`}>
                                                            {idx + 1}
                                                        </div>
                                                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{island.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateNights(island.code, Math.max(1, island.nights - 1))}
                                                                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                            >-</button>
                                                            <span className={`w-8 text-center font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                {island.nights}
                                                            </span>
                                                            <button
                                                                onClick={() => updateNights(island.code, island.nights + 1)}
                                                                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                            >+</button>
                                                            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>nights</span>
                                                        </div>
                                                        <button
                                                            onClick={() => removeIsland(island.code)}
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Add Island Button */}
                                    <button
                                        onClick={() => setShowAddIsland(true)}
                                        className={`w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${isDark
                                                ? 'border-white/20 text-white/60 hover:border-cyan-500 hover:text-cyan-400'
                                                : 'border-gray-300 text-gray-500 hover:border-cyan-500 hover:text-cyan-600'
                                            }`}
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Island
                                    </button>

                                    {/* Island Selection Modal */}
                                    {showAddIsland && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`w-full max-w-lg rounded-2xl p-6 max-h-[80vh] overflow-y-auto ${isDark ? 'bg-dark-card' : 'bg-white'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Select an Island</h3>
                                                    <button onClick={() => setShowAddIsland(false)}>
                                                        <X className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-gray-400'}`} />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {POPULAR_ISLANDS.filter(i => !selectedIslands.find(s => s.code === i.code)).map(island => (
                                                        <button
                                                            key={island.code}
                                                            onClick={() => addIsland(island)}
                                                            className={`p-3 rounded-xl border text-left transition-all hover:shadow-md ${isDark
                                                                    ? 'bg-white/5 border-dark-border hover:border-cyan-500'
                                                                    : 'bg-gray-50 border-gray-200 hover:border-cyan-500'
                                                                }`}
                                                        >
                                                            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{island.name}</h4>
                                                            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{island.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                                {/* Continue Button */}
                                {selectedIslands.length > 0 && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors"
                                        >
                                            Continue
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 2: Set Dates */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'}`}>
                                    <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        When are you traveling?
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                                className={`w-full px-4 py-3 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500 outline-none ${isDark ? 'bg-white/10 text-white border border-dark-border' : 'bg-gray-100 text-gray-900'
                                                    }`}
                                            />
                                        </div>

                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                                Trip Duration
                                            </label>
                                            <div className={`px-4 py-3 rounded-xl ${isDark ? 'bg-white/10 border border-dark-border' : 'bg-gray-100'}`}>
                                                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {totalNights + 1} days / {totalNights} nights
                                                </span>
                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                    (including travel days)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Summary */}
                                    <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Route:</h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Athens</span>
                                            {selectedIslands.map((island, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                                        {island.name} ({island.nights}n)
                                                    </span>
                                                </div>
                                            ))}
                                            <ArrowRight className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Athens</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setStep(1)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors"
                                    >
                                        Continue
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Preferences */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'}`}>
                                    <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Trip Preferences
                                    </h2>

                                    {/* Travelers */}
                                    <div className="mb-6">
                                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                            Travelers
                                        </label>
                                        <div className="flex gap-6">
                                            <div>
                                                <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Adults</span>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <button
                                                        onClick={() => setTravelers({ ...travelers, adults: Math.max(1, travelers.adults - 1) })}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >-</button>
                                                    <span className={`w-8 text-center font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        {travelers.adults}
                                                    </span>
                                                    <button
                                                        onClick={() => setTravelers({ ...travelers, adults: travelers.adults + 1 })}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Children</span>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <button
                                                        onClick={() => setTravelers({ ...travelers, children: Math.max(0, travelers.children - 1) })}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >-</button>
                                                    <span className={`w-8 text-center font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        {travelers.children}
                                                    </span>
                                                    <button
                                                        onClick={() => setTravelers({ ...travelers, children: travelers.children + 1 })}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                                            Budget Level
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {(['budget', 'mid-range', 'luxury'] as const).map((level) => (
                                                <button
                                                    key={level}
                                                    onClick={() => setBudget(level)}
                                                    className={`p-4 rounded-xl border-2 text-center transition-all ${budget === level
                                                            ? 'border-cyan-500 bg-cyan-500/10'
                                                            : isDark ? 'border-dark-border hover:border-white/30' : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className={`font-semibold capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                        {level.replace('-', ' ')}
                                                    </div>
                                                    <div className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                        {level === 'budget' && '€50-100/night'}
                                                        {level === 'mid-range' && '€100-200/night'}
                                                        {level === 'luxury' && '€200+/night'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setStep(2)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                    <button
                                        onClick={generateItinerary}
                                        disabled={isGenerating}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Generate Itinerary
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Itinerary Result */}
                        {step === 4 && generatedItinerary && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {/* Itinerary Header */}
                                <div className={`p-6 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                Your Island Hopping Itinerary
                                            </h2>
                                            <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                {generatedItinerary.startDate} - {generatedItinerary.endDate} • {generatedItinerary.totalDays} days
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className={`p-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                            <button className={`p-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cost Summary */}
                                    <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-cyan-50'}`}>
                                        <div className="flex flex-wrap gap-6">
                                            {generatedItinerary.summary.totalFerryCost > 0 && (
                                                <div>
                                                    <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Ferries</span>
                                                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>€{generatedItinerary.summary.totalFerryCost}</div>
                                                </div>
                                            )}
                                            {generatedItinerary.summary.totalHotelCost > 0 && (
                                                <div>
                                                    <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Hotels</span>
                                                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>€{generatedItinerary.summary.totalHotelCost}</div>
                                                </div>
                                            )}
                                            {generatedItinerary.summary.totalFlightCost > 0 && (
                                                <div>
                                                    <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Flights</span>
                                                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>€{generatedItinerary.summary.totalFlightCost}</div>
                                                </div>
                                            )}
                                            <div className="ml-auto">
                                                <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Total Estimate</span>
                                                <div className="text-xl font-bold text-cyan-600">€{generatedItinerary.summary.grandTotal}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Day by Day */}
                                <div className="space-y-4">
                                    {generatedItinerary.days.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-5 rounded-2xl ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'}`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white">
                                                        {day.dayNumber}
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{day.location}</h3>
                                                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{day.date}</p>
                                                    </div>
                                                </div>
                                                {day.weather && (
                                                    <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                        <Sun className="w-4 h-4 text-yellow-500" />
                                                        {day.weather.temperature.max}°C
                                                    </div>
                                                )}
                                            </div>

                                            {/* Legs */}
                                            {day.legs.map((leg, legIdx) => (
                                                <div
                                                    key={legIdx}
                                                    className={`p-3 rounded-lg mb-2 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                                                >
                                                    {leg.type === 'ferry' && (
                                                        <div className="flex items-center gap-3">
                                                            <Ship className="w-5 h-5 text-cyan-600" />
                                                            <div className="flex-1">
                                                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                    Ferry: {leg.from} → {leg.to}
                                                                </span>
                                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                                    {leg.operator} • {leg.duration}
                                                                </p>
                                                            </div>
                                                            <span className="font-semibold text-cyan-600">€{leg.price}</span>
                                                        </div>
                                                    )}
                                                    {leg.type === 'flight' && (
                                                        <div className="flex items-center gap-3">
                                                            <Plane className="w-5 h-5 text-blue-600" />
                                                            <div className="flex-1">
                                                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                    Flight: {leg.from} → {leg.to}
                                                                </span>
                                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                                    {leg.operator} • {leg.duration}
                                                                </p>
                                                            </div>
                                                            <span className="font-semibold text-blue-600">€{leg.price}</span>
                                                        </div>
                                                    )}
                                                    {leg.type === 'hotel' && (
                                                        <div className="flex items-center gap-3">
                                                            <Hotel className="w-5 h-5 text-purple-600" />
                                                            <div className="flex-1">
                                                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                                    {leg.name}
                                                                </span>
                                                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                                                                    {leg.nights} nights • €{leg.pricePerNight}/night
                                                                </p>
                                                            </div>
                                                            <span className="font-semibold text-purple-600">€{leg.totalPrice}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Notes */}
                                            {day.notes.length > 0 && (
                                                <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                                    {day.notes.map((note, noteIdx) => (
                                                        <p key={noteIdx}>{note}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setStep(1)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Start Over
                                    </button>
                                    <Link
                                        to="/touristas-ai/chat"
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-colors"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Refine with Touristas AI
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}
