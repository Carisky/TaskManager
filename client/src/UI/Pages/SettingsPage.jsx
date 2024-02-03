import React from 'react'
import PageLayout from './PageLayout'
import { Typography } from 'antd'
import LanguageSwitcher from '../Components/Settings/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import ThemeSwitcher from '../Components/Settings/ThemeSwitcher'
export default function SettingsPage() {
    const {t} = useTranslation()
  return (
    <PageLayout>
      <Typography.Title>
        {t("pages.settingsPage.Title")}
      </Typography.Title>
      <LanguageSwitcher/>
      <ThemeSwitcher/>
    </PageLayout>
  )
}
