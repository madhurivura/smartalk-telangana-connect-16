import React, { useState } from 'react';
import { FileText, Download, ArrowLeft, User, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { generatePDF } from '@/utils/pdfGenerator';

interface DocumentRecommendation {
  id: string;
  name: { english: string; hindi: string; telugu: string };
  purpose: { english: string; hindi: string; telugu: string };
  requiredDocuments: { english: string[]; hindi: string[]; telugu: string[] };
  process: { english: string[]; hindi: string[]; telugu: string[] };
  office: { english: string; hindi: string; telugu: string };
  timeframe: { english: string; hindi: string; telugu: string };
  priority: 'high' | 'medium' | 'low';
}

interface Scheme {
  id: string;
  name: { english: string; hindi: string; telugu: string };
  description: { english: string; hindi: string; telugu: string };
  eligibility: { english: string; hindi: string; telugu: string };
}

const TDocsSystem: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>([]);
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);

  const questions = [
    {
      id: 'employment',
      question: {
        english: 'What is your employment status?',
        hindi: 'आपकी रोजगार स्थिति क्या है?',
        telugu: 'మీ ఉద్యోగ స్థితి ఏమిటి?'
      },
      options: [
        { 
          value: 'student', 
          label: {
            english: 'Student',
            hindi: 'छात्र',
            telugu: 'విద్యార్థి'
          }
        },
        { 
          value: 'self_employed', 
          label: {
            english: 'Self-Employed',
            hindi: 'स्व-रोजगार',
            telugu: 'స్వయం ఉద్యోగం'
          }
        },
        { 
          value: 'govt_job', 
          label: {
            english: 'Government Job',
            hindi: 'सरकारी नौकरी',
            telugu: 'ప్రభుత్వ ఉద్యోగం'
          }
        },
        { 
          value: 'private_job', 
          label: {
            english: 'Private Job',
            hindi: 'निजी नौकरी',
            telugu: 'ప్రైవేట్ ఉద్యోగం'
          }
        },
        { 
          value: 'unemployed', 
          label: {
            english: 'Unemployed',
            hindi: 'बेरोजगार',
            telugu: 'నిరుద్యోగి'
          }
        }
      ]
    },
    {
      id: 'ageGroup',
      question: {
        english: 'What is your age group?',
        hindi: 'आपका आयु समूह क्या है?',
        telugu: 'మీ వయస్సు గ్రూప్ ఏమిటి?'
      },
      options: [
        { 
          value: 'below18', 
          label: {
            english: 'Below 18 years',
            hindi: '18 वर्ष से कम',
            telugu: '18 సంవత్సరాలకు తక్కువ'
          }
        },
        { 
          value: '18-25', 
          label: {
            english: '18-25 years',
            hindi: '18-25 वर्ष',
            telugu: '18-25 సంవత్సరాలు'
          }
        },
        { 
          value: '26-40', 
          label: {
            english: '26-40 years',
            hindi: '26-40 वर्ष',
            telugu: '26-40 సంవత్సరాలు'
          }
        },
        { 
          value: '41-60', 
          label: {
            english: '41-60 years',
            hindi: '41-60 वर्ष',
            telugu: '41-60 సంవత్సరాలు'
          }
        },
        { 
          value: 'above60', 
          label: {
            english: 'Above 60 years',
            hindi: '60 वर्ष से अधिक',
            telugu: '60 సంవత్సరాలకు మించి'
          }
        }
      ]
    },
    {
      id: 'income',
      question: {
        english: 'What is your annual family income?',
        hindi: 'आपकी वार्षिक पारिवारिक आय क्या है?',
        telugu: 'మీ వార్షిక కుటుంబ ఆదాయం ఎంత?'
      },
      options: [
        { 
          value: 'below1l', 
          label: {
            english: 'Below ₹1 Lakh',
            hindi: '₹1 लाख से कम',
            telugu: '₹1 లక్ష కంటే తక్కువ'
          }
        },
        { 
          value: '1l-2.5l', 
          label: {
            english: '₹1L - ₹2.5L',
            hindi: '₹1L - ₹2.5L',
            telugu: '₹1L - ₹2.5L'
          }
        },
        { 
          value: '2.5l-5l', 
          label: {
            english: '₹2.5L - ₹5L',
            hindi: '₹2.5L - ₹5L',
            telugu: '₹2.5L - ₹5L'
          }
        },
        { 
          value: 'above5l', 
          label: {
            english: 'Above ₹5 Lakh',
            hindi: '₹5 लाख से अधिक',
            telugu: '₹5 లక్షకు మించి'
          }
        }
      ]
    },
    {
      id: 'category',
      question: {
        english: 'What is your caste category?',
        hindi: 'आपकी जाति श्रेणी क्या है?',
        telugu: 'మీ కుల వర్గం ఏమిటి?'
      },
      options: [
        { 
          value: 'general', 
          label: {
            english: 'General',
            hindi: 'सामान्य',
            telugu: 'జనరల్'
          }
        },
        { 
          value: 'obc', 
          label: {
            english: 'OBC',
            hindi: 'अन्य पिछड़ा वर्ग',
            telugu: 'వెనుకబడిన తరగతులు'
          }
        },
        { 
          value: 'sc', 
          label: {
            english: 'SC',
            hindi: 'अनुसूचित जाति',
            telugu: 'ఎస్సీ'
          }
        },
        { 
          value: 'st', 
          label: {
            english: 'ST',
            hindi: 'अनुसूचित जनजाति',
            telugu: 'ఎస్టీ'
          }
        }
      ]
    },
    {
      id: 'region',
      question: {
        english: 'What is your region type?',
        hindi: 'आपका क्षेत्र प्रकार क्या है?',
        telugu: 'మీ ప్రాంత రకం ఏమిటి?'
      },
      options: [
        { 
          value: 'urban', 
          label: {
            english: 'Urban',
            hindi: 'शहरी',
            telugu: 'పట్టణం'
          }
        },
        { 
          value: 'rural', 
          label: {
            english: 'Rural',
            hindi: 'ग्रामीण',
            telugu: 'గ్రామీణ'
          }
        }
      ]
    },
    {
      id: 'gender',
      question: {
        english: 'What is your gender?',
        hindi: 'आपका लिंग क्या है?',
        telugu: 'మీ లింగం ఏమిటి?'
      },
      options: [
        { 
          value: 'male', 
          label: {
            english: 'Male',
            hindi: 'पुरुष',
            telugu: 'పురుషుడు'
          }
        },
        { 
          value: 'female', 
          label: {
            english: 'Female',
            hindi: 'महिला',
            telugu: 'స్త్రీ'
          }
        },
        { 
          value: 'other', 
          label: {
            english: 'Other',
            hindi: 'अन्य',
            telugu: 'ఇతర'
          }
        }
      ]
    }
  ];

  const documentDatabase: DocumentRecommendation[] = [
    {
      id: 'income-cert',
      name: { 
        english: 'Income Certificate', 
        hindi: 'आय प्रमाण पत्र',
        telugu: 'ఆదాయ ప్రమాణపత్రం' 
      },
      purpose: { 
        english: 'Proof of family income', 
        hindi: 'पारिवारिक आय का प्रमाण',
        telugu: 'కుటుంబ ఆదాయ రుజువు' 
      },
      requiredDocuments: {
        english: ['Application form', 'Salary certificates', 'Aadhaar card', 'Ration card', 'Bank statements'],
        hindi: ['आवेदन पत्र', 'वेतन प्रमाण पत्र', 'आधार कार्ड', 'राशन कार्ड', 'बैंक स्टेटमेंट'],
        telugu: ['దరఖాస్తు ఫారం', 'జీతం ప్రమాణపత్రాలు', 'ఆధార్ కార్డ్', 'రేషన్ కార్డ్', 'బ్యాంక్ స్టేట్‌మెంట్లు']
      },
      process: {
        english: ['Fill application', 'Attach documents', 'Submit at Tahsildar office', 'Pay fee', 'Collect certificate'],
        hindi: ['आवेदन भरें', 'दस्तावेज संलग्न करें', 'तहसीलदार कार्यालय में जमा करें', 'शुल्क का भुगतान करें', 'प्रमाण पत्र एकत्र करें'],
        telugu: ['దరఖాస్తు పూరించండి', 'పత్రాలు జతచేయండి', 'తహసీల్దార్ కార్యాలయంలో సమర్పించండి', 'రుసుము చెల్లించండి', 'ప్రమాణపత్రం తీసుకోండి']
      },
      office: { 
        english: 'Tahsildar Office', 
        hindi: 'तहसीलदार कार्यालय',
        telugu: 'తహసీల్దార్ కార్యాలయం' 
      },
      timeframe: { 
        english: '15-30 days', 
        hindi: '15-30 दिन',
        telugu: '15-30 రోజులు' 
      },
      priority: 'high'
    },
    {
      id: 'caste-cert',
      name: { 
        english: 'Caste Certificate', 
        hindi: 'जाति प्रमाण पत्र',
        telugu: 'కుల ప్రమాణపత్రం' 
      },
      purpose: { 
        english: 'Proof of caste for reservations', 
        hindi: 'आरक्षण के लिए जाति का प्रमाण',
        telugu: 'రిజర్వేషన్ల కోసం కుల రుజువు' 
      },
      requiredDocuments: {
        english: ['Application form', 'Birth certificate', 'School certificates', 'Parent caste certificate', 'Aadhaar card'],
        hindi: ['आवेदन पत्र', 'जन्म प्रमाण पत्र', 'स्कूल प्रमाण पत्र', 'माता-पिता का जाति प्रमाण पत्र', 'आधार कार्ड'],
        telugu: ['దరఖాస్తు ఫారం', 'జనన ప్రమాణపత్రం', 'పాఠశాల ప్రమాణపత్రాలు', 'తల్లిదండ్రుల కుల ప్రమాణపత్రం', 'ఆధార్ కార్డ్']
      },
      process: {
        english: ['Apply online/offline', 'Document verification', 'Field inquiry', 'Approval', 'Certificate issuance'],
        hindi: ['ऑनलाइन/ऑफलाइन आवेदन करें', 'दस्तावेज सत्यापन', 'क्षेत्रीय जांच', 'अनुमोदन', 'प्रमाण पत्र जारी करना'],
        telugu: ['ఆన్‌లైన్/ఆఫ్‌లైన్ దరఖాస్తు', 'పత్రాల ధృవీకరణ', 'క్షేత్ర విచారణ', 'ఆమోదం', 'ప్రమాణపత్రం జారీ']
      },
      office: { 
        english: 'MRO Office', 
        hindi: 'MRO कार्यालय',
        telugu: 'MRO కార్యాలయం' 
      },
      timeframe: { 
        english: '30-45 days', 
        hindi: '30-45 दिन',
        telugu: '30-45 రోజులు' 
      },
      priority: 'high'
    },
    {
      id: 'study-cert',
      name: { 
        english: 'Study Certificate', 
        hindi: 'अध्ययन प्रमाण पत्र',
        telugu: 'అధ్యయన ప్రమాణపత్రం' 
      },
      purpose: { 
        english: 'For educational purposes', 
        hindi: 'शैक्षिक उद्देश्यों के लिए',
        telugu: 'విద్యా ప్రయోజనాల కోసం' 
      },
      requiredDocuments: {
        english: ['School leaving certificate', 'Mark sheets', 'Transfer certificate', 'Aadhaar card'],
        hindi: ['स्कूल छोड़ने का प्रमाण पत्र', 'मार्क शीट', 'स्थानांतरण प्रमाण पत्र', 'आधार कार्ड'],
        telugu: ['పాఠశాల వదిలిపెట్టిన ప్రమాణపత్రం', 'మార్కు షీట్లు', 'బదిలీ ప్రమాణపత్రం', 'ఆధార్ కార్డ్']
      },
      process: {
        english: ['Apply at institution', 'Submit documents', 'Pay fees', 'Collect certificate'],
        hindi: ['संस्थान में आवेदन करें', 'दस्तावेज जमा करें', 'शुल्क का भुगतान करें', 'प्रमाण पत्र एकत्र करें'],
        telugu: ['సంస్థలో దరఖాస్తు', 'పత్రాలు సమర్పించండి', 'రుసుము చెల్లించండి', 'ప్రమాణపత్రం తీసుకోండి']
      },
      office: { 
        english: 'Educational Institution', 
        hindi: 'शैक्षणिक संस्थान',
        telugu: 'విద్యా సంస్థ' 
      },
      timeframe: { 
        english: '7-15 days', 
        hindi: '7-15 दिन',
        telugu: '7-15 రోజులు' 
      },
      priority: 'medium'
    },
    {
      id: 'domicile-cert',
      name: { 
        english: 'Domicile Certificate', 
        hindi: 'निवास प्रमाण पत्र',
        telugu: 'నివాస ప్రమాణపత్రం' 
      },
      purpose: { 
        english: 'Proof of residence', 
        hindi: 'निवास का प्रमाण',
        telugu: 'నివాస రుజువు' 
      },
      requiredDocuments: {
        english: ['Application form', 'Birth certificate', 'Educational certificates', 'Aadhaar card', 'Ration card'],
        hindi: ['आवेदन पत्र', 'जन्म प्रमाण पत्र', 'शैक्षिक प्रमाण पत्र', 'आधार कार्ड', 'राशन कार्ड'],
        telugu: ['దరఖాస్తు ఫారం', 'జనన ప్రమాణపత్రం', 'విద్యా ప్రమాణపత్రాలు', 'ఆధార్ కార్డ్', 'రేషన్ కార్డ్']
      },
      process: {
        english: ['Submit application', 'Document verification', 'Field verification', 'Certificate issuance'],
        hindi: ['आवेदन जमा करें', 'दस्तावेज सत्यापन', 'क्षेत्रीय सत्यापन', 'प्रमाण पत्र जारी करना'],
        telugu: ['దరఖాస్తు సమర్పణ', 'పత్రాల ధృవీకరణ', 'క్షేత్ర ధృవీకరణ', 'ప్రమాణపత్రం జారీ']
      },
      office: { 
        english: 'MRO Office', 
        hindi: 'MRO कार्यालय',
        telugu: 'MRO కార్యాలయం' 
      },
      timeframe: { 
        english: '30 days', 
        hindi: '30 दिन',
        telugu: '30 రోజులు' 
      },
      priority: 'medium'
    },
    {
      id: 'pension-cert',
      name: { 
        english: 'Pension Application', 
        hindi: 'पेंशन आवेदन',
        telugu: 'పెన్షన్ దరఖాస్తు' 
      },
      purpose: { 
        english: 'Old age/widow/disability pension', 
        hindi: 'वृद्धावस्था/विधवा/विकलांगता पेंशन',
        telugu: 'వృద్ధాప్య/వితంతువు/వైకల్య పెన్షన్' 
      },
      requiredDocuments: {
        english: ['Age proof', 'Income certificate', 'Bank details', 'Aadhaar card', 'Medical certificate'],
        hindi: ['आयु प्रमाण', 'आय प्रमाण पत्र', 'बैंक विवरण', 'आधार कार्ड', 'चिकित्सा प्रमाण पत्र'],
        telugu: ['వయసు రుజువు', 'ఆదాయ ప్రమాణపత్రం', 'బ్యాంక్ వివరాలు', 'ఆధార్ కార్డ్', 'వైద్య ప్రమాణపత్రం']
      },
      process: {
        english: ['Fill pension form', 'Submit at VRO', 'Medical examination', 'Verification', 'Approval'],
        hindi: ['पेंशन फॉर्म भरें', 'VRO में जमा करें', 'चिकित्सा परीक्षा', 'सत्यापन', 'अनुमोदन'],
        telugu: ['పెన్షన్ ఫారం పూరించండి', 'VROలో సమర్పించండి', 'వైద్య పరీక్ష', 'ధృవీకరణ', 'ఆమోదం']
      },
      office: { 
        english: 'VRO Office', 
        hindi: 'VRO कार्यालय',
        telugu: 'VRO కార్యాలయం' 
      },
      timeframe: { 
        english: '30-45 days', 
        hindi: '30-45 दिन',
        telugu: '30-45 రోజులు' 
      },
      priority: 'high'
    },
    {
      id: 'business-reg',
      name: { 
        english: 'Business Registration', 
        hindi: 'व्यवसाय पंजीकरण',
        telugu: 'వ్యాపార నమోదు' 
      },
      purpose: { 
        english: 'Register business/shop', 
        hindi: 'व्यवसाय/दुकान पंजीकृत करें',
        telugu: 'వ్యాపారం/దుకాణం నమోదు' 
      },
      requiredDocuments: {
        english: ['Application form', 'Address proof', 'Identity proof', 'NOC from owner', 'Photographs'],
        hindi: ['आवेदन पत्र', 'पते का प्रमाण', 'पहचान प्रमाण', 'मालिक से NOC', 'फोटो'],
        telugu: ['దరఖాస్తు ఫారం', 'చిరునామా రుజువు', 'గుర్తింపు రుజువు', 'యజమాని NOC', 'ఫోటోలు']
      },
      process: {
        english: ['Submit application', 'Pay registration fee', 'Inspection', 'License issuance'],
        hindi: ['आवेदन जमा करें', 'पंजीकरण शुल्क का भुगतान करें', 'निरीक्षण', 'लाइसेंस जारी करना'],
        telugu: ['దరఖాస్తు సమర్పణ', 'నమోదు రుసుము చెల్లింపు', 'తనిఖీ', 'లైసెన్స్ జారీ']
      },
      office: { 
        english: 'Municipal Office', 
        hindi: 'नगर पालिका कार्यालय',
        telugu: 'మునిసిపల్ కార్యాలయం' 
      },
      timeframe: { 
        english: '15-20 days', 
        hindi: '15-20 दिन',
        telugu: '15-20 రోజులు' 
      },
      priority: 'high'
    }
  ];

  const schemeDatabase: Scheme[] = [
    {
      id: 'kalyan-lakshmi',
      name: { 
        english: 'Kalyan Lakshmi Scheme', 
        hindi: 'कल्याण लक्ष्मी योजना',
        telugu: 'కల్యాణ లక్ష్మి పథకం' 
      },
      description: { 
        english: 'Financial assistance for marriages', 
        hindi: 'विवाह के लिए वित्तीय सहायता',
        telugu: 'వివాహాలకు ఆర్థిక సహాయం' 
      },
      eligibility: { 
        english: 'SC/ST/BC families, Income below ₹2L', 
        hindi: 'SC/ST/BC परिवार, आय ₹2L से कम',
        telugu: 'SC/ST/BC కుటుంబాలు, ఆదాయం ₹2L కంటే తక్కువ' 
      }
    },
    {
      id: 'rythu-bandhu',
      name: { 
        english: 'Rythu Bandhu', 
        hindi: 'रितु बंधु',
        telugu: 'రైతు బంధు' 
      },
      description: { 
        english: 'Investment support for farmers', 
        hindi: 'किसानों के लिए निवेश समर्थन',
        telugu: 'రైతులకు పెట్టుబడి మద్దతు' 
      },
      eligibility: { 
        english: 'Land-owning farmers', 
        hindi: 'भूमि मालिक किसान',
        telugu: 'భూమి గల రైతులు' 
      }
    },
    {
      id: 'fee-reimbursement',
      name: { 
        english: 'Fee Reimbursement', 
        hindi: 'शुल्क प्रतिपूर्ति',
        telugu: 'ఫీజు రీయింబర్స్‌మెంట్' 
      },
      description: { 
        english: 'Education fee support', 
        hindi: 'शिक्षा शुल्क सहायता',
        telugu: 'విద్యా రుసుము మద్దతు' 
      },
      eligibility: { 
        english: 'Students from reserved categories', 
        hindi: 'आरक्षित वर्ग के छात्र',
        telugu: 'రిజర్వు వర్గాల విద్యార్థులు' 
      }
    },
    {
      id: 'aasara-pensions',
      name: { 
        english: 'Aasara Pensions', 
        hindi: 'आसरा पेंशन',
        telugu: 'ఆసర పెన్షన్లు' 
      },
      description: { 
        english: 'Monthly pension for elderly', 
        hindi: 'वृद्धों के लिए मासिक पेंशन',
        telugu: 'వృద్ధులకు నెలవారీ పెన్షన్' 
      },
      eligibility: { 
        english: 'Age 60+, Income below ₹2L', 
        hindi: 'आयु 60+, आय ₹2L से कम',
        telugu: 'వయసు 60+, ఆదాయం ₹2L కంటే తక్కువ' 
      }
    },
    {
      id: 'mudra-loan',
      name: { 
        english: 'Mudra Loan Scheme', 
        hindi: 'मुद्रा ऋण योजना',
        telugu: 'ముద్రా రుణ పథకం' 
      },
      description: { 
        english: 'Micro business loans', 
        hindi: 'सूक्ष्म व्यवसाय ऋण',
        telugu: 'చిన్న వ్యాపార రుణాలు' 
      },
      eligibility: { 
        english: 'Small business owners', 
        hindi: 'छोटे व्यवसाय मालिक',
        telugu: 'చిన్న వ్యాపారుల‌కు' 
      }
    }
  ];

  const generateSmartRecommendations = (answers: Record<string, string>) => {
    const { employment, ageGroup, income, category, region, gender } = answers;
    let docs: DocumentRecommendation[] = [];
    let schemes: Scheme[] = [];

    // Student recommendations
    if (employment === 'student') {
      docs.push(documentDatabase.find(d => d.id === 'study-cert')!);
      
      if (ageGroup === 'below18' || ageGroup === '18-25') {
        docs.push(documentDatabase.find(d => d.id === 'income-cert')!);
      }
      
      if (category !== 'general') {
        docs.push(documentDatabase.find(d => d.id === 'caste-cert')!);
        schemes.push(schemeDatabase.find(s => s.id === 'fee-reimbursement')!);
      }
      
      if (region === 'rural' && income === 'below1l') {
        docs.push(documentDatabase.find(d => d.id === 'domicile-cert')!);
      }
    }

    // Self-employed recommendations
    if (employment === 'self_employed') {
      docs.push(documentDatabase.find(d => d.id === 'business-reg')!);
      docs.push(documentDatabase.find(d => d.id === 'income-cert')!);
      schemes.push(schemeDatabase.find(s => s.id === 'mudra-loan')!);
      
      if (income === 'below1l' || income === '1l-2.5l') {
        docs.push(documentDatabase.find(d => d.id === 'domicile-cert')!);
      }
    }

    // Government job recommendations
    if (employment === 'govt_job') {
      docs.push(documentDatabase.find(d => d.id === 'income-cert')!);
      docs.push(documentDatabase.find(d => d.id === 'domicile-cert')!);
      
      if (category !== 'general') {
        docs.push(documentDatabase.find(d => d.id === 'caste-cert')!);
      }
    }

    // Private job recommendations
    if (employment === 'private_job') {
      docs.push(documentDatabase.find(d => d.id === 'income-cert')!);
      
      if (income === 'below1l' || income === '1l-2.5l') {
        docs.push(documentDatabase.find(d => d.id === 'domicile-cert')!);
      }
    }

    // Unemployed recommendations
    if (employment === 'unemployed') {
      docs.push(documentDatabase.find(d => d.id === 'income-cert')!);
      
      if (ageGroup === 'above60') {
        docs.push(documentDatabase.find(d => d.id === 'pension-cert')!);
        schemes.push(schemeDatabase.find(s => s.id === 'aasara-pensions')!);
      }
      
      if (category !== 'general' && income === 'below1l') {
        docs.push(documentDatabase.find(d => d.id === 'caste-cert')!);
      }
    }

    // Age-based recommendations
    if (ageGroup === 'above60') {
      if (!docs.find(d => d.id === 'pension-cert')) {
        docs.push(documentDatabase.find(d => d.id === 'pension-cert')!);
      }
      if (!schemes.find(s => s.id === 'aasara-pensions')) {
        schemes.push(schemeDatabase.find(s => s.id === 'aasara-pensions')!);
      }
    }

    // Gender and marriage-based schemes
    if (gender === 'female' && category !== 'general' && income === 'below1l') {
      schemes.push(schemeDatabase.find(s => s.id === 'kalyan-lakshmi')!);
    }

    // Regional schemes
    if (region === 'rural') {
      schemes.push(schemeDatabase.find(s => s.id === 'rythu-bandhu')!);
    }

    return { documents: docs.filter(Boolean), schemes: schemes.filter(Boolean) };
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...userAnswers, [questionId]: answer };
    setUserAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const { documents, schemes } = generateSmartRecommendations(newAnswers);
      setRecommendations(documents);
      setEligibleSchemes(schemes);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setRecommendations([]);
    setEligibleSchemes([]);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProfileSummary = () => {
    const employment = questions[0].options.find(o => o.value === userAnswers.employment)?.label[language];
    const ageGroup = questions[1].options.find(o => o.value === userAnswers.ageGroup)?.label[language];
    const income = questions[2].options.find(o => o.value === userAnswers.income)?.label[language];
    const category = questions[3].options.find(o => o.value === userAnswers.category)?.label[language];
    const region = questions[4].options.find(o => o.value === userAnswers.region)?.label[language];
    const gender = questions[5].options.find(o => o.value === userAnswers.gender)?.label[language];

    return { employment, ageGroup, income, category, region, gender };
  };

  const handleDownloadPDF = () => {
    const profile = getProfileSummary();
    const content = {
      title: 'T-Docs Personalized Recommendations',
      description: `Based on your profile: ${profile.employment}, ${profile.ageGroup}, ${profile.income} income, ${profile.category} category, ${profile.region} region, ${profile.gender}`,
      documents: recommendations.map(doc => `${doc.name[language]} - ${doc.purpose[language]}`),
      process: recommendations.flatMap(doc => doc.process[language]),
      steps: eligibleSchemes.map((scheme, index) => ({
        title: scheme.name[language],
        description: `${scheme.description[language]} - Eligibility: ${scheme.eligibility[language]}`
      }))
    };
    generatePDF(content, 'tdocs-recommendations.pdf');
  };

  const getTranslation = (key: string) => {
    const translations = {
      title: {
        english: 'T-Docs: Document Finder',
        hindi: 'टी-डॉक्स: दस्तावेज़ खोजक',
        telugu: 'టీ-డాక్స్: పత్రం కనుగొనేవాడు'
      },
      subtitle: {
        english: 'Answer these questions to get personalized document recommendations',
        hindi: 'व्यक्तिगत दस्तावेज़ सिफारिशें पाने के लिए इन प्रश्नों के उत्तर दें',
        telugu: 'వ్యక్తిగత పత్రం సిఫార్సులను పొందడానికి ఈ ప్రశ్నలకు సమాధానం ఇవ్వండి'
      },
      step: {
        english: 'Step',
        hindi: 'चरण',
        telugu: 'దశ'
      },
      back: {
        english: 'Back',
        hindi: 'वापस',
        telugu: 'వెనుకకు'
      },
      basedOnProfile: {
        english: 'Based on your profile...',
        hindi: 'आपके प्रोफ़ाइल के आधार पर...',
        telugu: 'మీ ప్రొఫైల్ ఆధారంగా...'
      },
      requiredDocuments: {
        english: 'Required Documents',
        hindi: 'आवश्यक दस्तावेज़',
        telugu: 'అవసరమైన పత్రాలు'
      },
      eligibleSchemes: {
        english: 'Eligible Schemes',
        hindi: 'योग्य योजनाएं',
        telugu: 'అర్హత కలిగిన పథకాలు'
      },
      downloadReport: {
        english: 'Download Complete Report',
        hindi: 'पूरी रिपोर्ट डाउनलोड करें',
        telugu: 'పూర్తి నివేదికను డౌన్‌లోడ్ చేయండి'
      },
      startOver: {
        english: 'Start Over',
        hindi: 'फिर से शुरू करें',
        telugu: 'మళ్లీ ప్రారంభించండి'
      },
      office: {
        english: 'Office',
        hindi: 'कार्यालय',
        telugu: 'కార్యాలయం'
      },
      time: {
        english: 'Time',
        hindi: 'समय',
        telugu: 'సమయం'
      },
      eligibility: {
        english: 'Eligibility',
        hindi: 'पात्रता',
        telugu: 'అర్హత'
      },
      income: {
        english: 'Income',
        hindi: 'आय',
        telugu: 'ఆదాయం'
      },
      category: {
        english: 'Category',
        hindi: 'श्रेणी',
        telugu: 'వర్గం'
      },
      gender: {
        english: 'Gender',
        hindi: 'लिंग',
        telugu: 'లింగం'
      },
      highPriority: {
        english: 'High Priority',
        hindi: 'उच्च प्राथमिकता',
        telugu: 'అధిక ప్రాధాన్యత'
      },
      mediumPriority: {
        english: 'Medium Priority',
        hindi: 'मध्यम प्राथमिकता',
        telugu: 'మధ్యస్థ ప్రాధాన్యత'
      },
      lowPriority: {
        english: 'Low Priority',
        hindi: 'कम प्राथमिकता',
        telugu: 'తక్కువ ప్రాధాన్యత'
      }
    };
    return translations[key]?.[language] || key;
  };

  if (recommendations.length > 0) {
    const profile = getProfileSummary();
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 p-6 bg-gradient-to-r from-[#44646f] to-[#3c392b] rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <User className="mr-3" size={28} />
              {getTranslation('basedOnProfile')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Briefcase className="mr-2" size={16} />
                <span>{profile.employment}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2" size={16} />
                <span>{profile.ageGroup}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" size={16} />
                <span>{profile.region}</span>
              </div>
              <div><strong>{getTranslation('income')}:</strong> {profile.income}</div>
              <div><strong>{getTranslation('category')}:</strong> {profile.category}</div>
              <div><strong>{getTranslation('gender')}:</strong> {profile.gender}</div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-2xl font-bold text-[#3c392b] mb-6 flex items-center">
              <FileText className="mr-3" size={24} />
              {getTranslation('requiredDocuments')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((doc) => (
                <div key={doc.id} className="border border-[#cbccc1] rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="text-lg font-semibold text-[#3c392b] mb-2">
                        {doc.name[language]}
                      </h5>
                      <p className="text-[#5d5c54] text-sm mb-3">{doc.purpose[language]}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.priority === 'high' ? 'bg-red-100 text-red-800' :
                        doc.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {doc.priority === 'high' ? getTranslation('highPriority') : 
                         doc.priority === 'medium' ? getTranslation('mediumPriority') : getTranslation('lowPriority')}
                      </span>
                    </div>
                    <FileText size={24} className="text-[#44646f]" />
                  </div>
                  
                  <div className="text-sm text-[#5d5c54] space-y-1">
                    <div><strong>{getTranslation('office')}:</strong> {doc.office[language]}</div>
                    <div><strong>{getTranslation('time')}:</strong> {doc.timeframe[language]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {eligibleSchemes.length > 0 && (
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-[#3c392b] mb-6">{getTranslation('eligibleSchemes')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eligibleSchemes.map((scheme) => (
                  <div key={scheme.id} className="bg-gradient-to-br from-[#e1dbd1] to-[#cbccc1] rounded-lg p-4">
                    <h5 className="font-semibold text-[#3c392b] mb-2">{scheme.name[language]}</h5>
                    <p className="text-sm text-[#5d5c54] mb-2">{scheme.description[language]}</p>
                    <p className="text-xs text-[#44646f]"><strong>{getTranslation('eligibility')}:</strong> {scheme.eligibility[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="bg-[#44646f] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>{getTranslation('downloadReport')}</span>
            </button>
            <button
              onClick={resetForm}
              className="bg-[#cbccc1] text-[#3c392b] px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {getTranslation('startOver')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[#3c392b] mb-4">
            {getTranslation('title')}
          </h3>
          <p className="text-[#5d5c54]">
            {getTranslation('subtitle')}
          </p>
          <div className="mt-4 bg-[#e1dbd1] rounded-full h-2">
            <div 
              className="bg-[#44646f] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-[#3c392b] mb-6">
            {questions[currentStep].question[language]}
          </h4>
          <div className="space-y-3">
            {questions[currentStep].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                className="w-full text-left p-4 border border-[#cbccc1] rounded-lg hover:bg-[#e1dbd1] hover:border-[#44646f] transition-colors"
              >
                {option.label[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-[#5d5c54] hover:text-[#3c392b] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            <span>{getTranslation('back')}</span>
          </button>
          
          <div className="text-sm text-[#5d5c54]">
            {getTranslation('step')} {currentStep + 1} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TDocsSystem;
