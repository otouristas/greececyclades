import { islandGuides } from './islandsData';
import activities from './newActivitiesData';

export interface SearchResult {
  id: string;
  title: string;
  type: 'island' | 'activity' | 'destination';
  description: string;
  link: string;
  image?: string;
  location?: string;
  category?: string;
}

export function searchAll(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }

  // Search islands
  const islandResults = islandGuides.map(guide => ({
    id: guide.id,
    title: guide.name,
    type: 'island' as const,
    description: guide.description,
    link: `/guides/${guide.id}`,
    image: guide.image,
    category: 'Island Guide'
  })).filter(item => 
    item.title.toLowerCase().includes(searchTerm) || 
    item.description.toLowerCase().includes(searchTerm)
  );

  // Search activities
  const activityResults = activities.map(activity => ({
    id: activity.id,
    title: activity.title,
    type: 'activity' as const,
    description: activity.shortDescription,
    link: `/activities/${activity.slug}`,
    location: activity.location,
    category: activity.category
  })).filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    (item.location && item.location.toLowerCase().includes(searchTerm))
  );

  // Combine and limit results
  return [...islandResults, ...activityResults].slice(0, 6);
}
