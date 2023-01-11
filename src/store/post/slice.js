import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  explorePosts: [],
  postFinished: false,
  likeLoading: false,
  isPostModalOpen: false,
  modalPost: null,
  modalPostLoading: false,
  commentLoading: false,
};

export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsRequest: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostRequest: (state) => {
      state.likeLoading = true;
    },
    getPostSuccess: (state, action) => {
      const index = state.posts.findIndex((post) => {
        return post.post._id === action.payload.post._id;
      });
      const post = state.posts.find((post, idx) => idx === index);
      state.posts.splice(index, 1, {
        post: action.payload.post,
        creator: post.creator,
      });
      state.likeLoading = false;
    },
    getModalPostRequest: (state) => {
      state.modalPostLoading = true;
    },
    getModalPostSuccess: (state, action) => {
      state.modalPost = action.payload;
      state.modalPostLoading = false;
    },
    uploadPostRequest: (state) => {
      state.postFinished = true;
    },
    uploadPostSuccess: (state) => {
      state.postFinished = false;
    },
    likePostRequest: (state) => {
      state.likeLoading = true;
    },
    likePostSuccess: (state) => {
      state.likeLoading = false;
    },
    commentPostRequest: (state) => {
      state.commentLoading = true;
    },
    commentPostSuccess: (state) => {
      state.commentLoading = false;
    },
    getExplorePostsRequest: (state) => {
      state.loading = true;
    },
    getExplorePostsSuccess: (state, action) => {
      state.explorePosts = action.payload;
      state.loading = false;
    },
    postModalOpenHandler: (state) => {
      state.isPostModalOpen = true;
    },

    postModalCloseHandler: (state) => {
      state.isPostModalOpen = false;
    },
  },
});

export const {
  getPostsRequest,
  getPostsSuccess,
  uploadPostRequest,
  uploadPostSuccess,
  likePostRequest,
  likePostSuccess,
  commentPostRequest,
  commentPostSuccess,
  getExplorePostsRequest,
  getExplorePostsSuccess,
  getPostRequest,
  getPostSuccess,
  postModalOpenHandler,
  postModalCloseHandler,
  getModalPostRequest,
  getModalPostSuccess,
} = posts.actions;

export default posts.reducer;
