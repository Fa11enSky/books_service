import React, { useState } from "react";
import cross from "../../svg/cross.svg";
import success from "../../svg/success.svg";
import css from "./styles.module.css";
import Portal from "../Portal/Portal";
import EditBookForm from "../EditBookForm/EditBookForm";
import changeBorrowStatus from "../../services/changeBorrowStatus";
import { Notify } from "notiflix";

const BookItem = ({ book, onDelete, handleEdit }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const modalToggle = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleChangeBorrow = async () => {
    try {
      const response = await changeBorrowStatus(book.isbn, {
        isBorrowed: !book.isBorrowed,
      });
      handleEdit(book.isbn, { ...book, isBorrowed: response.isBorrowed });
      Notify.success(`${response.title} borrow status successfully updated`);
    } catch (error) {
      Notify.failure(error);
    }
  };

  return (
    <li className={css.item}>
      <span>
        ISBN: <span className={css.isbn}>{book.isbn}</span>
      </span>
      <h3>Title: {book.title}</h3>
      <h3>Author: {book.author}</h3>
      <span className={css.status}>
        Borrowed:{" "}
        {book.isBorrowed ? (
          <img width={25} height={25} src={success} alt="success" />
        ) : (
          <img width={25} h={25} src={cross} alt="cross" />
        )}
      </span>

      <ul className={css.control}>
        <li>
          <button type="button" onClick={modalToggle}>
            Edit Book
          </button>
        </li>
        <li>
          <button
            type="button"
            className={css.delBtn}
            onClick={() => onDelete(book.isbn)}
          >
            Delete Book
          </button>
        </li>
        <li>
          <button type="button" onClick={handleChangeBorrow}>
            {book.isBorrowed ? "Mark as available" : "Mark as borrowed"}
          </button>
        </li>
      </ul>
      {isEditOpen && (
        <Portal handleClose={modalToggle}>
          <EditBookForm book={book} onEdit={handleEdit} />
        </Portal>
      )}
    </li>
  );
};

export default BookItem;
