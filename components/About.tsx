
import React from 'react';

interface AboutProps {
  t: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    templesTitle: string;
    templeList: string[];
    getDirections: string;
  };
}

const About: React.FC<AboutProps> = ({ t }) => {
  const directionsUrl = "https://www.google.com/maps/dir//Kandhamangalam,+Komal+-+East,+Tamil+Nadu+609805/@11.0234307,79.6038842,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a552501876a9e1f:0xbf1e786d3668c84f!2m2!1d79.6038842!2d11.0234307?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section id="about" className="py-24 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">
              {t.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary heading-font">
              {t.title}
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>{t.p1}</p>
              <p className="font-medium text-secondary">{t.p2}</p>
              <p>{t.p3}</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                {t.templesTitle}
              </h3>
              <ul className="space-y-4">
                {t.templeList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></span>
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a 
              href={directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-bg-dark text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1"
            >
              {t.getDirections}
            </a>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white relative aspect-[4/3]">
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                {/* Simulated Map UI */}
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    📍
                  </div>
                  <p className="text-gray-500 font-bold">Kandhamangalam Sannadhi Location</p>
                  <p className="text-xs text-gray-400 mt-1">15 km from Mayiladuthurai</p>
                </div>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.282859942691!2d79.60169557474447!3d11.023430689140417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a552501876a9e1f%3A0xbf1e786d3668c84f!2sKandhamangalam%2C%20Komal%20-%20East%2C%20Tamil%20Nadu%20609805!5e0!3m2!1sen!2sin!4v1738220000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 absolute inset-0 opacity-0 transition-opacity duration-1000"
                style={{ opacity: 1 }}
                allowFullScreen={true}
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <StatCard val="15 km" label="Distance" sub="From Mayiladuthurai" />
              <StatCard val="3" label="Temples" sub="In Village" />
              <StatCard val="25+" label="Years" sub="Of Divine Service" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ val, label, sub }: { val: string, label: string, sub: string }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 text-center hover:shadow-md transition">
    <p className="text-2xl font-bold text-primary mb-1">{val}</p>
    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{label}</p>
    <p className="text-[10px] text-gray-400">{sub}</p>
  </div>
);

export default About;
