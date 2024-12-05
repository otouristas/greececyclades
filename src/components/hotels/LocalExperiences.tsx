import { MapPin, Car, Clock, Calendar } from 'lucide-react';
import { Hotel } from '../../types';

interface LocalExperiencesProps {
  hotel: Hotel;
  selectedDates?: { checkIn: string; checkOut: string };
}

interface Attraction {
  name: string;
  description: string;
  distance: number;
  travelTime: {
    walking?: number;
    driving?: number;
  };
  type: 'attraction' | 'restaurant' | 'event';
  image: string;
  rating: number;
  priceRange?: string;
  eventDate?: string;
}

export default function LocalExperiences({ hotel, selectedDates }: LocalExperiencesProps) {
  // Mock data - In a real app, this would come from an API based on hotel location
  const localAttractions: Attraction[] = [
    {
      name: 'Red Beach',
      description: 'Unique red sand beach surrounded by high red cliffs',
      distance: 2.5,
      travelTime: {
        walking: 30,
        driving: 8
      },
      type: 'attraction',
      image: '/images/attractions/red-beach.jpg',
      rating: 4.6
    },
    {
      name: 'Metaxy Mas',
      description: 'Traditional Greek taverna with stunning caldera views',
      distance: 1.2,
      travelTime: {
        walking: 15,
        driving: 5
      },
      type: 'restaurant',
      image: '/images/restaurants/metaxy-mas.jpg',
      rating: 4.8,
      priceRange: '€€'
    },
    {
      name: 'Wine Tasting Festival',
      description: 'Annual festival featuring local Santorini wines',
      distance: 3.0,
      travelTime: {
        driving: 10
      },
      type: 'event',
      image: '/images/events/wine-festival.jpg',
      rating: 4.7,
      eventDate: '2024-09-15'
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Local Experiences</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localAttractions.map((attraction) => (
          <div key={attraction.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img 
                src={attraction.image} 
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              {attraction.type === 'event' && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Event
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{attraction.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{attraction.distance} km away</span>
                </div>
                
                {attraction.travelTime.walking && (
                  <div className="flex items-center gap-1" title="Walking time">
                    <Clock size={16} />
                    <span>{attraction.travelTime.walking} min walk</span>
                  </div>
                )}
                
                {attraction.travelTime.driving && (
                  <div className="flex items-center gap-1" title="Driving time">
                    <Car size={16} />
                    <span>{attraction.travelTime.driving} min drive</span>
                  </div>
                )}
              </div>
              
              {attraction.type === 'event' && attraction.eventDate && (
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <Calendar size={16} />
                  <span>{new Date(attraction.eventDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {attraction.priceRange && (
                <div className="text-sm text-gray-500 mb-2">
                  Price Range: {attraction.priceRange}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium">{attraction.rating}</span>
                </div>
                <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
