import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import  postReducer  from "../features/posts/postslice.js";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    post:postReducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⛔ disables serializable check
    }),
});
