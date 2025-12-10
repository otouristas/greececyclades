import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Compass, Map, Brain, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export default function TouristasAIFeatureSection() {
    const { resolvedTheme } = useTheme();
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';
    const [currentQuery, setCurrentQuery] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    const typewriterQueries = [
        t('home.touristasAI.queries.plan7day'),
        t('home.touristasAI.queries.milosBeaches'),
        t('home.touristasAI.queries.honeymoon'),
        t('home.touristasAI.queries.familyHotels'),
        t('home.touristasAI.queries.nightlife'),
    ];

    useEffect(() => {
        const query = typewriterQueries[currentQuery];

        if (isTyping) {
            if (displayText.length < query.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(query.slice(0, displayText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => setIsTyping(false), 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 30);
                return () => clearTimeout(timeout);
            } else {
                setCurrentQuery((prev) => (prev + 1) % typewriterQueries.length);
                setIsTyping(true);
            }
        }
    }, [displayText, isTyping, currentQuery, typewriterQueries]);

    const features = [
        { icon: Brain, titleKey: 'home.touristasAI.features.knowledge.title', descKey: 'home.touristasAI.features.knowledge.desc' },
        { icon: Compass, titleKey: 'home.touristasAI.features.itineraries.title', descKey: 'home.touristasAI.features.itineraries.desc' },
        { icon: Map, titleKey: 'home.touristasAI.features.matching.title', descKey: 'home.touristasAI.features.matching.desc' },
        { icon: Zap, titleKey: 'home.touristasAI.features.instant.title', descKey: 'home.touristasAI.features.instant.desc' },
    ];

    return (
        <section className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-dark-card via-dark-bg to-dark-card' : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
            }`}>
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyclades-turquoise/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyclades-sea-blue/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 text-cyclades-turquoise text-sm font-medium mb-6 border border-cyclades-turquoise/20">
                            <Sparkles className="h-4 w-4" />
                            <span>{t('home.touristasAI.badge')}</span>
                        </div>

                        <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t('home.touristasAI.titlePart1')} <span className="text-gradient">{t('home.touristasAI.titleHighlight')}</span>
                        </h2>

                        <p className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                            {t('home.touristasAI.subtitle')}
                        </p>

                        {/* Feature list */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-12">
                            {features.map((feature) => (
                                <div
                                    key={feature.titleKey}
                                    className={`flex items-start gap-3 p-4 rounded-xl border group transition-colors ${isDark
                                        ? 'bg-dark-card/50 border-dark-border/30 hover:border-cyclades-turquoise/30'
                                        : 'bg-white border-gray-200 hover:border-cyclades-turquoise/50 shadow-sm'
                                        }`}
                                >
                                    <div className="p-2 rounded-lg bg-cyclades-turquoise/10 group-hover:bg-cyclades-turquoise/20 transition-colors">
                                        <feature.icon className="w-5 h-5 text-cyclades-turquoise" />
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t(feature.titleKey)}</h4>
                                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{t(feature.descKey)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/touristas-ai"
                                className="inline-flex items-center px-6 py-3 bg-cyclades-turquoise text-dark-bg rounded-xl font-semibold hover:bg-cyclades-turquoise/90 transition-all shadow-glow"
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                {t('home.touristasAI.cta.try')}
                            </Link>
                            <Link
                                to="/touristas-ai/chat"
                                className="inline-flex items-center px-6 py-3 glass-dark text-white rounded-xl font-semibold hover:bg-white/10 transition-all border border-dark-border/50"
                            >
                                <MessageSquare className="mr-2 h-5 w-5" />
                                {t('home.touristasAI.cta.chat')}
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Demo Chat Interface */}
                    <div className="relative">
                        <div className="bg-dark-card rounded-2xl border border-dark-border/50 shadow-elegant-xl p-6 relative overflow-hidden">
                            {/* Glow effect */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyclades-turquoise/20 rounded-full blur-3xl" />

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark-border/50">
                                <img
                                    src="/touristas-ai-logo.svg"
                                    alt="Touristas AI"
                                    className="w-10 h-10"
                                />
                                <div>
                                    <h4 className="font-semibold text-white">Touristas AI</h4>
                                    <p className="text-xs text-cyclades-turquoise">{t('home.touristasAI.demo.status')}</p>
                                </div>
                            </div>

                            {/* Demo Chat */}
                            <div className="space-y-4 mb-6">
                                {/* User message with typewriter */}
                                <div className="flex justify-end">
                                    <div className="max-w-[80%] bg-cyclades-turquoise/20 rounded-2xl rounded-br-sm px-4 py-3">
                                        <p className="text-white">
                                            {displayText}
                                            <span className="animate-blink">|</span>
                                        </p>
                                    </div>
                                </div>

                                {/* AI Response */}
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] bg-dark-bg/50 rounded-2xl rounded-bl-sm px-4 py-3 border border-dark-border/30">
                                        <p className="text-white/80 text-sm">
                                            <span className="text-cyclades-turquoise">✨ Γεια σου!</span> {t('home.touristasAI.demo.response')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Input placeholder */}
                            <div className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-xl border border-dark-border/30">
                                <input
                                    type="text"
                                    placeholder={t('home.touristasAI.demo.placeholder')}
                                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
                                    disabled
                                />
                                <button className="p-2 bg-cyclades-turquoise rounded-lg text-dark-bg hover:bg-cyclades-turquoise/90 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -right-4 bg-accent-gold text-dark-bg text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                            {t('home.touristasAI.demo.badge')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
