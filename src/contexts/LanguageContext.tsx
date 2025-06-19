
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'telugu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  english: {
    // Navigation
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.chatbot': 'Chatbot',
    'nav.contact': 'Contact',
    
    // T-Docs
    'tdocs.title': 'T-Docs: Document Finder',
    'tdocs.subtitle': 'Answer a few questions to get personalized document recommendations',
    'tdocs.purpose': 'What do you need the document for?',
    'tdocs.category': 'Which category do you belong to?',
    'tdocs.ageGroup': 'What is your age group?',
    'tdocs.income': 'What is your monthly income?',
    'tdocs.employment': 'Employment/Job',
    'tdocs.education': 'Education/College',
    'tdocs.marriage': 'Marriage Registration',
    'tdocs.property': 'Property/Land',
    'tdocs.benefits': 'Government Benefits',
    'tdocs.general': 'General',
    'tdocs.obc': 'OBC',
    'tdocs.sc': 'SC',
    'tdocs.st': 'ST',
    'tdocs.below18': 'Below 18',
    'tdocs.18-35': '18-35 years',
    'tdocs.35-60': '35-60 years',
    'tdocs.above60': 'Above 60 years',
    'tdocs.below10k': 'Below ₹10,000',
    'tdocs.10k-50k': '₹10,000 - ₹50,000',
    'tdocs.above50k': 'Above ₹50,000',
    'tdocs.recommended': 'Recommended Documents',
    'tdocs.based': 'Based on your requirements, here are the documents you may need:',
    'tdocs.required': 'Required Documents:',
    'tdocs.process': 'Process:',
    'tdocs.office': 'Office:',
    'tdocs.time': 'Time:',
    'tdocs.download': 'Download Checklist',
    'tdocs.startOver': 'Start Over',
    
    // e-Nagrik Cards
    'enagrik.title': 'e-Nagrik Cards',
    'enagrik.subtitle': 'Visual guides for government processes',
    'enagrik.viewSteps': 'View Steps',
    'enagrik.downloadGuide': 'Download Guide',
    
    // Common
    'common.next': 'Next',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.days': 'days',
  },
  telugu: {
    // Navigation
    'nav.about': 'గురించి',
    'nav.features': 'విశేషాలు',
    'nav.chatbot': 'చాట్‌బాట్',
    'nav.contact': 'సంప్రదింపులు',
    
    // T-Docs
    'tdocs.title': 'టి-డాక్స్: పత్రాల వెతుకుడు',
    'tdocs.subtitle': 'వ్యక్తిగత పత్రాల సిఫార్సుల కోసం కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి',
    'tdocs.purpose': 'మీకు పత్రం ఎందుకు అవసరం?',
    'tdocs.category': 'మీరు ఏ వర్గానికి చెందినవారు?',
    'tdocs.ageGroup': 'మీ వయస్సు గ్రూప్ ఏది?',
    'tdocs.income': 'మీ నెలవారీ ఆదాయం ఎంత?',
    'tdocs.employment': 'ఉద్యోగం/ఉద్యోగ అవకాశం',
    'tdocs.education': 'విద్య/కళాశాల',
    'tdocs.marriage': 'వివాహ నమోదు',
    'tdocs.property': 'ఆస్తి/భూమి',
    'tdocs.benefits': 'ప్రభుత్వ ప్రయోజనాలు',
    'tdocs.general': 'సాధారణ',
    'tdocs.obc': 'వెనుకబడిన వర్గాలు',
    'tdocs.sc': 'ఎస్‌సి',
    'tdocs.st': 'ఎస్‌టి',
    'tdocs.below18': '18 కంటే తక్కువ',
    'tdocs.18-35': '18-35 సంవత్సరాలు',
    'tdocs.35-60': '35-60 సంవత్సరాలు',
    'tdocs.above60': '60 కంటే ఎక్కువ',
    'tdocs.below10k': '₹10,000 కంటే తక్కువ',
    'tdocs.10k-50k': '₹10,000 - ₹50,000',
    'tdocs.above50k': '₹50,000 కంటే ఎక్కువ',
    'tdocs.recommended': 'సిఫార్సు చేయబడిన పత్రాలు',
    'tdocs.based': 'మీ అవసరాల ఆధారంగా, మీకు అవసరమైన పత్రాలు ఇవి:',
    'tdocs.required': 'అవసరమైన పత్రాలు:',
    'tdocs.process': 'ప్రక్రియ:',
    'tdocs.office': 'కార్యాలయం:',
    'tdocs.time': 'సమయం:',
    'tdocs.download': 'చెక్‌లిస్ట్ డౌన్‌లోడ్',
    'tdocs.startOver': 'మళ్లీ ప్రారంభించండి',
    
    // e-Nagrik Cards
    'enagrik.title': 'ఇ-నాగరిక్ కార్డులు',
    'enagrik.subtitle': 'ప్రభుత్వ ప్రక్రియల కోసం దృశ్య గైడులు',
    'enagrik.viewSteps': 'దశలు చూడండి',
    'enagrik.downloadGuide': 'గైడ్ డౌన్‌లోడ్',
    
    // Common
    'common.next': 'తదుపరి',
    'common.back': 'వెనుకకు',
    'common.submit': 'సమర్పించు',
    'common.close': 'మూసివేయు',
    'common.days': 'రోజులు',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
