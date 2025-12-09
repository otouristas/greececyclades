import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import { Scale, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompareButtonProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    price?: number;
    rating?: number;
    image: string;
    amenities?: string[];
  };
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
}

export function CompareButton({ 
  hotel, 
  variant = 'outline', 
  size = 'sm',
  className,
  showLabel = false
}: CompareButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison, comparisonCount, maxCompare } = useComparison();
  const inComparison = isInComparison(hotel.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeFromComparison(hotel.id);
    } else {
      addToComparison(hotel);
    }
  };

  const isDisabled = !inComparison && comparisonCount >= maxCompare;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "transition-all duration-200",
        inComparison && "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
        className
      )}
      aria-label={inComparison ? "Remove from comparison" : "Add to comparison"}
    >
      {inComparison ? (
        <X className="h-4 w-4" />
      ) : (
        <Scale className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="ml-2">
          {inComparison ? "Remove" : "Compare"}
        </span>
      )}
      {inComparison && !showLabel && (
        <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
          ✓
        </Badge>
      )}
    </Button>
  );
}
