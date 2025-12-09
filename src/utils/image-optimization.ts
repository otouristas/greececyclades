/**
 * Image optimization utilities for Phase 10
 * Handles WebP conversion, responsive sizes, and lazy loading
 */

export interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

export const IMAGE_SIZES: Record<string, ImageSize> = {
  thumbnail: { width: 400, height: 300, suffix: '-thumb' },
  card: { width: 800, height: 600, suffix: '-card' },
  hero: { width: 1920, height: 1080, suffix: '-hero' },
  full: { width: 2560, height: 1440, suffix: '-full' }
};

/**
 * Generates responsive image srcset for WebP and fallback
 * @param basePath Base image path without extension
 * @param sizes Image sizes to generate
 * @returns Object with srcSet and fallback src
 */
export function generateResponsiveImageSet(
  basePath: string,
  sizes: string[] = ['card', 'hero']
): { srcSet: string; src: string; srcSetWebP: string } {
  const srcSetParts: string[] = [];
  const srcSetWebPParts: string[] = [];
  
  sizes.forEach((size) => {
    const sizeConfig = IMAGE_SIZES[size];
    if (sizeConfig) {
      // For now, return original path - actual WebP conversion would happen server-side
      // In production, you'd have: /uploads/hotels/image-card.webp 800w
      srcSetParts.push(`${basePath} ${sizeConfig.width}w`);
      srcSetWebPParts.push(`${basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')} ${sizeConfig.width}w`);
    }
  });

  return {
    srcSet: srcSetParts.join(', '),
    srcSetWebP: srcSetWebPParts.join(', '),
    src: basePath // Fallback
  };
}

/**
 * Checks if browser supports WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Gets the best image format for the browser
 * @param basePath Image path
 * @returns Optimized image path
 */
export function getOptimizedImagePath(basePath: string): string {
  if (supportsWebP() && !basePath.endsWith('.webp')) {
    // Try WebP version if supported
    return basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return basePath;
}

/**
 * Generates descriptive alt text for hotel images
 * @param hotelName Hotel name
 * @param location Location
 * @param features Key features (e.g., "caldera view", "infinity pool")
 * @returns Descriptive alt text
 */
export function generateHotelImageAltText(
  hotelName: string,
  location: string,
  features: string[] = []
): string {
  const featureText = features.length > 0 ? ` with ${features.join(', ')}` : '';
  return `${hotelName} - ${location}, Santorini${featureText}. Luxury accommodation with stunning views and premium amenities.`;
}

/**
 * Creates a blur-up placeholder (base64 encoded tiny image)
 * This would typically be generated server-side, but we can create a simple placeholder
 */
export function createBlurPlaceholder(width: number = 20, height: number = 15): string {
  // In production, this would be a base64-encoded tiny version of the actual image
  // For now, return a simple data URI placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL('image/jpeg', 0.1);
}

