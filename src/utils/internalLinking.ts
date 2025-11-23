/**
 * Internal Linking Utility
 * Provides functions to generate strategic internal links for SEO
 */

export interface InternalLink {
  url: string;
  anchorText: string;
  description?: string;
}

export interface LinkContext {
  island?: string;
  category?: 'beaches' | 'villages' | 'activities' | 'dining' | 'accommodation' | 'transport';
  topic?: string;
}

/**
 * Generate internal links for island guides
 */
export function getIslandGuideLinks(islandName: string): InternalLink[] {
  const islandSlug = islandName.toLowerCase().replace(/\s+/g, '-');
  
  return [
    {
      url: `/guides/${islandSlug}`,
      anchorText: `${islandName} travel guide`,
      description: `Complete guide to ${islandName}`
    },
    {
      url: `/islands/${islandSlug}`,
      anchorText: `${islandName} island information`,
      description: `Discover ${islandName}`
    }
  ];
}

/**
 * Generate related island links
 */
export function getRelatedIslandLinks(currentIsland: string, relatedIslands: string[]): InternalLink[] {
  return relatedIslands.map(island => {
    const islandSlug = island.toLowerCase().replace(/\s+/g, '-');
    return {
      url: `/guides/${islandSlug}`,
      anchorText: `${island} guide`,
      description: `Travel guide to ${island}`
    };
  });
}

/**
 * Generate transportation links
 */
export function getTransportationLinks(context?: LinkContext): InternalLink[] {
  const links: InternalLink[] = [
    {
      url: '/ferry-tickets',
      anchorText: 'book ferry tickets',
      description: 'Book your ferry tickets to the Cyclades'
    },
    {
      url: '/ferry-guide',
      anchorText: 'Cyclades ferry guide',
      description: 'Complete guide to ferry travel in the Cyclades'
    }
  ];

  if (context?.island) {
    links.push({
      url: `/ferry-guide#${context.island.toLowerCase()}`,
      anchorText: `ferry routes to ${context.island}`,
      description: `How to get to ${context.island} by ferry`
    });
  }

  return links;
}

/**
 * Generate accommodation links
 */
export function getAccommodationLinks(context?: LinkContext): InternalLink[] {
  const links: InternalLink[] = [
    {
      url: '/hotels',
      anchorText: 'find hotels',
      description: 'Search for hotels in the Cyclades'
    }
  ];

  if (context?.island) {
    const islandSlug = context.island.toLowerCase().replace(/\s+/g, '-');
    links.push({
      url: `/blog/where-to-stay-${islandSlug}-greece`,
      anchorText: `where to stay in ${context.island}`,
      description: `Best areas and hotels in ${context.island}`
    });
  }

  return links;
}

/**
 * Generate activity links
 */
export function getActivityLinks(context?: LinkContext): InternalLink[] {
  return [
    {
      url: '/activities',
      anchorText: 'book activities',
      description: 'Discover activities and experiences'
    }
  ];
}

/**
 * Generate blog post links by category
 */
export function getBlogPostLinksByCategory(category: string, limit: number = 3): InternalLink[] {
  // This would typically fetch from blogPosts data
  // For now, return common links based on category
  const categoryMap: Record<string, InternalLink[]> = {
    'trip-planning': [
      {
        url: '/blog/cyclades-7-day-island-hopping-itinerary',
        anchorText: '7-day Cyclades itinerary',
        description: 'Perfect week-long island hopping route'
      },
      {
        url: '/blog/cyclades-10-day-itinerary-guide',
        anchorText: '10-day Cyclades itinerary',
        description: 'Extended island hopping guide'
      },
      {
        url: '/blog/plan-cyclades-island-hopping-trip',
        anchorText: 'plan your Cyclades trip',
        description: 'Complete trip planning guide'
      }
    ],
    'beaches': [
      {
        url: '/blog/best-beaches-cyclades-islands',
        anchorText: 'best beaches in the Cyclades',
        description: 'Top beaches across all Cyclades islands'
      },
      {
        url: '/blog/hidden-beaches-cyclades-secret-spots',
        anchorText: 'hidden beaches in the Cyclades',
        description: 'Secret beach spots only locals know'
      }
    ],
    'transportation': [
      {
        url: '/blog/cyclades-ferry-routes-complete-guide',
        anchorText: 'Cyclades ferry routes guide',
        description: 'Complete ferry travel guide'
      },
      {
        url: '/blog/book-cyclades-ferry-tickets-guide',
        anchorText: 'how to book ferry tickets',
        description: 'Step-by-step ferry booking guide'
      }
    ],
    'accommodation': [
      {
        url: '/blog/best-hotels-cyclades-islands',
        anchorText: 'best hotels in the Cyclades',
        description: 'Top accommodation options'
      },
      {
        url: '/blog/luxury-villas-cyclades-private-pool',
        anchorText: 'luxury villas in the Cyclades',
        description: 'Private villas with pools'
      }
    ]
  };

  return categoryMap[category]?.slice(0, limit) || [];
}

/**
 * Generate hub page links
 */
export function getHubPageLinks(): InternalLink[] {
  return [
    {
      url: '/best-cyclades-islands-to-visit',
      anchorText: 'best Cyclades islands to visit',
      description: 'Top islands ranked by category'
    },
    {
      url: '/guides',
      anchorText: 'all island guides',
      description: 'Complete guides to all Cyclades islands'
    },
    {
      url: '/islands',
      anchorText: 'explore all islands',
      description: 'Discover all Cyclades islands'
    }
  ];
}

/**
 * Generate contextual internal links based on content type
 */
export function generateContextualLinks(context: LinkContext): InternalLink[] {
  const links: InternalLink[] = [];

  // Add hub page links
  links.push(...getHubPageLinks());

  // Add category-specific links
  switch (context.category) {
    case 'beaches':
      links.push(...getBlogPostLinksByCategory('beaches'));
      break;
    case 'transport':
      links.push(...getTransportationLinks(context));
      break;
    case 'accommodation':
      links.push(...getAccommodationLinks(context));
      break;
    case 'activities':
      links.push(...getActivityLinks(context));
      break;
  }

  // Add general transportation and accommodation links
  if (context.category !== 'transport') {
    links.push(...getTransportationLinks(context).slice(0, 1));
  }
  if (context.category !== 'accommodation') {
    links.push(...getAccommodationLinks(context).slice(0, 1));
  }

  return links;
}

/**
 * Format internal link as JSX-ready object
 */
export function formatInternalLink(link: InternalLink, className?: string) {
  return {
    to: link.url,
    className: className || 'text-blue-600 hover:text-blue-800 underline',
    'aria-label': link.description || link.anchorText
  };
}


