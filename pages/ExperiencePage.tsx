
import React from 'react';
import DevoteeExperience from '../components/DevoteeExperience';
import { Language } from '../types';

const ExperiencePage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <DevoteeExperience lang={lang} />
    </div>
  );
};

export default ExperiencePage;
