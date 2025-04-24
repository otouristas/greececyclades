import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  MapPin, 
  Calendar, 
  Heart, 
  Coffee, 
  Utensils, 
  Mountain, 
  Camera, 
  Music, 
  Sun, 
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Ship,
  Hotel,
  Plane,
  Map,
  Car,
  Bus
} from 'lucide-react';
import clsx from 'clsx';

import SEO from '../components/SEO';
import StepCard from '../components/StepCard';
import { toast } from '../components/ui/toast';
import { Button } from '../components/ui/button';

import { AvailableMonth, IslandVibe, Island, NewTripPlan } from '../types/island';
import { cyclades } from '../data/islandsData';
import { generateTripSuggestions } from '../utils/ai';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';

const AVAILABLE_VIBES = [
  { value: IslandVibe.ROMANTIC, icon: Heart, label: 'Romantic Escapes', description: 'Sunset views, intimate dining, and charming accommodations' },
  { value: IslandVibe.LUXURY, icon: Sun, label: 'Luxury & Comfort', description: 'Premium experiences, high-end dining, and exclusive activities' },
  { value: IslandVibe.ADVENTURE, icon: Mountain, label: 'Adventure & Sports', description: 'Hiking, water sports, and outdoor activities' },
  { value: IslandVibe.PARTY, icon: Music, label: 'Nightlife & Party', description: 'Vibrant bars, clubs, and entertainment venues' },
  { value: IslandVibe.NATURAL, icon: Sun, label: 'Nature & Beaches', description: 'Pristine beaches, natural wonders, and scenic landscapes' },
  { value: IslandVibe.LAID_BACK, icon: Coffee, label: 'Relaxation & Wellness', description: 'Spa treatments, peaceful settings, and mindful activities' }
] as const;

const PACE_DESCRIPTIONS = {
  relaxed: 'Take it slow, enjoy each location deeply with fewer planned activities',
  moderate: 'Balance between exploration and relaxation with a comfortable schedule',
  active: 'Maximize your experience with a full itinerary of activities and sights'
} as const;

interface TripPreferences {
  duration: number;
  month: AvailableMonth;
  vibes: IslandVibe[];
  pace: 'relaxed' | 'moderate' | 'active';
}

const getDayActivities = (island: Island, day: number, pace: TripPreferences['pace']) => {
  const activities: { time: string; title: string; description: string; icon: any }[] = [];
  const paceMultiplier = pace === 'relaxed' ? 3 : pace === 'moderate' ? 4 : 5;
  
  // Morning activity - always a beach
  const beaches = ['Agios Georgios', 'Platis Gialos', 'Ornos', 'Paradise', 'Elia'];
  const beach = beaches[Math.floor(Math.random() * beaches.length)];
  
  activities.push({
    time: '11:00 AM',
    title: `Visit ${beach}`,
    description: 'Enjoy the crystal clear waters and beautiful scenery',
    icon: Sun
  });

  // Lunch break
  activities.push({
    time: '2:00 PM',
    title: 'Traditional Greek Lunch',
    description: 'Experience authentic Greek cuisine at a local taverna',
    icon: Utensils
  });

  // Afternoon activities
  if (island.activities && island.activities.length > 1) {
    const activity = island.activities[(day + 3) % island.activities.length];
    if (typeof activity === 'string') {
      activities.push({
        time: '4:00 PM',
        title: activity,
        description: 'Perfect activity for the afternoon',
        icon: Camera
      });
    }
  }

  // Must-see spots
  if (island.highlights && island.highlights.length > 0) {
    const spot = island.highlights[(day + 4) % island.highlights.length];
    activities.push({
      time: '6:00 PM',
      title: `Visit ${spot}`,
      description: 'A must-visit location on the island',
      icon: MapPin
    });
  }

  // Evening activities
  if (pace !== 'relaxed') {
    activities.push({
      time: '8:00 PM',
      title: 'Sunset Viewing',
      description: 'Watch the beautiful Mediterranean sunset',
      icon: Sun
    });
  }

  // Return activities based on pace
  return activities.slice(0, paceMultiplier);
};

// Define props interface for TripPlanner
interface TripPlannerProps {
  embeddedMode?: boolean;
}

