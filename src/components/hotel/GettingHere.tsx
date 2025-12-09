import { Link } from 'react-router-dom';
import { Ship, Car, MapPin, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GettingHereProps {
  hotel: any;
}

export default function GettingHere({ hotel }: GettingHereProps) {
  if (!hotel?.location) return null;

  return (
    <div className="cycladic-card p-8 md:p-10 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
        <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Getting Here</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ferry Information */}
        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center">
                <Ship className="h-6 w-6 text-sifnos-turquoise" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-sifnos-deep-blue mb-2">By Ferry</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Sifnos is accessible by ferry from Piraeus (Athens), Milos, Serifos, and other Cycladic islands.
                </p>
                <Link to="/ferry-tickets">
                  <span className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium">
                    View Ferry Schedules & Book Tickets →
                  </span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transportation from Port */}
        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-sifnos-turquoise" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-sifnos-deep-blue mb-2">From Athinios Port</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {`Take a taxi, bus, or rent a car from Athinios port to reach ${hotel.location}. The journey takes approximately ${
                    hotel.location === 'Fira' ? '10-15 minutes' :
                    hotel.location === 'Oia' ? '20-25 minutes' :
                    hotel.location === 'Kamari' || hotel.location === 'Perissa' ? '15-20 minutes' :
                    '15-25 minutes'
                  }.`
                  }
                </p>
                <Link to="/travel-guide#transportation">
                  <span className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium">
                    Transportation Guide →
                  </span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking Information */}
        {hotel?.hotel_amenities?.some((a: any) => a.amenity.toLowerCase().includes('parking')) && (
          <Card className="border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-sifnos-turquoise" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-sifnos-deep-blue mb-2">Parking</h3>
                  <p className="text-gray-600 text-sm">
                    Free parking is available for guests. Spaces may be limited during peak season.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Directions */}
        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center">
                <Navigation className="h-6 w-6 text-sifnos-turquoise" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-sifnos-deep-blue mb-2">Directions</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {hotel.location} is easily accessible from the main port. Follow signs from Athinios port.
                </p>
                {hotel?.google_map_url && (
                  <a 
                    href={hotel.google_map_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-sifnos-deep-blue hover:text-sifnos-turquoise hover:underline font-medium"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

