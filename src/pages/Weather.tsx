import { useState } from 'react';
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplet, Calendar, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { cyclades } from '../data/islandsData';

// Weather data by month for the Cyclades region
const weatherData = {
  january: {
    temp: { min: 8, max: 14, avg: 11 },
    precipitation: 70, // mm
    humidity: 70, // %
    windSpeed: 25, // km/h
    seaTemp: 16, // °C
    sunHours: 4,
    description: 'Cool and occasionally wet with moderate winds. The low season with few tourists.',
    clothing: 'Warm layers, waterproof jacket, and comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Local cuisine', 'Photography']
  },
  february: {
    temp: { min: 8, max: 14, avg: 11 },
    precipitation: 60,
    humidity: 70,
    windSpeed: 24,
    seaTemp: 15,
    sunHours: 5,
    description: 'Similar to January but with slightly less rainfall. Still quiet with few tourists.',
    clothing: 'Warm layers, waterproof jacket, and comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Local cuisine', 'Photography']
  },
  march: {
    temp: { min: 10, max: 16, avg: 13 },
    precipitation: 50,
    humidity: 70,
    windSpeed: 20,
    seaTemp: 16,
    sunHours: 6,
    description: 'Gradually warming up with spring flowers beginning to bloom. Still quiet.',
    clothing: 'Light to medium layers, light jacket, comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Photography', 'Wildflower viewing']
  },
  april: {
    temp: { min: 12, max: 19, avg: 16 },
    precipitation: 30,
    humidity: 65,
    windSpeed: 18,
    seaTemp: 17,
    sunHours: 8,
    description: 'Pleasant spring weather with wildflowers in bloom. Tourism begins to pick up.',
    clothing: 'Light layers, light jacket for evenings, comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Photography', 'Early beach visits']
  },
  may: {
    temp: { min: 16, max: 23, avg: 20 },
    precipitation: 20,
    humidity: 65,
    windSpeed: 15,
    seaTemp: 19,
    sunHours: 10,
    description: 'Warm and sunny with low rainfall. Tourism increasing but not yet at peak.',
    clothing: 'Light clothing, light jacket for evenings, sun protection, swimwear.',
    activities: ['Beach activities', 'Hiking', 'Sightseeing', 'Boat tours']
  },
  june: {
    temp: { min: 20, max: 27, avg: 24 },
    precipitation: 10,
    humidity: 60,
    windSpeed: 15,
    seaTemp: 22,
    sunHours: 12,
    description: 'Hot and dry with strong sunshine. Tourism increasing significantly.',
    clothing: 'Light summer clothing, sun protection, swimwear.',
    activities: ['Beach activities', 'Swimming', 'Boat tours', 'Water sports']
  },
  july: {
    temp: { min: 22, max: 29, avg: 26 },
    precipitation: 5,
    humidity: 55,
    windSpeed: 20,
    seaTemp: 24,
    sunHours: 13,
    description: 'Hot and dry with strong meltemi winds. Peak tourist season with crowded beaches.',
    clothing: 'Light summer clothing, sun protection, swimwear, light scarf for wind.',
    activities: ['Beach activities', 'Swimming', 'Boat tours', 'Water sports', 'Nightlife']
  },
  august: {
    temp: { min: 22, max: 29, avg: 26 },
    precipitation: 5,
    humidity: 55,
    windSpeed: 20,
    seaTemp: 25,
    sunHours: 12,
    description: 'Hot and dry with strong meltemi winds. Peak tourist season with crowded beaches.',
    clothing: 'Light summer clothing, sun protection, swimwear, light scarf for wind.',
    activities: ['Beach activities', 'Swimming', 'Boat tours', 'Water sports', 'Nightlife']
  },
  september: {
    temp: { min: 20, max: 26, avg: 23 },
    precipitation: 10,
    humidity: 60,
    windSpeed: 15,
    seaTemp: 24,
    sunHours: 10,
    description: 'Warm and pleasant with decreasing winds. Tourism beginning to decrease.',
    clothing: 'Light summer clothing, light jacket for evenings, sun protection, swimwear.',
    activities: ['Beach activities', 'Swimming', 'Sightseeing', 'Cultural visits']
  },
  october: {
    temp: { min: 16, max: 22, avg: 19 },
    precipitation: 40,
    humidity: 65,
    windSpeed: 15,
    seaTemp: 22,
    sunHours: 7,
    description: 'Mild with increasing chance of rain. Tourism significantly decreased.',
    clothing: 'Light to medium layers, light jacket, comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Photography', 'Late beach visits']
  },
  november: {
    temp: { min: 13, max: 18, avg: 16 },
    precipitation: 60,
    humidity: 70,
    windSpeed: 20,
    seaTemp: 19,
    sunHours: 5,
    description: 'Cooling with increased rainfall. Very few tourists.',
    clothing: 'Medium layers, waterproof jacket, comfortable walking shoes.',
    activities: ['Hiking', 'Cultural visits', 'Local cuisine', 'Photography']
  },
  december: {
    temp: { min: 10, max: 15, avg: 13 },
    precipitation: 70,
    humidity: 70,
    windSpeed: 25,
    seaTemp: 17,
    sunHours: 4,
    description: 'Cool and occasionally wet with stronger winds. Very few tourists.',
    clothing: 'Warm layers, waterproof jacket, and comfortable walking shoes.',
    activities: ['Cultural visits', 'Local cuisine', 'Photography']
  }
};

