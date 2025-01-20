import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CatState } from './types/CatState';

const apiKey = import.meta.env.VITE_API_KEY;
export const getCats = createAsyncThunk(
  'cats/getCats',
  async (page: number) => {
    if (!apiKey) {
      throw new Error('API key is missing');
    }

    const url = `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Network response was not ok', error);
      throw new Error('Network response was not ok');
    }
  }
);

const initialState: CatState = {
  cats: [],
  currentPage: 0,
  fetching: false,
  error: undefined,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCats.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getCats.fulfilled, (state, action) => {
      state.cats = [...state.cats, ...action.payload];
      state.currentPage += 1;
      state.fetching = false;
    });
    builder.addCase(getCats.rejected, (state) => {
      state.fetching = false;
    });
  },
});

export const selectCats = (state: RootState) => state.cats.cats;
export const selectCurrentPage = (state: RootState) => state.cats.currentPage;
export const selectFetching = (state: RootState) => state.cats.fetching;

export default catsSlice.reducer;
