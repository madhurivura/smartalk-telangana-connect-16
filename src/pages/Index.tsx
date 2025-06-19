
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import ValueProposition from '@/components/ValueProposition';
import Features from '@/components/Features';
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
      <Features />
      <Blog />
      <MobileShowcase />
      <ChatbotSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
