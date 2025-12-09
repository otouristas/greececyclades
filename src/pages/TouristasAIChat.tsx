import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, ArrowLeft, Sparkles, MessageCircle, Globe, Phone, Settings,
  Maximize2, Minimize2, Mic, MicOff, Copy, Share2, ThumbsUp, ThumbsDown,
  RotateCcw, MapPin, Calendar, Users, Heart, Camera, Utensils, Ship, 
  Car, Plane, Hotel, Star, Clock, Zap, Brain, Shield, Award,
  ChevronDown, MoreHorizontal, Volume2, VolumeX, Compass, Navigation
} from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { generateConversationalTrip } from '../utils/ai';
import { toast } from '../components/ui/toast';
import SEO from '../components/SEO';

// OpenStreetMap component
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typing?: boolean;
  aiSuggestions?: string[];
};

// Revolutionary "Conversational Canvas" Chat Interface for Touristas AI
export default function TouristasAIChat() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialIsland = searchParams.get('island');
  const initialTab = searchParams.get('tab') || 'chat';
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: initialIsland 
        ? `🇬🇷 **Γεια σας!** Welcome to Touristas AI! I see you're interested in ${initialIsland.charAt(0).toUpperCase() + initialIsland.slice(1)}! \n\nI'm your personal Greek islands oracle with mystical knowledge of all 25+ Cyclades islands. I can:\n\n• **Plan your perfect itinerary** with local insights\n• **Call restaurants in Greek** to make reservations\n• **Book taxis automatically** with Greek conversations\n• **Provide real-time guidance** throughout your journey\n\nWhat mystical Greek island experience shall we create for you? ✨`
        : '🇬🇷 **Γεια σας!** Welcome to Touristas AI - your mystical Greek islands oracle! \n\nI am the world\'s first AI specifically trained on the Cyclades islands with deep cultural knowledge and the ability to:\n\n• **🤖 Plan personalized adventures** for all 25+ islands\n• **📞 Auto-book in Greek** - restaurants, taxis, services\n• **🗺️ Create smart routes** with ferry connections\n• **⚡ Provide instant guidance** 24/7 in Greek & English\n\nTouch an island above or tell me: What\'s your dream Greek island experience? ✨',
      timestamp: new Date(),
      aiSuggestions: [
        '🏝️ Plan 5-day romantic Santorini trip',
        '🍽️ Book traditional taverna tonight',
        '🚕 Call taxi from port to hotel',
        '⛵ Show ferry schedules to Mykonos'
      ]
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiPersonality, setAiPersonality] = useState<'oracle' | 'expert' | 'friend'>('oracle');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognition = useRef<any>(null);
  
  const { user } = useAuthStore();

  // Touristas AI Quick Actions
  const touristasAIActions = [
    { 
      icon: '🏝️', 
      text: 'Plan Trip', 
      action: 'Plan a perfect 5-day trip to Santorini and Mykonos for a couple',
      category: 'Planning'
    },
    { 
      icon: '🍽️', 
      text: 'Book Dinner', 
      action: 'Book me a table at the best traditional taverna in Sifnos for tonight at sunset',
      category: 'Booking'
    },
    { 
      icon: '🚕', 
      text: 'Call Taxi', 
      action: 'Call a taxi from Kamares port to Apollonia in Sifnos for 3 people with luggage',
      category: 'Transport'
    },
    { 
      icon: '⛵', 
      text: 'Ferry Info', 
      action: 'Show me all ferry schedules from Athens to Santorini tomorrow',
      category: 'Transport'
    },
    { 
      icon: '🏨', 
      text: 'Find Hotels', 
      action: 'Find me luxury hotels in Oia Santorini with infinity pools and caldera views',
      category: 'Booking'
    },
    { 
      icon: '☀️', 
      text: 'Weather', 
      action: 'What\'s the weather like in Mykonos this week and best activities?',
      category: 'Info'
    },
    { 
      icon: '🎭', 
      text: 'Local Events', 
      action: 'What festivals and local events are happening in Naxos this month?',
      category: 'Culture'
    },
    { 
      icon: '💰', 
      text: 'Budget Help', 
      action: 'Plan a budget-friendly 7-day island hopping trip under €100 per day',
      category: 'Planning'
    }
  ];

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleVoiceRecording = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Touristas AI'}: ${msg.content}`)
        .join('\n');
      
      const response = await generateConversationalTrip(inputValue, conversationHistory);
      
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        aiSuggestions: [
          '🔄 Modify this plan',
          '💾 Save to my trips',
          '📞 Book restaurants',
          '🗺️ View on map'
        ]
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Touristas AI Error:', error);
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but Touristas AI is having trouble connecting right now. Please try again in a moment - your Greek islands oracle will be back shortly! 🇬🇷',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: 'Touristas AI Connection Error',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    inputRef.current?.focus();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({ title: 'Copied from Touristas AI' });
  };

  return (
    <>
      <SEO 
        title="Touristas AI Chat - Your Personal Greek Islands Oracle"
        description="Chat with Touristas AI, your mystical Greek islands oracle. Get instant recommendations, auto-booking in Greek, and personalized guidance."
        keywords={["Touristas AI", "Greek islands chat", "AI oracle", "travel assistant", "Cyclades AI"]}
      />
      
      <div className={`flex flex-col h-screen bg-gray-50 dark:bg-dark-bg ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Touristas AI Header */}
        <header className="flex-shrink-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Left - Back & Touristas AI Branding */}
            <div className="flex items-center space-x-4">
              <Link
                to="/touristas-ai"
                className="p-2 hover:bg-gray-100 dark:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="h-10 w-auto"
                  />
                  <div className="absolute -inset-1 bg-gray-900 dark:bg-dark-card/10 rounded-full blur-sm"></div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Touristas AI</div>
                  <div className="text-sm text-gray-600 dark:text-white/60 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Greek Islands Oracle Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Mode Selector */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-dark-card rounded-full p-1">
              {[
                { id: 'chat', label: 'Oracle Chat', icon: MessageCircle },
                { id: 'map', label: 'Island Map', icon: Globe },
                { id: 'services', label: 'AI Services', icon: Phone }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm flex items-center space-x-2 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-cyclades-turquoise text-dark-bg shadow-lg' 
                      : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right - Touristas AI Controls */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-3 text-xs text-gray-500 dark:text-white/50">
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3" />
                  <span>AI Mode: {aiPersonality}</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`p-2 rounded-full transition-colors ${
                  isVoiceMode 
                    ? 'bg-cyclades-turquoise text-dark-bg' 
                    : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-white/60'
                }`}
                title="Touristas AI Voice Mode"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-600 dark:text-white/60"
                title="Fullscreen Touristas AI"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-600 dark:text-white/60"
                title="Touristas AI Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Canvas Interface */}
        <div className="flex-1 overflow-hidden">
          {/* Oracle Chat Tab */}
          {activeTab === 'chat' && (
            <div className="h-full flex">
              {/* Left Side - Conversation Canvas */}
              <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-[#E3D7C3]/5">
                {/* Messages Canvas */}
                <div className="flex-1 overflow-y-auto relative">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-10">
                    {/* Touristas AI Quick Actions - Only show at start */}
                    {messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                      >
                        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                          <div className="inline-flex items-center space-x-3 bg-gray-100 dark:bg-white/20 rounded-full px-6 py-3 mb-6">
                            <img 
                              src="/touristas-ai-logo.svg" 
                              alt="Touristas AI" 
                              className="w-6 h-6"
                            />
                            <span className="text-gray-900 dark:text-white text-sm font-semibold">World's Most Intelligent Travel AI</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            ✨ Experience Touristas AI's Revolutionary Intelligence
                          </h3>
                          <p className="text-sm sm:text-base text-gray-900 dark:text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
                            The most advanced AI system ever created for travel - with deep Greek cultural knowledge, 
                            natural language processing, and automated booking capabilities
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                          {touristasAIActions.map((action, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              onClick={() => handleQuickAction(action.action)}
                              className="group p-6 sm:p-8 bg-white hover:bg-gray-100 dark:bg-white/10 rounded-3xl shadow-lg border border-gray-200 dark:border-white/20 hover:border-[#1E2E48]/20 transition-all duration-300 hover:shadow-xl text-center"
                            >
                              <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                {action.icon}
                              </div>
                              <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-900 dark:text-white/80">
                                {action.text}
                              </div>
                              <div className="text-xs text-gray-900 dark:text-white/50 bg-gray-100 dark:bg-white/20 rounded-full px-3 py-1 inline-block">
                                {action.category}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Conversation Messages */}
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} px-2 sm:px-4 lg:px-6`}
                        >
                          <div className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] ${
                            message.role === 'user' 
                              ? 'bg-gray-900 dark:bg-dark-card text-white rounded-3xl rounded-br-lg shadow-lg' 
                              : 'bg-white text-gray-900 dark:text-white rounded-3xl rounded-bl-lg border border-gray-200 dark:border-white/30 shadow-xl'
                          } px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative group`}>
                            
                            {message.typing ? (
                              <div className="flex items-center space-x-4 sm:space-x-6 py-2 sm:py-4">
                                <img 
                                  src="/touristas-ai-logo.svg" 
                                  alt="Touristas AI" 
                                  className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse"
                                />
                                <div className="flex space-x-2">
                                  <div className="w-3 h-3 bg-gray-900 dark:bg-dark-card/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <div className="w-3 h-3 bg-gray-900 dark:bg-dark-card/60 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                                  <div className="w-3 h-3 bg-gray-900 dark:bg-dark-card/60 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                                </div>
                                <span className="text-sm sm:text-base text-gray-900 dark:text-white/60 font-medium">
                                  Touristas AI is consulting the oracle...
                                </span>
                              </div>
                            ) : (
                              <>
                                {message.role === 'assistant' && (
                                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-white/20">
                                    <img 
                                      src="/touristas-ai-logo.svg" 
                                      alt="Touristas AI" 
                                      className="w-8 h-8 sm:w-10 sm:h-10"
                                    />
                                    <div className="flex-1">
                                      <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Touristas AI</span>
                                      <div className="text-xs sm:text-sm text-gray-900 dark:text-white/60">Greek Islands Oracle • World's Most Intelligent Travel AI</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Sparkles className="w-5 h-5 text-gray-900 dark:text-white/60" />
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4">
                                  {message.content}
                                </div>

                                {/* Touristas AI Suggestions */}
                                {message.aiSuggestions && (
                                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-4">
                                    {message.aiSuggestions.map((suggestion, i) => (
                                      <button
                                        key={i}
                                        onClick={() => handleQuickAction(suggestion)}
                                        className="bg-gray-100 dark:bg-white/30 hover:bg-gray-100 dark:bg-white/50 text-gray-900 dark:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-md"
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Message Actions */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 right-2">
                                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                                    <button
                                      onClick={() => copyMessage(message.content)}
                                      className="p-1 hover:bg-gray-100 dark:bg-white/20 rounded-full text-gray-900 dark:text-white/60 hover:text-gray-900 dark:text-white"
                                      title="Copy Touristas AI response"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </button>
                                    {message.role === 'assistant' && (
                                      <>
                                        <button 
                                          className="p-1 hover:bg-gray-100 dark:bg-white/20 rounded-full text-gray-900 dark:text-white/60 hover:text-gray-900 dark:text-white"
                                          title="Like Touristas AI response"
                                        >
                                          <ThumbsUp className="w-3 h-3" />
                                        </button>
                                        <button 
                                          className="p-1 hover:bg-gray-100 dark:bg-white/20 rounded-full text-gray-900 dark:text-white/60 hover:text-gray-900 dark:text-white"
                                          title="Improve Touristas AI"
                                        >
                                          <ThumbsDown className="w-3 h-3" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Enhanced Touristas AI Input Canvas */}
                <div className="flex-shrink-0 border-t border-gray-200 dark:border-white/20 bg-white/95 backdrop-blur-sm">
                  <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="flex items-end space-x-4 sm:space-x-6">
                      <div className="flex-1 relative">
                        <div className="flex items-center space-x-3 mb-3 sm:mb-4 px-2">
                          <img 
                            src="/touristas-ai-logo.svg" 
                            alt="Touristas AI" 
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          />
                          <span className="text-xs sm:text-sm text-gray-900 dark:text-white/60 font-medium">
                            Ask Touristas AI anything about Greek islands...
                          </span>
                          <div className="ml-auto flex items-center space-x-1 text-xs text-gray-900 dark:text-white/40">
                            <Zap className="w-3 h-3" />
                            <span>Most Intelligent AI</span>
                          </div>
                        </div>
                        
                        <textarea
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Plan my perfect trip, book restaurants in Greek, call taxis, get local insights, check weather..."
                          className="w-full resize-none border-2 border-gray-200 dark:border-white/30 rounded-3xl px-6 sm:px-8 py-4 sm:py-6 pr-16 sm:pr-20 focus:outline-none focus:ring-4 focus:ring-[#1E2E48]/10 focus:border-[#1E2E48]/40 text-sm sm:text-base bg-white shadow-lg"
                          rows={1}
                          style={{ minHeight: '64px' }}
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit();
                            }
                          }}
                        />
                        
                        {/* Voice Input for Touristas AI */}
                        {isVoiceMode && (
                          <button
                            type="button"
                            onClick={toggleVoiceRecording}
                            className={`absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                              isListening 
                                ? 'bg-red-100 text-red-600 animate-pulse' 
                                : 'text-gray-900 dark:text-white/40 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/20'
                            }`}
                            title="Voice input for Touristas AI"
                          >
                            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-gray-900 dark:bg-dark-card text-white p-4 sm:p-5 lg:p-6 rounded-3xl hover:bg-gray-900 dark:bg-dark-card/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl group flex-shrink-0"
                        title="Send to Touristas AI - World's Most Intelligent Travel AI"
                      >
                        {isLoading ? (
                          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 animate-spin" />
                        ) : (
                          <Send className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Side - Enhanced Live Context */}
              <div className="hidden lg:block w-80 xl:w-96 border-l border-gray-200 dark:border-white/20 bg-gradient-to-b from-[#E3D7C3]/5 to-white">
                <div className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="text-center mb-8 lg:mb-10">
                    <div className="relative inline-block mb-4">
                      <img 
                        src="/touristas-ai-logo.svg" 
                        alt="Touristas AI" 
                        className="h-10 w-auto mx-auto"
                      />
                      <div className="absolute -inset-2 bg-gray-900 dark:bg-dark-card/10 rounded-full blur-sm"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Touristas AI Intelligence
                    </h3>
                    <p className="text-sm text-gray-900 dark:text-white/60 leading-relaxed">
                      World's most advanced travel AI with live Greek islands data
                    </p>
                  </div>
                  
                  <div className="flex-1 space-y-6 lg:space-y-8">
                    {/* Enhanced Intelligence Widgets */}
                    
                    {/* AI Intelligence Status */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 dark:border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-900 dark:bg-dark-card rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-base font-bold text-gray-900 dark:text-white">AI Intelligence</span>
                          <div className="text-xs text-gray-900 dark:text-white/60">Revolutionary Neural Network</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Knowledge Base</span>
                          <span className="text-green-600 font-medium text-sm">25+ Islands</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Language Processing</span>
                          <span className="text-green-600 font-medium text-sm">Advanced NLP</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Cultural Depth</span>
                          <span className="text-green-600 font-medium text-sm">Expert Level</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Services Status */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 dark:border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-900 dark:bg-dark-card rounded-full flex items-center justify-center">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-base font-bold text-gray-900 dark:text-white">Live Services</span>
                          <div className="text-xs text-gray-900 dark:text-white/60">Automated Booking System</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Restaurant Calling</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-medium text-sm">Online</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Taxi Booking</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-medium text-sm">Ready</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Greek Translation</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-600 font-medium text-sm">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Real-Time Data */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 dark:border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-900 dark:bg-dark-card rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-base font-bold text-gray-900 dark:text-white">Live Data</span>
                          <div className="text-xs text-gray-900 dark:text-white/60">Real-Time Intelligence</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Weather Updates</span>
                          <span className="text-blue-600 font-medium text-sm">Live</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Ferry Schedules</span>
                          <span className="text-blue-600 font-medium text-sm">Real-Time</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white/70">Local Events</span>
                          <span className="text-blue-600 font-medium text-sm">Updated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Map Tab */}
          {activeTab === 'map' && (
            <div className="h-full relative">
              <MapContainer
                center={[37.0, 25.2]}
                zoom={8}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Powered by Touristas AI'
                />
                
                {/* Greek Islands Markers */}
                {[
                  { name: 'Santorini', pos: [36.4, 25.4], emoji: '🌋' },
                  { name: 'Mykonos', pos: [37.4, 25.3], emoji: '🎉' },
                  { name: 'Naxos', pos: [37.1, 25.4], emoji: '🏛️' },
                  { name: 'Paros', pos: [37.1, 25.2], emoji: '⛵' },
                  { name: 'Sifnos', pos: [36.97, 24.67], emoji: '👨‍🍳' },
                  { name: 'Milos', pos: [36.7, 24.5], emoji: '🌈' }
                ].map((island, i) => (
                  <Marker key={i} position={island.pos as [number, number]}>
                    <Popup>
                      <div className="text-center p-3">
                        <div className="text-2xl mb-2">{island.emoji}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{island.name}</h3>
                        <p className="text-xs text-gray-900 dark:text-white/70 mb-3">
                          Ask Touristas AI about this island
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            setInputValue(`Tell me everything about ${island.name} - best activities, restaurants, and hotels`);
                          }}
                          className="bg-gray-900 dark:bg-dark-card text-white px-4 py-2 rounded-full text-xs hover:bg-gray-900 dark:bg-dark-card/90 transition-colors flex items-center space-x-2 mx-auto"
                        >
                          <img 
                            src="/touristas-ai-logo.svg" 
                            alt="Touristas AI" 
                            className="w-3 h-3"
                          />
                          <span>Ask Touristas AI</span>
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Touristas AI Map Overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-white/20">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="w-6 h-6"
                  />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Touristas AI Map
                    </div>
                    <div className="text-xs text-gray-900 dark:text-white/60">
                      Click islands to ask Touristas AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Touristas AI Services Tab */}
          {activeTab === 'services' && (
            <div className="h-full p-6 overflow-y-auto bg-gray-100 dark:bg-white/5">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="h-12 w-auto mx-auto mb-4"
                  />
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
                    Touristas AI Services
                  </h2>
                  <p className="text-lg text-gray-900 dark:text-white/70">
                    Revolutionary AI-powered booking and assistance
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Touristas AI Restaurant Booking',
                      desc: 'AI calls restaurants in perfect Greek',
                      icon: '🍽️',
                      features: ['Natural language processing', 'Greek conversation', 'Instant confirmation'],
                      action: 'Book me dinner at the best traditional taverna in Sifnos tonight'
                    },
                    {
                      title: 'Touristas AI Taxi Service',
                      desc: 'AI calls local taxis automatically',
                      icon: '🚕',
                      features: ['Location intelligence', 'Driver matching', 'SMS confirmations'],
                      action: 'Call a taxi from Kamares port to my hotel in Apollonia'
                    },
                    {
                      title: 'Touristas AI Trip Planning',
                      desc: 'Personalized itineraries with local insights',
                      icon: '🗺️',
                      features: ['25+ island knowledge', 'Ferry connections', 'Budget optimization'],
                      action: 'Plan a perfect 7-day island hopping adventure for a couple'
                    },
                    {
                      title: 'Touristas AI Local Guide',
                      desc: 'Real-time assistance and recommendations',
                      icon: '🎯',
                      features: ['Live weather updates', 'Local events', 'Cultural insights'],
                      action: 'What should I do in Mykonos today based on the weather?'
                    }
                  ].map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-white/20 hover:shadow-xl transition-shadow group"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="text-4xl">{service.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-900 dark:text-white/80">
                            {service.title}
                          </h3>
                          <p className="text-sm text-gray-900 dark:text-white/70 mb-4">{service.desc}</p>
                          
                          <div className="space-y-1 mb-4">
                            {service.features.map((feature, j) => (
                              <div key={j} className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-gray-900 dark:bg-dark-card/40 rounded-full"></div>
                                <span className="text-xs text-gray-900 dark:text-white/60">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveTab('chat');
                              setInputValue(service.action);
                            }}
                            className="w-full bg-gray-100 dark:bg-white/30 hover:bg-gray-100 dark:bg-white/50 text-gray-900 dark:text-white py-2 px-4 rounded-xl transition-colors text-sm flex items-center justify-center space-x-2"
                          >
                            <img 
                              src="/touristas-ai-logo.svg" 
                              alt="Touristas AI" 
                              className="w-4 h-4"
                            />
                            <span>Try with Touristas AI</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Mobile Touristas AI Tab Bar */}
        <div className="lg:hidden flex-shrink-0 bg-white border-t border-gray-200 dark:border-white/20 px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {[
              { id: 'chat', icon: MessageCircle, label: 'Oracle Chat' },
              { id: 'map', icon: Globe, label: 'Island Map' },
              { id: 'services', icon: Phone, label: 'AI Services' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/30 shadow-md' 
                    : 'text-gray-900 dark:text-white/50 hover:text-gray-900 dark:text-white/70 hover:bg-gray-100 dark:bg-white/10'
                }`}
              >
                <tab.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="w-1 h-1 bg-gray-900 dark:bg-dark-card rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Touristas AI Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40 border-l border-gray-200 dark:border-white/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/touristas-ai-logo.svg" 
                      alt="Touristas AI" 
                      className="w-6 h-6"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Touristas AI Settings
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-100 dark:bg-white/20 rounded-full text-gray-900 dark:text-white/60"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* AI Personality */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
                      Touristas AI Personality
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'oracle', name: 'Mystical Oracle', desc: 'Wise and mystical guidance' },
                        { id: 'expert', name: 'Travel Expert', desc: 'Professional recommendations' },
                        { id: 'friend', name: 'Local Friend', desc: 'Casual and friendly advice' }
                      ].map((personality) => (
                        <button
                          key={personality.id}
                          onClick={() => setAiPersonality(personality.id as any)}
                          className={`w-full p-3 rounded-xl text-left transition-colors ${
                            aiPersonality === personality.id 
                              ? 'bg-gray-900 dark:bg-dark-card text-white' 
                              : 'bg-gray-100 dark:bg-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/30'
                          }`}
                        >
                          <div className="font-medium text-sm">{personality.name}</div>
                          <div className={`text-xs ${
                            aiPersonality === personality.id ? 'text-white/70' : 'text-gray-900 dark:text-white/60'
                          }`}>
                            {personality.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Voice Settings */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Voice Mode</span>
                      <div className="text-xs text-gray-900 dark:text-white/60">Talk to Touristas AI</div>
                    </div>
                    <button
                      onClick={() => setIsVoiceMode(!isVoiceMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        isVoiceMode ? 'bg-gray-900 dark:bg-dark-card' : 'bg-gray-100 dark:bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                        isVoiceMode ? 'translate-x-7' : 'translate-x-1'
                      } mt-1`} />
                    </button>
                  </div>
                  
                  {/* Reset Chat */}
                  <div className="pt-4 border-t border-gray-200 dark:border-white/20">
                    <button
                      onClick={() => {
                        setMessages([messages[0]]);
                        setShowSettings(false);
                      }}
                      className="flex items-center space-x-2 text-sm text-gray-900 dark:text-white/60 hover:text-gray-900 dark:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Touristas AI Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
