import { IconType } from 'react-icons';
import { FaUmbrellaBeach, FaMapMarkedAlt, FaUtensils, FaSun, FaCameraRetro, FaRoute, FaShip } from 'react-icons/fa';

interface QuickLink {
  iconType: IconType;
  title: string;
  description: string;
  link: string;
}

interface WhenToVisit {
  iconType: IconType;
  title: string;
  period: string;
  bullets: string[];
}

interface Village {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Activity {
  title: string;
  items: string[];
}

interface Beach {
  name: string;
  description: string;
  imageQuery: string;
  highlights: string[];
}

interface Dining {
  name: string;
  description: string;
  recommendations: string[];
}

interface GuideContent {
  introduction: {
    text1: string;
    text2: string;
  };
  quickLinks: QuickLink[];
  whenToVisit: WhenToVisit[];
  villages: Village[];
  activities: Activity[];
  beaches: Beach[];
  dining: Dining[];
}

export const parosContent: GuideContent = {
  introduction: {
    text1: "Welcome to Paros, a stunning island in the heart of the Cyclades that perfectly balances traditional charm with modern comfort.",
    text2: "Known for its beautiful beaches, picturesque villages, and vibrant nightlife, Paros offers something for every type of traveler."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Beautiful Beaches",
      description: "From Golden Beach to Kolimbithres, discover Paros' most stunning shores.",
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Charming Villages",
      description: "Explore Naoussa, Parikia, and traditional mountain settlements.",
      link: "#villages"
    },
    {
      iconType: FaUtensils,
      title: "Local Cuisine",
      description: "Taste authentic Cycladic flavors and fresh seafood.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Perfect beach weather", "Vibrant nightlife", "All facilities open"]
    },
    {
      iconType: FaCameraRetro,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Pleasant temperatures", "Fewer crowds", "Better rates"]
    },
    {
      iconType: FaRoute,
      title: "Best for Activities",
      period: "May-October",
      bullets: ["Windsurfing", "Hiking", "Island hopping"]
    },
    {
      iconType: FaShip,
      title: "Low Season",
      period: "November to April",
      bullets: ["Authentic experience", "Peaceful atmosphere", "Budget friendly"]
    }
  ],
  villages: [
    {
      name: "Parikia",
      description: "The capital and main port of Paros, featuring the iconic Panagia Ekatontapiliani church and a charming old town.",
      imageQuery: "paros,parikia",
      highlights: [
        "Panagia Ekatontapiliani",
        "Old Market Street",
        "Frankish Castle",
        "Waterfront restaurants"
      ]
    },
    {
      name: "Naoussa",
      description: "A picturesque fishing village turned cosmopolitan hub, known for its Venetian port and vibrant nightlife.",
      imageQuery: "paros,naoussa",
      highlights: [
        "Venetian Port",
        "Old fishing harbor",
        "Boutique shopping",
        "Seaside tavernas"
      ]
    },
    {
      name: "Lefkes",
      description: "A beautiful mountain village with traditional Cycladic and neoclassical architecture.",
      imageQuery: "paros,lefkes",
      highlights: [
        "Byzantine Road",
        "Church of Agia Triada",
        "Traditional cafes",
        "Mountain views"
      ]
    }
  ],
  activities: [
    {
      title: "Water Activities",
      items: [
        "Windsurfing at Golden Beach",
        "Swimming at Kolimbithres",
        "Snorkeling in Santa Maria",
        "Sailing around the island"
      ]
    },
    {
      title: "Cultural Experiences",
      items: [
        "Visit the Frankish Castle",
        "Explore the Valley of Butterflies",
        "Tour the Panagia Ekatontapiliani",
        "Visit the Archaeological Museum"
      ]
    },
    {
      title: "Outdoor Adventures",
      items: [
        "Hike the Byzantine Road",
        "Mountain biking in Lefkes",
        "Visit the Paros Park",
        "Sunset at Naoussa Port"
      ]
    }
  ],
  beaches: [
    {
      name: "Kolimbithres",
      description: "Famous for its unique granite rock formations and crystal-clear waters.",
      imageQuery: "paros,kolimbithres",
      highlights: [
        "Unique rock formations",
        "Shallow waters",
        "Beach facilities",
        "Sunset views"
      ]
    },
    {
      name: "Golden Beach",
      description: "A long sandy beach known for excellent windsurfing conditions.",
      imageQuery: "paros,golden-beach",
      highlights: [
        "Windsurfing spot",
        "Water sports center",
        "Beach bars",
        "Family friendly"
      ]
    },
    {
      name: "Santa Maria",
      description: "A beautiful organized beach with clear waters and water sports facilities.",
      imageQuery: "paros,santa-maria",
      highlights: [
        "Water sports",
        "Beach clubs",
        "Snorkeling spots",
        "Sandy shore"
      ]
    }
  ],
  dining: [
    {
      name: "Traditional Tavernas",
      description: "Experience authentic Greek cuisine in family-run tavernas.",
      recommendations: [
        "Fresh seafood",
        "Local wine",
        "Traditional mezedes",
        "Island specialties"
      ]
    },
    {
      name: "Modern Restaurants",
      description: "Contemporary dining venues offering creative Greek cuisine.",
      recommendations: [
        "Fusion dishes",
        "Gourmet experiences",
        "Wine pairing",
        "Sunset dining"
      ]
    }
  ]
};

