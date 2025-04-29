import React from 'react';
import styles from './Button.module.css';

const Button = ({
  text,
  image,
  imagePosition = 'left',
  textAlign = 'center',
  onClick,
  className = '',
  style = {},
  type = 'button',
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={style}
      onClick={onClick}
      type={type}
    >
      {image && imagePosition === 'left' && (
        <img
          src={image}
          alt='button icon'
          className={`${styles.buttonImage} ${styles.leftImage}`}
        />
      )}
      <span className={`${styles.buttonText} ${styles[`${textAlign}Text`]}`}>
        {text}
      </span>
      {image && imagePosition === 'right' && (
        <img
          src={image}
          alt='button icon'
          className={`${styles.buttonImage} ${styles.rightImage}`}
        />
      )}
    </button>
  );
};

export default Button;
