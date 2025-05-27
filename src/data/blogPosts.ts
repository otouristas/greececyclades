import { BlogPost } from '../types/blog';
import { blogContent } from './blogContent/index';

export const blogPosts: BlogPost[] = [
  {
    id: 'best-cyclades-islands',
    title: 'Best Cyclades Islands: Your Ultimate Guide to Paradise',
    slug: 'best-cyclades-islands',
    description: 'Explore the 10 most beautiful Cyclades islands with our comprehensive guide. Discover Santorini\'s dramatic caldera, Mykonos\' vibrant nightlife, Naxos\' pristine beaches, and more. Complete with travel tips, accommodation recommendations, and island-specific guides.',
    content: blogContent.bestCycladesIslands,
    author: 'Touristas AI Planner',
    authorRole: 'AI Travel Expert',
    publishedAt: '2025-05-27',
    updatedAt: '2025-05-27',
    featuredImage: '/images/islands/santorini/blue-domes.jpg',
    category: 'Island Guides',
    tags: ['Cyclades', 'Greek Islands', 'Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos', 'Island Hopping', 'Beach Vacation', 'Travel Planning', 'Greece Travel'],
    readTime: 25,
    relatedIslands: ['Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos'],
    relatedPosts: []
  },
  {
    id: 'sifnos',
    title: 'Sifnos Travel Guide 2025: Discover the Authentic Charm of the Cyclades',
    slug: 'sifnos',
    description: 'Plan your unforgettable 2025 escape to Sifnos, Greece. Discover top attractions, stunning beaches, charming villages, exquisite dining, and essential travel tips in our comprehensive guide.',
    content: blogContent.sifnos,
    author: 'Maria Kontou',
    authorRole: 'Sifnos Pottery Expert',
    publishedAt: '2024-12-17',
    featuredImage: '/images/blog/sifnos/sifnos-blog-hero.webp',
    category: 'Island Guides',
    tags: ['Sifnos', 'Greek Islands', 'Pottery', 'Gastronomy', 'Traditions'],
    readTime: 12
  }
];
