
import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { wisdomQuotes, WisdomCategory, WisdomQuote } from '../data/wisdom';

interface DeivathinKuralLibraryProps {
  lang: Language;
}

const DeivathinKuralLibrary: React.FC<DeivathinKuralLibraryProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WisdomCategory | 'All'>('All');

  const categories: (WisdomCategory | 'All')[] = ['All', 'Bhakti', 'Dharma', 'Family Life', 'Culture'];

  const filteredQuotes = useMemo(() => {
    return wisdomQuotes.filter(quote => {
      const matchesSearch = 
        quote.ta.toLowerCase().includes(searchTerm.toLowerCase()) || 
        quote.en.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || quote.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Search and Filter Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-100 space-y-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder={lang === 'ta' ? 'உபதேசங்களைத் தேடுங்கள்...' : 'Search teachings...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-text-dark"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl opacity-30">🔍</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-md' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat === 'All' ? (lang === 'ta' ? 'அனைத்தும்' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, index) => (
            <div 
              key={index} 
              className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-orange-50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Category Badge */}
              <div className="absolute top-0 right-0 px-6 py-2 bg-orange-50 text-primary text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">
                {quote.category}
              </div>

              <div className="space-y-6">
                <div className="text-primary text-3xl opacity-20 font-serif">❝</div>
                
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-bold text-text-dark leading-relaxed tamil-font" lang="ta">
                    {quote.ta}
                  </p>
                  <p className="text-gray-500 italic leading-relaxed sacred-bold" dangerouslySetInnerHTML={{ __html: quote.en }} />
                </div>

                <div className="pt-6 border-t border-orange-50 flex justify-between items-center">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">— Deivathin Kural</span>
                  <button 
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                    onClick={() => {
                      navigator.clipboard.writeText(`${quote.ta}\n\n${quote.en}\n\n— Sri Kanchi Mahaperiyava`);
                      alert(lang === 'ta' ? 'பகிர்வதற்கு நகலெடுக்கப்பட்டது!' : 'Copied for sharing!');
                    }}
                  >
                    {lang === 'ta' ? 'நகலெடு' : 'Copy'} 📋
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <span className="text-6xl opacity-20">📿</span>
            <p className="text-gray-400 font-bold italic">
              {lang === 'ta' ? 'தேடலுக்குரிய உபதேசங்கள் ஏதும் இல்லை.' : 'No teachings found matching your search.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeivathinKuralLibrary;
