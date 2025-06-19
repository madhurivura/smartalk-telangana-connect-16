import React, { useState } from 'react';
import { FileText, Download, Eye, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { generatePDF } from '@/utils/pdfGenerator';

interface ProcessCard {
  id: string;
  title: { english: string; telugu: string };
  icon: React.ReactNode;
  description: { english: string; telugu: string };
  steps: { 
    english: { title: string; description: string }[];
    telugu: { title: string; description: string }[];
  };
  requiredDocs: { english: string[]; telugu: string[] };
  office: { english: string; telugu: string };
  timeframe: { english: string; telugu: string };
  fees: { english: string; telugu: string };
}

const ENagrikCards: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<ProcessCard | null>(null);

  const processCards: ProcessCard[] = [
    {
      id: 'pan-card',
      title: {
        english: 'PAN Card',
        telugu: 'పాన్ కార్డ్'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for Permanent Account Number for income tax purposes',
        telugu: 'ఆదాయపు పన్ను ప్రయోజనాల కోసం శాశ్వత ఖాతా సంఖ్యకు దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          { title: 'Fill Online Form', description: 'Complete Form 49A online on NSDL/UTIITSL website' },
          { title: 'Upload Documents', description: 'Upload identity and address proof documents' },
          { title: 'Make Payment', description: 'Pay processing fee online via debit/credit card' },
          { title: 'Submit Application', description: 'Submit the application and note acknowledgment number' },
          { title: 'Track Status', description: 'Track application status using acknowledgment number' },
          { title: 'Receive PAN Card', description: 'Receive PAN card at registered address within 15-20 days' }
        ],
        telugu: [
          { title: 'ఆన్‌లైన్ ఫారం పూరించండి', description: 'NSDL/UTIITSL వెబ్‌సైట్‌లో ఫారం 49A ఆన్‌లైన్‌లో పూర్తి చేయండి' },
          { title: 'పత్రాలు అప్‌లోడ్ చేయండి', description: 'గుర్తింపు మరియు చిరునామా రుజువు పత్రాలను అప్‌లోడ్ చేయండి' },
          { title: 'చెల్లింపు చేయండి', description: 'డెబిట్/క్రెడిట్ కార్డ్ ద్వారా ప్రాసెసింగ్ రుసుమును ఆన్‌లైన్‌లో చెల్లించండి' },
          { title: 'దరఖాస్తు సమర్పించండి', description: 'దరఖాస్తును సమర్పించి, రసీదు నంబర్‌ను గమనించండి' },
          { title: 'స్థితిని ట్రాక్ చేయండి', description: 'రసీదు నంబర్‌ను ఉపయోగించి దరఖాస్తు స్థితిని ట్రాక్ చేయండి' },
          { title: 'పాన్ కార్డ్ స్వీకరించండి', description: '15-20 రోజుల్లో నమోదిత చిరునామాలో పాన్ కార్డ్‌ను స్వీకరించండి' }
        ]
      },
      requiredDocs: {
        english: ['Identity Proof (Aadhaar/Voter ID)', 'Address Proof', 'Date of Birth Proof', 'Passport size photo'],
        telugu: ['గుర్తింపు రుజువు (ఆధార్/ఓటర్ ID)', 'చిరునామా రుజువు', 'జన్మ తేదీ రుజువు', 'పాస్‌పోర్ట్ సైజ్ ఫోటో']
      },
      office: { english: 'Online Application', telugu: 'ఆన్‌లైన్ దరఖాస్తు' },
      timeframe: { english: '15-20 days', telugu: '15-20 రోజులు' },
      fees: { english: '₹107', telugu: '₹107' }
    },
    {
      id: 'passport',
      title: {
        english: 'Passport',
        telugu: 'పాస్‌పోర్ట్'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for Indian passport for international travel',
        telugu: 'అంతర్జాతీయ ప్రయాణం కోసం భారతీయ పాస్‌పోర్ట్‌కు దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          { title: 'Register Online', description: 'Create account on Passport Seva portal' },
          { title: 'Fill Application', description: 'Complete online application form with accurate details' },
          { title: 'Pay Fees', description: 'Pay passport fees online' },
          { title: 'Book Appointment', description: 'Schedule appointment at nearest PSK/POPSK' },
          { title: 'Visit PSK', description: 'Visit Passport Seva Kendra with documents' },
          { title: 'Collect Passport', description: 'Collect passport or opt for postal delivery' }
        ],
        telugu: [
          { title: 'ఆన్‌లైన్ రిజిస్టర్ చేయండి', description: 'పాస్‌పోర్ట్ సేవా పోర్టల్‌లో ఖాతా సృష్టించండి' },
          { title: 'దరఖాస్తు పూరించండి', description: 'ఖచ్చితమైన వివరాలతో ఆన్‌లైన్ దరఖాస్తు ఫారం పూర్తి చేయండి' },
          { title: 'రుసుము చెల్లించండి', description: 'పాస్‌పోర్ట్ రుసుమును ఆన్‌లైన్‌లో చెల్లించండి' },
          { title: 'అపాయింట్‌మెంట్ బుక్ చేయండి', description: 'సమీప PSK/POPSK వద్ద అపాయింట్‌మెంట్ షెడ్యూల్ చేయండి' },
          { title: 'PSK సందర్శించండి', description: 'పత్రాలతో పాస్‌పోర్ట్ సేవా కేంద్రాన్ని సందర్శించండి' },
          { title: 'పాస్‌పోర్ట్ తీసుకోండి', description: 'పాస్‌పోర్ట్‌ను తీసుకోండి లేదా పోస్టల్ డెలివరీ ఎంచుకోండి' }
        ]
      },
      requiredDocs: {
        english: ['Birth Certificate', 'Address Proof', 'Identity Proof', 'Educational Certificates'],
        telugu: ['జన్మ ప్రమాణపత్రం', 'చిరునామా రుజువు', 'గుర్తింపు రుజువు', 'విద్యా సర్టిఫికేట్లు']
      },
      office: { english: 'Passport Seva Kendra', telugu: 'పాస్‌పోర్ట్ సేవా కేంద్రం' },
      timeframe: { english: '30-45 days', telugu: '30-45 రోజులు' },
      fees: { english: '₹1500', telugu: '₹1500' }
    },
    {
      id: 'aadhaar-card',
      title: {
        english: 'Aadhaar Card',
        telugu: 'ఆధార్ కార్డ్'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for unique identification number for government services',
        telugu: 'ప్రభుత్వ సేవల కోసం ప్రత్యేక గుర్తింపు సంఖ్యకు దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          { title: 'Visit Aadhaar Center', description: 'Go to nearest Aadhaar enrollment center' },
          { title: 'Fill Enrollment Form', description: 'Complete the enrollment form with personal details' },
          { title: 'Biometric Capture', description: 'Provide fingerprints, iris scan, and photograph' },
          { title: 'Document Verification', description: 'Submit proof of identity and address' },
          { title: 'Receive Acknowledgment', description: 'Get enrollment receipt with EID number' },
          { title: 'Download e-Aadhaar', description: 'Download from UIDAI website after 90 days' }
        ],
        telugu: [
          { title: 'ఆధార్ కేంద్రాన్ని సందర్శించండి', description: 'సమీప ఆధార్ నమోదు కేంద్రానికి వెళ్లండి' },
          { title: 'నమోదు ఫారం పూరించండి', description: 'వ్యక్తిగత వివరాలతో నమోదు ఫారం పూర్తి చేయండి' },
          { title: 'బయోమెట్రిక్ క్యాప్చర్', description: 'వేలిముద్రలు, కనుసార్లు మరియు ఫోటో అందించండి' },
          { title: 'పత్రాల ధృవీకరణ', description: 'గుర్తింపు మరియు చిరునామా రుజువు సమర్పించండి' },
          { title: 'రసీదు స్వీకరించండి', description: 'EID నంబర్‌తో నమోదు రసీదు పొందండి' },
          { title: 'e-ఆధార్ డౌన్‌లోడ్ చేయండి', description: '90 రోజుల తర్వాత UIDAI వెబ్‌సైట్ నుండి డౌన్‌లోడ్ చేయండి' }
        ]
      },
      requiredDocs: {
        english: ['Proof of Identity', 'Proof of Address', 'Proof of Date of Birth'],
        telugu: ['గుర్తింపు రుజువు', 'చిరునామా రుజువు', 'జన్మ తేదీ రుజువు']
      },
      office: { english: 'Aadhaar Enrollment Center', telugu: 'ఆధార్ నమోదు కేంద్రం' },
      timeframe: { english: '90 days', telugu: '90 రోజులు' },
      fees: { english: 'Free', telugu: 'ఉచితం' }
    },
    {
      id: 'ration-card',
      title: {
        english: 'Ration Card',
        telugu: 'రేషన్ కార్డ్'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for subsidized food grains under Public Distribution System',
        telugu: 'పబ్లిక్ డిస్ట్రిబ్యూషన్ సిస్టమ్ కింద సబ్సిడీ ఆహార ధాన్యాలకు దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          { title: 'Collect Application Form', description: 'Get form from Tahsildar office or download online' },
          { title: 'Fill Form', description: 'Complete form with family and income details' },
          { title: 'Attach Documents', description: 'Attach all required documents and photos' },
          { title: 'Submit Application', description: 'Submit at Tahsildar office with processing fee' },
          { title: 'Verification', description: 'Official verification of documents and family details' },
          { title: 'Collect Card', description: 'Collect ration card from designated office' }
        ],
        telugu: [
          { title: 'దరఖాస్తు ఫారం సేకరించండి', description: 'తహసీల్దార్ కార్యాలయం నుండి ఫారం పొందండి లేదా ఆన్‌లైన్‌లో డౌన్‌లోడ్ చేయండి' },
          { title: 'ఫారం పూరించండి', description: 'కుటుంబం మరియు ఆదాయ వివరాలతో ఫారం పూర్తి చేయండి' },
          { title: 'పత్రాలు జత చేయండి', description: 'అవసరమైన అన్ని పత్రాలను మరియు ఫోటోలను జత చేయండి' },
          { title: 'దరఖాస్తు సమర్పించండి', description: 'ప్రాసెసింగ్ రుసుముతో తహసీల్దార్ కార్యాలయంలో సమర్పించండి' },
          { title: 'ధృవీకరణ', description: 'పత్రాలు మరియు కుటుంబ వివరాల అధికారిక ధృవీకరణ' },
          { title: 'కార్డ్ తీసుకోండి', description: 'నిర్దేశిత కార్యాలయం నుండి రేషన్ కార్డ్‌ను తీసుకోండి' }
        ]
      },
      requiredDocs: {
        english: ['Family Income Certificate', 'Address Proof', 'Identity Proof', 'Family Photos'],
        telugu: ['కుటుంబ ఆదాయ ప్రమాణపత్రం', 'చిరునామా రుజువు', 'గుర్తింపు రుజువు', 'కుటుంబ ఫోటోలు']
      },
      office: { english: 'Tahsildar Office', telugu: 'తహసీల్దార్ కార్యాలయం' },
      timeframe: { english: '30-45 days', telugu: '30-45 రోజులు' },
      fees: { english: '₹25', telugu: '₹25' }
    },
    {
      id: 'voter-id',
      title: {
        english: 'Voter ID',
        telugu: 'ఓటర్ ID'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Register to vote and get Voter ID card for elections',
        telugu: 'ఎన్నికలకు ఓటు వేయడానికి నమోదు చేసుకోండి మరియు ఓటర్ ID కార్డ్ పొందండి'
      },
      steps: {
        english: [
          { title: 'Check Eligibility', description: 'Must be 18+ years and Indian citizen' },
          { title: 'Fill Form 6', description: 'Complete voter registration form online or offline' },
          { title: 'Submit Documents', description: 'Provide age proof, address proof, and identity proof' },
          { title: 'Biometric Verification', description: 'Complete biometric verification if required' },
          { title: 'Verification Process', description: 'Official verification of submitted details' },
          { title: 'Receive Voter ID', description: 'Get Voter ID card at registered address' }
        ],
        telugu: [
          { title: 'అర్హత తనిఖీ చేయండి', description: '18+ వయస్సు మరియు భారతీయ పౌరుడు అయి ఉండాలి' },
          { title: 'ఫారం 6 పూరించండి', description: 'ఆన్‌లైన్ లేదా ఆఫ్‌లైన్‌లో ఓటరు నమోదు ఫారం పూర్తి చేయండి' },
          { title: 'పత్రాలు సమర్పించండి', description: 'వయస్సు రుజువు, చిరునామా రుజువు మరియు గుర్తింపు రుజువు అందించండి' },
          { title: 'బయోమెట్రిక్ ధృవీకరణ', description: 'అవసరమైతే బయోమెట్రిక్ ధృవీకరణ పూర్తి చేయండి' },
          { title: 'ధృవీకరణ ప్రక్రియ', description: 'సమర్పించిన వివరాల అధికారిక ధృవీకరణ' },
          { title: 'ఓటర్ ID స్వీకరించండి', description: 'నమోదిత చిరునామాలో ఓటర్ ID కార్డ్ పొందండి' }
        ]
      },
      requiredDocs: {
        english: ['Age Proof', 'Address Proof', 'Identity Proof', 'Passport size photo'],
        telugu: ['వయస్సు రుజువు', 'చిరునామా రుజువు', 'గుర్తింపు రుజువు', 'పాస్‌పోర్ట్ సైజ్ ఫోటో']
      },
      office: { english: 'Electoral Registration Office', telugu: 'ఎన్నికల నమోదు కార్యాలయం' },
      timeframe: { english: '30-60 days', telugu: '30-60 రోజులు' },
      fees: { english: 'Free', telugu: 'ఉచితం' }
    },
    {
      id: 'driving-license',
      title: {
        english: 'Driving License',
        telugu: 'డ్రైవింగ్ లైసెన్స్'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for driving license to legally drive vehicles',
        telugu: 'వాహనాలు చట్టబద్ధంగా నడపడానికి డ్రైవింగ్ లైసెన్స్‌కు దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          { title: 'Get Learner License', description: 'Apply for learner license first and pass written test' },
          { title: 'Practice Period', description: 'Practice driving for minimum 30 days with learner license' },
          { title: 'Apply for DL', description: 'Apply for permanent driving license online' },
          { title: 'Submit Documents', description: 'Submit required documents at RTO office' },
          { title: 'Driving Test', description: 'Pass practical driving test at RTO' },
          { title: 'Collect License', description: 'Collect driving license from RTO office' }
        ],
        telugu: [
          { title: 'లెర్నర్ లైసెన్స్ పొందండి', description: 'మొదట లెర్నర్ లైసెన్స్‌కు దరఖాస్తు చేసి, వ్రాత పరీక్షలో పాస్ అవ్వండి' },
          { title: 'అభ్యాస కాలం', description: 'లెర్నర్ లైసెన్స్‌తో కనీసం 30 రోజులు డ్రైవింగ్ అభ్యసించండి' },
          { title: 'DL కోసం దరఖాస్తు చేయండి', description: 'శాశ్వత డ్రైవింగ్ లైసెన్స్ కోసం ఆన్‌లైన్‌లో దరఖాస్తు చేయండి' },
          { title: 'పత్రాలు సమర్పించండి', description: 'RTO కార్యాలయంలో అవసరమైన పత్రాలను సమర్పించండి' },
          { title: 'డ్రైవింగ్ టెస్ట్', description: 'RTO వద్ద ప్రాక్టికల్ డ్రైవింగ్ టెస్ట్‌లో పాస్ అవ్వండి' },
          { title: 'లైసెన్స్ తీసుకోండి', description: 'RTO కార్యాలయం నుండి డ్రైవింగ్ లైసెన్స్‌ను తీసుకోండి' }
        ]
      },
      requiredDocs: {
        english: ['Learner License', 'Address Proof', 'Age Proof', 'Medical Certificate'],
        telugu: ['లెర్నర్ లైసెన్స్', 'చిరునామా రుజువు', 'వయస్సు రుజువు', 'వైద్య ప్రమాణపత్రం']
      },
      office: { english: 'RTO Office', telugu: 'RTO కార్యాలయం' },
      timeframe: { english: '30-45 days', telugu: '30-45 రోజులు' },
      fees: { english: '₹200', telugu: '₹200' }
    },
    {
      id: 'domicile-cert',
      title: {
        english: 'Domicile Certificate',
        telugu: 'నివాస ప్రమాణపత్రం'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Proof of residence in Telangana for state benefits',
        telugu: 'రాష్ట్ర ప్రయోజనాల కోసం తెలంగాణలో నివాస రుజువు'
      },
      steps: {
        english: [
          { title: 'Collect Application', description: 'Get domicile certificate application form' },
          { title: 'Fill Details', description: 'Complete form with residence and personal details' },
          { title: 'Attach Proofs', description: 'Attach residence proof documents for required years' },
          { title: 'Submit Application', description: 'Submit at Tahsildar office with fees' },
          { title: 'Verification', description: 'Official verification of residence claims' },
          { title: 'Collect Certificate', description: 'Collect domicile certificate from office' }
        ],
        telugu: [
          { title: 'దరఖాస్తు సేకరించండి', description: 'నివాస ప్రమాణపత్ర దరఖాస్తు ఫారం పొందండి' },
          { title: 'వివరాలు పూరించండి', description: 'నివాసం మరియు వ్యక్తిగత వివరాలతో ఫారం పూర్తి చేయండి' },
          { title: 'రుజువులు జత చేయండి', description: 'అవసరమైన సంవత్సరాలకు నివాస రుజువు పత్రాలను జత చేయండి' },
          { title: 'దరఖాస్తు సమర్పించండి', description: 'రుసుముతో తహసీల్దార్ కార్యాలయంలో సమర్పించండి' },
          { title: 'ధృవీకరణ', description: 'నివాస దావాల అధికారిక ధృవీకరణ' },
          { title: 'ప్రమాణపత్రం తీసుకోండి', description: 'కార్యాలయం నుండి నివాస ప్రమాణపత్రాన్ని తీసుకోండి' }
        ]
      },
      requiredDocs: {
        english: ['Residence Proof (5-10 years)', 'Educational Certificates', 'Employment Records', 'Property Documents'],
        telugu: ['నివాస రుజువు (5-10 సంవత్సరాలు)', 'విద్యా సర్టిఫికేట్లు', 'ఉద్యోగ రికార్డులు', 'ఆస్తి పత్రాలు']
      },
      office: { english: 'Tahsildar Office', telugu: 'తహసీల్దార్ కార్యాలయం' },
      timeframe: { english: '15-30 days', telugu: '15-30 రోజులు' },
      fees: { english: '₹50', telugu: '₹50' }
    },
    {
      id: 'disability-cert',
      title: {
        english: 'Disability Certificate',
        telugu: 'వైకల్య ప్రమాణపత్రం'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Certificate for persons with disabilities for benefits and reservations',
        telugu: 'ప్రయోజనాలు మరియు రిజర్వేషన్ల కోసం వైకల్యం ఉన్న వ్యక్తుల ప్రమాణపత్రం'
      },
      steps: {
        english: [
          { title: 'Medical Examination', description: 'Get examined by certified medical board' },
          { title: 'Fill Application', description: 'Complete disability certificate application form' },
          { title: 'Submit Medical Reports', description: 'Submit detailed medical reports and test results' },
          { title: 'Board Assessment', description: 'Medical board assesses disability percentage' },
          { title: 'Certificate Processing', description: 'Processing of certificate based on assessment' },
          { title: 'Collect Certificate', description: 'Collect disability certificate from issuing authority' }
        ],
        telugu: [
          { title: 'వైద్య పరీక్ష', description: 'ధృవీకృత వైద్య బోర్డుచే పరీక్షించుకోండి' },
          { title: 'దరఖాస్తు పూరించండి', description: 'వైకల్య ప్రమాణపత్ర దరఖాస్తు ఫారం పూర్తి చేయండి' },
          { title: 'వైద్య నివేదికలు సమర్పించండి', description: 'వివరణాత్మక వైద్య నివేదికలు మరియు పరీక్ష ఫలితాలను సమర్పించండి' },
          { title: 'బోర్డు అంచనా', description: 'వైద్య బోర్డు వైకల్య శాతాన్ని అంచనా వేస్తుంది' },
          { title: 'ప్రమాణపత్ర ప్రాసెసింగ్', description: 'అంచనా ఆధారంగా ప్రమాణపత్ర ప్రాసెసింగ్' },
          { title: 'ప్రమాణపత్రం తీసుకోండి', description: 'జారీ చేసే అధ్యక్షుల నుండి వైకల్య ప్రమాణపత్రాన్ని తీసుకోండి' }
        ]
      },
      requiredDocs: {
        english: ['Medical Reports', 'Identity Proof', 'Address Proof', 'Passport Photos', 'Previous Disability Certificate (if any)'],
        telugu: ['వైద్య నివేదికలు', 'గుర్తింపు రుజువు', 'చిరునామా రుజువు', 'పాస్‌పోర్ట్ ఫోటోలు', 'మునుపటి వైకల్య ప్రమాణపత్రం (ఉంటే)']
      },
      office: { english: 'District Medical Board', telugu: 'జిల్లా వైద్య బోర్డు' },
      timeframe: { english: '30-60 days', telugu: '30-60 రోజులు' },
      fees: { english: 'Free', telugu: 'ఉచితం' }
    }
  ];

  const openCardDetails = (card: ProcessCard) => {
    setSelectedCard(card);
  };

  const closeCardDetails = () => {
    setSelectedCard(null);
  };

  const handleDownloadGuide = (card: ProcessCard) => {
    const content = {
      title: card.title[language],
      description: card.description[language],
      steps: card.steps[language],
      documents: card.requiredDocs[language],
      office: card.office[language],
      timeframe: card.timeframe[language],
      fees: card.fees[language]
    };
    generatePDF(content, `${card.title.english}-guide.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#3c392b] mb-4">
          {t('enagrik.title')}
        </h2>
        <p className="text-lg text-[#5d5c54]">
          {t('enagrik.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#3c392b]">
                {card.title[language]}
              </h3>
            </div>

            <p className="text-[#5d5c54] mb-6 text-sm leading-relaxed">
              {card.description[language]}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => openCardDetails(card)}
                className="flex-1 bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center space-x-2"
              >
                <Eye size={16} />
                <span>{t('enagrik.viewSteps')}</span>
              </button>
              
              <button
                onClick={() => handleDownloadGuide(card)}
                className="bg-[#cbccc1] text-[#3c392b] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for card details */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#cbccc1] p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-[#3c392b]">
                {selectedCard.title[language]}
              </h3>
              <button
                onClick={closeCardDetails}
                className="text-[#5d5c54] hover:text-[#3c392b] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-[#5d5c54] mb-8">
                {selectedCard.description[language]}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-[#3c392b] mb-4">Process Steps</h4>
                  <div className="space-y-4">
                    {selectedCard.steps[language].map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-[#44646f] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mt-1">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-[#3c392b] mb-1">{step.title}</h5>
                          <p className="text-[#5d5c54] text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#3c392b] mb-4">{t('tdocs.required')}</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedCard.requiredDocs[language].map((doc, index) => (
                      <li key={index} className="text-[#5d5c54] text-sm flex items-center">
                        <ArrowRight size={16} className="text-[#44646f] mr-2" />
                        {doc}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#e1dbd1] rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-[#3c392b]">{t('tdocs.office')}</span>
                        <p className="text-[#5d5c54]">{selectedCard.office[language]}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#3c392b]">{t('tdocs.time')}</span>
                        <p className="text-[#5d5c54]">{selectedCard.timeframe[language]}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-[#3c392b]">Fees:</span>
                        <p className="text-[#5d5c54]">{selectedCard.fees[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#cbccc1] flex justify-center">
                <button
                  onClick={() => handleDownloadGuide(selectedCard)}
                  className="bg-[#44646f] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                >
                  <Download size={20} />
                  <span>{t('enagrik.downloadGuide')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ENagrikCards;
