import React, { useState, useEffect } from 'react';
import {
    Sun,
    Cloud,
    Wind,
    Droplets,
    Waves,
    Thermometer,
    Umbrella,
    Moon,
    Sunrise,
    Sunset,
    Navigation,
    MapPin,
    Clock,
    AlertTriangle,
    Ship,
    ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cyclades } from '../data/cyclades';

interface BeachWeather {
    id: string;
    name: string;
    type: 'beach' | 'port' | 'village';
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    windDirection: string;
    waveHeight: number;
    seaTemp: number;
    uvIndex: number;
    swimmingConditions: 'excellent' | 'good' | 'moderate' | 'poor';
    sunbedAvailable: boolean;
    sheltered: boolean;
    sunsetTime: string;
    crowdLevel: 'low' | 'moderate' | 'high';
}

interface IslandWeather {
    island: string;
    generalTemp: number;
    generalCondition: string;
    ferryDisruptionRisk: 'low' | 'medium' | 'high';
    locations: BeachWeather[];
}

// Mock microclimate data
const generateMicroclimateData = (island: string): IslandWeather => {
    const beaches: Record<string, BeachWeather[]> = {
        santorini: [
            { id: 'perissa', name: 'Perissa Beach', type: 'beach', temperature: 28, feelsLike: 30, windSpeed: 12, windDirection: 'NE', waveHeight: 0.3, seaTemp: 24, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:15', crowdLevel: 'high' },
            { id: 'kamari', name: 'Kamari Beach', type: 'beach', temperature: 29, feelsLike: 31, windSpeed: 15, windDirection: 'NE', waveHeight: 0.4, seaTemp: 24, uvIndex: 9, swimmingConditions: 'good', sunbedAvailable: true, sheltered: false, sunsetTime: '20:15', crowdLevel: 'high' },
            { id: 'red-beach', name: 'Red Beach', type: 'beach', temperature: 30, feelsLike: 33, windSpeed: 8, windDirection: 'N', waveHeight: 0.2, seaTemp: 25, uvIndex: 10, swimmingConditions: 'excellent', sunbedAvailable: false, sheltered: true, sunsetTime: '20:15', crowdLevel: 'moderate' },
            { id: 'vlychada', name: 'Vlychada Beach', type: 'beach', temperature: 27, feelsLike: 28, windSpeed: 18, windDirection: 'NE', waveHeight: 0.6, seaTemp: 23, uvIndex: 8, swimmingConditions: 'moderate', sunbedAvailable: true, sheltered: false, sunsetTime: '20:15', crowdLevel: 'low' },
            { id: 'oia', name: 'Oia Village', type: 'village', temperature: 26, feelsLike: 27, windSpeed: 20, windDirection: 'N', waveHeight: 0, seaTemp: 0, uvIndex: 8, swimmingConditions: 'excellent', sunbedAvailable: false, sheltered: false, sunsetTime: '20:15', crowdLevel: 'high' },
            { id: 'athinios', name: 'Athinios Port', type: 'port', temperature: 28, feelsLike: 29, windSpeed: 14, windDirection: 'NE', waveHeight: 0.5, seaTemp: 24, uvIndex: 9, swimmingConditions: 'good', sunbedAvailable: false, sheltered: true, sunsetTime: '20:15', crowdLevel: 'moderate' },
        ],
        mykonos: [
            { id: 'paradise', name: 'Paradise Beach', type: 'beach', temperature: 29, feelsLike: 31, windSpeed: 22, windDirection: 'N', waveHeight: 0.8, seaTemp: 24, uvIndex: 9, swimmingConditions: 'moderate', sunbedAvailable: true, sheltered: false, sunsetTime: '20:12', crowdLevel: 'high' },
            { id: 'super-paradise', name: 'Super Paradise', type: 'beach', temperature: 28, feelsLike: 29, windSpeed: 18, windDirection: 'NE', waveHeight: 0.5, seaTemp: 24, uvIndex: 9, swimmingConditions: 'good', sunbedAvailable: true, sheltered: true, sunsetTime: '20:12', crowdLevel: 'high' },
            { id: 'elia', name: 'Elia Beach', type: 'beach', temperature: 27, feelsLike: 28, windSpeed: 15, windDirection: 'N', waveHeight: 0.4, seaTemp: 24, uvIndex: 8, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:12', crowdLevel: 'moderate' },
            { id: 'ornos', name: 'Ornos Beach', type: 'beach', temperature: 28, feelsLike: 29, windSpeed: 10, windDirection: 'NE', waveHeight: 0.2, seaTemp: 25, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:12', crowdLevel: 'high' },
        ],
        paros: [
            { id: 'kolimbithres', name: 'Kolimbithres', type: 'beach', temperature: 28, feelsLike: 29, windSpeed: 12, windDirection: 'N', waveHeight: 0.3, seaTemp: 24, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:10', crowdLevel: 'moderate' },
            { id: 'golden', name: 'Golden Beach', type: 'beach', temperature: 29, feelsLike: 31, windSpeed: 25, windDirection: 'N', waveHeight: 1.2, seaTemp: 23, uvIndex: 9, swimmingConditions: 'poor', sunbedAvailable: true, sheltered: false, sunsetTime: '20:10', crowdLevel: 'moderate' },
            { id: 'santa-maria', name: 'Santa Maria', type: 'beach', temperature: 27, feelsLike: 28, windSpeed: 14, windDirection: 'NE', waveHeight: 0.4, seaTemp: 24, uvIndex: 8, swimmingConditions: 'good', sunbedAvailable: true, sheltered: true, sunsetTime: '20:10', crowdLevel: 'low' },
        ],
        naxos: [
            { id: 'agios-prokopios', name: 'Agios Prokopios', type: 'beach', temperature: 28, feelsLike: 29, windSpeed: 10, windDirection: 'N', waveHeight: 0.2, seaTemp: 25, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:08', crowdLevel: 'moderate' },
            { id: 'plaka', name: 'Plaka Beach', type: 'beach', temperature: 27, feelsLike: 28, windSpeed: 12, windDirection: 'N', waveHeight: 0.3, seaTemp: 25, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:08', crowdLevel: 'low' },
            { id: 'mikri-vigla', name: 'Mikri Vigla', type: 'beach', temperature: 29, feelsLike: 30, windSpeed: 28, windDirection: 'N', waveHeight: 1.0, seaTemp: 24, uvIndex: 9, swimmingConditions: 'moderate', sunbedAvailable: true, sheltered: false, sunsetTime: '20:08', crowdLevel: 'moderate' },
        ],
        milos: [
            { id: 'sarakiniko', name: 'Sarakiniko', type: 'beach', temperature: 29, feelsLike: 30, windSpeed: 8, windDirection: 'N', waveHeight: 0.2, seaTemp: 24, uvIndex: 10, swimmingConditions: 'excellent', sunbedAvailable: false, sheltered: true, sunsetTime: '20:18', crowdLevel: 'high' },
            { id: 'kleftiko', name: 'Kleftiko', type: 'beach', temperature: 28, feelsLike: 29, windSpeed: 10, windDirection: 'NE', waveHeight: 0.3, seaTemp: 25, uvIndex: 9, swimmingConditions: 'excellent', sunbedAvailable: false, sheltered: true, sunsetTime: '20:18', crowdLevel: 'moderate' },
            { id: 'firiplaka', name: 'Firiplaka', type: 'beach', temperature: 30, feelsLike: 32, windSpeed: 6, windDirection: 'NE', waveHeight: 0.1, seaTemp: 25, uvIndex: 10, swimmingConditions: 'excellent', sunbedAvailable: true, sheltered: true, sunsetTime: '20:18', crowdLevel: 'moderate' },
        ],
    };

    const islandBeaches = beaches[island.toLowerCase()] || beaches.santorini;
    const avgTemp = Math.round(islandBeaches.reduce((sum, b) => sum + b.temperature, 0) / islandBeaches.length);
    const avgWind = Math.round(islandBeaches.reduce((sum, b) => sum + b.windSpeed, 0) / islandBeaches.length);

    return {
        island,
        generalTemp: avgTemp,
        generalCondition: avgWind > 20 ? 'Windy' : 'Sunny',
        ferryDisruptionRisk: avgWind > 25 ? 'high' : avgWind > 18 ? 'medium' : 'low',
        locations: islandBeaches,
    };
};

const MicroclimateWeatherPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [selectedIsland, setSelectedIsland] = useState('santorini');
    const [weatherData, setWeatherData] = useState<IslandWeather | null>(null);
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

    useEffect(() => {
        setWeatherData(generateMicroclimateData(selectedIsland));
    }, [selectedIsland]);

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'excellent': return 'text-green-500';
            case 'good': return 'text-blue-500';
            case 'moderate': return 'text-yellow-500';
            case 'poor': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getConditionBg = (condition: string) => {
        switch (condition) {
            case 'excellent': return isDarkMode ? 'bg-green-900/30' : 'bg-green-50';
            case 'good': return isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50';
            case 'moderate': return isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50';
            case 'poor': return isDarkMode ? 'bg-red-900/30' : 'bg-red-50';
            default: return isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
        }
    };

    return (
        <>
            <SEO
                title="Microclimate Weather | Discover Cyclades"
                description="Beach-specific weather for the Cyclades. Check wind, waves, sea temperature, and swimming conditions for every beach."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-cyan-900 to-blue-900' : 'bg-gradient-to-r from-cyan-500 to-blue-500'} text-white py-12 px-4`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Sun className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Microclimate Weather</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Beach-by-beach conditions: wind, waves, sea temp & swimming ratings
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Island Selector */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['santorini', 'mykonos', 'paros', 'naxos', 'milos'].map(island => (
                            <button
                                key={island}
                                onClick={() => setSelectedIsland(island)}
                                className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${selectedIsland === island
                                        ? 'bg-cyan-500 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                    }`}
                            >
                                {island}
                            </button>
                        ))}
                    </div>

                    {weatherData && (
                        <>
                            {/* General Overview */}
                            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-6`}>
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h2 className={`text-2xl font-bold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {weatherData.island}
                                        </h2>
                                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {weatherData.generalCondition} • Updated just now
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {weatherData.generalTemp}°
                                            </div>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average</p>
                                        </div>
                                        <div className={`p-3 rounded-xl ${weatherData.ferryDisruptionRisk === 'high'
                                                ? 'bg-red-100 text-red-600'
                                                : weatherData.ferryDisruptionRisk === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-600'
                                                    : 'bg-green-100 text-green-600'
                                            }`}>
                                            <Ship className="w-6 h-6 mb-1" />
                                            <p className="text-xs font-medium capitalize">{weatherData.ferryDisruptionRisk} Risk</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Beach Cards */}
                            <div className="space-y-4">
                                {weatherData.locations.map(location => (
                                    <motion.div
                                        key={location.id}
                                        layout
                                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
                                    >
                                        <button
                                            onClick={() => setExpandedLocation(expandedLocation === location.id ? null : location.id)}
                                            className="w-full p-4 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl ${getConditionBg(location.swimmingConditions)}`}>
                                                    {location.type === 'beach' ? (
                                                        <Waves className={`w-6 h-6 ${getConditionColor(location.swimmingConditions)}`} />
                                                    ) : location.type === 'port' ? (
                                                        <Ship className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                                    ) : (
                                                        <MapPin className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                                                    )}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {location.name}
                                                    </h3>
                                                    <p className={`text-sm capitalize ${getConditionColor(location.swimmingConditions)}`}>
                                                        {location.type === 'beach' ? `${location.swimmingConditions} for swimming` : location.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden sm:block">
                                                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {location.temperature}°C
                                                    </p>
                                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {location.windSpeed} km/h
                                                    </p>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 transition-transform ${expandedLocation === location.id ? 'rotate-180' : ''
                                                    } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedLocation === location.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className={`p-4 pt-0 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                <Thermometer className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Feels Like</p>
                                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.feelsLike}°C</p>
                                                            </div>
                                                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                <Wind className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wind</p>
                                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.windSpeed} km/h {location.windDirection}</p>
                                                            </div>
                                                            {location.type === 'beach' && (
                                                                <>
                                                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                        <Waves className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Waves</p>
                                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.waveHeight}m</p>
                                                                    </div>
                                                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                        <Droplets className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sea Temp</p>
                                                                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.seaTemp}°C</p>
                                                                    </div>
                                                                </>
                                                            )}
                                                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                <Sun className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>UV Index</p>
                                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.uvIndex} {location.uvIndex >= 8 ? '⚠️' : ''}</p>
                                                            </div>
                                                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                                <Sunset className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sunset</p>
                                                                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.sunsetTime}</p>
                                                            </div>
                                                        </div>

                                                        {location.type === 'beach' && (
                                                            <div className="flex flex-wrap gap-2 mt-4">
                                                                {location.sunbedAvailable && (
                                                                    <span className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                                                                        🏖️ Sunbeds Available
                                                                    </span>
                                                                )}
                                                                {location.sheltered && (
                                                                    <span className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'}`}>
                                                                        🌿 Sheltered from Wind
                                                                    </span>
                                                                )}
                                                                <span className={`text-xs px-3 py-1 rounded-full ${location.crowdLevel === 'low'
                                                                        ? isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
                                                                        : location.crowdLevel === 'moderate'
                                                                            ? isDarkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                                                                            : isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    👥 {location.crowdLevel.charAt(0).toUpperCase() + location.crowdLevel.slice(1)} Crowds
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MicroclimateWeatherPage;
