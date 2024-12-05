import React, { useState } from 'react';
import { Hotel } from '../../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  hotel: Hotel;
}

export default function Gallery({ hotel }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    hotel.image,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
  ];

  return (
    <section id="gallery" className="py-16 border-t">
      <h2 className="text-3xl font-bold mb-8">Photo Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={() => setSelectedImage((prev) => (prev! - 1 + images.length) % images.length)}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <img
            src={images[selectedImage]}
            alt={`Gallery ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={() => setSelectedImage((prev) => (prev! + 1) % images.length)}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}