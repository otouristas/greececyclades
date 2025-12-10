import React, { useState, useRef, useEffect } from 'react';
import {
    Sparkles,
    Heart,
    Share2,
    Volume2,
    VolumeX,
    ChevronUp,
    MapPin,
    Play,
    Pause
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface InspirationItem {
    id: string;
    type: 'video' | 'image';
    title: string;
    description: string;
    mediaUrl: string;
    island: string;
    category: string;
    likes: number;
    isLiked: boolean;
}

// Mock inspiration content
const mockContent: InspirationItem[] = [
    {
        id: '1',
        type: 'image',
        title: 'Golden Hour at Oia',
        description: 'The most magical sunset in the world happens here every evening',
        mediaUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=1200&fit=crop',
        island: 'Santorini',
        category: 'sunset',
        likes: 12453,
        isLiked: false,
    },
    {
        id: '2',
        type: 'image',
        title: 'Paradise Beach',
        description: 'Crystal clear waters and golden sand await',
        mediaUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=1200&fit=crop',
        island: 'Milos',
        category: 'beaches',
        likes: 8721,
        isLiked: true,
    },
    {
        id: '3',
        type: 'image',
        title: 'Little Venice Magic',
        description: 'Where the sea meets colorful balconies',
        mediaUrl: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&h=1200&fit=crop',
        island: 'Mykonos',
        category: 'culture',
        likes: 9432,
        isLiked: false,
    },
    {
        id: '4',
        type: 'image',
        title: 'Hidden Cove',
        description: 'A secret beach known only to locals',
        mediaUrl: 'https://images.unsplash.com/photo-1586861203927-800a5acdcc4e?w=800&h=1200&fit=crop',
        island: 'Paros',
        category: 'hidden-gems',
        likes: 5678,
        isLiked: false,
    },
];

const InspirationFeedPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [content, setContent] = useState<InspirationItem[]>(mockContent);
    const [isMuted, setIsMuted] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle scroll
    const handleScroll = (direction: 'up' | 'down') => {
        if (direction === 'up' && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else if (direction === 'down' && currentIndex < content.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') handleScroll('up');
            if (e.key === 'ArrowDown') handleScroll('down');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, content.length]);

    // Touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientY;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) handleScroll('down');
            else handleScroll('up');
        }
    };

    // Toggle like
    const toggleLike = (id: string) => {
        setContent(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
                    : item
            )
        );
    };

    const currentItem = content[currentIndex];

    return (
        <>
            <SEO
                title="Inspiration Feed | Discover Cyclades"
                description="Get inspired by stunning visuals from the Greek Cyclades islands. Swipe through photos and videos."
            />

            <div
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="h-screen bg-black overflow-hidden relative"
            >
                {/* Content Slides */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {/* Background Image/Video */}
                        <div className="absolute inset-0">
                            <img
                                src={currentItem.mediaUrl}
                                alt={currentItem.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 pb-24">
                            <div className="flex items-end justify-between">
                                {/* Text Content */}
                                <div className="flex-1 pr-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-4 h-4 text-white" />
                                        <span className="text-white/80 text-sm">{currentItem.island}</span>
                                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-white text-xs">
                                            {currentItem.category}
                                        </span>
                                    </div>
                                    <h2 className="text-white text-2xl font-bold mb-2">{currentItem.title}</h2>
                                    <p className="text-white/80 text-sm">{currentItem.description}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => toggleLike(currentItem.id)}
                                        className="flex flex-col items-center"
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentItem.isLiked ? 'bg-red-500' : 'bg-white/20'
                                            }`}>
                                            <Heart className={`w-6 h-6 ${currentItem.isLiked ? 'text-white fill-white' : 'text-white'}`} />
                                        </div>
                                        <span className="text-white text-xs mt-1">
                                            {currentItem.likes.toLocaleString()}
                                        </span>
                                    </button>

                                    <button className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                            <Share2 className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-white text-xs mt-1">Share</span>
                                    </button>

                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                            {isMuted ? (
                                                <VolumeX className="w-6 h-6 text-white" />
                                            ) : (
                                                <Volume2 className="w-6 h-6 text-white" />
                                            )}
                                        </div>
                                        <span className="text-white text-xs mt-1">{isMuted ? 'Unmute' : 'Mute'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    {content.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-1 rounded-full transition-all ${i === currentIndex ? 'h-6 bg-white' : 'h-1 bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll Hint */}
                {currentIndex < content.length - 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                        <ChevronUp className="w-8 h-8 text-white/60 rotate-180" />
                    </div>
                )}

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-white" />
                        <span className="text-white font-semibold">Inspiration</span>
                    </div>
                    <a
                        href="/"
                        className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm"
                    >
                        Exit
                    </a>
                </div>

                {/* CTA Button */}
                <a
                    href={`/guides/${currentItem.island.toLowerCase()}`}
                    className="absolute bottom-6 left-6 right-20 py-3 bg-white rounded-xl text-center font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                    Explore {currentItem.island}
                </a>
            </div>
        </>
    );
};

export default InspirationFeedPage;
