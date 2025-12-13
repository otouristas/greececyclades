import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://discovercyclades.gr';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema Component - Generates BreadcrumbList structured data
 * Helps Google understand site hierarchy and display breadcrumbs in search results
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  // Always start with homepage
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: `${SITE_URL}/` },
    ...items
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}

/**
 * Helper to generate common breadcrumb paths
 */
export const breadcrumbPaths = {
  islands: [
    { name: 'Islands', url: `${SITE_URL}/islands` }
  ],
  islandGuide: (islandName: string, islandSlug: string) => [
    { name: 'Islands', url: `${SITE_URL}/islands` },
    { name: islandName, url: `${SITE_URL}/guides/${islandSlug}` }
  ],
  hotels: [
    { name: 'Hotels', url: `${SITE_URL}/hotels` }
  ],
  hotelDetail: (hotelName: string, hotelSlug: string, location?: string) => [
    { name: 'Hotels', url: `${SITE_URL}/hotels` },
    ...(location ? [{ name: location, url: `${SITE_URL}/hotels?location=${location.toLowerCase()}` }] : []),
    { name: hotelName, url: `${SITE_URL}/hotels/${hotelSlug}` }
  ],
  blog: (postTitle: string, postSlug: string) => [
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: postTitle, url: `${SITE_URL}/blog/${postSlug}` }
  ],
  activities: [
    { name: 'Activities', url: `${SITE_URL}/activities` }
  ],
  ferries: [
    { name: 'Ferry Tickets', url: `${SITE_URL}/ferry-tickets` }
  ],
  flights: [
    { name: 'Flights', url: `${SITE_URL}/flights` }
  ],
  quiz: [
    { name: 'Island Quiz', url: `${SITE_URL}/quiz` }
  ]
};
