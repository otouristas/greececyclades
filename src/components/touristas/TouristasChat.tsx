import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, X, Sparkles, Mic, MicOff, Maximize2, Minimize2,
    Hotel, MapPin, Ship, Camera, Heart, Loader2, Compass
} from 'lucide-react';
import { generateConversationalTrip } from '../../utils/ai';
import ChatMessagesDark from './ChatMessagesDark';
import {
    Message,
    quickCategories,
    welcomeSuggestions,
    extractUserPreferencesFromMessage
} from './utils/chat-utils';

interface TouristasChatProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt?: string;
}

// Icon mapping
const iconMap: Record<string, any> = {
    Hotel, MapPin, Ship, Camera, Heart, Compass
};

export default function TouristasChat({ isOpen, onClose, initialPrompt }: TouristasChatProps) {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const [userPreferences, setUserPreferences] = useState<Record<string, string>>({});
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: `🇬🇷 **Kalimera!** I'm **Touristas AI** - your personal Cyclades expert.

I have deep knowledge of every corner of the Greek islands:
- **All 24 Cyclades islands** from Santorini to Sikinos
- **Ferries, transportation** & island hopping tips
- **Hotels, restaurants, activities** & hidden gems
- **Real-time recommendations** tailored to you

What would you like to explore today?`,
            showHotels: false
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const recognitionRef = useRef<any>(null);

    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(prev => prev + ' ' + transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    // Auto-resize textarea
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    };

    // Toggle voice input
    const toggleVoiceInput = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // Handle quick action
    const handleQuickAction = (prompt: string) => {
        setInput(prompt);
        setShowQuickActions(false);
        inputRef.current?.focus();
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!input.trim() || isLoading) return;

        setShowQuickActions(false);

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Reset textarea height
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        setIsLoading(true);

        // Add typing indicator
        const typingId = 'typing-' + Date.now();
        setMessages(prev => [...prev, {
            id: typingId,
            role: 'assistant',
            content: '',
            typing: true
        }]);

        try {
            // Extract preferences
            const newPreferences = extractUserPreferencesFromMessage(input);
            const updatedPreferences = { ...userPreferences, ...newPreferences };
            setUserPreferences(updatedPreferences);

            // Build conversation history
            const conversationHistory = messages
                .filter(m => !m.typing)
                .map(m => `${m.role === 'user' ? 'User' : 'Touristas AI'}: ${m.content}`)
                .join('\n');

            // Call AI
            const response = await generateConversationalTrip(input.trim(), conversationHistory);

            // Remove typing indicator
            setMessages(prev => prev.filter(m => m.id !== typingId));

            // Add response
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                preferences: updatedPreferences
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => prev.filter(m => m.id !== typingId));
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '🌊 I\'m having a moment connecting to my island knowledge. Please try again!'
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                inputRef.current?.focus();
                scrollToBottom();
            }, 100);
        }
    };

    // Auto-send initial prompt
    useEffect(() => {
        if (isOpen && initialPrompt && messages.length === 1) {
            setInput(initialPrompt);
            setTimeout(() => {
                formRef.current?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }, 500);
        }
    }, [isOpen, initialPrompt]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`fixed z-[9999] flex flex-col overflow-hidden shadow-2xl
          ${isExpanded
                        ? 'inset-4 sm:inset-8 rounded-3xl'
                        : 'inset-0 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-[420px] sm:h-[680px] sm:max-h-[calc(100vh-3rem)] sm:rounded-3xl'
                    }`}
                style={{
                    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
                }}
                role="dialog"
                aria-label="Touristas AI Chat"
                aria-modal="true"
            >
                {/* Premium Dark Header */}
                <div className="relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#0f766e]" />

                    {/* Animated Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-4 left-8 w-24 h-24 bg-cyclades-turquoise/10 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute bottom-0 right-12 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="relative p-4 sm:p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <motion.div whileHover={{ scale: 1.05 }} className="relative">
                                <div className="w-12 h-12 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-cyclades-turquoise via-cyan-400 to-white flex items-center justify-center shadow-lg ring-2 ring-white/20 p-2">
                                    <img
                                        src="/touristas-ai-logo.svg"
                                        alt="Touristas AI"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-trust-green rounded-full border-2 border-dark-card animate-pulse" />
                            </motion.div>

                            <div>
                                <h3 className="font-bold text-lg sm:text-base text-white tracking-tight flex items-center gap-2">
                                    Touristas AI
                                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-cyclades-turquoise to-cyan-400 text-dark-bg rounded-full">
                                        CYCLADES
                                    </span>
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1.5 text-xs text-white/70">
                                        <span className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                                        Greek Islands Oracle • Always Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Plan Trip Button */}
                            <button
                                onClick={() => { onClose(); navigate('/trip-planner'); }}
                                className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white hover:bg-white/10 h-9 px-3 rounded-xl transition-all text-xs font-medium"
                            >
                                <Compass className="h-3.5 w-3.5" />
                                Plan Trip
                            </button>

                            {/* Expand Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="hidden sm:flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all"
                                aria-label={isExpanded ? "Minimize" : "Maximize"}
                            >
                                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white hover:bg-white/10 h-10 w-10 sm:h-9 sm:w-9 rounded-xl transition-all flex items-center justify-center"
                                aria-label="Close chat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Category Pills */}
                {showQuickActions && messages.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 bg-dark-card/80 border-b border-dark-border/30 overflow-x-auto scrollbar-hide"
                    >
                        <div className="flex gap-2">
                            {quickCategories.map((cat, idx) => {
                                const IconComponent = iconMap[cat.icon] || Hotel;
                                return (
                                    <motion.button
                                        key={cat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => handleQuickAction(cat.prompt)}
                                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        {cat.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Chat Messages */}
                <div className="flex-1 min-h-0 overflow-hidden bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-card/50">
                    <ChatMessagesDark
                        messages={messages}
                        messagesEndRef={messagesEndRef}
                        onSuggestionClick={(suggestion) => {
                            setInput(typeof suggestion === 'string' ? suggestion : (suggestion as any).text);
                            setShowQuickActions(false);
                            setTimeout(() => handleSubmit(new Event('submit') as any), 100);
                        }}
                        suggestions={messages.length === 1 ? welcomeSuggestions.map(s => s.text) : undefined}
                    />
                </div>

                {/* Input Area */}
                <div className="border-t border-dark-border/50 bg-dark-card/95 backdrop-blur-xl p-4">
                    {/* Typing Indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-3 px-2"
                        >
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs text-white/50">Touristas AI is thinking...</span>
                        </motion.div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3 items-end">
                        {/* Textarea Input */}
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        if (!isLoading && input.trim()) {
                                            handleSubmit(e);
                                        }
                                    }
                                }}
                                placeholder="Ask me anything about the Cyclades..."
                                rows={1}
                                className="w-full px-4 py-3 pr-12 text-base sm:text-sm bg-dark-bg/80 border border-dark-border/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/30 focus:border-cyclades-turquoise/50 placeholder:text-white/40 text-white transition-all duration-200"
                                disabled={isLoading}
                                style={{ minHeight: '48px', maxHeight: '120px' }}
                            />

                            {/* Voice Input Button */}
                            {recognitionRef.current && (
                                <button
                                    type="button"
                                    onClick={toggleVoiceInput}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${isListening
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : 'text-white/40 hover:text-white hover:bg-white/10'
                                        }`}
                                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                                >
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        {/* Send Button */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className={`h-12 w-12 rounded-2xl p-0 flex items-center justify-center shadow-lg transition-all duration-200 ${input.trim()
                                    ? 'bg-gradient-to-br from-cyclades-turquoise to-cyan-600 hover:from-cyan-400 hover:to-cyclades-turquoise shadow-cyclades-turquoise/30'
                                    : 'bg-dark-border cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <Send className={`h-5 w-5 ${input.trim() ? 'text-white' : 'text-white/40'}`} />
                                )}
                            </button>
                        </motion.div>
                    </form>

                    {/* Quick Actions Row */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                        {[
                            { emoji: '🏝️', text: 'Santorini', query: 'Show me luxury hotels in Oia with caldera views' },
                            { emoji: '🎉', text: 'Mykonos', query: 'Best beach clubs and nightlife in Mykonos' },
                            { emoji: '⛵', text: 'Ferries', query: 'Ferry schedules from Athens to the islands' },
                            { emoji: '🏖️', text: 'Beaches', query: 'Best beaches in the Cyclades' },
                            { emoji: '🗺️', text: 'Island Hop', query: '7-day island hopping itinerary' },
                        ].map((action) => (
                            <button
                                key={action.text}
                                type="button"
                                onClick={() => {
                                    setInput(action.query);
                                    inputRef.current?.focus();
                                }}
                                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-dark-bg/80 hover:bg-white/10 text-white/70 hover:text-white border border-dark-border/30 rounded-full transition-all hover:scale-105"
                            >
                                <span>{action.emoji}</span>
                                {action.text}
                            </button>
                        ))}
                    </div>

                    {/* Powered By Footer */}
                    <div className="mt-3 pt-2 border-t border-dark-border/30 flex items-center justify-center gap-2 text-[10px] text-white/40">
                        <Sparkles className="w-3 h-3 text-cyclades-turquoise" />
                        <span>Powered by Perplexity AI • Specialized 100% in the Cyclades</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
