import React from 'react';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/blog/BlogCard';
import SEO from '../components/SEO';
import { generateBlogsSEO } from '../utils/seo';

export default function Blog() {
  return (
    <>
      <SEO {...generateBlogsSEO()} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero section with background image */}
        <div className="relative pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 to-blue-800/90 mix-blend-multiply" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore the Cyclades
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Discover insider tips, travel guides, and captivating stories about the magical Cyclades islands
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Travel Tips', 'Island Life', 'Culture', 'Food & Wine'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow
                          text-gray-700 hover:text-blue-600 font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest travel tips and insights about the Cyclades islands directly in your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
