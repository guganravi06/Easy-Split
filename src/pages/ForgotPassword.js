import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import LeftSideIllustrator from '../components/LeftSideIllustrator';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await resetPassword(email);
      setMessage('Password reset link sent! Check your email.');
    } catch (error) {
      console.error(error);
      setError(
        'Failed to send password reset email. Please check the email entered.'
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <LeftSideIllustrator />
      </div>
      <div className={styles.forgotPasswordContainer}>
        <div className={styles.ForgotPasswordBox}>
          <h2 className={styles.header}>Reset Password</h2>
          <p className={styles.message}>
            Enter your email, and we'll send you a password reset link.
          </p>

          <InputField
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.marginTopandbottom} />
          <Button
            text='Send Reset Link'
            textAlign='center'
            onClick={handleResetPassword}
          />

          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.marginTopandbottom} />
          <span onClick={() => navigate('/signin')} className={styles.linkText}>
            All sign in options
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
