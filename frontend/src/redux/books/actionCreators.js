import * as actionTypes from "./actionTypes.js";

export const addBook = (newBook) => {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};
export const deleteBook = (deleteBookId) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: deleteBookId,
  };
};
export const toggleFavorite = (toggleBookId) => {
  return {
    type: actionTypes.TOGGLE_FAVORITE,
    payload: toggleBookId,
  };
};
