
import React from 'react';
import { MessageCircle, FileText, CreditCard, Mic, Volume2, Download } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <MessageCircle size={32} className="text-[#44646f]" />,
      title: "Telugu Chatbot",
      description: "Chat in Telugu or English for instant help"
    },
    {
      icon: <FileText size={32} className="text-[#44646f]" />,
      title: "T-Docs",
      description: "Document recommender for your specific needs"
    },
    {
      icon: <CreditCard size={32} className="text-[#44646f]" />,
      title: "e-Nagrik Cards",
      description: "Visual guides for government processes"
    },
    {
      icon: <Mic size={32} className="text-[#44646f]" />,
      title: "Voice Input",
      description: "Speak your questions naturally"
    },
    {
      icon: <Volume2 size={32} className="text-[#44646f]" />,
      title: "Text-to-Speech",
      description: "Listen to responses in your language"
    },
    {
      icon: <Download size={32} className="text-[#44646f]" />,
      title: "PDF Generator",
      description: "Download forms and checklists instantly"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#e1dbd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
            Everything you need to navigate government services with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5d5c54] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
