import React from 'react';
import TopBar from '../components/TopBar';
import styles from './HomePage.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fireBase';
import Dashboard from './Dashboard';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout,user } = useAuth();
  console.log('currentUser:', auth?.currentUser?.email);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/signin');
      console.log('User logged out');
    } catch (error) {
      console.error(error);
    }
  };

  const displayName = user?.displayName || 
                     (user?.email ? user.email.split('@')[0] : 'User');

  return (
    <div className={styles.container}>
      <TopBar username={displayName} onLogout={handleLogout} />

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h1 className={styles.welcomeTitle}>Welcome to Easy Split</h1>
          <p className={styles.welcomeText}>
            Easily manage and split expenses with friends and family. Track who
            owes what, settle up, and make sure everyone pays their fair share.
          </p>
        </div>
        <Dashboard />
        {/* You can add additional content or features here */}
      </div>
    </div>
  );
};

export default HomePage;
