import ReactDOM from "react-dom";
import css from './styles.module.css'
const Portal = ({ children, handleClose }) => {
    const onClose = (ev) => {
        if (ev.target === ev.currentTarget) {
          handleClose()
      }
    }
    
  return ReactDOM.createPortal(
      <div onClick={ onClose} className={css.wrapper}>{children}</div>,
    document.getElementById("modal-root")
  );
};

export default Portal;
