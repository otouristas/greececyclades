import { Skeleton } from '../skeleton';
import { MapPin } from 'lucide-react';

interface MapSkeletonProps {
  height?: string;
  showControls?: boolean;
  className?: string;
}

export default function MapSkeleton({
  height = '400px',
  showControls = true,
  className = ''
}: MapSkeletonProps) {
  return (
    <div className={`relative ${className}`}>
      <Skeleton className="w-full rounded-lg" style={{ height }} />
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}

