import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';
import { TravelGuide } from '../../types';

interface TravelGuideCardProps {
  guide: TravelGuide;
}

export default function TravelGuideCard({ guide }: TravelGuideCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      <div className="relative aspect-video">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <User className="h-4 w-4" />
            <span>{guide.author}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4" />
            <span>{guide.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {guide.category}
          </span>
        </div>

        <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
          {guide.title}
        </h3>

        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {guide.description}
        </p>

        <button className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
          <BookOpen className="h-4 w-4" />
          <span>Read Guide</span>
        </button>
      </div>
    </div>
  );
}