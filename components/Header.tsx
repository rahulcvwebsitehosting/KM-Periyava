
import React, { useState } from 'react';
import { Language, NavTranslations } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  isPetalsOn: boolean;
  togglePetals: () => void;
  t: NavTranslations;
  currentPath: string;
  navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  lang, 
  setLang, 
  isMusicPlaying, 
  toggleMusic, 
  isPetalsOn,
  togglePetals,
  t, 
  currentPath,
  navigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const styleId = 'header-lyric-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = [
        '@keyframes lyricScroll {',
        '  0%   { transform: translateX(100%); }',
        '  100% { transform: translateX(-100%); }',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  const menuItems = [
    { name: t.home, id: 'home' },
    { name: t.about, id: 'about' },
    { name: t.events, id: 'events' },
    { name: t.gallery, id: 'gallery' },
    { name: lang === 'ta' ? 'அனுபவங்கள்' : 'Experience', id: 'experience' },
    { name: lang === 'ta' ? 'ஞானம்' : 'Wisdom', id: 'wisdom' },
    { name: lang === 'ta' ? 'தொடர்பு' : 'Contact', id: 'contact' },
  ];

  const handleNav = (id: string) => {
    navigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl shadow-sm z-50 border-b border-orange-100/50 py-5 transition-all duration-500">
      <div className="container mx-auto max-w-[1400px] px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 md:gap-4 group focus:outline-none shrink-0 mr-8">
          <span className="text-2xl md:text-3xl text-primary transform group-hover:rotate-12 transition-transform duration-500">ॐ</span>
          <div className="text-left hidden sm:block">
            <h1 className={`font-bold text-text-dark heading-font tracking-tight leading-none ${lang === 'ta' ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>KM Periyava Sannadhi</h1>
            <p className="text-[9px] md:text-[10px] text-secondary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">Kandhamangalam</p>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center ml-auto ${lang === 'ta' ? 'gap-2 xl:gap-4' : 'gap-4 xl:gap-12'}`}>
          <ul className={`flex items-center font-bold text-gray-500 uppercase ${lang === 'ta' ? 'gap-2 xl:gap-4 text-[10px] xl:text-[11px]' : 'gap-4 xl:gap-12 text-[10px] xl:text-xs tracking-widest'}`}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => handleNav(item.id)}
                  className={`hover:text-primary transition-all relative py-1 group whitespace-nowrap ${currentPath === item.id ? 'text-primary' : ''}`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${currentPath === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className={`flex items-center ml-4 ${lang === 'ta' ? 'gap-2 xl:gap-3' : 'gap-3 xl:gap-4'}`}>
                    <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                onClick={toggleMusic}
                className={`relative flex items-center gap-2 px-3 xl:px-4 py-1.5 rounded-full font-bold text-[9px] xl:text-[10px] uppercase tracking-widest transition-all duration-500 border shrink-0 ${isMusicPlaying ? 'bg-primary text-white border-primary shadow-[0_0_16px_rgba(255,107,53,0.35)]' : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-primary/30'}`}
                title={isMusicPlaying ? 'Pause Chant' : 'Play Divine Chant'}
              >
                {isMusicPlaying && (
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                )}
                <span className="relative z-10 text-sm">🎵</span>
                <span className="relative z-10 hidden xl:inline whitespace-nowrap">
                  {isMusicPlaying ? 'Playing' : 'Chant'}
                </span>
                <span className="relative z-10 flex items-center gap-[2px]">
                  {isMusicPlaying ? (
                    <>
                      <span className="w-[2px] h-3 bg-white rounded-full animate-pulse" />
                      <span className="w-[2px] h-3 bg-white rounded-full animate-pulse [animation-delay:0.2s]" />
                    </>
                  ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </span>
              </button>
              {isMusicPlaying && (
                <div className="overflow-hidden w-[100px] xl:w-[130px] h-[14px] relative">
                  <p
                    className="text-[8px] xl:text-[9px] text-primary/70 font-bold whitespace-nowrap absolute"
                    style={{ animation: 'lyricScroll 12s linear infinite' }}
                  >
                    {'Jaya Jaya Shankara  \u2022  Hara Hara Shankara  \u2022  Jaya Jaya Shankara  \u2022  Hara Hara Shankara  \u2022  '}
                  </p>
                </div>
              )}
            </div>

            {/* Petal Toggle */}
            <button 
              onClick={togglePetals}
              className={`relative w-9 h-9 xl:w-11 xl:h-11 rounded-full flex items-center justify-center transition-all duration-500 ${isPetalsOn ? 'bg-primary/20 shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Toggle Sacred Petals"
            >
              <span className={`text-sm xl:text-base transition-opacity duration-300 ${isPetalsOn ? 'opacity-100' : 'opacity-30'}`}>🌸</span>
            </button>

            {/* Language */}
            <div className="flex bg-gray-50 rounded-xl p-0.5 xl:p-1 border border-gray-100 shrink-0">
              <button onClick={() => setLang('ta')} className={`px-1.5 xl:px-2 py-1 rounded-md text-[9px] font-bold tracking-tighter ${lang === 'ta' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>தமிழ்</button>
              <button onClick={() => setLang('en')} className={`px-1.5 xl:px-2 py-1 rounded-md text-[9px] font-bold tracking-widest ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>EN</button>
            </div>

            <button 
              onClick={() => handleNav('donate')}
              className={`bg-gradient-to-br from-primary to-secondary hover:shadow-xl hover:-translate-y-0.5 text-white rounded-full shadow-lg transition-all font-bold uppercase tracking-widest shrink-0 ${lang === 'ta' ? 'px-3 xl:px-4 py-2 text-[9px] xl:text-[10px]' : 'px-4 xl:px-8 py-2 xl:py-3 text-[10px] xl:text-xs'}`}
            >
              {t.donate}
            </button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleMusic}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all border ${isMusicPlaying ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
          >
            {isMusicPlaying && (
              <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            )}
            <span className="relative z-10">🎵</span>
            <span className="relative z-10">
              {isMusicPlaying ? '▌▌' : '▶'}
            </span>
          </button>
          <button 
            onClick={togglePetals} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPetalsOn ? 'bg-primary/20 shadow-lg' : 'bg-gray-100'}`}
            title="Toggle Sacred Petals"
          >
            <span className={`text-lg transition-opacity duration-300 ${isPetalsOn ? 'opacity-100' : 'opacity-30'}`}>🌸</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-secondary p-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-0 w-full lg:hidden bg-white border-t p-8 shadow-2xl animate-in slide-in-from-top duration-300 z-50">
            <ul className="flex flex-col gap-6 font-bold text-secondary text-base uppercase tracking-widest">
            {menuItems.map(item => (
              <li key={item.id}>
                <button onClick={() => handleNav(item.id)} className={`w-full text-left pb-2 border-b border-orange-50 ${currentPath === item.id ? 'text-primary' : ''}`}>{item.name}</button>
              </li>
            ))}
            <li className="pt-4 flex flex-col gap-6">
              <div className="flex bg-gray-100 rounded-xl p-1 w-full">
                <button onClick={() => setLang('ta')} className={`flex-1 py-3 rounded-lg text-xs font-bold ${lang === 'ta' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>தமிழ்</button>
                <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-lg text-xs font-bold ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>English</button>
              </div>
              <button onClick={() => handleNav('donate')} className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-lg uppercase text-xs tracking-widest">{t.donate}</button>
            </li>
          </ul>
        </div>
      </>
    )}
  </header>
  );
};

export default Header;
