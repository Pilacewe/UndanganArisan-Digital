import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, PhoneCall, Info } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';

export const InteractiveMap: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold block mb-1">
          Petunjuk Arah & Peta
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] tracking-tight">
          Peta Lokasi Acara
        </h2>
        <div className="w-16 h-0.5 bg-[#C59B6D] mx-auto mt-3" />
      </div>

      <div className="bg-white/90 rounded-3xl border border-[#E8D8C8] shadow-md overflow-hidden">
        {/* Interactive Map Embed Container */}
        <div className="relative w-full h-72 sm:h-96 bg-[#F5EDE0] border-b border-[#E8D8C8] overflow-hidden">
          {/* Interactive OpenStreetMap Embed */}
          <iframe
            title="Peta Lokasi Perumahan PK13 Blok H14 No 1"
            className="w-full h-full border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.80%2C-6.30%2C106.90%2C-6.20&amp;layer=mapnik&amp;marker=-6.25%2C106.85"
            loading="lazy"
          />

          {/* Floating Address Overlay Card */}
          <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8D8C8] shadow-lg flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#701A24] text-white shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#E0A96D]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-xs text-[#701A24] uppercase tracking-wide">
                Kediaman Tuan Rumah
              </h4>
              <p className="text-sm font-bold text-[#2D2424]">
                {EVENT_DETAILS.hostName}
              </p>
              <p className="text-xs text-[#6B5E5E] mt-0.5">
                {EVENT_DETAILS.address}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons & Guidance */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E8D8C8]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C7A7A] font-semibold block mb-1">
                Alamat Lengkap
              </span>
              <p className="text-sm md:text-base font-semibold text-[#2D2424]">
                {EVENT_DETAILS.fullAddress}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-xs font-semibold text-[#701A24] hover:bg-[#F5EDE0] transition-colors shrink-0 active:scale-95 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C59B6D]" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <a
              href={EVENT_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#701A24] text-white text-xs md:text-sm font-medium hover:bg-[#881337] transition-all shadow-md shadow-[#701A24]/20 active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#E0A96D]" />
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={EVENT_DETAILS.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white border border-[#E8D8C8] text-[#2D2424] text-xs md:text-sm font-medium hover:bg-[#FAF7F2] transition-all shadow-sm active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#33CCFF]" />
              <span>Navigasi dengan Waze</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Patokan Jalan & Info Kontak Tuan Rumah */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8D8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#C59B6D] shrink-0 mt-0.5" />
              <div className="text-xs text-[#6B5E5E] leading-relaxed">
                <span className="font-semibold text-[#2D2424] block">Panduan Patokan Jalan:</span>
                Masuk melalui gerbang utama Perumahan PK13, ikuti jalan utama lurus menuju deretan Blok H, dan temukan Blok H14 No. 1 (Kediaman D Mmh Adam / Mamik Digital). Parkir tersedia nyaman.
              </div>
            </div>

            <a
              href={`https://wa.me/${EVENT_DETAILS.whatsappNumber}?text=${encodeURIComponent('Halo Mamik / Adam, saya sedang dalam perjalanan menuju Perumahan PK13 Blok H14 No 1 untuk arisan keluarga barista.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors shrink-0 self-end sm:self-center"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Tanya Arah ke Panitia</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
