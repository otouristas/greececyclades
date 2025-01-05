import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Ship, Calendar, Sun, Compass, Heart, Sparkles, Mountain, Music, Trees, Coffee, Home, Plane, MapPin } from 'lucide-react';
import { AvailableMonth, IslandVibe, Island, TripPlan, TripPreferences, IslandActivity, NewTripPlan } from '../types/island';
import { cyclades } from '../data/islandsData';
import { generateTripSuggestions } from '../utils/ai';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';
import SEO from '../components/SEO';
import StepCard from '../components/StepCard';
import WeatherCard from '../components/WeatherCard';
import { clsx } from 'clsx';
import { toast } from '../components/ui/toast';
import { Button } from '../components/ui/button';

const AVAILABLE_VIBES = [
  { value: IslandVibe.ROMANTIC, icon: Heart, label: 'Romantic Escapes' },
  { value: IslandVibe.LUXURY, icon: Sparkles, label: 'Luxury & Comfort' },
  { value: IslandVibe.ADVENTURE, icon: Mountain, label: 'Adventure & Sports' },
  { value: IslandVibe.PARTY, icon: Music, label: 'Nightlife & Party' },
  { value: IslandVibe.NATURAL, icon: Trees, label: 'Nature & Beaches' },
  { value: IslandVibe.LAID_BACK, icon: Coffee, label: 'Relaxation & Wellness' }
] as const;

export type TripPace = 'relaxed' | 'moderate' | 'active';

const PACE_DESCRIPTIONS = {
  relaxed: 'Take it slow, enjoy each location deeply',
  moderate: 'Balance between exploration and relaxation',
  active: 'Pack in as much as possible'
} as const;

const getDayActivities = (island: Island, day: number, pace: TripPace) => {
  const activities: { time: string; title: string; description: string }[] = [];
  const paceMultiplier = pace === 'relaxed' ? 3 : pace === 'moderate' ? 4 : 5;
  
  // Morning activities
  if (island.activities && island.activities.length > 0) {
    const activity = island.activities[(day + 0) % island.activities.length];
    if (typeof activity === 'string') {
      activities.push({
        time: '9:00 AM',
        title: activity,
        description: 'Start your day with this amazing activity'
      });
    }
  }

  // Beach time for sunny activities
  if (island.beaches && island.beaches.length > 0) {
    const beach = island.beaches[(day + 1) % island.beaches.length];
    activities.push({
      time: '11:00 AM',
      title: `Visit ${beach}`,
      description: 'Enjoy the crystal clear waters and beautiful scenery'
    });
  }

  // Lunch break
  activities.push({
    time: '2:00 PM',
    title: 'Traditional Greek Lunch',
    description: 'Experience authentic Greek cuisine at a local taverna'
  });

  // Afternoon activities
  if (island.activities && island.activities.length > 1) {
    const activity = island.activities[(day + 3) % island.activities.length];
    if (typeof activity === 'string') {
      activities.push({
        time: '4:00 PM',
        title: activity,
        description: 'Perfect activity for the afternoon'
      });
    }
  }

  // Must-see spots
  if (island.highlights && island.highlights.length > 0) {
    const spot = island.highlights[(day + 4) % island.highlights.length];
    activities.push({
      time: '6:00 PM',
      title: `Visit ${spot}`,
      description: 'A must-visit location on the island'
    });
  }

  // Evening activities
  if (pace !== 'relaxed') {
    activities.push({
      time: '8:00 PM',
      title: 'Sunset Viewing',
      description: 'Watch the beautiful Mediterranean sunset'
    });
  }

  // Return activities based on pace
  return activities.slice(0, paceMultiplier);
};

