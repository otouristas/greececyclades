import { useState } from 'react';
import { Grid, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  hotelName: string;
}

export default function ImageGallery({ images, hotelName }: ImageGalleryProps) {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (viewMode === 'grid') {
    return (
      <div className="relative h-[70vh]">
        <div className="grid grid-cols-4 grid-rows-2 gap-1 h-full">
          {images.slice(0, 8).map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={image}
                alt={`${hotelName} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 7 && images.length > 8 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    +{images.length - 8} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setViewMode('slider')}
          className="absolute top-20 right-4 bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors z-20"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-[70vh]'}`}>
      {/* Main Image */}
      <div className="relative h-full">
        <img
          src={images[currentIndex]}
          alt={`${hotelName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* View Controls */}
        <div className="absolute top-20 right-4 flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className="bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 ${currentIndex === index ? 'ring-2 ring-white' : ''}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 w-24 object-cover rounded"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
