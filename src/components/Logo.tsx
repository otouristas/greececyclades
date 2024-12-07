import React from 'react';
import { Compass } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Compass className="h-8 w-8 text-blue-600" />
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Discover Cyclades
      </span>
    </div>
  );
}