export default function CycladesTripPlanner() {
  const { user } = useAuthStore();
  const { addTrip } = useTripStore();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 7,
    month: AvailableMonth.JULY,
    vibes: [],
    pace: 'moderate'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState<Island[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const generateTrip = async () => {
    try {
      setIsGenerating(true);
      const recommendedIslands = cyclades
        .filter(island => 
          island.bestTime?.months?.includes(preferences.month)
        )
        .filter((island): island is Island => {
          return Boolean(island.id) && 
            Boolean(island.name) && 
            Boolean(island.description) && 
            Boolean(island.shortDescription) &&
            Boolean(island.image) &&
            Array.isArray(island.activities) &&
            Array.isArray(island.highlights) &&
            Array.isArray(island.vibes);
        });

      const suggestions = await generateTripSuggestions({
        islands: recommendedIslands.map(island => ({
          name: island.name,
          activities: island.activities || [],
          description: island.description,
          highlights: island.highlights,
          vibes: island.vibes.map(v => v.toString())
        })),
        duration: preferences.duration,
        month: preferences.month,
        vibes: preferences.vibes,
        pace: preferences.pace
      });

      const selectedIslands = recommendedIslands.filter(island => 
        suggestions.selectedIslands.includes(island.name)
      );

      setGeneratedPlan(selectedIslands);
      setAiSuggestions(suggestions.explanation);
      setCurrentStep(5);

      if (user) {
        const tripPlan: NewTripPlan = {
          islands: selectedIslands,
          duration: preferences.duration,
          month: preferences.month,
          vibes: preferences.vibes,
          pace: preferences.pace,
          aiSuggestions: suggestions.explanation,
          userId: user.id,
          createdAt: new Date(),
          name: `${selectedIslands.map(i => i.name).join(' → ')} Trip`
        };
        await addTrip(tripPlan);
        toast({
          title: "Trip Saved!",
          description: "Your trip has been saved to My Trips.",
          action: (
            <Button variant="outline" size="sm" onClick={() => navigate('/my-trips')}>
              View My Trips
            </Button>
          ),
        });
      } else {
        toast({
          title: "Sign in required",
          description: "Please sign in to save your trip.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating trip:', error);
      toast({
        title: "Error",
        description: "Failed to generate trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    {
      title: 'When are you traveling?',
      description: 'Choose your preferred month',
      icon: Calendar,
      content: (
        <select
          value={preferences.month}
          onChange={(e) => {
            setPreferences({ ...preferences, month: e.target.value as AvailableMonth });
            setCurrentStep(2);
          }}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.values(AvailableMonth).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      )
    },
    {
      title: 'How long is your trip?',
      description: 'Select your trip duration',
      icon: Ship,
      content: (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[5, 7, 10, 14, 21].map((days) => (
            <button
              key={days}
              onClick={() => {
                setPreferences({ ...preferences, duration: days });
                setCurrentStep(3);
              }}
              className={clsx(
                'rounded-lg px-4 py-3 text-center transition-all',
                preferences.duration === days
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              )}
            >
              <div className="font-medium">{days} days</div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "What's your vibe?",
      description: 'Select up to 3 experiences you want',
      icon: Sun,
      content: (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {AVAILABLE_VIBES.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => {
                  const newVibes = preferences.vibes.includes(value)
                    ? preferences.vibes.filter(v => v !== value)
                    : preferences.vibes.length < 3
                    ? [...preferences.vibes, value]
                    : preferences.vibes;
                  setPreferences({ ...preferences, vibes: newVibes });
                }}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-4 py-3 transition-all',
                  preferences.vibes.includes(value)
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
          {preferences.vibes.length > 0 && (
            <button
              onClick={() => setCurrentStep(4)}
              className="ml-auto flex items-center text-blue-600 hover:text-blue-800"
            >
              Next Step
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      )
    },
    {
      title: 'Travel Pace',
      description: 'How do you want to experience the islands?',
      icon: Compass,
      content: (
        <div className="space-y-3">
          {(['relaxed', 'moderate', 'active'] as TripPace[]).map((pace) => (
            <button
              key={pace}
              onClick={() => setPreferences({ ...preferences, pace })}
              className={clsx(
                'w-full rounded-lg px-4 py-3 text-left transition-all',
                preferences.pace === pace
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              )}
            >
              <div className="font-medium capitalize">{pace}</div>
              <div className="text-sm opacity-80">{PACE_DESCRIPTIONS[pace]}</div>
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-16">
      <SEO 
        title="Plan Your Greek Islands Trip | Greece Cyclades"
        description="Create your perfect Greek Islands itinerary with our AI-powered trip planner."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Design Your Perfect Island Adventure
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Tell us your preferences, and we'll craft your ideal Greek island hopping experience
          </p>
        </div>

        {currentStep < 5 ? (
          <div className="mx-auto max-w-3xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
                <div
                  className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-blue-500 transition-all"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        index + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      )}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StepCard
                icon={steps[currentStep - 1].icon}
                title={steps[currentStep - 1].title}
                description={steps[currentStep - 1].description}
                step={currentStep}
                currentStep={currentStep}
              >
                {steps[currentStep - 1].content}
              </StepCard>
            </motion.div>

            {/* Generate Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={generateTrip}
                disabled={
                  isGenerating ||
                  !preferences.month ||
                  !preferences.duration ||
                  preferences.vibes.length === 0 ||
                  !preferences.pace
                }
                className={clsx(
                  'group relative flex items-center overflow-hidden rounded-lg bg-gradient-to-r px-8 py-4 text-lg font-medium text-white shadow-lg transition-all',
                  isGenerating
                    ? 'from-gray-400 to-gray-500 cursor-not-allowed'
                    : 'from-blue-500 to-indigo-600 hover:translate-y-[-2px]'
                )}
              >
                <span className="relative z-10">
                  {isGenerating ? 'Generating Your Trip...' : 'Generate Your Perfect Trip'}
                </span>
                <ChevronRight className="ml-2 h-6 w-6" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-transform group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview Section */}
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
                  Your {preferences.duration}-Day Island Adventure
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open('https://www.ferryhopper.com/en/', '_blank')}
                    className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                  >
                    <Ship className="mr-1.5 h-4 w-4" />
                    Ferries
                  </button>
                  <button
                    onClick={() => window.open('https://www.booking.com', '_blank')}
                    className="inline-flex items-center rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100"
                  >
                    <Home className="mr-1.5 h-4 w-4" />
                    Hotels
                  </button>
                  <button
                    onClick={() => window.open('https://www.skyscanner.com', '_blank')}
                    className="inline-flex items-center rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100"
                  >
                    <Plane className="mr-1.5 h-4 w-4" />
                    Flights
                  </button>
                </div>
              </div>

              {/* Trip Summary Tabs */}
              <div className="mb-4">
                <div className="flex space-x-4 border-b">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === 'details'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Day by Day
                  </button>
                </div>
              </div>

              {/* Trip Summary Content */}
              {activeTab === 'overview' ? (
                <div className="prose prose-sm max-w-none">
                  {aiSuggestions.split('\n\n').map((paragraph, index) => {
                    // Process text to add internal links and formatting
                    const processedText = paragraph.replace(
                      /\b(Santorini|Mykonos|Naxos|Milos|Paros|Ios|Folegandros|Sifnos|Serifos|Syros|Tinos|Andros|Kea|Kythnos)\b/g,
                      (match) => `<strong>${match}</strong>`
                    ).replace(
                      /(beaches|hiking|wineries|sunset spots|archaeological sites|traditional villages|water sports|snorkeling|diving|boat tours)/gi,
                      (match) => `<em>${match}</em>`
                    );

                    return (
                      <div
                        key={index}
                        className="text-sm text-gray-600 mb-2"
                        dangerouslySetInnerHTML={{ __html: processedText }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Day by Day Itinerary */}
                  {generatedPlan.map((island, islandIndex) => {
                    const daysPerIsland = Math.ceil(preferences.duration / generatedPlan.length);
                    const startDay = islandIndex * daysPerIsland + 1;
                    const endDay = Math.min((islandIndex + 1) * daysPerIsland, preferences.duration);

                    return (
                      <div key={island.id} className="rounded-lg bg-gray-50 p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {island.name || 'Unknown Island'} ({startDay === endDay ? `Day ${startDay}` : `Days ${startDay}-${endDay}`})
                        </h3>
                        <div className="space-y-4">
                          {Array.from({ length: endDay - startDay + 1 }).map((_, dayIndex) => {
                            const currentDay = startDay + dayIndex;
                            const dayActivities = getDayActivities(island, currentDay, preferences.pace);

                            return (
                              <div key={currentDay} className="border-l-2 border-blue-200 pl-4">
                                <h4 className="text-sm font-medium text-blue-900 mb-2">Day {currentDay}</h4>
                                <div className="space-y-2">
                                  {dayActivities.map((activity, actIndex) => (
                                    <div
                                      key={actIndex}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-600">
                                        {actIndex + 1}
                                      </span>
                                      <div>
                                        <p className="text-sm text-gray-600">{activity.time}</p>
                                        <p className="text-sm font-medium text-gray-900">
                                          {activity.title}
                                        </p>
                                        {activity.description && (
                                          <p className="text-xs text-gray-500 mt-1">
                                            {activity.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Island Cards - More Compact */}
            <div className="grid gap-6">
              {generatedPlan.map((island) => (
                <div key={island.id} className="overflow-hidden rounded-xl bg-white shadow-lg">
                  <div className="grid md:grid-cols-3">
                    {/* Image Section */}
                    <div className="relative h-48 md:h-full">
                      <img
                        src={island.image}
                        alt={island.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="absolute bottom-0 p-4">
                          <h3 className="text-xl font-bold text-white">{island.name || 'Unknown Island'}</h3>
                          <p className="text-sm text-gray-300">
                            {Math.ceil(preferences.duration / generatedPlan.length)} Days
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="col-span-2 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Left Column */}
                        <div>
                          {/* Weather */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Weather & Activities</h4>
                            {island.weather && (
                              <div className="mt-4">
                                <WeatherCard
                                  weather={island.weather}
                                  activities={island.activities || []}
                                  compact
                                />
                              </div>
                            )}
                          </div>

                          {/* Must-See Spots */}
                          {island.highlights && island.highlights.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Must-See Spots</h4>
                              <ul className="space-y-1">
                                {island.highlights.slice(0, 3).map((spot) => (
                                  <li key={spot} className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1.5 h-3 w-3 text-gray-400" />
                                    {spot}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Right Column */}
                        <div>
                          {/* Island Description */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">About {island.name || 'Unknown Island'}</h4>
                            <p className="text-sm text-gray-600 line-clamp-4">
                              {island.description}
                            </p>
                          </div>

                          {/* Island Vibes */}
                          <div className="flex flex-wrap gap-1.5">
                            {island.vibes?.slice(0, 3).map((vibe) => (
                              <span
                                key={vibe}
                                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                              >
                                {vibe.toLowerCase().replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-4 flex gap-2 border-t pt-4">
                        <button
                          onClick={() => window.open(`https://www.booking.com/searchresults.html?ss=${island.name}+Greece`, '_blank')}
                          className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          <Home className="mr-1.5 h-3 w-3" />
                          Book Hotel
                        </button>
                        <button
                          onClick={() => window.open(`https://www.ferryhopper.com/en/search?from=&to=${island.name.toLowerCase()}`, '_blank')}
                          className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          <Ship className="mr-1.5 h-3 w-3" />
                          Check Ferries
                        </button>
                        <button
                          onClick={() => navigate('/nearby', {
                            state: {
                              lat: island.coordinates?.lat,
                              lon: island.coordinates?.lng,
                              name: island.name
                            }
                          })}
                          className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          <MapPin className="mr-1.5 h-3 w-3" />
                          Nearby Places
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setGeneratedPlan([]);
                  setAiSuggestions('');
                }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Start Over
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                Save Itinerary
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
