
import React, { useState } from 'react';
import { FileText, Download, ArrowLeft, ArrowRight } from 'lucide-react';
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
}

const TDocsSystem: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>([]);

  const questions = [
    {
      id: 'purpose',
      question: t('tdocs.purpose'),
      options: [
        { value: 'employment', label: t('tdocs.employment') },
        { value: 'education', label: t('tdocs.education') },
        { value: 'marriage', label: t('tdocs.marriage') },
        { value: 'property', label: t('tdocs.property') },
        { value: 'benefits', label: t('tdocs.benefits') }
      ]
    },
    {
      id: 'category',
      question: t('tdocs.category'),
      options: [
        { value: 'general', label: t('tdocs.general') },
        { value: 'obc', label: t('tdocs.obc') },
        { value: 'sc', label: t('tdocs.sc') },
        { value: 'st', label: t('tdocs.st') }
      ]
    },
    {
      id: 'ageGroup',
      question: t('tdocs.ageGroup'),
      options: [
        { value: 'below18', label: t('tdocs.below18') },
        { value: '18-35', label: t('tdocs.18-35') },
        { value: '35-60', label: t('tdocs.35-60') },
        { value: 'above60', label: t('tdocs.above60') }
      ]
    },
    {
      id: 'income',
      question: t('tdocs.income'),
      options: [
        { value: 'below10k', label: t('tdocs.below10k') },
        { value: '10k-50k', label: t('tdocs.10k-50k') },
        { value: 'above50k', label: t('tdocs.above50k') }
      ]
    }
  ];

  const documentDatabase: Record<string, DocumentRecommendation[]> = {
    employment: [
      {
        id: 'income-cert',
        name: {
          english: 'Income Certificate',
          telugu: 'ఆదాయ ప్రమాణపత్రం'
        },
        purpose: {
          english: 'Proof of family income for job applications',
          telugu: 'ఉద్యోగ దరఖాస్తుల కోసం కుటుంబ ఆదాయ రుజువు'
        },
        requiredDocuments: {
          english: [
            'Application form',
            'Salary certificates/Income proof',
            'Aadhaar card',
            'Ration card',
            'Bank statements (6 months)'
          ],
          telugu: [
            'దరఖాస్తు ఫారం',
            'జీతం ప్రమాణపత్రాలు/ఆదాయ రుజువు',
            'ఆధార్ కార్డ్',
            'రేషన్ కార్డ్',
            'బ్యాంక్ స్టేట్‌మెంట్లు (6 నెలలు)'
          ]
        },
        process: {
          english: [
            'Fill application form',
            'Attach required documents',
            'Submit at Tahsildar office',
            'Pay prescribed fee',
            'Collect certificate after verification'
          ],
          telugu: [
            'దరఖాస్తు ఫారం పూరించండి',
            'అవసరమైన పత్రాలు జత చేయండి',
            'తహసీల్దార్ కార్యాలయంలో సమర్పించండి',
            'నిర్ణీత రుసుము చెల్లించండి',
            'ధృవీకరణ తర్వాత ప్రమాణపత్రం తీసుకోండి'
          ]
        },
        office: {
          english: 'Tahsildar Office',
          telugu: 'తహసీల్దార్ కార్యాలయం'
        },
        timeframe: {
          english: '15-30 days',
          telugu: '15-30 రోజులు'
        }
      }
    ],
    education: [
      {
        id: 'study-cert',
        name: {
          english: 'Study Certificate',
          telugu: 'అధ్యయన ప్రమాణపత్రం'
        },
        purpose: {
          english: 'Continuation of education',
          telugu: 'విద్య కొనసాగింపు'
        },
        requiredDocuments: {
          english: [
            'School leaving certificate',
            'Mark sheets',
            'Transfer certificate',
            'Aadhaar card'
          ],
          telugu: [
            'పాఠశాల వదిలిపెట్టిన ప్రమాణపత్రం',
            'మార్కు షీట్లు',
            'బదిలీ ప్రమాణపత్రం',
            'ఆధార్ కార్డ్'
          ]
        },
        process: {
          english: [
            'Apply at school/college',
            'Submit required documents',
            'Pay fees if applicable',
            'Collect certificate'
          ],
          telugu: [
            'పాఠశాల/కళాశాలలో దరఖాస్తు చేయండి',
            'అవసరమైన పత్రాలు సమర్పించండి',
            'వర్తించినట్లయితే రుసుము చెల్లించండి',
            'ప్రమాణపత్రం తీసుకోండి'
          ]
        },
        office: {
          english: 'Educational Institution',
          telugu: 'విద్యా సంస్థ'
        },
        timeframe: {
          english: '7-15 days',
          telugu: '7-15 రోజులు'
        }
      }
    ],
    benefits: [
      {
        id: 'pension-cert',
        name: {
          english: 'Pension Application',
          telugu: 'పెన్షన్ దరఖాస్తు'
        },
        purpose: {
          english: 'Old age/widow/disability pension',
          telugu: 'వృద్ధాప్య/వితంతువు/వైకల్య పెన్షన్'
        },
        requiredDocuments: {
          english: [
            'Age proof (60+ for old age)',
            'Income certificate',
            'Bank account details',
            'Aadhaar card',
            'Medical certificate (for disability)',
            'Death certificate (for widow pension)'
          ],
          telugu: [
            'వయసు రుజువు (వృద్ధాప్య కోసం 60+)',
            'ఆదాయ ప్రమాణపత్రం',
            'బ్యాంక్ ఖాతా వివరాలు',
            'ఆధార్ కార్డ్',
            'వైద్య ప్రమాణపత్రం (వైకల్యం కోసం)',
            'మరణ ప్రమాణపత్రం (వితంతువు పెన్షన్ కోసం)'
          ]
        },
        process: {
          english: [
            'Fill pension application form',
            'Submit at VRO office',
            'Medical examination (if required)',
            'Verification process',
            'Pension approval and bank account linking'
          ],
          telugu: [
            'పెన్షన్ దరఖాస్తు ఫారం పూరించండి',
            'VRO కార్యాలయంలో సమర్పించండి',
            'వైద్య పరీక్ష (అవసరమైతే)',
            'ధృవీకరణ ప్రక్రియ',
            'పెన్షన్ ఆమోదం మరియు బ్యాంక్ ఖాతా లింకింగ్'
          ]
        },
        office: {
          english: 'Village Revenue Office (VRO)',
          telugu: 'గ్రామ ఆదాయ కార్యాలయం (VRO)'
        },
        timeframe: {
          english: '30-45 days',
          telugu: '30-45 రోజులు'
        }
      }
    ]
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...userAnswers, [questionId]: answer };
    setUserAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations(newAnswers);
    }
  };

  const generateRecommendations = (answers: Record<string, string>) => {
    const purpose = answers.purpose;
    const ageGroup = answers.ageGroup;
    
    let docs = documentDatabase[purpose] || [];
    
    if (ageGroup === 'above60') {
      docs = [...docs, ...documentDatabase.benefits];
    }
    
    setRecommendations(docs);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setRecommendations([]);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownloadPDF = (doc: DocumentRecommendation) => {
    const content = {
      title: doc.name[language],
      purpose: doc.purpose[language],
      documents: doc.requiredDocuments[language],
      process: doc.process[language],
      office: doc.office[language],
      timeframe: doc.timeframe[language]
    };
    generatePDF(content, `${doc.name.english}-checklist.pdf`);
  };

  if (recommendations.length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#3c392b] mb-4">
              {t('tdocs.recommended')}
            </h3>
            <p className="text-[#5d5c54]">
              {t('tdocs.based')}
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((doc) => (
              <div key={doc.id} className="border border-[#cbccc1] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-[#3c392b] mb-2">
                      {doc.name[language]}
                    </h4>
                    <p className="text-[#5d5c54] mb-4">{doc.purpose[language]}</p>
                  </div>
                  <FileText size={32} className="text-[#44646f]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[#3c392b] mb-3">{t('tdocs.required')}</h5>
                    <ul className="space-y-1">
                      {doc.requiredDocuments[language].map((req, index) => (
                        <li key={index} className="text-[#5d5c54] text-sm flex items-center">
                          <span className="w-2 h-2 bg-[#44646f] rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-[#3c392b] mb-3">{t('tdocs.process')}</h5>
                    <ol className="space-y-1">
                      {doc.process[language].map((step, index) => (
                        <li key={index} className="text-[#5d5c54] text-sm flex items-start">
                          <span className="bg-[#44646f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#cbccc1] flex justify-between items-center">
                  <div className="text-sm text-[#5d5c54]">
                    <span className="font-medium">{t('tdocs.office')}</span> {doc.office[language]} | 
                    <span className="font-medium ml-2">{t('tdocs.time')}</span> {doc.timeframe[language]}
                  </div>
                  <button 
                    onClick={() => handleDownloadPDF(doc)}
                    className="bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>{t('tdocs.download')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={resetForm}
              className="bg-[#cbccc1] text-[#3c392b] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {t('tdocs.startOver')}
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
            {t('tdocs.title')}
          </h3>
          <p className="text-[#5d5c54]">
            {t('tdocs.subtitle')}
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

        <div className="flex justify-between">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 text-[#5d5c54] hover:text-[#3c392b] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            <span>{t('common.back')}</span>
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
