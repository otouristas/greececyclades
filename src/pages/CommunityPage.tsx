import React, { useState, useEffect } from 'react';
import {
    Users,
    Image,
    MessageSquare,
    Heart,
    Share2,
    Plus,
    MapPin,
    Calendar,
    Filter,
    Grid,
    List
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cyclades } from '../data/cyclades';

interface ContentItem {
    id: string;
    type: 'photo' | 'story';
    title: string;
    author: string;
    authorAvatar: string;
    island: string;
    image: string;
    likes: number;
    comments: number;
    createdAt: string;
}

// Mock community content
const mockContent: ContentItem[] = [
    {
        id: '1',
        type: 'photo',
        title: 'Sunset at Oia',
        author: 'Maria K.',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        island: 'Santorini',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
        likes: 234,
        comments: 18,
        createdAt: '2024-12-08',
    },
    {
        id: '2',
        type: 'story',
        title: 'Island hopping adventure: 3 islands in 5 days',
        author: 'John D.',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        island: 'Mykonos',
        image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800',
        likes: 156,
        comments: 42,
        createdAt: '2024-12-07',
    },
    {
        id: '3',
        type: 'photo',
        title: 'Hidden beach in Milos',
        author: 'Elena P.',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        island: 'Milos',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
        likes: 312,
        comments: 25,
        createdAt: '2024-12-06',
    },
    {
        id: '4',
        type: 'photo',
        title: 'Paros windmill at dusk',
        author: 'Alex M.',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        island: 'Paros',
        image: 'https://images.unsplash.com/photo-1586861203927-800a5acdcc4e?w=800',
        likes: 189,
        comments: 11,
        createdAt: '2024-12-05',
    },
];

const CommunityPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [content, setContent] = useState<ContentItem[]>(mockContent);
    const [filter, setFilter] = useState<'all' | 'photo' | 'story'>('all');
    const [selectedIsland, setSelectedIsland] = useState<string>('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredContent = content.filter(item => {
        if (filter !== 'all' && item.type !== filter) return false;
        if (selectedIsland && item.island.toLowerCase() !== selectedIsland) return false;
        return true;
    });

    return (
        <>
            <SEO
                title="Community | Discover Cyclades"
                description="Join our community of Cyclades travelers. Share photos, stories, and tips from your Greek island adventures."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white py-12 px-4`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Community</h1>
                        </div>
                        <p className="text-lg opacity-90 max-w-2xl">
                            Share your Cyclades adventures with fellow travelers. Photos, stories, and local tips welcome!
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Filters */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg mb-6`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                {['all', 'photo', 'story'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f as any)}
                                        className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${filter === f
                                                ? 'bg-purple-500 text-white'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {f === 'all' ? 'All' : f === 'photo' ? '📷 Photos' : '📖 Stories'}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <select
                                    value={selectedIsland}
                                    onChange={e => setSelectedIsland(e.target.value)}
                                    className={`px-4 py-2 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                        }`}
                                >
                                    <option value="">All Islands</option>
                                    {cyclades.map(island => (
                                        <option key={island.id} value={island.slug}>{island.name}</option>
                                    ))}
                                </select>

                                <div className={`flex rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : ''}`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-purple-500 text-white' : ''}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Share CTA */}
                    <div className={`${isDarkMode ? 'bg-gradient-to-r from-purple-800 to-pink-800' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-2xl p-6 mb-8 text-white`}>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Share Your Experience</h2>
                                <p className="opacity-90">Help other travelers discover the magic of the Cyclades</p>
                            </div>
                            <Link
                                to="/profile"
                                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Share Photo or Story
                            </Link>
                        </div>
                    </div>

                    {/* Content Grid/List */}
                    <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {filteredContent.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`w-full object-cover ${viewMode === 'grid' ? 'h-48' : 'h-64'}`}
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-black/50 text-white text-sm rounded-full flex items-center gap-1">
                                            {item.type === 'photo' ? <Image className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                            {item.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <img
                                            src={item.authorAvatar}
                                            alt={item.author}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {item.author}
                                        </span>
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                                        <span className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <MapPin className="w-3 h-3" />
                                            {item.island}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}>
                                                <Heart className="w-4 h-4" />
                                                {item.likes}
                                            </button>
                                            <button className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
                                                <MessageSquare className="w-4 h-4" />
                                                {item.comments}
                                            </button>
                                        </div>
                                        <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityPage;
