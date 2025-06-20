
import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text: string, language: 'english' | 'telugu' | 'hindi' = 'english') => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language to appropriate locale codes
    switch (language) {
      case 'telugu':
        utterance.lang = 'te-IN';
        break;
      case 'hindi':
        utterance.lang = 'hi-IN';
        break;
      default:
        utterance.lang = 'en-US';
    }
    
    // Try to find appropriate voice
    const preferredVoice = voices.find(voice => {
      switch (language) {
        case 'telugu':
          return voice.lang.startsWith('te');
        case 'hindi':
          return voice.lang.startsWith('hi');
        default:
          return voice.lang.startsWith('en');
      }
    });
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, voices]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    speak,
    stop,
    voices
  };
};
