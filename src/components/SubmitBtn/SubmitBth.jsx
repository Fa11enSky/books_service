import React from "react";
import css from "./styles.module.css";
const SubmitBth = ({ text }) => {
  return (
    <button type="submit" className={css.btnSubmit}>
      {text}
    </button>
  );
};

export default SubmitBth;
