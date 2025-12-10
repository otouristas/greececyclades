import { Link } from 'react-router-dom';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

export default function NewsletterCTA() {
    const { resolvedTheme } = useTheme();
    const { t } = useTranslation();
    const isDark = resolvedTheme === 'dark';
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
        }
    };

    return (
        <section className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-br from-dark-card via-dark-bg to-dark-card'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
            }`}>
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyclades-turquoise/5 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyclades-sea-blue/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t('home.cta.titlePart1')}{' '}
                            <span className="text-gradient">{t('home.cta.titleHighlight')}</span>?
                        </h2>
                        <p className={`text-xl mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                            {t('home.cta.subtitle')}
                        </p>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Link
                                to="/touristas-ai"
                                className="inline-flex items-center px-6 py-3 bg-cyclades-turquoise text-dark-bg rounded-xl font-semibold hover:bg-cyclades-turquoise/90 transition-all shadow-glow"
                            >
                                {t('home.cta.startPlanning')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/guides"
                                className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all border ${isDark
                                    ? 'glass-dark text-white hover:bg-white/10 border-dark-border/50'
                                    : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border-gray-200'
                                    }`}
                            >
                                {t('home.cta.browseIslands')}
                            </Link>
                        </div>

                        {/* Trust signals */}
                        <div className={`flex flex-wrap items-center gap-6 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-trust-green" />
                                {t('home.cta.freeToUse')}
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-trust-green" />
                                {t('home.cta.noFees')}
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-trust-green" />
                                {t('home.cta.aiPowered')}
                            </span>
                        </div>
                    </div>

                    {/* Right - Newsletter Form */}
                    <div className={`rounded-2xl border p-8 shadow-elegant-xl ${isDark ? 'bg-dark-card border-dark-border/30' : 'bg-white border-gray-200'
                        }`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-cyclades-turquoise/10">
                                <Mail className="w-6 h-6 text-cyclades-turquoise" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home.newsletter.title')}</h3>
                                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{t('home.newsletter.subtitle')}</p>
                            </div>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('home.newsletter.placeholder')}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors ${isDark
                                        ? 'bg-dark-bg border-dark-border/50 text-white placeholder-white/40 focus:border-cyclades-turquoise/50'
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyclades-turquoise'
                                        }`}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-cyclades-turquoise text-dark-bg rounded-xl font-semibold hover:bg-cyclades-turquoise/90 transition-all"
                                >
                                    {t('home.newsletter.button')}
                                </button>
                                <p className={`text-xs text-center ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                    {t('home.newsletter.disclaimer')}
                                </p>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-trust-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-trust-green" />
                                </div>
                                <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home.newsletter.successTitle')}</h4>
                                <p className={isDark ? 'text-white/60' : 'text-gray-500'}>{t('home.newsletter.successMessage')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
