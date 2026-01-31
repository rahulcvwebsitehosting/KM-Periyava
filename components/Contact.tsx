
import React, { useState } from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const address = "Kandhamangalam, Komal - East, Tamil Nadu 609805";
  const directionsUrl = "https://www.google.com/maps/dir//Kandhamangalam,+Komal+-+East,+Tamil+Nadu+609805/@11.0234307,79.6038842,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a552501876a9e1f:0xbf1e786d3668c84f!2m2!1d79.6038842!2d11.0234307";

  return (
    <section id="contact" className="py-24 bg-white animate-in fade-in duration-500">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] bg-orange-50 px-5 py-2 rounded-full inline-block mb-6">
                {lang === 'ta' ? 'தொடர்பு' : 'Get in Touch'}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-text-dark heading-font leading-tight">
                {lang === 'ta' ? 'எங்களை தொடர்பு கொள்ள' : 'Contact Our Sannadhi'}
              </h2>
              <p className="text-gray-500 text-xl mt-6 leading-relaxed max-w-xl font-medium">
                {lang === 'ta' 
                  ? 'கோவில் பற்றிய விவரங்கள், பூஜைகள் அல்லது நன்கொடைகள் தொடர்பான சந்தேகங்களுக்கு எங்களை அழைக்கவும்.' 
                  : 'For any queries regarding poojas, donations, or temple visits, our doors and hearts are always open.'}
              </p>
            </div>

            <div className="space-y-8">
              <ContactInfoItem 
                icon="📍" 
                title={lang === 'ta' ? 'முகவரி' : 'Physical Address'}
                content={address}
              />
              <ContactInfoItem 
                icon="📞" 
                title={lang === 'ta' ? 'தொலைபேசி' : 'Office Phone'}
                content="+91 98843 86412"
              />
              <ContactInfoItem 
                icon="✉️" 
                title={lang === 'ta' ? 'மின்னஞ்சல்' : 'Email Inquiry'}
                content="info@kmperiyavasannathi.co.in"
              />
            </div>

            {/* Direct Call Button */}
            <div className="pt-4">
              <a 
                href="tel:+919884386412"
                className="inline-flex items-center gap-4 bg-secondary hover:bg-bg-dark text-white px-10 py-5 rounded-full font-bold shadow-xl transition-all transform hover:-translate-y-1 text-sm uppercase tracking-widest"
              >
                <span>📞</span>
                {lang === 'ta' ? 'நேரடியாக அழைக்க' : 'Direct Call to Office'}
              </a>
            </div>

            {/* Integrated Map */}
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-orange-50/50 aspect-video relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.282859942691!2d79.60169557474447!3d11.023430689140417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a552501876a9e1f%3A0xbf1e786d3668c84f!2sKandhamangalam%2C%20Komal%20-%20East%2C%20Tamil%20Nadu%20609805!5e0!3m2!1sen!2sin!4v1738220000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-[#FFFCF7] p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-orange-100 relative overflow-hidden">
             {/* Decorative Background Icon */}
            <div className="absolute -bottom-10 -right-10 text-[20rem] text-primary/5 select-none pointer-events-none">ॐ</div>

            {submitted ? (
              <div className="text-center py-24 space-y-8 animate-in fade-in zoom-in duration-500 relative z-10">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm border border-green-50 animate-bounce">✓</div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-text-dark heading-font">
                    {lang === 'ta' ? 'செய்தி அனுப்பப்பட்டது!' : 'Message Sent Successfully'}
                  </h3>
                  <p className="text-xl text-gray-500 font-medium italic">
                    {lang === 'ta' ? 'நாங்கள் விரைவில் உங்களைத் தொடர்பு கொள்வோம்.' : 'We have received your inquiry and will get back to you soon. Pranam.'}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-secondary heading-font">Submit Inquiry</h3>
                  <p className="text-gray-400 text-sm">Fill in the details below to reach our administrative office.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-widest ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Shyam Sundar"
                      className="w-full px-8 py-5 bg-white border border-orange-100 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-accent uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="shyam@example.com"
                      className="w-full px-8 py-5 bg-white border border-orange-100 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-accent uppercase tracking-widest ml-4">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="w-full px-8 py-5 bg-white border border-orange-100 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-accent uppercase tracking-widest ml-4">Your Message</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we assist you today?"
                    className="w-full px-8 py-5 bg-white border border-orange-100 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium resize-none shadow-sm"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-6 bg-primary hover:bg-primary-dark text-white rounded-[2.5rem] font-bold text-xl shadow-[0_15px_40px_rgba(255,107,53,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
                  >
                    Send Message <span>🙏</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, title, content }: any) => (
  <div className="flex gap-8 items-start group">
    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-orange-100 flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="pt-1">
      <h4 className="font-bold text-secondary text-xs uppercase tracking-[0.4em] mb-2">{title}</h4>
      <p className="text-text-dark font-bold text-lg leading-relaxed">{content}</p>
    </div>
  </div>
);

export default Contact;
