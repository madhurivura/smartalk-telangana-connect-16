
import React, { useState } from 'react';
import { Volume2, Mic, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserProfile {
  age: string;
  employment: string;
  income: string;
  category: string;
  region: string;
  gender: string;
  maritalStatus: string;
  disability: string;
  familySize: string;
  education: string;
  housingType: string;
  landOwnership: string;
  chronicIllness: string;
}

interface Scheme {
  schemeName: string;
  description: string;
  benefit: string;
  eligibility: string[];
  link: string;
}

const EnhancedSchemeQuestionnaire = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    employment: '',
    income: '',
    category: '',
    region: '',
    gender: '',
    maritalStatus: '',
    disability: '',
    familySize: '',
    education: '',
    housingType: '',
    landOwnership: '',
    chronicIllness: ''
  });
  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[]>([]);

  // Static dataset of Telangana government schemes
  const schemes: Scheme[] = [
    {
      schemeName: "Kalyana Lakshmi Scheme",
      description: "Financial assistance for marriages of girls from poor families",
      benefit: "₹1,01,116 financial assistance",
      eligibility: ["female", "below25", "below2.5L", "unmarried"],
      link: "https://telanganaepass.cgg.gov.in/"
    },
    {
      schemeName: "Shaadi Mubarak Scheme",
      description: "Marriage assistance for Muslim girls",
      benefit: "₹1,01,116 financial assistance",
      eligibility: ["female", "muslim", "below25", "unmarried"],
      link: "https://telanganaepass.cgg.gov.in/"
    },
    {
      schemeName: "Aasara Pensions - Old Age",
      description: "Monthly pension for senior citizens",
      benefit: "₹2,016 per month",
      eligibility: ["above60", "below2.5L", "rural", "urban"],
      link: "https://webland.telangana.gov.in/"
    },
    {
      schemeName: "Aasara Pensions - Widow",
      description: "Monthly pension for widows",
      benefit: "₹2,016 per month",
      eligibility: ["widow", "below2.5L", "18-60"],
      link: "https://webland.telangana.gov.in/"
    },
    {
      schemeName: "Aasara Pensions - Disability",
      description: "Monthly pension for disabled persons",
      benefit: "₹3,016 per month",
      eligibility: ["disability", "below2.5L"],
      link: "https://webland.telangana.gov.in/"
    },
    {
      schemeName: "Rythu Bandhu Scheme",
      description: "Investment support for farmers",
      benefit: "₹10,000 per acre per year",
      eligibility: ["landOwnership", "farmer", "rural"],
      link: "https://webland.telangana.gov.in/"
    },
    {
      schemeName: "KCR Kit Scheme",
      description: "Nutrition kit for pregnant and lactating mothers",
      benefit: "Nutrition kit worth ₹12,000",
      eligibility: ["female", "pregnant", "lactating", "below5L"],
      link: "https://telanganaepass.cgg.gov.in/"
    },
    {
      schemeName: "TS Vidya Volunteers",
      description: "Teaching support in government schools",
      benefit: "₹12,000 monthly honorarium",
      eligibility: ["graduation", "unemployed", "below35"],
      link: "https://schooledu.telangana.gov.in/"
    },
    {
      schemeName: "Minority Welfare Scholarships",
      description: "Educational scholarships for minority students",
      benefit: "Up to ₹50,000 per year",
      eligibility: ["minority", "student", "below5L"],
      link: "https://telanganaepass.cgg.gov.in/"
    },
    {
      schemeName: "BC Welfare Hostel",
      description: "Free hostel accommodation for BC students",
      benefit: "Free accommodation and food",
      eligibility: ["obc", "student", "below2.5L"],
      link: "https://telanganaepass.cgg.gov.in/"
    }
  ];

  const steps = [
    {
      title: t('schemes.questionnaire.personalInfo'),
      questions: [
        {
          key: 'age' as keyof UserProfile,
          question: t('tdocs.ageGroup'),
          options: [
            { value: 'below18', label: t('tdocs.below18') },
            { value: '18-25', label: '18-25 वर्ष / years / సంవత్సరాలు' },
            { value: '26-40', label: '26-40 वर्ष / years / సంవత్సరాలు' },
            { value: '41-60', label: '41-60 वर्ष / years / సంవత్సరాలు' },
            { value: 'above60', label: t('tdocs.above60') }
          ]
        },
        {
          key: 'gender' as keyof UserProfile,
          question: 'लिंग / Gender / లింగం',
          options: [
            { value: 'male', label: 'पुरुष / Male / పురుషుడు' },
            { value: 'female', label: 'महिला / Female / స్త్రీ' },
            { value: 'other', label: 'अन्य / Other / ఇతర' }
          ]
        },
        {
          key: 'maritalStatus' as keyof UserProfile,
          question: t('schemes.questionnaire.maritalStatus'),
          options: [
            { value: 'single', label: t('schemes.questionnaire.single') },
            { value: 'married', label: t('schemes.questionnaire.married') },
            { value: 'widow', label: t('schemes.questionnaire.widow') },
            { value: 'separated', label: t('schemes.questionnaire.separated') }
          ]
        }
      ]
    },
    {
      title: t('schemes.questionnaire.economicInfo'),
      questions: [
        {
          key: 'employment' as keyof UserProfile,
          question: 'रोजगार स्थिति / Employment / ఉద్యోగ స్థితి',
          options: [
            { value: 'student', label: 'छात्र / Student / విద్యార్థి' },
            { value: 'selfEmployed', label: 'स्व-रोजगार / Self-employed / స్వయం ఉద్యోగం' },
            { value: 'govtJob', label: 'सरकारी नौकरी / Govt Job / ప్రభుత్వ ఉద్యోగం' },
            { value: 'privateJob', label: 'निजी नौकरी / Private Job / ప్రైవేట్ ఉద్యోగం' },
            { value: 'unemployed', label: 'बेरोजगार / Unemployed / నిరుద్యోగి' }
          ]
        },
        {
          key: 'income' as keyof UserProfile,
          question: t('tdocs.income'),
          options: [
            { value: 'below1L', label: '1 लाख से कम / Below 1L / 1లక్ష కంటే తక్కువ' },
            { value: '1L-2.5L', label: '1-2.5 लाख / 1-2.5L / 1-2.5లక్షలు' },
            { value: '2.5L-5L', label: '2.5-5 लाख / 2.5-5L / 2.5-5లక్షలు' },
            { value: 'above5L', label: '5 लाख से अधिक / Above 5L / 5లక్షలకు మించి' }
          ]
        },
        {
          key: 'category' as keyof UserProfile,
          question: t('tdocs.category'),
          options: [
            { value: 'general', label: t('tdocs.general') },
            { value: 'obc', label: t('tdocs.obc') },
            { value: 'sc', label: t('tdocs.sc') },
            { value: 'st', label: t('tdocs.st') }
          ]
        }
      ]
    },
    {
      title: t('schemes.questionnaire.familyInfo'),
      questions: [
        {
          key: 'familySize' as keyof UserProfile,
          question: t('schemes.questionnaire.familySize'),
          options: [
            { value: '1-2', label: '1-2 सदस्य / members / సభ్యులు' },
            { value: '3-4', label: '3-4 सदस्य / members / సభ్యులు' },
            { value: '5-6', label: '5-6 सदस्य / members / సభ్యులు' },
            { value: 'above6', label: '6 से अधिक / Above 6 / 6కు మించి' }
          ]
        },
        {
          key: 'region' as keyof UserProfile,
          question: 'क्षेत्र / Region / ప్రాంతం',
          options: [
            { value: 'urban', label: 'शहरी / Urban / పట్టణ' },
            { value: 'rural', label: 'ग्रामीण / Rural / గ్రామీణ' }
          ]
        },
        {
          key: 'housingType' as keyof UserProfile,
          question: t('schemes.questionnaire.housingType'),
          options: [
            { value: 'owned', label: t('schemes.questionnaire.owned') },
            { value: 'rented', label: t('schemes.questionnaire.rented') },
            { value: 'homeless', label: t('schemes.questionnaire.homeless') }
          ]
        }
      ]
    },
    {
      title: t('schemes.questionnaire.educationInfo'),
      questions: [
        {
          key: 'education' as keyof UserProfile,
          question: t('schemes.questionnaire.education'),
          options: [
            { value: 'illiterate', label: t('schemes.questionnaire.illiterate') },
            { value: 'primary', label: t('schemes.questionnaire.primary') },
            { value: 'secondary', label: t('schemes.questionnaire.secondary') },
            { value: 'graduation', label: t('schemes.questionnaire.graduation') },
            { value: 'postGraduation', label: t('schemes.questionnaire.postGraduation') }
          ]
        }
      ]
    },
    {
      title: t('schemes.questionnaire.healthInfo'),
      questions: [
        {
          key: 'disability' as keyof UserProfile,
          question: t('schemes.questionnaire.disability'),
          options: [
            { value: 'yes', label: t('schemes.questionnaire.yes') },
            { value: 'no', label: t('schemes.questionnaire.no') }
          ]
        },
        {
          key: 'chronicIllness' as keyof UserProfile,
          question: t('schemes.questionnaire.chronicIllness'),
          options: [
            { value: 'yes', label: t('schemes.questionnaire.yes') },
            { value: 'no', label: t('schemes.questionnaire.no') }
          ]
        },
        {
          key: 'landOwnership' as keyof UserProfile,
          question: t('schemes.questionnaire.landOwnership'),
          options: [
            { value: 'yes', label: t('schemes.questionnaire.yes') },
            { value: 'no', label: t('schemes.questionnaire.no') }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (key: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const mapProfileToEligibility = (profile: UserProfile): string[] => {
    const eligibilityValues = [];
    
    // Age mapping
    if (profile.age) eligibilityValues.push(profile.age);
    
    // Gender mapping
    if (profile.gender) eligibilityValues.push(profile.gender);
    
    // Marital status mapping
    if (profile.maritalStatus) eligibilityValues.push(profile.maritalStatus);
    
    // Income mapping
    if (profile.income === 'below1L' || profile.income === '1L-2.5L') {
      eligibilityValues.push('below2.5L');
    } else if (profile.income === '2.5L-5L') {
      eligibilityValues.push('below5L');
    }
    
    // Category mapping
    if (profile.category) eligibilityValues.push(profile.category);
    
    // Region mapping
    if (profile.region) eligibilityValues.push(profile.region);
    
    // Employment mapping
    if (profile.employment) eligibilityValues.push(profile.employment);
    
    // Education mapping
    if (profile.education) eligibilityValues.push(profile.education);
    
    // Disability mapping
    if (profile.disability === 'yes') eligibilityValues.push('disability');
    
    // Land ownership mapping
    if (profile.landOwnership === 'yes') eligibilityValues.push('landOwnership');
    
    return eligibilityValues;
  };

  const getRecommendations = () => {
    const userEligibility = mapProfileToEligibility(profile);
    console.log('User Eligibility:', userEligibility);
    
    const matched = schemes.filter(scheme => {
      const matchCount = scheme.eligibility.filter(criteria => 
        userEligibility.includes(criteria)
      ).length;
      
      console.log(`Scheme: ${scheme.schemeName}, Matches: ${matchCount}`);
      return matchCount >= 2;
    });
    
    console.log('Matched Schemes:', matched);
    setMatchedSchemes(matched);
    setCurrentStep(steps.length);
  };

  if (currentStep >= steps.length) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-[#3c392b] mb-6 text-center">
          आपके लिए उपयुक्त योजनाएं / Eligible Schemes / మీకు అర్హత ఉన్న పథకాలు
        </h3>
        
        {matchedSchemes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {matchedSchemes.map((scheme, index) => (
              <div key={index} className="bg-[#cbccc1] bg-opacity-30 rounded-lg p-6 border border-[#e1dbd1]">
                <h4 className="text-xl font-semibold text-[#3c392b] mb-3">
                  {scheme.schemeName}
                </h4>
                <p className="text-[#5d5c54] mb-3">
                  {scheme.description}
                </p>
                <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-3 mb-4">
                  <p className="font-medium text-[#3c392b]">
                    <strong>लाभ / Benefit / ప్రయోజనం:</strong> {scheme.benefit}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-[#3c392b] mb-2">
                    पात्रता / Eligibility / అర్హత:
                  </p>
                  <ul className="list-disc list-inside text-[#5d5c54] space-y-1">
                    {scheme.eligibility.map((criteria, idx) => (
                      <li key={idx} className="text-sm">
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => window.open(scheme.link, '_blank')}
                  className="bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                >
                  <span>और जानें / Know More / మరింత తెలుసుకోండి</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#5d5c54] mb-6 text-lg">
              आपकी जानकारी के आधार पर कोई मिलान करने वाली योजना नहीं मिली।
            </p>
            <p className="text-[#5d5c54] mb-6 text-lg">
              Based on your information, no matching schemes were found.
            </p>
            <p className="text-[#5d5c54] mb-6 text-lg">
              మీ సమాచారం ఆధారంగా, మ్యాచింగ్ పథకాలు ఏవీ కనుగొనబడలేదు.
            </p>
          </div>
        )}
        
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setCurrentStep(0);
              setProfile({
                age: '', employment: '', income: '', category: '', region: '', gender: '',
                maritalStatus: '', disability: '', familySize: '', education: '',
                housingType: '', landOwnership: '', chronicIllness: ''
              });
              setMatchedSchemes([]);
            }}
            className="bg-[#44646f] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            नए से शुरू करें / Start Over / మళ్లీ ప్రారంభించండి
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#3c392b]">
            {t('schemes.questionnaire.title')}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
              <Mic size={20} className="text-[#44646f]" />
              <span className="sr-only">{t('audio.speakInHindi')}</span>
            </button>
          </div>
        </div>
        
        <div className="w-full bg-[#e1dbd1] rounded-full h-2 mb-4">
          <div 
            className="bg-[#44646f] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-[#5d5c54] text-center">
          चरण / Step / దశ {currentStep + 1} / {steps.length}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#3c392b] mb-6 text-center">
          {currentStepData.title}
        </h3>

        <div className="space-y-8">
          {currentStepData.questions.map((question, qIndex) => (
            <div key={qIndex} className="border-b border-[#e1dbd1] pb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-[#3c392b]">
                  {question.question}
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.key, option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      profile[question.key] === option.value
                        ? 'border-[#44646f] bg-[#44646f] bg-opacity-10 text-[#44646f]'
                        : 'border-[#e1dbd1] hover:border-[#44646f] hover:bg-[#44646f] hover:bg-opacity-5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-lg border border-[#44646f] text-[#44646f] hover:bg-[#44646f] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('schemes.questionnaire.previous')}
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={getRecommendations}
            className="px-6 py-3 rounded-lg bg-[#44646f] text-white hover:bg-opacity-90 transition-colors"
          >
            {t('schemes.questionnaire.getRecommendations')}
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-3 rounded-lg bg-[#44646f] text-white hover:bg-opacity-90 transition-colors"
          >
            {t('schemes.questionnaire.continue')}
          </button>
        )}
      </div>
    </div>
  );
};

export default EnhancedSchemeQuestionnaire;
