import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Send, Loader2, Sparkles, Mic, MicOff, Users,
  Ship, UtensilsCrossed, Camera, Heart, Sun,
  Wallet, Compass, ArrowRight
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/aiChatService';
import { toast } from '@/hooks/use-toast';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

// Quick action chips for Cyclades
const QUICK_CHIPS = [
  { icon: Sun, label: 'Best sunsets', prompt: 'Show me the best sunset spots across the Cyclades islands' },
  { icon: UtensilsCrossed, label: 'Local food', prompt: 'What are the must-try local dishes and restaurants in the Cyclades?' },
  { icon: Heart, label: 'Romantic islands', prompt: 'Help me plan a romantic getaway in the Cyclades' },
  { icon: Camera, label: 'Photo spots', prompt: 'Where are the best photography spots in the Cyclades?' },
  { icon: Ship, label: 'Island hopping', prompt: 'Plan a 7-day island hopping route through the Cyclades' },
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

export default function TouristasAIChatNew() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `✨ **Welcome to Touristas AI - Your Cyclades Expert!**

I'm your personal Greek islands travel assistant. I can help you:

- 🏝️ Discover all 24 Cyclades islands
- 🏨 Find the perfect hotels for any budget
- 🗓️ Create detailed day-by-day itineraries
- 🍽️ Discover the best restaurants & hidden gems
- ⛴️ Plan ferry routes & island hopping trips

**What kind of Cyclades adventure are you dreaming of?**`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Filter states
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<'budget' | 'mid-range' | 'luxury' | null>(null);
  
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
    
    // Create user message
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
        .filter(m => m.id !== 'welcome') // Exclude welcome message
        .map(m => ({ role: m.role, content: m.content }));
      
      // Add current user message
      chatHistory.push({ role: 'user', content: userInput });

      // Stream response from Perplexity via Supabase Edge Function
      await sendChatMessage(chatHistory, {
        budget: budget || undefined,
        travelers: travelers,
        onChunk: (chunk) => {
          // Update assistant message with streaming content
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

  return (
    <>
      <SEO 
        title="Touristas AI Chat - Your Cyclades Travel Expert"
        description="Chat with Touristas AI, your personal Greek islands expert. Get instant recommendations, custom itineraries, and insider tips for the Cyclades."
      />
      
      <div className={`h-screen flex flex-col ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`h-14 flex items-center justify-between px-4 border-b ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'
        }`}>
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link
              to="/touristas-ai"
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowRight className={`w-5 h-5 rotate-180 ${isDark ? 'text-white' : 'text-gray-700'}`} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyclades-turquoise to-cyan-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Touristas AI</h1>
                <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Cyclades Expert</p>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="hidden md:flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
              isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              <Users className="w-4 h-4" />
              {travelers} guests
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
              isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              <Wallet className="w-4 h-4" />
              {budget || 'Any budget'}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              to="/trip-planner"
              className="flex items-center gap-2 px-3 py-1.5 bg-cyclades-turquoise text-dark-bg rounded-full text-sm font-medium hover:bg-cyclades-turquoise/90 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Trip Planner</span>
            </Link>
          </div>
        </header>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Messages */}
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
                      <Sparkles className="w-4 h-4 text-white" />
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
                    <Sparkles className="w-4 h-4 text-white" />
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
                <p className={`text-xs mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Try asking:</p>
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
                    placeholder="Ask about islands, hotels, ferries, activities..."
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
