import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import activities from '../data/activitiesData';
import { Activity } from '../types/activity';
import { Clock, MapPin, Users, Calendar, AlertCircle, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  const activity = activities.find((a: Activity) => a.id === id);
  const defaultImage = '/images/activities/activities-hero.jpg';

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Not Found</h2>
          <button
            onClick={() => navigate('/activities')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const mainImage = imageError || !activity.images?.main ? defaultImage : activity.images.main;

  return (
    <>
      <SEO 
        title={`${activity.title} | Activities in ${activity.location}`}
        description={activity.description.slice(0, 160)}
      />
      
      {/* Content */}
      <div className="min-h-screen bg-gray-50">
        {/* Image Gallery */}
        <div className="relative h-[60vh]">
          <img
            src={mainImage}
            alt={activity.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{activity.title}</h1>
              <p className="text-xl md:text-2xl">{activity.location}, {activity.island}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
              <Clock className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{activity.duration}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Group Size</p>
                <p className="font-semibold">Max {activity.maxGroupSize} people</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{activity.location}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="font-semibold">{activity.availableSeasons?.join(', ') || 'Year-round'}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">About This Activity</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{activity.description}</p>
          </div>

          {/* Highlights */}
          {activity.highlights && activity.highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activity.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-6">What's Included</h2>
              <div className="space-y-3">
                {activity.included.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {activity.notIncluded && activity.notIncluded.length > 0 && (
              <div>
                <h2 className="text-3xl font-semibold mb-6">Not Included</h2>
                <div className="space-y-3">
                  {activity.notIncluded.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Requirements */}
            {activity.requirements && activity.requirements.length > 0 && (
              <div>
                <h2 className="text-3xl font-semibold mb-6">Requirements</h2>
                <div className="space-y-3">
                  {activity.requirements.map((req, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{req}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Point */}
            <div>
              <h2 className="text-3xl font-semibold mb-6">Meeting Point</h2>
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{activity.meetingPoint}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Book Now</h2>
              <div>
                <p className="text-sm text-gray-600">Price per person</p>
                <p className="text-3xl font-bold text-blue-600">{activity.price.display}</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
