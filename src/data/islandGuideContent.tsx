import React from 'react';
import { FaUmbrellaBeach, FaHotel, FaWineGlass, FaSun, FaCameraRetro, FaRoute, FaShip, FaMapMarkedAlt, FaUtensils } from 'react-icons/fa';

export const mykonosContent = {
  introduction: {
    text1: "Welcome to Mykonos, the crown jewel of the Aegean Sea. This cosmopolitan island combines glamorous beaches, world-class nightlife, and picturesque Cycladic architecture to create an unforgettable Greek island experience.",
    text2: "From the iconic windmills and Little Venice to the pristine beaches and vibrant nightlife, Mykonos offers something for everyone. Whether you're seeking luxury experiences, beach parties, or authentic Greek culture, our guide will help you make the most of your visit to this enchanting island."
  },
  quickLinks: [
    {
      icon: <FaUmbrellaBeach className="text-3xl text-blue-500 mb-4" />,
      title: "Paradise Beaches",
      description: "Discover world-famous beaches known for crystal clear waters and beach parties.",
      link: "#beaches"
    },
    {
      icon: <FaHotel className="text-3xl text-blue-500 mb-4" />,
      title: "Luxury Stays",
      description: "Experience boutique hotels and luxury resorts with stunning Aegean views.",
      link: "#accommodation"
    },
    {
      icon: <FaWineGlass className="text-3xl text-blue-500 mb-4" />,
      title: "Nightlife & Dining",
      description: "Explore world-class restaurants and legendary nightlife venues.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      icon: <FaSun className="text-3xl text-blue-500 mb-4" />,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Perfect beach weather", "Vibrant nightlife", "Celebrity spotting"]
    },
    {
      icon: <FaCameraRetro className="text-3xl text-blue-500 mb-4" />,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Pleasant weather", "Fewer crowds", "Better prices"]
    },
    {
      icon: <FaRoute className="text-3xl text-blue-500 mb-4" />,
      title: "Best for Activities",
      period: "April-May, September-October",
      bullets: ["Sightseeing weather", "Water sports", "Island hopping"]
    },
    {
      icon: <FaShip className="text-3xl text-blue-500 mb-4" />,
      title: "Low Season",
      period: "November to March",
      bullets: ["Local experience", "Quiet beaches", "Budget friendly"]
    }
  ],
  villages: [
    {
      name: "Mykonos Town (Chora)",
      description: "The island's picturesque capital, famous for its windmills, Little Venice, and maze-like streets filled with boutiques and restaurants.",
      imageQuery: "mykonos,town",
      highlights: [
        "Iconic windmills",
        "Little Venice waterfront",
        "Designer shopping",
        "Traditional tavernas"
      ]
    },
    {
      name: "Ano Mera",
      description: "The second largest village on Mykonos, offering an authentic Greek experience away from the tourist crowds.",
      imageQuery: "mykonos,monastery",
      highlights: [
        "Panagia Tourliani Monastery",
        "Traditional square",
        "Local tavernas",
        "Authentic atmosphere"
      ]
    }
  ],
  activities: [
    {
      title: "Beach Life",
      items: [
        "Paradise Beach parties",
        "Super Paradise Beach clubs",
        "Psarou Beach luxury",
        "Water sports at Kalafatis"
      ]
    },
    {
      title: "Cultural Experiences",
      items: [
        "Windmills photography",
        "Little Venice sunset",
        "Paraportiani Church",
        "Archaeological Museum"
      ]
    },
    {
      title: "Food & Nightlife",
      items: [
        "Sunset cocktails",
        "Beach club parties",
        "Traditional tavernas",
        "Wine tasting"
      ]
    }
  ]
};

