import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TUserState } from '../types/UserState';

const initialState: TUserState = {
  username: "",
  firstName: "",
  lastName: "",
  middleName: "",
  isAdmin: false,
  isModerator: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserState>) => {
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.lastName = action.payload.lastName;
      state.isAdmin = action.payload.isAdmin;
      state.isModerator = action.payload.isModerator;
    },
    logout: (state) => {
      state.username = initialState.username;
      state.firstName = initialState.firstName;
      state.middleName = initialState.middleName;
      state.lastName = initialState.lastName;
      state.isAdmin = initialState.isAdmin;
      state.isModerator = initialState.isModerator;
    }
  },
});

export const {
  setUser, logout
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

