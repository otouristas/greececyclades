export interface HotelRoom {
  id: string;
  type: string;
  description: string;
  amenities: string[];
  maxOccupancy: number;
  priceRange: {
    from: number;
    to: number;
    currency: string;
  };
  images: string[];
}

export interface HotelAmenity {
  name: string;
  description: string;
  icon: string;
}

export interface HotelContact {
  phone: string[];
  email: string;
  website?: string;
}

export interface HotelLocation {
  island: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  slug: string;
  location: HotelLocation;
  rooms: HotelRoom[];
  amenities: HotelAmenity[];
  contact: HotelContact;
  images: {
    main: string;
    gallery: string[];
  };
  nearbyAttractions?: {
    name: string;
    type: string;
    distance: string;
  }[];
  rating?: {
    score: number;
    totalReviews: number;
  };
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellation?: string;
    children?: string;
    pets?: string;
  };
}
