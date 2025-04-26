import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, X, ThumbsUp, ThumbsDown, Share2, Download, Save, MapPin, Calendar, Compass, Umbrella, Utensils, Camera, Ship, Hotel, Plane, MapIcon, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
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
    }[];
  }[];
};

export default function ConversationalTripPlanner() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your personal Greece travel assistant. I can help you plan the perfect Greek island-hopping adventure. Tell me about your dream trip to Greece - when you\'re traveling, what islands you\'re interested in, what activities you enjoy, or ask me for recommendations!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<TripPlan | null>(null);
  const [feedback, setFeedback] = useState<{[key: string]: 'like' | 'dislike' | null}>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { user } = useAuthStore();
  const tripStore = useTripStore();
  
  // Function to save the trip
  const handleSaveTrip = () => {
    if (!generatedTrip || !user) {
      toast({
        title: 'Error',
        description: user ? 'No trip to save' : 'Please sign in to save trips',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      // Ensure user.uid exists before creating the trip
      if (!user.uid) {
        toast({
          title: 'Error',
          description: 'User ID not available. Please try signing in again.',
          variant: 'destructive'
        });
        return;
      }
      
      const newTrip = {
        name: `Trip to ${generatedTrip.islands.map(i => i.name).join(', ')}`,
        description: `Generated trip plan for ${generatedTrip.islands.length} islands`,
        userId: user.uid, // Now we know this is defined
        createdAt: new Date(),
        islands: generatedTrip.islands,
        itinerary: generatedTrip.itinerary,
        duration: 7, // Default values for required fields
        month: 'June' as any, // Using type assertion for simplicity
        vibes: ['scenic', 'relaxed'] as any[], // Default vibes
        pace: 'moderate' as 'relaxed' | 'moderate' | 'active',
        aiSuggestions: 'Generated from AI chat'
      };
      
      tripStore.addTrip(newTrip);
      
      toast({
        title: 'Success',
        description: 'Trip saved successfully',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error saving trip:', error);
      toast({
        title: 'Error',
        description: 'Failed to save trip',
        variant: 'destructive'
      });
    }
  };

  // Sample prompts to help users get started
  const samplePrompts = [
    "I want to visit Greece for 10 days in July with my family. We love beaches and good food.",
    "Plan a romantic 7-day trip to Santorini and Mykonos in September.",
    "I'm looking for less touristy islands with authentic experiences for a 2-week trip in June.",
    "What's the best island for hiking and nature in May?",
    "I want to island hop with a focus on history and archaeology. Any suggestions?"
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
    
    try {
      // Get conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      console.log('Sending request to AI with input:', inputValue);
      
      // Set a timeout to ensure we don't wait forever
      const timeoutPromise = new Promise<{message: string}>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out after 20 seconds'));
        }, 20000);
      });
      
      // Generate response with timeout
      const response = await Promise.race([
        generateConversationalTrip(inputValue, conversationHistory),
        timeoutPromise
      ]);
      
      console.log('Received AI response:', response);
      
      // If response contains a trip plan
      if ('tripPlan' in response && response.tripPlan) {
        setGeneratedTrip(response.tripPlan);
      } else {
        // Try to extract trip plan from the text response
        const tripPlan = extractTripPlanFromText(response.message);
        if (tripPlan) {
          setGeneratedTrip(tripPlan);
        }
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      
      // Add error message with a helpful fallback
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error while generating your trip plan. Here are some general recommendations for Greek island travel:

1. **Popular islands** like Santorini and Mykonos offer stunning views, luxury accommodations, and vibrant nightlife.
2. **More relaxed islands** like Naxos, Paros, and Milos have beautiful beaches and are more budget-friendly.
3. **Off-the-beaten-path islands** like Folegandros, Sifnos, and Amorgos offer authentic experiences.

Please try again with more specific details about your trip preferences.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Function to extract trip plan from text response
  const extractTripPlanFromText = (text: string): any => {
    // Check if the text has a day-by-day itinerary format
    const dayMatches = text.match(/Day \d+[-:]?.*?(?=Day \d+|$)/gs);
    if (!dayMatches || dayMatches.length < 2) return null;
    
    // Extract islands mentioned
    const islandNames = ['Mykonos', 'Santorini', 'Naxos', 'Paros', 'Milos', 'Folegandros', 'Sifnos', 'Amorgos', 'Ios', 'Syros', 'Tinos', 'Andros', 'Kea'];
    const mentionedIslands: {name: string, description: string, image: string}[] = [];
    
    islandNames.forEach(island => {
      if (text.includes(island)) {
        mentionedIslands.push({
          name: island,
          description: `Visit the beautiful island of ${island}`,
          image: `/images/islands/${island.toLowerCase()}.jpg`
        });
      }
    });
    
    if (mentionedIslands.length === 0) return null;
    
    // Create itinerary
    const itinerary = dayMatches.map((dayText, index) => {
      const dayNumber = index + 1;
      const dayLines = dayText.split('\n').filter(line => line.trim());
      
      // Extract title and description
      const titleMatch = dayText.match(/Day \d+[-:]?\s*(.*?)(?:\n|$)/);
      const title = titleMatch ? titleMatch[1].trim() : `Day ${dayNumber}`;
      
      // Get description (next line after title if available)
      let description = '';
      if (dayLines.length > 1) {
        description = dayLines[1].trim();
      }
      
      // Create activities
      const activities = [];
      
      // Try to extract activities from bullet points or recommended activities
      const bulletPoints = dayText.match(/[-•]\s*(.*?)(?=[-•]|\n|$)/g) || [];
      const recommendedActivities = dayText.includes('Recommended activities:') ? 
        dayText.split('Recommended activities:')[1].split('\n').filter(line => line.trim().startsWith('-')) : [];
      
      const allActivities = [...bulletPoints, ...recommendedActivities];
      
      if (allActivities.length > 0) {
        // Create activities from bullet points
        allActivities.forEach((activity, actIndex) => {
          const cleanActivity = activity.replace(/^[-•]\s*/, '').trim();
          if (cleanActivity) {
            activities.push({
              time: `${9 + actIndex}:00 AM`, // Generate sequential times
              title: cleanActivity,
              description: 'Enjoy this activity on your Greek island adventure',
              type: getActivityType(cleanActivity)
            });
          }
        });
      } else {
        // If no bullet points, try to extract activities from the text
        const activityMatches = dayText.match(/(?:visit|explore|enjoy|relax at|tour|discover|experience)\s+[^,.;]+/gi) || [];
        activityMatches.forEach((activity, actIndex) => {
          activities.push({
            time: `${9 + actIndex}:00 AM`,
            title: activity.trim(),
            description: 'Enjoy this activity on your Greek island adventure',
            type: getActivityType(activity)
          });
        });
      }
      
      // Ensure we have at least one activity
      if (activities.length === 0) {
        activities.push({
          time: '9:00 AM',
          title: 'Explore the island',
          description: 'Enjoy the beauty of the Greek islands',
          type: 'activity' as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
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
      itinerary
    };
  };
  
  // Helper function to determine activity type
  const getActivityType = (activity: string): 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport' => {
    const lowerActivity = activity.toLowerCase();
    
    if (lowerActivity.includes('beach') || lowerActivity.includes('swim') || lowerActivity.includes('relax')) {
      return 'beach';
    } else if (lowerActivity.includes('eat') || lowerActivity.includes('dine') || lowerActivity.includes('food') || 
               lowerActivity.includes('restaurant') || lowerActivity.includes('cuisine') || lowerActivity.includes('taverna')) {
      return 'dining';
    } else if (lowerActivity.includes('visit') || lowerActivity.includes('museum') || lowerActivity.includes('church') || 
               lowerActivity.includes('site') || lowerActivity.includes('monument')) {
      return 'sightseeing';
    } else if (lowerActivity.includes('ferry') || lowerActivity.includes('boat') || lowerActivity.includes('transfer') || 
               lowerActivity.includes('travel') || lowerActivity.includes('arrive')) {
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
    
    // Here you could send feedback to your backend for improving the AI
    toast({
      title: type === 'like' ? 'Thanks for the feedback!' : 'We\'ll improve based on your feedback',
      description: 'Your feedback helps us make better recommendations.',
      variant: 'default',
    });
  };

  // Handle share trip
  const handleShareTrip = () => {
    if (!generatedTrip) return;
    
    // Create a shareable URL (in a real app, this would create a unique link)
    const shareableData = encodeURIComponent(JSON.stringify(generatedTrip));
    const shareableUrl = `${window.location.origin}/shared-trip?data=${shareableData}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl);
    
    toast({
      title: 'Link copied!',
      description: 'Share this link with friends to plan together',
      variant: 'default',
    });
  };

  // Handle download trip as PDF (placeholder)
  const handleDownloadTrip = () => {
    toast({
      title: 'Download started',
      description: 'Your trip itinerary PDF is being prepared',
      variant: 'default',
    });
    
    // In a real implementation, this would generate and download a PDF
  };

  // Handle input resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  // Enhanced trip plan visualization component
  const EnhancedTripVisualization = ({ tripPlan }: { tripPlan: any }) => {
    const [activeDay, setActiveDay] = useState(1);
    const [activeIsland, setActiveIsland] = useState(0);
    const [showFullItinerary, setShowFullItinerary] = useState(false);
    
    // Find full island data from our database
    const enhancedIslands = tripPlan.islands.map((island: any) => {
      // Try to find the island in our database for additional information
      const fullIslandData = cyclades.find(i => 
        i.name?.toLowerCase() === island.name.toLowerCase()
      );
      
      return {
        ...island,
        // Merge with our database data if available
        fullData: fullIslandData || null
      };
    });
    
    // Get activities icons
    const getActivityIcon = (type: string) => {
      switch (type) {
        case 'sightseeing': return <Camera className="h-4 w-4" />;
        case 'dining': return <Utensils className="h-4 w-4" />;
        case 'beach': return <Umbrella className="h-4 w-4" />;
        case 'transport': return <Compass className="h-4 w-4" />;
        default: return <MapPin className="h-4 w-4" />;
      }
    };
    
    // Get day's island
    const getDayIsland = (day: number) => {
      // Simple algorithm to determine which island is visited on which day
      // This can be improved with more sophisticated logic if needed
      const totalDays = tripPlan.itinerary.length;
      const totalIslands = enhancedIslands.length;
      
      if (totalIslands === 1) return enhancedIslands[0];
      
      // Distribute days among islands
      const daysPerIsland = Math.floor(totalDays / totalIslands);
      const islandIndex = Math.min(Math.floor((day - 1) / daysPerIsland), totalIslands - 1);
      
      return enhancedIslands[islandIndex];
    };
    
    // Get current day data
    const currentDay = tripPlan.itinerary.find((day: any) => day.day === activeDay) || tripPlan.itinerary[0];
    const currentIsland = getDayIsland(activeDay);
    
    // Generate ferry connections between islands
    const getFerryConnections = () => {
      if (enhancedIslands.length <= 1) return null;
      
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-sm text-gray-900 mb-2">Ferry Connections</h4>
          <div className="space-y-2">
            {enhancedIslands.slice(0, -1).map((island: { name: string }, index: number) => {
              const nextIsland = enhancedIslands[index + 1];
              return (
                <div key={index} className="flex items-center text-sm">
                  <span className="font-medium">{island.name}</span>
                  <Ship className="h-3 w-3 mx-2 text-blue-600" />
                  <span className="font-medium">{nextIsland.name}</span>
                  <span className="ml-auto text-xs text-gray-500">Check schedules</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Island selector */}
        <div className="flex overflow-x-auto p-2 bg-blue-50 gap-2">
          {enhancedIslands.map((island: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveIsland(index)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeIsland === index 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-700 hover:bg-blue-100'
              }`}
            >
              {island.name}
            </button>
          ))}
        </div>
        
        {/* Selected island details */}
        <div className="p-4 border-b">
          <div className="flex items-start gap-4">
            <div 
              className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0" 
              style={{ 
                backgroundImage: `url(${enhancedIslands[activeIsland].fullData?.image || '/images/islands/default.jpg'})` 
              }}
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{enhancedIslands[activeIsland].name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {enhancedIslands[activeIsland].fullData?.shortDescription || enhancedIslands[activeIsland].description}
              </p>
              
              {/* Island highlights */}
              {enhancedIslands[activeIsland].fullData?.highlights && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {enhancedIslands[activeIsland].fullData.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {highlight}
                    </span>
                  ))}
                  {enhancedIslands[activeIsland].fullData?.highlights.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      +{enhancedIslands[activeIsland].fullData.highlights.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Day selector */}
        <div className="flex overflow-x-auto p-2 bg-gray-50 gap-2">
          {tripPlan.itinerary.map((day: any) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeDay === day.day 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
        
        {/* Day details */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Day {currentDay.day}: {currentDay.title}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{getDayIsland(activeDay).name}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{currentDay.description}</p>
          
          {/* Activities timeline */}
          <div className="space-y-3">
            {currentDay.activities.map((activity: any, idx: number) => (
              <div key={idx} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-blue-600">{activity.time}</span>
                    <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-xs text-gray-500">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommendations based on our data */}
        {currentIsland.fullData && (
          <div className="p-4 bg-gray-50 border-t">
            <h4 className="font-medium text-sm text-gray-900 mb-2">Our Recommendations</h4>
            
            {/* Activities */}
            {currentIsland.fullData.activities && (
              <div className="mb-3">
                <h5 className="text-xs font-medium text-gray-700 mb-1">Popular Activities</h5>
                <div className="flex flex-wrap gap-1">
                  {currentIsland.fullData.activities.slice(0, 4).map((activity: IslandActivity, idx: number) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                      {activity.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Beaches if available */}
            {currentIsland.fullData.beaches && currentIsland.fullData.beaches.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-gray-700 mb-1">Best Beaches</h5>
                <div className="flex flex-wrap gap-1">
                  {currentIsland.fullData.beaches.slice(0, 3).map((beach: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800">
                      {beach}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Full Itinerary Toggle */}
        <div className="px-4 py-3 bg-gray-100 border-t border-gray-200">
          <button 
            onClick={() => setShowFullItinerary(!showFullItinerary)}
            className="w-full flex items-center justify-center py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
          >
            {showFullItinerary ? 'Hide Full Itinerary' : 'Show Full Itinerary'}
          </button>
        </div>
        
        {/* Full Itinerary Section */}
        {showFullItinerary && (
          <div className="p-4 bg-white border-t border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Complete Trip Itinerary</h3>
            
            <div className="space-y-6">
              {tripPlan.itinerary.map((day: any) => {
                const dayIsland = getDayIsland(day.day);
                return (
                  <div key={day.day} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Day {day.day}: {day.title}</h4>
                      <span className="text-sm text-blue-600">{dayIsland.name}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{day.description}</p>
                    
                    <div className="space-y-3">
                      {day.activities.map((activity: any, idx: number) => (
                        <div key={idx} className="flex items-start bg-gray-50 p-3 rounded-md">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-blue-600">{activity.time}</span>
                            </div>
                            <h5 className="text-sm font-medium text-gray-900">{activity.title}</h5>
                            <p className="text-xs text-gray-500">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Ferry connections section */}
            {getFerryConnections()}
          </div>
        )}
        
        {/* Quick Access Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="font-medium text-sm text-gray-900 mb-3">Plan Your Trip</h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link 
              to="/ferry-tickets" 
              className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
            >
              <Ship className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Ferries</span>
            </Link>
            
            <Link 
              to="/flights" 
              className="flex flex-col items-center justify-center p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
            >
              <Plane className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Flights</span>
            </Link>
            
            <Link 
              to="/activities" 
              className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors"
            >
              <MapIcon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Activities</span>
            </Link>
            
            <Link 
              to="/hotels" 
              className="flex flex-col items-center justify-center p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-md transition-colors"
            >
              <Hotel className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Hotels</span>
            </Link>
          </div>
          
          {/* Island specific links */}
          {currentIsland.fullData && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Explore {currentIsland.name}</h5>
              
              <div className="flex flex-wrap gap-2">
                <Link 
                  to={`/islands/${currentIsland.fullData.slug || currentIsland.name.toLowerCase()}`}
                  className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Island Guide
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                
                <Link 
                  to={`/guides/${currentIsland.fullData.slug || currentIsland.name.toLowerCase()}`}
                  className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Travel Tips
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[800px] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-white bg-opacity-20">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-xs opacity-75">
                    {message.role === 'user' ? 'You' : 'Greece AI Assistant'}
                  </div>
                  <div className="text-xs ml-auto opacity-50">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {/* Feedback buttons (only for assistant messages) */}
                {message.role === 'assistant' && (
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={() => handleFeedback(message.id, 'like')}
                      className={`p-1 rounded-full ${
                        feedback[message.id] === 'like' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, 'dislike')}
                      className={`p-1 rounded-full ${
                        feedback[message.id] === 'dislike' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        {/* Anchor for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Generated trip plan (if available) */}
      {generatedTrip && (
        <div className="border-t border-gray-200 p-4 bg-blue-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-blue-800">Your Personalized Trip Plan</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveTrip}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Save Trip"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareTrip}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Share Trip"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadTrip}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGeneratedTrip(null)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Enhanced trip visualization */}
          <EnhancedTripVisualization tripPlan={generatedTrip} />
          
          {/* Quick Access Buttons (Standalone) */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-sm text-gray-900 mb-3">Plan Your Trip</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link 
                to="/ferry-tickets" 
                className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
              >
                <Ship className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Ferries</span>
              </Link>
              
              <Link 
                to="/flights" 
                className="flex flex-col items-center justify-center p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
              >
                <Plane className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Flights</span>
              </Link>
              
              <Link 
                to="/activities" 
                className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors"
              >
                <MapIcon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Activities</span>
              </Link>
              
              <Link 
                to="/hotels" 
                className="flex flex-col items-center justify-center p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-md transition-colors"
              >
                <Hotel className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Hotels</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Sample prompts */}
      {messages.length < 3 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Try asking:</div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors"
              >
                {prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask me anything about planning your Greek island trip..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[56px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-3 bottom-3 text-blue-500 hover:text-blue-700 disabled:text-gray-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
