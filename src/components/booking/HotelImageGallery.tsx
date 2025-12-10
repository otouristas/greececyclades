import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Grid3X3, Expand, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import type { HotelImage } from '@/lib/liteapi';

interface HotelImageGalleryProps {
  images: HotelImage[];
  hotelName: string;
}

export function HotelImageGallery({ images, hotelName }: HotelImageGalleryProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-64 rounded-2xl flex items-center justify-center ${isDark ? 'bg-dark-card border border-white/10' : 'bg-gray-200'}`}>
        <p className={isDark ? 'text-white/50' : 'text-gray-400'}>No images available</p>
      </div>
    );
  }

  const mainImage = images[selectedIndex] || images[0];
  // Show up to 4 thumbnail images for the grid layout
  const gridImages = images.slice(0, 5);
  const hasMorePhotos = images.length > 5;

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
  }, [images.length]);

  function openLightbox(index: number) {
    setSelectedIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Get best quality image URL
  const getBestUrl = (image: HotelImage) => image.urlHd || image.url;

  return (
    <>
      {/* Airbnb-style Grid Gallery */}
      <div className="relative w-full">
        <div className="grid grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
          {/* Main Large Image */}
          <div
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <img
              src={getBestUrl(gridImages[0])}
              alt={gridImages[0].caption || `${hotelName} - Main`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ imageRendering: 'auto' }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-white/90 text-gray-900' : 'bg-white/95 text-gray-900'} shadow-lg`}>
                <ZoomIn className="w-4 h-4" />
                View Photo
              </div>
            </div>
          </div>

          {/* Grid of smaller images */}
          {gridImages.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={getBestUrl(image)}
                alt={image.caption || `${hotelName} - ${index + 2}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ imageRendering: 'auto' }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

              {/* Show "View all photos" button on last grid item */}
              {index === 3 && hasMorePhotos && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); openLightbox(4); }}
                    className="bg-white hover:bg-white text-gray-900 font-medium shadow-lg"
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    +{images.length - 4} photos
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Show All Photos Button (bottom right) */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-white hover:bg-white text-gray-900 font-medium shadow-lg border border-gray-200"
        >
          <Expand className="w-4 h-4 mr-2" />
          Show all photos
        </Button>

        {/* Navigation Arrows (always visible) */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-20 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg border border-gray-200"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </Button>
          </>
        )}
      </div>

      {/* Full-Screen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          onClick={closeLightbox}
        >
          {/* Lightbox Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-black/80">
            <div className="text-white font-medium">
              {selectedIndex + 1} / {images.length}
              {images[selectedIndex]?.caption && (
                <span className="ml-3 text-white/70 text-sm">
                  {images[selectedIndex].caption}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center px-4 relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={getBestUrl(images[selectedIndex])}
              alt={images[selectedIndex]?.caption || `${hotelName} - Image ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{ imageRendering: 'auto' }}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Loading indicator */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex-shrink-0 py-3 px-4 bg-black/80 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                    setImageLoaded(false);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${selectedIndex === index
                      ? 'ring-2 ring-white scale-110'
                      : 'ring-1 ring-white/30 opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
