import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium">{review.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="mt-3 text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}