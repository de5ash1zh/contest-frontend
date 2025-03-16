import React, { useState } from 'react';
import { format } from 'date-fns';
import ContestTimer from './ContestTimer';
import ContestNotes from './ContestNotes';
import { downloadCalendarFile } from '../utils/calendarUtils';
import { useNotes } from '../context/NotesContext';

function ContestCard({ contest }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { notes } = useNotes();
  return (
    <div className="contest-card">
      <div className="card-header">
        <span className="platform-badge">
          {contest.platform}
        </span>
        <ContestTimer startTime={contest.startTime} />
      </div>
      
      <h3 className="contest-name">{contest.name}</h3>
      
      <div className="contest-info">
        <span>📅</span>
        <span>{format(new Date(contest.startTime), 'MMM dd, yyyy HH:mm')}</span>
      </div>
      
      <div className="contest-info">
        <span>⏱️</span>
        <span>{contest.duration}</span>
      </div>
      
      <div className="contest-actions">
        <div className="primary-actions">
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contest-link"
          >
            View Contest
          </a>
          <button
            className={`calendar-button ${isAdding ? 'adding' : ''}`}
            onClick={async () => {
              setIsAdding(true);
              await downloadCalendarFile(contest);
              setIsAdding(false);
            }}
            disabled={isAdding}
          >
            {isAdding ? '📅 Adding...' : '📅 Add to Calendar'}
          </button>
        </div>
        <button
          className={`notes-button ${notes[contest.id] ? 'has-notes' : ''}`}
          onClick={() => setIsNotesOpen(true)}
          title={notes[contest.id] ? 'View/Edit Notes' : 'Add Notes'}
        >
          {notes[contest.id] ? '📋' : '✍️'}
        </button>
        <ContestNotes
          contestId={contest.id}
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
        />
      </div>
    </div>
  );
}

export default ContestCard;
