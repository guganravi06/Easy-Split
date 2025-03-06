import React from 'react';
import styles from './LoginContainer.module.css';
import Button from './Button';
import InputField from './InputField';

const LoginContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.header}>Welcome Back</h2>
        <p className={styles.message}>Sign in to continue to EasySplit</p>
        <form>
          <InputField type='text' placeholder='Email address' />
          <InputField type='password' placeholder='Password' />
          <p className={styles.forgotPassword}>
            <a href='https://react.dev/'>Forgot Password?</a>
          </p>
          <Button text='Sign In' textAlign='center' />
          <div className={styles.orContainer}>
            <span className={styles.orText}>OR</span>
          </div>
          <Button
            text='Sign In With Google'
            icon='./assets/google-logo-icon.png'
            textAlign='center'
          />
        </form>
      </div>
      <div className={styles.signUpMessage}>
        Don't have an account? <a href='sign-up'>Sign up</a>
      </div>
    </div>
  );
};

export default LoginContainer;
