
import React from 'react';
import { HeroTranslations, Language } from '../types';

interface HeroProps {
  lang: Language;
  t: HeroTranslations;
}

const Hero: React.FC<HeroProps> = ({ lang, t }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFAF3] py-20">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10 py-24">
        {/* Top Sacred Chants */}
        <div className="mb-12 space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <p className="text-3xl md:text-5xl font-bold text-primary heading-font tracking-[0.3em] uppercase drop-shadow-sm">
            {t.chant1}
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-center items-center text-secondary font-bold text-sm md:text-lg opacity-80">
            <span className="flex items-center gap-2">
              <span className="text-xl">ॐ</span> श्री गुरவே நமஃ
            </span>
            <span className="hidden md:inline text-accent/40">|</span>
            <span className="tracking-wide">Hara Hara Shankara Jaya Jaya Shankara</span>
          </div>
        </div>

        {/* Custom Arched Portrait Section */}
        <div className="relative inline-block mb-16 animate-in zoom-in duration-1000 delay-300">
          <div className="relative mx-auto group">
            
            {/* The Arched Container */}
            <div 
              className="relative w-[300px] md:w-[480px] h-[400px] md:h-[640px] overflow-hidden"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(201, 162, 39, 0.45))',
              }}
            >
              {/* Manual Arch Masking with border-radius */}
              <div className="absolute inset-0 z-0 bg-white rounded-t-[50%] rounded-b-2xl overflow-hidden shadow-inner">
                <img 
                  src="https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Main/Periyava%20Main.jpg" 
                  alt="Sri Kanchi Maha Periyava"
                  className="w-full h-full object-cover object-center transition-transform duration-[8s] group-hover:scale-105"
                />
                
                {/* Divine Soft Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Arched Gold Frame Overlay (CSS Simulated) */}
              <div className="absolute inset-0 z-10 border-[6px] md:border-[12px] border-accent/60 rounded-t-[50%] rounded-b-2xl pointer-events-none"></div>
              
              {/* Inner thin highlight border */}
              <div className="absolute inset-[3px] md:inset-[6px] z-10 border border-white/30 rounded-t-[50%] rounded-b-xl pointer-events-none"></div>
              
              {/* Outer very thin gold border */}
              <div className="absolute inset-[-2px] z-10 border border-accent/20 rounded-t-[50%] rounded-b-[2.5rem] pointer-events-none"></div>
            </div>
            
            {/* Pulsing Backlight for Divine Aura - Follows the Arch shape */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/15 blur-[100px] -z-10 animate-pulse opacity-50"
              style={{ borderRadius: '50% 50% 20% 20%' }}
            ></div>
          </div>
        </div>
        
        {/* Temple Branding Title */}
        <div className="space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <h1 className="text-4xl md:text-7xl font-bold text-text-dark heading-font leading-[1.1] tracking-tight">
            {t.title} <br className="hidden md:block"/> 
            <span className="text-secondary font-bold">{t.sannadhi}</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <span className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-accent/40"></span>
            <p className="text-base md:text-2xl text-secondary font-bold tracking-[0.5em] uppercase">
              K A N D H A M A N G A L A M
            </p>
            <span className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-accent/40"></span>
          </div>
          
          <div className="flex justify-center pt-4">
             <span className="text-2xl text-primary font-bold opacity-30 select-none">———— ॐ ————</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 animate-in fade-in duration-1000 delay-700">
          <a 
            href="#about" 
            className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-10 md:px-14 py-4 md:py-6 rounded-full shadow-[0_15px_40px_rgba(210,105,30,0.3)] transition-all font-bold text-sm md:text-xl transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
          >
            🙏 {t.planVisit}
          </a>
          
          <a 
            href="#donate" 
            className="flex items-center gap-3 bg-white border-2 border-primary text-primary hover:bg-orange-50 px-10 md:px-14 py-4 md:py-6 rounded-full shadow-lg transition-all font-bold text-sm md:text-xl transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
          >
            🌸 {lang === 'ta' ? 'அன்னதான சேவை' : 'Seva & Donation'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
