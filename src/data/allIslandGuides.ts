import { IconType } from 'react-icons';
import { 
  FaUmbrellaBeach, FaMapMarkedAlt, FaUtensils, FaSun, 
  FaCameraRetro, FaRoute, FaShip, FaWineGlass,
  FaHiking, FaSwimmer, FaLandmark, FaPalette,
  FaChurch, FaMountain, FaAnchor, FaTree
} from 'react-icons/fa';

export interface GuideContent {
  introduction: {
    text1: string;
    text2: string;
  };
  quickLinks: Array<{
    iconType: IconType;
    title: string;
    description: string;
    link: string;
  }>;
  whenToVisit: Array<{
    iconType: IconType;
    title: string;
    period: string;
    bullets: string[];
  }>;
  villages: Array<{
    name: string;
    description: string;
    imageQuery: string;
    highlights: string[];
  }>;
  activities: Array<{
    title: string;
    items: string[];
  }>;
  beaches: Array<{
    name: string;
    description: string;
    imageQuery: string;
    highlights: string[];
  }>;
  dining: Array<{
    name: string;
    description: string;
    recommendations: string[];
  }>;
}

// Helper function to create guide content with common structure
const createGuideContent = (
  name: string,
  intro1: string,
  intro2: string,
  villages: Array<{name: string; description: string; imageQuery: string; highlights: string[]}>,
  beaches: Array<{name: string; description: string; imageQuery: string; highlights: string[]}>,
  activities: string[],
  dining: Array<{name: string; description: string; recommendations: string[]}>
): GuideContent => ({
  introduction: {
    text1: intro1,
    text2: intro2
  },
  quickLinks: [
    {
      iconType: FaUmbrellaBeach,
      title: "Beaches",
      description: `Discover the best beaches in ${name}`,
      link: "#beaches"
    },
    {
      iconType: FaMapMarkedAlt,
      title: "Villages",
      description: `Explore ${name}'s charming villages`,
      link: "#villages"
    },
    {
      iconType: FaUtensils,
      title: "Dining",
      description: "Local cuisine and restaurants",
      link: "#dining"
    }
  ],
  whenToVisit: [
    {
      iconType: FaSun,
      title: "High Season",
      period: "July to August",
      bullets: [
        "Perfect beach weather",
        "All facilities open",
        "Vibrant atmosphere",
        "Busiest period"
      ]
    },
    {
      iconType: FaCameraRetro,
      title: "Shoulder Season",
      period: "May-June, September",
      bullets: [
        "Pleasant weather",
        "Fewer tourists",
        "Better rates",
        "Comfortable sightseeing"
      ]
    }
  ],
  villages,
  activities: [{
    title: "Popular Activities",
    items: activities
  }],
  beaches,
  dining
});

export const allIslandGuides: Record<string, GuideContent> = {
  mykonos: createGuideContent(
    "Mykonos",
    "Welcome to Mykonos, the cosmopolitan jewel of the Cyclades known for its vibrant nightlife and stunning beaches.",
    "From iconic windmills to world-class restaurants, Mykonos combines traditional charm with luxury and sophistication.",
    [
      {
        name: "Mykonos Town (Chora)",
        description: "The iconic capital with its whitewashed buildings and windmills",
        imageQuery: "mykonos-town",
        highlights: ["Little Venice", "Windmills", "Shopping", "Restaurants"]
      },
      {
        name: "Ano Mera",
        description: "Traditional village in the heart of the island",
        imageQuery: "ano-mera-mykonos",
        highlights: ["Panagia Tourliani Monastery", "Local Tavernas", "Traditional Square"]
      }
    ],
    [
      {
        name: "Paradise Beach",
        description: "Famous beach known for its parties and water sports",
        imageQuery: "paradise-beach-mykonos",
        highlights: ["Beach Parties", "Water Sports", "Beach Bars", "Clear Waters"]
      },
      {
        name: "Super Paradise Beach",
        description: "Iconic beach with crystal clear waters and vibrant atmosphere",
        imageQuery: "super-paradise-mykonos",
        highlights: ["Beach Clubs", "Swimming", "Sunbeds", "Music"]
      }
    ],
    [
      "Beach Parties",
      "Water Sports",
      "Shopping",
      "Windmill Photography",
      "Wine Tasting",
      "Boat Tours"
    ],
    [
      {
        name: "Traditional Greek Tavernas",
        description: "Authentic local cuisine in charming settings",
        recommendations: ["Moussaka", "Fresh Seafood", "Greek Salad", "Local Wine"]
      },
      {
        name: "Fine Dining",
        description: "World-class restaurants with stunning views",
        recommendations: ["Mediterranean Fusion", "Sunset Dining", "Fresh Fish", "Local Delicacies"]
      }
    ]
  ),

  santorini: createGuideContent(
    "Santorini",
    "Welcome to Santorini, a magical island renowned worldwide for its breathtaking caldera views and romantic sunsets.",
    "Experience the unique beauty of white-washed buildings perched on dramatic cliffs, explore volcanic beaches, and indulge in world-class wineries.",
    [
      {
        name: "Oia",
        description: "The most famous village known for its sunset views and blue domes",
        imageQuery: "oia-santorini",
        highlights: ["Sunset Point", "Blue Domes", "Art Galleries", "Luxury Hotels"]
      },
      {
        name: "Fira",
        description: "The vibrant capital with stunning caldera views",
        imageQuery: "fira-santorini",
        highlights: ["Cable Car", "Shopping", "Nightlife", "Restaurants"]
      }
    ],
    [
      {
        name: "Red Beach",
        description: "Unique beach with red volcanic cliffs",
        imageQuery: "red-beach-santorini",
        highlights: ["Red Cliffs", "Swimming", "Snorkeling", "Photography"]
      },
      {
        name: "Perissa Beach",
        description: "Long black sand beach with many facilities",
        imageQuery: "perissa-beach-santorini",
        highlights: ["Black Sand", "Beach Bars", "Water Sports", "Restaurants"]
      }
    ],
    [
      "Wine Tasting",
      "Sunset Watching",
      "Caldera Cruises",
      "Volcano Tours",
      "Photography",
      "Archaeological Sites"
    ],
    [
      {
        name: "Traditional Tavernas",
        description: "Local cuisine with caldera views",
        recommendations: ["Fava", "White Eggplant", "Fresh Fish", "Local Wine"]
      },
      {
        name: "Fine Dining",
        description: "Gourmet restaurants with spectacular views",
        recommendations: ["Modern Greek Cuisine", "Wine Pairing", "Sunset Dining"]
      }
    ]
  ),

  // Add more islands following the same pattern...
};

// Export individual guides for backward compatibility
export const mykonosContent = allIslandGuides.mykonos;
export const santoriniContent = allIslandGuides.santorini;
