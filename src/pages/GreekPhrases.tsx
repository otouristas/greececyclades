import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import SEO from '../components/SEO';
import PhraseCard from '../components/PhraseCard';
import GreekTranslator from '../components/GreekTranslator';
import { greekPhrases, phraseCategories } from '../data/greekPhrasesData';
import { generateKeywordsWithLSI, optimizeMetaDescription } from '../utils/seo';

export default function GreekPhrases() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter phrases based on category and search query
  const filteredPhrases = greekPhrases.filter(phrase => 
    (selectedCategory === 'all' || phrase.category === selectedCategory) &&
    (phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
     phrase.greek.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const faqItems = [
    {
      question: 'What are the most important Greek phrases to know?',
      answer: 'The most essential phrases include: Yia sas (hello), Efcharistó (thank you), Parakaló (please), Signómi (excuse me), Miláte angliká? (Do you speak English?), Póso káni? (How much?), and Kaliméra (good morning). These will help you navigate restaurants, shops, and basic interactions throughout the Cyclades islands.'
    },
    {
      question: 'Is English widely spoken in the Cyclades?',
      answer: 'Yes, English is widely spoken in tourist areas, hotels, restaurants, and shops throughout the Cyclades islands. However, learning a few basic Greek phrases is appreciated by locals and can be helpful in less touristy areas or when interacting with older residents. In remote villages, English may be less common.'
    },
    {
      question: 'How do you pronounce Greek travel phrases?',
      answer: 'Greek pronunciation can seem challenging, but our guide includes phonetic spellings and audio pronunciations for each phrase. Key tips: stress the capitalized syllables, roll the \'r\' sound slightly, and listen to the audio examples. Practice makes perfect - even attempting Greek phrases will be appreciated by locals.'
    },
    {
      question: 'What does Kalimera mean?',
      answer: 'Kalimera (Καλημέρα) means "good morning" in Greek. It\'s pronounced "ka-lee-MER-ah" with the stress on the third syllable. You can use it from early morning until around noon. After noon, Greeks switch to "Kalispera" (good afternoon/evening). It\'s one of the most common greetings you\'ll hear and use in the Cyclades.'
    }
  ];

  const seoData = {
    title: 'Essential Greek Travel Phrases for the Cyclades | Pronunciation Guide',
    description: optimizeMetaDescription(
      'Learn essential Greek phrases for your trip to the Cyclades islands with audio pronunciation. Master greetings, restaurant phrases, numbers, and common expressions. Free pronunciation guide with phonetic spelling to help you communicate like a local.'
    ),
    keywords: generateKeywordsWithLSI(
      ['Greek travel phrases', 'Greek phrases for tourists', 'Greek phrases Cyclades'],
      [
        'basic Greek phrases for tourists',
        'Greek phrases for travel with pronunciation',
        'common Greek phrases for travelers',
        'Greek words for tourists',
        'how to say hello in Greek',
        'Greek restaurant phrases'
      ],
      ['Greek language', 'Cyclades travel', 'Greece travel tips']
    ),
    ogImage: '/images/greek-phrases-hero.jpg',
    ogType: 'website' as const,
    faq: faqItems,
    pageType: 'general' as const,
    canonicalUrl: '/greek-phrases'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO {...seoData} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('/images/greek-phrases/greek-phrases-hero.jpg')" }}
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

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="max-w-4xl mx-auto mb-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Continue Planning Your Cyclades Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/best-cyclades-islands-to-visit" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-800 mb-2">Best Cyclades Islands</h3>
              <p className="text-sm text-gray-600">Discover the 15 best islands to visit in the Cyclades archipelago.</p>
            </Link>
            <Link 
              to="/ferry-guide" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-800 mb-2">Cyclades Ferry Guide</h3>
              <p className="text-sm text-gray-600">Learn how to navigate between islands with our complete ferry guide.</p>
            </Link>
            <Link 
              to="/blog/cyclades-7-day-island-hopping-itinerary" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-800 mb-2">7-Day Itinerary</h3>
              <p className="text-sm text-gray-600">Plan your perfect week-long island hopping adventure.</p>
            </Link>
            <Link 
              to="/islands" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-blue-800 mb-2">Explore All Islands</h3>
              <p className="text-sm text-gray-600">Browse detailed guides for every Cyclades island.</p>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Practice Your Greek?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Explore the Cyclades islands and put your new language skills to use!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/islands" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Islands
            </Link>
            <Link 
              to="/ferry-guide" 
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Ferry Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
