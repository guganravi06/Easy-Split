import React from 'react';
import styles from './TopBar.module.css';
import Button from './Button'; 

const TopBar = ({ username, onLogout }) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.logo}>
        Easy Split
      </div>
      <div className={styles.userActions}>
        <span className={styles.username}>{username}</span>
        <div className={styles.logoutButtonWrapper}>
          <Button 
            text="Logout" 
            onClick={onLogout} 
            textAlign="center"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;