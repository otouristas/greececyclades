import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/blog/${post.slug}`}>
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        <Link 
          to={`/blog/${post.slug}`}
          className="block mb-2 text-xl font-semibold text-gray-900 hover:text-blue-600"
        >
          {post.title}
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
}
