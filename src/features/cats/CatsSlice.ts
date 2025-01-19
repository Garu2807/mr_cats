import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CatState } from './types/CatState';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY || null;
console.log('API Key:', apiKey); // Вывод значения API ключа в консоль

export const getCats = createAsyncThunk(
  'cats/getCats',
  async (page: number) => {
    if (!apiKey) {
      console.error('API key is missing');
      throw new Error('API key is missing');
    }
    console.log(`Fetching cats for page ${page}`);

    const url = `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}`;
    console.log(`Request URL: ${url}`); // Логирование URL запроса

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
      });

      console.log(response.data); // Вывод данных в консоль
      return response.data;
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
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        console.log('Fetching cats pending');
        state.fetching = true;
      })
      .addCase(getCats.fulfilled, (state, action) => {
        console.log('Fetching cats fulfilled', action.payload);
        state.fetching = false;
        state.cats = action.payload;
      })
      .addCase(getCats.rejected, (state, action) => {
        console.log('Fetching cats rejected', action.error.message);
        state.fetching = false;
        console.error('Error fetching cats:', action.error.message); // Вывод ошибки в консоль
      });
  },
});

export const selectCats = (state: RootState) => state.cats.cats;
export const selectFetching = (state: RootState) => state.cats.fetching;
export const selectCurrentPage = (state: RootState) => state.cats.currentPage;

export default catsSlice.reducer;
