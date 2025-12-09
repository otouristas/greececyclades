import { Helmet } from 'react-helmet-async';

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
    { name: 'Home', url: 'https://hotelssantorini.gr/' },
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
  hotels: [
    { name: 'Hotels', url: 'https://hotelssantorini.gr/hotels' }
  ],
  locations: (locationName: string, locationSlug: string) => [
    { name: 'Locations', url: 'https://hotelssantorini.gr/locations' },
    { name: locationName, url: `https://hotelssantorini.gr/locations/${locationSlug}` }
  ],
  hotelDetail: (hotelName: string, hotelSlug: string, location?: string) => [
    { name: 'Hotels', url: 'https://hotelssantorini.gr/hotels' },
    ...(location ? [{ name: location, url: `https://hotelssantorini.gr/locations/${location.toLowerCase()}` }] : []),
    { name: hotelName, url: `https://hotelssantorini.gr/hotels/${hotelSlug}` }
  ],
  blog: (postTitle: string, postSlug: string) => [
    { name: 'Blog', url: 'https://hotelssantorini.gr/blog' },
    { name: postTitle, url: `https://hotelssantorini.gr/blog/${postSlug}` }
  ],
  thingsToDo: (categoryName?: string, categorySlug?: string) => [
    { name: 'Things to Do', url: 'https://hotelssantorini.gr/things-to-do' },
    ...(categoryName && categorySlug ? [{ name: categoryName, url: `https://hotelssantorini.gr/things-to-do/${categorySlug}` }] : [])
  ],
  transport: (pageName: string, pageSlug: string) => [
    { name: 'Getting to Santorini', url: 'https://hotelssantorini.gr/how-to-get-to-santorini' },
    { name: pageName, url: `https://hotelssantorini.gr/${pageSlug}` }
  ]
};
