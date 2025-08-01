import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;

// const URL='https://redux-gram-server.onrender.com';

const URL = import.meta.env.VITE_SERVER_URL;

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/api/posts/create-post`, data, {
        withCredentials: true,
      });
      if(res.data){
        toast.success("Post created successfully");
      }
      
      return res.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getGlobalPosts = createAsyncThunk(
  "post/getGlobalPost",
  async ({ skip, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/api/posts/get-all-data?skip=${skip}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error loading posts"
      );
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "get/getUserPosts",
  async (thunkAPI) => {
    try {
      const res = await axios.get(`${URL}/api/posts/get-user-posts`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    totalpost: 0,
    skip: 0,
    limit: 5,
    loading: false,
    error: null,
    success: null,
    userposts: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGlobalPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.globalPosts];
        state.totalpost = action.payload.total;
        state.skip += state.limit;
      })
      .addCase(getGlobalPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //CREATE POST
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.posts = [{ ...action.payload.post }, ...state.posts];
        state.userposts = [{ ...action.payload.post }, ...state.userposts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //GET USER POSTS
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userposts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
