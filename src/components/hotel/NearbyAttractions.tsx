import { Link } from 'react-router-dom';
import { MapPin, Waves, Utensils, Camera, Mountain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NearbyAttractionsProps {
  hotel: any;
}

export default function NearbyAttractions({ hotel }: NearbyAttractionsProps) {
  if (!hotel?.location) return null;

  const location = hotel.location.toLowerCase();
  
  // Map locations to nearby attractions
  const attractionsMap: Record<string, Array<{ name: string; type: string; distance: string; link: string; icon: any }>> = {
    'oia': [
      { name: 'Oia Castle', type: 'Historic Site', distance: '0.3 km', link: '/locations/oia', icon: Camera },
      { name: 'Ammoudi Bay', type: 'Port', distance: '0.5 km', link: '/locations/ammoudi-bay', icon: MapPin },
      { name: 'Blue Domed Churches', type: 'Landmark', distance: '0.2 km', link: '/santorini-travel-guide#churches', icon: Camera },
    ],
    'fira': [
      { name: 'Fira Town Center', type: 'Town', distance: '0.2 km', link: '/locations/fira', icon: MapPin },
      { name: 'Cable Car to Old Port', type: 'Transport', distance: '0.5 km', link: '/santorini-travel-guide#transport', icon: Camera },
      { name: 'Restaurants & Bars', type: 'Dining', distance: '0.1 km', link: '/santorini-travel-guide#dining', icon: Utensils },
    ],
    'kamari': [
      { name: 'Kamari Beach', type: 'Beach', distance: '0.1 km', link: '/santorini-beaches', icon: Waves },
      { name: 'Ancient Thera', type: 'Archaeological Site', distance: '3 km', link: '/santorini-travel-guide#ancient-thera', icon: Camera },
      { name: 'Beachfront Tavernas', type: 'Dining', distance: '0.2 km', link: '/santorini-travel-guide#dining', icon: Utensils },
    ],
    'perissa': [
      { name: 'Perissa Beach', type: 'Beach', distance: '0.1 km', link: '/santorini-beaches', icon: Waves },
      { name: 'Beach Clubs', type: 'Entertainment', distance: '0.2 km', link: '/santorini-travel-guide#nightlife', icon: Camera },
      { name: 'Water Sports', type: 'Activities', distance: '0.3 km', link: '/santorini-beaches', icon: Waves },
    ],
    'imerovigli': [
      { name: 'Skaros Rock', type: 'Hiking', distance: '0.5 km', link: '/locations/imerovigli', icon: MapPin },
      { name: 'Caldera Views', type: 'Viewpoint', distance: '0.1 km', link: '/locations/imerovigli', icon: Camera },
      { name: 'Fine Dining', type: 'Dining', distance: '0.2 km', link: '/santorini-travel-guide#dining', icon: Utensils },
    ],
    'pyrgos': [
      { name: 'Pyrgos Castle', type: 'Historic Site', distance: '0.2 km', link: '/locations/pyrgos', icon: Camera },
      { name: 'Wine Museums', type: 'Culture', distance: '2 km', link: '/wineries', icon: Camera },
      { name: 'Traditional Tavernas', type: 'Dining', distance: '0.3 km', link: '/santorini-travel-guide#dining', icon: Utensils },
    ],
    'akrotiri': [
      { name: 'Akrotiri Archaeological Site', type: 'Historic Site', distance: '0.5 km', link: '/locations/akrotiri', icon: Camera },
      { name: 'Red Beach', type: 'Beach', distance: '1 km', link: '/santorini-beaches', icon: Waves },
      { name: 'Akrotiri Lighthouse', type: 'Lighthouse', distance: '2 km', link: '/santorini-travel-guide#lighthouse', icon: Camera },
    ],
  };

  const attractions = attractionsMap[location] || [
    { name: 'Nearby Beaches', type: 'Beach', distance: 'Various', link: '/best-beaches-sifnos-guide', icon: Waves },
    { name: 'Local Restaurants', type: 'Dining', distance: 'Various', link: '/travel-guide#dining', icon: Utensils },
    { name: 'Sifnos Attractions', type: 'Sights', distance: 'Various', link: '/travel-guide', icon: Camera },
  ];

  return (
    <div className="cycladic-card p-8 md:p-10 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-12 bg-gradient-to-b from-sifnos-turquoise to-sifnos-deep-blue rounded-full"></div>
        <h2 className="text-3xl font-montserrat font-bold text-sifnos-deep-blue">Nearby Attractions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {attractions.map((attraction, index) => {
          const Icon = attraction.icon;
          return (
            <Link key={index} to={attraction.link}>
              <Card className="border-2 border-gray-100 hover:border-sifnos-turquoise/50 transition-all h-full cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-sifnos-turquoise/10 to-sifnos-deep-blue/10 flex items-center justify-center group-hover:bg-sifnos-turquoise/20 transition-colors">
                      <Icon className="h-5 w-5 text-sifnos-turquoise" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sifnos-deep-blue mb-1 group-hover:text-sifnos-turquoise transition-colors">
                        {attraction.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">{attraction.type}</p>
                      <p className="text-xs text-gray-400">{attraction.distance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link to={`/locations/${location.replace(/\s+/g, '-')}`}>
            Explore {hotel.location}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/best-beaches-sifnos-guide">
            Best Beaches Guide
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/travel-guide">
            Complete Travel Guide
          </Link>
        </Button>
      </div>
    </div>
  );
}

