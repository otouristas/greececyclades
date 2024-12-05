export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  islandId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  };
  rating: number;
  reviewCount: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  images: string[];
  amenities: string[];
  rooms: HotelRoom[];
  checkIn: string;
  checkOut: string;
  policies: {
    cancellation: string;
    children: string;
    pets: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
