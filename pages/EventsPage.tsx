
import React from 'react';
import { eventsData } from '../data/events';

interface EventsPageProps {
  lang: string;
  t: any;
  navigate: (path: string) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ lang, t, navigate }) => {
  return (
    <section className="py-24 bg-white animate-in fade-in duration-500">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-5xl font-bold text-text-dark heading-font mt-6 mb-4">
            {t.title}
          </h2>
          <p className="text-secondary tracking-widest uppercase text-sm font-bold">
            {lang === 'ta' ? 'கடந்த கால மற்றும் வரவிருக்கும் புனித நிகழ்வுகள்' : 'Sacred Past & Upcoming Events'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {eventsData.map((event) => (
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
              
              <p className="text-gray-600 line-clamp-3 text-sm mb-8 leading-relaxed font-medium">
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
      </div>
    </section>
  );
};

export default EventsPage;
