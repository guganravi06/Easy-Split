import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './SignUp.module.css';
import LeftSideIllustrator from '../components/LeftSideIllustrator';
import InputField from '../components/InputField';
import Button from '../components/Button';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleDisplayNameChange = (e) => setDisplayName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError('Password must contain both letters and numbers');
      return;
    }
    
    try {
      await signUp(email, password, displayName);
      navigate('/');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } 
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <LeftSideIllustrator />
      </div>
      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          <div className={styles.signupCardHeader}>
            <b>Create Account</b>
          </div>
          <div className={styles.signupSubtext}>
            <p>Join EasySplit to start sharing expenses</p>
          </div>
          
          
          <form onSubmit={handleSignUp}>
            <InputField 
              type="text" 
              placeholder="Display Name (optional)" 
              value={displayName}
              onChange={handleDisplayNameChange}
            />
            <InputField 
              type="text" 
              placeholder="Email address" 
              value={email}
              onChange={handleEmailChange}
              required
            />
            <InputField 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <InputField 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <div className={styles.passwordSubtext}>
              <p>Must be at least 8 characters with letters & numbers</p>
            </div>
            
            <Button 
              text="Create Account"
              textAlign='center'
              type="submit"
            />
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>OR</div>
            <div className={styles.dividerLine}></div>
          </div>
          
          <div className={styles.signInLink}>
            <p>Already have an account? <Link to="/signin" className={styles.linkText}>Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;