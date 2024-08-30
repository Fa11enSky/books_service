import css from "./styles.module.css";
const SearchInput = ({ handleChange, value }) => {
  return (
    <input
      value={value}
      onChange={(ev)=>handleChange(ev.target.value)}
      placeholder="Enter the title or ISBN "
      className={css.searchInput}
    />
  );
};

export default SearchInput;
