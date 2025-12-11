import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/blog/BlogCard';
import SEO from '../components/SEO';
import { generateBlogsSEO } from '../utils/seo';
import { Search, Filter, Sparkles, ArrowRight, Mail, CheckCircle } from 'lucide-react';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Island Guides', 'Itineraries', 'Beaches', 'Travel Tips', 'Food & Wine', 'Activities'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts[0]; // First post is featured

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      <SEO {...generateBlogsSEO()} />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">

        {/* Hero Section */}
        <section className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your Cyclades Travel Resource
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Explore the <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Cyclades</span>
              </h1>

              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Insider tips, travel guides, and captivating stories about the magical Greek islands
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-dark-card">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 dark:text-white/70 mb-6 line-clamp-3">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-white/50">
                      <span>{featuredPost.readTime} min read</span>
                      <span>•</span>
                      <span>Updated {new Date(featuredPost.updatedAt || featuredPost.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white dark:bg-dark-card text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-white/50 text-lg">No articles found in this category.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Plan Your Trip?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Use our AI-powered trip planner to create your perfect Cyclades itinerary
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/touristas"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Try Touristas AI
                </Link>
                <Link
                  to="/islands"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Explore Islands
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                  <Mail className="w-4 h-4" />
                  Newsletter
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Get Insider Travel Tips
                </h3>
                <p className="text-gray-600 dark:text-white/70 mb-6">
                  Join 10,000+ travelers receiving exclusive guides, deals, and expert advice for your Cyclades adventure.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-medium">Thanks for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}

                <p className="text-xs text-gray-500 dark:text-white/40 mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>

              <div className="hidden md:block relative">
                <img
                  src="/images/islands/santorini/blue-domes.jpg"
                  alt="Santorini Blue Domes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-dark-card to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/guides"
              className="group p-6 bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Island Guides →
              </h4>
              <p className="text-gray-600 dark:text-white/60 text-sm">
                Complete guides for all 24 Cycladic islands
              </p>
            </Link>
            <Link
              to="/hotels"
              className="group p-6 bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Find Hotels →
              </h4>
              <p className="text-gray-600 dark:text-white/60 text-sm">
                2,000+ handpicked accommodations
              </p>
            </Link>
            <Link
              to="/ferry-tickets"
              className="group p-6 bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Ferry Tickets →
              </h4>
              <p className="text-gray-600 dark:text-white/60 text-sm">
                Book island hopping adventures
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
