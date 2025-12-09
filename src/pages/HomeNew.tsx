import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import { useTheme } from '../contexts/ThemeContext';
import {
    HeroSection,
    SocialProofStrip,
    DestinationShowcase,
    TouristasAIFeatureSection,
    FeaturedServicesSection,
    FeaturedExperiencesSection,
    NewsletterCTA,
} from '../components/home';

export default function HomeNew() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const seoData = {
        title: "Discover Cyclades: AI-Powered Greek Islands Travel Guide 2025",
        description: "Plan your perfect Cyclades adventure with AI. 25 island guides, ferry booking, trip planning & local insights. Santorini, Mykonos, Naxos & more. Your Greek islands journey starts here.",
        pageType: 'homepage' as const,
        faqs: [
            { question: "What are the Cyclades islands?", answer: "The Cyclades are a group of 24 inhabited Greek islands in the Aegean Sea. Famous islands include Santorini, Mykonos, Naxos, and Paros. Known for whitewashed villages, crystal-clear waters, and ancient history." },
            { question: "How do I get to the Cyclades?", answer: "Fly to Athens then take a ferry (2-5 hours) or fly directly to Santorini or Mykonos airports. Ferries run daily from Piraeus port to all major islands." },
            { question: "What's the best time to visit Cyclades?", answer: "September-October for perfect weather and fewer crowds. May-June is also excellent. July-August is peak season with higher prices and more tourists." },
            { question: "How many days do I need in the Cyclades?", answer: "7-10 days is ideal for visiting 3-4 islands. 2 weeks allows for deeper exploration of 5-6 islands. Even 5 days can work for 2-3 islands." }
        ]
    };

    // WebSite schema with SearchAction for sitelinks search box
    const jsonLD = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://greececyclades.com/#website",
                "name": "Discover Cyclades",
                "url": "https://greececyclades.com",
                "description": "AI-powered Greek Islands travel platform",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://greececyclades.com/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                },
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://greececyclades.com/#organization"
                }
            },
            {
                "@type": "Organization",
                "@id": "https://greececyclades.com/#organization",
                "name": "Discover Cyclades",
                "url": "https://greececyclades.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://greececyclades.com/logo.png"
                },
                "sameAs": [
                    "https://www.facebook.com/discovercyclades",
                    "https://www.instagram.com/discovercyclades",
                    "https://twitter.com/greececyclades"
                ]
            },
            {
                "@type": "TravelAgency",
                "name": "Discover Cyclades",
                "description": "AI-powered Greek Islands travel guide with Touristas AI assistant",
                "url": "https://greececyclades.com",
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Cyclades Islands",
                    "containedInPlace": {
                        "@type": "Country",
                        "name": "Greece"
                    }
                }
            }
        ]
    };

    return (
        <>
            <SEO
                {...seoData}
                structuredData={JSON.stringify(jsonLD)}
            />

            <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
                {/* Cinematic Hero Section */}
                <HeroSection />

                {/* Social Proof Strip */}
                <SocialProofStrip />

                {/* Destination Showcase Grid */}
                <DestinationShowcase />

                {/* Touristas AI Feature Section */}
                <TouristasAIFeatureSection />

                {/* Featured Services */}
                <FeaturedServicesSection />

                {/* Featured Experiences */}
                <FeaturedExperiencesSection />

                {/* FAQ Section */}
                <FAQSection
                    faqs={[
                        { question: "What are the Cyclades islands?", answer: "The Cyclades are a group of 24 inhabited Greek islands in the Aegean Sea. Famous islands include Santorini, Mykonos, Naxos, and Paros. Known for whitewashed villages, crystal-clear waters, and ancient history." },
                        { question: "How do I get to the Cyclades?", answer: "Fly to Athens then take a ferry (2-5 hours) or fly directly to Santorini or Mykonos airports. Ferries run daily from Piraeus port to all major islands." },
                        { question: "What's the best time to visit Cyclades?", answer: "September-October for perfect weather and fewer crowds. May-June is also excellent. July-August is peak season with higher prices and more tourists." },
                        { question: "How many days do I need in the Cyclades?", answer: "7-10 days is ideal for visiting 3-4 islands. 2 weeks allows for deeper exploration of 5-6 islands. Even 5 days can work for 2-3 islands." }
                    ]}
                    title="Cyclades Travel FAQ"
                    subtitle="Your questions about Greek island travel, answered"
                />

                {/* Newsletter & CTA */}
                <NewsletterCTA />
            </div>
        </>
    );
}

