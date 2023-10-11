import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetFeaturedServices = createAsyncThunk(
  "featuredServices/GetFeaturedServices",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const Fetch_Axios = await axios.get("services/featured");
      return Fetch_Axios.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const featuredServicesSlice = createSlice({
  name: "featuredServices",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetFeaturedServices.pending, (state) => {
      state.loading = true;
      state.error = "null";
    });
    builder.addCase(GetFeaturedServices.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.error = "null";
    });
    builder.addCase(GetFeaturedServices.rejected, (state, { payload }) => {
      state.error = `${payload}`;
    });
  },
});

export default featuredServicesSlice.reducer;