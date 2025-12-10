import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bus, Camera, Plane, RefreshCw, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sendChatMessage } from '@/services/aiChatService';
import { useTheme } from '@/contexts/ThemeContext';

interface NearbyPlacesAIProps {
    hotelName: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    address?: string;
}

type QueryType = 'area' | 'hotel';

export function NearbyPlacesAI({
    hotelName,
    city,
    country,
    latitude,
    longitude,
    address
}: NearbyPlacesAIProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const [isOpen, setIsOpen] = useState(false);
    const [queryType, setQueryType] = useState<QueryType>('area');
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasLoadedAreaRef = useRef(false);
    const hasLoadedHotelRef = useRef(false);
    const [areaContent, setAreaContent] = useState<string>('');
    const [hotelContent, setHotelContent] = useState<string>('');

    // Build the AI query for Area
    const buildAreaQuery = () => {
        const coordsInfo = latitude && longitude
            ? `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}.`
            : '';
        const addressInfo = address ? `Address: ${address}.` : '';

        return `Give me a local guide for the area around "${hotelName}" in ${city}, ${country}. ${addressInfo} ${coordsInfo}

Please structure your response with these sections using **BOLD** headers:

**🗺️ Location Overview**
Brief description of this area and neighborhood

**🏛️ Nearby Attractions** (2-3 main points within walking distance)
- Name - distance - why visit

**🚌 Getting Around**
- Bus/taxi availability and tips
- How to reach the town center

**🍽️ Nearby Restaurants** (2-3 recommendations)
- Restaurant name - cuisine type - price range

**💡 Local Tips**
- 2 practical tips for this specific area

Keep responses FORMATTED with bold headers and bullet points. Use emojis for visual appeal.`;
    };

    // Build the AI query for Hotel Summary
    const buildHotelQuery = () => {
        return `Tell me about "${hotelName}" hotel in ${city}, ${country}.

Please provide a comprehensive hotel summary with these sections using **BOLD** headers:

**🏨 Hotel Overview**
Brief description of this hotel, its style and what makes it special

**⭐ Best Features**
- 3-4 standout features or amenities
- What guests love most

**👥 Perfect For**
- Type of travelers this hotel suits best (couples, families, business, etc.)

**📍 Location Highlights**
- What's nearby and walkable
- Views or special location benefits

**💰 Value Assessment**
- Is it worth the price?
- Best time to book

**💡 Insider Tips**
- Room recommendations
- Best views or quiet rooms
- Any special requests to make

Keep responses FORMATTED with bold headers and bullet points. Use emojis for visual appeal.`;
    };

    const fetchContent = async (type: QueryType) => {
        const query = type === 'area' ? buildAreaQuery() : buildHotelQuery();
        const hasLoadedRef = type === 'area' ? hasLoadedAreaRef : hasLoadedHotelRef;
        const cachedContent = type === 'area' ? areaContent : hotelContent;
        const setContentFn = type === 'area' ? setAreaContent : setHotelContent;

        if (hasLoadedRef.current && cachedContent) {
            setContent(cachedContent);
            return;
        }

        setIsLoading(true);
        setError(null);
        setContent('');

        try {
            const chatHistory = [{ role: 'user' as const, content: query }];
            let fullContent = '';

            await sendChatMessage(chatHistory, {
                onChunk: (chunk) => {
                    fullContent += chunk;
                    setContent(prev => prev + chunk);
                }
            });

            setContentFn(fullContent);
            hasLoadedRef.current = true;
        } catch (err) {
            console.error('NearbyPlacesAI error:', err);
            setError('Unable to load information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpen = (type: QueryType) => {
        setQueryType(type);
        setIsOpen(true);

        // Use cached content if available
        const cachedContent = type === 'area' ? areaContent : hotelContent;
        if (cachedContent) {
            setContent(cachedContent);
        } else {
            setContent('');
            fetchContent(type);
        }
    };

    const handleRefresh = () => {
        if (queryType === 'area') {
            hasLoadedAreaRef.current = false;
            setAreaContent('');
        } else {
            hasLoadedHotelRef.current = false;
            setHotelContent('');
        }
        setContent('');
        fetchContent(queryType);
    };

    // Parse and format content for display with rich styling
    const formatContent = (text: string) => {
        // Remove citation brackets [1], [2], etc.
        let cleaned = text.replace(/\[\d+\]/g, '');

        // Convert **text** to styled spans
        cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-lg">$1</strong>');

        // Convert *text* to italic
        cleaned = cleaned.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        return cleaned;
    };

    // Determine destination for flights link
    const getFlightDestination = () => {
        const cityToIata: Record<string, string> = {
            'athens': 'ATH', 'santorini': 'JTR', 'mykonos': 'JMK',
            'paros': 'PAS', 'naxos': 'JNX', 'milos': 'MLO',
        };
        return cityToIata[city.toLowerCase()] || city;
    };

    return (
        <>
            {/* Two Trigger Buttons */}
            <div className="flex gap-2 flex-wrap">
                <Button
                    onClick={() => handleOpen('area')}
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${isDark
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                        }`}
                >
                    <MapPin className="w-4 h-4" />
                    Ask AI About Area
                </Button>
                <Button
                    onClick={() => handleOpen('hotel')}
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${isDark
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30'
                        : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100'
                        }`}
                >
                    <Building2 className="w-4 h-4" />
                    Ask AI About Hotel
                </Button>
            </div>

            {/* Modal Popup */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className={`relative w-full max-w-lg max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl ${isDark ? 'bg-dark-card border border-white/10' : 'bg-white'
                        }`}>
                        {/* Header */}
                        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${queryType === 'area'
                                    ? (isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-100 to-pink-100')
                                    : (isDark ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-cyan-100 to-blue-100')
                                    }`}>
                                    {queryType === 'area'
                                        ? <MapPin className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                                        : <Building2 className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                                    }
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {queryType === 'area' ? 'About This Area' : 'Hotel Summary'}
                                    </h3>
                                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Powered by Touristas AI</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {content && !isLoading && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleRefresh}
                                        className={`h-8 w-8 ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : ''}`}
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className={`h-8 w-8 ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : ''}`}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Tab Toggle */}
                        <div className={`flex gap-2 p-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                            <button
                                onClick={() => handleOpen('area')}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${queryType === 'area'
                                    ? (isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700')
                                    : (isDark ? 'text-white/50 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50')
                                    }`}
                            >
                                <MapPin className="w-4 h-4 inline mr-2" />
                                Area Guide
                            </button>
                            <button
                                onClick={() => handleOpen('hotel')}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${queryType === 'hotel'
                                    ? (isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-700')
                                    : (isDark ? 'text-white/50 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50')
                                    }`}
                            >
                                <Building2 className="w-4 h-4 inline mr-2" />
                                Hotel Summary
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 overflow-y-auto max-h-[55vh]">
                            {/* Location Header */}
                            <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <MapPin className={`w-4 h-4 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {hotelName} • {city}, {country}
                                </span>
                            </div>

                            {/* Loading State */}
                            {isLoading && !content && (
                                <div className="py-8 text-center">
                                    <div className={`w-10 h-10 mx-auto mb-3 border-3 rounded-full animate-spin ${isDark ? 'border-white/20 border-t-purple-400' : 'border-gray-200 border-t-purple-600'}`} />
                                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                                        {queryType === 'area' ? 'Exploring the area...' : 'Analyzing hotel...'}
                                    </p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isLoading && (
                                <div className={`py-6 text-center rounded-xl ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                                    <p className={`text-sm mb-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
                                    <Button variant="outline" size="sm" onClick={handleRefresh} className={isDark ? 'border-white/20 text-white' : ''}>
                                        <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                                    </Button>
                                </div>
                            )}

                            {/* Content Display */}
                            {content && (
                                <div className="space-y-4">
                                    <div
                                        className={`whitespace-pre-wrap text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'} ai-content`}
                                        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                                    />

                                    {/* Loading indicator for streaming */}
                                    {isLoading && (
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-purple-400' : 'bg-purple-600'}`} />
                                            <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>Loading more...</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer - Quick Links */}
                        {content && !isLoading && (
                            <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        to={`/flights?to=${getFlightDestination()}`}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${isDark ? 'bg-cyclades-turquoise/20 text-cyclades-turquoise hover:bg-cyclades-turquoise/30' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Plane className="w-3.5 h-3.5" /> Flights to {city}
                                    </Link>
                                    <Link
                                        to="/ferries"
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${isDark ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Bus className="w-3.5 h-3.5" /> Ferries
                                    </Link>
                                    <Link
                                        to="/activities"
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${isDark ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Camera className="w-3.5 h-3.5" /> Activities
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CSS for AI content styling */}
            <style>{`
                .ai-content strong {
                    display: block;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                }
                .ai-content strong:first-child {
                    margin-top: 0;
                }
            `}</style>
        </>
    );
}

// Standalone button version for the booking sidebar
export function TouristasAIButton({
    hotelName,
    city,
    country,
    latitude,
    longitude,
    address
}: NearbyPlacesAIProps) {
    return (
        <NearbyPlacesAI
            hotelName={hotelName}
            city={city}
            country={country}
            latitude={latitude}
            longitude={longitude}
            address={address}
        />
    );
}
