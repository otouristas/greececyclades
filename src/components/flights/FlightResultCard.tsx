import React from 'react';
import { Plane, Clock, ExternalLink } from 'lucide-react';
import { OnewayFlight, RoundtripFlight, formatDuration, formatPrice, getStopsLabel } from '../../services/flightApiService';

interface FlightResultCardProps {
    flight: OnewayFlight | RoundtripFlight;
    isRoundtrip?: boolean;
}

export default function FlightResultCard({ flight, isRoundtrip = false }: FlightResultCardProps) {
    const isRoundtripFlight = (f: OnewayFlight | RoundtripFlight): f is RoundtripFlight => {
        return 'outbound' in f && 'inbound' in f;
    };

    if (isRoundtripFlight(flight)) {
        return (
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Outbound Leg */}
                <div className="p-6 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-cyan-600 dark:text-cyclades-turquoise bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1 rounded-full">
                            Outbound
                        </span>
                        <span className="text-sm text-gray-500 dark:text-white/50">{flight.outbound.departure.date}</span>
                    </div>
                    <FlightLegDisplay leg={flight.outbound} />
                </div>

                {/* Inbound Leg */}
                <div className="p-6 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                            Return
                        </span>
                        <span className="text-sm text-gray-500 dark:text-white/50">{flight.inbound.departure.date}</span>
                    </div>
                    <FlightLegDisplay leg={flight.inbound} />
                </div>

                {/* Price & Book */}
                <div className="p-6 bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-white/50">Total price</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(flight.price, flight.currency)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-white/50">for all passengers</p>
                    </div>
                    {flight.bookingUrl && (
                        <a
                            href={flight.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Book Now
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        );
    }

    // One-way flight display
    return (
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    {/* Airline Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src={flight.airlineLogo}
                            alt={flight.airline}
                            className="w-10 h-10 rounded-lg object-contain bg-gray-100 dark:bg-white/10 p-1"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>';
                            }}
                        />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{flight.airline}</p>
                            <p className="text-sm text-gray-500 dark:text-white/50">
                                {flight.segments.length > 0 && flight.segments[0].flightNumber}
                            </p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(flight.price, flight.currency)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-white/50">per person</p>
                    </div>
                </div>

                {/* Flight Times */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.departure.time}</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-white/70">{flight.departure.airport}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                            <Clock className="w-4 h-4" />
                            {formatDuration(flight.duration)}
                        </div>
                        <div className="w-full flex items-center gap-1 my-1">
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-200 dark:from-white/20 to-gray-300 dark:to-white/30"></div>
                            <Plane className="w-4 h-4 text-cyan-600 dark:text-cyclades-turquoise" />
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-300 dark:from-white/30 to-gray-200 dark:to-white/20"></div>
                        </div>
                        <p className={`text-xs font-medium ${flight.stops === 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {getStopsLabel(flight.stops)}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.arrival.time}</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-white/70">{flight.arrival.airport}</p>
                    </div>
                </div>

                {/* Book Button */}
                {flight.bookingUrl && (
                    <a
                        href={flight.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Book Now
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>

            {/* Segments (expandable in future) */}
            {flight.stops > 0 && flight.segments.length > 1 && (
                <div className="px-6 py-3 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                    <p className="text-sm text-gray-600 dark:text-white/60">
                        Stops: {flight.segments.slice(0, -1).map(s => s.arrival.airport).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
}

// Component for displaying a single flight leg (used in roundtrip)
function FlightLegDisplay({ leg }: { leg: OnewayFlight | RoundtripFlight['outbound'] }) {
    return (
        <div className="flex items-center gap-4">
            {/* Airline */}
            <div className="flex items-center gap-3 min-w-[140px]">
                <img
                    src={leg.airlineLogo}
                    alt={leg.airline}
                    className="w-8 h-8 rounded-lg object-contain bg-gray-100 dark:bg-white/10 p-0.5"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>';
                    }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-white/70 truncate">{leg.airline}</span>
            </div>

            {/* Times */}
            <div className="flex items-center gap-4 flex-1">
                <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{leg.departure.time}</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">{leg.departure.airport}</p>
                </div>

                <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                        <Clock className="w-3 h-3" />
                        {formatDuration(leg.duration)}
                    </div>
                    <div className="w-full flex items-center gap-1 my-1">
                        <div className="h-[1px] flex-1 bg-gray-300 dark:bg-white/20"></div>
                        <Plane className="w-3 h-3 text-cyan-600 dark:text-cyclades-turquoise" />
                        <div className="h-[1px] flex-1 bg-gray-300 dark:bg-white/20"></div>
                    </div>
                    <p className={`text-xs ${leg.stops === 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-500'}`}>
                        {getStopsLabel(leg.stops)}
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{leg.arrival.time}</p>
                    <p className="text-sm text-gray-600 dark:text-white/60">{leg.arrival.airport}</p>
                </div>
            </div>
        </div>
    );
}
