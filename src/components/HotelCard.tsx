import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../types/hotel';
import { FaStar, FaMapMarkerAlt, FaRegHeart, FaHeart } from 'react-icons/fa';

interface HotelCardProps {
  hotel: Hotel;
  featured?: boolean;
  onFavoriteToggle?: (hotelId: string) => void;
  isFavorite?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  hotel, 
  featured = false,
  onFavoriteToggle,
  isFavorite = false
}) => {
  const mainImage = hotel.images?.main || 'https://via.placeholder.com/600x400?text=No+Image';
  const priceMin = hotel.price_range?.min || 0;
  const currency = hotel.price_range?.currency || '€';
  const starRating = hotel.star_rating || 0;
  const userRating = hotel.rating || 0;
  const reviewsCount = hotel.reviews_count || 0;
  
  // Extract island and area information
  const island = hotel.location?.island || hotel.island_id || '';
  const area = hotel.location?.area || '';
  
  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle && hotel.id) {
      onFavoriteToggle(hotel.id);
    }
  };

  return (
    <Link 
      to={`/hotels/${hotel.slug}`} 
      className={`group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${featured ? 'lg:flex' : ''}`}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-2/5' : 'h-48 sm:h-64'}`}>
        <img 
          src={mainImage} 
          alt={hotel.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Featured badge */}
        {hotel.featured && (
          <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </div>
        )}
        
        {/* Favorite button */}
        {onFavoriteToggle && (
          <button 
            onClick={handleFavoriteClick}
            className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className="text-gray-600" size={16} />
            )}
          </button>
        )}
        
        {/* Price tag */}
        <div className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-1 font-bold text-blue-600 shadow-md">
          From {priceMin} {currency}
        </div>
      </div>
      
      {/* Content container */}
      <div className={`p-4 ${featured ? 'lg:w-3/5 lg:p-6' : ''}`}>
        {/* Hotel category and star rating */}
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            {hotel.category || 'Hotel'}
          </span>
          <div className="flex">
            {[...Array(starRating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" size={14} />
            ))}
          </div>
        </div>
        
        {/* Hotel name */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
          {hotel.name}
        </h3>
        
        {/* Location */}
        <div className="mb-3 flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-1 text-blue-500" />
          <span>{island}{area ? `, ${area}` : ''}</span>
        </div>
        
        {/* Description - only show for featured cards or on larger screens */}
        {(featured || window.innerWidth >= 768) && (
          <p className="mb-4 text-sm text-gray-700 line-clamp-2">
            {hotel.description}
          </p>
        )}
        
        {/* Bottom section with amenities and rating */}
        <div className="mt-auto flex items-center justify-between">
          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {(hotel.amenities || []).slice(0, featured ? 4 : 3).map((amenity, index) => (
              <span 
                key={index} 
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {amenity}
              </span>
            ))}
            {(hotel.amenities || []).length > (featured ? 4 : 3) && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                +{(hotel.amenities || []).length - (featured ? 4 : 3)}
              </span>
            )}
          </div>
          
          {/* Rating */}
          {userRating > 0 && (
            <div className="flex items-center">
              <div className="flex items-center rounded-lg bg-blue-50 px-2 py-1">
                <span className="mr-1 font-bold text-blue-700">{userRating.toFixed(1)}</span>
                <FaStar className="text-blue-700" size={12} />
              </div>
              {reviewsCount > 0 && (
                <span className="ml-1 text-xs text-gray-600">
                  ({reviewsCount})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
