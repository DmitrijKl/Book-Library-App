import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import "./BookList.css";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";

function BookList() {
  const books = useSelector((state) => {
    return state.booksReducer;
  });
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });
  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++index}. {highlightMatch(book.title, titleFilter)} by{" "}
                  <strong>{highlightMatch(book.author, authorFilter)}</strong>
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavorite(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon"></BsBookmarkStarFill>
                    ) : (
                      <BsBookmarkStar className="star-icon"></BsBookmarkStar>
                    )}
                  </span>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BookList;
