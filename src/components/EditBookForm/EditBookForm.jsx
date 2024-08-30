import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormWrapper from "../FormWrapper/FormWrapper";
import editBook from "../../services/editBook";
import { Notify } from "notiflix";
import css from "./styles.module.css";
import SubmitBth from "../SubmitBtn/SubmitBth";

const EditBookForm = ({ book: { title, author, isbn }, onEdit, onClose }) => {
  const [bookData, setBookData] = useState({ isbn, author, title });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (
      !bookData.title.trim() ||
      !bookData.author.trim() ||
      !bookData.isbn.trim()
    ) {
      Notify.warning("Check the entered data ");
      return;
    }
    try {
      const response = await editBook(isbn, bookData);
      onEdit(isbn, response);
      Notify.success(`${response.title} successfully updated`);
      onClose();
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <FormWrapper>
      <form className={css.form} onSubmit={handleSubmit}>
        <p className={css.formTitle}>Edit Book</p>
        <div className={css.fieldsWrapper}>
          <label htmlFor="isbn">ISBN</label>
          <FormInput
            handleChange={handleChange}
            id="isbn"
            name="isbn"
            value={bookData.isbn}
            placeholder="isbn"
          />
          <label htmlFor="author">Author</label>
          <FormInput
            handleChange={handleChange}
            id="author"
            name="author"
            value={bookData.author}
            placeholder="author"
          />
          <label htmlFor="title">Title</label>
          <FormInput
            handleChange={handleChange}
            id="title"
            name="title"
            value={bookData.title}
            placeholder="title"
          />
        </div>
        <SubmitBth text="Edit" />
      </form>
    </FormWrapper>
  );
};

export default EditBookForm;
