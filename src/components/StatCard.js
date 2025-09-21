import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, subtitle }) => {
  // Remove negative sign for display
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g,"")) : value;
  const isOwed = subtitle === 'You owe' || numericValue < 0;

  return (
    <div className={styles.statsCard}>
      <div className={styles.statsCard_title}>{title}</div>
      <div
        className={`${styles.statsCard_value} ${isOwed ? styles.negative : ''}`}
      >
        {/* Remove negative sign if owed */}
        {isOwed
          ? `$${Math.abs(numericValue).toFixed(2)}`
          : value}
      </div>
      <div className={styles.statsCard_subtitle}>{subtitle}</div>
    </div>
  );
};

export default StatCard;