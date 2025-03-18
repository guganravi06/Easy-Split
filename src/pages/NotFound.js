import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; // You'll need to create this CSS file

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundCard}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;