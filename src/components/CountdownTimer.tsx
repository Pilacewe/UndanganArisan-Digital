import React, { useState, useEffect } from 'react';
import { Calendar, CalendarPlus, Download, Check } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [copiedCal, setCopiedCal] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = EVENT_DETAILS.eventTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Google Calendar link
  // 4 Nov 2026 11:00 WIB (04:00 UTC) to 16:00 WIB (09:00 UTC)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Arisan & Silaturahmi Keluarga Barista'
  )}&dates=20261104T040000Z/20261104T090000Z&details=${encodeURIComponent(
    'Acara Arisan Keluarga Barista di kediaman D Mmh Adam / Mamik Digital. Alamat: Perumahan PK13 Blok H14 No. 1. Kontak: +62 812-1346-6786'
  )}&location=${encodeURIComponent('Perumahan PK13 Blok H14 No. 1')}`;

  // Download .ics file
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Arisan Keluarga Barista//ID
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Arisan & Silaturahmi Keluarga Barista
DESCRIPTION:Acara arisan keluarga barista di kediaman D Mmh Adam / Mamik Digital\\, Perumahan PK13 Blok H14 No. 1.
LOCATION:Perumahan PK13 Blok H14 No. 1
DTSTART:20261104T040000Z
DTEND:20261104T090000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'arisan-keluarga-barista-4nov2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white/90 to-[#FAF7F2]/90 backdrop-blur-md border border-[#E8D8C8] shadow-lg text-center">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#701A24] font-semibold mb-3">
        <Calendar className="w-4 h-4 text-[#C59B6D]" />
        <span>Hitung Mundur Acara</span>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#4A0E17] mb-2">
        Menuju Hari Silaturahmi
      </h3>

      <p className="text-xs md:text-sm text-[#736363] mb-6">
        {EVENT_DETAILS.dateFormatted} · Pukul {EVENT_DETAILS.timeFormatted}
      </p>

      {timeLeft.isExpired ? (
        <div className="p-4 rounded-2xl bg-[#701A24]/10 text-[#701A24] font-semibold text-base mb-6">
          Alhamdulillah acara sedang berlangsung / telah terlaksana. Terima kasih atas kehadirannya!
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE0] p-3 md:p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
            <span className="block font-mono text-2xl md:text-4xl font-bold text-[#701A24] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[11px] md:text-xs text-[#8C7A7A] uppercase font-medium">Hari</span>
          </div>

          <div className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE0] p-3 md:p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
            <span className="block font-mono text-2xl md:text-4xl font-bold text-[#701A24] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] md:text-xs text-[#8C7A7A] uppercase font-medium">Jam</span>
          </div>

          <div className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE0] p-3 md:p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
            <span className="block font-mono text-2xl md:text-4xl font-bold text-[#701A24] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] md:text-xs text-[#8C7A7A] uppercase font-medium">Menit</span>
          </div>

          <div className="bg-gradient-to-b from-[#FAF7F2] to-[#F5EDE0] p-3 md:p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
            <span className="block font-mono text-2xl md:text-4xl font-bold text-[#701A24] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] md:text-xs text-[#8C7A7A] uppercase font-medium">Detik</span>
          </div>
        </div>
      )}

      {/* Calendar Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#701A24] text-white text-xs font-medium hover:bg-[#881337] transition-all shadow-md active:scale-95"
        >
          <CalendarPlus className="w-4 h-4 text-[#E0A96D]" />
          <span>Simpan ke Google Calendar</span>
        </a>

        <button
          type="button"
          onClick={handleDownloadICS}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E8D8C8] text-[#701A24] text-xs font-medium hover:bg-[#F5EDE0] transition-all active:scale-95 shadow-sm"
        >
          {copiedCal ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Kalender Tersimpan!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#C59B6D]" />
              <span>Unduh Kalender (.ics)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