export const mykonosContent: GuideContent = {
  introduction: {
    text1: "Welcome to Mykonos, the cosmopolitan jewel of the Cyclades known for its vibrant nightlife and stunning beaches.",
    text2: "From iconic windmills to world-class restaurants, Mykonos combines traditional charm with luxury and sophistication."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Famous Beaches",
      description: "From Paradise to Super Paradise, discover Mykonos' legendary shores.",
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Iconic Landmarks",
      description: "Visit the windmills, Little Venice, and charming Chora.",
      link: "#landmarks"
    },
    {
      iconType: FaUtensils,
      title: "Dining & Nightlife",
      description: "Experience world-class restaurants and famous beach clubs.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Perfect weather", "Vibrant nightlife", "Celebrity spotting"]
    },
    {
      iconType: FaCameraRetro,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Pleasant weather", "Fewer crowds", "Better rates"]
    },
    {
      iconType: FaRoute,
      title: "Best for Activities",
      period: "May-October",
      bullets: ["Beach parties", "Water sports", "Island tours"]
    },
    {
      iconType: FaShip,
      title: "Low Season",
      period: "November to April",
      bullets: ["Local experience", "Quiet atmosphere", "Budget friendly"]
    }
  ],
  villages: [], // To be filled
  activities: [], // To be filled
  beaches: [], // To be filled
  dining: [] // To be filled
};

export const naxosContent: GuideContent = {
  introduction: {
    text1: "Welcome to Naxos, the largest and most fertile island of the Cyclades, rich in history and natural beauty.",
    text2: "Known for its long sandy beaches, ancient ruins, and traditional mountain villages, Naxos offers an authentic Greek island experience."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Endless Beaches",
      description: "Explore miles of golden sand beaches and crystal waters.",
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Mountain Villages",
      description: "Discover traditional settlements and local culture.",
      link: "#villages"
    },
    {
      iconType: FaUtensils,
      title: "Local Products",
      description: "Taste famous Naxian cheese, potatoes, and citrus.",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Peak Season",
      period: "July to August",
      bullets: ["Perfect weather", "All services open", "Family activities"]
    },
    {
      iconType: FaCameraRetro,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: ["Pleasant weather", "Fewer crowds", "Better rates"]
    },
    {
      iconType: FaRoute,
      title: "Best for Activities",
      period: "May-October",
      bullets: ["Hiking", "Swimming", "Cultural events"]
    },
    {
      iconType: FaShip,
      title: "Low Season",
      period: "November to April",
      bullets: ["Local experience", "Agricultural activities", "Budget friendly"]
    }
  ],
  villages: [], // To be filled
  activities: [], // To be filled
  beaches: [], // To be filled
  dining: [] // To be filled
};

