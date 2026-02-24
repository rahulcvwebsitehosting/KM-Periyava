
import React from 'react';
import { PidiArisiTranslations, Language } from '../types';

interface PidiArisiProps {
  t: PidiArisiTranslations;
  lang: Language;
  onDonate: () => void;
}

const PidiArisi: React.FC<PidiArisiProps> = ({ t, lang, onDonate }) => {
  return (
    <section id="pidi-arisi" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            {t.badge}
          </span>
          <h2 className={`font-bold text-text-dark heading-font mb-4 ${lang === 'ta' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}`}>
            {t.title}
          </h2>
          <h3 className={`text-secondary font-bold uppercase tracking-widest ${lang === 'ta' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
            {t.subtitle}
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-8">
            <div className="p-8 bg-amber-50 rounded-3xl border-l-8 border-primary shadow-sm sacred-bold">
              <p className="text-xl md:text-2xl text-text-dark italic mb-4 font-bold" lang="ta">
                {t.verse}
              </p>
              <p className="text-gray-600 leading-relaxed font-bold text-lg" dangerouslySetInnerHTML={{ __html: t.verseEn }} />
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl shadow-sm border border-orange-100">
              <h3 className="text-2xl font-bold text-text-dark heading-font mb-8 flex items-center gap-3">
                {t.howTitle}
              </h3>
              
              <div className="space-y-10">
                <Step num={1} title={t.step1} desc={t.step1Desc} lang={lang} />
                <Step num={2} title={t.step2} desc={t.step2Desc} lang={lang} />
                <Step num={3} title={t.step3} desc={t.step3Desc} lang={lang} />
                <Step num={4} title={t.step4} desc={t.step4Desc} lang={lang} />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#FFF9F0] border-[12px] border-white relative group">
              {/* Full Image Container - Ensuring no cropping with object-contain and defined aspect */}
              <div className="relative aspect-[3/4] md:min-h-[500px] flex items-center justify-center p-6 bg-white shadow-inner">
                <img 
                  src="https://raw.githubusercontent.com/rahulcvwebsitehosting/Image-storage/main/KM-Periyava/Main/71BsL6V3l6S.jpg" 
                  alt="Pidi Arisi Thittam - Sacred Offering"
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
              
              <div className="absolute top-4 left-4">
                 <p className="text-white text-[10px] font-bold uppercase tracking-widest bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block shadow-lg">
                    {lang === 'ta' ? 'அன்னதான சேவை' : 'Annadhanam Seva'}
                 </p>
              </div>
            </div>

            <div className="bg-bg-dark p-8 rounded-3xl text-white shadow-xl relative sacred-bold">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-6xl">❝</span>
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">{t.blessing}</p>
              <p className="text-lg md:text-xl mb-6 italic font-bold" lang="ta">
                {t.periyavaWords}
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base font-bold" dangerouslySetInnerHTML={{ __html: t.periyavaWordsEn }} />
              <div className="mt-8 border-t border-white/10 pt-6">
                <button 
                  onClick={onDonate}
                  className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 shadow-lg uppercase tracking-widest text-sm"
                >
                  {t.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ num, title, desc, lang }: { num: number, title: string, desc: string, lang: Language }) => (
  <div className="flex gap-6 items-start group">
    <div className="flex-shrink-0 w-14 h-14 bg-white text-primary rounded-2xl shadow-md flex items-center justify-center font-bold text-2xl border border-orange-100 group-hover:bg-primary group-hover:text-white transition-all">
      {num}
    </div>
    <div>
      <h4 className="font-bold text-xl text-text-dark heading-font mb-2" lang={lang === 'ta' ? 'ta' : 'en'}>
        {title}
      </h4>
      <p className="text-gray-600 font-bold sacred-bold" dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  </div>
);

export default PidiArisi;
