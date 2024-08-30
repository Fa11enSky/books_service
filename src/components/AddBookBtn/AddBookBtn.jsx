import css from './styles.module.css'
const AddBookBtn = ({ onClick }) => {
  return (
    <>
      <button className={css.button} onClick={onClick}>Add a book</button>
    </>
  );
};

export default AddBookBtn;
