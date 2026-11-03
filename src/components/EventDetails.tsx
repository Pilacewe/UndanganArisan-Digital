import React from 'react';
import { Clock, MapPin, Users, HeartHandshake, Sparkles, Coffee, Camera, Shirt } from 'lucide-react';
import { EVENT_DETAILS, RUNDOWN_ITEMS } from '../data/invitationData';

export const EventDetails: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-4 h-4 text-[#701A24]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-[#701A24]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#701A24]" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-[#701A24]" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-[#701A24]" />;
      default:
        return <Clock className="w-4 h-4 text-[#701A24]" />;
    }
  };

  return (
    <section id="event-details" className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold block mb-1">
          Rincian Kegiatan
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] tracking-tight">
          Agenda & Waktu Acara
        </h2>
        <div className="w-16 h-0.5 bg-[#C59B6D] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Hari & Tanggal */}
        <div className="bg-white/90 p-6 rounded-3xl border border-[#E8D8C8] shadow-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-center text-[#701A24] mb-4">
            <Clock className="w-6 h-6 text-[#701A24]" />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#8C7A7A] font-semibold mb-1">
            Hari & Tanggal
          </span>
          <h3 className="font-serif text-xl font-bold text-[#701A24] mb-1">
            {EVENT_DETAILS.dateFormatted}
          </h3>
          <p className="text-xs text-[#6B5E5E]">
            Pukul {EVENT_DETAILS.timeFormatted}
          </p>
        </div>

        {/* Card 2: Lokasi & Kediaman */}
        <div className="bg-white/90 p-6 rounded-3xl border border-[#E8D8C8] shadow-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-center text-[#701A24] mb-4">
            <MapPin className="w-6 h-6 text-[#701A24]" />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#8C7A7A] font-semibold mb-1">
            Tempat Acara
          </span>
          <h3 className="font-serif text-xl font-bold text-[#701A24] mb-1">
            Kediaman {EVENT_DETAILS.hostName}
          </h3>
          <p className="text-xs text-[#6B5E5E]">
            {EVENT_DETAILS.address}
          </p>
        </div>

        {/* Card 3: Pakaian / Dresscode */}
        <div className="bg-white/90 p-6 rounded-3xl border border-[#E8D8C8] shadow-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-center text-[#701A24] mb-4">
            <Shirt className="w-6 h-6 text-[#701A24]" />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#8C7A7A] font-semibold mb-1">
            Dresscode
          </span>
          <h3 className="font-serif text-lg font-bold text-[#701A24] mb-1">
            Maroon, Earthy / Bebas Rapi
          </h3>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="w-4 h-4 rounded-full bg-[#701A24] border border-white shadow-xs" title="Maroon" />
            <span className="w-4 h-4 rounded-full bg-[#C59B6D] border border-white shadow-xs" title="Gold/Rose" />
            <span className="w-4 h-4 rounded-full bg-[#967259] border border-white shadow-xs" title="Warm Coffee" />
            <span className="w-4 h-4 rounded-full bg-[#F5EDE0] border border-stone-300 shadow-xs" title="Cream" />
          </div>
        </div>
      </div>

      {/* Special Barista & Family Note */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#701A24] to-[#881337] text-white shadow-md mb-12 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
          <Coffee className="w-7 h-7 text-[#E0A96D]" />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold text-[#FAF7F2] mb-1">
            Sajian Kopi & Hidangan Khas Barista
          </h4>
          <p className="text-xs md:text-sm text-[#F5EDE0]/90 leading-relaxed">
            Spesial menyambut kehadiran keluarga tercinta, akan disajikan racikan minuman kopi barista hangat dan dingin serta santapan siang istimewa penuh kelezatan.
          </p>
        </div>
      </div>

      {/* Rundown Timeline */}
      <div className="bg-white/90 rounded-3xl p-6 md:p-8 border border-[#E8D8C8] shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8D8C8]">
          <Clock className="w-5 h-5 text-[#701A24]" />
          <div>
            <h3 className="font-serif text-xl font-bold text-[#4A0E17]">
              Susunan Acara (Rundown)
            </h3>
            <p className="text-xs text-[#8C7A7A]">
              Jadwal pelaksanaan arisan & silaturahmi keluarga
            </p>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[#E8D8C8] before:h-full">
          {RUNDOWN_ITEMS.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-2">
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#FAF7F2] border-2 border-[#C59B6D] flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(item.iconName)}
              </div>
              <div className="flex-1 bg-[#FAF7F2]/60 p-4 rounded-2xl border border-[#E8D8C8]/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className="font-semibold text-sm text-[#2D2424]">
                    {item.title}
                  </h4>
                  <span className="text-xs font-mono font-medium text-[#701A24] bg-[#701A24]/10 px-2.5 py-0.5 rounded-full w-fit">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-[#6B5E5E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
