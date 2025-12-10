import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plane, Calendar, Users, ArrowRightLeft, Search, ChevronDown, X, Loader2 } from 'lucide-react';
import {
    FlightSearchParams,
    lookupIataCode,
    IataResult,
    CYCLADES_AIRPORTS,
    CABIN_CLASSES,
    CURRENCIES
} from '../../services/flightApiService';

interface FlightSearchFormProps {
    onSearch: (params: FlightSearchParams, tripType: 'oneway' | 'roundtrip') => void;
    isLoading?: boolean;
}

export default function FlightSearchForm({ onSearch, isLoading = false }: FlightSearchFormProps) {
    const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('roundtrip');
    const [departureAirport, setDepartureAirport] = useState('');
    const [departureCode, setDepartureCode] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [arrivalCode, setArrivalCode] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [cabinClass, setCabinClass] = useState<FlightSearchParams['cabinClass']>('Economy');
    const [currency, setCurrency] = useState('EUR');

    // Autocomplete states
    const [departureSuggestions, setDepartureSuggestions] = useState<IataResult[]>([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState<IataResult[]>([]);
    const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
    const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

    const departureRef = useRef<HTMLDivElement>(null);
    const arrivalRef = useRef<HTMLDivElement>(null);
    const passengerRef = useRef<HTMLDivElement>(null);

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (departureRef.current && !departureRef.current.contains(event.target as Node)) {
                setShowDepartureSuggestions(false);
            }
            if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) {
                setShowArrivalSuggestions(false);
            }
            if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
                setShowPassengerDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced airport search
    const searchAirports = useCallback(async (query: string, setResults: (r: IataResult[]) => void) => {
        if (query.length < 2) {
            // Show quick select options for Cyclades
            setResults(CYCLADES_AIRPORTS);
            return;
        }

        const response = await lookupIataCode(query, 'airport');
        if (response.success && response.results.length > 0) {
            setResults(response.results);
        } else {
            // Fallback to local search
            const filtered = CYCLADES_AIRPORTS.filter(
                a => a.name.toLowerCase().includes(query.toLowerCase()) ||
                    a.code.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered.length > 0 ? filtered : CYCLADES_AIRPORTS);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (showDepartureSuggestions) {
                searchAirports(departureAirport, setDepartureSuggestions);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [departureAirport, showDepartureSuggestions, searchAirports]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (showArrivalSuggestions) {
                searchAirports(arrivalAirport, setArrivalSuggestions);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [arrivalAirport, showArrivalSuggestions, searchAirports]);

    const handleSelectDeparture = (airport: IataResult) => {
        setDepartureAirport(`${airport.name} (${airport.code})`);
        setDepartureCode(airport.code);
        setShowDepartureSuggestions(false);
    };

    const handleSelectArrival = (airport: IataResult) => {
        setArrivalAirport(`${airport.name} (${airport.code})`);
        setArrivalCode(airport.code);
        setShowArrivalSuggestions(false);
    };

    const swapAirports = () => {
        const tempAirport = departureAirport;
        const tempCode = departureCode;
        setDepartureAirport(arrivalAirport);
        setDepartureCode(arrivalCode);
        setArrivalAirport(tempAirport);
        setArrivalCode(tempCode);
    };

    const totalPassengers = adults + children + infants;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!departureCode || !arrivalCode || !departureDate) {
            alert('Please fill in all required fields');
            return;
        }

        if (tripType === 'roundtrip' && !returnDate) {
            alert('Please select a return date');
            return;
        }

        const params: FlightSearchParams = {
            departureAirport: departureCode,
            arrivalAirport: arrivalCode,
            departureDate,
            returnDate: tripType === 'roundtrip' ? returnDate : undefined,
            adults,
            children,
            infants,
            cabinClass,
            currency,
        };

        onSearch(params, tripType);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Type Toggle */}
            <div className="flex gap-2 justify-center">
                <button
                    type="button"
                    onClick={() => setTripType('roundtrip')}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${tripType === 'roundtrip'
                            ? 'bg-cyan-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/20'
                        }`}
                >
                    Round Trip
                </button>
                <button
                    type="button"
                    onClick={() => setTripType('oneway')}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${tripType === 'oneway'
                            ? 'bg-cyan-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/20'
                        }`}
                >
                    One Way
                </button>
            </div>

            {/* Main Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Departure Airport */}
                <div ref={departureRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">From</label>
                    <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={departureAirport}
                            onChange={(e) => setDepartureAirport(e.target.value)}
                            onFocus={() => {
                                setShowDepartureSuggestions(true);
                                if (departureSuggestions.length === 0) {
                                    setDepartureSuggestions(CYCLADES_AIRPORTS);
                                }
                            }}
                            placeholder="City or airport"
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                        {departureAirport && (
                            <button
                                type="button"
                                onClick={() => {
                                    setDepartureAirport('');
                                    setDepartureCode('');
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {showDepartureSuggestions && departureSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-white/10 max-h-60 overflow-y-auto">
                            {departureSuggestions.map((airport) => (
                                <button
                                    key={airport.code}
                                    type="button"
                                    onClick={() => handleSelectDeparture(airport)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-3 transition-colors"
                                >
                                    <Plane className="w-4 h-4 text-cyan-600" />
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-white">{airport.code}</span>
                                        <span className="text-gray-600 dark:text-white/60 ml-2">{airport.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Swap Button */}
                <div className="hidden md:flex items-end pb-3 -mx-2 justify-center">
                    <button
                        type="button"
                        onClick={swapAirports}
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                    >
                        <ArrowRightLeft className="w-5 h-5 text-gray-600 dark:text-white/70" />
                    </button>
                </div>

                {/* Arrival Airport */}
                <div ref={arrivalRef} className="relative md:-ml-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">To</label>
                    <div className="relative">
                        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
                        <input
                            type="text"
                            value={arrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                            onFocus={() => {
                                setShowArrivalSuggestions(true);
                                if (arrivalSuggestions.length === 0) {
                                    setArrivalSuggestions(CYCLADES_AIRPORTS);
                                }
                            }}
                            placeholder="City or airport"
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                        {arrivalAirport && (
                            <button
                                type="button"
                                onClick={() => {
                                    setArrivalAirport('');
                                    setArrivalCode('');
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {showArrivalSuggestions && arrivalSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-white/10 max-h-60 overflow-y-auto">
                            {arrivalSuggestions.map((airport) => (
                                <button
                                    key={airport.code}
                                    type="button"
                                    onClick={() => handleSelectArrival(airport)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-3 transition-colors"
                                >
                                    <Plane className="w-4 h-4 text-cyan-600" />
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-white">{airport.code}</span>
                                        <span className="text-gray-600 dark:text-white/60 ml-2">{airport.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2 md:col-span-1">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Departure</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                min={today}
                                className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                    {tripType === 'roundtrip' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Return</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    min={departureDate || today}
                                    className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Secondary Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Passengers */}
                <div ref={passengerRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Passengers</label>
                    <button
                        type="button"
                        onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span>{totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showPassengerDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showPassengerDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-200 dark:border-white/10 p-4 space-y-4">
                            {[
                                { label: 'Adults', sublabel: '12+ years', value: adults, setValue: setAdults, min: 1, max: 9 },
                                { label: 'Children', sublabel: '2-11 years', value: children, setValue: setChildren, min: 0, max: 9 },
                                { label: 'Infants', sublabel: 'Under 2', value: infants, setValue: setInfants, min: 0, max: adults },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                        <p className="text-sm text-gray-500 dark:text-white/50">{item.sublabel}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                                            disabled={item.value <= item.min}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center font-medium text-gray-900 dark:text-white">{item.value}</span>
                                        <button
                                            type="button"
                                            onClick={() => item.setValue(Math.min(item.max, item.value + 1))}
                                            disabled={item.value >= item.max}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cabin Class */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Cabin Class</label>
                    <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value as FlightSearchParams['cabinClass'])}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                        {CABIN_CLASSES.map((cc) => (
                            <option key={cc.value} value={cc.value}>{cc.label}</option>
                        ))}
                    </select>
                </div>

                {/* Currency */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-1">Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Searching flights...
                    </>
                ) : (
                    <>
                        <Search className="w-5 h-5" />
                        Search Flights
                    </>
                )}
            </button>
        </form>
    );
}
