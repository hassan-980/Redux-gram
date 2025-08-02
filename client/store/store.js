import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import postReducer from "../features/posts/postslice.js";
import messageReducer from "../features/messages/messageSlice.js";
import userReducer from "../features/users/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    message: messageReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});
