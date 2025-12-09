import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageGalleryDialog } from './ImageGalleryDialog';
import { determineHotelImageUrl } from '@/utils/image-utils';

interface HotelGallerySectionProps {
  hotel: any;
  onImageClick?: (index: number) => void;
}

export default function HotelGallerySection({ hotel, onImageClick }: HotelGallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  if (!hotel?.hotel_photos || hotel.hotel_photos.length === 0) {
    return null;
  }

  const photos = hotel.hotel_photos;
  const mainPhoto = photos.find((p: any) => p.is_main_photo) || photos[0];
  const currentPhoto = photos[currentIndex] || photos[0] || mainPhoto;
  
  // Get thumbnail images (show all photos, excluding the current one being displayed)
  const thumbnailPhotos = photos
    .filter((photo: any, index: number) => {
      // Exclude the current photo being shown in main slider
      return index !== currentIndex;
    });

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    // Find the actual index in the photos array
    const clickedPhoto = thumbnailPhotos[index];
    if (clickedPhoto) {
      const photoIndex = photos.findIndex((p: any) => 
        (p.id && clickedPhoto.id && p.id === clickedPhoto.id) || 
        (p.photo_url === clickedPhoto.photo_url)
      );
      if (photoIndex !== -1) {
        setCurrentIndex(photoIndex);
      }
    }
  };

  const handleViewMore = () => {
    setGalleryOpen(true);
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  const currentImageUrl = determineHotelImageUrl(hotel, currentPhoto.photo_url);

  return (
    <>
      <section className="mb-16">
        <div className="page-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {/* Main Slider - Left Side */}
            <div className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-3 relative group">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={currentImageUrl}
                  alt={currentPhoto.description || `${hotel.name} photo ${currentIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Navigation Buttons */}
                {photos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handlePrev}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleNext}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {photos.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {photos.length}
                  </div>
                )}

                {/* View More Images Button */}
                {photos.length > 5 && (
                  <div className="absolute bottom-4 right-4">
                    <Button
                      onClick={handleViewMore}
                      className="bg-white/90 hover:bg-white text-sifnos-deep-blue font-semibold shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      View More Images
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Grid - Right Side (40% on large screens) */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto">
              {thumbnailPhotos.map((photo: any, index: number) => {
                const thumbnailUrl = determineHotelImageUrl(hotel, photo.photo_url);
                // Find the actual index in the photos array
                const actualIndex = photos.findIndex((p: any) => 
                  (p.id && photo.id && p.id === photo.id) || 
                  (p.photo_url === photo.photo_url)
                );
                return (
                  <div
                    key={photo.id || index}
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                    onClick={() => {
                      if (actualIndex !== -1) {
                        setCurrentIndex(actualIndex);
                      }
                    }}
                  >
                    <div className="aspect-square w-full h-full">
                      <img
                        src={thumbnailUrl}
                        alt={photo.description || `${hotel.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    {/* Active indicator */}
                    {actualIndex === currentIndex && (
                      <div className="absolute inset-0 border-2 border-sifnos-turquoise" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Full Gallery Dialog */}
      {galleryOpen && (
        <ImageGalleryDialog
          images={photos}
          activeImageIndex={currentIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          hotelName={hotel.name}
        />
      )}
    </>
  );
}

