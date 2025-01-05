import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function Reviews({ reviews, averageRating, totalReviews, ratingBreakdown }: ReviewsProps) {
  const calculatePercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>

        {/* Overall Rating */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="text-4xl font-bold text-gray-900 mr-4">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-600 mt-1">{totalReviews} reviews</div>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-3 mb-8">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="w-12 text-gray-600">{rating} stars</div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${calculatePercentage(ratingBreakdown[rating as keyof typeof ratingBreakdown])}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-gray-600">
                {ratingBreakdown[rating as keyof typeof ratingBreakdown]}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-t pt-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-gray-900">{review.userName}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-3">{review.comment}</p>
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
