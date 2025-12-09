
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGalleryDialogProps {
  images: Array<{
    id: string;
    photo_url: string;
    description?: string;
  }>;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
}

export function ImageGalleryDialog({
  images,
  activeImageIndex,
  isOpen,
  onClose,
  hotelName
}: ImageGalleryDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(activeImageIndex);
  const isMobile = useIsMobile();
  
  // Reset the index when the modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(activeImageIndex);
    }
  }, [isOpen, activeImageIndex]);

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const activeImage = images[currentIndex];
  const imageUrl = `/uploads/hotels/${activeImage?.photo_url}`;

  const galleryContent = (
    <div className="relative flex flex-col items-center h-full">
      {/* Close button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 z-20 rounded-full bg-black/20 hover:bg-black/40 text-white"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      {/* Image */}
      <div className="flex items-center justify-center w-full h-full relative">
        <img 
          src={imageUrl} 
          alt={activeImage?.description || `${hotelName} photo ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain"
        />
        
        {/* Navigation buttons */}
        <Button 
          variant="ghost" 
          className="absolute left-2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="absolute right-2 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
      
      {/* Image counter */}
      <div className="text-sm text-center p-2 bg-black/50 text-white rounded-full px-3 absolute bottom-4">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="h-[90vh] bg-black">
          {galleryContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-black border-none">
        {galleryContent}
      </DialogContent>
    </Dialog>
  );
}
