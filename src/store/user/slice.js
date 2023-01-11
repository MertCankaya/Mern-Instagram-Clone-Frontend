import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  suggestions: [],
  profileUser: null,
  loading: false,
  followingUsers: [],
  followSuccess: false,
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getSuggestedUsersRequest: (state) => {
      state.loading = true;
    },
    getSuggestedUsersSuccess: (state, action) => {
      state.suggestions = action.payload;
      state.loading = true;
    },
    followUserRequest: (state) => {
      state.loading = true;
    },
    followUserSuccess: (state) => {
      state.loading = false;
    },
    getUserProfileRequest: (state) => {
      state.loading = true;
    },
    getUserProfileSuccess: (state, action) => {
      state.profileUser = action.payload;
      state.loading = false;
    },
    getFollowingUserRequest: (state) => {
      state.loading = true;
    },
    getFollowingUserSuccess: (state, action) => {
      state.followingUsers = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getSuggestedUsersRequest,
  getSuggestedUsersSuccess,
  followUserRequest,
  followUserSuccess,
  getUserProfileRequest,
  getUserProfileSuccess,
  getFollowingUserRequest,
  getFollowingUserSuccess,
} = users.actions;

export default users.reducer;
