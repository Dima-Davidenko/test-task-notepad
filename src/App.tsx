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

const App = () => {
  const [refreshPage, setRefreshPage] = useState(Date.now());
  const [notes, setNotes] = useState<Array<IRecord> | []>([]);
  const [selectedNoteID, setSelectedNoteID] = useState<string>('');
  const [isNoteEditing, setIsNoteEditing] = useState<boolean>(false);
  const [editingNoteText, setEditingNoteText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  useEffect(() => {
    getNotes().then(res => {
      setNotes(res.records);
      console.log(res);
    });
  }, [refreshPage]);
  useEffect(() => {
    if (searchInput) setSelectedNoteID('');
  }, [searchInput]);

  const createNote = (note: string = 'Start editing your new note...') => {
    addNote(note).then(() => setRefreshPage(Date.now()));
  };

  const deleteNote = (noteID: string) => {
    console.log(noteID);
    deleteNoteAPI(noteID).then(() => setRefreshPage(Date.now()));
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
    updateNoteAPI(selectedNoteID, noteText);
  };

  return (
    <NotesContext.Provider value={{ notes, selectedNoteID, isNoteEditing }}>
      <div className="App">
        <TopBar>
          <MainMenu deleteFoo={deleteNote} editFoo={startNoteEditing} createNote={createNote} />
          <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        </TopBar>
        <div className="sideBar-workSpace-wrapper">
          <Sidebar>
            <NotesList selectNote={selectNote} searchInput={searchInput} />
          </Sidebar>
          <Workspace
            isNoteEditing={isNoteEditing}
            editingNoteText={editingNoteText}
            editNote={editNote}
          />
        </div>
      </div>
    </NotesContext.Provider>
  );
};

export default App;
