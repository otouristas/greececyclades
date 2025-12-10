import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';

    const seoData = {
        title: t('meta.homeTitle'),
        description: t('meta.homeDescription'),
        pageType: 'homepage' as const,
        faqs: [
            { question: t('home.faq.q1'), answer: t('home.faq.a1') },
            { question: t('home.faq.q2'), answer: t('home.faq.a2') },
            { question: t('home.faq.q3'), answer: t('home.faq.a3') },
            { question: t('home.faq.q4'), answer: t('home.faq.a4') }
        ]
    };

    // WebSite schema with SearchAction for sitelinks search box
    const jsonLD = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://discovercyclades.gr/#website",
                "name": "Discover Cyclades",
                "url": "https://discovercyclades.gr",
                "description": "AI-powered Greek Islands travel platform",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://discovercyclades.gr/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                },
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://discovercyclades.gr/#organization"
                }
            },
            {
                "@type": "Organization",
                "@id": "https://discovercyclades.gr/#organization",
                "name": "Discover Cyclades",
                "url": "https://discovercyclades.gr",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://discovercyclades.gr/logo.png"
                },
                "sameAs": [
                    "https://www.facebook.com/discovercyclades",
                    "https://www.instagram.com/discovercyclades",
                    "https://twitter.com/discovercyclades"
                ]
            },
            {
                "@type": "TravelAgency",
                "name": "Discover Cyclades",
                "description": "AI-powered Greek Islands travel guide with Touristas AI assistant",
                "url": "https://discovercyclades.gr",
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
                        { question: t('home.faq.q1'), answer: t('home.faq.a1') },
                        { question: t('home.faq.q2'), answer: t('home.faq.a2') },
                        { question: t('home.faq.q3'), answer: t('home.faq.a3') },
                        { question: t('home.faq.q4'), answer: t('home.faq.a4') }
                    ]}
                    title={t('home.faq.title')}
                    subtitle={t('home.faq.subtitle')}
                />

                {/* Newsletter & CTA */}
                <NewsletterCTA />
            </div>
        </>
    );
}


