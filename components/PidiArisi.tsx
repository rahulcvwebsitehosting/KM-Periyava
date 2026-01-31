
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
          <h2 className="text-4xl md:text-5xl font-bold text-secondary heading-font mb-4">
            {t.title}
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-500 font-medium">
            {t.subtitle}
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-8">
            <div className="p-8 bg-amber-50 rounded-3xl border-l-8 border-primary shadow-sm">
              <p className="text-xl leading-relaxed text-secondary italic mb-4 font-medium" lang="ta">
                {t.verse}
              </p>
              <p className="text-gray-600 leading-relaxed font-inter">
                {t.verseEn}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl shadow-sm border border-orange-100">
              <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
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
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-square bg-gray-100 relative group">
              {/* Intentional Placeholder for Devotees at Pidi Arisi Thittam - using saffron/grains context */}
              <img 
                src="https://images.unsplash.com/photo-1542614391-424619c9e75a?auto=format&fit=crop&q=80&w=800" 
                alt="Devotees at Pidi Arisi Thittam"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-6 left-6 right-6">
                 <p className="text-white text-xs font-bold uppercase tracking-widest bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                    {lang === 'ta' ? 'அன்னதான சேவை' : 'Annadhanam Seva'}
                 </p>
              </div>
            </div>

            <div className="bg-bg-dark p-8 rounded-3xl text-white shadow-xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-6xl">❝</span>
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">{t.blessing}</p>
              <p className="text-lg leading-relaxed mb-6 italic" lang="ta">
                {t.periyavaWords}
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t.periyavaWordsEn}
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <button 
                  onClick={onDonate}
                  className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition-all transform hover:-translate-y-1 shadow-lg"
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
      <h4 className="font-bold text-xl text-secondary mb-2" lang={lang === 'ta' ? 'ta' : 'en'}>
        {title}
      </h4>
      <p className="text-gray-600 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  </div>
);

export default PidiArisi;