export const parosContent = {
  introduction: {
    text1: "Welcome to Paros, a Cycladic gem that perfectly balances traditional Greek island life with modern amenities. Known for its stunning beaches, charming villages, and excellent water sports conditions, Paros offers an authentic Greek island experience.",
    text2: "Whether you're interested in windsurfing at Golden Beach, exploring the narrow streets of Parikia, or enjoying fresh seafood in Naoussa, Paros has something for everyone. Our guide will help you discover the best this versatile island has to offer."
  },
  quickLinks: [
    {
      icon: <FaUmbrellaBeach className="text-3xl text-blue-500 mb-4" />,
      title: "Golden Beaches",
      description: "Experience world-class beaches perfect for swimming and water sports.",
      link: "#beaches"
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl text-blue-500 mb-4" />,
      title: "Charming Villages",
      description: "Explore picturesque villages with authentic Cycladic character.",
      link: "#villages"
    },
    {
      icon: <FaUtensils className="text-3xl text-blue-500 mb-4" />,
      title: "Local Cuisine",
      description: "Savor fresh seafood and traditional Greek dishes.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      icon: <FaSun className="text-3xl text-blue-500 mb-4" />,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Perfect weather", "Vibrant atmosphere", "Water sports"]
    },
    {
      icon: <FaCameraRetro className="text-3xl text-blue-500 mb-4" />,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Pleasant weather", "Fewer tourists", "Better rates"]
    },
    {
      icon: <FaRoute className="text-3xl text-blue-500 mb-4" />,
      title: "Best for Activities",
      period: "June-September",
      bullets: ["Windsurfing", "Hiking", "Island hopping"]
    },
    {
      icon: <FaShip className="text-3xl text-blue-500 mb-4" />,
      title: "Low Season",
      period: "October to April",
      bullets: ["Authentic experience", "Quiet beaches", "Local events"]
    }
  ],
  villages: [
    {
      name: "Naoussa",
      description: "A picturesque fishing village turned sophisticated resort town, known for its vibrant dining scene and charming port.",
      imageQuery: "paros,naoussa",
      highlights: [
        "Venetian port",
        "Fresh seafood tavernas",
        "Boutique shopping",
        "Sunset views"
      ]
    },
    {
      name: "Parikia",
      description: "The island's capital and main port, featuring a mix of traditional architecture and modern amenities.",
      imageQuery: "paros,parikia",
      highlights: [
        "Panagia Ekatontapiliani",
        "Old Market Street",
        "Frankish Castle",
        "Waterfront restaurants"
      ]
    }
  ],
  activities: [
    {
      title: "Water Activities",
      items: [
        "Windsurfing at Golden Beach",
        "Sailing trips",
        "Snorkeling",
        "Beach hopping"
      ]
    },
    {
      title: "Cultural Sites",
      items: [
        "Valley of Butterflies",
        "Ancient marble quarries",
        "Byzantine Road",
        "Traditional villages"
      ]
    },
    {
      title: "Food & Wine",
      items: [
        "Wine tasting",
        "Cooking classes",
        "Fish tavernas",
        "Local markets"
      ]
    }
  ]
};

// Add more island content here...

export const naxosContent = {
  introduction: {
    text1: "Welcome to Naxos, the largest and most fertile island of the Cyclades. Known for its exceptional beaches, ancient ruins, and traditional mountain villages, Naxos offers a perfect blend of history, culture, and natural beauty.",
    text2: "From the iconic Portara gateway to the endless golden beaches and the traditional villages of the interior, Naxos provides a diverse range of experiences. Whether you're a history buff, beach lover, or food enthusiast, our guide will help you discover the best of this magnificent island."
  },
  quickLinks: [
    {
      icon: <FaUmbrellaBeach className="text-3xl text-blue-500 mb-4" />,
      title: "Endless Beaches",
      description: "Discover some of the finest and longest beaches in the Cyclades.",
      link: "#beaches"
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl text-blue-500 mb-4" />,
      title: "Mountain Villages",
      description: "Explore traditional villages with authentic culture and architecture.",
      link: "#villages"
    },
    {
      icon: <FaUtensils className="text-3xl text-blue-500 mb-4" />,
      title: "Local Gastronomy",
      description: "Experience the island's renowned agricultural products and cuisine.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      icon: <FaSun className="text-3xl text-blue-500 mb-4" />,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Beach perfect", "Lively atmosphere", "Cultural events"]
    },
    {
      icon: <FaCameraRetro className="text-3xl text-blue-500 mb-4" />,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Ideal weather", "Quieter beaches", "Better rates"]
    },
    {
      icon: <FaRoute className="text-3xl text-blue-500 mb-4" />,
      title: "Best for Activities",
      period: "April-October",
      bullets: ["Hiking trails", "Water sports", "Village exploring"]
    },
    {
      icon: <FaShip className="text-3xl text-blue-500 mb-4" />,
      title: "Low Season",
      period: "November to March",
      bullets: ["Local experience", "Green landscapes", "Winter charm"]
    }
  ],
  villages: [
    {
      name: "Chora (Naxos Town)",
      description: "The island's capital and main port, featuring a medieval castle, waterfront restaurants, and the famous Portara gateway.",
      imageQuery: "naxos,castle",
      highlights: [
        "Venetian Castle",
        "Apollo's Gate (Portara)",
        "Old Market",
        "Waterfront dining"
      ]
    },
    {
      name: "Halki",
      description: "A former capital of Naxos, known for its Venetian towers, traditional architecture, and local products.",
      imageQuery: "naxos,halki",
      highlights: [
        "Kitron distillery",
        "Byzantine churches",
        "Traditional workshops",
        "Venetian towers"
      ]
    }
  ],
  activities: [
    {
      title: "Beach Activities",
      items: [
        "Windsurfing at Plaka",
        "Swimming at Agios Prokopios",
        "Kitesurfing",
        "Beach hiking"
      ]
    },
    {
      title: "Cultural Experiences",
      items: [
        "Temple of Demeter",
        "Venetian Museum",
        "Traditional weaving",
        "Pottery workshops"
      ]
    },
    {
      title: "Food & Agriculture",
      items: [
        "Cheese tasting",
        "Olive oil tours",
        "Wine tasting",
        "Cooking classes"
      ]
    }
  ]
};

// Continue adding content for other islands...
