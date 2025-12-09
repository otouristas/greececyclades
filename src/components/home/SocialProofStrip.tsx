import { Star, Users, Shield, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const socialProofData = [
    { icon: Users, value: '50,000+', label: 'Happy Travelers' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Shield, value: '100%', label: 'Secure Booking' },
    { icon: Award, value: '#1', label: 'AI Travel Assistant' },
];

export default function SocialProofStrip() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <section className={`py-6 border-y transition-colors duration-300 ${isDark
                ? 'bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg border-dark-border/50'
                : 'bg-gradient-to-r from-gray-50 via-white to-gray-50 border-gray-200'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
                    {socialProofData.map((item, index) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 group"
                        >
                            <div className="p-2 rounded-lg bg-cyclades-turquoise/10 group-hover:bg-cyclades-turquoise/20 transition-colors">
                                <item.icon className="w-5 h-5 text-cyclades-turquoise" />
                            </div>
                            <div>
                                <div className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                                <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{item.label}</div>
                            </div>
                            {index < socialProofData.length - 1 && (
                                <div className={`hidden md:block w-px h-8 ml-8 ${isDark ? 'bg-dark-border/50' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

