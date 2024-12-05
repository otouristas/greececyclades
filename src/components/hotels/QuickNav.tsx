import React from 'react';
import { Bed, Utensils, MapPin, Image, Euro, Star, Leaf, Phone } from 'lucide-react';

export default function QuickNav() {
  const navItems = [
    { icon: Bed, label: 'Rooms', href: '#rooms' },
    { icon: Utensils, label: 'Dining', href: '#dining' },
    { icon: MapPin, label: 'Location', href: '#location' },
    { icon: Image, label: 'Gallery', href: '#gallery' },
    { icon: Euro, label: 'Pricing', href: '#pricing' },
    { icon: Star, label: 'Reviews', href: '#reviews' },
    { icon: Leaf, label: 'Sustainability', href: '#sustainability' },
    { icon: Phone, label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-16 bg-white border-b z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 gap-8 no-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 whitespace-nowrap"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}