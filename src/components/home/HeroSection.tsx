import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronDown, Map, Compass, Plane, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../search/SearchBar';
import { useTheme } from '../../contexts/ThemeContext';

export default function HeroSection() {
    const { resolvedTheme } = useTheme();
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';

    const stats = [
        { icon: Map, value: '24', labelKey: 'home.hero.stats.islands' },
        { icon: Compass, value: '500+', labelKey: 'home.hero.stats.tips' },
        { icon: Plane, value: '15M', labelKey: 'home.hero.stats.visitors' },
        { icon: Sun, value: '300+', labelKey: 'home.hero.stats.sunnyDays' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background with Premium Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/home-hero-final.jpg"
                    alt={t('home.hero.imageAlt')}
                    className="w-full h-full object-cover animate-subtle-zoom"
                    width={1920}
                    height={1080}
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                />
                {/* Premium gradient overlay - adapts to theme */}
                <div className={`absolute inset-0 ${isDark
                    ? 'bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg/90'
                    : 'bg-gradient-to-b from-black/60 via-black/40 to-white/90'
                    }`} />

                {/* Ambient gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyclades-turquoise/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyclades-sea-blue/10 rounded-full blur-3xl animate-float-slow" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyclades-turquoise/40 rounded-full animate-particle"
                        style={{
                            left: `${20 + i * 15}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${10 + i * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex flex-col justify-center">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in-up ${isDark ? 'glass-dark text-white/90' : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg'
                        }`}>
                        <Sparkles className="h-4 w-4 text-cyclades-turquoise" />
                        <span>{t('home.hero.badge')}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={`text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up ${isDark ? 'text-white' : 'text-gray-900'
                        }`} style={{ animationDelay: '0.1s' }}>
                        {t('home.hero.titlePart1')}{' '}
                        <span className="text-gradient">
                            {t('home.hero.titleHighlight')}
                        </span>
                    </h1>

                    <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in-up ${isDark ? 'text-white/80' : 'text-gray-800'
                        }`} style={{ animationDelay: '0.2s' }}>
                        {t('home.hero.subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <SearchBar />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {stats.map((stat) => (
                            <div
                                key={stat.labelKey}
                                className={`rounded-2xl p-5 hover:scale-105 transition-all duration-300 cursor-pointer group ${isDark
                                    ? 'glass-dark text-white hover:bg-white/10'
                                    : 'bg-white/80 backdrop-blur-sm shadow-lg text-gray-900 hover:shadow-xl'
                                    }`}
                            >
                                <div className="bg-cyclades-turquoise/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-5 h-5 text-cyclades-turquoise" />
                                </div>
                                <div className="text-2xl font-bold font-display">{stat.value}</div>
                                <div className={isDark ? 'text-white/70 text-sm' : 'text-gray-500 text-sm'}>{t(stat.labelKey)}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Link
                            to="/touristas-ai"
                            className="inline-flex items-center px-8 py-4 bg-cyclades-turquoise text-dark-bg rounded-xl font-semibold hover:bg-cyclades-turquoise/90 transition-all transform hover:scale-105 shadow-glow"
                        >
                            <Sparkles className="mr-2 h-5 w-5" />
                            {t('home.hero.ctaPrimary')}
                        </Link>
                        <Link
                            to="/islands"
                            className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${isDark
                                ? 'glass-dark text-white hover:bg-white/10'
                                : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {t('home.hero.ctaSecondary')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyclades-turquoise/70 animate-scroll-indicator">
                <ChevronDown className="h-6 w-6" />
            </div>
        </div>
    );
}
