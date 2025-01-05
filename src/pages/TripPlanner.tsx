/** @jsxImportSource react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, 
  Calendar, 
  MapPin, 
  Sun, 
  Compass
} from 'lucide-react';
import SEO from '../components/SEO';
import StepIndicator from '../components/StepIndicator';
import StepCard from '../components/StepCard';
import IslandCard from '../components/IslandCard';
import { generateTripSuggestions } from '../utils/ai';
import { useTripStore } from '../store/tripStore';
import { useAuthStore } from '../store/authStore';
import { TripPreferences, Island as TripIsland } from '../types/islands';
import { AvailableMonth, IslandVibe } from '../types/island';
import { cyclades } from '../data/islandsData';
import clsx from 'clsx';

export default function CycladesTripPlanner() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addTrip } = useTripStore();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: 7,
    month: AvailableMonth.JUNE,
    vibes: [],
    pace: 'moderate'
  });
  const [generatedPlan, setGeneratedPlan] = useState<TripIsland[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');

  const generateTrip = async () => {
    try {
      // Filter islands based on preferences and required fields
      let recommendedIslands = [...cyclades].filter(island => 
        island.name && 
        island.description && 
        island.shortDescription && 
        island.activities && 
        island.highlights && 
        island.idealFor
      ) as TripIsland[];
      
      // Filter by month
      const filteredByMonth = recommendedIslands.filter(
        island => island.bestTime?.months.includes(preferences.month)
      );

      // Filter by pace
      if (preferences.pace === 'relaxed') {
        recommendedIslands = filteredByMonth.filter(
          island => island.vibes?.includes(IslandVibe.PEACEFUL)
        );
      } else if (preferences.pace === 'active') {
        recommendedIslands = filteredByMonth.filter(
          island => island.vibes?.includes(IslandVibe.ADVENTUROUS)
        );
      }

      // If vibes are selected
      if (preferences.vibes.length > 0) {
        // Sort islands by how many matching vibes they have
        recommendedIslands.sort((a, b) => {
          const aMatches = preferences.vibes.filter(vibe => 
            a.idealFor?.includes(vibe)
          ).length;
          const bMatches = preferences.vibes.filter(vibe => 
            b.idealFor?.includes(vibe)
          ).length;
          return bMatches - aMatches;
        });
      }

      const topIslands = recommendedIslands.slice(0, 3);
      setGeneratedPlan(topIslands);

      // Generate AI suggestions
      const suggestions = await generateTripSuggestions({
        islands: topIslands.map(island => ({
          name: island.name,
          activities: island.activities,
          description: island.description,
          mustSee: island.highlights,
          vibes: island.idealFor || []
        })),
        duration: preferences.duration,
        month: preferences.month,
        vibes: preferences.vibes,
        pace: preferences.pace
      });

      setAiSuggestions(suggestions);
      setStep(4);

    } catch (error) {
      console.error('Error generating trip:', error);
    }
  };

  const handleSaveTrip = () => {
    if (!user?.uid) {
      // Handle the case where user is not logged in
      // You might want to show a login prompt or error message
      return;
    }

    const tripPlan = {
      islands: generatedPlan,
      duration: preferences.duration,
      month: preferences.month,
      vibes: preferences.vibes,
      pace: preferences.pace,
      aiSuggestions,
      userId: user.uid,
      createdAt: new Date()
    };
    
    addTrip(tripPlan);
    navigate('/my-trips');
  };

  const generateTripPlannerSEO = () => ({
    title: "Plan Your Perfect Cyclades Island-Hopping Trip | Touristas AI",
    description: "Create a personalized Cyclades island-hopping itinerary with our AI-powered trip planner. Get expert recommendations based on your preferences, duration, and travel style."
  });

  const generateTripPlannerJsonLD = () => ({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Touristas AI - Cyclades Trip Planner",
    "description": "AI-powered Cyclades island-hopping trip planner",
    "url": "https://touristas.ai/trip-planner",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Cyclades Islands",
      "containedInPlace": {
        "@type": "Country",
        "name": "Greece"
      }
    },
    "makesOffer": {
      "@type": "Offer",
      "name": "Personalized Island-Hopping Itinerary",
      "description": "Get a customized Cyclades island-hopping itinerary based on your preferences"
    }
  });

  const seoData = generateTripPlannerSEO();
  const jsonLD = generateTripPlannerJsonLD();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        jsonLD={jsonLD}
      />
      
      <div className="w-full px-4 pt-24 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Ship className="w-8 h-8 text-blue-500" />
              Magic Trip Planner
            </h1>
            <p className="text-gray-600">Let's create your perfect Cyclades island-hopping adventure</p>
          </motion.div>

          <StepIndicator currentStep={step} steps={[
            { icon: Calendar, label: 'Duration' },
            { icon: Sun, label: 'Month' },
            { icon: Ship, label: 'Vibes' },
            { icon: Compass, label: 'Plan' }
          ]} />

          <AnimatePresence mode="wait">
            {/* Step 1: Duration */}
            {step === 1 && (
              <StepCard title="How long is your trip?" icon={Calendar}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="5"
                      max="14"
                      value={preferences.duration}
                      onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center text-3xl font-semibold text-blue-600"
                    >
                      {preferences.duration} days
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next Step
                  </motion.button>
                </div>
              </StepCard>
            )}

            {/* Step 2: Month */}
            {step === 2 && (
              <StepCard title="When are you planning to visit?" icon={Sun}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    AvailableMonth.JUNE,
                    AvailableMonth.JULY,
                    AvailableMonth.AUGUST,
                    AvailableMonth.SEPTEMBER
                  ].map((month, index) => (
                    <motion.button
                      key={month}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setPreferences({ ...preferences, month: month });
                        setStep(3);
                      }}
                      className={clsx(
                        'p-4 rounded-lg border-2 transition-all hover:border-blue-300',
                        preferences.month === month
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      )}
                    >
                      {month}
                    </motion.button>
                  ))}
                </div>
              </StepCard>
            )}

            {/* Step 3: Vibes */}
            {step === 3 && (
              <StepCard
                title="Choose Your Vibes"
                description="What kind of experience are you looking for?"
                icon={Ship}
                step={3}
                currentStep={step}
                onClick={() => setStep(3)}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Column - Vibes */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-medium">Island Vibes:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        IslandVibe.PEACEFUL,
                        IslandVibe.ADVENTUROUS,
                        IslandVibe.PARTY,
                        IslandVibe.FAMILY_FRIENDLY
                      ].map((vibe, index) => (
                        <motion.button
                          key={vibe}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            const newVibes = preferences.vibes.includes(vibe)
                              ? preferences.vibes.filter((v) => v !== vibe)
                              : [...preferences.vibes, vibe];
                            setPreferences({ ...preferences, vibes: newVibes });
                          }}
                          className={clsx(
                            'p-3 rounded-lg border-2 transition-all hover:border-blue-300',
                            preferences.vibes.includes(vibe)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                          )}
                        >
                          {vibe.toLowerCase()}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Pace */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-medium">Travel Pace:</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { value: 'relaxed', label: 'Relaxed', description: 'Take your time and enjoy the views', icon: '' },
                        { value: 'moderate', label: 'Moderate', description: 'A balance between relaxation and exploration', icon: '' },
                        { value: 'active', label: 'Active', description: 'Pack your days with adventure and activities', icon: '' }
                      ].map((pace) => (
                        <motion.button
                          key={pace.value}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPreferences({ ...preferences, pace: pace.value as 'relaxed' | 'moderate' | 'active' })}
                          className={clsx(
                            'p-4 rounded-lg border-2 transition-all hover:border-blue-300',
                            preferences.pace === pace.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-xl">{pace.icon}</div>
                            <div>
                              <div className="font-medium text-left">{pace.label}</div>
                              <div className="text-sm text-gray-500 text-left">{pace.description}</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateTrip}
                  disabled={preferences.vibes.length === 0}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  Generate My Trip
                </motion.button>
              </StepCard>
            )}

            {/* Step 4: Results */}
            {step === 4 && (
              <div className="w-full">
                {/* Trip Summary */}
                <div className="max-w-7xl mx-auto mb-8">
                  <StepCard
                    title="Trip Summary"
                    description="Your selected preferences"
                    icon={Compass}
                    step={4}
                    currentStep={step}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{preferences.duration} days</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Month</div>
                        <div className="font-medium">{preferences.month}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Pace</div>
                        <div className="font-medium capitalize">{preferences.pace}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Vibes</div>
                        <div className="font-medium">
                          {preferences.vibes.map(v => v.toLowerCase()).join(', ')}
                        </div>
                      </div>
                    </div>
                  </StepCard>
                </div>

                <div className="w-full bg-gray-100 py-8">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - AI Suggestions */}
                    <div>
                      <StepCard
                        title="Touristas AI Suggestions"
                        description="Your personal Greek islands travel expert"
                        icon={Ship}
                        step={4}
                        currentStep={step}
                      >
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <Ship className="w-6 h-6 text-white" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-medium text-blue-900">Touristas AI</h3>
                            <div className="prose prose-sm">
                              {aiSuggestions ? (
                                <p className="text-blue-800 whitespace-pre-line">{aiSuggestions}</p>
                              ) : (
                                <div className="flex items-center gap-2 text-blue-800">
                                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                  Analyzing your preferences...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </StepCard>
                    </div>

                    {/* Right Column - Island Results */}
                    <div>
                      <StepCard
                        title="Your Island Itinerary"
                        description="Perfectly matched islands for your dream trip"
                        icon={MapPin}
                        step={4}
                        currentStep={step}
                      >
                        <div className="space-y-6">
                          {generatedPlan.length > 0 ? (
                            <div className="space-y-4">
                              {generatedPlan.map((island, index) => (
                                <motion.div
                                  key={island.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <IslandCard
                                    island={island}
                                    id={index}
                                    showDuration
                                    duration={Math.max(2, Math.floor(preferences.duration / generatedPlan.length))}
                                  />
                                </motion.div>
                              ))}
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSaveTrip}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
                              >
                                Save Trip
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-32 text-gray-500">
                              <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2" />
                              Generating your perfect island combination...
                            </div>
                          )}
                        </div>
                      </StepCard>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
