import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserRequest: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    registerUserRequest: (state) => {},
    registerUserSuccess: (state, action) => {},
    getLoggedUserRequest: (state, action) => {
      state.loading = true;
    },
    getLoggedUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    fail: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserRequest,
  registerUserSuccess,
  getLoggedUserRequest,
  getLoggedUserSuccess,
  fail,
} = auth.actions;

export default auth.reducer;
