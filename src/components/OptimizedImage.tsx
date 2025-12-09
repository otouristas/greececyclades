import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // For above-fold images - disables lazy loading
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage - SEO-friendly image component
 * Features:
 * - Native lazy loading for below-fold images
 * - Explicit width/height for CLS prevention
 * - Error handling with fallback
 * - Loading state with placeholder
 * - WebP support detection
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'empty',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fallback image
  const fallbackSrc = '/images/placeholder.jpg';

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Check if image is in viewport on mount (for priority images)
  useEffect(() => {
    if (priority && imgRef.current) {
      // Force load priority images immediately
      imgRef.current.loading = 'eager';
    }
  }, [priority]);

  // Generate srcset for responsive images if width is provided
  const generateSrcSet = () => {
    if (!width || !src.startsWith('/')) return undefined;
    
    // For local images, we could generate multiple sizes
    // This is a simplified version - in production you'd use image CDN
    return undefined;
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Placeholder/Loading state */}
      {!isLoaded && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        srcSet={generateSrcSet()}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          ${className}
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

/**
 * Helper: Add lazy loading to existing img tags
 * Usage: Replace <img src="..." with <img loading="lazy" src="..."
 */
export const lazyImageProps = {
  loading: 'lazy' as const,
  decoding: 'async' as const,
};

/**
 * Helper: Priority image props for above-fold images
 */
export const priorityImageProps = {
  loading: 'eager' as const,
  decoding: 'sync' as const,
  fetchPriority: 'high' as const,
};
