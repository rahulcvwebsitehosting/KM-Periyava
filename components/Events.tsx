
import React, { useState } from 'react';

interface EventsProps {
  t: {
    badge: string;
    title: string;
    upcoming: string;
    past: string;
    noEvents: string;
    checkBack: string;
    completed: string;
    viewDetails: string;
  };
}

const Events: React.FC<EventsProps> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <section id="events" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full inline-block">
            {t.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark heading-font mt-6" dangerouslySetInnerHTML={{ __html: t.title }} />
        </div>

        <div className="flex justify-center mb-12 p-1.5 bg-gray-50 rounded-2xl max-w-xs mx-auto border border-gray-100">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${activeTab === 'upcoming' ? 'bg-white text-primary shadow-md' : 'text-gray-400 hover:text-primary'}`}
          >
            {t.upcoming}
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${activeTab === 'past' ? 'bg-white text-primary shadow-md' : 'text-gray-400 hover:text-primary'}`}
          >
            {t.past}
          </button>
        </div>

        {activeTab === 'upcoming' ? (
          <div className="text-center py-24 px-10 bg-bg-primary/50 rounded-[3rem] border-2 border-dashed border-orange-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-50">
              <span className="text-4xl">🗓️</span>
            </div>
            <p className="text-xl font-bold text-text-dark mb-2 heading-font">{t.noEvents}</p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t.checkBack}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <EventCard 
              day="18" 
              month="DEC" 
              year="2025"
              title="Anusham Pooja" 
              time="🕐 6:00 AM - 12:00 PM"
              desc="Monthly observance of <strong>Anusham Pooja</strong> with special abhishekam and communal prayers."
              status={t.completed}
              detailsBtn={t.viewDetails}
            />
            <EventCard 
              day="25" 
              month="NOV" 
              year="2025"
              title="Kanchi Mahaswami Aradhana" 
              time="🕐 8:00 AM - 1:00 PM"
              desc="Special aradhana dedicated to our Jagadguru with chanting of sacred hymns and collective meditation."
              status={t.completed}
              detailsBtn={t.viewDetails}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const EventCard = ({ day, month, year, title, time, desc, status, detailsBtn }: any) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row items-center md:items-start gap-8 group">
    <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary to-primary-dark rounded-3xl text-white shadow-lg w-28 group-hover:scale-105 transition-transform">
      <span className="text-xs font-bold tracking-widest opacity-80">{year}</span>
      <span className="text-4xl font-bold my-1">{day}</span>
      <span className="text-xs font-bold tracking-[0.2em]">{month}</span>
    </div>
    <div className="flex-1 text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
        <h3 className="text-2xl font-bold text-text-dark heading-font">{title}</h3>
        <span className="hidden md:inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
          {status}
        </span>
      </div>
      <p className="text-primary font-bold text-sm mb-3 flex items-center justify-center md:justify-start gap-1.5 uppercase tracking-widest">
        {time}
      </p>
      <p className="text-gray-600 leading-relaxed mb-6 font-bold text-lg sacred-bold" dangerouslySetInnerHTML={{ __html: desc }} />
      <button className="bg-gray-50 hover:bg-orange-50 text-secondary font-bold text-xs px-6 py-2.5 rounded-full border border-gray-100 transition-colors uppercase tracking-widest">
        {detailsBtn} →
      </button>
    </div>
  </div>
);

export default Events;
