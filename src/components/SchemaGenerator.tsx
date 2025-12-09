
import React from 'react';

interface SchemaGeneratorProps {
  pageType: 'Homepage' | 'Hotel' | 'HotelListing' | 'Location' | 'Blog' | 'BlogPost' | 'About' | 'Contact' | 'FAQ' | 'TravelGuide';
  data?: {
    name?: string;
    description?: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
    breadcrumbs?: Array<{name: string, item: string}>;
    hotel?: {
      name: string;
      location?: string;
      type?: string;
      priceRange?: string;
      rating?: number;
      ratingCount?: number;
      telephone?: string;
      email?: string;
      amenities?: string[];
      checkInTime?: string;
      checkOutTime?: string;
      images?: string[];
    };
    faq?: Array<{question: string, answer: string}>;
    hotels?: Array<{name: string, url: string, position: number}>;
  };
}

// Define a more flexible schema type that allows for various properties
interface SchemaObject {
  "@context"?: string;
  "@type": string;
  "@id"?: string;
  [key: string]: any; // Allow for any additional properties
}

interface BaseSchema {
  "@context": string;
  "@graph": SchemaObject[];
}

const SchemaGenerator: React.FC<SchemaGeneratorProps> = ({ pageType, data = {} }) => {
  // Base schema with WebSite information
  const baseSchema: BaseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://hotelssantorini.gr/#website",
        "url": "https://hotelssantorini.gr/",
        "name": "Hotels Santorini",
        "description": "Find Your Perfect Stay in Santorini - Best Hotels & Accommodation",
        "publisher": {
          "@type": "Organization",
          "@id": "https://hotelssantorini.gr/#organization",
          "name": "Hotels Santorini",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://hotelssantorini.gr/#logo",
            "url": "https://hotelssantorini.gr/lovable-uploads/18f3243f-e98a-4341-8b0a-e7ea71ce61bf.png",
            "width": 240,
            "height": 80,
            "caption": "Hotels Santorini"
          }
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://hotelssantorini.gr/hotels?query={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      }
    ]
  };

  // Generate breadcrumb schema
  let breadcrumbSchema: SchemaObject | null = null;
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": "https://hotelssantorini.gr/#breadcrumb",
      "itemListElement": data.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.item
      }))
    };
    baseSchema["@graph"].push(breadcrumbSchema);
  }

  // Add page-specific schema
  switch(pageType) {
    case 'Homepage':
      baseSchema["@graph"].push({
        "@type": "Organization",
        "@id": "https://hotelssantorini.gr/#organization",
        "name": "HotelsSantorini.gr",
        "url": "https://hotelssantorini.gr/",
        "description": "Comprehensive guide to hotels in Santorini, Greece",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://hotelssantorini.gr/#logo",
          "url": "https://hotelssantorini.gr/lovable-uploads/18f3243f-e98a-4341-8b0a-e7ea71ce61bf.png",
          "width": 240,
          "height": 80,
          "caption": "Hotels Sifnos"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "247"
        },
        "sameAs": [
          "https://www.facebook.com/hotelssantorini",
          "https://www.instagram.com/hotelssantorini",
          "https://twitter.com/hotelssantorini"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+30-22840-31555",
          "contactType": "customer service",
          "areaServed": "GR",
          "availableLanguage": ["English", "Greek"]
        }
      });
      break;

    case 'Hotel':
      if (data.hotel) {
        const hotelSchema: SchemaObject = {
          "@type": "Hotel",
          "@id": `https://hotelssantorini.gr/hotels/${data.hotel.name.toLowerCase().replace(/\s+/g, '-')}#hotel`,
          "name": data.hotel.name,
          "description": data.description || `${data.hotel.name} in Santorini, Greece`,
          "url": `https://hotelssantorini.gr/hotels/${data.hotel.name.toLowerCase().replace(/\s+/g, '-')}`,
          "image": data.image || data.hotel.images?.[0] || "https://hotelssantorini.gr/uploads/santorini/og-image.jpg",
          "priceRange": data.hotel.priceRange || "€€€",
          "starRating": {
            "@type": "Rating",
            "ratingValue": data.hotel.rating?.toString() || "4"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.hotel.location || "Santorini",
            "addressLocality": data.hotel.location || "Santorini",
            "addressRegion": "Cyclades",
            "addressCountry": "GR",
            "postalCode": "84003"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "36.9777",
            "longitude": "24.7458"
          },
          "telephone": data.hotel.telephone || "+30 2284031370"
        };
        
        // Add rating if available
        if (data.hotel.rating) {
          hotelSchema["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": data.hotel.rating.toString(),
            "reviewCount": (data.hotel.ratingCount || 42).toString(),
            "bestRating": "5",
            "worstRating": "1"
          };
        }
        
        // Add amenities if available
        if (data.hotel.amenities && data.hotel.amenities.length > 0) {
          hotelSchema["amenityFeature"] = data.hotel.amenities.map(amenity => ({
            "@type": "LocationFeatureSpecification",
            "name": amenity,
            "value": true
          }));
        }
        
        // Add check-in/check-out times if available
        if (data.hotel.checkInTime) {
          hotelSchema["checkinTime"] = data.hotel.checkInTime;
        }
        if (data.hotel.checkOutTime) {
          hotelSchema["checkoutTime"] = data.hotel.checkOutTime;
        }
        
        // Add images if available
        if (data.hotel.images && data.hotel.images.length > 0) {
          hotelSchema["photo"] = data.hotel.images.map(image => ({
            "@type": "ImageObject",
            "@id": image,
            "url": image,
            "width": 800,
            "height": 600,
            "caption": `${data.hotel.name} - Image`
          }));
        }
        
        baseSchema["@graph"].push(hotelSchema);
      }
      break;

    case 'HotelListing':
      if (data.hotels && data.hotels.length > 0) {
        baseSchema["@graph"].push({
          "@type": "ItemList",
          "@id": "https://hotelssantorini.gr/hotels/#itemlist",
          "itemListElement": data.hotels.map(hotel => ({
            "@type": "ListItem",
            "position": hotel.position,
            "name": hotel.name,
            "url": hotel.url
          }))
        });
      } else {
        // Fallback to default list if no hotels provided
        baseSchema["@graph"].push({
          "@type": "ItemList",
          "@id": "https://hotelssantorini.gr/hotels/#itemlist",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Luxury Hotels in Santorini",
              "url": "https://hotelssantorini.gr/luxury-hotels-in-santorini-greece"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Santorini Honeymoon Hotels",
              "url": "https://hotelssantorini.gr/santorini-honeymoon-hotels"
            },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Santorini Villas",
            "url": "https://hotelssantorini.gr/santorini-villas"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Santorini Beach Hotels",
            "url": "https://hotelssantorini.gr/santorini-beach-hotels"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Santorini Boutique Hotels",
            "url": "https://hotelssantorini.gr/santorini-boutique-hotels"
          }
          ]
        });
      }
      break;

    case 'Location':
      baseSchema["@graph"].push({
        "@type": "TouristDestination",
        "@id": `https://hotelssantorini.gr/locations/${data.name?.toLowerCase().replace(/\s+/g, '-')}#destination`,
        "name": data.name || "Santorini",
        "description": data.description || "Discover the beautiful island of Santorini in the Cyclades, Greece",
        "url": `https://hotelssantorini.gr/locations/${data.name?.toLowerCase().replace(/\s+/g, '-')}`,
        "touristType": ["Beach tourism", "Cultural tourism", "Culinary tourism"],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.9777",
          "longitude": "24.7458"
        }
      });
      break;

    case 'Blog':
      baseSchema["@graph"].push({
        "@type": "Blog",
        "@id": "https://hotelssantorini.gr/blog/#blog",
        "name": "Santorini Travel Blog",
        "description": "Expert travel guides, hotel reviews, and local insights for Santorini Island",
        "url": "https://hotelssantorini.gr/blog/"
      });
      break;

    case 'BlogPost':
      baseSchema["@graph"].push({
        "@type": "BlogPosting",
        "@id": `https://hotelssantorini.gr/blog/${data.name?.toLowerCase().replace(/\s+/g, '-')}#article`,
        "headline": data.name || "Santorini Travel Guide",
        "description": data.description || "Discover the beautiful island of Santorini in the Cyclades, Greece",
        "image": data.image || "https://hotelssantorini.gr/uploads/santorini/og-image.jpg",
        "author": {
          "@type": "Person",
          "name": data.author || "Hotels Santorini Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hotels Santorini",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://hotelssantorini.gr/logo",
            "url": "https://hotelssantorini.gr/lovable-uploads/18f3243f-e98a-4341-8b0a-e7ea71ce61bf.png",
            "width": 240,
            "height": 80,
            "caption": "Hotels Santorini"
          }
        },
        "datePublished": data.datePublished || new Date().toISOString(),
        "dateModified": data.dateModified || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://hotelssantorini.gr/blog/${data.name?.toLowerCase().replace(/\s+/g, '-')}`
        }
      });
      break;

    case 'FAQ':
      if (data.faq && data.faq.length > 0) {
        baseSchema["@graph"].push({
          "@type": "FAQPage",
          "@id": "https://hotelssantorini.gr/faq/#faqpage",
          "mainEntity": data.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        });
      }
      break;

    case 'TravelGuide':
      baseSchema["@graph"].push({
        "@type": "TouristAttraction",
        "@id": "https://hotelssantorini.gr/travel-guide/#tourist-attraction",
        "name": "Santorini Island",
        "description": "A comprehensive guide to Santorini Island in the Cyclades, Greece",
        "url": "https://hotelssantorini.gr/travel-guide/",
        "image": "https://hotelssantorini.gr/uploads/santorini/og-image.jpg",
        "isAccessibleForFree": true,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Cyclades",
          "addressCountry": "Greece"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.9777",
          "longitude": "24.7458"
        }
      });
      break;

    default:
      break;
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
};

export default SchemaGenerator;
