
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import ValueProposition from '@/components/ValueProposition';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import Blog from '@/components/Blog';
import MobileShowcase from '@/components/MobileShowcase';
import ChatbotSection from '@/components/ChatbotSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Advantages />
      <ValueProposition />
      <FeaturesShowcase />
      <Blog />
      <MobileShowcase />
      <ChatbotSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
