import styles from './SignIn.module.css';
import LeftSideIllustrator from '../components/LeftSideIllustrator';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {
  const navigate = useNavigate();

  const { login, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log('currentUser:', auth?.currentUser?.email);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error('Email or password is empty.');
      return;
    }

    try {
      await login(email, password);
      navigate('./home');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      await signInWithGoogle();
      navigate('./home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <LeftSideIllustrator />
      </div>
      <div className={styles.signInContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.header}>Welcome Back</h2>
          <p className={styles.message}>Sign in to continue to EasySplit</p>
          <InputField
            type='text'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className={styles.forgotPassword}>
            <span className={styles.linkText}>Forgot Password?</span>
          </p>
          <Button text='Sign In' textAlign='center' onClick={handleLogin} />
          <div className={styles.orContainer}>
            <span className={styles.orText}>OR</span>
          </div>
          <Button
            text='Sign In With Google'
            icon='./assets/google-logo-icon.png'
            textAlign='center'
            onClick={handleSignInWithGoogle}
          />
        </div>
        <div className={styles.signUpMessage}>
          Don't have an account?{' '}
          <span className={styles.linkText} onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
