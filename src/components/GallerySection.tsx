import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, RotateCw, ZoomIn, ZoomOut, Heart } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/invitationData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'gathering' | 'silaturahmi' | 'outdoors'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const activePhoto: GalleryPhoto | null =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  // Open Lightbox
  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    const photo = filteredPhotos[index];
    // If photo has a default rotate recommendation (e.g. image_0fa601eb which was uploaded sideways)
    setRotation(photo.defaultRotate || 0);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
    setRotation(0);
    setZoomLevel(1);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    const nextIdx = (selectedPhotoIndex + 1) % filteredPhotos.length;
    setSelectedPhotoIndex(nextIdx);
    setRotation(filteredPhotos[nextIdx].defaultRotate || 0);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    const prevIdx = (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhotoIndex(prevIdx);
    setRotation(filteredPhotos[prevIdx].defaultRotate || 0);
    setZoomLevel(1);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold block mb-1">
          Galeri Kenangan
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4A0E17] tracking-tight">
          Momen Hangat Kebersamaan
        </h2>
        <p className="text-xs md:text-sm text-[#736363] max-w-md mx-auto mt-2">
          Mengenang jejak tawa, pelukan, dan kekompakan keluarga barista dari masa ke masa.
        </p>
        <div className="w-16 h-0.5 bg-[#C59B6D] mx-auto mt-3" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-white/80 rounded-2xl border border-[#E8D8C8] shadow-xs max-w-md mx-auto mb-8 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-[#701A24] text-white shadow-xs'
              : 'text-[#6B5E5E] hover:text-[#701A24]'
          }`}
        >
          Semua Momen ({GALLERY_PHOTOS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('gathering')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            activeCategory === 'gathering'
              ? 'bg-[#701A24] text-white shadow-xs'
              : 'text-[#6B5E5E] hover:text-[#701A24]'
          }`}
        >
          Gathering & Kafe
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('outdoors')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            activeCategory === 'outdoors'
              ? 'bg-[#701A24] text-white shadow-xs'
              : 'text-[#6B5E5E] hover:text-[#701A24]'
          }`}
        >
          Kompak Seragam
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('silaturahmi')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            activeCategory === 'silaturahmi'
              ? 'bg-[#701A24] text-white shadow-xs'
              : 'text-[#6B5E5E] hover:text-[#701A24]'
          }`}
        >
          Silaturahmi Rumah
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {filteredPhotos.map((photo, index) => {
          // Special span for featured shots
          const isFeatured = index === 0 && activeCategory === 'all';
          return (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(index)}
              className={`group relative rounded-3xl overflow-hidden bg-white border border-[#E8D8C8] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                isFeatured ? 'sm:col-span-2 md:col-span-2' : ''
              }`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    photo.defaultRotate === 90 ? 'rotate-90 scale-125' : ''
                  }`}
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 sm:opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Floating zoom icon */}
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Photo info */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#E0A96D] font-semibold block mb-0.5">
                    Momen Keluarga Barista
                  </span>
                  <h3 className="font-serif text-base md:text-lg font-bold leading-snug line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-light">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none">
          {/* Top toolbar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <Camera className="w-4 h-4 text-[#E0A96D]" />
              <span>
                {selectedPhotoIndex + 1} / {filteredPhotos.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRotate}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Putar Orientasi Foto (90°)"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleZoomToggle}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={zoomLevel > 1 ? 'Perkecil' : 'Perbesar'}
              >
                {zoomLevel > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2 rounded-xl bg-[#701A24] hover:bg-[#881337] text-white transition-colors"
                title="Tutup Galeri (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Prev & Next */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            title="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            title="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div className="relative max-w-4xl max-h-[75vh] flex flex-col items-center justify-center overflow-hidden">
            <div
              className="transition-transform duration-300 flex items-center justify-center"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoomLevel})`,
              }}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Bottom Caption */}
            <div className="mt-4 text-center max-w-lg px-4 text-white">
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#FAF7F2] mb-1">
                {activePhoto.title}
              </h3>
              <p className="text-xs md:text-sm text-stone-300 font-light">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
