import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../utils/authHeader";

const BASE_URL = "https://yellow-fullstack-assingment-backend.onrender.com/contact";
// const BASE_URL = "http://localhost:3000/contact";
export const createContact = createAsyncThunk(
  "data/createContact",
  async ({ username, email, phone, message }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}`,
        {
          username,
          email,
          phone,
          message,
        },
        {
          headers: authHeader(),
        }
      );
      const data = await res.data;
      console.log(data.contact);

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

export const getAllContacts = createAsyncThunk(
  "data/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}`, {
        headers: authHeader(),
      });

      return data;
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleContact = createAsyncThunk(
  "data/getSingleContact",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`, {
        headers: authHeader(),
      });

      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateContact = createAsyncThunk(
  "data/updateContact",
  async ({id, formData}, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/${id}`, formData, {
        headers: authHeader(),
      });

      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteContact = createAsyncThunk(
  "data/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`, {
        headers: authHeader(),
      });

      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contact: {},
    contacts: [],
    isLoading: false,
    isError: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state, action) => {
        (state.isLoading = true), (state.isError = null);
      })

      .addCase(createContact.fulfilled, (state, action) => {
        state.contact = action.payload.contact;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.contact = null;
      })

      .addCase(getSingleContact.pending, (state, action) => {
        (state.isLoading = true), (state.isError = null);
      })

      .addCase(getSingleContact.fulfilled, (state, action) => {
        state.contact = action.payload.contact;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(getSingleContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.contact = {};
      })

      .addCase(getAllContacts.pending, (state, action) => {
        (state.isLoading = true), (state.isError = null);
      })

      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.contacts;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(getAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.contacts = [];
      })

      .addCase(updateContact.pending, (state, action) => {
        (state.isLoading = true), (state.isError = null);
      })

      .addCase(updateContact.fulfilled, (state, action) => {
        state.contact = action.payload.contact;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.contact = {};
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
      })

      .addCase(deleteContact.rejected, (state, action) => {
        state.success = false;
        state.isLoading = false;
      });
  },
});

export default contactSlice.reducer;
