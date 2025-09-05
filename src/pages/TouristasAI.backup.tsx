import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, MapPin, Users, Ship, Camera, Utensils, Star, 
  ArrowRight, MessageCircle, Mic, Zap, Globe, Brain, Compass,
  Heart, Coffee, Sun, Waves, Wind, Anchor, Play, Pause, RefreshCw,
  ChevronLeft, ChevronRight, X, Check, Plus, Wand2, Flame, Crown,
  CheckCircle, Shield, Award, Target, Route, Navigation, Satellite,
  Map as MapIcon, Minus, Car, Phone
} from 'lucide-react';
import { generateConversationalTrip } from '../utils/ai';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TaxiAutoCaller from '../components/taxi/TaxiAutoCaller';
import { RestaurantAutoCaller } from '../components/restaurants/RestaurantAutoCaller';

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
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/cyclades-hero.jpg" 
            alt="Greek Cyclades Islands" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/95 to-[#E3D7C3]/30"></div>
        </div>
        
        {/* Background Pattern */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI Island Expert",
                description: "Trained on 25+ Cyclades islands with comprehensive local knowledge and authentic recommendations",
                preview: "/images/islands/santorini.jpg",
                color: "from-blue-500 to-purple-600"
              },
              {
                icon: <Route className="h-8 w-8" />,
                title: "Smart Route Planning",
                description: "Optimizes ferry connections, transportation, and timing for the perfect island-hopping experience",
                preview: "/images/islands/mykonos.jpg",
                color: "from-green-500 to-teal-600"
              },
              {
                icon: <Utensils className="h-8 w-8" />,
                title: "Restaurant Auto-Booker",
                description: "AI calls Sifnos restaurants in Greek to make reservations - natural language booking with voice confirmation",
                preview: "/images/islands/sifnos.jpg",
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Real-Time Bookings",
                description: "Live ferry schedules, hotel availability, and restaurant reservations all in one conversation",
                preview: "/images/islands/naxos.jpg",
                color: "from-orange-500 to-red-600"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Insider Access",
                description: "Exclusive experiences, hidden gems, and local secrets that guidebooks miss",
                preview: "/images/islands/paros.jpg",
                color: "from-purple-500 to-pink-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden relative"
              >
                {/* Background Preview Image on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img 
                    src={feature.preview} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E2E48] mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
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
  const [activeTab, setActiveTab] = useState<'chat' | 'map' | 'itinerary' | 'taxi' | 'restaurants'>('chat');
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
      image: '/images/islands/santorini.jpg',
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
      image: '/images/islands/mykonos.jpg',
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
      image: '/images/islands/naxos.jpg',
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
      image: '/images/islands/paros.jpg',
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
      image: '/images/islands/milos.jpg',
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
      image: '/images/islands/sifnos.jpg',
      highlights: ['Apollonia', 'Kastro', 'Pottery Workshops'],
      avgCost: 75,
      description: 'Culinary traditions and peaceful atmosphere'
    },
    {
      id: 'ios',
      name: 'Ios',
      position: { x: 50, y: 75 },
      coordinates: { lat: 36.7215, lng: 25.2958 },
      color: '#FFB6C1',
      image: '/images/islands/ios.jpg',
      highlights: ['Mylopotas Beach', 'Chora Nightlife', 'Homer Tomb'],
      avgCost: 95,
      description: 'Beach clubs and vibrant youth culture'
    },
    {
      id: 'folegandros',
      name: 'Folegandros',
      position: { x: 55, y: 85 },
      coordinates: { lat: 36.6167, lng: 24.9167 },
      color: '#98FB98',
      image: '/images/islands/folegandros.jpg',
      highlights: ['Chora Village', 'Katergo Beach', 'Panagia Church'],
      avgCost: 110,
      description: 'Dramatic cliffs and authentic charm'
    },
    {
      id: 'serifos',
      name: 'Serifos',
      position: { x: 35, y: 80 },
      coordinates: { lat: 37.1500, lng: 24.5000 },
      color: '#87CEEB',
      image: '/images/islands/serifos.jpg',
      highlights: ['Livadi Beach', 'Chora Cycladic Architecture', 'Monastery Taxiarches'],
      avgCost: 85,
      description: 'Untouched beauty and mining heritage'
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
        images: ['/images/islands/santorini.jpg'],
        ferryInfo: { time: '14:30', duration: '2h 15min', price: 45 }
      },
      {
        day: 2,
        island: 'santorini',
        title: 'Santorini Exploration',
        activities: ['Wine tasting tour', 'Visit Red Beach', 'Fira town exploration'],
        accommodation: 'Andronis Luxury Suites',
        cost: 180,
        images: ['/images/islands/santorini.jpg']
      },
      {
        day: 3,
        island: 'mykonos',
        title: 'Ferry to Mykonos',
        activities: ['Morning ferry to Mykonos', 'Little Venice exploration', 'Beach time at Paradise Beach'],
        accommodation: 'Belvedere Hotel',
        cost: 200,
        images: ['/images/islands/mykonos.jpg'],
        ferryInfo: { time: '09:00', duration: '1h 45min', price: 35 }
      },
      {
        day: 4,
        island: 'naxos',
        title: 'Discover Naxos',
        activities: ['Portara monument visit', 'Plaka Beach relaxation', 'Traditional village exploration'],
        accommodation: 'Naxos Resort',
        cost: 160,
        images: ['/images/islands/naxos.jpg'],
        ferryInfo: { time: '11:15', duration: '45min', price: 25 }
      },
      {
        day: 5,
        island: 'paros',
        title: 'Paros Adventure',
        activities: ['Naoussa fishing village', 'Golden Beach windsurfing', 'Parikia old town'],
        accommodation: 'Paros Bay Hotel',
        cost: 140,
        images: ['/images/islands/paros.jpg'],
        ferryInfo: { time: '16:30', duration: '30min', price: 20 }
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
      className="min-h-screen bg-gray-50"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Sidebar Navigation - Desktop Only */}
        <div className="w-80 xl:w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Sidebar Header */}
        <div className="p-4 xl:p-6 border-b border-gray-200">
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

        {/* Enhanced Navigation Tabs */}
        <div className="p-4">
          <div className="space-y-3">
            {[
              { id: 'chat', label: 'AI Chat', icon: MessageCircle, desc: 'Talk with your AI expert', color: 'from-blue-500 to-cyan-500' },
              { id: 'map', label: 'Islands Map', icon: MapPin, desc: 'Explore Greek islands visually', color: 'from-emerald-500 to-teal-500' },
              { id: 'itinerary', label: 'Trip Planner', icon: Route, desc: 'Build your perfect itinerary', color: 'from-purple-500 to-pink-500' },
              { id: 'taxi', label: 'Taxi Booker', icon: Car, desc: 'AI taxi reservations', color: 'from-yellow-500 to-amber-500' },
              { id: 'restaurants', label: 'Restaurant Booker', icon: Utensils, desc: 'AI restaurant reservations', color: 'from-orange-500 to-red-500' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-[#1E2E48] text-white shadow-xl'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === tab.id 
                      ? 'bg-white/20' 
                      : `bg-gradient-to-r ${tab.color} text-white`
                  }`}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{tab.label}</div>
                    <div className={`text-xs mt-1 ${
                      activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {tab.desc}
                    </div>
                  </div>
                  {activeTab === tab.id && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Feature Shortcuts */}
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-semibold text-[#1E2E48] mb-3 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Tools
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setActiveTab('restaurants')}
              className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-xs font-medium flex flex-col items-center gap-2 transform hover:scale-105 shadow-lg"
            >
              <Utensils className="w-4 h-4" />
              <span>Book Restaurant</span>
            </button>
            <button className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-xs font-medium flex flex-col items-center gap-2 transform hover:scale-105 shadow-lg">
              <Ship className="w-4 h-4" />
              <span>Ferries</span>
            </button>
            <button className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 text-xs font-medium flex flex-col items-center gap-2 transform hover:scale-105 shadow-lg">
              <Camera className="w-4 h-4" />
              <span>Photos</span>
            </button>
            <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-xs font-medium flex flex-col items-center gap-2 transform hover:scale-105 shadow-lg">
              <Sun className="w-4 h-4" />
              <span>Weather</span>
            </button>
          </div>
        </div>

        {/* Travel Inspiration */}
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-semibold text-[#1E2E48] mb-3 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Travel Inspiration
          </h4>
          <div className="space-y-2">
            {[
              { title: "Hidden Beach Caves", island: "Milos", color: "#FFEAA7" },
              { title: "Sunset Wine Tour", island: "Santorini", color: "#FF6B6B" },
              { title: "Traditional Pottery", island: "Sifnos", color: "#DDA0DD" }
            ].map((inspiration, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: inspiration.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#1E2E48] group-hover:text-blue-600 transition-colors">
                      {inspiration.title}
                    </div>
                    <div className="text-xs text-gray-500">{inspiration.island}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-semibold text-[#1E2E48] mb-3 text-sm flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Recommendations
          </h4>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-green-800 mb-1">Perfect Season</div>
                  <div className="text-xs text-green-600">
                    May-June: Ideal weather, fewer crowds, blooming islands
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-800 mb-1">Ferry Tip</div>
                  <div className="text-xs text-blue-600">
                    Book Santorini-Mykonos ferries 2 weeks ahead in summer
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-purple-800 mb-1">Local Secret</div>
                  <div className="text-xs text-purple-600">
                    Try frappé coffee at local kafeneia for authentic experience
                  </div>
                </div>
              </div>
            </div>
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

        {/* Desktop Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 relative w-full max-w-full overflow-hidden">
          {/* Content will be inserted here */}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Mobile Navigation Header */}
        <div className="bg-white border-b border-gray-200 p-3 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onGoBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#1E2E48] -ml-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <img 
              src="/touristas-ai-logo.svg" 
              alt="Touristas AI" 
              className="h-6 w-auto"
            />
            <div>
              <h2 className="font-semibold text-[#1E2E48] text-sm">Touristas AI</h2>
              <p className="text-xs text-gray-600 hidden sm:block">Greek Islands Expert</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Online</span>
          </div>
        </div>
        
        {/* Mobile Tab Navigation - Enhanced */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'chat', label: 'Chat', icon: MessageCircle, shortLabel: 'Chat' },
            { id: 'map', label: 'Map', icon: MapPin, shortLabel: 'Map' },
            { id: 'itinerary', label: 'Plan', icon: Route, shortLabel: 'Plan' },
            { id: 'taxi', label: 'Taxi', icon: Car, shortLabel: 'Taxi' },
            { id: 'restaurants', label: 'Food', icon: Utensils, shortLabel: 'Food' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] ${
                  activeTab === tab.id
                    ? 'bg-[#1E2E48] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{window.innerWidth < 400 ? tab.shortLabel : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Selected Islands Preview */}
        {selectedIslands.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {selectedIslands.slice(0, 4).map((islandId: string) => {
              const island = greekIslands.find((i: any) => i.id === islandId);
              return (
                <div key={islandId} className="flex items-center gap-2 bg-[#E3D7C3]/20 px-2 py-1 rounded-full whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: island?.color }}></div>
                  <span className="text-xs font-medium text-[#1E2E48]">{island?.name}</span>
                </div>
              );
            })}
            {selectedIslands.length > 4 && (
              <div className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
                <span className="text-xs text-gray-600">+{selectedIslands.length - 4}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area - Mobile Responsive */}
      <div className="flex-1 flex flex-col min-h-0 relative w-full max-w-full overflow-hidden">
        {/* Chat View */}
        {activeTab === 'chat' && (
          <>
            {/* Chat Messages - Fixed Container */}
            <div className="flex-1 overflow-y-auto">
              <div ref={chatStartRef} className="h-4 sm:h-8 md:h-12" />
              <div className="w-full px-3 sm:px-4 lg:px-6 pb-4">
                <div className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4">
                  {/* Welcome Message - Fully Responsive */}
                  {showWelcome && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mt-4 sm:mt-8"
                    >
                      <div className="text-center">
                        {/* Enhanced Welcome Avatar - Mobile Responsive */}
                        <div className="relative mx-auto mb-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#1E2E48] via-blue-600 to-[#E3D7C3] rounded-full flex items-center justify-center shadow-lg">
                            <img 
                              src="/touristas-ai-logo.svg" 
                              alt="Touristas AI"
                              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="text-white text-lg sm:text-2xl">🤖</div>';
                                }
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1E2E48] mb-2 sm:mb-3">
                          Γεια σας! Welcome to Touristas AI! 🇬🇷
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed px-2">
                          I'm your personal Greek islands AI expert trained on 25+ Cyclades destinations. I'll help you create the perfect island-hopping adventure with <span className="font-semibold text-[#1E2E48]">interactive maps</span>, <span className="font-semibold text-[#1E2E48]">visual itineraries</span>, and <span className="font-semibold text-[#1E2E48]">real-time insights</span>!
                        </p>
                        
                        {/* AI Capabilities Preview - Mobile Grid */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          {[
                            { icon: "🗺️", label: "Interactive Maps" },
                            { icon: "⛵", label: "Ferry Schedules" },
                            { icon: "🏨", label: "Live Bookings" },
                            { icon: "💎", label: "Hidden Gems" }
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-1 sm:gap-2 bg-[#E3D7C3]/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                              <span className="text-xs sm:text-sm">{feature.icon}</span>
                              <span className="text-xs font-medium text-[#1E2E48]">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Quick Start Prompts - Fully Responsive */}
                        <div className="grid grid-cols-1 gap-2 sm:gap-3 w-full">
                          {[
                            "Plan a 7-day romantic trip to Santorini & Mykonos",
                            "Create a family adventure across 3 islands", 
                            "Design a luxury yacht hopping experience",
                            "Find the best budget islands for 2 weeks"
                          ].map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => setUserInput(prompt)}
                              className="w-full text-left p-3 sm:p-4 bg-gradient-to-r from-[#E3D7C3]/20 to-[#E3D7C3]/10 hover:from-[#E3D7C3]/30 hover:to-[#E3D7C3]/20 rounded-lg border border-[#E3D7C3]/50 transition-all duration-200 text-xs sm:text-sm hover:shadow-sm min-h-[44px] flex items-center"
                            >
                              <span className="text-[#1E2E48] font-medium leading-snug break-words">{prompt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Chat Messages - Fixed Responsive Layout */}
                  {messages.map((message: any) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`w-full flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'user' ? (
                        <div className="max-w-[85%] sm:max-w-xl bg-[#1E2E48] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm">
                          <p className="leading-relaxed text-sm word-wrap break-words">{message.content}</p>
                          <div className="text-xs text-white/70 mt-1 sm:mt-2">
                            {message.timestamp?.toLocaleTimeString()}
                          </div>
                        </div>
                                              ) : (
                          <div className="max-w-[95%] sm:max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                          {/* AI Avatar */}
                          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-full flex items-center justify-center flex-shrink-0">
                              <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-[#1E2E48] text-sm">Touristas AI</h4>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Expert Response
                                </span>
                              </div>
                              
                              {/* Enhanced Message Content */}
                              <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-2 sm:mb-3 text-sm word-wrap break-words">{message.content}</p>
                                
                                {/* Interactive Actions - Mobile Optimized */}
                                {message.hasInteractiveContent && (
                                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                                    <button
                                      onClick={() => setActiveTab('map')}
                                      className="flex items-center gap-1 sm:gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs font-medium min-h-[32px]"
                                    >
                                      <MapPin className="h-3 w-3" />
                                      View on Map
                                    </button>
                                    <button
                                      onClick={() => setActiveTab('itinerary')}
                                      className="flex items-center gap-1 sm:gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs font-medium min-h-[32px]"
                                    >
                                      <Route className="h-3 w-3" />
                                      See Itinerary
                                    </button>
                                    <button className="flex items-center gap-1 sm:gap-2 bg-[#E3D7C3]/20 hover:bg-[#E3D7C3]/30 text-[#1E2E48] px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs font-medium min-h-[32px]">
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

                  {/* Typing Indicator - Mobile Optimized */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full flex justify-start"
                    >
                      <div className="bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200 flex items-center gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] rounded-full flex items-center justify-center">
                          <Brain className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#1E2E48] rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#1E2E48] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#1E2E48] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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

            {/* Chat Input - Mobile Responsive */}
            <div className="w-full bg-white border-t border-gray-200 p-3 sm:p-4 sticky bottom-0">
              <div className="w-full max-w-4xl mx-auto">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 relative min-w-0">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Tell me about your dream Greek island adventure..."
                      className="w-full border-2 border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-gray-800 placeholder-gray-500 focus:border-[#1E2E48] focus:outline-none resize-none text-sm sm:text-base min-h-[44px] max-h-[120px]"
                      rows={1}
                      style={{ height: 'auto' }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    {/* Character count for mobile */}
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400 sm:hidden">
                      {userInput.length}/500
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isTyping}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center min-w-[44px] flex-shrink-0 ${
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
                
                {/* Smart Contextual Quick Actions - Mobile Responsive */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
                  <button
                    onClick={() => setActiveTab('map')}
                    className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap min-h-[32px] flex-shrink-0"
                  >
                    <MapPin className="h-3 w-3" />
                    View Map
                  </button>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap min-h-[32px] flex-shrink-0"
                  >
                    <Route className="h-3 w-3" />
                    Plan Trip
                  </button>
                  <button
                    onClick={() => setActiveTab('restaurants')}
                    className="flex items-center gap-1 sm:gap-2 bg-orange-100 hover:bg-orange-200 text-orange-800 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap font-medium min-h-[32px] flex-shrink-0"
                  >
                    <Utensils className="h-3 w-3" />
                    Book Restaurant
                  </button>
                  
                  {/* Contextual suggestions based on selected islands */}
                  {selectedIslands.length === 0 && (
                    <>
                      <button
                        onClick={() => setUserInput("What are the best islands for families?")}
                        className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap min-h-[32px] flex-shrink-0"
                      >
                        <Users className="h-3 w-3" />
                        Family Tips
                      </button>
                      <button
                        onClick={() => setUserInput("Show me romantic islands for couples")}
                        className="flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap min-h-[32px] flex-shrink-0"
                      >
                        <Heart className="h-3 w-3" />
                        Romance
                      </button>
                    </>
                  )}
                  
                  {selectedIslands.length > 0 && selectedIslands.length < 3 && (
                    <button
                      onClick={() => {
                        const selectedNames = selectedIslands.map(id => 
                          greekIslands.find(i => i.id === id)?.name
                        ).join(', ');
                        setUserInput(`Create a 7-day itinerary for ${selectedNames} with ferry connections`);
                      }}
                      className="flex items-center gap-1 sm:gap-2 bg-[#E3D7C3]/30 hover:bg-[#E3D7C3]/50 text-[#1E2E48] px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap font-medium min-h-[32px] flex-shrink-0"
                    >
                      <Wand2 className="h-3 w-3" />
                      Plan Selected
                    </button>
                  )}
                  
                  {selectedIslands.length >= 3 && (
                    <button
                      onClick={() => {
                        const selectedNames = selectedIslands.slice(0, 3).map(id => 
                          greekIslands.find(i => i.id === id)?.name
                        ).join(', ');
                        setUserInput(`Optimize my ${selectedIslands.length}-island trip: ${selectedNames}${selectedIslands.length > 3 ? ' and more' : ''}`);
                      }}
                      className="flex items-center gap-1 sm:gap-2 bg-[#1E2E48] text-white px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs whitespace-nowrap font-medium min-h-[32px] flex-shrink-0"
                    >
                      <Target className="h-3 w-3" />
                      Optimize Trip
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Interactive Islands Map - Mobile Optimized */}
        {activeTab === 'map' && (
          <InteractiveMap 
            islands={greekIslands}
            selectedIslands={selectedIslands}
            onToggleIsland={toggleIslandSelection}
          />
        )}

        {/* Visual Itinerary Builder - Mobile Optimized */}
        {activeTab === 'itinerary' && (
          <ItineraryBuilder 
            itinerary={currentItinerary}
            setItinerary={setCurrentItinerary}
            islands={greekIslands}
            tripDuration={tripDuration}
            setTripDuration={setTripDuration}
          />
        )}

        {/* Taxi Auto-Caller - Mobile Optimized */}
        {activeTab === 'taxi' && (
          <div className="h-full overflow-y-auto">
            <TaxiAutoCaller />
          </div>
        )}

        {/* Restaurant Auto-Booker - Mobile Optimized */}
        {activeTab === 'restaurants' && (
          <div className="h-full overflow-y-auto">
            <RestaurantAutoCaller />
          </div>
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
      {/* Map Header - Mobile Optimized */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#1E2E48] mb-1">Greek Cyclades Islands Map</h3>
            <p className="text-sm text-gray-600">Tap islands to add them to your trip • Interactive OpenStreetMap</p>
          </div>
          
          {/* Map Controls - Mobile Stack */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Map View Toggle - Mobile Friendly */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setMapView('visual')}
                className={`flex-1 sm:flex-none px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                  mapView === 'visual' ? 'bg-[#1E2E48] text-white' : 'text-gray-600'
                }`}
              >
                Street
              </button>
              <button
                onClick={() => setMapView('satellite')}
                className={`flex-1 sm:flex-none px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                  mapView === 'satellite' ? 'bg-[#1E2E48] text-white' : 'text-gray-600'
                }`}
              >
                Satellite
              </button>
            </div>
            
            {/* Ferry Routes Toggle - Mobile Friendly */}
            <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer p-2 bg-gray-50 rounded-lg min-h-[36px]">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="rounded w-4 h-4"
              />
              <span className="whitespace-nowrap">Ferry Routes</span>
            </label>
            
            {/* Selected Count - Mobile Badge */}
            <div className="text-xs sm:text-sm text-gray-600 bg-[#E3D7C3]/20 px-3 py-2 rounded-full whitespace-nowrap min-h-[36px] flex items-center">
              {selectedIslands.length} selected
            </div>
          </div>
        </div>
        
        {/* Selected Islands Summary - Mobile Optimized */}
        {selectedIslands.length > 0 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {selectedIslands.map((islandId: string) => {
                const island = islands.find((i: any) => i.id === islandId);
                return (
                  <div key={islandId} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap min-h-[36px] shadow-sm">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: island?.color }}></div>
                    <span className="text-xs font-medium text-[#1E2E48]">{island?.name}</span>
                    <button
                      onClick={() => onToggleIsland(islandId)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-1 p-1 min-w-[20px] min-h-[20px] flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Real Leaflet Map - Responsive Container */}
      <div className="flex-1 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
        {/* Mobile Floating Quick Actions */}
        <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2">
          <button
            onClick={() => setMapView(mapView === 'visual' ? 'satellite' : 'visual')}
            className="bg-white shadow-lg rounded-lg p-2 sm:p-3 hover:bg-gray-50 transition-colors border border-gray-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Toggle Map View"
          >
            {mapView === 'visual' ? (
              <Satellite className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E2E48]" />
            ) : (
              <MapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E2E48]" />
            )}
          </button>
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`shadow-lg rounded-lg p-2 sm:p-3 transition-colors border border-gray-200 min-w-[40px] min-h-[40px] flex items-center justify-center ${
              showRoutes ? 'bg-[#1E2E48] text-white' : 'bg-white hover:bg-gray-50 text-[#1E2E48]'
            }`}
            title="Toggle Ferry Routes"
          >
            <Ship className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Mobile Island Filter Pills */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2 max-w-[120px] sm:max-w-[200px]">
          {['Popular', 'Budget', 'Luxury', 'Family'].map((filter) => (
            <button
              key={filter}
              className="bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-[#1E2E48] hover:bg-white transition-colors border border-gray-200 min-h-[32px]"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Mobile Zoom Controls */}
        <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-2">
          <button className="bg-white shadow-lg rounded-lg p-2 sm:p-3 hover:bg-gray-50 transition-colors border border-gray-200 min-w-[40px] min-h-[40px] flex items-center justify-center">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E2E48]" />
          </button>
          <button className="bg-white shadow-lg rounded-lg p-2 sm:p-3 hover:bg-gray-50 transition-colors border border-gray-200 min-w-[40px] min-h-[40px] flex items-center justify-center">
            <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E2E48]" />
          </button>
        </div>

          {/* Enhanced Island Info Panel - Mobile Optimized */}
          {hoveredIsland && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-16 sm:bottom-4 left-3 sm:left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-3 sm:p-4 max-w-[280px] sm:max-w-sm"
            >
              {(() => {
                const island = islands.find((i: any) => i.id === hoveredIsland);
                if (!island) return null;
                
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={island.image}
                          alt={island.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1E2E48]">{island.name}</h4>
                        <p className="text-sm text-gray-600">€{island.avgCost}/day avg</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">{island.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {island.highlights.slice(0, 3).map((highlight: string, index: number) => (
                          <span key={index} className="text-xs bg-[#E3D7C3]/30 text-[#1E2E48] px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => onToggleIsland(island.id)}
                        className={`w-full mt-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedIslands.includes(island.id)
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-[#1E2E48] text-white hover:bg-[#1E2E48]/90'
                        }`}
                      >
                        {selectedIslands.includes(island.id) ? 'Remove from Trip' : 'Add to Trip'}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          className="rounded-none sm:rounded-lg"
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img
                        src={island.image}
                        alt={`Beautiful view of ${island.name} island`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/islands/default-island.jpg';
                          target.onerror = () => {
                            target.style.display = 'none';
                          };
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1E2E48] text-lg mb-1">{island.name}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{island.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Average: €{island.avgCost}/day</span>
                        <span>•</span>
                        <span>{island.highlights.length} highlights</span>
                      </div>
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

// Enhanced Visual Itinerary Builder Component
function ItineraryBuilder({ itinerary, setItinerary, islands, tripDuration, setTripDuration }: any) {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState('');
  const [planningMode, setPlanningMode] = useState<'manual' | 'ai' | 'template'>('manual');
  const [budget, setBudget] = useState(2000);
  const [travelStyle, setTravelStyle] = useState('balanced');
  const [groupSize, setGroupSize] = useState(2);
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

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

  const addNewDay = () => {
    const newDay = {
      day: itinerary.length + 1,
      island: 'santorini',
      title: `Day ${itinerary.length + 1}`,
      activities: [],
      cost: 150,
      accommodation: 'To be planned'
    };
    setItinerary([...itinerary, newDay]);
  };

  const totalCost = itinerary.reduce((sum: number, day: any) => sum + (day.cost || 0), 0);
  const avgDailyCost = itinerary.length > 0 ? Math.round(totalCost / itinerary.length) : 0;
  const budgetProgress = budget > 0 ? (totalCost / budget) * 100 : 0;

  // Auto-save progress tracking
  const completionPercentage = Math.round((itinerary.length / tripDuration) * 100);
  
  const travelStyles = [
    { id: 'luxury', label: 'Luxury', icon: '👑', multiplier: 2.5 },
    { id: 'comfort', label: 'Comfort', icon: '🏨', multiplier: 1.5 },
    { id: 'balanced', label: 'Balanced', icon: '⚖️', multiplier: 1.0 },
    { id: 'budget', label: 'Budget', icon: '💰', multiplier: 0.7 }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pt-24 md:pt-20">
      {/* Enhanced Header with Smart Features */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-24 md:top-16 z-40">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-80 right-20 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative p-8 sm:p-10 lg:p-12 pt-12 sm:pt-14 lg:pt-16">
          {/* Main Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-[#1E2E48] via-blue-600 to-purple-600 rounded-2xl shadow-lg">
                    <Route className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1E2E48] via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Trip Planner
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-700">AI-Powered Planning</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Real-time Updates</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
                Create your perfect Greek island adventure with intelligent recommendations, 
                budget tracking, and interactive planning tools
              </p>
            </div>
            
            {/* Enhanced Analytics Cards */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl min-w-[140px]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg"></div>
                  <span className="text-sm font-semibold text-gray-700">Total Budget</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    €{totalCost}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    €{avgDailyCost}/day avg
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl min-w-[140px]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
                  <span className="text-sm font-semibold text-gray-700">Duration</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {itinerary.length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    of {tripDuration} days
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl min-w-[140px]">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  <span className="text-sm font-semibold text-gray-700">Progress</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {completionPercentage}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Complete
                  </div>
                  {completionPercentage === 100 && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Ready!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Planning Controls */}
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-8 border border-gray-200/50 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trip Configuration */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-[#1E2E48] flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Trip Setup
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                    <select 
                      value={tripDuration} 
                      onChange={(e) => setTripDuration(Number(e.target.value))}
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-white focus:border-[#1E2E48] focus:outline-none text-sm font-medium shadow-sm hover:shadow-md transition-all"
                    >
                      {[3, 5, 7, 10, 14, 21].map(days => (
                        <option key={days} value={days}>{days} days adventure</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Group Size</label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 6, 8].map(size => (
                        <button
                          key={size}
                          onClick={() => setGroupSize(size)}
                          className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm font-medium ${
                            groupSize === size
                              ? 'border-[#1E2E48] bg-[#1E2E48] text-white'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Style & Budget */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-[#1E2E48] flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Travel Style
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {travelStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setTravelStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        travelStyle === style.id
                          ? 'border-[#1E2E48] bg-[#1E2E48] text-white'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.icon}</div>
                      <div className="text-sm font-semibold">{style.label}</div>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget: €{budget}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>€500</span>
                    <span>€10,000</span>
                  </div>
                </div>
              </div>

              {/* Smart Actions */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-[#1E2E48] flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Smart Actions
                </h4>
                
                <div className="space-y-3">
                  <button 
                    onClick={addNewDay}
                    className="w-full bg-gradient-to-r from-[#1E2E48] to-blue-600 text-white px-6 py-4 rounded-xl hover:from-[#1E2E48]/90 hover:to-blue-600/90 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Day
                  </button>
                  
                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                    <Wand2 className="w-5 h-5" />
                    AI Auto-Plan
                  </button>
                  
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3">
                    <Flame className="w-5 h-5" />
                    Use Template
                  </button>
                  
                  {itinerary.length > 0 && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const itineraryText = itinerary.map((day: any) => 
                            `Day ${day.day}: ${day.title}\n${day.activities?.join('\n') || ''}\nCost: €${day.cost}`
                          ).join('\n\n');
                          navigator.clipboard.writeText(itineraryText);
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Export
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Timeline - Responsive */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 pt-8 sm:pt-12 lg:pt-16">
        {itinerary.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E3D7C3]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Route className="h-6 w-6 sm:h-8 sm:w-8 text-[#1E2E48]" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-[#1E2E48] mb-2">No Itinerary Yet</h4>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto px-4">
              Start planning by asking our AI to create an itinerary or manually add days to your trip
            </p>
            <button className="bg-[#1E2E48] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#1E2E48]/90 transition-colors text-sm sm:text-base font-medium">
              Start Planning
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Timeline - Responsive */}
            <div className="space-y-6 sm:space-y-8">
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