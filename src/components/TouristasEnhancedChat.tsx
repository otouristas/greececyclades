import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Mic,
    MicOff,
    Send,
    Volume2,
    VolumeX,
    User,
    Bot,
    Sparkles,
    ArrowRight,
    X,
    Loader2,
    ChevronDown,
    MapPin,
    Calendar,
    Hotel,
    Ship,
    Plane,
    Utensils,
    Car,
    Check,
    AlertCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { touristasEnhancedService, BookingIntent } from '../services/touristasEnhancedService';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestedActions?: string[];
    bookingIntent?: BookingIntent;
}

interface TouristasEnhancedChatProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt?: string;
    isFullPage?: boolean;
}

const TouristasEnhancedChat: React.FC<TouristasEnhancedChatProps> = ({
    isOpen,
    onClose,
    initialPrompt,
    isFullPage = false,
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [currentBooking, setCurrentBooking] = useState<BookingIntent | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    // Speech recognition setup
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputValue(transcript);
                setIsListening(false);
                // Auto-send after voice input
                setTimeout(() => handleSend(transcript), 500);
            };

            recognitionRef.current.onerror = () => {
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome',
                role: 'assistant',
                content: `Γεια σου! 👋 I'm **Touristas**, your AI travel companion for the Greek Cyclades!\n\nI can help you:\n• 🏨 Book hotels with the best rates\n• ⛴️ Find ferry schedules & buy tickets\n• 🎯 Discover amazing activities\n• 🗺️ Plan custom itineraries\n• ☀️ Check beach conditions\n\nWhat would you like to explore today?`,
                timestamp: new Date(),
                suggestedActions: ['Plan my trip', 'Find hotels', 'Ferry schedules', 'Beach guide'],
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

    // Initial prompt
    useEffect(() => {
        if (initialPrompt && messages.length === 1) {
            handleSend(initialPrompt);
        }
    }, [initialPrompt, messages.length]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Text-to-speech
    const speakMessage = useCallback((text: string) => {
        if (!voiceEnabled || !('speechSynthesis' in window)) return;

        // Clean markdown
        const cleanText = text.replace(/[*#_`]/g, '').replace(/\n/g, '. ');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }, [voiceEnabled]);

    // Handle send message
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
            const response = await touristasEnhancedService.processMessage(messageText);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.response,
                timestamp: new Date(),
                suggestedActions: response.suggestedActions,
                bookingIntent: response.bookingIntent,
            };

            setMessages(prev => [...prev, assistantMessage]);

            if (response.bookingIntent) {
                setCurrentBooking(response.bookingIntent);
            }

            if (response.shouldSpeak) {
                speakMessage(response.response);
            }
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble connecting. Please try again in a moment!",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Handle voice input
    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert('Voice input is not supported in your browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // Handle suggested action click
    const handleActionClick = (action: string) => {
        handleSend(action);
    };

    // Handle booking confirmation
    const handleBookingConfirm = async () => {
        if (!currentBooking) return;

        setIsTyping(true);

        const confirmMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: 'Yes, please confirm this booking',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, confirmMessage]);

        // Simulate booking
        await new Promise(resolve => setTimeout(resolve, 2000));

        const successMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `✅ **Booking Confirmed!**\n\nYour ${currentBooking.type} has been booked successfully!\n\n**Confirmation Code:** CYC${Math.random().toString(36).substring(2, 8).toUpperCase()}\n\nYou'll receive a confirmation email shortly. Is there anything else I can help you with?`,
            timestamp: new Date(),
            suggestedActions: ['Book something else', 'Create itinerary', 'Check weather'],
        };

        setMessages(prev => [...prev, successMessage]);
        setCurrentBooking(null);
        setIsTyping(false);
    };

    const getBookingIcon = (type: string) => {
        switch (type) {
            case 'hotel': return <Hotel className="w-5 h-5" />;
            case 'ferry': return <Ship className="w-5 h-5" />;
            case 'flight': return <Plane className="w-5 h-5" />;
            case 'restaurant': return <Utensils className="w-5 h-5" />;
            case 'transfer': return <Car className="w-5 h-5" />;
            default: return <Sparkles className="w-5 h-5" />;
        }
    };

    if (!isOpen) return null;

    const containerClass = isFullPage
        ? 'fixed inset-0 z-50'
        : 'fixed bottom-4 right-4 w-[400px] h-[600px] z-50 rounded-2xl shadow-2xl overflow-hidden';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={containerClass}
        >
            <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Touristas AI</h3>
                            <p className="text-white/70 text-xs">Your Greek Islands Expert</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setVoiceEnabled(!voiceEnabled);
                                touristasEnhancedService.setVoiceMode(!voiceEnabled);
                            }}
                            className={`p-2 rounded-lg transition-colors ${voiceEnabled ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
                                }`}
                            title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                        >
                            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-blue-500'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                }`}>
                                {message.role === 'user' ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Bot className="w-4 h-4 text-white" />
                                )}
                            </div>
                            <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                                <div className={`p-3 rounded-2xl whitespace-pre-wrap ${message.role === 'user'
                                        ? 'bg-blue-500 text-white rounded-br-sm'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-white rounded-bl-sm'
                                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                    }`}>
                                    {message.content}
                                </div>

                                {/* Suggested Actions */}
                                {message.suggestedActions && message.suggestedActions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {message.suggestedActions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleActionClick(action)}
                                                className={`text-sm px-3 py-1.5 rounded-full transition-colors ${isDarkMode
                                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Booking Card */}
                                {message.bookingIntent && message.bookingIntent.status === 'detected' && (
                                    <div className={`mt-3 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow'
                                        }`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            {getBookingIcon(message.bookingIntent.type)}
                                            <span className={`font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {message.bookingIntent.type} Booking
                                            </span>
                                        </div>
                                        <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {message.bookingIntent.details.destination && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {message.bookingIntent.details.destination}
                                                </div>
                                            )}
                                            {message.bookingIntent.details.checkIn && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {message.bookingIntent.details.checkIn}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleBookingConfirm}
                                            className="w-full mt-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600"
                                        >
                                            <Check className="w-4 h-4" />
                                            Confirm Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <div className="flex gap-1">
                                    <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '0ms' }} />
                                    <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '150ms' }} />
                                    <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleVoiceInput}
                            className={`p-3 rounded-xl transition-colors ${isListening
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-400 hover:text-white'
                                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder={isListening ? 'Listening...' : 'Ask me anything about the Cyclades...'}
                            className={`flex-1 px-4 py-3 rounded-xl border-none outline-none ${isDarkMode
                                    ? 'bg-gray-800 text-white placeholder-gray-500'
                                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                                }`}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!inputValue.trim() || isTyping}
                            className={`p-3 rounded-xl transition-colors ${inputValue.trim() && !isTyping
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-600'
                                        : 'bg-gray-200 text-gray-400'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TouristasEnhancedChat;
