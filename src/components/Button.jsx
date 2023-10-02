import React from 'react'
import styles from '../styles/modules/button.module.scss'

const Button = ({ children, type, variant = 'primary', ...rest }) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.button} ${
        variant === 'primary'
          ? styles['button--primary']
          : styles['button--secondary']
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export const SelectButton = ({ children, ...rest }) => {
  return (
    <select className={`${styles.button} ${styles.button__select}`} {...rest}>
      {children}
    </select>
  )
}

export default Button
