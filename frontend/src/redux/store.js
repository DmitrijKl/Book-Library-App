import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import filterSlice from "./slices/filterSlice";

const store = configureStore({
  reducer: { booksSlice, filter: filterSlice },
});

export default store;
