import { cyclades } from './cyclades';

export interface SearchResult {
  id: string;
  title: string;
  type: 'island' | 'activity' | 'hotel' | 'ferry';
  description: string;
  link: string;
  image?: string;
  category?: string;
  location?: string;
}

export function searchAll(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }

  // Search islands
  const islandResults = cyclades.map(island => ({
    id: island.id,
    title: island.name,
    type: 'island' as const,
    description: island.description,
    link: `/islands/${island.slug}`,
    image: island.image,
    category: 'Island Guide'
  })).filter(item => 
    item.title.toLowerCase().includes(searchTerm) || 
    item.description.toLowerCase().includes(searchTerm)
  );

  // Search activities
  const activityResults = cyclades.flatMap(island => 
    island.activities.map(activity => ({
      id: `${island.id}-${activity}`,
      title: `${activity} in ${island.name}`,
      type: 'activity' as const,
      description: `Experience ${activity} on the beautiful island of ${island.name}`,
      link: `/islands/${island.slug}#activities`,
      location: island.name,
      category: 'Activity'
    }))
  ).filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    (item.location && item.location.toLowerCase().includes(searchTerm))
  );

  // Combine and limit results
  return [...islandResults, ...activityResults].slice(0, 6);
}
