import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  className?: string;
}

export default function PriceRangeFilter({
  min = 0,
  max = 1000,
  step = 50,
  value,
  onChange,
  className = ''
}: PriceRangeFilterProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= localValue[1]) {
      const newValue: [number, number] = [newMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= localValue[0]) {
      const newValue: [number, number] = [localValue[0], newMax];
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Price Range
        </label>
        <span className="text-sm text-gray-600">
          €{localValue[0]} - €{localValue[1]}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={localValue[0]}
            onChange={handleMinChange}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={handleMaxChange}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[0]}
            onChange={handleMinChange}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(localValue[0] / max) * 100}%, #e5e7eb ${(localValue[0] / max) * 100}%, #e5e7eb 100%)`
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={handleMaxChange}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(localValue[1] / max) * 100}%, #3b82f6 ${(localValue[1] / max) * 100}%, #3b82f6 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}

