import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/message/get-messages`,
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

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateSeen: (state, action) => {
      const msg = state.messages.find((m) => m._id === action.payload);
      if (msg) msg.seen = true;
    },
    updateMessageId: (state, action) => {
        const { tempId, id } = action.payload;
      const msg = state.messages.find(msg => msg._id === tempId);
      if (msg) msg._id = id;
      console.log("done", msg)
    //   if (index !== -1) {
    //     state.messages[index] = newMessage;
    //   }
    //   const msg = state.messages.find((m) => m._id === action.payload._id);
    //   if (msg) msg.message = action.payload.message;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMessages, setNewMessage, updateSeen,updateMessageId } = messageSlice.actions;
export default messageSlice.reducer;
