export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  lastModified?: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  readTime: number; // in minutes
  relatedPosts?: string[]; // ids of related posts
  relatedIslands?: string[]; // ids of related islands
  relatedActivities?: string[]; // ids of related activities
  relatedHotels?: string[]; // ids of related hotels
}

export type BlogCategory = 
  | 'Island Guides' 
  | 'Travel Tips' 
  | 'Activities' 
  | 'Accommodation' 
  | 'Food & Dining' 
  | 'Culture & History';
