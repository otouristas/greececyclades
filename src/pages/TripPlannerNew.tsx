import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Send, Loader2, Sparkles, Mic, MicOff, Users,
  Ship, UtensilsCrossed, Camera, Heart, Compass, 
  Menu, X, Plus, Save
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/aiChatService';
import { toast } from '@/hooks/use-toast';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { cyclades } from '../data/islandsData';

// Quick action chips for trip planning
const QUICK_CHIPS = [
  { icon: Heart, label: 'Romantic trip', prompt: 'Plan a romantic 5-day honeymoon across the most beautiful Cyclades islands' },
  { icon: Users, label: 'Family vacation', prompt: 'Plan a family-friendly 7-day trip to kid-friendly Cyclades islands with beaches' },
  { icon: Camera, label: 'Photography tour', prompt: 'Plan a photography-focused trip to the most picturesque Cyclades islands' },
  { icon: Ship, label: 'Island hopping', prompt: 'Create a 10-day island hopping itinerary through the Cyclades' },
  { icon: UtensilsCrossed, label: 'Food & wine', prompt: 'Plan a culinary journey through the best food islands in the Cyclades' },
];

// Message type
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

// Format markdown content
const formatMessageContent = (content: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line, lineIndex) => {
    if (line.startsWith('### ')) {
      parts.push(<h4 key={`h4-${lineIndex}`} className="font-bold text-base mt-3 mb-1 text-gray-900 dark:text-white">{processBoldText(line.replace('### ', ''))}</h4>);
    } else if (line.startsWith('## ')) {
      parts.push(<h3 key={`h3-${lineIndex}`} className="font-bold text-lg mt-4 mb-2 text-gray-900 dark:text-white">{processBoldText(line.replace('## ', ''))}</h3>);
    } else if (line.startsWith('# ')) {
      parts.push(<h2 key={`h2-${lineIndex}`} className="font-bold text-xl mt-4 mb-2 text-gray-900 dark:text-white">{processBoldText(line.replace('# ', ''))}</h2>);
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      const bulletContent = line.replace(/^[-•]\s*/, '');
      parts.push(
        <div key={`bullet-${lineIndex}`} className="flex items-start gap-2 my-1">
          <span className="text-cyclades-turquoise mt-0.5">•</span>
          <span className="text-gray-700 dark:text-white/80">{processBoldText(bulletContent)}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const numMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        parts.push(
          <div key={`num-${lineIndex}`} className="flex items-start gap-2 my-1">
            <span className="text-cyclades-turquoise font-medium min-w-[1.5rem]">{numMatch[1]}.</span>
            <span className="text-gray-700 dark:text-white/80">{processBoldText(numMatch[2])}</span>
          </div>
        );
      }
    } else if (line.trim() === '') {
      parts.push(<div key={`br-${lineIndex}`} className="h-2" />);
    } else {
      parts.push(<p key={`p-${lineIndex}`} className="text-gray-700 dark:text-white/80 leading-relaxed my-1">{processBoldText(line)}</p>);
    }
  });
  
  return parts;
};

