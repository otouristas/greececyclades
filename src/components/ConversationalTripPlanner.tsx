import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, X, ThumbsUp, ThumbsDown, Share2, Download, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';
import { generateConversationalTrip } from '../utils/ai';
import { Island } from '../types/island';
import { toast } from './ui/toast';

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
          
          <div className="bg-white rounded-lg p-3 shadow-sm max-h-60 overflow-y-auto">
            <div className="text-sm text-gray-600 mb-2">
              Islands: {generatedTrip.islands.map(i => i.name).join(', ')}
            </div>
            
            <div className="space-y-2">
              {generatedTrip.itinerary.slice(0, 2).map((day) => (
                <div key={day.day} className="border-l-2 border-blue-400 pl-3">
                  <div className="font-medium">Day {day.day}: {day.title}</div>
                  <div className="text-sm text-gray-600">{day.description}</div>
                  <div className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">
                    View all {day.activities.length} activities
                  </div>
                </div>
              ))}
              
              {generatedTrip.itinerary.length > 2 && (
                <div className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
                  View full {generatedTrip.itinerary.length}-day itinerary
                </div>
              )}
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
