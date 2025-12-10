import { useState } from 'react';
import { Plane, Clock, ChevronDown, ChevronUp, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

// Airline logo URLs from reliable CDN
const airlineLogos: Record<string, string> = {
    'A3': 'https://images.kiwi.com/airlines/64/A3.png', // Aegean Airlines
    'OA': 'https://images.kiwi.com/airlines/64/OA.png', // Olympic Air
    'GQ': 'https://images.kiwi.com/airlines/64/GQ.png', // Sky Express
    'FR': 'https://images.kiwi.com/airlines/64/FR.png', // Ryanair
    'W6': 'https://images.kiwi.com/airlines/64/W6.png', // Wizz Air
    'U2': 'https://images.kiwi.com/airlines/64/U2.png', // EasyJet
    'VY': 'https://images.kiwi.com/airlines/64/VY.png', // Vueling
    'BA': 'https://images.kiwi.com/airlines/64/BA.png', // British Airways
    'LH': 'https://images.kiwi.com/airlines/64/LH.png', // Lufthansa
    'AF': 'https://images.kiwi.com/airlines/64/AF.png', // Air France
    'KL': 'https://images.kiwi.com/airlines/64/KL.png', // KLM
    'EK': 'https://images.kiwi.com/airlines/64/EK.png', // Emirates
    'QR': 'https://images.kiwi.com/airlines/64/QR.png', // Qatar Airways
    'TK': 'https://images.kiwi.com/airlines/64/TK.png', // Turkish Airlines
};

const airlineNames: Record<string, string> = {
    'A3': 'Aegean Airlines',
    'OA': 'Olympic Air',
    'GQ': 'Sky Express',
    'FR': 'Ryanair',
    'W6': 'Wizz Air',
    'U2': 'EasyJet',
    'VY': 'Vueling',
    'BA': 'British Airways',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'TK': 'Turkish Airlines',
};

interface FlightResult {
    id: string;
    airline: string;
    airlineCode?: string;
    departure: string;
    arrival: string;
    origin: string;
    destination: string;
    duration: string;
    stops: number;
    price: number;
    currency?: string;
    bookingUrl?: string;
}

interface FlightResultsCardProps {
    flights: FlightResult[];
    title?: string;
    maxResults?: number;
}

export function FlightResultsCard({
    flights,
    title = 'Available Flights',
    maxResults = 3
}: FlightResultsCardProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const [expanded, setExpanded] = useState(false);

    const displayFlights = expanded ? flights : flights.slice(0, maxResults);
    const hasMore = flights.length > maxResults;

    if (!flights || flights.length === 0) {
        return null;
    }

    const cardBg = isDark ? 'bg-dark-card border-white/10' : 'bg-white border-gray-200';
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-white/70' : 'text-gray-600';
    const textMuted = isDark ? 'text-white/50' : 'text-gray-500';

    function getAirlineLogo(code?: string) {
        if (!code) return null;
        return airlineLogos[code.toUpperCase()] || `https://images.kiwi.com/airlines/64/${code.toUpperCase()}.png`;
    }

    function getAirlineName(code?: string, fallback?: string) {
        if (!code) return fallback || 'Airline';
        return airlineNames[code.toUpperCase()] || fallback || code;
    }

    return (
        <Card className={`overflow-hidden shadow-lg border ${cardBg}`}>
            <CardHeader className={`py-3 px-4 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-100'}`}>
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                        <Plane className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <h3 className={`font-bold text-sm ${textPrimary}`}>{title}</h3>
                    <Badge variant="outline" className={`ml-auto text-xs ${isDark ? 'border-white/20 text-white/60' : ''}`}>
                        {flights.length} found
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-gray-100'}`}>
                    {displayFlights.map((flight) => {
                        const logoUrl = getAirlineLogo(flight.airlineCode);

                        return (
                            <div
                                key={flight.id}
                                className={`p-4 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Airline Logo */}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                        {logoUrl ? (
                                            <img
                                                src={logoUrl}
                                                alt={getAirlineName(flight.airlineCode, flight.airline)}
                                                className="w-8 h-8 object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <Plane className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                                        )}
                                    </div>

                                    {/* Flight Info */}
                                    <div className="flex-1 min-w-0">
                                        {/* Route */}
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-bold text-sm ${textPrimary}`}>{flight.origin}</span>
                                            <ArrowRight className={`w-3.5 h-3.5 ${textMuted}`} />
                                            <span className={`font-bold text-sm ${textPrimary}`}>{flight.destination}</span>
                                        </div>

                                        {/* Details */}
                                        <div className={`flex items-center gap-3 text-xs ${textSecondary}`}>
                                            <span>{getAirlineName(flight.airlineCode, flight.airline)}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {flight.duration}
                                            </span>
                                            <span>•</span>
                                            <span>{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
                                        </div>

                                        {/* Times */}
                                        <div className={`text-xs mt-1 ${textMuted}`}>
                                            {flight.departure} → {flight.arrival}
                                        </div>
                                    </div>

                                    {/* Price & Book */}
                                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                        <div className={`text-lg font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`}>
                                            {flight.currency === 'USD' ? '$' : '€'}{flight.price}
                                        </div>
                                        {flight.bookingUrl ? (
                                            <Button
                                                size="sm"
                                                className={`text-xs px-3 py-1 h-auto ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                                onClick={() => window.open(flight.bookingUrl, '_blank', 'noopener,noreferrer')}
                                            >
                                                Book
                                                <ExternalLink className="w-3 h-3 ml-1" />
                                            </Button>
                                        ) : (
                                            <Badge variant="outline" className={`text-xs ${isDark ? 'border-white/20' : ''}`}>
                                                View
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show More Button */}
                {hasMore && (
                    <div className={`p-3 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-100'}`}>
                        <Button
                            variant="ghost"
                            className={`w-full text-sm ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : ''}`}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4 mr-2" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4 mr-2" />
                                    Show {flights.length - maxResults} More
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
