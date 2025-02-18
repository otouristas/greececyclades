import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Ship, Calendar, Sun, Compass, Heart, Sparkles, Mountain, Music, Trees, Coffee, Home, Plane, MapPin } from 'lucide-react';
import { AvailableMonth, IslandVibe, Island, TripPlan, TripPreferences, IslandActivity, NewTripPlan } from '../types/island';
import { cyclades } from '../data/islandsData';
import { generateTripSuggestions } from '../utils/ai';
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

      const tripPlan: NewTripPlan = {
        islands: selectedIslands,
        duration: preferences.duration,
        month: preferences.month,
        vibes: preferences.vibes,
        pace: preferences.pace,
        aiSuggestions: suggestions.explanation,
        userId: 'guest',
        createdAt: new Date(),
        name: `${selectedIslands.map(i => i.name).join(' → ')} Trip`
      };

      await addTrip(tripPlan);
      toast({
        title: "Trip Created!",
        description: "Your trip has been generated successfully.",
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate('/my-trips')}>
            View My Trips
          </Button>
        ),
      });
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
              <div className="text-sm text-gray-500">{PACE_DESCRIPTIONS[pace]}</div>
            </button>
          ))}
          <button
            onClick={generateTrip}
            disabled={isGenerating}
            className={clsx(
              'ml-auto flex items-center rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-all hover:bg-blue-600',
              isGenerating && 'cursor-not-allowed opacity-50'
            )}
          >
            {isGenerating ? 'Generating...' : 'Generate Trip'}
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <SEO
        title="Plan Your Cyclades Trip - Greece Travel Planner"
        description="Create your perfect Greek island-hopping adventure in the Cyclades. Choose your dates, preferences, and let us plan your dream trip."
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Cyclades Adventure</h1>
            <p className="text-gray-600 mb-8">
              Answer a few questions and we'll create a personalized island-hopping itinerary for you.
            </p>

            {currentStep <= 4 ? (
              <div className="space-y-8">
                {steps.slice(0, currentStep).map((step, index) => (
                  <StepCard
                    key={index}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isActive={index === currentStep - 1}
                  >
                    {index === currentStep - 1 && step.content}
                  </StepCard>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={clsx(
                        'px-4 py-2 rounded-lg font-medium transition-colors',
                        activeTab === 'overview'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('itinerary')}
                      className={clsx(
                        'px-4 py-2 rounded-lg font-medium transition-colors',
                        activeTab === 'itinerary'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      Itinerary
                    </button>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Start Over
                  </button>
                </div>

                {activeTab === 'overview' ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-gray-600">Duration</div>
                          <div className="font-medium">{preferences.duration} days</div>
                        </div>
                        <div>
                          <div className="text-gray-600">When</div>
                          <div className="font-medium">{preferences.month}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Vibes</div>
                          <div className="flex flex-wrap gap-2">
                            {preferences.vibes.map((vibe) => (
                              <span
                                key={vibe}
                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                              >
                                {vibe}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Pace</div>
                          <div className="font-medium capitalize">{preferences.pace}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
                      <p className="text-gray-600 whitespace-pre-line">{aiSuggestions}</p>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Selected Islands</h2>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {generatedPlan.map((island) => (
                          <div
                            key={island.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                          >
                            <div
                              className="h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url(${island.image})` }}
                            />
                            <div className="p-6">
                              <h3 className="font-semibold text-lg mb-2">{island.name}</h3>
                              <p className="text-gray-600 text-sm mb-4">
                                {island.shortDescription}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {island.vibes.map((vibe) => (
                                  <span
                                    key={vibe}
                                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                                  >
                                    {vibe}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {generatedPlan.map((island, islandIndex) => (
                      <div key={island.id} className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                          {islandIndex + 1}. {island.name}
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <h3 className="font-medium mb-2">Weather</h3>
                            <WeatherCard weather={island.weather} />
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Must See</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {island.mustSee?.map((spot) => (
                                <li key={spot}>{spot}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Sample Daily Activities</h3>
                          <div className="space-y-4">
                            {getDayActivities(island, islandIndex, preferences.pace).map(
                              (activity, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg"
                                >
                                  <div className="font-medium text-gray-900 whitespace-nowrap">
                                    {activity.time}
                                  </div>
                                  <div>
                                    <div className="font-medium">{activity.title}</div>
                                    <div className="text-sm text-gray-600">
                                      {activity.description}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
