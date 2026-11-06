import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Users, CheckCircle, HelpCircle, XCircle, MessageSquareQuote, Check } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';
import { AttendanceStatus, RsvpEntry } from '../types';

interface RsvpSectionProps {
  initialGuestName?: string;
  onAddGuestbook: (entry: RsvpEntry) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  initialGuestName = '',
  onAddGuestbook,
}) => {
  const [name, setName] = useState(initialGuestName);
  const [status, setStatus] = useState<AttendanceStatus>('hadir');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const statusText =
      status === 'hadir'
        ? 'Pasti Hadir (InsyaAllah)'
        : status === 'ragu'
        ? 'Masih Diusahakan / Ragu-ragu'
        : 'Mohon Maaf Berhalangan Hadir';

    // Build polite WhatsApp message
    const waText = `*KONFIRMASI KEHADIRAN ARISAN KELUARGA BARISTA*
Kepada Yth: ${EVENT_DETAILS.hostName}
Alamat: ${EVENT_DETAILS.address}
Waktu: ${EVENT_DETAILS.dateFormatted} (${EVENT_DETAILS.timeFormatted})

----------------------------------------
*Nama:* ${name.trim()}
*Status:* ${statusText}
*Jumlah Rombongan:* ${status === 'tidak' ? '0' : guestCount} Orang
*Pesan & Doa:* ${message.trim() || 'Semoga acara arisan keluarga barista berkah, sehat, dan penuh kebahagiaan.'}
----------------------------------------

Terima kasih atas undangannya. Wassalamu'alaikum Wr. Wb.`;

    // Save to guestbook
    const newEntry: RsvpEntry = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      status,
      guestCount: status === 'tidak' ? 0 : guestCount,
      message: message.trim() || 'Semoga silaturahmi kita semakin berkah dan mempererat persaudaraan.',
      createdAt: new Date().toISOString(),
    };
    onAddGuestbook(newEntry);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#701A24', '#D4AF37', '#10B981'],
      });
    } catch {
      // fallback
    }

    setIsSubmitted(true);

    // Open WhatsApp URL
    const waUrl = `https://api.whatsapp.com/send?phone=${EVENT_DETAILS.whatsappNumber}&text=${encodeURIComponent(
      waText
    )}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="rsvp" className="py-12 px-4 md:px-8 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold block mb-1">
          Konfirmasi Kehadiran
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] tracking-tight">
          RSVP via WhatsApp
        </h2>
        <p className="text-xs md:text-sm text-[#736363] max-w-md mx-auto mt-2">
          Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk memudahkan tuan rumah menyiapkan sajian dan tempat terbaik.
        </p>
        <div className="w-16 h-0.5 bg-[#C59B6D] mx-auto mt-3" />
      </div>

      <div className="bg-white/90 rounded-3xl p-6 md:p-10 border border-[#E8D8C8] shadow-md relative overflow-hidden">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#701A24] to-[#881337] text-white text-[11px] font-medium px-4 py-1 rounded-bl-2xl shadow-xs">
          WhatsApp: {EVENT_DETAILS.displayPhone}
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4A0E17] mb-2">
              Konfirmasi Terkirim ke WhatsApp!
            </h3>
            <p className="text-sm text-[#6B5E5E] max-w-md mx-auto mb-6">
              Terima kasih <strong>{name}</strong>  Doa dan pesan Anda telah tersimpan di Buku Tamu.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-[#701A24] text-xs font-semibold hover:bg-[#F5EDE0] transition-colors"
            >
              Ubah / Kirim Konfirmasi Baru
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Nama */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#701A24] font-semibold mb-2">
                Nama Lengkap / Nama Keluarga <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Keluarga Budi & Rina"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-sm text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24] focus:bg-white transition-all"
              />
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#701A24] font-semibold mb-2">
                Status Kehadiran <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('hadir')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                    status === 'hadir'
                      ? 'bg-[#701A24] text-white border-[#701A24] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6B5E5E] border-[#E8D8C8] hover:bg-white'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${status === 'hadir' ? 'text-[#E0A96D]' : 'text-emerald-600'}`} />
                  <span>InsyaAllah Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('ragu')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                    status === 'ragu'
                      ? 'bg-[#701A24] text-white border-[#701A24] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6B5E5E] border-[#E8D8C8] hover:bg-white'
                  }`}
                >
                  <HelpCircle className={`w-4 h-4 ${status === 'ragu' ? 'text-[#E0A96D]' : 'text-amber-500'}`} />
                  <span>Masih Ragu-ragu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('tidak')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                    status === 'tidak'
                      ? 'bg-[#701A24] text-white border-[#701A24] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6B5E5E] border-[#E8D8C8] hover:bg-white'
                  }`}
                >
                  <XCircle className={`w-4 h-4 ${status === 'tidak' ? 'text-[#E0A96D]' : 'text-rose-500'}`} />
                  <span>Berhalangan Hadir</span>
                </button>
              </div>
            </div>

            {/* Jumlah Rombongan */}
            {status !== 'tidak' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#701A24] font-semibold mb-2">
                  Jumlah Orang yang Hadir
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 rounded-xl border border-[#E8D8C8]">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          guestCount === num
                            ? 'bg-[#701A24] text-white shadow-xs'
                            : 'text-[#6B5E5E] hover:text-[#701A24]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-[#8C7A7A]">
                    {guestCount} Orang
                  </span>
                </div>
              </div>
            )}

            {/* Pesan & Doa */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#701A24] font-semibold mb-2">
                Doa & Pesan Hangat untuk Keluarga
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat atau doa silaturahmi untuk tuan rumah & keluarga..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-sm text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Tombol Kirim WhatsApp */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>Kirim Konfirmasi via</span>
            </button>

            <p className="text-[11px] text-center text-[#8C7A7A]">
              Menekan tombol di atas akan membuka aplikasi WhatsApp Anda dengan pesan terformat otomatis.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