export const koufonisiaContent: GuideContent = {
  introduction: {
    text1: "Welcome to Koufonisia, a hidden paradise in the Small Cyclades where pristine beaches meet crystal-clear waters.",
    text2: "This small island complex offers an authentic Greek island experience with its untouched natural beauty, traditional villages, and relaxed atmosphere."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Beaches",
      description: "Discover the stunning beaches of Koufonisia",
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Villages",
      description: "Explore the charming Chora and settlements",
      link: "#villages"
    },
    {
      iconType: FaRoute,
      title: "Activities",
      description: "Find the best things to do",
      link: "#activities"
    },
    {
      iconType: FaUtensils,
      title: "Dining",
      description: "Best local tavernas and restaurants",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Peak Season",
      period: "July - August",
      bullets: [
        "Warmest weather with temperatures 25-28°C",
        "Busiest period with most facilities open",
        "Perfect for swimming and beach activities",
        "Higher prices and more crowded"
      ]
    },
    {
      iconType: FaCameraRetro,
      title: "Shoulder Season",
      period: "May - June, September",
      bullets: [
        "Pleasant temperatures 20-25°C",
        "Quieter atmosphere with fewer tourists",
        "Great for hiking and exploring",
        "More affordable accommodation"
      ]
    }
  ],
  villages: [
    {
      name: "Chora",
      description: "The main settlement of Koufonisia, a picturesque village with traditional Cycladic architecture, narrow streets, and charming squares.",
      imageQuery: "koufonisia-chora",
      highlights: [
        "Traditional whitewashed houses",
        "Local tavernas and cafes",
        "Panagia Church",
        "Windmill",
        "Port area"
      ]
    }
  ],
  beaches: [
    {
      name: "Pori Beach",
      description: "The most famous beach on the island, known for its golden sand and crystal-clear turquoise waters.",
      imageQuery: "koufonisia-pori-beach",
      highlights: [
        "Fine golden sand",
        "Natural shade from trees",
        "Perfect for swimming",
        "Beach cantina in summer"
      ]
    },
    {
      name: "Fanos Beach",
      description: "A beautiful sandy beach on the north side of the island, popular with both locals and visitors.",
      imageQuery: "koufonisia-fanos-beach",
      highlights: [
        "Sandy beach with clear waters",
        "Good for snorkeling",
        "Beach bar facilities",
        "Sunset views"
      ]
    },
    {
      name: "Italida Beach",
      description: "A small, secluded beach known for its pristine waters and peaceful atmosphere.",
      imageQuery: "koufonisia-italida-beach",
      highlights: [
        "Secluded location",
        "Crystal clear waters",
        "Natural rock formations",
        "Great for swimming"
      ]
    }
  ],
  activities: [
    {
      title: "Water Activities",
      items: [
        "Swimming in crystal-clear waters",
        "Snorkeling around rocky coastlines",
        "Beach hopping by boat",
        "Kayaking along the coast",
        "Stand-up paddleboarding"
      ]
    },
    {
      title: "Land Activities",
      items: [
        "Hiking coastal paths",
        "Exploring traditional villages",
        "Photography walks",
        "Cycling around the island",
        "Watching stunning sunsets"
      ]
    }
  ],
  dining: [
    {
      name: "Local Tavernas",
      description: "Experience authentic Greek cuisine in family-run tavernas serving fresh seafood and local specialties.",
      recommendations: [
        "Captain Nikolas - Famous for fresh fish",
        "Finikas - Traditional Greek dishes",
        "Kalofeggo - Great sunset views",
        "To Steki - Local favorite"
      ]
    }
  ]
};

export const irakliaContent: GuideContent = {
  introduction: {
    text1: "Welcome to Iraklia, the smallest of the Small Cyclades and a pristine paradise for nature lovers and peace seekers.",
    text2: "This tranquil island offers an authentic escape with its untouched landscapes, hiking trails, and crystal-clear waters."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Beaches",
      description: "Discover secluded beaches and coves",
      link: "#beaches"
    },
    {
      iconType: FaRoute,
      title: "Hiking",
      description: "Explore scenic hiking trails",
      link: "#activities"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Villages",
      description: "Visit traditional settlements",
      link: "#villages"
    },
    {
      iconType: FaUtensils,
      title: "Dining",
      description: "Local tavernas and cuisine",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Best Season",
      period: "May - September",
      bullets: [
        "Perfect weather for hiking and swimming",
        "All facilities and tavernas open",
        "Regular boat connections",
        "Warm temperatures 25-28°C"
      ]
    },
    {
      iconType: FaCameraRetro,
      title: "Quiet Season",
      period: "April - May, September - October",
      bullets: [
        "Ideal for hiking and nature exploration",
        "Fewer tourists",
        "Mild temperatures 20-25°C",
        "More authentic experience"
      ]
    }
  ],
  villages: [
    {
      name: "Agios Georgios",
      description: "The main village and port of Iraklia, a peaceful settlement with traditional architecture and friendly locals.",
      imageQuery: "iraklia-agios-georgios",
      highlights: [
        "Traditional tavernas",
        "Mini markets",
        "Port facilities",
        "Local life",
        "Beautiful sunset views"
      ]
    },
    {
      name: "Panagia",
      description: "A small inland settlement with authentic Cycladic charm and important religious sites.",
      imageQuery: "iraklia-panagia",
      highlights: [
        "Traditional architecture",
        "Panagia Church",
        "Local festivities",
        "Mountain views"
      ]
    }
  ],
  beaches: [
    {
      name: "Livadi Beach",
      description: "The main beach of Iraklia, a long stretch of sand with crystal-clear waters and natural shade.",
      imageQuery: "iraklia-livadi-beach",
      highlights: [
        "Sandy beach",
        "Shallow waters",
        "Family-friendly",
        "Easy access",
        "Natural shade"
      ]
    },
    {
      name: "Tourkopigado",
      description: "A unique beach with a freshwater spring, creating an interesting mix of waters.",
      imageQuery: "iraklia-tourkopigado",
      highlights: [
        "Natural spring",
        "Unique swimming experience",
        "Scenic location",
        "Peaceful atmosphere"
      ]
    }
  ],
  activities: [
    {
      title: "Hiking Adventures",
      items: [
        "Trail to Cave of Saint John",
        "Path to Panagia settlement",
        "Coastal walks to beaches",
        "Mountain hiking to Papas peak",
        "Nature photography tours"
      ]
    },
    {
      title: "Water Activities",
      items: [
        "Swimming in crystal waters",
        "Snorkeling in caves",
        "Beach exploration",
        "Boat trips to nearby islands",
        "Fishing excursions"
      ]
    }
  ],
  dining: [
    {
      name: "Traditional Tavernas",
      description: "Experience authentic Greek island cuisine in family-run establishments serving fresh local products.",
      recommendations: [
        "Akathi - Fresh seafood and local specialties",
        "Maistrali - Traditional Greek dishes",
        "To Steki tou Spyrou - Home-cooked meals",
        "Sunset Taverna - Great views and food"
      ]
    }
  ]
};

