import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Check } from 'lucide-react';
import PhraseCard from '../components/PhraseCard';
import GreekTranslator from '../components/GreekTranslator';
import { greekPhrases, phraseCategories } from '../data/greekPhrasesData';

export default function GreekPhrases() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter phrases based on category and search query
  const filteredPhrases = greekPhrases.filter(phrase => 
    (selectedCategory === 'all' || phrase.category === selectedCategory) &&
    (phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
     phrase.greek.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Essential Greek Phrases for Travelers | Greece Cyclades</title>
        <meta name="description" content="Learn essential Greek phrases for your trip to the Cyclades islands. Includes audio pronunciation, phonetic spelling, and a handy translation tool." />
        <link rel="canonical" href="https://greececyclades.com/greek-phrases" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('/images/greek-phrases-hero.jpg')" }}
        ></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 lg:py-40 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Essential Greek Phrases</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Learn useful Greek phrases with audio pronunciation to enhance your travel experience in the Cyclades
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Learn Some Greek for Your Trip?</h2>
          <p className="text-lg text-gray-600 mb-6">
            While many Greeks in tourist areas speak English, learning a few basic Greek phrases can greatly enhance your travel experience. 
            Locals appreciate the effort, and it can help you navigate more easily, especially in less touristy areas.
          </p>
          <p className="text-lg text-gray-600">
            We've compiled a list of essential phrases with audio pronunciation to help you communicate during your visit to the Cyclades islands.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search phrases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex-shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {phraseCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Showing {filteredPhrases.length} of {greekPhrases.length} phrases
            </p>
          </div>
        </div>

        {/* Phrases List */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {filteredPhrases.map(phrase => (
                <li key={phrase.id}>
                  <PhraseCard
                    english={phrase.english}
                    greek={phrase.greek}
                    pronunciation={phrase.pronunciation}
                    audioUrl={phrase.audioUrl}
                    category={phrase.category}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Translation Tool */}
        <div className="max-w-4xl mx-auto mb-12">
          <GreekTranslator />
        </div>

        {/* Tips for Pronunciation */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tips for Greek Pronunciation</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-medium">Stress marks:</span> In our pronunciation guide, the stressed syllable is indicated with capital letters (e.g., ka-lee-MER-ah).
                </p>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-medium">The Greek 'r':</span> This is rolled slightly, similar to the Spanish 'r'.
                </p>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-medium">The 'g' sound:</span> In Greek, this is more like the 'y' in "yes" when it appears before certain vowels.
                </p>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-medium">Listen to the audio:</span> The best way to learn is to listen to the native pronunciation and practice.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Practice Your Greek?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Explore the Cyclades islands and put your new language skills to use!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/islands" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Islands
            </a>
            <a 
              href="/ferry-guide" 
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Ferry Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
