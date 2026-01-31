
import React, { useState } from 'react';
import { Language, NavTranslations } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  t: NavTranslations;
  currentPath: string;
  navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  lang, 
  setLang, 
  isMusicPlaying, 
  toggleMusic, 
  t, 
  currentPath,
  navigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <button onClick={() => handleNav('home')} className="flex items-center gap-4 group focus:outline-none">
          <span className="text-3xl text-primary transform group-hover:rotate-12 transition-transform duration-500">ॐ</span>
          <div className="text-left hidden md:block">
            <h1 className="text-lg font-bold text-text-dark heading-font tracking-tight leading-none">KM Periyava Sannadhi</h1>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.3em] mt-1">Kandhamangalam</p>
          </div>
        </button>

        {/* Desktop Nav - GENEROUS 48px Gaps */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-12 items-center font-bold text-gray-500 text-xs tracking-widest uppercase">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => handleNav(item.id)}
                  className={`hover:text-primary transition-all relative py-1 group ${currentPath === item.id ? 'text-primary' : ''}`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${currentPath === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6 ml-4">
            {/* Music Toggle */}
            <button 
              onClick={toggleMusic}
              className={`p-2 rounded-full transition-all ${isMusicPlaying ? 'text-primary bg-orange-50' : 'text-gray-300'}`}
              title={isMusicPlaying ? 'Mute' : 'Play Chant'}
            >
              {isMusicPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
              )}
            </button>

            {/* Language */}
            <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
              <button onClick={() => setLang('ta')} className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-tighter ${lang === 'ta' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>தமிழ்</button>
              <button onClick={() => setLang('en')} className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-widest ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>EN</button>
            </div>

            <button 
              onClick={() => handleNav('donate')}
              className="bg-gradient-to-br from-primary to-secondary hover:shadow-xl hover:-translate-y-0.5 text-white px-8 py-3 rounded-full shadow-lg transition-all font-bold text-xs uppercase tracking-widest"
            >
              {t.donate}
            </button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={toggleMusic} className={isMusicPlaying ? 'text-primary' : 'text-gray-300'}>
            <span className="text-xl">{isMusicPlaying ? '🔊' : '🔇'}</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-secondary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t p-8 shadow-2xl animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-6 font-bold text-secondary text-base uppercase tracking-widest">
            {menuItems.map(item => (
              <li key={item.id}>
                <button onClick={() => handleNav(item.id)} className={`w-full text-left pb-2 border-b border-orange-50 ${currentPath === item.id ? 'text-primary' : ''}`}>{item.name}</button>
              </li>
            ))}
            <li className="pt-4 flex justify-between items-center">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button onClick={() => setLang('ta')} className={`px-6 py-2 rounded-lg text-xs font-bold ${lang === 'ta' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>தமிழ்</button>
                <button onClick={() => setLang('en')} className={`px-6 py-2 rounded-lg text-xs font-bold ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>English</button>
              </div>
              <button onClick={() => handleNav('donate')} className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg uppercase text-xs tracking-widest">{t.donate}</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
