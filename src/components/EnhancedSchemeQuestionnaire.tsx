
import React, { useState } from 'react';
import { Volume2, Mic } from 'lucide-react';
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

  const getRecommendations = () => {
    // This would integrate with backend in real implementation
    console.log('User Profile:', profile);
    // For now, just show completion message
    setCurrentStep(steps.length);
  };

  if (currentStep >= steps.length) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-[#3c392b] mb-6 text-center">
          प्रोफ़ाइल पूर्ण / Profile Complete / ప్రొఫైల్ పూర్తి
        </h3>
        <div className="text-center">
          <p className="text-[#5d5c54] mb-6">
            आपकी जानकारी के आधार पर सिफारिशें तैयार की जा रही हैं...
          </p>
          <p className="text-[#5d5c54] mb-6">
            Based on your information, recommendations are being prepared...
          </p>
          <p className="text-[#5d5c54] mb-6">
            మీ సమాచారం ఆధారంగా, సిఫార్సులు తయారు చేయబడుతున్నాయి...
          </p>
          <button
            onClick={() => {
              setCurrentStep(0);
              setProfile({
                age: '', employment: '', income: '', category: '', region: '', gender: '',
                maritalStatus: '', disability: '', familySize: '', education: '',
                housingType: '', landOwnership: '', chronicIllness: ''
              });
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
            <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
              <Volume2 size={20} className="text-[#44646f]" />
              <span className="sr-only">{t('audio.listenInHindi')}</span>
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
                <div className="flex space-x-1">
                  <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded">
                    <Volume2 size={16} />
                  </button>
                </div>
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
