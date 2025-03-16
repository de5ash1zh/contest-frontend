import React from 'react';
import { format } from 'date-fns';

function ContestCard({ contest }) {
  return (
    <div className="contest-card">
      <span className="platform-badge">
        {contest.platform}
      </span>
      
      <h3 className="contest-name">{contest.name}</h3>
      
      <div className="contest-info">
        <span>📅</span>
        <span>{format(new Date(contest.startTime), 'MMM dd, yyyy HH:mm')}</span>
      </div>
      
      <div className="contest-info">
        <span>⏱️</span>
        <span>{contest.duration}</span>
      </div>
      
      <a
        href={contest.url}
        target="_blank"
        rel="noopener noreferrer"
        className="contest-link"
      >
        View Contest
      </a>
    </div>
  );
}

export default ContestCard;
