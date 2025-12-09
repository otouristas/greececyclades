import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, MapPin, Wifi, Coffee, Euro } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonHotel {
  id: string;
  name: string;
  location: string;
  price?: number;
  rating?: number;
  image: string;
  amenities: string[];
  pros: string[];
  cons: string[];
}

interface HotelComparisonProps {
  hotels: ComparisonHotel[];
  maxCompare?: number;
}

export function HotelComparison({ hotels, maxCompare = 5 }: HotelComparisonProps) {
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);

  const toggleHotel = (hotelId: string) => {
    if (selectedHotels.includes(hotelId)) {
      setSelectedHotels(selectedHotels.filter(id => id !== hotelId));
    } else if (selectedHotels.length < maxCompare) {
      setSelectedHotels([...selectedHotels, hotelId]);
    }
  };

  const compareHotels = hotels.filter(h => selectedHotels.includes(h.id));
  const allAmenities = [...new Set(compareHotels.flatMap(h => h.amenities))];

  return (
    <div className="space-y-6">
      {/* Hotel Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Select up to {maxCompare} hotels to compare
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {hotels.map(hotel => (
            <Card
              key={hotel.id}
              className={cn(
                "cursor-pointer transition-all",
                selectedHotels.includes(hotel.id) && "ring-2 ring-primary"
              )}
              onClick={() => toggleHotel(hotel.id)}
            >
              <CardContent className="p-3">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h4 className="font-medium text-sm line-clamp-2">{hotel.name}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {hotel.rating}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {compareHotels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hotel Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b">Feature</th>
                    {compareHotels.map(hotel => (
                      <th key={hotel.id} className="text-center p-3 border-b min-w-[200px]">
                        <div className="font-semibold">{hotel.name}</div>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {hotel.location}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr>
                    <td className="p-3 border-b font-medium">Price per night</td>
                    {compareHotels.map(hotel => (
                      <td key={hotel.id} className="text-center p-3 border-b">
                        <div className="text-xl font-bold text-green-600">
                          €{hotel.price}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 border-b font-medium">Rating</td>
                    {compareHotels.map(hotel => (
                      <td key={hotel.id} className="text-center p-3 border-b">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{hotel.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Amenities */}
                  {allAmenities.map(amenity => (
                    <tr key={amenity}>
                      <td className="p-3 border-b">{amenity}</td>
                      {compareHotels.map(hotel => (
                        <td key={hotel.id} className="text-center p-3 border-b">
                          {hotel.amenities.includes(amenity) ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Pros */}
                  <tr>
                    <td className="p-3 border-b font-medium">Pros</td>
                    {compareHotels.map(hotel => (
                      <td key={hotel.id} className="p-3 border-b">
                        <ul className="text-sm space-y-1">
                          {hotel.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr>
                    <td className="p-3 font-medium">Cons</td>
                    {compareHotels.map(hotel => (
                      <td key={hotel.id} className="p-3">
                        <ul className="text-sm space-y-1">
                          {hotel.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <X className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              {compareHotels.map(hotel => (
                <Button key={hotel.id} className="flex-1">
                  View {hotel.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
