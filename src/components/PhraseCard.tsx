import { useState } from 'react';
import { Volume2, Pause } from 'lucide-react';

interface PhraseCardProps {
  english: string;
  greek: string;
  pronunciation: string;
  audioUrl: string;
  category: string;
}

export default function PhraseCard({ english, greek, pronunciation, audioUrl, category }: PhraseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Function to play audio
  const playAudio = () => {
    if (isPlaying && audio) {
      // Stop current audio
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }
    
    // Create new audio instance
    const newAudio = new Audio(audioUrl);
    
    // Set up event listeners
    newAudio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    newAudio.addEventListener('error', (e) => {
      console.error('Error playing audio:', e);
      setIsPlaying(false);
      // Here you could show a message to the user that audio failed to play
    });
    
    // Play the audio
    newAudio.play().catch(error => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    });
    
    // Update state
    setAudio(newAudio);
    setIsPlaying(true);
  };
  
  return (
    <div className="p-6 hover:bg-blue-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-lg font-medium text-gray-800">{english}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{greek}</p>
          <p className="text-sm text-gray-600 mt-2">Pronunciation: <span className="font-medium">{pronunciation}</span></p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-3">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={playAudio}
            className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
              isPlaying ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            } hover:bg-blue-200 transition-colors shadow-sm`}
            aria-label={`Play pronunciation of ${english}`}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}
