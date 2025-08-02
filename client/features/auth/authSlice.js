import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
import socket from "../../utils/socket";
import toast from "react-hot-toast";
const URL = import.meta.env.VITE_SERVER_URL;


export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${URL}/api/user/get-user-data`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Login successful");
      }

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/auth/login`, {
        email,
        password,
      });
      toast.success("Login successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (otp, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/api/auth/verify-email`, {
        otp,
      });

      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const sendEmailVerifyOtp = createAsyncThunk(
  "auth/sendverifyotp",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/send-verify-otp`,
        {}, // no body data
        { withCredentials: true } // send cookie
      );
      toast.success("OTP sent successfully");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.msg || "OTP send failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      toast.success("User Registered successfully");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    toast.success("Logout successful");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.msg || "OTP send failed"
    );
  }
});

export const sendResetPassOtp = createAsyncThunk(
  "auth/sendResetPassOtp",
  async ({ email }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/send-reset-otp`,
        { email },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.msg || "OTP send failed"
      );
    }
  }
);

export const setNewPass = createAsyncThunk(
  "auth/setNewPass",
  async ({ email, otp, newpassword }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/verify-reset-otp`,
        { email, otp, newpassword },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP send failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    loggedIn: false,
    loading: false,
    error: null,
    isverified: null,
    success: null,
    authuser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.authuser = action.payload.userData;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.authuser = action.payload.userData;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.username = null;
        state.authuser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })

      //EMAIL VERIFY
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isverified = action.payload.isVerified;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      // FETCH USER DATA
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.username = action.payload.userData.username;
        state.isverified = action.payload.userData.isVerified;
        state.authuser = action.payload.userData;
        socket.emit("addUser", state.authuser.id);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      // SEND OTP FOR RESET PASS
      .addCase(sendResetPassOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetPassOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;

        state.error = action.payload.message;
      })
      .addCase(sendResetPassOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = action.payload.success;
      })
      // RESET NEW PASS
      .addCase(setNewPass.pending, (state) => {
        state.loading = true;
      })
      .addCase(setNewPass.fulfilled, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(setNewPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
