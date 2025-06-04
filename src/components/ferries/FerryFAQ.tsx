import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FerryFAQProps {
  className?: string;
}

const FerryFAQ: React.FC<FerryFAQProps> = ({ className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQ data
  const faqs: FAQ[] = [
    {
      question: "What's the best way to book ferry tickets to the Cyclades islands?",
      answer: "The best way to book ferry tickets to the Cyclades is through Ferryscanner, which compares all available routes, schedules, and prices from different ferry companies. You can book online in advance to secure your preferred travel dates, especially during the high season (June-September)."
    },
    {
      question: "How far in advance should I book my ferry tickets?",
      answer: "For travel during the high season (June-September), it's recommended to book at least 2-3 months in advance, especially for popular routes like Athens to Mykonos or Santorini. For shoulder season (April-May, October), booking 3-4 weeks ahead is usually sufficient. In the low season, you can often book just a few days before travel."
    },
    {
      question: "Can I take my car on the ferry to the Cyclades islands?",
      answer: "Yes, most conventional ferries allow vehicles. You'll need to book a vehicle space when purchasing your ticket. High-speed ferries usually don't accept vehicles or have limited space. Remember that having a car on islands can be convenient but parking can be difficult in high season, and some islands have restrictions on non-local vehicles."
    },
    {
      question: "What's the difference between conventional and high-speed ferries?",
      answer: "Conventional ferries are larger, more stable in rough seas, and usually cheaper, but slower (5-8 hours from Athens to Santorini). High-speed ferries are faster (3-5 hours on the same route) but more expensive, can be canceled in bad weather, and offer a less scenic experience as passengers must remain seated in enclosed areas."
    },
    {
      question: "Are ferries reliable in the Cyclades?",
      answer: "Ferries in the Cyclades are generally reliable, but delays can occur due to weather conditions, especially in winter or during strong meltemi winds in summer. High-speed ferries are more likely to be canceled in bad weather. It's advisable to have flexible plans and check for updates before traveling."
    },
    {
      question: "What ferry ticket classes are available?",
      answer: "Ferry tickets typically come in several classes: Deck/Economy (basic seating), Reserved Airline-style Seats (assigned seating), Business/Club Class (premium seating with services), and Cabins (private rooms with beds for longer journeys). Classes and amenities vary by ferry company and vessel type."
    },
    {
      question: "Can I island hop in the Cyclades with ferries?",
      answer: "Yes, island hopping is one of the best ways to experience the Cyclades. Many islands are connected by direct ferries, especially in high season. Popular island-hopping routes include Athens-Mykonos-Santorini or Athens-Syros-Tinos-Mykonos. You can book each leg separately through Ferryscanner."
    },
    {
      question: "Are there any discounts available for ferry tickets?",
      answer: "Yes, discounts are often available for children (usually 50% off for ages 5-10, free for under 5), students with international student ID, seniors, and large groups. Some ferry companies also offer early booking discounts or round-trip fare reductions. These discounts can be applied when booking through Ferryscanner."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // JSON-LD structured data for SEO
  const jsonLd = {
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
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* JSON-LD script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default FerryFAQ;
