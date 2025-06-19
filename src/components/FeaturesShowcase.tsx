
import React, { useState } from 'react';
import { MessageCircle, FileText, CreditCard, Mic, Volume2, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TDocsSystem from './TDocsSystem';
import ENagrikCards from './ENagrikCards';
import EnhancedChatbot from './EnhancedChatbot';

const FeaturesShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { t } = useLanguage();

  const features = [
    {
      id: 'chatbot',
      icon: <MessageCircle size={32} className="text-[#44646f]" />,
      title: t('features.teluguChatbot'),
      description: t('features.teluguChatbotDesc'),
      component: <EnhancedChatbot />
    },
    {
      id: 'tdocs',
      icon: <FileText size={32} className="text-[#44646f]" />,
      title: t('features.tdocs'),
      description: t('features.tdocsDesc'),
      component: <TDocsSystem />
    },
    {
      id: 'enagrik',
      icon: <CreditCard size={32} className="text-[#44646f]" />,
      title: t('features.enagrik'),
      description: t('features.enagrikDesc'),
      component: <ENagrikCards />
    }
  ];

  const openFeature = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  if (activeFeature) {
    const feature = features.find(f => f.id === activeFeature);
    return (
      <div className="min-h-screen bg-[#e1dbd1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#3c392b]">
              {feature?.title}
            </h2>
            <button
              onClick={closeFeature}
              className="bg-[#44646f] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {t('features.backToFeatures')}
            </button>
          </div>
          {feature?.component}
        </div>
      </div>
    );
  }

  return (
    <section id="features" className="py-20 bg-[#e1dbd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openFeature(feature.id)}
            >
              <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5d5c54] leading-relaxed mb-4">
                {feature.description}
              </p>
              <button className="text-[#44646f] hover:text-[#3c392b] font-medium transition-colors">
                {t('features.tryNow')} →
              </button>
            </div>
          ))}

          {/* Additional feature cards showing capabilities */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              <Mic size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('features.voiceInput')}
            </h3>
            <p className="text-[#5d5c54] leading-relaxed">
              {t('features.voiceInputDesc')}
            </p>
            <div className="mt-4 text-sm text-[#5d5c54]">
              {t('features.integratedInChatbot')}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              <Volume2 size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('features.textToSpeech')}
            </h3>
            <p className="text-[#5d5c54] leading-relaxed">
              {t('features.textToSpeechDesc')}
            </p>
            <div className="mt-4 text-sm text-[#5d5c54]">
              {t('features.availableInChatbot')}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              <Download size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('features.pdfGenerator')}
            </h3>
            <p className="text-[#5d5c54] leading-relaxed">
              {t('features.pdfGeneratorDesc')}
            </p>
            <div className="mt-4 text-sm text-[#5d5c54]">
              {t('features.integratedInTDocs')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
