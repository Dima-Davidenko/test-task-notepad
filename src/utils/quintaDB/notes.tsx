import axios from 'axios';
import { IRecord, IRes } from '../../components/types/notes';

export const getNotes = async () => {
  const { data } = await axios.get<IRes>(
    `https://QuintaDB.com/apps/${process.env.REACT_APP_DB_ID}/dtypes/entity/${process.env.REACT_APP_ENTITY_ID}.json`,
    {
      params: {
        rest_api_key: process.env.REACT_APP_REST_API_KEY,
      },
    }
  );
  return data;
};

export const addNote = async (note: string) => {
  const { data } = await axios.post<{ record: IRecord }>(
    `https://QuintaDB.com/apps/${process.env.REACT_APP_DB_ID}/dtypes.json`,
    {
      rest_api_key: process.env.REACT_APP_REST_API_KEY,
      entity_id: process.env.REACT_APP_ENTITY_ID,
      values: {
        cNuCoUWPDdAlRcO30iDCkc: note,
      },
    }
  );
  return data;
};

export const deleteNoteAPI = async (noteID: string) => {
  const { data } = await axios.delete(
    `https://QuintaDB.com/apps/${process.env.REACT_APP_DB_ID}/dtypes/${noteID}.json`,
    {
      params: {
        rest_api_key: process.env.REACT_APP_REST_API_KEY,
      },
    }
  );
  return data;
};

export const updateNoteAPI = async (noteID: string, noteText: string) => {
  const { data } = await axios.put(
    `https://QuintaDB.com/apps/${process.env.REACT_APP_DB_ID}/dtypes/${noteID}.json?rest_api_key=${process.env.REACT_APP_REST_API_KEY}`,
    {
      values: {
        cNuCoUWPDdAlRcO30iDCkc: noteText,
      },
    }
  );
  return data;
};
