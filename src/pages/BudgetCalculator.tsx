import { useState, useEffect } from 'react';
import { Calculator, Euro, Bed, Utensils, Ship, Bus, Ticket, Car } from 'lucide-react';
import SEO from '../components/SEO';
import { cyclades } from '../data/islandsData';

// Budget ranges per person per day (in EUR)
const budgetRanges = {
  accommodation: {
    budget: { min: 30, max: 60 },
    midRange: { min: 60, max: 150 },
    luxury: { min: 150, max: 400 }
  },
  food: {
    budget: { min: 20, max: 40 },
    midRange: { min: 40, max: 80 },
    luxury: { min: 80, max: 150 }
  },
  localTransport: {
    budget: { min: 5, max: 15 },
    midRange: { min: 15, max: 30 },
    luxury: { min: 30, max: 100 }
  },
  activities: {
    budget: { min: 10, max: 30 },
    midRange: { min: 30, max: 60 },
    luxury: { min: 60, max: 150 }
  }
};

// Season multipliers
const seasonMultipliers = {
  lowSeason: 0.7, // Nov-Apr
  shoulderSeason: 0.9, // May, Oct
  highSeason: 1.2, // Jun, Sep
  peakSeason: 1.5  // Jul, Aug
};

export default function BudgetCalculator() {
  // Form state
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(7);
  const [season, setSeason] = useState('highSeason');
  const [islands, setIslands] = useState<string[]>(['santorini']);
  const [budgetLevel, setBudgetLevel] = useState('midRange');
  
  // Budget state
  const [totalBudget, setTotalBudget] = useState(0);
  const [breakdown, setBreakdown] = useState({
    accommodation: 0,
    food: 0,
    transportation: 0,
    activities: 0,
    ferries: 0
  });

  // Calculate budget when inputs change
  useEffect(() => {
    calculateBudget();
  }, [travelers, days, season, islands, budgetLevel]);

  const calculateBudget = () => {
    // Get the multiplier for the selected season
    const seasonMultiplier = seasonMultipliers[season as keyof typeof seasonMultipliers];
    
    // Calculate accommodation costs
    const accommodationRange = budgetRanges.accommodation[budgetLevel as keyof typeof budgetRanges.accommodation];
    const accommodationAvg = (accommodationRange.min + accommodationRange.max) / 2;
    const accommodationCost = accommodationAvg * days * travelers * seasonMultiplier;
    
    // Calculate food costs
    const foodRange = budgetRanges.food[budgetLevel as keyof typeof budgetRanges.food];
    const foodAvg = (foodRange.min + foodRange.max) / 2;
    const foodCost = foodAvg * days * travelers;
    
    // Calculate local transport costs
    const transportRange = budgetRanges.localTransport[budgetLevel as keyof typeof budgetRanges.localTransport];
    const transportAvg = (transportRange.min + transportRange.max) / 2;
    const transportCost = transportAvg * days * travelers;
    
    // Calculate activities costs
    const activitiesRange = budgetRanges.activities[budgetLevel as keyof typeof budgetRanges.activities];
    const activitiesAvg = (activitiesRange.min + activitiesRange.max) / 2;
    const activitiesCost = activitiesAvg * days * travelers;
    
    // Calculate ferry costs (simplified - average 40€ per island hop per person)
    const ferryCost = islands.length > 1 ? (islands.length - 1) * 40 * travelers : 0;
    
    // Update breakdown
    const newBreakdown = {
      accommodation: Math.round(accommodationCost),
      food: Math.round(foodCost),
      transportation: Math.round(transportCost),
      activities: Math.round(activitiesCost),
      ferries: Math.round(ferryCost)
    };
    
    setBreakdown(newBreakdown);
    
    // Calculate total budget
    const total = Object.values(newBreakdown).reduce((sum, cost) => sum + cost, 0);
    setTotalBudget(total);
  };

  return (
    <>
      <SEO 
        title="Cyclades Trip Budget Calculator - Plan Your Greek Island Vacation Costs"
        description="Plan your Cyclades trip budget with our interactive calculator. Estimate costs for accommodation, food, transportation, and activities based on your travel style."
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-800 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cyclades Trip Budget Calculator
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Plan your Greek island getaway with confidence by estimating your travel expenses.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-blue-600" />
                Trip Details
              </h2>
              
              <div className="space-y-6">
                {/* Number of Travelers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center border-y border-gray-300 py-2"
                    />
                    <button 
                      onClick={() => setTravelers(travelers + 1)}
                      className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Number of Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Days)
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setDays(Math.max(1, days - 1))}
                      className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center border-y border-gray-300 py-2"
                    />
                    <button 
                      onClick={() => setDays(days + 1)}
                      className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Season */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="lowSeason">Low Season (Nov-Apr)</option>
                    <option value="shoulderSeason">Shoulder Season (May, Oct)</option>
                    <option value="highSeason">High Season (Jun, Sep)</option>
                    <option value="peakSeason">Peak Season (Jul-Aug)</option>
                  </select>
                </div>
                
                {/* Budget Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setBudgetLevel('budget')}
                      className={`px-3 py-2 text-sm rounded-md ${
                        budgetLevel === 'budget'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Budget
                    </button>
                    <button
                      onClick={() => setBudgetLevel('midRange')}
                      className={`px-3 py-2 text-sm rounded-md ${
                        budgetLevel === 'midRange'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Mid-Range
                    </button>
                    <button
                      onClick={() => setBudgetLevel('luxury')}
                      className={`px-3 py-2 text-sm rounded-md ${
                        budgetLevel === 'luxury'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Luxury
                    </button>
                  </div>
                </div>
                
                {/* Islands */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Islands to Visit
                  </label>
                  <select
                    multiple
                    value={islands}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setIslands(selected);
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                  >
                    {cyclades.map((island) => (
                      <option key={island.slug} value={island.slug}>
                        {island.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Hold Ctrl/Cmd to select multiple islands
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            {/* Budget Summary */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Estimated Budget</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Total Estimated Cost</h3>
                  <p className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-1">
                    <Euro className="h-6 w-6" />
                    {totalBudget.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    For {travelers} {travelers === 1 ? 'person' : 'people'} for {days} {days === 1 ? 'day' : 'days'}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Per Person Per Day</h3>
                  <p className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-1">
                    <Euro className="h-6 w-6" />
                    {Math.round(totalBudget / travelers / days).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {budgetLevel === 'budget' ? 'Budget' : budgetLevel === 'midRange' ? 'Mid-Range' : 'Luxury'} travel style
                  </p>
                </div>
              </div>
              
              {/* Cost Breakdown */}
              <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
              <div className="space-y-4">
                {/* Accommodation */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Bed className="h-4 w-4 text-blue-600" /> Accommodation
                    </span>
                    <span className="text-sm font-semibold">€{breakdown.accommodation.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(breakdown.accommodation / totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Food */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Utensils className="h-4 w-4 text-green-600" /> Food & Drinks
                    </span>
                    <span className="text-sm font-semibold">€{breakdown.food.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${(breakdown.food / totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Local Transportation */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Bus className="h-4 w-4 text-orange-600" /> Local Transportation
                    </span>
                    <span className="text-sm font-semibold">€{breakdown.transportation.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-orange-600 h-2.5 rounded-full" 
                      style={{ width: `${(breakdown.transportation / totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Activities */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Ticket className="h-4 w-4 text-purple-600" /> Activities & Sightseeing
                    </span>
                    <span className="text-sm font-semibold">€{breakdown.activities.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${(breakdown.activities / totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Ferry Transportation */}
                {breakdown.ferries > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Ship className="h-4 w-4 text-cyan-600" /> Ferry Transportation
                      </span>
                      <span className="text-sm font-semibold">€{breakdown.ferries.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-cyan-600 h-2.5 rounded-full" 
                        style={{ width: `${(breakdown.ferries / totalBudget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Budget Tips */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-6">Budget Tips</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Accommodation</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Book accommodations well in advance, especially for high season</li>
                    <li>• Consider staying in less touristy areas for better rates</li>
                    <li>• Look for apartments or studios with kitchenettes to save on food costs</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Food & Drinks</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Eat where the locals eat for authentic and affordable meals</li>
                    <li>• Try gyros and souvlaki for inexpensive but delicious options</li>
                    <li>• Consider having a big lunch and a lighter dinner as lunch menus are often cheaper</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Transportation</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Book ferry tickets in advance for better rates</li>
                    <li>• Consider island hopping to nearby islands to save on ferry costs</li>
                    <li>• Use local buses instead of taxis when possible</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Activities</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Many beaches and hiking trails are free to enjoy</li>
                    <li>• Look for combo tickets for archaeological sites and museums</li>
                    <li>• Check for free walking tours or cultural events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
