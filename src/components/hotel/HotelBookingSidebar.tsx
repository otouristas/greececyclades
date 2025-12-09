import { CheckCircle2, Shield, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHotelLogoUrl, getBookingPlatformLogo } from '@/utils/hotel-utils';

interface HotelBookingSidebarProps {
  hotel: any;
  onCheckAvailability?: () => void;
  onEnquiry?: () => void;
}

export default function HotelBookingSidebar({ 
  hotel, 
  onCheckAvailability,
  onEnquiry 
}: HotelBookingSidebarProps) {
  const logoUrl = getHotelLogoUrl(hotel);
  
  // Calculate discount if price exists
  const hasDiscount = hotel?.price && hotel?.original_price && hotel.original_price > hotel.price;
  const discountPercent = hasDiscount 
    ? Math.round(((hotel.original_price - hotel.price) / hotel.original_price) * 100)
    : null;

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onCheckAvailability) {
      onCheckAvailability();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg border border-gray-100 overflow-hidden">
        {/* Discount Badge */}
        {discountPercent && (
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {discountPercent}% Off
              </span>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          {/* Logo */}
          {logoUrl && (
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 bg-white flex items-center justify-center">
                <img 
                  src={logoUrl} 
                  alt={`${hotel?.name} logo`} 
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                  style={{ imageRendering: 'crisp-edges' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Price Area */}
          <div className="text-center mb-6">
            <h6 className="text-sm text-gray-600 mb-2 font-medium">Starting From</h6>
            <div className="flex items-center justify-center gap-2">
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  €{hotel.original_price}
                </span>
              )}
              <span className="text-3xl font-bold text-sifnos-deep-blue">
                €{hotel?.price || 'N/A'}
                <sub className="text-sm font-normal text-gray-600 ml-1">/per night</sub>
              </span>
            </div>
          </div>

          {/* Guarantees */}
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-sifnos-turquoise flex-shrink-0" />
              <span>Money Back Guarantee</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <Shield className="h-4 w-4 text-sifnos-turquoise flex-shrink-0" />
              <span>Your Safety is Our Top Priority</span>
            </li>
          </ul>

          {/* Booking Platform Logo */}
          {hotel?.booking_url && hotel?.booking_platform && getBookingPlatformLogo(hotel.booking_platform) && (
            <div className="mb-4 h-10 flex justify-center">
              <img 
                src={getBookingPlatformLogo(hotel.booking_platform)} 
                alt={hotel.booking_platform} 
                className="h-full object-contain"
              />
            </div>
          )}

          {/* Check Availability Button */}
          <Button 
            onClick={scrollToBooking}
            className="w-full bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-semibold text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
          >
            Check Availability
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Submit Enquiry Button */}
          <Button 
            onClick={onEnquiry}
            variant="outline"
            className="w-full border-2 border-sifnos-deep-blue text-sifnos-deep-blue hover:bg-sifnos-deep-blue hover:text-white font-semibold py-6 transition-all duration-300"
          >
            Submit an Enquiry
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Bonus Activity Notice */}
          <div className="mt-6 p-4 bg-sifnos-beige/20 rounded-lg border border-sifnos-beige/40">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-sifnos-turquoise flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">
                <strong className="text-sifnos-deep-blue">Bonus Activity Included</strong> – Limited Time!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

