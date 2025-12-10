import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, X, Loader2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    searchCycladesDestinations,
    LiteApiPlace,
    CYCLADES_DESTINATIONS,
    getDestinationById
} from '../../services/placesService';

interface DestinationSearchProps {
    /** Called when a destination is selected */
    onSelect?: (place: LiteApiPlace) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Initial value */
    initialValue?: string;
    /** Show popular destinations when focused with empty input */
    showPopularOnFocus?: boolean;
    /** Additional className for container */
    className?: string;
}

/**
 * DestinationSearch - Beautiful autocomplete component for Cyclades destinations
 * Uses LiteAPI Places Search for suggestions with fallback to static data
 */
export default function DestinationSearch({
    onSelect,
    placeholder = 'Search destinations...',
    initialValue = '',
    showPopularOnFocus = true,
    className = '',
}: DestinationSearchProps) {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState<LiteApiPlace[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>();

    // Popular destinations for initial display
    const popularDestinations: LiteApiPlace[] = CYCLADES_DESTINATIONS
        .slice(0, 6)
        .map(d => ({
            placeId: d.id,
            displayName: d.name,
            formattedAddress: d.description,
            types: ['locality', 'popular'],
            language: 'en',
        }));

    // Debounced search
    const searchDestinations = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 1) {
            setSuggestions(showPopularOnFocus ? popularDestinations : []);
            return;
        }

        setIsLoading(true);
        try {
            const results = await searchCycladesDestinations(searchQuery);
            setSuggestions(results.length > 0 ? results : popularDestinations.filter(p =>
                p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } catch (err) {
            console.error('Search failed:', err);
            // Fallback to filtered popular destinations
            setSuggestions(popularDestinations.filter(p =>
                p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } finally {
            setIsLoading(false);
        }
    }, [showPopularOnFocus]);

    // Handle input change with debounce
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchDestinations(query);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, searchDestinations]);

    // Handle focus
    useEffect(() => {
        if (isFocused && query.length === 0 && showPopularOnFocus) {
            setSuggestions(popularDestinations);
        }
    }, [isFocused, query, showPopularOnFocus]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isFocused || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelect(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsFocused(false);
                inputRef.current?.blur();
                break;
        }
    };

    const handleSelect = (place: LiteApiPlace) => {
        setQuery(place.displayName);
        setIsFocused(false);
        setSelectedIndex(-1);
        onSelect?.(place);
    };

    const clearInput = () => {
        setQuery('');
        setSuggestions(showPopularOnFocus ? popularDestinations : []);
        inputRef.current?.focus();
    };

    const showDropdown = isFocused && (suggestions.length > 0 || isLoading);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Search Input */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-cyan-500' : 'text-gray-400 dark:text-white/40'}`} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`
            w-full pl-12 pr-12 py-4 
            bg-white dark:bg-dark-card 
            border-2 border-gray-200 dark:border-white/10
            rounded-2xl
            text-gray-900 dark:text-white 
            placeholder-gray-400 dark:placeholder-white/40
            focus:outline-none focus:border-cyan-500 dark:focus:border-cyclades-turquoise
            transition-all duration-200
            text-lg
            shadow-sm hover:shadow-md focus:shadow-lg
          `}
                />

                {/* Clear / Loading indicator */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />
                    ) : query.length > 0 ? (
                        <button
                            onClick={clearInput}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400 dark:text-white/40" />
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
                    >
                        {/* Header when showing popular */}
                        {query.length === 0 && showPopularOnFocus && (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                                    <Navigation className="w-4 h-4" />
                                    Popular Destinations
                                </div>
                            </div>
                        )}

                        {/* Suggestions List */}
                        <div className="max-h-80 overflow-y-auto py-2">
                            {suggestions.map((place, index) => {
                                const destination = getDestinationById(place.placeId);
                                const isSelected = index === selectedIndex;

                                return (
                                    <button
                                        key={`${place.placeId}-${index}`}
                                        onClick={() => handleSelect(place)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`
                      w-full px-4 py-3 flex items-start gap-3 text-left transition-colors
                      ${isSelected
                                                ? 'bg-cyan-50 dark:bg-cyclades-turquoise/10'
                                                : 'hover:bg-gray-50 dark:hover:bg-white/5'
                                            }
                    `}
                                    >
                                        <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                      ${isSelected
                                                ? 'bg-cyan-500 dark:bg-cyclades-turquoise'
                                                : 'bg-gray-100 dark:bg-white/10'
                                            }
                    `}>
                                            <MapPin className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500 dark:text-white/60'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`font-medium truncate ${isSelected ? 'text-cyan-700 dark:text-cyclades-turquoise' : 'text-gray-900 dark:text-white'}`}>
                                                {place.displayName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-white/50 truncate">
                                                {destination?.description || place.formattedAddress}
                                            </div>
                                        </div>
                                        {place.types.includes('popular') && (
                                            <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full shrink-0">
                                                Popular
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                            <p className="text-xs text-gray-400 dark:text-white/40 text-center">
                                Search for any destination in the Cyclades islands
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
