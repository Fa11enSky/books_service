import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useThrottle } from "@uidotdev/usehooks";
import { Notify } from "notiflix";

import getAllBooks from "./services/getAllBooks";
import BooksList from "./components/BooksList/BooksList";
import AddBookBtn from "./components/AddBookBtn/AddBookBtn";
import Portal from "./components/Portal/Portal";
import AddBookForm from "./components/AddBookForm/AddBookForm";
import deleteBook from "./services/deleteBook";
import SearchInput from "./components/SearchInput/SearchInput";
import searchBooks from "./services/searchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [toRender, setToRender] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("query") ?? "";
  const trottledQuery = useThrottle(query, 1000);

  
  useEffect(() => {
    (async function () {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        Notify.failure(error.message);
      }
    })();
  }, []);
  
  useEffect(() => {
    if (trottledQuery.trim() === "") {
      setToRender(books);
      return;
    }
    
    (async function () {
      try {
        const response = await searchBooks(trottledQuery.trim());
        setToRender(response);
      } catch (error) {
        setToRender([]);
      }
    })();
  }, [trottledQuery, books]);
  
  const updateQueryString = (query) => {
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleAdd = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };
  
  const handleEdit = (isbn, updates) => {
    const idx = books.findIndex((el) => el.isbn === isbn);
    setBooks((prev) => {
      const arr = [...prev];
      arr.splice(idx, 1, updates);
      return arr;
    });
  };

  const handleDelete = async (isbn) => {
    try {
      await deleteBook(isbn);
      setBooks((prev) => {
        return prev.filter((el) => el.isbn !== isbn);
      });
      Notify.success(`${isbn} successfully removed`);
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <div className="container">
      <SearchInput value={query} handleChange={updateQueryString} />
      {query === "" && <AddBookBtn onClick={modalToggle} />}
      {toRender.length > 0 ? (
        <BooksList
          books={toRender}
          onDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : (
        <div>Nothing found, try changing your request</div>
      )}
      {isModalOpen && (
        <Portal handleClose={modalToggle}>
          <AddBookForm handleAdd={handleAdd} onClose={modalToggle} />
        </Portal>
      )}
    </div>
  );
}

export default App;
