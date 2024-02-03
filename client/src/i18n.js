// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json'; // Подключите ваши переводы для английского языка
import ruTranslations from './locales/ru.json'; // Подключите ваши переводы для русского языка

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ru: { translation: ruTranslations }
    },
    fallbackLng: 'en', // Язык по умолчанию
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
