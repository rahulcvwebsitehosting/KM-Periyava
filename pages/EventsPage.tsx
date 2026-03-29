
import React from 'react';
import { getProcessedEvents } from '../data/events';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TiltCard } from '../hooks/use3DTilt';

interface EventsPageProps {
  lang: string;
  t: any;
  navigate: (path: string) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ lang, t, navigate }) => {
  const [activeTemple, setActiveTemple] = React.useState<'ganapathi' | 'sivan'>('ganapathi');
  const gridRef = useScrollReveal({ threshold: 0.1 });

  // Filter events based on temple. 
  // For now, we assume all current events belong to Ganapathi temple as per user request,
  // even if some descriptions mention Sivan temple, the user wants a separate empty section for Sivan.
  const ganapathiEvents = getProcessedEvents(); 
  const sivanEvents: any[] = []; // Empty for now as requested

  return (
    <section className="py-24 bg-white animate-in fade-in duration-500 sacred-bold">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold text-sm uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full">
              {t.badge}
            </span>
            <h2 className="text-5xl font-bold text-text-dark heading-font mt-6 mb-4" dangerouslySetInnerHTML={{ __html: t.title }} />
            <p className="text-secondary tracking-widest uppercase text-sm font-bold">
              {lang === 'ta' ? 'கடந்த கால மற்றும் வரவிருக்கும் புனித நிகழ்வுகள்' : 'Sacred Past & Upcoming Events'}
            </p>
          </div>
        </div>

        {/* Temple Selector */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTemple('ganapathi')}
            className={`px-4 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all text-xs md:text-sm uppercase tracking-widest border-2 ${activeTemple === 'ganapathi' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Prasanna Maha Ganapathi Temple
          </button>
          <button 
            onClick={() => setActiveTemple('sivan')}
            className={`px-4 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all text-xs md:text-sm uppercase tracking-widest border-2 ${activeTemple === 'sivan' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
          >
            Sri Kailasanathar Temple (Sivan Temple)
          </button>
        </div>

        {activeTemple === 'ganapathi' ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 sr-hidden sr-stagger">
            {ganapathiEvents.map((event) => (
              <TiltCard 
                key={event.id} 
                className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group flex flex-col relative overflow-hidden sr-hidden cursor-pointer"
                onClick={() => navigate(`events/${event.id}`)}
                style={{
                  background: 'rgba(255, 252, 247, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 200, 150, 0.25)',
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  {event.isUpcoming ? (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-200">
                      Upcoming
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200">
                      Completed
                    </span>
                  )}
                </div>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`events/${event.id}`);
                  }}
                  className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-colors"
                >
                  {t.viewDetails} →
                </button>
              </TiltCard>
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
