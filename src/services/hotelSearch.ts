
import { supabase } from '@/integrations/supabase/client';
import { CitySearchHotel, parsePrice } from './makcorpsApi';

export interface UnifiedHotel {
  id: string;
  name: string;
  location?: string;
  description?: string;
  rating: number;
  price: number;
  source: 'local' | 'makcorps';
  
  // Common fields
  price_per_night: number;
  amenities: string[];
  image_url: string;
  
  // Local hotel fields
  hotel_types?: string[];
  hotel_photos?: {
    id: string;
    photo_url: string;
    is_main_photo?: boolean;
  }[];
  hotel_amenities?: {
    amenity: string;
  }[];
  hotel_rooms?: {
    id: string;
    name: string;
    price: number;
    capacity: number;
  }[];
  
  // Makcorps hotel fields
  makcorps_hotel_id?: number;
  star_rating?: number;
  review_score?: number;
  review_count?: number;
  daily_rate?: number;
  currency?: string;
  vendor_prices?: {
    vendor: string;
    price: string;
    tax?: string;
  }[];
  telephone?: string;
  geocode?: {
    latitude: number;
    longitude: number;
  };
}

export interface SearchParams {
  checkInDate?: string;
  checkOutDate?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  location?: string;
  amenities?: string;
  hotelName?: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  amenities: string[];
  description?: string;
  star_rating?: number;
  review_score?: number;
  review_count?: number;
  makcorps_hotel_id?: number;
  source: 'local' | 'makcorps';
  makcorps_data?: any;
  vendor_prices?: {
    vendor: string;
    price: string;
    tax?: string;
  }[];
  telephone?: string;
  geocode?: {
    latitude: number;
    longitude: number;
  };
  
  // Add missing Agoda fields to Hotel interface
  daily_rate?: number;
  currency?: string;
  landing_url?: string;
  hotel_rooms?: any[];
  matchInfo?: {
    confidence: number;
    reasons: string[];
    matchedWith?: string;
    similarity?: number;
  };
}

// Legacy Agoda interface - kept for reference
export interface AgodaHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  currency: string;
  dailyRate: number;
  crossedOutRate: number;
  discountPercentage: number;
  imageURL: string;
  landingURL: string;
  includeBreakfast: boolean;
  freeWifi: boolean;
  latitude?: number;
  longitude?: number;
}

const validateDates = (checkInDate: string, checkOutDate: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkInDate < today) {
    throw new Error('Check-in date cannot be in the past');
  }

  if (checkOutDate <= checkInDate) {
    throw new Error('Check-out date must be after check-in date');
  }

  const diffTime = checkOut.getTime() - checkIn.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    throw new Error('Maximum stay is 30 days');
  }

  return true;
};

// Legacy Agoda converter - kept for reference
const convertAgodaToHotel = (agodaHotel: AgodaHotel): Hotel => {
  const amenities = [];
  if (agodaHotel.freeWifi) amenities.push('Free WiFi');
  if (agodaHotel.includeBreakfast) amenities.push('Breakfast Included');
  if (agodaHotel.discountPercentage > 0) amenities.push(`${agodaHotel.discountPercentage}% Discount`);

  return {
    id: agodaHotel.hotelId,
    name: agodaHotel.hotelName,
    location: 'Santorini, Greece',
    price_per_night: agodaHotel.dailyRate,
    rating: agodaHotel.reviewScore,
    image_url: agodaHotel.imageURL,
    amenities,
    star_rating: agodaHotel.starRating,
    review_score: agodaHotel.reviewScore,
    review_count: agodaHotel.reviewCount,
    makcorps_hotel_id: agodaHotel.hotelId,
    source: 'makcorps',
    makcorps_data: agodaHotel,
    daily_rate: agodaHotel.dailyRate,
    currency: agodaHotel.currency,
  };
};

const convertMakcorpsToHotel = (makcorpsHotel: CitySearchHotel): Hotel => {
  // Extract vendor prices
  const vendorPrices: { vendor: string; price: string; tax?: string }[] = [];
  if (makcorpsHotel.vendor1 && makcorpsHotel.price1) {
    vendorPrices.push({ vendor: makcorpsHotel.vendor1, price: makcorpsHotel.price1 });
  }
  if (makcorpsHotel.vendor2 && makcorpsHotel.price2) {
    vendorPrices.push({ vendor: makcorpsHotel.vendor2, price: makcorpsHotel.price2 });
  }
  if (makcorpsHotel.vendor3 && makcorpsHotel.price3) {
    vendorPrices.push({ vendor: makcorpsHotel.vendor3, price: makcorpsHotel.price3 });
  }
  if (makcorpsHotel.vendor4 && makcorpsHotel.price4) {
    vendorPrices.push({ vendor: makcorpsHotel.vendor4, price: makcorpsHotel.price4 });
  }

  // Get the cheapest price (first vendor is usually cheapest)
  const cheapestPrice = vendorPrices.length > 0 ? parsePrice(vendorPrices[0].price) : 0;

  return {
    id: makcorpsHotel.hotelId,
    name: makcorpsHotel.name,
    location: 'Santorini, Greece',
    price_per_night: cheapestPrice,
    rating: makcorpsHotel.reviews.rating || 0,
    image_url: '/placeholder.svg', // Makcorps doesn't provide images in city search
    amenities: [],
    star_rating: Math.round(makcorpsHotel.reviews.rating || 0),
    review_score: makcorpsHotel.reviews.rating || 0,
    review_count: makcorpsHotel.reviews.count || 0,
    makcorps_hotel_id: makcorpsHotel.hotelId,
    source: 'makcorps',
    makcorps_data: makcorpsHotel,
    daily_rate: cheapestPrice,
    currency: 'EUR',
    vendor_prices: vendorPrices,
    telephone: makcorpsHotel.telephone,
    geocode: makcorpsHotel.geocode,
  };
};

