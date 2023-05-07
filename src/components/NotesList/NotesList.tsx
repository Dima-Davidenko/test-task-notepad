import { useContext } from 'react';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';
import css from './NotesList.module.css';

interface INotesList {
  searchInput: string;
  selectNote: (noteID: string) => void;
}

const NotesList: React.FC<INotesList> = ({ selectNote, searchInput }) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const selectedNoteID = notesContext.selectedNoteID;
  const notes = (
    searchInput
      ? notesContext.notes.filter(note =>
          note.values.cjW6LtobLbW4dcIwGSiSkE.toLocaleLowerCase().includes(searchInput.toLowerCase())
        )
      : notesContext.notes
  ).sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  return (
    <div className={css.container}>
      {searchInput && (
        <p className={css.findResult}>
          {notes.length === 0
            ? `Строку "${searchInput}" не містить жодна нотатка`
            : `Строку "${searchInput}" ${notes.length % 10 === 1 ? 'містить' : 'містять'} ${
                notes.length
              } ${
                notes.length % 10 === 0 || notes.length % 10 >= 5
                  ? 'нотаток'
                  : notes.length % 10 === 1
                  ? 'нотатка'
                  : 'нотатки'
              }`}
        </p>
      )}

      <ul>
        {notes.map(({ id, values, updated_at }) => (
          <li
            className={`${css.noteItem} ${id === selectedNoteID ? css.selectedNote : ''}`}
            key={id}
            onClick={() => selectNote(id)}
          >
            <p className={css.date}>
              {new Date(Date.parse(updated_at)).toLocaleDateString()}{' '}
              {new Date(Date.parse(updated_at)).toLocaleTimeString()}
            </p>
            <p className={css.notePreview}>
              {values.cjW6LtobLbW4dcIwGSiSkE.length > 50
                ? values.cjW6LtobLbW4dcIwGSiSkE.slice(0, 50) + '...'
                : values.cjW6LtobLbW4dcIwGSiSkE}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
