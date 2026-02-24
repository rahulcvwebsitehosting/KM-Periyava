
import React from 'react';
import Hero from '../components/Hero';
import { Language, TranslationSchema } from '../types';

interface HomePageProps {
  lang: Language;
  t: TranslationSchema;
  quote: string;
  isLoadingQuote: boolean;
  onRefreshQuote: () => void;
  navigate: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ lang, t, quote, isLoadingQuote, onRefreshQuote, navigate }) => {
  return (
    <div className="space-y-0">
      <Hero lang={lang} t={t.hero} />
      
      {/* Wisdom Highlight */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8 max-w-5xl text-center">
           <h2 className="text-4xl font-bold text-text-dark heading-font mb-4">Deivathin Kural</h2>
           <p className="text-lg text-secondary uppercase tracking-[0.3em] mb-16">Eternal Echoes of Wisdom</p>
           
           <div className="relative group p-12 md:p-20 bg-[#FFFCF7] rounded-[2rem] shadow-[0_30px_70px_rgba(139,69,19,0.08)] border border-orange-50 overflow-hidden">
             {/* Lotus Watermark */}
             <div className="absolute inset-0 flex items-center justify-center text-[25rem] text-primary/5 pointer-events-none select-none">𑁍</div>
             
             <div className="absolute top-10 left-10 text-primary/10 text-8xl font-serif">&ldquo;</div>
             
             <div className="relative z-10">
               {isLoadingQuote ? (
                 <div className="animate-pulse space-y-4 py-6">
                   <div className="h-8 bg-gray-100 rounded-full w-3/4 mx-auto"></div>
                   <div className="h-8 bg-gray-100 rounded-full w-full mx-auto"></div>
                 </div>
               ) : (
                 <div className="space-y-8">
                   <p className="text-2xl md:text-3xl font-bold text-[#2C1810] tamil-font">
                     {quote}
                   </p>
                   <div className="text-right">
                     <p className="text-secondary font-bold text-lg">— Sri Kanchi Maha Periyava</p>
                   </div>
                 </div>
               )}
               
               <button 
                  onClick={() => navigate('wisdom')}
                  className="mt-12 inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-[0.2em] hover:gap-5 transition-all"
               >
                 {lang === 'ta' ? 'அனைத்து ஞானத்தையும் படிக்க' : 'Read Full Wisdom'}
                 <span className="text-xl">→</span>
               </button>
             </div>
           </div>
        </div>
      </section>

      {/* Sacred Deity Gallery Highlight */}
      <section className="py-32 bg-[#FFF9F0]">
        <div className="container mx-auto px-12 max-w-[1400px]">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold text-text-dark heading-font mb-4">Sacred Deities</h2>
            <p className="text-lg text-secondary tracking-widest">Divine Presence at Kandhamangalam</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: 1, name: 'Divine Darshan', img: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0024.jpg' },
              { id: 2, name: 'Sacred Rituals', img: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0015.jpg' },
              { id: 3, name: 'Holy Presence', img: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0019.jpg' },
              { id: 4, name: 'Temple Sanctum', img: 'https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Gallery/DSC_0010.jpg' }
            ].map((deity) => (
              <div key={deity.id} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:-translate-y-4 transition-all duration-500">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={deity.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-2xl font-bold heading-font">{deity.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button onClick={() => navigate('gallery')} className="px-12 py-5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-bold transition-all uppercase tracking-widest text-xs">
              Explore Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Pidi Arisi Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-12 max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.4em]">{t.pidiArisi.badge}</span>
                <h2 className={`font-bold text-text-dark heading-font ${lang === 'ta' ? 'text-4xl md:text-5xl' : 'text-6xl'}`}>{t.pidiArisi.title}</h2>
              </div>
              <div className="p-10 bg-orange-50/50 border-l-8 border-primary rounded-[2.5rem] italic">
                 <p className="text-2xl text-secondary tamil-font" lang="ta">{t.pidiArisi.verse}</p>
                 <p className="text-gray-500 mt-6 text-sm">{t.pidiArisi.verseEn}</p>
              </div>
              <div className="pt-6">
                 <button onClick={() => navigate('donate')} className="bg-primary text-white px-12 py-5 rounded-full font-bold shadow-2xl shadow-primary/30 transform hover:-translate-y-1 transition-all uppercase text-xs tracking-widest">
                   Contribute to Annadhanam
                 </button>
              </div>
            </div>
            <div className="relative group">
               <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-[#FFF9F0] bg-white flex items-center justify-center p-8">
                 <img 
                    src="https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Main/71BsL6V3l6S.jpg" 
                    className="max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-[3s]"
                    alt="Pidi Arisi Thittam Offering"
                 />
               </div>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-[60px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
