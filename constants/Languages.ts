export const SUPPORTED_LANGUAGES = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false,
  },
  te: {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    rtl: false,
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    rtl: false,
  },
  kn: {
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    rtl: false,
  },
  ml: {
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    rtl: false,
  },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Prayer categories in different languages
export const PRAYER_CATEGORIES = {
  en: [
    'Spiritual Growth',
    'Financial Breakthrough', 
    'Job Opportunities',
    'Marriage & Relationships',
    'Health & Healing',
    'Family & Children',
    'Other',
  ],
  hi: [
    'आध्यात्मिक विकास',
    'वित्तीय सफलता',
    'नौकरी के अवसर',
    'विवाह और रिश्ते',
    'स्वास्थ्य और उपचार',
    'परिवार और बच्चे',
    'अन्य',
  ],
  te: [
    'ఆధ్యాత్మిక వృద్ధి',
    'ఆర్థిక పురోగతి',
    'ఉద్యోగ అవకాశాలు',
    'వివాహం మరియు సంబంధాలు',
    'ఆరోగ్యం మరియు వైద్యం',
    'కుటుంబం మరియు పిల్లలు',
    'ఇతర',
  ],
  ta: [
    'ஆன்மீக வளர்ச்சி',
    'நிதி முன்னேற்றம்',
    'வேலை வாய்ப்புகள்',
    'திருமணம் மற்றும் உறவுகள்',
    'உடல்நலம் மற்றும் குணப்படுத்துதல்',
    'குடும்பம் மற்றும் குழந்தைகள்',
    'மற்றவை',
  ],
  kn: [
    'ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ',
    'ಆರ್ಥಿಕ ಪ್ರಗತಿ',
    'ಉದ್ಯೋಗ ಅವಕಾಶಗಳು',
    'ಮದುವೆ ಮತ್ತು ಸಂಬಂಧಗಳು',
    'ಆರೋಗ್ಯ ಮತ್ತು ಚಿಕಿತ್ಸೆ',
    'ಕುಟುಂಬ ಮತ್ತು ಮಕ್ಕಳು',
    'ಇತರೆ',
  ],
  ml: [
    'ആത്മീയ വളർച്ച',
    'സാമ്പത്തിക പുരോഗതി',
    'ജോലി അവസരങ്ങൾ',
    'വിവാഹവും ബന്ധങ്ങളും',
    'ആരോഗ്യവും രോഗശാന്തിയും',
    'കുടുംബവും കുട്ടികളും',
    'മറ്റുള്ളവ',
  ],
};