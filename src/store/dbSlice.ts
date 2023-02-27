import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBType } from '../types/DBType';
import { RootState } from './store';

const initialState: { dbList: DBType[] } = {
  dbList: []
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
    }
  },
});

export const {
  setDbList, empty, removeDb, addDb, editDb
} = dbSlice.actions;

export const selectDbList = (state: RootState) => state.dbList.dbList;
export default dbSlice.reducer;

