
import React, { useState } from 'react';
import { MessageCircle, FileText, CreditCard, MapPin, Volume2, Mic } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TDocsSystem from './TDocsSystem';
import ENagrikCards from './ENagrikCards';
import EnhancedChatbot from './EnhancedChatbot';
import MeesevaCenterLocator from './MeesevaCenterLocator';

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
    },
    {
      id: 'meeseva',
      icon: <MapPin size={32} className="text-[#44646f]" />,
      title: t('features.meesevaLocator'),
      description: t('features.meesevaLocatorDesc'),
      component: <MeesevaCenterLocator />
    }
  ];

  const governmentPortals = [
    {
      name: t('portals.bhuvan'),
      description: t('portals.bhuvanDesc'),
      icon: '🛰️'
    },
    {
      name: t('portals.telanganaPortal'),
      description: t('portals.telanganaPortalDesc'),
      icon: '🏛️'
    },
    {
      name: t('portals.epass'),
      description: t('portals.epassDesc'),
      icon: '🎓'
    },
    {
      name: t('portals.prajavani'),
      description: t('portals.prajavaniDesc'),
      icon: '🗣️'
    },
    {
      name: t('portals.ipass'),
      description: t('portals.ipassDesc'),
      icon: '🧑‍💼'
    },
    {
      name: t('portals.meeseva'),
      description: t('portals.meesevaDesc'),
      icon: '🧾'
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
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-[#3c392b]">
                {feature?.title}
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.speakInTelugu')}>
                  <Mic size={20} className="text-[#44646f]" />
                </button>
                <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.listenInTelugu')}>
                  <Volume2 size={20} className="text-[#44646f]" />
                </button>
              </div>
            </div>
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
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b]">
              {t('features.title')}
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.speakInTelugu')}>
                <Mic size={20} className="text-[#44646f]" />
              </button>
              <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.listenInTelugu')}>
                <Volume2 size={20} className="text-[#44646f]" />
              </button>
            </div>
          </div>
          <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openFeature(feature.id)}
            >
              <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-xl font-semibold text-[#3c392b]">
                  {feature.title}
                </h3>
                <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-[#5d5c54] leading-relaxed mb-4">
                {feature.description}
              </p>
              <button className="text-[#44646f] hover:text-[#3c392b] font-medium transition-colors">
                {t('features.tryNow')} →
              </button>
            </div>
          ))}
        </div>

        {/* Government Portals Section - Links Removed */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[#3c392b]">
                {t('portals.title')}
              </h3>
              <div className="flex space-x-2">
                <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.speakInTelugu')}>
                  <Mic size={20} className="text-[#44646f]" />
                </button>
                <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.listenInTelugu')}>
                  <Volume2 size={20} className="text-[#44646f]" />
                </button>
              </div>
            </div>
            <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
              {t('portals.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentPortals.map((portal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mb-2">{portal.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-[#3c392b]">
                        {portal.name}
                      </h4>
                      <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <p className="text-[#5d5c54] text-sm leading-relaxed mb-3">
                      {portal.description}
                    </p>
                    <div className="flex items-center text-[#44646f] text-sm font-medium">
                      <span>सेवा उपलब्ध / Service Available / సేవ అందుబాటులో</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              <Volume2 size={32} className="text-[#44646f]" />
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-xl font-semibold text-[#3c392b]">
                {t('features.textToSpeech')}
              </h3>
              <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-[#5d5c54] leading-relaxed">
              {t('features.textToSpeechDesc')}
            </p>
            <div className="mt-4 text-sm text-[#5d5c54]">
              {t('features.availableInChatbot')}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-[#44646f]" />
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-xl font-semibold text-[#3c392b]">
                {t('features.locationServices')}
              </h3>
              <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-[#5d5c54] leading-relaxed">
              {t('features.locationServicesDesc')}
            </p>
            <div className="mt-4 text-sm text-[#5d5c54]">
              {t('features.integratedInMeeseva')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
