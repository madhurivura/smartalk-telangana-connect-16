
import React from 'react';
import { Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#3c392b] text-[#cbccc1] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-xl font-bold text-[#e1dbd1] mb-4">SmartTalk Telangana</h3>
            <p className="text-[#94928b] leading-relaxed">
              Making government services accessible to all citizens of Telangana through smart technology and multilingual support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#e1dbd1] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">About</a>
              </li>
              <li>
                <a href="#features" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">Features</a>
              </li>
              <li>
                <a href="#chatbot" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">Chatbot</a>
              </li>
              <li>
                <a href="#contact" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[#e1dbd1] mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">smarttalk.telangana@gov.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">+91-40-XXXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">Available in Telugu & English</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#4d4330] mt-8 pt-8 text-center">
          <p className="text-[#94928b]">
            © 2024 SmartTalk Telangana. Built for Telangana Government Hackathon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
