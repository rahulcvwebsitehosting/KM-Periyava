import React, { useState, useEffect } from 'react';
import { Language, NavTranslations } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Menu, X, Play, Pause } from 'lucide-react';

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Always clean up on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    <>
      <header className="fixed relative top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-orange-100/50 py-4 transition-all duration-500">
        <div className="container mx-auto max-w-[1500px] px-4 lg:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <span className="text-3xl md:text-4xl text-primary transform group-hover:scale-110 transition-transform duration-500">ॐ</span>
            <div className="text-left">
              <h1 className="font-bold text-gray-900 heading-font tracking-tight leading-none text-lg md:text-xl">
                KM Periyava Sannadhi
              </h1>
              <p className="text-[10px] md:text-[11px] text-secondary font-bold uppercase tracking-[0.3em] mt-1.5 opacity-80">
                KANDHAMANGALAM
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 ml-8">
            <ul className="flex items-center gap-6 xl:gap-10 font-bold text-gray-500 uppercase text-[11px] xl:text-xs tracking-widest">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNav(item.id)}
                    className={`hover:text-primary transition-all relative py-1 group whitespace-nowrap ${currentPath === item.id ? 'text-primary' : ''}`}
                  >
                    {item.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[2px] bg-primary"
                      initial={false}
                      animate={{ width: currentPath === item.id ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Controls Section */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 ml-auto">
            {/* Divine Chant Control */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={toggleMusic}
                className="relative group"
              >
                <motion.div 
                  className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isMusicPlaying ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-400'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMusicPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </motion.div>
                {isMusicPlaying && (
                  <motion.div 
                    className="absolute -inset-1 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
              
              {/* Small Scrolling Lyrics */}
              <AnimatePresence>
                {isMusicPlaying && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-24 xl:w-32 overflow-hidden"
                  >
                    <div className="flex whitespace-nowrap">
                      <motion.div 
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="flex gap-4 items-center text-[8px] xl:text-[9px] font-bold text-primary uppercase tracking-wider"
                      >
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="flex items-center gap-2">
                            {lang === 'ta' ? "ஜய ஜய சங்கர..." : "Jaya Jaya Sankara..."}
                            <span className="text-accent">ॐ</span>
                          </span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Petals Control */}
            <button
              onClick={togglePetals}
              className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center transition-all duration-500 relative group ${isPetalsOn ? 'bg-pink-50 text-pink-500 shadow-md' : 'bg-gray-100 text-gray-400'}`}
              title={lang === 'ta' ? 'மலர்கள்' : 'Flower Petals'}
            >
              <motion.div
                animate={isPetalsOn ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Flower2 size={20} fill={isPetalsOn ? "currentColor" : "none"} />
              </motion.div>
              {isPetalsOn && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-pink-200/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {isPetalsOn ? (lang === 'ta' ? 'மலர்களை நிறுத்து' : 'Stop Petals') : (lang === 'ta' ? 'மலர்களைத் தொடங்கு' : 'Start Petals')}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
              <button 
                onClick={() => setLang('ta')} 
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'ta' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                தமிழ்
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>

            {/* Donate Button */}
            <button 
              onClick={() => handleNav('donate')}
              className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white px-6 xl:px-10 py-2.5 xl:py-3 rounded-full shadow-lg shadow-primary/20 transition-all font-bold uppercase text-[11px] xl:text-xs tracking-[0.15em] hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.donate}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={toggleMusic}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isMusicPlaying ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
              >
                {isMusicPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              {isMusicPlaying && (
                <div className="w-16 overflow-hidden">
                  <motion.div 
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="flex gap-2 items-center text-[7px] font-bold text-primary uppercase whitespace-nowrap"
                  >
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="flex items-center gap-1">
                        {lang === 'ta' ? "ஜய ஜய..." : "Jaya Jaya..."}
                        <span className="text-accent">ॐ</span>
                      </span>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-orange-50 shadow-2xl z-50 overflow-y-auto max-h-[85vh]"
            >
            <ul className="flex flex-col p-6 gap-2">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`w-full text-left py-4 px-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors ${currentPath === item.id ? 'bg-orange-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-6">
                <div className="flex bg-gray-100 rounded-2xl p-1.5">
                  <button
                    onClick={() => setLang('ta')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === 'ta' ? 'bg-white text-primary shadow-md' : 'text-gray-400'}`}
                  >
                    தமிழ்
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === 'en' ? 'bg-white text-primary shadow-md' : 'text-gray-400'}`}
                  >
                    English
                  </button>
                </div>
                <div className="flex justify-between items-center px-2">
                   <div className="flex gap-4">
                      <button 
                        onClick={togglePetals} 
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 relative ${isPetalsOn ? 'bg-pink-50 text-pink-500 shadow-md' : 'bg-gray-100 text-gray-400'}`}
                      >
                        <motion.div
                          animate={isPetalsOn ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="relative z-10"
                        >
                          <Flower2 size={24} fill={isPetalsOn ? "currentColor" : "none"} />
                        </motion.div>
                        {isPetalsOn && (
                          <motion.div 
                            className="absolute inset-0 rounded-full bg-pink-200/30"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        )}
                      </button>
                   </div>
                   <button
                    onClick={() => handleNav('donate')}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg uppercase text-sm tracking-widest"
                  >
                    {t.donate}
                  </button>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
