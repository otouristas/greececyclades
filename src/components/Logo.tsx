import { Compass } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'white';
}

export default function Logo({ variant = 'default' }: LogoProps) {
  const isWhite = variant === 'white';
  
  return (
    <div className="flex items-center gap-2">
      <img src="/favicon.svg" alt="Logo" className={`h-8 w-8 ${isWhite ? 'text-white' : 'text-blue-600'}`} />
      <span className={`text-2xl font-bold ${
        isWhite 
          ? 'text-white' 
          : 'bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] bg-clip-text text-transparent'
      }`}>
        Discover Cyclades
      </span>
    </div>
  );
}