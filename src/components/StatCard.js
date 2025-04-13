import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({title,value,subtitle}) => {
  return (
    <div className={styles.statsCard}>
        <div className={styles.statsCard_title}>{title}</div>
        <div className={styles.statsCard_value}>{value}</div>
        <div className={styles.statsCard_subtitle}>{subtitle}</div>
    </div>
  )
}

export default StatCard