import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBType } from '../types/DBType';
import { RootState } from './store';

const initialState: { dbList: DBType[], currentDb: DBType } = {
  dbList: [],
  currentDb: {
    id: -1, title: "",
    description: "", tags: [],
    author: "@root",
  }
}
export const dbSlice = createSlice({
  name: "dbList",
  initialState,
  reducers: {
    setDbList: (state, action: PayloadAction<DBType[]>) => {
      state.dbList = action.payload;
    },
    addDb: (state, action: PayloadAction<DBType>) => {
      state.dbList.push(action.payload);
    },
    removeDb: (state, action: PayloadAction<number>) => {
      state.dbList = state.dbList.filter(
        (db: DBType) => db.id != action.payload
      );
    },
    editDb: (state, action: PayloadAction<DBType>) => {
      state.dbList = state.dbList.map(
        (db: DBType) => (db.id == action.payload.id) ? action.payload : db)
    },
    empty: (state) => {
      state.dbList = [];
    },
    setCurrent: (state, action: PayloadAction<DBType>) => {
      state.currentDb = action.payload;
    }
  },
});

export const {
  setDbList, empty, removeDb, addDb, editDb,
  setCurrent
} = dbSlice.actions;

export const selectDbList = (state: RootState) => state.dbList.dbList;
export const selectCurrentDb = (state: RootState) => state.dbList.currentDb;
export default dbSlice.reducer;

