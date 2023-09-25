import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userId: null,
  nikename: null,
  email: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      nikename: payload.nikename,
      userId: payload.userId,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => authInitialState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;
