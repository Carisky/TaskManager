import React from 'react';
import useThemeStore from '../../../store/themeStore';
import { theme, Button, Typography } from 'antd';
export default function ThemeSwitcher() {
  const { algorithm, setTheme } = useThemeStore();

  const toggleTheme = () => {
    // Toggle the theme algorithm
    const newTheme = algorithm === theme.defaultAlgorithm ? theme.darkAlgorithm : theme.defaultAlgorithm;
    setTheme(newTheme);
  };

  return (
    <>
      <Typography>Current Theme: {algorithm === theme.defaultAlgorithm ? 'Light' : "Dark"}</Typography>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </>
  );
}
