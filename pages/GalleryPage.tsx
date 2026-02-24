
import React from 'react';
import Gallery from '../components/Gallery';
import { Language } from '../types';

const GalleryPage: React.FC<{ lang: Language; navigate: (path: string) => void }> = ({ lang, navigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <Gallery lang={lang} navigate={navigate} fullMode={true} />
    </div>
  );
};

export default GalleryPage;
