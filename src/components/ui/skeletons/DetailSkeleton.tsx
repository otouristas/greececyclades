import { Skeleton } from '../skeleton';

interface DetailSkeletonProps {
  showGallery?: boolean;
  showSidebar?: boolean;
  className?: string;
}

export default function DetailSkeleton({
  showGallery = true,
  showSidebar = true,
  className = ''
}: DetailSkeletonProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Hero/Gallery Section */}
      {showGallery && (
        <Skeleton className="w-full h-96 rounded-xl" />
      )}

      {/* Main Content */}
      <div className={`grid ${showSidebar ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
        {/* Main Content Area */}
        <div className={showSidebar ? 'lg:col-span-2' : ''}>
          {/* Title and Meta */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Features/Highlights */}
          <div className="mb-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Additional Sections */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


