import { Skeleton } from '../skeleton';

interface ListSkeletonProps {
  count?: number;
  showImage?: boolean;
  showDescription?: boolean;
  className?: string;
}

export default function ListSkeleton({
  count = 5,
  showImage = true,
  showDescription = true,
  className = ''
}: ListSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg"
        >
          {showImage && (
            <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            {showDescription && (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </>
            )}
            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