export const schinoussaContent: GuideContent = {
  introduction: {
    text1: "Welcome to Schinoussa, a tiny paradise in the Small Cyclades known for its golden beaches and authentic island atmosphere.",
    text2: "This peaceful island offers visitors a genuine Greek island experience with its pristine beaches, traditional villages, and warm hospitality."
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Beaches",
      description: "Explore pristine beaches and coves",
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Villages",
      description: "Discover charming settlements",
      link: "#villages"
    },
    {
      iconType: FaRoute,
      title: "Activities",
      description: "Find things to do",
      link: "#activities"
    },
    {
      iconType: FaUtensils,
      title: "Dining",
      description: "Local cuisine and tavernas",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "Summer Season",
      period: "June - September",
      bullets: [
        "Perfect beach weather",
        "All facilities open",
        "Regular boat connections",
        "Warm temperatures 25-28°C"
      ]
    },
    {
      iconType: FaCameraRetro,
      title: "Spring & Fall",
      period: "April - May, September - October",
      bullets: [
        "Mild temperatures",
        "Great for hiking",
        "Fewer tourists",
        "More authentic experience"
      ]
    }
  ],
  villages: [
    {
      name: "Chora",
      description: "The main village of Schinoussa, perched on a hill with panoramic views of the Aegean Sea.",
      imageQuery: "schinoussa-chora",
      highlights: [
        "Traditional architecture",
        "Local cafes and tavernas",
        "Church of Panagia",
        "Stunning viewpoints",
        "Sunset views"
      ]
    },
    {
      name: "Mersini",
      description: "The island's port settlement, a picturesque harbor with traditional charm.",
      imageQuery: "schinoussa-mersini",
      highlights: [
        "Natural harbor",
        "Fishing boats",
        "Waterfront tavernas",
        "Beautiful sunsets"
      ]
    }
  ],
  beaches: [
    {
      name: "Tsigouri Beach",
      description: "The main beach of Schinoussa, featuring golden sand and crystal-clear waters.",
      imageQuery: "schinoussa-tsigouri-beach",
      highlights: [
        "Sandy beach",
        "Shallow waters",
        "Beach facilities",
        "Easy access",
        "Family-friendly"
      ]
    },
    {
      name: "Lioliou Beach",
      description: "A beautiful, secluded beach perfect for those seeking tranquility.",
      imageQuery: "schinoussa-lioliou-beach",
      highlights: [
        "Pristine waters",
        "Natural shade",
        "Peaceful atmosphere",
        "Great for snorkeling"
      ]
    },
    {
      name: "Psili Ammos Beach",
      description: "A stunning beach with fine sand and turquoise waters.",
      imageQuery: "schinoussa-psili-ammos-beach",
      highlights: [
        "Fine sand",
        "Crystal clear waters",
        "Natural beauty",
        "Perfect for swimming"
      ]
    }
  ],
  activities: [
    {
      title: "Water Activities",
      items: [
        "Swimming in pristine waters",
        "Snorkeling in clear seas",
        "Beach hopping",
        "Boat trips to nearby islands",
        "Fishing excursions"
      ]
    },
    {
      title: "Land Activities",
      items: [
        "Hiking natural trails",
        "Village exploration",
        "Photography walks",
        "Church visits",
        "Sunset watching"
      ]
    }
  ],
  dining: [
    {
      name: "Local Tavernas",
      description: "Experience authentic Greek cuisine and fresh seafood in family-run establishments.",
      recommendations: [
        "Deli Restaurant - Creative Greek cuisine",
        "Nikolas - Fresh fish taverna",
        "Mersini Restaurant - Waterfront dining",
        "To Steki - Traditional dishes"
      ]
    }
  ]
};
