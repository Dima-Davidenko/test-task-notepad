import { createContext } from 'react';
import { IRecord } from '../types/notes';

export interface IStoreContext {
  notes: Array<IRecord> | [];
  selectedNoteID: string;
  isNoteEditing: boolean;
}

export const NotesContext = createContext<IStoreContext>({
  notes: [],
  selectedNoteID: '',
  isNoteEditing: false,
});
