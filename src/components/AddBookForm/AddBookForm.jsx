import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import addBook from "../../services/addBook";
import css from "./styles.module.css";
import FormWrapper from "../FormWrapper/FormWrapper";
import { Notify } from "notiflix";
const AddBookForm = ({ handleAdd }) => {
  const [bookData, setBookData] = useState({ isbn: "", author: "", title: "" });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { title, author, isbn } = bookData;

    if (
      title.trim().length < 2 ||
      isbn.trim().length < 2 ||
      author.trim().length < 2
    ) {
      return;
    }
    try {
      const newBook = await addBook(bookData);
      handleAdd(newBook);
      Notify.success(`${newBook.title} successfully added`);
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <FormWrapper>
      <form  onSubmit={handleSubmit}>
        <p>Enter the data of the book you want to add</p>
        <label htmlFor="isbn">isbn</label>
        <FormInput
          id="isbn"
          handleChange={handleChange}
          placeholder="isbn"
          name="isbn"
          value={bookData.isbn}
        />
  
        <label htmlFor="title">Title</label>
        <FormInput
          id="title"
          handleChange={handleChange}
          placeholder="Title"
          name="title"
          value={bookData.title}
        />
  
        <label htmlFor="author">Author</label>
        <FormInput
          id="author"
          handleChange={handleChange}
          placeholder="Author"
          name="author"
          value={bookData.author}
        />
  
        <button className={css.btnSubmit} type="submit">
          Add a book
        </button>
      </form>
    </FormWrapper>
  );
};

export default AddBookForm;
