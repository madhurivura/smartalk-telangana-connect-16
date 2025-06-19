
import React, { useState } from 'react';
import { FileText, Download, ArrowLeft, User, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { generatePDF } from '@/utils/pdfGenerator';

interface DocumentRecommendation {
  id: string;
  name: { english: string; telugu: string };
  purpose: { english: string; telugu: string };
  requiredDocuments: { english: string[]; telugu: string[] };
  process: { english: string[]; telugu: string[] };
  office: { english: string; telugu: string };
  timeframe: { english: string; telugu: string };
  priority: 'high' | 'medium' | 'low';
}

interface Scheme {
  id: string;
  name: { english: string; telugu: string };
  description: { english: string; telugu: string };
  eligibility: { english: string; telugu: string };
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
      question: t('tdocs.employment_question') || 'What is your employment status?',
      options: [
        { value: 'student', label: t('tdocs.student') || 'Student' },
        { value: 'self_employed', label: t('tdocs.self_employed') || 'Self-Employed' },
        { value: 'govt_job', label: t('tdocs.govt_job') || 'Government Job' },
        { value: 'private_job', label: t('tdocs.private_job') || 'Private Job' },
        { value: 'unemployed', label: t('tdocs.unemployed') || 'Unemployed' }
      ]
    },
    {
      id: 'ageGroup',
      question: t('tdocs.ageGroup') || 'What is your age group?',
      options: [
        { value: 'below18', label: t('tdocs.below18') || 'Below 18' },
        { value: '18-25', label: t('tdocs.18-25') || '18-25 years' },
        { value: '26-40', label: t('tdocs.26-40') || '26-40 years' },
        { value: '41-60', label: t('tdocs.41-60') || '41-60 years' },
        { value: 'above60', label: t('tdocs.above60') || 'Above 60' }
      ]
    },
    {
      id: 'income',
      question: t('tdocs.income_question') || 'What is your annual family income?',
      options: [
        { value: 'below1l', label: t('tdocs.below1l') || 'Below ₹1 Lakh' },
        { value: '1l-2.5l', label: t('tdocs.1l-2.5l') || '₹1L - ₹2.5L' },
        { value: '2.5l-5l', label: t('tdocs.2.5l-5l') || '₹2.5L - ₹5L' },
        { value: 'above5l', label: t('tdocs.above5l') || 'Above ₹5 Lakh' }
      ]
    },
    {
      id: 'category',
      question: t('tdocs.category') || 'What is your caste category?',
      options: [
        { value: 'general', label: t('tdocs.general') || 'General' },
        { value: 'obc', label: t('tdocs.obc') || 'OBC' },
        { value: 'sc', label: t('tdocs.sc') || 'SC' },
        { value: 'st', label: t('tdocs.st') || 'ST' }
      ]
    },
    {
      id: 'region',
      question: t('tdocs.region_question') || 'What is your region type?',
      options: [
        { value: 'urban', label: t('tdocs.urban') || 'Urban' },
        { value: 'rural', label: t('tdocs.rural') || 'Rural' }
      ]
    },
    {
      id: 'gender',
      question: t('tdocs.gender_question') || 'What is your gender?',
      options: [
        { value: 'male', label: t('tdocs.male') || 'Male' },
        { value: 'female', label: t('tdocs.female') || 'Female' },
        { value: 'other', label: t('tdocs.other') || 'Other' }
      ]
    }
  ];

  const documentDatabase: DocumentRecommendation[] = [
    {
      id: 'income-cert',
      name: { english: 'Income Certificate', telugu: 'ఆదాయ ప్రమాణపత్రం' },
      purpose: { english: 'Proof of family income', telugu: 'కుటుంబ ఆదాయ రుజువు' },
      requiredDocuments: {
        english: ['Application form', 'Salary certificates', 'Aadhaar card', 'Ration card', 'Bank statements'],
        telugu: ['దరఖాస్తు ఫారం', 'జీతం ప్రమాణపత్రాలు', 'ఆధార్ కార్డ్', 'రేషన్ కార్డ్', 'బ్యాంక్ స్టేట్‌మెంట్లు']
      },
      process: {
        english: ['Fill application', 'Attach documents', 'Submit at Tahsildar office', 'Pay fee', 'Collect certificate'],
        telugu: ['దరఖాస్తు పూరించండి', 'పత్రాలు జతచేయండి', 'తహసీల్దార్ కార్యాలయంలో సమర్పించండి', 'రుసుము చెల్లించండి', 'ప్రమాణపత్రం తీసుకోండి']
      },
      office: { english: 'Tahsildar Office', telugu: 'తహసీల్దార్ కార్యాలయం' },
      timeframe: { english: '15-30 days', telugu: '15-30 రోజులు' },
      priority: 'high'
    },
    {
      id: 'caste-cert',
      name: { english: 'Caste Certificate', telugu: 'కుల ప్రమాణపత్రం' },
      purpose: { english: 'Proof of caste for reservations', telugu: 'రిజర్వేషన్ల కోసం కుల రుజువు' },
      requiredDocuments: {
        english: ['Application form', 'Birth certificate', 'School certificates', 'Parent caste certificate', 'Aadhaar card'],
        telugu: ['దరఖాస్తు ఫారం', 'జనన ప్రమాణపత్రం', 'పాఠశాల ప్రమాణపత్రాలు', 'తల్లిదండ్రుల కుల ప్రమాణపత్రం', 'ఆధార్ కార్డ్']
      },
      process: {
        english: ['Apply online/offline', 'Document verification', 'Field inquiry', 'Approval', 'Certificate issuance'],
        telugu: ['ఆన్‌లైన్/ఆఫ్‌లైన్ దరఖాస్తు', 'పత్రాల ధృవీకరణ', 'క్షేత్ర విచారణ', 'ఆమోదం', 'ప్రమాణపత్రం జారీ']
      },
      office: { english: 'MRO Office', telugu: 'MRO కార్యాలయం' },
      timeframe: { english: '30-45 days', telugu: '30-45 రోజులు' },
      priority: 'high'
    },
    {
      id: 'study-cert',
      name: { english: 'Study Certificate', telugu: 'అధ్యయన ప్రమాణపత్రం' },
      purpose: { english: 'For educational purposes', telugu: 'విద్యా ప్రయోజనాల కోసం' },
      requiredDocuments: {
        english: ['School leaving certificate', 'Mark sheets', 'Transfer certificate', 'Aadhaar card'],
        telugu: ['పాఠశాల వదిలిపెట్టిన ప్రమాణపత్రం', 'మార్కు షీట్లు', 'బదిలీ ప్రమాణపత్రం', 'ఆధార్ కార్డ్']
      },
      process: {
        english: ['Apply at institution', 'Submit documents', 'Pay fees', 'Collect certificate'],
        telugu: ['సంస్థలో దరఖాస్తు', 'పత్రాలు సమర్పించండి', 'రుసుము చెల్లించండి', 'ప్రమాణపత్రం తీసుకోండి']
      },
      office: { english: 'Educational Institution', telugu: 'విద్యా సంస్థ' },
      timeframe: { english: '7-15 days', telugu: '7-15 రోజులు' },
      priority: 'medium'
    },
    {
      id: 'domicile-cert',
      name: { english: 'Domicile Certificate', telugu: 'నివాస ప్రమాణపత్రం' },
      purpose: { english: 'Proof of residence', telugu: 'నివాస రుజువు' },
      requiredDocuments: {
        english: ['Application form', 'Birth certificate', 'Educational certificates', 'Aadhaar card', 'Ration card'],
        telugu: ['దరఖాస్తు ఫారం', 'జనన ప్రమాణపత్రం', 'విద్యా ప్రమాణపత్రాలు', 'ఆధార్ కార్డ్', 'రేషన్ కార్డ్']
      },
      process: {
        english: ['Submit application', 'Document verification', 'Field verification', 'Certificate issuance'],
        telugu: ['దరఖాస్తు సమర్పణ', 'పత్రాల ధృవీకరణ', 'క్షేత్ర ధృవీకరణ', 'ప్రమాణపత్రం జారీ']
      },
      office: { english: 'MRO Office', telugu: 'MRO కార్యాలయం' },
      timeframe: { english: '30 days', telugu: '30 రోజులు' },
      priority: 'medium'
    },
    {
      id: 'pension-cert',
      name: { english: 'Pension Application', telugu: 'పెన్షన్ దరఖాస్తు' },
      purpose: { english: 'Old age/widow/disability pension', telugu: 'వృద్ధాప్య/వితంతువు/వైకల్య పెన్షన్' },
      requiredDocuments: {
        english: ['Age proof', 'Income certificate', 'Bank details', 'Aadhaar card', 'Medical certificate'],
        telugu: ['వయసు రుజువు', 'ఆదాయ ప్రమాణపత్రం', 'బ్యాంక్ వివరాలు', 'ఆధార్ కార్డ్', 'వైద్య ప్రమాణపత్రం']
      },
      process: {
        english: ['Fill pension form', 'Submit at VRO', 'Medical examination', 'Verification', 'Approval'],
        telugu: ['పెన్షన్ ఫారం పూరించండి', 'VROలో సమర్పించండి', 'వైద్య పరీక్ష', 'ధృవీకరణ', 'ఆమోదం']
      },
      office: { english: 'VRO Office', telugu: 'VRO కార్యాలయం' },
      timeframe: { english: '30-45 days', telugu: '30-45 రోజులు' },
      priority: 'high'
    },
    {
      id: 'business-reg',
      name: { english: 'Business Registration', telugu: 'వ్యాపార నమోదు' },
      purpose: { english: 'Register business/shop', telugu: 'వ్యాపారం/దుకాణం నమోదు' },
      requiredDocuments: {
        english: ['Application form', 'Address proof', 'Identity proof', 'NOC from owner', 'Photographs'],
        telugu: ['దరఖాస్తు ఫారం', 'చిరునామా రుజువు', 'గుర్తింపు రుజువు', 'యజమాని NOC', 'ఫోటోలు']
      },
      process: {
        english: ['Submit application', 'Pay registration fee', 'Inspection', 'License issuance'],
        telugu: ['దరఖాస్తు సమర్పణ', 'నమోదు రుసుము చెల్లింపు', 'తనిఖీ', 'లైసెన్స్ జారీ']
      },
      office: { english: 'Municipal Office', telugu: 'మునిసిపల్ కార్యాలయం' },
      timeframe: { english: '15-20 days', telugu: '15-20 రోజులు' },
      priority: 'high'
    }
  ];

  const schemeDatabase: Scheme[] = [
    {
      id: 'kalyan-lakshmi',
      name: { english: 'Kalyan Lakshmi Scheme', telugu: 'కల్యాణ లక్ష్మి పథకం' },
      description: { english: 'Financial assistance for marriages', telugu: 'వివాహాలకు ఆర్థిక సహాయం' },
      eligibility: { english: 'SC/ST/BC families, Income below ₹2L', telugu: 'SC/ST/BC కుటుంబాలు, ఆదాయం ₹2L కంటే తక్కువ' }
    },
    {
      id: 'rythu-bandhu',
      name: { english: 'Rythu Bandhu', telugu: 'రైతు బంధు' },
      description: { english: 'Investment support for farmers', telugu: 'రైతులకు పెట్టుబడి మద్దతు' },
      eligibility: { english: 'Land-owning farmers', telugu: 'భూమి గల రైతులు' }
    },
    {
      id: 'fee-reimbursement',
      name: { english: 'Fee Reimbursement', telugu: 'ఫీజు రీయింబర్స్‌మెంట్' },
      description: { english: 'Education fee support', telugu: 'విద్యా రుసుము మద్దతు' },
      eligibility: { english: 'Students from reserved categories', telugu: 'రిజర్వు వర్గాల విద్యార్థులు' }
    },
    {
      id: 'aasara-pensions',
      name: { english: 'Aasara Pensions', telugu: 'ఆసర పెన్షన్లు' },
      description: { english: 'Monthly pension for elderly', telugu: 'వృద్ధులకు నెలవారీ పెన్షన్' },
      eligibility: { english: 'Age 60+, Income below ₹2L', telugu: 'వయసు 60+, ఆదాయం ₹2L కంటే తక్కువ' }
    },
    {
      id: 'mudra-loan',
      name: { english: 'Mudra Loan Scheme', telugu: 'ముద్రా రుణ పథకం' },
      description: { english: 'Micro business loans', telugu: 'చిన్న వ్యాపార రుణాలు' },
      eligibility: { english: 'Small business owners', telugu: 'చిన్న వ్యాపారుల‌కు' }
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
    const employment = questions[0].options.find(o => o.value === userAnswers.employment)?.label;
    const ageGroup = questions[1].options.find(o => o.value === userAnswers.ageGroup)?.label;
    const income = questions[2].options.find(o => o.value === userAnswers.income)?.label;
    const category = questions[3].options.find(o => o.value === userAnswers.category)?.label;
    const region = questions[4].options.find(o => o.value === userAnswers.region)?.label;
    const gender = questions[5].options.find(o => o.value === userAnswers.gender)?.label;

    return { employment, ageGroup, income, category, region, gender };
  };

  const handleDownloadPDF = () => {
    const profile = getProfileSummary();
    const content = {
      title: 'T-Docs Personalized Recommendations',
      description: `Based on your profile: ${profile.employment}, ${profile.ageGroup}, ${profile.income} income, ${profile.category} category, ${profile.region} region, ${profile.gender}`,
      documents: recommendations.map(doc => `${doc.name.english} - ${doc.purpose.english}`),
      process: recommendations.flatMap(doc => doc.process.english),
      steps: eligibleSchemes.map((scheme, index) => ({
        title: scheme.name.english,
        description: `${scheme.description.english} - Eligibility: ${scheme.eligibility.english}`
      }))
    };
    generatePDF(content, 'tdocs-recommendations.pdf');
  };

  if (recommendations.length > 0) {
    const profile = getProfileSummary();
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Profile Summary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-[#44646f] to-[#3c392b] rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <User className="mr-3" size={28} />
              Based on your profile...
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
              <div><strong>Income:</strong> {profile.income}</div>
              <div><strong>Category:</strong> {profile.category}</div>
              <div><strong>Gender:</strong> {profile.gender}</div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-[#3c392b] mb-6 flex items-center">
              <FileText className="mr-3" size={24} />
              Required Documents
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
                        {doc.priority === 'high' ? 'High Priority' : 
                         doc.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </span>
                    </div>
                    <FileText size={24} className="text-[#44646f]" />
                  </div>
                  
                  <div className="text-sm text-[#5d5c54] space-y-1">
                    <div><strong>Office:</strong> {doc.office[language]}</div>
                    <div><strong>Time:</strong> {doc.timeframe[language]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligible Schemes */}
          {eligibleSchemes.length > 0 && (
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-[#3c392b] mb-6">Eligible Schemes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eligibleSchemes.map((scheme) => (
                  <div key={scheme.id} className="bg-gradient-to-br from-[#e1dbd1] to-[#cbccc1] rounded-lg p-4">
                    <h5 className="font-semibold text-[#3c392b] mb-2">{scheme.name[language]}</h5>
                    <p className="text-sm text-[#5d5c54] mb-2">{scheme.description[language]}</p>
                    <p className="text-xs text-[#44646f]"><strong>Eligibility:</strong> {scheme.eligibility[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="bg-[#44646f] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>Download Complete Report</span>
            </button>
            <button
              onClick={resetForm}
              className="bg-[#cbccc1] text-[#3c392b] px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Start Over
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
            {t('tdocs.title') || 'T-Docs: Document Finder'}
          </h3>
          <p className="text-[#5d5c54]">
            Answer these questions to get personalized document recommendations
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
            {questions[currentStep].question}
          </h4>
          <div className="space-y-3">
            {questions[currentStep].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                className="w-full text-left p-4 border border-[#cbccc1] rounded-lg hover:bg-[#e1dbd1] hover:border-[#44646f] transition-colors"
              >
                {option.label}
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
            <span>Back</span>
          </button>
          
          <div className="text-sm text-[#5d5c54]">
            {currentStep + 1} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TDocsSystem;
