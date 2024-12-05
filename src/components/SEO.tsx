import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps } from '../utils/seo';

interface SEOComponentProps extends SEOProps {
  image?: string;
  structuredData?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogType = 'website', 
  canonicalUrl, 
  image,
  structuredData 
}: SEOComponentProps) {
  const siteName = 'Greece Cyclades';
  const domain = 'https://greececyclades.com'; // Replace with actual domain

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {canonicalUrl && (
        <>
          <link rel="canonical" href={`${domain}${canonicalUrl}`} />
          <meta property="og:url" content={`${domain}${canonicalUrl}`} />
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="GR" />
      <meta name="geo.placename" content="Cyclades" />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
    </Helmet>
  );
}