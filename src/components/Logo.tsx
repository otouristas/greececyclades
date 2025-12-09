import { Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'white';
  showPoweredBy?: boolean;
}

export default function Logo({ variant = 'default', showPoweredBy = true }: LogoProps) {
  const isWhite = variant === 'white';
  
  return (
    <div className="flex items-center gap-2">
      <img src="/favicon.svg" alt="Logo" className={`h-8 w-8 ${isWhite ? 'text-white' : 'text-blue-600'}`} />
      <div className="flex flex-col">
        <span className={`text-xl font-bold leading-tight ${
          isWhite 
            ? 'text-white' 
            : 'bg-gradient-to-r from-[#1E2E48] to-[#E3D7C3] bg-clip-text text-transparent'
        }`}>
          Discover Cyclades
        </span>
        {showPoweredBy && (
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyclades-turquoise" />
            <span className={`text-[10px] ${isWhite ? 'text-white/50' : 'text-gray-400'}`}>
              Powered by Touristas AI
            </span>
          </div>
        )}
      </div>
    </div>
  );
}