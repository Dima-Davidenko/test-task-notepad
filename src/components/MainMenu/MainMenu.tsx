import React, { useContext } from 'react';
import ActionBtn from '../ActionBtn/ActionBtn';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';

interface IMainMenu {
  deleteFoo: Function;
  editFoo: Function;
  createNote: Function;
}

const MainMenu: React.FC<IMainMenu> = ({ deleteFoo, editFoo, createNote }) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const selectedNoteID = notesContext.selectedNoteID;
  return (
    <div className="mainMenu">
      <ActionBtn onClickFoo={createNote} disabled={false} title="Add" />
      <ActionBtn
        onClickFoo={deleteFoo}
        disabled={!selectedNoteID}
        selectedNoteID={selectedNoteID}
        title="Delete"
      />
      <ActionBtn
        onClickFoo={editFoo}
        disabled={!selectedNoteID}
        selectedNoteID={selectedNoteID}
        title="Edit"
      />
    </div>
  );
};

export default MainMenu;
