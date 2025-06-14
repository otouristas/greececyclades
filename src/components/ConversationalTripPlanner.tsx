import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, X, ThumbsUp, ThumbsDown, Share2, Download, Save, MapPin, Calendar, Compass, Umbrella, Utensils, Camera, Ship, Hotel, Plane, MapIcon, ExternalLink, MessageCircle, Zap, Globe, Heart, Star, Clock, Euro, Users, Camera as CameraIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTripStore } from '../store/tripStore';
import { generateConversationalTrip } from '../utils/ai';
import { Island, IslandActivity } from '../types/island';
import { toast } from './ui/toast';
import { cyclades } from '../data/islandsData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typing?: boolean;
};

type TripPlan = {
  islands: Island[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: {
      time: string;
      title: string;
      description: string;
      location?: string;
      type: 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport';
      price?: string;
      duration?: string;
    }[];
  }[];
  metadata?: {
    totalCost?: string;
    duration?: string;
    bestTime?: string;
    travelStyle?: string;
  };
};

export default function ConversationalTripPlanner() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to Touristas AI! 🇬🇷 I\'m your personal Greek islands expert, ready to craft the perfect Cyclades adventure just for you. Whether you\'re dreaming of Santorini sunsets, Mykonos nightlife, or hidden gems like Folegandros, I\'ll create a personalized itinerary that matches your style and budget.\n\nTell me: What\'s your dream Greek island experience?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<TripPlan | null>(null);
  const [feedback, setFeedback] = useState<{[key: string]: 'like' | 'dislike' | null}>({});
  const [activeTab, setActiveTab] = useState<'chat' | 'trip' | 'explore'>('chat');
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { user } = useAuthStore();
  const tripStore = useTripStore();

  // Enhanced quick prompts specifically for Greece
  const quickPrompts = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Romantic Getaway",
      prompt: "Plan a romantic 7-day honeymoon to Santorini and Mykonos in September",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Family Adventure",
      prompt: "Create a 10-day family trip to Naxos and Paros with kids, focusing on beaches and culture",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Island Hopping",
      prompt: "Design a 2-week island hopping adventure through lesser-known Cyclades gems",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Utensils className="h-5 w-5" />,
      title: "Culinary Journey",
      prompt: "Plan a food-focused trip to Sifnos and Tinos, exploring traditional Greek cuisine",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <CameraIcon className="h-5 w-5" />,
      title: "Photography Tour",
      prompt: "Create an Instagram-worthy photography trip covering the most photogenic spots",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Euro className="h-5 w-5" />,
      title: "Budget Travel",
      prompt: "Plan a budget-friendly 2-week trip under €100/day including authentic experiences",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickPrompts(false);
    
    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Get conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const response = await generateConversationalTrip(inputValue, conversationHistory);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      // Extract trip plan from the text response since AI returns a string
      const tripPlan = extractTripPlanFromText(response);
      if (tripPlan) {
        setGeneratedTrip(tripPlan);
        setActiveTab('trip');
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error generating trip:', error);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or feel free to browse our pre-made itineraries in the Explore section!',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: 'Connection Error',
        description: 'Please check your internet connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to extract trip plan from text response
  const extractTripPlanFromText = (text: string): TripPlan | null => {
    // Check if the text has a day-by-day itinerary format
    const dayMatches = text.match(/Day \d+[-:]?.*?(?=Day \d+|$)/gs);
    if (!dayMatches || dayMatches.length < 2) return null;
    
    // Extract islands mentioned
    const islandNames = ['Mykonos', 'Santorini', 'Naxos', 'Paros', 'Milos', 'Folegandros', 'Sifnos', 'Amorgos', 'Ios', 'Syros', 'Tinos', 'Andros', 'Kea'];
    const mentionedIslands: Island[] = [];
    
    islandNames.forEach(island => {
      if (text.includes(island)) {
        const fullIslandData = cyclades.find(i => i.name?.toLowerCase() === island.toLowerCase());
        mentionedIslands.push(fullIslandData || {
          id: island.toLowerCase(),
          name: island,
          description: `Visit the beautiful island of ${island}`,
          image: `/images/islands/${island.toLowerCase()}.jpg`,
          shortDescription: `Discover ${island}`,
          highlights: []
        });
      }
    });
    
    if (mentionedIslands.length === 0) return null;
    
    // Create itinerary with enhanced data
    const itinerary = dayMatches.map((dayText, index) => {
      const dayNumber = index + 1;
      const dayLines = dayText.split('\n').filter(line => line.trim());
      
      const titleMatch = dayText.match(/Day \d+[-:]?\s*(.*?)(?:\n|$)/);
      const title = titleMatch ? titleMatch[1].trim() : `Day ${dayNumber}`;
      
      let description = '';
      if (dayLines.length > 1) {
        description = dayLines[1].trim();
      }
      
      // Enhanced activity extraction
      const activities: TripPlan['itinerary'][0]['activities'] = [];
      const bulletPoints = dayText.match(/[-•]\s*(.*?)(?=[-•]|\n|$)/g) || [];
      
      if (bulletPoints.length > 0) {
        bulletPoints.forEach((activity, actIndex) => {
          const cleanActivity = activity.replace(/^[-•]\s*/, '').trim();
          if (cleanActivity) {
            activities.push({
              time: `${9 + actIndex * 2}:00`,
              title: cleanActivity,
              description: 'Enjoy this authentic Greek experience',
              type: getActivityType(cleanActivity),
              duration: '2-3 hours',
              price: 'Varies'
            });
          }
        });
      }
      
      // Ensure we have at least one activity
      if (activities.length === 0) {
        activities.push({
          time: '9:00',
          title: 'Explore the island',
          description: 'Discover the beauty and culture of the Greek islands',
          type: 'activity',
          duration: 'Full day',
          price: 'Free'
        });
      }
      
      return {
        day: dayNumber,
        title,
        description,
        activities
      };
    });
    
    return {
      islands: mentionedIslands,
      itinerary,
      metadata: {
        duration: `${itinerary.length} days`,
        travelStyle: 'Personalized',
        bestTime: 'May-October'
      }
    };
  };
  
  // Helper function to determine activity type
  const getActivityType = (activity: string): 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport' => {
    const lowerActivity = activity.toLowerCase();
    
    if (lowerActivity.includes('beach') || lowerActivity.includes('swim')) {
      return 'beach';
    } else if (lowerActivity.includes('eat') || lowerActivity.includes('dine') || lowerActivity.includes('food') || 
               lowerActivity.includes('restaurant') || lowerActivity.includes('taverna')) {
      return 'dining';
    } else if (lowerActivity.includes('visit') || lowerActivity.includes('museum') || lowerActivity.includes('church') || 
               lowerActivity.includes('site') || lowerActivity.includes('monument')) {
      return 'sightseeing';
    } else if (lowerActivity.includes('ferry') || lowerActivity.includes('boat') || lowerActivity.includes('transfer')) {
      return 'transport';
    } else {
      return 'activity';
    }
  };

  // Handle prompt click
  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  // Handle message feedback
  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type
    }));
    
    toast({
      title: type === 'like' ? 'Thanks for the feedback!' : 'We\'ll improve based on your feedback',
      description: 'Your feedback helps us create better Greek island experiences.',
      variant: 'default',
    });
  };

  // Handle save trip
  const handleSaveTrip = () => {
    if (!generatedTrip || !user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save your Greek island adventure',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      if (!user.uid) {
        toast({
          title: 'Error',
          description: 'User ID not available. Please try signing in again.',
          variant: 'destructive'
        });
        return;
      }
      
      const newTrip = {
        name: `Greek Islands: ${generatedTrip.islands.map(i => i.name).join(', ')}`,
        description: `AI-generated Cyclades adventure for ${generatedTrip.islands.length} islands`,
        userId: user.uid,
        createdAt: new Date(),
        islands: generatedTrip.islands,
        itinerary: generatedTrip.itinerary,
        duration: parseInt(generatedTrip.metadata?.duration || '7'),
        month: 'June' as any,
        vibes: ['scenic', 'authentic'] as any[],
        pace: 'moderate' as const,
        aiSuggestions: 'Generated by Touristas AI'
      };
      
      tripStore.addTrip(newTrip);
      
      toast({
        title: 'Trip saved! 🎉',
        description: 'Your Greek island adventure has been saved to your profile',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error saving trip:', error);
      toast({
        title: 'Error saving trip',
        description: 'Please try again in a moment',
        variant: 'destructive'
      });
    }
  };

  // Enhanced Trip Visualization Component
  const EnhancedTripVisualization = ({ tripPlan }: { tripPlan: TripPlan }) => {
    const [activeDay, setActiveDay] = useState(1);
    const [showFullItinerary, setShowFullItinerary] = useState(false);
    
    const currentDay = tripPlan.itinerary.find(day => day.day === activeDay) || tripPlan.itinerary[0];
    
    const getActivityIcon = (type: string) => {
      switch (type) {
        case 'sightseeing': return <Camera className="h-4 w-4 text-purple-600" />;
        case 'dining': return <Utensils className="h-4 w-4 text-orange-600" />;
        case 'beach': return <Umbrella className="h-4 w-4 text-blue-600" />;
        case 'transport': return <Ship className="h-4 w-4 text-gray-600" />;
        default: return <MapPin className="h-4 w-4 text-green-600" />;
      }
    };
    
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Your Greek Island Adventure</h3>
              <p className="text-blue-100 mt-1">
                {tripPlan.islands.map(i => i.name).join(' → ')} • {tripPlan.metadata?.duration}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveTrip}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Save Trip"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGeneratedTrip(null)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Islands Overview */}
        <div className="p-6 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-4">Your Islands</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tripPlan.islands.map((island, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div 
                  className="w-full h-24 rounded-lg bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url(${island.image || '/images/islands/default.jpg'})` }}
                />
                <h5 className="font-medium text-gray-900">{island.name}</h5>
                <p className="text-sm text-gray-600 line-clamp-2">{island.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Day Navigation */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto">
            {tripPlan.itinerary.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeDay === day.day 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Day Details */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Day {currentDay.day}: {currentDay.title}
            </h3>
            <p className="text-gray-600">{currentDay.description}</p>
          </div>

          {/* Activities Timeline */}
          <div className="space-y-4">
            {currentDay.activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                    <span className="text-xs text-gray-500">{activity.duration}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  {activity.price && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {activity.price}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Booking Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Book Your Adventure</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link 
              to="/ferry-tickets" 
              className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <Ship className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Ferries</span>
            </Link>
            <Link 
              to="/hotels" 
              className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
            >
              <Hotel className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Hotels</span>
            </Link>
            <Link 
              to="/activities" 
              className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              <MapIcon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Activities</span>
            </Link>
            <Link 
              to="/flights" 
              className="flex flex-col items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors"
            >
              <Plane className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Flights</span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Handle input resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Tabs */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-4 text-sm font-medium transition-colors relative ${
              activeTab === 'chat' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="h-4 w-4 mr-2 inline" />
            Chat with AI
          </button>
          {generatedTrip && (
            <button
              onClick={() => setActiveTab('trip')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'trip' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="h-4 w-4 mr-2 inline" />
              Your Trip
              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-400"></span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-6 py-4 text-sm font-medium transition-colors relative ${
              activeTab === 'explore' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe className="h-4 w-4 mr-2 inline" />
            Explore
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-md' 
                        : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-lg border border-gray-100'
                    } p-4`}>
                      {message.typing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          <span className="text-sm text-gray-500 ml-2">Touristas AI is thinking...</span>
                        </div>
                      ) : (
                        <>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          {message.role === 'assistant' && (
                            <div className="flex justify-end mt-3 space-x-2">
                              <button
                                onClick={() => handleFeedback(message.id, 'like')}
                                className={`p-1.5 rounded-full transition-colors ${
                                  feedback[message.id] === 'like' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, 'dislike')}
                                className={`p-1.5 rounded-full transition-colors ${
                                  feedback[message.id] === 'dislike' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Quick Prompts */}
              {showQuickPrompts && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
                >
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handlePromptClick(prompt.prompt)}
                      className={`p-4 rounded-xl bg-gradient-to-r ${prompt.gradient} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
                    >
                      <div className="flex items-center space-x-3">
                        {prompt.icon}
                        <div className="text-left">
                          <h4 className="font-semibold text-sm">{prompt.title}</h4>
                          <p className="text-xs opacity-90 mt-1 line-clamp-2">{prompt.prompt}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Describe your dream Greek island adventure..."
                    className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    rows={1}
                    style={{ minHeight: '48px' }}
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
                  disabled={isLoading || !inputValue.trim()}
                  className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  {isLoading ? (
                    <Sparkles className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Trip Tab */}
        {activeTab === 'trip' && generatedTrip && (
          <div className="p-6 overflow-y-auto">
            <EnhancedTripVisualization tripPlan={generatedTrip} />
          </div>
        )}

        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div className="p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Greek Islands</h2>
              
              {/* Featured Islands */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cyclades.slice(0, 6).map((island, index) => (
                  <motion.div
                    key={island.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${island.image || '/images/islands/default.jpg'})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{island.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{island.shortDescription}</p>
                      <button
                        onClick={() => handlePromptClick(`Tell me everything about ${island.name} and create a perfect itinerary`)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Plan Trip to {island.name}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
