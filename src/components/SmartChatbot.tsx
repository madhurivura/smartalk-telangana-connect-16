
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MicOff, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { generatePDF } from '@/utils/pdfGenerator';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasSchemeInfo?: boolean;
  schemeData?: any;
}

interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  category?: 'general' | 'obc' | 'sc' | 'st';
  income?: number;
  maritalStatus?: 'single' | 'married' | 'widow' | 'divorced';
  disability?: boolean;
  employment?: 'employed' | 'unemployed' | 'self-employed' | 'retired';
}

const SmartChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you find government schemes you\'re eligible for. నమస్కారం! మీకు అర్హత ఉన్న ప్రభుత్వ పథకాలను కనుగొనడంలో నేను సహాయం చేయగలను.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language, t } = useLanguage();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: voiceSupported } = useVoiceInput();
  const { speak, isSpeaking, stop: stopSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const questions = {
    english: [
      "What is your age?",
      "What is your gender? (male/female/other)",
      "What is your category? (general/obc/sc/st)",
      "What is your monthly family income in rupees?",
      "What is your marital status? (single/married/widow/divorced)",
      "Do you have any disability? (yes/no)",
      "What is your employment status? (employed/unemployed/self-employed/retired)"
    ],
    telugu: [
      "మీ వయస్సు ఎంత?",
      "మీ లింగం ఏమిటి? (పురుషుడు/స్త్రీ/ఇతర)",
      "మీ వర్గం ఏమిటి? (సాధారణ/ఒబిసి/ఎస్సి/ఎస్టి)",
      "మీ నెలవారీ కుటుంబ ఆదాయం రూపాయలలో ఎంత?",
      "మీ వైవాహిక స్థితి ఏమిటి? (అవివాహిత/వివాహిత/వితంతువు/విడాకులు)",
      "మీకు ఏదైనా వైకల్యం ఉందా? (అవును/లేదు)",
      "మీ ఉపాధి స్థితి ఏమిటి? (ఉపాధి/నిరుపేద/స్వయం ఉపాధి/పదవీ విరమణ)"
    ]
  };

  const schemes = {
    pension: {
      name: "Old Age Pension / వృద్ధాప్య పెన్షన్",
      eligibility: "Age 60+, Income < 2 lakh annually",
      amount: "₹3,016 per month",
      documents: ["Age proof", "Income certificate", "Bank details", "Aadhaar card"],
      process: ["Visit MRO office", "Submit application", "Document verification", "Approval"],
      office: "MRO Office"
    },
    widow: {
      name: "Widow Pension / వితంతువు పెన్షన్",
      eligibility: "Widow, Age 18+, Income < 2 lakh annually",
      amount: "₹3,016 per month",
      documents: ["Death certificate of husband", "Income certificate", "Bank details", "Aadhaar card"],
      process: ["Visit MRO office", "Submit application", "Document verification", "Approval"],
      office: "MRO Office"
    },
    disability: {
      name: "Disability Pension / వైకల్య పెన్షన్",
      eligibility: "40%+ disability, Income < 2 lakh annually",
      amount: "₹3,016 per month",
      documents: ["Disability certificate", "Income certificate", "Bank details", "Aadhaar card"],
      process: ["Visit MRO office", "Submit application", "Document verification", "Approval"],
      office: "MRO Office"
    }
  };

  const getEligibleSchemes = (profile: UserProfile) => {
    const eligible = [];
    
    if (profile.age && profile.age >= 60 && profile.income && profile.income < 200000) {
      eligible.push(schemes.pension);
    }
    
    if (profile.maritalStatus === 'widow' && profile.age && profile.age >= 18 && profile.income && profile.income < 200000) {
      eligible.push(schemes.widow);
    }
    
    if (profile.disability && profile.income && profile.income < 200000) {
      eligible.push(schemes.disability);
    }
    
    return eligible;
  };

  const processUserResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();
    const currentQuestion = currentStep;
    
    switch (currentQuestion) {
      case 0: // Age
        const age = parseInt(response);
        if (!isNaN(age)) {
          setUserProfile(prev => ({ ...prev, age }));
        }
        break;
      case 1: // Gender
        if (lowerResponse.includes('male') || lowerResponse.includes('పురుషుడు')) {
          setUserProfile(prev => ({ ...prev, gender: 'male' }));
        } else if (lowerResponse.includes('female') || lowerResponse.includes('స్త్రీ')) {
          setUserProfile(prev => ({ ...prev, gender: 'female' }));
        }
        break;
      case 2: // Category
        if (lowerResponse.includes('sc') || lowerResponse.includes('ఎస్సి')) {
          setUserProfile(prev => ({ ...prev, category: 'sc' }));
        } else if (lowerResponse.includes('st') || lowerResponse.includes('ఎస్టి')) {
          setUserProfile(prev => ({ ...prev, category: 'st' }));
        } else if (lowerResponse.includes('obc') || lowerResponse.includes('ఒబిసి')) {
          setUserProfile(prev => ({ ...prev, category: 'obc' }));
        } else {
          setUserProfile(prev => ({ ...prev, category: 'general' }));
        }
        break;
      case 3: // Income
        const income = parseInt(response);
        if (!isNaN(income)) {
          setUserProfile(prev => ({ ...prev, income }));
        }
        break;
      case 4: // Marital Status
        if (lowerResponse.includes('widow') || lowerResponse.includes('వితంతువు')) {
          setUserProfile(prev => ({ ...prev, maritalStatus: 'widow' }));
        } else if (lowerResponse.includes('married') || lowerResponse.includes('వివాహిత')) {
          setUserProfile(prev => ({ ...prev, maritalStatus: 'married' }));
        } else if (lowerResponse.includes('divorced') || lowerResponse.includes('విడాకులు')) {
          setUserProfile(prev => ({ ...prev, maritalStatus: 'divorced' }));
        } else {
          setUserProfile(prev => ({ ...prev, maritalStatus: 'single' }));
        }
        break;
      case 5: // Disability
        if (lowerResponse.includes('yes') || lowerResponse.includes('అవును')) {
          setUserProfile(prev => ({ ...prev, disability: true }));
        } else {
          setUserProfile(prev => ({ ...prev, disability: false }));
        }
        break;
      case 6: // Employment
        if (lowerResponse.includes('unemployed') || lowerResponse.includes('నిరుపేద')) {
          setUserProfile(prev => ({ ...prev, employment: 'unemployed' }));
        } else if (lowerResponse.includes('self-employed') || lowerResponse.includes('స్వయం ఉపాధి')) {
          setUserProfile(prev => ({ ...prev, employment: 'self-employed' }));
        } else if (lowerResponse.includes('retired') || lowerResponse.includes('పదవీ విరమణ')) {
          setUserProfile(prev => ({ ...prev, employment: 'retired' }));
        } else {
          setUserProfile(prev => ({ ...prev, employment: 'employed' }));
        }
        break;
    }
  };

  const handleSendMessage = () => {
    const messageText = inputText.trim() || transcript.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Process the response if we're in questionnaire mode
    if (currentStep < questions[language].length) {
      processUserResponse(messageText);
      
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      let botResponse: Message;
      
      if (nextStep < questions[language].length) {
        // Ask next question
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: questions[language][nextStep],
          isUser: false,
          timestamp: new Date()
        };
      } else {
        // Show eligible schemes
        const eligibleSchemes = getEligibleSchemes(userProfile);
        
        if (eligibleSchemes.length > 0) {
          const schemesList = eligibleSchemes.map(scheme => scheme.name).join(', ');
          botResponse = {
            id: (Date.now() + 1).toString(),
            text: language === 'english' 
              ? `Based on your profile, you are eligible for: ${schemesList}. Click the download button to get detailed information.`
              : `మీ ప్రొఫైల్ ఆధారంగా, మీరు ఈ పథకాలకు అర్హులు: ${schemesList}. వివరణాత్మక సమాచారం పొందడానికి డౌన్‌లోడ్ బటన్‌ను క్లిక్ చేయండి.`,
            isUser: false,
            timestamp: new Date(),
            hasSchemeInfo: true,
            schemeData: eligibleSchemes
          };
        } else {
          botResponse = {
            id: (Date.now() + 1).toString(),
            text: language === 'english' 
              ? "Based on your profile, you don't currently qualify for the schemes in our database. Please visit your local government office for more information."
              : "మీ ప్రొఫైల్ ఆధారంగా, మీరు ప్రస్తుతం మా డేటాబేస్‌లోని పథకాలకు అర్హత లేదు. మరింత సమాచారం కోసం దయచేసి మీ స్థానిక ప్రభుత్వ కార్యాలయాన్ని సందర్శించండి.",
            isUser: false,
            timestamp: new Date()
          };
        }
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }

    setInputText('');
    resetTranscript();
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(language);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text, language);
    }
  };

  const downloadSchemeInfo = (schemes: any[]) => {
    schemes.forEach((scheme, index) => {
      const pdfContent = {
        title: scheme.name,
        description: `Eligibility: ${scheme.eligibility}`,
        purpose: `Monthly Amount: ${scheme.amount}`,
        documents: scheme.documents,
        process: scheme.process,
        office: scheme.office,
        timeframe: "15-30 days",
        fees: "No fees"
      };
      
      generatePDF(pdfContent, `${scheme.name.split('/')[0].trim()}_Scheme_Info.pdf`);
    });
  };

  // Use transcript when available
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start with first question
  useEffect(() => {
    if (messages.length === 1) {
      setTimeout(() => {
        const firstQuestion: Message = {
          id: '2',
          text: questions[language][0],
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, firstQuestion]);
      }, 2000);
    }
  }, [language]);

  return (
    <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#44646f] p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">SmartTalk Scheme Assistant</h3>
        <div className="flex items-center space-x-2 text-xs text-[#cbccc1]">
          {voiceSupported && <span>🎤</span>}
          {ttsSupported && <span>🔊</span>}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 p-6 overflow-y-auto bg-white">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-[#44646f] text-white'
                    : 'bg-[#cbccc1] text-[#3c392b]'
                }`}
              >
                <p>{message.text}</p>
                <div className="flex items-center mt-2 space-x-2">
                  {!message.isUser && ttsSupported && (
                    <button
                      onClick={() => handleTextToSpeech(message.text)}
                      className="text-[#44646f] hover:text-[#3c392b] transition-colors"
                      disabled={isSpeaking}
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                  {message.hasSchemeInfo && message.schemeData && (
                    <button
                      onClick={() => downloadSchemeInfo(message.schemeData)}
                      className="flex items-center space-x-1 bg-[#44646f] text-white px-2 py-1 rounded text-xs hover:bg-opacity-90 transition-colors"
                    >
                      <Download size={12} />
                      <span>Download PDF</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#e1dbd1] p-4 border-t border-[#cbccc1]">
        <div className="flex items-center space-x-3">
          {voiceSupported && (
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-[#44646f] text-white hover:bg-opacity-90'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              language === 'english' 
                ? "Type your answer..." 
                : "మీ సమాధానం టైప్ చేయండి..."
            }
            className="flex-1 p-3 rounded-lg border border-[#cbccc1] focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
          />
          
          <button
            onClick={handleSendMessage}
            className="p-3 bg-[#44646f] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        
        {voiceSupported && (
          <p className="text-xs text-[#5d5c54] mt-2 text-center">
            {language === 'english' 
              ? 'Voice input and text-to-speech available. Answer the questions to find eligible schemes.'
              : 'వాయిస్ ఇన్‌పుట్ మరియు టెక్స్ట్-టు-స్పీచ్ అందుబాటులో ఉంది. అర్హత ఉన్న పథకాలను కనుగొనడానికి ప్రశ్నలకు సమాధానం ఇవ్వండి.'
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default SmartChatbot;
