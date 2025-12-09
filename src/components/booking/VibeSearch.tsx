import { Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface VibeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const VIBE_SUGGESTIONS = [
  'Romantic sunset views with infinity pool',
  'Family-friendly beach hotel',
  'Luxury cave hotel with caldera views',
  'Budget-friendly boutique hotel',
  'Honeymoon suite with private jacuzzi',
  'Traditional Cycladic architecture',
  'Modern hotel with spa facilities',
  'Quiet retreat away from crowds',
];

export function VibeSearch({ value, onChange, placeholder = 'Describe your ideal hotel...' }: VibeSearchProps) {
  return (
    <div>
      <Label htmlFor="vibe-search" className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4" />
        Hotel Vibe
      </Label>
      <textarea
        id="vibe-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sifnos-turquoise resize-none"
      />
      
      {/* Suggestions */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Try these:</p>
        <div className="flex flex-wrap gap-2">
          {VIBE_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onChange(suggestion)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-sifnos-turquoise hover:text-white rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

