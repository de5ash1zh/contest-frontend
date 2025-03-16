import { useState } from 'react';
import ContestList from './components/ContestList';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import { useTheme } from './context/ThemeContext';
import { useNotifications } from './context/NotificationContext';
import NotificationSettings from './components/NotificationSettings';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const { settings, permission } = useNotifications();

  return (
    <>
      <div className="container">
        <Header />
        <FilterBar />
        <ContestList />
      </div>
      <div className="floating-buttons">
        <button
          className="notification-toggle"
          onClick={() => setIsNotificationSettingsOpen(true)}
          aria-label="Notification Settings"
        >
          {settings.enabled && permission === 'granted' ? '🔔' : '🔕'}
        </button>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <NotificationSettings
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
      />
    </>  
  );
}

export default App;
