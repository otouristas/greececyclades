import React, { useState } from 'react';
import { Search, Volume2 } from 'lucide-react';

interface Phrase {
  english: string;
  greek: string;
  pronunciation: string;
  category: string;
}

const commonPhrases: Phrase[] = [
  {
    english: "Hello",
    greek: "Γεια σας",
    pronunciation: "YAH-sas",
    category: "Greetings"
  },
  {
    english: "Good morning",
    greek: "Καλημέρα",
    pronunciation: "ka-lee-ME-ra",
    category: "Greetings"
  },
  {
    english: "Good evening",
    greek: "Καλησπέρα",
    pronunciation: "ka-lee-SPE-ra",
    category: "Greetings"
  },
  {
    english: "Thank you",
    greek: "Ευχαριστώ",
    pronunciation: "ef-kha-ree-STO",
    category: "Courtesy"
  },
  {
    english: "Please",
    greek: "Παρακαλώ",
    pronunciation: "pa-ra-ka-LO",
    category: "Courtesy"
  },
  {
    english: "Yes",
    greek: "Ναι",
    pronunciation: "ne",
    category: "Basic"
  },
  {
    english: "No",
    greek: "Όχι",
    pronunciation: "O-hi",
    category: "Basic"
  },
  {
    english: "Where is...?",
    greek: "Πού είναι...;",
    pronunciation: "poo EE-neh",
    category: "Questions"
  },
  {
    english: "How much?",
    greek: "Πόσο κάνει;",
    pronunciation: "PO-so KA-ni",
    category: "Shopping"
  },
  {
    english: "The bill please",
    greek: "Τον λογαριασμό παρακαλώ",
    pronunciation: "ton lo-ga-ria-SMO pa-ra-ka-LO",
    category: "Restaurant"
  }
];

const categories = Array.from(new Set(commonPhrases.map(phrase => phrase.category)));

export default function Translation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredPhrases = commonPhrases.filter(phrase => {
    const matchesSearch = phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         phrase.greek.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'el-GR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Greek Phrases</h3>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search phrases..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              !selectedCategory ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredPhrases.map((phrase, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">{phrase.english}</div>
                  <div className="font-medium">{phrase.greek}</div>
                  <div className="text-sm text-gray-500">/{phrase.pronunciation}/</div>
                </div>
                <button
                  onClick={() => playAudio(phrase.greek)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}