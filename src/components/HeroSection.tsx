import React from 'react';
import { Sparkles, MapPin, Calendar, CheckCircle2, Share2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';

interface HeroSectionProps {
  onOpenShareModal: () => void;
  onScrollToRsvp: () => void;
  onScrollToMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShareModal,
  onScrollToRsvp,
  onScrollToMap,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 px-4 md:px-8 text-center overflow-hidden">
      {/* Decorative top arabesque ornament / bismillah */}
      <div className="max-w-2xl mx-auto mb-6">
        <p className="font-serif text-xl md:text-2xl text-[#701A24] font-medium tracking-wide mb-2 italic">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold">
          Undangan Silaturahmi & Arisan Rutin
        </p>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A0E17] tracking-tight mb-4">
        Keluarga Barista
      </h1>

      <p className="text-sm md:text-base text-[#6B5E5E] max-w-lg mx-auto leading-relaxed mb-6 font-light">
        "Menyambung tali silaturahmi, merajut kehangatan, dan mempererat persaudaraan keluarga besar dalam suasana penuh kebahagiaan."
      </p>

      {/* Host & Location Card */}
      <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-4 md:px-8 md:py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E8D8C8] shadow-sm max-w-xl mx-auto mb-8">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#701A24] border border-[#E8D8C8]">
            <Calendar className="w-5 h-5 text-[#701A24]" />
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#8C7A7A] font-medium">Waktu Acara</span>
            <span className="block text-sm font-semibold text-[#2D2424]">{EVENT_DETAILS.dateFormatted}</span>
            <span className="block text-xs text-[#701A24]">{EVENT_DETAILS.timeFormatted}</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-[#E8D8C8]" />

        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#701A24] border border-[#E8D8C8]">
            <MapPin className="w-5 h-5 text-[#701A24]" />
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#8C7A7A] font-medium">Tuan Rumah</span>
            <span className="block text-sm font-semibold text-[#2D2424]">{EVENT_DETAILS.hostName}</span>
            <span className="block text-xs text-[#6B5E5E] truncate max-w-[180px]">{EVENT_DETAILS.address}</span>
          </div>
        </div>
      </div>

      {/* Quick Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onScrollToRsvp}
          className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#701A24] text-white text-xs md:text-sm font-medium hover:bg-[#881337] transition-all shadow-md shadow-[#701A24]/20 active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-[#E0A96D]" />
          <span>Konfirmasi Kehadiran</span>
        </button>

        <button
          type="button"
          onClick={onScrollToMap}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E8D8C8] text-[#701A24] text-xs md:text-sm font-medium hover:bg-[#FAF7F2] transition-all shadow-sm active:scale-95"
        >
          <MapPin className="w-4 h-4 text-[#C59B6D]" />
          <span>Petunjuk Lokasi</span>
        </button>

        <button
          type="button"
          onClick={onOpenShareModal}
          className="p-3 rounded-xl bg-white border border-[#E8D8C8] text-[#6B5E5E] hover:text-[#701A24] hover:bg-[#FAF7F2] transition-all shadow-sm active:scale-95"
          title="Bagikan Tautan Undangan"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
