import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HotelImage } from '@/lib/liteapi';

interface HotelImageGalleryProps {
  images: HotelImage[];
  hotelName: string;
}

export function HotelImageGallery({ images, hotelName }: HotelImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const mainImage = images[selectedIndex] || images[0];
  const thumbnailImages = images.slice(0, 6); // Show up to 6 thumbnails

  function nextImage() {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function openLightbox(index: number) {
    setSelectedIndex(index);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % images.length);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full">
        {/* Main Image */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gray-200 rounded-2xl overflow-hidden group shadow-2xl">
          <img
            src={mainImage.urlHd || mainImage.url}
            alt={mainImage.caption || `${hotelName} - Image ${selectedIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
            onClick={() => openLightbox(selectedIndex)}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {thumbnailImages.length > 1 && (
          <div className="grid grid-cols-6 gap-3 mt-6">
            {thumbnailImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all shadow-md hover:shadow-lg ${
                  selectedIndex === index
                    ? 'border-sifnos-turquoise ring-4 ring-sifnos-turquoise/30 scale-105'
                    : 'border-gray-200 hover:border-sifnos-turquoise/50'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.caption || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-sifnos-turquoise/10" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].urlHd || images[selectedIndex].url}
              alt={images[selectedIndex].caption || `${hotelName} - Image ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}

            {images[selectedIndex].caption && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm max-w-2xl text-center">
                {images[selectedIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

