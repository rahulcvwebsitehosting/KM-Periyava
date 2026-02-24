
import React from 'react';
import { Language } from '../types';
import About from '../components/About';

const AboutPage: React.FC<{ t: any, lang: Language }> = ({ t, lang }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <About t={t} lang={lang} />
    </div>
  );
};

export default AboutPage;
