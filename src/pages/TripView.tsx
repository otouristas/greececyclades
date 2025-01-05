import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Printer } from 'lucide-react';
import { useTripStore } from '../store/tripStore';
import SEO from '../components/SEO';
import WeatherCard from '../components/WeatherCard';
import { useCallback } from 'react';
import type { TripPlan, Island } from '../types/island';

export default function TripView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTrip } = useTripStore();

  const trip = getTrip(id || '') || null;

  const generatePrintContent = useCallback((trip: TripPlan) => {
    const content = `
      <html>
        <head>
          <title>${trip.name || 'Trip Itinerary'}</title>
          <style>
            body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 2rem; }
            .island { margin-bottom: 2rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
            h3 { color: #111827; margin-bottom: 0.5rem; }
            p { color: #4b5563; margin-bottom: 1rem; }
            h4 { color: #111827; margin-bottom: 0.5rem; }
            ul { margin: 0; padding-left: 1.5rem; }
            li { color: #4b5563; margin-bottom: 0.25rem; }
          </style>
        </head>
        <body>
          <h1>${trip.name || 'Trip Itinerary'}</h1>
          <div>Duration: ${trip.duration} days</div>
          <div>Month: ${trip.month}</div>
          <div>Pace: ${trip.pace}</div>
          ${trip.aiSuggestions ? `<div class="suggestions">${trip.aiSuggestions}</div>` : ''}
          <h2>Islands</h2>
          ${trip.islands.map(island => `
            <div class="island">
              <h3>${island.name}</h3>
              <p>${island.description}</p>
              <h4>Must-See Highlights</h4>
              <ul>
                ${island.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </body>
      </html>
    `;
    return content;
  }, []);

  const handlePrint = useCallback(() => {
    if (!trip) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate the print content
    const content = generatePrintContent(trip);

    // Write content and trigger print
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }, [trip, generatePrintContent]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h1>
            <button
              onClick={() => navigate('/my-trips')}
              className="text-blue-600 hover:text-blue-700"
            >
              Back to My Trips
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={trip.name}
        description={`View details for your trip to ${trip.islands.map(i => i.name).join(', ')}`}
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/my-trips')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{trip.name}</h1>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Itinerary
            </button>
          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{trip.month}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{trip.duration} days</span>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="prose prose-blue max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">Trip Overview</h2>
                <div className="text-gray-600 whitespace-pre-wrap">
                  {trip.aiSuggestions}
                </div>
              </div>

              {/* Islands */}
              <div className="space-y-8">
                <h2 className="text-xl font-semibold">Islands</h2>
                {trip.islands.map((island: Island) => (
                  <div key={island.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {island.name}
                        </h3>
                        <p className="text-gray-600">{island.description}</p>
                      </div>
                      {island.weather && (
                        <div className="ml-4">
                          <WeatherCard 
                            weather={island.weather}
                            activities={island.activities || []}
                          />
                        </div>
                      )}
                    </div>

                    {/* Highlights */}
                    {island.highlights.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Must-See Highlights</h4>
                        <ul className="space-y-2">
                          {island.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
