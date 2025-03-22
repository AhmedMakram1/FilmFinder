import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Instance/instance";

// const apiKey = "c94b800b13b9b455a5d91c9b54e821a3";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (pageNumber) => {
    
      const response = await instance.get(
        `/movie/popular?api_key=c94b800b13b9b455a5d91c9b54e821a3& page=${pageNumber}`
      );
      return response.data.results;
    
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
