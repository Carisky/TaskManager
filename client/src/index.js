import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TasksPage from './UI/Pages/TasksPage';
import ProjectsPage from './UI/Pages/ProjectsPage';
import StatsPage from './UI/Pages/StatsPage';
import i18n from './i18n';
import SettingsPage from './UI/Pages/SettingsPage';
import { theme, ConfigProvider } from 'antd';
import useThemeStore from './store/themeStore';

const App = () => {
  const { algorithm } = useThemeStore();

  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          algorithm: algorithm,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
