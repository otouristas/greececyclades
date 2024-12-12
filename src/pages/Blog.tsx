import React from 'react';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/blog/BlogCard';
import SEO from '../components/SEO';
import { generateBlogsSEO } from '../utils/seo';

export default function Blog() {
  return (
    <>
      <SEO {...generateBlogsSEO()} />
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Greece Cyclades Travel Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the best travel tips, guides, and stories about the Cyclades islands
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
