import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send } from 'lucide-react';
import { EVENT_DETAILS } from '../data/invitationData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGuestName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  currentGuestName,
}) => {
  const [recipient, setRecipient] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetName = recipient.trim() || currentGuestName || 'Keluarga Besar Barista';
  const shareUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(targetName)}`;

  const shareText = `*UNDANGAN SILATURAHMI & ARISAN KELUARGA BARISTA*

Kepada Yth: *${targetName}*

Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara arisan & silaturahmi keluarga:

📅 *Hari/Tanggal:* ${EVENT_DETAILS.dateFormatted}
⏰ *Waktu:* ${EVENT_DETAILS.timeFormatted}
📍 *Tempat:* Kediaman ${EVENT_DETAILS.hostName}
🏠 *Alamat:* ${EVENT_DETAILS.address}

Buka undangan digital dan konfirmasi kehadiran Anda melalui tautan berikut:
🔗 ${shareUrl}

Terima kasih atas doa dan kehadirannya.
Wassalamu'alaikum Wr. Wb.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWa = () => {
    const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-[#E8D8C8] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-5 h-5 text-[#701A24]" />
          <h3 className="font-serif text-xl font-bold text-[#4A0E17]">
            Bagikan Undangan
          </h3>
        </div>

        <p className="text-xs text-[#6B5E5E] mb-4">
          Buat tautan undangan khusus dengan nama tamu keluarga untuk dibagikan via WhatsApp.
        </p>

        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-wider text-[#701A24] font-semibold mb-1">
            Nama Penerima Undangan
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Contoh: Keluarga Om Dimas / Bude Siti"
            className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-[#2D2424] focus:outline-none focus:ring-2 focus:ring-[#701A24]"
          />
        </div>

        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8D8C8] mb-5">
          <span className="text-[10px] uppercase tracking-wider text-[#8C7A7A] block mb-1">
            Pratinjau Tautan:
          </span>
          <p className="text-xs text-[#701A24] font-mono break-all select-all">
            {shareUrl}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleSendWa}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-md active:scale-95"
          >
            <Send className="w-4 h-4 text-emerald-200" />
            <span>Bagikan Langsung ke WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E8D8C8] text-[#701A24] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#FAF7F2] transition-all active:scale-95 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Pesan Undangan Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C59B6D]" />
                <span>Salin Teks Lengkap Undangan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
