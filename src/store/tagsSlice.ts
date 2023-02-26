import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { tags: string[] } = {
  tags: []
}
export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tags.push(action.payload);
    },
    empty: (state) => {
      state.tags = [];
    }
  },
});

export const {
  setTags, empty, addTag
} = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.tags;
export default tagsSlice.reducer;

