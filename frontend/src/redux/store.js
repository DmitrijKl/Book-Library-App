import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import filterSlice from "./slices/filterSlice";
import errorReducer from "./slices/errorSlice";

const store = configureStore({
  reducer: { booksSlice, filter: filterSlice, error: errorReducer },
});

export default store;
