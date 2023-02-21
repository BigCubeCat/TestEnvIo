import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dbReducer from './dbSlice';

export const store = configureStore({
  reducer: {
    databases: dbReducer,
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

