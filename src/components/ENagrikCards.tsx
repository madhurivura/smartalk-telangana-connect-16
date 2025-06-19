
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
      id: 'caste-cert',
      title: {
        english: 'Caste Certificate',
        telugu: 'కుల ప్రమాణపత్రం'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for caste certificate for reservations and benefits',
        telugu: 'రిజర్వేషన్లు మరియు ప్రయోజనాల కోసం కుల ప్రమాణపత్రానికి దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          {
            title: 'Gather Documents',
            description: 'Collect all required documents including parent\'s caste certificate, school certificates, and address proof.'
          },
          {
            title: 'Fill Application Form',
            description: 'Complete the caste certificate application form with accurate details.'
          },
          {
            title: 'Submit at MRO Office',
            description: 'Submit the application along with documents at the nearest MRO office.'
          },
          {
            title: 'Pay Required Fees',
            description: 'Pay the prescribed fee for processing the certificate.'
          },
          {
            title: 'Verification Process',
            description: 'Official verification of documents and family background check.'
          },
          {
            title: 'Collect Certificate',
            description: 'Collect the issued caste certificate from the MRO office.'
          }
        ],
        telugu: [
          {
            title: 'పత్రాలు సేకరించండి',
            description: 'తల్లిదండ్రుల కుల ప్రమాణపత్రం, పాఠశాల ప్రమాణపత్రాలు మరియు చిరునామా రుజువుతో సహా అవసరమైన అన్ని పత్రాలను సేకరించండి.'
          },
          {
            title: 'దరఖాస్తు ఫారం పూరించండి',
            description: 'ఖచ్చితమైన వివరాలతో కుల ప్రమాణపత్ర దరఖాస్తు ఫారం పూర్తి చేయండి.'
          },
          {
            title: 'MRO కార్యాలయంలో సమర్పించండి',
            description: 'సమీప MRO కార్యాలయంలో పత్రాలతో పాటు దరఖాస్తును సమర్పించండి.'
          },
          {
            title: 'అవసరమైన రుసుము చెల్లించండి',
            description: 'ప్రమాణపత్రం ప్రాసెసింగ్ కోసం నిర్ధారిత రుసుము చెల్లించండి.'
          },
          {
            title: 'ధృవీకరణ ప్రక్రియ',
            description: 'పత్రాల అధికారిక ధృవీకరణ మరియు కుటుంబ నేపథ్య తనిఖీ.'
          },
          {
            title: 'ప్రమాణపత్రం తీసుకోండి',
            description: 'MRO కార్యాలయం నుండి జారీ చేయబడిన కుల ప్రమాణపత్రాన్ని తీసుకోండి.'
          }
        ]
      },
      requiredDocs: {
        english: [
          'Parent\'s caste certificate',
          'School leaving certificate',
          'Aadhaar card',
          'Address proof',
          'Passport size photos',
          'Birth certificate'
        ],
        telugu: [
          'తల్లిదండ్రుల కుల ప్రమాణపత్రం',
          'పాఠశాల వదిలిపెట్టిన ప్రమాణపత్రం',
          'ఆధార్ కార్డ్',
          'చిరునామా రుజువు',
          'పాస్‌పోర్ట్ సైజ్ ఫోటోలు',
          'జన్మ ప్రమాణపత్రం'
        ]
      },
      office: {
        english: 'MRO Office',
        telugu: 'MRO కార్యాలయం'
      },
      timeframe: {
        english: '30-45 days',
        telugu: '30-45 రోజులు'
      },
      fees: {
        english: '₹50',
        telugu: '₹50'
      }
    },
    {
      id: 'income-cert',
      title: {
        english: 'Income Certificate',
        telugu: 'ఆదాయ ప్రమాణపత్రం'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for income certificate for scholarships and government benefits',
        telugu: 'స్కాలర్‌షిప్‌లు మరియు ప్రభుత్వ ప్రయోజనాల కోసం ఆదాయ ప్రమాణపత్రానికి దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          {
            title: 'Prepare Income Documents',
            description: 'Gather salary certificates, agricultural income proof, and other income sources.'
          },
          {
            title: 'Complete Application',
            description: 'Fill the income certificate application form with family income details.'
          },
          {
            title: 'Submit to Tahsildar',
            description: 'Submit application at Tahsildar office with supporting documents.'
          },
          {
            title: 'Document Verification',
            description: 'Officials verify the submitted income documents and details.'
          },
          {
            title: 'Field Verification',
            description: 'If required, field verification of income sources may be conducted.'
          },
          {
            title: 'Certificate Issuance',
            description: 'Collect the issued income certificate from Tahsildar office.'
          }
        ],
        telugu: [
          {
            title: 'ఆదాయ పత్రాలను సిద్ధం చేయండి',
            description: 'జీతం ప్రమాణపత్రాలు, వ్యవసాయ ఆదాయ రుజువు మరియు ఇతర ఆదాయ వనరులను సేకరించండి.'
          },
          {
            title: 'దరఖాస్తును పూర్తి చేయండి',
            description: 'కుటుంబ ఆదాయ వివరాలతో ఆదాయ ప్రమాణపత్ర దరఖాస్తు ఫారం పూరించండి.'
          },
          {
            title: 'తహసీల్దార్‌కు సమర్పించండి',
            description: 'సహాయక పత్రాలతో తహసీల్దార్ కార్యాలయంలో దరఖాస్తు సమర్పించండి.'
          },
          {
            title: 'పత్ర ధృవీకరణ',
            description: 'అధికారులు సమర్పించిన ఆదాయ పత్రాలు మరియు వివరాలను ధృవీకరిస్తారు.'
          },
          {
            title: 'క్షేత్ర ధృవీకరణ',
            description: 'అవసరమైతే, ఆదాయ వనరుల క్షేత్ర ధృవీకరణ నిర్వహించబడవచ్చు.'
          },
          {
            title: 'ప్రమాణపత్ర జారీ',
            description: 'తహసీల్దార్ కార్యాలయం నుండి జారీ చేయబడిన ఆదాయ ప్రమాణపత్రాన్ని తీసుకోండి.'
          }
        ]
      },
      requiredDocs: {
        english: [
          'Salary certificates',
          'Agricultural income proof',
          'Aadhaar card',
          'Ration card',
          'Bank statements (6 months)',
          'Property documents (if any)'
        ],
        telugu: [
          'జీతం ప్రమాణపత్రాలు',
          'వ్యవసాయ ఆదాయ రుజువు',
          'ఆధార్ కార్డ్',
          'రేషన్ కార్డ్',
          'బ్యాంక్ స్టేట్‌మెంట్లు (6 నెలలు)',
          'ఆస్తి పత్రాలు (ఉంటే)'
        ]
      },
      office: {
        english: 'Tahsildar Office',
        telugu: 'తహసీల్దార్ కార్యాలయం'
      },
      timeframe: {
        english: '15-30 days',
        telugu: '15-30 రోజులు'
      },
      fees: {
        english: '₹30',
        telugu: '₹30'
      }
    },
    {
      id: 'birth-cert',
      title: {
        english: 'Birth Certificate',
        telugu: 'జన్మ ప్రమాణపత్రం'
      },
      icon: <FileText size={24} className="text-[#44646f]" />,
      description: {
        english: 'Apply for birth certificate for passport, education, and official purposes',
        telugu: 'పాస్‌పోర్ట్, విద్య మరియు అధికారిక ప్రయోజనాల కోసం జన్మ ప్రమాణపత్రానికి దరఖాస్తు చేయండి'
      },
      steps: {
        english: [
          {
            title: 'Hospital Records',
            description: 'Obtain birth record from the hospital where birth took place.'
          },
          {
            title: 'Fill Application Form',
            description: 'Complete birth certificate application with child and parent details.'
          },
          {
            title: 'Submit to Registrar',
            description: 'Submit application to Birth & Death Registrar office.'
          },
          {
            title: 'Verification Process',
            description: 'Official verification of hospital records and parent details.'
          },
          {
            title: 'Certificate Generation',
            description: 'Birth certificate is generated and processed for issuance.'
          },
          {
            title: 'Collect Certificate',
            description: 'Collect the official birth certificate from registrar office.'
          }
        ],
        telugu: [
          {
            title: 'ఆసుపత్రి రికార్డులు',
            description: 'జననం జరిగిన ఆసుపత్రి నుండి జన్మ రికార్డు పొందండి.'
          },
          {
            title: 'దరఖాస్తు ఫారం పూరించండి',
            description: 'పిల్లవాడు మరియు తల్లిదండ్రుల వివరాలతో జన్మ ప్రమాణపత్ర దరఖాస్తును పూర్తి చేయండి.'
          },
          {
            title: 'రిజిస్ట్రార్‌కు సమర్పించండి',
            description: 'జన్మ మరియు మరణ రిజిస్ట్రార్ కార్యాలయానికి దరఖాస్తు సమర్పించండి.'
          },
          {
            title: 'ధృవీకరణ ప్రక్రియ',
            description: 'ఆసుపత్రి రికార్డులు మరియు తల్లిదండ్రుల వివరాల అధికారిక ధృవీకరణ.'
          },
          {
            title: 'ప్రమాణపత్ర ఉత్పత్తి',
            description: 'జన్మ ప్రమాణపత్రం ఉత్పత్తి చేయబడి జారీ కోసం ప్రాసెస్ చేయబడుతుంది.'
          },
          {
            title: 'ప్రమాణపత్రం తీసుకోండి',
            description: 'రిజిస్ట్రార్ కార్యాలయం నుండి అధికారిక జన్మ ప్రమాణపత్రాన్ని తీసుకోండి.'
          }
        ]
      },
      requiredDocs: {
        english: [
          'Hospital birth record',
          'Parent\'s Aadhaar cards',
          'Marriage certificate of parents',
          'Address proof',
          'Passport size photos',
          'Affidavit (if late registration)'
        ],
        telugu: [
          'ఆసుపత్రి జన్మ రికార్డు',
          'తల్లిదండ్రుల ఆధార్ కార్డులు',
          'తల్లిదండ్రుల వివాహ ప్రమాణపత్రం',
          'చిరునామా రుజువు',
          'పాస్‌పోర్ట్ సైజ్ ఫోటోలు',
          'అఫిడవిట్ (ఆలస్య నమోదు అయితే)'
        ]
      },
      office: {
        english: 'Birth & Death Registrar Office',
        telugu: 'జన్మ మరియు మరణ రిజిస్ట్రార్ కార్యాలయం'
      },
      timeframe: {
        english: '7-15 days',
        telugu: '7-15 రోజులు'
      },
      fees: {
        english: '₹10',
        telugu: '₹10'
      }
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
