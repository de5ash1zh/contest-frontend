import React from 'react';
import { useContests } from '../context/ContestsContext';

function FilterBar() {
  const { filter, setFilter } = useContests();
  const platforms = ['all', 'Codeforces', 'LeetCode', 'CodeChef'];

  return (
    <div className="filter-bar">
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => setFilter(platform)}
          className={`filter-button ${filter === platform ? 'active' : ''}`}
        >
          {platform === 'all' ? 'All Contests' : platform}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
