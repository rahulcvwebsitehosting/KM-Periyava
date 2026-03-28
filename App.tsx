
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
import GratitudePage from './pages/GratitudePage';



const Ripple: React.FC<{ delay: number }> = ({ delay }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className="absolute rounded-full border-2 border-accent/60"
      style={{
        width: active ? '600px' : '100px',
        height: active ? '600px' : '100px',
        opacity: active ? 0 : 0.8,
        transition: 'width 800ms ease-out, height 800ms ease-out, opacity 800ms ease-out',
        pointerEvents: 'none',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

const OmIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<'start' | 'enter' | 'hold' | 'exit' | 'done'>('start');
  const [showRipples, setShowRipples] = useState(false);

  useEffect(() => {
    const isShown = sessionStorage.getItem('om_shown');
    if (isShown) return;
    
    sessionStorage.setItem('om_shown', '1');
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    // Start animation sequence
    const timers = [
      setTimeout(() => setPhase('enter'), 50),
      setTimeout(() => setPhase('hold'), 600),
      setTimeout(() => {
        setPhase('exit');
        setShowRipples(true);
      }, 1200),
      setTimeout(() => setPhase('done'), 1800),
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 2200)
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  const getOmStyle = () => {
    switch (phase) {
      case 'start':
        return { transform: 'scale(0.5)', opacity: 0 };
      case 'enter':
        return { transform: 'scale(1.2)', opacity: 1 };
      case 'hold':
        return { transform: 'scale(1)', opacity: 1 };
      case 'exit':
      case 'done':
        return { transform: 'scale(3)', opacity: 0 };
      default:
        return {};
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle, rgba(255,107,53,0.95) 0%, rgba(44,24,16,0.98) 100%)',
        opacity: phase === 'done' ? 0 : 1,
        transition: 'opacity 400ms ease-out',
        pointerEvents: phase === 'done' ? 'none' : 'auto'
      }}
    >
      <div 
        style={{
          fontSize: '12rem',
          color: '#FFD700',
          fontFamily: 'Cinzel, serif',
          transition: 'transform 600ms ease-out, opacity 600ms ease-out',
          ...getOmStyle()
        }}
      >
        ॐ
      </div>

      {showRipples && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 150, 300].map((delay, i) => (
            <Ripple key={i} delay={delay} />
          ))}
        </div>
      )}
    </div>
  );
};

const FloatingPetals: React.FC = () => {
  const petalsRef = useRef<any[]>([]);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  if (petalsRef.current.length === 0) {
    const colors = [
      'rgba(255,150,100,0.5)',
      'rgba(255,180,120,0.4)',
      'rgba(255,200,150,0.5)',
      'rgba(255,120,80,0.4)'
    ];

    for (let i = 0; i < 18; i++) {
      petalsRef.current.push({
        id: i,
        left: Math.random() * 100,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * -15,
        drift: -80 + Math.random() * 160,
        rotation: Math.random() * 360,
        width: 10 + Math.random() * 10,
        height: 14 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes petalFall {
        0% { 
          transform: translateY(-20px) rotate(0deg) translateX(0px); 
          opacity: 0; 
        }
        10% { opacity: 0.8; }
        90% { opacity: 0.6; }
        100% { 
          transform: translateY(110vh) rotate(720deg) 
          translateX(var(--drift)); 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {petalsRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            borderRadius: '50% 20% 50% 20%',
            top: '-20px',
            '--drift': `${p.drift}px`,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
          } as any}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isPetalsOn, setIsPetalsOn] = useState(true);
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

  useEffect(() => {
    const titles: Record<string, string> = {
      home: "KM Periyava Sannadhi - Kandhamangalam",
      about: "About Us | KM Periyava Sannadhi",
      events: "Sacred Events | KM Periyava Sannadhi",
      gallery: "Gallery | KM Periyava Sannadhi",
      experience: "Devotee Experiences | KM Periyava Sannadhi",
      wisdom: "Deivathin Kural | KM Periyava Sannadhi",
      donate: "Support & Donate | KM Periyava Sannadhi",
      contact: "Contact Us | KM Periyava Sannadhi",
      gratitude: "Hall of Gratitude | KM Periyava Sannadhi",
    };
    const [page] = currentPath.split('/');
    document.title = titles[page] || "KM Periyava Sannadhi - Kandhamangalam";
  }, [currentPath]);

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
      case 'gratitude': return <GratitudePage lang={lang} navigate={navigate} />;
      default: return <HomePage lang={lang} t={t} quote={activeQuote[lang]} isLoadingQuote={isLoadingQuote} onRefreshQuote={fetchDailyQuote} navigate={navigate} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FFFCF7] selection:bg-orange-100 ${lang === 'ta' ? 'tamil-font' : 'font-inter'}`}>
      <OmIntro />
      <Header 
        lang={lang} 
        setLang={setLang} 
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        isPetalsOn={isPetalsOn}
        togglePetals={() => setIsPetalsOn(p => !p)}
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

      {isPetalsOn && <FloatingPetals />}
    </div>
  );
};

export default App;
