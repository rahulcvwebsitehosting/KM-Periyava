
import React from 'react';
import { getProcessedEvents } from '../data/events';

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
  const ganapathiEvents = getProcessedEvents(); 
  const sivanEvents: any[] = []; // Empty for now as requested

  const handleDownloadSchedule = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const events = activeTemple === 'ganapathi' ? ganapathiEvents : sivanEvents;
      const recentEvents = events.slice(0, 3);

      // Colors
      const saffron = '#FF6B35';
      const darkText = '#2C1810';

      // Header
      doc.setTextColor(saffron);
      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      doc.text('KM Periyava Sannadhi - Kandhamangalam', 20, 30);

      doc.setFontSize(16);
      doc.setTextColor(darkText);
      doc.text('Sacred Events Schedule', 20, 40);

      // Date on the right
      doc.setFontSize(10);
      doc.setTextColor('#999999');
      const today = new Date().toLocaleDateString();
      doc.text(`Date: ${today}`, 160, 40);

      // Line
      doc.setDrawColor(saffron);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      // Events
      let y = 60;
      if (recentEvents.length === 0) {
        doc.setFontSize(12);
        doc.setFont('times', 'italic');
        doc.text('No events scheduled at this time for this temple.', 20, y);
      } else {
        recentEvents.forEach((event: any) => {
          // Check for page overflow
          if (y > 240) {
            doc.addPage();
            y = 30;
          }

          doc.setFontSize(14);
          doc.setFont('times', 'bold');
          doc.setTextColor(saffron);
          doc.text(event.title, 20, y);
          
          doc.setFontSize(10);
          doc.setFont('times', 'normal');
          doc.setTextColor('#666666');
          doc.text(event.date, 20, y + 7);

          y += 15;

          if (event.programs) {
            doc.setTextColor(darkText);
            event.programs.forEach((prog: string) => {
              const splitProg = doc.splitTextToSize(`• ${prog}`, 160);
              doc.text(splitProg, 25, y);
              y += (splitProg.length * 6);
            });
          }
          y += 15;
        });
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor('#999999');
      doc.setDrawColor('#EEEEEE');
      doc.line(20, 275, 190, 275);
      doc.text('For more info: www.kmperiyavasannathi.co.in | +91 98843 86412', 105, 282, { align: 'center' });

      doc.save('KM-Periyava-Schedule.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

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
          <button 
            onClick={handleDownloadSchedule}
            className="px-6 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
          >
            📄 Download Schedule
          </button>
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
                className="bg-[#FFFCF7] p-8 rounded-[2.5rem] border border-orange-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden"
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
