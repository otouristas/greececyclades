import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activities, Activity } from '../data/activitiesData';
import { Clock, MapPin, Users, Calendar, AlertCircle, Check, ChevronLeft } from 'lucide-react';

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activity = activities.find((a) => a.slug === slug);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Not Found</h2>
          <button
            onClick={() => navigate('/activities')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Activities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-[60vh]">
        <img
          src={activity.images.main}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <button
          onClick={() => navigate('/activities')}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Activities
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{activity.location}, {activity.island}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{activity.minParticipants}-{activity.maxParticipants} people</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-line">{activity.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                <ul className="space-y-2">
                  {activity.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Not Included</h2>
                <ul className="space-y-2">
                  {activity.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {activity.requirements && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {activity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Image Gallery */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activity.images.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${activity.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  {activity.price.display}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Best Time</div>
                      <div className="text-sm text-gray-600">{activity.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-gray-600">{activity.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Meeting Point</div>
                      <div className="text-sm text-gray-600">{activity.meetingPoint}</div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Book Now
                </button>

                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Booking Notice:</strong> {activity.bookingNotice}
                  </p>
                  <p>
                    <strong>Cancellation Policy:</strong> {activity.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}
