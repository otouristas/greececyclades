import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Send, Sparkles, MapPin, Users, Hotel, Ship,
    Heart, Sun, ChevronDown, ChevronUp, Plus, Minus,
    Compass, RotateCcw, Menu, X
} from 'lucide-react';
import { generateConversationalTrip } from '../utils/ai';
import SEO from '../components/SEO';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    typing?: boolean;
};

type TripPreferences = {
    islands: string[];
    dates: { from: Date | null; to: Date | null };
    travelers: { adults: number; children: number };
    budget: 'budget' | 'mid-range' | 'luxury' | null;
    interests: string[];
    tripType: 'romantic' | 'family' | 'adventure' | 'relaxation' | 'cultural' | null;
};

// Island data
const islands = [
    { name: 'Santorini', highlight: 'Iconic sunsets & caldera views' },
    { name: 'Mykonos', highlight: 'Vibrant nightlife & beaches' },
    { name: 'Paros', highlight: 'Traditional villages & watersports' },
    { name: 'Naxos', highlight: 'Largest island with ancient ruins' },
    { name: 'Milos', highlight: 'Unique geology & lunar beaches' },
    { name: 'Ios', highlight: 'Adventure & beach parties' },
    { name: 'Folegandros', highlight: 'Unspoiled cliff-top charm' },
    { name: 'Syros', highlight: 'Neo-classical capital Ermoupoli' },
    { name: 'Antiparos', highlight: 'Cave exploration & serenity' },
    { name: 'Serifos', highlight: 'Rugged beauty & hiking' },
    { name: 'Sifnos', highlight: 'Gastronomy & pottery' },
    { name: 'Amorgos', highlight: 'Remote beauty & Chozoviotissa' },
];

// Interest tags
const interestOptions = [
    { icon: '🏖️', label: 'Beaches' },
    { icon: '🍽️', label: 'Food & Wine' },
    { icon: '🏛️', label: 'History' },
    { icon: '🎉', label: 'Nightlife' },
    { icon: '🥾', label: 'Hiking' },
    { icon: '📸', label: 'Photography' },
    { icon: '🧘', label: 'Wellness' },
    { icon: '⛵', label: 'Sailing' },
];

// Quick prompts
const quickPrompts = [
    { icon: Sun, label: 'Best Time to Visit', prompt: 'When is the best time to visit the Cyclades?' },
    { icon: Ship, label: 'Ferry Connections', prompt: 'How do I get between Santorini, Mykonos, and Paros by ferry?' },
    { icon: Hotel, label: 'Where to Stay', prompt: 'What are the best areas to stay in each island?' },
    { icon: Heart, label: 'Hidden Gems', prompt: 'What are some hidden gem spots tourists usually miss?' },
];

// Format markdown content
const formatMessageContent = (content: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
        if (line.startsWith('### ')) {
            parts.push(<h4 key={`h4-${lineIndex}`} className="font-bold text-base mt-3 mb-1 text-cyclades-turquoise">{line.replace('### ', '')}</h4>);
        } else if (line.startsWith('## ')) {
            parts.push(<h3 key={`h3-${lineIndex}`} className="font-bold text-lg mt-4 mb-2 text-white">{line.replace('## ', '')}</h3>);
        } else if (line.startsWith('- ') || line.startsWith('• ')) {
            const bulletContent = line.replace(/^[-•]\s*/, '');
            parts.push(
                <div key={`bullet-${lineIndex}`} className="flex items-start gap-2 my-1">
                    <span className="text-cyclades-turquoise mt-0.5">•</span>
                    <span className="text-white/80">{processBoldText(bulletContent)}</span>
                </div>
            );
        } else if (/^\d+\.\s/.test(line)) {
            const numMatch = line.match(/^(\d+)\.\s(.*)/);
            if (numMatch) {
                parts.push(
                    <div key={`num-${lineIndex}`} className="flex items-start gap-2 my-1">
                        <span className="text-cyclades-turquoise font-medium min-w-[1.5rem]">{numMatch[1]}.</span>
                        <span className="text-white/80">{processBoldText(numMatch[2])}</span>
                    </div>
                );
            }
        } else if (line.trim() === '') {
            parts.push(<div key={`br-${lineIndex}`} className="h-2" />);
        } else {
            parts.push(<p key={`p-${lineIndex}`} className="text-white/80 leading-relaxed my-1">{processBoldText(line)}</p>);
        }
    });

    return parts;
};

