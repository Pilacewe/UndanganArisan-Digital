import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientPlayer } from '../utils/audioSynth';

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(ambientPlayer.getIsPlaying());
    };
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const newState = ambientPlayer.toggle();
    setIsPlaying(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-40 p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all duration-300 flex items-center justify-center ${
        isPlaying
          ? 'bg-[#701A24]/90 text-[#F5EDE0] border-[#D4AF37]/50 shadow-[#701A24]/30'
          : 'bg-white/80 text-[#6B5E5E] border-stone-200 hover:text-[#701A24]'
      }`}
      title={isPlaying ? 'Heningkan Musik' : 'Putar Musik'}
      aria-label="Kontrol Musik"
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-4 h-4 text-[#E0A96D] animate-spin-slow" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E0A96D] animate-ping" />
        </div>
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
};
