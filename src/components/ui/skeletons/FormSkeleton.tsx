import { Skeleton } from '../skeleton';

interface FormSkeletonProps {
  fields?: number;
  showSubmit?: boolean;
  className?: string;
}

export default function FormSkeleton({
  fields = 5,
  showSubmit = true,
  className = ''
}: FormSkeletonProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      {showSubmit && (
        <div className="pt-4">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}


