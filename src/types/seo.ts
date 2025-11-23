export interface ArticleSEO {
  publishedTime: string;
  modifiedTime: string;
  author: string;
  tags: string[];
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  structuredData?: string;
  jsonLD?: Record<string, any>;
  noIndex?: boolean;
  pageType?: 'homepage' | 'islands' | 'guides' | 'hotels' | 'activities' | 'blog' | 'ferry-tickets' | 'touristas-ai' | 'general';
  locationData?: {
    name: string;
    type?: string;
  };
  islandData?: {
    name: string;
    description?: string;
  };
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
}
