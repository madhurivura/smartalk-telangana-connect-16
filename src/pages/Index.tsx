
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import ValueProposition from '@/components/ValueProposition';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import PersonalizedSchemes from '@/components/PersonalizedSchemes';
import MobileShowcase from '@/components/MobileShowcase';
import SmartChatbot from '@/components/SmartChatbot';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  // Fix auto-scroll bug by ensuring page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Advantages />
      <ValueProposition />
      <FeaturesShowcase />
      <PersonalizedSchemes />
      <MobileShowcase />
      <section id="chatbot" className="py-20 bg-[#3c392b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#e1dbd1] mb-4">
              Ask Riya
            </h2>
            <p className="text-lg text-[#cbccc1]">
              {t('chatbot.subtitle')}
            </p>
          </div>
          <SmartChatbot />
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
