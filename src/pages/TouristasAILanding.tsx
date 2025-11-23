import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MessageCircle, Sparkles, Play, MapPin,
  Users, Clock, Star, Zap, Globe, Phone, Calendar,
  Heart, Camera, Ship, Plane, Mic, Brain, Shield,
  Search, Database, Award, TrendingUp, Image as ImageIcon
} from 'lucide-react';
import SEO from '../components/SEO';
import TouristasAIChat from '../components/touristas-ai/TouristasAIChat';

export default function TouristasAILanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: 'Natural Language Search',
      description: "Just describe what you're looking for in plain language. No complicated filters or forms.",
      example: '"Show me romantic hotels in Oia with sunset views under €300/night"',
      gradient: 'from-sifnos-deep-blue to-primary'
    },
    {
      icon: <Database className="h-8 w-8 text-white" />,
      title: 'Multi-Source Hotel Search',
      description: 'Search Agoda, Booking.com, and local Cyclades hotels simultaneously for best prices.',
      badges: ['Agoda', 'Booking.com', 'Local Hotels'],
      gradient: 'from-sifnos-turquoise to-accent'
    },
    {
      icon: <Zap className="h-8 w-8 text-sifnos-deep-blue" />,
      title: 'Real-Time Pricing',
      description: 'Get live hotel prices and availability for your exact travel dates. Always up-to-date.',
      highlights: ['✓ Live availability checks', '✓ Current season pricing'],
      gradient: 'from-sifnos-beige to-secondary'
    },
    {
      icon: <Mic className="h-8 w-8 text-white" />,
      title: 'Voice-First Design',
      description: 'Ask questions with your voice while on the go. Perfect for mobile travelers.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: 'Interactive Maps',
      description: 'See hotels plotted on interactive maps with distances and route planning.',
      note: 'Visualize locations, calculate distances, optimize routes',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: 'Smart Itinerary Builder',
      description: 'Generate complete 3-7 day itineraries with hotels, activities, and dining. Export to PDF or calendar.',
      badges: ['PDF Export', 'Google Cal'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      title: 'Proactive Intelligence',
      description: 'AI anticipates your next questions and suggests hidden gems tourists miss.',
      example: '"You\'ll probably also want to know about..."',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <ImageIcon className="h-8 w-8 text-white" />,
      title: 'Image Recognition',
      description: 'Upload a hotel photo and AI identifies it or finds similar properties.',
      note: 'Perfect for "I saw this hotel, what is it?" moments',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: 'Conversation Memory',
      description: 'AI remembers your preferences across sessions. No need to repeat yourself.',
      highlights: ['✓ Budget preferences saved', '✓ Travel style remembered'],
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      initials: 'SM',
      name: 'Sarah M.',
      location: 'USA',
      rating: 5,
      text: 'Before Touristas AI, I spent 3 days researching Santorini hotels. With Touristas AI, I found the perfect cave hotel in Oia in 3 minutes. Absolutely game-changing!'
    },
    {
      initials: 'JK',
      name: 'John K.',
      location: 'UK',
      rating: 5,
      text: 'The AI suggested Imerovigli instead of Oia for our honeymoon - same sunset views, 40% cheaper, way less crowded. Best advice ever!'
    },
    {
      initials: 'MP',
      name: 'Maria P.',
      location: 'Germany',
      rating: 5,
      text: 'I asked ChatGPT the same questions - it gave generic advice. Touristas AI gave me specific hotel names, prices, and local secrets. No comparison!'
    }
  ];

  const faqs = [
    {
      question: 'How is Touristas AI different from ChatGPT, Claude, or Gemini?',
      answer: 'Touristas AI is specialized 100% in the Greek Cyclades islands, while ChatGPT, Claude, and Gemini are generic AI assistants that know a little about everywhere. We have real-time hotel pricing from multiple sources, direct booking integration, interactive maps, voice input, and deep local knowledge that generic AI simply cannot match. Our AI is trained on 1,000+ Cyclades hotels, every beach, restaurant, and hidden gem across all 25+ islands.'
    },
    {
      question: 'Does Touristas AI have access to real-time hotel availability and pricing?',
      answer: 'Yes! Touristas AI searches Agoda, Booking.com, and local Cyclades hotels simultaneously, providing you with live prices and availability for your specific dates. Unlike ChatGPT or Claude which can only provide outdated or generic information, our AI shows you what\'s actually available right now.'
    },
    {
      question: 'Can I use voice to ask questions?',
      answer: 'Absolutely! Touristas AI is voice-first designed for travelers on the go. Click the microphone icon and speak naturally - perfect when you\'re at the airport, in a taxi, or walking around the islands. Generic AI chatbots don\'t offer this level of mobile-optimized voice interaction.'
    },
    {
      question: 'Can Touristas AI help me plan my entire Cyclades trip?',
      answer: 'Yes! Ask for a complete 3-7 day itinerary and get hotels, restaurant recommendations, beach visits, wine tours, ferry schedules, and more. You can even export your itinerary to PDF or add it to Google Calendar. ChatGPT can\'t do this - it can only provide text suggestions.'
    },
    {
      question: 'Is Touristas AI free to use?',
      answer: 'Yes, Touristas AI is 100% free with no registration required. We make money through affiliate commissions when you book hotels through our recommended links, but you\'re never charged extra - you get the same prices as booking directly.'
    },
    {
      question: 'Will the AI remember my preferences across conversations?',
      answer: 'Yes! Unlike generic AI chatbots that forget everything, Touristas AI remembers your budget, travel style, dates, and preferences across your entire planning session. Come back later and pick up where you left off without repeating yourself.'
    }
  ];

  return (
    <>
      <SEO
        title="Touristas AI - The World's Most Intelligent Cyclades Travel Assistant"
        description="Powered by Advanced AI. Trained on 1,000+ Hotels. Specialized 100% in the Greek Cyclades. Get instant recommendations, real-time pricing, and personalized itineraries."
        keywords={['Touristas AI', 'Cyclades travel assistant', 'Greek islands AI', 'Santorini hotels', 'Mykonos travel', 'AI travel planning']}
        ogImage="/images/touristas-ai-hero.jpg"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-sifnos-deep-blue via-primary to-sifnos-deep-blue overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-sifnos-beige rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-sifnos-turquoise rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Logo and Title */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 sm:gap-5 pt-4"
              >
                <img
                  src="/touristas-ai-logo.svg"
                  alt="Touristas AI"
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 drop-shadow-2xl"
                />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg">
                  Touristas AI
                </h1>
              </motion.div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 max-w-3xl mx-auto leading-snug px-4">
                The World's Most Intelligent<br />
                Cyclades Travel Assistant
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-light px-4">
                Powered by Advanced AI. Trained on 1,000+ Hotels. Specialized 100% in the Greek Cyclades.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 px-4">
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors bg-white/20 text-white border-white/30 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  &lt;30s Response
                </div>
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors bg-white/20 text-white border-white/30 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base">
                  <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  3 Sources
                </div>
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors bg-white/20 text-white border-white/30 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  100% Cyclades
                </div>
                <div className="inline-flex items-center rounded-full border font-semibold transition-colors bg-white/20 text-white border-white/30 backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base">
                  <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  Free
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-4">
                <Link
                  to="/touristas-ai/chat"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-13 rounded-lg bg-sifnos-beige hover:bg-sifnos-beige/90 text-sifnos-deep-blue px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl font-bold shadow-2xl hover:shadow-sifnos-beige/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  Try Free Now
                </Link>
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-13 rounded-lg bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl font-semibold transition-all"
                >
                  See How It Works
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </a>
              </div>

              {/* Quick Prompts */}
              <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4 px-4">
                <p className="text-xs sm:text-sm md:text-base text-white/70 font-medium">Try a ready-made prompt:</p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {['Honeymoon Hotel', 'Compare Areas', '7-Day Itinerary', 'Family Budget Hotel'].map((prompt) => (
                    <Link
                      key={prompt}
                      to={`/touristas-ai/chat?prompt=${encodeURIComponent(prompt)}`}
                      className="inline-flex items-center justify-center h-9 rounded-md bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm text-xs sm:text-sm px-3 sm:px-4 font-semibold transition-all"
                    >
                      {prompt}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pt-8 sm:pt-12 md:pt-16 max-w-4xl mx-auto px-4">
                {[
                  { value: '10K+', label: 'Travelers Helped' },
                  { value: '&lt;30s', label: 'Response Time' },
                  { value: '1,000+', label: 'Hotels Analyzed' },
                  { value: '100%', label: 'Cyclades Focus' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20"
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-sifnos-beige mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 text-sm uppercase tracking-wide mb-8 font-semibold">
              Integrates With Leading Booking Platforms
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="w-40 h-16 flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className="text-gray-700 font-semibold">Booking.com</span>
              </div>
              <div className="w-40 h-16 flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <span className="text-gray-700 font-semibold">Agoda</span>
              </div>
              <div className="w-40 h-16 flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300">
                <img src="/touristas-ai-logo.svg" alt="Local Hotels" className="max-h-12 w-auto object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border font-semibold bg-primary text-white hover:bg-primary/80 mb-4 px-4 py-2 text-base">
                  <Play className="w-4 h-4 mr-2 inline" />
                  See It In Action
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Try The Live Demo</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Experience the power of specialized AI. Ask anything about Cyclades hotels, travel, or planning.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
                <div className="relative h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-sifnos-deep-blue/5 to-sifnos-beige/20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzFFMkU0OCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                  <img src="/touristas-ai-logo.svg" alt="Touristas AI" className="w-24 h-24 mb-6 drop-shadow-lg relative z-10" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">See Touristas AI In Action</h3>
                  <p className="text-gray-600 mb-8 max-w-md text-center relative z-10">
                    Click below to launch the live AI chat and ask anything about the Cyclades
                  </p>
                  <Link
                    to="/touristas-ai/chat"
                    className="inline-flex items-center justify-center gap-2 h-13 rounded-lg bg-sifnos-deep-blue hover:bg-sifnos-deep-blue/90 text-white px-12 py-6 text-lg font-bold shadow-xl relative z-10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Launch Live Demo
                  </Link>
                  <div className="mt-12 flex flex-wrap justify-center gap-6 relative z-10">
                    {['Try: "Best honeymoon hotels"', 'Try: "Compare Oia vs Fira"', 'Try: "7-day itinerary"'].map((suggestion) => (
                      <div
                        key={suggestion}
                        className="inline-flex items-center rounded-full border font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 text-sm"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  💡 <strong>Pro Tip:</strong> Use voice input by clicking the microphone icon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border font-semibold bg-primary text-white hover:bg-primary/80 mb-4 px-4 py-2 text-base">
                  Simple & Powerful
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">How Touristas AI Works</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Advanced AI technology meets deep local expertise in three simple steps
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    number: '1',
                    title: 'Ask Anything',
                    description: 'Type or speak your question in plain language. No forms, no filters, just natural conversation.',
                    gradient: 'from-sifnos-deep-blue to-primary'
                  },
                  {
                    number: '2',
                    title: 'AI Searches Everything',
                    description: 'Our AI searches Agoda, Booking.com, and local hotels simultaneously, analyzing 1,000+ properties in seconds.',
                    gradient: 'from-sifnos-turquoise to-accent'
                  },
                  {
                    number: '3',
                    title: 'Get Perfect Matches',
                    description: 'Receive personalized recommendations with live prices, booking links, and expert local insights.',
                    gradient: 'from-sifnos-beige to-secondary'
                  }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="text-center"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-sifnos-deep-blue to-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: <Users className="w-8 h-8 text-sifnos-beige" />, value: '10K+', label: 'Happy Travelers' },
                  { icon: <Database className="w-8 h-8 text-sifnos-beige" />, value: '1000+', label: 'Hotels Analyzed' },
                  { icon: <Zap className="w-8 h-8 text-sifnos-beige" />, value: '&lt;30s', label: 'Avg Response' },
                  { icon: <Award className="w-8 h-8 text-sifnos-beige" />, value: '4.9/5', label: 'User Rating' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      {stat.icon}
                      <div className="text-5xl font-black text-sifnos-beige ml-2">{stat.value}</div>
                    </div>
                    <p className="text-white/80 font-medium text-lg">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border font-semibold bg-primary text-white hover:bg-primary/80 mb-4 px-4 py-2 text-base">
                  Comparison
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Touristas AI is Better</h2>
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Generic AI knows a little about everywhere.<br className="hidden md:block" />
                  <span className="text-sifnos-deep-blue font-bold">Touristas AI knows EVERYTHING about the Cyclades.</span>
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-sifnos-deep-blue to-primary text-white">
                    <tr>
                      <th className="px-6 py-6 text-left font-bold text-lg">Feature</th>
                      <th className="px-6 py-6 text-center font-bold text-lg">
                        <div className="flex flex-col items-center gap-2">
                          <span>ChatGPT</span>
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-white/20 text-white text-xs">
                            Generic AI
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center font-bold text-lg">
                        <div className="flex flex-col items-center gap-2">
                          <span>Claude</span>
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-white/20 text-white text-xs">
                            Generic AI
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center font-bold text-lg">
                        <div className="flex flex-col items-center gap-2">
                          <span>Gemini</span>
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-white/20 text-white text-xs">
                            Generic AI
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center font-bold text-lg bg-sifnos-beige text-sifnos-deep-blue">
                        <div className="flex flex-col items-center gap-2">
                          <span>Touristas AI</span>
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-sifnos-deep-blue text-white text-xs">
                            Specialized
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feature: 'Cyclades Specialization', others: '❌', touristas: '✅ 100%' },
                      { feature: 'Real-Time Hotel Prices', others: '❌', touristas: '✅ Live Data' },
                      { feature: 'Multi-Source Hotel Search', others: '❌', touristas: '✅ 3 Sources' },
                      { feature: 'Direct Booking Links', others: '❌', touristas: '✅ Instant' },
                      { feature: 'Voice Input', others: 'Limited/❌', touristas: '✅ Full Support' },
                      { feature: 'Interactive Map Visualization', others: '❌', touristas: '✅ Live Maps' },
                      { feature: 'Itinerary Export (PDF/Calendar)', others: '❌', touristas: '✅ Yes' },
                      { feature: 'Local Expert Knowledge', others: 'Generic', touristas: '✅ Deep Local' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900">{row.feature}</td>
                        <td className="px-6 py-4 text-center text-red-500">{row.others}</td>
                        <td className="px-6 py-4 text-center text-red-500">{row.others}</td>
                        <td className="px-6 py-4 text-center text-red-500">{row.others}</td>
                        <td className="px-6 py-4 text-center bg-green-50">
                          <span className="text-green-600 font-bold">{row.touristas}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-16">
                <Link
                  to="/touristas-ai/chat"
                  className="inline-flex items-center justify-center gap-2 h-13 rounded-lg bg-sifnos-deep-blue hover:bg-sifnos-deep-blue/90 text-white px-12 py-7 text-xl font-bold shadow-2xl hover:shadow-sifnos-deep-blue/50 transition-all hover:-translate-y-1"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Try Touristas AI Free Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
                <p className="text-sm text-gray-600 mt-4">No registration • No credit card • Instant access</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border font-semibold bg-primary text-white hover:bg-primary/80 mb-4 px-4 py-2 text-base">
                  Powerful Features
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Everything You Need to Plan Your Perfect Trip</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Advanced AI technology meets local expertise to create the ultimate Cyclades travel companion
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg bg-white text-gray-900 shadow-sm border-2 hover:border-sifnos-deep-blue hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex flex-col space-y-1.5 p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold tracking-tight text-2xl">{feature.title}</h3>
                      <p className="text-gray-600 text-base">{feature.description}</p>
                    </div>
                    <div className="p-6 pt-0">
                      {feature.example && (
                        <p className="text-sm text-gray-500 italic">"{feature.example}"</p>
                      )}
                      {feature.badges && (
                        <div className="flex gap-2 flex-wrap">
                          {feature.badges.map((badge, j) => (
                            <div key={j} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {badge}
                            </div>
                          ))}
                        </div>
                      )}
                      {feature.highlights && (
                        <div className="space-y-1">
                          {feature.highlights.map((highlight, j) => (
                            <p key={j} className="text-sm text-green-600 font-semibold">{highlight}</p>
                          ))}
                        </div>
                      )}
                      {feature.note && (
                        <p className="text-sm text-gray-500">{feature.note}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border font-semibold bg-primary text-white hover:bg-primary/80 mb-4 px-4 py-2 text-base">
                  Trusted by Travelers
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Real Results from Real Travelers</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="rounded-lg bg-white text-gray-900 shadow-sm border-2 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col space-y-1.5 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-sifnos-beige flex items-center justify-center text-sifnos-deep-blue font-bold text-xl">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-sifnos-deep-blue transition-all shadow-lg"
                    open={openFaq === i}
                  >
                    <summary
                      className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-xl list-none"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFaq(i);
                      }}
                    >
                      <h3>{faq.question}</h3>
                      <span className="text-3xl text-sifnos-deep-blue group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-6 text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 border-y-2 border-green-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { icon: <TrendingUp className="w-6 h-6 text-green-600" />, value: '98%', label: 'Success Rate', sublabel: 'Travelers find their perfect hotel' },
                  { icon: <Clock className="w-6 h-6 text-green-600" />, value: '3min', label: 'Avg Search Time', sublabel: 'vs 3+ hours manually' },
                  { icon: <Award className="w-6 h-6 text-green-600" />, value: '€200+', label: 'Avg Savings', sublabel: 'Better deals with AI' }
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {metric.icon}
                      <div className="text-4xl font-black text-green-700">{metric.value}</div>
                    </div>
                    <p className="text-green-800 font-semibold">{metric.label}</p>
                    <p className="text-sm text-green-600 mt-1">{metric.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-gradient-to-br from-sifnos-deep-blue via-primary to-sifnos-deep-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-sifnos-beige rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sifnos-turquoise rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-sifnos-beige border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-sifnos-turquoise border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-sifnos-deep-blue border-2 border-white"></div>
                </div>
                <span className="text-sm font-semibold">Join 10,000+ happy travelers</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Ready to Plan Your<br />
                Perfect Cyclades Trip?
              </h2>

              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Stop wasting hours researching. Get personalized hotel recommendations in{' '}
                <span className="text-sifnos-beige font-bold">under 30 seconds</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link
                  to="/touristas-ai/chat"
                  className="inline-flex items-center justify-center gap-2 h-13 rounded-lg bg-sifnos-beige hover:bg-sifnos-beige/90 text-sifnos-deep-blue px-16 py-10 text-2xl font-black shadow-2xl hover:shadow-sifnos-beige/50 transition-all hover:-translate-y-2 hover:scale-105"
                >
                  <MessageCircle className="mr-3 h-8 w-8" />
                  Start Planning Now - Free
                  <ArrowRight className="ml-3 h-8 w-8" />
                </Link>
              </div>

              <div className="pt-12">
                <p className="text-sm text-white/60 uppercase tracking-wide mb-4 font-semibold">What You'll Get</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: <Shield className="w-10 h-10 text-sifnos-beige" />, label: 'No Registration' },
                    { icon: <Zap className="w-10 h-10 text-sifnos-beige" />, label: 'Instant Results' },
                    { icon: <Database className="w-10 h-10 text-sifnos-beige" />, label: 'Live Prices' },
                    { icon: <Brain className="w-10 h-10 text-sifnos-beige" />, label: 'Expert AI' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      {item.icon}
                      <span className="font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Module */}
      <TouristasAIChat />
    </>
  );
}
