import { useState } from 'react';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { MessageSquare, ListChecks } from 'lucide-react';
import SEO from '../components/SEO';
import ConversationalTripPlanner from '../components/ConversationalTripPlanner';
import TripPlanner from './TripPlanner';

export default function EnhancedTripPlanner() {
  const [activeTab, setActiveTab] = useState<string>('conversational');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      <SEO 
        title="Touristas AI: Smart Greek Island Trip Planner"
        description="Plan your dream Cyclades adventure with Touristas AI. Get custom itineraries for Greek islands based on your travel style, dates, budget, and interests."
        keywords={["Greek islands trip planner", "Cyclades itinerary", "AI travel planner", "Greece island hopping", "personalized travel itinerary", "Greek islands vacation"]}
        ogImage="https://discovercyclades.gr/images/trip-planner-og.jpg"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl tracking-wide px-4 py-2">
              Touristas AI Planner
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">Beta v2.34.32</span>
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Tell us your preferences, and we'll craft your ideal Greek island hopping experience
          </p>
        </div>

        {/* Tabs for switching between conversational and form-based planners */}
        <div className="mb-12">
          <Tabs defaultValue="conversational" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <div className="flex gap-4 w-full max-w-2xl">
                <button
                  onClick={() => setActiveTab('conversational')}
                  className={`flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg flex-1 transition-all duration-200 ${
                    activeTab === 'conversational' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-100 border border-blue-100'
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Chat with Touristas AI Planner</span>
                </button>
                <button
                  onClick={() => setActiveTab('guided')}
                  className={`flex items-center justify-center gap-3 py-3.5 px-6 rounded-lg flex-1 transition-all duration-200 ${
                    activeTab === 'guided' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-100 border border-blue-100'
                  }`}
                >
                  <ListChecks className="h-5 w-5" />
                  <span className="font-medium">Step-by-Step Touristas AI Planner</span>
                </button>
              </div>
            </div>
            
            <TabsContent value="conversational" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat with Touristas AI Planner</h2>
                  <p className="text-gray-600 mb-6">
                    Have a natural conversation with Touristas AI Planner to plan your perfect Greek island trip. 
                    Ask questions, get recommendations, and receive a personalized itinerary.
                  </p>
                  
                  <div className="h-[600px] border border-gray-200 rounded-xl overflow-hidden">
                    <ConversationalTripPlanner />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="guided" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Touristas AI Planner</h2>
                  <p className="text-gray-600 mb-6">
                    Follow our guided process to create your ideal Greek island itinerary. 
                    Select your preferences, travel dates, and interests to get personalized recommendations.
                  </p>
                </div>
                
                {/* Embed the original TripPlanner component */}
                <TripPlanner embeddedMode={true} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use Touristas AI Planner</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Itineraries</h3>
              <p className="text-gray-600">
                Get custom recommendations based on your travel style, preferences, and interests. 
                Our Touristas AI Planner understands what makes each Greek island unique.
              </p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Our Touristas AI Planner is trained on extensive knowledge of the Greek islands, including hidden gems, 
                seasonal considerations, and practical travel logistics.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time & Stress</h3>
              <p className="text-gray-600">
                Skip hours of research and planning. Our Touristas AI Planner instantly creates comprehensive itineraries 
                with day-by-day activities, dining recommendations, and travel tips.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {tripPlannerFAQs.map((faq, index) => (
              <TripPlannerFAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* SEO Text Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Discover the Greek Islands with Touristas AI Planner</h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Planning a trip to the Greek Islands can be overwhelming with so many beautiful destinations to choose from. 
              Our Touristas AI Planner takes the stress out of planning by creating a personalized itinerary tailored to your preferences.
            </p>
            
            <p>
              The Cyclades, with their iconic white-washed buildings and crystal-clear waters, offer something for every type of traveler. 
              Whether you're seeking romantic sunsets in Santorini, vibrant nightlife in Mykonos, family-friendly beaches in Naxos, 
              or off-the-beaten-path adventures in Folegandros, our Touristas AI Planner will help you create the perfect island-hopping experience.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">How Our Touristas AI Planner Works</h3>
            <p>
              Our Touristas AI Planner offers two ways to create your perfect Greek island itinerary:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Chat with Touristas AI Planner:</strong> Have a natural conversation with our AI assistant. Ask questions, get recommendations, and refine your trip plan through dialogue.</li>
              <li><strong>Step-by-Step Guide:</strong> Follow our structured form to input your preferences, travel dates, and interests for a tailored itinerary.</li>
            </ul>
            
            <p>
              Both methods leverage our advanced AI to analyze your preferences and recommend the best islands to visit, 
              how many days to spend on each island, and suggest activities that match your interests.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Why Use Our Touristas AI Planner</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personalized Recommendations:</strong> Get suggestions based on your unique preferences and travel style.</li>
              <li><strong>Local Expertise:</strong> Our recommendations are based on extensive local knowledge of the Greek Islands.</li>
              <li><strong>Time-Saving:</strong> Create a comprehensive itinerary in minutes instead of hours of research.</li>
              <li><strong>Flexible Planning:</strong> Generate multiple itineraries to compare and find your perfect trip.</li>
              <li><strong>Free to Use:</strong> Our basic trip planning tool is completely free to use.</li>
            </ul>
            
            <p className="mt-4">
              Start planning your dream Greek Islands vacation today with Touristas AI Planner and discover the magic of the Cyclades!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component
function TripPlannerFAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

// FAQ Data
const tripPlannerFAQs = [
  {
    question: "How does Touristas AI Planner work?",
    answer: "Our Touristas AI Planner uses advanced natural language processing to understand your travel preferences and create personalized itineraries. You can either chat conversationally with our AI assistant or use our guided form to input your preferences. The AI analyzes factors like your travel dates, interests, and pace to recommend the perfect Greek islands and activities for your trip."
  },
  {
    question: "Which is better - the chat interface or the step-by-step planner?",
    answer: "Both planning methods offer unique advantages. The chat interface is more flexible and allows for natural conversation and follow-up questions. It's great if you have specific questions or want to refine your itinerary through dialogue. The step-by-step planner provides a more structured approach with visual selection of preferences, which some users find easier to navigate. We recommend trying both to see which you prefer!"
  },
  {
    question: "Is Touristas AI Planner free to use?",
    answer: "Yes! Our Touristas AI Planner is completely free to use. You can generate as many itineraries as you like without any cost. If you want to save your itineraries for future reference, you'll need to create a free account."
  },
  {
    question: "How accurate are the recommendations?",
    answer: "Our recommendations are based on extensive local knowledge of the Greek Islands and are regularly updated with the latest information. The AI considers factors like seasonal weather, ferry connections, and island characteristics to provide accurate and practical suggestions. However, we always recommend verifying specific details like ferry schedules and opening hours before finalizing your plans."
  },
  {
    question: "Can I modify the generated itinerary?",
    answer: "Yes! With our conversational interface, you can ask the AI to modify specific aspects of your itinerary. For example, you can say 'I'd like more beach time in Naxos' or 'Can you suggest alternatives to Mykonos?' The AI will adjust your plan accordingly. You can also generate multiple variations by adjusting your preferences and comparing the results."
  },
  {
    question: "Can I share my itinerary with friends and family?",
    answer: "Yes, you can share your generated itinerary by clicking the share button. This creates a link that you can send to friends and family so they can view your trip plan. If you're planning a group trip, we recommend creating an account so everyone can collaborate on the itinerary."
  },
  {
    question: "How far in advance should I plan my Greek Islands trip?",
    answer: "For the best experience, we recommend planning your Greek Islands trip at least 3-6 months in advance, especially if you're traveling during the high season (June-September). This gives you enough time to book accommodations and ferry tickets at the best rates."
  }
];
