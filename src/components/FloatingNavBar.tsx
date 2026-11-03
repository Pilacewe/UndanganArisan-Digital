import React from 'react';
import { Home, Calendar, MapPin, Images, Send } from 'lucide-react';

interface FloatingNavBarProps {
  activeSection: string;
}

export const FloatingNavBar: React.FC<FloatingNavBarProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'event-details', label: 'Acara', icon: Calendar },
    { id: 'location', label: 'Lokasi', icon: MapPin },
    { id: 'gallery', label: 'Galeri', icon: Images },
    { id: 'rsvp', label: 'RSVP', icon: Send },
  ];

  return (
    <nav
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-md w-auto bg-white/90 backdrop-blur-md border border-[#E8D8C8] shadow-xl rounded-2xl px-3 py-2 flex items-center justify-around gap-1 transition-all"
      aria-label="Navigasi Utama"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[54px] min-h-[44px] transition-all ${
              isActive
                ? 'text-[#701A24] bg-[#701A24]/10 font-bold'
                : 'text-[#8C7A7A] hover:text-[#701A24] hover:bg-[#FAF7F2]'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-[#701A24]' : 'text-[#8C7A7A]'}`} />
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
