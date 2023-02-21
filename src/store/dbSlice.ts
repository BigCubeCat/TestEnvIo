import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { DBType } from "../types/DBType";

export interface DbState {
  all: DBType[];
  size: number;
}

const initialState: DbState = {
  all: [],
  size: 0
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    setDbList: (state, action: PayloadAction<Array<DBType>>) => {
      state.all = action.payload;
    },
    addDb: (state, action: PayloadAction<DBType>) => {
      state.all.push(action.payload);
    },
    empty: (state) => {
      state.all = [];
    }
  },
});

export const {
  addDb, empty, setDbList
} = dbSlice.actions;

export const selectAllDB = (state: RootState) => state.databases.all;
export default dbSlice.reducer;

