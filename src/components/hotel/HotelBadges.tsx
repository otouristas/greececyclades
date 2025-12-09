import { Badge } from '@/components/ui/badge';
import { Star, Award, Zap } from 'lucide-react';

interface HotelBadgesProps {
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  roomsLeft?: number;
  className?: string;
}

export function HotelBadges({ 
  isFeatured, 
  isEditorsPick, 
  roomsLeft,
  className = '' 
}: HotelBadgesProps) {
  return (
    <div className={`absolute top-2 left-2 flex flex-col gap-2 z-10 ${className}`}>
      {isFeatured && (
        <Badge className="bg-accent-gold text-white border-0 shadow-md">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      )}
      {isEditorsPick && (
        <Badge className="bg-sifnos-deep-blue text-white border-0 shadow-md">
          <Award className="w-3 h-3 mr-1" />
          Editor's Pick
        </Badge>
      )}
      {roomsLeft !== undefined && roomsLeft > 0 && roomsLeft <= 3 && (
        <Badge className="bg-urgent-orange text-white border-0 shadow-md animate-pulse">
          <Zap className="w-3 h-3 mr-1" />
          Only {roomsLeft} left!
        </Badge>
      )}
    </div>
  );
}

