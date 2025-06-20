import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'telugu' | 'hindi';

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
    'features.meesevaLocator': 'Meeseva Center Locator',
    'features.meesevaLocatorDesc': 'Find nearby Meeseva centers using your location',
    'features.locationServices': 'Location Services',
    'features.locationServicesDesc': 'GPS-enabled services to help you find nearby government offices',
    'features.integratedInMeeseva': '✓ Integrated in Meeseva center locator',
    
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
    
    // Enhanced Scheme Questionnaire
    'schemes.questionnaire.title': 'Detailed Scheme Assessment',
    'schemes.questionnaire.subtitle': 'Answer detailed questions to get the most accurate recommendations',
    'schemes.questionnaire.personalInfo': 'Personal Information',
    'schemes.questionnaire.economicInfo': 'Economic Information',
    'schemes.questionnaire.familyInfo': 'Family Information',
    'schemes.questionnaire.educationInfo': 'Education Information',
    'schemes.questionnaire.healthInfo': 'Health Information',
    'schemes.questionnaire.housingInfo': 'Housing Information',
    'schemes.questionnaire.maritalStatus': 'Marital Status',
    'schemes.questionnaire.single': 'Single',
    'schemes.questionnaire.married': 'Married',
    'schemes.questionnaire.widow': 'Widow/Widower',
    'schemes.questionnaire.separated': 'Separated',
    'schemes.questionnaire.disability': 'Do you have any disability?',
    'schemes.questionnaire.yes': 'Yes',
    'schemes.questionnaire.no': 'No',
    'schemes.questionnaire.familySize': 'Family Size',
    'schemes.questionnaire.education': 'Education Level',
    'schemes.questionnaire.illiterate': 'Illiterate',
    'schemes.questionnaire.primary': 'Primary',
    'schemes.questionnaire.secondary': 'Secondary',
    'schemes.questionnaire.graduation': 'Graduation',
    'schemes.questionnaire.postGraduation': 'Post Graduation',
    'schemes.questionnaire.housingType': 'Housing Type',
    'schemes.questionnaire.owned': 'Owned',
    'schemes.questionnaire.rented': 'Rented',
    'schemes.questionnaire.homeless': 'Homeless',
    'schemes.questionnaire.landOwnership': 'Do you own agricultural land?',
    'schemes.questionnaire.chronicIllness': 'Any chronic illness in family?',
    'schemes.questionnaire.previous': 'Previous',
    'schemes.questionnaire.continue': 'Continue',
    'schemes.questionnaire.getRecommendations': 'Get Recommendations',
    
    // Audio/Visual Support
    'audio.speakInTelugu': 'Speak in Telugu',
    'audio.speakInHindi': 'Speak in Hindi',
    'audio.speakInEnglish': 'Speak in English',
    'audio.listenInTelugu': 'Listen in Telugu',
    'audio.listenInHindi': 'Listen in Hindi',
    'audio.listenInEnglish': 'Listen in English',
    
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
    'footer.availableIn': 'Available in Telugu, Hindi & English',
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
    
    // Government Portals
    'portals.title': 'Essential Government Portals',
    'portals.subtitle': 'Key Telangana government services and platforms',
    'portals.visitSite': 'Visit Site',
    'portals.bhuvan': 'Bhuvan NRSC',
    'portals.bhuvanDesc': 'Satellite mapping and land services',
    'portals.telanganaPortal': 'Telangana State Portal',
    'portals.telanganaPortalDesc': 'Official government announcements and services',
    'portals.epass': 'Telangana ePASS',
    'portals.epassDesc': 'Scholarship services for students',
    'portals.prajavani': 'PrajaVani',
    'portals.prajavaniDesc': 'Public grievance redressal system',
    'portals.ipass': 'iPASS',
    'portals.ipassDesc': 'Industrial promotion and approvals',
    'portals.meeseva': 'Meeseva Portal',
    'portals.meesevaDesc': 'All-in-one e-Governance services',
    
    // Meeseva Center Locator
    'meeseva.title': 'Find Nearby Meeseva Centers',
    'meeseva.subtitle': 'Locate the nearest Meeseva centers for in-person government services',
    'meeseva.findNearby': 'Find Nearby Centers',
    'meeseva.locating': 'Getting Your Location...',
    'meeseva.searching': 'Searching for nearby centers...',
    'meeseva.nearbycenters': 'Nearby Centers',
    'meeseva.directions': 'Get Directions',
    'meeseva.tryAgain': 'Try Again',
    'meeseva.locationDenied': 'We need your location to show nearby Meeseva centers. Please enable location access in your browser.',
    'meeseva.noGeolocation': 'Your browser does not support location services.',
    'meeseva.fetchError': 'Unable to fetch nearby centers. Please try again later.',
    'meeseva.noCenters': 'No Meeseva centers found near your area right now.',
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
    'features.meesevaLocator': 'మీసేవ కేంద్రాల గుర్తింపు',
    'features.meesevaLocatorDesc': 'మీ స్థానాన్ని ఉపయోగించి సమీపంలోని మీసేవ కేంద్రాలను కనుగొనండి',
    'features.locationServices': 'లొకేషన్ సేవలు',
    'features.locationServicesDesc': 'సమీపంలోని ప్రభుత్వ కార్యాలయాలను కనుగొనడంలో మీకు సహాయపడే GPS-ఆధారిత సేవలు',
    'features.integratedInMeeseva': '✓ మీసేవ కేంద్ర లొకేటర్‌లో విలీనం చేయబడింది',
    
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
    
    // Enhanced Scheme Questionnaire
    'schemes.questionnaire.title': 'వివరణాత్మక పథక మూల్యాంకనం',
    'schemes.questionnaire.subtitle': 'అత్యంత ఖచ్చితమైన సిఫార్సుల కోసం వివరణాత్మక ప్రశ్నలకు సమాధానం ఇవ్వండి',
    'schemes.questionnaire.personalInfo': 'వ్యక్తిగత సమాచారం',
    'schemes.questionnaire.economicInfo': 'ఆర్థిక సమాచారం',
    'schemes.questionnaire.familyInfo': 'కుటుంబ సమాచారం',
    'schemes.questionnaire.educationInfo': 'విద్యా సమాచారం',
    'schemes.questionnaire.healthInfo': 'ఆరోగ్య సమాచారం',
    'schemes.questionnaire.housingInfo': 'గృహ సమాచారం',
    'schemes.questionnaire.maritalStatus': 'వైవాహిక స్థితి',
    'schemes.questionnaire.single': 'ఒంటరి',
    'schemes.questionnaire.married': 'వివాహిత',
    'schemes.questionnaire.widow': 'వితంతువు/వితంతువుడు',
    'schemes.questionnaire.separated': 'విడిపోయిన',
    'schemes.questionnaire.disability': 'మీకు ఏదైనా వైకల్యం ఉందా?',
    'schemes.questionnaire.yes': 'అవును',
    'schemes.questionnaire.no': 'లేదు',
    'schemes.questionnaire.familySize': 'కుటుంబ పరిమాణం',
    'schemes.questionnaire.education': 'విద్యా స్థాయి',
    'schemes.questionnaire.illiterate': 'నిరక్షరాస్యుడు',
    'schemes.questionnaire.primary': 'ప్రాథమిక',
    'schemes.questionnaire.secondary': 'మాధ్యమిక',
    'schemes.questionnaire.graduation': 'గ్రాడ్యుయేషన్',
    'schemes.questionnaire.postGraduation': 'పోస్ట్ గ్రాడ్యుయేషన్',
    'schemes.questionnaire.housingType': 'గృహ రకం',
    'schemes.questionnaire.owned': 'స్వంతం',
    'schemes.questionnaire.rented': 'అద్దె',
    'schemes.questionnaire.homeless': 'నిరాశ్రయులు',
    'schemes.questionnaire.landOwnership': 'మీకు వ్యవసాయ భూమి ఉందా?',
    'schemes.questionnaire.chronicIllness': 'కుటుంబంలో ఏదైనా దీర్ఘకాలిక అనారోగ్యం ఉందా?',
    'schemes.questionnaire.previous': 'మునుపటి',
    'schemes.questionnaire.continue': 'కొనసాగించు',
    'schemes.questionnaire.getRecommendations': 'సిఫార్సులు పొందండి',
    
    // Audio/Visual Support
    'audio.speakInTelugu': 'తెలుగులో మాట్లాడండి',
    'audio.speakInHindi': 'హిందీలో మాట్లాడండి',
    'audio.speakInEnglish': 'ఇంగ్లీష్‌లో మాట్లాడండి',
    'audio.listenInTelugu': 'తెలుగులో వినండి',
    'audio.listenInHindi': 'హిందీలో వినండి',
    'audio.listenInEnglish': 'ఇంగ్లీష్‌లో వినండి',
    
    // Footer
    'footer.availableIn': 'తెలుగు, హిందీ మరియు ఇంగ్లీష్‌లో అందుబాటులో ఉంది',
    
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
    
    // Government Portals
    'portals.title': 'ప్రధాన ప్రభుత్వ పోర్టల్స్',
    'portals.subtitle': 'ప్రధాన తెలంగాణ ప్రభుత్వ సేవలు మరియు ప్లాట్‌ఫారములకు ప్రత్యక్ష ప్రాప్యత',
    'portals.visitSite': 'సైట్‌ను సందర్శించండి',
    'portals.bhuvan': 'భువన్ NRSC',
    'portals.bhuvanDesc': 'ఉపగ్రహ మ్యాపింగ్ మరియు భూమి సేవలు',
    'portals.telanganaPortal': 'తెలంగాణ రాష్ట్ర్ పోర్టల్',
    'portals.telanganaPortalDesc': 'అధికారిక ప్రభుత్వ ప్రకటనలు మరియు సేవలు',
    'portals.epass': 'తెలంగాణ ePASS',
    'portals.epassDesc': 'విద్యార్థుల కోసం స్కాలర్‌షిప్ సేవలు',
    'portals.prajavani': 'ప్రజావాణి',
    'portals.prajavaniDesc': 'ప్రజా ఫిర్యాదుల పరిష్కార వ్యవస్థ',
    'portals.ipass': 'iPASS',
    'portals.ipassDesc': 'పరిశ్రమల ప్రోత్సాహం మరియు అనుమతులు',
    'portals.meeseva': 'మీసేవ పోర్టల్',
    'portals.meesevaDesc': 'అన్ని-ఒకే-చోట ఇ-గవర్నెన్స్ సేవలు',
    
    // Meeseva Center Locator
    'meeseva.title': 'సమీపంలోని మీసేవ కేంద్రాలను కనుగొనండి',
    'meeseva.subtitle': 'వ్యక్తిగతంగా ప్రభుత్వ సేవల కోసం సమీప మీసేవ కేంద్రాలను గుర్తించండి',
    'meeseva.findNearby': 'సమీప కేంద్రాలను కనుగొనండి',
    'meeseva.locating': 'మీ స్థానాన్ని పొందుతోంది...',
    'meeseva.searching': 'సమీప కేంద్రాల కోసం వెతుకుతోంది...',
    'meeseva.nearbycenters': 'సమీప కేంద్రాలు',
    'meeseva.directions': 'దిశలను పొందండి',
    'meeseva.tryAgain': 'మళ్లీ ప్రయత్నించండి',
    'meeseva.locationDenied': 'సమీపంలోని మీసేవ కేంద్రాలను చూపించడానికి మాకు మీ స్థానం అవసరం. దయచేసి మీ బ్రౌజర్‌లో లొకేషన్ యాక్సెస్‌ను ప్రారంభించండి.',
    'meeseva.noGeolocation': 'మీ బ్రౌజర్ లొకేషన్ సేవలకు మద్దతు ఇవ్వదు.',
    'meeseva.fetchError': 'సమీప కేంద్రాలను పొందలేకపోయాము. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.',
    'meeseva.noCenters': 'ప్రస్తుతం మీ ప్రాంతానికి సమీపంలో మీసేవ కేంద్రాలు కనుగొనబడలేదు.',
  },
  hindi: {
    // Navigation
    'nav.about': 'के बारे में',
    'nav.features': 'विशेषताएं',
    'nav.chatbot': 'चैटबॉट',
    'nav.contact': 'संपर्क',
    
    // Hero Section
    'hero.title': 'स्मार्ट टॉक तेलंगाना',
    'hero.subtitle': 'सभी के लिए सरकारी सेवाओं को सुलभ बनाना।',
    'hero.description': 'अपनी भाषा में दस्तावेज़, योजनाओं और सेवाओं की सहायता प्राप्त करें।',
    'hero.getStarted': 'शुरू करें',
    
    // Advantages
    'advantages.title': 'स्मार्ट टॉक क्यों चुनें?',
    'advantages.subtitle': 'नागरिकों और सरकारी सेवाओं के बीच अंतर को पाटने के लिए तेलंगाना के लोगों के लिए विशेष रूप से डिज़ाइन किया गया।',
    'advantages.easeOfAccess': 'आसान पहुंच',
    'advantages.easeOfAccessDesc': 'कहीं से भी, कभी भी सरकारी सेवाओं का उपयोग करें। कार्यालयों में जाने या लंबी कतारों में खड़े होने की आवश्यकता नहीं।',
    'advantages.multilingualSupport': 'बहुभाषी समर्थन',
    'advantages.multilingualSupportDesc': 'तेलुगु, हिंदी और अंग्रेजी में सहायता प्राप्त करें। बेहतर समझ के लिए अपनी पसंदीदा भाषा में बोलें या टाइप करें।',
    'advantages.personalizedGuidance': 'व्यक्तिगत मार्गदर्शन',
    'advantages.personalizedGuidanceDesc': 'अपनी विशिष्ट आवश्यकताओं और दस्तावेज़ आवश्यकताओं के अनुरूप चरणबद्ध मार्गदर्शन प्राप्त करें।',
    
    // Value Proposition
    'valueProposition.title': 'डिजिटल विभाजन को पाटना',
    'valueProposition.subtitle': 'सरकारी सेवाओं तक आसान पहुंच के साथ तेलंगाना के हर नागरिक को सशक्त बनाना',
    
    // Features
    'features.title': 'शक्तिशाली विशेषताएं',
    'features.subtitle': 'सरकारी सेवाओं को आत्मविश्वास के साथ नेविगेट करने के लिए आपको जो कुछ भी चाहिए',
    'features.teluguChatbot': 'तेलुगु चैटबॉट',
    'features.teluguChatbotDesc': 'तत्काल सहायता के लिए तेलुगु या अंग्रेजी में चैट करें',
    'features.tdocs': 'टी-डॉक्स',
    'features.tdocsDesc': 'आपकी विशिष्ट आवश्यकताओं के लिए दस्तावेज़ सुझावकर्ता',
    'features.enagrik': 'ई-नागरिक कार्ड',
    'features.enagrikDesc': 'सरकारी प्रक्रियाओं के लिए दृश्य गाइड',
    'features.voiceInput': 'आवाज़ इनपुट',
    'features.voiceInputDesc': 'तेलुगू या अंग्रेजी में अपने प्रश्न स्वाभाविक रूप से बोलें',
    'features.textToSpeech': 'टेक्स्ट-टू-स्पीच',
    'features.textToSpeechDesc': 'अपनी पसंदीदा भाषा में उत्तर सुनें',
    'features.tryNow': 'अभी आज़माएं',
    'features.backToFeatures': '← विशेषताओं पर वापस',
    'features.integratedInChatbot': '✓ चैटबॉट और फॉर्म में एकीकृत',
    'features.availableInChatbot': '✓ चैटबॉट प्रतिक्रियाओं में उपलब्ध',
    'features.integratedInTDocs': '✓ टी-डॉक्स और ई-नागरिक कार्ड में एकीकृत',
    'features.meesevaLocator': 'मीसेवा केंद्र लोकेटर',
    'features.meesevaLocatorDesc': 'अपना स्थान उपयोग करके निकटतम मीसेवा केंद्र खोजें',
    'features.locationServices': 'स्थान सेवाएं',
    'features.locationServicesDesc': 'निकटतम सरकारी कार्यालय खोजने में आपकी सहायता के लिए जीपीएस-सक्षम सेवाएं',
    'features.integratedInMeeseva': '✓ मीसेवा केंद्र लोकेटर में एकीकृत',
    
    // Personalized Schemes
    'schemes.title': 'अपनी योग्य योजनाएं खोजें',
    'schemes.subtitle': 'अपनी प्रोफ़ाइल के आधार पर आपके लिए तैयार की गई सरकारी योजनाओं की खोज करें',
    'schemes.pensionSchemes': 'पेंशन योजनाएं',
    'schemes.pensionSchemesDesc': 'योग्य नागरिकों के लिए वृद्धावस्था, विधवा और विकलांगता पेंशन',
    'schemes.pensionBenefits': 'मासिक लाभ ₹3,016 तक',
    'schemes.educationSupport': 'शिक्षा सहायता',
    'schemes.educationSupportDesc': 'छात्रों के लिए छात्रवृत्ति और शैक्षिक सहायता',
    'schemes.educationBenefits': 'श्रेणी के आधार पर विभिन्न राशि',
    'schemes.healthcareBenefits': 'स्वास्थ्य सेवा लाभ',
    'schemes.healthcareBenefitsDesc': 'चिकित्सा बीमा और स्वास्थ्य सहायता योजनाएं',
    'schemes.healthcareCoverage': 'कवरेज ₹5 लाख तक',
    'schemes.howItWorks': 'आपके लिए योग्य योजनाओं को खोजने के लिए नीचे हमारे स्मार्ट असिस्टेंट का उपयोग करें',
    'schemes.howItWorksTitle': 'यह कैसे काम करता है:',
    'schemes.step1': '1. अपने बारे में कुछ सरल प्रश्नों के उत्तर दें',
    'schemes.step2': '2. हमारी AI आपकी योग्यता का विश्लेषण करेगी',
    'schemes.step3': '3. आपके आवेदन कर सकने वाली योजनाओं की व्यक्तिगत सूची प्राप्त करें',
    'schemes.step4': '4. विस्तृत जानकारी और आवेदन प्रक्रिया डाउनलोड करें',
    
    // Enhanced Scheme Questionnaire
    'schemes.questionnaire.title': 'विस्तृत योजना मूल्यांकन',
    'schemes.questionnaire.subtitle': 'सबसे सटीक सिफारिशों के लिए विस्तृत प्रश्नों के उत्तर दें',
    'schemes.questionnaire.personalInfo': 'व्यक्तिगत जानकारी',
    'schemes.questionnaire.economicInfo': 'आर्थिक जानकारी',
    'schemes.questionnaire.familyInfo': 'पारिवारिक जानकारी',
    'schemes.questionnaire.educationInfo': 'शिक्षा जानकारी',
    'schemes.questionnaire.healthInfo': 'स्वास्थ्य जानकारी',
    'schemes.questionnaire.housingInfo': 'आवास जानकारी',
    'schemes.questionnaire.maritalStatus': 'वैवाहिक स्थिति',
    'schemes.questionnaire.single': 'अविवाहित',
    'schemes.questionnaire.married': 'विवाहित',
    'schemes.questionnaire.widow': 'विधवा/विधुर',
    'schemes.questionnaire.separated': 'अलग',
    'schemes.questionnaire.disability': 'क्या आपको कोई विकलांगता है?',
    'schemes.questionnaire.yes': 'हाँ',
    'schemes.questionnaire.no': 'नहीं',
    'schemes.questionnaire.familySize': 'परिवार का आकार',
    'schemes.questionnaire.education': 'शिक्षा स्तर',
    'schemes.questionnaire.illiterate': 'निरक्षर',
    'schemes.questionnaire.primary': 'प्राथमिक',
    'schemes.questionnaire.secondary': 'माध्यमिक',
    'schemes.questionnaire.graduation': 'स्नातक',
    'schemes.questionnaire.postGraduation': 'स्नातकोत्तर',
    'schemes.questionnaire.housingType': 'आवास प्रकार',
    'schemes.questionnaire.owned': 'स्वामित्व',
    'schemes.questionnaire.rented': 'किराया',
    'schemes.questionnaire.homeless': 'बेघर',
    'schemes.questionnaire.landOwnership': 'क्या आपके पास कृषि भूमि है?',
    'schemes.questionnaire.chronicIllness': 'परिवार में कोई दीर्घकालिक बीमारी है?',
    'schemes.questionnaire.previous': 'पिछला',
    'schemes.questionnaire.continue': 'जारी रखें',
    'schemes.questionnaire.getRecommendations': 'सिफारिशें प्राप्त करें',

    // Audio/Visual Support
    'audio.speakInTelugu': 'तेलुगु में बोलें',
    'audio.speakInHindi': 'हिंदी में बोलें',
    'audio.speakInEnglish': 'अंग्रेजी में बोलें',
    'audio.listenInTelugu': 'तेलुगु में सुनें',
    'audio.listenInHindi': 'हिंदी में सुनें',
    'audio.listenInEnglish': 'अंग्रेजी में सुनें',
    
    // Chatbot Section
    'chatbot.title': 'अपनी योग्य योजनाएं खोजें',
    'chatbot.subtitle': 'सरकारी योजनाओं की खोज के लिए कुछ प्रश्नों के उत्तर दें',
    
    // Contact
    'contact.title': 'संपर्क में रहें',
    'contact.subtitle': 'प्रश्न या प्रतिक्रिया है? हम आपसे सुनना पसंद करेंगे।',
    'contact.fullName': 'पूरा नाम',
    'contact.enterName': 'अपना पूरा नाम दर्ज करें',
    'contact.emailAddress': 'ईमेल पता',
    'contact.enterEmail': 'अपना ईमेल पता दर्ज करें',
    'contact.message': 'संदेश',
    'contact.messagePlaceholder': 'हमें बताएं कि हम आपकी कैसे सहायता कर सकते हैं...',
    'contact.sendMessage': 'संदेश भेजें',
    'contact.supportText': 'तकनीकी सहायता के लिए, हमारी टीम से संपर्क करें',
    'contact.supportEmail': 'smarttalk.telangana@gov.in',
    
    // Footer
    'footer.description': 'स्मार्ट प्रौद्योगिकी और बहुभाषी समर्थन के माध्यम से तेलंगाना के सभी नागरिकों के लिए सरकारी सेवाओं को सुलभ बनाना।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.contactInfo': 'संपर्क जानकारी',
    'footer.availableIn': 'तेलुगु, हिंदी और अंग्रेजी में उपलब्ध',
    'footer.copyright': '© 2024 स्मार्टटॉक तेलंगाना। तेलंगाना सरकार हैकाथॉन के लिए निर्मित। सभी अधिकार सुरक्षित।',
    
    // T-Docs
    'tdocs.title': 'टी-डॉक्स: दस्तावेज़ खोजकर्ता',
    'tdocs.subtitle': 'व्यक्तिगत दस्तावेज़ सिफारिशों के लिए कुछ प्रश्नों के उत्तर दें',
    'tdocs.purpose': 'आपको दस्तावेज़ की आवश्यकता किसके लिए है?',
    'tdocs.category': 'आप किस श्रेणी से संबंधित हैं?',
    'tdocs.ageGroup': 'आपका आयु समूह क्या है?',
    'tdocs.income': 'आपकी मासिक आय क्या है?',
    'tdocs.employment': 'रोजगार/नौकरी',
    'tdocs.education': 'शिक्षा/कॉलेज',
    'tdocs.marriage': 'विवाह पंजीकरण',
    'tdocs.property': 'संपत्ति/भूमि',
    'tdocs.benefits': 'सरकारी लाभ',
    'tdocs.general': 'सामान्य',
    'tdocs.obc': 'ओबीसी',
    'tdocs.sc': 'एससी',
    'tdocs.st': 'एसटी',
    'tdocs.below18': '18 से कम',
    'tdocs.18-35': '18-35 वर्ष',
    'tdocs.35-60': '35-60 वर्ष',
    'tdocs.above60': '60 से अधिक',
    'tdocs.below10k': '₹10,000 से कम',
    'tdocs.10k-50k': '₹10,000 - ₹50,000',
    'tdocs.above50k': '₹50,000 से अधिक',
    'tdocs.recommended': 'अनुशंसित दस्तावेज़',
    'tdocs.based': 'आपकी आवश्यकताओं के आधार पर, यहाँ वे दस्तावेज़ हैं जिनकी आपको आवश्यकता हो सकती है:',
    'tdocs.required': 'आवश्यक दस्तावेज़:',
    'tdocs.process': 'प्रक्रिया:',
    'tdocs.office': 'कार्यालय:',
    'tdocs.time': 'समय:',
    'tdocs.download': 'चेकलिस्ट डाउनलोड करें',
    'tdocs.startOver': 'फिर से शुरू करें',
    
    // e-Nagrik Cards
    'enagrik.title': 'ई-नागरिक कार्ड',
    'enagrik.subtitle': 'सरकारी प्रक्रियाओं के लिए दृश्य गाइड',
    'enagrik.viewSteps': 'चरण देखें',
    'enagrik.downloadGuide': 'गाइड डाउनलोड करें',
    
    // Common
    'common.next': 'अगला',
    'common.back': 'वापस',
    'common.submit': 'जमा करें',
    'common.close': 'बंद करें',
    'common.days': 'दिन',
    
    // Government Portals
    'portals.title': 'आवश्यक सरकारी पोर्टल',
    'portals.subtitle': 'प्रमुख तेलंगाना सरकारी सेवाएं और प्लेटफार्म',
    'portals.visitSite': 'साइट पर जाएं',
    'portals.bhuvan': 'भुवन NRSC',
    'portals.bhuvanDesc': 'सैटेलाइट मैपिंग और भूमि सेवाएं',
    'portals.telanganaPortal': 'तेलंगाना राज्य पोर्टल',
    'portals.telanganaPortalDesc': 'आधिकारिक सरकारी घोषणाएं और सेवाएं',
    'portals.epass': 'तेलंगाना ePASS',
    'portals.epassDesc': 'छात्रों के लिए छात्रवृत्ति सेवाएं',
    'portals.prajavani': 'प्रजावाणी',
    'portals.prajavaniDesc': 'सार्वजनिक शिकायत निवारण प्रणाली',
    'portals.ipass': 'iPASS',
    'portals.ipassDesc': 'औद्योगिक प्रोत्साहन और अनुमोदन',
    'portals.meeseva': 'मीसेवा पोर्टल',
    'portals.meesevaDesc': 'सभी-एक-में ई-गवर्नेंस सेवाएं',
    
    // Meeseva Center Locator
    'meeseva.title': 'निकटतम मीसेवा केंद्र खोजें',
    'meeseva.subtitle': 'व्यक्तिगत सरकारी सेवाओं के लिए निकटतम मीसेवा केंद्रों का पता लगाएं',
    'meeseva.findNearby': 'निकटतम केंद्र खोजें',
    'meeseva.locating': 'आपका स्थान प्राप्त कर रहे हैं...',
    'meeseva.searching': 'निकटतम केंद्रों की खोज कर रहे हैं...',
    'meeseva.nearbycenters': 'निकटतम केंद्र',
    'meeseva.directions': 'दिशा प्राप्त करें',
    'meeseva.tryAgain': 'फिर कोशिश करें',
    'meeseva.locationDenied': 'निकटतम मीसेवा केंद्र दिखाने के लिए हमें आपके स्थान की आवश्यकता है। कृपया अपने ब्राउज़र में स्थान पहुंच सक्षम करें।',
    'meeseva.noGeolocation': 'आपका ब्राउज़र स्थान सेवाओं का समर्थन नहीं करता।',
    'meeseva.fetchError': 'निकटतम केंद्र प्राप्त करने में असमर्थ। कृपया बाद में पुनः प्रयास करें।',
    'meeseva.noCenters': 'अभी आपके क्षेत्र के पास कोई मीसेवा केंद्र नहीं मिला।',
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
