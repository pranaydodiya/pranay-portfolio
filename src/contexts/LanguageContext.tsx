
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'hi';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  'hero.greeting': {
    en: 'Hi, I\'m',
    es: 'Hola, soy',
    fr: 'Salut, je suis',
    hi: 'नमस्ते, मैं हूँ'
  },
  'hero.roles.fullstack': {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack',
    fr: 'Développeur Full Stack',
    hi: 'फुल स्टैक डेवलपर'
  },
  'hero.contact': {
    en: 'Get In Touch',
    es: 'Ponerse en contacto',
    fr: 'Prendre contact',
    hi: 'संपर्क करें'
  },
  'hero.resume': {
    en: 'View Resume',
    es: 'Ver currículum',
    fr: 'Voir le CV',
    hi: 'रिज्यूमे देखें'
  },
  'nav.about': {
    en: 'About',
    es: 'Acerca de',
    fr: 'À propos',
    hi: 'के बारे में'
  },
  'nav.skills': {
    en: 'Skills',
    es: 'Habilidades',
    fr: 'Compétences',
    hi: 'कौशल'
  },
  'nav.projects': {
    en: 'Projects',
    es: 'Proyectos',
    fr: 'Projets',
    hi: 'परियोजनाएं'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto',
    fr: 'Contact',
    hi: 'संपर्क'
  },
  'skills.title': {
    en: 'My Skills',
    es: 'Mis Habilidades',
    fr: 'Mes Compétences',
    hi: 'मेरे कौशल'
  },
  'chatbot.welcome': {
    en: 'Ask me anything about Pranay\'s portfolio!',
    es: '¡Pregúntame sobre el portafolio de Pranay!',
    fr: 'Demandez-moi tout sur le portfolio de Pranay!',
    hi: 'प्रणय के पोर्टफोलियो के बारे में कुछ भी पूछें!'
  },
  'search.placeholder': {
    en: 'Search projects, skills, blog posts...',
    es: 'Buscar proyectos, habilidades, publicaciones...',
    fr: 'Rechercher projets, compétences, articles...',
    hi: 'प्रोजेक्ट्स, स्किल्स, ब्लॉग पोस्ट खोजें...'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['en', 'es', 'fr', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t,
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
