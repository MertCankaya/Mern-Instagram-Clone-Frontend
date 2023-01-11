import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

export const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    onError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { onError } = error.actions;

export default error.reducer;
