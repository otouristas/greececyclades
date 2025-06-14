import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, MapPin, Calendar, Users, Euro, Ship, Plane, Hotel, 
  Camera, Utensils, Star, Clock, ArrowRight, MessageCircle, Search,
  Mic, ChevronDown, Zap, Shield, Award, Target, Route, Navigation,
  Heart, Coffee, Sun, Waves, Wind, Compass, Anchor, Play, Pause,
  RefreshCw, ChevronLeft, ChevronRight, X, Check, Plus
} from 'lucide-react';
import { generateConversationalTrip } from '../utils/ai';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateTripPlannerSEO } from '../utils/seoMetadata';

// Revolutionary Trip Planner - Island Discovery Experience
export default function TripPlanner() {
  const location = useLocation();
  const hasQueryParams = location.search.length > 0;
  const [currentStep, setCurrentStep] = useState<'discover' | 'customize' | 'experience'>('discover');
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);
  const [tripPreferences, setTripPreferences] = useState({
    duration: '',
    budget: '',
    travelers: '',
    vibe: '',
    activities: []
  });
  const [islandData, setIslandData] = useState({});
  const [aiRecommendations, setAiRecommendations] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <>
      <SEO 
        {...generateTripPlannerSEO()} 
        noIndex={hasQueryParams} // Don't index pages with query parameters
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-700 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-300/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-300/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/8 rounded-full blur-md animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Magical Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Compass className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-lg"></div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="ml-6 text-4xl md:text-6xl font-black text-white tracking-tight"
              >
                Island
                <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent"> Oracle</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-cyan-100 max-w-3xl mx-auto mb-8"
            >
              🌊 Discover your perfect Greek island adventure through an enchanted journey of exploration 🏝️
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Experience */}
      <div className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          {currentStep === 'discover' && <DiscoverStep />}
          {currentStep === 'customize' && <CustomizeStep />}
          {currentStep === 'experience' && <ExperienceStep />}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}

// Step 1: Magical Island Discovery
function DiscoverStep() {
  const islands = [
    { 
      id: 'santorini', 
      name: 'Santorini', 
      emoji: '🌋', 
      color: 'from-orange-400 to-red-500',
      magic: 'Volcanic sunsets & white villages',
      position: { x: '60%', y: '40%' }
    },
    { 
      id: 'mykonos', 
      name: 'Mykonos', 
      emoji: '🎉', 
      color: 'from-purple-400 to-pink-500',
      magic: 'Windmills & endless parties',
      position: { x: '45%', y: '30%' }
    },
    { 
      id: 'naxos', 
      name: 'Naxos', 
      emoji: '🏛️', 
      color: 'from-yellow-400 to-orange-500',
      magic: 'Ancient temples & golden beaches',
      position: { x: '50%', y: '50%' }
    },
    { 
      id: 'paros', 
      name: 'Paros', 
      emoji: '⛵', 
      color: 'from-blue-400 to-cyan-500',
      magic: 'Marble villages & sailing',
      position: { x: '40%', y: '45%' }
    },
    { 
      id: 'milos', 
      name: 'Milos', 
      emoji: '🌈', 
      color: 'from-emerald-400 to-teal-500',
      magic: 'Colorful cliffs & hidden coves',
      position: { x: '25%', y: '60%' }
    },
    { 
      id: 'sifnos', 
      name: 'Sifnos', 
      emoji: '👨‍🍳', 
      color: 'from-indigo-400 to-purple-500',
      magic: 'Culinary paradise & pottery',
      position: { x: '35%', y: '55%' }
    }
  ];

  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-4"
        >
          ✨ Choose Your Islands of Wonder ✨
        </motion.h2>
        <p className="text-cyan-200 text-lg">
          Hover over islands to feel their magic, click to select your destiny
        </p>
      </div>

      {/* Interactive Island Map */}
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-3xl border border-cyan-300/30 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Ocean Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 animate-pulse"></div>
          <Waves className="absolute bottom-4 left-4 w-8 h-8 text-cyan-300/60 animate-bounce" />
          <Ship className="absolute top-8 right-12 w-6 h-6 text-white/40 animate-pulse" />
          <Anchor className="absolute bottom-8 right-8 w-5 h-5 text-cyan-400/50" />
        </div>

        {/* Islands */}
        {islands.map((island) => (
          <motion.div
            key={island.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: island.position.x, top: island.position.y }}
            onHoverStart={() => setHoveredIsland(island.id)}
            onHoverEnd={() => setHoveredIsland(null)}
            onClick={() => {
              if (selectedIslands.includes(island.id)) {
                setSelectedIslands(prev => prev.filter(id => id !== island.id));
              } else {
                setSelectedIslands(prev => [...prev, island.id]);
              }
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center text-2xl
              bg-gradient-to-r ${island.color} shadow-xl transition-all duration-300
              ${selectedIslands.includes(island.id) ? 'ring-4 ring-white/80' : ''}
              ${hoveredIsland === island.id ? 'shadow-2xl' : ''}
            `}>
              {island.emoji}
            </div>
            
            {/* Island Info Popup */}
            <AnimatePresence>
              {hoveredIsland === island.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 min-w-max">
                    <h3 className="font-bold text-gray-900 text-lg">{island.name}</h3>
                    <p className="text-gray-600 text-sm">{island.magic}</p>
                    {selectedIslands.includes(island.id) && (
                      <div className="mt-2 flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Selected Islands Display */}
      {selectedIslands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-cyan-200 mb-4">Your Selected Islands:</p>
          <div className="flex justify-center gap-4 mb-8">
            {selectedIslands.map(id => {
              const island = islands.find(i => i.id === id);
              return (
                <div key={id} className={`px-4 py-2 rounded-full bg-gradient-to-r ${island?.color} text-white font-medium flex items-center`}>
                  <span className="mr-2">{island?.emoji}</span>
                  {island?.name}
                  <button
                    onClick={() => setSelectedIslands(prev => prev.filter(islandId => islandId !== id))}
                    className="ml-2 hover:bg-white/20 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center mx-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Continue Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Placeholder components for other steps
function CustomizeStep() {
  return <div className="text-white text-center">Customize Step Coming Next!</div>;
}

function ExperienceStep() {
  return <div className="text-white text-center">Experience Step Coming Next!</div>;
}
