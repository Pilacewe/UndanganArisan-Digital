import React from 'react';
import { Heart, Coffee } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-24 px-4 text-center border-t border-[#E8D8C8] bg-gradient-to-b from-transparent to-[#F5EDE0]/60">
      <div className="max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-full bg-[#701A24]/10 text-[#701A24] mx-auto flex items-center justify-center mb-4">
          <Coffee className="w-5 h-5 text-[#701A24]" />
        </div>

        <blockquote className="font-serif italic text-sm md:text-base text-[#4A0E17] leading-relaxed mb-4 px-4">
          "Barangsiapa yang ingin dilapangkan rezekinya dan dipanjangkan umurnya, maka hendaklah ia menyambung tali silaturahmi."
        </blockquote>
        <cite className="text-xs text-[#8C7A7A] uppercase tracking-wider block not-italic mb-6">
          — H.R. Bukhari & Muslim —
        </cite>

        <div className="text-xs text-[#6B5E5E] space-y-1">
          <p className="font-semibold text-[#2D2424]">
            Keluarga Besar Barista
          </p>
          <p>Kediaman {EVENT_DETAILS.hostName}</p>
          <p>{EVENT_DETAILS.address}</p>
        </div>

        <div className="mt-8 text-[11px] text-[#A39292] flex items-center justify-center gap-1.5">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-[#701A24] fill-current" />
          <span>untuk kebersamaan keluarga</span>
        </div>
      </div>
    </footer>
  );
};
