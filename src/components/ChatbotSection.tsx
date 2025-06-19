
import React, { useState } from 'react';
import { Send, Mic, Volume2 } from 'lucide-react';

const ChatbotSection = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice input logic would be implemented here
  };

  return (
    <section id="chatbot" className="py-20 bg-[#3c392b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e1dbd1] mb-4">
            Try Our Smart Assistant
          </h2>
          <p className="text-lg text-[#cbccc1]">
            Ask questions about government services in Telugu or English
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-[#e1dbd1] rounded-2xl shadow-2xl overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 p-6 overflow-y-auto bg-white">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-[#cbccc1] rounded-lg p-3 max-w-xs">
                  <p className="text-[#3c392b]">Hello! I'm here to help you with government services. What do you need assistance with?</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-[#44646f] rounded-lg p-3 max-w-xs">
                  <p className="text-white">How do I apply for a pension?</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-[#cbccc1] rounded-lg p-3 max-w-md">
                  <p className="text-[#3c392b]">I can help you with pension applications! There are several types available. Which pension are you interested in? Old age pension, widow pension, or disability pension?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-[#e1dbd1] p-4 border-t border-[#cbccc1]">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-[#44646f] text-white hover:bg-opacity-90'
                }`}
              >
                <Mic size={20} />
              </button>
              
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question here... (Telugu or English)"
                className="flex-1 p-3 rounded-lg border border-[#cbccc1] focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
              />
              
              <button
                type="button"
                className="p-3 bg-[#94928b] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Volume2 size={20} />
              </button>
              
              <button
                type="submit"
                className="p-3 bg-[#44646f] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
            
            <p className="text-xs text-[#5d5c54] mt-2 text-center">
              Voice input and text-to-speech available in Telugu and English
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
