import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Sparkles, Compass, Calendar, Ship, Moon, Waves, Sun } from 'lucide-react';
import { generateTripSuggestions } from '../utils/ai';
import { useTripStore } from '../store/tripStore';
import { useAuthStore } from '../store/authStore';
import { generateTripPlannerSEO, generateTripPlannerJsonLD } from '../utils/seo';

interface Island {
  id: string;
  name: string;
  description: string;
  activities: string[];
  bestMonths: string[];
  averageStay: number;
  mustSee: string[];
  image: string;
  vibes: string[];
}

const islands: Island[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Famous for its dramatic views, stunning sunsets, and volcanic beaches',
    activities: ['Wine Tasting', 'Sunset Watching', 'Volcano Tour', 'Beach Hopping'],
    bestMonths: ['May', 'June', 'September', 'October'],
    averageStay: 3,
    mustSee: ['Oia Sunset', 'Red Beach', 'Ancient Akrotiri', 'Amoudi Bay'],
    image: 'https://source.unsplash.com/800x600/?santorini',
    vibes: ['Romantic', 'Luxury', 'Scenic', 'Cultural']
  },
  {
    id: 'mykonos',
    name: 'Mykonos',
    description: 'Known for its vibrant nightlife, beautiful beaches, and iconic windmills',
    activities: ['Beach Parties', 'Windmill Tours', 'Shopping', 'Water Sports'],
    bestMonths: ['June', 'July', 'August', 'September'],
    averageStay: 4,
    mustSee: ['Little Venice', 'Paradise Beach', 'Windmills', 'Delos Island'],
    image: 'https://source.unsplash.com/800x600/?mykonos',
    vibes: ['Party', 'Trendy', 'Beach Life', 'Cosmopolitan']
  },
  {
    id: 'naxos',
    name: 'Naxos',
    description: 'The largest Cycladic island with beautiful beaches and ancient ruins',
    activities: ['Hiking', 'Kitesurfing', 'Archaeological Sites', 'Local Cuisine'],
    bestMonths: ['May', 'June', 'September', 'October'],
    averageStay: 3,
    mustSee: ['Portara', 'Temple of Demeter', 'Mount Zeus', 'Plaka Beach'],
    image: 'https://source.unsplash.com/800x600/?naxos,greece',
    vibes: ['Authentic', 'Adventure', 'Family-friendly', 'Relaxed']
  },
  {
    id: 'milos',
    name: 'Milos',
    description: 'Famous for its unique lunar landscape and colorful beaches',
    activities: ['Beach Exploration', 'Boat Tours', 'Photography', 'Swimming'],
    bestMonths: ['May', 'June', 'September'],
    averageStay: 3,
    mustSee: ['Sarakiniko Beach', 'Kleftiko', 'Catacombs', 'Plaka Village'],
    image: 'https://source.unsplash.com/800x600/?milos,greece',
    vibes: ['Natural Beauty', 'Photography', 'Off-beat', 'Peaceful']
  }
];

interface TripPreferences {
  duration: number;
  month: string;
  vibes: string[];
  pace: 'relaxed' | 'moderate' | 'active';
}

