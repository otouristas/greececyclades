import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageGalleryDialog } from './ImageGalleryDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { getOptimizedImagePath } from '@/utils/image-optimization';

interface HotelImageCarouselProps {
  images: Array<{
    id?: string;
    photo_url: string;
    description?: string;
  }>;
  hotelName: string;
  className?: string;
}

export function HotelImageCarousel({ 
  images, 
  hotelName,
  className = '' 
}: HotelImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5); // Show max 5 images
  const hasMoreImages = images.length > 5;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const openGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  const currentImage = displayImages[currentIndex];
  const imageSrc = currentImage.photo_url.startsWith('/') ? currentImage.photo_url : `/uploads/hotels/${currentImage.photo_url}`;
  const optimizedImageSrc = getOptimizedImagePath(imageSrc);

  return (
    <>
      <div className={`relative h-48 overflow-hidden group ${className}`}>
        <img
          src={optimizedImageSrc}
          alt={currentImage.description || `${hotelName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Navigation arrows - show on hover */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4 text-sifnos-deep-blue" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4 text-sifnos-deep-blue" />
            </Button>
          </>
        )}

        {/* Quick view button - show on hover */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity text-xs"
          onClick={openGallery}
        >
          <Maximize2 className="h-3 w-3 mr-1" />
          Quick View
        </Button>

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}

        {/* More images indicator */}
        {hasMoreImages && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            +{images.length - 5} more
          </div>
        )}
      </div>

      {/* Image Gallery Dialog */}
      <ImageGalleryDialog
        images={images.map((img, idx) => {
          const imgSrc = img.photo_url.startsWith('/') ? img.photo_url : `/uploads/hotels/${img.photo_url}`;
          return {
            id: img.id || `img-${idx}`,
            photo_url: getOptimizedImagePath(imgSrc),
            description: img.description
          };
        })}
        activeImageIndex={currentIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        hotelName={hotelName}
      />
    </>
  );
}

