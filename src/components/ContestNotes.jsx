import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';

function ContestNotes({ contestId, isOpen, onClose }) {
  const { notes, addNote, deleteNote } = useNotes();
  const [noteText, setNoteText] = useState(notes[contestId] || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    if (noteText.trim()) {
      addNote(contestId, noteText.trim());
    } else {
      deleteNote(contestId);
    }
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="notes-overlay" onClick={onClose}>
      <div className="notes-modal" onClick={e => e.stopPropagation()}>
        <div className="notes-header">
          <h3>Contest Notes</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <textarea
          className="notes-textarea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add your notes about this contest..."
          autoFocus
        />
        <div className="notes-footer">
          <button 
            className="delete-button"
            onClick={() => {
              deleteNote(contestId);
              onClose();
            }}
            disabled={!notes[contestId]}
          >
            🗑️ Delete
          </button>
          <button 
            className="save-button"
            onClick={handleSave}
            disabled={isSaving || noteText === notes[contestId]}
          >
            {isSaving ? '💾 Saving...' : '💾 Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContestNotes;
