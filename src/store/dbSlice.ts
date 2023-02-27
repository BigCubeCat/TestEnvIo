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
    empty: (state) => {
      state.dbList = [];
    }
  },
});

export const {
  setDbList, empty, removeDb, addDb
} = dbSlice.actions;

export const selectTags = (state: RootState) => state.dbList.dbList;
export default dbSlice.reducer;

