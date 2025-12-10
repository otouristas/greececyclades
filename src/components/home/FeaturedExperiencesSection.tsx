import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export default function FeaturedExperiencesSection() {
    const { resolvedTheme } = useTheme();
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';

    const experiences = [
        {
            titleKey: "home.experiences.parosTour.title",
            location: "Paros",
            image: "/images/experience/paros-tour.webp",
            price: 85,
            duration: "8 hours",
            rating: 4.9,
            reviews: 319,
            link: "https://www.getyourguide.com/antiparos-l163280/paros-antiparos-full-day-boat-tour-with-lunch-drinks-t456735/"
        },
        {
            titleKey: "home.experiences.milosTour.title",
            location: "Milos",
            image: "/images/experience/milos-kleftiko-tour.webp",
            price: 95,
            duration: "7 hours",
            rating: 5.0,
            reviews: 444,
            link: "https://www.getyourguide.com/milos-l32653/from-adamas-port-day-cruise-to-kleftiko-caves-with-lunch-t247102/"
        },
        {
            titleKey: "home.experiences.santoriniTour.title",
            location: "Santorini",
            image: "/images/experience/santorini-tour.webp",
            price: 120,
            duration: "5 hours",
            rating: 4.6,
            reviews: 4633,
            link: "https://www.getyourguide.com/santorini-l753/ocean-voyager-74-sunset-tour-t31512/"
        },
    ];

    return (
        <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-dark-card to-dark-bg' : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-sunset/10 text-cyclades-sunset text-sm font-medium mb-4">
                            <Star className="h-4 w-4" />
                            <span>{t('home.experiences.badge')}</span>
                        </div>
                        <h2 className={`text-4xl md:text-5xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t('home.experiences.titlePart1')} <span className="text-gradient-gold">{t('home.experiences.titleHighlight')}</span>
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{t('home.experiences.subtitle')}</p>
                    </div>
                    <Link
                        to="/activities"
                        className="hidden md:inline-flex items-center gap-2 text-cyclades-turquoise font-semibold hover:underline mt-4 md:mt-0"
                    >
                        {t('home.experiences.viewAll')}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Experiences Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map((exp) => (
                        <a
                            key={exp.titleKey}
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${isDark
                                ? 'bg-dark-card border-dark-border/30 hover:border-cyclades-turquoise/30'
                                : 'bg-white border-gray-200 hover:border-cyclades-turquoise/50 shadow-lg'
                                }`}
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={exp.image}
                                    alt={t(exp.titleKey)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />

                                {/* GetYourGuide badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                                    <img
                                        src="https://www.vhv.rs/dpng/d/611-6116095_getyourguide-logo-logo-get-your-guide-hd-png.png"
                                        alt="GetYourGuide"
                                        className="h-5 w-auto"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-dark-bg/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                        <Clock className="w-3 h-3" />
                                        {exp.duration}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-dark-bg/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                        <MapPin className="w-3 h-3" />
                                        {exp.location}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className={`text-lg font-semibold mb-3 group-hover:text-cyclades-turquoise transition-colors line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {t(exp.titleKey)}
                                </h3>

                                <div className="flex items-center justify-between">
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-accent-gold">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-semibold">{exp.rating}</span>
                                        </div>
                                        <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>({exp.reviews.toLocaleString()} {t('home.experiences.reviews')})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{t('common.from')}</div>
                                        <div className="text-lg font-bold text-cyclades-turquoise">€{exp.price}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="text-center mt-12 md:hidden">
                    <Link
                        to="/activities"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-cyclades-turquoise/10 text-cyclades-turquoise rounded-xl font-semibold hover:bg-cyclades-turquoise hover:text-dark-bg transition-all duration-300 border border-cyclades-turquoise/30"
                    >
                        {t('home.experiences.viewAll')}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
