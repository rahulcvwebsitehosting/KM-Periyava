
import React from 'react';
import Gallery from '../components/Gallery';
import { Language } from '../types';

const GalleryPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Gallery lang={lang} />
    </div>
  );
};

export default GalleryPage;
