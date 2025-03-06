import React from 'react';
import styles from './Button.module.css';

const Button = ({text,icon,imgAlign="left",textAlign="center",onClick,type="button"}) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
        {icon && <img className={styles[imgAlign]} src={icon} alt='button-icon' />}
        <span className={styles[textAlign]}>{text}</span>
    </button>
  )
}

export default Button;