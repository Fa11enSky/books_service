import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormWrapper from "../FormWrapper/FormWrapper";
import editBook from "../../services/editBook";
import { Notify } from "notiflix";

const EditBookForm = ({ book: { title, author, isbn }, onEdit }) => {
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
      return;
    }
    try {
      const response = await editBook(isbn, bookData);
        onEdit(isbn, response);
        Notify.success(`${response.title} successfully updated`);
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <p>Edit Book</p>
        <label htmlFor="isbn">isbn</label>
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
        <button type="submit">Edit</button>
      </form>
    </FormWrapper>
  );
};

export default EditBookForm;
