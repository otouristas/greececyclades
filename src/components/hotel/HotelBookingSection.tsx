import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImageGalleryDialog } from './ImageGalleryDialog';
import { determineHotelImageUrl } from '@/utils/image-utils';

interface HotelBookingSectionProps {
  hotel: any;
}

export default function HotelBookingSection({ hotel }: HotelBookingSectionProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openRoomGallery = (roomImages: any[], startIndex: number = 0) => {
    setGalleryImages(roomImages);
    setGalleryIndex(startIndex);
    setGalleryOpen(true);
  };

  if (!hotel?.hotel_rooms || hotel.hotel_rooms.length === 0) {
    return null;
  }

  return (
    <>
      <section id="booking-section" className="mb-16">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
            <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Available Rooms</h2>
          </div>

          {/* Room List Accordion */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {hotel.hotel_rooms.map((room: any, index: number) => {
                // Get room images - use room.photo_url or room.image_url
                const roomImageUrl = room.photo_url || room.image_url || determineHotelImageUrl(hotel);
                const roomImages = [
                  { id: room.id, photo_url: roomImageUrl, description: room.name }
                ];

                // Additional services (mock data - can be enhanced with real data)
                const additionalServices = [
                  'Spa & Wellness',
                  'In-room Fitness Kits',
                  'Dry Cleaning & Laundry',
                  'Kid Zones & Childcare',
                  'Welcome Gifts & Treats'
                ];

                return (
                  <AccordionItem 
                    key={room.id || index} 
                    value={`room-${index}`}
                    className="border border-gray-200 rounded-lg mb-4 px-4 data-[state=open]:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-4">
                          <div className="px-3 py-1 bg-sifnos-beige/30 text-sifnos-deep-blue rounded-full text-xs font-semibold">
                            {room.room_type || 'Standard Room'}
                          </div>
                          <h3 className="text-lg font-semibold text-sifnos-deep-blue">
                            {room.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          {room.price && (
                            <div className="flex items-center gap-2">
                              {room.original_price && room.original_price > room.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  €{room.original_price}
                                </span>
                              )}
                              <span className="text-xl font-bold text-sifnos-deep-blue">
                                €{room.price}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <p className="text-gray-700 mb-6">{room.description}</p>
                      
                      {/* Room Gallery */}
                      {roomImageUrl && (
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          <div 
                            className="col-span-1 cursor-pointer group overflow-hidden rounded-lg"
                            onClick={() => openRoomGallery(roomImages, 0)}
                          >
                            <img
                              src={roomImageUrl}
                              alt={room.name}
                              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          {/* Show additional room images if available from hotel photos */}
                          {hotel.hotel_photos?.slice(1, 3).map((photo: any, i: number) => {
                            const additionalImageUrl = determineHotelImageUrl(hotel, photo.photo_url);
                            return (
                              <div 
                                key={photo.id || i}
                                className="col-span-1 cursor-pointer group overflow-hidden rounded-lg"
                                onClick={() => openRoomGallery([...roomImages, photo], i + 1)}
                              >
                                <img
                                  src={additionalImageUrl}
                                  alt={photo.description || `${room.name} - Photo ${i + 2}`}
                                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            );
                          })}
                          {/* Fill remaining slots if less than 3 images */}
                          {(!hotel.hotel_photos || hotel.hotel_photos.length < 3) && [1, 2].slice(0, 3 - (hotel.hotel_photos?.length || 1)).map((i) => (
                            <div 
                              key={`placeholder-${i}`}
                              className="col-span-1 bg-gray-100 rounded-lg flex items-center justify-center"
                            >
                              <span className="text-xs text-gray-400">Room Photo</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Additional Services */}
                      <div className="mb-6">
                        <h6 className="text-sm font-semibold text-gray-700 mb-3">Additional Services -</h6>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {additionalServices.map((service, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="h-4 w-4 text-sifnos-turquoise flex-shrink-0" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Book Now Button */}
                      <div>
                        {hotel.booking_url ? (
                          <a 
                            href={hotel.booking_url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full"
                          >
                            <Button className="w-full bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-semibold py-6">
                              Book Now
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </a>
                        ) : (
                          <Button className="w-full bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-semibold py-6">
                            Request Availability
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Room Gallery Dialog */}
      {galleryOpen && galleryImages.length > 0 && (
        <ImageGalleryDialog
          images={galleryImages.map((img, idx) => ({
            id: img.id || `room-img-${idx}`,
            photo_url: img.photo_url,
            description: img.description || 'Room photo'
          }))}
          activeImageIndex={galleryIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          hotelName={hotel.name}
        />
      )}
    </>
  );
}

