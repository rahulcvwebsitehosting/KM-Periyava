
import React from 'react';
import Contact from '../components/Contact';
import { Language } from '../types';

const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Contact lang={lang} />
    </div>
  );
};

export default ContactPage;
