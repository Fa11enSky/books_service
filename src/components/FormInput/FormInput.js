import React from "react";
import css from "./styles.module.css";
const FormInput = ({ handleChange, placeholder, name, value, id }) => {
  return (
    <input
      id={id}
      className={css.input}
      onChange={handleChange}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};

export default FormInput;
