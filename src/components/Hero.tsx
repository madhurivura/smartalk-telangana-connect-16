
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToChatbot = () => {
    const element = document.getElementById('chatbot');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-[#3c392b] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Personalized Greeting */}
        <div className="mb-6">
          <p className="text-[#cbccc1] text-lg mb-2">Hi, Lakshmi! 👋</p>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#e1dbd1] mb-6 leading-tight">
          SmartTalk{' '}
          <span className="text-[#44646f]">Telangana</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-xl md:text-2xl text-[#cbccc1] mb-8 max-w-2xl mx-auto leading-relaxed">
          Making government services accessible to all. 
          <span className="block mt-2 text-[#94928b]">
            Get help with documents, schemes, and services in your language.
          </span>
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToChatbot}
          className="bg-[#44646f] hover:bg-opacity-90 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto space-x-2"
        >
          <span>Get Started</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <ArrowDown size={32} className="text-[#94928b] mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
