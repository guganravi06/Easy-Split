import React from 'react';
import styles from './SignIn.module.css';
import LeftSideIllustrator from '../components/LeftSideIllustrator';
import InputField from '../components/InputField';
import Button from '../components/Button';

const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <LeftSideIllustrator />
      </div>
      <div className={styles.signInContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.header}>Welcome Back</h2>
          <p className={styles.message}>Sign in to continue to EasySplit</p>
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
        </div>
        <div className={styles.signUpMessage}>
          Don't have an account? <span className={styles.linkText}>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
