import { useState, useEffect } from 'react';

function ContestTimer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startTime);
      const difference = start - now;

      if (difference <= 0) {
        setStatus('LIVE');
        setTimeLeft('');
        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Format the time left
      let timeString = '';
      if (days > 0) {
        timeString = `${days}d ${hours}h`;
      } else if (hours > 0) {
        timeString = `${hours}h ${minutes}m`;
      } else if (minutes > 0) {
        timeString = `${minutes}m ${seconds}s`;
      } else {
        timeString = `${seconds}s`;
      }

      setTimeLeft(timeString);
      setStatus('UPCOMING');
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className={`contest-timer ${status.toLowerCase()}`}>
      {status === 'LIVE' ? (
        <span className="live-indicator">🔴 LIVE NOW</span>
      ) : (
        <>
          <span className="timer-label">Starts in:</span>
          <span className="timer-value">{timeLeft}</span>
        </>
      )}
    </div>
  );
}

export default ContestTimer;
