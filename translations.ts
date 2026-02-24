
import { TranslationSchema } from './types';

export const translations: Record<'en' | 'ta', TranslationSchema> = {
  ta: {
    nav: {
      home: 'முகப்பு',
      about: 'கோவில் பற்றி',
      location: 'இடம்',
      events: 'நிகழ்வுகள்',
      gallery: 'புகைப்படங்கள்',
      pidiarisi: 'பிடி அரிசி',
      donate: 'நன்கொடை'
    },
    hero: {
      chant1: 'ஸ்ரீ குருவே சரணம்',
      chant2: 'ஹர ஹர சங்கர ஜெய ஜெய சங்கர',
      chant3: 'Hara Hara Shankara Jaya Jaya Shankara',
      title: 'ஸ்ரீ காஞ்சி மஹாபெரியவா',
      sannadhi: 'சந்நிதி',
      description: '<strong>கந்தமங்கலத்தில்</strong> உள்ள ஜகத்குரு காஞ்சி <strong>ஸ்ரீ மஹாபெரியவா</strong> புனிதமான சந்நிதிக்கு உங்களை அன்புடன் வரவேற்கிறோம்.',
      planVisit: '📍 வருகைக்கு திட்டமிடுங்கள்',
      nextPooja: 'அடுத்த பூஜை',
      darshanTiming: 'தரிசன நேரம்',
      allDays: 'அனைத்து நாட்களும்'
    },
    pidiArisi: {
      badge: 'புனித முயற்சி',
      title: 'பிடி அரிசி திட்டம்',
      subtitle: 'Pidi Arisi Thittam (Handful of Rice Scheme)',
      verse: 'தானங்களில் மிகச்சிறந்தது <strong>அன்னதானம்</strong> என்று நம் வேதம், சாஸ்திரங்களும், புராணங்களும், ஸ்ம்ருதிகளும் கூறுகின்றன.',
      verseEn: 'Among all donations, <strong>Annadhanam</strong> (food donation) is considered the greatest, as stated in our Vedas and Shastras.',
      howTitle: '🌾 பங்கேற்பது எப்படி?',
      step1: 'தினசரி சமையல்',
      step1Desc: 'தினமும் சமையல் தொடங்கும் முன் ஒரு <strong>பிடி அரிசியையும்</strong> ஒரு நாணயத்தையும் ஒதுக்கி வைக்கவும்.',
      step2: 'வாராந்திர சேகரிப்பு',
      step2Desc: 'வாரத்திற்கு ஒருமுறை தன்னார்வலர்கள் வீடுகளுக்கு வந்து அரிசியையும் பணத்தையும் சேகரிப்பார்கள்.',
      step3: 'அன்னதானம்',
      step3Desc: 'சேகரிக்கப்பட்ட அரிசி சமைக்கப்பட்டு, பகவானுக்கு படைக்கப்பட்டு, ஏழைகளுக்கு <strong>அன்னதானமாக</strong> வழங்கப்படும்.',
      step4: 'பராமரிப்பு கட்டணம்',
      step4Desc: 'இந்த திட்டத்தை தொடர்ந்து நடத்த ஒவ்வொரு கரண்டிக்கும் சிறிய கட்டணம் வசூலிக்கப்படும்.',
      blessing: '25 ஆண்டுகளுக்கு முன் ஜகத்குருவால் ஆசீர்வதிக்கப்பட்டது',
      periyavaWords: '"மக்கள் எல்லோருமே குறிப்பாக ஏழைகள் வருந்தாமல் வாழ வேண்டும் என்ற பெரும் நோக்குடன் கருணை உள்ளம் கொண்டு... ஜகத்குரு காஞ்சீ <strong>ஸ்ரீபரமாசார்யாள்</strong> இதை அநுக்ரஹித்தார்கள்."',
      periyavaWordsEn: '"Jagadguru Kanchi Sri Paramacharyal blessed this scheme 25 years ago for the welfare of the poor."',
      cta: '🙏 பிடி அரிசி திட்டத்தில் பங்களிக்க'
    },
    about: {
      badge: 'எங்களைப் பற்றி',
      title: 'கந்தமங்கலம் சந்நிதி',
      p1: '<strong>கந்தமங்கலம்</strong> என்பது தமிழ்நாட்டின் நாகப்பட்டினம் மாவட்டத்தில் குத்தாலம் தாலுகாவில் கோமலுக்கு அருகில் அமைந்துள்ள ஒரு கிராமம்.',
      p2: 'இது மயிலாடுதுறையிலிருந்து சுமார் 15 கிமீ தொலைவில் கல்யாண காவேரி என்று அழைக்கப்படும் வீரசோழன் ஆற்றின் கரையில் அமைந்துள்ளது.',
      p3: 'திருவாரூர், சீர்காழி, தேரெழுந்தூர் மற்றும் வைத்தீஸ்வரன் கோவில் ஆகியவை அருகில் உள்ள இடங்களாகும்.',
      templesTitle: '🛕 <strong>கந்தமங்கலத்தில்</strong> உள்ள கோவில்கள்',
      templeList: [
        'பிரசன்ன மஹா கணபதி கோவில்',
        'ஸ்கந்த ஐயனார் கோவில்',
        'சிவன் கோவில்'
      ],
      getDirections: '📍 வழிமுறைகளைப் பெறுக'
    },
    events: {
      badge: 'புனித காலண்டர்',
      title: 'நிகழ்வுகள் & <strong>அனுஷ பூஜை</strong>',
      upcoming: 'வரவிருக்கும் நிகழ்வுகள்',
      past: 'கடந்த நிகழ்வுகள்',
      noEvents: 'தற்போது வரவிருக்கும் நிகழ்வுகள் எதுவுமில்லை',
      checkBack: 'விரைவில் மீண்டும் பார்க்கவும்',
      completed: 'முடிந்தது',
      viewDetails: 'விவரங்களைக் காண்க'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      location: 'Location',
      events: 'Events',
      gallery: 'Gallery',
      pidiarisi: 'Pidi Arisi',
      donate: 'Donate'
    },
    hero: {
      chant1: 'Sri Guruve Saranam',
      chant2: 'Hara Hara Shankara Jaya Jaya Shankara',
      chant3: 'Hara Hara Shankara Jaya Jaya Shankara',
      title: 'Sri Kanchi Mahaperiyava',
      sannadhi: 'Sannadhi',
      description: 'Welcome to the sacred abode of <strong>Sri Kanchi Mahaperiyava</strong> in <strong>Kandhamangalam</strong>, where devotion meets divine grace.',
      planVisit: '📍 Plan Your Visit',
      nextPooja: 'Next Pooja',
      darshanTiming: 'Darshan Timing',
      allDays: 'All Days'
    },
    pidiArisi: {
      badge: 'Sacred Initiative',
      title: 'Pidi Arisi Thittam',
      subtitle: 'Handful of Rice Scheme',
      verse: 'தானங்களில் மிகச்சிறந்தது அன்னதானம் என்று நம் வேதம், சாஸ்திரங்களும், புராணங்களும், ஸ்ம்ருதிகளும் கூறுகின்றன.',
      verseEn: 'Among all donations, <strong>Annadhanam</strong> (food donation) is considered the greatest, as stated in our Vedas, Shastras, Puranas, and Smrithis.',
      howTitle: '🌾 How to Participate',
      step1: 'Daily Preparation',
      step1Desc: 'Every day when you start cooking, set aside one handful of rice and one naya paise in a dedicated vessel.',
      step2: 'Weekly Collection',
      step2Desc: 'Once a week, social workers collect the accumulated rice and money from every household in the village.',
      step3: 'Offering & Distribution',
      step3Desc: 'The collected rice is cooked, offered to Bhagavan at a nearby temple, and then distributed as <strong>Annadhanam</strong> to the poor.',
      step4: 'Sustainability',
      step4Desc: 'For every ladle served, ten paise is charged to support the scheme sustainably.',
      blessing: 'Blessed by Jagadguru 25 years ago',
      periyavaWords: '"மக்கள் எல்லோருமே குறிப்பாக ஏழைகள் வருந்தாமல் வாழ வேண்டும் என்ற பெரும் நோக்குடன்..."',
      periyavaWordsEn: '"Jagadguru Kanchi <strong>Sri Kanchi Mahaperiyava</strong> blessed this Pidi Arisi Thittam 25 years ago so that all people, especially the poor, may live without suffering."',
      cta: '🙏 Contribute to Pidi Arisi Thittam'
    },
    about: {
      badge: 'About Us',
      title: 'Kandhamangalam Sannadhi',
      p1: '<strong>Kandhamangalam</strong> is a village near Komal in Kuttalam Taluk in Nagapattinam District of Tamil Nadu State, India.',
      p2: 'It is about 15 km from Mayiladuthurai and is located on the banks of Veeracholan river, also known as Kalyana Cauvery.',
      p3: 'Nearby places include Thiruvarur, Sirkazhi, Therizhandur (birthplace of Tamil poet Kambar), and Vaitheeswaran Koil.',
      templesTitle: '🛕 Temples in <strong>Kandhamangalam</strong>',
      templeList: [
        'Prasanna Maha Ganapathi Temple',
        'Skandha Ayyanar Temple',
        'Shiva Temple'
      ],
      getDirections: '📍 Get Directions'
    },
    events: {
      badge: 'Sacred Calendar',
      title: 'Events & <strong>Anusham Pooja</strong>',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noEvents: 'No upcoming events at the moment',
      checkBack: 'Check back soon for pooja schedules',
      completed: 'Completed',
      viewDetails: 'View Details'
    }
  }
};
