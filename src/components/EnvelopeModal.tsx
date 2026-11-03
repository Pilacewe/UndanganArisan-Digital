import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Heart, Sparkles, Music2, Edit3, Check } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';
import { ambientPlayer } from '../utils/audioSynth';

interface EnvelopeModalProps {
  guestName: string;
  onOpen: () => void;
  onUpdateGuestName: (newName: string) => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  guestName,
  onOpen,
  onUpdateGuestName,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(guestName);

  const handleOpenInvitation = () => {
    setIsOpening(true);

    // Trigger joyful confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#701A24', '#D4AF37', '#E0A96D', '#FFFFFF', '#881337'],
      });
    } catch {
      // Confetti fallback
    }

    // Start soft ambient background melody
    ambientPlayer.start();

    // Smooth delay before unmounting the cover
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateGuestName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#2B0E14]/95 via-[#1E090D]/95 to-[#120407]/98 backdrop-blur-md transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glowing effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#881337]/20 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE0] text-[#2D2424] rounded-3xl p-6 md:p-10 shadow-2xl border border-[#D4AF37]/30 text-center overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg" />

        {/* Small top emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#701A24] to-[#991B1B] text-[#F5EDE0] shadow-md border-2 border-[#D4AF37]/40">
          <Sparkles className="w-6 h-6 text-[#E0A96D]" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-[#701A24] font-semibold mb-1">
          Undangan Silaturahmi & Arisan
        </p>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] mb-2 tracking-tight">
          Keluarga Barista
        </h1>

        <p className="text-xs md:text-sm text-[#6B5E5E] max-w-sm mx-auto mb-6">
          Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara silaturahmi keluarga.
        </p>

        {/* Guest Name Card */}
        <div className="bg-white/80 rounded-2xl p-4 md:p-5 border border-[#E8D8C8] shadow-sm mb-6 max-w-md mx-auto">
          <p className="text-xs text-[#8C7A7A] uppercase tracking-wider mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>

          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Nama Tamu / Keluarga"
                className="flex-1 px-3 py-1.5 text-sm bg-white border border-[#D4AF37] rounded-lg text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24]"
                autoFocus
              />
              <button
                type="submit"
                className="p-2 bg-[#701A24] text-white rounded-lg hover:bg-[#881337] transition-colors"
                title="Simpan Nama"
              >
                <Check className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-[#701A24]">
                {guestName}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setTempName(guestName);
                  setIsEditingName(true);
                }}
                className="text-[#8C7A7A] hover:text-[#701A24] p-1 transition-colors"
                title="Ubah nama tamu"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <p className="text-[11px] text-[#A39292] mt-1.5">
            Di Tempat
          </p>
        </div>

        {/* Event quick date */}
        <div className="text-xs text-[#701A24] font-medium mb-6 flex items-center justify-center gap-2">
          <span>{EVENT_DETAILS.dateFormatted}</span>
          <span>·</span>
          <span>Pukul {EVENT_DETAILS.timeFormatted}</span>
        </div>

        {/* Open Invitation CTA */}
        <button
          type="button"
          onClick={handleOpenInvitation}
          className="group relative inline-flex items-center justify-center gap-3 w-full max-w-xs px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#701A24] via-[#881337] to-[#701A24] text-white font-medium text-sm shadow-xl shadow-[#701A24]/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#D4AF37]/50"
        >
          <MailOpen className="w-5 h-5 text-[#E0A96D] group-hover:rotate-12 transition-transform" />
          <span>Buka Undangan</span>
          <Sparkles className="w-4 h-4 text-[#E0A96D]" />
        </button>

        <p className="text-[11px] text-[#8C7A7A] mt-4 flex items-center justify-center gap-1.5">
          <Music2 className="w-3.5 h-3.5 text-[#701A24]" />
          <span>Latar musik lembut akan diputar saat dibuka</span>
        </p>

        {/* Small host credit */}
        <div className="mt-6 pt-4 border-t border-[#E8D8C8]/60 text-[11px] text-[#8C7A7A]">
          Kediaman {EVENT_DETAILS.hostName} · {EVENT_DETAILS.address}
        </div>
      </div>
    </div>
  );
};
