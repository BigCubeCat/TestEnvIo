import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tagsReducer from './tagsSlice';
import dbSlice from './dbSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tags: tagsReducer,
    dbList: dbSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