const processBoldText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export default function PlanTripAINew() {
    // Preferences state
    const [preferences, setPreferences] = useState<TripPreferences>({
        islands: [],
        dates: { from: null, to: null },
        travelers: { adults: 2, children: 0 },
        budget: null,
        interests: [],
        tripType: null,
    });

    // UI state
    const [showMobilePrefs, setShowMobilePrefs] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>('islands');
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');

    // Chat state
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: `✨ **Welcome to Cyclades Trip Planner!**

I'll help you create the **perfect Greek island itinerary** based on your preferences.

**Start by:**
1. Select which islands you want to visit  
2. Set your travel dates & group size
3. Tell me your interests & budget

Or just describe your dream trip and I'll take care of the rest! 🌊`,
            timestamp: new Date(),
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Toggle island selection
    const toggleIsland = (name: string) => {
        setPreferences(prev => ({
            ...prev,
            islands: prev.islands.includes(name)
                ? prev.islands.filter(i => i !== name)
                : [...prev.islands, name]
        }));
    };

    // Toggle interest
    const toggleInterest = (label: string) => {
        setPreferences(prev => ({
            ...prev,
            interests: prev.interests.includes(label)
                ? prev.interests.filter(i => i !== label)
                : [...prev.interests, label]
        }));
    };

    // Generate trip prompt from preferences
    const generatePromptFromPreferences = () => {
        const parts = [];

        if (preferences.islands.length > 0) {
            parts.push(`visiting ${preferences.islands.join(', ')}`);
        }

        if (preferences.tripType) {
            parts.push(`for a ${preferences.tripType} trip`);
        }

        if (preferences.travelers.adults > 0) {
            parts.push(`with ${preferences.travelers.adults} adult${preferences.travelers.adults > 1 ? 's' : ''}`);
            if (preferences.travelers.children > 0) {
                parts.push(`and ${preferences.travelers.children} child${preferences.travelers.children > 1 ? 'ren' : ''}`);
            }
        }

        if (preferences.budget) {
            parts.push(`on a ${preferences.budget} budget`);
        }

        if (preferences.interests.length > 0) {
            parts.push(`interested in ${preferences.interests.join(', ')}`);
        }

        return `Plan a Cyclades trip ${parts.join(' ')}. Include day-by-day itinerary, hotel recommendations, transportation, and activities.`;
    };

    // Handle submit
    const handleSubmit = async (e?: React.FormEvent, overridePrompt?: string) => {
        if (e) e.preventDefault();

        const prompt = overridePrompt || input.trim();
        if (!prompt || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: prompt,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add typing indicator
        const typingId = 'typing-' + Date.now();
        setMessages(prev => [...prev, {
            id: typingId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            typing: true
        }]);

        try {
            const conversationHistory = messages
                .filter(m => !m.typing)
                .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
                .join('\n');

            const response = await generateConversationalTrip(prompt, conversationHistory);

            setMessages(prev => prev.filter(m => m.id !== typingId));

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Planning error:', error);
            setMessages(prev => prev.filter(m => m.id !== typingId));
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '🌊 I\'m having trouble connecting. Please try again in a moment!',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate trip from preferences
    const handleGenerateTrip = () => {
        const prompt = generatePromptFromPreferences();
        handleSubmit(undefined, prompt);
    };

    // Clear and restart
    const handleReset = () => {
        setMessages([{
            id: 'welcome-new',
            role: 'assistant',
            content: '✨ Fresh start! Tell me about your dream Cyclades adventure.',
            timestamp: new Date(),
        }]);
        setPreferences({
            islands: [],
            dates: { from: null, to: null },
            travelers: { adults: 2, children: 0 },
            budget: null,
            interests: [],
            tripType: null,
        });
    };

    return (
        <>
            <SEO
                title="Plan Your Cyclades Trip | AI-Powered Itinerary Builder"
                description="Create your perfect Greek islands itinerary with our AI trip planner. Get personalized recommendations for Santorini, Mykonos, Paros, and more."
            />

            <div className="dark bg-dark-bg min-h-screen flex flex-col">
                {/* Header */}
                <header className="flex-shrink-0 bg-dark-card border-b border-dark-border/50 px-4 py-3">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2">
                                <Compass className="w-6 h-6 text-cyclades-turquoise" />
                                <span className="font-display font-bold text-lg text-white hidden sm:inline">
                                    Cyclades Trip Planner
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Mobile toggle */}
                            <button
                                onClick={() => setShowMobilePrefs(!showMobilePrefs)}
                                className="md:hidden p-2 hover:bg-white/10 rounded-lg text-white/70"
                            >
                                {showMobilePrefs ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={handleReset}
                                className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"
                                title="Start Over"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar - Preferences */}
                    <aside className={`
            ${showMobilePrefs ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            fixed md:relative inset-y-0 left-0 z-40
            w-80 bg-dark-card border-r border-dark-border/50 
            overflow-y-auto transition-transform duration-300
          `}>
                        <div className="p-4 space-y-6">
                            {/* Plan Summary */}
                            <div className="bg-gradient-to-br from-cyclades-turquoise/20 to-cyclades-sea-blue/10 rounded-xl p-4 border border-cyclades-turquoise/20">
                                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-cyclades-turquoise" />
                                    Your Trip
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Islands:</span>
                                        <span className="text-white font-medium">
                                            {preferences.islands.length > 0 ? preferences.islands.length : '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Travelers:</span>
                                        <span className="text-white font-medium">
                                            {preferences.travelers.adults + preferences.travelers.children}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/60">Budget:</span>
                                        <span className="text-white font-medium capitalize">
                                            {preferences.budget || '-'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerateTrip}
                                    disabled={preferences.islands.length === 0 || isLoading}
                                    className="w-full mt-4 py-3 bg-cyclades-turquoise text-dark-bg font-bold rounded-xl hover:bg-cyclades-turquoise/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Generate AI Itinerary
                                </button>
                            </div>

                            {/* Islands Selection */}
                            <div>
                                <button
                                    onClick={() => setActiveSection(activeSection === 'islands' ? null : 'islands')}
                                    className="w-full flex items-center justify-between text-white font-semibold mb-3"
                                >
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-cyclades-turquoise" />
                                        Islands ({preferences.islands.length})
                                    </span>
                                    {activeSection === 'islands' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {activeSection === 'islands' && (
                                    <div className="grid grid-cols-2 gap-2 animate-fade-in">
                                        {islands.map((island) => (
                                            <button
                                                key={island.name}
                                                onClick={() => toggleIsland(island.name)}
                                                className={`p-2 rounded-lg border text-left transition-all ${preferences.islands.includes(island.name)
                                                        ? 'bg-cyclades-turquoise/20 border-cyclades-turquoise text-white'
                                                        : 'border-dark-border/50 text-white/70 hover:border-cyclades-turquoise/50'
                                                    }`}
                                            >
                                                <div className="text-sm font-medium">{island.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Travelers */}
                            <div>
                                <button
                                    onClick={() => setActiveSection(activeSection === 'travelers' ? null : 'travelers')}
                                    className="w-full flex items-center justify-between text-white font-semibold mb-3"
                                >
                                    <span className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-cyclades-turquoise" />
                                        Travelers
                                    </span>
                                    {activeSection === 'travelers' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {activeSection === 'travelers' && (
                                    <div className="space-y-3 animate-fade-in">
                                        <div className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                                            <span className="text-white/70 text-sm">Adults</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setPreferences(p => ({ ...p, travelers: { ...p.travelers, adults: Math.max(1, p.travelers.adults - 1) } }))}
                                                    className="w-8 h-8 rounded-full border border-dark-border/50 flex items-center justify-center text-white/70 hover:bg-white/10"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center text-white font-medium">{preferences.travelers.adults}</span>
                                                <button
                                                    onClick={() => setPreferences(p => ({ ...p, travelers: { ...p.travelers, adults: Math.min(10, p.travelers.adults + 1) } }))}
                                                    className="w-8 h-8 rounded-full border border-dark-border/50 flex items-center justify-center text-white/70 hover:bg-white/10"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-dark-bg/50 rounded-lg p-3">
                                            <span className="text-white/70 text-sm">Children</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setPreferences(p => ({ ...p, travelers: { ...p.travelers, children: Math.max(0, p.travelers.children - 1) } }))}
                                                    className="w-8 h-8 rounded-full border border-dark-border/50 flex items-center justify-center text-white/70 hover:bg-white/10"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center text-white font-medium">{preferences.travelers.children}</span>
                                                <button
                                                    onClick={() => setPreferences(p => ({ ...p, travelers: { ...p.travelers, children: Math.min(10, p.travelers.children + 1) } }))}
                                                    className="w-8 h-8 rounded-full border border-dark-border/50 flex items-center justify-center text-white/70 hover:bg-white/10"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Budget */}
                            <div>
                                <button
                                    onClick={() => setActiveSection(activeSection === 'budget' ? null : 'budget')}
                                    className="w-full flex items-center justify-between text-white font-semibold mb-3"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-cyclades-turquoise">💰</span>
                                        Budget
                                    </span>
                                    {activeSection === 'budget' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {activeSection === 'budget' && (
                                    <div className="space-y-2 animate-fade-in">
                                        {(['budget', 'mid-range', 'luxury'] as const).map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => setPreferences(p => ({ ...p, budget: level }))}
                                                className={`w-full p-3 rounded-lg border text-left transition-all ${preferences.budget === level
                                                        ? 'bg-cyclades-turquoise/20 border-cyclades-turquoise text-white'
                                                        : 'border-dark-border/50 text-white/70 hover:border-cyclades-turquoise/50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="capitalize font-medium">{level}</span>
                                                    <span className="text-xs text-white/50">
                                                        {level === 'budget' ? '€50-100/day' : level === 'mid-range' ? '€100-200/day' : '€200+/day'}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Interests */}
                            <div>
                                <button
                                    onClick={() => setActiveSection(activeSection === 'interests' ? null : 'interests')}
                                    className="w-full flex items-center justify-between text-white font-semibold mb-3"
                                >
                                    <span className="flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-cyclades-turquoise" />
                                        Interests ({preferences.interests.length})
                                    </span>
                                    {activeSection === 'interests' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {activeSection === 'interests' && (
                                    <div className="flex flex-wrap gap-2 animate-fade-in">
                                        {interestOptions.map((interest) => (
                                            <button
                                                key={interest.label}
                                                onClick={() => toggleInterest(interest.label)}
                                                className={`px-3 py-2 rounded-full border text-sm transition-all ${preferences.interests.includes(interest.label)
                                                        ? 'bg-cyclades-turquoise/20 border-cyclades-turquoise text-white'
                                                        : 'border-dark-border/50 text-white/70 hover:border-cyclades-turquoise/50'
                                                    }`}
                                            >
                                                {interest.icon} {interest.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Mobile overlay */}
                    {showMobilePrefs && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 md:hidden"
                            onClick={() => setShowMobilePrefs(false)}
                        />
                    )}

                    {/* Main Chat Area */}
                    <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        {/* Quick Prompts Bar */}
                        <div className="flex-shrink-0 border-b border-dark-border/50 py-3 px-4 overflow-x-auto scrollbar-hide">
                            <div className="flex gap-2 max-w-3xl mx-auto">
                                {quickPrompts.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleSubmit(undefined, item.prompt)}
                                        className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-full border border-dark-border/30 text-sm text-white/70 hover:text-white hover:border-cyclades-turquoise/50 transition-all whitespace-nowrap"
                                    >
                                        <item.icon className="w-4 h-4 text-cyclades-turquoise" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="max-w-3xl mx-auto space-y-6">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyclades-turquoise to-cyclades-sea-blue flex items-center justify-center flex-shrink-0">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                        )}

                                        <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${message.role === 'user'
                                                ? 'bg-cyclades-turquoise text-dark-bg'
                                                : 'bg-dark-card border border-dark-border/30'
                                            }`}>
                                            {message.typing ? (
                                                <div className="flex items-center gap-3 py-2">
                                                    <div className="flex gap-1">
                                                        {[0, 1, 2].map(i => (
                                                            <div
                                                                key={i}
                                                                className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce"
                                                                style={{ animationDelay: `${i * 150}ms` }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-white/50 text-sm">Planning your trip...</span>
                                                </div>
                                            ) : message.role === 'assistant' ? (
                                                <div className="space-y-1 text-sm">
                                                    {formatMessageContent(message.content)}
                                                </div>
                                            ) : (
                                                <p className="text-sm">{message.content}</p>
                                            )}
                                        </div>

                                        {message.role === 'user' && (
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-5 h-5 text-white/70" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="flex-shrink-0 bg-dark-card border-t border-dark-border/50 p-4">
                            <div className="max-w-3xl mx-auto">
                                <form onSubmit={handleSubmit} className="flex items-end gap-3">
                                    <div className="flex-1">
                                        <textarea
                                            ref={inputRef}
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Describe your dream trip or ask anything..."
                                            className="w-full resize-none bg-dark-bg border border-dark-border/50 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/50 focus:border-cyclades-turquoise/50"
                                            rows={1}
                                            disabled={isLoading}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="p-3 bg-cyclades-turquoise text-dark-bg rounded-xl hover:bg-cyclades-turquoise/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow"
                                    >
                                        {isLoading ? (
                                            <Sparkles className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5" />
                                        )}
                                    </button>
                                </form>

                                <p className="text-center text-white/40 text-xs mt-3">
                                    Powered by Touristas AI • Your Cyclades Expert
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
