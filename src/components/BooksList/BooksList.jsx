import React from "react";
import BookItem from "../BookItem/BookItem";
import css from "./styles.module.css";

const BooksList = ({ books, onDelete, handleEdit }) => {
  return (
    <ul className={css.list}>
      {books.map((el) => (
        <BookItem
          key={el.isbn}
          book={el}
          onDelete={onDelete}
          handleEdit={handleEdit}
        />
      ))}
    </ul>
  );
};

export default BooksList;
