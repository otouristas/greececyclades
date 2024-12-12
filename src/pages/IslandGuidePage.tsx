import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUmbrellaBeach, FaMapMarkedAlt, FaUtensils, FaSun, FaCameraRetro } from 'react-icons/fa';
import { islandGuides } from '../data/islandsData';
import { allIslandGuides, GuideContent } from '../data/allIslandGuides';
import IslandGuideTemplate from '../components/guides/IslandGuideTemplate';
import { generateIslandGuideSEO } from '../utils/seo';
import SEO from '../components/SEO';

export default function IslandGuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const island = islandGuides.find(g => g.id.toLowerCase() === slug?.toLowerCase());

  if (!island) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Island Guide Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the guide you're looking for.</p>
        <a href="/guides" className="text-blue-600 hover:text-blue-700">
          View all island guides
        </a>
      </div>
    </div>;
  }

  // Get the content based on the island ID
  const content = allIslandGuides[island.id.toLowerCase()] || {
    introduction: {
      text1: `Welcome to ${island.name}, a beautiful island in the Cyclades archipelago.`,
      text2: island.description
    },
    quickLinks: [
      {
        iconType: FaUmbrellaBeach,
        title: "Beaches & Nature",
        description: "Discover pristine beaches and natural beauty.",
        link: "#beaches"
      },
      {
        iconType: FaMapMarkedAlt,
        title: "Villages & Towns",
        description: "Explore charming traditional settlements.",
        link: "#villages"
      },
      {
        iconType: FaUtensils,
        title: "Food & Dining",
        description: "Experience local cuisine and restaurants.",
        link: "#dining"
      }
    ],
    whenToVisit: [
      {
        iconType: FaSun,
        title: "Summer Season",
        period: "June to September",
        bullets: [
          "Perfect beach weather",
          "All facilities open",
          "Vibrant atmosphere"
        ]
      },
      {
        iconType: FaCameraRetro,
        title: "Shoulder Season",
        period: "May-June, September",
        bullets: [
          "Pleasant weather",
          "Fewer tourists",
          "Better rates"
        ]
      }
    ],
    villages: [
      {
        name: "Main Town",
        description: "The picturesque main town of the island.",
        imageQuery: "main-town",
        highlights: [
          "Traditional architecture",
          "Local shops and cafes",
          "Beautiful sunset views"
        ]
      }
    ],
    activities: [
      {
        title: "Popular Activities",
        items: [
          "Swimming and sunbathing",
          "Water sports",
          "Hiking",
          "Sightseeing"
        ]
      }
    ],
    beaches: [
      {
        name: "Main Beach",
        description: "A beautiful sandy beach with crystal clear waters.",
        imageQuery: "main-beach",
        highlights: [
          "Sandy shore",
          "Beach facilities",
          "Water sports"
        ]
      }
    ],
    dining: [
      {
        name: "Local Cuisine",
        description: "Experience the authentic flavors of Greek cuisine.",
        recommendations: [
          "Traditional tavernas",
          "Seafood restaurants",
          "Local wine bars"
        ]
      }
    ]
  } as GuideContent;

  return (
    <>
      <SEO {...generateIslandGuideSEO(island.name, island.description, island.image)} />
      <IslandGuideTemplate island={island} content={content} />
    </>
  );
}
