import React, { useContext } from 'react';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';
import css from './Workspace.module.css';

interface IWorkspace {
  isNoteEditing: boolean;
  editingNoteText: string;
  startNoteEditing: () => void;
  editNote: (noteText: string) => void;
  saveNote: () => void;
}

const Workspace: React.FC<IWorkspace> = ({
  isNoteEditing,
  editingNoteText,
  editNote,
  startNoteEditing,
  saveNote,
}) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const notes = notesContext.notes;
  const selectedNoteID = notesContext.selectedNoteID;
  const selectedNoteText = notes.find(record => record.id === selectedNoteID)?.values
    .cNuCoUWPDdAlRcO30iDCkc;
  if (!isNoteEditing) {
    return (
      <div className={css.workspace} onClick={() => (selectedNoteID ? startNoteEditing() : null)}>
        {selectedNoteText?.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  } else {
    return (
      <textarea
        className={css.textArea}
        autoFocus
        onChange={e => editNote(e.target.value)}
        value={editingNoteText ? editingNoteText : selectedNoteText}
        onBlur={saveNote}
      ></textarea>
    );
  }
};

export default Workspace;
