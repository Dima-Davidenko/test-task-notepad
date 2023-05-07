import React, { useContext } from 'react';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';

interface IWorkspace {
  isNoteEditing: boolean;
  editingNoteText: string;
  editNote: (noteText: string) => void;
}

const Workspace: React.FC<IWorkspace> = ({ isNoteEditing, editingNoteText, editNote }) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const notes = notesContext.notes;
  const selectedNoteID = notesContext.selectedNoteID;
  const selectedNoteText = notes.find(record => record.id === selectedNoteID)?.values
    .cjW6LtobLbW4dcIwGSiSkE;
  if (!isNoteEditing) {
    return <div className="workSpace">{selectedNoteText}</div>;
  } else {
    return (
      <textarea
        onChange={e => editNote(e.target.value)}
        value={editingNoteText ? editingNoteText : selectedNoteText}
      ></textarea>
    );
  }
};

export default Workspace;
