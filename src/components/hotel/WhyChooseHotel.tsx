import { CheckCircle, Star, MapPin, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WhyChooseHotelProps {
  hotel: any;
}

export default function WhyChooseHotel({ hotel }: WhyChooseHotelProps) {
  // Generate unique selling points based on hotel data
  const usps = [
    hotel?.rating && hotel.rating >= 4.5 && {
      icon: Star,
      title: 'Highly Rated',
      description: `Rated ${hotel.rating.toFixed(1)} by our guests`
    },
    hotel?.location && {
      icon: MapPin,
      title: 'Prime Location',
      description: `Located in ${hotel.location}`
    },
    hotel?.hotel_amenities?.some((a: any) => a.amenity.toLowerCase().includes('pool')) && {
      icon: Sparkles,
      title: 'Swimming Pool',
      description: 'Relax by the pool'
    },
    hotel?.booking_platform && {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Book with confidence'
    },
    hotel?.short_description && {
      icon: CheckCircle,
      title: 'Authentic Experience',
      description: hotel.short_description.substring(0, 80) + '...'
    }
  ].filter(Boolean).slice(0, 4);

  if (usps.length === 0) return null;

  return (
    <div className="cycladic-card p-8 md:p-10 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
        <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Why Choose {hotel?.name}?</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usps.map((usp: any, index: number) => {
          const Icon = usp.icon;
          return (
            <Card key={index} className="border-2 border-gray-100 hover:border-sifnos-turquoise/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-sifnos-turquoise" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-sifnos-deep-blue mb-2">{usp.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{usp.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

