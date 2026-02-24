
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from './types';
import { translations } from './translations';
import { wisdomQuotes } from './data/wisdom';

// Shared Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

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
  const musicStateRef = useRef(isMusicPlaying);
  const fadeIntervalRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    musicStateRef.current = isMusicPlaying;
  }, [isMusicPlaying]);

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

  const startFadeIn = (audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = 0;
    let vol = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      vol += 0.02;
      if (vol >= 0.4) {
        audio.volume = 0.4;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = vol;
      }
    }, 100);
  };

  useEffect(() => {
    const audio = new Audio("https://archive.org/download/JayaJayaSankara/JayaJayaSankara.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const startAudioOnInteraction = () => {
      if (audioRef.current && musicStateRef.current) {
        audioRef.current.play()
          .then(() => {
            startFadeIn(audioRef.current!);
            document.removeEventListener('click', startAudioOnInteraction);
            document.removeEventListener('touchstart', startAudioOnInteraction);
            document.removeEventListener('scroll', startAudioOnInteraction);
            document.removeEventListener('keydown', startAudioOnInteraction);
          })
          .catch(err => console.debug("Autoplay pending interaction...", err));
      }
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
    document.addEventListener('scroll', startAudioOnInteraction);
    document.addEventListener('keydown', startAudioOnInteraction);

    return () => {
      audio.pause();
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
      document.removeEventListener('scroll', startAudioOnInteraction);
      document.removeEventListener('keydown', startAudioOnInteraction);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play()
          .then(() => startFadeIn(audioRef.current!))
          .catch(() => console.debug("Manual play blocked"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  const fetchDailyQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * wisdomQuotes.length);
      setCurrentQuoteIndex(nextIndex);
      setIsLoadingQuote(false);
    }, 600);
  }, []);

  useEffect(() => {
    fetchDailyQuote();
  }, [fetchDailyQuote]);

  const t = translations[lang];
  const activeQuote = wisdomQuotes[currentQuoteIndex];

  const renderContent = () => {
    const [page, id] = currentPath.split('/');
    switch (page) {
      case 'home': return <HomePage lang={lang} t={t} quote={activeQuote[lang]} isLoadingQuote={isLoadingQuote} onRefreshQuote={fetchDailyQuote} navigate={navigate} />;
      case 'about': return <AboutPage t={t.about} lang={lang} />;
      case 'events': 
        if (id) return <EventDetailPage id={id} lang={lang} navigate={navigate} />;
        return <EventsPage lang={lang} t={t.events} navigate={navigate} />;
      case 'gallery': return <GalleryPage lang={lang} navigate={navigate} />;
      case 'experience': return <ExperiencePage lang={lang} />;
      case 'wisdom': return <WisdomPage lang={lang} quoteData={activeQuote} isLoading={isLoadingQuote} onRefresh={fetchDailyQuote} />;
      case 'donate': return <DonatePage lang={lang} />;
      case 'contact': return <ContactPage lang={lang} />;
      default: return <HomePage lang={lang} t={t} quote={activeQuote[lang]} isLoadingQuote={isLoadingQuote} onRefreshQuote={fetchDailyQuote} navigate={navigate} />;
    }
  };

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

      {/* Divine Assistant Chatbot */}
      <Chatbot lang={lang} navigate={navigate} />
    </div>
  );
};

export default App;
