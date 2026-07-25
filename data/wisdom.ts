
export type WisdomCategory = 'Bhakti' | 'Dharma' | 'Family Life' | 'Culture';

export interface WisdomQuote {
  ta: string;
  en: string;
  category: WisdomCategory;
  source?: string;
}

export const wisdomQuotes: WisdomQuote[] = [
  {
    ta: "தெய்வம் நமக்காக எதையும் செய்யும்; நாம் தெய்வத்திற்காக எதைச் செய்கிறோம் என்பதே முக்கியம்.",
    en: "God will do anything for us; what matters is what we do for God.",
    category: "Bhakti"
  },
  {
    ta: "அன்பு ஒன்றே உலகத்தை ஆளும் சக்தி. மற்றவர்களிடம் அன்பு காட்டுவதே உண்மையான வழிபாடு.",
    en: "Love is the only power that can rule the world. Showing love to others is the truest form of worship.",
    category: "Bhakti"
  },
  {
    ta: "எளிமையும், பணிவுமே ஒரு மனிதனை தெய்வத்திற்கு நெருக்கமாக்கும்.",
    en: "Simplicity and humility are what bring a human closest to the Divine.",
    category: "Dharma"
  },
  {
    ta: "கடமையைச் செய், பலனை எதிர்பார்க்காதே என்பது கீதையின் வாக்கு மட்டுமல்ல, அதுவே வாழ்வின் ரகசியம்.",
    en: "Do your duty without expecting the fruit; this is not just the word of the Gita, it is the secret of life.",
    category: "Dharma"
  },
  {
    ta: "மனத் தூய்மையே சிறந்த ஆலயம். சுத்தமான உள்ளமே கடவுள் தங்கும் இடம்.",
    en: "A pure mind is the best temple. A clean heart is where God resides.",
    category: "Bhakti"
  },
  {
    ta: "உண்மை ஒன்றே எல்லா தர்மங்களுக்கும் ஆதாரம். சத்தியத்தைக் கடைப்பிடிப்பதே மேலான தவம்.",
    en: "Truth alone is the source of all dharmas. Adhering to truth is the highest penance.",
    category: "Dharma"
  },
  {
    ta: "பகவானிடம் சரணடைவதே எல்லாத் துன்பங்களுக்கும் மருந்து. அவன் பாதங்களில் பாரத்தைச் சமர்ப்பிப்பதே அமைதிக்கு வழி.",
    en: "Surrendering to Bhagavan is the medicine for all sorrows. Submitting our burdens at His feet is the path to peace.",
    category: "Bhakti"
  },
  {
    ta: "பொறுமையே ஒரு மனிதனை பெரியவனாக்கும். அடக்கம் அமரருள் உய்க்கும்.",
    en: "Patience makes a human great. Humility leads one to the divine realm.",
    category: "Dharma"
  },
  {
    ta: "மற்றவர்களுக்குச் செய்யும் சேவையே இறைவனுக்குச் செய்யும் உண்மையான பூஜை.",
    en: "Service to others is the true worship performed for the Almighty.",
    category: "Dharma"
  },
  {
    ta: "வாழ்க்கையின் நோக்கம் இறைவனோடு இரண்டறக் கலப்பதே. பக்தி ஒன்றே அதற்கு எளிய வழி.",
    en: "The purpose of life is to merge with the Divine. Devotion is the simplest path to reach it.",
    category: "Bhakti"
  },
  {
    ta: "குடும்பத்தில் அமைதி நிலவ வேண்டுமானால், ஒருவருக்கொருவர் விட்டுக்கொடுத்து வாழ வேண்டும். சகிப்புத்தன்மையே குடும்பத்தின் அஸ்திவாரம்.",
    en: "For peace to prevail in a family, one must live by giving in to each other. Tolerance is the foundation of a family.",
    category: "Family Life"
  },
  {
    ta: "பெற்றோர்களை மதிப்பதும், அவர்களுக்குப் பணிவிடை செய்வதும் ஒரு மனிதனின் முதல் கடமை. அதுவே எல்லா புண்ணியங்களையும் தரும்.",
    en: "Respecting parents and serving them is a person's first duty. That alone will bring all merits.",
    category: "Family Life"
  },
  {
    ta: "நமது கலாச்சாரம் மற்றும் பாரம்பரியத்தைப் பாதுகாப்பது நமது கடமை. அதுவே நமது அடையாளத்தையும் பெருமையையும் நிலைநாட்டும்.",
    en: "It is our duty to protect our culture and tradition. That alone will establish our identity and pride.",
    category: "Culture"
  },
  {
    ta: "கோவில்கள் வெறும் கட்டிடங்கள் அல்ல; அவை ஆன்மீக சக்தியின் மையங்கள். அங்கு செல்வது மனதிற்கு அமைதியையும் பலத்தையும் தரும்.",
    en: "Temples are not just buildings; they are centers of spiritual energy. Going there brings peace and strength to the mind.",
    category: "Culture"
  },
  {
    ta: "குழந்தைகளுக்கு நல்லொழுக்கங்களைக் கற்பிப்பதே அவர்களுக்கு நாம் செய்யும் மிகப்பெரிய சொத்து.",
    en: "Teaching virtues to children is the greatest asset we can provide for them.",
    category: "Family Life"
  },
  {
    ta: "பண்டிகைகள் வெறும் கொண்டாட்டங்கள் அல்ல; அவை உறவுகளைப் பலப்படுத்தும் மற்றும் ஆன்மீகத்தை வளர்க்கும் வாய்ப்புகள்.",
    en: "Festivals are not just celebrations; they are opportunities to strengthen relationships and nurture spirituality.",
    category: "Culture"
  }
];
