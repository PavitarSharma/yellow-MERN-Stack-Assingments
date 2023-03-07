import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://yellow-fullstack-assingment-backend.onrender.com/auth";
// const BASE_URL = "http://localhost:3000/auth";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/register`,
        {
          username,
          password,
        },
        config
      );

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/login`,
        {
          username,
          password,
        },
        config
      );

      if (data) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    success: false,
    error: false,
    token: null,
  },
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.success = false;
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
