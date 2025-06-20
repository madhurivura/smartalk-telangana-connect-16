
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError(language === 'english' 
          ? 'Invalid email or password' 
          : 'చెల్లని ఇమెయిల్ లేదా పాస్వర్డ్'
        );
      }
    } catch (err) {
      setError(language === 'english' 
        ? 'Login failed. Please try again.' 
        : 'లాగిన్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full mx-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#3c392b] mb-2">
          {language === 'english' ? 'Welcome Back' : 'తిరిగి స్వాగతం'}
        </h2>
        <p className="text-[#5d5c54]">
          {language === 'english' 
            ? 'Sign in to access government services' 
            : 'ప్రభుత్వ సేవలను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'english' ? 'Email address' : 'ఇమెయిల్ చిరునామా'}
            className="w-full pl-10 pr-4 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-[#44646f]" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            ? (language === 'english' ? 'Signing in...' : 'సైన్ ఇన్ అవుతోంది...') 
            : (language === 'english' ? 'Sign In' : 'సైన్ ఇన్')
          }
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[#5d5c54]">
          {language === 'english' ? "Don't have an account? " : "ఖాతా లేదా? "}
          <button
            onClick={onSwitchToRegister}
            className="text-[#44646f] hover:underline font-medium"
          >
            {language === 'english' ? 'Sign up' : 'సైన్ అప్'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
