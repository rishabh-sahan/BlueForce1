import React from 'react';
import i18n from '../i18n/i18n';

const LanguageSwitcher: React.FC = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('preferredLanguage', lng);
    } catch (error) {
      // Ignore localStorage errors
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => changeLanguage('en')} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">EN</button>
      <button onClick={() => changeLanguage('hi')} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">हिंदी</button>
      <button onClick={() => changeLanguage('kn')} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">ಕನ್ನಡ</button>
    </div>
  );
};

export default LanguageSwitcher; 