export default function CycladesTripPlanner() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addTrip } = useTripStore();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 7,
    month: '',
    vibes: [],
    pace: 'moderate'
  });
  const [generatedPlan, setGeneratedPlan] = useState<Island[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const months = [
    'May', 'June', 'July', 'August', 'September', 'October'
  ];

  const allVibes = Array.from(
    new Set(islands.flatMap(island => island.vibes))
  );

  const generateTrip = async () => {
    setIsGenerating(true);
    // Filter islands based on preferences
    let recommendedIslands = [...islands];
    
    // Filter by month
    recommendedIslands = recommendedIslands.filter(
      island => island.bestMonths.includes(preferences.month)
    );

    // Filter by vibes
    if (preferences.vibes.length > 0) {
      recommendedIslands = recommendedIslands.filter(
        island => preferences.vibes.some(vibe => island.vibes.includes(vibe))
      );
    }

    // Sort islands by best match
    recommendedIslands.sort((a, b) => {
      const aVibesMatch = preferences.vibes.filter(vibe => a.vibes.includes(vibe)).length;
      const bVibesMatch = preferences.vibes.filter(vibe => b.vibes.includes(vibe)).length;
      return bVibesMatch - aVibesMatch;
    });

    // Adjust number of islands based on duration and pace
    let totalIslands = Math.floor(preferences.duration / 3);
    if (preferences.pace === 'relaxed') totalIslands = Math.max(2, totalIslands - 1);
    if (preferences.pace === 'active') totalIslands = Math.min(islands.length, totalIslands + 1);

    const selectedIslands = recommendedIslands.slice(0, totalIslands);
    setGeneratedPlan(selectedIslands);

    // Generate AI suggestions
    try {
      setIsGenerating(true);
      const suggestions = await generateTripSuggestions({
        islands: selectedIslands,
        duration: preferences.duration,
        month: preferences.month,
      });
      if (suggestions && suggestions.trim()) {
        setAiSuggestions(suggestions);
      } else {
        throw new Error('No suggestions generated');
      }
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      setAiSuggestions(
        `We're experiencing high demand right now. Here's a suggested itinerary for your ${preferences.duration}-day trip:\n\n` +
        selectedIslands.map((island, index) => 
          `Day ${index * 2 + 1}-${index * 2 + 2}: ${island.name}\n` +
          `• Must see: ${island.mustSee.slice(0, 2).join(', ')}\n` +
          `• Activities: ${island.activities.slice(0, 2).join(', ')}\n`
        ).join('\n')
      );
    } finally {
      setIsGenerating(false);
      setStep(4);
    }
  };

  const handleSaveTrip = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    addTrip({
      islands: generatedPlan,
      duration: preferences.duration,
      month: preferences.month,
      aiSuggestions,
      userId: user.id,
    });

    navigate('/my-trips');
  };

  const seoData = generateTripPlannerSEO();
  const structuredData = generateTripPlannerJsonLD();

  return (
    <>
      <SEO {...seoData} structuredData={structuredData} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-500" />
              Magic Trip Adventure
            </h1>
            <p className="text-gray-600">Let's create your perfect Cyclades island-hopping experience</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s === step
                    ? 'bg-blue-500 text-white'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Step 1: Duration */}
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                How long is your trip?
              </h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min="5"
                  max="14"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-2xl font-semibold text-blue-600">
                  {preferences.duration} days
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Month */}
          {step === 2 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sun className="w-6 h-6 text-blue-500" />
                When are you planning to visit?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setPreferences({ ...preferences, month });
                      setStep(3);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      preferences.month === month
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Vibes */}
          {step === 3 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Waves className="w-6 h-6 text-blue-500" />
                What vibes are you looking for?
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allVibes.map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => {
                        const newVibes = preferences.vibes.includes(vibe)
                          ? preferences.vibes.filter((v) => v !== vibe)
                          : [...preferences.vibes, vibe];
                        setPreferences({ ...preferences, vibes: newVibes });
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        preferences.vibes.includes(vibe)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Travel Pace:</h3>
                  <div className="flex gap-3">
                    {['relaxed', 'moderate', 'active'].map((pace) => (
                      <button
                        key={pace}
                        onClick={() => setPreferences({ ...preferences, pace: pace as any })}
                        className={`flex-1 p-3 rounded-lg border-2 capitalize ${
                          preferences.pace === pace
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        {pace}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={generateTrip}
                  disabled={preferences.vibes.length === 0}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate My Trip
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Plan */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-blue-500" />
                  Your Perfect Island-Hopping Adventure
                </h2>
                <div className="text-gray-600 mb-4">
                  Based on your preferences, we've crafted a {preferences.duration}-day journey through
                  the most suitable islands for your {preferences.month} trip.
                </div>

                {/* AI Suggestions */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium text-blue-900">AI Travel Expert Suggestions</h3>
                  </div>
                  {isGenerating ? (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-blue-600"></div>
                      Generating personalized suggestions...
                    </div>
                  ) : (
                    <div className="text-blue-800 whitespace-pre-line">
                      {aiSuggestions}
                    </div>
                  )}
                </div>
              </div>

              {generatedPlan.map((island, index) => (
                <div key={island.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={island.image}
                        alt={island.name}
                        className="h-48 w-full object-cover md:h-full"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-2 mb-2">
                        <Ship className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-blue-500">Stop {index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{island.name}</h3>
                      <p className="text-gray-600 mb-4">{island.description}</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-1">Must-See Spots:</h4>
                          <div className="flex flex-wrap gap-2">
                            {island.mustSee.map((spot) => (
                              <span
                                key={spot}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                              >
                                {spot}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Activities:</h4>
                          <div className="flex flex-wrap gap-2">
                            {island.activities.map((activity) => (
                              <span
                                key={activity}
                                className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Moon className="w-4 h-4" />
                          <span>Recommended stay: {island.averageStay} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-gray-50 transition-colors border border-blue-500"
                >
                  Start Over
                </button>
                <button
                  onClick={handleSaveTrip}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save This Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
