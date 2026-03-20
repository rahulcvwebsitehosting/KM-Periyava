
import React from 'react';
import { eventsData } from '../data/events';
import { Language } from '../types';

interface EventDetailPageProps {
  id: string;
  lang: Language;
  navigate: (path: string) => void;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ id, lang, navigate }) => {
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
      <div className="py-32 text-center container mx-auto">
        <h2 className="text-4xl font-bold heading-font text-text-dark mb-4">Event Not Found</h2>
        <button onClick={() => navigate('events')} className="text-primary font-bold hover:underline uppercase tracking-widest text-sm">
          Return to Events
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#FFFCF7] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate('events')}
          className="mb-12 inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          ← {lang === 'ta' ? 'நிகழ்வுகளுக்குத் திரும்பு' : 'Back to Events'}
        </button>

        <div className="bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-12 md:p-16 text-white text-center">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/70 block mb-4">
              {event.date}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold heading-font tracking-tight">
              {event.title}
            </h1>
          </div>

          <div className="p-12 md:p-16 space-y-12 sacred-bold">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                {lang === 'ta' ? 'விளக்கம்' : 'Description'}
              </h2>
              <p className="text-xl md:text-2xl text-text-dark font-bold leading-relaxed italic border-l-8 border-accent pl-8 py-2">
                {event.description}
              </p>
            </div>

            {/* Programs */}
            {event.programs && event.programs.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {lang === 'ta' ? 'திட்டமிடப்பட்ட நிகழ்ச்சிகள்' : 'Programs Scheduled'}
                </h2>
                <ul className="grid gap-6 list-disc pl-5">
                  {event.programs.map((prog, i) => (
                    <li key={i} className="group transition-all">
                      <span className="text-lg md:text-xl text-text-dark font-bold group-hover:text-primary transition-colors">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Donors */}
            {event.donors && event.donors.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {lang === 'ta' ? 'நன்கொடையாளர்கள்' : 'Donors'}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.donors.map((donor, i) => {
                    // Helper to get initial skipping titles
                    const getInitial = (name: string) => {
                      const cleanName = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.|Sri)\s+/i, '');
                      return cleanName.charAt(0).toUpperCase();
                    };
                    
                    return (
                      <div key={i} className="p-6 bg-orange-50/20 border border-orange-100/50 rounded-3xl shadow-sm flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-white transition-all">
                          {getInitial(donor)}
                        </div>
                        <span className="text-text-dark font-bold text-base">{donor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Media CTA */}
            <div className="pt-12 border-t border-orange-50">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a 
                  href={event.mediaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-secondary hover:bg-bg-dark text-white px-12 py-6 rounded-full font-bold shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest"
                >
                  <span>📸</span>
                  {lang === 'ta' ? 'புகைப்படங்கள் & வீடியோக்கள்' : 'View Photos & Videos'}
                </a>

                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`🙏 Attended the ${event.title} at KM Periyava Sannadhi, Kandhamangalam on ${event.date}. Jai Jai Shankara! View photos & details: ${event.mediaUrl}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-12 py-6 rounded-full font-bold shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.969c0 2.112.551 4.176 1.596 6.013L0 24l6.135-1.61a11.893 11.893 0 005.915 1.569h.005c6.608 0 11.971-5.366 11.974-11.971a11.86 11.86 0 00-3.498-8.457"/>
                  </svg>
                  Share on WhatsApp
                </a>
              </div>
              <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                {lang === 'ta' ? 'புகைப்படங்கள் மற்றும் விவரங்களைப் பகிரவும்' : 'Share photos and details with others'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
