import React from 'react';
import { LightbulbIcon, Clock, Euro, Sun } from 'lucide-react';
import { Island } from '../../types';

interface LocalTipsProps {
  island: Island;
}

export default function LocalTips({ island }: LocalTipsProps) {
  const tips = [
    {
      icon: Clock,
      title: 'Best Times',
      tips: [
        'Visit popular spots early morning or late afternoon',
        'Make restaurant reservations in advance during peak season',
        'Plan outdoor activities considering the summer heat'
      ]
    },
    {
      icon: Euro,
      title: 'Money Saving',
      tips: [
        'Use local buses for transportation',
        'Look for accommodation in less touristy areas',
        'Try local tavernas away from main tourist spots'
      ]
    },
    {
      icon: Sun,
      title: 'Local Customs',
      tips: [
        'Respect siesta time (2-5 PM) in smaller villages',
        'Dress modestly when visiting churches',
        'Greet locals with "Kalimera" (good morning) or "Kalispera" (good evening)'
      ]
    },
    {
      icon: LightbulbIcon,
      title: 'Insider Tips',
      tips: [
        'Ask locals for hidden beach recommendations',
        'Try local specialties unique to the island',
        'Visit local markets for authentic products'
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {tips.map((section) => (
        <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <section.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">{section.title}</h3>
          </div>
          <ul className="space-y-3">
            {section.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="text-blue-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}