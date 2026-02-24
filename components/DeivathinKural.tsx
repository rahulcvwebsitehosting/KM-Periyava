
import React from 'react';
import { Language } from '../types';
import { WisdomQuote } from '../data/wisdom';

interface DeivathinKuralProps {
  lang: Language;
  quoteData: WisdomQuote;
  isLoading: boolean;
  onRefresh: () => void;
}

const DeivathinKural: React.FC<DeivathinKuralProps> = ({ lang, quoteData, isLoading, onRefresh }) => {
  const shareOnWhatsApp = () => {
    const text = `Today's Wisdom from Sri Maha Periyava: "${quoteData[lang]}" - KM Periyava Sannadhi`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="bg-[#FFFDF5] py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Sacred Parchment Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")' }}></div>
      
      {/* Subtle Lotus Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] md:text-[45rem] text-primary/5 select-none pointer-events-none font-serif leading-none">
        𑁍
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-text-dark heading-font tracking-tight mb-4">
            Deivathin Kural
          </h2>
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.5em] text-xs md:text-sm">
            Eternal Echoes of Wisdom
          </p>
        </div>

        <div className="relative group max-w-4xl mx-auto">
          {/* Sacred Parchment Card */}
          <div className="bg-[#FFFEFB] p-10 md:p-20 rounded-sm shadow-[0_20px_60px_rgba(139,69,19,0.08)] border border-[#D4AF37]/20 relative">
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/30"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/30"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/30"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/30"></div>

            {/* Quote Icons */}
            <div className="absolute top-10 left-10 text-primary/10 text-8xl font-serif select-none">&ldquo;</div>
            <div className="absolute bottom-10 right-10 text-primary/10 text-8xl font-serif select-none rotate-180">&ldquo;</div>

            {isLoading ? (
              <div className="py-20 text-center animate-pulse">
                <div className="h-6 bg-orange-100 rounded-full w-3/4 mx-auto mb-4"></div>
                <div className="h-6 bg-orange-100 rounded-full w-1/2 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-10 md:space-y-12 animate-in fade-in duration-1000">
                {/* Tamil Content - 10% Larger than standard English text */}
                <p className={`font-bold text-text-dark tamil-font text-center max-w-3xl mx-auto ${lang === 'ta' ? 'text-2xl md:text-4xl leading-[1.5]' : 'text-3xl md:text-5xl leading-[1.6]'}`}>
                  {quoteData.ta}
                </p>

                {/* English Content - Standard Bold Saffron */}
                <p className="text-xl md:text-3xl italic text-primary leading-relaxed quote-font text-center max-w-2xl mx-auto font-bold">
                  {quoteData.en}
                </p>

                {/* Attribution - Bottom Right */}
                <div className="text-right pt-6 border-t border-[#D4AF37]/10">
                  <p className="text-text-dark font-bold text-xl md:text-3xl heading-font italic">
                    — Sri Kanchi Maha Periyava
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
            <button 
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-3 bg-white hover:bg-orange-50 text-secondary border border-accent/30 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              <span className={`text-lg ${isLoading ? 'animate-spin' : ''}`}>↻</span>
              Receive New Wisdom
            </button>
            
            <button 
              onClick={shareOnWhatsApp}
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] shadow-lg transition-all transform hover:-translate-y-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 34.9 2.1 10.6-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeivathinKural;
