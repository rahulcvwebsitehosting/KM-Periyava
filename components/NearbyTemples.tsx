
import React from 'react';
import { Language } from '../types';

interface NearbyTemplesProps {
  lang: Language;
}

const NearbyTemples: React.FC<NearbyTemplesProps> = ({ lang }) => {
  const temples = [
    { name: 'Mayuranathaswami Temple', loc: 'Mayiladuthurai', dist: '15 km away', icon: '🛕' },
    { name: 'Navagraha Temples', loc: 'Surrounding area', dist: 'Within 25 km radius', icon: '🛕' },
    { name: 'Pandurangan Temple', loc: 'Govindhapuram', dist: 'Nearby', icon: '🛕' },
    { name: 'Sri Sri Maha Periyava Thabhovanam', loc: 'Govindhapuram', dist: 'Nearby', icon: '🙏' },
    { name: 'Sri Bodhendra Saraswathi Swamigal Mutt', loc: 'Nearby spiritual center', dist: 'Nearby', icon: '🕉️' },
    { name: 'Baskararayar Manimandapam', loc: 'Baskarrajapuram', dist: 'Nearby', icon: '🏛️' },
  ];

  return (
    <section id="nearby-temples" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">
            {lang === 'ta' ? 'புனித யாத்திரை' : 'Pilgrimage Circuit'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary heading-font mt-4">
            {lang === 'ta' ? 'அருகிலுள்ள கோவில்கள்' : 'Temples Nearby'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {temples.map((t, idx) => (
            <div key={idx} className="p-6 bg-amber-50 rounded-3xl border border-orange-100 flex items-start gap-6 hover:shadow-md transition group">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-orange-50 group-hover:bg-primary transition-colors">
                {t.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl text-secondary mb-1">{t.name}</h3>
                <p className="text-gray-500 font-medium text-sm">{t.loc}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  {t.dist}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyTemples;
