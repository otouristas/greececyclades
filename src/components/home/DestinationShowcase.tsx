import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export default function DestinationShowcase() {
    const { resolvedTheme } = useTheme();
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';

    const islands = [
        {
            nameKey: 'islands.santorini',
            slug: 'santorini',
            image: '/images/islands/santorini-island.webp',
            descriptionKey: 'home.destinations.santorini.desc',
            tagKey: 'home.destinations.tags.mostPopular',
            tagColor: 'bg-cyclades-sunset'
        },
        {
            nameKey: 'islands.mykonos',
            slug: 'mykonos',
            image: '/images/islands/mykonos-island.jpg',
            descriptionKey: 'home.destinations.mykonos.desc',
            tagKey: 'home.destinations.tags.trending',
            tagColor: 'bg-cyclades-turquoise'
        },
        {
            nameKey: 'islands.naxos',
            slug: 'naxos',
            image: '/images/islands/naxos-island.jpg',
            descriptionKey: 'home.destinations.naxos.desc',
            tagKey: 'home.destinations.tags.bestValue',
            tagColor: 'bg-trust-green'
        },
        {
            nameKey: 'islands.paros',
            slug: 'paros',
            image: '/images/islands/paros-island.jpg',
            descriptionKey: 'home.destinations.paros.desc',
            tagKey: null,
            tagColor: null
        },
        {
            nameKey: 'islands.milos',
            slug: 'milos',
            image: '/images/islands/milos.jpg',
            descriptionKey: 'home.destinations.milos.desc',
            tagKey: 'home.destinations.tags.hiddenGem',
            tagColor: 'bg-accent-gold'
        },
        {
            nameKey: 'islands.ios',
            slug: 'ios',
            image: '/images/islands/ios.jpg',
            descriptionKey: 'home.destinations.ios.desc',
            tagKey: null,
            tagColor: null
        },
    ];

    return (
        <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-dark-bg to-dark-card' : 'bg-gradient-to-b from-white to-gray-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 text-cyclades-turquoise text-sm font-medium mb-6">
                        <MapPin className="h-4 w-4" />
                        <span>{t('home.destinations.badge')}</span>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('home.destinations.titlePart1')} <span className="text-gradient">{t('home.destinations.titleHighlight')}</span>
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        {t('home.destinations.subtitle')}
                    </p>
                </div>

                {/* Island Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {islands.map((island, index) => (
                        <Link
                            key={island.slug}
                            to={`/guides/${island.slug}`}
                            className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-elegant-xl transition-all duration-500 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={island.image}
                                    alt={`${t(island.nameKey)} - Cyclades Island Greece`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                    width={640}
                                    height={480}
                                />
                                {/* Premium gradient overlay */}
                                <div className={`absolute inset-0 opacity-90 ${isDark
                                    ? 'bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent'
                                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                                    }`} />

                                {/* Tag badge */}
                                {island.tagKey && (
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${island.tagColor}`}>
                                        {t(island.tagKey)}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-cyclades-turquoise transition-colors">
                                        {t(island.nameKey)}
                                    </h3>
                                    <p className="text-white/80 mb-4">{t(island.descriptionKey)}</p>

                                    {/* Hover arrow */}
                                    <div className="flex items-center text-cyclades-turquoise font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                        {t('home.destinations.exploreGuide')}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/guides"
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 border ${isDark
                            ? 'bg-cyclades-turquoise/10 text-cyclades-turquoise border-cyclades-turquoise/30 hover:bg-cyclades-turquoise hover:text-dark-bg'
                            : 'bg-cyclades-turquoise text-white border-transparent hover:bg-cyclades-turquoise/90'
                            }`}
                    >
                        {t('home.destinations.viewAll')}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
