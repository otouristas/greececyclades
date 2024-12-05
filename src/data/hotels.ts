import { Hotel } from '../types';

export const hotels: Hotel[] = [
  {
    id: 'grace-santorini',
    name: 'Grace Hotel Santorini',
    type: 'hotel',
    island: 'Santorini',
    location: 'Imerovigli, Santorini',
    description: 'Luxurious clifftop hotel with infinity pools and stunning caldera views',
    price: {
      from: 800,
      currency: 'EUR'
    },
    rating: 4.9,
    reviews: 245,
    amenities: ['Infinity Pool', 'Spa', 'Restaurant', 'Bar', 'Sea View', 'Room Service'],
    features: ['Infinity Pool', 'Spa', 'Fine Dining', 'Sea View', 'Room Service', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: "/images/hotels/grace-santorini.jpg",
    priceRange: "€€€€",
    address: "Imerovigli, Santorini 847 00, Greece",
    coordinates: {
      lat: 36.4279,
      lng: 25.4279
    },
    localAttractions: [
      {
        id: 'red-beach',
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
        id: 'metaxy-mas',
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
      }
    ]
  },
  {
    id: 'cavo-tagoo-mykonos',
    name: 'Cavo Tagoo',
    type: 'resort',
    island: 'Mykonos',
    location: 'Tagoo, Mykonos',
    description: 'Iconic luxury hotel featuring cave pools and modern Cycladic design',
    price: {
      from: 1200,
      currency: 'EUR'
    },
    rating: 4.8,
    reviews: 312,
    amenities: ['Private Pool', 'Spa', 'Fine Dining', 'Bar', 'Sea View', 'Airport Transfer'],
    features: ['Private Pool', 'Spa', 'Fine Dining', 'Sea View', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80'
    ],
    featured: true,
    image: "/images/hotels/cavo-tagoo-mykonos.jpg",
    priceRange: "€€€€",
    address: "Tagoo, Mykonos 846 00, Greece",
    coordinates: {
      lat: 37.4456,
      lng: 25.3264
    }
  },
  {
    id: 'naxian-villa',
    name: 'Naxian Villa Collection',
    type: 'villa',
    island: 'Naxos',
    location: 'Naxos Town, Naxos',
    description: 'Private villas with pools surrounded by vineyards and olive groves',
    price: {
      from: 600,
      currency: 'EUR'
    },
    rating: 4.7,
    reviews: 120,
    amenities: ['Private Pool', 'Kitchen', 'Garden', 'BBQ', 'Parking', 'Beach Access'],
    features: ['Private Pool', 'Kitchen', 'Garden', 'BBQ', 'Parking', 'Beach Access'],
    images: [
      'https://images.unsplash.com/photo-1610530531783-56a4e92a3305?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    image: "/images/hotels/naxian-villa.jpg",
    priceRange: "€€€",
    address: "Naxos Town, Naxos 843 00, Greece",
    coordinates: {
      lat: 37.1033,
      lng: 25.3783
    }
  },
  {
    id: 'milos-breeze',
    name: 'Milos Breeze',
    type: 'boutique',
    island: 'Milos',
    location: 'Adamantas, Milos',
    description: 'Intimate boutique hotel with minimalist design and panoramic views',
    price: {
      from: 400,
      currency: 'EUR'
    },
    rating: 4.6,
    reviews: 90,
    amenities: ['Pool', 'Breakfast', 'Sea View', 'Terrace', 'Bike Rental'],
    features: ['Pool', 'Breakfast', 'Sea View', 'Terrace', 'Bike Rental'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80'
    ],
    image: "/images/hotels/milos-breeze.jpg",
    priceRange: "€€",
    address: "Adamantas, Milos 848 00, Greece",
    coordinates: {
      lat: 36.7222,
      lng: 24.4444
    }
  },
  {
    id: 'santorini-secret',
    name: 'Santorini Secret',
    type: 'boutique',
    island: 'Santorini',
    location: 'Oia, Santorini',
    description: 'Adults-only sanctuary with private jacuzzis and gourmet dining',
    price: {
      from: 700,
      currency: 'EUR'
    },
    rating: 4.8,
    reviews: 180,
    amenities: ['Private Jacuzzi', 'Restaurant', 'Bar', 'Spa', 'Airport Transfer'],
    features: ['Private Jacuzzi', 'Restaurant', 'Bar', 'Spa', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1570213489059-0aac6626cade?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80'
    ],
    image: "/images/hotels/santorini-secret.jpg",
    priceRange: "€€€",
    address: "Oia, Santorini 847 02, Greece",
    coordinates: {
      lat: 36.4611,
      lng: 25.3733
    }
  },
  {
    id: 'mykonos-blu',
    name: 'Mykonos Blu',
    type: 'resort',
    island: 'Mykonos',
    location: 'Psarou, Mykonos',
    description: 'Beachfront resort with two-level infinity pool and private beach area',
    price: {
      from: 900,
      currency: 'EUR'
    },
    rating: 4.7,
    reviews: 220,
    amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Restaurant', 'Water Sports'],
    features: ['Private Beach', 'Infinity Pool', 'Spa', 'Restaurant', 'Water Sports'],
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80'
    ],
    image: "/images/hotels/mykonos-blu.jpg",
    priceRange: "€€€",
    address: "Psarou, Mykonos 846 00, Greece",
    coordinates: {
      lat: 37.4333,
      lng: 25.3333
    }
  }
];
