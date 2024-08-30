import css from './styles.module.css'
const AddBookBtn = ({ onClick }) => {
  return (
    <>
      <button className={css.button} onClick={onClick}>Add Book</button>
    </>
  );
};

export default AddBookBtn;
