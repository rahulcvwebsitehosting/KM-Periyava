
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from './types';
import { translations } from './translations';
import { wisdomQuotes } from './data/wisdom';

// Shared Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import GalleryPage from './pages/GalleryPage';
import ExperiencePage from './pages/ExperiencePage';
import WisdomPage from './pages/WisdomPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('home');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.hash.replace('#/', '') || 'home';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#/${path}`;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const audio = new Audio("https://cs1.mp3.pm/download/6408590/T2MvZHliZEN0UlZDUjlyV2l2WS84WTRGaklCKzRXNHB4UndZTE1VVHg0cGxFRGo0a0JFTi9zRytjV3pmcXpPUFIra3lsQVJzUGZPSWlObjFsRnJRMWlpQjRCSFYwaUFnME5YMTZaYzJxUlhIZW1wY3ExbHMzS01Ed0VkbjJnYVM/Jaya_Jaya_Shankara_-_Hara_Hara_Shankara_(mp3.pm).mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    const startAudio = () => {
      if (audioRef.current && isMusicPlaying) {
        audioRef.current.play().catch(err => console.debug("Autoplay pending interaction...", err));
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
      }
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  const fetchDailyQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    // Authentic "Deivathin Kural" Wisdom Engine Implementation
    // Use the verified selection for the 'Deivathin Kural' section.
    setTimeout(() => {
      let nextIndex = currentQuoteIndex;
      // Ensure we don't get the same quote twice in a row for better interactivity
      while (nextIndex === currentQuoteIndex) {
        nextIndex = Math.floor(Math.random() * wisdomQuotes.length);
      }
      setCurrentQuoteIndex(nextIndex);
      setIsLoadingQuote(false);
    }, 600); // Standardized delay for smooth UI fade-in
  }, [currentQuoteIndex]);

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  const t = translations[lang];
  const activeQuote = wisdomQuotes[currentQuoteIndex];

  const renderContent = () => {
    const [page, id] = currentPath.split('/');
    switch (page) {
      case 'home': return <HomePage lang={lang} t={t} quote={activeQuote[lang]} isLoadingQuote={isLoadingQuote} onRefreshQuote={fetchDailyQuote} navigate={navigate} />;
      case 'about': return <AboutPage t={t.about} />;
      case 'events': 
        if (id) {
          return <EventDetailPage id={id} lang={lang} navigate={navigate} />;
        }
        return <EventsPage lang={lang} t={t.events} navigate={navigate} />;
      case 'gallery': return <GalleryPage lang={lang} />;
      case 'experience': return <ExperiencePage lang={lang} />;
      case 'wisdom': return <WisdomPage lang={lang} quoteData={activeQuote} isLoading={isLoadingQuote} onRefresh={fetchDailyQuote} />;
      case 'donate': return <DonatePage lang={lang} />;
      case 'contact': return <ContactPage lang={lang} />;
      default: return <HomePage lang={lang} t={t} quote={activeQuote[lang]} isLoadingQuote={isLoadingQuote} onRefreshQuote={fetchDailyQuote} navigate={navigate} />;
    }
  };

  const whatsappUrl = `https://wa.me/+919884386412?text=${encodeURIComponent("Pranam. I would like to inquire about the pooja timings at Kandhamangalam Sannadhi.")}`;

  return (
    <div className={`min-h-screen bg-[#FFFCF7] selection:bg-orange-100 ${lang === 'ta' ? 'tamil-font' : 'font-inter'}`}>
      <Header 
        lang={lang} 
        setLang={setLang} 
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        t={t.nav}
        currentPath={currentPath}
        navigate={navigate}
      />
      
      <main id="main-content" className="min-h-screen pt-20">
        {renderContent()}
      </main>

      <Footer lang={lang} t={t.nav} navigate={navigate} />

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[40] w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group overflow-hidden"
        title="Contact via WhatsApp"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 34.9 2.1 10.6-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </div>
  );
};

export default App;
