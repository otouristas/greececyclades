import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
  className?: string;
}

export default function RatingFilter({
  value,
  onChange,
  className = ''
}: RatingFilterProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    onChange(value === rating ? 0 : rating);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        Minimum Rating
      </label>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingClick(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            className={`transition-colors ${
              rating <= (hoveredRating || value)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            aria-label={`${rating} stars`}
          >
            <Star
              className={`h-6 w-6 ${
                rating <= (hoveredRating || value) ? 'fill-current' : ''
              }`}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="text-sm text-gray-600 ml-2">
            {value}+ stars
          </span>
        )}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="0">Any Rating</option>
        <option value="1">1+ Stars</option>
        <option value="2">2+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="4.5">4.5+ Stars</option>
        <option value="5">5 Stars Only</option>
      </select>
    </div>
  );
}


