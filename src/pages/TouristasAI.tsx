import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, MapPin, Users, Ship, Camera, Utensils, Star, 
  ArrowRight, MessageCircle, Mic, Zap, Globe, Brain, Compass,
  Heart, Coffee, Sun, Waves, Wind, Anchor, Play, Pause, RefreshCw,
  ChevronLeft, ChevronRight, X, Check, Plus, Wand2, Flame, Crown,
  CheckCircle, Shield, Award, Target, Route, Navigation
} from 'lucide-react';
import { generateConversationalTrip } from '../utils/ai';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default markers issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom island marker icons
const createIslandIcon = (color: string, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: ${color};
        border: ${isSelected ? '4px solid #1E2E48' : '3px solid white'};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        color: white;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        🏝️
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

// Professional Touristas AI SaaS Landing Page
export default function TouristasAI() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <LandingPage onStartChat={() => setCurrentView('chat')} />
        )}
        {currentView === 'chat' && (
          <ChatExperience 
            messages={messages}
            setMessages={setMessages}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            userInput={userInput}
            setUserInput={setUserInput}
            onGoBack={() => setCurrentView('landing')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Professional SaaS Landing Page
function LandingPage({ onStartChat }: { onStartChat: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-[#E3D7C3]/20"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#1E2E48] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E3D7C3] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <img 
                src="/touristas-ai-logo.svg" 
                alt="Touristas AI" 
                className="h-20 w-auto mx-auto drop-shadow-sm"
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1E2E48] mb-4 tracking-tight"
            >
              Meet Touristas AI
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E2E48]/80 mb-6"
            >
              Your Greek Islands AI Travel Expert
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              The world's most intelligent AI travel planner, exclusively trained on the Greek Cyclades. 
              Get personalized itineraries, real-time bookings, and insider secrets in seconds.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#1E2E48]" />
                <span>25+ Islands Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#1E2E48]" />
                <span>Instant AI Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#1E2E48]" />
                <span>Real-Time Booking</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-16"
            >
              <button
                onClick={onStartChat}
                className="bg-[#1E2E48] hover:bg-[#1E2E48]/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
              >
                <MessageCircle className="h-6 w-6" />
                Start Planning Your Adventure
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-sm text-gray-500 mt-4">Free to start • No signup required • Instant results</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E2E48] mb-4">
              Why Touristas AI is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built exclusively for the Greek Cyclades with deep local knowledge and real-time intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI Island Expert",
                description: "Trained on 25+ Cyclades islands with comprehensive local knowledge and authentic recommendations"
              },
              {
                icon: <Route className="h-8 w-8" />,
                title: "Smart Route Planning",
                description: "Optimizes ferry connections, transportation, and timing for the perfect island-hopping experience"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Real-Time Bookings",
                description: "Live ferry schedules, hotel availability, and restaurant reservations all in one conversation"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Insider Access",
                description: "Exclusive experiences, hidden gems, and local secrets that guidebooks miss"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#E3D7C3]/30 rounded-lg flex items-center justify-center mb-6 text-[#1E2E48]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E2E48] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E2E48] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to your perfect Greek island adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Tell Us Your Dreams",
                description: "Describe your ideal Greek island vacation - budget, duration, interests, and travel style",
                icon: <MessageCircle className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "AI Creates Magic",
                description: "Our specialized AI analyzes your preferences and creates a personalized itinerary in seconds",
                icon: <Sparkles className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Book & Explore",
                description: "Get real-time bookings for ferries, hotels, and activities - then enjoy your perfect trip",
                icon: <CheckCircle className="h-8 w-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 * index, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#1E2E48] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-[#E3D7C3]/30 rounded-lg flex items-center justify-center mx-auto mb-6 text-[#1E2E48]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E2E48] mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1E2E48]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Plan Your Perfect Greek Adventure?
          </h2>
          <p className="text-xl text-[#E3D7C3] mb-8 leading-relaxed">
            Join thousands of travelers who have discovered their dream Greek island experience with Touristas AI
          </p>
          <button
            onClick={onStartChat}
            className="bg-[#E3D7C3] hover:bg-[#E3D7C3]/90 text-[#1E2E48] px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3 mx-auto"
          >
            <MessageCircle className="h-6 w-6" />
            Start Your Journey Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

// Professional Chat Experience
function ChatExperience({ 
  messages, 
  setMessages, 
  isTyping, 
  setIsTyping,
  userInput,
  setUserInput,
  onGoBack 
}: any) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'map' | 'itinerary'>('chat');
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);
  const [currentItinerary, setCurrentItinerary] = useState<any[]>([]);
  const [tripDuration, setTripDuration] = useState(7);
  const [budget, setBudget] = useState(2000);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatStartRef = useRef<HTMLDivElement>(null);

  const greekIslands = [
    {
      id: 'santorini',
      name: 'Santorini',
      position: { x: 60, y: 80 },
      coordinates: { lat: 36.3932, lng: 25.4615 },
      color: '#FF6B6B',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop',
      highlights: ['Oia Sunset', 'Red Beach', 'Wine Tasting'],
      avgCost: 150,
      description: 'Iconic sunsets and volcanic landscapes'
    },
    {
      id: 'mykonos',
      name: 'Mykonos',
      position: { x: 45, y: 60 },
      coordinates: { lat: 37.4467, lng: 25.3289 },
      color: '#4ECDC4',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&h=200&fit=crop',
      highlights: ['Paradise Beach', 'Windmills', 'Nightlife'],
      avgCost: 130,
      description: 'Vibrant nightlife and pristine beaches'
    },
    {
      id: 'naxos',
      name: 'Naxos',
      position: { x: 40, y: 70 },
      coordinates: { lat: 37.1036, lng: 25.3766 },
      color: '#45B7D1',
      image: 'https://images.unsplash.com/photo-1571406252871-360b4f5fbbcc?w=300&h=200&fit=crop',
      highlights: ['Portara', 'Plaka Beach', 'Mount Zas'],
      avgCost: 90,
      description: 'Authentic culture and stunning nature'
    },
    {
      id: 'paros',
      name: 'Paros',
      position: { x: 35, y: 65 },
      coordinates: { lat: 37.0853, lng: 25.1477 },
      color: '#96CEB4',
      image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=300&h=200&fit=crop',
      highlights: ['Parikia', 'Naoussa', 'Golden Beach'],
      avgCost: 85,
      description: 'Charming fishing villages and golden beaches'
    },
    {
      id: 'milos',
      name: 'Milos',
      position: { x: 25, y: 85 },
      coordinates: { lat: 36.7215, lng: 24.4258 },
      color: '#FFEAA7',
      image: 'https://images.unsplash.com/photo-1599846223972-c7d4ab7ed7c6?w=300&h=200&fit=crop',
      highlights: ['Sarakiniko', 'Kleftiko', 'Hot Springs'],
      avgCost: 80,
      description: 'Unique geological formations and secluded beaches'
    },
    {
      id: 'sifnos',
      name: 'Sifnos',
      position: { x: 30, y: 75 },
      coordinates: { lat: 36.9750, lng: 24.6833 },
      color: '#DDA0DD',
      image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=300&h=200&fit=crop',
      highlights: ['Apollonia', 'Kastro', 'Pottery Workshops'],
      avgCost: 75,
      description: 'Culinary traditions and peaceful atmosphere'
    }
  ];

  useEffect(() => {
    if (activeTab === 'chat') {
      chatStartRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages((prev: any) => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);
    setShowWelcome(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = await generateConversationalTrip(userInput);
      
      // Generate interactive itinerary based on AI response
      if (userInput.toLowerCase().includes('plan') || userInput.toLowerCase().includes('itinerary')) {
        generateSampleItinerary();
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        hasInteractiveContent: true,
        messageType: 'detailed'
      };

      setMessages((prev: any) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting to my island knowledge base. Please try again!",
        timestamp: new Date(),
        messageType: 'error'
      };
      setMessages((prev: any) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateSampleItinerary = () => {
    const sampleItinerary = [
      {
        day: 1,
        island: 'santorini',
        title: 'Arrival in Santorini',
        activities: ['Check into hotel in Oia', 'Sunset dinner at Ambrosia', 'Evening stroll in Oia'],
        accommodation: 'Andronis Luxury Suites',
        cost: 250,
        images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop'],
        ferryInfo: { time: '14:30', duration: '2h 15min', price: 45 }
      },
      {
        day: 2,
        island: 'santorini',
        title: 'Santorini Exploration',
        activities: ['Wine tasting tour', 'Visit Red Beach', 'Fira town exploration'],
        accommodation: 'Andronis Luxury Suites',
        cost: 180,
        images: ['https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop']
      },
      {
        day: 3,
        island: 'mykonos',
        title: 'Ferry to Mykonos',
        activities: ['Morning ferry to Mykonos', 'Little Venice exploration', 'Beach time at Paradise Beach'],
        accommodation: 'Belvedere Hotel',
        cost: 200,
        images: ['https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&h=300&fit=crop'],
        ferryInfo: { time: '09:00', duration: '1h 45min', price: 35 }
      }
    ];
    setCurrentItinerary(sampleItinerary);
  };

  const toggleIslandSelection = (islandId: string) => {
    setSelectedIslands(prev => 
      prev.includes(islandId) 
        ? prev.filter(id => id !== islandId)
        : [...prev, islandId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex bg-gray-50"
    >
      {/* Left Sidebar Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onGoBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#1E2E48]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <img 
              src="/touristas-ai-logo.svg" 
              alt="Touristas AI" 
              className="h-8 w-auto"
            />
            <div>
              <h2 className="font-semibold text-[#1E2E48] text-sm">Touristas AI</h2>
              <p className="text-xs text-gray-600">Greek Islands Expert</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4">
          <div className="space-y-2">
            {[
              { id: 'chat', label: 'AI Chat', icon: MessageCircle, desc: 'Talk with your AI expert' },
              { id: 'map', label: 'Islands Map', icon: MapPin, desc: 'Explore Greek islands visually' },
              { id: 'itinerary', label: 'Trip Planner', icon: Route, desc: 'Build your perfect itinerary' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#1E2E48] text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs mt-1 ${
                      activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {tab.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Islands Summary */}
        {selectedIslands.length > 0 && (
          <div className="p-4 border-t border-gray-200 mt-auto">
            <h4 className="font-semibold text-[#1E2E48] mb-3 text-sm">Selected Islands</h4>
            <div className="space-y-2">
              {selectedIslands.map((islandId: string) => {
                const island = greekIslands.find((i: any) => i.id === islandId);
                return (
                  <div
                    key={islandId}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: island?.color }}
                    ></div>
                    <span className="text-sm font-medium flex-1">{island?.name}</span>
                    <button
                      onClick={() => toggleIslandSelection(islandId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Online Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI Expert Online</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat View */}
        {activeTab === 'chat' && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto">
              <div ref={chatStartRef} className="h-8 sm:h-12 md:h-16" />
              <div className="px-3 sm:px-4 pb-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  {/* Welcome Message */}
                  {showWelcome && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mt-8 md:mt-12"
                    >
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1E2E48] mb-2 sm:mb-3">
                          Γεια σας! Welcome to Touristas AI! 🇬🇷
                        </h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 max-w-xl mx-auto text-sm leading-relaxed px-2">
                          I'm your personal Greek islands AI expert. I'll help you create the perfect Cyclades adventure with interactive maps, visual itineraries, and real-time insights!
                        </p>
                        
                        {/* Quick Start Prompts */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto">
                          {[
                            "Plan a 7-day romantic trip to Santorini & Mykonos",
                            "Create a family adventure across 3 islands", 
                            "Design a luxury yacht hopping experience",
                            "Find the best budget islands for 2 weeks"
                          ].map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => setUserInput(prompt)}
                              className="text-left p-3 sm:p-4 bg-gradient-to-r from-[#E3D7C3]/20 to-[#E3D7C3]/10 hover:from-[#E3D7C3]/30 hover:to-[#E3D7C3]/20 rounded-lg border border-[#E3D7C3]/50 transition-all duration-200 text-xs sm:text-sm hover:shadow-sm"
                            >
                              <span className="text-[#1E2E48] font-medium leading-snug">{prompt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Beautiful Chat Messages */}
                  {messages.map((message: any) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'user' ? (
                        <div className="max-w-xl bg-[#1E2E48] text-white px-4 py-3 rounded-xl shadow-sm">
                          <p className="leading-relaxed text-sm">{message.content}</p>
                          <div className="text-xs text-white/70 mt-2">
                            {message.timestamp?.toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                          {/* AI Avatar */}
                          <div className="flex items-start gap-3 p-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-full flex items-center justify-center flex-shrink-0">
                              <Brain className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-[#1E2E48] text-sm">Touristas AI</h4>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Expert Response
                                </span>
                              </div>
                              
                              {/* Enhanced Message Content */}
                              <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-3 text-sm">{message.content}</p>
                                
                                {/* Interactive Actions */}
                                {message.hasInteractiveContent && (
                                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                                    <button
                                      onClick={() => setActiveTab('map')}
                                      className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
                                    >
                                      <MapPin className="h-3 w-3" />
                                      View on Map
                                    </button>
                                    <button
                                      onClick={() => setActiveTab('itinerary')}
                                      className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-1.5 rounded-lg transition-colors text-xs font-medium"
                                    >
                                      <Route className="h-3 w-3" />
                                      See Itinerary
                                    </button>
                                    <button className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-1.5 rounded-lg transition-colors text-xs font-medium">
                                      <Star className="h-3 w-3" />
                                      Save Trip
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-xs text-gray-500 mt-2">
                                {message.timestamp?.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-full flex items-center justify-center">
                          <Brain className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-[#1E2E48] rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-[#1E2E48] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1.5 h-1.5 bg-[#1E2E48] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-gray-600 text-xs">Creating your perfect itinerary...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Tell me about your dream Greek island adventure..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-[#1E2E48] focus:outline-none resize-none text-sm"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isTyping}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
                      userInput.trim() && !isTyping
                        ? "bg-[#1E2E48] hover:bg-[#1E2E48]/90 text-white shadow-md hover:shadow-lg transform hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isTyping ? (
                      <Sparkles className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Interactive Islands Map */}
        {activeTab === 'map' && (
          <InteractiveMap 
            islands={greekIslands}
            selectedIslands={selectedIslands}
            onToggleIsland={toggleIslandSelection}
          />
        )}

        {/* Visual Itinerary Builder */}
        {activeTab === 'itinerary' && (
          <ItineraryBuilder 
            itinerary={currentItinerary}
            setItinerary={setCurrentItinerary}
            islands={greekIslands}
            tripDuration={tripDuration}
            setTripDuration={setTripDuration}
          />
        )}
      </div>
    </motion.div>
  );
}

// Interactive Islands Map Component with Real Leaflet Map
function InteractiveMap({ islands, selectedIslands, onToggleIsland }: any) {
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [mapView, setMapView] = useState<'visual' | 'satellite'>('visual');

  // Center map on Cyclades islands
  const mapCenter = { lat: 37.0, lng: 25.0 };
  const mapZoom = 8;

  // Ferry routes for the polylines
  const ferryRoutes = [
    // Mykonos to Santorini
    { positions: [[37.4467, 25.3289], [36.3932, 25.4615]], color: '#1E2E48' },
    // Naxos to Paros
    { positions: [[37.1036, 25.3766], [37.0853, 25.1477]], color: '#1E2E48' },
    // Paros to Sifnos (curved route)
    { positions: [[37.0853, 25.1477], [36.9750, 24.6833]], color: '#1E2E48' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Map Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1E2E48]">Greek Cyclades Islands Map</h3>
            <p className="text-gray-600">Click islands to add them to your trip • Real OpenStreetMap data</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMapView('visual')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mapView === 'visual' ? 'bg-[#1E2E48] text-white' : 'text-gray-600'
                }`}
              >
                Street
              </button>
              <button
                onClick={() => setMapView('satellite')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  mapView === 'satellite' ? 'bg-[#1E2E48] text-white' : 'text-gray-600'
                }`}
              >
                Satellite
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="rounded"
              />
              Ferry Routes
            </label>
            <div className="text-sm text-gray-600 bg-[#E3D7C3]/20 px-3 py-1 rounded-full">
              {selectedIslands.length} selected
            </div>
          </div>
        </div>
      </div>

      {/* Real Leaflet Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          {/* Map Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapView === 'satellite' 
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />

          {/* Ferry Routes */}
          {showRoutes && ferryRoutes.map((route, index) => (
            <Polyline
              key={index}
              positions={route.positions as [number, number][]}
              color={route.color}
              weight={3}
              opacity={0.7}
              dashArray="10, 10"
            />
          ))}

          {/* Island Markers */}
          {islands.map((island: any) => (
            <Marker
              key={island.id}
              position={[island.coordinates.lat, island.coordinates.lng]}
              icon={createIslandIcon(island.color, selectedIslands.includes(island.id))}
              eventHandlers={{
                click: () => onToggleIsland(island.id),
                mouseover: () => setHoveredIsland(island.id),
                mouseout: () => setHoveredIsland(null),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-4 max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={island.image}
                      alt={island.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-[#1E2E48] text-lg">{island.name}</h4>
                      <p className="text-sm text-gray-600">{island.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Average daily cost:</span>
                      <span className="font-semibold text-[#1E2E48]">€{island.avgCost}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Coordinates:</span>
                      <span className="font-mono text-xs text-gray-500">
                        {island.coordinates.lat.toFixed(3)}°, {island.coordinates.lng.toFixed(3)}°
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Must-see highlights:</h5>
                    <div className="flex flex-wrap gap-1">
                      {island.highlights.map((highlight: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#E3D7C3]/30 text-[#1E2E48] px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleIsland(island.id)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      selectedIslands.includes(island.id)
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#1E2E48] hover:bg-[#1E2E48]/90 text-white'
                    }`}
                  >
                    {selectedIslands.includes(island.id) ? 'Remove from Trip' : 'Add to Trip'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 space-y-3 z-[1000]">
          <button className="block w-12 h-12 bg-[#1E2E48] text-white rounded-full hover:bg-[#1E2E48]/90 transition-colors shadow-lg flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </button>
          <button className="block w-12 h-12 bg-white text-[#1E2E48] rounded-full hover:bg-gray-50 transition-colors shadow-lg border border-gray-200 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="block w-12 h-12 bg-white text-[#1E2E48] rounded-full hover:bg-gray-50 transition-colors shadow-lg border border-gray-200 flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Map Legend */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 z-[1000]">
          <h4 className="font-semibold text-[#1E2E48] mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Map Legend
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow"></div>
              <span>Available Islands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-[#1E2E48] rounded-full border-2 border-white shadow"></div>
              <span>Selected Islands</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-1 border-t-2 border-dashed border-[#1E2E48] opacity-70"></div>
              <span>Ferry Routes</span>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <Globe className="w-4 h-4 text-[#1E2E48]" />
              <span className="text-xs">Real GPS coordinates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Islands Summary */}
      {selectedIslands.length > 0 && (
        <div className="p-6 border-t border-gray-200 bg-white">
          <h4 className="font-semibold text-[#1E2E48] mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Selected Islands ({selectedIslands.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedIslands.map((islandId: string) => {
              const island = islands.find((i: any) => i.id === islandId);
              return (
                <div
                  key={islandId}
                  className="flex items-center gap-3 bg-gradient-to-r from-[#E3D7C3]/20 to-[#E3D7C3]/10 px-4 py-3 rounded-xl border border-[#E3D7C3]/30"
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white shadow"
                    style={{ backgroundColor: island?.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="font-medium text-[#1E2E48]">{island?.name}</div>
                    <div className="text-xs text-gray-600">€{island?.avgCost}/day</div>
                  </div>
                  <button
                    onClick={() => onToggleIsland(islandId)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Visual Itinerary Builder Component
function ItineraryBuilder({ itinerary, setItinerary, islands, tripDuration, setTripDuration }: any) {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState('');

  const addActivity = (dayIndex: number) => {
    if (!newActivity.trim()) return;
    
    const updatedItinerary = [...itinerary];
    if (updatedItinerary[dayIndex]) {
      updatedItinerary[dayIndex].activities.push(newActivity);
      setItinerary(updatedItinerary);
    }
    setNewActivity('');
    setEditingDay(null);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = [...itinerary];
    if (updatedItinerary[dayIndex]) {
      updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
      setItinerary(updatedItinerary);
    }
  };

  const totalCost = itinerary.reduce((sum: number, day: any) => sum + (day.cost || 0), 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1E2E48]">Trip Itinerary Planner</h3>
            <p className="text-gray-600">Plan your perfect Greek islands adventure day by day</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Estimated Cost</div>
              <div className="text-2xl font-bold text-[#1E2E48]">€{totalCost}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Trip Duration</div>
              <div className="text-2xl font-bold text-[#1E2E48]">{itinerary.length} days</div>
            </div>
          </div>
        </div>

        {/* Trip Controls */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Duration:
            <select 
              value={tripDuration} 
              onChange={(e) => setTripDuration(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:border-[#1E2E48] focus:outline-none"
            >
              {[3, 5, 7, 10, 14].map(days => (
                <option key={days} value={days}>{days} days</option>
              ))}
            </select>
          </label>
          <button className="bg-[#1E2E48] text-white px-4 py-2 rounded-lg hover:bg-[#1E2E48]/90 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Day
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Auto-Generate
          </button>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="flex-1 overflow-y-auto p-6">
        {itinerary.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#E3D7C3]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Route className="h-8 w-8 text-[#1E2E48]" />
            </div>
            <h4 className="text-xl font-semibold text-[#1E2E48] mb-2">No Itinerary Yet</h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start planning by asking our AI to create an itinerary or manually add days to your trip
            </p>
            <button className="bg-[#1E2E48] text-white px-6 py-3 rounded-lg hover:bg-[#1E2E48]/90 transition-colors font-medium">
              Start Planning
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="space-y-8">
              {itinerary.map((day: any, index: number) => {
                const island = islands.find((i: any) => i.id === day.island);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Line */}
                    {index < itinerary.length - 1 && (
                      <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-300"></div>
                    )}

                    {/* Day Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      {/* Day Header */}
                      <div className="relative">
                        {day.images && day.images[0] && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={day.images[0]}
                              alt={day.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                        )}
                        
                        {/* Day Number Badge */}
                        <div className="absolute top-4 left-4 w-16 h-16 bg-[#1E2E48] rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">Day {day.day}</span>
                        </div>

                        {/* Island Badge */}
                        {island && (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: island.color }}
                            ></div>
                            <span className="font-semibold text-[#1E2E48] text-sm">{island.name}</span>
                          </div>
                        )}

                        {/* Ferry Info */}
                        {day.ferryInfo && (
                          <div className="absolute bottom-4 left-4 bg-[#E3D7C3]/90 backdrop-blur-sm rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Ship className="w-4 h-4 text-[#1E2E48]" />
                              <span className="font-medium text-[#1E2E48]">
                                {day.ferryInfo.time} • {day.ferryInfo.duration} • €{day.ferryInfo.price}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Day Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-[#1E2E48] mb-2">{day.title}</h4>
                            {day.accommodation && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{day.accommodation}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Daily Cost</div>
                            <div className="text-xl font-bold text-[#1E2E48]">€{day.cost}</div>
                          </div>
                        </div>

                        {/* Activities */}
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#1E2E48]" />
                            Activities & Experiences
                          </h5>
                          
                          <div className="grid gap-2">
                            {day.activities?.map((activity: string, activityIndex: number) => (
                              <div
                                key={activityIndex}
                                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 group hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-[#E3D7C3] rounded-full"></div>
                                  <span className="text-gray-700">{activity}</span>
                                </div>
                                <button
                                  onClick={() => removeActivity(index, activityIndex)}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add Activity */}
                          {editingDay === index ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newActivity}
                                onChange={(e) => setNewActivity(e.target.value)}
                                placeholder="Add new activity..."
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1E2E48] focus:outline-none text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    addActivity(index);
                                  } else if (e.key === 'Escape') {
                                    setEditingDay(null);
                                    setNewActivity('');
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => addActivity(index)}
                                className="bg-[#1E2E48] text-white px-4 py-2 rounded-lg hover:bg-[#1E2E48]/90 transition-colors text-sm"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingDay(null);
                                  setNewActivity('');
                                }}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingDay(index)}
                              className="flex items-center gap-2 text-[#1E2E48] hover:text-[#1E2E48]/80 transition-colors text-sm font-medium"
                            >
                              <Plus className="w-4 h-4" />
                              Add Activity
                            </button>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                          <button className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-2 rounded-lg transition-colors text-sm">
                            <Camera className="w-4 h-4" />
                            Photos
                          </button>
                          <button className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-2 rounded-lg transition-colors text-sm">
                            <Utensils className="w-4 h-4" />
                            Restaurants
                          </button>
                          <button className="flex items-center gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-3 py-2 rounded-lg transition-colors text-sm">
                            <Navigation className="w-4 h-4" />
                            Navigate
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary Card */}
            <div className="mt-12 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4">Trip Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{itinerary.length}</div>
                  <div className="text-sm opacity-80">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{new Set(itinerary.map((d: any) => d.island)).size}</div>
                  <div className="text-sm opacity-80">Islands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">€{totalCost}</div>
                  <div className="text-sm opacity-80">Total Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(totalCost / itinerary.length)}</div>
                  <div className="text-sm opacity-80">Per Day</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 