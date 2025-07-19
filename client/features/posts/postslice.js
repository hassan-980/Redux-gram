import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const URL='https://redux-gram-server.onrender.com';

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);





export const getGlobalPosts = createAsyncThunk(
  'post/getGlobalPost',
  async ({ skip, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/api/posts/get-all-data?skip=${skip}&limit=${limit}`);
      return response.data

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error loading posts');
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

      //create post
      .addCase(createPost.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
              
            })
            .addCase(createPost.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
  },
});



export const {} = postSlice.actions;
export default postSlice.reducer;
