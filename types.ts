
export type Language = 'en' | 'ta';

export interface NavTranslations {
  home: string;
  about: string;
  location: string;
  events: string;
  gallery: string;
  pidiarisi: string;
  donate: string;
}

export interface HeroTranslations {
  chant1: string;
  chant2: string;
  chant3: string;
  title: string;
  sannadhi: string;
  description: string;
  planVisit: string;
  nextPooja: string;
  darshanTiming: string;
  allDays: string;
}

export interface PidiArisiTranslations {
  badge: string;
  title: string;
  subtitle: string;
  verse: string;
  verseEn: string;
  howTitle: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  step4: string;
  step4Desc: string;
  blessing: string;
  periyavaWords: string;
  periyavaWordsEn: string;
  cta: string;
}

export interface TranslationSchema {
  nav: NavTranslations;
  hero: HeroTranslations;
  pidiArisi: PidiArisiTranslations;
  about: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    templesTitle: string;
    templeList: string[];
    getDirections: string;
  };
  events: {
    badge: string;
    title: string;
    upcoming: string;
    past: string;
    noEvents: string;
    checkBack: string;
    completed: string;
    viewDetails: string;
  };
}
