
import React from 'react';
import { Language } from '../types';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  // Curated list of specific spiritual contexts
  const galleryItems = [
    {
      id: 1,
      category: lang === 'ta' ? 'பெரியவா திருவுருவம்' : 'Periyava Portrait',
      caption: lang === 'ta' ? 'அருள்மிகு மஹா பெரியவா' : 'Divine Grace of Maha Periyava',
      src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800', // Spiritual texture/Indian context
      aspect: 'aspect-[3/4]'
    },
    {
      id: 2,
      category: lang === 'ta' ? 'சந்நிதி தோற்றம்' : 'Sannadhi Exterior',
      caption: lang === 'ta' ? 'கந்தமங்கலம் சந்நிதி' : 'Exterior View of Kandhamangalam Sannadhi',
      src: 'https://images.unsplash.com/photo-1621251912644-3d120a178971?auto=format&fit=crop&q=80&w=800', // Temple stone
      aspect: 'aspect-square'
    },
    {
      id: 3,
      category: lang === 'ta' ? 'அனுஷ பூஜை' : 'Anusham Pooja Rituals',
      caption: lang === 'ta' ? 'புனித வழிபாட்டு முறைகள்' : 'Sacred Rituals during Anusham',
      src: 'https://images.unsplash.com/photo-1609139006981-d1c140407f5d?auto=format&fit=crop&q=80&w=800', // Oil lamps
      aspect: 'aspect-[4/3]'
    },
    {
      id: 4,
      category: lang === 'ta' ? 'பிடி அரிசி திட்டம்' : 'Pidi Arisi Thittam',
      caption: lang === 'ta' ? 'பக்தர்களின் சேவை' : 'Devotees Participating in Seva',
      src: 'https://images.unsplash.com/photo-1505933332464-44802c30034a?auto=format&fit=crop&q=80&w=800', // Saffron silk/grains
      aspect: 'aspect-[3/4]'
    },
    {
      id: 5,
      category: lang === 'ta' ? 'தீப ஆராதனை' : 'Deepa Aradhana',
      caption: lang === 'ta' ? 'மங்கள ஒளி' : 'The Auspicious Light of Worship',
      src: 'https://images.unsplash.com/photo-1543059231-1823f6631b53?auto=format&fit=crop&q=80&w=800', // Spiritual light
      aspect: 'aspect-square'
    },
    {
      id: 6,
      category: lang === 'ta' ? 'புனித நதி' : 'Sacred River',
      caption: lang === 'ta' ? 'வீரசோழன் ஆற்றின் கரை' : 'Banks of the Holy Veeracholan River',
      src: 'https://images.unsplash.com/photo-1540655037529-dec987208707?auto=format&fit=crop&q=80&w=800', // River landscape
      aspect: 'aspect-[16/9]'
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest bg-orange-50 px-4 py-1.5 rounded-full">
            {lang === 'ta' ? 'புனித காட்சிகள்' : 'Sacred Glimpses'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark heading-font mt-6">
            {lang === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Media Gallery'}
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto italic font-medium">
            {lang === 'ta' ? 'பெரியவாவின் அருளாசியுடன் கூடிய தெய்வீக தருணங்கள்.' : 'Dignified visual representations of our sacred traditions and moments.'}
          </p>
        </div>

        {/* Masonry-style column grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="relative break-inside-avoid group cursor-pointer"
            >
              <div className={`relative ${item.aspect} w-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-all transform group-hover:shadow-2xl`}>
                <img 
                  src={item.src} 
                  alt={item.category}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-xl font-bold heading-font leading-tight">
                    {item.caption}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-full font-bold transition-all shadow-md transform hover:-translate-y-1">
            {lang === 'ta' ? 'மேலும் படங்களைக் காண்க' : 'Explore Complete Archive →'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
