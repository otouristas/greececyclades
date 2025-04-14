import { useState } from 'react';
import { ArrowRight, Volume2 } from 'lucide-react';

// Basic translation dictionary for common phrases
const translationDictionary: Record<string, { greek: string; pronunciation: string }> = {
  'hello': { greek: 'Γειά σου', pronunciation: 'YAH-soo' },
  'good morning': { greek: 'Καλημέρα', pronunciation: 'ka-lee-MER-ah' },
  'good evening': { greek: 'Καλησπέρα', pronunciation: 'ka-lee-SPER-ah' },
  'goodbye': { greek: 'Αντίο', pronunciation: 'an-DEE-o' },
  'thank you': { greek: 'Ευχαριστώ', pronunciation: 'ef-kha-ree-STO' },
  'please': { greek: 'Παρακαλώ', pronunciation: 'para-ka-LO' },
  'yes': { greek: 'Ναι', pronunciation: 'ne' },
  'no': { greek: 'Όχι', pronunciation: 'OH-hee' },
  'excuse me': { greek: 'Με συγχωρείτε', pronunciation: 'me seen-ho-REE-te' },
  'how are you': { greek: 'Πώς είσαι', pronunciation: 'pos EE-se' },
  'i am fine': { greek: 'Είμαι καλά', pronunciation: 'EE-me ka-LA' },
  'my name is': { greek: 'Με λένε', pronunciation: 'me LE-ne' },
  'where is': { greek: 'Πού είναι', pronunciation: 'poo EE-ne' },
  'how much': { greek: 'Πόσο κοστίζει', pronunciation: 'PO-so ko-STEE-zi' },
  'i dont understand': { greek: 'Δεν καταλαβαίνω', pronunciation: 'then ka-ta-la-VE-no' },
  'do you speak english': { greek: 'Μιλάτε αγγλικά', pronunciation: 'mi-LA-te an-gli-KA' },
  'i need help': { greek: 'Χρειάζομαι βοήθεια', pronunciation: 'hri-A-zo-me vo-I-thi-a' },
  'water': { greek: 'Νερό', pronunciation: 'ne-RO' },
  'food': { greek: 'Φαγητό', pronunciation: 'fa-yi-TO' },
  'restaurant': { greek: 'Εστιατόριο', pronunciation: 'e-stia-TO-rio' },
  'beach': { greek: 'Παραλία', pronunciation: 'pa-ra-LI-a' },
  'hotel': { greek: 'Ξενοδοχείο', pronunciation: 'kse-no-do-HI-o' },
  'bathroom': { greek: 'Τουαλέτα', pronunciation: 'twa-LE-ta' },
  'bus': { greek: 'Λεωφορείο', pronunciation: 'le-o-fo-RI-o' },
  'taxi': { greek: 'Ταξί', pronunciation: 'ta-KSI' },
  'ferry': { greek: 'Πλοίο', pronunciation: 'PLI-o' },
  'airport': { greek: 'Αεροδρόμιο', pronunciation: 'a-e-ro-DRO-mio' },
};

// Languages supported for translation
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
];

export default function GreekTranslator() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [translation, setTranslation] = useState<{ greek: string; pronunciation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to translate text
  const translateText = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      // Simple translation logic - look for exact matches or word-by-word translation
      const lowerInput = inputText.toLowerCase();
      
      // Check for exact phrase match
      if (translationDictionary[lowerInput]) {
        setTranslation(translationDictionary[lowerInput]);
        setIsLoading(false);
        return;
      }
      
      // Try to match individual words
      const words = lowerInput.split(' ');
      if (words.length > 1) {
        const translatedWords = words.map(word => {
          return translationDictionary[word]?.greek || word;
        });
        
        const translatedPronunciations = words.map(word => {
          return translationDictionary[word]?.pronunciation || word;
        });
        
        // Only set as translation if at least one word was translated
        if (translatedWords.some(word => translationDictionary[word]?.greek)) {
          setTranslation({
            greek: translatedWords.join(' '),
            pronunciation: translatedPronunciations.join(' ')
          });
          setIsLoading(false);
          return;
        }
      }
      
      // Fallback for phrases not in our dictionary
      setTranslation({
        greek: 'Translation not available',
        pronunciation: 'Please try a simpler phrase or common words'
      });
      setIsLoading(false);
    }, 800);
  };

  // Function to play audio (placeholder for now)
  const playAudio = () => {
    // In a real implementation, this would use a text-to-speech API
    alert('Audio pronunciation would play here. This feature requires a text-to-speech API integration.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Greek Translation Tool</h2>
      
      <p className="text-center text-gray-600 mb-8">
        Translate words and short phrases to Greek. This is a simple tool to help you communicate during your trip.
      </p>
      
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <label htmlFor="source-language" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              id="source-language"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-grow">
            <label htmlFor="target-language" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              id="target-language"
              value="el"
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            >
              <option value="el">Greek</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="translate-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter text to translate
          </label>
          <input
            id="translate-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Hello, how are you?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={translateText}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 shadow-sm"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Translating</span>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              </>
            ) : (
              <>
                Translate <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {translation && (
          <div className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Translation:</p>
                <p className="text-2xl font-medium text-blue-700">{translation.greek}</p>
                <p className="text-sm text-gray-600 mt-3">Pronunciation: <span className="font-medium">{translation.pronunciation}</span></p>
              </div>
              <button
                onClick={playAudio}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm"
                aria-label="Play pronunciation"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <p className="text-sm text-gray-500 italic text-center">
          Note: This is a simple translation tool with a limited dictionary and may not be 100% accurate for complex phrases or grammar.
        </p>
      </div>
    </div>
  );
}
