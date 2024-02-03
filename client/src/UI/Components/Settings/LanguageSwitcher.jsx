// LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Typography } from 'antd';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Save selected language to localStorage
  };

  // Retrieve the saved language from localStorage on component mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div>
      <Typography>{i18n.t('components.LanguageSwitcher.Label')}: </Typography>
      <Select defaultValue={i18n.language} onChange={changeLanguage}>
        <Option value="en">English</Option>
        <Option value="ru">Русский</Option>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
