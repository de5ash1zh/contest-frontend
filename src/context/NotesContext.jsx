import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('contestNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  useEffect(() => {
    localStorage.setItem('contestNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (contestId, note) => {
    setNotes(prev => ({
      ...prev,
      [contestId]: note
    }));
  };

  const deleteNote = (contestId) => {
    setNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[contestId];
      return newNotes;
    });
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
