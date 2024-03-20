import React from "react";
import "./BookForm.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import createBookWithId from "../../utils/createBookWithID.js";
import { addBook } from "../../redux/slices/booksSlice.js";
import BooksData from "../../data/books.json";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * BooksData.length);
    const randomBook = BooksData[randomIndex];
    const randomBookWithId = createBookWithId(randomBook);
    dispatch(addBook(randomBookWithId));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithId({ title, author });
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    }
  };
  const handleAddRandomBookViaAPI = async () => {
    try {
      const res = await axios.get("http://localhost:5000/random-book");
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data)));
      }
    } catch (error) {
      console.log("Error", error);
    }
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
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
