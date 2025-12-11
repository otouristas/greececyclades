import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const isNew = new Date(post.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Within 30 days

  return (
    <article className="group bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-white/10">
      <Link to={`/blog/${post.slug}`} className="block relative">
        <div className="aspect-w-16 aspect-h-9 w-full h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={`${post.title} - Cyclades Travel Blog`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow-lg">
              New
            </span>
          )}
          {post.readTime >= 15 && (
            <span className="px-2.5 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          )}
        </div>
      </Link>

      <div className="p-6">
        {/* Meta info */}
        <div className="flex items-center text-sm text-gray-500 dark:text-white/50 mb-3 gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/blog/${post.slug}`}
          className="block mb-3"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-gray-600 dark:text-white/60 mb-4 line-clamp-2 text-sm">
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
          <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-3 py-1 text-xs font-semibold">
            {post.category}
          </span>

          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium group/link"
          >
            Read more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tags Preview */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 dark:text-white/40 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-white/30">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
