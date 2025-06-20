
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const { language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'english' 
        ? 'Passwords do not match' 
        : 'పాస్వర్డ్లు సరిపోలలేదు'
      );
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'english' 
        ? 'Password must be at least 6 characters' 
        : 'పాస్వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి'
      );
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.phone || undefined
      );
      
      if (success) {
        onClose();
      } else {
        setError(language === 'english' 
          ? 'Registration failed. Email may already be in use.' 
          : 'రిజిస్ట్రేషన్ విఫలమైంది. ఇమెయిల్ ఇప్పటికే వాడుకలో ఉండవచ్చు.'
        );
      }
    } catch (err) {
      setError(language === 'english' 
        ? 'Registration failed. Please try again.' 
        : 'రిజిస్ట్రేషన్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#3c392b] mb-2">
          {language === 'english' ? 'Create Account' : 'ఖాతా సృష్టించండి'}
        </h2>
        <p className="text-[#5d5c54]">
          {language === 'english' 
            ? 'Join to access personalized government services' 
            : 'వ్యక్తిగతీకరించిన ప్రభుత్వ సేవలను యాక్సెస్ చేయడానికి చేరండి'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={language === 'english' ? 'Full name' : 'పూర్తి పేరు'}
            className="w-full pl-10 pr-4 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={language === 'english' ? 'Email address' : 'ఇమెయిల్ చిరునామా'}
            className="w-full pl-10 pr-4 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={language === 'english' ? 'Phone number (optional)' : 'ఫోన్ నంబర్ (ఐచ్ఛికం)'}
            className="w-full pl-10 pr-4 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={language === 'english' ? 'Password' : 'పాస్వర్డ్'}
            className="w-full pl-10 pr-12 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-[#44646f] hover:text-[#3c392b]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={language === 'english' ? 'Confirm password' : 'పాస్వర్డ్ నిర్ధారించండి'}
            className="w-full pl-10 pr-4 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#44646f] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? (language === 'english' ? 'Creating account...' : 'ఖాతా సృష్టిస్తోంది...') 
            : (language === 'english' ? 'Create Account' : 'ఖాతా సృష్టించండి')
          }
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[#5d5c54]">
          {language === 'english' ? 'Already have an account? ' : 'ఇప్పటికే ఖాతా ఉందా? '}
          <button
            onClick={onSwitchToLogin}
            className="text-[#44646f] hover:underline font-medium"
          >
            {language === 'english' ? 'Sign in' : 'సైన్ ఇన్'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
