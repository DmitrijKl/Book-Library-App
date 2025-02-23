import React from "react";
import "./BookForm.css";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createBookWithId from "../../utils/createBookWithID.js";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice.js";
import BooksData from "../../data/books.json";
import { setError } from "../../redux/slices/errorSlice.js";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);

  const dispatch = useDispatch();
  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * BooksData.length);
    const randomBook = BooksData[randomIndex];
    const randomBookWithId = createBookWithId(randomBook, "random");
    dispatch(addBook(randomBookWithId));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithId({ title, author }, "manual");
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author!"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:5000/random-book-delayed"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>

        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner"></FaSpinner>
            </>
          ) : (
            <>Add Random via API</>
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
