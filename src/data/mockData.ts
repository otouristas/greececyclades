import { Activity } from '../types';

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: 'Sunset Sailing Cruise',
    description: 'Experience the magic of Santorinis famous sunset aboard a luxury catamaran. Enjoy swimming, snorkeling, and a BBQ dinner with wine.',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1588401667987-e06480c453b9?auto=format&fit=crop&q=80&w=800',
    price: '€120',
    duration: '4-6 hours',
    rating: 4.9,
    reviews: 245,
    category: 'Water Activities'
  },
  {
    id: 2,
    title: 'Wine Tasting Tour',
    description: 'Discover Santorinis unique wine culture with visits to three traditional wineries. Learn about volcanic wines and enjoy local delicacies.',
    location: 'Santorini',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=800',
    price: '€85',
    duration: '2-4 hours',
    rating: 4.8,
    reviews: 189,
    category: 'Food & Wine'
  },
  {
    id: 3,
    title: 'Photography Workshop',
    description: 'Capture the beauty of Mykonos with a professional photographer. Perfect for all skill levels, includes camera tips and local insights.',
    location: 'Mykonos',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800',
    price: '€95',
    duration: '2-4 hours',
    rating: 4.7,
    reviews: 156,
    category: 'Arts & Culture'
  },
  {
    id: 4,
    title: 'Hiking Adventure',
    description: 'Explore the ancient trails of Naxos with an experienced guide. Discover hidden villages, Byzantine churches, and breathtaking viewpoints.',
    location: 'Naxos',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
    price: '€65',
    duration: '6+ hours',
    rating: 4.9,
    reviews: 132,
    category: 'Adventure'
  },
  {
    id: 5,
    title: 'Traditional Cooking Class',
    description: 'Learn to cook authentic Greek dishes with a local chef. Includes market visit, cooking session, and wine pairing.',
    location: 'Milos',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    price: '€75',
    duration: '3-4 hours',
    rating: 4.8,
    reviews: 167,
    category: 'Food & Wine'
  },
  {
    id: 6,
    title: 'Island Hopping Tour',
    description: 'Visit multiple Cycladic islands in one day. Perfect for photography and exploring hidden gems.',
    location: 'Paros',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=800',
    price: '€140',
    duration: '8+ hours',
    rating: 4.9,
    reviews: 198,
    category: 'Adventure'
  }
];
