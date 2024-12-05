export interface Hotel {
  image: string;
  priceRange: string;
  address: string;
  coordinates: { lat: number; lng: number; };
  id: string;
  name: string;
  type: 'hotel' | 'villa' | 'resort' | 'boutique';
  island: string;
  description: string;
  price: {
    from: number;
    currency: string;
  };
  rating: number;
  reviews: number;
  amenities: string[];
  images: string[];
  featured?: boolean;
}

export const hotels: Hotel[] = [
  {
    id: 'grace-santorini',
    name: 'Grace Hotel Santorini',
    type: 'hotel',
    island: 'Santorini',
    description: 'Luxurious clifftop hotel with infinity pools and stunning caldera views',
    price: {
      from: 800,
      currency: 'EUR'
    },
    rating: 4.9,
    reviews: 245,
    amenities: ['Infinity Pool', 'Spa', 'Restaurant', 'Bar', 'Sea View', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 'cavo-tagoo-mykonos',
    name: 'Cavo Tagoo',
    type: 'resort',
    island: 'Mykonos',
    description: 'Iconic luxury hotel featuring cave pools and modern Cycladic design',
    price: {
      from: 1200,
      currency: 'EUR'
    },
    rating: 4.8,
    reviews: 312,
    amenities: ['Private Pool', 'Spa', 'Fine Dining', 'Bar', 'Sea View', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 'naxian-villa',
    name: 'Naxian Villa Collection',
    type: 'villa',
    island: 'Naxos',
    description: 'Private villas with pools surrounded by vineyards and olive groves',
    price: {
      from: 600,
      currency: 'EUR'
    },
    rating: 4.7,
    reviews: 120,
    amenities: ['Private Pool', 'Kitchen', 'Garden', 'BBQ', 'Parking', 'Beach Access'],
    images: [
      'https://images.unsplash.com/photo-1610530531783-56a4e92a3305?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 'milos-breeze',
    name: 'Milos Breeze',
    type: 'boutique',
    island: 'Milos',
    description: 'Intimate boutique hotel with minimalist design and panoramic views',
    price: {
      from: 400,
      currency: 'EUR'
    },
    rating: 4.6,
    reviews: 90,
    amenities: ['Pool', 'Breakfast', 'Sea View', 'Terrace', 'Bike Rental'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80'
    ],
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 'santorini-secret',
    name: 'Santorini Secret',
    type: 'boutique',
    island: 'Santorini',
    description: 'Adults-only sanctuary with private jacuzzis and gourmet dining',
    price: {
      from: 700,
      currency: 'EUR'
    },
    rating: 4.8,
    reviews: 180,
    amenities: ['Private Jacuzzi', 'Restaurant', 'Bar', 'Spa', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1570213489059-0aac6626cade?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80'
    ],
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  {
    id: 'mykonos-blu',
    name: 'Mykonos Blu',
    type: 'resort',
    island: 'Mykonos',
    description: 'Beachfront resort with two-level infinity pool and private beach area',
    price: {
      from: 900,
      currency: 'EUR'
    },
    rating: 4.7,
    reviews: 220,
    amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Restaurant', 'Water Sports'],
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80'
    ],
    image: "",
    priceRange: "",
    address: "",
    coordinates: {
      lat: 0,
      lng: 0
    }
  }
];
