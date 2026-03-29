
import React, { useState } from 'react';
import { Language } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TiltCard } from '../hooks/use3DTilt';

interface Story {
  name: string;
  title: string;
  text: string;
  date: string;
}

interface DevoteeExperienceProps {
  lang: Language;
}

const DevoteeExperience: React.FC<DevoteeExperienceProps> = ({ lang }) => {
  const revealRef = useScrollReveal({ threshold: 0.1 });
  const defaultStories: Story[] = [
    { 
      name: 'R. Venkatesh', 
      title: "Periyava's Miracle", 
      text: "I visited the sannadhi during a difficult time in my career. The peace I felt there was unparalleled, and things started turning around immediately. It was as if a weight was lifted from my shoulders the moment I entered the Kandhamangalam village limits. The divine presence is truly palpable in the silence of the sannadhi.", 
      date: 'Jan 14, 2025' 
    },
    { 
      name: 'Lakshmi Narayan', 
      title: "Divine Grace", 
      text: "Participating in the Pidi Arisi Thittam has brought so much fulfillment to our family. It's a beautiful way to serve the community while honoring the teachings of Maha Periyava. We have been doing this for three generations now and the sense of belonging to this sacred lineage is our greatest wealth.", 
      date: 'Dec 18, 2024' 
    },
    { 
      name: 'Dr. Subramanian', 
      title: "A Vision of Compassion", 
      text: "I remember my first darshan of the vigraham. The eyes were so full of life and compassion. It felt like Maha Periyava was personally listening to my prayers. Every time I face a challenge in my medical practice, I recall that calm gaze and find the strength to proceed with empathy and dedication.", 
      date: 'Oct 24, 2024' 
    }
  ];

  const [stories] = useState<Story[]>(defaultStories);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', title: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.text) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xreydlyv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', title: '', text: '' });
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
          setIsModalOpen(false);
        }, 5000);
      } else {
        alert('Oops! There was a problem submitting your story. Please try again.');
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your story. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="devotee-experience" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] bg-orange-50 px-5 py-2 rounded-full mb-6 inline-block">
              {lang === 'ta' ? 'புனித ஊட்டம்' : 'Sacred Experience Feed'}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-text-dark heading-font leading-tight">
              {lang === 'ta' ? 'பக்தி அனுபவங்கள்' : 'Voices of Devotion'}
            </h2>
            <p className="text-gray-500 mt-6 text-xl leading-relaxed">
              {lang === 'ta' 
                ? 'பெரியவாவின் அருளாசியைப் பெற்ற பக்தர்களின் நேரடி அனுபவங்கள்.' 
                : 'A live feed of divine grace experienced by devotees worldwide. Read and be inspired by the miracles of Maha Periyava.'}
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-primary to-primary-dark hover:shadow-2xl hover:-translate-y-1 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-3 uppercase text-sm tracking-widest"
          >
            <span>🙏</span> {lang === 'ta' ? 'அனுபவத்தைப் பகிரவும்' : 'Share Your Blessing'}
          </button>
        </div>

        {/* Masonry-like Sacred Feed */}
        <div ref={revealRef} className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 sr-hidden sr-stagger">
          {stories.map((story, idx) => {
            const isExpanded = expandedIds.includes(idx);
            const needsToggle = story.text.length > 200;
            const displayText = isExpanded ? story.text : `${story.text.slice(0, 200)}${needsToggle ? '...' : ''}`;

            return (
              <TiltCard 
                key={`${story.name}-${idx}`} 
                maxTilt={6}
                className="break-inside-avoid p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col hover:shadow-lg transition-all relative group overflow-hidden sr-hidden"
                style={{
                  background: 'rgba(255, 252, 247, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 200, 150, 0.25)',
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                {/* Lotus/Om Watermark Icon */}
                <div className="absolute -top-4 -right-4 text-accent/10 text-8xl pointer-events-none select-none group-hover:text-accent/20 transition-colors">
                  ॐ
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="text-primary/30 text-6xl font-serif mb-2 leading-none">“</div>
                  <h3 className="text-2xl font-bold text-secondary mb-4 quote-font tracking-tight">{story.title}</h3>
                  <p className="text-gray-700 leading-relaxed italic text-lg font-inter">
                    {displayText}
                  </p>
                  {needsToggle && (
                    <button 
                      onClick={() => toggleExpand(idx)}
                      className="text-primary font-bold text-sm mt-6 hover:underline uppercase tracking-widest"
                    >
                      {isExpanded ? (lang === 'ta' ? 'சுருக்கவும்' : 'Read Less') : (lang === 'ta' ? 'மேலும் படிக்க' : 'Read More')}
                    </button>
                  )}
                </div>
                
                <div className="mt-10 pt-8 border-t border-accent/10 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-accent/20 rounded-full flex items-center justify-center font-bold text-primary shadow-sm text-lg">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-text-dark text-sm">{story.name}</p>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-0.5">{lang === 'ta' ? 'பக்தர்' : 'Devotee'}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{story.date}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>


      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="p-8 md:p-16 text-center space-y-8 bg-[#FFF8F0]">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl animate-bounce">
                  ✓
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold heading-font text-text-dark">
                    {lang === 'ta' ? 'மிக்க நன்றி!' : 'Blessed Offering Received'}
                  </h3>
                  <p className="text-xl text-secondary font-medium italic">
                    {lang === 'ta' ? 'உங்கள் அனுபவம் நிர்வாக ஒப்புதலுக்குப் பிறகு தோன்றும்.' : 'Your story will appear after admin approval.'}
                  </p>
                </div>
                <div className="text-primary font-bold animate-pulse text-sm uppercase tracking-widest">
                  {lang === 'ta' ? 'சமர்ப்பிக்கப்பட்டது...' : 'Submitted...'}
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 md:p-10 text-white relative">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold heading-font">{lang === 'ta' ? 'அனுபவத்தைப் பகிரவும்' : 'Share Your Blessing'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition text-2xl">✕</button>
                  </div>
                  <p className="text-white/80 text-lg italic">
                    {lang === 'ta' ? 'உங்கள் பக்தி மற்றவர்களுக்கு ஊக்கமளிக்கும்' : 'Your personal miracle can be a beacon of hope for another devotee.'}
                  </p>
                </div>
                
                <form onSubmit={handleSubmission} className="p-6 md:p-10 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-2">Your Name *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Full Name"
                        className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:border-primary focus:bg-white transition-all font-medium shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-2">Experience Title *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Divine Guidance"
                        className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:border-primary focus:bg-white transition-all font-medium shadow-inner"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-2">The Story of Grace *</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      placeholder="Share your sacred encounter with Maha Periyava..."
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:border-primary focus:bg-white transition-all font-medium resize-none shadow-inner"
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 bg-secondary hover:bg-bg-dark text-white rounded-[2rem] font-bold text-lg shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span>Offering...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Sacred Story</span>
                          <span>🙏</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                      Fields marked with * are mandatory for submission
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default DevoteeExperience;
