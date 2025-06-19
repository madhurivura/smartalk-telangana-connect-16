
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
    
    // Hero Section
    'hero.title': 'SmartTalk Telangana',
    'hero.subtitle': 'Making government services accessible to all.',
    'hero.description': 'Get help with documents, schemes, and services in your language.',
    'hero.getStarted': 'Get Started',
    
    // Advantages
    'advantages.title': 'Why Choose SmartTalk?',
    'advantages.subtitle': 'Designed specifically for the people of Telangana to bridge the gap between citizens and government services.',
    'advantages.easeOfAccess': 'Ease of Access',
    'advantages.easeOfAccessDesc': 'Access government services from anywhere, anytime. No need to visit offices or stand in long queues.',
    'advantages.multilingualSupport': 'Multilingual Support',
    'advantages.multilingualSupportDesc': 'Get help in Telugu and English. Speak or type in your preferred language for better understanding.',
    'advantages.personalizedGuidance': 'Personalized Guidance',
    'advantages.personalizedGuidanceDesc': 'Receive step-by-step guidance tailored to your specific needs and document requirements.',
    
    // Value Proposition
    'valueProposition.title': 'Bridging the Digital Divide',
    'valueProposition.subtitle': 'Empowering every citizen of Telangana with easy access to government services',
    
    // Features
    'features.title': 'Powerful Features',
    'features.subtitle': 'Everything you need to navigate government services with confidence',
    'features.teluguChatbot': 'Telugu Chatbot',
    'features.teluguChatbotDesc': 'Chat in Telugu or English for instant help',
    'features.tdocs': 'T-Docs',
    'features.tdocsDesc': 'Document recommender for your specific needs',
    'features.enagrik': 'e-Nagrik Cards',
    'features.enagrikDesc': 'Visual guides for government processes',
    'features.voiceInput': 'Voice Input',
    'features.voiceInputDesc': 'Speak your questions naturally in Telugu or English',
    'features.textToSpeech': 'Text-to-Speech',
    'features.textToSpeechDesc': 'Listen to responses in your preferred language',
    'features.pdfGenerator': 'PDF Generator',
    'features.pdfGeneratorDesc': 'Download forms and checklists instantly',
    'features.tryNow': 'Try Now',
    'features.backToFeatures': '← Back to Features',
    'features.integratedInChatbot': '✓ Integrated in chatbot and forms',
    'features.availableInChatbot': '✓ Available in chatbot responses',
    'features.integratedInTDocs': '✓ Integrated in T-Docs and e-Nagrik Cards',
    
    // Personalized Schemes
    'schemes.title': 'Find Your Eligible Schemes',
    'schemes.subtitle': 'Discover government schemes tailored for you based on your profile',
    'schemes.pensionSchemes': 'Pension Schemes',
    'schemes.pensionSchemesDesc': 'Old age, widow, and disability pensions for eligible citizens',
    'schemes.pensionBenefits': 'Monthly benefits up to ₹3,016',
    'schemes.educationSupport': 'Education Support',
    'schemes.educationSupportDesc': 'Scholarships and educational assistance for students',
    'schemes.educationBenefits': 'Various amounts based on category',
    'schemes.healthcareBenefits': 'Healthcare Benefits',
    'schemes.healthcareBenefitsDesc': 'Medical insurance and healthcare support schemes',
    'schemes.healthcareCoverage': 'Coverage up to ₹5 lakhs',
    'schemes.howItWorks': 'Use our smart assistant below to find schemes you\'re eligible for',
    'schemes.howItWorksTitle': 'How it works:',
    'schemes.step1': '1. Answer a few simple questions about yourself',
    'schemes.step2': '2. Our AI will analyze your eligibility',
    'schemes.step3': '3. Get a personalized list of schemes you can apply for',
    'schemes.step4': '4. Download detailed information and application process',
    
    // Chatbot Section
    'chatbot.title': 'Find Your Eligible Schemes',
    'chatbot.subtitle': 'Answer a few questions to discover government schemes you can apply for',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions or feedback? We\'d love to hear from you.',
    'contact.fullName': 'Full Name',
    'contact.enterName': 'Enter your full name',
    'contact.emailAddress': 'Email Address',
    'contact.enterEmail': 'Enter your email address',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us how we can help you...',
    'contact.sendMessage': 'Send Message',
    'contact.supportText': 'For technical support, reach out to our team',
    'contact.supportEmail': 'smarttalk.telangana@gov.in',
    
    // Footer
    'footer.description': 'Making government services accessible to all citizens of Telangana through smart technology and multilingual support.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.availableIn': 'Available in Telugu & English',
    'footer.copyright': '© 2024 SmartTalk Telangana. Built for Telangana Government Hackathon. All rights reserved.',
    
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
    
    // Hero Section
    'hero.title': 'స్మార్ట్‌టాక్ తెలంగాణ',
    'hero.subtitle': 'ప్రభుత్వ సేవలను అందరికీ అందుబాటులో ఉంచడం.',
    'hero.description': 'మీ భాషలో పత్రాలు, పథకాలు మరియు సేవలతో సహాయం పొందండి.',
    'hero.getStarted': 'ప్రారంభించండి',
    
    // Advantages
    'advantages.title': 'స్మార్ట్‌టాక్‌ను ఎందుకు ఎంచుకోవాలి?',
    'advantages.subtitle': 'పౌరులు మరియు ప్రభుత్వ సేవల మధ్య అంతరాన్ని తగ్గించడానికి తెలంగాణ ప్రజల కోసం ప్రత్యేకంగా రూపొందించబడింది.',
    'advantages.easeOfAccess': 'సులభ ప్రాప్యత',
    'advantages.easeOfAccessDesc': 'ఎక్కడి నుండైనా, ఎప్పుడైనా ప్రభుత్వ సేవలను పొందండి. కార్యాలయాలను సందర్శించాల్సిన అవసరం లేదు లేదా దీర్ఘ వరుసలలో నిలబడాల్సిన అవసరం లేదు.',
    'advantages.multilingualSupport': 'బహుభాషా మద్దతు',
    'advantages.multilingualSupportDesc': 'తెలుగు మరియు ఇంగ్లీషులో సహాయం పొందండి. మంచి అర్థం కోసం మీ ఇష్టమైన భాషలో మాట్లాడండి లేదా టైప్ చేయండి.',
    'advantages.personalizedGuidance': 'వ్యక్తిగత మార్గదర్శనం',
    'advantages.personalizedGuidanceDesc': 'మీ నిర్దిష్ట అవసరాలు మరియు పత్రాల అవసరాలకు అనుగుణంగా దశలవారీ మార్గదర్శనం పొందండి.',
    
    // Value Proposition
    'valueProposition.title': 'డిజిటల్ విభజనను తగ్గించడం',
    'valueProposition.subtitle': 'ప్రభుత్వ సేవలకు సులభ ప్రాప్యతతో తెలంగాణలోని ప్రతి పౌరుడిని శక్తివంతం చేయడం',
    
    // Features
    'features.title': 'శక్తివంతమైన విశేషాలు',
    'features.subtitle': 'ప్రభుత్వ సేవలను విశ్వాసంతో నావిగేట్ చేయడానికి మీకు అవసరమైన ప్రతిదీ',
    'features.teluguChatbot': 'తెలుగు చాట్‌బాట్',
    'features.teluguChatbotDesc': 'తక్షణ సహాయం కోసం తెలుగు లేదా ఇంగ్లీషులో చాట్ చేయండి',
    'features.tdocs': 'టి-డాక్స్',
    'features.tdocsDesc': 'మీ నిర్దిష్ట అవసరాల కోసం పత్రాల సిఫార్సుదారు',
    'features.enagrik': 'ఇ-నాగరిక్ కార్డులు',
    'features.enagrikDesc': 'ప్రభుత్వ ప్రక్రియల కోసం దృశ్య గైడులు',
    'features.voiceInput': 'వాయిస్ ఇన్‌పుట్',
    'features.voiceInputDesc': 'తెలుగు లేదా ఇంగ్లీషులో మీ ప్రశ్నలను సహజంగా మాట్లాడండి',
    'features.textToSpeech': 'టెక్స్ట్-టు-స్పీచ్',
    'features.textToSpeechDesc': 'మీ ఇష్టమైన భాషలో ప్రతిస్పందనలను వినండి',
    'features.pdfGenerator': 'PDF జెనరేటర్',
    'features.pdfGeneratorDesc': 'ఫారములు మరియు చెక్‌లిస్ట్‌లను తక్షణం డౌన్‌లోడ్ చేయండి',
    'features.tryNow': 'ఇప్పుడే ప్రయత్నించండి',
    'features.backToFeatures': '← విశేషాలకు తిరిగి',
    'features.integratedInChatbot': '✓ చాట్‌బాట్ మరియు ఫారములలో విలీనం చేయబడింది',
    'features.availableInChatbot': '✓ చాట్‌బాట్ ప్రతిస్పందనలలో అందుబాటులో ఉంది',
    'features.integratedInTDocs': '✓ టి-డాక్స్ మరియు ఇ-నాగరిక్ కార్డులలో విలీనం చేయబడింది',
    
    // Personalized Schemes
    'schemes.title': 'మీకు అర్హమైన పథకాలను కనుగొనండి',
    'schemes.subtitle': 'మీ ప్రొఫైల్ ఆధారంగా మీ కోసం రూపొందించిన ప్రభుత్వ పథకాలను కనుగొనండి',
    'schemes.pensionSchemes': 'పెన్షన్ పథకాలు',
    'schemes.pensionSchemesDesc': 'అర్హులైన పౌరుల కోసం వృద్ధాప్య, వితంతువు మరియు వైకల్య పెన్షన్లు',
    'schemes.pensionBenefits': 'నెలవారీ ప్రయోజనాలు ₹3,016 వరకు',
    'schemes.educationSupport': 'విద్యా మద్దతు',
    'schemes.educationSupportDesc': 'విద్యార్థుల కోసం స్కాలర్‌షిప్‌లు మరియు విద్యా సహాయం',
    'schemes.educationBenefits': 'వర్గం ఆధారంగా వివిధ మొత్తాలు',
    'schemes.healthcareBenefits': 'ఆరోగ్య ప్రయోజనాలు',
    'schemes.healthcareBenefitsDesc': 'వైద్య బీమా మరియు ఆరోగ్య మద్దతు పథకాలు',
    'schemes.healthcareCoverage': 'కవరేజీ ₹5 లక్షల వరకు',
    'schemes.howItWorks': 'మీకు అర్హత ఉన్న పథకాలను కనుగొనడానికి దిగువన ఉన్న మా స్మార్ట్ అసిస్టెంట్‌ను ఉపయోగించండి',
    'schemes.howItWorksTitle': 'ఇది ఎలా పనిచేస్తుంది:',
    'schemes.step1': '1. మీ గురించి కొన్ని సాధారణ ప్రశ్నలకు సమాధానం ఇవ్వండి',
    'schemes.step2': '2. మా AI మీ అర్హతను విశ్లేషిస్తుంది',
    'schemes.step3': '3. మీరు దరఖాస్తు చేసుకోగల పథకాల వ్యక్తిగత జాబితాను పొందండి',
    'schemes.step4': '4. వివరణాత్మక సమాచారం మరియు దరఖాస్తు ప్రక్రియను డౌన్‌లోడ్ చేయండి',
    
    // Chatbot Section
    'chatbot.title': 'మీకు అర్హమైన పథకాలను కనుగొనండి',
    'chatbot.subtitle': 'మీరు దరఖాస్తు చేసుకోగల ప్రభుత్వ పథకాలను కనుగొనడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి',
    
    // Contact
    'contact.title': 'సంప్రదించండి',
    'contact.subtitle': 'ప్రశ్నలు లేదా అభిప్రాయాలు ఉన్నాయా? మేము మీ నుండి వినాలని అనుకుంటున్నాము.',
    'contact.fullName': 'పూర్తి పేరు',
    'contact.enterName': 'మీ పూర్తి పేరును నమోదు చేయండి',
    'contact.emailAddress': 'ఇమెయిల్ చిరునామా',
    'contact.enterEmail': 'మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
    'contact.message': 'సందేశం',
    'contact.messagePlaceholder': 'మేము మీకు ఎలా సహాయం చేయగలమో మాకు చెప్పండి...',
    'contact.sendMessage': 'సందేశం పంపండి',
    'contact.supportText': 'సాంకేతిక మద్దతు కోసం, మా బృందాన్ని సంప్రదించండి',
    'contact.supportEmail': 'smarttalk.telangana@gov.in',
    
    // Footer
    'footer.description': 'స్మార్ట్ టెక్నాలజీ మరియు బహుభాషా మద్దతు ద్వారా తెలంగాణలోని అన్ని పౌరులకు ప్రభుత్వ సేవలను అందుబాటులో ఉంచడం.',
    'footer.quickLinks': 'త్వరిత లింకులు',
    'footer.contactInfo': 'సంప్రదింపు సమాచారం',
    'footer.availableIn': 'తెలుగు మరియు ఇంగ్లీష్‌లో అందుబాటులో ఉంది',
    'footer.copyright': '© 2024 స్మార్ట్‌టాక్ తెలంగాణ. తెలంగాణ ప్రభుత్వ హ్యాకథాన్ కోసం నిర్మించబడింది. అన్ని హక్కులు రక్షించబడ్డాయి.',
    
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