export default function TripPlanner({ embeddedMode = false }: TripPlannerProps) {
  const { user } = useAuthStore();
  const { addTrip } = useTripStore();
  const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 7,
    month: AvailableMonth.JULY,
    vibes: [],
    pace: 'moderate' as TripPreferences['pace']
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
            Boolean(island.vibes) &&
            Array.isArray(island.vibes);
        });

      const suggestions = await generateTripSuggestions({
        islands: recommendedIslands.map(island => ({
          name: island.name,
          activities: island.activities || [],
          description: island.description,
          highlights: island.highlights,
          vibes: island.vibes?.map(v => v.toString()) || []
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

      // Only attempt to save the trip if the user is logged in
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
      }
      // No else block here - we don't show a sign-in prompt at this stage
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Object.values(AvailableMonth).map((month) => (
              <button
                key={month}
                onClick={() => {
                  setPreferences({ ...preferences, month: month as AvailableMonth });
                  setCurrentStep(2);
                }}
                className={clsx(
                  'flex flex-col items-center justify-center rounded-xl p-4 transition-all',
                  preferences.month === month
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                )}
              >
                <span className="text-lg font-medium">{month}</span>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'How long is your trip?',
      description: 'Select your trip duration',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[5, 7, 10, 14, 21].map((days) => (
              <button
                key={days}
                onClick={() => {
                  setPreferences({ ...preferences, duration: days });
                  setCurrentStep(3);
                }}
                className={clsx(
                  'flex flex-col items-center justify-center rounded-xl p-6 transition-all',
                  preferences.duration === days
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                )}
              >
                <span className="text-2xl font-bold">{days}</span>
                <span className="text-sm mt-1">days</span>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "What's your vibe?",
      description: 'Select up to 3 experiences you want',
      icon: Heart,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {AVAILABLE_VIBES.map(({ value, icon: Icon, label, description }) => (
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
                  'flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all border',
                  preferences.vibes.includes(value)
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  {Icon && (
                    <div className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      preferences.vibes.includes(value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <span className={clsx(
                    'font-medium',
                    preferences.vibes.includes(value)
                      ? 'text-blue-700'
                      : 'text-gray-800'
                  )}>{label}</span>
                  {preferences.vibes.includes(value) && (
                    <div className="ml-auto bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 pl-12">{description}</p>
              </button>
            ))}
          </div>
          {preferences.vibes.length > 0 && (
            <button
              onClick={() => setCurrentStep(4)}
              className="ml-auto flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
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
      icon: Mountain,
      content: (
        <div className="space-y-4">
          {(['relaxed', 'moderate', 'active'] as TripPreferences['pace'][]).map((pace) => {
            const Icon = pace === 'relaxed' ? Coffee : pace === 'moderate' ? Sun : Mountain;
            return (
              <button
                key={pace}
                onClick={() => {
                  setPreferences({ ...preferences, pace });
                  // Don't auto-advance here to let user review all selections
                }}
                className={clsx(
                  'flex flex-col w-full rounded-xl p-4 text-left transition-all border',
                  preferences.pace === pace
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      preferences.pace === pace
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className={clsx(
                      'font-medium capitalize',
                      preferences.pace === pace
                        ? 'text-blue-700'
                        : 'text-gray-800'
                    )}>{pace}</div>
                    <div className="text-sm text-gray-600">{PACE_DESCRIPTIONS[pace]}</div>
                  </div>
                  {preferences.pace === pace && (
                    <div className="ml-auto bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )
    }
  ];

  // Function to get island card background color based on vibes
  const getIslandCardBgColor = (island: Island) => {
    const vibes = island.vibes || [];
    if (vibes.includes(IslandVibe.PARTY)) return 'bg-purple-50';
    if (vibes.includes(IslandVibe.ROMANTIC)) return 'bg-pink-50';
    if (vibes.includes(IslandVibe.NATURAL)) return 'bg-green-50';
    if (vibes.includes(IslandVibe.ADVENTURE)) return 'bg-orange-50';
    if (vibes.includes(IslandVibe.LUXURY)) return 'bg-yellow-50';
    return 'bg-blue-50';
  };

  return (
    <div className={`min-h-screen ${!embeddedMode ? 'bg-gradient-to-br from-blue-50 to-indigo-50 pt-16' : ''}`}>
      {!embeddedMode && (
        <SEO 
          title="Touristas AI: Smart Greek Island Trip Planner"
          description="Plan your dream Cyclades adventure with Touristas AI. Get custom itineraries for Greek islands based on your travel style, dates, budget, and interests."
          keywords={["Greek islands trip planner", "Cyclades itinerary", "AI travel planner", "Greece island hopping", "personalized travel itinerary", "Greek islands vacation"]}
          ogImage="https://greececyclades.com/images/trip-planner-og.jpg"
        />
      )}

      <div className={`mx-auto max-w-7xl ${!embeddedMode ? 'px-4 py-8 sm:px-6 lg:px-8' : ''}`}>
        {!embeddedMode && (
          <div className="mb-12 text-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              Design Your Perfect Island Adventure
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Tell us your preferences, and we'll craft your ideal Greek island hopping experience
            </p>
          </div>
        )}

        {currentStep < 5 ? (
          <div className="mx-auto max-w-3xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
                <div
                  className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        index + 1 <= currentStep 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                          : 'bg-white border border-gray-200 text-gray-400'
                      )}
                    >
                      {index + 1 <= currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
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
                  'group relative flex items-center overflow-hidden rounded-xl px-8 py-4 text-lg font-medium text-white shadow-lg transition-all',
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:translate-y-[-2px]'
                )}
              >
                <span className="relative z-10 flex items-center">
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Your Trip...
                    </>
                  ) : (
                    <>
                      Generate Your Perfect Trip
                      <ChevronRight className="ml-2 h-6 w-6" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Trip Summary Header */}
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
                    Your {preferences.duration}-Day Island Adventure
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Calendar className="mr-1 h-3 w-3" />
                      {preferences.month}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      <Calendar className="mr-1 h-3 w-3" />
                      {preferences.duration} days
                    </span>
                    {preferences.vibes.map(vibe => {
                      const vibeInfo = AVAILABLE_VIBES.find(v => v.value === vibe);
                      const Icon = vibeInfo?.icon || null;
                      return (
                        <span key={vibe} className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          {Icon && (
                            <Icon className="mr-1 h-3 w-3" />
                          )}
                          {vibeInfo?.label || vibe}
                        </span>
                      );
                    })}
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {preferences.pace === 'relaxed' ? (
                        <Coffee className="mr-1 h-3 w-3" />
                      ) : preferences.pace === 'moderate' ? (
                        <Sun className="mr-1 h-3 w-3" />
                      ) : (
                        <Mountain className="mr-1 h-3 w-3" />
                      )}
                      {preferences.pace.charAt(0).toUpperCase() + preferences.pace.slice(1)} pace
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open('https://www.ferryscanner.com/en/ferry?ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN', '_blank')}
                    className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Ship className="mr-1.5 h-4 w-4" />
                    Ferries
                  </button>
                  <button
                    onClick={() => window.open('https://www.trip.com/?SID=2209817&allianceid=1094387&trip_sub1=0a64ce5f5ab6492480e5a64be-595305&utm_campaign=595305', '_blank')}
                    className="inline-flex items-center rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <Hotel className="mr-1.5 h-4 w-4" />
                    Hotels
                  </button>
                  <button
                    onClick={() => window.open('https://www.trip.com/flights/ShowFareFirst/?SID=2209817&acity=JMK&allianceid=1094387&class=ys&currency=EUR&dcity=ATH&ddate=2025-04-26&flighttype=D&quantity=1&rdate=2025-04-30&trip_sub1=47d259afee034b8697938fc71-595305&utm_campaign=595305', '_blank')}
                    className="inline-flex items-center rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    <Plane className="mr-1.5 h-4 w-4" />
                    Flights
                  </button>
                </div>
              </div>

              {/* Travel Services Section */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                <button
                  onClick={() => window.open('https://www.getyourguide.com/s/?lc=l114062&et=406661&psrc=widget&partner_id=YFXNELL&utm_medium=travel_agent&currency=EUR&queryMatch=all&widget=activities&wid=1ae3c282-e534-5d5e-8988-fd6a686593f1&page_id=6974a328-27f4-52b5-853a-bc6afc34a0c4&visitor_id=18382751107C49358DA45DA89A4D443F', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg bg-amber-50 px-3 py-3 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                >
                  <Map className="mr-1.5 h-4 w-4" />
                  Activities
                </button>
                <button
                  onClick={() => window.open('https://www.book-online-transfers.com/en/greececyclades-airport-taxi', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-3 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
                >
                  <Bus className="mr-1.5 h-4 w-4" />
                  Airport Taxi
                </button>
                <button
                  onClick={() => window.open('https://www.economybookings.com/gb/cars/results?a=1&age=35&btag=travelpayouts&dd=30&dlc=1652&dm=04&dt=1000&dy=2025&lang=gb&pd=27&plc=1664&pm=04&pt=1000&py=2025&tpo_uid=5a40fafd25f04c4896dbbbb1a-595305', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-50 px-3 py-3 text-sm font-medium text-cyan-700 hover:bg-cyan-100 transition-colors"
                >
                  <Car className="mr-1.5 h-4 w-4" />
                  Rent a Car
                </button>
              </div>

              {/* Trip Summary Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={clsx(
                      'pb-4 text-sm font-medium transition-colors',
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={clsx(
                      'pb-4 text-sm font-medium transition-colors',
                      activeTab === 'details'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    Day by Day
                  </button>
                </div>
              </div>

              {/* Trip Summary Content */}
              <div className="mt-6">
                {activeTab === 'overview' ? (
                  <div className="prose prose-sm max-w-none">
                    {aiSuggestions.split('\n\n').map((paragraph, index) => {
                      // Process text to add internal links and formatting
                      const processedText = paragraph.replace(
                        /\b(Santorini|Mykonos|Naxos|Milos|Paros|Ios|Folegandros|Sifnos|Serifos|Syros|Tinos|Andros|Kea|Kythnos)\b/g,
                        (match) => `<strong class="text-blue-700">${match}</strong>`
                      ).replace(
                        /(beaches|hiking|wineries|sunset spots|archaeological sites|traditional villages|water sports|snorkeling|diving|boat tours)/gi,
                        (match) => `<em class="text-indigo-600">${match}</em>`
                      );

                      return (
                        <div
                          key={index}
                          className="text-gray-700 mb-4 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: processedText }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Day by Day Itinerary */}
                    {generatedPlan.map((island, islandIndex) => {
                      // Calculate days per island ensuring the total equals preferences.duration
                      const totalIslands = generatedPlan.length;
                      const baseDaysPerIsland = Math.floor(preferences.duration / totalIslands);
                      const extraDays = preferences.duration % totalIslands;
                      
                      // Distribute extra days to the first 'extraDays' islands
                      const daysForThisIsland = baseDaysPerIsland + (islandIndex < extraDays ? 1 : 0);
                      
                      // Calculate start and end days
                      let startDay = 1;
                      for (let i = 0; i < islandIndex; i++) {
                        startDay += baseDaysPerIsland + (i < extraDays ? 1 : 0);
                      }
                      const endDay = startDay + daysForThisIsland - 1;

                      return (
                        <div key={island.id} className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
                            <h3 className="text-lg font-semibold">
                              {island.name || 'Unknown Island'} ({startDay === endDay ? `Day ${startDay}` : `Days ${startDay}-${endDay}`})
                            </h3>
                          </div>
                          
                          {/* Sponsored Travel Services */}
                          <div className="p-4 bg-white border-b border-blue-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Plan Your Visit to {island.name}</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <a 
                                href="https://www.trip.com/?SID=2209817&allianceid=1094387&trip_sub1=0a64ce5f5ab6492480e5a64be-595305&utm_campaign=595305" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-all"
                              >
                                <Hotel className="h-5 w-5 text-green-600 mb-1" />
                                <span className="text-xs font-medium text-green-800">Hotels</span>
                              </a>
                              <a 
                                href="https://www.ferryscanner.com/en/ferry?ref=ztdimtue&utm_source=georgekasiotis&utm_campaign=Ferryscanner+affiliate+program+EN" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-blue-50 to-sky-100 hover:from-blue-100 hover:to-sky-200 transition-all"
                              >
                                <Ship className="h-5 w-5 text-blue-600 mb-1" />
                                <span className="text-xs font-medium text-blue-800">Ferries</span>
                              </a>
                              <a 
                                href="https://www.getyourguide.com/s/?lc=l114062&et=406661&psrc=widget&partner_id=YFXNELL&utm_medium=travel_agent&currency=EUR&queryMatch=all&widget=activities&wid=1ae3c282-e534-5d5e-8988-fd6a686593f1&page_id=6974a328-27f4-52b5-853a-bc6afc34a0c4&visitor_id=18382751107C49358DA45DA89A4D443F" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-100 hover:from-amber-100 hover:to-yellow-200 transition-all"
                              >
                                <Map className="h-5 w-5 text-amber-600 mb-1" />
                                <span className="text-xs font-medium text-amber-800">Activities</span>
                              </a>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-6">
                            {Array.from({ length: daysForThisIsland }).map((_, dayIndex) => {
                              const currentDay = startDay + dayIndex;
                              const dayActivities = getDayActivities(island, currentDay, preferences.pace);

                              return (
                                <div key={currentDay} className="rounded-lg bg-white p-4 shadow-sm">
                                  <h4 className="text-sm font-medium text-blue-900 mb-3 pb-2 border-b border-gray-100">
                                    Day {currentDay}
                                  </h4>
                                  <div className="space-y-4">
                                    {dayActivities.map((activity, actIndex) => {
                                      const Icon = activity.icon;
                                      return (
                                        <div
                                          key={actIndex}
                                          className="flex items-start gap-3"
                                        >
                                          {Icon && (
                                            <div className="flex-shrink-0 mt-1">
                                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <Icon className="h-4 w-4" />
                                              </div>
                                            </div>
                                          )}
                                          <div>
                                            <p className="text-xs font-medium text-blue-600">{activity.time}</p>
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
                                      );
                                    })}
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
            </div>

            {/* Island Cards - More Compact */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {generatedPlan.map((island) => (
                <div key={island.id} className={`overflow-hidden rounded-xl ${getIslandCardBgColor(island)} shadow-lg transition-transform hover:scale-[1.02]`}>
                  {/* Image Section */}
                  <div className="relative h-48">
                    <img
                      src={island.image}
                      alt={island.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 p-4">
                        <h3 className="text-xl font-bold text-white">{island.name || 'Unknown Island'}</h3>
                        <p className="text-sm text-gray-300">
                          {(() => {
                            // Calculate days for this island using the same logic as above
                            const baseDaysPerIsland = Math.floor(preferences.duration / generatedPlan.length);
                            const extraDays = preferences.duration % generatedPlan.length;
                            const daysForThisIsland = baseDaysPerIsland + (generatedPlan.indexOf(island) < extraDays ? 1 : 0);
                            return `${daysForThisIsland} Days`;
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="space-y-4">
                      {/* Island Description */}
                      <div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {island.description}
                        </p>
                      </div>

                      {/* Island Vibes */}
                      {island.vibes && island.vibes.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Island Vibes</h4>
                          <div className="flex flex-wrap gap-1">
                            {island.vibes.map(vibe => {
                              const vibeInfo = AVAILABLE_VIBES.find(v => v.value === vibe);
                              return (
                                <span 
                                  key={vibe} 
                                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                                >
                                  {vibeInfo?.label || vibe}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Must-See Spots */}
                      {island.highlights && island.highlights.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Must-See Spots</h4>
                          <ul className="space-y-1">
                            {island.highlights.slice(0, 3).map((spot) => (
                              <li key={spot} className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-1.5 h-3 w-3 text-blue-500" />
                                {spot}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Trip Button - Only show if user is not logged in */}
            {generatedPlan.length > 0 && !user && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate('/signin', { state: { returnTo: '/trip-planner', saveTrip: true } })}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Sign in to Save This Trip
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}

            {/* View Saved Trips - Only show if user is logged in */}
            {generatedPlan.length > 0 && user && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate('/my-trips')}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white shadow-md hover:shadow-lg transition-all"
                >
                  View Saved Trips
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {!embeddedMode && (
        <>
          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {tripPlannerFAQs.map((faq, index) => (
                <TripPlannerFAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* SEO Text Section */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Discover the Greek Islands with Our AI Trip Planner</h2>
            <div className="prose prose-blue max-w-none">
              <p>
                Planning a trip to the Greek Islands can be overwhelming with so many beautiful destinations to choose from. 
                Our AI-powered trip planner takes the stress out of planning by creating a personalized itinerary tailored to your preferences.
              </p>
              
              <p>
                The Cyclades, with their iconic white-washed buildings and crystal-clear waters, offer something for every type of traveler. 
                Whether you're seeking romantic sunsets in Santorini, vibrant nightlife in Mykonos, family-friendly beaches in Naxos, 
                or off-the-beaten-path adventures in Folegandros, our trip planner will help you create the perfect island-hopping experience.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">How Our Trip Planner Works</h3>
              <p>
                Simply tell us when you're traveling, how long your trip will be, what type of experiences you're looking for, 
                and your preferred travel pace. Our advanced AI algorithm will analyze these preferences and recommend the best islands to visit, 
                how many days to spend on each island, and suggest activities that match your interests.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Why Use Our Trip Planner</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personalized Recommendations:</strong> Get suggestions based on your unique preferences and travel style.</li>
                <li><strong>Local Expertise:</strong> Our recommendations are based on extensive local knowledge of the Greek Islands.</li>
                <li><strong>Time-Saving:</strong> Create a comprehensive itinerary in minutes instead of hours of research.</li>
                <li><strong>Flexible Planning:</strong> Generate multiple itineraries to compare and find your perfect trip.</li>
                <li><strong>Free to Use:</strong> Our basic trip planning tool is completely free to use.</li>
              </ul>
              
              <p className="mt-4">
                Start planning your dream Greek Islands vacation today with our AI Trip Planner and discover the magic of the Cyclades!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// FAQ Item Component
function TripPlannerFAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

// FAQ Data
const tripPlannerFAQs = [
  {
    question: "How does the AI Trip Planner work?",
    answer: "Our AI Trip Planner uses advanced algorithms to create personalized travel itineraries based on your preferences. You input your travel dates, duration, preferred experiences (like beaches, nightlife, or cultural activities), and travel pace. The AI then analyzes this information along with our extensive database of Greek islands to recommend the perfect itinerary for your trip."
  },
  {
    question: "Is the Trip Planner free to use?",
    answer: "Yes! Our AI Trip Planner is completely free to use. You can generate as many itineraries as you like without any cost. If you want to save your itineraries for future reference, you'll need to create a free account."
  },
  {
    question: "How accurate are the recommendations?",
    answer: "Our recommendations are based on extensive local knowledge of the Greek Islands and are regularly updated with the latest information. The AI considers factors like seasonal weather, ferry connections, and island characteristics to provide accurate and practical suggestions. However, we always recommend verifying specific details like ferry schedules and opening hours before finalizing your plans."
  },
  {
    question: "Can I modify the generated itinerary?",
    answer: "While our current version doesn't allow direct editing of the generated itinerary, you can generate multiple variations by adjusting your preferences and comparing the results. We're working on adding more customization features in future updates."
  },
  {
    question: "Do I need to create an account to use the Trip Planner?",
    answer: "No, you don't need an account to generate itineraries. However, creating a free account allows you to save your favorite itineraries and access them later from any device."
  },
  {
    question: "How far in advance should I plan my Greek Islands trip?",
    answer: "For the best experience, we recommend planning your Greek Islands trip at least 3-6 months in advance, especially if you're traveling during the high season (June-September). This gives you enough time to book accommodations and ferry tickets at the best rates."
  },
  {
    question: "Can the Trip Planner book my accommodations and ferry tickets?",
    answer: "Currently, our Trip Planner doesn't handle bookings directly, but it provides convenient links to our partner booking platforms for ferries, hotels, and flights once you've generated your itinerary."
  }
];
