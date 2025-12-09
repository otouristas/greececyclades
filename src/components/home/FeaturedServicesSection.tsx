import { Link } from 'react-router-dom';
import { Building2, Ship, Camera, Car, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const services = [
    {
        title: 'Hotels & Villas',
        description: 'Handpicked accommodations across all islands',
        icon: Building2,
        image: '/images/services/luxury-hotel.jpeg',
        link: '/hotels',
        partner: {
            name: 'Agoda',
            logo: 'https://www.logoshape.com/wp-content/uploads/2024/09/agoda-logo-vector_logoshape.png'
        },
        stats: '2,000+ properties'
    },
    {
        title: 'Ferry Tickets',
        description: 'Island hopping made seamless',
        icon: Ship,
        image: '/images/services/ferry-tickets.webp',
        link: '/ferry-tickets',
        partner: {
            name: 'FerryScanner',
            logo: 'https://www.ferryscanner.com/_next/static/media/logo.f9964f3a.svg'
        },
        stats: '50+ routes daily'
    },
    {
        title: 'Tours & Activities',
        description: 'Unforgettable experiences await',
        icon: Camera,
        image: '/images/services/activities.jpg',
        link: '/activities',
        partner: {
            name: 'GetYourGuide',
            logo: 'https://www.vhv.rs/dpng/d/611-6116095_getyourguide-logo-logo-get-your-guide-hd-png.png'
        },
        stats: '500+ experiences'
    },
    {
        title: 'Car Rentals',
        description: 'Explore at your own pace',
        icon: Car,
        image: '/images/services/car-rental.jpg',
        link: '/rent-a-car',
        partner: null,
        stats: 'From €35/day'
    },
];

export default function FeaturedServicesSection() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Everything You <span className="text-gradient">Need</span>
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        Book hotels, ferries, tours, and car rentals - all in one place
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            to={service.link}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant-xl ${isDark
                                    ? 'bg-dark-card border-dark-border/30 hover:border-cyclades-turquoise/30'
                                    : 'bg-white border-gray-200 hover:border-cyclades-turquoise/50 shadow-lg'
                                }`}
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />

                                {/* Partner badge */}
                                {service.partner && (
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                                        <img
                                            src={service.partner.logo}
                                            alt={service.partner.name}
                                            className="h-5 w-auto"
                                        />
                                    </div>
                                )}

                                {/* Stats badge */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-dark-bg/80 backdrop-blur-sm rounded-lg text-xs font-medium text-cyclades-turquoise border border-cyclades-turquoise/20">
                                    {service.stats}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 rounded-lg bg-cyclades-turquoise/10 group-hover:bg-cyclades-turquoise/20 transition-colors">
                                        <service.icon className="w-5 h-5 text-cyclades-turquoise" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-cyclades-turquoise group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className={`text-lg font-semibold mb-1 group-hover:text-cyclades-turquoise transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{service.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border ${isDark ? 'bg-dark-card border-dark-border/30' : 'bg-gray-50 border-gray-200'
                        }`}>
                        <span className={isDark ? 'text-white/70' : 'text-gray-600'}>Need help planning?</span>
                        <Link
                            to="/touristas-ai"
                            className="inline-flex items-center gap-2 text-cyclades-turquoise font-semibold hover:underline"
                        >
                            Ask Touristas AI
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
