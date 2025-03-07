import React from 'react';
import TopBar from '../components/TopBar';
import styles from './HomePage.module.css';

const HomePage = () => {
  const handleLogout = () => {
    // Your logout logic here
    console.log('User logged out');
  };

  return (
    <div className={styles.container}>
      <TopBar username="Gugan" onLogout={handleLogout} />
      
      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h1 className={styles.welcomeTitle}>Welcome to Easy Split</h1>
          <p className={styles.welcomeText}>
            Easily manage and split expenses with friends and family. Track who owes what, 
            settle up, and make sure everyone pays their fair share.
          </p>
        </div>
        
        {/* You can add additional content or features here */}
      </div>
    </div>
  );
};

export default HomePage;