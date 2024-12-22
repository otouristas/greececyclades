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
  ogType?: string;
  canonicalUrl?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    tags?: string[];
  };
  structuredData?: string;
  jsonLD?: Record<string, any>;
}
