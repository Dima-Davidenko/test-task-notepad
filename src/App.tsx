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
  const [editingNoteText, setEditingNoteText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    getNotes().then(res => {
      setNotes(res.records);
    });
  }, [refreshPage]);
  useEffect(() => {
    if (searchInput) {
      setSelectedNoteID('');
      setIsNoteEditing(false);
    }
  }, [searchInput]);

  const createNote = (note: string = 'Це моя нова записка...') => {
    addNote(note).then(res => {
      setRefreshPage(Date.now());
      setSelectedNoteID(res.record.id);
      setIsNoteEditing(true);
    });
  };

  const confirmDeleteNote = (noteID: string) => {
    setNoteToDeleteID(noteID);
    setIsModalOpen(true);
  };

  const deleteNote = () => {
    deleteNoteAPI(noteToDeleteID).then(() => {
      setNoteToDeleteID('');
      setRefreshPage(Date.now());
    });
    setIsModalOpen(false);
  };

  const cancelDeletionNote = () => {
    setNoteToDeleteID('');
    setIsModalOpen(false);
  };

  const startNoteEditing = () => {
    setIsNoteEditing(true);
  };

  const selectNote = (noteID: string) => {
    setIsNoteEditing(false);
    setEditingNoteText('');
    setRefreshPage(Date.now());
    setSelectedNoteID(noteID);
  };

  const editNote = (noteText: string) => {
    setEditingNoteText(noteText);
    setNotes(notes => {
      const newNotes = [...notes];
      const editedNote = newNotes.find(note => note.id === selectedNoteID) as IRecord;
      editedNote.values.cjW6LtobLbW4dcIwGSiSkE = noteText;
      return newNotes;
    });
    updateNoteAPI(selectedNoteID, noteText);
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
          />
        </div>
      </div>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isModalOpen}
        ariaHideApp={false}
      >
        <p>Please confirm note deletion</p>
        <button onClick={() => deleteNote()}>Confirm deletion</button>
        <button onClick={() => cancelDeletionNote()}>Close</button>
      </ReactModal>
    </NotesContext.Provider>
  );
};

export default App;
