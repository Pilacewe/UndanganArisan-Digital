import React, { useState } from 'react';
import { MessageSquareHeart, Send, Heart, User, CheckCircle2, HelpCircle } from 'lucide-react';
import { RsvpEntry } from '../types';

interface GuestbookSectionProps {
  entries: RsvpEntry[];
  onAddEntry: (entry: RsvpEntry) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  entries,
  onAddEntry,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: RsvpEntry = {
      id: 'quick-' + Date.now(),
      name: name.trim(),
      status: 'hadir',
      guestCount: 1,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddEntry(newEntry);
    setName('');
    setMessage('');
    setQuickSubmitted(true);
    setTimeout(() => setQuickSubmitted(false), 3000);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Baru saja';
    }
  };

  return (
    <section id="guestbook" className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold block mb-1">
          Untaian Doa & Harapan
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] tracking-tight">
          Buku Tamu Keluarga
        </h2>
        <p className="text-xs md:text-sm text-[#736363] max-w-md mx-auto mt-2">
          Kirimkan doa kebaikan, kehangatan, dan ucapan bahagia untuk arisan keluarga barista.
        </p>
        <div className="w-16 h-0.5 bg-[#C59B6D] mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Quick Send Form (2 cols on md) */}
        <div className="md:col-span-2 bg-white/90 p-6 rounded-3xl border border-[#E8D8C8] shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8D8C8]">
            <MessageSquareHeart className="w-5 h-5 text-[#701A24]" />
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
              Kirim Doa Restu
            </h3>
          </div>

          {quickSubmitted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs text-center border border-emerald-200">
              Doa dan ucapan Anda berhasil ditambahkan ke buku tamu. Terima kasih!
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#701A24] font-semibold mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama / Panggilan..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#701A24] font-semibold mb-1">
                  Doa / Ucapan Hangat
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#701A24] text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#881337] transition-all shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-[#E0A96D]" />
                <span>Kirim Ucapan</span>
              </button>
            </form>
          )}
        </div>

        {/* Guestbook List (3 cols on md) */}
        <div className="md:col-span-3 bg-white/90 p-6 rounded-3xl border border-[#E8D8C8] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8D8C8]">
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
              Pesan Masuk ({entries.length})
            </h3>
            <span className="text-[11px] text-[#8C7A7A]">
              Terbaru ditampilkan
            </span>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {entries.length === 0 ? (
              <p className="text-xs text-[#8C7A7A] text-center py-8">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa!
              </p>
            ) : (
              entries.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#E8D8C8]/80 text-left transition-all hover:bg-[#FAF7F2]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#701A24]/10 text-[#701A24] flex items-center justify-center text-xs font-bold">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2D2424]">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-[#8C7A7A]">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    {item.status === 'hadir' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Hadir ({item.guestCount || 1} Org)</span>
                      </span>
                    )}
                    {item.status === 'ragu' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <HelpCircle className="w-3 h-3" />
                        <span>Ragu-ragu</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#4A3E3E] leading-relaxed pl-9">
                    "{item.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
