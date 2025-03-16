import React from 'react';
import { useNotifications } from '../context/NotificationContext';

function NotificationSettings({ isOpen, onClose }) {
  const { 
    permission,
    settings,
    toggleNotifications,
    toggleNotificationTime,
    requestPermission
  } = useNotifications();

  if (!isOpen) return null;

  const handleMainToggle = async () => {
    await toggleNotifications(!settings.enabled);
  };

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-modal" onClick={e => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notification Settings</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="notification-content">
          {permission === 'denied' ? (
            <div className="notification-warning">
              ⚠️ Notifications are blocked. Please enable them in your browser settings.
            </div>
          ) : (
            <>
              <div className="notification-main-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={handleMainToggle}
                  />
                  Enable Contest Notifications
                </label>
              </div>

              <div className="notification-times">
                <h4>Notify me:</h4>
                {settings.notifyAt.map(({ minutes, label, enabled }) => (
                  <label key={minutes} className="time-option">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => toggleNotificationTime(minutes, e.target.checked)}
                      disabled={!settings.enabled}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="notification-info">
                🔔 You'll receive notifications before contests start based on your selected preferences.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
