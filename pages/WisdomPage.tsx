
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
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-block w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-3xl mb-12 shadow-inner">📖</div>
           <h3 className="text-4xl font-bold heading-font text-secondary mb-10 tracking-tight">About Deivathin Kural</h3>
           <div className="prose prose-lg text-gray-700 space-y-8 max-w-3xl mx-auto leading-relaxed text-lg">
             <p>
               "Deivathin Kural" (The Voice of God) is a monumental collection of teachings and discourses given by Sri Chandrasekharendra Saraswathi Swamigal, the 68th Jagadguru of the Kanchi Kamakoti Peetham.
             </p>
             <p>
               Compiled over several decades, these volumes cover an immense range of topics—from Advaita Vedanta and the Vedas to social conduct, temple rituals, and the path of devotion. It serves as an encyclopedia of Hindu Dharma for the modern seeker.
             </p>
             <p className="font-bold text-primary pt-6 italic">
               "God will do anything for us; what matters is what we do for God."
             </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default WisdomPage;
