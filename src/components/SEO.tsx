import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://greececyclades.com';
const SITE_NAME = 'Discover Cyclades';

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
  jsonLD?: any;
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

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  article,
  structuredData,
  jsonLD,
  noIndex = false,
  pageType = 'general',
  locationData,
  islandData,
  alternateLanguages,
  twitterCard = 'summary_large_image',
  twitterSite = '@greececyclades',
  twitterCreator
}: SEOProps) {
  const location = useLocation();

  // Generate optimized canonical URL
  const getCanonicalUrl = (): string => {
    if (canonicalUrl) {
      let url = canonicalUrl.startsWith('http') 
        ? canonicalUrl 
        : `${SITE_URL}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
      
      // Remove ALL index references
      url = url.replace(/\/index\.html?$/i, '');
      url = url.replace(/\/index$/i, '');
      url = url.replace(/index\.html?$/i, '');
      url = url.replace(/index$/i, '');
      
      // Ensure trailing slash consistency (remove from all except root)
      if (url !== SITE_URL && url !== `${SITE_URL}/`) {
        url = url.replace(/\/$/, '');
      }
      
      // Ensure root has trailing slash
      if (url === SITE_URL) {
        url = `${SITE_URL}/`;
      }
      
      return url;
    }
    
    // Auto-generate from current path
    const path = location.pathname;
    let url = `${SITE_URL}${path}`;
    
    // Remove trailing slash except for root
    if (url !== `${SITE_URL}/` && url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    
    // Ensure root has trailing slash
    if (url === SITE_URL) {
      url = `${SITE_URL}/`;
    }
    
    return url;
  };

  // Generate optimized image URL
  const getImageUrl = (): string => {
    if (ogImage) {
      return ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
    }
    
    // Page-type specific default images
    const defaultImages: Record<string, string> = {
      homepage: `${SITE_URL}/images/cyclades-hero.jpg`,
      islands: `${SITE_URL}/images/islands-hero.jpg`,
      guides: `${SITE_URL}/images/guides-hero.jpg`,
      hotels: `${SITE_URL}/images/hotels-hero.jpg`,
      activities: `${SITE_URL}/images/activities-hero.jpg`,
      'touristas-ai': `${SITE_URL}/images/touristas-ai-hero.jpg`,
      blog: `${SITE_URL}/images/blog-hero.jpg`,
      'ferry-tickets': `${SITE_URL}/images/ferry-hero.jpg`
    };
    
    return defaultImages[pageType] || `${SITE_URL}/images/default-og.jpg`;
  };

  // Generate page-type specific structured data
  const generateStructuredData = () => {
    if (jsonLD) {
      return JSON.stringify(jsonLD);
    }

    if (structuredData) {
      return structuredData;
    }

    const canonical = getCanonicalUrl();
    const imageUrl = getImageUrl();

    // Page-type specific schema
    switch (pageType) {
      case 'homepage':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: description,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_URL}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/logo.png`
            }
          }
        });

      case 'islands':
      case 'guides':
        if (islandData) {
          return JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: islandData.name,
            description: islandData.description || description,
            url: canonical,
            image: imageUrl,
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Cyclades',
              addressCountry: 'GR'
            }
          });
        }
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description: description,
          url: canonical
        });

      case 'hotels':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description: description,
          url: canonical,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: []
          }
        });

      case 'blog':
        if (article) {
          return JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: imageUrl,
            datePublished: article.publishedTime,
            dateModified: article.modifiedTime || article.publishedTime,
            author: {
              '@type': 'Person',
              name: article.author || SITE_NAME
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`
              }
            }
          });
        }
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: title,
          description: description,
          url: canonical
        });

      case 'touristas-ai':
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Touristas AI',
          description: description,
          url: canonical,
          applicationCategory: 'TravelApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          }
        });

      default:
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: description,
          url: canonical
        });
    }
  };

  const canonical = getCanonicalUrl();
  const imageUrl = getImageUrl();
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : (keywords || '');
  const structuredDataJson = generateStructuredData();

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* OpenGraph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OpenGraph Tags */}
      {article && ogType === 'article' && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags && article.tags.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Hreflang Tags */}
      {alternateLanguages && alternateLanguages.map((lang, i) => (
        <link key={i} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {structuredDataJson}
      </script>
    </Helmet>
  );
}
