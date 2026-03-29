
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '../types';

interface FlowerData {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
  size: number;
  color: string;
  delay: number;
}

const FlowerBurst: React.FC<{ 
  origin: { x: number; y: number };
  onComplete: () => void;
}> = ({ origin, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const colors = ['#FF6B35','#FFB347','#FF69B4','#FFD700','#FF4500','#FFA07A','#FF1493','#FFC0CB'];
  
  const flowers: FlowerData[] = useMemo(() => Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const speed = Math.random() * 6 + 4;
    const rad = (angle * Math.PI) / 180;
    const dist = speed * 80;
    
    return {
      id: i,
      startX: origin.x,
      startY: origin.y,
      endX: origin.x + Math.cos(rad) * dist,
      endY: origin.y + Math.sin(rad) * dist + 60,
      rotation: Math.random() * 360,
      size: Math.random() * 16 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.4
    };
  }), [origin]);

  useEffect(() => {
    const t1 = setTimeout(() => setIsAnimating(true), 50);
    const t2 = setTimeout(onComplete, 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
      {flowers.map(flower => (
        <div
          key={flower.id}
          style={{
            position: 'fixed',
            left: isAnimating ? flower.endX : flower.startX,
            top: isAnimating ? flower.endY : flower.startY,
            transition: `all ${1.2 + flower.delay}s cubic-bezier(0.25,0.46,0.45,0.94)`,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating 
              ? `translate(-50%, -50%) rotate(${flower.rotation * 5}deg) scale(0)` 
              : `translate(-50%, -50%) rotate(0deg) scale(1)`,
            fontSize: flower.size + 'px',
            pointerEvents: 'none',
            zIndex: 300
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

const DonatePage: React.FC<{ lang: Language }> = ({ lang }) => {
  const [burstActive, setBurstActive] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleDonateClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setBurstOrigin({ 
        x: rect.left + rect.width / 2, 
        y: rect.top + rect.height / 2 
      });
      setBurstActive(true);
    }
  };

  const whatsappUrl = `https://wa.me/+919884386412?text=${encodeURIComponent("Pranam. I would like to contribute to KM Periyava Sannadhi. Please provide the donation details.")}`;

  return (
    <section className="py-24 animate-in fade-in duration-500 bg-bg-primary">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden">
          <div className="bg-primary p-12 md:p-16 text-white text-center">
             <h2 className="text-4xl md:text-5xl font-bold heading-font mb-4">Support Sannadhi</h2>
             <p className="text-xl text-white/80 max-w-2xl mx-auto">
               {lang === 'ta' 
                 ? 'அன்னதானம் மற்றும் திருப்பணிகளுக்கு உங்களது அன்பளிப்பு தேவை. பங்களிக்க எங்களை தொடர்பு கொள்ளவும்.' 
                 : 'Your contributions sustain the sacred initiatives and daily rituals of the temple. Please reach out to us to make a contribution.'}
             </p>
          </div>
          
          <div className="p-12 md:p-20 flex flex-col items-center text-center space-y-12">
            <div className="space-y-6 max-w-lg">
              <div className="w-24 h-24 bg-orange-50 text-primary rounded-full flex items-center justify-center text-5xl mx-auto shadow-inner">
                🙏
              </div>
              <h3 className="text-2xl font-bold text-text-dark heading-font">
                {lang === 'ta' ? 'நன்கொடை விவரங்களுக்கு' : 'Inquire for Donation Details'}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                {lang === 'ta' 
                  ? 'வங்கி கணக்கு விவரங்கள் மற்றும் பிற தகவல்களுக்கு கீழே உள்ள வாட்ஸ்அப் பட்டனை கிளிக் செய்து எங்களை தொடர்பு கொள்ளவும்.' 
                  : 'For bank account details, QR codes, or to record your contribution for Annadhanam, please message our administrative office via WhatsApp. We will provide the necessary details for your offering.'}
              </p>
            </div>

            <a 
              ref={buttonRef}
              onClick={handleDonateClick}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebd5b] text-white px-12 py-6 rounded-full font-bold text-xl shadow-[0_15px_40px_rgba(37,211,102,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 34.9 2.1 10.6-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              {lang === 'ta' ? 'வாட்ஸ்அப் மூலம் தொடர்பு கொள்ள' : 'Contact via WhatsApp'}
            </a>

            <div className="pt-10 border-t border-gray-100 w-full text-center space-y-4">
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Alternative Contact</p>
              <p className="text-2xl font-bold text-secondary">info@kmperiyavasannathi.co.in</p>
            </div>
          </div>
        </div>
      </div>
      {burstActive && (
        <FlowerBurst 
          origin={burstOrigin} 
          onComplete={() => setBurstActive(false)} 
        />
      )}
    </section>
  );
};

export default DonatePage;
