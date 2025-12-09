import { Star } from 'lucide-react';

interface ReviewScoreProps {
  rating: number;
  reviewCount?: number;
  source?: string;
  className?: string;
}

export function ReviewScore({ 
  rating, 
  reviewCount, 
  source = 'reviews',
  className = '' 
}: ReviewScoreProps) {
  if (!rating || rating === 0) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-gray-300" />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
        {reviewCount !== undefined && reviewCount > 0 && (
          <span className="text-xs text-gray-600">
            ({reviewCount.toLocaleString()} {source})
          </span>
        )}
      </div>
    </div>
  );
}

