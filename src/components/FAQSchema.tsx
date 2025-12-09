import { Helmet } from 'react-helmet-async';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  pageUrl?: string;
}

/**
 * FAQSchema Component - Generates FAQPage structured data for Google rich snippets
 * Add this to any page with FAQ content to get expandable FAQ results in search
 */
export default function FAQSchema({ faqs, pageUrl }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    ...(pageUrl && { "url": pageUrl })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}

/**
 * Hook to generate FAQ schema data
 * Usage: const schema = useFAQSchema(faqs);
 */
export function useFAQSchema(faqs: FAQ[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
