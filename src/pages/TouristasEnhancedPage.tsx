import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    MessageCircle,
    Send,
    X,
    User,
    Bot,
    Settings,
    Hotel,
    Ship,
    Plane,
    Utensils,
    Car,
    MapPin,
    Calendar,
    Check,
    Loader2,
    Brain,
    History
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { touristasEnhancedService } from '../services/touristasEnhancedService';
import { useAuthStore } from '../stores/authStore';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestedActions?: string[];
}

const TouristasEnhancedPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Initialize with welcome message
    useEffect(() => {
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: `# Γεια σου! 👋 Welcome to Touristas AI\n\nI'm your **intelligent travel companion** for the Greek Cyclades islands. I can:\n\n🏨 **Book Hotels** - Find and reserve your perfect stay\n\n⛴️ **Ferry Tickets** - Search schedules and buy tickets\n\n🎯 **Activities & Tours** - Discover amazing experiences\n\n🗺️ **Custom Itineraries** - Plan your dream trip\n\n🍽️ **Restaurant Reservations** - Book tables at top spots\n\n🚗 **Airport Transfers** - Compare and book rides\n\n**I remember your preferences** and learn from our conversations to give you personalized recommendations!\n\n*How can I help you plan your Greek island adventure today?*`,
            timestamp: new Date(),
            suggestedActions: ['Plan a 7-day trip', 'Find hotels in Santorini', 'Ferry from Piraeus', 'Best beaches today'],
        }]);
    }, []);

    const handleSend = async (overrideMessage?: string) => {
        const messageText = overrideMessage || inputValue.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await touristasEnhancedService.processMessage(messageText, user?.id);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.response,
                timestamp: new Date(),
                suggestedActions: response.suggestedActions,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment!",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const features = [
        { icon: Brain, title: 'AI Memory', desc: 'Remembers your preferences' },
        { icon: Mic, title: 'Voice Mode', desc: 'Speak naturally' },
        { icon: Hotel, title: 'Auto-Booking', desc: 'Book with one confirmation' },
        { icon: History, title: 'Context Aware', desc: 'Understands your trip' },
    ];

    return (
        <>
            <SEO
                title="Touristas AI | Your Greek Islands Travel Expert"
                description="Meet Touristas, your AI-powered travel assistant for the Cyclades. Voice-enabled, auto-booking, personalized recommendations."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900' : 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500'}`} />
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-32">
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.5 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur mb-6"
                            >
                                <Sparkles className="w-10 h-10 text-white" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-6xl font-bold text-white mb-4"
                            >
                                Meet <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Touristas</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
                            >
                                Your AI-powered travel expert for the Greek Cyclades. Voice-enabled,
                                remembers your preferences, and can book everything for you.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-4 mb-12"
                            >
                                {features.map((feature, i) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white"
                                    >
                                        <feature.icon className="w-5 h-5" />
                                        <span className="text-sm font-medium">{feature.title}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl overflow-hidden`}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Touristas AI</h3>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {isTyping ? 'Thinking...' : 'Online • Ready to help'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                                    className={`p-2 rounded-lg transition-colors ${voiceEnabled
                                            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-400'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                            {messages.map(message => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                            ? 'bg-blue-500'
                                            : 'bg-gradient-to-br from-purple-500 to-cyan-500'
                                        }`}>
                                        {message.role === 'user' ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <Sparkles className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                                        <div className={`p-4 rounded-2xl ${message.role === 'user'
                                                ? 'bg-blue-500 text-white rounded-br-sm'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-white rounded-bl-sm'
                                                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                            }`}>
                                            <div className="prose prose-sm dark:prose-invert max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: message.content
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        .replace(/\n/g, '<br/>')
                                                        .replace(/# (.*?)(?:<br\/>|$)/g, '<h3 class="text-lg font-bold mb-2">$1</h3>')
                                                }}
                                            />
                                        </div>

                                        {message.suggestedActions && message.suggestedActions.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {message.suggestedActions.map((action, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSend(action)}
                                                        className={`text-sm px-4 py-2 rounded-full transition-colors ${isDarkMode
                                                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                            }`}
                                                    >
                                                        {action}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <div className="flex gap-1">
                                            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '0ms' }} />
                                            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '150ms' }} />
                                            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input */}
                        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsListening(!isListening)}
                                    className={`p-3 rounded-xl transition-colors ${isListening
                                            ? 'bg-red-500 text-white animate-pulse'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-400 hover:text-white'
                                                : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                </button>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder={isListening ? '🎤 Listening...' : 'Ask me anything about the Cyclades...'}
                                    className={`flex-1 px-4 py-3 rounded-xl border-none outline-none ${isDarkMode
                                            ? 'bg-gray-700 text-white placeholder-gray-400'
                                            : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                                        }`}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isTyping}
                                    className={`p-3 rounded-xl transition-colors ${inputValue.trim() && !isTyping
                                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-600'
                                                : 'bg-gray-200 text-gray-400'
                                        }`}
                                >
                                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Hotel, label: 'Hotels', color: 'from-purple-500 to-pink-500', action: 'Find me a hotel' },
                            { icon: Ship, label: 'Ferries', color: 'from-cyan-500 to-blue-500', action: 'Search ferry tickets' },
                            { icon: MapPin, label: 'Itinerary', color: 'from-green-500 to-emerald-500', action: 'Create an itinerary' },
                            { icon: Utensils, label: 'Dining', color: 'from-orange-500 to-red-500', action: 'Recommend restaurants' },
                        ].map(item => (
                            <button
                                key={item.label}
                                onClick={() => handleSend(item.action)}
                                className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TouristasEnhancedPage;
