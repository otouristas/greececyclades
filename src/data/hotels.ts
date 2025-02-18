import { Hotel } from '../types/hotel';
import { LucidIcon, Key, Briefcase, Sparkles, MapPin } from 'lucide-react';

export const hotels: Hotel[] = [
  {
    id: 'aggelos-rooms-antiparos',
    name: 'AGGELOS Rooms & Apartments',
    slug: 'aggelos-rooms-antiparos',
    description: 'Nestled in the heart of Antiparos, AGGELOS Rooms & Apartments offers a serene retreat for travelers seeking a blend of comfort and authentic Greek island charm. Our accommodations are thoughtfully designed to provide a relaxing atmosphere, ensuring a memorable stay amidst the captivating beauty of the Cyclades.',
    location: {
      island: 'Antiparos',
      address: 'Central Road, Antiparos',
    },
    rooms: [
      {
        id: 'sea-view-apartment',
        type: 'Apartment with Sea View',
        description: 'These spacious apartments feature fully equipped kitchens, comfortable living areas, and private balconies that offer breathtaking views of the Aegean Sea. Ideal for families or groups, each apartment is designed to be your home away from home.',
        amenities: [
          'Fully equipped kitchen',
          'Private balcony',
          'Sea view',
          'Air conditioning',
          'Free Wi-Fi',
          'Living area'
        ],
        maxOccupancy: 4,
        priceRange: {
          from: 120,
          to: 250,
          currency: 'EUR'
        },
        images: []
      },
      {
        id: 'double-room',
        type: 'Double Room',
        description: 'Perfect for couples or solo travelers, our double rooms come with modern amenities, including air conditioning, free Wi-Fi, and a refrigerator. Each room opens to a private balcony or veranda overlooking our lush gardens, providing a peaceful retreat after a day of exploration.',
        amenities: [
          'Private balcony/veranda',
          'Garden view',
          'Air conditioning',
          'Free Wi-Fi',
          'Refrigerator'
        ],
        maxOccupancy: 2,
        priceRange: {
          from: 80,
          to: 150,
          currency: 'EUR'
        },
        images: []
      }
    ],
    amenities: [
      {
        name: 'Smart Key Access',
        description: 'Enjoy the convenience of easy key retrieval upon arrival',
        icon: 'Key'
      },
      {
        name: 'Luggage Storage',
        description: 'Secure storage facilities are available to keep your belongings safe',
        icon: 'Briefcase'
      },
      {
        name: 'Daily Disinfection',
        description: 'We prioritize your health with thorough cleaning and disinfection after every check-out',
        icon: 'Sparkles'
      }
    ],
    contact: {
      phone: ['+30 6980151068', '+30 6944950094'],
      email: 'info@antiparosrooms.com',
      website: 'https://antiparosrooms.com'
    },
    images: {
      main: '/images/hotels/aggelos/main.jpg',
      gallery: []
    },
    nearbyAttractions: [
      {
        name: 'Elia Kafenes',
        type: 'restaurant',
        distance: '5 min walk'
      },
      {
        name: 'Captain Pipinos',
        type: 'restaurant',
        distance: '7 min walk'
      },
      {
        name: 'Sifneiko',
        type: 'restaurant',
        distance: '10 min walk'
      },
      {
        name: 'Cave of Antiparos',
        type: 'attraction',
        distance: '15 min drive'
      },
      {
        name: 'Despotiko Island',
        type: 'attraction',
        distance: '30 min boat ride'
      }
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00'
    }
  }
];
