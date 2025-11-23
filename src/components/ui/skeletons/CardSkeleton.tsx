import { Skeleton } from '../skeleton';

interface CardSkeletonProps {
  variant?: 'default' | 'compact' | 'detailed';
  showImage?: boolean;
  showDescription?: boolean;
  className?: string;
}

export default function CardSkeleton({
  variant = 'default',
  showImage = true,
  showDescription = true,
  className = ''
}: CardSkeletonProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {showImage && (
        <Skeleton className={`w-full ${isCompact ? 'h-32' : isDetailed ? 'h-64' : 'h-48'}`} />
      )}
      <div className={`${showImage ? 'p-4' : 'p-6'}`}>
        <Skeleton className="h-5 w-3/4 mb-2" />
        {showDescription && (
          <>
            <Skeleton className={`h-4 w-full mb-2 ${isCompact ? 'hidden' : ''}`} />
            <Skeleton className={`h-4 w-5/6 ${isCompact ? 'hidden' : ''}`} />
          </>
        )}
        {isDetailed && (
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        )}
        {!isCompact && (
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}


