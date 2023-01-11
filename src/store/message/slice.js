import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
};

export const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessagesRequest: (state) => {
      state.loading = true;
    },
    getMessagesSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    uploadMessageRequest: () => {},
    uploadMessageSuccess: () => {},
  },
});

export const {
  getMessagesRequest,
  getMessagesSuccess,
  uploadMessageRequest,
  uploadMessageSuccess,
} = messages.actions;

export default messages.reducer;
