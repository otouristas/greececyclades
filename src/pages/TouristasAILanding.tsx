import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Sparkles, Play, MapPin, 
  Users, Clock, Star, Zap, Globe, Phone, Calendar,
  Heart, Camera, Ship, Plane, Mic, Brain, Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

// Revolutionary "Island Oracle" Landing Page for Touristas AI
export default function TouristasAILanding() {
  const navigate = useNavigate();
  const [activeIsland, setActiveIsland] = useState<string | null>(null);
  const [orbPulse, setOrbPulse] = useState(true);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const islands = [
    { id: 'santorini', name: 'Santorini', emoji: '🌋', color: '#FF6B35' },
    { id: 'mykonos', name: 'Mykonos', emoji: '🎉', color: '#FF1744' },
    { id: 'naxos', name: 'Naxos', emoji: '🏛️', color: '#FFB300' },
    { id: 'paros', name: 'Paros', emoji: '⛵', color: '#2196F3' },
    { id: 'sifnos', name: 'Sifnos', emoji: '👨‍🍳', color: '#4CAF50' },
    { id: 'milos', name: 'Milos', emoji: '🌈', color: '#9C27B0' }
  ];

  const features = [
    { 
      icon: <Brain className="w-6 h-6" />, 
      title: 'Touristas AI Intelligence', 
      desc: 'Deep Greek islands expertise with 25+ island knowledge base',
      highlight: 'AI Expert'
    },
    { 
      icon: <Phone className="w-6 h-6" />, 
      title: 'Touristas AI Auto-Booking', 
      desc: 'Calls restaurants & taxis in Greek language automatically',
      highlight: 'Auto-Book'
    },
    { 
      icon: <MapPin className="w-6 h-6" />, 
      title: 'Touristas AI Smart Routes', 
      desc: 'Personalized itineraries with ferry connections & timing',
      highlight: 'Smart Plans'
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Touristas AI 24/7', 
      desc: 'Always available instant responses in Greek & English',
      highlight: 'Always On'
    }
  ];

  // Auto-pulse the orb every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbPulse(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show features after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFeatures(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleIslandClick = (islandId: string) => {
    navigate(`/touristas-ai/chat?island=${islandId}`);
  };

  const handleOrbClick = () => {
    navigate('/touristas-ai/chat');
  };

  return (
    <>
      <SEO 
        title="Touristas AI - Revolutionary Greek Islands Oracle"
        description="Experience the mystical power of Touristas AI - your personal Greek islands oracle. Get instant recommendations, auto-booking, and personalized guidance."
        keywords={["Touristas AI", "Greek islands oracle", "AI travel assistant", "island planning", "Cyclades AI"]}
        ogImage="https://greececyclades.com/images/touristas-ai-oracle.jpg"
      />

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Touristas AI Branding Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E3D7C3]/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/touristas-ai-logo.svg" 
                alt="Touristas AI" 
                className="h-8 w-auto"
              />
              <div>
                <div className="text-[#1E2E48] font-semibold">Touristas AI</div>
                <div className="text-[#1E2E48]/50 text-xs">Greek Islands Oracle</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm text-[#1E2E48]/60">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Touristas AI Online</span>
              </div>
              <div>25+ Islands</div>
              <div>Greek + English</div>
            </div>

            <Link
              to="/touristas-ai/chat"
              className="bg-[#1E2E48] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1E2E48]/90 transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult Touristas AI</span>
            </Link>
          </div>
        </header>

        {/* Revolutionary Centered Hero */}
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E3D7C3]/10 via-white to-[#E3D7C3]/5">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E2E48] rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#E3D7C3] rounded-full blur-3xl"></div>
          </div>

          {/* Centered Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            {/* Touristas AI Logo & Brand */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-[#1E2E48] rounded-full flex items-center justify-center shadow-2xl mb-6 mx-auto">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="w-12 h-12"
                  />
                </div>
                
                {/* Pulsing Ring Effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 w-24 h-24 border-2 border-[#1E2E48]/30 rounded-full mx-auto"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center space-x-2 bg-[#E3D7C3]/30 rounded-full px-4 py-2 mb-6"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[#1E2E48] text-sm font-medium">Touristas AI Oracle Online</span>
              </motion.div>
            </motion.div>

            {/* Main Headline - Better Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-[#1E2E48] mb-6 leading-none tracking-tight">
                Meet
                <br />
                <span className="font-bold bg-gradient-to-r from-[#1E2E48] to-[#1E2E48]/80 bg-clip-text text-transparent">
                  Touristas AI
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-[#1E2E48]/80 font-light leading-relaxed mb-4">
                  The world's first <strong className="font-semibold text-[#1E2E48]">mystical Greek islands oracle</strong>
                </p>
                <p className="text-lg text-[#1E2E48]/70 leading-relaxed">
                  Revolutionary AI that plans your perfect adventure, books restaurants in Greek, 
                  calls taxis automatically, and guides you through authentic Cyclades experiences
                </p>
              </div>
            </motion.div>

            {/* Enhanced CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link
                to="/touristas-ai/chat"
                className="group bg-[#1E2E48] hover:bg-[#1E2E48]/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-[#1E2E48]/25 transition-all duration-300 flex items-center space-x-3 transform hover:scale-105"
              >
                <img 
                  src="/touristas-ai-logo.svg" 
                  alt="Touristas AI" 
                  className="w-6 h-6 group-hover:animate-pulse"
                />
                <span>Consult Touristas AI Oracle</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group bg-[#E3D7C3] hover:bg-[#E3D7C3]/80 text-[#1E2E48] px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-[#E3D7C3] hover:border-[#1E2E48]/20 transition-all duration-300 flex items-center space-x-3"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>See Touristas AI in Action</span>
              </button>
            </motion.div>

            {/* Interactive Islands Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-12"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-[#1E2E48] mb-2">
                  Choose Your Island Adventure
                </h3>
                <p className="text-sm text-[#1E2E48]/60">
                  Click any island to start planning with Touristas AI
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {islands.map((island, i) => (
                  <motion.button
                    key={island.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    onClick={() => handleIslandClick(island.id)}
                    onHoverStart={() => setActiveIsland(island.id)}
                    onHoverEnd={() => setActiveIsland(null)}
                    className="group p-4 bg-white hover:bg-[#E3D7C3]/10 rounded-2xl shadow-sm border border-[#E3D7C3]/20 hover:border-[#1E2E48]/20 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {island.emoji}
                    </div>
                    <div className="text-sm font-medium text-[#1E2E48] group-hover:text-[#1E2E48]/80">
                      {island.name}
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs text-[#1E2E48]/60">
                        Ask Touristas AI
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Touristas AI Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + i * 0.1 }}
                  className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#E3D7C3]/20 hover:bg-white/80 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#1E2E48] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-[#1E2E48] text-sm mb-1">
                    {feature.highlight}
                  </h4>
                  <p className="text-xs text-[#1E2E48]/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-[#1E2E48]/50">Explore Touristas AI Features</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-[#1E2E48]/30 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-[#1E2E48]/60 rounded-full mt-2"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Touristas AI Features Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-[#E3D7C3]/8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center space-x-3 bg-[#E3D7C3]/20 rounded-full px-6 py-3 mb-6">
                <img 
                  src="/touristas-ai-logo.svg" 
                  alt="Touristas AI" 
                  className="w-6 h-6"
                />
                <span className="text-[#1E2E48] font-medium">Revolutionary AI Technology</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-extralight text-[#1E2E48] mb-6 leading-tight">
                Why <span className="font-bold">Touristas AI</span>
                <br />
                <span className="text-[#1E2E48]/70">is Different</span>
              </h2>
              <p className="text-xl text-[#1E2E48]/70 max-w-3xl mx-auto leading-relaxed">
                The world's first AI oracle specifically trained for Greek islands with mystical intelligence and cultural depth
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Touristas AI Features List */}
              <div className="space-y-8">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="group"
                  >
                    <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-lg border border-[#E3D7C3]/20 hover:shadow-xl hover:border-[#1E2E48]/10 transition-all duration-300">
                      <div className="flex-shrink-0 w-16 h-16 bg-[#1E2E48] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1E2E48] mb-3 group-hover:text-[#1E2E48]/90 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-[#1E2E48]/70 leading-relaxed text-base">
                          {feature.desc}
                        </p>
                        <div className="mt-4 flex items-center space-x-2 text-sm text-[#1E2E48]/50">
                          <Sparkles className="w-4 h-4" />
                          <span>Powered by advanced AI</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Touristas AI Chat Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Floating Background Elements */}
                <div className="absolute -inset-8 bg-gradient-to-br from-[#1E2E48]/5 to-[#E3D7C3]/10 rounded-3xl blur-xl"></div>
                
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E3D7C3]/30">
                  {/* Enhanced Chat Header */}
                  <div className="bg-gradient-to-r from-[#1E2E48] to-[#1E2E48]/90 p-6 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src="/touristas-ai-logo.svg" 
                          alt="Touristas AI" 
                          className="w-10 h-10"
                        />
                        <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold">Touristas AI</div>
                        <div className="text-sm text-white/80">Greek Islands Oracle • Mystical Intelligence</div>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Oracle Online</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Sample Conversation */}
                  <div className="p-8 space-y-6 bg-gradient-to-b from-white to-[#E3D7C3]/5" style={{ minHeight: '400px' }}>
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-[#1E2E48] text-white px-6 py-3 rounded-3xl rounded-br-lg max-w-sm shadow-lg">
                        <div className="text-sm font-medium">Plan my perfect Santorini honeymoon</div>
                      </div>
                    </div>
                    
                    {/* Touristas AI Response */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#E3D7C3] rounded-full flex items-center justify-center">
                        <img 
                          src="/touristas-ai-logo.svg" 
                          alt="Touristas AI" 
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="bg-white text-[#1E2E48] px-6 py-4 rounded-3xl rounded-bl-lg flex-1 shadow-lg border border-[#E3D7C3]/30">
                        <div className="flex items-center space-x-2 mb-3">
                          <Sparkles className="w-4 h-4 text-[#1E2E48]" />
                          <span className="text-sm font-semibold text-[#1E2E48]">Touristas AI Oracle</span>
                          <div className="ml-auto text-xs text-[#1E2E48]/50">Consulting ancient wisdom...</div>
                        </div>
                        
                        <div className="text-base leading-relaxed text-[#1E2E48]/90 mb-4">
                          🌅 **Perfect!** For your Santorini honeymoon, the oracle reveals:
                          <br />
                          <br />
                          • **Stay in Oia** for mystical sunset views
                          <br />
                          • **Wine tasting** at volcanic vineyards
                          <br />
                          • **Romantic dinner** at Selene restaurant
                          <br />
                          <br />
                          I can call them in Greek to make your reservation right now! ✨
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button className="bg-[#1E2E48] text-white px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-[#1E2E48]/90 transition-colors">
                            <Phone className="w-3 h-3" />
                            <span>Call Restaurant in Greek</span>
                          </button>
                          <button className="bg-[#E3D7C3] text-[#1E2E48] px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-[#E3D7C3]/80 transition-colors">
                            <MapPin className="w-3 h-3" />
                            <span>Create Full Itinerary</span>
                          </button>
                          <button className="bg-[#E3D7C3]/50 text-[#1E2E48] px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-[#E3D7C3] transition-colors">
                            <Calendar className="w-3 h-3" />
                            <span>Check Availability</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Typing Indicator */}
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#E3D7C3]/50 rounded-full flex items-center justify-center">
                        <img 
                          src="/touristas-ai-logo.svg" 
                          alt="Touristas AI" 
                          className="w-5 h-5 opacity-70"
                        />
                      </div>
                      <div className="flex items-center space-x-3 bg-[#E3D7C3]/20 rounded-full px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#1E2E48]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-[#1E2E48]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-[#1E2E48]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-[#1E2E48]/60">Touristas AI is consulting the oracle...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Call to Action in Preview */}
                  <div className="bg-gradient-to-r from-[#E3D7C3]/20 to-[#E3D7C3]/10 p-6 text-center border-t border-[#E3D7C3]/20">
                    <Link
                      to="/touristas-ai/chat"
                      className="inline-flex items-center space-x-2 bg-[#1E2E48] text-white px-6 py-3 rounded-full hover:bg-[#1E2E48]/90 transition-colors font-medium"
                    >
                      <img 
                        src="/touristas-ai-logo.svg" 
                        alt="Touristas AI" 
                        className="w-5 h-5"
                      />
                      <span>Start Chatting with Touristas AI</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Touristas AI Testimonials */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#E3D7C3]/8 to-white">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center space-x-3 bg-[#E3D7C3]/30 rounded-full px-6 py-3 mb-6">
                <img 
                  src="/touristas-ai-logo.svg" 
                  alt="Touristas AI" 
                  className="w-6 h-6"
                />
                <span className="text-[#1E2E48] font-medium">Touristas AI Success Stories</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-extralight text-[#1E2E48] mb-6 leading-tight">
                Travelers Love
                <br />
                <span className="font-bold">Touristas AI</span>
              </h2>
              <p className="text-xl text-[#1E2E48]/70 max-w-3xl mx-auto leading-relaxed">
                Discover why thousands trust Touristas AI for their Greek islands adventures
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Maria & John', 
                  text: 'Touristas AI planned our perfect honeymoon and even called the restaurant in Greek! The mystical oracle knew exactly what we wanted.',
                  location: 'New York, USA',
                  trip: 'Santorini Honeymoon',
                  rating: 5
                },
                { 
                  name: 'Sophie Chen', 
                  text: 'Best AI experience ever! Touristas AI found hidden gems even locals didn\'t know about. The oracle\'s wisdom is incredible.',
                  location: 'Singapore',
                  trip: 'Sifnos Cultural Journey',
                  rating: 5
                },
                { 
                  name: 'David Wilson', 
                  text: 'Touristas AI\'s auto-booking saved me hours. The AI called taxis in perfect Greek and handled everything seamlessly!',
                  location: 'London, UK',
                  trip: 'Multi-Island Adventure',
                  rating: 5
                }
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E3D7C3]/20 hover:shadow-2xl hover:border-[#1E2E48]/10 transition-all duration-300 h-full">
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-[#1E2E48] fill-current" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-[#1E2E48]/90 mb-6 italic text-lg leading-relaxed">
                      "{review.text}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#E3D7C3] rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-[#1E2E48] font-bold text-lg">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="font-semibold text-[#1E2E48] mb-1">{review.name}</div>
                      <div className="text-sm text-[#1E2E48]/60 mb-2">{review.location}</div>
                      <div className="text-xs text-[#1E2E48]/50 bg-[#E3D7C3]/20 rounded-full px-3 py-1 inline-block">
                        {review.trip} • Planned by Touristas AI
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {[
                  { metric: '4.9/5', label: 'Touristas AI Rating' },
                  { metric: '10K+', label: 'Happy Travelers' },
                  { metric: '95%', label: 'Booking Success' },
                  { metric: '24/7', label: 'AI Availability' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-[#1E2E48] mb-1">{stat.metric}</div>
                    <div className="text-sm text-[#1E2E48]/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Final Touristas AI CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-[#1E2E48] to-[#1E2E48]/90 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E3D7C3]/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E3D7C3]/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Touristas AI Finale */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              {/* Glowing Touristas AI Logo */}
              <div className="relative inline-block mb-8">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="w-10 h-10"
                  />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 w-20 h-20 border-2 border-white/40 rounded-full mx-auto"
                />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 leading-tight">
                Ready for
                <br />
                <span className="font-bold">Touristas AI?</span>
              </h2>
              
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Begin your mystical journey with the Greek islands oracle. 
                Experience revolutionary AI that understands Greek culture and speaks your language.
              </p>
            </motion.div>
            
            {/* Enhanced Final CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/touristas-ai/chat"
                className="group bg-white text-[#1E2E48] px-10 py-5 rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-2xl font-bold text-lg flex items-center space-x-3"
              >
                <img 
                  src="/touristas-ai-logo.svg" 
                  alt="Touristas AI" 
                  className="w-7 h-7 group-hover:animate-pulse"
                />
                <span>Enter Touristas AI Oracle</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="text-center">
                <div className="text-white/80 text-sm mb-2">Or explore features first</div>
                <Link
                  to="/touristas-ai#features"
                  className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors"
                >
                  Learn about Touristas AI capabilities
                </Link>
              </div>
            </motion.div>

            {/* Final Touristas AI Branding */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="text-white/60 text-sm">
                🇬🇷 Powered by Touristas AI • Greek Islands Oracle • Revolutionary Travel Intelligence
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1E2E48]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full aspect-video bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  <img 
                    src="/touristas-ai-logo.svg" 
                    alt="Touristas AI" 
                    className="h-12 w-auto mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-[#1E2E48] mb-4">
                    Touristas AI Demo
                  </h3>
                  <p className="text-[#1E2E48]/70 mb-6">
                    Watch how Touristas AI revolutionizes Greek island travel planning
                  </p>
                  <div className="bg-[#E3D7C3]/20 rounded-xl p-8 text-[#1E2E48]">
                    Demo video coming soon...
                    <br />
                    Experience Touristas AI live in the chat interface!
                  </div>
                </div>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#1E2E48]/10 hover:bg-[#1E2E48]/20 text-[#1E2E48] rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}