const searchMakcorpsHotels = async (params: SearchParams): Promise<Hotel[]> => {
  try {
    console.log('Searching Makcorps hotels with params:', params);

    if (params.checkInDate && params.checkOutDate) {
      validateDates(params.checkInDate, params.checkOutDate);
    }

    // Use Supabase Edge Function for production
    const { data, error } = await supabase.functions.invoke('makcorps-search', {
      body: {
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        numberOfAdults: params.numberOfAdults || 2,
        numberOfChildren: params.numberOfChildren || 0,
        numberOfRooms: 1,
        currency: 'EUR',
        pagination: 0,
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      return [];
    }

    const response = data;

    if (!response || !response.makcorps_data?.results) {
      console.log('No Makcorps results found');
      return [];
    }

    // Filter out metadata objects (objects with totalHotelCount)
    const hotels = response.makcorps_data.results.filter(
      (item: any) => item.hotelId && !item.totalHotelCount
    ) as CitySearchHotel[];

    console.log(`Found ${hotels.length} Makcorps hotels`);
    return hotels.map(convertMakcorpsToHotel);
  } catch (error) {
    console.error('Error searching Makcorps hotels:', error);
    return [];
  }
};

const searchLocalHotels = async (params: SearchParams): Promise<Hotel[]> => {
  try {
    console.log('Searching local hotels with params:', params);
    
    let query = supabase
      .from('hotels')
      .select(`
        *,
        hotel_amenities(amenity),
        hotel_photos(id, photo_url, is_main_photo),
        hotel_rooms(id, name, price, capacity),
        hotel_reviews(rating, comment, reviewer_name)
      `);

    if (params.location) {
      const normalizedLocation = params.location.toLowerCase();
      query = query.ilike('location', `%${normalizedLocation}%`);
      console.log('Filtering by location:', normalizedLocation);
    }

    const { data: hotels, error } = await query.order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching local hotels:', error);
      return [];
    }

    const localHotels: Hotel[] = (hotels || []).map(hotel => {
      const mainPhoto = hotel.hotel_photos?.find((p: any) => p.is_main_photo) || hotel.hotel_photos?.[0];
      const imageUrl = mainPhoto?.photo_url ? 
        (mainPhoto.photo_url.startsWith('http') ? mainPhoto.photo_url : `/uploads/hotels/${mainPhoto.photo_url}`) :
        '/placeholder.svg';

      const amenities = hotel.hotel_amenities?.map((a: any) => a.amenity) || [];

      const reviewRating = hotel.hotel_reviews?.length > 0 
        ? hotel.hotel_reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / hotel.hotel_reviews.length
        : hotel.rating || 0;

      const localHotel: Hotel = {
        id: parseInt(hotel.id) || 0,
        name: hotel.name,
        location: hotel.location,
        price_per_night: 0,
        rating: reviewRating,
        image_url: imageUrl,
        amenities: amenities,
        description: hotel.description || '',
        source: 'local',
        hotel_rooms: hotel.hotel_rooms || [],
        star_rating: hotel.rating || Math.round(reviewRating),
        review_count: hotel.hotel_reviews?.length || 0,
        review_score: reviewRating
      };

      return localHotel;
    });

    console.log(`Found ${localHotels.length} local hotels`);
    return localHotels;

  } catch (error) {
    console.error('Error searching local hotels:', error);
    return [];
  }
};

export const searchHotels = async (params: SearchParams = {}): Promise<Hotel[]> => {
  try {
    console.log('Unified hotel search with params:', params);

    const [localHotels, makcorpsHotels] = await Promise.all([
      searchLocalHotels(params),
      params.checkInDate && params.checkOutDate ? searchMakcorpsHotels(params) : Promise.resolve([]),
    ]);

    const sortedLocalHotels = localHotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const sortedMakcorpsHotels = makcorpsHotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const finalResults = [...sortedLocalHotels, ...sortedMakcorpsHotels];

    console.log(
      `Total hotels found: ${finalResults.length} (${localHotels.length} local, ${makcorpsHotels.length} Makcorps)`
    );

    return finalResults;
  } catch (error) {
    console.error('Error in unified hotel search:', error);
    return [];
  }
};
