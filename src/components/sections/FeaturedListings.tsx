import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import { formatPrice } from '../../utils/price';
import { Hotel } from '../../data/hotels';
import { getIslandSlug } from '../../utils/slugify';

export default function FeaturedListings() {
  const { hotels } = useHotelStore();
  const featuredHotels: Hotel[] = hotels.slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
            <p className="mt-2 text-gray-600">Discover our hand-picked selection of top-rated places</p>
          </div>
          <Link 
            to="/hotels"
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View all hotels
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel: Hotel) => (
            <Link key={hotel.id} to={`/hotels/${getIslandSlug(hotel.name)}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    From {formatPrice(hotel.price)}/night
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hotel.island}
                    </div>
                  </div>
                  
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {hotel.name}
                  </h3>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {hotel.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}