// Process bold text
const processBoldText = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function TripPlannerNew() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `🏝️ **Welcome to the Cyclades Trip Planner!**

I'm here to help you plan the perfect Greek island adventure. Tell me about your dream trip and I'll create a personalized itinerary.

**I can help you with:**
- 📅 Multi-day itineraries across multiple islands
- ⛴️ Ferry routes and connections
- 🏨 Hotel recommendations for each stop
- 🍽️ Restaurant and activity suggestions
- 💰 Budget planning and tips

**To get started, tell me:**
- How many days do you have?
- What type of experience are you looking for?
- Any must-visit islands?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle quick chip click
  const handleQuickChip = useCallback((prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMessageId = Date.now().toString();
    
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: userInput,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create placeholder for streaming response
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      }]);

      // Build chat history for API
      const chatHistory: ChatMessage[] = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));
      
      chatHistory.push({ role: 'user', content: userInput });

      // Stream response from Perplexity API
      await sendChatMessage(chatHistory, {
        onChunk: (chunk) => {
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: m.content + chunk }
              : m
          ));
        }
      });
      
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Voice input toggle
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: 'Voice input not supported',
        description: 'Your browser does not support voice input',
        variant: 'destructive',
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  // Popular islands for sidebar
  const popularIslands = cyclades.slice(0, 8);

  return (
    <>
      <SEO 
        title="AI Cyclades Trip Planner: Custom Itinerary in 60 Seconds"
        description="Tell us your style, we'll plan your perfect Greek island trip. AI-powered itineraries with ferry routes, hotels & activities. Free to use."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Trip Planner', url: '/trip-planner' }
        ]}
        faqs={[
          { question: 'How does the AI trip planner work?', answer: 'Tell us your travel dates, interests, and budget. Our AI analyzes 25 islands and creates a personalized itinerary with ferry connections, hotels, and activities in under 60 seconds.' },
          { question: 'Is the trip planner free?', answer: 'Yes! The AI trip planner is completely free to use. Create unlimited itineraries and save your favorites.' },
          { question: 'Can I customize the generated itinerary?', answer: 'Absolutely! The AI creates a starting point, but you can adjust islands, durations, and activities. Save and edit your trips anytime.' }
        ]}
      />
      
      <div className={`h-screen flex ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          w-72 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDark ? 'bg-dark-card border-r border-dark-border' : 'bg-white border-r border-gray-200'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyclades-turquoise to-cyan-600 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trip Planner</h2>
                    <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>AI-Powered</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyclades-turquoise text-dark-bg rounded-xl font-medium hover:bg-cyclades-turquoise/90 transition-colors">
                <Plus className="w-4 h-4" />
                New Trip
              </button>
            </div>

            {/* Popular Islands */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Popular Islands
              </h3>
              <div className="space-y-1">
                {popularIslands.map((island) => (
                  <button
                    key={island.id}
                    onClick={() => handleQuickChip(`Plan a trip to ${island.name} in the Cyclades`)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isDark 
                        ? 'hover:bg-white/10 text-white/80 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={island.image} 
                        alt={island.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{island.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className={`p-4 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
              <Link
                to="/touristas-ai/chat"
                className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sparkles className="w-4 h-4" />
                Chat with Touristas AI
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <header className={`h-14 flex items-center justify-between px-4 border-b ${
            isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              </button>
              <h1 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Plan Your Cyclades Adventure
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-gray-600'
              }`}>
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Trip</span>
              </button>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyclades-turquoise to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Compass className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-cyclades-turquoise text-dark-bg'
                      : isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-gray-200'
                  }`}>
                    {message.role === 'assistant' ? (
                      <div className="space-y-1 text-sm">{formatMessageContent(message.content)}</div>
                    ) : (
                      <p className="text-sm font-medium">{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Loading */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyclades-turquoise to-cyan-600 flex items-center justify-center">
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${isDark ? 'bg-dark-card' : 'bg-white border border-gray-200'}`}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Chips */}
          {messages.length === 1 && (
            <div className={`px-4 py-3 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
              <div className="max-w-3xl mx-auto">
                <p className={`text-xs mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Popular trip ideas:</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {QUICK_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickChip(chip.prompt)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                        isDark 
                          ? 'bg-dark-card border border-dark-border text-white hover:border-cyclades-turquoise' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-cyclades-turquoise'
                      }`}
                    >
                      <chip.icon className="w-4 h-4 text-cyclades-turquoise" />
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`p-4 border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Describe your dream Cyclades trip..."
                    rows={1}
                    className={`w-full px-4 py-3 pr-12 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/30 text-sm ${
                      isDark 
                        ? 'bg-dark-bg border border-dark-border text-white placeholder:text-white/40' 
                        : 'bg-gray-100 border-0 text-gray-900 placeholder:text-gray-500'
                    }`}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-12 w-12 rounded-xl bg-cyclades-turquoise hover:bg-cyclades-turquoise/90 text-dark-bg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
