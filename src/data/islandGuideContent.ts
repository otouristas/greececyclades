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
