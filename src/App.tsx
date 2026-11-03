/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EnvelopeModal } from './components/EnvelopeModal';
import { AudioControl } from './components/AudioControl';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { EventDetails } from './components/EventDetails';
import { InteractiveMap } from './components/InteractiveMap';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { FloatingNavBar } from './components/FloatingNavBar';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { INITIAL_GUESTBOOK } from './data/invitationData';
import { RsvpEntry } from './types';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Keluarga Besar Barista');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [guestbookEntries, setGuestbookEntries] = useState<RsvpEntry[]>(() => {
    try {
      const saved = localStorage.getItem('arisan_barista_guestbook');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_GUESTBOOK;
  });

  // Parse guest name from URL query parameter (e.g. ?to=Keluarga+Budi)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam && toParam.trim()) {
      setGuestName(toParam.trim());
    }
  }, []);

  // Save guestbook entries to localStorage
  const handleAddGuestbook = (entry: RsvpEntry) => {
    setGuestbookEntries((prev) => {
      const updated = [entry, ...prev];
      try {
        localStorage.setItem('arisan_barista_guestbook', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Track active section for floating navbar
  useEffect(() => {
    if (!isOpened) return;

    const sectionIds = ['hero', 'event-details', 'location', 'gallery', 'rsvp', 'guestbook'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2424] relative selection:bg-[#701A24] selection:text-white">
      {/* Opening Envelope Gate */}
      {!isOpened && (
        <EnvelopeModal
          guestName={guestName}
          onOpen={() => setIsOpened(true)}
          onUpdateGuestName={(newName) => setGuestName(newName)}
        />
      )}

      {/* Floating Audio Controller */}
      {isOpened && <AudioControl />}

      {/* Main Invitation Content */}
      <main className="relative max-w-5xl mx-auto px-2 sm:px-4">
        {/* Subtle decorative background watermarks */}
        <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E8D8C8]/50 blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#701A24]/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <HeroSection
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onScrollToRsvp={scrollToRsvp}
            onScrollToMap={scrollToMap}
          />

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Agenda & Event Details */}
          <EventDetails />

          {/* Interactive Map & Route Guidance */}
          <InteractiveMap />

          {/* Memories Gallery */}
          <GallerySection />

          {/* RSVP via WhatsApp */}
          <RsvpSection
            initialGuestName={guestName === 'Keluarga Besar Barista' ? '' : guestName}
            onAddGuestbook={handleAddGuestbook}
          />

          {/* Guestbook Section */}
          <GuestbookSection
            entries={guestbookEntries}
            onAddEntry={handleAddGuestbook}
          />

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Mobile Floating Bottom Bar */}
      {isOpened && <FloatingNavBar activeSection={activeSection} />}

      {/* Share / Generate Link Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentGuestName={guestName}
      />
    </div>
  );
}
