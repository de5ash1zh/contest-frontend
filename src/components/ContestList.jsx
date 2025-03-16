import React from 'react';
import { useContests } from '../context/ContestsContext';
import ContestCard from './ContestCard';

function ContestList() {
  const { contests, loading, error, filter } = useContests();

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
