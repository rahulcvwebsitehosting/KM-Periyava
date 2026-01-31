
import React from 'react';
import { HeroTranslations, Language } from '../types';

interface HeroProps {
  lang: Language;
  t: HeroTranslations;
}

const Hero: React.FC<HeroProps> = ({ lang, t }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF9F0] via-[#FFF5E8] to-[#FFEFD5]">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-6 max-w-[1000px] text-center relative z-10 py-24">
        {/* Mantras */}
        <div className="mb-12 space-y-3 animate-in fade-in duration-1000">
          <p className="text-2xl md:text-3xl font-bold text-primary heading-font tracking-[0.2em] uppercase">
            {t.chant1}
          </p>
          <div className="text-lg md:text-xl text-secondary opacity-80 flex flex-col md:flex-row gap-2 md:gap-8 justify-center items-center">
            <span className="font-medium">ॐ श्री गुरवे नमः</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="font-medium">{t.chant2}</span>
          </div>
        </div>

        {/* Large Portrait Frame */}
        <div className="relative inline-block mb-16">
          <div className="relative w-[300px] h-[380px] md:w-[400px] md:h-[500px] mx-auto rounded-[50%_50%_30%_30%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[12px] border-white group transition-transform duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000" 
              alt="Sri Kanchi Maha Periyava"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[3s]"
            />
            {/* Divine Aura Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Pulsing Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent/20 blur-[100px] -z-10 rounded-full animate-pulse opacity-60"></div>
          
          {/* Traditional Carved frame subtle border */}
          <div className="absolute -inset-6 border border-accent/10 rounded-[4rem] pointer-events-none"></div>
        </div>
        
        {/* Temple Name Title */}
        <div className="space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-light text-text-dark heading-font leading-[1.2] tracking-wide">
            {t.title} <br className="hidden md:block"/> <span className="text-secondary font-medium">{t.sannadhi}</span>
          </h1>
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-accent/30"></span>
            <p className="text-lg md:text-2xl text-secondary font-bold tracking-[0.4em] uppercase">
              K A N D H A M A N G A L A M
            </p>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-accent/30"></span>
          </div>
          <div className="text-3xl text-primary mt-6">———— ॐ ————</div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-8">
          <a 
            href="#about" 
            className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-12 py-5 rounded-full shadow-[0_12px_32px_rgba(210,105,30,0.3)] transition-all font-bold text-lg transform hover:-translate-y-1"
          >
            🙏 {t.planVisit}
          </a>
          
          <a 
            href="#donate" 
            className="flex items-center gap-3 bg-white border-2 border-primary text-primary hover:bg-orange-50 px-12 py-5 rounded-full shadow-lg transition-all font-bold text-lg transform hover:-translate-y-1"
          >
            🌸 {lang === 'ta' ? 'அன்னதான சேவை' : 'Seva & Donation'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
