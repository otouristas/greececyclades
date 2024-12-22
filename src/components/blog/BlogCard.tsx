import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/blog/${post.slug}`} className="block relative">
        <div className="aspect-w-16 aspect-h-9 w-full">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <Link 
          to={`/blog/${post.slug}`}
          className="block mb-3"
        >
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-medium">
            {post.category}
          </span>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
