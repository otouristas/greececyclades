import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const islands = [
    {
        name: 'Santorini',
        slug: 'santorini',
        image: '/images/islands/santorini-island.webp',
        description: 'Iconic sunsets & caldera views',
        tag: 'Most Popular',
        tagColor: 'bg-cyclades-sunset'
    },
    {
        name: 'Mykonos',
        slug: 'mykonos',
        image: '/images/islands/mykonos-island.jpg',
        description: 'Cosmopolitan charm & nightlife',
        tag: 'Trending',
        tagColor: 'bg-cyclades-turquoise'
    },
    {
        name: 'Naxos',
        slug: 'naxos',
        image: '/images/islands/naxos-island.jpg',
        description: 'Family beaches & local cuisine',
        tag: 'Best Value',
        tagColor: 'bg-trust-green'
    },
    {
        name: 'Paros',
        slug: 'paros',
        image: '/images/islands/paros-island.jpg',
        description: 'Golden beaches & windsurfing',
        tag: null,
        tagColor: null
    },
    {
        name: 'Milos',
        slug: 'milos',
        image: '/images/islands/milos.jpg',
        description: 'Volcanic beaches & moon landscapes',
        tag: 'Hidden Gem',
        tagColor: 'bg-accent-gold'
    },
    {
        name: 'Ios',
        slug: 'ios',
        image: '/images/islands/ios.jpg',
        description: 'Party paradise & beach life',
        tag: null,
        tagColor: null
    },
];

export default function DestinationShowcase() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-dark-bg to-dark-card' : 'bg-gradient-to-b from-white to-gray-50'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 text-cyclades-turquoise text-sm font-medium mb-6">
                        <MapPin className="h-4 w-4" />
                        <span>Island Discovery</span>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Explore the <span className="text-gradient">Cyclades</span>
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        24 stunning islands, each with its own unique character and charm
                    </p>
                </div>

                {/* Island Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {islands.map((island, index) => (
                        <Link
                            key={island.name}
                            to={`/guides/${island.slug}`}
                            className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-elegant-xl transition-all duration-500 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={island.image}
                                    alt={`${island.name} - Cyclades Island Greece`}
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
                                {island.tag && (
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${island.tagColor}`}>
                                        {island.tag}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-cyclades-turquoise transition-colors">
                                        {island.name}
                                    </h3>
                                    <p className="text-white/80 mb-4">{island.description}</p>

                                    {/* Hover arrow */}
                                    <div className="flex items-center text-cyclades-turquoise font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                        Explore Guide
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
                        View All 24 Islands
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

