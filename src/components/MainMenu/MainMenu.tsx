import React, { useContext } from 'react';
import ActionBtn from '../ActionBtn/ActionBtn';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';
import css from './MainMenu.module.css';

interface IMainMenu {
  deleteFoo: Function;
  editFoo: Function;
  createNote: Function;
}

const MainMenu: React.FC<IMainMenu> = ({ deleteFoo, editFoo, createNote }) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const selectedNoteID = notesContext.selectedNoteID;
  return (
    <div className={css.mainMenu}>
      <ActionBtn onClickFoo={createNote} disabled={false} title="Створити" />
      <ActionBtn
        onClickFoo={deleteFoo}
        disabled={!selectedNoteID}
        selectedNoteID={selectedNoteID}
        title="Видалити"
      />
      <ActionBtn
        onClickFoo={editFoo}
        disabled={!selectedNoteID}
        selectedNoteID={selectedNoteID}
        title="Редагувати"
      />
    </div>
  );
};

export default MainMenu;
