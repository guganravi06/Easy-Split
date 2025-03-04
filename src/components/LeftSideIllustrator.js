import React from 'react';
import styles from './LeftSideIllustrator.module.css';

const LeftSideIllustrator = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Easy Split</h1>
        <p className={styles.quote}>Split expenses with friends, simplified.</p>
            <div className={styles.circle}>
                <img className={styles.logo} src='./assets/rupee.png' alt='rupee logo'/>
            </div>
    </div>
  )
}

export default LeftSideIllustrator