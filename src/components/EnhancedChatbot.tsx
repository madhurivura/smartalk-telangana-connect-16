
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, MicOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const EnhancedChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with government services. నమస్కారం! ప్రభుత్వ సేవలతో మీకు సహాయం చేయగలను.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language, t } = useLanguage();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: voiceSupported } = useVoiceInput();
  const { speak, isSpeaking, stop: stopSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  const governmentServices = {
    english: {
      pension: "For pension applications, you need: 1) Age proof (60+ for old age pension), 2) Income certificate, 3) Bank account details, 4) Aadhaar card, 5) Passport size photos. Visit your nearest MRO office.",
      certificate: "For certificates like birth/death/caste: 1) Application form, 2) Proof documents, 3) Address proof, 4) Photos. Apply online at AP Land Records or visit Village Revenue Office.",
      ration: "For ration card: 1) Family income proof, 2) Address proof, 3) Aadhaar cards of all family members, 4) Photos. Apply at nearest Tahsildar office.",
      income: "Income certificate requires: 1) Salary certificates, 2) Property documents, 3) Bank statements (6 months), 4) Aadhaar card. Processing time: 15-30 days at Tahsildar office.",
      caste: "Caste certificate needs: 1) Parent's caste certificate, 2) School certificates, 3) Address proof, 4) Birth certificate. Apply at MRO office, takes 30-45 days.",
      birth: "Birth certificate: 1) Hospital birth record, 2) Parent's documents, 3) Address proof. Apply at Birth & Death Registrar office within 21 days of birth.",
      default: "I can help with pension, certificates, ration cards, and other government services. What specific service do you need help with?"
    },
    telugu: {
      pension: "పెన్షన్ అప్లికేషన్ కోసం మీకు అవసరం: 1) వయసు ప్రమాణం (వృద్ధాప్య పెన్షన్ కోసం 60+), 2) ఆదాయ ప్రమాణపత్రం, 3) బ్యాంక్ ఖాతా వివరాలు, 4) ఆధార్ కార్డ్, 5) పాస్‌పోర్ట్ సైజ్ ఫోటోలు. మీ సమీప MRO కార్యాలయాన్ని సంప్రదించండి.",
      certificate: "జన్మ/మరణ/కుల ప్రమాణపత్రాల కోసం: 1) దరఖాస్తు ఫారం, 2) రుజువు పత్రాలు, 3) చిరునామా రుజువు, 4) ఫోటోలు. AP ల్యాండ్ రికార్డ్స్‌లో ఆన్‌లైన్‌లో దరఖాస్తు చేయండి లేదా గ్రామ రెవిన్యూ కార్యాలయాన్ని సంప్రదించండి.",
      ration: "రేషన్ కార్డ్ కోసం: 1) కుటుంబ ఆదాయ రుజువు, 2) చిరునామా రుజువు, 3) కుటుంబ సభ్యులందరి ఆధార్ కార్డులు, 4) ఫోటోలు. సమీప తహసీల్దార్ కార్యాలయంలో దరఖాస్తు చేయండి.",
      income: "ఆదాయ ప్రమాణపత్రానికి అవసరం: 1) జీతం ప్రమాణపత్రాలు, 2) ఆస్తి పత్రాలు, 3) బ్యాంక్ స్టేట్‌మెంట్లు (6 నెలలు), 4) ఆధార్ కార్డ్. ప్రాసెసింగ్ సమయం: తహసీల్దార్ కార్యాలయంలో 15-30 రోజులు.",
      caste: "కుల ప్రమాణపత్రానికి అవసరం: 1) తల్లిదండ్రుల కుల ప్రమాణపత్రం, 2) పాఠశాల ప్రమాణపత్రాలు, 3) చిరునామా రుజువు, 4) జన్మ ప్రమాణపత్రం. MRO కార్యాలయంలో దరఖాస్తు చేయండి, 30-45 రోజులు పడుతుంది.",
      birth: "జన్మ ప్రమాణపత్రం: 1) ఆసుపత్రి జన్మ రికార్డు, 2) తల్లిదండ్రుల పత్రాలు, 3) చిరునామా రుజువు. జన్మ తర్వాత 21 రోజులలో జన్మ మరియు మరణ రిజిస్ట్రార్ కార్యాలయంలో దరఖాస్తు చేయండి.",
      default: "నేను పెన్షన్, ప్రమాణపత్రాలు, రేషన్ కార్డులు మరియు ఇతర ప్రభుత్వ సేవలతో సహాయం చేయగలను. మీకు ఏ నిర్దిష్ట సేవ అవసరం?"
    }
  };

  const getResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    const services = governmentServices[language];
    
    if (lowerInput.includes('pension') || lowerInput.includes('పెన్షన్')) {
      return services.pension;
    } else if (lowerInput.includes('certificate') || lowerInput.includes('ప్రమాణపత్రం')) {
      return services.certificate;
    } else if (lowerInput.includes('ration') || lowerInput.includes('రేషన్')) {
      return services.ration;
    } else if (lowerInput.includes('income') || lowerInput.includes('ఆదాయ')) {
      return services.income;
    } else if (lowerInput.includes('caste') || lowerInput.includes('కుల')) {
      return services.caste;
    } else if (lowerInput.includes('birth') || lowerInput.includes('జన్మ')) {
      return services.birth;
    } else {
      return services.default;
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

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(messageText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
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

  // Use transcript when available
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#44646f] p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">SmartTalk Assistant</h3>
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
                {!message.isUser && ttsSupported && (
                  <button
                    onClick={() => handleTextToSpeech(message.text)}
                    className="mt-2 text-[#44646f] hover:text-[#3c392b] transition-colors"
                    disabled={isSpeaking}
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
                ? "Ask about government services..." 
                : "ప్రభుత్వ సేవల గురించి అడగండి..."
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
              ? 'Voice input and text-to-speech available in Telugu and English'
              : 'వాయిస్ ఇన్‌పుట్ మరియు టెక్స్ట్-టు-స్పీచ్ తెలుగు మరియు ఇంగ్లీష్‌లో అందుబాటులో ఉంది'
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default EnhancedChatbot;
