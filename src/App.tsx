import React, { useEffect, useState } from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/Sidebar/Sidebar';
import Workspace from './components/Workspace/Workspace';
import { addNote, deleteNoteAPI, getNotes, updateNoteAPI } from './utils/quintaDB/notes';
import { NotesContext } from './components/NotesContext/NotesContext';
import { IRecord } from './components/types/notes';
import NotesList from './components/NotesList/NotesList';
import MainMenu from './components/MainMenu/MainMenu';
import SearchBox from './components/SearchBox/SearchBox';
import ReactModal from 'react-modal';

const App = () => {
  const [refreshPage, setRefreshPage] = useState(Date.now());
  const [notes, setNotes] = useState<Array<IRecord> | []>([]);
  const [selectedNoteID, setSelectedNoteID] = useState<string>('');
  const [noteToDeleteID, setNoteToDeleteID] = useState<string>('');
  const [isNoteEditing, setIsNoteEditing] = useState<boolean>(false);
  const [isNoteChanged, setIsNoteChanged] = useState<boolean>(false);
  const [editingNoteText, setEditingNoteText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Gets all notes from server
  useEffect(() => {
    getNotes().then(res => {
      setNotes(res.records);
    });
  }, [refreshPage]);

  // Clears note selection when there are changes in search input
  useEffect(() => {
    if (searchInput) {
      setSelectedNoteID('');
      setIsNoteEditing(false);
    }
  }, [searchInput]);

  // Create new note on server
  const createNote = (note: string = 'Це моя нова записка...') => {
    addNote(note).then(res => {
      // After creation - reread all notes from server
      setRefreshPage(Date.now());
      // Make created note editable and focused
      setSelectedNoteID(res.record.id);
      setIsNoteEditing(true);
    });
  };

  // Open confirmation modal window, save noteID that has to be deleted
  const confirmDeleteNote = (noteID: string) => {
    setNoteToDeleteID(noteID);
    setIsModalOpen(true);
  };

  // Delete note from server
  const deleteNote = () => {
    deleteNoteAPI(noteToDeleteID).then(() => {
      setNoteToDeleteID('');
      setRefreshPage(Date.now());
    });
    setIsModalOpen(false);
  };

  // Clear note to delete, when user canceled deletion
  const cancelDeletionNote = () => {
    setNoteToDeleteID('');
    setIsModalOpen(false);
  };

  // Start note editing
  const startNoteEditing = () => {
    setIsNoteEditing(true);
  };

  // Select note in note list, cancel note editing, set selected note ID
  const selectNote = (noteID: string) => {
    setIsNoteEditing(false);
    setEditingNoteText('');
    setSelectedNoteID(noteID);
  };

  // Change editing note
  const editNote = (noteText: string) => {
    setEditingNoteText(noteText);
    const editedNote = notes.find(note => note.id === selectedNoteID)?.values
      .cNuCoUWPDdAlRcO30iDCkc;
    // If note changed - set the flag that indicates that this note should be saved on server
    if (editedNote !== noteText) setIsNoteChanged(true);
    // Change note text locally in state
    setNotes(notes => {
      const newNotes = [...notes];
      const editedNote = newNotes.find(note => note.id === selectedNoteID) as IRecord;
      editedNote.values.cNuCoUWPDdAlRcO30iDCkc = noteText;
      return newNotes;
    });
  };

  // Saving note on server
  const saveNote = () => {
    const editedNote = notes.find(note => note.id === selectedNoteID) as IRecord;
    const noteText = editedNote.values.cNuCoUWPDdAlRcO30iDCkc;
    // Save only if note text changed
    if (isNoteChanged) {
      updateNoteAPI(selectedNoteID, noteText).then(() => {
        setIsNoteChanged(false);
      });
    }
    setIsNoteEditing(false);
    setEditingNoteText('');
  };

  return (
    <NotesContext.Provider value={{ notes, selectedNoteID, isNoteEditing }}>
      <div className="App">
        <TopBar>
          <MainMenu
            deleteFoo={confirmDeleteNote}
            editFoo={startNoteEditing}
            createNote={createNote}
          />
          <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        </TopBar>
        <div className="sideBar-workSpace-wrapper">
          <Sidebar>
            <NotesList selectNote={selectNote} searchInput={searchInput} />
          </Sidebar>
          <Workspace
            isNoteEditing={isNoteEditing}
            startNoteEditing={startNoteEditing}
            editingNoteText={editingNoteText}
            editNote={editNote}
            saveNote={saveNote}
          />
        </div>
      </div>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isModalOpen}
        ariaHideApp={false}
      >
        <p className="message">Будь ласка підтвердіть видалення нотатки</p>
        <div>
          <button className="btn" onClick={() => deleteNote()}>
            Видалити назавжди
          </button>
          <button className="btn" onClick={() => cancelDeletionNote()}>
            Відмінити
          </button>
        </div>
      </ReactModal>
    </NotesContext.Provider>
  );
};

export default App;
