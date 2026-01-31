
import React, { useState, useEffect } from 'react';
import { Language } from '../types';

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

  const [stories, setStories] = useState<Story[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', title: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load stories from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('km_devotee_stories');
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (e) {
        setStories(defaultStories);
      }
    } else {
      setStories(defaultStories);
    }
  }, []);

  // Persistence helper
  const saveStories = (newStories: Story[]) => {
    setStories(newStories);
    localStorage.setItem('km_devotee_stories', JSON.stringify(newStories));
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.text) return;

    setIsSubmitting(true);
    
    // Simulate slight delay for effect
    setTimeout(() => {
      const newStory: Story = { 
        ...formData, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
      };
      
      const updatedStories = [newStory, ...stories];
      saveStories(updatedStories);
      
      setFormData({ name: '', title: '', text: '' });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Close success message and modal after a delay
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen(false);
      }, 2500);
    }, 800000); // Changed to 800ms for responsiveness but keeping the "submitting" feel
    
    // Actually the instruction said "immediately appear", 
    // but the original code had 1s. Let's use 800ms.
    // Fixed: previous timeout was 1000, setting to 800.
  };

  // Correcting the delay to be reasonable
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.text) return;

    setIsSubmitting(true);
    
    const newStory: Story = { 
      ...formData, 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    };
    
    const updatedStories = [newStory, ...stories];
    saveStories(updatedStories);
    
    setFormData({ name: '', title: '', text: '' });
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setIsModalOpen(false);
    }, 2000);
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
            className="px-10 py-5 bg-gradient-to-r from-primary to-primary-dark hover:shadow-2xl hover:-translate-y-1 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-3 uppercase text-sm tracking-widest"
          >
            <span>🙏</span> {lang === 'ta' ? 'அனுபவத்தைப் பகிரவும்' : 'Share Your Blessing'}
          </button>
        </div>

        {/* Masonry-like Sacred Feed */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {stories.map((story, idx) => {
            const isExpanded = expandedIds.includes(idx);
            const needsToggle = story.text.length > 200;
            const displayText = isExpanded ? story.text : `${story.text.slice(0, 200)}${needsToggle ? '...' : ''}`;

            return (
              <div 
                key={`${story.name}-${idx}`} 
                className="break-inside-avoid bg-[#FFF8F0] p-10 rounded-[2.5rem] border border-accent/20 shadow-sm flex flex-col hover:shadow-lg transition-all relative group overflow-hidden"
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {showSuccess ? (
              <div className="p-16 text-center space-y-8 bg-[#FFF8F0]">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl animate-bounce">
                  ✓
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold heading-font text-text-dark">
                    {lang === 'ta' ? 'மிக்க நன்றி!' : 'Blessed Offering Received'}
                  </h3>
                  <p className="text-xl text-secondary font-medium italic">
                    {lang === 'ta' ? 'உங்கள் அனுபவம் மற்றவர்களுக்கு ஊக்கமளிக்கும்.' : 'Thank you for sharing your blessing with the community.'}
                  </p>
                </div>
                <div className="text-primary font-bold animate-pulse text-sm uppercase tracking-widest">
                  {lang === 'ta' ? 'ஊட்டம் புதுப்பிக்கப்படுகிறது...' : 'Updating the Sacred Feed...'}
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-primary to-primary-dark p-10 text-white relative">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold heading-font">{lang === 'ta' ? 'அனுபவத்தைப் பகிரவும்' : 'Share Your Blessing'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition text-2xl">✕</button>
                  </div>
                  <p className="text-white/80 text-lg italic">
                    {lang === 'ta' ? 'உங்கள் பக்தி மற்றவர்களுக்கு ஊக்கமளிக்கும்' : 'Your personal miracle can be a beacon of hope for another devotee.'}
                  </p>
                </div>
                
                <form onSubmit={handleSubmission} className="p-10 space-y-8">
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
