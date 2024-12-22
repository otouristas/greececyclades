import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User, Tag } from 'lucide-react';

interface BlogContentProps {
  content: {
    title: string;
    date: string;
    author: string;
    authorRole: string;
    readTime: string;
    tags: string[];
    featuredImage: string;
    body: string;
  };
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Featured Image */}
      <div className="relative h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden">
        <img
          src={content.featuredImage}
          alt={content.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={content.date}>
              {new Date(content.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{content.readTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{content.author}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {content.tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blog/tags/${tag.toLowerCase()}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Author Info */}
      <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl mb-8">
        <div className="flex-shrink-0">
          <img
            src={`/images/authors/${content.author.toLowerCase().replace(' ', '-')}.jpg`}
            alt={content.author}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{content.author}</h3>
          <p className="text-sm text-gray-600">{content.authorRole}</p>
        </div>
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.body }}
      />

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Share this article:</span>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save for Later
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
          </button>
        </div>
      </footer>
    </article>
  );
};

export default BlogContent;
