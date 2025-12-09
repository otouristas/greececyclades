import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTouristas } from '../../contexts/TouristasContext';

export default function TouristasMiniBubble() {
    const { isOpen, openChat } = useTouristas();

    if (isOpen) return null;

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openChat()}
            className="fixed bottom-6 right-6 z-[9998] group"
            aria-label="Open Touristas AI Chat"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyclades-turquoise rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />

            {/* Button with Touristas AI Logo */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-cyclades-turquoise via-cyan-500 to-cyclades-sea-blue rounded-full flex items-center justify-center shadow-2xl shadow-cyclades-turquoise/40 border-2 border-white/20 p-3">
                <img
                    src="/touristas-ai-logo.svg"
                    alt="Touristas AI"
                    className="w-full h-full object-contain"
                />

                {/* Sparkle indicator */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-trust-green rounded-full border-2 border-dark-bg flex items-center justify-center"
                >
                    <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-dark-card text-white text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-dark-border/50">
                Ask Touristas AI 🇬🇷
            </div>
        </motion.button>
    );
}
