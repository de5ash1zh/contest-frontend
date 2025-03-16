import React, { useEffect } from 'react';
import { useContests } from '../context/ContestsContext';
import { useNotifications } from '../context/NotificationContext';
import ContestCard from './ContestCard';

function ContestList() {
  const { contests, loading, error, filter } = useContests();
  const { scheduleNotification } = useNotifications();

  useEffect(() => {
    // Schedule notifications for all upcoming contests
    contests.forEach(contest => {
      if (new Date(contest.startTime) > new Date()) {
        scheduleNotification(contest);
      }
    });
  }, [contests, scheduleNotification]);

  const filteredContests = contests.filter(
    (contest) => filter === 'all' || contest.platform === filter
  );

  if (loading) {
    return (
      <div className="loading">
        Loading contests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
      </div>
    );
  }

  if (filteredContests.length === 0) {
    return (
      <div className="loading">
        No upcoming contests{filter !== 'all' ? ` for ${filter}` : ''}.
      </div>
    );
  }

  return (
    <div className="contests-grid">
      {filteredContests.map((contest) => (
        <ContestCard 
          key={`${contest.platform}-${contest.name}`} 
          contest={contest} 
        />
      ))}
    </div>
  );
}

export default ContestList;
