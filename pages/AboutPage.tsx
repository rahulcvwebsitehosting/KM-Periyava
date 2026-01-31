
import React from 'react';
import About from '../components/About';

const AboutPage: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <About t={t} />
    </div>
  );
};

export default AboutPage;
