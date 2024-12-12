import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useIslandStore } from '../../store/islandStore';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LocationAutocomplete({ value, onChange }: LocationAutocompleteProps) {
  const { islands } = useIslandStore();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when input changes
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const islandSuggestions = islands
      .map(island => island.name)
      .filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );

    // Add airports for main islands
    const airportSuggestions = islands
      .map(island => `${island.name} Airport`)
      .filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );

    // Add ports for main islands
    const portSuggestions = islands
      .map(island => `${island.name} Port`)
      .filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );

    const allSuggestions = [...islandSuggestions, ...airportSuggestions, ...portSuggestions];
    setSuggestions(allSuggestions);
  }, [value, islands]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60"
          placeholder="Island, Airport, or Port"
        />
        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onChange(suggestion);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
