import { useNavigate } from 'react-router-dom';
import { Ship, Calendar, Trash2, MapPin, Eye, Printer } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import { useAuthStore } from '../stores/authStore';
import SEO from '../components/SEO';
import { generateMyTripsSEO } from '../utils/seo';
import { useCallback } from 'react';
import type { TripPlan } from '../types/island';

export default function MyTrips() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getTripsByUserId, deleteTrip } = useTripStore();

  const trips: TripPlan[] = getTripsByUserId(user?.id || '');

  const handlePrint = useCallback((trip: TripPlan) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate the print content
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${trip.name}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #2563eb; }
            .section { margin-bottom: 20px; }
            .island { margin-bottom: 15px; padding: 10px; background: #f3f4f6; }
            .day { margin-left: 20px; }
          </style>
        </head>
        <body>
          <h1>${trip.name}</h1>
          <div class="section">
            <h2>Trip Details</h2>
            <p>Duration: ${trip.duration} days</p>
            <p>Month: ${trip.month}</p>
            <p>Pace: ${trip.pace}</p>
          </div>
          <div class="section">
            <h2>Islands</h2>
            ${trip.islands.map((island) => `
              <div class="island">
                <h3>${island.name}</h3>
                <p>${island.description}</p>
                ${island.highlights ? `
                  <h4>Highlights</h4>
                  <ul>
                    ${island.highlights.map((highlight) => `<li>${highlight}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2>AI Suggestions</h2>
            <p>${trip.aiSuggestions}</p>
          </div>
        </body>
      </html>
    `;

    // Write content and trigger print
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }, []);

  return (
    <>
      <SEO {...generateMyTripsSEO()} />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <button
              onClick={() => navigate('/trip-planner')}
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
                onClick={() => navigate('/trip-planner')}
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
                      <h3 className="font-semibold text-lg text-gray-900">
                        {trip.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(trip.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{trip.month}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{trip.duration} days</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Islands</h4>
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

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/trip/${trip.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handlePrint(trip)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                        </div>
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Trip"
                        >
                          <Trash2 className="w-4 h-4" />
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
    </>
  );
}
