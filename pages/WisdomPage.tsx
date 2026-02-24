
import React from 'react';
import DeivathinKural from '../components/DeivathinKural';
import { Language } from '../types';
import { WisdomQuote } from '../data/wisdom';

interface WisdomPageProps {
  lang: Language;
  quoteData: WisdomQuote;
  isLoading: boolean;
  onRefresh: () => void;
}

const WisdomPage: React.FC<WisdomPageProps> = ({ lang, quoteData, isLoading, onRefresh }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <DeivathinKural 
        lang={lang} 
        quoteData={quoteData} 
        isLoading={isLoading} 
        onRefresh={onRefresh} 
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-block w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-3xl mb-12 shadow-inner">📖</div>
           <h3 className="text-4xl md:text-5xl font-bold heading-font text-text-dark mb-10 tracking-tight">About Deivathin Kural</h3>
           <div className="prose prose-lg text-text-dark space-y-10 max-w-3xl mx-auto leading-relaxed text-xl font-medium sacred-bold">
             <p>
               "<strong>Deivathin Kural</strong>" (The Voice of God) is a monumental collection of teachings and discourses given by <strong>Sri Kanchi Mahaperiyava</strong>, the 68th Jagadguru of the Kanchi Kamakoti Peetham.
             </p>
             <p>
               Compiled over several decades, these volumes cover an immense range of topics—from Advaita Vedanta and the Vedas to social conduct, temple rituals, and the path of devotion.
             </p>
             <p>
               It serves as an encyclopedia of Hindu Dharma for the modern seeker, preserving the eternal truths of our ancestors in a language that speaks directly to the soul.
             </p>
             <div className="p-10 bg-orange-50/50 rounded-[3rem] border-l-8 border-primary italic font-bold text-2xl md:text-3xl text-secondary">
               "God will do anything for us; what matters is what we do for God."
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default WisdomPage;
