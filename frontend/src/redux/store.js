import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/reducer";
import filterSlice from "./slices/filterSlice";

const store = configureStore({
  reducer: { booksReducer, filter: filterSlice },
});

export default store;
