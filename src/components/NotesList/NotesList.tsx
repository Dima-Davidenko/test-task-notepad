import { useContext } from 'react';
import { IStoreContext, NotesContext } from '../NotesContext/NotesContext';

interface INotesList {
  searchInput: string;
  selectNote: (noteID: string) => void;
}

const NotesList: React.FC<INotesList> = ({ selectNote, searchInput }) => {
  const notesContext = useContext<IStoreContext>(NotesContext);
  const notes = searchInput
    ? notesContext.notes.filter(note =>
        note.values.cjW6LtobLbW4dcIwGSiSkE.toLocaleLowerCase().includes(searchInput.toLowerCase())
      )
    : notesContext.notes;
  return (
    <div>
      {searchInput && (
        <p>
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
        {notes.map(({ id, values }) => (
          <li key={id} onClick={() => selectNote(id)}>
            {values.cjW6LtobLbW4dcIwGSiSkE}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
