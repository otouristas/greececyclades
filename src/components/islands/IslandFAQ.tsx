import React from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface IslandFAQProps {
  islandName: string;
  faqs: FAQItem[];
}

const IslandFAQ: React.FC<IslandFAQProps> = ({ islandName, faqs }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  // JSON-LD Schema for FAQs
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
    }))
  };

  return (
    <section className="mb-16" data-test-id="island-faq">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Info className="w-6 h-6 mr-2 text-blue-600" />
        Frequently Asked Questions about {islandName}
      </h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4">
            <button 
              className="flex justify-between items-center w-full text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="mt-3 text-gray-600 text-sm leading-relaxed pl-1 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default IslandFAQ;
