
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: 'english' | 'telugu';
}

interface ChatbotProps {
  onVoiceInput: (text: string) => void;
  onTextToSpeech: (text: string, language: 'english' | 'telugu') => void;
}

const TeluguChatbot: React.FC<ChatbotProps> = ({ onVoiceInput, onTextToSpeech }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with government services. నమస్కారం! ప్రభుత్వ సేవలతో మీకు సహాయం చేయగలను.',
      isUser: false,
      timestamp: new Date(),
      language: 'english'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'telugu'>('english');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const governmentServices = {
    english: {
      pension: "For pension applications, you need: 1) Age proof (60+ for old age pension), 2) Income certificate, 3) Bank account details, 4) Aadhaar card, 5) Passport size photos. Visit your nearest MRO office.",
      certificate: "For certificates like birth/death/caste: 1) Application form, 2) Proof documents, 3) Address proof, 4) Photos. Apply online at AP Land Records or visit Village Revenue Office.",
      ration: "For ration card: 1) Family income proof, 2) Address proof, 3) Aadhaar cards of all family members, 4) Photos. Apply at nearest Tahsildar office.",
      default: "I can help with pension, certificates, ration cards, and other government services. What specific service do you need help with?"
    },
    telugu: {
      pension: "పెన్షన్ అప్లికేషన్ కోసం మీకు అవసరం: 1) వయసు ప్రమాాణం (వృద్ధాప్య పెన్షన్ కోసం 60+), 2) ఆదాయ ప్రమాణపత్రం, 3) బ్యాంక్ ఖాతా వివరాలు, 4) ఆధార్ కార్డ్, 5) పాస్‌పోర్ట్ సైజ్ ఫోటోలు. మీ సమీప MRO కార్యాలయాన్ని సంప్రదించండి.",
      certificate: "జన్మ/మరణ/కుల ప్రమాణపత్రాల కోసం: 1) దరఖాస్తు ఫారం, 2) రుజువు పత్రాలు, 3) చిరునామా రుజువు, 4) ఫోటోలు. AP ల్యాండ్ రికార్డ్స్‌లో ఆన్‌లైన్‌లో దరఖాస్తు చేయండి లేదా గ్రామ రెవిన్యూ కార్యాలయాన్ని సంప్రదించండి.",
      ration: "రేషన్ కార్డ్ కోసం: 1) కుటుంబ ఆదాయ రుజువు, 2) చిరునామా రుజువు, 3) కుటుంబ సభ్యులందరి ఆధార్ కార్డులు, 4) ఫోటోలు. సమీప తహసీల్దార్ కార్యాలయంలో దరఖాస్తు చేయండి.",
      default: "నేను పెన్షన్, ప్రమాణపత్రాలు, రేషన్ కార్డులు మరియు ఇతర ప్రభుత్వ సేవలతో సహాయం చేయగలను. మీకు ఏ నిర్దిష్ట సేవ అవసరం?"
    }
  };

  const getResponse = (input: string, language: 'english' | 'telugu') => {
    const lowerInput = input.toLowerCase();
    const services = governmentServices[language];
    
    if (lowerInput.includes('pension') || lowerInput.includes('పెన్షన్')) {
      return services.pension;
    } else if (lowerInput.includes('certificate') || lowerInput.includes('ప్రమాణపత్రం')) {
      return services.certificate;
    } else if (lowerInput.includes('ration') || lowerInput.includes('రేషన్')) {
      return services.ration;
    } else {
      return services.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      language: currentLanguage
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(inputText, currentLanguage),
      isUser: false,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      onVoiceInput(currentLanguage);
    }
  };

  const handleTextToSpeech = (text: string) => {
    onTextToSpeech(text, currentLanguage);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden">
      {/* Language Toggle */}
      <div className="bg-[#44646f] p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">SmartTalk Assistant</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentLanguage('english')}
            className={`px-3 py-1 rounded text-sm ${
              currentLanguage === 'english' 
                ? 'bg-[#e1dbd1] text-[#44646f]' 
                : 'bg-transparent text-white border border-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setCurrentLanguage('telugu')}
            className={`px-3 py-1 rounded text-sm ${
              currentLanguage === 'telugu' 
                ? 'bg-[#e1dbd1] text-[#44646f]' 
                : 'bg-transparent text-white border border-white'
            }`}
          >
            తెలుగు
          </button>
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
                {!message.isUser && (
                  <button
                    onClick={() => handleTextToSpeech(message.text)}
                    className="mt-2 text-[#44646f] hover:text-[#3c392b] transition-colors"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#e1dbd1] p-4 border-t border-[#cbccc1]">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-[#44646f] text-white hover:bg-opacity-90'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              currentLanguage === 'english' 
                ? "Ask about government services..." 
                : "ప్రభుత్వ సేవల గురించి అడగండి..."
            }
            className="flex-1 p-3 rounded-lg border border-[#cbccc1] focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
          />
          
          <button
            onClick={handleSendMessage}
            className="p-3 bg-[#44646f] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeluguChatbot;
