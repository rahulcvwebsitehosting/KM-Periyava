
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import LazyImage from './LazyImage';

interface GalleryProps {
  lang: Language;
  navigate?: (path: string) => void;
  fullMode?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ lang, navigate, fullMode = false }) => {
  const [showAll, setShowAll] = useState(fullMode);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTemple, setActiveTemple] = useState<'ganapathi' | 'sivan'>('ganapathi');
  const [imgLoaded, setImgLoaded] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes kenBurns1 {
        0%   { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.08) translate(-2%, -1%); }
      }
      @keyframes kenBurns2 {
        0%   { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.08) translate(2%, -1%); }
      }
      @keyframes kenBurns3 {
        0%   { transform: scale(1) translate(1.05) translate(-1%, 0); }
        100% { transform: scale(1) translate(2%, 1%); }
      }
      @keyframes kenBurns4 {
        0%   { transform: scale(1.05) translate(1%, -1%); }
        100% { transform: scale(1) translate(-1%, 1%); }
      }
      @keyframes kenBurnsLightbox {
        0%   { transform: scale(1) translate(0, 0); }
        100% { transform: scale(1.05) translate(-1%, -1%); }
      }
      @keyframes noise {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -5%); }
        20% { transform: translate(-10%, 5%); }
        30% { transform: translate(5%, -10%); }
        40% { transform: translate(-5%, 15%); }
        50% { transform: translate(-10%, 5%); }
        60% { transform: translate(15%, 0); }
        70% { transform: translate(0, 10%); }
        80% { transform: translate(-15%, 0); }
        90% { transform: translate(10%, 5%); }
      }
      .kb-image:hover {
        animation-play-state: paused !important;
      }
      .noise-bg::before {
        content: "";
        position: fixed;
        top: -100%;
        left: -100%;
        width: 300%;
        height: 300%;
        background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
        opacity: 0.03;
        pointer-events: none;
        z-index: 1;
      }
      @media (min-width: 768px) {
        .noise-bg::before {
          animation: noise 8s steps(10) infinite;
        }
      }
      @media (max-width: 767px) {
        .kb-image {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const kbAnimations = ['kenBurns1', 'kenBurns2', 'kenBurns3', 'kenBurns4'];

  // Complete list of all 13 images from the repository
  const ganapathiImages = [
    {
      id: 1,
      category: lang === 'ta' ? 'ஆராதனை' : 'Aradhana',
      caption: lang === 'ta' ? 'மங்கள ஒளி' : 'The Spiritual Aura of Worship',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0028.jpg'
    },
    {
      id: 2,
      category: lang === 'ta' ? 'ஞானத் தோற்றம்' : 'Wisdom Glimpse',
      caption: lang === 'ta' ? 'அருள் பார்வை' : 'The Compassionate Gaze',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/cropped-periyava_slider-3-1024x4201.png'
    },
    {
      id: 3,
      category: lang === 'ta' ? 'பெரியவா திருவுருவம்' : 'Periyava Portrait',
      caption: lang === 'ta' ? 'அருள்மிகு மஹா பெரியவா' : 'Divine Grace of Maha Periyava',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/Kanchi-Maha-Periyava.jpg'
    },
    {
      id: 4,
      category: lang === 'ta' ? 'உற்சவம்' : 'Utsavam',
      caption: lang === 'ta' ? 'திருவிழா காட்சிகள்' : 'Festivities at Kandhamangalam',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0026.jpg'
    },
    {
      id: 5,
      category: lang === 'ta' ? 'பக்தி பரவசம்' : 'Devotional Bliss',
      caption: lang === 'ta' ? 'மஹாபெரியவா அருளாசி' : 'Receiving Divine Blessings',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0024.jpg'
    },
    {
      id: 6,
      category: lang === 'ta' ? 'அனுஷ பூஜை' : 'Rituals',
      caption: lang === 'ta' ? 'புனித வழிபாட்டு முறைகள்' : 'Sacred Poojas at the Temple',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0019.jpg'
    },
    {
      id: 7,
      category: lang === 'ta' ? 'தீப ஆராதனை' : 'Deeparadhana',
      caption: lang === 'ta' ? 'மங்கள ஆர்த்தி' : 'Offerings of Light',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0017.jpg'
    },
    {
      id: 8,
      category: lang === 'ta' ? 'அபிஷேகம்' : 'Abhishekam',
      caption: lang === 'ta' ? 'புனித நீர் ஆராதனை' : 'The Sacred Bathing Ritual',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0015.jpg'
    },
    {
      id: 9,
      category: lang === 'ta' ? 'கோவில் தோற்றம்' : 'Temple Glimpse',
      caption: lang === 'ta' ? 'கோவிலின் வெளிப்புறத் தோற்றம்' : 'A Glimpse of the Temple Premises',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0010.jpg'
    },
    {
      id: 10,
      category: lang === 'ta' ? 'வழிபாடு' : 'Worship',
      caption: lang === 'ta' ? 'சந்நிதி தரிசனம்' : 'A Moment of Deep Devotion',
      src: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0004.jpg'
    }
  ];

  const visibleItems = showAll ? ganapathiImages : ganapathiImages.slice(0, 6);

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % visibleItems.length);
  };

  const goToPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    setImgLoaded(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const selectedImage = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  const handleArchiveClick = () => {
    if (!showAll) {
      setShowAll(true);
      if (!fullMode) {
        setTimeout(() => {
           window.scrollBy({ top: 300, behavior: 'smooth' });
        }, 100);
      }
    } else if (navigate) {
      navigate('gallery');
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-primary font-bold text-[10px] md:text-sm uppercase tracking-widest bg-orange-50 px-3 md:px-4 py-1.5 rounded-full">
            {lang === 'ta' ? 'புனித காட்சிகள்' : 'Sacred Glimpses'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text-dark heading-font mt-4 md:mt-6">
            {lang === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Media Gallery'}
          </h2>
          <p className="text-gray-500 mt-3 md:mt-4 max-w-xl mx-auto italic font-medium text-sm md:text-base px-2">
            {lang === 'ta' ? 'பெரியவாவின் அருளாசியுடன் கூடிய தெய்வீக தருணங்கள்.' : 'Authentic visual representations of our sacred traditions and moments at Kandhamangalam.'}
          </p>
        </div>

        {/* Temple Selector */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTemple('ganapathi')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest border-2 ${activeTemple === 'ganapathi' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Prasanna Maha Ganapathi Temple
          </button>
          <button 
            onClick={() => setActiveTemple('sivan')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest border-2 ${activeTemple === 'sivan' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Kailasanathar Temple (Sivan Temple)
          </button>
        </div>

        {activeTemple === 'ganapathi' ? (
          <>
            {/* Responsive Masonry Grid - Single column on mobile (<768px), multi-column on md+ */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8 animate-in fade-in duration-700">
              {visibleItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative break-inside-avoid group cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                    <div className="relative w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg border-2 md:border-4 border-white transition-all transform active:scale-95 md:group-hover:shadow-2xl md:group-hover:-translate-y-1">
                      {/* Horizontal images use h-auto w-full to prevent vertical cropping and maintain detail */}
                      <LazyImage 
                        src={item.src} 
                        alt={item.category}
                        className="w-full h-auto object-contain block kb-image"
                        style={{
                          animation: kbAnimations[item.id % 4] + ' 12s ease-in-out infinite alternate',
                          animationPlayState: 'running'
                        }}
                      />
                    
                    {/* Visual Cue: Hidden by default, shows on hover or tap hint on mobile */}
                    <div className="absolute inset-0 bg-black/30 md:bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl md:text-2xl">
                        🔍
                      </div>
                    </div>

                    {/* Caption Overlay - Optimized for readability on small screens */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-8 text-white">
                      <span className="text-accent text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-base md:text-xl font-bold heading-font leading-tight">
                        {item.caption}
                      </h4>
                      <span className="md:hidden text-[10px] text-white/60 mt-2 font-medium">
                        {lang === 'ta' ? 'பெரிதாக்க கிளிக் செய்யவும்' : 'Tap to enlarge'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAll && (
              <div className="mt-12 md:mt-20 text-center block clear-both">
                <button 
                  onClick={handleArchiveClick}
                  className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold transition-all shadow-md transform hover:-translate-y-1 active:scale-95 inline-block whitespace-nowrap text-sm md:text-base"
                >
                  {lang === 'ta' ? 'மேலும் படங்களைக் காண்க' : 'Explore Complete Archive →'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 px-10 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100">
              <span className="text-5xl">📸</span>
            </div>
            <h3 className="text-3xl font-bold text-text-dark mb-4 heading-font">Sri Kailasanathar Temple Gallery</h3>
            <p className="text-gray-500 max-w-md mx-auto italic font-bold">
              The photo gallery for the Sivan Temple is currently being curated. 
              Divine glimpses of the temple and its rituals will be uploaded soon.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal - Immersive Dark Mode Viewer */}
      {selectedIndex !== null && selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 noise-bg animate-in fade-in duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, #1a0a04 0%, #0d0500 100%)'
          }}
          onClick={() => setSelectedIndex(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) goToNext(); else goToPrev();
            }
          }}
        >
          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] text-white/60 text-xs font-bold uppercase tracking-[0.4em]">
            {selectedIndex + 1} / {visibleItems.length}
          </div>

          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl md:text-3xl transition-colors shadow-lg"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            aria-label="Close Gallery"
          >
            ✕
          </button>

          {/* Navigation Arrows */}
          <button 
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95"
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            ←
          </button>
          <button 
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            →
          </button>

          {/* Full Image Container */}
          <div 
            className="relative w-full max-w-full h-full flex flex-col items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[70vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden">
              <img 
                key={selectedIndex}
                src={selectedImage.src} 
                alt={selectedImage.caption}
                onLoad={() => setImgLoaded(true)}
                className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  animation: 'kenBurnsLightbox 15s ease-in-out infinite alternate'
                }}
              />
            </div>
            
            {/* Meta Info Below Image */}
            <div className="mt-8 md:mt-10 text-center text-white space-y-2 md:space-y-3 px-4 max-w-2xl">
              <div className="w-24 h-[1px] bg-accent/30 mx-auto mb-4" />
              <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block">
                {selectedImage.category}
              </span>
              <h3 className="text-xl md:text-4xl font-bold heading-font leading-tight">
                {selectedImage.caption}
              </h3>
              <div className="pt-4 border-t border-accent/20 mt-4">
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  {lang === 'ta' ? 'அடுத்த படத்திற்கு ஸ்வைப் செய்யவும்' : 'Swipe or use arrows to navigate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
