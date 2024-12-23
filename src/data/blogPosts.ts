import { BlogPost } from '../types/blog';
import { blogContent } from './blogContent/index';

export const blogPosts: BlogPost[] = [
  {
    id: 'best-cyclades-islands',
    title: 'Best Cyclades Islands: Your Ultimate Guide to Paradise',
    slug: 'best-cyclades-islands',
    description: 'Discover the most stunning islands in the Cyclades archipelago. From Santorini\'s dramatic caldera to Mykonos\' vibrant nightlife, find your perfect Greek island paradise.',
    content: blogContent.bestCycladesIslands,
    author: 'Maria Papadopoulos',
    authorRole: 'Travel Expert & Island Specialist',
    publishedAt: '2024-12-22',
    featuredImage: '/images/blog/best-cyclades-islands.jpg',
    category: 'Island Guides',
    tags: ['Cyclades', 'Greek Islands', 'Travel Guide', 'Island Hopping', 'Beach Vacation'],
    readTime: 15
  },
  {
    id: 'island-hopping-guide',
    title: 'The Ultimate Cyclades Island Hopping Guide',
    slug: 'island-hopping-guide',
    description: 'Plan your perfect island-hopping adventure in the Cyclades. Learn about ferry routes, accommodation options, and create the ideal itinerary for your Greek island experience.',
    content: blogContent.islandHoppingGuide,
    author: 'Nikos Stavros',
    authorRole: 'Local Guide & Ferry Expert',
    publishedAt: '2024-12-22',
    featuredImage: '/images/blog/island-hopping-guide.jpg',
    category: 'Travel Tips',
    tags: ['Island Hopping', 'Ferry Travel', 'Greek Islands', 'Travel Planning', 'Budget Travel'],
    readTime: 12
  },
  {
    id: 'santorini-guide',
    title: 'Santorini 2025: Ultimate Guide to the Volcanic Paradise',
    slug: 'santorini-guide',
    description: 'Everything you need to know about visiting Santorini, from the best sunset spots to hidden local gems.',
    content: blogContent.santorini,
    author: 'Elena Dimitriou',
    authorRole: 'Santorini Local Expert',
    publishedAt: '2024-12-21',
    featuredImage: '/images/blog/santorini.jpg',
    category: 'Island Guides',
    tags: ['Santorini', 'Greek Islands', 'Travel Guide', 'Caldera Views', 'Luxury Travel'],
    readTime: 18
  },
  {
    id: 'mykonos-guide',
    title: 'Mykonos 2025: Complete Guide to the Island of the Winds',
    slug: 'mykonos-guide',
    description: 'Your comprehensive guide to Mykonos, including beaches, nightlife, and cultural attractions.',
    content: blogContent.mykonos,
    author: 'Andreas Kouros',
    authorRole: 'Mykonos Nightlife Expert',
    publishedAt: '2024-12-20',
    featuredImage: '/images/blog/mykonos.jpg',
    category: 'Island Guides',
    tags: ['Mykonos', 'Greek Islands', 'Nightlife', 'Beaches', 'Luxury Travel'],
    readTime: 15
  },
  {
    id: 'paros-guide',
    title: 'Paros 2025: Your Guide to the Cyclades\' Best-Kept Secret',
    slug: 'paros-guide',
    description: 'Discover why Paros is becoming the new favorite among travelers to the Cyclades.',
    content: blogContent.paros,
    author: 'Sofia Alexiou',
    authorRole: 'Paros Local Guide',
    publishedAt: '2024-12-19',
    featuredImage: '/images/blog/paros.jpg',
    category: 'Island Guides',
    tags: ['Paros', 'Greek Islands', 'Hidden Gems', 'Beaches', 'Local Culture'],
    readTime: 14
  },
  {
    id: 'naxos-guide',
    title: 'Naxos Island Guide',
    slug: 'naxos-guide',
    description: 'Experience the largest and most fertile island of the Cyclades.',
    content: blogContent.naxos,
    author: 'Dimitris Nikolaou',
    authorRole: 'Naxos Food & Culture Expert',
    publishedAt: '2024-12-18',
    featuredImage: '/images/blog/naxos.jpg',
    category: 'Island Guides',
    tags: ['Naxos', 'Greek Islands', 'Food', 'Culture', 'History'],
    readTime: 13
  },
  {
    id: 'sifnos-guide',
    title: 'Sifnos Island Guide',
    slug: 'sifnos-guide',
    description: 'Explore the traditional pottery and culinary paradise of the Cyclades.',
    content: blogContent.sifnos,
    author: 'Maria Kontou',
    authorRole: 'Sifnos Pottery Expert',
    publishedAt: '2024-12-17',
    featuredImage: '/images/blog/sifnos.jpg',
    category: 'Island Guides',
    tags: ['Sifnos', 'Greek Islands', 'Pottery', 'Gastronomy', 'Traditions'],
    readTime: 12
  },
  {
    id: 'antiparos-guide',
    title: 'Antiparos Island Guide',
    slug: 'antiparos-guide',
    description: 'Discover the charming sister island of Paros.',
    content: blogContent.antiparos,
    author: 'Kostas Pappas',
    authorRole: 'Antiparos Cave Expert',
    publishedAt: '2024-12-16',
    featuredImage: '/images/blog/antiparos.jpg',
    category: 'Island Guides',
    tags: ['Antiparos', 'Greek Islands', 'Caves', 'Beaches', 'Day Trips'],
    readTime: 10
  }
];
