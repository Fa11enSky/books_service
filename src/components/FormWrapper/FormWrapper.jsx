import React from 'react'
import css from './styles.module.css'
const FormWrapper = ({children}) => {
  return (
    <div className={css.wrapper}>
      {children}
    </div>
  )
}

export default FormWrapper