const months = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

// Get current month
const getCurrentMonth = () => {
  const monthIndex = new Date().getMonth();
  return months[monthIndex];
};

export default function Weather() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedIsland, setSelectedIsland] = useState('all');
  
  // Get current weather data based on selected month
  const currentWeather = weatherData[selectedMonth as keyof typeof weatherData];
  
  return (
    <>
      <SEO 
        title="Cyclades Weather Guide - Best Time to Visit Greek Islands"
        description="Comprehensive weather information for the Cyclades islands. Plan your trip with monthly temperature, rainfall, sea conditions, and packing tips."
      />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-800 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cyclades Weather Guide
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Plan your perfect Greek island getaway with our detailed weather information, seasonal tips, and island-specific forecasts.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Selection Controls */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-3 py-2 text-sm rounded-md capitalize ${
                      selectedMonth === month
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {month.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Island Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Island
              </label>
              <select
                value={selectedIsland}
                onChange={(e) => setSelectedIsland(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Cyclades</option>
                {cyclades.map((island) => (
                  <option key={island.slug} value={island.slug}>
                    {island.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Current Weather Display */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 capitalize">
            {selectedMonth} Weather in the Cyclades
          </h2>
          
          {/* Weather Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {/* Temperature Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Temperature</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.temp.avg}°C</p>
                <p className="text-xs text-gray-500">
                  Min: {currentWeather.temp.min}°C / Max: {currentWeather.temp.max}°C
                </p>
              </div>
            </div>
            
            {/* Precipitation Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <CloudRain className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Rainfall</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.precipitation}mm</p>
                <p className="text-xs text-gray-500">Monthly Average</p>
              </div>
            </div>
            
            {/* Humidity Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <Droplet className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Humidity</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.humidity}%</p>
                <p className="text-xs text-gray-500">Average</p>
              </div>
            </div>
            
            {/* Wind Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <Wind className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Wind</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.windSpeed} km/h</p>
                <p className="text-xs text-gray-500">Average Speed</p>
              </div>
            </div>
            
            {/* Sea Temperature Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <Cloud className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Sea Temp</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.seaTemp}°C</p>
                <p className="text-xs text-gray-500">Average</p>
              </div>
            </div>
            
            {/* Sunshine Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-center mb-2">
                <Sun className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-center text-sm font-medium text-gray-700 mb-2">Sunshine</h3>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{currentWeather.sunHours}h</p>
                <p className="text-xs text-gray-500">Daily Average</p>
              </div>
            </div>
          </div>
          
          {/* Weather Description */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize">
              {selectedMonth} in the Cyclades: What to Expect
            </h3>
            <p className="text-gray-700 mb-6">
              {currentWeather.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recommended Clothing */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  What to Pack
                </h4>
                <p className="text-gray-700 text-sm">
                  {currentWeather.clothing}
                </p>
              </div>
              
              {/* Recommended Activities */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Recommended Activities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentWeather.activities.map((activity) => (
                    <span key={activity} className="bg-white text-sm text-gray-700 px-3 py-1 rounded-full border">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Island-Specific Weather */}
        {selectedIsland !== 'all' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              {cyclades.find(i => i.slug === selectedIsland)?.name} Weather Specifics
            </h2>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 mb-4">
                    While the general Cyclades weather patterns apply to {cyclades.find(i => i.slug === selectedIsland)?.name}, 
                    each island can have its own microclimate and specific conditions.
                  </p>
                  <p className="text-gray-700">
                    {cyclades.find(i => i.slug === selectedIsland)?.weather?.summer || 
                    `${cyclades.find(i => i.slug === selectedIsland)?.name} generally follows the typical Cycladic weather patterns with hot, dry summers and mild, occasionally rainy winters. The island can experience strong meltemi winds during summer months.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Weather Comparison Chart */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Year-Round Weather Comparison</h2>
          <div className="bg-white rounded-xl shadow-sm border p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Temp (°C)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rainfall (mm)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sea Temp (°C)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sun Hours</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crowd Level</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {months.map((month) => {
                  const data = weatherData[month as keyof typeof weatherData];
                  
                  // Determine crowd level
                  let crowdLevel = 'Low';
                  if (['july', 'august'].includes(month)) {
                    crowdLevel = 'Very High';
                  } else if (['june', 'september'].includes(month)) {
                    crowdLevel = 'High';
                  } else if (['may', 'october'].includes(month)) {
                    crowdLevel = 'Medium';
                  }
                  
                  return (
                    <tr key={month} className={selectedMonth === month ? 'bg-blue-50' : ''}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{month}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{data.temp.avg}°C</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{data.precipitation}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{data.seaTemp}°C</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{data.sunHours}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{crowdLevel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Best Time to Visit */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Best Time to Visit the Cyclades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summer Season */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-yellow-500 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Summer (June-August)</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">✓</span>
                    <span>Hot, sunny weather perfect for beaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">✓</span>
                    <span>Warm sea temperatures ideal for swimming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">✓</span>
                    <span>All tourist facilities and services open</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Very crowded with peak season prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Strong meltemi winds, especially in July-August</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Best for:</strong> Beach lovers, nightlife enthusiasts, water sports
                  </p>
                </div>
              </div>
            </div>
            
            {/* Shoulder Season */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-green-500 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Shoulder Season (May, Sept-Oct)</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Pleasant temperatures with warm days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Fewer crowds and lower prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Sea still warm enough for swimming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>Most tourist facilities still open</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Some rain possible in October</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Best for:</strong> Balanced experience, hiking, sightseeing, photography
                  </p>
                </div>
              </div>
            </div>
            
            {/* Winter Season */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-blue-500 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">Winter (Nov-April)</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Very few tourists and authentic local experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Lowest accommodation prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>Mild temperatures compared to northern Europe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Many tourist facilities closed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>Reduced ferry services and potential for cancellations</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Best for:</strong> Budget travelers, locals experience, hiking, photography
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weather FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Weather FAQ</h2>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to visit the Cyclades for good weather?</h3>
                <p className="text-gray-700">
                  The best weather in the Cyclades is from late May to early October, with June and September offering the perfect balance of warm temperatures and smaller crowds.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the meltemi winds and when do they occur?</h3>
                <p className="text-gray-700">
                  The meltemi is a strong, dry north wind that blows through the Aegean Sea, primarily in July and August. These winds can reach 7-8 Beaufort, affecting ferry schedules and making some beaches less pleasant.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I swim in the Cyclades in April or November?</h3>
                <p className="text-gray-700">
                  Sea temperatures in April (around 17°C) and November (around 19°C) are generally considered too cold for comfortable swimming by most visitors, though some may find it refreshing for short dips.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Which islands have the mildest winter weather?</h3>
                <p className="text-gray-700">
                  The southern Cyclades islands like Santorini, Anafi, and Ios typically have slightly milder winter temperatures compared to the northern islands like Andros or Tinos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there differences in weather between the islands?</h3>
                <p className="text-gray-700">
                  While the general climate is similar across the Cyclades, there can be microclimatic differences. Northern islands tend to be slightly cooler and windier, while southern islands are typically a bit warmer and drier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
