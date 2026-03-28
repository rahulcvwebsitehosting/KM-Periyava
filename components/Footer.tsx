
import React from 'react';
import { Language, NavTranslations } from '../types';

interface FooterProps {
  lang: Language;
  t: NavTranslations;
  navigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, t, navigate }) => {
  const pageNames: Record<string, { en: string; ta: string }> = {
    home: { en: 'Home', ta: 'முகப்பு' },
    about: { en: 'About', ta: 'பற்றி' },
    events: { en: 'Events', ta: 'நிகழ்வுகள்' },
    gallery: { en: 'Gallery', ta: 'படங்கள்' },
    wisdom: { en: 'Wisdom', ta: 'ஞானம்' },
    experience: { en: 'Experience', ta: 'அனுபவங்கள்' },
    donate: { en: 'Donate', ta: 'நன்கொடை' },
    contact: { en: 'Contact', ta: 'தொடர்பு' },
    gratitude: { en: 'Hall of Gratitude', ta: 'நன்றி நவிலல்' },
  };

  return (
    <footer className="bg-[#2C1810] text-[#FFF9F0] pt-24 pb-12 overflow-hidden relative border-t-8 border-primary">
      {/* Sacred Watermark */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[30rem] leading-none">ॐ</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-20 mb-10 md:mb-20">
          {/* Column 1 - Brand */}
          <div className="space-y-8">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 md:gap-5 group text-left">
              <span className="text-4xl text-primary transform group-hover:rotate-12 transition-transform">ॐ</span>
              <div>
                <h3 className="font-bold text-2xl heading-font leading-none tracking-tight">KM Periyava Sannadhi</h3>
                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.4em] mt-2">Kandhamangalam</p>
              </div>
            </button>
            <p className="text-gray-400 leading-relaxed text-sm font-light">
              {lang === 'ta' 
                ? 'ஜகத்குரு காஞ்சி ஸ்ரீ பரமாச்சாரியாரின் புனிதமான சந்நிதி, 25 ஆண்டுகளுக்கும் மேலாக தெய்வீக அருளைப் பரப்புகிறது.'
                : 'Welcome to the sacred abode of Jagadguru Kanchi Sri Paramacharyal, spreading divine grace and wisdom for over 25 years.'}
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.5em] text-primary mb-10">Sanctuary Pages</h4>
            <ul className="space-y-5 text-sm font-medium">
              {['home', 'about', 'events', 'gallery', 'wisdom'].map(id => (
                <li key={id}>
                  <button onClick={() => navigate(id)} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">
                    {pageNames[id] ? pageNames[id][lang] : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Explore */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.5em] text-primary mb-10">Sacred Services</h4>
            <ul className="space-y-5 text-sm font-medium">
              {['experience', 'donate', 'contact', 'gratitude'].map(id => (
                <li key={id}>
                  <button onClick={() => navigate(id)} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all">
                    {pageNames[id] ? pageNames[id][lang] : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Social & Location */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.5em] text-primary mb-10">Sacred Connection</h4>
            <div className="space-y-6 text-sm">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <p className="flex items-start gap-3">
                  <span className="text-primary mt-1">📍</span> 
                  <span className="text-gray-300 leading-relaxed">Kandhamangalam, Kuttalam Taluk,<br/>Nagapattinam, TN - 609801</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-primary">📞</span> 
                  <span className="text-gray-300">+91 98843 86412</span>
                </p>
              </div>
              <p className="text-[10px] font-bold text-primary tracking-[0.6em] text-center pt-2">HARA HARA SANKARA</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
          <p className="text-center md:text-left">© 2026 kmperiyavasannathi.co.in | All Rights Reserved</p>
          <p className="flex items-center gap-2">
            DESIGNED BY <a href="https://www.linkedin.com/in/rahulshyamcivil/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition">RAHUL SHYAM</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
