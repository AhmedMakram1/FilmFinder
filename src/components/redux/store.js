import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productsReducer from "./product";
import moviesReducer from "./product";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    
  },
});

export default store;
