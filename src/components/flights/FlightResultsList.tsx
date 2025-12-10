import React, { useState } from 'react';
import { Plane, ArrowUpDown, Clock, DollarSign, AlertCircle } from 'lucide-react';
import FlightResultCard from './FlightResultCard';
import { OnewayFlight, RoundtripFlight } from '../../services/flightApiService';

type SortOption = 'price' | 'duration' | 'departure';

interface FlightResultsListProps {
    flights: (OnewayFlight | RoundtripFlight)[];
    isLoading: boolean;
    error?: string;
    isRoundtrip?: boolean;
    searchParams?: {
        from: string;
        to: string;
    };
}

export default function FlightResultsList({
    flights,
    isLoading,
    error,
    isRoundtrip = false,
    searchParams,
}: FlightResultsListProps) {
    const [sortBy, setSortBy] = useState<SortOption>('price');

    // Sort flights
    const sortedFlights = [...flights].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.price - b.price;
            case 'duration':
                if ('outbound' in a && 'outbound' in b) {
                    return (a.outbound.duration + a.inbound.duration) - (b.outbound.duration + b.inbound.duration);
                }
                if ('duration' in a && 'duration' in b) {
                    return a.duration - b.duration;
                }
                return 0;
            case 'departure':
                const getDepTime = (f: OnewayFlight | RoundtripFlight) => {
                    if ('outbound' in f) return f.outbound.departure.time;
                    return f.departure.time;
                };
                return getDepTime(a).localeCompare(getDepTime(b));
            default:
                return 0;
        }
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 w-40 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                    <div className="h-10 w-48 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg animate-pulse">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                            <div className="flex-1">
                                <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
                                <div className="h-3 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
                            </div>
                            <div className="text-right">
                                <div className="h-6 w-20 bg-gray-200 dark:bg-white/10 rounded mb-1"></div>
                                <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-white/10 rounded"></div>
                            <div className="h-8 w-16 bg-gray-200 dark:bg-white/10 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Search Error</h3>
                <p className="text-red-600 dark:text-red-300">{error}</p>
                <p className="text-sm text-red-500 dark:text-red-400 mt-4">Please try again or modify your search criteria.</p>
            </div>
        );
    }

    // Empty state
    if (flights.length === 0) {
        return (
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-12 text-center border border-gray-200 dark:border-white/10">
                <Plane className="w-16 h-16 text-gray-300 dark:text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white/70 mb-2">No Flights Found</h3>
                <p className="text-gray-500 dark:text-white/50 max-w-md mx-auto">
                    We couldn't find any flights matching your search criteria. Try adjusting your dates or airports.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} Found
                    </h3>
                    {searchParams && (
                        <p className="text-gray-600 dark:text-white/60">
                            {searchParams.from} → {searchParams.to}
                        </p>
                    )}
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 rounded-xl p-1">
                    <SortButton
                        active={sortBy === 'price'}
                        onClick={() => setSortBy('price')}
                        icon={DollarSign}
                        label="Price"
                    />
                    <SortButton
                        active={sortBy === 'duration'}
                        onClick={() => setSortBy('duration')}
                        icon={Clock}
                        label="Duration"
                    />
                    <SortButton
                        active={sortBy === 'departure'}
                        onClick={() => setSortBy('departure')}
                        icon={ArrowUpDown}
                        label="Departure"
                    />
                </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
                {sortedFlights.map((flight) => (
                    <FlightResultCard
                        key={flight.id}
                        flight={flight}
                        isRoundtrip={isRoundtrip}
                    />
                ))}
            </div>
        </div>
    );
}

function SortButton({
    active,
    onClick,
    icon: Icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
                    ? 'bg-white dark:bg-dark-card text-cyan-600 dark:text-cyclades-turquoise shadow-sm'
                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                }`}
        >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}
