import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Zap, Shield, ArrowRight, Sparkles,
  Database, Users, Hotel, Ship, Star, Check, X,
  Globe, Bot, ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import { useTouristas } from '../contexts/TouristasContext';

// Typewriter effect component
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : 80);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);
  
  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function TouristasAILandingNew() {
  const { openChat } = useTouristas();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featureExamples = [
    "Find me a romantic cave hotel in Santorini with sunset views...",
    "Compare Mykonos vs Paros for families...",
    "Plan a 7-day island hopping itinerary...",
    "Best beaches in Milos for swimming...",
    "Budget hotels near Naxos port...",
  ];

  return (
    <>
      <SEO
        title="Touristas AI: Your Free Greek Islands Travel Oracle"
        description="The world's first AI trained specifically for Greek islands. Instant hotel recommendations, custom itineraries, ferry routes & insider tips. Ask anything!"
        pageType="touristas-ai"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Touristas AI', url: '/touristas-ai' }
        ]}
        faqs={[
          { question: 'What is Touristas AI?', answer: 'Touristas AI is a free AI travel assistant trained specifically on Cyclades islands. It can answer any question about Greek islands, recommend hotels, plan itineraries, and provide insider tips.' },
          { question: 'Is Touristas AI free?', answer: 'Yes, Touristas AI is 100% free to use. Ask unlimited questions about Cyclades travel, hotels, ferries, activities, and more.' },
          { question: 'What can I ask Touristas AI?', answer: 'Anything about Cyclades islands! Hotel recommendations, itinerary planning, ferry routes, best beaches, restaurant tips, weather advice, and insider secrets.' },
          { question: 'How accurate is Touristas AI?', answer: 'Touristas AI is trained on comprehensive data about all 25 Cyclades islands. It provides up-to-date information about accommodations, activities, and travel logistics.' }
        ]}
      />

      {/* HERO - Premium Dark Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-cyclades-caldera" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyclades-turquoise/20 to-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>Powered by Advanced AI</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-cyclades-turquoise to-cyan-400 text-dark-bg text-xs font-bold rounded-full">NEW</span>
              </div>
            </motion.div>

            {/* Logo + Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-6 mb-8"
            >
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-cyclades-turquoise via-cyan-400 to-white flex items-center justify-center shadow-2xl shadow-cyclades-turquoise/30">
                  <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-dark-bg" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-dark-bg text-xs font-bold rounded-full shadow-lg">
                  ONLINE
                </div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyclades-turquoise tracking-tight">
                Touristas AI
              </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl text-cyclades-turquoise font-light">Your Personal</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">Cyclades Expert</span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto space-y-4 mb-8"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                The World's Most Intelligent
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyclades-turquoise to-cyan-400">
                  Greek Islands Travel Assistant
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Ask anything. Get expert answers instantly. From hotels to hidden gems, 
                I know every corner of all 24 Cyclades islands.
              </p>
            </motion.div>

            {/* Typewriter Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark-card to-dark-bg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white/50 text-sm mb-1">Ask me anything...</p>
                    <p className="text-white text-lg font-medium min-h-[1.5em]">
                      <TypewriterText texts={featureExamples} />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
            >
              {[
                { icon: Zap, text: 'Instant Response' },
                { icon: Database, text: '1,000+ Hotels' },
                { icon: Globe, text: '24 Islands' },
                { icon: Shield, text: 'Always Free' },
              ].map((badge) => (
                <div 
                  key={badge.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <badge.icon className="w-4 h-4 text-cyclades-turquoise" />
                  <span className="text-white/90 text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={() => openChat()}
                className="group relative overflow-hidden bg-gradient-to-r from-cyclades-turquoise to-cyan-500 hover:from-cyclades-turquoise hover:to-cyan-400 text-dark-bg px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl shadow-cyclades-turquoise/30 hover:shadow-cyclades-turquoise/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <MessageSquare className="w-6 h-6" />
                Start Chatting Free
                <Sparkles className="w-5 h-5" />
              </button>
              <Link 
                to="/touristas-ai/chat"
                className="bg-white/5 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                Open Full Chat
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-16 max-w-4xl mx-auto"
            >
              {[
                { value: '10K+', label: 'Travelers Helped', icon: Users },
                { value: '<3s', label: 'Avg Response', icon: Zap },
                { value: '1,000+', label: 'Hotels Indexed', icon: Hotel },
                { value: '4.9/5', label: 'User Rating', icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyclades-turquoise/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-cyclades-turquoise mb-2" />
                    <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/60 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-dark-card" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyclades-turquoise/10 border border-cyclades-turquoise/20 text-cyclades-turquoise text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                How It Works
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Three Simple Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyclades-turquoise to-cyan-400">Perfect Travel</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '01', title: 'Ask Anything', desc: 'Type or speak your question naturally. No forms, no filters.', icon: MessageSquare, gradient: 'from-cyclades-turquoise to-cyan-600' },
                { num: '02', title: 'AI Searches All', desc: 'We search hotels, ferries, activities across all 24 islands instantly.', icon: Database, gradient: 'from-purple-500 to-pink-600' },
                { num: '03', title: 'Get Results', desc: 'Receive personalized picks with live prices and direct links.', icon: Check, gradient: 'from-emerald-500 to-teal-600' },
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-black text-white/10 absolute top-6 right-8">{step.num}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-card via-dark-bg to-dark-card" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Touristas AI vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Generic AI</span>
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Generic AI knows a little about everywhere.
                <br />
                <span className="text-cyclades-turquoise font-bold">We know EVERYTHING about the Cyclades.</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyclades-turquoise/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-dark-card/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-6 py-5 text-left text-white/70 font-medium">Feature</th>
                        <th className="px-4 py-5 text-center text-white/50 font-medium">ChatGPT</th>
                        <th className="px-4 py-5 text-center text-white/50 font-medium">Claude</th>
                        <th className="px-6 py-5 text-center bg-gradient-to-b from-cyclades-turquoise/20 to-transparent">
                          <span className="text-cyclades-turquoise font-bold">Touristas AI</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { feature: 'Cyclades Specialization', others: false, us: '100%' },
                        { feature: 'Real-Time Hotel Prices', others: false, us: 'Live Data' },
                        { feature: 'Multi-Island Search', others: false, us: '24 Islands' },
                        { feature: 'Ferry Schedules', others: false, us: 'Live Routes' },
                        { feature: 'Local Expert Knowledge', others: 'Generic', us: 'Deep Local' },
                        { feature: 'Always Free', others: 'Paid Plans', us: '100% Free' },
                      ].map((row) => (
                        <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white font-medium">{row.feature}</td>
                          <td className="px-4 py-4 text-center">
                            {row.others === false ? <X className="w-5 h-5 text-red-400/70 mx-auto" /> : <span className="text-white/40 text-sm">{row.others}</span>}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {row.others === false ? <X className="w-5 h-5 text-red-400/70 mx-auto" /> : <span className="text-white/40 text-sm">{row.others}</span>}
                          </td>
                          <td className="px-6 py-4 text-center bg-cyclades-turquoise/5">
                            <div className="flex flex-col items-center gap-1">
                              <Check className="w-5 h-5 text-emerald-400" />
                              <span className="text-emerald-400 text-xs font-bold">{row.us}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-cyclades-caldera" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-16 h-16 text-cyclades-turquoise mx-auto mb-6" />
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Ready to Plan Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyclades-turquoise to-cyan-400">
                  Cyclades Adventure?
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Join 10,000+ travelers who've discovered the magic of the Greek islands with Touristas AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openChat()}
                  className="bg-cyclades-turquoise hover:bg-cyclades-turquoise/90 text-dark-bg px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl shadow-cyclades-turquoise/30 transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-6 h-6" />
                  Start Free Now
                </button>
                <Link
                  to="/trip-planner"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 px-10 py-5 text-xl font-semibold rounded-2xl transition-all inline-flex items-center justify-center gap-3"
                >
                  <Ship className="w-6 h-6" />
                  Plan a Trip
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          { question: 'What is Touristas AI?', answer: 'Touristas AI is a free AI travel assistant trained specifically on Cyclades islands. It can answer any question about Greek islands, recommend hotels, plan itineraries, and provide insider tips.' },
          { question: 'Is Touristas AI free?', answer: 'Yes, Touristas AI is 100% free to use. Ask unlimited questions about Cyclades travel, hotels, ferries, activities, and more.' },
          { question: 'What can I ask Touristas AI?', answer: 'Anything about Cyclades islands! Hotel recommendations, itinerary planning, ferry routes, best beaches, restaurant tips, weather advice, and insider secrets.' },
          { question: 'How accurate is Touristas AI?', answer: 'Touristas AI is trained on comprehensive data about all 25 Cyclades islands. It provides up-to-date information about accommodations, activities, and travel logistics.' }
        ]}
        title="Touristas AI FAQ"
        subtitle="Your questions about our AI travel assistant, answered"
        className="bg-dark-bg"
      />
    </>
  );
}
