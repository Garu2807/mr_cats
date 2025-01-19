import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import catsReducer from './features/cats/CatsSlice';
import favouritesReducer from './features/favourites/FavouritesSlice';

const store = configureStore({
  reducer: { cats: catsReducer, favourites: favouritesReducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
