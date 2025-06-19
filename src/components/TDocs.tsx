
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

interface DocumentRecommendation {
  id: string;
  name: string;
  purpose: string;
  requiredDocuments: string[];
  process: string[];
  office: string;
  timeframe: string;
}

const TDocs: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<DocumentRecommendation[]>([]);

  const questions = [
    {
      id: 'purpose',
      question: 'What do you need the document for?',
      options: [
        { value: 'employment', label: 'Employment/Job' },
        { value: 'education', label: 'Education/College' },
        { value: 'marriage', label: 'Marriage Registration' },
        { value: 'property', label: 'Property/Land' },
        { value: 'benefits', label: 'Government Benefits' }
      ]
    },
    {
      id: 'ageGroup',
      question: 'What is your age group?',
      options: [
        { value: 'below18', label: 'Below 18' },
        { value: '18-35', label: '18-35 years' },
        { value: '35-60', label: '35-60 years' },
        { value: 'above60', label: 'Above 60 years' }
      ]
    },
    {
      id: 'category',
      question: 'Which category do you belong to?',
      options: [
        { value: 'general', label: 'General' },
        { value: 'obc', label: 'OBC' },
        { value: 'sc', label: 'SC' },
        { value: 'st', label: 'ST' }
      ]
    }
  ];

  const documentDatabase: Record<string, DocumentRecommendation[]> = {
    employment: [
      {
        id: 'income-cert',
        name: 'Income Certificate',
        purpose: 'Proof of family income for job applications',
        requiredDocuments: [
          'Application form',
          'Salary certificates/Income proof',
          'Aadhaar card',
          'Ration card',
          'Bank statements (6 months)'
        ],
        process: [
          'Fill application form',
          'Attach required documents',
          'Submit at Tahsildar office',
          'Pay prescribed fee',
          'Collect certificate after verification'
        ],
        office: 'Tahsildar Office',
        timeframe: '15-30 days'
      },
      {
        id: 'domicile-cert',
        name: 'Domicile Certificate',
        purpose: 'Proof of residence for local jobs',
        requiredDocuments: [
          'Application form',
          'Birth certificate',
          'Educational certificates',
          'Aadhaar card',
          'Address proof'
        ],
        process: [
          'Submit application online or offline',
          'Document verification',
          'Field verification if required',
          'Certificate issuance'
        ],
        office: 'MRO Office',
        timeframe: '30 days'
      }
    ],
    education: [
      {
        id: 'study-cert',
        name: 'Study Certificate',
        purpose: 'Continuation of education',
        requiredDocuments: [
          'School leaving certificate',
          'Mark sheets',
          'Transfer certificate',
          'Aadhaar card'
        ],
        process: [
          'Apply at school/college',
          'Submit required documents',
          'Pay fees if applicable',
          'Collect certificate'
        ],
        office: 'Educational Institution',
        timeframe: '7-15 days'
      }
    ],
    benefits: [
      {
        id: 'pension-cert',
        name: 'Pension Application',
        purpose: 'Old age/widow/disability pension',
        requiredDocuments: [
          'Age proof (60+ for old age)',
          'Income certificate',
          'Bank account details',
          'Aadhaar card',
          'Medical certificate (for disability)',
          'Death certificate (for widow pension)'
        ],
        process: [
          'Fill pension application form',
          'Submit at VRO office',
          'Medical examination (if required)',
          'Verification process',
          'Pension approval and bank account linking'
        ],
        office: 'Village Revenue Office (VRO)',
        timeframe: '30-45 days'
      }
    ]
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const generateRecommendations = () => {
    const purpose = userAnswers.purpose;
    const ageGroup = userAnswers.ageGroup;
    
    let docs = documentDatabase[purpose] || [];
    
    // Add age-specific recommendations
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

  if (recommendations.length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#3c392b] mb-4">
              Recommended Documents
            </h3>
            <p className="text-[#5d5c54]">
              Based on your requirements, here are the documents you may need:
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((doc) => (
              <div key={doc.id} className="border border-[#cbccc1] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-[#3c392b] mb-2">
                      {doc.name}
                    </h4>
                    <p className="text-[#5d5c54] mb-4">{doc.purpose}</p>
                  </div>
                  <FileText size={32} className="text-[#44646f]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[#3c392b] mb-3">Required Documents:</h5>
                    <ul className="space-y-1">
                      {doc.requiredDocuments.map((req, index) => (
                        <li key={index} className="text-[#5d5c54] text-sm flex items-center">
                          <span className="w-2 h-2 bg-[#44646f] rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-[#3c392b] mb-3">Process:</h5>
                    <ol className="space-y-1">
                      {doc.process.map((step, index) => (
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
                    <span className="font-medium">Office:</span> {doc.office} | 
                    <span className="font-medium ml-2">Time:</span> {doc.timeframe}
                  </div>
                  <button className="bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2">
                    <Download size={16} />
                    <span>Download Checklist</span>
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
            T-Docs: Document Finder
          </h3>
          <p className="text-[#5d5c54]">
            Answer a few questions to get personalized document recommendations
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
      </div>
    </div>
  );
};

export default TDocs;
