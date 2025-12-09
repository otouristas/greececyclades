
import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface HotelFAQsProps {
  hotelName: string;
}

const HotelFAQs = ({ hotelName }: HotelFAQsProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  // Filladaki Villas FAQs
  const filadakiVillasFaqs = [
    {
      question: "Where is Filladaki Villas located?",
      answer: "In Kamares, Sifnos – just 550 meters from the beach, overlooking the Aegean Sea."
    },
    {
      question: "What types of villas are available?",
      answer: "Gregos: 65m², 4 guests\nLevantes: 70m², 4 guests\nOstria: 100m², 5 guests\nMaistros: 50m², 2 guests"
    },
    {
      question: "Is there a swimming pool?",
      answer: "Yes, with a bar and panoramic sea view."
    },
    {
      question: "Are the villas family-friendly?",
      answer: "Absolutely. Spacious layouts, private verandas, and full amenities make them ideal for families or groups."
    },
    {
      question: "What amenities are included?",
      answer: "Full kitchens, washing machines, dishwashers, smart TVs, free Wi-Fi, private parking, and sea-view balconies."
    },
    {
      question: "Is breakfast included?",
      answer: "Breakfast items are provided upon arrival."
    },
    {
      question: "Are pets allowed?",
      answer: "No, pets are not permitted."
    }
  ];

  // Morpheas Pension & Apartments FAQs
  const morpheasPensionFaqs = [
    {
      question: "How close is it to the beach?",
      answer: "Just 80 meters from Kamares Beach."
    },
    {
      question: "What room types are available?",
      answer: "Studio (2 guests)\nDouble Room\nTriple Room\nApartment for 4\nApartment for 5"
    },
    {
      question: "Do rooms have kitchenettes?",
      answer: "Studios and apartments do. Double and triple rooms include light refreshment facilities."
    },
    {
      question: "Is air conditioning available?",
      answer: "Yes, in all rooms."
    },
    {
      question: "Is Wi-Fi provided?",
      answer: "Yes, complimentary Wi-Fi is available in all areas."
    },
    {
      question: "Is there private parking?",
      answer: "Free public parking is available nearby."
    },
    {
      question: "Do rooms have private bathrooms?",
      answer: "Yes, all rooms include private bathrooms with shower and toiletries."
    },
    {
      question: "Are pets allowed?",
      answer: "Not specified—contact property directly."
    }
  ];

  // Villa Olivia Clara FAQs
  const villaOliviaFaqs = [
    {
      question: "Where is the villa located?",
      answer: "In Platis Gialos, Sifnos – 7 minutes' walk from the beach."
    },
    {
      question: "How many guests can it accommodate?",
      answer: "Up to 8 guests, with 4 bedrooms and 4.5 bathrooms."
    },
    {
      question: "What amenities are included?",
      answer: "Private 12m x 5m pool\nGarden, terraces, BBQ\nFully equipped kitchen\nSmart TV, books, games\nWashing machine, baby crib\nHigh-speed Wi-Fi"
    },
    {
      question: "Are extra services available?",
      answer: "Yes – private chef, childcare, boat tours, transfers, and event hosting (on request)."
    },
    {
      question: "Is parking provided?",
      answer: "Yes, for up to 5 cars."
    },
    {
      question: "Is there housekeeping?",
      answer: "Yes, twice a week with linen and towel changes."
    }
  ];

  // ALK HOTEL FAQs
  const alkHotelFaqs = [
    {
      question: "Where is ALK HOTEL™ located?",
      answer: "In Agia Marina – Kamares, Sifnos, just 150 meters from Agia Marina Beach."
    },
    {
      question: "What types of rooms are available?",
      answer: "Comfort Double\nComfort Triple\nSuperior Sea View\nSuperior Plus (1–3 guests)"
    },
    {
      question: "What services are offered?",
      answer: "Concierge & travel desk\nDaily housekeeping\nMassage services (on request)\nCar/bike/boat rental\nFront desk (16 hours)\nWake-up calls & welcome drink"
    },
    {
      question: "Are there dining options?",
      answer: "Yes – breakfast buffet, early breakfast, and a 24h self-service bar with sunset views."
    },
    {
      question: "What amenities are included?",
      answer: "A/C, Smart TVs, minibars, safety deposit boxes, deluxe bath items, beach towels, and free Wi-Fi."
    },
    {
      question: "Is the hotel child-friendly?",
      answer: "Yes, for children over 9 years old."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancel ≥30 days: Free\nCancel <30 days: 50% charge\nNo-show: 100% charge\nPrepayment: 50% required 30 days prior"
    }
  ];

  // Meropi Rooms FAQs
  const meropiRoomsFaqs = [
    {
      question: "Where is Meropi Rooms located?",
      answer: "In Kamares, Sifnos, only 100 meters from the beach and steps from the port and local shops."
    },
    {
      question: "What room types are offered?",
      answer: "Double Room\nTriple Room\nStudio with Sea View"
    },
    {
      question: "Do rooms have private balconies?",
      answer: "Yes, all rooms include a private balcony – many with sea views."
    },
    {
      question: "Is there air conditioning?",
      answer: "Yes, in every room."
    },
    {
      question: "Is Wi-Fi available?",
      answer: "Yes, free Wi-Fi in all areas."
    },
    {
      question: "Are there private bathrooms?",
      answer: "Yes, all rooms feature private bathrooms with shower, hairdryer, and toiletries."
    },
    {
      question: "Do rooms include kitchens?",
      answer: "Studios include a small kitchen. All rooms have a kettle and fridge."
    },
    {
      question: "Is parking available?",
      answer: "Yes, free public parking nearby."
    },
    {
      question: "Is daily cleaning provided?",
      answer: "Yes, with excellent reviews for cleanliness."
    },
    {
      question: "Are pets allowed?",
      answer: "Not mentioned – contact the property to confirm."
    },
    {
      question: "Is breakfast available?",
      answer: "No formal breakfast is provided, but many cafes are nearby."
    }
  ];

  // Generic FAQs for hotels not in the list
  const genericFaqs = [
    {
      question: "What are the check-in and check-out times?",
      answer: "Standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
    },
    {
      question: "Is breakfast included in the room rate?",
      answer: "Yes, most of our rates include a complimentary breakfast buffet featuring local products and traditional Greek breakfast items."
    },
    {
      question: "Does the hotel have parking facilities?",
      answer: "Yes, we offer free parking for our guests. However, spaces may be limited during peak season."
    },
    {
      question: "Is there Wi-Fi available at the hotel?",
      answer: "Yes, we provide complimentary high-speed Wi-Fi throughout the hotel property."
    },
    {
      question: "How far is the hotel from the beach?",
      answer: "Our hotel is located approximately 5 minutes walking distance from the nearest beach."
    },
    {
      question: "Are there restaurants nearby?",
      answer: "Yes, there are several excellent restaurants, tavernas, and cafes within walking distance from the hotel."
    },
    {
      question: "Do you have facilities for guests with disabilities?",
      answer: "We have several rooms designed for accessibility and common areas are wheelchair accessible. Please contact us directly for specific requirements."
    },
    {
      question: "How can I get to the hotel from the port?",
      answer: "We offer transfer services from the port upon request. Alternatively, taxis are available at the port, or you can rent a car or scooter."
    }
  ];

  // Determine which FAQs to display based on hotel name
  let faqs = genericFaqs;
  if (hotelName.includes("Filadaki Villas")) {
    faqs = filadakiVillasFaqs;
  } else if (hotelName.includes("Morpheas Pension")) {
    faqs = morpheasPensionFaqs;
  } else if (hotelName.includes("Villa Olivia Clara")) {
    faqs = villaOliviaFaqs;
  } else if (hotelName.includes("ALK HOTEL")) {
    faqs = alkHotelFaqs;
  } else if (hotelName.includes("Meropi")) {
    faqs = meropiRoomsFaqs;
  }

  return (
    <div className="space-y-0">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="border-b border-gray-200 last:border-b-0"
        >
          <button 
            className={`flex justify-between items-center w-full text-left font-semibold text-sifnos-deep-blue py-4 px-0 hover:text-sifnos-turquoise transition-colors ${
              openFaqIndex === index ? 'text-sifnos-turquoise' : ''
            }`}
            onClick={() => toggleFaq(index)}
          >
            <span className="text-base md:text-lg pr-4">{faq.question}</span>
            {openFaqIndex === index ? (
              <MinusCircle size={20} className="text-sifnos-turquoise flex-shrink-0" />
            ) : (
              <PlusCircle size={20} className="text-sifnos-turquoise flex-shrink-0" />
            )}
          </button>
          
          {openFaqIndex === index && (
            <div className="pb-4 text-gray-700 leading-relaxed whitespace-pre-line">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelFAQs;
