
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
                  {event.donors.map((donor, i) => (
                    <div key={i} className="p-6 bg-orange-50/20 border border-orange-100/50 rounded-3xl shadow-sm flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-white transition-all">
                        {donor.charAt(0)}
                      </div>
                      <span className="text-text-dark font-bold text-base">{donor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media CTA */}
            <div className="pt-12 text-center border-t border-orange-50">
              <a 
                href={event.mediaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-secondary hover:bg-bg-dark text-white px-12 py-6 rounded-full font-bold shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest"
              >
                <span>📸</span>
                {lang === 'ta' ? 'புகைப்படங்கள் & வீடியோக்கள்' : 'View Photos & Videos'}
              </a>
              <p className="mt-6 text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                {lang === 'ta' ? 'கூகுள் புகைப்படங்களுக்கு (Google Photos) உங்களை அழைத்துச் செல்லும்' : 'Redirects to Google Photos'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
