import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const DEFAULT_NOTIFICATION_TIMES = [
  { minutes: 60, label: '1 hour before' },
  { minutes: 30, label: '30 minutes before' },
  { minutes: 15, label: '15 minutes before' },
  { minutes: 5, label: '5 minutes before' }
];

export function NotificationProvider({ children }) {
  const [permission, setPermission] = useState('default');
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      enabled: false,
      notifyAt: DEFAULT_NOTIFICATION_TIMES.map(t => ({ ...t, enabled: false }))
    };
  });
  
  useEffect(() => {
    // Check initial permission
    setPermission(Notification.permission);
    
    // Save settings to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }, [settings]);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        setSettings(prev => ({ ...prev, enabled: true }));
      }
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  const scheduleNotification = (contest) => {
    if (!settings.enabled || permission !== 'granted') return;

    const startTime = new Date(contest.startTime).getTime();
    const now = Date.now();

    settings.notifyAt.forEach(({ minutes, enabled }) => {
      if (!enabled) return;

      const notifyTime = startTime - (minutes * 60 * 1000);
      if (notifyTime > now) {
        const timeoutId = setTimeout(() => {
          new Notification(`Contest Starting Soon: ${contest.name}`, {
            body: `${contest.platform} contest starts in ${minutes} minute${minutes !== 1 ? 's' : ''}`,
            icon: '/favicon.ico',
            tag: `contest-${contest.id}-${minutes}`,
            requireInteraction: true
          });
        }, notifyTime - now);

        // Store timeout ID for cleanup
        return timeoutId;
      }
    });
  };

  const toggleNotifications = async (enabled) => {
    if (enabled && permission !== 'granted') {
      const result = await requestPermission();
      if (result !== 'granted') return;
    }
    setSettings(prev => ({ ...prev, enabled }));
  };

  const toggleNotificationTime = (minutes, enabled) => {
    setSettings(prev => ({
      ...prev,
      notifyAt: prev.notifyAt.map(t => 
        t.minutes === minutes ? { ...t, enabled } : t
      )
    }));
  };

  return (
    <NotificationContext.Provider value={{
      permission,
      settings,
      toggleNotifications,
      toggleNotificationTime,
      scheduleNotification,
      requestPermission
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
