import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ship, Calendar, Trash2, MapPin } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import { useAuthStore } from '../store/authStore';

export default function MyTrips() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getTripsByUserId, deleteTrip } = useTripStore();

  const trips = getTripsByUserId(user?.id || '');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <button
            onClick={() => navigate('/cycladestripplanner')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Plan New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <Ship className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No trips planned yet</h3>
            <p className="text-gray-500 mb-4">
              Start planning your perfect Cyclades island-hopping adventure!
            </p>
            <button
              onClick={() => navigate('/cycladestripplanner')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{trip.month}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Islands</h3>
                      <div className="flex flex-wrap gap-2">
                        {trip.islands.map((island) => (
                          <span
                            key={island.id}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {island.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-gray-600">
                      <h3 className="font-medium text-gray-900 mb-2">AI Suggestions</h3>
                      <p className="text-sm">{trip.aiSuggestions}</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.duration} days</span>
                      </div>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
