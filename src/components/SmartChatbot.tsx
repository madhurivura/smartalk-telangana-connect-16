import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MicOff, Download, LogIn } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { generatePDF } from '@/utils/pdfGenerator';
import AuthModal from './AuthModal';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language, t } = useLanguage();
  const { user, sessionToken, isAuthenticated } = useAuth();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: voiceSupported } = useVoiceInput();
  const { speak, isSpeaking, stop: stopSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  // Load chat history when user logs in
  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      loadChatHistory();
    } else {
      // Reset chat for unauthenticated users
      setMessages([{
        id: '1',
        text: language === 'english' 
          ? 'Hello! Please sign in to get personalized government scheme recommendations.' 
          : 'నమస్కారం! వ్యక్తిగతీకరించిన ప్రభుత్వ పథక సిఫార్సులను పొందడానికి దయచేసి సైన్ ఇన్ చేయండి.',
        isUser: false,
        timestamp: new Date()
      }]);
      setCurrentStep(0);
      setUserProfile({});
    }
  }, [isAuthenticated, sessionToken, language]);

  const loadChatHistory = async () => {
    if (!sessionToken) return;
    
    setIsLoadingHistory(true);
    try {
      const response = await fetch('/ApiHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages.map((msg: any) => ({
            id: msg.id || Date.now().toString(),
            text: msg.message,
            isUser: msg.isUser,
            timestamp: new Date(msg.timestamp),
            hasSchemeInfo: msg.hasSchemeInfo,
            schemeData: msg.schemeData
          })));
        } else {
          // Start fresh conversation
          startNewConversation();
        }
      } else {
        startNewConversation();
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      startNewConversation();
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const startNewConversation = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: language === 'english'
        ? `Hello ${user?.name}! I can help you find government schemes you're eligible for. Let me ask you a few questions to get started.`
        : `నమస్కారం ${user?.name}! మీకు అర్హత ఉన్న ప్రభుత్వ పథకాలను కనుగొనడంలో నేను సహాయం చేయగలను. ప్రారంభించడానికి నేను మిమ్మల్ని కొన్ని ప్రశ్నలు అడుగుతాను.`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Start questionnaire after welcome
    setTimeout(() => {
      const firstQuestion: Message = {
        id: '2',
        text: questions[language][0],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, firstQuestion]);
    }, 2000);
  };

  const sendMessageToBackend = async (message: string, isUser: boolean) => {
    if (!sessionToken) return;

    try {
      await fetch('/ApiChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken,
          message,
          isUser,
          language
        }),
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

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

  const handleSendMessage = async () => {
    const messageText = inputText.trim() || transcript.trim();
    if (!messageText) return;

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessageToBackend(messageText, true);

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
        sendMessageToBackend(botResponse.text, false);
      }, 1000);
    }

    setInputText('');
    resetTranscript();
  };

  const handleVoiceInput = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

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

  if (isLoadingHistory) {
    return (
      <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden h-96 flex items-center justify-center">
        <div className="text-[#44646f]">Loading chat history...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#44646f] p-4 flex justify-between items-center">
          <h3 className="text-white font-semibold">
            SmartTalk Scheme Assistant
            {user && <span className="text-sm ml-2">({user.name})</span>}
          </h3>
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
                !isAuthenticated
                  ? (language === 'english' ? 'Please sign in to chat...' : 'చాట్ చేయడానికి సైన్ ఇన్ చేయండి...')
                  : (language === 'english' ? "Type your answer..." : "మీ సమాధానం టైప్ చేయండి...")
              }
              disabled={!isAuthenticated}
              className="flex-1 p-3 rounded-lg border border-[#cbccc1] focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            
            {!isAuthenticated ? (
              <button
                onClick={() => setShowAuthModal(true)}
                className="p-3 bg-[#44646f] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                title="Sign in to chat"
              >
                <LogIn size={20} />
              </button>
            ) : (
              <button
                onClick={handleSendMessage}
                className="p-3 bg-[#44646f] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                title="Send message"
              >
                <Send size={20} />
              </button>
            )}
          </div>
          
          <p className="text-xs text-[#5d5c54] mt-2 text-center">
            {!isAuthenticated 
              ? (language === 'english' 
                ? 'Sign in to get personalized government scheme recommendations'
                : 'వ్యక్తిగతీకరించిన ప్రభుత్వ పథక సిఫార్సులను పొందడానికి సైన్ ఇన్ చేయండి'
              )
              : (language === 'english' 
                ? 'Answer the questions to find eligible schemes. Voice input available.'
                : 'అర్హత ఉన్న పథకాలను కనుగొనడానికి ప్రశ్నలకు సమాధానం ఇవ్వండి. వాయిస్ ఇన్‌పుట్ అందుబాటులో ఉంది.'
              )
            }
          </p>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default SmartChatbot;
