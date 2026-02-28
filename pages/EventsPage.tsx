
import React from 'react';
import { eventsData } from '../data/events';

interface EventsPageProps {
  lang: string;
  t: any;
  navigate: (path: string) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ lang, t, navigate }) => {
  const [activeTemple, setActiveTemple] = React.useState<'ganapathi' | 'sivan'>('ganapathi');

  // Filter events based on temple. 
  // For now, we assume all current events belong to Ganapathi temple as per user request,
  // even if some descriptions mention Sivan temple, the user wants a separate empty section for Sivan.
  const ganapathiEvents = eventsData; 
  const sivanEvents: any[] = []; // Empty for now as requested

  return (
    <section className="py-24 bg-white animate-in fade-in duration-500 sacred-bold">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-5xl font-bold text-text-dark heading-font mt-6 mb-4" dangerouslySetInnerHTML={{ __html: t.title }} />
          <p className="text-secondary tracking-widest uppercase text-sm font-bold">
            {lang === 'ta' ? 'கடந்த கால மற்றும் வரவிருக்கும் புனித நிகழ்வுகள்' : 'Sacred Past & Upcoming Events'}
          </p>
        </div>

        {/* Temple Selector */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTemple('ganapathi')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest border-2 ${activeTemple === 'ganapathi' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Prasanna Maha Ganapathi Temple
          </button>
          <button 
            onClick={() => setActiveTemple('sivan')}
            className={`px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest border-2 ${activeTemple === 'sivan' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Kailasanathar Temple (Sivan Temple)
          </button>
        </div>

        {activeTemple === 'ganapathi' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ganapathiEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-[#FFFCF7] p-8 rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                    ॐ
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {event.date}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-primary heading-font mb-4 flex-1">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 line-clamp-3 text-sm mb-8 leading-relaxed font-bold">
                  {event.description}
                </p>
                
                <button 
                  onClick={() => navigate(`events/${event.id}`)}
                  className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-colors"
                >
                  {t.viewDetails} →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 px-10 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-gray-100">
              <span className="text-5xl">🕉️</span>
            </div>
            <h3 className="text-3xl font-bold text-text-dark mb-4 heading-font">Sri Kailasanathar Temple Events</h3>
            <p className="text-gray-500 max-w-md mx-auto italic font-bold">
              Information and event schedules for the Sivan Temple will be updated soon. 
              Please check back for upcoming poojas and festivals.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;
