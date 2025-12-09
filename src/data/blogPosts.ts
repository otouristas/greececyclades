import { BlogPost } from '../types/blog';
import { blogContent } from './blogContent/index';

export const blogPosts: BlogPost[] = [
  {
    id: 'santorini-ultimate-guide',
    title: 'Santorini: Your Ultimate Guide to the Jewel of the Cyclades',
    slug: 'santorini-ultimate-guide',
    description: 'Discover everything you need to know for your trip to Santorini, from getting there and around, to iconic villages, unique beaches, activities, accommodation, and budgeting tips. Your complete guide to the most beautiful island in the Cyclades.',
    content: blogContent.santoriniUltimateGuide,
    author: 'Greece Cyclades Travel Expert',
    authorRole: 'Santorini Specialist',
    publishedAt: '2026-01-24',
    updatedAt: '2026-01-24',
    featuredImage: '/images/islands/santorini/hero.jpg',
    category: 'Island Guides',
    tags: ['Santorini', 'Cyclades', 'Greek Islands', 'Oia', 'Fira', 'Imerovigli', 'Caldera', 'Sunset', 'Blue Domes', 'Volcanic Beaches', 'Wine Tasting', 'Travel Planning', 'Island Hopping', 'Luxury Travel', 'Budget Travel', 'Greece Travel'],
    readTime: 18,
    relatedIslands: ['Santorini', 'Mykonos', 'Naxos', 'Paros'],
    relatedPosts: ['best-cyclades-islands']
  },
  {
    id: 'best-cyclades-islands',
    title: '15 Best Cyclades Islands 2025: Ranked by Locals (Not Travel Agents)',
    slug: 'best-cyclades-islands',
    description: 'Forget tourist rankings. Greek island experts reveal the REAL best islands for couples, families, partiers & budget travelers. Brutally honest reviews with insider tips.',
    content: blogContent.bestCycladesIslands,
    author: 'Greece Cyclades Travel Expert',
    authorRole: 'Local Island Specialist',
    publishedAt: '2025-01-01',
    updatedAt: '2025-12-09',
    featuredImage: '/images/islands/santorini/blue-domes.jpg',
    category: 'Island Guides',
    tags: ['Cyclades', 'Greek Islands', 'Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos', 'Folegandros', 'Koufonisia', 'Island Hopping', 'Beach Vacation', 'Travel Planning', 'Greece Travel', 'Best Greek Islands', 'Island Comparison'],
    readTime: 25,
    relatedIslands: ['Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos', 'Folegandros', 'Koufonisia'],
    relatedPosts: ['santorini-ultimate-guide']
  },
  {
    id: 'sifnos',
    title: 'Sifnos Travel Guide 2026: Discover the Authentic Charm of the Cyclades',
    slug: 'sifnos',
    description: 'Plan your unforgettable 2026 escape to Sifnos, Greece. Discover top attractions, stunning beaches, charming villages, exquisite dining, and essential travel tips in our comprehensive guide.',
    content: blogContent.sifnos.content,
    author: 'Maria Kontou',
    authorRole: 'Sifnos Pottery Expert',
    publishedAt: '2024-12-17',
    featuredImage: '/images/blog/sifnos/sifnos-blog-hero.webp',
    category: 'Island Guides',
    tags: ['Sifnos', 'Greek Islands', 'Pottery', 'Gastronomy', 'Traditions'],
    readTime: 12,
    relatedPosts: ['santorini-ultimate-guide', 'best-cyclades-islands']
  }
];
