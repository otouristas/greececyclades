import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Facebook, Twitter, Instagram, Youtube, MapPin, Mail,
    Shield, CheckCircle, Headphones, TrendingUp,
    Camera, Ship, Plane, Car, Hotel, Sparkles, ArrowRight
} from 'lucide-react';
import { getIslandSlug } from '../utils/slugify';
import Logo from './Logo';

export default function FooterNew() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const popularIslands = [
        { name: 'Santorini', slug: getIslandSlug('Santorini') },
        { name: 'Mykonos', slug: getIslandSlug('Mykonos') },
        { name: 'Paros', slug: getIslandSlug('Paros') },
        { name: 'Naxos', slug: getIslandSlug('Naxos') },
        { name: 'Milos', slug: getIslandSlug('Milos') },
        { name: 'Ios', slug: getIslandSlug('Ios') },
    ];

    const services = [
        { nameKey: 'footer.services.ferryTickets', path: '/ferry-tickets', icon: Ship },
        { nameKey: 'footer.services.hotelsVillas', path: '/hotels', icon: Hotel },
        { nameKey: 'footer.services.toursActivities', path: '/activities', icon: Camera },
        { nameKey: 'footer.services.carRentals', path: '/rent-a-car', icon: Car },
        { nameKey: 'footer.services.flights', path: '/flights', icon: Plane },
    ];

    return (
        <footer className="bg-dark-bg text-white">
            {/* Pre-footer CTA Section */}
            <div className="bg-gradient-to-r from-dark-card via-dark-bg to-dark-card border-b border-dark-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Touristas AI CTA */}
                        <div className="flex items-start gap-6">
                            <div className="p-4 rounded-2xl bg-cyclades-turquoise/10 border border-cyclades-turquoise/20">
                                <Sparkles className="w-8 h-8 text-cyclades-turquoise" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-display font-bold mb-2">
                                    {t('footer.prefooter.title')} <span className="text-gradient">{t('footer.prefooter.titleHighlight')}</span>
                                </h3>
                                <p className="text-white/60 mb-4">
                                    {t('footer.prefooter.subtitle')}
                                </p>
                                <Link
                                    to="/touristas-ai"
                                    className="inline-flex items-center gap-2 text-cyclades-turquoise font-semibold hover:underline"
                                >
                                    {t('footer.prefooter.cta')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { value: '24', labelKey: 'footer.prefooter.stats.islands' },
                                { value: '500+', labelKey: 'footer.prefooter.stats.activities' },
                                { value: '50K+', labelKey: 'footer.prefooter.stats.travelers' },
                                { value: '4.9★', labelKey: 'footer.prefooter.stats.rating' },
                            ].map((stat) => (
                                <div key={stat.labelKey} className="text-center">
                                    <div className="text-2xl font-bold text-cyclades-turquoise font-display">{stat.value}</div>
                                    <div className="text-xs text-white/50">{t(stat.labelKey)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <Logo variant="white" />
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
                            {t('footer.brand.description')}
                        </p>

                        {/* Contact */}
                        <div className="space-y-3 text-sm text-white/60 mb-8">
                            <a href="mailto:hello@discovercyclades.gr" className="flex items-center gap-3 hover:text-cyclades-turquoise transition-colors">
                                <Mail className="w-4 h-4 text-cyclades-turquoise" />
                                hello@discovercyclades.gr
                            </a>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-cyclades-turquoise" />
                                {t('footer.brand.location')}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: 'https://instagram.com/discovercyclades', label: 'Instagram' },
                                { icon: Facebook, href: 'https://facebook.com/discovercyclades', label: 'Facebook' },
                                { icon: Youtube, href: 'https://youtube.com/discovercyclades', label: 'YouTube' },
                                { icon: Twitter, href: 'https://twitter.com/discovercyclades', label: 'Twitter' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-dark-card border border-dark-border/50 text-white/60 hover:text-cyclades-turquoise hover:border-cyclades-turquoise/30 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Islands Column */}
                    <div>
                        <h4 className="font-semibold text-cyclades-turquoise mb-6">{t('footer.sections.popularIslands')}</h4>
                        <ul className="space-y-3">
                            {popularIslands.map((island) => (
                                <li key={island.slug}>
                                    <Link
                                        to={`/guides/${island.slug}`}
                                        className="text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {island.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-2">
                                <Link
                                    to="/guides"
                                    className="text-sm text-cyclades-turquoise hover:underline"
                                >
                                    {t('footer.sections.viewAllIslands')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-semibold text-cyclades-turquoise mb-6">{t('footer.sections.travelServices')}</h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.path}>
                                    <Link
                                        to={service.path}
                                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        <service.icon className="w-4 h-4" />
                                        {t(service.nameKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-semibold text-cyclades-turquoise mt-8 mb-4">{t('footer.sections.aiPlanning')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/touristas-ai" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.touristasAI')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/trip-planner" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.tripPlanner')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="font-semibold text-cyclades-turquoise mb-6">{t('footer.sections.support')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.helpCenter')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.aboutUs')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.travelBlog')}
                                </Link>
                            </li>
                        </ul>

                        <h4 className="font-semibold text-cyclades-turquoise mt-8 mb-4">{t('footer.sections.legal')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.privacyPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t('footer.links.termsOfService')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-dark-border/50 bg-dark-card/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, titleKey: 'footer.trustBadges.secureBooking.title', descKey: 'footer.trustBadges.secureBooking.desc' },
                            { icon: CheckCircle, titleKey: 'footer.trustBadges.freeCancellation.title', descKey: 'footer.trustBadges.freeCancellation.desc' },
                            { icon: Headphones, titleKey: 'footer.trustBadges.support247.title', descKey: 'footer.trustBadges.support247.desc' },
                            { icon: TrendingUp, titleKey: 'footer.trustBadges.bestPrices.title', descKey: 'footer.trustBadges.bestPrices.desc' },
                        ].map((badge) => (
                            <div key={badge.titleKey} className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyclades-turquoise/10">
                                    <badge.icon className="w-5 h-5 text-cyclades-turquoise" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">{t(badge.titleKey)}</div>
                                    <div className="text-xs text-white/50">{t(badge.descKey)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-white/50 flex items-center gap-2">
                            <span>© {currentYear} {t('footer.bottom.copyright')}</span>
                            <a
                                href="https://anotherseoguru.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyclades-turquoise hover:underline"
                            >
                                Another SEO Guru
                            </a>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                            <Link to="/sitemap" className="hover:text-white transition-colors">{t('footer.bottom.sitemap')}</Link>
                            <span>•</span>
                            <span>🇬🇷 {t('footer.bottom.poweredBy')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
