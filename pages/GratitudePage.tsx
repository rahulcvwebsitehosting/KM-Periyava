
import React from 'react';
import { eventsData } from '../data/events';
import { Language } from '../types';

interface GratitudePageProps {
  lang: Language;
  navigate: (path: string) => void;
}

interface DonorStats {
  name: string;
  location: string;
  count: number;
  events: string[];
}

const GratitudePage: React.FC<GratitudePageProps> = ({ lang, navigate }) => {
  // Extract and process donors
  const donorsMap = new Map<string, DonorStats>();

  eventsData.forEach(event => {
    event.donors?.forEach(donorName => {
      // Extract location from parentheses
      const locationMatch = donorName.match(/\(([^)]+)\)/);
      const location = locationMatch ? locationMatch[1] : "";
      
      if (donorsMap.has(donorName)) {
        const stats = donorsMap.get(donorName)!;
        stats.count += 1;
        stats.events.push(event.title);
      } else {
        donorsMap.set(donorName, {
          name: donorName,
          location: location,
          count: 1,
          events: [event.title]
        });
      }
    });
  });

  const sortedDonors = Array.from(donorsMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  const getInitial = (name: string) => {
    const cleanName = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.|Sri)\s+/i, '');
    return cleanName.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary-dark pt-32 pb-24 text-white text-center relative overflow-hidden">
        {/* Sacred Watermark */}
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none select-none">
          <span className="text-[20rem] leading-none">ॐ</span>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold heading-font mb-6 tracking-tight">
            {lang === 'ta' ? 'நன்றி நவிலல்' : 'Hall of Gratitude'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium italic">
            {lang === 'ta' 
              ? 'எங்கள் ஆலயத்தின் பணியைத் தாங்கி நிற்கும் புனித ஆத்மாக்கள்' 
              : 'Sacred souls who sustain our temple\'s mission'}
          </p>
          
          <div className="mt-12 inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
            <span className="text-3xl font-bold">{sortedDonors.length}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">
              {lang === 'ta' ? 'புனித நன்கொடையாளர்கள்' : 'Sacred Donors'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedDonors.map((donor, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-orange-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Nithya Seva Badge */}
              {donor.count >= 3 && (
                <div className="absolute top-6 right-6">
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200 shadow-sm">
                    ✨ Nithya Seva
                  </span>
                </div>
              )}

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                  {getInitial(donor.name)}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-text-dark mb-1 leading-tight group-hover:text-primary transition-colors">
                    {donor.name}
                  </h3>
                  {donor.location && (
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                      📍 {donor.location}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-primary/30"></span>
                    {donor.count} {lang === 'ta' ? 'நிகழ்வுகள்' : 'Events Contributed'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-24 bg-[#2C1810] p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white heading-font mb-6">
              {lang === 'ta' ? 'உங்கள் பெயரையும் இங்கே காண வேண்டுமா?' : 'Wish to see your name here?'}
            </h2>
            <p className="text-gray-400 text-lg mb-12 font-medium">
              {lang === 'ta' 
                ? 'அன்னதான சேவையில் இணைந்து புனிதப் பணியில் பங்குபெறுங்கள்.' 
                : 'Support our Annadhanam initiative and be part of this sacred mission of feeding the soul.'}
            </p>
            <button 
              onClick={() => navigate('donate')}
              className="bg-primary hover:bg-primary-dark text-white px-12 py-6 rounded-full font-bold shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest"
            >
              {lang === 'ta' ? 'இப்போதே ஆதரவு அளிக்கவும்' : 'Support Annadhanam'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GratitudePage;
